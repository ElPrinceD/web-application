import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible} from "./assets";
import React, { RefObject } from "react";
import { setStorageData } from "../../../framework/src/Utilities";
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
  password: string;
  tempPassword:string;
  showPassword:boolean;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  tempRemember:boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  selectedButton: string;
  emailError2: string;
  isPasswordError: string;
  topRef: RefObject<HTMLDivElement>;
  isDrawerOpen: boolean;
  IsVerifiedNotaryUser:boolean;
  userRoleId: number;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  apiEmailLoginCallId2: string | Message = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start   
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      email: "",
      password: "",
      tempPassword:"",
      showPassword:false,
      enablePasswordField: true,
      checkedRememberMe: true,
      tempRemember:false,
      placeHolderEmail: configJSON.placeHolderEmail,
      placeHolderPassword: configJSON.placeHolderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      selectedButton: "User",
      emailError2: "",
      isPasswordError: "",
      topRef: React.createRef(),
      isDrawerOpen: false,
      IsVerifiedNotaryUser:false,
      userRoleId: 0,
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    this.setState({tempRemember:rememberMe,email: rememberedEmail || '', password: rememberedPassword || ''},()=>{
    })
    
    if (!rememberMe) {
      this.setState({
        email: rememberedEmail || '',
        password: rememberedPassword || '',
        checkedRememberMe:!this.state.checkedRememberMe,
        
      });
    }

    this.handleNavigationScroll();
    // Customizable Area End
  }

  // Customizable Area Start
  toggleDrawer = (newOpen: boolean) => () => {
    this.setState({isDrawerOpen: newOpen})
  };

  btnSocialLoginProps = {
    onPress: () => this.goToSocialLogin(),
  };
 
  handleNavigationScroll=()=>{
    const currentState = this.state;
    const {topRef} = currentState;
    const currentRef = topRef.current;
    currentRef?.scrollIntoView();
  }

  btnEmailLogInProps = {
    onPress: () => this.doEmailLogIn(),
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      
    },
  };

  // Web Event Handling
  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField
    });
  };

  setEmail = (text: string) => {
    this.setState({
      email: text,
      emailError2:"",
      isPasswordError:""
    });
  };

  setPassword = (text: string) => {
    this.setState({
      isPasswordError:"",
      emailError2:""
    });
    const firstLetter = text.charAt(0);
    const lastLetter = text.charAt(text.length - 1);
    if(firstLetter!="*"){
      this.setState({password: text,tempPassword:text});
    }else if(lastLetter!="*"){
      this.setState({password: this.state.tempPassword+lastLetter,tempPassword:this.state.tempPassword+lastLetter});
    }else{
      let input= this.state.password.slice(0, -1);
      this.setState({password: input,tempPassword:input});
    }
  
  };
 
  setRememberMe  = () => {
    this.setState({ checkedRememberMe: !this.state.checkedRememberMe,tempRemember:!this.state.tempRemember });
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword(),
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordVisible,
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

    handleToggle = (buttonType: any) => {
      this.setState({
        selectedButton: buttonType,
      });
    };

    GuestButton() {
      setStorageData("guestClient" , true);
      this.props.navigation.navigate("Dashboard");      
    }
    
    CallLoginApi() {
      if (
        this.state.email === null ||
        this.state.email.length === 0
      ) {
        this.setState({
          emailError2:
            "Please enter your email address"
        })
      } 
     
       if (this.state.password === null || this.state.password.length === 0) {
        this.setState({
         isPasswordError:"Please enter your password"
       })
       }else{
        
      const header = {
        "Content-Type": configJSON.loginApiContentType,
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
  
      this.apiEmailLoginCallId2 = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.loginAPiEndPoint
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
        configJSON.loginAPiMethod
      );
  
      runEngine.sendMessage(requestMessage.id, requestMessage);
  
      return true;
       }
  
  
    }
    
    goToHome() {
      const message: Message = new Message(
        getName(MessageEnum.NavigationHomeScreenMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
    }

    commingSoon (){
      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage), "ForgotPasswordWeb");
      message.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
      this.send(message);
      return true;
    }
    
    goToEmailWeb = () => {
      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage), "OnboardingPageWeb");
      message.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
      this.send(message);
      return true;
    }
    openInfoNavigation = () => {
      const message: Message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage), "Dashboard");
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
    }
    handleResponse(responseJson:any,apiRequestCallId:any,errorReponse:any){
      if (apiRequestCallId === this.apiEmailLoginCallId2) {
        if (responseJson && responseJson.meta && responseJson.meta.token) {
          const { 
            google_calendar_token, 
            outlook_calendar_token, 
            google_calendar_sync, 
            outlook_calendar_sync,
            profile 
          } = responseJson.meta;
          setStorageData("token", responseJson.meta.token);
          setStorageData("refresh_google_auth", google_calendar_token);
          setStorageData("isGoogleSync", google_calendar_sync);
          setStorageData("ms_refreshToken", outlook_calendar_token);
          setStorageData("isOutlookSync", outlook_calendar_sync)
          this.setState(
            {
              userRoleId: profile.data.attributes.role_id,
            },
            () => {
              setStorageData("role_id", this.state.userRoleId);
            }
          );
          if (this.state.checkedRememberMe) {
            localStorage.setItem('rememberedEmail', this.state.email);
            localStorage.setItem('rememberedPassword', this.state.password);
            localStorage.setItem('rememberMe', 'true');
          }else{
            localStorage.removeItem('rememberedEmail' );
            localStorage.removeItem('rememberedPassword' );
            localStorage.removeItem('rememberMe');
          }
          runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
          this.saveLoggedInUserData(responseJson);
          this.sendLoginSuccessMessage();
          this.openInfoNavigation();
          this.setState({IsVerifiedNotaryUser:false})
        } else {
          console.log(responseJson,"nsm456")
          //Check Error Response
          this.handleFailureResponse(responseJson)
          this.sendLoginFailMessage();
        }

        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    handleFailureResponse(response:any){      
      // Check if response and errors exist
      if(!response || !response.errors || !Array.isArray(response.errors) || response.errors.length === 0) {
        this.setState({            
          emailError2:"Login failed. Please try again.",
          IsVerifiedNotaryUser:false
        })
        return;
      }
      
      if(!response.errors[0]?.role){     
        
        if(response.errors[0].failed_login === "Account not found" ){
          this.setState({            
            emailError2:"We cannot find an account with this email address",
            IsVerifiedNotaryUser:false
          })
        }
        if(response.errors[0].failed_login === "Login Failed"){
          this.setState({            
            isPasswordError:"Incorrect password",
            IsVerifiedNotaryUser:false
          })
        }       
      }else if(response.errors[0]?.role){
        this.setState({IsVerifiedNotaryUser:true})
      }
    }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      const userName = message.getData(getName(MessageEnum.LoginUserName));

      const password = message.getData(getName(MessageEnum.LoginPassword));

      const countryCode = message.getData(
        getName(MessageEnum.LoginCountryCode)
      );

      if (!countryCode && userName && password) {
        this.setState({
          email: userName,
          password: password,
          checkedRememberMe: true,
        });

        //@ts-ignore
        this.txtInputEmailProps.value = userName;

        //@ts-ignore
        this.txtInputPasswordProps.value = password;

        this.CustomCheckBoxProps.isChecked = true;
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId != null) {
        if (
          apiRequestCallId === this.validationApiCallId &&
          responseJson !== undefined
        ) {
          let arrayholder = responseJson.data;

          if (arrayholder && arrayholder.length !== 0) {
            let regexData = arrayholder[0];

            if (regexData && regexData.email_validation_regexp) {
              this.emailReg = new RegExp(regexData.email_validation_regexp);
            }
          }
        }

        this.handleResponse(responseJson,apiRequestCallId,errorReponse)
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
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
    }
  }

  openInfoPage() {
    // Merge Engine - Navigation - btnEmailLogIn - Start
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
    // Merge Engine - Navigation - btnEmailLogIn - End
  }

  goToForgotPassword() {
    // Merge Engine - Navigation - btnForgotPassword - Start
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
    // Merge Engine - Navigation - btnForgotPassword - End
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  doEmailLogIn(): boolean {
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  callGetValidationApi() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
