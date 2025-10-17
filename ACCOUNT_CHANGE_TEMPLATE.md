# Zoom Account Change Template

## 🔄 **Account Change Checklist**

### **1. New Account Credentials**
- **SDK Key**: `nvuqo_K5S0uOwyPSWCzRlA`
- **SDK Secret**: `LF7rh4F3n3mk7jS9xqWBFppg4j1GyySC`
- **Account Email**: `[REPLACE_WITH_NEW_ACCOUNT_EMAIL]`
- **App Type**: Meeting SDK (verify this is correct)

### **2. Backend Updates Required**

**Files to update:**
- [ ] Environment variables or config files
- [ ] Database records (if stored there)
- [ ] API configuration

**Replace in backend:**
```ruby
# OLD
sdk_key = "1wYDJ1zZRmOBWTKs66QKmQ"
sdk_secret = "lGBIHUOB7ntMOpc54ecrZdhqcVinWySj"

# NEW
sdk_key = "nvuqo_K5S0uOwyPSWCzRlA"
sdk_secret = "LF7rh4F3n3mk7jS9xqWBFppg4j1GyySC"
```

### **3. Frontend Updates Required**

**Environment Variable:**
```bash
REACT_APP_ZOOM_SDK_KEY=nvuqo_K5S0uOwyPSWCzRlA
```

**Fallback in Controller:**
```typescript
// In Cfzoomintegration92Controller.tsx
const sdkKey = process.env.REACT_APP_ZOOM_SDK_KEY || 'nvuqo_K5S0uOwyPSWCzRlA';
```

### **4. Testing After Change**

- [ ] Test meeting creation with new account
- [ ] Test meeting join with new credentials
- [ ] Verify JWT signature generation works
- [ ] Check that meetings are created under new account
- [ ] Verify meeting participants can join successfully

### **5. Verification Steps**

1. **Check JWT Payload**: Ensure `appKey` field contains new SDK Key
2. **Test Meeting Join**: Verify no "Signature is invalid" errors
3. **Check Meeting Ownership**: Confirm meetings are created under new account
4. **Test Multiple Users**: Ensure other participants can join meetings

## ⚠️ **Important Notes**

- **App Type**: Must be "Meeting SDK", not "Server-to-Server OAuth"
- **Permissions**: Ensure new account has necessary permissions
- **Rate Limits**: New account may have different rate limits
- **Meeting History**: Previous meetings will remain under old account
- **User Access**: Users may need to re-authenticate if using OAuth

## 🔍 **Troubleshooting**

If you get "Signature is invalid" after changing accounts:

1. **Verify SDK Key matches** in JWT payload
2. **Check SDK Secret** is correct in backend
3. **Confirm App Type** is "Meeting SDK"
4. **Test with diagnostic tools** to verify JWT structure
5. **Check server time sync** for timestamp issues
