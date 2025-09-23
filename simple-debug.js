// Simple Debug Script for Zoom Dashboard
// Copy and paste this into your dashboard browser console

console.log('🔧 Starting Simple Zoom Debug...');

// Step 1: Check if Zoom SDK is loaded
console.log('🧪 Step 1: Checking Zoom SDK...');
if (typeof ZoomMtg !== 'undefined') {
    console.log('✅ Zoom SDK is loaded');
} else {
    console.log('❌ Zoom SDK is NOT loaded');
}

// Step 2: Check authentication token
console.log('🧪 Step 2: Checking authentication...');
const token = localStorage.getItem('token');
if (token) {
    console.log('✅ Token found:', token.substring(0, 20) + '...');
} else {
    console.log('❌ No token found in localStorage');
}

// Step 3: Test signature API call
console.log('🧪 Step 3: Testing signature API...');
fetch('/bx_block_cfzoomintegration92/zoom_meetings/generate_signature', {
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
})
.then(response => {
    console.log('📋 API Response Status:', response.status);
    if (!response.ok) {
        console.error('❌ API Error:', response.status);
        return response.text().then(text => {
            console.error('❌ Error Details:', text);
        });
    }
    return response.json();
})
.then(data => {
    console.log('✅ API Response:', data);
    if (data.signature) {
        console.log('📋 Signature Details:');
        console.log('  - Length:', data.signature.length);
        console.log('  - Preview:', data.signature.substring(0, 50) + '...');
        
        // Test JWT format
        const parts = data.signature.split('.');
        console.log('  - JWT Parts:', parts.length);
        
        if (parts.length === 3) {
            console.log('✅ Signature is valid JWT format');
            
            // Test SDK initialization
            console.log('🧪 Step 4: Testing SDK initialization...');
            if (typeof ZoomMtg !== 'undefined') {
                const testConfig = {
                    sdkKey: '1wYDJ1zZRmOBWTKs66QKmQ',
                    sdkSecret: 'lGBIHUOB7ntMOpc54ecrZdhqcVinWySj',
                    meetingNumber: '81413649668',
                    passWord: '4JD2LT',
                    userName: 'Test User',
                    userEmail: 'test@example.com',
                    tk: data.signature, // 🔑 Using 'tk' parameter
                    success: (success) => {
                        console.log('✅ Zoom SDK initialized successfully!', success);
                    },
                    error: (error) => {
                        console.error('❌ Zoom SDK initialization failed:', error);
                        if (error.message && error.message.includes('Signature is invalid')) {
                            console.log('🔧 This confirms the signature issue!');
                        }
                    }
                };
                
                console.log('🔧 SDK Config:', {
                    sdkKey: testConfig.sdkKey,
                    meetingNumber: testConfig.meetingNumber,
                    hasToken: !!testConfig.tk,
                    tokenPreview: data.signature.substring(0, 50) + '...'
                });
                
                ZoomMtg.init(testConfig);
            } else {
                console.error('❌ Zoom SDK not available for testing');
            }
        } else {
            console.warn('⚠️ Signature is not JWT format');
        }
    } else {
        console.error('❌ No signature in response');
    }
})
.catch(error => {
    console.error('❌ Fetch Error:', error);
});

console.log('🔧 Debug script completed. Check the results above.');
