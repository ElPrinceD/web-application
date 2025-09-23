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
  modalOpen: boolean;
  cancelReqModal: boolean;
  loader: boolean;
  debounceTimer: any;
  searchQuery: string;
  accountData: any[];
  searchfilterData: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CatelogueServiceController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProfileApiCallID: string = "";
  getjurisdictionApiCallID: string = "";
  getProductApiCallId: any;
  getservicedataRequestDetailsCallId: string = "";
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
      searchQuery: "",
      accountData: [],
      searchfilterData: false,
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
      debounceTimer: null,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
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
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getProfile();
    this.getServiceDetails();
    
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  getListRequest = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
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
  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint, body } = apiData;
    const header = {
      "Content-Type": contentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  getProfile = async () => {
    this.getProfileApiCallID = await this.apiCall({
      contentType: configJSON.productApiContentType,
      method: configJSON.getProfileAPiEndPointType,
      endPoint: configJSON.getProfileAPiEndPoint,
    });
  };
  getjuridictionAPI = async () => {
    this.setLoader(true);
    const searchValue = this.state.searchQuery;
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getjuridictionApiMethodContentType,
      token: token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getjurisdictionApiCallID = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getjuridictionApiMethodendpoint + `?query=${searchValue} `
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getjuridictionApiMethodType
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };
  inValidResponses = (responseJson: ValidResponseType) => {
    return responseJson && responseJson.errors;
  };
  isValidResponse = (responseJson: ValidResponseType) => {
    if (!responseJson || responseJson.status === 500) {
      return false;
    }
    return responseJson && !responseJson.errors;
  };
  responseSuccessCallBack = (apiRequestCallId: string, responseJson: any) => {
    if (apiRequestCallId === this.getProfileApiCallID) {
      this.setState(
        {
          userName: responseJson.data.attributes.full_name,
          roleID: responseJson.data.attributes.role_id,
          userProfilePic: responseJson.data.attributes.photo?.url,
          phoneNumber: responseJson.data.attributes.full_phone_number,
        },
        () => {}
      );
    }
    if (apiRequestCallId === this.getjurisdictionApiCallID) {
      if (responseJson) {
        this.setLoader(false);

        this.setState(() => ({
          accountData: responseJson?.data?.services?.data,
        }));
      }
    }
  };
  logOutNvigation = async () => {
    await removeStorageData("token");
    window.location.href = "/";
  };
  handleSearchChange = (event: { target: { value: any } }) => {
    const query = event.target.value;
    if (this.state.debounceTimer) {
      clearTimeout(this.state.debounceTimer);
    }
    const debounceTimer = setTimeout(() => {
      if (query.trim() === "") {
        this.setState({ searchQuery: query, searchfilterData: false }, () => {
          this.getServiceDetails();
        });
      } else {
        this.setState({ searchQuery: query, searchfilterData: true }, () => {
          this.getjuridictionAPI();
        });
      }
    }, 300);
    this.setState({ debounceTimer });
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
  
  gotoback =() => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Catalogue");
    message.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(message);
  }

  setModal = (value: boolean) => {
    this.setState({ modalOpen: value });
  };
  closeBookNotaryRequestModal = () => {
    this.setModal(!this.state.modalOpen);
    this.setState({ cancelReqModal: true });
  };
  handleApiResponse(apiRequestCallId: string | number, responseJson: any) {
    const apiResponseMapping: Record<
      string | number,
      { stateKey: string; dataPath: string; extraState?: any }
    > = {
      [this.getservicedataRequestDetailsCallId]: {
        stateKey: "serviceData",
        dataPath: "data",
      },
    };

    const apiResponseHandler = apiResponseMapping[apiRequestCallId];
    if (apiResponseHandler) {
      const newState = {
        [apiResponseHandler.stateKey]: this.getDataFromPath(
          responseJson,
          apiResponseHandler.dataPath
        ),
        ...(apiResponseHandler.extraState || {}),
      };

      this.setState(newState);
    }
  }

  getDataFromPath(data: any, path: string) {
    return path.split(".").reduce((acc, part) => acc && acc[part], data);
  }
  getServiceDetails = async () => {
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getservicedataRequestDetailsCallId = requestMessages.messageId;

    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.serviceDataApiEndpoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.serviceApiEndpointApiType
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };
  // Customizable Area End
}
