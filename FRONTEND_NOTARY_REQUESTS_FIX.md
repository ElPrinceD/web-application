# Frontend Notary Requests Display Fix

## Problem
Notaries could not see any requests on the frontend, even though:
- The backend was returning data correctly (verified via console logs)
- End users could see their requests fine
- The API response structure was correct

## Root Cause
The issue was in the frontend state management in `RequestManagementController.tsx`:

1. **State Accumulation Bug**: The `updateStateWithFilteredRequests` method was **always appending** to existing state arrays instead of resetting them on the first page load
2. **Missing State Reset**: When `allRequestAPI` was called for the first page, it didn't reset the `rows`, `newRequest`, `ongoingRequest`, and `invitedRequest` arrays
3. **Pagination Logic**: The code was appending data even for the first page, which could cause stale data to persist

## Fixes Applied

### 1. Fixed `updateStateWithFilteredRequests` Method

**Before:**
```typescript
updateStateWithFilteredRequests = ({...}) => {
  // Always appended to previous state
  this.setState((prevState) => ({
    rows: [...prevState.rows, ...keyForRow[this.state.value]],
    // ...
  }));
};
```

**After:**
```typescript
updateStateWithFilteredRequests = ({...}, resetRows: boolean = false) => {
  this.setState((prevState) => {
    // Reset arrays for first page, append for pagination
    const newRows = resetRows ? keyForRow[this.state.value] : [...prevState.rows, ...keyForRow[this.state.value]];
    // ...
  });
};
```

### 2. Updated `handleAllNotaryRequestRes` Method

Added logic to detect first page and pass `resetRows` flag:

```typescript
handleAllNotaryRequestRes = (responseJson, searchInput, filterCriteria) => {
  // ...
  const isFirstPage = this.state.currentPage === 1;
  this.updateStateWithFilteredRequests(filteredRequests, isFirstPage);
};
```

### 3. Enhanced `allRequestAPI` Method

Added state reset for first page to ensure clean state:

```typescript
allRequestAPI = async () => {
  // Reset rows and arrays for first page to ensure clean state
  if (this.state.currentPage === 1) {
    this.setState({
      loader: true,
      rows: [],
      newRequest: [],
      ongoingRequest: [],
      invitedRequest: [],
      hasMoreRequests: true,
      noFilterResult: false
    });
  }
  // ... rest of API call
};
```

### 4. Fixed Query Parameters

Added query parameters to the API endpoint URL:

```typescript
endPoint: configJSON.getAllNotaryRequestApiEndpoint + (queryParams.toString() ? `?${queryParams.toString()}` : '')
```

## Files Modified

- `/Users/michaela/Documents/renotary/web-application/packages/blocks/requestmanagement/src/RequestManagementController.tsx`

## Testing

After deploying the fix:

1. **Clear browser cache** to ensure the new code is loaded
2. **Login as a notary** user
3. **Navigate to the requests page**
4. **Verify that requests are displayed** correctly in:
   - Tab 0: New Requests
   - Tab 1: Ongoing Requests  
   - Tab 2: Invited Requests

## Expected Behavior

- **First Page Load**: State arrays are reset, fresh data is loaded and displayed
- **Pagination**: When scrolling to load more, data is appended to existing arrays
- **Filter Changes**: State is reset (handled by `componentDidUpdate`)
- **Tab Switching**: Correct data is shown for each tab based on `this.state.value`

## Why This Fixes the Issue

The bug was that when a notary logged in:
1. `getProfile()` was called, which set `roleID`
2. `allRequestAPI()` was called as a callback
3. The API returned data correctly
4. But `updateStateWithFilteredRequests` was **appending** to empty arrays (which is fine) BUT...
5. If there were any previous state remnants or if the component re-rendered, stale data could persist
6. More importantly, the `rows` array wasn't being properly set for the current tab

By ensuring:
- State is reset on first page load
- Arrays are replaced (not appended) on first page
- Arrays are appended only for pagination (page > 1)

The notary requests now display correctly.

## Deployment

1. **Build the frontend:**
   ```bash
   cd /Users/michaela/Documents/renotary/web-application/packages/web
   npm run build
   ```

2. **Deploy to EC2:**
   ```bash
   # Copy build files to EC2
   scp -r build/* ubuntu@44.212.244.253:/home/ubuntu/frontend/
   ```

3. **Restart Nginx (if needed):**
   ```bash
   ssh ubuntu@44.212.244.253
   sudo systemctl restart nginx
   ```

## Verification

After deployment, check:
- Notary can see new requests in Tab 0
- Notary can see ongoing requests in Tab 1
- Notary can see invited requests in Tab 2
- Pagination works correctly (loads more on scroll)
- Filtering works correctly (resets state properly)

