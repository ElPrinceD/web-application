# Backend JWT Payload Fix - Remove appKey

## 🚨 **Issue Identified**

The JWT payload contains both `appKey` and `sdkKey`, but Zoom SDK v4.0.0+ expects **ONLY** `sdkKey`.

## ❌ **Current JWT Payload (INCORRECT)**
```json
{
  "appKey": "1wYDJ1zZRmOBWTKs66QKmQ",  // ❌ Remove this
  "sdkKey": "1wYDJ1zZRmOBWTKs66QKmQ",  // ✅ Keep this
  "mn": 87634853384,
  "role": 0,
  "iat": 1760695893,
  "exp": 1760695953,
  "tokenExp": 1760695953
}
```

## ✅ **Correct JWT Payload (FIXED)**
```json
{
  "sdkKey": "1wYDJ1zZRmOBWTKs66QKmQ",  // ✅ Only this
  "mn": 87634853384,
  "role": 0,
  "iat": 1760695893,
  "exp": 1760695953,
  "tokenExp": 1760695953
}
```

## 🔧 **Backend Code Fix**

**Before (INCORRECT):**
```ruby
payload = {
  appKey: sdk_key,        # ❌ Remove this line
  sdkKey: sdk_key,        # ✅ Keep this
  mn: meeting_number,
  role: 0,
  iat: Time.now.to_i,
  exp: Time.now.to_i + 60,
  tokenExp: Time.now.to_i + 60
}
```

**After (CORRECT):**
```ruby
payload = {
  sdkKey: sdk_key,        # ✅ Only this
  mn: meeting_number,
  role: 0,
  iat: Time.now.to_i,
  exp: Time.now.to_i + 60,
  tokenExp: Time.now.to_i + 60
}
```

## 📋 **Why This Fixes the Issue**

1. **Zoom SDK v4.0.0+** expects only `sdkKey` in JWT payload
2. **`appKey` is deprecated** since v4.0.0
3. **Having both fields** confuses the SDK validation
4. **Error 3712 "Signature is invalid"** occurs when JWT contains unexpected fields

## 🚀 **Implementation Steps**

1. **Update backend JWT generation** to remove `appKey`
2. **Test with new JWT** (should be shorter)
3. **Verify frontend logs** show no `appKey` in decoded payload
4. **Meeting join should succeed**

## 🔍 **Verification**

After the fix, the frontend diagnostic logs should show:
```
🔍 JWT Payload decoded: {
  "sdkKey": "1wYDJ1zZRmOBWTKs66QKmQ",
  "mn": 87634853384,
  "role": 0,
  "iat": 1760695893,
  "exp": 1760695953,
  "tokenExp": 1760695953
}
```

**No `appKey` field should be present!**

## 📞 **Next Steps**

1. Backend team removes `appKey` from JWT payload
2. Test meeting join again
3. Should resolve "Signature is invalid" error
4. Meeting should join successfully

This is a simple one-line fix in the backend JWT generation! 🎉
