# 🚨 CRITICAL: Backend JWT Payload Fix - Missing appKey Field

## **Problem Identified**

The frontend debug shows:
```
❌ JWT appKey mismatch!
Expected: 1wYDJ1zZRmOBWTKs66QKmQ
Got: undefined
```

**Root Cause**: JWT payload is missing the `appKey` field required by Zoom SDK v4.0.7.

## **Current JWT Payload (INCORRECT)**
```json
{
  "sdkKey": "nvuqo_K5S0uOwyPSWCzRlA",
  "mn": "8649168895",
  "role": 0,
  "iat": 1760712314,
  "exp": 1760715914,
  "tokenExp": 1760715914,
  "video_webrtc_mode": 1
}
```

## **Required JWT Payload (CORRECT)**
```json
{
  "appKey": "nvuqo_K5S0uOwyPSWCzRlA",
  "sdkKey": "nvuqo_K5S0uOwyPSWCzRlA", 
  "mn": "8649168895",
  "role": 0,
  "iat": 1760712314,
  "exp": 1760715914,
  "tokenExp": 1760715914,
  "video_webrtc_mode": 1
}
```

## **Backend Code Fix Required**

### **Option 1: Add appKey field (Recommended)**
```php
// In your JWT payload generation
$payload = [
    'appKey' => $sdkKey,           // ADD THIS LINE
    'sdkKey' => $sdkKey,           // Keep existing
    'mn' => $meetingNumber,
    'role' => $role,
    'iat' => time(),
    'exp' => time() + 3600,        // 1 hour
    'tokenExp' => time() + 3600,   // 1 hour
    'video_webrtc_mode' => 1
];
```

### **Option 2: Replace sdkKey with appKey**
```php
// In your JWT payload generation
$payload = [
    'appKey' => $sdkKey,           // Use appKey instead of sdkKey
    'mn' => $meetingNumber,
    'role' => $role,
    'iat' => time(),
    'exp' => time() + 3600,        // 1 hour
    'tokenExp' => time() + 3600,   // 1 hour
    'video_webrtc_mode' => 1
];
```

## **Why This Fix is Required**

1. **Zoom SDK v4.0.7 Requirement**: The SDK expects `appKey` field in JWT payload
2. **Frontend Validation**: The debug code checks for `payload.appKey === this.state.sdkKey`
3. **Official Documentation**: Zoom docs specify `appKey` field for v4.0.0+

## **Test After Fix**

After implementing the backend fix:

1. **Generate new JWT signature** with `appKey` field
2. **Test meeting join** - should see:
   ```
   ✅ JWT appKey match: true
   ✅ JWT meeting number match: true
   ✅ JWT role correct: true
   ```
3. **Meeting should join successfully**

## **Verification Commands**

Test the JWT payload after fix:
```bash
# Decode the JWT payload to verify appKey is present
echo "eyJhbGciOiJIUzI1NiJ9.eyJzZGtLZXkiOiJudnVxb19LNVMwdU93eVBTV0N6UmxBIiwibW4iOiI4NjQ5MTY4ODk1Iiwicm9sZSI6MCwiaWF0IjoxNzYwNzEyMzE0LCJleHAiOjE3NjA3MTU5MTQsInRva2VuRXhwIjoxNzYwNzE1OTE0LCJ2aWRlb193ZWJydGNfbW9kZSI6MX0.4RAHjymx_o8bn7E1zcsqB-taP1WVU-F0dOHpTbBsfiI" | cut -d'.' -f2 | base64 -d | jq .
```

Should show:
```json
{
  "appKey": "nvuqo_K5S0uOwyPSWCzRlA",
  "sdkKey": "nvuqo_K5S0uOwyPSWCzRlA",
  "mn": "8649168895",
  "role": 0,
  "iat": 1760712314,
  "exp": 1760715914,
  "tokenExp": 1760715914,
  "video_webrtc_mode": 1
}
```

## **Priority: HIGH**

This is the **root cause** of the "failed to join meeting" error. Once the backend adds the `appKey` field, the meeting join should work immediately.

**Expected Result**: Meeting join success with no more JWT validation errors.
