#!/bin/bash

# CloudFront 403 Error Fix Script
# This script helps fix the common 403 error issues with CloudFront + S3

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables - UPDATE THESE
DISTRIBUTION_ID="YOUR_DISTRIBUTION_ID"
BUCKET_NAME="zoomnotary-frontend-production"
ACCOUNT_ID="YOUR_ACCOUNT_ID"
CUSTOM_DOMAIN="your-custom-domain.com"
CERTIFICATE_ARN="arn:aws:acm:us-east-1:YOUR_ACCOUNT_ID:certificate/YOUR_CERT_ID"

echo -e "${BLUE}🔧 CloudFront 403 Error Fix Script${NC}"
echo "=================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ jq is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  Please update the configuration variables at the top of this script before running!${NC}"
echo "   - DISTRIBUTION_ID: $DISTRIBUTION_ID"
echo "   - BUCKET_NAME: $BUCKET_NAME"
echo "   - ACCOUNT_ID: $ACCOUNT_ID"
echo "   - CUSTOM_DOMAIN: $CUSTOM_DOMAIN"
echo "   - CERTIFICATE_ARN: $CERTIFICATE_ARN"
echo ""

read -p "Have you updated these variables? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Please update the variables and run the script again.${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Step 1: Creating Origin Access Control (OAC)${NC}"
OAC_RESPONSE=$(aws cloudfront create-origin-access-control \
    --origin-access-control-config Name=zoomnotary-oac,Description="OAC for ZoomNotary S3 bucket",SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3 \
    --output json)

OAC_ID=$(echo $OAC_RESPONSE | jq -r '.OriginAccessControl.Id')
echo -e "${GREEN}✅ Created OAC with ID: $OAC_ID${NC}"

echo -e "${BLUE}📋 Step 2: Updating S3 Bucket Policy${NC}"
cat > temp-bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::$ACCOUNT_ID:distribution/$DISTRIBUTION_ID"
                }
            }
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://temp-bucket-policy.json
echo -e "${GREEN}✅ Updated S3 bucket policy${NC}"

echo -e "${BLUE}📋 Step 3: Getting Current CloudFront Configuration${NC}"
aws cloudfront get-distribution-config --id $DISTRIBUTION_ID > current-dist-config.json
CURRENT_ETAG=$(jq -r '.ETag' current-dist-config.json)
echo -e "${GREEN}✅ Retrieved current configuration with ETag: $CURRENT_ETAG${NC}"

echo -e "${BLUE}📋 Step 4: Creating Updated CloudFront Configuration${NC}"
# Create the updated configuration
jq --arg oac_id "$OAC_ID" --arg domain "$CUSTOM_DOMAIN" --arg cert_arn "$CERTIFICATE_ARN" '
.DistributionConfig.Origins.Items[0].DomainName = "zoomnotary-frontend-production.s3.amazonaws.com" |
.DistributionConfig.Origins.Items[0].S3OriginConfig = {"OriginAccessIdentity": ""} |
.DistributionConfig.Origins.Items[0].OriginAccessControlId = $oac_id |
del(.DistributionConfig.Origins.Items[0].CustomOriginConfig) |
.DistributionConfig.Aliases.Quantity = 1 |
.DistributionConfig.Aliases.Items = [$domain] |
.DistributionConfig.ViewerCertificate.ACMCertificateArn = $cert_arn |
.DistributionConfig.ViewerCertificate.SSLSupportMethod = "sni-only" |
.DistributionConfig.ViewerCertificate.MinimumProtocolVersion = "TLSv1.2_2021" |
.DistributionConfig.ViewerCertificate.CertificateSource = "acm" |
del(.DistributionConfig.ViewerCertificate.CloudFrontDefaultCertificate)
' current-dist-config.json > updated-dist-config.json

echo -e "${GREEN}✅ Created updated configuration${NC}"

echo -e "${BLUE}📋 Step 5: Updating CloudFront Distribution${NC}"
aws cloudfront update-distribution \
    --id $DISTRIBUTION_ID \
    --distribution-config file://updated-dist-config.json \
    --if-match $CURRENT_ETAG

echo -e "${GREEN}✅ CloudFront distribution update initiated${NC}"
echo -e "${YELLOW}⚠️  Note: CloudFront updates can take 15-20 minutes to propagate${NC}"

echo -e "${BLUE}📋 Step 6: Creating Cache Invalidation${NC}"
INVALIDATION_RESPONSE=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --output json)

INVALIDATION_ID=$(echo $INVALIDATION_RESPONSE | jq -r '.Invalidation.Id')
echo -e "${GREEN}✅ Created invalidation with ID: $INVALIDATION_ID${NC}"

echo -e "${BLUE}📋 Step 7: Testing Access${NC}"
echo "Testing S3 direct access..."
if curl -s -o /dev/null -w "%{http_code}" "https://$BUCKET_NAME.s3.amazonaws.com/index.html" | grep -q "200"; then
    echo -e "${GREEN}✅ S3 direct access working${NC}"
else
    echo -e "${RED}❌ S3 direct access failed${NC}"
fi

echo "Testing CloudFront access..."
if curl -s -o /dev/null -w "%{http_code}" "https://$DISTRIBUTION_ID.cloudfront.net" | grep -q "200"; then
    echo -e "${GREEN}✅ CloudFront access working${NC}"
else
    echo -e "${YELLOW}⚠️  CloudFront access may still be propagating (wait 15-20 minutes)${NC}"
fi

# Cleanup temporary files
rm -f temp-bucket-policy.json current-dist-config.json updated-dist-config.json

echo ""
echo -e "${GREEN}🎉 Fix script completed!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Wait 15-20 minutes for CloudFront changes to propagate"
echo "2. Configure DNS CNAME record: $CUSTOM_DOMAIN -> $DISTRIBUTION_ID.cloudfront.net"
echo "3. Test your custom domain: https://$CUSTOM_DOMAIN"
echo "4. Monitor CloudFront invalidation status: aws cloudfront get-invalidation --distribution-id $DISTRIBUTION_ID --id $INVALIDATION_ID"
echo ""
echo -e "${YELLOW}📋 Important IDs to save:${NC}"
echo "   - OAC ID: $OAC_ID"
echo "   - Invalidation ID: $INVALIDATION_ID"
echo "   - Distribution ID: $DISTRIBUTION_ID"
