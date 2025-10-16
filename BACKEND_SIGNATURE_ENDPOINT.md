# Backend Signature Endpoint for Zoom Integration

This document describes how to implement a secure backend endpoint for generating Zoom meeting signatures (JWT tokens) following Zoom's official requirements.

## Overview

The backend signature endpoint is crucial for security as it:
1. Keeps Zoom SDK credentials (API Key and Secret) secure on the server
2. Generates JWT signatures for meeting authentication
3. Validates user permissions before allowing meeting access
4. Follows Zoom's official signature generation requirements

## Required Dependencies

```bash
npm install jsonwebtoken
npm install @types/jsonwebtoken  # for TypeScript
```

## Backend Endpoint Implementation

### Node.js/Express Example

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Zoom SDK credentials (should be stored in environment variables)
const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;

/**
 * Generate Zoom meeting signature (JWT token)
 * Following Zoom's official signature generation requirements
 */
function generateZoomSignature(meetingNumber, role) {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2; // 2 hours expiration
  
  const oPayload = {
    iss: ZOOM_API_KEY,        // SDK Key (issuer)
    exp: exp,                 // Expiration time
    iat: iat,                 // Issued at time
    aud: "zoom",              // Audience
    appKey: ZOOM_API_KEY,     // App Key (same as SDK Key)
    tokenExp: exp,            // Token expiration
    mn: meetingNumber,        // Meeting number
    role: role                // Role (0 = attendee, 1 = host)
  };

  const sHeader = {
    alg: "HS256",
    typ: "JWT"
  };

  const sJWT = jwt.sign(oPayload, ZOOM_API_SECRET, {
    header: sHeader
  });

  return sJWT;
}

/**
 * POST /api/zoom/signature
 * Generate a Zoom meeting signature for the authenticated user
 */
app.post('/api/zoom/signature', authenticateUser, (req, res) => {
  try {
    const { meetingNumber, role } = req.body;
    const userId = req.user.id; // From authentication middleware

    // Validate input
    if (!meetingNumber || (role !== 0 && role !== 1)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid meeting number or role'
      });
    }

    // Check if user has permission to join this meeting
    if (!await hasMeetingPermission(userId, meetingNumber)) {
      return res.status(403).json({
        success: false,
        error: 'User does not have permission to join this meeting'
      });
    }

    // Generate signature
    const signature = generateZoomSignature(meetingNumber, role);

    res.json({
      success: true,
      signature: signature,
      meetingNumber: meetingNumber,
      role: role,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
    });

  } catch (error) {
    console.error('Error generating Zoom signature:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate meeting signature'
    });
  }
});

/**
 * Check if user has permission to join the meeting
 * This should be implemented based on your business logic
 */
async function hasMeetingPermission(userId, meetingNumber) {
  // Example implementation - check if user is invited to the meeting
  // You should implement this based on your application's requirements
  
  // For now, return true - but in production, you should:
  // 1. Check if the meeting exists
  // 2. Check if the user is invited/authorized
  // 3. Check if the meeting is not expired
  // 4. Check any other business rules
  
  return true;
}

/**
 * Authentication middleware
 * This should be implemented based on your authentication system
 */
function authenticateUser(req, res, next) {
  // Example implementation - you should use your actual authentication
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }

  try {
    // Verify JWT token and extract user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid authentication token'
    });
  }
}

module.exports = app;
```

### Python/Flask Example

```python
import jwt
import time
from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

# Zoom SDK credentials (should be stored in environment variables)
ZOOM_API_KEY = os.getenv('ZOOM_API_KEY')
ZOOM_API_SECRET = os.getenv('ZOOM_API_SECRET')

def generate_zoom_signature(meeting_number, role):
    """Generate Zoom meeting signature (JWT token)"""
    iat = int(time.time()) - 30
    exp = iat + 60 * 60 * 2  # 2 hours expiration
    
    payload = {
        'iss': ZOOM_API_KEY,        # SDK Key (issuer)
        'exp': exp,                 # Expiration time
        'iat': iat,                 # Issued at time
        'aud': 'zoom',              # Audience
        'appKey': ZOOM_API_KEY,     # App Key (same as SDK Key)
        'tokenExp': exp,            # Token expiration
        'mn': meeting_number,       # Meeting number
        'role': role                # Role (0 = attendee, 1 = host)
    }
    
    header = {
        'alg': 'HS256',
        'typ': 'JWT'
    }
    
    signature = jwt.encode(payload, ZOOM_API_SECRET, algorithm='HS256', headers=header)
    return signature

@app.route('/api/zoom/signature', methods=['POST'])
@require_auth
def generate_signature():
    try:
        data = request.get_json()
        meeting_number = data.get('meetingNumber')
        role = data.get('role')
        user_id = request.user['id']  # From authentication decorator
        
        # Validate input
        if not meeting_number or role not in [0, 1]:
            return jsonify({
                'success': False,
                'error': 'Invalid meeting number or role'
            }), 400
        
        # Check permissions
        if not has_meeting_permission(user_id, meeting_number):
            return jsonify({
                'success': False,
                'error': 'User does not have permission to join this meeting'
            }), 403
        
        # Generate signature
        signature = generate_zoom_signature(meeting_number, role)
        
        return jsonify({
            'success': True,
            'signature': signature,
            'meetingNumber': meeting_number,
            'role': role,
            'expiresAt': int(time.time()) + 2 * 60 * 60  # 2 hours from now
        })
        
    except Exception as e:
        print(f'Error generating Zoom signature: {e}')
        return jsonify({
            'success': False,
            'error': 'Failed to generate meeting signature'
        }), 500

def has_meeting_permission(user_id, meeting_number):
    """Check if user has permission to join the meeting"""
    # Implement your business logic here
    return True

def require_auth(f):
    """Authentication decorator"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        
        if not token:
            return jsonify({
                'success': False,
                'error': 'Authentication required'
            }), 401
        
        try:
            # Verify JWT token and extract user info
            decoded = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms=['HS256'])
            request.user = decoded
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({
                'success': False,
                'error': 'Token has expired'
            }), 401
        except jwt.InvalidTokenError:
            return jsonify({
                'success': False,
                'error': 'Invalid token'
            }), 401
    
    return decorated_function
```

## Environment Variables

Create a `.env` file in your backend project:

```env
# Zoom SDK Credentials
ZOOM_API_KEY=your_zoom_sdk_key_here
ZOOM_API_SECRET=your_zoom_sdk_secret_here

# JWT Secret for user authentication
JWT_SECRET=your_jwt_secret_here
```

## Frontend Integration

Update your frontend to use the backend endpoint:

```typescript
// In your ZoomMeetingComponent or similar
const generateMeetingSignature = async (): Promise<string> => {
  try {
    const response = await fetch('/api/zoom/signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}` // Your user authentication token
      },
      body: JSON.stringify({
        meetingNumber: config.meetingNumber,
        role: config.role
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to generate signature');
    }

    return data.signature;
  } catch (error) {
    console.error('Failed to generate signature:', error);
    throw error;
  }
};
```

## Security Considerations

1. **Never expose SDK credentials**: Keep API Key and Secret on the server only
2. **Validate user permissions**: Check if the user is authorized to join the meeting
3. **Use HTTPS**: Always use HTTPS in production
4. **Token expiration**: Set appropriate expiration times for signatures
5. **Rate limiting**: Implement rate limiting to prevent abuse
6. **Logging**: Log signature generation for audit purposes

## Testing

Test your endpoint with curl:

```bash
curl -X POST http://localhost:3000/api/zoom/signature \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{
    "meetingNumber": "123456789",
    "role": 0
  }'
```

Expected response:
```json
{
  "success": true,
  "signature": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "meetingNumber": "123456789",
  "role": 0,
  "expiresAt": "2024-01-01T12:00:00.000Z"
}
```

