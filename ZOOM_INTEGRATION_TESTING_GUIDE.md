# Zoom Integration Testing Guide

This guide provides comprehensive testing procedures for the new Zoom integration implementation.

## Overview

The new Zoom integration has been completely rebuilt following official Zoom patterns and includes:
- Clean React component architecture
- Official Zoom Web SDK (@zoomus/websdk) via npm imports
- Comprehensive error handling and fallbacks
- Proper TypeScript interfaces and type safety
- Modular design with separation of concerns

## Testing Checklist

### 1. Environment Setup

- [ ] Verify Zoom Web SDK is installed: `npm list @zoomus/websdk`
- [ ] Check webpack configuration includes proper process polyfills
- [ ] Ensure CSP allows Zoom domains
- [ ] Verify backend signature endpoint is working

### 2. Component Loading Tests

#### Test 1: Component Mounting
```typescript
// Test that the component mounts without errors
describe('ZoomMeetingComponent', () => {
  it('should mount without errors', () => {
    const config = {
      meetingNumber: '123456789',
      userName: 'Test User',
      userEmail: 'test@example.com',
      sdkKey: 'test_key',
      sdkSecret: 'test_secret',
      role: 0
    };
    
    render(<ZoomMeetingComponent config={config} />);
    expect(screen.getByText('Join Meeting')).toBeInTheDocument();
  });
});
```

#### Test 2: SDK Initialization
```typescript
// Test that Zoom SDK initializes properly
it('should initialize Zoom SDK', async () => {
  const config = { /* ... */ };
  render(<ZoomMeetingComponent config={config} />);
  
  // Wait for initialization
  await waitFor(() => {
    expect(screen.getByText('Join Meeting')).not.toBeDisabled();
  });
});
```

### 3. Meeting Join Tests

#### Test 3: Successful Meeting Join
```typescript
// Test successful meeting join flow
it('should join meeting successfully', async () => {
  const mockSignature = 'mock_jwt_signature';
  const config = { /* ... */ };
  
  // Mock the signature generation
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ signature: mockSignature })
  });
  
  render(<ZoomMeetingComponent config={config} />);
  
  // Click join button
  fireEvent.click(screen.getByText('Join Meeting'));
  
  // Verify loading state
  expect(screen.getByText('Joining meeting...')).toBeInTheDocument();
  
  // Wait for meeting to start
  await waitFor(() => {
    expect(screen.getByText('Leave Meeting')).toBeInTheDocument();
  });
});
```

#### Test 4: Meeting Join Failure
```typescript
// Test meeting join failure handling
it('should handle meeting join failure', async () => {
  const config = { /* ... */ };
  
  // Mock signature generation failure
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
  
  render(<ZoomMeetingComponent config={config} />);
  
  // Click join button
  fireEvent.click(screen.getByText('Join Meeting'));
  
  // Verify error handling
  await waitFor(() => {
    expect(screen.getByText(/Failed to join meeting/)).toBeInTheDocument();
  });
});
```

### 4. Error Handling Tests

#### Test 5: Invalid Configuration
```typescript
// Test handling of invalid configuration
it('should handle invalid configuration', () => {
  const invalidConfig = {
    meetingNumber: '',
    userName: '',
    userEmail: '',
    sdkKey: '',
    sdkSecret: '',
    role: 0
  };
  
  render(<ZoomMeetingComponent config={invalidConfig} />);
  
  // Should show error or disabled state
  expect(screen.getByText('Join Meeting')).toBeDisabled();
});
```

#### Test 6: Network Error Handling
```typescript
// Test network error handling
it('should handle network errors gracefully', async () => {
  const config = { /* ... */ };
  
  // Mock network failure
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
  
  render(<ZoomMeetingComponent config={config} />);
  
  fireEvent.click(screen.getByText('Join Meeting'));
  
  await waitFor(() => {
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });
});
```

### 5. Integration Tests

#### Test 7: End-to-End Meeting Flow
```typescript
// Test complete meeting flow
it('should complete full meeting flow', async () => {
  const config = { /* ... */ };
  
  render(<ZoomMeetingComponent config={config} />);
  
  // 1. Initial state
  expect(screen.getByText('Join Meeting')).toBeInTheDocument();
  
  // 2. Join meeting
  fireEvent.click(screen.getByText('Join Meeting'));
  
  // 3. Wait for meeting to start
  await waitFor(() => {
    expect(screen.getByText('Leave Meeting')).toBeInTheDocument();
  });
  
  // 4. Leave meeting
  fireEvent.click(screen.getByText('Leave Meeting'));
  
  // 5. Verify back to initial state
  await waitFor(() => {
    expect(screen.getByText('Join Meeting')).toBeInTheDocument();
  });
});
```

### 6. Browser Compatibility Tests

#### Test 8: Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Test 9: Mobile Browser Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Mobile responsiveness

### 7. Performance Tests

#### Test 10: SDK Loading Performance
```typescript
// Test SDK loading performance
it('should load SDK within acceptable time', async () => {
  const startTime = performance.now();
  
  render(<ZoomMeetingComponent config={config} />);
  
  await waitFor(() => {
    expect(screen.getByText('Join Meeting')).not.toBeDisabled();
  });
  
  const endTime = performance.now();
  const loadTime = endTime - startTime;
  
  // Should load within 5 seconds
  expect(loadTime).toBeLessThan(5000);
});
```

### 8. Security Tests

#### Test 11: Signature Validation
```typescript
// Test that signatures are properly validated
it('should validate meeting signatures', async () => {
  const config = { /* ... */ };
  
  // Mock invalid signature
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ signature: 'invalid_signature' })
  });
  
  render(<ZoomMeetingComponent config={config} />);
  
  fireEvent.click(screen.getByText('Join Meeting'));
  
  // Should handle invalid signature gracefully
  await waitFor(() => {
    expect(screen.getByText(/Failed to join meeting/)).toBeInTheDocument();
  });
});
```

## Manual Testing Procedures

### 1. Basic Functionality Test

1. **Navigate to Zoom integration page**
   - Verify page loads without errors
   - Check that meeting information is displayed
   - Ensure "Join Meeting" button is visible and enabled

2. **Join Meeting Test**
   - Click "Join Meeting" button
   - Verify loading state appears
   - Check that Zoom meeting interface loads
   - Test audio/video controls
   - Verify meeting participants can see each other

3. **Leave Meeting Test**
   - Click "Leave Meeting" button
   - Verify meeting ends properly
   - Check that user returns to initial state

### 2. Error Scenarios Test

1. **Network Disconnection**
   - Disconnect internet during meeting
   - Verify error handling
   - Reconnect and test recovery

2. **Invalid Meeting ID**
   - Use invalid meeting ID
   - Verify appropriate error message
   - Test retry functionality

3. **Permission Denied**
   - Test with user who doesn't have meeting access
   - Verify permission error handling

### 3. Browser Console Monitoring

Monitor browser console for:
- [ ] No JavaScript errors
- [ ] No CSP violations
- [ ] No network errors (except expected ones)
- [ ] Proper Zoom SDK initialization logs
- [ ] Clean error messages

### 4. Network Tab Monitoring

Check network requests for:
- [ ] Proper signature endpoint calls
- [ ] Zoom SDK resource loading
- [ ] No failed requests (except expected ones)
- [ ] Appropriate request headers

## Troubleshooting Common Issues

### Issue 1: "ZoomMtg is not defined"
**Solution**: Ensure Zoom SDK is properly imported and initialized
```typescript
import { ZoomMtg } from '@zoomus/websdk';
```

### Issue 2: "Process is not defined"
**Solution**: Check webpack configuration includes process polyfill
```javascript
'process': JSON.stringify({
  env: process.env,
  browser: true,
  version: process.version
})
```

### Issue 3: CSP Violations
**Solution**: Update CSP to allow Zoom domains
```html
<meta http-equiv="Content-Security-Policy" content="
  script-src 'self' https://source.zoom.us;
  connect-src 'self' https://zoom.us https://*.zoom.us;
  frame-src 'self' https://zoom.us https://*.zoom.us;
" />
```

### Issue 4: Signature Generation Fails
**Solution**: Verify backend endpoint is working and credentials are correct
```bash
curl -X POST http://localhost:3000/api/zoom/signature \
  -H "Content-Type: application/json" \
  -d '{"meetingNumber": "123456789", "role": 0}'
```

### Issue 5: Meeting UI Not Loading
**Solution**: Check that zmmtg-root div exists and has proper dimensions
```html
<div id="zmmtg-root" style="width: 100%; height: 600px;"></div>
```

## Performance Benchmarks

### Expected Performance Metrics

- **SDK Loading Time**: < 3 seconds
- **Meeting Join Time**: < 5 seconds
- **Memory Usage**: < 100MB additional
- **CPU Usage**: < 10% additional during meeting

### Monitoring Tools

- Browser DevTools Performance tab
- Network tab for request timing
- Memory tab for memory usage
- Console for error monitoring

## Production Deployment Checklist

- [ ] All tests pass
- [ ] CSP properly configured
- [ ] Backend signature endpoint secured
- [ ] Environment variables set
- [ ] HTTPS enabled
- [ ] Error monitoring configured
- [ ] Performance monitoring enabled
- [ ] User acceptance testing completed

## Support and Maintenance

### Regular Maintenance Tasks

1. **Update Zoom SDK**: Check for updates monthly
2. **Monitor Error Logs**: Review error logs weekly
3. **Performance Monitoring**: Check performance metrics weekly
4. **Security Updates**: Apply security patches promptly

### Documentation Updates

- Keep this testing guide updated
- Document any new issues and solutions
- Update troubleshooting section as needed
- Maintain API documentation

## Conclusion

This comprehensive testing approach ensures the Zoom integration is robust, secure, and provides a great user experience. Regular testing and monitoring will help maintain the quality of the integration over time.

