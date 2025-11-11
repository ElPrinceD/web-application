#!/bin/bash
# Frontend Deployment Script for EC2
# Deploys the React frontend build to the same EC2 instance as the backend

set -e

# Configuration
EC2_HOST="${EC2_HOST:-44.212.244.253}"
EC2_USER="${EC2_USER:-ubuntu}"
FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$FRONTEND_DIR/packages/web"
BUILD_DIR="$WEB_DIR/build"
FRONTEND_APP_DIR="/home/ubuntu/frontend"
KEY_FILE="${KEY_FILE:-$HOME/.ssh/renotary-deploy-key-*.pem}"

# Find the key file
KEY_FILE=$(ls -1 $KEY_FILE 2>/dev/null | head -1)

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
    log_error "Build directory not found: $BUILD_DIR"
    log_info "Please run the build first: cd $WEB_DIR && yarn build"
    exit 1
fi

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    log_error "SSH key file not found: $KEY_FILE"
    exit 1
fi

log_info "Deploying frontend to EC2: $EC2_HOST"
log_info "Build directory: $BUILD_DIR"
log_info "Target directory: $FRONTEND_APP_DIR"

# Create frontend directory on EC2
log_info "Creating frontend directory on EC2..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    "$EC2_USER@$EC2_HOST" "sudo mkdir -p $FRONTEND_APP_DIR && sudo chown -R ubuntu:ubuntu $FRONTEND_APP_DIR"

# Create a tarball of the build
log_info "Creating deployment archive..."
TEMP_DIR=$(mktemp -d)
ARCHIVE="$TEMP_DIR/frontend-build.tar.gz"
cd "$BUILD_DIR"
tar czf "$ARCHIVE" .

# Upload the archive
log_info "Uploading frontend build to EC2..."
scp -i "$KEY_FILE" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    "$ARCHIVE" "$EC2_USER@$EC2_HOST:/tmp/frontend-build.tar.gz"

# Extract and deploy on EC2
log_info "Extracting and deploying on EC2..."
ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \
    "$EC2_USER@$EC2_HOST" << 'ENDSSH'
    cd /home/ubuntu/frontend
    rm -rf *
    tar xzf /tmp/frontend-build.tar.gz
    rm /tmp/frontend-build.tar.gz
    echo "Frontend files deployed successfully"
ENDSSH

# Clean up
rm -rf "$TEMP_DIR"

log_info "Frontend deployment complete!"
log_info "Frontend files are in: $FRONTEND_APP_DIR"
log_info "Next: Configure Nginx to serve the frontend"

