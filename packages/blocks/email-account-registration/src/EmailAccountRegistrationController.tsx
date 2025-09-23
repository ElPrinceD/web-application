import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  // Customizable Area Start
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otpAuthToken: string;
  reTypePassword: string;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  countryCodeSelected: string;
  phone: string;
  selectedButton: string;
  contactName: string;
  companyName: string;
  BusinessCompanyName: string;
  errorsContact: string;
  errorEmail: string;
  errorPassword: string;
  errorBusinessCompanyName: string;
  showIndividual: string;
  errorComPassword: string;
  errorObj: null;
  emailArr: [];
  passwordArr: [];
  contactNameArr: [];
  iSValidPassword: boolean;
  isValidLength: boolean;
  isNoBlankSpace: boolean;
  isChecklowerUpperCase: boolean;
  errorConfirmPasswordFlag: boolean;
  loader: boolean;
  tempPassword:string;
  isChecked: boolean;
 isButtonEnabled: boolean | string,
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountRegistrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  createAccountApiCallId: any;
  createSignUpApiCallId:any;
  validationApiCallId: string = "";

  imgPasswordVisible: any;
  imgPasswordInVisible: any;

  labelHeader: any;
  labelFirstName: string;
  lastName: string;
  labelEmail: string;
  labelPassword: string;
  labelRePassword: string;
  labelLegalText: string;
  labelLegalTermCondition: string;
  labelLegalPrivacyPolicy: string;
  btnTextSignUp: string;
  currentCountryCode: any;
  errorObj: null;
  emailArr: any;
  passwordArr: any;
  contactNameArr: any;

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      // Customizable Area Start
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reTypePassword: "",
      otpAuthToken: "",
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      countryCodeSelected: "",
      phone: "",
      selectedButton: "individual",
      contactName: "",
      BusinessCompanyName: "",
      errorsContact: "",
      errorEmail: "",
      errorPassword: "",
      errorComPassword: "",
      errorBusinessCompanyName: "",
      showIndividual: "",
      errorObj: null,
      emailArr: [],
      passwordArr: [],
      contactNameArr: [],
      iSValidPassword: false,
      isValidLength: false,
      isNoBlankSpace: false,
      isChecklowerUpperCase: false,
      errorConfirmPasswordFlag: false,
      loader: false,
      companyName:"",
      tempPassword:'',
      isChecked: false,
 isButtonEnabled: false
      // Customizable Area End
    };

    // Customizable Area Start
    this.arrayholder = [];

    this.imgPasswordVisible = imgPasswordVisible;
    this.imgPasswordInVisible = imgPasswordInVisible;

    this.labelHeader = configJSON.labelHeader;
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelEmail = configJSON.labelEmail;
    this.labelPassword = configJSON.labelPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.labelLegalText = configJSON.labelLegalText;
    this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
    this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
    this.btnTextSignUp = configJSON.btnTextSignUp;
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
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.validationApiCallId) {
          this.arrayholder = responseJson.data;
          if (this.arrayholder && this.arrayholder.length !== 0) {
            let regexData = this.arrayholder[0];
            this.passwordValidationRules(regexData.password_validation_rules);
          }
        } else if (apiRequestCallId === this.createSignUpApiCallId) {
          this.handleAPIResponse(responseJson);
          this.parseApiCatchErrorResponse(errorReponse);
        }
        else if (apiRequestCallId === this.createAccountApiCallId) {
          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
      this.handleRedirectCheck();
  }

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isChecked: event.target.checked,
    },this.validateForm);
  };

  validateForm = () => {
    const {
      password,
      reTypePassword,
      BusinessCompanyName,
      contactName,
      isChecked,
      email
    } = this.state;
  
    const isCommonFieldsValid =
      contactName.trim() &&
      email.trim() &&
      password.trim() &&
      reTypePassword.trim() &&
      password === reTypePassword &&
      isChecked;
  
      const isFormValid = BusinessCompanyName
      ? isCommonFieldsValid && BusinessCompanyName.trim()
      : isCommonFieldsValid;
  
    this.setState({ isButtonEnabled: isFormValid });
  };

  handleRedirectCheck = async() => {
    let signupData = await getStorageData('signUpData');
    if(signupData) {
      signupData = JSON.parse(signupData);
       this.setState({ 
         contactName : signupData.full_name,
         email : signupData.email,
         password : signupData.password,
         BusinessCompanyName :  signupData.company_name,
         selectedButton : signupData.user_type , 
         reTypePassword : signupData.password_confirmation ,     
         errorConfirmPasswordFlag :  false,
         isValidLength : true,
         isChecklowerUpperCase : true,
         isNoBlankSpace : true,     
       })
       removeStorageData('signUpData');
    }
 }

  handleAPIResponse(responseJson:any) {
    if (!responseJson.errors) {
      const msgToken = new Message(getName(MessageEnum.RestAPIResponceDataMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

        const goToDetails = new Message(getName(MessageEnum.NavigationMessage));
		goToDetails.addData(getName(MessageEnum.NavigationTargetMessage), "OtpVerification");

		goToDetails.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
		const raiseMessage: Message = new Message(
		 	getName(MessageEnum.NavigationPayLoadMessage)
		);
		raiseMessage.addData("rowData", responseJson);
		goToDetails.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

		this.send(goToDetails);
    }  else{
      this.handleStateError(responseJson)
    }
  }

  handleStateError = (response: any) => {
    if (response.errors?.email) {
      this.setState({ errorEmail: response.errors.email[0] })
      this.setState({ loader: !this.state.loader })
    } else {
      this.setState({ errorEmail: response.errors })
      this.setState({ loader: !this.state.loader })
    }
  }
 

  passwordValidationRules(regexData:any) {
    if (regexData.password_validation_rules) {
      this.setState({
        passwordHelperText: regexData.password_validation_rules,
      });
    }
  }


  goToPrivacyPolicy() {
    const msgs: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }

  goToTermsAndCondition() {
    const msgs: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }

  isStringNullOrBlank(strs: string) {
    return strs === null || strs.length === 0;
  }

  createAccount(): boolean {
    if (
      this.isStringNullOrBlank(this.state.firstName) ||
      this.isStringNullOrBlank(this.state.lastName) ||
      this.isStringNullOrBlank(this.state.password) ||
      this.isStringNullOrBlank(this.state.reTypePassword)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    }

    let phoneNumberError = this.validateCountryCodeAndPhoneNumber(
      this.state.countryCodeSelected,
      this.state.phone
    );

    if (phoneNumberError) {
      this.showAlert(configJSON.errorTitle, phoneNumberError);
      return false;
    }

    if (this.state.password !== this.state.reTypePassword) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorBothPasswordsNotSame
      );
      return false;
    }

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail,
    };

    const attrs = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      full_phone_number:
        "+" + this.state.countryCodeSelected + this.state.phone,
    };

    const userData = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: userData,
      token: this.state.otpAuthToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.accountsAPiEndPoint
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getValidations() {
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

  isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== null &&
      value !== "null" &&
      value.trim().length > 0
    );
  }

  validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
    let error = null;

    if (this.isNonNullAndEmpty(phoneNumber)) {
      if (!this.isNonNullAndEmpty(String(countryCode))) {
        error = configJSON.errorCountryCodeNotSelected;
      }
    } else if (this.isNonNullAndEmpty(countryCode)) {
      if (!this.isNonNullAndEmpty(phoneNumber)) {
        error = "Phone " + configJSON.errorBlankField;
      }
    }

    return error;
  }

  imgEnableRePasswordFieldProps = {
    source: imgPasswordVisible,
  };

  btnConfirmPasswordShowHideProps = {
    onPress: () => {
      this.setState({
        enableReTypePasswordField: !this.state.enableReTypePasswordField,
      });
      this.txtInputConfirmPasswordProps.secureTextEntry =
        !this.state.enableReTypePasswordField;
      this.imgEnableRePasswordFieldProps.source = this
        .txtInputConfirmPasswordProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  imgEnablePasswordFieldProps = {
    source: imgPasswordVisible,
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnSignUpProps = {
    onPress: () => this.createAccount(),
  };

  btnLegalPrivacyPolicyProps = {
    onPress: () => this.goToPrivacyPolicy(),
  };

  btnLegalTermsAndConditionProps = {
    onPress: () => this.goToTermsAndCondition(),
  };

  txtInputEmailWebPrpos = {
    onChangeText: (text: string) => {
      this.setState({ email: text });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    },
  };

  txtInputEmailMobilePrpos = {
    ...this.txtInputEmailWebPrpos,
    keyboardType: "email-address",
  };

  txtInputEmailPrpos = this.isPlatformWeb()
    ? this.txtInputEmailWebPrpos
    : this.txtInputEmailMobilePrpos;

  txtPhoneNumberWebProps = {
    onChangeText: (text: string) => {
      this.setState({ phone: text });

      //@ts-ignore
      this.txtPhoneNumberProps.value = text;
    },
  };

  txtPhoneNumberMobileProps = {
    ...this.txtPhoneNumberWebProps,
    autoCompleteType: "tel",
    keyboardType: "phone-pad",
  };

  txtPhoneNumberProps = this.isPlatformWeb()
    ? this.txtPhoneNumberWebProps
    : this.txtPhoneNumberMobileProps;

  txtInputLastNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });

      //@ts-ignore
      this.txtInputLastNamePrpos.value = text;
    },
  };

  txtInputFirstNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });

      //@ts-ignore
      this.txtInputFirstNamePrpos.value = text;
    },
  };

  txtInputConfirmPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ reTypePassword: text });

      //@ts-ignore
      this.txtInputConfirmPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  handleToggle = (buttonType:string) => {
    this.setState({
      selectedButton: buttonType,
      showIndividual: buttonType,
      contactName: "",
      BusinessCompanyName: "",
      email: "",
      password: "",
      reTypePassword: "",
      errorsContact: "",
      errorBusinessCompanyName: "",
      errorEmail: "",
      errorPassword: "",
      errorComPassword: "",
      errorConfirmPasswordFlag: false,
      isValidLength: false,
      isNoBlankSpace: false,
      isChecklowerUpperCase: false,
    });
  };

  handleClickShowPasswordupdate = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };
  handleClickShowPasswordupdate2=()=>{
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  }
  handleClickConfirmPassword = () => {
    this.setState({
      enableReTypePasswordField: !this.state.enableReTypePasswordField,
    });
  };

  handleNameChange = (evalue: any) => {
    const { name, value } = evalue.target;
    if ((configJSON.alphanumericMax30CharsRegex.test(value) || value === "") && !value.includes("  ")) {   
      this.setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      this.validateForm()
      this.setState({ errorsContact: "" });
    }
  };
  handleCountryName = (evalue: any) => {
    const { name, value } = evalue.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    this.validateForm()
    this.setState({ errorsContact: "" });
  };
  handleBusniessNameChange = (evalue: any) => {
    const { name, value } = evalue.target;
    if ((configJSON.alphanumericMax30CharsRegex.test(value) || value === "") && !value.includes("  ")) {   
      this.setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      this.validateForm()
      this.setState({ errorBusinessCompanyName: "" });
    }
  };

  handleEmailChange = (evalue: any) => {
    const { name, value } = evalue.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    this.validateForm()
    this.setState({ errorEmail: "" });
  };
  handlecountryCode = (evalue: any) => {
    const { name, value } = evalue.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    this.validateForm()
    this.setState({ errorEmail: "" });
  };

  handlePasswordChange = (evalue: any) => {
    this.validateConfirmPassword(this.state.tempPassword);
    this.setState({
      errorPassword:"",
    });
    const firstLetter = evalue.charAt(0);
    const lastLetter = evalue.charAt(evalue.length - 1);
    if(firstLetter!="*"){
      this.setState({password: evalue,tempPassword:evalue});
      this.validateConfirmPassword(this.state.tempPassword);
      this.validateForm()
    }else if(lastLetter!="*"){
      this.setState({password: this.state.tempPassword+lastLetter,tempPassword:this.state.tempPassword+lastLetter});
      this.validateConfirmPassword(this.state.tempPassword);
      this.validateForm()
    }else{
      let input= this.state.password.slice(0, -1);
      this.setState({password: input,tempPassword:input});
      this.validateConfirmPassword(this.state.tempPassword);
      this.validateForm()
    }

  };
  handleComPasswordChange = (evalue: any) => {
    this.setState({
      errorComPassword:"",
    });
    const lastLetter = evalue.charAt(evalue.length - 1);
    const firstLetter = evalue.charAt(0);
    if(firstLetter!="*"){
      this.setState((prevState) => ({
        ...prevState,
        tempPassword: evalue, 
        reTypePassword: evalue
      }), () => {
        this.validateConfirmPassword(this.state.reTypePassword);
        this.validateForm()
      });
    }else if(lastLetter!="*"){
      this.setState((prevState) => ({
        ...prevState,
        reTypePassword: this.state.tempPassword+lastLetter,
        tempPassword:this.state.tempPassword+lastLetter  
      }), () => {
        this.validateConfirmPassword(this.state.reTypePassword);
        this.validateForm()
      });
        this.validateConfirmPassword(this.state.reTypePassword);
    }else{
      let input= this.state.reTypePassword.slice(0, -1);
      this.setState((prevState) => ({
        ...prevState,
        reTypePassword: input,tempPassword:input  // Assuming 'value' is your new password value
      }), () => {
        this.validateConfirmPassword(this.state.reTypePassword);
        this.validateForm()
      });
     

    }

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

  handleSubmit = (events: any) => {
    events.preventDefault();
    const {
      contactName,
      email,
      password,
      BusinessCompanyName,
      reTypePassword,
    } = this.state;
    this.setState({ loader: true });
    if (
      !this.checkValidations() ||
      !this.state.isValidLength ||
      !this.state.isNoBlankSpace ||
      !this.state.isChecklowerUpperCase
    ) {
      this.setState({ loader: false });
      return false;
    } else {
      const header = {
        "Content-Type": "application/json",
      };

      const emailAttrs = {
        email: email,
        password: password,
        contact_name: "",
        company_name: BusinessCompanyName,
        role_id: 1,
        user_type: this.state.selectedButton,
        password_confirmation: reTypePassword,
        full_name: contactName,
      };

      setStorageData('signUpData', JSON.stringify({ ...emailAttrs, signupPage: "EmailAccountRegistrationWeb" }));

      const emailData = {
        type: "email_account",
        attributes: emailAttrs,
      };

      const emailHttpBody = {
        data: emailData,
        token: this.state.otpAuthToken,
      };

      const emailRequestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.createSignUpApiCallId = emailRequestMessage.messageId;
      emailRequestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.accountsAPiEndPoint
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
        configJSON.apiMethodTypeAddDetail
      );

      runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
      return true;
    }
  };

  checkValidations = () => {
    let isValidBoolean = true;
    const {
      contactName,
      email,
      password,
      reTypePassword,
      BusinessCompanyName,
    } = this.state;

    this.setState({
      errorsContact: "",
      errorBusinessCompanyName: "",
      errorEmail: "",
      errorPassword: "",
      errorComPassword: "",
      errorConfirmPasswordFlag: false,
    });

    const emailCheck = configJSON.emailRegex;
    const nameCheck = /^[a-zA-Z]{1,30}(?:\s+[a-zA-Z]{1,30}){1,3}$/;
    const businessNameCheck = /^[a-zA-Z ]{1,30}(?:\s+[a-zA-Z ]{1,30})?$/;

    if (!contactName.trim()) {
      this.setState({ errorsContact: "Please enter your first and last name" });
    } else if (!nameCheck.test(contactName)) {
      this.setState({
        errorsContact:
          "Please enter your first and last name",
      });
      isValidBoolean = false;
    }

    if (!BusinessCompanyName.trim()) {
      this.setState({
        errorBusinessCompanyName: "Please enter your Business / Company name",
      });
    } else if (!businessNameCheck.test(BusinessCompanyName)) {
      this.setState({
        errorBusinessCompanyName:
          "Please enter your Business / Company name",
      });
      isValidBoolean = false;
    }

    if (!email.trim()) {
      this.setState({ errorEmail: "Please enter your email address" });
    } else if (!emailCheck.test(email)) {
      this.setState({
        errorEmail:
          "The email address you entered is not in a valid format. Please enter a valid email address.",
      });
      isValidBoolean = false;
    }

    if (!password.trim()) {
      this.setState({ errorPassword: "Please enter your password" });
    }

    if (!reTypePassword.trim()) {
      this.setState({
        errorComPassword: "Please enter your confirm password",
        errorConfirmPasswordFlag: true,
      });
    } else if (password !== reTypePassword) {
      this.setState({
        errorComPassword: "Passwords do not match",
        errorConfirmPasswordFlag: true,
      });
      isValidBoolean = false;
    }

    if (
      password === reTypePassword &&
      (!this.state.isValidLength ||
        !this.state.isNoBlankSpace ||
        !this.state.isChecklowerUpperCase)
    ) {
      this.setState({ errorConfirmPasswordFlag: true });
    }

    return isValidBoolean;
  };
  
  goToLogin() {
    const msgs: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }
  goToHome =() => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "OnboardingPageWeb");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(msgs);
    return true;
  }
  goToLanding() {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "Home");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(msgs);
    return true;
  }
GuestButton(){
  setStorageData("guestClient" , true);
  const msgs = new Message(getName(MessageEnum.NavigationMessage));
  msgs.addData(getName(MessageEnum.NavigationTargetMessage), "Dashboard");
  msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
  this.send(msgs);
  return true;
}

  // Customizable Area End
}
