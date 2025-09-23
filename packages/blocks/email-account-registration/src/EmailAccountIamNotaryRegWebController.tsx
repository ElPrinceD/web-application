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
  userEmail: string;
  password: string;
  tempPassword:string,
  reTypePassword: string;
  data: any[];
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  selectedButton: string;
  userName: string;
  BusinessCompanyName: string;
  errorsContact: string;
  errorEmail: string;
  errorPassword: string;
  errorBusinessCompanyName: string;
  errorComPassword: string;
  iSValidPassword: boolean;
  isValidLength: boolean;
  isNoBlankSpace: boolean;
  isChecklowerUpperCase: boolean;
  errorConfirmPasswordFlag: boolean;
  loader: boolean;
  countryListArray:string[];
  countryName:string;
  errorCountry:string;
  isChecked: boolean;
 isButtonEnabled: boolean | string,
  
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountIamNotaryRegWebController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  createAccountNotaryApiCallId: any;
  getCountryListApiCall:any;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: any;
  currentCountryCode: any;
  // Customizable Area End
  

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.SessionResponseToken)
    ];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      // Customizable Area Start
      userEmail: "",
      password: "",
      reTypePassword: "",
      data: [],
      enablePasswordField: true,
      enableReTypePasswordField: true,
      selectedButton: "notary",
      userName: "",
      BusinessCompanyName: "",
      errorsContact: "",
      errorEmail: "",
      errorCountry:"",
      errorPassword: "",
      errorComPassword: "",
      errorBusinessCompanyName: "",
      iSValidPassword: false,
      isValidLength: false,
      isNoBlankSpace: false,
      isChecklowerUpperCase: false,
      errorConfirmPasswordFlag: false,
      loader: false,
      countryListArray:[],
      countryName:"",
      tempPassword:"",
      isChecked: false,
      isButtonEnabled: false,
      // Customizable Area End
    };

    // Customizable Area Start

    this.imgPasswordVisible = imgPasswordVisible;
    this.imgPasswordInVisible = imgPasswordInVisible;

    this.labelHeader = configJSON.labelHeader;
    this.GetCountryList();
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
        if (apiRequestCallId === this.createAccountNotaryApiCallId) {
          this.handleAPIResponse2(responseJson);
        }
        else if(apiRequestCallId === this.getCountryListApiCall){
          if(!responseJson.errors){
           let countryList = responseJson.data.map((item:any) => item.attributes.name);
            this.setState({countryListArray:countryList},() => {console.log(this.state.countryListArray[0],":country")})
          }
        }
      }
      
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    this.handleRedirectCheck()
  }

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isChecked: event.target.checked,
    },this.validateForm);
  };


  handleRedirectCheck = async() => {
     let signupData = await getStorageData('signUpData');
     if(signupData) {
       signupData = JSON.parse(signupData);
        this.setState({ 
          userName : signupData.full_name,
          userEmail : signupData.email,
          password : signupData.password,
          BusinessCompanyName :  signupData.company_name,
          selectedButton : signupData.user_type , 
          reTypePassword : signupData.password_confirmation , 
          countryName : signupData.country,
          errorConfirmPasswordFlag :  false,
          isValidLength : true,
          isChecklowerUpperCase : true,
          isNoBlankSpace : true,
        })
        removeStorageData('signUpData');
     }
  }


  handleAPIResponse2 = (responseJson:any) => {
    if (!responseJson.errors) {
        const goToDetails = new Message(getName(MessageEnum.NavigationMessage));
		goToDetails.addData(getName(MessageEnum.NavigationTargetMessage), "OtpVerification");

		goToDetails.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
		const raiseMessage: Message = new Message(
		 	getName(MessageEnum.NavigationPayLoadMessage)
		);
		raiseMessage.addData("rowData", responseJson);
		goToDetails.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

		this.send(goToDetails);
    }
    else if (responseJson.errors?.email) {
      this.setState({ errorEmail: responseJson.errors.email[0] })
      this.setState({ loader: !this.state.loader })
    } else {
      this.setState({ errorEmail: responseJson.errors })
      this.setState({ loader: !this.state.loader })
    }
		
	}

 
  handleClickShowPasswordChange = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };
  handleClickConfirmPassword = () => {
    this.setState({
      enableReTypePasswordField: !this.state.enableReTypePasswordField,
    });
  };


  handleNameChange2 = (evalue: any) => {
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

  handleBusniessName = (evalue: any) => {
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

  handleEmail = (evalue: any) => {
    const { name, value } = evalue.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    this.validateForm()
    this.setState({ errorEmail: "" });
  };

  handlecountry = (evalue: any) => {
    const { textContent } = evalue.target;    
    this.setState(
      {countryName:textContent}
    );
    this.validateForm()
    this.setState({ errorCountry: "" });
   
  };

  handlePasswordUpdate = (text: any) => {
  
    this.setState({
      errorPassword:"",
    });
    const firstLetter = text.charAt(0);
    const lastLetter = text.charAt(text.length - 1);
    if(firstLetter!="*"){
      this.setState({password: text,tempPassword:text});
      this.checkValidationPasswordUpdate(this.state.tempPassword);
      this.validateForm()
    }else if(lastLetter!="*"){
      this.setState({password: this.state.tempPassword+lastLetter,tempPassword:this.state.tempPassword+lastLetter});
      this.checkValidationPasswordUpdate(this.state.tempPassword);
      this.validateForm()
    }else{
      let input= this.state.password.slice(0, -1);
      this.setState({password: input,tempPassword:input});
      this.checkValidationPasswordUpdate(this.state.tempPassword);
      this.validateForm()
    }


  };
  handleComPasswordUpdate = (value: any) => {
    this.setState({
      errorComPassword:"",
    });
    const firstLetter = value.charAt(0);
    const lastLetter = value.charAt(value.length - 1);
    if(firstLetter!="*"){
      this.setState((prevState) => ({
        ...prevState,
        reTypePassword: value,
        tempPassword: value  // Assuming 'value' is your new password value
      }), () => {
        this.checkValidationPasswordUpdate(this.state.reTypePassword);
        this.validateForm()
      });
    }else if(lastLetter!="*"){
      this.setState((prevState) => ({
        ...prevState,
        reTypePassword: this.state.tempPassword+lastLetter,tempPassword:this.state.tempPassword+lastLetter  // Assuming 'value' is your new password value
      }), () => {
        this.checkValidationPasswordUpdate(this.state.reTypePassword);
        this.validateForm()
      });
        this.checkValidationPasswordUpdate(this.state.reTypePassword);
        this.validateForm()
    }else{
      let input= this.state.reTypePassword.slice(0, -1);
      this.setState((prevState) => ({
        ...prevState,
        reTypePassword: input,tempPassword:input  // Assuming 'value' is your new password value
      }), () => {
        this.checkValidationPasswordUpdate(this.state.reTypePassword);
        this.validateForm()
      });
     

    }
  };

  checkValidationPasswordUpdate = (password: string) => {
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

  handleSubmitChange = () => {
    const {
      userName,
      userEmail,
      password,
      BusinessCompanyName,
      reTypePassword
    } = this.state;
    this.setState({ loader: true });
    if (
      !this.checkValidationChange() ||
      !this.state.isValidLength ||
      !this.state.isNoBlankSpace ||
      !this.state.isChecklowerUpperCase
    ) {
      this.setState({ loader: false });
      return false;
    } else {
      const signUpData = {
        email: userEmail,
        password: password,
        company_name: BusinessCompanyName,
        user_type: this.state.selectedButton,
        password_confirmation: reTypePassword,
        full_name: userName,
        country: this.state.countryName,
        signupPage : "EmailAccountIamNotaryRegWeb",
      }
      setStorageData("signUpData" , JSON.stringify(signUpData));
      this.CallSignupApi();
          }
  };
CallSignupApi(){
  const {
    userName,
    userEmail,
    password,
    BusinessCompanyName,
    reTypePassword
  } = this.state;
  const header = {
    "Content-Type": "application/json",
  };

  const emailAttrs = {
    email: userEmail,
    password: password,
    company_name: BusinessCompanyName,
    role_id: 2,
    user_type: this.state.selectedButton,
    password_confirmation: reTypePassword,
    full_name: userName,
    country: this.state.countryName,
  };
 

  const emailData = {
    type: "email_account",
    attributes: emailAttrs,
  };

  const emailHttpBody = {
    data: emailData,
  };

  const emailRequestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  this.createAccountNotaryApiCallId = emailRequestMessage.messageId;
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

validateForm = () => {
  const {
    userName,
    userEmail,
    password,
    reTypePassword,
    BusinessCompanyName,
    countryName,
    isChecked
  } = this.state;
  const isFormValid =
    userName.trim() &&
    userEmail.trim() &&
    password.trim() &&
    BusinessCompanyName.trim() &&
    reTypePassword.trim() &&
    password === reTypePassword &&
    isChecked && 
    countryName;

  this.setState({ isButtonEnabled: isFormValid });
};
  checkValidationChange = () => {
    let isValidExample = true;
    const {
      userName,
      userEmail,
      password,
      reTypePassword,
      BusinessCompanyName,
      countryName
    } = this.state;

    this.setState({
      errorsContact: "",
      errorBusinessCompanyName: "",
      errorEmail: "",
      errorCountry:"",
      errorPassword: "",
      errorComPassword: "",
      errorConfirmPasswordFlag: false,
    });

    const emailCheck = configJSON.emailRegex;
    const nameCheck = configJSON.alphanumericMax30CharsRegex;
    const businessNameCheck = configJSON.alphanumericMax30CharsRegex;

    if (!userName.trim()) {
      this.setState({ errorsContact: "Please enter your first and last name" });
    } else if (!nameCheck.test(userName)) {
      this.setState({
        errorsContact:
          "Please enter your first and last name",
      });
      isValidExample = false;
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
      isValidExample = false;
    }
    if (!countryName.trim()) {
      this.setState({
        errorCountry: "Please choose your country",
      });
      isValidExample = false;
    }
   
    if (!userEmail.trim()) {
      this.setState({ errorEmail: "Please enter your email address" });
    } else if (!emailCheck.test(userEmail)) {
      this.setState({
        errorEmail:
          "The email address you entered is not in a valid format. Please enter a valid email address.",
      });
      isValidExample = false;
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
      isValidExample = false;
    }

    if (
      password === reTypePassword &&
      (!this.state.isValidLength ||
        !this.state.isNoBlankSpace ||
        !this.state.isChecklowerUpperCase)
    ) {
      this.setState({ errorConfirmPasswordFlag: true });
    }
    return isValidExample;
  };
  GetCountryList=()=>{
    const header = {
      "Content-Type": "application/json",
    };

  
    const emailRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCountryListApiCall = emailRequestMessage.messageId;
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCountryListAPI
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
    return true;
  }
  goToLoginScreen() {
    const msgs: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }
  goToHomeScreen() {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "OnboardingPageWeb");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(msgs);
    return true;
  }
  goToLandingPage = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "Home");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(msgs);
    return true;
  }
 
  // Customizable Area End
}
