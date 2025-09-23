import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

export const configJSON = require("./config");

// Customizable Area Start
import {
  getStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
import React from "react";

export interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
}
export interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
  status: number;
}
export interface GetAllRequest {
  data: {
    attributes: {
      full_name: string;
      photo: {
        url: string;
      };
      role_id: number;
      full_phone_number: string;
    };
  };
}
export interface Item {
  title: string;
  image: string;
}
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isSideBarOpen: boolean;
  isNewRequestOrEditRequestOrInviteClient: string;
  userName: string;
  roleID: number;
  userProfilePic: string;
  phoneNumber: string;
  services: Item[];
  supports: Item[];
  serviceData: any[];
  accountData: any[];
  jurisdictions: any[];
  selectedJurisdiction: any;
  modalOpen: boolean;
  cancelReqModal: boolean;
  loader: boolean;
  debounceTimer: any;
  searchQuery: string;
  popularSelectData: boolean;
  totalPage: number | null;
  currentPage: number;
  total_count: number | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CatelogueNotaryController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProfileApiCallID: string = "";
  getPopularNotaryApiCallID: string = "";
  getjurisdictionApiCallID: string = "";
  getJuridictionApiCallIdforcountry: string = "";
  scrollData: React.RefObject<HTMLDivElement>;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      isSideBarOpen: false,
      isNewRequestOrEditRequestOrInviteClient: "new",
      userName: " ",
      roleID: 0,
      userProfilePic: "",
      phoneNumber: "",
      modalOpen: false,
      cancelReqModal: false,
      loader: false,
      debounceTimer: null,
      searchQuery: "",
      popularSelectData: false,
      services: [
        {
          title: "Dashboard",
          image: require("../assets/dash.png"),
        },
        {
          title: "Requests",
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
          title: "My Account",
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
      serviceData: [],
      accountData: [],
      jurisdictions: [],
      selectedJurisdiction: null,
      totalPage: null,
      currentPage: 1,
      total_count: null,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.scrollData = React.createRef();
    // Customizable Area End
  }
  
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getProfile();
    this.getPopularNOtaryAPI(1);
    this.getJuridictionsAPIforcountry();
    window.addEventListener("scroll", this.handleScroll, true);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
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
  async componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }
  handleScroll = () => {
    if (this.scrollData.current) {
      const { scrollTop, scrollHeight, clientHeight } = this.scrollData.current;
      if (
        scrollTop + clientHeight > scrollHeight - 100 &&
        !this.state.loader && 
        this.state.currentPage < (this.state.totalPage as number)
      ) {
        let incrimentCount = this.state.currentPage + 1;
        if(this.state.popularSelectData){
          this.getjuridictionAPI(incrimentCount);
        }else{
          this.getPopularNOtaryAPI(incrimentCount);
        }
        this.setLoader(true);
      }
    }
  };

  openSideBar = () => {
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });
  };

  setLoader = (value: boolean) => {
    this.setState({ loader: value });
  };

  noButtonClick = () => {
    this.setModal(!this.state.modalOpen);
    this.setState({ cancelReqModal: false });
  };
  yesButtonClick = () => {
    this.setState({ cancelReqModal: false });
  };
  logOutNvigation = async () => {
    await removeStorageData("token");
    window.location.href = "/";
  };
  handleSideBarNavigation = (service: string) => {
    if (service === "My Account") {
      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(
        getName(MessageEnum.NavigationTargetMessage),
        "UserProfileBasicBlock"
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
      return true;
    }
  };

  handleChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    if (newValue) {
      this.setState(
        { selectedJurisdiction: newValue, popularSelectData: true,serviceData:[] },
        () => this.getjuridictionAPI(1)
      );
    } else {
      this.setState({ selectedJurisdiction: "", popularSelectData: false,loader: true },
      () => {
       this.getPopularNOtaryAPI(1);
      });
    }
  };

  handleSearchChange = (event: { target: { value: any } }) => {
    const query = event.target.value;
    if (this.state.debounceTimer) {
      clearTimeout(this.state.debounceTimer);
    }
    const debounceTimer = setTimeout(() => {
      if (query.trim() === "") {
        if (this.state.selectedJurisdiction) {
          this.setState({ searchQuery: query, popularSelectData: true }, () => {
            this.getjuridictionAPI(1);
          });
        } else {
          this.setState(
            { searchQuery: query, popularSelectData: false },
            () => {
              this.getPopularNOtaryAPI(1);
            }
          );
        }
      } else {
        this.setState({ searchQuery: query, popularSelectData: true }, () => {
          this.getjuridictionAPI(1);
        });
      }
    }, 300);
    this.setState({ debounceTimer });
  };

  setModal = (value: boolean) => {
    this.setState({ modalOpen: value });
  };
  closeBookNotaryRequestModal = () => {
    this.setModal(!this.state.modalOpen);
    this.setState({ cancelReqModal: true });
  };
  getJuridictionsAPIforcountry = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getAllJurisdictionsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getJuridictionApiCallIdforcountry = requestMessage.messageId;
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

  getPopularNOtaryAPI = async (incrimentCount: number | null) => {
    let token = await getStorageData("token");
    let currentPage = incrimentCount;
    let postsPerPage = 20;
    const header = {
      "Content-Type": configJSON.getpopularNotaryApiMethodContentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPopularNotaryApiCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getpopularNotaryApiMethodendpoint +
        `?page=${currentPage}&per_page=${postsPerPage}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getpopularNotaryApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  getjuridictionAPI = async (incrimentCount: number | null) => {
    this.setLoader(true);
    const countyName = this.state.selectedJurisdiction || "";
    const searchValue = this.state.searchQuery;
    let token = await getStorageData("token");
    let currentPage = incrimentCount;
    let postsPerPage = 20;
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
      configJSON.getjuridictionApiMethodendpoint +
        `?query=${searchValue}&jurisdiction=${countyName}`+
        `&page=${currentPage}&per_page=${postsPerPage}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getjuridictionApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
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
  inValidResponses = (responseJson: ValidResponseType) => {
    return responseJson && responseJson.errors;
  };
  isValidResponse = (responseJson: ValidResponseType) => {
    return responseJson && responseJson.status !== 500;
  };
  gotoback = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Catalogue");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  responseSuccessCallBack = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId === this.getProfileApiCallID) {
      this.setState({
        userName: responseJson.data.attributes.full_name,
        roleID: responseJson.data.attributes.role_id,
        userProfilePic: responseJson.data.attributes.photo?.url,
        phoneNumber: responseJson.data.attributes.full_phone_number,
      });
    }
    if (apiRequestCallId === this.getPopularNotaryApiCallID) {
      if (this.state.serviceData) {
        this.setState(
          (prevState: S) => ({            
            serviceData : responseJson.data,
            currentPage: responseJson.pagination.current_page,
            totalPage: responseJson.pagination.total_pages,
            loader: false,
          }),
          () => {
            this.setLoader(false);
          }
        );
      }
    }

    if (apiRequestCallId === this.getjurisdictionApiCallID) {
      if (responseJson) {
       
          this.setState(
            (prevState: S) => ({            
              accountData : responseJson?.data.accounts?.data,
              currentPage: responseJson.data.pagination.current_page,
              totalPage: responseJson.data.pagination.total_pages,
              loader: false,
            }),
            () => {
              this.setLoader(false);
            }
          );
        }
      }

    if (apiRequestCallId === this.getJuridictionApiCallIdforcountry) {
      this.setState({
        jurisdictions: responseJson.map(
          (jurisdiction: any) => jurisdiction.jurisdiction
        ),
      });
    }
  };
  // Customizable Area End
}
