// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";

// DocuSign JS SDK TypeScript declarations
declare global {
  interface Window {
    DocuSign: any;
  }
}

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
  // DocuSign JS SDK state
  isLoadingDocuSign: boolean;
  isLoadingZoom: boolean;
  docusignInitialized: boolean;
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
      // DocuSign JS SDK state
      isLoadingDocuSign: false,
      isLoadingZoom: false,
      docusignInitialized: false,
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
            this.setState({ serviceData: responseJson.data });
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
    const url = await getStorageData("doc_sign_url")
    if (url) {
      this.setState({ sender_url: url }, () => {
        // Initialize DocuSign JS SDK after URL is set
        this.initializeDocuSignSDK();
      });
    }
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

  // Initialize DocuSign JS SDK
  initializeDocuSignSDK = async () => {
    if (!this.state.sender_url) {
      console.error("No DocuSign URL available");
      return;
    }

    this.setState({ isLoadingDocuSign: true });

    try {
      // Load DocuSign JS SDK dynamically
      await this.loadDocuSignSDK();
      
      // Initialize DocuSign with Focused View
      await this.initializeDocuSignFocusedView();
      
      this.setState({ 
        isLoadingDocuSign: false, 
        docusignInitialized: true 
      });
      
      console.log("✅ DocuSign JS SDK initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize DocuSign JS SDK:", error);
      this.setState({ isLoadingDocuSign: false });
      
      // Fallback to popup window
      this.initializeDocuSignPopup();
    }
  };

  // Load DocuSign JS SDK from CDN
  loadDocuSignSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if DocuSign SDK is already loaded
      if (window.DocuSign) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://demo.docusign.net/restapi/sdk/docusign-js/v1/docusign-js.js';
      script.async = true;
      script.onload = () => {
        console.log("✅ DocuSign JS SDK loaded");
        resolve();
      };
      script.onerror = () => {
        console.error("❌ Failed to load DocuSign JS SDK");
        reject(new Error("Failed to load DocuSign JS SDK"));
      };
      
      document.head.appendChild(script);
    });
  };

  // Initialize DocuSign with Focused View
  initializeDocuSignFocusedView = async () => {
    const container = document.getElementById('docusign-container');
    if (!container) {
      throw new Error("DocuSign container not found");
    }

    // Clear container
    container.innerHTML = '';

    try {
      // Use DocuSign JS SDK to render signing experience
      const docusign = new window.DocuSign({
        environment: 'demo', // or 'production' for live
        accountId: this.extractAccountIdFromUrl(this.state.sender_url),
      });

      // Initialize the signing session
      await docusign.open({
        url: this.state.sender_url,
        container: container,
        width: '100%',
        height: '100%',
        showHeader: false,
        showNavigation: true,
        showFinishButton: true,
        onSigningComplete: (data: any) => {
          console.log("✅ DocuSign signing completed:", data);
          this.handleDocuSignComplete(data);
        },
        onError: (error: any) => {
          console.error("❌ DocuSign error:", error);
          this.handleDocuSignError(error);
        }
      });

    } catch (error) {
      console.error("❌ DocuSign initialization error:", error);
      throw error;
    }
  };

  // Fallback: Initialize DocuSign with popup window
  initializeDocuSignPopup = () => {
    const container = document.getElementById('docusign-container');
    if (!container) {
      console.error("DocuSign container not found");
      return;
    }

    // Create popup-style iframe as fallback
    const iframe = document.createElement('iframe');
    iframe.src = this.state.sender_url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    
    container.appendChild(iframe);
    
    console.log("✅ DocuSign popup fallback initialized");
  };

  // Extract account ID from DocuSign URL
  extractAccountIdFromUrl = (url: string): string => {
    // This is a placeholder - you'll need to implement based on your URL structure
    const match = url.match(/accountId=([^&]+)/);
    return match ? match[1] : '';
  };

  // Handle DocuSign signing completion
  handleDocuSignComplete = (data: any) => {
    console.log("🎉 DocuSign signing completed successfully");
    // Handle completion logic here
    // You might want to show a success message or redirect
  };

  // Handle DocuSign errors
  handleDocuSignError = (error: any) => {
    console.error("❌ DocuSign error occurred:", error);
    // Handle error logic here
    // You might want to show an error message or retry
  };

}
// Customizable Area End
