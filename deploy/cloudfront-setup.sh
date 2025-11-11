#!/bin/bash
# CloudFront Distribution Setup Script
# Creates a CloudFront distribution for the frontend

set -e

# Configuration
BUCKET_NAME="${BUCKET_NAME:-renotary-frontend-production}"
REGION="${AWS_REGION:-us-east-1}"
DISTRIBUTION_CONFIG="$(dirname "$0")/cloudfront-config.json"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    log_error "AWS CLI is not installed"
    exit 1
fi

# Check if bucket exists
if ! aws s3 ls "s3://$BUCKET_NAME" &> /dev/null; then
    log_error "S3 bucket $BUCKET_NAME does not exist. Run s3-setup.sh first."
    exit 1
fi

log_info "Creating CloudFront distribution for bucket: $BUCKET_NAME"

# Prepare distribution config
TEMP_CONFIG=$(mktemp)
sed "s/YOUR_BUCKET_NAME/$BUCKET_NAME/g" "$DISTRIBUTION_CONFIG" > "$TEMP_CONFIG"
sed -i "s/renotary-frontend-.*/renotary-frontend-$(date +%s)/g" "$TEMP_CONFIG"

# Create distribution
log_info "Creating CloudFront distribution..."
DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution --distribution-config "file://$TEMP_CONFIG")
DISTRIBUTION_ID=$(echo "$DISTRIBUTION_OUTPUT" | jq -r '.Distribution.Id')
DISTRIBUTION_DOMAIN=$(echo "$DISTRIBUTION_OUTPUT" | jq -r '.Distribution.DomainName')

rm "$TEMP_CONFIG"

log_info "=========================================="
log_info "CloudFront Distribution Created!"
log_info "=========================================="
log_info "Distribution ID: $DISTRIBUTION_ID"
log_info "Distribution Domain: $DISTRIBUTION_DOMAIN"
log_info "CloudFront URL: https://$DISTRIBUTION_DOMAIN"
log_info ""
log_warn "Note: Distribution creation can take 15-20 minutes to complete"
log_warn "Check status with: aws cloudfront get-distribution --id $DISTRIBUTION_ID"
log_info ""
log_info "Once DNS is configured, point your domain to: $DISTRIBUTION_DOMAIN"
log_info "Save this information for DNS_SETUP_GUIDE.md"

