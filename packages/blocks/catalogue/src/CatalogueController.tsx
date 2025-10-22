import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { bellIcon } from "./assets";
export interface Item {
  title: string;
  image: string;
}

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
  body?: object;
}

export interface IProfile {
  data: IProfileData;
}
export interface IProfileData {
  id: string;
  type: string;
  attributes: IProfileAttributes;
}
export interface IProfileAttributes {
  id: number;
  first_name?: null;
  last_name?: null;
  full_phone_number: string;
  city?: null;
  post_code?: null;
  country_code?: null;
  phone_number?: null;
  email: string;
  activated: boolean;
  user_type: string;
  user_name?: null;
  platform?: null;
  suspend_until?: null;
  status: string;
  role_id: number;
  full_name: string;
  gender?: null;
  date_of_birth?: null;
  age?: null;
  country?: null;
  address?: null;
  address_line_2?: null;
  contact_name: string;
  company_name: string;
  photo: IProfilePhoto;
}
export interface IProfilePhoto {
  url: null;
}

export interface DataofService {
  id: string;
  type: string;
  attributes: {
    id: number;
    service_icon?: {
      url: string;
    };
    service_name: string;
    service_description: string;
    is_selected: boolean;
  }
}

export interface IAllServices {
  data?: (IAllServicesDataEntity)[] | null;
}
export interface IAllServicesDataEntity {
  id: string;
  type: string;
  attributes: IAllServicesAttributes;
}
export interface IAllServicesAttributes {
  id: number;
  service_icon: IAllServicesServiceIcon;
  service_name: string;
  service_description: string;
  is_selected: boolean;
}
export interface IAllServicesServiceIcon {
  url: string;
}

export interface IJuridictions {
  id: number;
  jurisdiction: string;
  created_at: string;
  updated_at: string;
}

interface NotaryService {
  serviceImg: string;
  title: string;
  desc: string;
}

interface Notary {
  notaryImg: string;
  userName: string;
  place: string;
  rating: number;
  orders: number;
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
  arrayHolder: string[];
  services: Item[];
  supports: Item[];
  isSideBarOpen: boolean;
  roleID: string;
  userProfilePic: string | null;
  userName: string;
  selectedJurisdiction: string | null;
  modalOpen: boolean;
  serviceData: Array<DataofService>;
  cancelReqModal: boolean;
  loader: boolean;
  jurisdictions: Array<string>;
  popularNotaryServices: Array<NotaryService>;
  popularNotaries: Array<Notary>;
  popularNotariesData:any[];
  PoplarServiceseData:any[];
  debounceTimer: any; 
  searchQuery:string;
  accountData:any[];
  servicedatashow:any[];
  popularSelectData:boolean;
  servicefilterData:any[];
  searchfilterData: boolean;
  filteredServices:any[];
  filteredPopularServices: any[]
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getProfileApiCallID: string = "";
  getServicesApiCallId: string = "";
  getJuridictionApiCallId: string = "";
  getPopularServicApiCallId: string = "";
  getjurisdictionApiCallID:string="";
  getservicedataApiCallID:string="";

  getPopularNotaryApiCallId: string = "";

  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      arrayHolder: [],
      services: [
        {
          title: "Dashboard",
          image: require("../assets/dash.png"),
        },
        {
          title: "RequestManagement",
          image: require("../assets/request.png"),
        },
        {
          title: "Catalogue",
          image: require("../assets/catalogue.png"),
        },
        {
          title: "Calendar",
          image: require("../assets/calender.png"),
        },
        {
          title: "UserProfileBasicBlock",
          image: require("../assets/acount.png"),
        },
      ],
      supports: [
        {
          title: "Contact Us",
          image: require("../assets/contactus.png"),
        },
        {
          title: "Help",
          image: require("../assets/help.png"),
        },
        {
          title: "Log Out",
          image: require("../assets/logout.png"),
        },
      ],
      isSideBarOpen: false,
      roleID: "1",
      userProfilePic: null,
      userName: "",
      selectedJurisdiction: null,
      modalOpen: false,
      serviceData: [],
      cancelReqModal: false,
      loader: false,
      jurisdictions: [],
      servicefilterData:[],
      filteredPopularServices:[],

      popularNotaryServices: [
        {
          serviceImg: bellIcon,
          title: "Business and Corporate Services",
          desc: "Catering to business "
        },
        {
          serviceImg: bellIcon,
          title: "Business and Corporate Services",
          desc: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating theCatering to business needs by certifying company records, witnessing corporate documents, and authenticating the"
        },
        {
          serviceImg: bellIcon,
          title: "Business and Corporate Services",
          desc: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating theCatering to business needs by certifying company records, witnessing corporate documents, and authenticating the"
        },
        {
          serviceImg: bellIcon,
          title: "Business and Corporate Services",
          desc: "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating theCatering to business needs by certifying company records, witnessing corporate documents, and authenticating the"
        }
      ],
      popularNotaries: [
        {
          notaryImg: bellIcon,
          userName: "CK Notary Services",
          place: "England, UK",
          rating: 4.5,
          orders: 120,
        },
        {
          notaryImg: bellIcon,
          userName: "CK Notary Services",
          place: "England, UK",
          rating: 4.5,
          orders: 120,
        },
        {
          notaryImg: bellIcon,
          userName: "CK Notary Services",
          place: "England, UK",
          rating: 4.5,
          orders: 120,
        },
        {
          notaryImg: bellIcon,
          userName: "CK Notary Services",
          place: "England, UK",
          rating: 4.5,
          orders: 120,
        }
      ],
      popularNotariesData:[],
      PoplarServiceseData:[],
      debounceTimer: null ,
      searchQuery:'',
      accountData:[],
      servicedatashow:[],
      popularSelectData:false,
      searchfilterData: false,
      filteredServices:[],

      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getProfile();
    this.getServicesAPI();
    this.getJuridictionsAPI();
    this.getPopularNOtaryAPI()
    this.getPopularServicesAPI()
    this.getserviceseAPI()
  }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
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
    // Customizable Area End
  }

  // Customizable Area Start
  logOutNvigation = () => {
    window.location.href = "/";
  };

  handleNavigation = (service: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), service);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props); 
    this.send(message);
  }

  openSideBar = () => {
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });
  };

  getProfile = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getProfileContentType,
      token: token,
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
      configJSON.getProfileApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getProfileApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getServicesAPI = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.allservicesApiContentType,
      token: token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getServicesApiCallId = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allServicesApiEndpoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.allServicesApiMethodType
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };

  getJuridictionsAPI = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getAllJurisdictionsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getJuridictionApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllJuridictionsAPIEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAllJurisdictionsApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  getPopularServicesAPI = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getPopularServiceseApiContentType,
      token: token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPopularServicApiCallId = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPopularServiceseAPIEndPoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getPopularServiceseApiMethod
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };
  getPopularNOtaryAPI = async () => {
    this.setLoader(true);

    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getPopularNotaryApiContentType,
      token: token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPopularNotaryApiCallId = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPopularNotaryAPIEndPoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getPopularNotaryApiMethod
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };
  getjuridictionAPI = async () => {
     this.setLoader(true)
    const countyName= this.state.selectedJurisdiction ||''
    const searchValue = this.state.searchQuery
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getjuridictionApiMethodContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getjurisdictionApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getjuridictionApiMethodendpoint+`?query=${searchValue} &jurisdiction=${countyName}  `
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getjuridictionApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getserviceseAPI = async () => {
    //  this.setLoader(true)
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getservicedataApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getservicedataApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getservicedataApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getservicedataApiMethodeType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  goToNotaryPage =() => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "CatalogueNotary");
    message.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(message);
  }
  goToServicePage =() => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "CatalogueService");
    message.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(message);
  }
  handleChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {

    this.setState({selectedJurisdiction:newValue})
  };

handleSearchChange = (event: { target: { value: any; }; }) => {
  this.setState({ searchQuery: event.target.value });
};


  setLoader = (value: boolean) => {
    this.setState({loader: value})
  }

  setModal = (value: boolean) => {
    this.setState({modalOpen: value})
  }

  closeBookNotaryRequestModal = () => {
    this.setModal(!this.state.modalOpen);
    this.setState({ cancelReqModal: true });
  };

  noButtonClick = () => {
    this.setModal(!this.state.modalOpen);
    this.setState({ cancelReqModal: false });
  };
 
  yesButtonClick = () => {
    this.setState({cancelReqModal: false})
  };
  inValidResponses = (responseJson: ValidResponseType) => {
    return responseJson && responseJson.errors;
  };
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
          userName: responseJson.data.attributes.full_name,
          userProfilePic: responseJson.data.attributes.photo.url,
        },
      );
    }
    if(apiRequestCallId === this.getServicesApiCallId) { 
      this.setState({ serviceData: responseJson.data })
    }
    if (apiRequestCallId === this.getJuridictionApiCallId) {
      this.setState({ jurisdictions: responseJson.map((jurisdiction: IJuridictions) => jurisdiction.jurisdiction) });
    }
    if (apiRequestCallId === this.getPopularNotaryApiCallId) {
      this.setLoader(false);

      // Ensure we always set an array, even if responseJson.data is undefined
      this.setState({ popularNotariesData: Array.isArray(responseJson.data) ? responseJson.data : [] });
    }
   
    if (apiRequestCallId === this.getPopularServicApiCallId) {
      // Ensure we always set an array, even if responseJson.data.data is undefined
      this.setState({ PoplarServiceseData: Array.isArray(responseJson.data?.data) ? responseJson.data.data : [] }, ()=>      console.log('???????????????????',this.state.PoplarServiceseData)
    );
    }
    if (apiRequestCallId === this.getjurisdictionApiCallID) {
      if (responseJson) {
         this.setLoader(false)

        this.setState(() => ({
          accountData: Array.isArray(responseJson?.data.accounts?.data) ? responseJson.data.accounts.data : [],
          servicefilterData: Array.isArray(responseJson?.data?.services?.data) ? responseJson.data.services.data : []
          
        }));

      }
    }
    if (apiRequestCallId === this.getservicedataApiCallID) {
      this.setState({ servicedatashow: Array.isArray(responseJson.data) ? responseJson.data : [] });
    }
  };
  // Customizable Area End
}
