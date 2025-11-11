#!/bin/bash
# Deploy Frontend Notary Requests Fix
# This script builds and deploys the frontend fix to EC2

set -e

# Configuration
EC2_HOST="44.212.244.253"
EC2_USER="ubuntu"
FRONTEND_DIR="/home/ubuntu/frontend"
LOCAL_BUILD_DIR="/Users/michaela/Documents/renotary/web-application/packages/web/build"
SSH_KEY="${SSH_KEY:-}" # Path to your SSH key, e.g., ~/.ssh/your-key.pem

# Colors for output
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

# Check if build directory exists
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    log_error "Build directory not found: $LOCAL_BUILD_DIR"
    log_info "Building frontend..."
    cd /Users/michaela/Documents/renotary/web-application/packages/web
    npm run build
    if [ ! -d "$LOCAL_BUILD_DIR" ]; then
        log_error "Build failed or build directory still not found"
        exit 1
    fi
fi

# Check if EC2_HOST is set
if [ -z "$EC2_HOST" ]; then
    log_error "EC2_HOST is not set. Please set it in the script or as an environment variable."
    exit 1
fi

# Check if SSH key is available
SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
if [ -n "$SSH_KEY" ]; then
    if [ ! -f "$SSH_KEY" ]; then
        log_error "SSH key file not found: $SSH_KEY"
        exit 1
    fi
    SSH_OPTS="$SSH_OPTS -i $SSH_KEY"
    log_info "Using SSH key: $SSH_KEY"
else
    log_warn "No SSH_KEY environment variable set. Attempting with default SSH keys."
fi

log_info "Deploying frontend fix to EC2: $EC2_HOST"

# Backup existing frontend
log_info "Backing up existing frontend..."
ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" << ENDSSH
set -e
if [ -d "$FRONTEND_DIR" ]; then
    sudo cp -r "$FRONTEND_DIR" "${FRONTEND_DIR}.backup.$(date +%Y%m%d-%H%M%S)"
    echo "✓ Backup created"
else
    echo "⚠ Frontend directory does not exist, will be created"
    sudo mkdir -p "$FRONTEND_DIR"
    sudo chown ubuntu:ubuntu "$FRONTEND_DIR"
fi
ENDSSH

# Copy build files to server
log_info "Copying build files to server..."
scp $SSH_OPTS -r "$LOCAL_BUILD_DIR"/* "$EC2_USER@$EC2_HOST:/tmp/frontend-build/"

# Deploy on remote server
log_info "Deploying on EC2..."
ssh $SSH_OPTS "$EC2_USER@$EC2_HOST" << ENDSSH
set -e

echo "1. Creating frontend directory if it doesn't exist..."
sudo mkdir -p "$FRONTEND_DIR"
sudo chown ubuntu:ubuntu "$FRONTEND_DIR"
echo "   ✓ Directory ready"

echo "2. Removing old files..."
sudo rm -rf "$FRONTEND_DIR"/*
echo "   ✓ Old files removed"

echo "3. Copying new build files..."
sudo cp -r /tmp/frontend-build/* "$FRONTEND_DIR/"
sudo chown -R ubuntu:ubuntu "$FRONTEND_DIR"
echo "   ✓ Files copied"

echo "4. Cleaning up temporary files..."
rm -rf /tmp/frontend-build
echo "   ✓ Cleanup complete"

echo "5. Verifying deployment..."
if [ -f "$FRONTEND_DIR/index.html" ]; then
    echo "   ✓ index.html found"
    FILE_COUNT=\$(find "$FRONTEND_DIR" -type f | wc -l)
    echo "   ✓ Found \$FILE_COUNT files"
else
    echo "   ❌ index.html not found - deployment may have failed"
    exit 1
fi

echo ""
echo "✅ Deployment successful!"
echo ""
echo "Frontend files have been deployed to: $FRONTEND_DIR"
echo "Nginx should automatically serve the new files."
echo ""
echo "To verify, visit: http://$EC2_HOST"
echo ""
echo "If you need to restart Nginx:"
echo "  sudo systemctl restart nginx"

ENDSSH

log_info ""
log_info "✅ Frontend deployment complete!"
log_info ""
log_info "The notary requests display fix has been deployed."
log_info "Please:"
log_info "  1. Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)"
log_info "  2. Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)"
log_info "  3. Login as a notary and verify requests are displaying correctly"
log_info ""
log_info "If issues persist, check browser console for errors."

