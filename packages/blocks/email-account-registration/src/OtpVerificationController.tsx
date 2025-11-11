import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
// Customizable Area Start
import {getStorageData, setStorageData , removeStorageData} from "../../../framework/src/Utilities";
import React, { RefObject } from "react";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  // Customizable Area Start
  otpdata: any;
  valid: boolean;
  otpFailedResponse: string;
  loader: boolean;
  otpAuthToken: string;
  signUpVerifyToken: {};
  resendDisabled: any;
  CustomCount: number;
  enableSuccessModel:boolean;
  enableVerificationModel:boolean;
  token:string;
  userType:string;
  disabled:boolean;
  clickedIndex:any;           
  ServiceArrayitems:any;
  selectedArrayIds:any;temData:any;emptyServiceMsg:any;tempArray:any;
  topRef: RefObject<HTMLDivElement>;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class OtpVerificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  GetNotaryServicesApi: string = "";
  responseJson: any;
  arrayholder: any;
  otpFailedResponse: any;
  userOtpVerifyApiCallId: any;
  addServiceAPI:string='';
  resendOtpAPICall:string = "";
  
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.state = {
      // Customizable Area Start
      otpdata: "",
      valid: false,
      otpFailedResponse: "",
      loader: false,
      otpAuthToken: "",
      signUpVerifyToken: {},
      resendDisabled: true,
      CustomCount: 120,
      enableSuccessModel:false,
      enableVerificationModel:false,
      token:'',
      userType:'',
      disabled:true,
      clickedIndex:'',
      selectedArrayIds:[],temData:'',emptyServiceMsg:'',
       ServiceArrayitems :[
      ],
      tempArray:[],
      topRef: React.createRef(),
      // Customizable Area End
    };

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.SessionResponseToken),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.NavigationTargetMessage)
      
      
    ];
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.GetNotaryServices();
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
      if (!responseJson?.errors) {
        if(apiRequestCallId==this.userOtpVerifyApiCallId){
          this.apiSuccessCallBacks(apiRequestCallId, responseJson);
        }
        if(apiRequestCallId==this.addServiceAPI){
          this.handleServicesAPis(apiRequestCallId,responseJson)
        }else if(apiRequestCallId==this.GetNotaryServicesApi){
          this.handleServiceAPI2(apiRequestCallId,responseJson)
        }
        else if(apiRequestCallId==this.resendOtpAPICall){
          this.handleServiceAPI3(apiRequestCallId,responseJson)
        }
      } else  {
        this.apiFailureCallBacks(apiRequestCallId, responseJson.errors);
      }
    }
    //Recieving Token from signup
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const data = message.getData(
        'rowData'
        );
        this.setState({userType:data?.data?.attributes.user_type})
        this.setState({ signUpVerifyToken: data.meta.email_otp_token,token:data.meta.token,temData:data }
          , () => {
        });
      }
      
  }
 
  apiSuccessCallBacks = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId == this.userOtpVerifyApiCallId) {
      this.setState({ loader: false, otpdata: "" });
      if(this.state.userType!='individual' && this.state.userType !== 'business'){
        this.GotoNoatryScreen();
      }else {
        setStorageData("token",responseJson.token)
        this.setState({enableSuccessModel:!this.state.enableSuccessModel})
      }
    }
    // Customizable Area End
  };
  GotoNoatryScreen(){
    const goToDetails = new Message(getName(MessageEnum.NavigationMessage));
		goToDetails.addData(getName(MessageEnum.NavigationTargetMessage), "NotaryServices");
		goToDetails.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
		const raiseMessage: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
		raiseMessage.addData("rowData", this.state.temData);
		goToDetails.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
		this.send(goToDetails);
        return true;
  }
  handleServicesAPis=(apiRequestCallId: string, responseJson: any)=>{
    if(apiRequestCallId == this.addServiceAPI){
      if(responseJson.data){
        this.setState({ loader: false });
        this.setState({enableVerificationModel:!this.state.enableVerificationModel})
      }else if(responseJson.errors){
        this.setState({ loader: false });
        this.setState({enableVerificationModel:false})
      }else {
        this.setState({loader:false})
        this.setState({enableVerificationModel:false})
        this.showAlert('Server issue!','Something went wrong, please try agin later')
      }
    }else{
      this.showAlert('Server issue!','Something went wrong, please try agin later')
    }
    
   }
   handleServiceAPI2(apiRequestCallId: string, responseJson: any){
      if (apiRequestCallId === this.GetNotaryServicesApi) {
        if(responseJson.data){
          this.setState({ServiceArrayitems:responseJson.data})
        }else if(responseJson.errors){
          this.setState({emptyServiceMsg:'No Services Available now !'})
        }else{
          this.showAlert('Server issue!','Something went wrong, please try agin later')
        }
      }
    if (apiRequestCallId && responseJson) {
      if (apiRequestCallId === this.resendOtpAPICall) {
        this.setState({signUpVerifyToken:responseJson?.email_otp_token})
      }
    }
   }
  apiFailureCallBacks = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId == this.userOtpVerifyApiCallId) {
      this.setState({ loader: false });
      this.setState({ otpFailedResponse: 'Invalid OTP' });
    }

  };

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    this.startTimer();
    this.handleNavigationScroll();    
  }
  handleNavigationScroll=()=>{
    if (this.state.topRef.current)
      this.state.topRef.current.scrollIntoView();
  }
  
   handleResize = () => {
    return typeof window !== "undefined" ? window.innerWidth <= 767 : false;
  };
  handleClose = () => {
    this.setState({ enableSuccessModel: !this.state.enableSuccessModel });
  };
  handleChange = (otpdata: any) => {
    this.setState({ otpdata });
    const isValid = /^\d{6}$/.test(otpdata);
    this.setState({ valid: isValid });
    this.setState({ otpFailedResponse: '' });
  };

  handleSubmit = () => {
    removeStorageData('signUpData');
    const header = {
      "Content-Type": "application/json",
    };

    const bodyData = {
      data: {
        otp_code: this.state.otpdata,
        account_activation: "true",
        token: this.state.signUpVerifyToken,
      },
    };
 
    const emailRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.userOtpVerifyApiCallId = emailRequestMessage.messageId;
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.signUpUserOtpVerify
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
    return true;
  };
  GetNotaryServices = () => {
    const header = {
      "Content-Type": "application/json",
    };

  
    const emailRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.GetNotaryServicesApi = emailRequestMessage.messageId;
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getNotaryService
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
  };
  GotoDashboard=()=>{
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "Dashboard");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(msgs);
    this.setState({enableVerificationModel:true})
    return true;
  }
 
  goToLandingScreen=()=>{
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "Home");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(msgs);
    return true;
  }
  GotoEmailAccountRegistrationWebScreen = async() => {
    let signUpData = await getStorageData('signUpData');
    let screen= "OnboardingPageWeb";
    if (signUpData){
      screen = JSON.parse(signUpData).signupPage;
    }    
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
      msgs.addData(getName(MessageEnum.NavigationTargetMessage), screen );
      msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
      this.send(msgs);
      return true;
  }
  GotoVerifyOtpScreen=()=>{
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "OtpVerification");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(msgs);
    return true;
  }
  selectService = async (itemId:any) => {
    this.setState({loader:false})
    const elementArray :any =[];
    await this.state.ServiceArrayitems.map((item:any,index:any) =>{ 
      if(item.id === itemId) {
        const updatedItems = [...this.state.ServiceArrayitems]; // Push new item into array
      updatedItems[index].attributes.is_selected = !updatedItems[index].attributes.is_selected; // Update the element at the specified index
      this.setState({ ServiceArrayitems: updatedItems},()=>{
      });
      }
    })
this.state.ServiceArrayitems.map((item:any, index:any) => {
  if (item.attributes.is_selected !== false) {
    elementArray.push(item);
  }
});
this.setState({ tempArray: elementArray }, () => {
});

return true
  };
  addServiceFunc=()=>{
    this.setState({ selectedArrayIds: [] }, () => {
      const elementArray :any =[];
      this.state.ServiceArrayitems.forEach((item:any) => {
        if (item.attributes.is_selected) {
          elementArray.push(item.attributes.id);
          this.setState({ selectedArrayIds: elementArray }, () => {
        
          });
        }
      });
    });
    return true;
  }
  handleSubmitServices = async () => {
    setStorageData("modalOpen","true");
     this.setState({ loader: true });
     await this.addServiceFunc();
   
    // Get token from storage if state token is empty
    let token = this.state.token;
    if (!token) {
      token = await getStorageData("token");
    }
    
    const header = {
      "Content-Type": "application/json",
      token: token
    };
    const bodyData = {
        service_ids: this.state.selectedArrayIds,
    };
 
    const ServiceREquestNessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addServiceAPI = ServiceREquestNessage.messageId;
    ServiceREquestNessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addService
    );

    ServiceREquestNessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    ServiceREquestNessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(bodyData)
    );
    ServiceREquestNessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(ServiceREquestNessage.id, ServiceREquestNessage);
    return true;
  };

  startTimer = () => {
    this.setState({
      resendDisabled: true,
      CustomCount: 120,
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

  handleResendClick = () => {
    this.startTimer();
    const header = {
      "Content-Type": "application/json",
      token: this.state.token,
    };

 
    const emailRequestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.resendOtpAPICall = emailRequestMessage.messageId;
    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.resendOtpApi
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    emailRequestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(emailRequestMessage.id, emailRequestMessage);
    return true;
  };
  handleServiceAPI3 = (apiRequestCallId: string, responseJson: any) => {    
    if (apiRequestCallId === this.resendOtpAPICall && responseJson) {            
      this.setState({
        signUpVerifyToken : responseJson.email_otp_token,
        loader: false,
      });
    }    
  };
  // Customizable Area End
}
