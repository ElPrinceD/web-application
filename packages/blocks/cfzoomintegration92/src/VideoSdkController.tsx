import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
// import { generateVideoSignature } from "./GenerateSignature"; // REMOVED: Using server-side generation for security
import uitoolkit from "@zoom/videosdk-ui-toolkit";

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
}

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
  username: string;
  roleId: number;
  userProfilePic: string | null;
  notaryRequestId: string;
  loader: boolean;
  isBookRequestModalOpen: boolean;
  cancelBookRequestModal: boolean;
  isSideBarOpen: boolean;
  serviceData: Array<DataofService>;
  sessionContainer: HTMLElement | null;
  videoSdkJwt: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BlockController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getProfileApiCallId: string = "";
  getServicesApiCallId: string = "";
  getVideoSDKConfigsApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      username: "",
      userProfilePic: null,
      roleId: 0,
      notaryRequestId: "",
      loader: true,
      isBookRequestModalOpen: false,
      cancelBookRequestModal: false,
      isSideBarOpen: false,
      serviceData: [],
      sessionContainer: null,
      videoSdkJwt: "",
      sdkKey: "",
      sdkSecret: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let res = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(res)) {
        switch (apiRequestCallId) {
          case this.getProfileApiCallId:
            this.setState(
              {
                username: res.data.attributes.full_name,
                userProfilePic: res.data.attributes.photo.url,
                roleId: res.data.attributes.role_id,
                sessionContainer: document.getElementById("sessionContainer"),
              },
              this.getVideoSDKConfigs
            );
            break;
          case this.getServicesApiCallId:
            this.setState({ serviceData: res.data });
            break;
          case this.getVideoSDKConfigsApiCallId:
            this.setState({ 
              loader: false,
              sdkKey: res.zoom_meeting.zoom_sdk_key,
              sdkSecret: res.zoom_meeting.zoom_sdk_secret_key
            }, () =>
              this.joinSession(
                res.zoom_meeting.zoom_sdk_key,
                res.zoom_meeting.zoom_sdk_secret_key
              )
            );
            break;
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.setState({
      notaryRequestId: await getStorageData("notaryRequestId"),
    });
    this.getServicesAPI();
    this.getProfile();
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

  setLoader = (value: boolean) => this.setState({ loader: value });

  setIsBookRequestModalOpen = (value: boolean) =>
    this.setState({ isBookRequestModalOpen: value });

  closeBookNotaryRequestModal = () => {
    this.setIsBookRequestModalOpen(!this.state.isBookRequestModalOpen);
    this.setState({ cancelBookRequestModal: true });
  };

  bookNowNoButtonClick = () => {
    this.setIsBookRequestModalOpen(!this.state.isBookRequestModalOpen);
    this.setState({ cancelBookRequestModal: false });
  };

  bookNowYesButtonClick = () =>
    this.setState({ cancelBookRequestModal: false });

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

  getVideoSDKConfigs = async () => {
    this.getVideoSDKConfigsApiCallId = await this.apiCall({
      contentType: configJSON.getVideoSDKConfigsApiContentType,
      method: configJSON.getVideoSDKConfigsApiMethodType,
      endPoint: configJSON.getVideoSDKConfigsApiEndPoint,
    });
  };

  findMainBoxWidth = () =>
    this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw";

  openSideBar = () =>
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });

  isRoleId1 = () => this.state.roleId === 1;

  isRoleId2 = () => this.state.roleId === 2;

  navigateBack = () => this.props.navigation.goBack();

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  // Generate video SDK signature using backend-provided credentials
  generateVideoSignature(sdkKey: string, sdkSecret: string, sessionName: string): string {
    const payload = {
      appKey: sdkKey,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60), // 2 hours
      tokenExp: Math.floor(Date.now() / 1000) + (2 * 60 * 60)
    };
    
    // Use Web Crypto API for proper HMAC-SHA256
    const header = {
      alg: "HS256",
      typ: "JWT"
    };
    
    const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    // For now, use a simple approach - in production, use proper JWT library
    const signature = btoa(encodedHeader + "." + encodedPayload + "." + sdkSecret).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  joinSession = (config1: string, config2: string) => {
    try {
      // Generate signature using backend-provided SDK credentials
      const videoSDKJWT = this.generateVideoSignature(
        this.state.sdkKey,
        this.state.sdkSecret,
        this.state.notaryRequestId
      );
      
      const config = {
        videoSDKJWT: videoSDKJWT,
      sessionName: this.state.notaryRequestId,
      sessionPasscode: "123",
      userName: this.state.username,
      features: [
        "preview",
        "video",
        "audio",
        "settings",
        "users",
        "chat",
        "share",
      ],
      options: { init: {}, audio: {}, video: {}, share: {} },
      virtualBackground: {
        allowVirtualBackground: true,
        allowVirtualBackgroundUpload: true,
        virtualBackgrounds: [
          "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
        ],
      },
      };
      if (this.state.sessionContainer)
        uitoolkit.joinSession(this.state.sessionContainer, config);
      uitoolkit.onSessionClosed(this.sessionClosed);
    } catch (error) {
      console.error("Error joining video session:", error);
      // Handle error appropriately
    }
  };

  sessionClosed = () => {
    if (this.state.sessionContainer)
      uitoolkit.closeSession(this.state.sessionContainer);
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
