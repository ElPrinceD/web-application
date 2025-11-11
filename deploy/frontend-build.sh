#!/bin/bash
# Frontend Production Build Script
# Builds the React application with production environment variables

set -e

# Configuration
FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$FRONTEND_DIR/packages/web"
BUILD_DIR="$WEB_DIR/build"

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

# Check if .env.production exists
ENV_FILE="$WEB_DIR/.env.production"
if [ ! -f "$ENV_FILE" ]; then
    log_warn ".env.production not found. Creating from example..."
    if [ -f "$WEB_DIR/.env.production.example" ]; then
        cp "$WEB_DIR/.env.production.example" "$ENV_FILE"
        log_warn "Please update $ENV_FILE with your production values"
        log_warn "Especially REACT_APP_API_BASE_URL"
    else
        log_error ".env.production not found and no example file available"
        exit 1
    fi
fi

# Load environment variables
log_info "Loading environment variables from .env.production"
export $(cat "$ENV_FILE" | grep -v '^#' | xargs)

# Check if REACT_APP_API_BASE_URL is set
if [ -z "$REACT_APP_API_BASE_URL" ]; then
    log_error "REACT_APP_API_BASE_URL is not set in .env.production"
    log_info "Please set it to your backend URL (e.g., http://YOUR_EC2_IP:3000)"
    exit 1
fi

log_info "Building with API URL: $REACT_APP_API_BASE_URL"

# Navigate to web directory
cd "$WEB_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    log_info "Installing dependencies..."
    cd "$FRONTEND_DIR"
    yarn install
    cd "$WEB_DIR"
fi

# Clean previous build
if [ -d "$BUILD_DIR" ]; then
    log_info "Cleaning previous build..."
    rm -rf "$BUILD_DIR"
fi

# Build the application
log_info "Building React application..."
NODE_OPTIONS=--openssl-legacy-provider yarn build

if [ ! -d "$BUILD_DIR" ]; then
    log_error "Build failed - build directory not found"
    exit 1
fi

log_info "Build completed successfully!"
log_info "Build output: $BUILD_DIR"
log_info "Build size: $(du -sh "$BUILD_DIR" | cut -f1)"

# List build contents
log_info "Build contents:"
ls -lh "$BUILD_DIR" | head -10

