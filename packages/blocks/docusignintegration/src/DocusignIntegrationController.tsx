// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";

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
            });
            break;
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
        const iframe = document.getElementById(
          "docusign-iframe"
        ) as HTMLIFrameElement;
        iframe.style.display = "block";
      });
    }
  }

  componentDidUpdate(prevProps: Props, prevState: S) {
    // Protect DocuSign iframe when Zoom modal is shown
    if (this.state.zoomModal && !prevState.zoomModal) {
      setTimeout(() => {
        const docusignIframe = document.getElementById("docusign-iframe");
        if (docusignIframe) {
          docusignIframe.style.zIndex = "2";
          docusignIframe.style.position = "relative";
          docusignIframe.style.pointerEvents = "auto";
          docusignIframe.style.display = "block";
          docusignIframe.style.visibility = "visible";
          docusignIframe.style.opacity = "1";
          console.log("✅ DocuSign iframe protected in componentDidUpdate");
          
          // Ensure iframe content is loaded
          const iframe = docusignIframe as HTMLIFrameElement;
          if (iframe.src && this.state.sender_url) {
            // Force iframe to reload if content is not visible
            const checkContent = () => {
              try {
                if (iframe.contentDocument && iframe.contentDocument.body.innerHTML.trim() === '') {
                  console.log("🔄 Reloading DocuSign iframe content...");
                  iframe.src = this.state.sender_url;
                }
              } catch (e) {
                // Cross-origin access denied, which is normal
              }
            };
            
            // Check after a delay to allow iframe to load
            setTimeout(checkContent, 1000);
          }
        }
      }, 100);
    }
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
    this.zoomMeetingApiCallId = await this.apiCall({
      contentType: "application/json",
      method: "GET",
      endPoint: `bx_block_cfzoomintegration92/zoom_meetings?notary_request_id=${this.state.notaryRequestId}`,
    });
  };
}
// Customizable Area End
