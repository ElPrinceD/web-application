import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { svg1, svg2, svg3, svg4 } from "./assets";
import React, { RefObject } from "react";

// Customizable Area Start
import { getStorageData, removeStorageData } from "../../../framework/src/Utilities";
import { OutlookAuthProvider } from "../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../components/src/GoogleAuthProvider.web";
import { gapi, loadAuth2, loadGapiInsideDOM } from "gapi-script";
import { failureImage, successImage } from "../src/assets";

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
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
activeSteps:number,
showDropdown: boolean,
notaryReqPopUp:boolean,
remoteArrayData:any,
selectedDate:Date|null,
expanded: any
newExpanded:boolean
Panel: string;
scrollPosition:number,
expandedAccordion:any;
activeImage:number;
progress: number;
currentIndex:number;
isDrawerOpen: boolean;
homeData?:any;
serviceData?:any[];
patnerData?:any[];
logoData:any[];
faqData?:any[];
leaderShipData?:any[];
leaderShipstory?:any;
leaderShipTitle?:any;
faqTitle?:any;
firstTwoWords:any;
whyChoosData?:any[];
stepsData?:any[];
loading:boolean,
imageLoad:boolean,
pendingApiCalls:number,
debounceTimer: any; 
searchQuery:string,
contactData:any;
userName: string;
userProfilePic?: string | null;
topRef: RefObject<HTMLDivElement>;
number:number;
anchorEl:HTMLElement | SVGSVGElement | null;
open:boolean;
token: string | null;
emailNews: string;
error: string;
isSuccessFailModalOpen: boolean;
  successFailModalImage: string;
  successFailModalText: string;
  successFailModalTextColor: string | undefined;
  successFailModalSubText: string;
  successFailModalSubText2: string;
  successFailModalButtonText: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LandingPageController extends BlockComponent<
  Props,
  S,
  SS
> {
   // Customizable Area Start
   getlandingdataRequestDetailsCallId: string = "";
   getProfileApiCallID: string = "";
   getservicedataRequestDetailsCallId: string = "";
   getlogodataRequestDetailsCallId: string = "";
   getfaqdataRequestDetailsCallId: string = "";
   getleaderShipdataRequestDetailsCallId: string = "";
   getpatnerdataRequestDetailsCallId: string = "";
   getcontactdataRequestDetailsCallId: string = "";
   newsLetterEmailApiCallId: string | null = "";
   anchorRef: React.RefObject<HTMLButtonElement>;
   // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    this.anchorRef = React.createRef<HTMLButtonElement>();
    // Customizable Area Start

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
    ];
    
    this.state = {
      expanded: null,
      newExpanded: false,
      Panel: "",
      debounceTimer: null,
      activeSteps: 0,
      showDropdown: false,
      notaryReqPopUp:true,
      activeImage:0,
      currentIndex:0,
      homeData:'',
      serviceData:[],
      patnerData:[],
      logoData:[],
      faqData:[],
      leaderShipData:[],
      leaderShipstory:'',
      leaderShipTitle:'',
      faqTitle:"",
      firstTwoWords:'',
      whyChoosData:[],
      loading: true,
      imageLoad:true,
      pendingApiCalls:0,
      stepsData:[],
remoteArrayData:[
  {image:require("../assets/image001.png"),title:"Business and Corporate Services",description:"catering to business needs by certifying company records, witnessing corporate documents, and authenticating...."},
{image:require("../assets/image002.png"),title:"Affidavits and Declarations",description:"catering to business needs by certifying company records, witnessing corporate documents, and authenticating...."},
  {image:require("../assets/image003.png"),title:"Administaring Oaths and Affirmations",description:"catering to business needs by certifying company records, witnessing corporate documents, and authenticating...."},
  {image:require("../assets/image004.png"),title:"Certification",description:" Diploma catering verification business needs needs by certifying company records, witnessing corporate documents,corporate documents"},
  {image:require("../assets/image005.png"),title:"Witnessing and Verifyings",description:"catering catering to busine corporate needs by certifying documents, and corporate documents...."},
  {image:require("../assets/image006.png"),title:"Draftings Documents",description:"catering to business needs by certifying company records, witnessing corporate documents, and authenticating...."},
  {image:require("../assets/image007.png"),title:"Probates Matters",description:"catering to business needs by certifying company records, witnessing corporate documents, and authenticating...."},
  {image:require("../assets/book.png"),title:"Other(Transation, Diploma verification) and Corporate Services",description:"catering to business needs"}
],
userName: "",
userProfilePic:null,
anchorEl:null,
open:false,
selectedDate:null,
contactData:'',
searchQuery:'',
scrollPosition: 0,
expandedAccordion:"students",
progress: 80,
number:0,
      isDrawerOpen: false,
      topRef: React.createRef(),
      token: "",
      emailNews: "",
      error: "",
      isSuccessFailModalOpen: false,
      successFailModalImage: "",
      successFailModalText: "",
      successFailModalTextColor: undefined,
      successFailModalSubText: "",
      successFailModalSubText2: "",
      successFailModalButtonText: ""
    };
    

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
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
  
      if (responseJson && !responseJson.errors) {
        this.handleApiResponse(apiRequestCallId, responseJson);
      }
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.newsLetterEmailApiCallId) {
         if(responseJson.message){
          this.setState({
            isSuccessFailModalOpen: true,
            successFailModalImage: successImage,
      successFailModalText: "Success!",
      successFailModalTextColor:  "",
      successFailModalSubText: responseJson.message,
      successFailModalButtonText: "OK",
      emailNews: ""
          })
          }
          if(responseJson.error){
            this.setState({
              isSuccessFailModalOpen: true,
              successFailModalImage: failureImage,
              successFailModalText: "Failed!",
              successFailModalTextColor: "#FF0000",
              successFailModalSubText: responseJson.error,
              successFailModalButtonText: "OK",
              emailNews: ""
            });
          }
        }
      }
    }
    
    // Customizable Area End
  }

  // Customizable Area Start

  
  goToHome() {
    const msgs: Message = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }
  handleApiResponse(apiRequestCallId: string | number, responseJson: any) {
    const apiResponseMapping = {
      [this.getlandingdataRequestDetailsCallId]: { 
        stateKey: 'homeData', 
        dataPath: 'data.attributes', 
        extraState: { 
          whyChoosData: this.getDataFromPath(responseJson, 'data.attributes.why_choose_us.facts'),
          stepsData: this.getDataFromPath(responseJson, 'data.attributes.steps_details')
        } 
      },
      [this.getservicedataRequestDetailsCallId]: { stateKey: 'serviceData', dataPath: 'data' },
      [this.getlogodataRequestDetailsCallId]: { stateKey: 'logoData', dataPath: 'data' },
      [this.getfaqdataRequestDetailsCallId]: { stateKey: 'faqData', dataPath: 'faqs', extraState: { faqTitle: responseJson } },
      [this.getleaderShipdataRequestDetailsCallId]: {
        stateKey: 'leaderShipData',
        dataPath: 'data.attributes.leadership_designations',
        extraState: {
          leaderShipstory: this.getDataFromPath(responseJson, 'data.attributes.story'),
          leaderShipTitle: this.getDataFromPath(responseJson, 'data.attributes')
        }
      },
      [this.getpatnerdataRequestDetailsCallId]: { stateKey: 'patnerData', dataPath: 'data' },
      [this.getcontactdataRequestDetailsCallId]: {
        stateKey: "contactData",
        dataPath: "data.attributes",
      },
      [this.getProfileApiCallID]: {
        stateKey: "userName",
        dataPath: "data.attributes.full_name",
        extraState: { 
          userProfilePic: responseJson && responseJson.data && responseJson.data.attributes && responseJson.data.attributes.photo
            ? responseJson.data.attributes.photo.url
            : ""
        }
      },
    };
  
  
    const apiResponseHandler = apiResponseMapping[apiRequestCallId];
    if (!apiResponseHandler) return;

    this.setState(prevState => {
      const pendingApiCalls = Math.max(0, prevState.pendingApiCalls - 1);
    
      const newState = {
        ...prevState,
        [apiResponseHandler.stateKey]: this.getDataFromPath(responseJson, apiResponseHandler.dataPath),
        ...apiResponseHandler.extraState || {},
        pendingApiCalls: pendingApiCalls,
        loading: pendingApiCalls === 0 ? false : prevState.loading, 
      };
    
      return newState;
    });
    
    
  }
  
  
  getDataFromPath(data: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], data);
  }
  async componentDidMount(): Promise<void> {
    const token = await getStorageData('token');
    this.setToken(token);
    this.getLandingPageDetails()
    this.getServiceDetails()
    this.handleNavigationScroll()
    this.getLogoDetails()
    this.getfaqDetails()
    this.getleaderShipDetails()
    this.getpatnerDetails()
    this.getcontactDetails()
    this.handleNavigationScroll();


    return Promise.resolve();

  }

  componentDidUpdate(prevProps: Props, prevState: S) {
    if (prevState.open === true && this.state.open === false) {
      this.anchorRef.current?.focus();
    }
  }

  setToken = (token: string) => {
    if(token){
      this.setState({token}, ()=> this.getProfile());
    }
  }
  
  handleNavigationScroll = () => {
    const { topRef } = this.state;
    const newTopRef = topRef;
    const currentRef = newTopRef.current;
    const newCurrentRef = currentRef;
    newCurrentRef?.scrollIntoView();
  };
  getcontactDetails = async () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getcontactdataRequestDetailsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.contactpiContentendpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.contactApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  getfaqDetails = async () => {
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getfaqdataRequestDetailsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.faqDataApiEndpoint 
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.faqApiEndpointApiType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }
  
  handleSearchChange = (event: { target: { value: any; }; }) => {
    const query = event.target.value;
    if (this.state.debounceTimer) {
      clearTimeout(this.state.debounceTimer);
    }
    const debounceTimer = setTimeout(() => {
      this.setState({ searchQuery: query });
    }, 300);
    this.setState({ debounceTimer });
  }

  handleAcco=(Panel:any)=> (event:any, newExpanded:any) =>{ 
    this.setState({expanded: newExpanded? Panel : false});
  } 
  getLandingPageDetails = async () => {
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getlandingdataRequestDetailsCallId = requestMessage.messageId;
   
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.landingPageDataApiEndpoint 
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.landingPageDataApiEndpointApiType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
   
  }
  getServiceDetails = async () => {
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getservicedataRequestDetailsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.serviceDataApiEndpoint 
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.serviceApiEndpointApiType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }
  getLogoDetails = async () => {
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getlogodataRequestDetailsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.logoDataApiEndpoint 
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.logoApiEndpointApiType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }

  
  getleaderShipDetails = async () => {
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getleaderShipdataRequestDetailsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.leaderShipDataApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.leaderShipApiEndpointApiType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }
  getpatnerDetails = async () => {
   
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getpatnerdataRequestDetailsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.patnerDataApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.patnerApiEndpointApiType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }
imagesArray = [
  {
    id:0,
    src:svg1,
    title:"What Do You Need To Notarise Online With renotary?",
    progress:80,
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

  },
  {
    progress:60,
    id:1,
    src:svg1,
    title:"Schedule an Online Appointment",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

  },
  {
    id:2,
    progress:40,
    src:svg2,
    title:"Upload Your Documents",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

},
{
  id:3,
  src:svg3,
  title:"Authentication Process",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
,progress:20
},
{
  id:4,
  src:svg4,
  progress:0,
  title:"Your Documents is ready to use",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

}
]
getStorageData(key:any) {
  return localStorage.getItem(key);
}
disableBackButton() {
  window.history.pushState(null, '', window.location.href);

  window.onpopstate = () => {
    const token = this.getStorageData('token');
    if (!token) {
      window.location.replace('/EmailAccountLoginBlock'); 
    } else {
      window.history.pushState(null, '', window.location.href);
    }
  };
}

toggleDrawer = (newOpen: boolean) => () => {
  this.setState({isDrawerOpen: newOpen})
};


handleTClose = (event: React.MouseEvent<EventTarget>) => {
  if (this.anchorRef.current && this.anchorRef.current.contains(event.target as HTMLElement)) {
    return;
  }

  this.setState({ open: false });
};


  logOutFromNevigation = async () => {
    
    const RemoveStorageKeys = [
      "token",
      "google_auth",
      "isGoogleSync",
      "isOutlookSync",
      "ms_accessToken",
      "OTPToken",
      "authToken",
      "notaryRequestId",
      "otptokenOnly",
      "saveUserInfo",
      "settingemail",
      "userName",
      "userRoleId",
      "role_id"
    ];
    
    RemoveStorageKeys.forEach(removeStorageData);
    
    await GoogleAuthProvider.signOut();
    await OutlookAuthProvider.signOut();
    this.setState({ userName: "", userProfilePic: "", token: "" });
    this.goToHome()

  };

handleToggle = () => {
  this.setState((prevState:S) => ({ open: !prevState.open }));
};


handleSubNavigation = () => {
    const navigation = new Message(getName(MessageEnum.NavigationMessage));
    navigation.addData(getName(MessageEnum.NavigationTargetMessage), "Dashboard");
    navigation.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(navigation);
    return true;
};

getProfile = async () => {
  const header = {
    "Content-Type": configJSON.validationApiContentType,
    token: this.state.token,
  };
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  this.getProfileApiCallID = requestMessage.messageId;
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    configJSON.getProfileApiEndPoint,
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    configJSON.getProfileApiMethodType
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
};

handleNavigateToMyAccount = () => {
  const msgs = new Message(getName(MessageEnum.NavigationMessage));
  msgs.addData(getName(MessageEnum.NavigationTargetMessage), "UserProfileBasicBlock");
  msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  this.send(msgs);
}

handleNewsletterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const emailNews = event.target.value;
  this.setState({ emailNews });
  if (!emailNews) {
    this.setState({ error: '' });
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailNews)) {
    this.setState({ error: 'Invalid email address' });
  } else {
    this.setState({ error: '' });
  }
};


handleSubscribe = () => {
  const { emailNews } = this.state;
    this.setState({ error: "" });
    this.handleSubscribeNewsLetter(emailNews)
};

handleSubscribeNewsLetter = async (emailNews: string) => {
  const body = {
    email: emailNews,
  };
  this.newsLetterEmailApiCallId = await this.apiCall({
    contentType: configJSON.validationApiContentType,
    method: configJSON.exampleAPiMethod,
    endPoint: configJSON.postNewsLetterApiEndPoint,
    body: body,
  });
};

tokenRequiredForApi = (endpoint: string | undefined) => {
  const publicApiEndpoints = [
    configJSON.postNewsLetterApiEndPoint,
  ]
  if(endpoint ){      
    let baseEndpoint = endpoint.split('?')[0];
    return !publicApiEndpoints.some(publicEndpoint => baseEndpoint.includes(publicEndpoint));
  } 
};

apiCall = async (apiData: ApiCallInterface) => {
  let token = await getStorageData("token");
  const { contentType, method, endPoint, body } = apiData;

  if (this.tokenRequiredForApi(endPoint) && !token) {  
    return null;
  }
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

  body &&
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    method
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  return requestMessage.messageId;
};

captilFirstWhychoosSubTitle=(textes: string)=>{
  if (!textes) return ''; 
  return textes
    .split(' ')
    .map((words: string) => words.toUpperCase()).join(' ')
}
formatTitle(formatTitle: string){
  if (!formatTitle) return ''; 
  return formatTitle
    .split(' ')
    .map((formatedTitle: string) => formatedTitle.charAt(0).toUpperCase() + formatedTitle.slice(1).toLowerCase())
    .join(' ');
}
capitalizeFirstLetter(word:any) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}
  // Customizable Area End
}
