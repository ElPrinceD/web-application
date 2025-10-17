# Zoom Meeting Join Debug Guide

## 🚨 **"Failed to Join Meeting" Error - Complete Debugging Guide**

### **Step 1: Check Server Status**

First, ensure your server is running properly:

```bash
cd /Users/michaela/Downloads/web/packages/web
NODE_OPTIONS="--openssl-legacy-provider" npm run _start
```

**Expected**: Server should start without compilation errors.

### **Step 2: Browser Console Debugging**

Open browser developer tools (F12) and check for these specific errors:

#### **A. SDK Loading Errors**
```javascript
// Look for these in console:
"Zoom SDK not properly loaded"
"Error during Zoom SDK initialization"
"Cannot read properties of undefined (reading 'v1')"
```

#### **B. Meeting Join Errors**
```javascript
// Look for these error codes:
errorCode: 3712  // "Signature is invalid"
errorCode: 3706  // "The meeting number is wrong"
errorCode: 3705  // "The signature has expired"
errorCode: 3     // "Join parameters: appKey are invalid!"
```

#### **C. Network Errors**
```javascript
// Check Network tab for:
- Failed API calls to backend
- CORS errors
- 404/500 errors from backend
```

### **Step 3: Add Comprehensive Debug Logging**

Add this debug code to your controller:

```typescript
// Add to Cfzoomintegration92Controller.tsx
startZoomMeeting() {
  console.log('🔍 DEBUG: Starting Zoom Meeting Debug');
  console.log('🔍 Current State:', {
    sdkKey: this.state.sdkKey,
    meetingNumber: this.state.meetingNumber,
    passWord: this.state.passWord,
    signature: this.state.signature?.substring(0, 50) + '...',
    userName: this.state.userName,
    userEmail: this.state.userEmail
  });

  // Check if Zoom SDK is loaded
  if (!(window as any).ZoomMtg) {
    console.error('❌ Zoom SDK not loaded on window object');
    this.setState({ loader: false });
    return;
  }

  console.log('✅ Zoom SDK found on window object');

  // Check SDK methods
  if (typeof (window as any).ZoomMtg.init !== 'function') {
    console.error('❌ ZoomMtg.init is not a function');
    this.setState({ loader: false });
    return;
  }

  if (typeof (window as any).ZoomMtg.join !== 'function') {
    console.error('❌ ZoomMtg.join is not a function');
    this.setState({ loader: false });
    return;
  }

  console.log('✅ All required Zoom SDK methods available');

  // Continue with existing initialization...
}
```

### **Step 4: Backend API Testing**

Test your backend endpoints directly:

#### **A. Test Meeting Data Endpoint**
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
    "zoom_sdk_key": "nvuqo_K5S0uOwyPSWCzRlA",
    "meeting": {
      "password": "Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1"
    }
  }
}
```

#### **B. Test JWT Signature Endpoint**
```bash
curl -X GET "http://localhost:3001/zoom/signature?meetingNumber=8649168895&role=0" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "signature": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### **Step 5: JWT Signature Analysis**

Add this JWT decoder to your controller:

```typescript
// Add to joinMeeting() method
joinMeeting() {
  // Decode and analyze JWT signature
  if (this.state.signature && this.state.signature.includes('.')) {
    try {
      const parts = this.state.signature.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log('🔍 JWT Payload Analysis:', {
          appKey: payload.appKey,
          mn: payload.mn,
          role: payload.role,
          iat: new Date(payload.iat * 1000).toISOString(),
          exp: new Date(payload.exp * 1000).toISOString(),
          tokenExp: new Date(payload.tokenExp * 1000).toISOString()
        });

        // Verify critical fields
        const now = Math.floor(Date.now() / 1000);
        const timeDiff = payload.iat - now;
        
        console.log('🔍 JWT Validation:', {
          appKeyMatch: payload.appKey === this.state.sdkKey,
          meetingNumberMatch: payload.mn.toString() === this.state.meetingNumber,
          roleCorrect: payload.role === 0,
          timeDifference: timeDiff + ' seconds',
          isExpired: payload.exp < now,
          timeUntilExpiry: payload.exp - now + ' seconds'
        });

        // Check for common issues
        if (payload.appKey !== this.state.sdkKey) {
          console.error('❌ JWT appKey mismatch!');
          console.error('Expected:', this.state.sdkKey);
          console.error('Got:', payload.appKey);
        }

        if (payload.mn.toString() !== this.state.meetingNumber) {
          console.error('❌ JWT meeting number mismatch!');
          console.error('Expected:', this.state.meetingNumber);
          console.error('Got:', payload.mn);
        }

        if (Math.abs(timeDiff) > 300) {
          console.error('❌ JWT timestamp too far off!');
          console.error('Difference:', timeDiff, 'seconds');
        }

        if (payload.exp < now) {
          console.error('❌ JWT signature expired!');
          console.error('Expired at:', new Date(payload.exp * 1000).toISOString());
        }
      }
    } catch (error) {
      console.error('❌ Error decoding JWT:', error);
    }
  }

  // Continue with existing join logic...
}
```

### **Step 6: Common Error Solutions**

#### **Error Code 3712: "Signature is invalid"**
**Causes:**
- Wrong SDK Key in JWT
- Expired JWT signature
- Server time out of sync
- Missing required JWT fields

**Solutions:**
1. Verify backend is using correct SDK Key: `nvuqo_K5S0uOwyPSWCzRlA`
2. Check JWT expiration time (should be 30min-48hrs from iat)
3. Ensure server time is synced
4. Verify JWT contains all required fields: `appKey`, `mn`, `role`, `iat`, `exp`, `tokenExp`

#### **Error Code 3706: "The meeting number is wrong"**
**Causes:**
- Wrong meeting number in JWT
- Meeting doesn't exist
- Meeting is not active

**Solutions:**
1. Use correct PMI: `8649168895`
2. Verify meeting is active in Zoom account
3. Check if meeting requires password: `Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`

#### **Error Code 3705: "The signature has expired"**
**Causes:**
- JWT signature is too old
- Server time mismatch

**Solutions:**
1. Generate fresh JWT signature
2. Check server time synchronization
3. Increase JWT expiration time in backend

#### **Error Code 3: "Join parameters: appKey are invalid!"**
**Causes:**
- Using `sdkKey` parameter in `ZoomMtg.join()` (deprecated in v4.0.0+)
- Wrong SDK Key format

**Solutions:**
1. Remove `sdkKey` from `ZoomMtg.join()` parameters
2. Ensure `appKey` is in JWT signature
3. Use only `signature` parameter in join call

### **Step 7: Test with Minimal Configuration**

Create a test function with minimal parameters:

```typescript
// Add this test function to your controller
testMinimalJoin = () => {
  console.log('🧪 Testing minimal join configuration');
  
  const testConfig = {
    meetingNumber: "8649168895",
    userName: "Test User",
    passWord: "Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1",
    signature: this.state.signature,
    success: (res: any) => {
      console.log('✅ Minimal join successful:', res);
    },
    error: (err: any) => {
      console.error('❌ Minimal join failed:', err);
      console.error('Error details:', {
        errorCode: err.errorCode,
        errorMessage: err.errorMessage,
        meetingNumber: "8649168895",
        signatureLength: this.state.signature?.length
      });
    }
  };

  console.log('🧪 Test config:', testConfig);
  
  // Test join with minimal parameters
  (window as any).ZoomMtg.join(testConfig);
};
```

### **Step 8: Environment Verification**

Check your environment setup:

```typescript
// Add to componentDidMount or startZoomMeeting
console.log('🔍 Environment Check:', {
  nodeEnv: process.env.NODE_ENV,
  zoomSdkKey: process.env.REACT_APP_ZOOM_SDK_KEY,
  backendUrl: process.env.REACT_APP_BACKEND_URL,
  currentUrl: window.location.href,
  userAgent: navigator.userAgent,
  isHttps: window.location.protocol === 'https:',
  hasWebRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
});
```

### **Step 9: Browser Permissions Check**

```typescript
// Add permission check
checkPermissions = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    });
    console.log('✅ Camera and microphone permissions granted');
    stream.getTracks().forEach(track => track.stop());
  } catch (error) {
    console.error('❌ Permission denied:', error);
    console.log('Please allow camera and microphone access');
  }
};
```

### **Step 10: Complete Debug Checklist**

Run through this checklist:

- [ ] Server starts without compilation errors
- [ ] Browser console shows no SDK loading errors
- [ ] Backend API endpoints return correct data
- [ ] JWT signature contains correct `appKey` and `mn`
- [ ] JWT signature is not expired
- [ ] Meeting number is `8649168895` (PMI)
- [ ] Password is `Mjf8IFZfbTb4yVyb0WVYtsNv8nMWvo.1`
- [ ] SDK Key is `nvuqo_K5S0uOwyPSWCzRlA`
- [ ] Browser has camera/microphone permissions
- [ ] CSP allows Zoom resources
- [ ] No CORS errors in network tab

### **Step 11: Quick Fixes to Try**

1. **Clear browser cache** and reload
2. **Restart backend server** to get fresh JWT signatures
3. **Check Zoom account** - ensure PMI is active
4. **Try different browser** (Chrome recommended)
5. **Check network connectivity** to Zoom servers

### **Step 12: Get Detailed Error Information**

Add this enhanced error handler:

```typescript
// Enhanced error handling
error: (err: any) => {
  console.error('❌ Zoom Meeting Join Error:', {
    errorCode: err.errorCode,
    errorMessage: err.errorMessage,
    method: err.method,
    result: err.result,
    status: err.status,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    currentUrl: window.location.href,
    meetingConfig: {
      meetingNumber: this.state.meetingNumber,
      sdkKey: this.state.sdkKey,
      signatureLength: this.state.signature?.length,
      hasPassword: !!this.state.passWord
    }
  });
  
  // Provide user-friendly error messages
  let userMessage = 'Failed to join meeting. ';
  switch (err.errorCode) {
    case 3712:
      userMessage += 'Invalid signature. Please try again.';
      break;
    case 3706:
      userMessage += 'Meeting number is incorrect.';
      break;
    case 3705:
      userMessage += 'Session expired. Please refresh and try again.';
      break;
    case 3:
      userMessage += 'Invalid configuration. Please contact support.';
      break;
    default:
      userMessage += 'Please check your connection and try again.';
  }
  
  alert(userMessage);
  this.setState({ loader: false });
}
```

## 🎯 **Next Steps**

1. **Add the debug logging** to your controller
2. **Test the backend endpoints** with curl commands
3. **Check browser console** for specific error codes
4. **Share the console output** so I can help identify the exact issue

**Run through this debugging process and share the console output - I'll help you identify the exact cause of the join failure!** 🔍
