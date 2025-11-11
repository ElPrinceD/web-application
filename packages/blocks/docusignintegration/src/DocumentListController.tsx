// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import {
  getStorageData,
  setStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
import { baseURL } from "../../../framework/src/config";

export const configJSON = require("./config");

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
  status?: number;
}

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
}

interface IDocumentSigningStatusEntity {
  document_id: number;
  file_name: string;
  signing_urls: string | null;
  is_docusign_start: boolean;
  signatory: ISignatoryEntity[];
  notary: INotaryEntity[];
  document_url: string;
}

interface ISignatoryEntity {
  name: string;
  email: string;
  is_signatory: boolean;
  signed: boolean;
}

interface INotaryEntity {
  name: string;
  email: string;
  signed: boolean;
}

export interface Props {
  navigation: any;
  id: string;
  roleID: number;
  email: string;
}

interface S {
  hasDocusignStartedForEven1Document: boolean;
  documentDetails: IDocumentSigningStatusEntity[];
  notaryRequestId: string;
  loader: boolean;
}

interface SS {
  id: any;
}

export default class DocumentListController extends BlockComponent<
  Props,
  S,
  SS
> {
  getDocusignDetailsApiCallId: string = "";
  startDocuSignApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      hasDocusignStartedForEven1Document: false,
      documentDetails: [],
      notaryRequestId: "",
      loader: true,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState(
      { notaryRequestId: await getStorageData("notaryRequestId") },
      this.getDocusignDetails
    );
  }

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors && responseJson.status !== 404;

  // Validate DocuSign signing URL
  isValidSigningUrl = (url: string | null | undefined): boolean => {
    if (!url || typeof url !== 'string') {
      return false;
    }
    
    // Valid signing URLs should match these patterns:
    // - https://demo.docusign.net/Signing/...
    // - https://demo.docusign.net/Member/PowerFormSigning.aspx?...
    // - https://na1.docusign.net/Signing/... (production)
    // - https://account-d.docusign.com/ is NOT a valid signing URL (account dashboard)
    
    const validSigningUrlPatterns = [
      /^https:\/\/demo\.docusign\.net\/(Signing|Member)/i,
      /^https:\/\/(na1|na2|na3|eu1|eu2|au1)\.docusign\.net\/(Signing|Member)/i,
    ];
    
    // Check if URL matches any valid pattern
    const isValid = validSigningUrlPatterns.some(pattern => pattern.test(url));
    
    // Explicitly reject account dashboard URLs
    if (url.includes('account-d.docusign.com') || url.includes('account.docusign.com')) {
      console.error("❌ Invalid DocuSign URL detected (account dashboard URL):", url);
      return false;
    }
    
    if (!isValid) {
      console.error("❌ Invalid DocuSign signing URL format:", url);
      console.error("Expected format: https://demo.docusign.net/Signing/... or https://demo.docusign.net/Member/PowerFormSigning.aspx?...");
    }
    
    return isValid;
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let res = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      // Handle null/undefined responses
      if (!res) {
        console.warn("⚠️ No response data received");
        console.log("🔵 [DocuSign API] Null response - User role:", {
          role_id: this.props.roleID,
          is_notary: this.isNotaryUser(),
          is_end_user: this.isEndUser()
        });
        if (apiRequestCallId === this.getDocusignDetailsApiCallId) {
          this.setState({ documentDetails: [], loader: false });
        }
        return;
      }

      // Handle error responses (404, etc.)
      if (res.status === 404 || res.error) {
        console.warn("⚠️ DocuSign status endpoint returned error:", res.error || "Not Found");
        console.warn("This might be expected if DocuSign hasn't been started yet");
        console.log("🔵 [DocuSign API Error] User role:", {
          role_id: this.props.roleID,
          is_notary: this.isNotaryUser(),
          is_end_user: this.isEndUser(),
          error: res.error || res.status
        });
        if (apiRequestCallId === this.getDocusignDetailsApiCallId) {
          // Set empty array instead of undefined to prevent React errors
          this.setState(
            { documentDetails: [], loader: false },
            this.checkDocusignStartForAtleast1Doc
          );
        }
        return;
      }

      if (this.isValidResponse(res)) {
        switch (apiRequestCallId) {
          case this.getDocusignDetailsApiCallId:
            // Ensure documentDetails is always an array
            const allDocumentDetails = Array.isArray(res.document_signing_status) 
              ? res.document_signing_status 
              : [];
            
            // Deduplicate documents by document_id - keep only one document per document_id
            // If there are duplicates, prefer the original document (is_original: true) if available
            const documentMap = new Map<number, any>();
            allDocumentDetails.forEach((doc: any) => {
              const docId = doc.document_id;
              if (!documentMap.has(docId)) {
                // First occurrence of this document_id - add it
                documentMap.set(docId, doc);
              } else {
                // Duplicate found - prefer original if available
                const existingDoc = documentMap.get(docId);
                if (doc.is_original === true && existingDoc.is_original !== true) {
                  // Current doc is original, existing is not - replace
                  documentMap.set(docId, doc);
                }
                // Otherwise keep the existing one
              }
            });
            
            // Convert map back to array
            const documentDetails = Array.from(documentMap.values());
            
            // Log document URLs for debugging
            console.log("🔵 [DocuSign API Response] Received document details:", {
              total_documents_before_dedup: allDocumentDetails.length,
              total_documents_after_dedup: documentDetails.length,
              duplicates_removed: allDocumentDetails.length - documentDetails.length,
              user_role: this.props.roleID,
              is_notary: this.isNotaryUser(),
              is_end_user: this.isEndUser(),
              documents: documentDetails.map((doc: any) => ({
                document_id: doc.document_id,
                file_name: doc.file_name,
                document_url: doc.document_url,
                document_url_type: typeof doc.document_url,
                document_url_length: doc.document_url?.length || 0,
                is_docusign_start: doc.is_docusign_start,
                is_original: doc.is_original,
                will_be_shown_to_user: this.isThisDocumentShown(doc.is_docusign_start)
              }))
            });
            
            // Log which documents will be shown/hidden
            const visibleDocs = documentDetails.filter((doc: any) => 
              this.isThisDocumentShown(doc.is_docusign_start)
            );
            const hiddenDocs = documentDetails.filter((doc: any) => 
              !this.isThisDocumentShown(doc.is_docusign_start)
            );
            console.log("🔵 [DocuSign Visibility] Documents visible:", visibleDocs.length, visibleDocs);
            console.log("🔵 [DocuSign Visibility] Documents hidden:", hiddenDocs.length, hiddenDocs);
            
            this.setState(
              { documentDetails, loader: false },
              this.checkDocusignStartForAtleast1Doc
            );
            break;
          case this.startDocuSignApiCallId:
            setStorageData("docusign_envelope_id", res.envelope_id);
            setStorageData("docusign_access_token", res.access_token);
            // Handle new API response format with signing_urls_array
            if (res.signing_urls_array && res.signing_urls_array.length > 0) {
              // Validate all signing URLs before storing
              const validSigningUrls = res.signing_urls_array.filter((signer: any) => 
                this.isValidSigningUrl(signer.signing_url)
              );
              
              if (validSigningUrls.length > 0) {
                console.log(`✅ Received ${validSigningUrls.length} valid signing URL(s)`);
                setStorageData("docusign_signing_urls_array", JSON.stringify(validSigningUrls));
                setStorageData("doc_sign_url", validSigningUrls[0].signing_url);
                this.navigateToDocuSign(validSigningUrls[0].signing_url);
              } else {
                console.error("❌ No valid signing URLs received from API");
                console.error("Received URLs:", res.signing_urls_array);
                // Don't navigate - show error instead
                this.setState({ loader: false });
              }
            } else if (res.signing_urls) {
              // Fallback to single URL format (backward compatibility)
              const url = typeof res.signing_urls === 'string' ? res.signing_urls : res.signing_urls.url;
              if (this.isValidSigningUrl(url)) {
                console.log("✅ Valid signing URL received:", url);
                setStorageData("doc_sign_url", url);
                this.navigateToDocuSign(url);
              } else {
                console.error("❌ Invalid signing URL received from API:", url);
                this.setState({ loader: false });
              }
            } else {
              console.error("❌ No signing URLs received from API");
              this.setState({ loader: false });
            }
            break;
        }
      }
    }
  }

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint, body } = apiData;
    const header = {
      "Content-Type": contentType,
      token: token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    message.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    body &&
      message.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    runEngine.sendMessage(message.id, message);
    return message.messageId;
  };

  getDocusignDetails = async () => {
    this.getDocusignDetailsApiCallId = await this.apiCall({
      contentType: configJSON.getDocusignDetailsApiContentType,
      method: configJSON.getDocusignDetailsApiMethodType,
      endPoint: configJSON.getDocusignApiEndpoint + this.state.notaryRequestId,
    });
  };

  checkDocusignStartForAtleast1Doc = () => {
    this.setState({
      hasDocusignStartedForEven1Document: this.state.documentDetails.some(
        (document) => document.is_docusign_start === true
      ),
    });
  };

  areDocumentsShown = () => {
    return this.isNotaryUser() || this.state.hasDocusignStartedForEven1Document;
  };

  handleStartOrSignNowButtonClick = (
    document: IDocumentSigningStatusEntity
  ) => {
    this.setState({ loader:true});
    setStorageData("documentId", document.document_id);
    
    // Log document details for debugging
    console.log("🔵 [DocuSign Start] Starting DocuSign with document:", {
      document_id: document.document_id,
      file_name: document.file_name,
      document_url: document.document_url,
      is_docusign_start: document.is_docusign_start,
      signing_urls: document.signing_urls
    });
    
    if (document.is_docusign_start) {
      this.navigateToDocuSign(document.signing_urls);
    } else {
      // Pass both document_id and document_url to ensure backend uses correct document
      this.startDocuSignForThisDoc(document.document_id, document.document_url);
    }
  };

  startDocuSignForThisDoc = async (docId: number, documentUrl?: string) => {
    const bodyData: any = {
      document_id: docId,
      base_url: window.location.origin, // DocuSign will append /DocuSignSuccess automatically
    };
    
    // Include document_url if provided to ensure backend uses the correct document
    if (documentUrl) {
      bodyData.document_url = documentUrl;
      console.log("🔵 [DocuSign Start] Including document_url in request:", documentUrl);
    } else {
      console.warn("⚠️ [DocuSign Start] No document_url provided, backend will use document_id only");
    }
    
    console.log("🔵 [DocuSign Start] Sending request to backend:", bodyData);
    
    this.startDocuSignApiCallId = await this.apiCall({
      contentType: configJSON.startDocuSignApiContentType,
      method: configJSON.startDocuSignApiMethodType,
      endPoint: configJSON.startDocuSignApiEndpoint,
      body: bodyData,
    });
  };

  navigateToDocuSign = (sender_url: string | null) => {
    if (!sender_url) {
      console.error("❌ Cannot navigate: No signing URL provided");
      this.setState({ loader: false });
      return;
    }
    
    // Validate URL before storing and navigating
    if (!this.isValidSigningUrl(sender_url)) {
      console.error("❌ Cannot navigate: Invalid signing URL:", sender_url);
      this.setState({ loader: false });
      return;
    }
    
    console.log("✅ Navigating to DocuSign with valid URL:", sender_url);
    this.setState({ loader: false });
    setStorageData("doc_sign_url", sender_url);
    window.open(window.location.origin + "/DocuSign", "_blank");
   };

  isStartOrSignNowButtonShown = (document: IDocumentSigningStatusEntity) => {
    const signatory = document.signatory.find(
      (signatory) => signatory.email === this.props.email
    );
    const allSignatoriesSigned =
      document.is_docusign_start &&
      document.signatory
        .filter((signatory) => signatory.is_signatory)
        .every((signatory) => signatory.signed);
    return (
      (this.isEndUser() &&
        document.is_docusign_start &&
        (signatory ? !signatory.signed && signatory.is_signatory : false)) ||
      (this.isNotaryUser() &&
        !document.notary[0].signed &&
        (!document.is_docusign_start ||
          (document.is_docusign_start && allSignatoriesSigned)))
    );
  };

  isSignedOrPending = (isSigned: boolean) => {
    return isSigned ? "SIGNED" : "PENDING";
  };

  isStartOrSignNow = (hasDocuSignStartedForThisDocument: boolean) =>
    this.isNotaryUser() && !hasDocuSignStartedForThisDocument
      ? "Start"
      : "Sign Now";

  isThisDocumentShown = (hasDocuSignStartedForThisDocument: boolean) => {
    // Notaries always see documents
    if (this.isNotaryUser()) {
      console.log("🔵 [isThisDocumentShown] Notary user - always showing document");
      return true;
    }
    
    // End users see documents once DocuSign has started for at least one document
    // OR if the document itself has DocuSign started
    // This allows end users to see documents after the notary initiates DocuSign
    const result = this.state.hasDocusignStartedForEven1Document || hasDocuSignStartedForThisDocument;
    console.log("🔵 [isThisDocumentShown] End user check:", {
      is_end_user: this.isEndUser(),
      role_id: this.props.roleID,
      has_docusign_started_for_any: this.state.hasDocusignStartedForEven1Document,
      has_docusign_started_for_this: hasDocuSignStartedForThisDocument,
      will_show: result
    });
    return result;
  };

  findSignatories = (noOfSignatories: number) => {
    return noOfSignatories === 1
      ? "1 Signatory"
      : noOfSignatories + " Signatories";
  };

  isEndUser = () => {
    return this.props.roleID === 1;
  };

  isNotaryUser = () => {
    return this.props.roleID === 2;
  };

  navigateToDocumentOpener = async (docUrl: string) => {
    console.log("🔵 [DocuSign navigateToDocumentOpener] Called with:", {
      docUrl,
      type: typeof docUrl,
      isNull: docUrl === null,
      isUndefined: docUrl === undefined,
      isEmpty: docUrl === "",
      trimmed: docUrl?.trim()
    });
    
    // ✅ VALIDATION: Check if URL exists
    if (!docUrl || docUrl.trim() === "") {
      console.error("❌ [DocuSign navigateToDocumentOpener] Empty document URL provided");
      alert("Document URL is missing. Please contact support.");
      return;
    }
    
    // ✅ VALIDATION: Ensure it's a full URL (backend should provide this, but double-check)
    let fullUrl = docUrl.trim();
    console.log("🔵 [DocuSign navigateToDocumentOpener] Trimmed URL:", fullUrl);
    
    // If somehow we get a relative URL, convert it (shouldn't happen, but safety net)
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://") && !fullUrl.startsWith("data:")) {
      console.warn("⚠️ [DocuSign navigateToDocumentOpener] Received relative URL, converting to full URL:", {
        original: fullUrl,
        baseURL: baseURL
      });
      fullUrl = `${baseURL}${fullUrl.startsWith("/") ? "" : "/"}${fullUrl}`;
    }
    
    console.log("🔵 [DocuSign navigateToDocumentOpener] Final URL to store:", fullUrl);
    
    // Store in localStorage
    await setStorageData("docUrl", fullUrl);
    console.log("🔵 [DocuSign navigateToDocumentOpener] Stored in localStorage. Verifying...");
    
    // Verify what was stored
    const storedUrl = await getStorageData("docUrl");
    console.log("🔵 [DocuSign navigateToDocumentOpener] Retrieved from localStorage:", storedUrl);
    
    // Navigate to Document route
    console.log("🔵 [DocuSign navigateToDocumentOpener] Navigating to Document route...");
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Document");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
    console.log("🔵 [DocuSign navigateToDocumentOpener] Navigation message sent");
  };

  handleDownload = async (fileUrl: string, fileName: string) => {
    const response = await fetch(fileUrl);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(await response.blob());
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(
      window.URL.createObjectURL(await response.blob())
    );
  };
}
// Customizable Area End
