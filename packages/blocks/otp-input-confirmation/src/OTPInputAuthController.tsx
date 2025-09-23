import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  otp: string;
  otpAuthToken: string;
  userAccountID: string;
  labelInfo: string;
  toMessage: string;
  isFromForgotPassword: boolean;
  otpdata: any;
  token: string;
  enableSuccessModel: boolean;
  loader: boolean;
  CustomCount: number;
  resendDisabled: boolean;
  emailValue: any;
  otpFailedResponse: string;
  valid: boolean
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class OTPInputAuthController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  otpAuthApiCallId: any;
  btnTxtSubmitOtp: string;
  placeHolderOtp: string;
  labelInfo: string = "";
  submitButtonColor: any = configJSON.submitButtonColor;
  userOtpVerifyApiCallId: string = "";
  resendOtpAPICall: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      otp: "",
      otpAuthToken: "",
      userAccountID: "",
      labelInfo: configJSON.labelInfo,
      toMessage: "",
      isFromForgotPassword: false,
      otpdata: "",
      token: "",
      enableSuccessModel: false,
      loader: false,
      CustomCount: 85,
      resendDisabled: true,
      emailValue: this.fetchEmail(),
      otpFailedResponse: "",
      valid: false
    };

    this.btnTxtSubmitOtp = configJSON.btnTxtSubmitOtp;
    this.placeHolderOtp = configJSON.placeHolderOtp;
    // Customizable Area End
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const myOrder = message.getData(getName(MessageEnum.NavigationForgotOTPPageInfo)); 
  this.setState({token: myOrder})   
}
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

  let errorResponse = message.getData(
    getName(MessageEnum.RestAPIResponceErrorMessage)
  );
  if (apiRequestCallId && responseJson) {
    if (apiRequestCallId === this.userOtpVerifyApiCallId) {
      this.handleAPIResponse(responseJson);
    } else if (apiRequestCallId === this.resendOtpAPICall) {
      this.setState({ token: this.state.token });
    }
  }
  
  if (!responseJson.errors) {
    this.apiSuccessCallBacks(apiRequestCallId, responseJson);
  } else {
    this.apiFailureCallBacks(apiRequestCallId, responseJson.errors);
  }
  
  if (errorResponse) {
    this.showAlert("alert", errorResponse);
  }
  
}

    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount(): Promise<void> {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));

    this.startTimer();
  }

  handleChange = (otpdata: any) => {
    this.setState({ otpdata });
    const isValid = /^\d{6}$/.test(otpdata);
    this.setState({ valid: isValid });
    this.setState({ otpFailedResponse: '' });
  };

  async submitOtp() {
    if (!this.state.otp || this.state.otp.length === 0) {
      this.showAlert(configJSON.errorTitle, configJSON.errorOtpNotValid);
      return;
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    if (this.state.isFromForgotPassword) {
      // console.log("entered is from forgot password!");
      const header = {
        "Content-Type": configJSON.apiVerifyOtpContentType,
      };

      //GO TO REQUEST STATE
      this.otpAuthApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.apiVerifyForgotPasswordOtpEndPoint
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      const data = {
        token: this.state.otpAuthToken ? this.state.otpAuthToken : "",
        otp_code: this.state.otp ? this.state.otp : "",
      };

      const httpBody = {
        data: data,
      };

      //requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), "POST");

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
    } else {
      const headers = {
        "Content-Type": configJSON.apiVerifyOtpContentType,
        token: this.state.otpAuthToken,
      };

      this.otpAuthApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.apiVerifyOtpEndPoint + this.state.otp
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(JSON.stringify({}))
      );
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );
    // console.log("requestMessage.id is: " + requestMessage.id);
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  btnSubmitOTPProps = {
    onPress: () => this.submitOtp(),
  };

  txtMobilePhoneOTPWebProps = {
    onChangeText: (text: string) => this.setState({ otp: text }),
  };

  txtMobilePhoneOTPMobileProps = {
    ...this.txtMobilePhoneOTPWebProps,
    keyboardType: "numeric",
  };

  txtMobilePhoneOTPProps = this.isPlatformWeb()
    ? this.txtMobilePhoneOTPWebProps
    : this.txtMobilePhoneOTPMobileProps;


  handleSubmit = () => {
    const header = {
      "Content-Type": "application/json",
    };

    const bodyData = {
      data: {
        otp_code: this.state.otpdata,
        token: this.state.token
      },
    };

    const emailRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.userOtpVerifyApiCallId = emailRequestMessage.messageId;
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_forgot_password/otps/verify'
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(bodyData)
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );

    runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
  };

  apiSuccessCallBacks = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId == this.userOtpVerifyApiCallId) {
      this.setState({ loader: false, otpdata: "" });
      this.goToNewPasswordOtpWeb(responseJson.token)
      this.setState({ enableSuccessModel: true })
    }
  };

  goToNewPasswordOtpWeb(otpToken: string) {
    // Merge Engine - Navigation - btnForgotPassword - Start
    const msg: Message = new Message(
      getName(MessageEnum.NavigationNewPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationNewPasswordPageInfo), otpToken);
    this.send(msg);
    // Merge Engine - Navigation - btnForgotPassword - End
  }

  startTimer = () => {
    this.setState({
      resendDisabled: true,
      CustomCount: 85,
    });

    const timerInterval = setInterval(() => {
      this.setState(
        (prevState) => ({
          CustomCount: prevState.CustomCount - 1,
        }),
        () => {
          if (this.state.CustomCount <= 0) {
            clearInterval(timerInterval);
            this.setState({
              resendDisabled: false,
            });
          }
        }
      );
    }, 1000);
  };

  handleClose = () => {
    this.setState({ enableSuccessModel: !this.state.enableSuccessModel })
  }

  fetchEmail = async () => {
    const userType = await localStorage.getItem('settingemail');
    if (userType) {
      const parsedData = userType
      this.setState({ emailValue: parsedData });
      return parsedData

    }

  };

  apiFailureCallBacks = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId == this.userOtpVerifyApiCallId) {
      this.setState({ loader: false });
      if (responseJson.errors) {
        // Handle specific errors here
        const errorMessage = responseJson.errors[0].otp;
        this.showAlert("error", errorMessage);
      } else {
        // Handle generic error
      }
      this.setState({ otpFailedResponse: 'Invalid OTP ' });
    }
  };

  handleResendClick = () => {
    this.startTimer();
    const header = {
      "Content-Type": "application/json",
    };

    const attrs = {
      email: this.state.emailValue,
    }

    const data = {
      attributes: attrs
    };

    const emailHttpBody = {
      data: data
    };


    const emailRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.resendOtpAPICall = emailRequestMessage.messageId;
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_forgot_password/otps'
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
      configJSON.apiVerifyOtpMethod
    );

    runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
    return true;

  };

  handleAPIResponse = (responseJson: any) => {
    // this.goToNewPasswordOtpWeb(responseJson.token)
    if (!responseJson.errors) {
      const goToDetails = new Message(getName(MessageEnum.NavigationMessage));
      goToDetails.addData(getName(MessageEnum.NavigationTargetMessage), "NewPasswordWeb");

      goToDetails.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      raiseMessage.addData("rowData", responseJson);
      goToDetails.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

      this.send(goToDetails);
    }
  }

  // Customizable Area End
}
