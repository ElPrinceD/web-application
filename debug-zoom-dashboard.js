// Debug script for Zoom Dashboard Integration
// Run this in your dashboard browser console to debug the signature issue

console.log('🔧 Starting Zoom Dashboard Debug...');

// Test function to debug signature generation
async function debugSignatureGeneration() {
    console.log('🧪 Testing signature generation from dashboard...');
    
    try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('❌ No token found in localStorage');
            return;
        }
        
        console.log('✅ Token found:', token.substring(0, 20) + '...');
        
        // Test signature API call
        const response = await fetch('/bx_block_cfzoomintegration92/zoom_meetings/generate_signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Origin': window.location.origin
            },
            body: JSON.stringify({
                meeting_number: '81413649668',
                role: 0
            })
        });

        console.log('📋 API Response Status:', response.status);
        console.log('📋 API Response Headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error:', response.status, errorText);
            return;
        }

        const data = await response.json();
        console.log('✅ Signature API Response:', data);
        
        if (data.signature) {
            console.log('📋 Signature Details:');
            console.log('  - Length:', data.signature.length);
            console.log('  - Type:', typeof data.signature);
            console.log('  - Preview:', data.signature.substring(0, 50) + '...');
            
            // Validate JWT format
            const parts = data.signature.split('.');
            console.log('  - JWT Parts:', parts.length);
            
            if (parts.length === 3) {
                console.log('✅ Signature is valid JWT format');
                
                // Decode header and payload (for debugging)
                try {
                    const header = JSON.parse(atob(parts[0]));
                    const payload = JSON.parse(atob(parts[1]));
                    console.log('📋 JWT Header:', header);
                    console.log('📋 JWT Payload:', payload);
                } catch (e) {
                    console.warn('⚠️ Could not decode JWT parts:', e.message);
                }
            } else {
                console.warn('⚠️ Signature is not JWT format');
            }
            
            return data.signature;
        } else {
            console.error('❌ No signature in response');
            return null;
        }
        
    } catch (error) {
        console.error('❌ Error testing signature generation:', error);
        return null;
    }
}

// Test function to debug Zoom SDK initialization
async function debugSDKInitialization(signature) {
    console.log('🧪 Testing Zoom SDK initialization...');
    
    if (!signature) {
        console.error('❌ No signature provided');
        return;
    }
    
    // Check if Zoom SDK is loaded
    if (typeof ZoomMtg === 'undefined') {
        console.error('❌ Zoom SDK not loaded');
        return;
    }
    
    console.log('✅ Zoom SDK is loaded');
    
    const testConfig = {
        sdkKey: '1wYDJ1zZRmOBWTKs66QKmQ',
        sdkSecret: 'lGBIHUOB7ntMOpc54ecrZdhqcVinWySj',
        meetingNumber: '81413649668',
        passWord: '4JD2LT',
        userName: 'Test User',
        userEmail: 'test@example.com',
        tk: signature, // 🔑 Using 'tk' parameter
        success: (success) => {
            console.log('✅ Zoom SDK initialized successfully!', success);
        },
        error: (error) => {
            console.error('❌ Zoom SDK initialization failed:', error);
            if (error.message && error.message.includes('Signature is invalid')) {
                console.log('🔧 This is the signature issue we need to fix!');
                console.log('💡 The signature from your backend might be invalid');
            }
        }
    };
    
    console.log('🔧 SDK Config:', {
        sdkKey: testConfig.sdkKey,
        meetingNumber: testConfig.meetingNumber,
        hasToken: !!testConfig.tk,
        tokenPreview: signature.substring(0, 50) + '...'
    });
    
    try {
        ZoomMtg.init(testConfig);
    } catch (error) {
        console.error('❌ Error initializing SDK:', error);
    }
}

// Main debug function
async function debugZoomIntegration() {
    console.log('🚀 Starting complete Zoom integration debug...');
    
    try {
        // Step 1: Test signature generation
        const signature = await debugSignatureGeneration();
        
        if (signature) {
            // Step 2: Test SDK initialization
            await debugSDKInitialization(signature);
        } else {
            console.error('❌ Cannot proceed without valid signature');
        }
        
    } catch (error) {
        console.error('❌ Debug failed:', error);
    }
}

// Make functions available globally
window.debugZoom = {
    debugSignatureGeneration,
    debugSDKInitialization,
    debugZoomIntegration
};

console.log('🔧 Debug functions available:');
console.log('  - window.debugZoom.debugZoomIntegration() - Run complete debug');
console.log('  - window.debugZoom.debugSignatureGeneration() - Test signature API');
console.log('  - window.debugZoom.debugSDKInitialization(signature) - Test SDK init');

// Auto-run debug
console.log('🚀 Auto-running debug...');
debugZoomIntegration();
