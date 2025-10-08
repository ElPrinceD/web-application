# Zoom Web SDK Local Setup

This directory contains the local Zoom Web SDK files for the application.

## Setup Instructions

### Option 1: Download from Zoom CDN (Recommended)
1. Download the Zoom Web SDK file from the official Zoom CDN:
   ```bash
   curl -o zoom-meeting-2.20.0.min.js "https://source.zoom.us/2.20.0/lib/av/zoom-meeting-2.20.0.min.js"
   ```

2. If the above fails with 403 Forbidden (which is common), you can try:
   - Use a VPN or different network
   - Contact Zoom support for access
   - Use Option 2 below

### Option 2: Install via NPM and Copy
1. Install the Zoom Meeting SDK via npm:
   ```bash
   npm install @zoom/meetingsdk@2.20.0
   ```

2. Copy the SDK file to this directory:
   ```bash
   cp node_modules/@zoom/meetingsdk/lib/av/zoom-meeting.min.js ./zoom-meeting-2.20.0.min.js
   ```

### Option 3: Use Different Version
If you have access to a different version of the Zoom SDK, you can:
1. Place the file in this directory with the name `zoom-meeting-2.20.0.min.js`
2. Or update the path in `Cfzoomintegration92Controller.tsx` to match your file name

## File Structure
```
public/zoom-sdk/
├── lib/
│   └── av/
│       └── zoom-meeting-2.20.0.min.js  # Main SDK file
└── README.md                           # This file
```

## Verification
After placing the SDK file, you can verify it's working by:
1. Starting the development server
2. Opening the browser console
3. Looking for the message: "✅ Zoom Web SDK loaded successfully from local files"

## Troubleshooting
- If you see "Failed to load Zoom SDK from local files", ensure the file exists at the correct path
- If you see "Mock: ZoomMtg..." messages, you're using the placeholder file - replace it with the real SDK
- The SDK file should be several MB in size (not just a few bytes)

## Security Note
The Zoom Web SDK files are served as static assets. Ensure you have the proper license and permissions to use the Zoom SDK in your application.
