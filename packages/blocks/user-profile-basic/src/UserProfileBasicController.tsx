import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData, removeStorageData } from "../../../framework/src/Utilities";
export interface ProfileDetails {
  data: {
    attributes: {
     
      status: string,
      role_id: number;
      email: string,
      activated: true,
      
      user_type: string;
      photo?: { url: string };
    }
}
}
export interface FileData {
  uri: string | undefined;
  name: string;
  type: string;
}
export interface ApiCallInterface {
  type?:string;
  contentType?:string;
  method?:string;
  endPoint?:string;
  body?:object;
}

export interface ValidResponseType {
  errors:string;
  message: object;
  data: object;
}

export interface ResponseCountry  {
  id: string,
  type: string,
  attributes: {
      name: string
  }
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
  
  isEditing: boolean;
  isSideBarOpen: boolean;
  avatar?: {
    url?: string,
    file?:File | null;
  };
  user_type: string;
  profileOpen: boolean;
   invalidFile: boolean;
  online: boolean;
  roleID: number;
  countries: Array<ResponseCountry>;
  // Customizable Area End

}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class UserProfileBasicController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getCountryAPICallID: string = "";
  getUserProfileApiCallID: string = "";
  editUserProfileApiCallID: string = "";
  getCountryCodeApiCallID: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
   
    this.state = {
      isEditing: false,
      isSideBarOpen: false,
      avatar: {
        url: "" ,
        file: null
      },
      profileOpen: false,
       invalidFile: false,
      online: false,
      roleID: 0,
      countries: [],
      user_type:''
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this, this.subScribedMessages);
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const data = message.getData(
          getName(MessageEnum.SessionResponseData)
      );
      this.setState({
        profileOpen:data.isEdit,
        isEditing:data.isEdit
      })
  }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if(this.isValidResponse(webResponseJson)){
        this.responseSuccessCallBack(webApiRequestCallId,webResponseJson)
       }
    }
    // Customizable Area End
  }

   // Customizable Area Start

  isValidResponse = (responseJson: ValidResponseType) => {
    return responseJson && !responseJson.errors;
  }
  responseSuccessCallBack = (apiRequestCallId: string, responseJson: ProfileDetails  ) => {
    if (apiRequestCallId === this.getUserProfileApiCallID) {
      if (responseJson && responseJson.data)
      this.setState({ 
        avatar: responseJson.data.attributes.photo,
        roleID: responseJson.data.attributes.role_id,
       
       } ,()=> console.log('roleId',this.state.roleID));

    } if (apiRequestCallId === this.editUserProfileApiCallID) {
      this.setState({
    
        avatar: responseJson.data.attributes.photo,
        isEditing:false
      });
    }
  }
  getProfile = async () => {
    this.getUserProfileApiCallID = await this.apiCall({
      method: configJSON.methodTypeApiGetUserProfile,
      endPoint: configJSON.getUserProfileEndPoint
    });
  };

  notaryNavigation = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
      msgs.addData(getName(MessageEnum.NavigationTargetMessage), "UserNotaryService");
      msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
      this.send(msgs);
      return true;
  }

  handleProfileOpen = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "UserProfile");
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  };
  
  setOnline = () => {
    this.setState({ online: !this.state.online})
  }

  
  handleBackArrow = () => {
    this.setState({ profileOpen: false})
  }

  async componentDidMount() {
    super.componentDidMount();
    this.getProfile()
  }

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
     const {method, endPoint, body, type } = apiData;
    const header = {
      token: token
    };
     const requestMessage = new Message(
         getName(MessageEnum.RestAPIRequestMessage)
     );
     requestMessage.addData(
         getName(MessageEnum.RestAPIRequestHeaderMessage),
         JSON.stringify(header)
     );
     requestMessage.addData(
         getName(MessageEnum.RestAPIResponceEndPointMessage),
         endPoint
     );
     requestMessage.addData(
         getName(MessageEnum.RestAPIRequestMethodMessage),
         method
     );
    body && type !== "formData" ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      ) :
      requestMessage.addData(getName(
        MessageEnum.RestAPIRequestBodyMessage),
        body
      )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
};


  handleSettingsBtn = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Settings");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }


  goToTransactionHistory = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
      msgs.addData(getName(MessageEnum.NavigationTargetMessage), "TransactionHistory");
      msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
      this.send(msgs);
  }
  // Customizable Area End

}
