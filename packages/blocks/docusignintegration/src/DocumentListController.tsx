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

export const configJSON = require("./config");

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
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
        if (apiRequestCallId === this.getDocusignDetailsApiCallId) {
          this.setState({ documentDetails: [], loader: false });
        }
        return;
      }

      // Handle error responses (404, etc.)
      if (res.status === 404 || res.error) {
        console.warn("⚠️ DocuSign status endpoint returned error:", res.error || "Not Found");
        console.warn("This might be expected if DocuSign hasn't been started yet");
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
            const documentDetails = Array.isArray(res.document_signing_status) 
              ? res.document_signing_status 
              : [];
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
    if (document.is_docusign_start) {
      this.navigateToDocuSign(document.signing_urls);
    } else {
      this.startDocuSignForThisDoc(document.document_id);
    }
  };

  startDocuSignForThisDoc = async (docId: number) => {
    const bodyData = {
      document_id: docId,
      base_url: window.location.origin, // DocuSign will append /DocuSignSuccess automatically
    };
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
    return this.isNotaryUser() || hasDocuSignStartedForThisDocument;
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

  navigateToDocumentOpener = (docUrl: string) => {
    setStorageData("docUrl", docUrl);
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Document");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
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
