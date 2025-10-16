import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// import generateSignature from "./GenerateSignature"; // REMOVED: Using server-side generation for security
import { ZoomMtg } from "@zoom/meetingsdk";
import { getStorageData } from "../../../framework/src/Utilities";

// Import Zoom SDK CSS - temporarily commented out until package is properly installed
// import "@zoom/meetingsdk/dist/css/bootstrap.css";
// import "@zoom/meetingsdk/dist/css/react-select.css";
interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}
interface APIPayloadType {
  contentType?: string;
  method: string;
  endPoint: string;
  body?: object;
  token?: string;
  type?: string;
}
interface IProfile {
  data: IProfileData;
}
interface IProfileData {
  id: string;
  type: string;
  attributes: IProfileAttributes;
}
interface IProfileAttributes {
  id: number;
  first_name?: null;
  last_name?: null;
  full_phone_number: string;
  city?: null;
  post_code?: null;
  country_code?: null;
  phone_number?: null;
  email: string;
  activated: boolean;
  user_type: string;
  user_name?: null;
  platform?: null;
  suspend_until?: null;
  status: string;
  role_id: number;
  full_name: string;
  gender?: null;
  date_of_birth?: null;
  age?: null;
  country?: null;
  address?: null;
  address_line_2?: null;
  contact_name: string;
  company_name: string;
  photo: IProfilePhoto;
}
interface IProfilePhoto {
  url: string | null;
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  sdkKey: string;
  sdkSecret: string;
  meetingNumber: string;
  passWord: string;
  role: number;
  userName: string;
  userEmail: string;
  isSideBarOpen: boolean;
  modalOpen: boolean;
  userProfilePic: string | null;
  status: string;
  roleID:number;
  loader:boolean;
  notaryRequestId:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Cfzoomintegration92Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProfileApiCallId: string = "";
  zoomCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      sdkKey: "",
      sdkSecret: "",
      meetingNumber: "",
      passWord: "",
      signature: "", // Backend-provided signature
      role: 0,
      userName: "",
      userEmail: "",
      isSideBarOpen: false,
      modalOpen: false,
      userProfilePic: null,
      status: "",
      roleID:0,
      loader:false,
      notaryRequestId: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(webResponseJson)) {
        switch (webApiRequestCallId) {
          case this.getProfileApiCallId:
            this.setState({
              userName: webResponseJson.data.attributes.full_name,
              userEmail: webResponseJson.data.attributes.email,
            },this.getZoomApi);
            break;
          case this.zoomCallId:
            console.log('Backend response data:', webResponseJson.zoom_meetings);
            console.log('Meeting number from backend:', webResponseJson.zoom_meetings.meeting_number);
            console.log('Meeting ID from backend:', webResponseJson.zoom_meetings.meeting?.id);
            console.log('Signature from backend:', webResponseJson.zoom_meetings.signature);
            console.log('Signature type:', webResponseJson.zoom_meetings.signature_type || 'jwt');
            console.log('Meeting password:', webResponseJson.zoom_meetings.meeting?.password);
            
            this.setState({
              sdkSecret: webResponseJson.zoom_meetings.zoom_sdk_secret_key,
              sdkKey: webResponseJson.zoom_meetings.zoom_sdk_key,
              meetingNumber: webResponseJson.zoom_meetings.meeting_number.toString(), // Use meeting_number directly
              passWord: webResponseJson.zoom_meetings.meeting.password,
              signature: webResponseJson.zoom_meetings.signature, // Use existing backend signature
              loader:true,
            }, this.startZoomMeeting)
            break
        }
      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    this.getProfile();
    const notaryRequestId = await getStorageData("notaryRequestId")
    this.setState({notaryRequestId:notaryRequestId});
  }

  async componentWillUnmount() {
    // Clean up Zoom if still active
    try {
      if ((window as any).ZoomMtg) {
        (window as any).ZoomMtg.leaveMeeting({});
      }
    } catch (err) {
      console.log("Cleanup error:", err);
    }
  }

  startZoomMeeting() {
    const fullUrl = window.location.href; 
    const baseUrl = new URL(fullUrl).origin;
    
    try {
      console.log('Starting Zoom meeting with config:', {
        sdkKey: this.state.sdkKey,
        meetingNumber: this.state.meetingNumber,
        userName: this.state.userName,
        userEmail: this.state.userEmail
      });
      
      // Initialize Zoom SDK only when needed
      ZoomMtg.preLoadWasm();
      ZoomMtg.prepareWebSDK();
      
      // Show meeting container
      const zoomRoot = document.getElementById("zmmtg-root");
      if (zoomRoot) {
        zoomRoot.style.display = "block";
      }
      
      ZoomMtg.init({
        leaveUrl: `${baseUrl}/${this.state.notaryRequestId}`,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        success: (res: any) => {
          console.log('Zoom SDK initialized successfully:', res);
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
          this.joinMeeting();
        },
        error: (err: any) => {
          console.error("Zoom init error:", err);
          this.setState({ loader: false });
        }
      });
    } catch (error) {
      console.error("Error in startZoomMeeting:", error);
      this.setState({ loader: false });
    }
  }
  
  // Signature is now provided by existing backend API response

  joinMeeting() {
    try {
      // Validate meeting number
      if (!this.state.meetingNumber || this.state.meetingNumber === '') {
        console.error('Meeting number is empty or invalid');
        this.setState({ loader: false });
        return;
      }
      
      // Ensure meeting number is a clean numeric string
      const cleanMeetingNumber = this.state.meetingNumber.replace(/\D/g, '');
      console.log('Original meeting number:', this.state.meetingNumber);
      console.log('Clean meeting number:', cleanMeetingNumber);
      
      // Use signature from existing backend response
      console.log('Using JWT signature from backend:', this.state.signature);
      console.log('Signature length:', this.state.signature?.length);
      console.log('Meeting config:', {
        meetingNumber: cleanMeetingNumber,
        userName: this.state.userName,
        passWord: this.state.passWord,
        signature: this.state.signature,
        signatureType: 'jwt'
      });
      
      ZoomMtg.join({
        meetingNumber: cleanMeetingNumber,
        userName: this.state.userName,
        signature: this.state.signature,
        userEmail: this.state.userEmail,
        passWord: this.state.passWord,
        success: (res: any) => {
          console.log('Meeting joined successfully:', res);
          ZoomMtg.inMeetingServiceListener('onUserLeave', () => {
            console.log('User left meeting');
          });
        },
        error: (err: any) => {
          console.error('Error joining the meeting:', err);
          this.setState({ loader: false });
        }
      });
    } catch (error) {
      console.error('Unexpected error in joinMeeting:', error);
      this.setState({ loader: false });
    }
  }
  

  getProfile = async () => {
    let Usertoken = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getProfileContentType,
      token: Usertoken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProfileApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProfileApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getProfileApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  apiCall = async (apiData: APIPayloadType) => {
    const { contentType, method, endPoint, body, type } = apiData;
    let token = await getStorageData("token");
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

    body && type !== "formData"
      ? requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      : requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  getZoomApi = async () => {
    const notaryRequestID = await getStorageData("notaryRequestId");
    this.setState({ loader: !this.state.isSideBarOpen });
    this.zoomCallId = await this.apiCall({
      method: configJSON.validationApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: configJSON.zoomEndPoint + notaryRequestID
    });
  }
  openSideBar = () =>
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });

  navigateToDashboard = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Dashboard");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  navigateToRequestManagement = () =>{
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "RequestManagement");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  navigateBack = () => {
    const previousPage = sessionStorage.getItem('previousPage');

    if (previousPage === '/Dashboard') {
      this.navigateToDashboard();
    } else if (previousPage === '/RequestManagement') {
      this.navigateToRequestManagement();
    } else {
      this.navigateToDashboard();
    }
    sessionStorage.removeItem('previousPage');
  };


  setBookNowModal = (value: boolean) => this.setState({ modalOpen: value });

  isRoleId2 = () => this.state.roleID === 2;
  findMainBoxWidth = () =>
    this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw";

  // Customizable Area End
}
