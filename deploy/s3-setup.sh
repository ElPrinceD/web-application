#!/bin/bash
# S3 Bucket Setup Script for Frontend Static Hosting
# Creates and configures an S3 bucket for static website hosting

set -e

# Configuration - Update these values
BUCKET_NAME="${BUCKET_NAME:-renotary-frontend-production}"
REGION="${AWS_REGION:-us-east-1}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    log_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    log_error "AWS credentials not configured. Please run 'aws configure'"
    exit 1
fi

log_info "Setting up S3 bucket: $BUCKET_NAME"

# Check if bucket already exists
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    log_info "Creating S3 bucket..."
    if [ "$REGION" == "us-east-1" ]; then
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
    else
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" --create-bucket-configuration LocationConstraint="$REGION"
    fi
else
    log_warn "Bucket $BUCKET_NAME already exists"
fi

# Enable static website hosting
log_info "Configuring static website hosting..."
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html

# Set bucket policy for public read access
log_info "Setting bucket policy..."
POLICY_FILE="$(dirname "$0")/s3-bucket-policy.json"
TEMP_POLICY=$(mktemp)
sed "s/YOUR_BUCKET_NAME/$BUCKET_NAME/g" "$POLICY_FILE" > "$TEMP_POLICY"
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy "file://$TEMP_POLICY"
rm "$TEMP_POLICY"

# Block public access settings (allow public read for static hosting)
log_info "Configuring public access settings..."
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Set CORS configuration
log_info "Setting CORS configuration..."
CORS_CONFIG='{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}'
echo "$CORS_CONFIG" > /tmp/cors.json
aws s3api put-bucket-cors --bucket "$BUCKET_NAME" --cors-configuration file:///tmp/cors.json
rm /tmp/cors.json

# Get website endpoint
WEBSITE_ENDPOINT=$(aws s3api get-bucket-website --bucket "$BUCKET_NAME" --query 'WebsiteConfiguration' --output json 2>/dev/null || echo "")
BUCKET_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

log_info "=========================================="
log_info "S3 Bucket Setup Complete!"
log_info "=========================================="
log_info "Bucket Name: $BUCKET_NAME"
log_info "Region: $REGION"
log_info "Website URL: $BUCKET_URL"
log_info ""
log_info "Next steps:"
log_info "1. Build your frontend: ./deploy/frontend-build.sh"
log_info "2. Deploy to S3: ./deploy/frontend-deploy.sh"

