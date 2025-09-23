import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";

export interface DisconnectStripeResponse{
  message?: string;
  error?: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
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
  loader: boolean;
  isSideBarOpen: boolean;
  value: number;
  token: string
  userRoleId: number;
  isStripeConnected: string;
  savedetailsScreen:boolean;
  vatInputFieldShow:boolean;
  salesSuccessShow:boolean;
  salesSuccessShows:boolean;
  displysuccsessMessage:boolean;
  salesSuccesseditShow:boolean;
  vatcheked :boolean;
  noVatcheked:boolean;
  salesShowdad:any;
  salesShowEditdad:any;
  vatNumber:any;
  validationMessage:any;
  validErrorMessage:any;
  isOnlyLetters :any;
isOnlyNumbers:any;
isValidVatNumber :any;
 editScreen:boolean;
 validErrorMessageEdit:any;
 stripeAccountDetails: {
    currency: string,
    account_name: string,
    account_email: string
 } | null;
  disconnectStripePopup: boolean;
  successPopup: boolean;
  failurePopup: boolean;
  disconnectStripeText: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SettingsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getUserProfileDetailsApiCallId: string = "";
  stripeConnectApiCallId: string = "";
  checkStripeConnectApiCallId: string = "";
  getSalesTextApiCallId: string = "";
  getSalesTextEditApiCallId: string = "";
  disconnectStripeApiCallId: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      loader: false,
      isSideBarOpen: false,
      value: 0,
      token: "",
      userRoleId: 0,
      isStripeConnected: "",
      savedetailsScreen:false,
      vatInputFieldShow:false,
      salesSuccessShow:false,
      salesSuccessShows:false,
      displysuccsessMessage:true,
      salesSuccesseditShow:false,
      vatcheked:false,
      noVatcheked:false,
      salesShowdad:'',
      salesShowEditdad:'',
      vatNumber:'',
      validationMessage: "",
      validErrorMessage:'',
      isOnlyLetters :'',
    isOnlyNumbers:'',
    isValidVatNumber :'',
    editScreen:false,
    validErrorMessageEdit:'',
    stripeAccountDetails: null,
      disconnectStripePopup: false,
      successPopup: false,
      failurePopup: false,
      disconnectStripeText: "",
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
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const navigationData = message.getData(getName(MessageEnum.CustomDataMessage));
      if (navigationData) 
        this.setState({value: navigationData.tabValue});
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (webApiRequestCallId === this.getUserProfileDetailsApiCallId) {
        this.handleUserProfileDetailsApiRes(webResponseJson)
      }
      if (webApiRequestCallId === this.stripeConnectApiCallId) {
        this.handleStripeConnectRes(webResponseJson);
      }
      if (webApiRequestCallId === this.checkStripeConnectApiCallId) {
        this.checkStripeConnectRes(webResponseJson);
      }
      if (webApiRequestCallId === this.getSalesTextApiCallId) {
        this.handleSalesTaxt(webResponseJson);
      }
      if (webApiRequestCallId === this.getSalesTextEditApiCallId) {
        this.handleSalesEditText(webResponseJson);
      }
      if (webApiRequestCallId === this.disconnectStripeApiCallId){
        this.handleResponseDisconnectStripe(webResponseJson);
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
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }


  // web events

  async componentDidMount() {
    super.componentDidMount();

    window.addEventListener("message", (event) => {
      const targetOrigin = window.location.origin;
      if (event.origin === targetOrigin && event.data === "stripe-setup-completed") {
          window.location.reload();
      }
    });

    const stripeConnect = await getStorageData('account_connect');
    let token = await getStorageData("token");
    this.setToken(token);
    this.stripeProcess(stripeConnect);
    this.getSalesTextshowAPI()
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({ token });
      this.getUserProfileDetails(token);
      this.checkStripeConnection(token);
    }
  }
  SaveDetails =() =>{

      this.setState({savedetailsScreen:true,displysuccsessMessage:false,vatNumber:''})

  }

  editDetails =() =>{
    this.setState({salesSuccessShows:false,savedetailsScreen:true,displysuccsessMessage:false,salesSuccessShow:false,editScreen:true,salesShowdad:false})
  }
 
  canselDetails = () => {
    const { savedetailsScreen} = this.state;
 
   if (savedetailsScreen && !this.state.editScreen) {
     this.setState({
       savedetailsScreen: false,
       displysuccsessMessage: true,
       salesSuccessShow: false,
       salesSuccessShows: false,
       noVatcheked: false,
       vatcheked: false,
       vatInputFieldShow:false
     });
   } else if (this.state.editScreen) {
     this.setState(
       {
         salesSuccessShow: false,
         salesSuccessShows: true,
         savedetailsScreen: false,
         displysuccsessMessage: false,

       },
       () => this.getSalesTextshowAPI() 
     );
   } 
 
   else{
     this.setState({
       savedetailsScreen: false,
       salesSuccessShow: false,
       salesSuccessShows: true,
       noVatcheked: false,
       vatcheked: false,
     });
   }
   };
 
  stripeProcess = (processing: string | null) => {
    if(processing){
      this.setState({value: 4});
    }
  }
 
  
  vatChange =(event: { target: { checked: any; }; }) =>{
    const isChecked = event.target.checked;
    this.setState({vatInputFieldShow: !this.state.vatInputFieldShow,noVatcheked:isChecked,vatcheked:false})
  }
  noVatHave  =(event: { target: { checked: any; }; }) =>{
    const isChecked = event.target.checked;
     this.setState({vatcheked: isChecked,noVatcheked:false,vatInputFieldShow:false,vatNumber:'',salesShowdad: false})
  }
  savesales = () => {
    const { noVatcheked, vatcheked, vatNumber } = this.state;
     
    this.setState({
      isOnlyLetters: /^[a-zA-Z]+$/.test(vatNumber),
      isOnlyNumbers: /^\d+$/.test(vatNumber),
      isValidVatNumber: /^[a-zA-Z0-9]*$/.test(vatNumber)
    }, () => {
      const { isOnlyLetters, isOnlyNumbers, isValidVatNumber } = this.state;
  
      const getValidationMessage = () => {
        if (vatNumber.length < 9) {
          return 'VAT number must have a minimum of 9 characters.';
        } else if (vatNumber.length > 14) {
          return 'VAT number can have a maximum of 14 characters.';
        } else if (!isValidVatNumber) {
          return 'Invalid Value Added Tax Number: The entered Value Added Tax number does not comply with the required format.';
        } else if (isOnlyLetters || isOnlyNumbers) {
          return 'VAT number must contain a combination of letters and numbers.';
        }
        return ''; 
      };
  
      if (noVatcheked && vatNumber.length > 0) {
        const validationMessage = getValidationMessage();
        if (validationMessage) {
          this.setState({ validationMessage });
        } else {
          this.setState(
            { validationMessage: '',loader:true },
            () => this.getSalesTextEditAPI()
          );
        }
      } else if (vatcheked) {
        this.setState(
          {loader:true},
          () => this.getSalesTextEditAPI()
        );
      }
    });
  };
  
  closePopup =()=>{
    this.setState({salesSuccessShow:false,salesSuccessShows:true,savedetailsScreen:false},()=>this.getSalesTextshowAPI())

  }
   handleVatNumberChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
  this.setState({
    vatNumber: value,
    validationMessage: "", 
  });
   };
  getUserProfileDetails = async (token: string) => {
    this.setState({ loader: true })
    const header = {
      "Content-Type": "application/json",
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getUserProfileDetailsApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.userProfileDetailsApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  getSalesTextshowAPI = async () => {
    this.setState({ loader: true })

    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getSalesTaxtApiContentType,
      token: token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSalesTextApiCallId = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSalesTaxtAPIEndPoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSalesTaxtApiMethod
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };

  getSalesTextEditAPI = async () => {
    this.setState({ loader: true })

    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getSalesTaxtEditApiContentType,
      token: token,
    };
    const { noVatcheked,vatNumber } = this.state;

    const requestData = {
        vat: {
            has_vat: noVatcheked,
            vat_number: vatNumber
        }
    };

    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSalesTextEditApiCallId = requestMessages.messageId;

    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getSalesTaxtEditAPIEndPoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSalesTaxtEditApiMethod
    );

    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(requestData)
    );

    runEngine.sendMessage(requestMessages.id, requestMessages);
};


  // Customizable Area Start

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue });
    removeStorageData("account_connect");
  };

  a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  handleUserProfileDetailsApiRes = (response: any) => {
    const { data } = response;
    this.setState({ loader: false })
    if (data) {
      this.setState({ userRoleId: data.attributes?.role_id })
    }
  }
  handleSalesTaxt = (response: any) => {
    const { data } = response;
    this.setState({ loader: false })
    if(data){
      this.setState({salesShowdad: true})
      if(data.attributes.has_vat){
         this.setState({savedetailsScreen:false,noVatcheked:true,vatcheked:false,vatInputFieldShow:true,vatNumber:data.attributes.vat_number})
      }else{
        this.setState({vatcheked:true,noVatcheked:false,vatInputFieldShow:false})
      }
      console.log('salesShowdad',this.state.salesShowdad)
    }else {
      this.setState({validErrorMessage: response?.error});
    }
  }
  handleSalesEditText = (response: any) => {
    const { data, error } = response;
    if (data){
      this.setState({salesSuccessShow: true, loader: false,
      })
    }
    if(error){
   this.setState({salesSuccessShow:false})
    }
    this.setState(prevState => ({
      ...prevState,
      loader: false,
      salesSuccessShow: !error && !!data, 
      validErrorMessageEdit: error ? error : '', 
      ...(data ? { salesShowEditdad: data } : {}) 
    }));
  };
  

  handleConnectBtn = () => {
    this.setState({loader: true});
    const current_location = window.location.origin;

    const header = {
      "Content-Type": "application/json",
      token: this.state.token
    };

    const body = {
      "refresh_url": `${current_location}/StripeConnectResponse`,
      "return_url": `${current_location}/StripeConnectResponse`
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.stripeConnectApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.stripeConnectEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }

  handleDisconnectBtn = () => {
    this.setState({ disconnectStripePopup : !this.state.disconnectStripePopup});
  }

  handleDisconnectStripe = async() => {
    await this.disconnectStripeApi();
  }

  disconnectStripeApi = async() => {
    this.setState({ loader :  true})
    const header = {
      "Content-Type": "application/json",
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.disconnectStripeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.disconnectStripeApiEndpoint
    );    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "POST"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  handleResponseDisconnectStripe( responseJson: DisconnectStripeResponse) {
    const { message, error } = responseJson;
    this.setState({  disconnectStripePopup: false , loader: false  });
    if (message) {
      this.handleSuccessFlow(message);
    } else if (error) {
      this.handleErrorFlow(error);
    }
  };

  handleSuccessFlow = async(message: string) => {    
    this.setState({
      successPopup: true,
      disconnectStripeText: message,
    });
    setTimeout(() => {
      this.setState({ 
        successPopup: false, 
        isStripeConnected: 'false', 
        stripeAccountDetails: null });      
    }, 2000);
  };
  
  handleErrorFlow = async(error: string) => {
    let token = await getStorageData("token");
    this.setState({
      failurePopup: true,
      disconnectStripeText: error,
    });
    setTimeout(async() => {
      this.setState({ failurePopup: false });
      await this.checkStripeConnection(token);
    }, 2000);
  };

  backToMyAccount = () => {
    removeStorageData("account_connect");
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "UserProfileBasicBlock");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  handleStripeConnectRes = (response: any) => {
    this.setState({loader: false});
    if(response.data?.url){
      setStorageData("account_connect", "processing");

      window.open(response.data?.url, '_blank');
    }
  }

  checkStripeConnection = async (token: string) => {
    this.setState({ loader: true })
    const header = {
      "Content-Type": "application/json",
      token: token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.checkStripeConnectApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.checkStripeConnectApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  checkStripeConnectRes = (response: any) => {
    this.setState({loader: false});
    if(response.message === "The setup was successful."){
      const {currency, account_name, account_email} = response;
      this.setState({isStripeConnected: 'true', stripeAccountDetails: {currency, account_email, account_name}});
    }else {
      this.setState({isStripeConnected: 'false'});
    }
  }


  // Customizable Area End
}
