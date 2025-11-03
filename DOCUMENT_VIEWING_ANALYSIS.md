# Document Viewing Issue - Complete Analysis & Solutions

## 🔍 **Current Flow Analysis**

### **Document Source Paths:**

1. **RequestDetails Page** (uses request's file_documents):
   - API: `GET /bx_block_menu_ordering/notary_requests/{id}`
   - Response contains: `file_documents[]` array
   - Each document has: `doc_file_url: string`
   - Click handler: `navigateToDocumentOpener(doc.doc_file_url)`

2. **DocumentList (DocuSign) Page**:
   - API: `GET /bx_block_menu_ordering/docusign_status?notary_request_id={id}`
   - Response contains: `document_signing_status[]` array
   - Each document has: `document_url: string`
   - Click handler: `navigateToDocumentOpener(document.document_url)`

### **Navigation to DocumentOpener:**
- Both paths call: `setStorageData("docUrl", url)`
- Then navigate to: `/Document` route
- DocumentOpener reads: `docUrl` from localStorage
- Renders based on: file extension (img/pdf/doc)

## ❌ **Root Problems Identified**

### **Problem 1: URL Format Mismatch**
- **Issue**: `doc_file_url` from API is likely just a filename (e.g., `"3e3118c16cb5dc3cd8c2cd4be2.pdf"`)
- **Expected**: Full URL (e.g., `"http://localhost:3001/uploads/3e3118c16cb5dc3cd8c2cd4be2.pdf"`)
- **Impact**: Browser cannot fetch the file from just a filename
- **Evidence**: `handleDownload` uses `fetch(fileUrl)` which requires full URL

### **Problem 2: No URL Validation**
- **Issue**: No check if `docUrl` exists before storing in localStorage
- **Issue**: No check if `docUrl` is valid URL format
- **Impact**: Empty/invalid URLs stored, DocumentOpener gets empty string

### **Problem 3: Silent Failures**
- **Issue**: `findFileType()` fails silently if `docUrl` is empty
- **Issue**: Render only shows content if `type` is set, otherwise blank page
- **Impact**: User sees blank page with no error message

### **Problem 4: Header Parsing Error**
- **Issue**: Header tries to parse filename from `docUrl` even when empty
- **Line 57-62**: `this.state.docUrl.split("/").pop()?.split(".")...`
- **Impact**: Potential error if `docUrl` is undefined/null

### **Problem 5: Async Timing Issue**
- **Issue**: `componentDidMount` reads localStorage but no loading state
- **Issue**: `findFileType` called immediately but might run before state update
- **Impact**: Race condition possible

## 💡 **Solution Approaches**

### **Solution 1: Convert Relative URLs to Full URLs (Frontend Fix)**

**Where**: Before storing in localStorage

**In DocumentListController.tsx**:
```typescript
navigateToDocumentOpener = (docUrl: string) => {
  // Validate and convert to full URL
  if (!docUrl || docUrl.trim() === "") {
    console.error("❌ Cannot open document: Empty URL provided");
    alert("Document URL is missing. Please contact support.");
    return;
  }
  
  // If it's already a full URL, use as-is
  if (docUrl.startsWith("http://") || docUrl.startsWith("https://")) {
    setStorageData("docUrl", docUrl);
  } else {
    // It's a relative path/filename - prepend backend base URL
    const baseURL = "http://localhost:3001"; // Get from config
    const fullUrl = `${baseURL}/uploads/${docUrl}`;
    console.log("🔗 Converting relative URL to full URL:", { original: docUrl, full: fullUrl });
    setStorageData("docUrl", fullUrl);
  }
  
  // Navigate to Document route
  const message = new Message(getName(MessageEnum.NavigationMessage));
  message.addData(getName(MessageEnum.NavigationTargetMessage), "Document");
  message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  this.send(message);
};
```

**In RequestDetailsController.tsx**:
- Same logic when calling `navigateToDocumentOpener(doc.doc_file_url)`

**Pros**: 
- Works even if backend returns filenames
- No backend changes needed
- Immediate fix

**Cons**:
- Assumes upload path structure (`/uploads/`)
- Hardcoded base URL (should come from config)

### **Solution 2: Backend Returns Full URLs (Backend Fix)**

**What Backend Should Do**:
- `/notary_requests/{id}` should return `doc_file_url` as full URL
- `/docusign_status` should return `document_url` as full URL

**Backend Format**:
```json
{
  "file_documents": [
    {
      "doc_file_url": "http://localhost:3001/uploads/filename.pdf" // Full URL
    }
  ]
}
```

**Pros**: 
- Cleaner separation of concerns
- Frontend doesn't need URL manipulation
- More maintainable

**Cons**: 
- Requires backend changes
- Backend needs to know frontend's base URL (or use same domain)

### **Solution 3: Add Validation & Error Handling (Essential)**

**In DocumentOpenerController.web.tsx**:

```typescript
async componentDidMount() {
  const docUrl = await getStorageData("docUrl");
  
  // Validate URL exists
  if (!docUrl || docUrl.trim() === "") {
    console.error("❌ DocumentOpener: No docUrl in localStorage");
    this.setState({ 
      loader: false,
      docUrl: "",
      type: "error" // New type for error state
    });
    return;
  }
  
  // Validate URL format
  if (!docUrl.startsWith("http://") && !docUrl.startsWith("https://") && !docUrl.startsWith("data:")) {
    console.warn("⚠️ DocumentOpener: Invalid URL format:", docUrl);
    // Could try to convert here or show error
  }
  
  this.setState({ docUrl: docUrl }, this.findFileType);
}

findFileType = () => {
  if (!this.state.docUrl || this.state.docUrl.trim() === "") {
    this.setState({ type: "error" });
    return;
  }
  
  const fileExtension = this.state.docUrl.split(".").pop()?.toLowerCase() || "";
  if (fileExtension.includes("jpeg") || fileExtension.includes("jpg") || fileExtension.includes("png"))
    this.setState({ type: "img" });
  else if (fileExtension.includes("pdf"))
    this.setState({ type: "pdf" });
  else if (fileExtension.includes("doc") || fileExtension.includes("docx"))
    this.setState({ type: "doc" });
  else {
    console.warn("⚠️ Unknown file type:", fileExtension);
    this.setState({ type: "error" });
  }
};
```

**In DocumentOpener.web.tsx** - Add error state:

```typescript
{this.state.type === "error" && (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <Typography variant="h6" color="error">
      Unable to load document. The document URL is missing or invalid.
    </Typography>
    <Button onClick={this.navigateBack}>Go Back</Button>
  </Box>
)}
{this.state.type === "img" && ...}
{this.state.type === "pdf" && ...}
{this.state.type === "doc" && ...}
```

### **Solution 4: Support URL Parameters as Fallback**

**In DocumentOpenerController.web.tsx**:

```typescript
async componentDidMount() {
  // Try URL parameter first
  const queryParams = new URLSearchParams(window.location.search);
  const docUrlFromQuery = queryParams.get("docUrl");
  
  // Then try localStorage
  const docUrlFromStorage = await getStorageData("docUrl");
  
  const docUrl = docUrlFromQuery || docUrlFromStorage || "";
  
  if (!docUrl) {
    // Show error
    return;
  }
  
  this.setState({ docUrl }, this.findFileType);
}
```

### **Solution 5: Add Comprehensive Logging**

Add logging at every step to debug:

1. **Before storing**: Log what URL is being stored
2. **In DocumentOpener**: Log what was retrieved from localStorage
3. **After findFileType**: Log what type was determined
4. **If render fails**: Log why (empty URL, invalid type, etc.)

## 🎯 **Recommended Implementation Order**

### **Phase 1: Quick Fix (Frontend Validation)**
1. Add validation in `navigateToDocumentOpener` to check if URL exists
2. Add error handling in `DocumentOpenerController` for empty URLs
3. Show error message instead of blank page

### **Phase 2: URL Conversion (Frontend)**
1. Check if URL is relative vs absolute
2. Convert relative URLs to full URLs using base URL
3. Store full URL in localStorage

### **Phase 3: Backend Fix (Long-term)**
1. Update backend to return full URLs in API responses
2. Remove URL conversion logic from frontend
3. Clean up validation code

### **Phase 4: Enhanced Features**
1. Add URL parameter support
2. Add better error messages
3. Add retry logic for failed loads
4. Add loading states

## 📋 **Specific Code Changes Needed**

### **1. DocumentListController.tsx** - Line 367
```typescript
navigateToDocumentOpener = (docUrl: string) => {
  if (!docUrl || docUrl.trim() === "") {
    console.error("❌ Empty document URL provided");
    alert("Document URL is missing. Please contact support.");
    return;
  }
  
  // Convert relative URL to full URL if needed
  let fullUrl = docUrl;
  if (!docUrl.startsWith("http://") && !docUrl.startsWith("https://")) {
    const baseURL = "http://localhost:3001"; // TODO: Get from config
    fullUrl = `${baseURL}/uploads/${docUrl}`;
  }
  
  console.log("📄 Opening document:", { original: docUrl, fullUrl });
  setStorageData("docUrl", fullUrl);
  // ... rest of navigation
};
```

### **2. RequestDetailsController.tsx** - Line 2129
- Same validation and URL conversion

### **3. DocumentOpenerController.web.tsx** - Line 76
```typescript
async componentDidMount() {
  const docUrl = await getStorageData("docUrl");
  
  if (!docUrl || docUrl.trim() === "") {
    console.error("❌ DocumentOpener: No docUrl found");
    this.setState({ 
      loader: false,
      docUrl: "",
      type: "error"
    });
    return;
  }
  
  this.setState({ docUrl }, this.findFileType);
}
```

### **4. DocumentOpener.web.tsx** - Line 87
- Add error state rendering
- Add loading state
- Handle empty URL gracefully

## 🔧 **Configuration Needed**

1. **Get base URL from config**: Instead of hardcoding `"http://localhost:3001"`
   - Read from `packages/framework/src/config.js`
   - Use `config.baseURL`

2. **Document upload path**: Confirm where backend serves documents
   - Is it `/uploads/`?
   - Or `/public/uploads/`?
   - Or different path?

## ✅ **Testing Checklist**

After implementing fixes:

1. ✅ Document URL exists in API response
2. ✅ Document URL is valid (full URL or relative)
3. ✅ URL is converted to full URL if needed
4. ✅ URL is stored correctly in localStorage
5. ✅ DocumentOpener retrieves URL successfully
6. ✅ File type is determined correctly
7. ✅ Document renders (img/pdf/doc)
8. ✅ Error message shows if URL missing
9. ✅ Error message shows if URL invalid
10. ✅ User can navigate back on error

