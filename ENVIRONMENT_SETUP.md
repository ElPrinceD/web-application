# 🔧 Environment Setup for Zoom Web SDK v2

## 📋 **Required Environment Variables**

Create a `.env` file in your project root with the following variables:

```env
# Zoom Web SDK v2 Configuration
REACT_APP_ZOOM_SDK_KEY=your_zoom_sdk_key_here
REACT_APP_ZOOM_SDK_SECRET=your_zoom_sdk_secret_here

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3000

# Development Settings
NODE_ENV=development
```

## 🔑 **Getting Your Zoom SDK Credentials**

1. **Go to Zoom Marketplace**: https://marketplace.zoom.us/
2. **Sign in** to your Zoom account
3. **Create a new app** or use existing app
4. **Choose "Meeting SDK"** as the app type
5. **Copy the SDK Key and SDK Secret** from your app credentials

## 🚀 **Setup Steps**

1. **Create `.env` file** in your project root
2. **Add your Zoom SDK credentials** to the `.env` file
3. **Restart your development server** (important!)
4. **Test the integration** using the console commands

## 🧪 **Testing Your Setup**

After setting up environment variables, test with:

```javascript
// Check if environment variables are loaded
console.log('SDK Key:', process.env.REACT_APP_ZOOM_SDK_KEY);
console.log('SDK Secret:', process.env.REACT_APP_ZOOM_SDK_SECRET);

// Test Zoom Web SDK v2 integration
window.zoomTests.testZoomSDK('8');
```

## ⚠️ **Important Notes**

- **Never commit** `.env` files to version control
- **Restart server** after adding environment variables
- **Use HTTPS** in production
- **Keep credentials secure** and never expose them in frontend code

## 🔒 **Security Best Practices**

- Store SDK Secret securely on backend only
- Use environment variables for all sensitive data
- Implement proper authentication for signature endpoint
- Validate all inputs on backend
- Use HTTPS in production environment
