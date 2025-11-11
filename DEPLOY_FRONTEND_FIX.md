# Deploy Frontend Notary Requests Fix

## Quick Deployment

The frontend has been built successfully. To deploy it to EC2, run:

```bash
cd /Users/michaela/Documents/renotary/web-application

# Set your SSH key (if you have one)
export SSH_KEY=~/.ssh/your-key.pem

# Run the deployment script
./deploy-frontend-fix.sh
```

## Manual Deployment (if script doesn't work)

### Step 1: Build (Already Done ✅)
The frontend has been built. Build files are in:
```
/Users/michaela/Documents/renotary/web-application/packages/web/build
```

### Step 2: Copy Files to EC2

```bash
# Option A: Using SCP with SSH key
scp -i ~/.ssh/your-key.pem -r \
  /Users/michaela/Documents/renotary/web-application/packages/web/build/* \
  ubuntu@44.212.244.253:/home/ubuntu/frontend/

# Option B: Using SCP without explicit key (uses default SSH keys)
scp -r \
  /Users/michaela/Documents/renotary/web-application/packages/web/build/* \
  ubuntu@44.212.244.253:/home/ubuntu/frontend/
```

### Step 3: Verify on Server

SSH into the server:
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@44.212.244.253
# or
ssh ubuntu@44.212.244.253
```

Then verify files:
```bash
ls -la /home/ubuntu/frontend/
# Should see index.html and static/ directory

# Check Nginx is serving the files
sudo systemctl status nginx
```

### Step 4: Restart Nginx (if needed)

```bash
sudo systemctl restart nginx
sudo systemctl status nginx
```

## Verification

1. **Clear Browser Cache:**
   - Chrome/Edge: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Firefox: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Safari: `Cmd+Option+E` (clear cache)

2. **Hard Refresh:**
   - Windows: `Ctrl+F5`
   - Mac: `Cmd+Shift+R`

3. **Test as Notary:**
   - Login as a notary user
   - Navigate to requests page
   - Verify requests are displaying in:
     - Tab 0: New Requests
     - Tab 1: Ongoing Requests
     - Tab 2: Invited Requests

## What Was Fixed

The frontend fix addresses the issue where notaries couldn't see requests even though the backend was returning data correctly. The fix:

1. **Resets state arrays on first page load** instead of appending
2. **Properly handles pagination** by appending only on subsequent pages
3. **Ensures clean state** when filters change or API is called

## Troubleshooting

### If requests still don't show:

1. **Check browser console** (F12) for JavaScript errors
2. **Verify API calls** in Network tab - should see successful calls to `/api/bx_block_menu_ordering/notary_requests`
3. **Check response structure** - should have `new_notary_requests.data` as an array
4. **Verify user role** - make sure you're logged in as a notary (role_id = 2)

### If deployment fails:

1. **Check SSH access:**
   ```bash
   ssh ubuntu@44.212.244.253
   ```

2. **Check directory permissions:**
   ```bash
   ssh ubuntu@44.212.244.253
   ls -la /home/ubuntu/frontend/
   sudo chown -R ubuntu:ubuntu /home/ubuntu/frontend/
   ```

3. **Check Nginx configuration:**
   ```bash
   ssh ubuntu@44.212.244.253
   sudo nginx -t
   sudo systemctl status nginx
   ```

## Files Changed

- `/Users/michaela/Documents/renotary/web-application/packages/blocks/requestmanagement/src/RequestManagementController.tsx`
  - Fixed `updateStateWithFilteredRequests` to reset on first page
  - Fixed `handleAllNotaryRequestRes` to detect first page
  - Enhanced `allRequestAPI` to reset state on first page

## Build Output

The build completed successfully with the following output:
- Main bundle: `main.b9c0fa5e.chunk.js` (638.99 KB)
- Vendor bundle: `2.e74946fa.chunk.js` (1.28 MB)
- All files are in: `/Users/michaela/Documents/renotary/web-application/packages/web/build`

