#!/bin/bash
# Quick Deploy - Frontend Notary Requests Fix
# Run this script to deploy the frontend fix

set -e

EC2_HOST="44.212.244.253"
EC2_USER="ubuntu"
FRONTEND_DIR="/home/ubuntu/frontend"
BUILD_DIR="/Users/michaela/Documents/renotary/web-application/packages/web/build"

echo "🚀 Deploying Frontend Fix..."
echo ""

# Check if build exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build directory not found. Building first..."
    cd /Users/michaela/Documents/renotary/web-application/packages/web
    npm run build
fi

# Create tar archive
echo "📦 Creating deployment package..."
cd "$BUILD_DIR"
tar -czf /tmp/frontend-build.tar.gz .
echo "✓ Package created: /tmp/frontend-build.tar.gz"
echo ""

# Copy to server
echo "📤 Copying to EC2 server..."
echo "   (You may be prompted for SSH password or key passphrase)"
scp -o StrictHostKeyChecking=no /tmp/frontend-build.tar.gz "$EC2_USER@$EC2_HOST:/tmp/"

# Deploy on server
echo "🔧 Deploying on server..."
ssh -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" << 'ENDSSH'
set -e
FRONTEND_DIR="/home/ubuntu/frontend"

echo "1. Creating backup..."
if [ -d "$FRONTEND_DIR" ]; then
    sudo cp -r "$FRONTEND_DIR" "${FRONTEND_DIR}.backup.$(date +%Y%m%d-%H%M%S)"
    echo "   ✓ Backup created"
fi

echo "2. Preparing directory..."
sudo mkdir -p "$FRONTEND_DIR"
sudo rm -rf "$FRONTEND_DIR"/*
sudo chown ubuntu:ubuntu "$FRONTEND_DIR"
echo "   ✓ Directory ready"

echo "3. Extracting files..."
cd /tmp
sudo tar -xzf frontend-build.tar.gz -C "$FRONTEND_DIR"
sudo chown -R ubuntu:ubuntu "$FRONTEND_DIR"
rm -f frontend-build.tar.gz
echo "   ✓ Files extracted"

echo "4. Verifying..."
if [ -f "$FRONTEND_DIR/index.html" ]; then
    FILE_COUNT=$(find "$FRONTEND_DIR" -type f | wc -l)
    echo "   ✓ index.html found"
    echo "   ✓ $FILE_COUNT files deployed"
    echo ""
    echo "✅ Deployment successful!"
else
    echo "   ❌ Deployment failed - index.html not found"
    exit 1
fi
ENDSSH

echo ""
echo "✅ Frontend deployment complete!"
echo ""
echo "Next steps:"
echo "  1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)"
echo "  2. Hard refresh (Ctrl+F5 or Cmd+Shift+R)"
echo "  3. Login as notary and verify requests are displaying"
echo ""

