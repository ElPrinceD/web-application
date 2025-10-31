// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData, removeStorageData } from "../../../framework/src/Utilities";

// DocuSign integration - using direct iframe embedding (no SDK needed)

export const configJSON = require("./config");

interface DataofService {
  id: string;
  type: string;
  attributes: {
    id: number;
    service_icon?: {
      url: string;
    };
    service_name: string;
    service_description: string;
    is_selected: boolean;
  };
}

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
}

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  roleID: number;
  userName: string;
  userProfilePic: string | null;
  email: string;
  isSideBarOpen: boolean;
  notaryRequestId: string;
  modalOpen: boolean;
  cancelBookNowReqModal: boolean;
  loader: boolean;
  serviceData: Array<DataofService>;
  sender_url: string;
  zoomModal:boolean;
  // Zoom meeting data
  sdkKey: string;
  signature: string;
  meetingNumber: string;
  password: string;
  // DocuSign state
  isLoadingDocuSign: boolean;
  isLoadingZoom: boolean;
  signingUrlsArray: Array<{
    recipient_id: number;
    email: string;
    name: string;
    signing_url: string;
  }>;
}

interface SS {
  id: any;
}

export default class DocusignIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  getProfileApiCallId: string = "";
  getServicesApiCallId: string = "";
  zoomMeetingApiCallId: string = "";

  constructor(Props: Props) {
    super(Props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      roleID: 0,
      userName: "",
      userProfilePic: null,
      email: "",
      isSideBarOpen: false,
      notaryRequestId: "",
      modalOpen: false,
      cancelBookNowReqModal: false,
      loader: true,
      serviceData: [],
      sender_url: "",
      zoomModal:false,
      // Zoom meeting data
      sdkKey: "",
      signature: "",
      meetingNumber: "",
      password: "",
      // DocuSign state
      isLoadingDocuSign: false,
      isLoadingZoom: false,
      signingUrlsArray: [],
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(responseJson)) {
        switch (apiRequestCallId) {
          case this.getProfileApiCallId:
            this.setState({
              userName: responseJson.data.attributes.full_name,
              userProfilePic: responseJson.data.attributes.photo.url,
              roleID: responseJson.data.attributes.role_id,
              email: responseJson.data.attributes.email,
              loader: false,
            });
            break;
          case this.getServicesApiCallId:
            this.setState({ serviceData: responseJson.data, loader: false });
            break;
          case this.zoomMeetingApiCallId:
            console.log('Zoom meeting data received:', responseJson.zoom_meetings);
            this.setState({
              sdkKey: responseJson.zoom_meetings.zoom_sdk_key,
              signature: responseJson.zoom_meetings.signature,
              meetingNumber: responseJson.zoom_meetings.meeting_number.toString(),
              password: responseJson.zoom_meetings.meeting?.password || "",
              isLoadingZoom: false, // Clear loading state when data is received
            });
            break;
        }
      } else {
        // Handle API errors
        console.error(`❌ API Error for callId ${apiRequestCallId}:`, responseJson);
        
        if (apiRequestCallId === this.getProfileApiCallId) {
          console.error('Failed to fetch profile data');
          this.setState({ loader: false }); // Clear loader on profile error
        }
        if (apiRequestCallId === this.getServicesApiCallId) {
          console.error('Failed to fetch services data');
          this.setState({ loader: false }); // Clear loader on services error
        }
        if (apiRequestCallId === this.zoomMeetingApiCallId) {
          console.error('Failed to fetch Zoom meeting data');
          this.setState({ isLoadingZoom: false }); // Clear loading state on error
        }
      }
    }
  }

  async componentDidMount() {
    this.setState({ notaryRequestId: await getStorageData("notaryRequestId") });
    this.getProfile();
    this.getServicesAPI();
    
    // Check for multiple signers first (new format)
    const signingUrlsArrayStr = await getStorageData("docusign_signing_urls_array");
    if (signingUrlsArrayStr) {
      try {
        const signingUrlsArray = JSON.parse(signingUrlsArrayStr);
        if (Array.isArray(signingUrlsArray) && signingUrlsArray.length > 0) {
          // Validate all signing URLs
          const validSigningUrls = signingUrlsArray.filter(signer => 
            this.isValidSigningUrl(signer.signing_url)
          );
          
          if (validSigningUrls.length > 0) {
            console.log(`✅ Found ${validSigningUrls.length} valid signing URL(s)`);
            this.setState({ 
              signingUrlsArray: validSigningUrls,
              sender_url: validSigningUrls[0].signing_url,
              isLoadingDocuSign: false
            });
            return;
          } else {
            console.error("❌ No valid signing URLs found in signing_urls_array");
            // Clear invalid data
            removeStorageData("docusign_signing_urls_array");
          }
        }
      } catch (error) {
        console.error("Failed to parse signing_urls_array:", error);
      }
    }
    
    // Fallback to single URL (backward compatibility)
    const url = await getStorageData("doc_sign_url");
    if (url) {
      if (this.isValidSigningUrl(url)) {
        console.log("✅ Valid signing URL found:", url);
        this.setState({ 
          sender_url: url,
          isLoadingDocuSign: false
        });
      } else {
        console.error("❌ Invalid signing URL stored in doc_sign_url:", url);
        console.error("Please call the DocuSign API again to get a fresh signing URL");
        // Clear invalid URL
        removeStorageData("doc_sign_url");
        this.setState({ 
          sender_url: "",
          isLoadingDocuSign: false
        });
      }
    }

    // Set a timeout to clear loader if API calls take too long
    setTimeout(() => {
      if (this.state.loader) {
        console.warn('⚠️ Loader timeout - clearing loader after 10 seconds');
        this.setState({ loader: false });
      }
    }, 10000); // 10 second timeout
  }


  componentDidUpdate(prevProps: Props, prevState: S) {
    // Handle any state changes if needed
    // No iframe-related code needed anymore
  }

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint } = apiData;
    const header = {
      "Content-Type": contentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getProfile = async () => {
    this.getProfileApiCallId = await this.apiCall({
      contentType: configJSON.getProfileContentType,
      method: configJSON.getProfileApiMethodType,
      endPoint: configJSON.getProfileApiEndPoint,
    });
  };

  getServicesAPI = async () => {
    this.getServicesApiCallId = await this.apiCall({
      contentType: configJSON.allservicesApiContentType,
      method: configJSON.allServicesApiMethodType,
      endPoint: configJSON.allServicesApiEndpoint,
    });
  };

  isNotaryUser = () => this.state.roleID === 2;

  isEndUser = () => this.state.roleID === 1;

  openSideBar = () =>
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });

  setBookNowModal = (value: boolean) => this.setState({ modalOpen: value });

  closeBookNotaryRequestModal = () => {
    this.setBookNowModal(!this.state.modalOpen);
    this.setState({ cancelBookNowReqModal: true });
  };

  bookNowNoButtonClick = () => {
    this.setBookNowModal(!this.state.modalOpen);
    this.setState({ cancelBookNowReqModal: false });
  };

  findMainBoxWidth = () =>
    this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw";

  bookNowYesButtonClick = () => this.setState({ cancelBookNowReqModal: false });

  setLoader = (value: boolean) => this.setState({ loader: value });

  getZoomMeetingData = async () => {
    console.log('Fetching Zoom meeting data for notary request:', this.state.notaryRequestId);
    this.setState({ isLoadingZoom: true });
    
    // Set a timeout to clear loading state if API takes too long
    const timeoutId = setTimeout(() => {
      console.warn('Zoom meeting data request timed out');
      this.setState({ isLoadingZoom: false });
    }, 10000); // 10 second timeout
    
    try {
      this.zoomMeetingApiCallId = await this.apiCall({
        contentType: "application/json",
        method: "GET",
        endPoint: `bx_block_cfzoomintegration92/zoom_meetings?notary_request_id=${this.state.notaryRequestId}`,
      });
      
      // Clear timeout if API call succeeds
      clearTimeout(timeoutId);
    } catch (error) {
      console.error('Error fetching Zoom meeting data:', error);
      this.setState({ isLoadingZoom: false });
      clearTimeout(timeoutId);
    }
  };

  // Handle DocuSign signing completion (called when iframe completes signing)
  handleDocuSignComplete = (data: any) => {
    console.log("🎉 DocuSign signing completed successfully");
    // Handle completion logic here
    // You might want to show a success message or redirect
  };

  // Validate DocuSign signing URL
  isValidSigningUrl = (url: string | null | undefined): boolean => {
    if (!url || typeof url !== 'string') {
      return false;
    }
    
    // Valid signing URLs should match these patterns:
    // - https://demo.docusign.net/Signing/...
    // - https://demo.docusign.net/Member/PowerFormSigning.aspx?...
    // - https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=...
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

  // Handle DocuSign errors
  handleDocuSignError = (error: any) => {
    console.error("❌ DocuSign error occurred:", error);
    // Handle error logic here
    // You might want to show an error message or retry
  };

}
// Customizable Area End
