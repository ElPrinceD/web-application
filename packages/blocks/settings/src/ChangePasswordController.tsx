import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import { getStorageData } from "../../../framework/src/Utilities";

// Customizable Area Start
import { Success, Warning, error } from "./assets";
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
  loader: boolean;
  token: string;
  currentPassword: string
  newPassword: string
  confirmPassword: string
  enablePasswordField: boolean
  enableCurrentPasswordField: boolean
  enableConfirmPasswordField: boolean
  stars: string
  isValidLength: boolean;
  isChecklowerUpperCase: boolean;
  isNoBlankSpace: boolean;
  iSValidPassword: boolean;
  reTypePassword: string;
  reTypeConfirmPassword: string;
  reTypeCurrentPassword: string;
  openConfirmationPopup: boolean;
  openSuccessPopup: boolean;
  confirmPasswordError: string;
  currentPasswordError: string;
  previousPasswordError: boolean
  newPasswordError: string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChangePasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  changePasswordApiCallId: string = ""
  checkLastPasswordApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loader: false,
      token: "",
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      enablePasswordField: true,
      enableCurrentPasswordField: true,
      enableConfirmPasswordField: true,
      stars: '',
      isValidLength: false,
      isChecklowerUpperCase: false,
      isNoBlankSpace: false,
      iSValidPassword: false,
      reTypePassword: '',
      reTypeConfirmPassword: '',
      reTypeCurrentPassword: '',
      openConfirmationPopup: false,
      openSuccessPopup: false,
      confirmPasswordError: "",
      currentPasswordError: "",
      previousPasswordError: false,
      newPasswordError: ''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (webApiRequestCallId === this.changePasswordApiCallId) {
        this.handleChangePasswordApiRes(webResponseJson)
      }
      if (webApiRequestCallId === this.checkLastPasswordApiCallId) {
        this.handleCheckLastPasswordApiRes(webResponseJson)
      }
    }

  }

  async componentDidMount() {
    super.componentDidMount();
    let token = await getStorageData("token");
    this.setToken(token);
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({ token });
    }
  }


  handlePasswordChange = (value: any) => {
    this.setState({confirmPasswordError: "", newPasswordError: ''});

    const lastLetter = value.charAt(value.length - 1);
    const firstLetter = value.charAt(0);
    if (firstLetter != "*") {
      this.setState((prevState) => ({
        ...prevState,
        newPassword: value,
        reTypePassword: value
      }), () => {
        this.validateConfirmPassword(this.state.reTypePassword);
        this.checkLastPasswordApiCall();
      });
    } else if (lastLetter != "*") {
      this.setState((prevState) => ({
        ...prevState,
        reTypePassword: this.state.reTypePassword + lastLetter,
        newPassword: this.state.reTypePassword + lastLetter
      }), ()=> {
        this.validateConfirmPassword(this.state.reTypePassword);
        this.checkLastPasswordApiCall();
      });
    } else {
      let input = this.state.reTypePassword.slice(0, -1);
      this.setState((prevState) => ({
        ...prevState,
        newPassword: input, reTypePassword: input
      }), ()=> {
        this.validateConfirmPassword(this.state.reTypePassword);
        this.checkLastPasswordApiCall();
      });

    }
  }

  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };

  handleClickShowCurrentPassword = () => {
    this.setState({
      enableCurrentPasswordField: !this.state.enableCurrentPasswordField,
    });
  }

  handleClickShowConfirmPassword = () => {
    this.setState({
      enableConfirmPasswordField: !this.state.enableConfirmPasswordField,
    });
  }

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

    if (regexLength.test(password) && regexNoBlankSpace.test(password) && regextUpperLowerCase.test(password)) {
      this.setState({ iSValidPassword: true });
    } else {
      this.setState({ iSValidPassword: false });
    }
  };

  handleConfirmPasswordChange = (event: any) => {
    this.setState({confirmPasswordError: ""})
    const { value, } = event.target;

    const lastLetter = value.charAt(value.length - 1);
    const firstLetter = value.charAt(0);
    if (firstLetter != "*") {
      this.setState((prevState) => ({
        ...prevState,
        confirmPassword: value,
        reTypeConfirmPassword: value
      }));
    } else if (lastLetter != "*") {
      this.setState((prevState) => ({
        ...prevState,
        reTypeConfirmPassword: this.state.reTypeConfirmPassword + lastLetter,
        confirmPassword: this.state.reTypeConfirmPassword + lastLetter
      }));
    } else {
      let input = this.state.reTypeConfirmPassword.slice(0, -1);
      this.setState((prevState) => ({
        ...prevState,
        confirmPassword: input, reTypeConfirmPassword: input
      }));

    }


  }

  handleCurrentPasswordChange = (event: any) => {
    this.setState({currentPasswordError: ''});
    const { value } = event.target;

    const lastLetter = value.charAt(value.length - 1);
    const firstLetter = value.charAt(0);
    if (firstLetter != "*") {
      this.setState((prevState) => ({
        ...prevState,
        currentPassword: value,
        reTypeCurrentPassword: value
      }));
    } else if (lastLetter != "*") {
      this.setState((prevState) => ({
        ...prevState,
        reTypeCurrentPassword: this.state.reTypeCurrentPassword + lastLetter,
        currentPassword: this.state.reTypeCurrentPassword + lastLetter
      }));
    } else {
      let input = this.state.reTypeCurrentPassword.slice(0, -1);
      this.setState((prevState) => ({
        ...prevState,
        currentPassword: input, reTypeCurrentPassword: input
      }));

    }
  }

  changePasswordApiCall = async () => {
    this.setState({ loader: true });
    const {currentPassword, newPassword, confirmPassword} = this.state;
    const header = {
      "Content-Type": "application/json",
      token: this.state.token
    };
    const body = {
      data: {
        "current_password": currentPassword,
        "new_password": newPassword,
        "new_password_confirmation": confirmPassword
      }
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.changePasswordApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.changePasswordApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleChangePasswordApiRes = (response: any) => {
    this.setState({ loader: false });
    if(!response.error){
      this.setState({ 
        openConfirmationPopup: false, 
        openSuccessPopup: true, 
        currentPassword: '', 
        newPassword: "", 
        confirmPassword: "",
        previousPasswordError: false,
        isChecklowerUpperCase: false,
        isNoBlankSpace: false,
        isValidLength: false,
        iSValidPassword: false
      });

      setTimeout(() => ( this.setState({ openSuccessPopup: false, openConfirmationPopup: false })), 2000);
    }else if(response.error && response.error === "Incorrect old password."){
      this.setState({ 
        openConfirmationPopup: false, 
        openSuccessPopup: false, 
        currentPasswordError: "Incorrect password",
        confirmPasswordError: "" 
      });
    }
    // else if(response.error && response.error === "Must be different from your last 3 passwords."){
    //   this.setState({ 
    //     openConfirmationPopup: false, 
    //     openSuccessPopup: false, 
    //     currentPasswordError: "", 
    //     confirmPasswordError: "",
    //     previousPasswordError: true 
    //   });
    // }
  }

  handleSubmit = () => {
    this.checkNewPasswordError();
    this.checkCurrentPasswordError();
    this.checkConfirmPasswordError();
    this.openChangePasswordDialog()
  }

  openChangePasswordDialog = () => {
    const {newPassword, iSValidPassword, currentPassword, confirmPassword} = this.state;
    if(iSValidPassword && currentPassword && newPassword === confirmPassword){
      this.setState({openConfirmationPopup: true});
    }
  }

  checkNewPasswordError = () => {
    const {newPassword, iSValidPassword} = this.state;
    if(newPassword && !iSValidPassword){
      this.setState({newPasswordError: "New password is incorrect"})
    }else if(!newPassword){
      this.setState({newPasswordError: "Enter new password"})
    }
  }

  checkCurrentPasswordError = () => {
    const {currentPassword} = this.state;
    if(!currentPassword){
      this.setState({currentPasswordError: "Enter your current password"})
    }
  }

  checkConfirmPasswordError = () => {
    const {newPassword, confirmPassword, iSValidPassword} = this.state;
    if(iSValidPassword && newPassword !== confirmPassword) {
      this.setState({confirmPasswordError: "Passwords do not match"});
    }
  }

  handleCloseConfimationPopup = () => {
    this.setState({openConfirmationPopup: false});
  }

  handleSubmitConfirmationPopup = () => {
    this.changePasswordApiCall();
  }

  checkValidLengthIcon = () => {
    if(!this.state.newPasswordError){
      return this.state.isValidLength ? Success : Warning;
    }else {
      return this.state.isValidLength ? Success : error;
    }
  }

  checkValidLengthText = () => {
    if(!this.state.newPasswordError){
      return "#334155";
    }else {
      return this.state.isValidLength ? "#334155" : "#DC2626";
    }
  }

  renderValidLengthImg = (check: string) => {
    switch (check){
      case "icon": 
      return this.checkValidLengthIcon();
      case "text": 
      return this.checkValidLengthText();
    }
  }

  checkCondition2Icon = () => {
    if(!this.state.newPasswordError){
      return this.state.isChecklowerUpperCase ? Success : Warning;
    }else {
      return this.state.isChecklowerUpperCase ? Success : error;
    }
  }

  checkCondition2Text = () => {
    if(!this.state.newPasswordError){
      return "#334155";
    }else {
      return this.state.isChecklowerUpperCase ? "#334155" : "#DC2626";
    }
  }

  renderCondition_2Img = (check: string) => {
    switch (check){
      case "icon":
        return this.checkCondition2Icon();
      case "text": 
      return this.checkCondition2Text();
    }
  }

  checkCondition3Icon = () => {
    if(!this.state.newPasswordError){
      return this.state.isNoBlankSpace ? Success : Warning;
    }else {
      return this.state.isNoBlankSpace ? Success : error;
    }
  }

  checkCondition3Text = () => {
    if(!this.state.newPasswordError){
      return "#334155";
    }else {
      return this.state.isNoBlankSpace ? "#334155" : "#DC2626";
    }
  }

  renderCondition_3Img = (check: string) => {
    switch (check){
      case "icon":
        return this.checkCondition3Icon() 
      case "text": 
        return this.checkCondition3Text();
    }
  }

  checkCondition4Icon = () => {
    if(!this.state.previousPasswordError){
      return this.state.newPassword ? Success : Warning;
    }else {
      return this.state.newPassword ? error : Warning;
    }
  }

  checkCondition4Text = () => {
    if(!this.state.previousPasswordError){
      return "#334155";
    }else {
      return this.state.newPassword ? "#DC2626" : "#334155";
    }
  }

  renderCondition_4Img = (check: string) => {
    switch (check){
      case "icon":
        return this.checkCondition4Icon() 
      case "text": 
        return this.checkCondition4Text();
    }
  }

  checkLastPasswordApiCall = async () => {
    const header = {
      "Content-Type": "application/json",
      token: this.state.token
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
      `bx_block_profile/verify_password_history?new_password=${this.state.reTypePassword}`
    );
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleCheckLastPasswordApiRes = (response: any) => {
    if(response.error){
      this.setState({previousPasswordError: true});
    }else {
      this.setState({previousPasswordError: false});
    }
  }

  // Customizable Area End
}
