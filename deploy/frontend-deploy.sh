#!/bin/bash
# Frontend Deployment Script
# Builds and deploys the React frontend to S3 and invalidates CloudFront cache

set -e

# Configuration
FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$FRONTEND_DIR/packages/web"
BUILD_DIR="$WEB_DIR/build"
BUCKET_NAME="${BUCKET_NAME:-renotary-frontend-production}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"
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

# Check if build exists
if [ ! -d "$BUILD_DIR" ]; then
    log_warn "Build directory not found. Building now..."
    "$(dirname "$0")/frontend-build.sh"
fi

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    log_error "AWS CLI is not installed"
    exit 1
fi

# Check if bucket exists
if ! aws s3 ls "s3://$BUCKET_NAME" &> /dev/null; then
    log_error "S3 bucket $BUCKET_NAME does not exist. Run s3-setup.sh first."
    exit 1
fi

log_info "Deploying to S3 bucket: $BUCKET_NAME"

# Sync build files to S3
log_info "Uploading files to S3..."
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" \
    --delete \
    --exact-timestamps \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "service-worker.js" \
    --exclude "manifest.json"

# Upload HTML files with no cache
log_info "Uploading HTML files..."
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" \
    --exact-timestamps \
    --cache-control "public, max-age=0, must-revalidate" \
    --include "*.html" \
    --include "service-worker.js" \
    --include "manifest.json"

# Invalidate CloudFront cache if distribution ID is provided
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    log_info "Invalidating CloudFront cache..."
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    log_info "CloudFront invalidation created: $INVALIDATION_ID"
    log_warn "Cache invalidation can take 5-15 minutes to complete"
else
    log_warn "CLOUDFRONT_DISTRIBUTION_ID not set. Skipping cache invalidation."
    log_info "Set it with: export CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id"
fi

# Get CloudFront URL if distribution ID is known
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
        --id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --query 'Distribution.DomainName' \
        --output text)
    log_info "=========================================="
    log_info "Deployment Complete!"
    log_info "=========================================="
    log_info "Frontend URL: https://$CLOUDFRONT_DOMAIN"
    log_info "S3 Bucket: $BUCKET_NAME"
else
    BUCKET_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
    log_info "=========================================="
    log_info "Deployment Complete!"
    log_info "=========================================="
    log_info "S3 Website URL: $BUCKET_URL"
    log_info "Set CLOUDFRONT_DISTRIBUTION_ID to enable CloudFront"
fi

