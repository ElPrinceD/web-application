# Backend JWT Payload Fix - Include Both appKey and sdkKey

## 🚨 **Issue Identified**

The JWT payload is missing the `sdkKey` field. According to the official Zoom documentation, for cross-platform compatibility, the JWT should include **both** `appKey` and `sdkKey`.

## ❌ **Current JWT Payload (INCOMPLETE)**
```json
{
  "appKey": "1wYDJ1zZRmOBWTKs66QKmQ",
  "mn": 87634853384,
  "role": 0,
  "iat": 1760699800,
  "exp": 1760701600,
  "tokenExp": 1760701600
}
```

## ✅ **Correct JWT Payload (COMPLETE)**
```json
{
  "appKey": "1wYDJ1zZRmOBWTKs66QKmQ",
  "sdkKey": "1wYDJ1zZRmOBWTKs66QKmQ",  // ✅ Add this field
  "mn": 87634853384,
  "role": 0,
  "iat": 1760699800,
  "exp": 1760701600,
  "tokenExp": 1760701600
}
```

## 🔧 **Backend Code Fix**

**Current (INCOMPLETE):**
```ruby
payload = {
  appKey: sdk_key,        # ✅ Keep this
  mn: meeting_number,
  role: 0,
  iat: Time.now.to_i,
  exp: Time.now.to_i + 1800,  # 30 minutes
  tokenExp: Time.now.to_i + 1800
}
```

**Should be (COMPLETE):**
```ruby
payload = {
  appKey: sdk_key,        # ✅ Keep this
  sdkKey: sdk_key,        # ✅ Add this field
  mn: meeting_number,
  role: 0,
  iat: Time.now.to_i,
  exp: Time.now.to_i + 1800,  # 30 minutes
  tokenExp: Time.now.to_i + 1800
}
```

## 📋 **Why This Fixes the Issue**

1. **Official Zoom Documentation** states: "include the appKey, sdkKey, exp, tokenExp, mn, and role properties"
2. **Cross-platform compatibility** requires both fields
3. **Web SDK v4.0.7** expects both `appKey` and `sdkKey` for proper validation
4. **Values are the same** - both should contain the SDK key value

## 🚀 **Implementation Steps**

1. **Update backend JWT generation** to include both `appKey` and `sdkKey`
2. **Test with new JWT** (should be slightly longer)
3. **Verify frontend logs** show both fields in decoded payload
4. **Meeting join should succeed**

## 🔍 **Verification**

After the fix, the frontend diagnostic logs should show:
```
🔍 JWT Payload decoded: {
  "appKey": "1wYDJ1zZRmOBWTKs66QKmQ",
  "sdkKey": "1wYDJ1zZRmOBWTKs66QKmQ",
  "mn": 87634853384,
  "role": 0,
  "iat": 1760699800,
  "exp": 1760701600,
  "tokenExp": 1760701600
}
```

**Both `appKey` and `sdkKey` fields should be present!**

## 📞 **Next Steps**

1. Backend team adds `sdkKey: sdk_key` to JWT payload
2. Test meeting join again
3. Should resolve "Signature is invalid" error
4. Meeting should join successfully

This follows the official Zoom documentation exactly! 🎉
