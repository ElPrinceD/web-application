// Zoom Meeting Test Script
// Run this in the browser console to test the Zoom meeting functionality

console.log('🧪 Starting Zoom Meeting Test...');

// Test configuration
const TEST_CONFIG = {
    meetingId: '81413649668',
    password: '4JD2LT',
    joinUrl: 'https://us05web.zoom.us/j/81413649668?pwd=wk01rihNQbawXuZhK6CafkdqPB0Wrg.1',
    sdkKey: '1wYDJ1zZRmOBWTKs66QKmQ',
    sdkSecret: 'lGBIHUOB7ntMOpc54ecrZdhqcVinWySj',
    userName: 'Test User',
    userEmail: 'test@example.com'
};

// Test 1: Check if Zoom SDK is loaded
function testSDKLoading() {
    console.log('🧪 Testing Zoom SDK loading...');
    
    if (typeof ZoomMtg !== 'undefined') {
        console.log('✅ Zoom SDK is loaded');
        return true;
    } else {
        console.log('❌ Zoom SDK is not loaded');
        return false;
    }
}

// Test 2: Test signature generation API
async function testSignatureAPI() {
    console.log('🧪 Testing signature generation API...');
    
    try {
        const response = await fetch('/bx_block_cfzoomintegration92/zoom_meetings/generate_signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || 'test-token'}`,
                'Origin': window.location.origin
            },
            body: JSON.stringify({
                meeting_number: TEST_CONFIG.meetingId,
                role: 0
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Signature API working');
        console.log('📋 Signature length:', data.signature.length);
        console.log('📋 Signature preview:', data.signature.substring(0, 50) + '...');
        
        // Validate JWT format
        const parts = data.signature.split('.');
        if (parts.length === 3) {
            console.log('✅ Signature is valid JWT format');
        } else {
            console.log('⚠️ Signature is not JWT format');
        }
        
        return data.signature;
        
    } catch (error) {
        console.log('❌ Signature API failed:', error.message);
        throw error;
    }
}

// Test 3: Test Zoom SDK initialization
async function testSDKInitialization(signature) {
    console.log('🧪 Testing Zoom SDK initialization...');
    
    if (!testSDKLoading()) {
        throw new Error('Zoom SDK not loaded');
    }
    
    return new Promise((resolve, reject) => {
        const zoomConfig = {
            sdkKey: TEST_CONFIG.sdkKey,
            sdkSecret: TEST_CONFIG.sdkSecret,
            meetingNumber: TEST_CONFIG.meetingId,
            passWord: TEST_CONFIG.password,
            userName: TEST_CONFIG.userName,
            userEmail: TEST_CONFIG.userEmail,
            tk: signature,
            success: (success) => {
                console.log('✅ Zoom SDK initialized successfully');
                resolve(success);
            },
            error: (error) => {
                console.log('❌ Zoom SDK initialization failed:', error.message || error);
                reject(error);
            }
        };
        
        console.log('🔧 Initializing Zoom SDK with config:', {
            sdkKey: zoomConfig.sdkKey,
            meetingNumber: zoomConfig.meetingNumber,
            hasToken: !!zoomConfig.tk,
            tokenPreview: signature ? signature.substring(0, 50) + '...' : 'No token'
        });
        
        ZoomMtg.init(zoomConfig);
    });
}

// Test 4: Test meeting join
function testMeetingJoin() {
    console.log('🧪 Testing meeting join...');
    
    const joinConfig = {
        meetingNumber: TEST_CONFIG.meetingId,
        userName: TEST_CONFIG.userName,
        passWord: TEST_CONFIG.password,
        success: (success) => {
            console.log('✅ Successfully joined meeting!');
        },
        error: (error) => {
            console.log('❌ Failed to join meeting:', error.message || error);
            
            if (error.message && error.message.includes('Signature is invalid')) {
                console.log('🔧 Signature validation failed - this is the main issue');
            } else if (error.message && error.message.includes('timeout')) {
                console.log('⏰ Meeting join timeout - trying direct join URL');
                window.open(TEST_CONFIG.joinUrl, '_blank');
            }
        }
    };
    
    ZoomMtg.join(joinConfig);
}

// Test 5: Complete workflow test
async function testCompleteWorkflow() {
    console.log('🧪 Testing complete workflow...');
    
    try {
        // Step 1: Test signature generation
        const signature = await testSignatureAPI();
        
        // Step 2: Test SDK initialization
        await testSDKInitialization(signature);
        
        // Step 3: Test meeting join
        testMeetingJoin();
        
        console.log('✅ Complete workflow test completed');
        
    } catch (error) {
        console.log('❌ Complete workflow test failed:', error.message);
    }
}

// Test 6: Browser compatibility check
function testBrowserCompatibility() {
    console.log('🧪 Testing browser compatibility...');
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome = userAgent.includes('chrome');
    const isFirefox = userAgent.includes('firefox');
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
    const isEdge = userAgent.includes('edge');
    
    if (isChrome) {
        console.log('✅ Chrome detected - fully supported');
    } else if (isFirefox) {
        console.log('✅ Firefox detected - fully supported');
    } else if (isEdge) {
        console.log('✅ Edge detected - fully supported');
    } else if (isSafari) {
        console.log('⚠️ Safari detected - may have restrictions');
    } else {
        console.log('⚠️ Unknown browser - compatibility uncertain');
    }
    
    // Check for popup blockers
    const popup = window.open('', '_blank');
    if (popup) {
        popup.close();
        console.log('✅ Popup blocker test passed');
    } else {
        console.log('⚠️ Popup blocker detected - may affect meeting join');
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Running all Zoom meeting tests...');
    
    try {
        // Test browser compatibility first
        testBrowserCompatibility();
        
        // Test complete workflow
        await testCompleteWorkflow();
        
        console.log('🎉 All tests completed!');
        
    } catch (error) {
        console.log('❌ Tests failed:', error.message);
    }
}

// Make functions available globally
window.zoomTest = {
    testSDKLoading,
    testSignatureAPI,
    testSDKInitialization,
    testMeetingJoin,
    testCompleteWorkflow,
    testBrowserCompatibility,
    runAllTests
};

console.log('🔧 Zoom test functions available:');
console.log('  - window.zoomTest.runAllTests() - Run all tests');
console.log('  - window.zoomTest.testSignatureAPI() - Test signature generation');
console.log('  - window.zoomTest.testSDKLoading() - Test SDK loading');
console.log('  - window.zoomTest.testCompleteWorkflow() - Test complete workflow');
console.log('  - window.zoomTest.testBrowserCompatibility() - Test browser compatibility');

// Auto-run tests if in browser
if (typeof window !== 'undefined') {
    console.log('🚀 Auto-running tests...');
    runAllTests();
}
