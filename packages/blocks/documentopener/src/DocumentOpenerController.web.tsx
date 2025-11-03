import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import {
  getStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
const { baseURL } = require("../../../framework/src/config");
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loader: boolean;
  isDrawerOpen: boolean;
  docUrl: string;
  type: string;
  blobUrl: string;
  loadError: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DocumentOpenerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loader: false,
      isDrawerOpen: false,
      docUrl: "",
      type: "",
      blobUrl: "",
      loadError: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    console.log("🟢 [DocumentOpener] componentDidMount started");
    
    // Retrieve URL from localStorage
    console.log("🟢 [DocumentOpener] Retrieving docUrl from localStorage...");
    const docUrl = await getStorageData("docUrl");
    console.log("🟢 [DocumentOpener] Retrieved from localStorage:", {
      docUrl,
      type: typeof docUrl,
      isNull: docUrl === null,
      isUndefined: docUrl === undefined,
      isEmpty: docUrl === "",
      length: docUrl?.length || 0
    });
    
    // ✅ VALIDATION: Check if URL exists
    if (!docUrl || docUrl.trim() === "") {
      console.error("❌ [DocumentOpener] No docUrl found in localStorage");
      this.setState({ 
        loader: false,
        docUrl: "",
        type: "error" // New error state
      });
      return;
    }
    
    // ✅ VALIDATION: Check URL format
    const trimmedUrl = docUrl.trim();
    console.log("🟢 [DocumentOpener] Trimmed URL:", trimmedUrl);
    
    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://") && !trimmedUrl.startsWith("data:")) {
      console.error("❌ [DocumentOpener] Invalid URL format:", trimmedUrl);
      this.setState({ 
        loader: false,
        docUrl: "",
        type: "error"
      });
      return;
    }
    
    console.log("🟢 [DocumentOpener] URL is valid. Setting state and finding file type...");
    // Set URL and determine file type
    this.setState({ docUrl: trimmedUrl }, () => {
      console.log("🟢 [DocumentOpener] State set. Calling findFileType...");
      this.findFileType();
    });
  }

  findFileType = () => {
    const { docUrl } = this.state;
    console.log("🟢 [DocumentOpener] findFileType called with docUrl:", docUrl);
    
    // ✅ VALIDATION: Double-check URL exists
    if (!docUrl || docUrl.trim() === "") {
      console.error("❌ [DocumentOpener] findFileType: URL is empty");
      this.setState({ type: "error", loader: false });
      return;
    }
    
    // Extract file extension
    const fileExtension = docUrl.split(".").pop()?.toLowerCase() || "";
    console.log("🟢 [DocumentOpener] Extracted file extension:", fileExtension);
    
    // Determine type based on extension
    let detectedType = "";
    if (fileExtension.includes("jpeg") || fileExtension.includes("jpg") || fileExtension.includes("png") || fileExtension.includes("gif")) {
      console.log("🟢 [DocumentOpener] Detected as image");
      detectedType = "img";
    } else if (fileExtension.includes("pdf")) {
      console.log("🟢 [DocumentOpener] Detected as PDF");
      detectedType = "pdf";
    } else if (fileExtension.includes("doc") || fileExtension.includes("docx")) {
      console.log("🟢 [DocumentOpener] Detected as Word document");
      detectedType = "doc";
    } else {
      console.warn("⚠️ [DocumentOpener] Unknown file type:", fileExtension, "- defaulting to PDF");
      detectedType = "pdf";
    }
    
    this.setState({ type: detectedType, loader: false }, () => {
      console.log("🟢 [DocumentOpener] State updated successfully:", {
        docUrl: this.state.docUrl,
        type: this.state.type,
        loader: this.state.loader
      });
      
      // For PDFs, try to fetch with authentication as a fallback
      if (detectedType === "pdf" && docUrl) {
        this.fetchPdfWithAuth(docUrl);
      }
    });
  };

  fetchPdfWithAuth = async (url: string) => {
    try {
      console.log("🔄 [DocumentOpener] Attempting to fetch PDF with authentication...");
      const token = await getStorageData("token");
      
      if (!token) {
        console.warn("⚠️ [DocumentOpener] No token available, using direct iframe URL");
        return;
      }

      // Check if URL is from our backend
      const isBackendUrl = url.includes(baseURL) || url.startsWith("http://localhost:3001") || url.startsWith("https://localhost:3001");
      
      if (!isBackendUrl) {
        console.log("ℹ️ [DocumentOpener] URL is not from our backend, using direct iframe URL");
        return;
      }

      console.log("🔄 [DocumentOpener] Fetching PDF with auth token...");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "token": token,
        },
        // Don't use credentials: "include" - it conflicts with CORS wildcard
      });

      if (!response.ok) {
        console.error(`❌ [DocumentOpener] PDF fetch failed with status ${response.status}:`, {
          status: response.status,
          statusText: response.statusText,
          url: url
        });
        this.setState({ loadError: true });
        return;
      }

      // Check if response is actually a PDF
      const contentType = response.headers.get("content-type");
      console.log("📄 [DocumentOpener] Response content-type:", contentType);
      
      if (contentType && !contentType.includes("pdf") && !contentType.includes("application/octet-stream")) {
        console.warn("⚠️ [DocumentOpener] Response is not a PDF, content-type:", contentType);
        // Still try to create blob - might work
      }

      const blob = await response.blob();
      console.log("✅ [DocumentOpener] PDF fetched successfully, blob size:", blob.size, "bytes, type:", blob.type);
      
      if (blob.size === 0) {
        console.error("❌ [DocumentOpener] Fetched blob is empty!");
        this.setState({ loadError: true });
        return;
      }
      
      // Create blob URL from the fetched PDF
      const blobUrl = URL.createObjectURL(blob);
      this.setState({ blobUrl });
      console.log("✅ [DocumentOpener] Blob URL created successfully:", blobUrl);
    } catch (error) {
      console.error("❌ [DocumentOpener] Error fetching PDF with auth:", error);
      // Don't set error state here - let the iframe try to load directly
      this.setState({ loadError: false });
    }
  };

  async componentWillUnmount() {
    // Clean up blob URL to prevent memory leaks
    if (this.state.blobUrl) {
      URL.revokeObjectURL(this.state.blobUrl);
    }
  }

  navigateBack = () => {
    removeStorageData("docUrl");
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
