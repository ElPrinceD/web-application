import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Message } from "../../../framework/src/Message";
import { getStorageData , removeStorageData } from "../../../framework/src/Utilities";
import { OutlookAuthProvider } from "../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../components/src/GoogleAuthProvider.web";

export interface ValidResponseType {
    message: object;
    data: object;
    errors: string;
    status: number;
  }

export interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;  
}

export interface DeleteApiCallResponse{
  message?: string;
  error?: string;
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
    enablePasswordField: boolean
    password: string;
    reTypePassword: string;
    handlePopup: boolean;
    handleSuccessPopup: boolean;
    error : string;
    email: string;
    failurePopup: boolean;
    message: string;
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class DeletePasswordController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getProfileApiCallID: string = "";
    checkPasswordForDeleteApiID: string | Message = "";
    deleteAccountApiID:  string = "";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.RestAPIResponceDataMessage),
            getName(MessageEnum.RestAPIResponceSuccessMessage),            
            // Customizable Area End
        ];

        this.state = {
            // Customizable Area Start
            enablePasswordField: false,
            password: '',
            reTypePassword: '',
            handlePopup: false,
            handleSuccessPopup: false,
            error: '',
            email: '',
            failurePopup: false,
            message : '',
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start

    async componentDidMount() {
        this.getProfile();
    }

    async receive(from: string, message: Message) {        
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
          const webApiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
          );
    
          let webResponseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
          );
    
          if (this.isValidResponse(webResponseJson)) {
            this.responseSuccessCallBack(webApiRequestCallId, webResponseJson);
          }
        }        
      }

    isValidResponse = (responseJson: ValidResponseType) => {
        return responseJson && responseJson.status !== 500;
    };

    responseSuccessCallBack = (
        apiRequestCallId: string,
        responseJson: any
      ) => {        
        if (apiRequestCallId === this.getProfileApiCallID) {            
          this.setState(
            {
              email: responseJson.data.attributes.email,
            },
          );
        }
        if(apiRequestCallId === this.checkPasswordForDeleteApiID){
            this.saveLoggedInUserData(responseJson);
        }
        if(apiRequestCallId === this.deleteAccountApiID){
            this.deleteAccountProcess(responseJson);
        }

      };
    

    handlePasswordChange = (event: any) => {
        const { value } = event.target;
        const lastLetter = value.charAt(value.length - 1);
        const firstLetter = value.charAt(0);
        if (firstLetter != "*") {
            this.setState((prevState) => ({
                ...prevState,
                password: value,
                reTypePassword: value , 
                error : ""
            }));
        } else if (lastLetter != "*") {
            this.setState((prevState) => ({
                ...prevState,
                reTypePassword: this.state.reTypePassword + lastLetter,
                password: this.state.reTypePassword + lastLetter, 
                error : ""
            }));
        } else {
            let input = this.state.reTypePassword.slice(0, -1);
            this.setState((prevState) => ({
                ...prevState,
                password: input, reTypePassword: input , error: ""
            }));
        }
    }

    handleClickShowPassword = () => {
        this.setState({
            enablePasswordField: !this.state.enablePasswordField,
        });
    };

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
      this.getProfileApiCallID  = await this.apiCall({
        contentType: configJSON.getProfileContentType,
        method: configJSON.getProfileApiMethodType,
        endPoint: configJSON.getuserprofileEndPoint,
      })
    };

    handleCheckPasswordApi =  async() => {
        const header = {
          "Content-Type": configJSON.checkPasswordForDeleteApiContentType,
        };
        const attrs = {
          email: this.state.email,
          password: this.state.password,
        };
        const userData = {
          type: "email_account",
          attributes: attrs,
        };
        const httpBody = {
          data: userData,
        };
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        this.checkPasswordForDeleteApiID = requestMessage.messageId;
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.checkPasswordForDeleteApiEndPoint
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(httpBody)
        ); 
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestHeaderMessage),
          JSON.stringify(header)
        );
        requestMessage.addData(
          getName(MessageEnum.RestAPIRequestMethodMessage),
          configJSON.checkPasswordForDeleteApiMethod
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    deleteAccountApi = async() => {
      this.deleteAccountApiID = await this.apiCall({
        contentType: configJSON.deleteAccountApiContentType,
        method: configJSON.deleteAccountApiMethod,
        endPoint: configJSON.deleteAccountApiEndPoint,
      })
    }
    
    saveLoggedInUserData(responseJson: any) {
        if (responseJson && responseJson.meta && responseJson.meta.token) {
            const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));
            msg.addData(
                getName(MessageEnum.SessionResponseData),
                JSON.stringify(responseJson)
            );
            msg.addData(
                getName(MessageEnum.SessionResponseToken),
                responseJson.meta.token
            );
            this.send(msg);
            this.setState({
                handlePopup: true ,
                error: ""
            })
        }
        else{
            this.setState({
                error : "Invalid Password"
            })
        }
    }

    handleClickDeletePassword = async() => {
        if(this.state.handlePopup){
            this.setState({
                handlePopup: false,
                password : "",
                error: ""
            });
        }
        else if(this.state.password.trim()){
            const rememberedEmail = localStorage.getItem('rememberedEmail');
            const rememberedPassword = localStorage.getItem('rememberedPassword');
            if (rememberedEmail !== null && rememberedPassword !== null) {
                if(this.state.password === rememberedPassword){
                    this.setState({
                        handlePopup: true ,
                        error: ""
                    })
                }
            } else {                
                await this.handleCheckPasswordApi();
            }   
        }      
        else{
            this.setState({error : "Password should not be empty"});
        }  
    }

    handleNavigate = (screenName: string) =>{
      const message: Message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage),screenName);
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);      
    }

    handleDeleteAccount = async() => {
        await this.deleteAccountApi();        
    }

    deleteAccountProcess = async (responseJson: DeleteApiCallResponse) => {
      const { message, error } = responseJson;
      this.setState({ handlePopup: false });
      if (message) {
        this.handleSuccessFlow(message);
      } else if (error) {
        this.handleErrorFlow(error);
      }
    };
    
    handleSuccessFlow = (message: string) => {
      this.setState({
        handleSuccessPopup: true,
        message,
      });
      setTimeout(() => {
        this.setState({ handleSuccessPopup: false });
        this.handleLogoutNavigation();
      }, 2000);
    };
    
    handleErrorFlow = (error: string) => {
      this.setState({
        failurePopup: true,
        message: error,
      });
      setTimeout(() => {
        this.setState({ failurePopup: false });
      }, 2000);
    };

    handleLogoutNavigation = async()=>{
      removeStorageData("token");
      removeStorageData("google_auth");
      removeStorageData("isGoogleSync");
      removeStorageData("isOutlookSync");
      removeStorageData("ms_accessToken");
      
      await GoogleAuthProvider.signOut();
      await OutlookAuthProvider.signOut();
      
      this.handleNavigate("Home")
    }

}



// Customizable Area End