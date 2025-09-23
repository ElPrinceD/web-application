#!/bin/bash

# Update CloudFront Distribution with Custom Domain
# Run this script AFTER the SSL certificate is validated

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DISTRIBUTION_ID="E2C9XXSE2FV9NQ"
CUSTOM_DOMAIN="renotary.uk"
CERTIFICATE_ARN="arn:aws:acm:us-east-1:445830509236:certificate/01402e55-1834-4f0d-b062-e330f56dca86"

echo -e "${BLUE}🔧 CloudFront Custom Domain Update Script${NC}"
echo "=============================================="

# Check if certificate is validated
echo -e "${BLUE}📋 Step 1: Checking SSL Certificate Status${NC}"
CERT_STATUS=$(aws acm describe-certificate --certificate-arn "$CERTIFICATE_ARN" --region us-east-1 --query "Certificate.Status" --output text)

if [ "$CERT_STATUS" != "ISSUED" ]; then
    echo -e "${RED}❌ SSL Certificate is not validated yet. Status: $CERT_STATUS${NC}"
    echo -e "${YELLOW}Please add the DNS validation records to your domain first.${NC}"
    echo -e "${YELLOW}See fix-custom-domain-guide.md for the required DNS records.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ SSL Certificate is validated (Status: $CERT_STATUS)${NC}"

# Get current distribution configuration
echo -e "${BLUE}📋 Step 2: Getting Current CloudFront Configuration${NC}"
aws cloudfront get-distribution-config --id $DISTRIBUTION_ID > current-config.json
CURRENT_ETAG=$(jq -r '.ETag' current-config.json)
echo -e "${GREEN}✅ Retrieved current configuration with ETag: $CURRENT_ETAG${NC}"

# Create updated configuration
echo -e "${BLUE}📋 Step 3: Creating Updated Configuration${NC}"
jq --arg domain "$CUSTOM_DOMAIN" --arg cert_arn "$CERTIFICATE_ARN" '
.DistributionConfig.Aliases.Quantity = 1 |
.DistributionConfig.Aliases.Items = [$domain] |
.DistributionConfig.ViewerCertificate.ACMCertificateArn = $cert_arn |
.DistributionConfig.ViewerCertificate.SSLSupportMethod = "sni-only" |
.DistributionConfig.ViewerCertificate.MinimumProtocolVersion = "TLSv1.2_2021" |
.DistributionConfig.ViewerCertificate.CertificateSource = "acm" |
del(.DistributionConfig.ViewerCertificate.CloudFrontDefaultCertificate)
' current-config.json > updated-config.json

echo -e "${GREEN}✅ Created updated configuration${NC}"

# Update CloudFront distribution
echo -e "${BLUE}📋 Step 4: Updating CloudFront Distribution${NC}"
aws cloudfront update-distribution \
    --id $DISTRIBUTION_ID \
    --distribution-config file://updated-config.json \
    --if-match $CURRENT_ETAG

echo -e "${GREEN}✅ CloudFront distribution update initiated${NC}"
echo -e "${YELLOW}⚠️  Note: CloudFront updates can take 15-20 minutes to propagate${NC}"

# Create cache invalidation
echo -e "${BLUE}📋 Step 5: Creating Cache Invalidation${NC}"
INVALIDATION_RESPONSE=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --output json)

INVALIDATION_ID=$(echo $INVALIDATION_RESPONSE | jq -r '.Invalidation.Id')
echo -e "${GREEN}✅ Created invalidation with ID: $INVALIDATION_ID${NC}"

# Cleanup
rm -f current-config.json updated-config.json

echo ""
echo -e "${GREEN}🎉 CloudFront custom domain update completed!${NC}"
echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Wait 15-20 minutes for CloudFront changes to propagate"
echo "2. Update your DNS records:"
echo "   - Remove A record: renotary.uk -> 216.137.34.96"
echo "   - Add CNAME record: renotary.uk -> d1k3kjeensb5dt.cloudfront.net"
echo "3. Test your custom domain: https://$CUSTOM_DOMAIN"
echo ""
echo -e "${YELLOW}📋 Important IDs to save:${NC}"
echo "   - Distribution ID: $DISTRIBUTION_ID"
echo "   - Invalidation ID: $INVALIDATION_ID"
echo "   - Certificate ARN: $CERTIFICATE_ARN"
