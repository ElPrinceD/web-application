# CloudFront 403 Error Troubleshooting Guide

## Issues Identified and Solutions

### 1. **S3 Origin Configuration Issue** ⚠️ CRITICAL

**Problem**: Your CloudFront is configured to use the S3 website endpoint (`s3-website-us-east-1.amazonaws.com`) but with `CustomOriginConfig` instead of `S3OriginConfig`.

**Solution**: 
- Change the origin domain to the standard S3 bucket endpoint: `zoomnotary-frontend-production.s3.amazonaws.com`
- Use `S3OriginConfig` instead of `CustomOriginConfig`
- Configure Origin Access Control (OAC) for secure access

### 2. **Missing Origin Access Control (OAC)** ⚠️ CRITICAL

**Problem**: No OAC is configured (`"OriginAccessControlId": ""`), which is required for modern S3 + CloudFront setups.

**Solution**: Create an OAC and update the configuration.

### 3. **Custom Domain Not Configured** ⚠️ HIGH

**Problem**: CloudFront shows no aliases configured, but you mentioned linking to a custom domain.

**Solution**: Add your custom domain to the CloudFront distribution.

### 4. **SSL Certificate Configuration** ⚠️ HIGH

**Problem**: Using CloudFront default certificate instead of ACM certificate for custom domain.

**Solution**: Configure ACM certificate for your custom domain.

## Step-by-Step Fix Instructions

### Step 1: Create Origin Access Control (OAC)

```bash
# Create OAC
aws cloudfront create-origin-access-control \
    --origin-access-control-config Name=zoomnotary-oac,Description="OAC for ZoomNotary S3 bucket",SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3
```

### Step 2: Update S3 Bucket Policy

Replace your current bucket policy with the fixed version that allows CloudFront OAC access:

```json
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
            "Resource": "arn:aws:s3:::zoomnotary-frontend-production/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
                }
            }
        }
    ]
}
```

### Step 3: Update CloudFront Distribution

Use the fixed configuration file with these key changes:

1. **Origin Domain**: `zoomnotary-frontend-production.s3.amazonaws.com`
2. **Origin Type**: `S3OriginConfig` instead of `CustomOriginConfig`
3. **OAC ID**: Add the OAC ID from Step 1
4. **Custom Domain**: Add your domain to aliases
5. **SSL Certificate**: Configure ACM certificate ARN

### Step 4: Configure Custom Domain

1. **Request SSL Certificate** in AWS Certificate Manager (ACM) for your domain
2. **Add CNAME record** in your DNS pointing to CloudFront distribution
3. **Update CloudFront** with the certificate ARN and domain alias

### Step 5: Test and Validate

1. **Test S3 direct access**: `https://zoomnotary-frontend-production.s3.amazonaws.com/index.html`
2. **Test CloudFront**: `https://YOUR_DISTRIBUTION_ID.cloudfront.net`
3. **Test custom domain**: `https://your-custom-domain.com`
4. **Invalidate cache**: `aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"`

## Quick Fix Commands

```bash
# 1. Get current distribution config
aws cloudfront get-distribution-config --id YOUR_DISTRIBUTION_ID > current-config.json

# 2. Create OAC
aws cloudfront create-origin-access-control \
    --origin-access-control-config Name=zoomnotary-oac,Description="OAC for ZoomNotary",SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3

# 3. Update bucket policy
aws s3api put-bucket-policy --bucket zoomnotary-frontend-production --policy file://fixed-bucket-policy.json

# 4. Update CloudFront distribution
aws cloudfront update-distribution --id YOUR_DISTRIBUTION_ID --distribution-config file://fixed-cloudfront-config.json --if-match CURRENT_ETAG

# 5. Invalidate cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Common 403 Error Causes

1. **Wrong origin type**: Using website endpoint with CustomOriginConfig
2. **Missing OAC**: No Origin Access Control configured
3. **Incorrect bucket policy**: Not allowing CloudFront access
4. **Block public access**: S3 bucket blocking all public access
5. **Missing files**: index.html not present in S3 bucket root
6. **Cache issues**: Old cached 403 responses

## Verification Checklist

- [ ] S3 bucket has correct OAC-based policy
- [ ] CloudFront uses S3OriginConfig (not CustomOriginConfig)
- [ ] Origin Access Control is configured
- [ ] Custom domain is added to CloudFront aliases
- [ ] SSL certificate is configured for custom domain
- [ ] DNS CNAME points to CloudFront distribution
- [ ] index.html exists in S3 bucket root
- [ ] CloudFront cache has been invalidated
- [ ] S3 bucket public access is properly configured

## Expected Results

After implementing these fixes:
- ✅ Direct S3 access should work
- ✅ CloudFront distribution should serve content
- ✅ Custom domain should load without 403 errors
- ✅ HTTPS should work with proper SSL certificate
