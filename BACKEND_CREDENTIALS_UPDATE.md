# Backend Credentials Update - New Zoom Account

## 🔄 **URGENT: Update Backend with New Zoom Credentials**

### **New Credentials**
- **SDK Key (Client ID)**: `nvuqo_K5S0uOwyPSWCzRlA`
- **SDK Secret (Client Secret)**: `LF7rh4F3n3mk7jS9xqWBFppg4j1GyySC`

### **New Meeting Configuration**
- **PMI (Personal Meeting ID)**: `8649168895`
- **Password**: `Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`
- **Join URL**: `https://us05web.zoom.us/j/8649168895?pwd=Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`

### **Old Credentials (to be replaced)**
- **SDK Key**: `1wYDJ1zZRmOBWTKs66QKmQ`
- **SDK Secret**: `lGBIHUOB7ntMOpc54ecrZdhqcVinWySj`

## 📋 **Backend Files to Update**

### **1. Environment Variables**
Update your environment variables or config files:

```bash
# OLD
ZOOM_SDK_KEY=1wYDJ1zZRmOBWTKs66QKmQ
ZOOM_SDK_SECRET=lGBIHUOB7ntMOpc54ecrZdhqcVinWySj

# NEW
ZOOM_SDK_KEY=nvuqo_K5S0uOwyPSWCzRlA
ZOOM_SDK_SECRET=LF7rh4F3n3mk7jS9xqWBFppg4j1GyySC
```

### **2. Database Records**
If credentials are stored in database, update:
- `zoom_sdk_key` field
- `zoom_sdk_secret_key` field

### **3. Configuration Files**
Update any config files containing the old credentials.

## 🔍 **JWT Payload Verification**

After updating, ensure the JWT payload contains:

```json
{
  "appKey": "nvuqo_K5S0uOwyPSWCzRlA",
  "mn": 8649168895,
  "role": 0,
  "iat": 1760710847,
  "exp": 1760710907,
  "tokenExp": 1760710967
}
```

**Key Points:**
- ✅ `appKey` must be `nvuqo_K5S0uOwyPSWCzRlA`
- ✅ `mn` must be `8649168895` (new PMI)
- ✅ `role` is 0 for participant, 1 for host
- ✅ `iat`, `exp`, `tokenExp` are timestamps

## 🧪 **Testing After Update**

1. **Create a test meeting** with new credentials
2. **Generate JWT signature** and verify `appKey` field
3. **Test meeting join** from frontend
4. **Check for "Signature is invalid" errors**

## ⚠️ **Important Notes**

- **App Type**: Must be "Meeting SDK" (not Server-to-Server OAuth)
- **Permissions**: Ensure new account has meeting creation permissions
- **Rate Limits**: New account may have different rate limits
- **Meeting History**: Previous meetings remain under old account

## 🚨 **If Issues Persist**

If you still get "Signature is invalid" after updating:

1. **Verify SDK Key matches** in JWT payload
2. **Check SDK Secret** is correct
3. **Confirm App Type** is "Meeting SDK"
4. **Test JWT generation** with new credentials
5. **Check server time sync** for timestamp issues

## 📞 **Frontend Status**

✅ **Frontend Updated**: 
- Controller updated with new SDK Key fallback
- Environment variable ready: `REACT_APP_ZOOM_SDK_KEY=nvuqo_K5S0uOwyPSWCzRlA`

**Ready for testing once backend is updated!** 🚀
