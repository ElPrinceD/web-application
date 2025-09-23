# Fix Custom Domain 403 Error - renotary.uk

## 🔍 **Problem Identified**

Your custom domain `renotary.uk` is currently pointing to an old AWS service (IP: 216.137.34.96) instead of your CloudFront distribution, causing the 403 error.

## 🛠️ **Solution Steps**

### Step 1: Validate SSL Certificate (Required First)

Your SSL certificate is pending validation. You need to add these DNS records to your domain:

#### DNS Records to Add:
```
Name: _1bad76a287b21dc91b023220d34c6220.renotary.uk
Type: CNAME
Value: _e96c0aae2632901ac6c8ed2c46fa899c.xlfgrmvvlj.acm-validations.aws.

Name: _d47984783bfc88440727b7e6fea7678c.www.renotary.uk
Type: CNAME
Value: _d5872a67aab1cf9e90c4e673a3ca103d.xlfgrmvvlj.acm-validations.aws.

Name: _a729a341e999cd0e4e35a15358e2d147.api.renotary.uk
Type: CNAME
Value: _8ef6ac1507df2fbb2f87d095297b3478.xlfgrmvvlj.acm-validations.aws.
```

### Step 2: Wait for Certificate Validation

After adding the DNS records, wait 5-10 minutes for AWS to validate the certificate.

### Step 3: Update CloudFront Distribution

Once the certificate is validated, run this command to add your custom domain:

```bash
# Get current distribution config
aws cloudfront get-distribution-config --id E2C9XXSE2FV9NQ > current-config.json

# Update with custom domain and SSL certificate
jq --arg domain "renotary.uk" --arg cert_arn "arn:aws:acm:us-east-1:445830509236:certificate/01402e55-1834-4f0d-b062-e330f56dca86" '
.DistributionConfig.Aliases.Quantity = 1 |
.DistributionConfig.Aliases.Items = [$domain] |
.DistributionConfig.ViewerCertificate.ACMCertificateArn = $cert_arn |
.DistributionConfig.ViewerCertificate.SSLSupportMethod = "sni-only" |
.DistributionConfig.ViewerCertificate.MinimumProtocolVersion = "TLSv1.2_2021" |
.DistributionConfig.ViewerCertificate.CertificateSource = "acm" |
del(.DistributionConfig.ViewerCertificate.CloudFrontDefaultCertificate)
' current-config.json > updated-config.json

# Apply the changes
aws cloudfront update-distribution --id E2C9XXSE2FV9NQ --distribution-config file://updated-config.json --if-match $(jq -r '.ETag' current-config.json)
```

### Step 4: Update DNS Records

After CloudFront is updated, change your DNS records:

#### Remove Current A Record:
```
Name: renotary.uk
Type: A
Value: 216.137.34.96 (DELETE THIS)
```

#### Add New CNAME Record:
```
Name: renotary.uk
Type: CNAME
Value: d1k3kjeensb5dt.cloudfront.net
```

#### Optional - Add www subdomain:
```
Name: www.renotary.uk
Type: CNAME
Value: d1k3kjeensb5dt.cloudfront.net
```

### Step 5: Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation --distribution-id E2C9XXSE2FV9NQ --paths "/*"
```

## 🚀 **Quick Fix Script**

I'll create an automated script to handle the CloudFront update once your certificate is validated.

## ⚠️ **Important Notes**

1. **Certificate Validation**: Must be completed before CloudFront can use the custom domain
2. **DNS Propagation**: DNS changes can take up to 48 hours to fully propagate
3. **CloudFront Deployment**: Distribution updates take 15-20 minutes
4. **Current Working URL**: `https://d1k3kjeensb5dt.cloudfront.net` (use this for testing)

## 🧪 **Testing Steps**

1. Test certificate validation: `aws acm describe-certificate --certificate-arn "arn:aws:acm:us-east-1:445830509236:certificate/01402e55-1834-4f0d-b062-e330f56dca86" --region us-east-1 --query "Certificate.Status"`
2. Test CloudFront: `curl -I https://d1k3kjeensb5dt.cloudfront.net`
3. Test custom domain: `curl -I https://renotary.uk` (after DNS changes)

## 📞 **Next Steps**

1. Add the DNS validation records to your domain
2. Wait for certificate validation
3. Run the CloudFront update script
4. Update your domain's DNS records
5. Test the custom domain
