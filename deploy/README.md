# Frontend Deployment Scripts

This directory contains all scripts and configuration files for deploying the React frontend to S3 and CloudFront.

## Files

### Build Scripts

- **`frontend-build.sh`** - Builds the React application for production with environment variables injected.

### Deployment Scripts

- **`s3-setup.sh`** - Creates and configures S3 bucket for static website hosting.

- **`cloudfront-setup.sh`** - Creates CloudFront distribution for the frontend CDN.

- **`frontend-deploy.sh`** - Builds and deploys frontend to S3, then invalidates CloudFront cache.

### Configuration Files

- **`s3-bucket-policy.json`** - S3 bucket policy template for public read access.

- **`cloudfront-config.json`** - CloudFront distribution configuration template.

- **`.env.production.example`** - Template for frontend production environment variables (in `packages/web/`).

## Quick Start

1. **Configure environment:**
   ```bash
   cd packages/web
   cp .env.production.example .env.production
   nano .env.production
   # Set REACT_APP_API_BASE_URL to your backend URL
   ```

2. **Set up S3 bucket:**
   ```bash
   export BUCKET_NAME=renotary-frontend-production
   ./deploy/s3-setup.sh
   ```

3. **Create CloudFront distribution:**
   ```bash
   export BUCKET_NAME=renotary-frontend-production
   ./deploy/cloudfront-setup.sh
   # Note the Distribution ID and Domain Name
   ```

4. **Build and deploy:**
   ```bash
   export BUCKET_NAME=renotary-frontend-production
   export CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
   ./deploy/frontend-build.sh
   ./deploy/frontend-deploy.sh
   ```

## Environment Variables

Required environment variables (set in `packages/web/.env.production`):

- `REACT_APP_API_BASE_URL` - Backend API URL (use Elastic IP initially, domain after DNS)

Optional:
- `REACT_APP_GOOGLE_CLIENT_ID` - For Google OAuth
- `REACT_APP_ZOOM_SDK_KEY` - For Zoom integration

## See Also

- `../../back-end/DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `../../back-end/DNS_SETUP_GUIDE.md` - DNS configuration guide

