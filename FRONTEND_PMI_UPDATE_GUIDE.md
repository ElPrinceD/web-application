# Frontend PMI Update Guide - Complete Configuration

## 🎯 **New Meeting Configuration**

### **Updated Meeting Details**
- **PMI (Personal Meeting ID)**: `8649168895`
- **Password**: `Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`
- **SDK Key**: `nvuqo_K5S0uOwyPSWCzRlA`
- **SDK Secret**: `LF7rh4F3n3mk7jS9xqWBFppg4j1GyySC`

## 🔄 **Frontend Updates Required**

### **1. Environment Variables**

Create or update your `.env` file:

```bash
# Zoom SDK Configuration
REACT_APP_ZOOM_SDK_KEY=nvuqo_K5S0uOwyPSWCzRlA
REACT_APP_ZOOM_SDK_SECRET=LF7rh4F3n3mk7jS9xqWBFppg4j1GyySC

# Backend API
REACT_APP_BACKEND_URL=http://localhost:3001

# Meeting Configuration (PMI)
REACT_APP_ZOOM_PMI_ID=8649168895
REACT_APP_ZOOM_PMI_PASSWORD=Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1
```

### **2. Update Package.json (if needed)**

If you want to use Zoom Meeting SDK v2 as mentioned in your guide:

```json
{
  "dependencies": {
    "@zoom/meetingsdk": "^2.0.0"
  }
}
```

**Note**: Currently using v4.0.7 which is working fine. Only update if you specifically need v2.

### **3. Backend API Endpoints**

Your backend should now provide:

#### **Meeting Data Response**
```json
{
  "zoom_meetings": {
    "zoom_sdk_key": "nvuqo_K5S0uOwyPSWCzRlA",
    "zoom_sdk_secret_key": "LF7rh4F3n3mk7jS9xqWBFppg4j1GyySC",
    "meeting_number": "8649168895",
    "signature": "eyJhbGciOiJIUzI1NiJ9...",
    "meeting": {
      "id": 8649168895,
      "password": "Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1",
      "join_url": "https://us05web.zoom.us/j/8649168895?pwd=Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1"
    }
  }
}
```

#### **JWT Signature Endpoint**
```bash
GET http://localhost:3001/zoom/signature?meetingNumber=8649168895&role=0
```

### **4. Frontend Controller Updates**

The current controller is already configured to use backend data, but you can add fallbacks:

```typescript
// In Cfzoomintegration92Controller.tsx
const getMeetingConfig = () => {
  return {
    meetingNumber: this.state.meetingNumber || process.env.REACT_APP_ZOOM_PMI_ID || "8649168895",
    passWord: this.state.passWord || process.env.REACT_APP_ZOOM_PMI_PASSWORD || "Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1",
    sdkKey: this.state.sdkKey || process.env.REACT_APP_ZOOM_SDK_KEY || "nvuqo_K5S0uOwyPSWCzRlA"
  };
};
```

### **5. Testing Configuration**

#### **Test 1: Verify Backend Response**
```bash
curl -X GET "http://localhost:3001/bx_block_cfzoomintegration92/zoom_meetings?notary_request_id=1" \
  -H "Content-Type: application/json" \
  -H "token: YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "zoom_meetings": {
    "meeting_number": "8649168895",
    "meeting": {
      "password": "Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1"
    },
    "zoom_sdk_key": "nvuqo_K5S0uOwyPSWCzRlA"
  }
}
```

#### **Test 2: Verify JWT Signature**
```bash
curl -X GET "http://localhost:3001/zoom/signature?meetingNumber=8649168895&role=0" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "signature": "eyJhbGciOiJIUzI1NiJ9.eyJzZGtLZXkiOiJudnVxb19LNVMwdU93eVBTV0N6UmxBIiwibW4iOjg2NDkxNjg4OTUsInJvbGUiOjAsImlhdCI6MTc2MDcxMDg0NywiZXhwIjoxNzYwNzEwOTA3LCJ0b2tlbkV4cCI6MTc2MDcxMDk2N30.YU2CWXA72x9IzdftWsiV3W3GAcZwr5lFh47wfEi7loI"
}
```

### **6. Debug Information**

Add this to your controller for debugging:

```typescript
console.log('🔍 Meeting Configuration Debug:');
console.log('Meeting Number:', this.state.meetingNumber);
console.log('Password:', this.state.passWord);
console.log('SDK Key:', this.state.sdkKey);
console.log('Signature Length:', this.state.signature?.length);
console.log('Expected PMI:', '8649168895');
console.log('Expected Password:', 'Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1');
```

### **7. Expected Results**

With the new PMI configuration:

✅ **Meeting Number**: Should be `8649168895` (not the old meeting IDs)  
✅ **Password**: Should be `Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`  
✅ **SDK Key**: Should be `nvuqo_K5S0uOwyPSWCzRlA`  
✅ **JWT Signature**: Should contain `appKey: "nvuqo_K5S0uOwyPSWCzRlA"`  
✅ **No "Meeting number is wrong" errors**  
✅ **Successful meeting join**  

### **8. Troubleshooting**

#### **If you still get "Meeting number is wrong":**
1. **Check backend response** - ensure `meeting_number` is `8649168895`
2. **Verify PMI is active** - PMI should be permanent and never expire
3. **Check password** - ensure it matches `Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`
4. **Verify SDK Key** - ensure it's `nvuqo_K5S0uOwyPSWCzRlA`

#### **If you get "Signature is invalid":**
1. **Check JWT payload** - should contain `appKey: "nvuqo_K5S0uOwyPSWCzRlA"`
2. **Verify meeting number in JWT** - should be `8649168895`
3. **Check timestamp** - JWT should not be expired

### **9. All Notary Requests**

All 11 notary requests now use the same PMI:
- **Meeting ID**: `8649168895`
- **Password**: `Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`
- **Join URL**: `https://us05web.zoom.us/j/8649168895?pwd=Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`

## ✅ **Ready for Testing**

The frontend is already configured to use backend data. The main changes needed are:

1. **Backend updates** - to provide the new PMI and credentials
2. **Environment variables** - for fallback configuration
3. **Testing** - to verify the new PMI works

**The "meeting number is wrong" error should be completely resolved with the new PMI!** 🎉
