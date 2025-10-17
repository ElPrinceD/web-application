# Backend JWT Payload Fix - Use appKey Instead of sdkKey

## 🚨 **New Issue Identified**

The SDK error message indicates:
```
we require appKey in signature since v5.0.0. please check your signature and add appKey.
```

This suggests the JWT payload should use `appKey` instead of `sdkKey`.

## ❌ **Current JWT Payload (INCORRECT)**
```json
{
  "sdkKey": "1wYDJ1zZRmOBWTKs66QKmQ",  // ❌ Wrong field name
  "mn": 87634853384,
  "role": 0,
  "iat": 1760698030,
  "exp": 1760698090,
  "tokenExp": 1760698090
}
```

## ✅ **Correct JWT Payload (FIXED)**
```json
{
  "appKey": "1wYDJ1zZRmOBWTKs66QKmQ",  // ✅ Use appKey instead
  "mn": 87634853384,
  "role": 0,
  "iat": 1760698030,
  "exp": 1760698090,
  "tokenExp": 1760698090
}
```

## 🔧 **Backend Code Fix**

**Current (INCORRECT):**
```ruby
payload = {
  sdkKey: sdk_key,        # ❌ Change this to appKey
  mn: meeting_number,
  role: 0,
  iat: Time.now.to_i,
  exp: Time.now.to_i + 60,
  tokenExp: Time.now.to_i + 60
}
```

**Should be (CORRECT):**
```ruby
payload = {
  appKey: sdk_key,        # ✅ Use appKey instead of sdkKey
  mn: meeting_number,
  role: 0,
  iat: Time.now.to_i,
  exp: Time.now.to_i + 60,
  tokenExp: Time.now.to_i + 60
}
```

## 📋 **Why This Fixes the Issue**

1. **SDK v4.0.7** expects `appKey` in JWT payload (not `sdkKey`)
2. **Error message** clearly states "we require appKey in signature"
3. **Field name mismatch** is causing the validation failure
4. **Same value, different field name** - just change `sdkKey` to `appKey`

## 🚀 **Implementation Steps**

1. **Update backend JWT generation** to use `appKey` instead of `sdkKey`
2. **Test with new JWT** (should work immediately)
3. **Verify frontend logs** show `appKey` in decoded payload
4. **Meeting join should succeed**

## 🔍 **Verification**

After the fix, the frontend diagnostic logs should show:
```
🔍 JWT Payload decoded: {
  "appKey": "1wYDJ1zZRmOBWTKs66QKmQ",
  "mn": 87634853384,
  "role": 0,
  "iat": 1760698030,
  "exp": 1760698090,
  "tokenExp": 1760698090
}
```

**Field name should be `appKey`, not `sdkKey`!**

## 📞 **Next Steps**

1. Backend team changes `sdkKey` to `appKey` in JWT payload
2. Test meeting join again
3. Should resolve the "appKey required" error
4. Meeting should join successfully

This is a simple field name change in the backend JWT generation! 🎉
