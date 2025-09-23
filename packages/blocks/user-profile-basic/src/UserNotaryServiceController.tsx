import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

export const configJSON = require("./config");
const navigation = require("react-navigation");

// Customizable Area Start
import {
  getStorageData,
  setStorageData,
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

export interface ItemService {
  id: string;
  type: string;
  attributes: {
    id: number;
    service_icon: {
      url: string;
    };
    service_name: string;
    service_description: string;
    is_selected: boolean;
  };
  isSelected: boolean;
}

export interface ItemResponse {
  data: [];
  services: number[];
  message: string;
}
// Customizable Area End

export interface Props {
  navigation: typeof navigation;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  allServices: ItemService[];
  userServices: number[];
  areAllSelected: boolean;
  confirmationModal: boolean;
  errorMsg: string;
  isAnyServiceSelected: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class UserNotaryServiceController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllServicesApiCallId: string = "";
  getUserServicesApiCallId: string = "";
  updateUserServicesApiCallId: string = "";
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
      allServices: [],
      userServices: [],
      areAllSelected: false,
      confirmationModal: false,
      errorMsg: "",
      isAnyServiceSelected: false,
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

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

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      setStorageData("token", token);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    this.getAllServices();
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  setIsAnyServiceSelected = () =>
    this.setState({
      isAnyServiceSelected: this.state.allServices.some(
        (service) => service.isSelected
      ),
    });

  setAreAllSelected = () =>
    this.setState({
      areAllSelected: this.state.allServices.every(
        (service) => service.isSelected
      ),
    });

  multiSelect = (selectedService: ItemService) => {
    const tempAllServices = this.state.allServices;
    tempAllServices.forEach((service) => {
      if (service.id === selectedService.id) {
        service.isSelected = !service.isSelected;
      }
    });
    this.setState({ allServices: tempAllServices }, () => {
      this.setIsAnyServiceSelected();
      this.setAreAllSelected();
    });
  };

  toggleAreAllSelected = () => {
    let tempAllServices = this.state.allServices;
    tempAllServices.forEach((item) => {
      if (item.id) {
        item.isSelected = !this.state.areAllSelected;
      }
    });
    this.setState(
      {
        allServices: tempAllServices,
      },
      () => {
        this.setIsAnyServiceSelected();
        this.setAreAllSelected();
      }
    );
  };

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  inValidResponses = (responseJson: ValidResponseType) => {
    return responseJson && responseJson.errors;
  };

  isValidResponse = (responseJson: ValidResponseType) => {
    if (responseJson.status !== 500) {
      return responseJson && !responseJson.errors;
    }
  };

  responseSuccessCallBack = (
    apiRequestCallId: string,
    responseJson: ItemResponse
  ) => {
    if (apiRequestCallId === this.getAllServicesApiCallId) {
      this.setState({ allServices: responseJson.data }, () =>
        this.getUserServices()
      );
    }
    if (apiRequestCallId === this.getUserServicesApiCallId) {
      this.setState({ userServices: responseJson.services }, () =>
        this.selectedIdsOfUser()
      );
    }
    if (apiRequestCallId === this.updateUserServicesApiCallId) {
      if (responseJson.message) {
        this.setState({
          confirmationModal: false,
          errorMsg: responseJson.message,
        });
      } else {
        this.setState({ confirmationModal: false }, () =>
          this.props.navigation.goBack()
        );
      }
    }
  };

  selectedIdsOfUser = async () => {
    const tempUserServices = this.state.userServices;
    const tempAllServices = this.state.allServices;
    tempAllServices.forEach((service: ItemService) => {
      if (tempUserServices.includes(service.attributes.id)) {
        service.isSelected = true;
      }
    });
    this.setState({ allServices: tempAllServices }, () => {
      this.setIsAnyServiceSelected();
      this.setAreAllSelected();
    });
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

  getAllServices = async () => {
    this.getAllServicesApiCallId = await this.apiCall({
      contentType: configJSON.contentTypeApiUpdateUser,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getAllServicesEndPoint,
    });
  };

  getUserServices = async () => {
    this.getUserServicesApiCallId = await this.apiCall({
      contentType: configJSON.contentTypeApiUpdateUser,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.getUserServicesEndPoint,
    });
  };

  yesButtonClick = () => {
    this.setState({ confirmationModal: true });
  };

  noBtn = () => {
    this.setState({ confirmationModal: false });
  };

  updateUserServices = async () => {
    let idSub: Array<string> = [];
    this.state.allServices.forEach((item: ItemService) => {
      if (item.isSelected === true) {
        idSub.push(JSON.parse(item.id));
      }
    });
    let allServices = {
      service_ids: idSub,
    };
    this.updateUserServicesApiCallId = await this.apiCall({
      contentType: configJSON.contentTypeApiUpdateUser,
      method: configJSON.callTypeApiValidateMobileNo,
      endPoint: configJSON.postUserServiceUpdate,
      body: allServices,
    });
  };
  // Customizable Area End
}
