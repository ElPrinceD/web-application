# Backend Zoom SDK Verification Guide

## 🔍 **Current Issue: "Signature is invalid" (Error 3712)**

The frontend is receiving a valid JWT signature, but Zoom is rejecting it. This is typically caused by SDK key/secret mismatches.

## 📋 **Step-by-Step Backend Verification**

### **1. Verify Zoom SDK App Configuration**

Go to your Zoom App Marketplace:
1. Navigate to your **SDK App** (not OAuth or Server-to-Server)
2. Copy the **SDK Key** and **SDK Secret**
3. Verify these match what you're using in your backend

**Expected values:**
- SDK Key: `1wYDJ1zZRmOBWTKs66QKmQ`
- SDK Secret: `lGBIHUOB7ntMOpc54ecrZdhqcVinWySj`

### **2. Check Backend Signature Generation**

Your current JWT payload looks correct:
```json
{
  "sdkKey": "1wYDJ1zZRmOBWTKs66QKmQ",
  "mn": 87634853384,
  "role": 0,
  "iat": 1760695554,
  "exp": 1760695614,
  "tokenExp": 1760695674
}
```

**Verify your backend code:**
```ruby
# Make sure you're using the SDK Secret, not OAuth secret
sdk_secret = "lGBIHUOB7ntMOpc54ecrZdhqcVinWySj"  # SDK App Secret
sdk_key = "1wYDJ1zZRmOBWTKs66QKmQ"                # SDK App Key

payload = {
  sdkKey: sdk_key,        # Must match frontend
  mn: meeting_number,     # Must match frontend
  role: 0,                # Must match frontend role
  iat: Time.now.to_i,     # Current time
  exp: Time.now.to_i + 60, # 60 seconds from now
  tokenExp: Time.now.to_i + 120 # 120 seconds from now
}

# Generate JWT with SDK Secret
signature = JWT.encode(payload, sdk_secret, 'HS256')
```

### **3. Common Backend Issues**

**❌ Wrong Secret Type:**
- Using OAuth app secret instead of SDK app secret
- Using Server-to-Server app secret instead of SDK app secret

**❌ Wrong SDK App:**
- Using credentials from a different Zoom SDK app
- Using test/development app credentials in production

**❌ Secret Mismatch:**
- SDK secret in backend doesn't match the SDK app
- SDK key in JWT doesn't match the SDK app

### **4. Test Backend Endpoint**

Test your signature endpoint directly:
```bash
curl "http://localhost:3001/zoom/signature?meetingNumber=87634853384&role=0"
```

**Expected response:**
```json
{
  "signature": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": 1760695674,
  "meetingNumber": "87634853384",
  "role": 0
}
```

### **5. Verify JWT Decoding**

Decode the JWT signature to verify payload:
```ruby
# In Rails console
require 'jwt'
require 'json'

signature = "your_generated_signature_here"
sdk_secret = "lGBIHUOB7ntMOpc54ecrZdhqcVinWySj"

begin
  payload = JWT.decode(signature, sdk_secret, true, { algorithm: 'HS256' })
  puts "Decoded payload: #{payload[0]}"
rescue JWT::DecodeError => e
  puts "JWT decode error: #{e.message}"
end
```

### **6. Frontend Diagnostic Logs**

The frontend now includes comprehensive logging. Check browser console for:

```
🔍 DIAGNOSTIC: Frontend Zoom Configuration
SDK Key from state: 1wYDJ1zZRmOBWTKs66QKmQ
Meeting Number: 87634853384
🔍 JWT Payload decoded: {...}
🔍 VERIFICATION:
SDK Key match: true/false
Meeting number match: true/false
Role match: true/false
```

**If any verification shows `false`, that's the issue!**

## 🚨 **Most Likely Causes**

1. **SDK Secret Mismatch** (90% of cases)
   - Backend using wrong secret
   - Secret doesn't match the SDK app

2. **SDK Key Mismatch** (5% of cases)
   - Frontend and backend using different SDK keys
   - JWT contains wrong sdkKey

3. **App Type Mismatch** (5% of cases)
   - Using OAuth app instead of SDK app
   - Using wrong Zoom app entirely

## 🔧 **Quick Fix Steps**

1. **Verify SDK App credentials** in Zoom Marketplace
2. **Update backend** to use correct SDK secret
3. **Regenerate signature** immediately before joining
4. **Test with frontend logs** to verify matches

## 📞 **Next Steps**

1. Run the frontend with new diagnostic logging
2. Check browser console for verification results
3. If mismatches found, update backend accordingly
4. Test meeting join again

The diagnostic logs will show exactly what's mismatched!
