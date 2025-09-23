import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from "yup";
import { imgPasswordVisible, imgPasswordInVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  accountType: string;
  emailSchema: any;
  phoneSchema: any;
  otpSchema: any;
  passwordSchema: any;
  accountStatus: any;
  passwordRules: any;
  emailValue: string;
  phoneValue: any;
  countryCodeSelected: any;
  token: any;
  enablePasswordField: boolean;
  btnConfirmPasswordShowHide: boolean;
  emailError: string;
  loader: boolean,
  resendDisabled: boolean,
  CustomCount: number,
  variableToken: any,
  enableSuccessModel: boolean,
  newPassword: string;
  errorPassword: string;
  errorComPassword : string;
  enableReTypePasswordField : boolean;
  reTypePassword: string;
  password: string;
  errorConfirmPasswordFlag : boolean;
  isValidLength: boolean;
  isChecklowerUpperCase : boolean;
  isNoBlankSpace: boolean;
  iSValidPassword:boolean;
  previousPasswordError:boolean;
  previousPasswordErrorMessage:string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  navigation: any;
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  validationAPICallId: any;
  requestEmailOtpCallId: any;
  requestPhoneOtpCallId: any;
  requestChangePasswordCallId: any;
  requestGoToConfirmationCallId: any;
  otpToken: any;
  isChangePassword: boolean = false;
  requestpasswordCallId: string = "";
  requestEmailOtpCallId1: string = "";
  checkLastPasswordApiCallId: string = "";
  

  //Properties from config
  labelTextIsAccountRecovery: string = configJSON.labelTextIsAccountRecovery;
  secondLabelText: string = configJSON.secondLabelText;
  thirdLabelText: string = configJSON.thirdLabelText;
  forthLabelText: string = configJSON.forthLabelText;
  fifthLabelText: string = configJSON.fifthLabelText;
  sixthLabelText: string = configJSON.sixthLabelText;
  firstInputAutoCompleteType: any = configJSON.firstInputAutoCompleteType;
  firstInputKeyboardStyle: any = configJSON.firstInputKeyboardStyle;
  firstInputPlaceholder: string = configJSON.firstInputPlaceholder;
  firstInputErrorColor: any = configJSON.firstInputErrorColor;
  buttonTextIsNext: string = configJSON.buttonTextIsNext;
  buttonColorForNextButton: any = configJSON.buttonColorForNextButton;
  secondInputAutoCompleteType: any = configJSON.secondInputAutoCompleteType;
  secondInputKeyboardType: any = configJSON.secondInputKeyboardType;
  secondInputPlaceholder: string = configJSON.secondInputPlaceholder;
  secondInputErrorColor: any = configJSON.secondInputErrorColor;
  thirdInputPlaceholder: string = configJSON.thirdInputPlaceholder;
  thirdInputErrorColor: any = configJSON.thirdInputErrorColor;
  buttonTitleIsSMSPhoneAccount: string =
    configJSON.buttonTitleIsSMSPhoneAccount;
  buttonTitleIsEmailAccount: string = configJSON.buttonTitleIsEmailAccount;
  labelTextIsPleaseEnterYourNewPassword: string =
    configJSON.labelTextIsPleaseEnterYourNewPassword;
  labelTextIsYourPasswordHasBeenSuccessfullyChanged: string =
    configJSON.labelTextIsYourPasswordHasBeenSuccessfullyChanged;
  placeholderIsPassword: string = configJSON.placeholderIsPassword;
  imgPasswordInVisible: any = imgPasswordInVisible;
  imgPasswordVisible: any = imgPasswordVisible;
  placeholderIsReTypePassword: string = configJSON.placeholderIsReTypePassword;
  buttonTitleIsOk: string = configJSON.buttonTitleIsOk;
  buttonColorForOkButton: any = configJSON.buttonColorForOkButton;
  countryCodeSelectorPlaceholder: string =
    configJSON.countryCodeSelectorPlaceholder;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    //email schema
    let emailSchema = {
      email: Yup.string()
        .email(configJSON.pleaseEnterAValidEmail)
        .required(configJSON.emailIsRequired),
    };

    //phone schema
    let phoneSchema = {
      // countryCode: Yup.number()
      // .required("Country code is required"),

      phone: Yup.string()
        .matches(configJSON.phoneRegExp, configJSON.phoneNumberIsNotValid)
        .required(configJSON.phoneNumberIsRequired),
    };

    //otpSchema
    let otpSchema = {
      otpCode: Yup.number().min(4).required(configJSON.otpCodeIsRequired),
    };

    //passwordSchema
    let passwordSchema = {
      password: Yup.string()
        .required(configJSON.pleaseEnterAPassword)
        .min(2, configJSON.passwordMustBeAtLeast2Characters),
      confirmPassword: Yup.string()
        .required(configJSON.pleaseConfirmYourPassword)
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            configJSON.passwordsMustMatch
          ),
        }),
    };

    this.state = {
      accountType: "sms",
      accountStatus: "ChooseAccountType",
      emailValue: "",
      phoneValue: "",
      countryCodeSelected: "",
      passwordRules: "",
      emailSchema: emailSchema,
      phoneSchema: phoneSchema,
      otpSchema: otpSchema,
      passwordSchema: passwordSchema,
      token: "",
      enablePasswordField: true,
      btnConfirmPasswordShowHide: true,
      emailError: "",
      loader: false,
      resendDisabled: true,
      CustomCount: 120,
      variableToken: this.fetchSignUpUserDetail(),
      enableSuccessModel: false,
      newPassword: "",
      errorPassword: "",
      errorComPassword : "",
      enableReTypePasswordField: true,
      reTypePassword: "",
      password: "",
      errorConfirmPasswordFlag: false,
      isValidLength : false,
      isChecklowerUpperCase : false,
      previousPasswordError:false,
      isNoBlankSpace: false,
      iSValidPassword: false,
      previousPasswordErrorMessage:"",
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    // Customizable Area End
  }



  async receive(from: string, message: Message) {  
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      
      if (apiRequestCallId && responseJson) {

        if (responseJson.status === 500) {
          this.apiFailureCallBacks(apiRequestCallId, {
            error: 'Internal Server Error. Please try again later.',
          });
          return; 
        }


        if (!responseJson.errors) {
          if (apiRequestCallId === this.requestpasswordCallId) {
              
              this.handlepasswordFunction(responseJson);
            
          } else if (apiRequestCallId === this.requestEmailOtpCallId1) {

            this.apiSuccessCallBacks(apiRequestCallId, responseJson);
            
          } else if (apiRequestCallId === this.checkLastPasswordApiCallId) {

            this.handleCheckLastPasswordApiRes(responseJson)
          }
        } else {

          this.apiFailureCallBacks(apiRequestCallId, responseJson);
        }
      }
      
}
    // Customizable Area End
  }

  startForgotPassword(accountType: String) {
    this.setState({
      accountStatus: accountType === "sms" ? "EnterPhone" : "EnterEmail",
    });
  }
  
  // Customizable Area Start
  handleCheckLastPasswordApiRes = (response: { error: string; message: string; }) => {
    if(response.error){
      this.setState({previousPasswordError: true,previousPasswordErrorMessage:response.error});
    }else {
      this.setState({previousPasswordError: false,previousPasswordErrorMessage:response.message});
    }
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    
    if (
      !this.checkValidations()
    ) {
      this.setState({ loader: false });
      return false;
    } else 
    {
      this.callfinalAPi()
    }
  };
  callfinalAPi(){
    const {
      emailValue,
      
    } = this.state;
  const header = {
    "Content-Type": "application/json",
  };

  const emailAttrs = {
    email: emailValue
   
  };

  const emailData = {
    type: "email_account",
    attributes: emailAttrs,
  };

  const emailHttpBody = {
    data: emailData,
    token: this.state.token,
  };

  const emailRequestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  this.requestEmailOtpCallId1 = emailRequestMessage.messageId;
  emailRequestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    "bx_block_forgot_password/otps"
  );

  emailRequestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );

  emailRequestMessage.addData(
    getName(MessageEnum.RestAPIRequestBodyMessage),
    JSON.stringify(emailHttpBody)
  );

  emailRequestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    configJSON.httpPostMethod
  );

  runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
  localStorage.setItem("settingemail", this.state.emailValue)
  return true;
}
  checkValidations = () => {
    let isValid = true;
    const {
      emailValue
    } = this.state;  

    this.setState({
      emailError: "",
      
    });

    const emailCheck= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!emailValue.trim() || !emailCheck.test(emailValue)) {
      this.setState({ emailError: "Please enter your valid email address" });
      isValid = false;
    }
    return isValid;
  };

  apiSuccessCallBacks = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId == this.requestEmailOtpCallId1) {
         let otpToken = responseJson.meta.email_otp_token;
         let otpTokenOnly = responseJson.meta.token;
         localStorage.setItem("OTPToken",otpToken)
         localStorage.setItem("otptokenOnly",otpTokenOnly)
         this.goToForgotPasswordOtpWeb(otpToken)
    }
  };

  apiFailureCallBacks = (apiRequestCallId: string, responseJson: any) => {
    const serverError = responseJson.error;
    const emailErrorMessage = serverError !== "" ? serverError : "We cannot find an account with this email address";
    if (apiRequestCallId == this.requestEmailOtpCallId1) {
        if((!responseJson.errors)){
          this.setState({emailError:emailErrorMessage})
        }
        else
        {
          this.setState({ emailError: "We cannot find an account with this email address" });
        }
     }else if(apiRequestCallId == this.requestpasswordCallId){
        this.setState({emailError: responseJson.errors[0].detail,loader: false });
     }
  };


  goToForgotPasswordOtpWeb(otpToken: string) {
    // Merge Engine - Navigation - btnForgotPassword - Start
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotOTPMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotOTPPageInfo), otpToken);
    this.send(msg);
    // Merge Engine - Navigation - btnForgotPassword - End
  }

  setEmail = (text: string) => {
    this.setState({
      emailValue: text,
      emailError:""
    });
  };

  fetchSignUpUserDetail = async () => {
    const userType = await localStorage.getItem("OTPToken");
    if(userType){
      const parsedData = userType
      this.setState({ variableToken: parsedData });
      return parsedData
      
    }

  };
  handlepasswordFunction = (responseJson:any) => {
    if (!responseJson.errors) {
        this.setState({enableSuccessModel:true})
    }
    else {
      this.setState({enableSuccessModel: false,emailError: responseJson.errors[0].detail})
     }

    }

  handleNewPassword = (event: any) => {
    event.preventDefault();
    this.setState({ emailError: "", loader: true });
    if (!this.checkPasswordValidations()) {
      this.setState({ loader: false });
      return false;
    }

    const header = {
      "Content-Type": "application/json",
    };

    const emailAttrs = {
      password: this.state.newPassword,
      password_confirmation: this.state.reTypePassword,
      token: this.state.variableToken

    };

    const emailHttpBody = {
      data: emailAttrs,
    };

    const emailRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.requestpasswordCallId = emailRequestMessage.messageId;
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_forgot_password/passwords"
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(emailHttpBody)
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
    return true;

  };

  
  

    checkPasswordValidations = () => {
      let isValid = true;
      const {
        newPassword,
        reTypePassword,
      } = this.state;
  
      this.setState({
        errorPassword: "",
        errorComPassword: "",
        errorConfirmPasswordFlag: false,
      });
      if (!newPassword.trim()) {
        this.setState({ errorPassword: "Please enter your password" });
      }
  
      if (!reTypePassword.trim()) {
        this.setState({
          errorComPassword: "Please enter your confirm password",
          errorConfirmPasswordFlag: true,
        });
      } else if (newPassword !== reTypePassword) {
        this.setState({
          errorComPassword: "Passwords do not match",
          errorConfirmPasswordFlag: true,
        });
        isValid = false;
      }
  
      if (
        newPassword === reTypePassword &&
        (!this.state.isValidLength ||
          !this.state.isNoBlankSpace ||
          !this.state.isChecklowerUpperCase)
      ) {
        this.setState({ errorConfirmPasswordFlag: true });
      }
  
      return isValid;
    };

    handleClickShowPassword = () => {
      this.setState({
        enablePasswordField: !this.state.enablePasswordField,
      });
    };
  
    handleClose = () => {
      this.setState({ enableSuccessModel: !this.state.enableSuccessModel });
    };    
    GotoDashboard=()=>{
      const msgs: Message = new Message(
        getName(MessageEnum.NavigationMessage)
      );
      msgs.addData(getName(MessageEnum.NavigationTargetMessage), "EmailAccountLoginBlock");
      msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msgs);
    }
  
  
    handleClickConfirmPassword = () => {
      this.setState({
        enableReTypePasswordField: !this.state.enableReTypePasswordField,
      });
    }; 
  
    goToLoginPage() {
      const msgs = new Message(getName(MessageEnum.NavigationMessage));
      msgs.addData(getName(MessageEnum.NavigationTargetMessage), "EmailAccountLoginBlock");
      msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
      this.send(msgs);
      return true;
    }
  
    handlePasswordChange = (e: any) => {
      const { name, value } = e.target;
      this.setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      this.setState({ errorPassword: "" });
      this.validateConfirmPassword(value);
    };
  
    handleComPasswordChange = (e: any) => {
      const { name, value } = e.target;
      this.setState((prevState) => ({
        ...prevState,
        [name]: value,
      }),() => {
        this.checkLastPasswordApiCall();
      });
      this.setState({ errorComPassword: "" });
      this.validateConfirmPassword(value);
     
    };
  
    validateConfirmPassword = (password: string) => {
      const regexLength = /.{8,}/;
      const regexNoBlankSpace = /^(?!\s)(?!.*\s$).+$/;
      const regextUpperLowerCase =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])[^\u00C0-\u017F]+$/;
  
      this.setState({
        isValidLength: regexLength.test(password),
        isNoBlankSpace: regexNoBlankSpace.test(password),
        isChecklowerUpperCase: regextUpperLowerCase.test(password),
      });
  
      if (this.state.isValidLength) {
        this.setState({ iSValidPassword: true });
      } else {
        this.setState({ iSValidPassword: false });
      }
    };

    checkLastPasswordApiCall = async () => {
      const header = {
        "Content-Type": "application/json",
        token: localStorage.getItem("otptokenOnly")
      };
      
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.checkLastPasswordApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.verifyPasswordEndpoint}=${this.state.reTypePassword}`
      );
      
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpGetMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  // Customizable Area End
}
