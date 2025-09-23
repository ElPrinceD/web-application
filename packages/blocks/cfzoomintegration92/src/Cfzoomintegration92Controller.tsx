import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import generateSignature from "./GenerateSignature";
import {ZoomMtg} from "@zoom/meetingsdk";
import { getStorageData } from "../../../framework/src/Utilities";
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
            this.setState({
              sdkSecret: webResponseJson.zoom_meetings.zoom_sdk_secret_key,
              sdkKey: webResponseJson.zoom_meetings.zoom_sdk_key,
              meetingNumber: webResponseJson.zoom_meetings.meeting.id.toString(),
              passWord: webResponseJson.zoom_meetings.meeting.password,
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

  startZoomMeeting() {
    const fullUrl = window.location.href; 
    const baseUrl = new URL(fullUrl).origin;
    try {
      ZoomMtg.init({
        leaveUrl: `${baseUrl}/${this.state.notaryRequestId}`,
        isSupportAV: true,
        success: () => {
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
          this.joinMeeting();
        },
        error: () => {
          this.setState({ loader: false });
        }
      });
    } catch (error) {
      this.setState({ loader: false });
    }
  }
  
  joinMeeting() {
    try {
      ZoomMtg.join({
        meetingNumber: this.state.meetingNumber,
        userName: this.state.userEmail,
        signature: generateSignature(
          this.state.sdkKey,
          this.state.sdkSecret,
          this.state.meetingNumber,
          1
        ),
        sdkKey: this.state.sdkKey,
        userEmail: this.state.userEmail,
        passWord: this.state.passWord,
        success: () => {
          ZoomMtg.inMeetingServiceListener('onUserLeave', () => {
            window.close();
          });
        },
        error: (err: string) => {
          console.error('Error joining the meeting:', err);
        }
      });
    } catch (error) {
      console.error('Unexpected error in joinMeeting:', error);
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
