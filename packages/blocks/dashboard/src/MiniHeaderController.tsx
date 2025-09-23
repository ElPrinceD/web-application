// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../framework/src/Message";
import { getStorageData } from "../../../framework/src/Utilities";

export const configJSON = require("./config");

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
  services: Array<{}>
}

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
}

interface DataofService {
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
  };
}

export interface ItemResponse {
  data: [];
  services: number[];
  message: string;
}

export interface Props {
  navigation: any;
  id: string;
  allRequestAPI?: () => void;
}

interface S {
  loader: boolean;
  roleID: number;
  username: string;
  userProfilePic: string;
  modalOpen: boolean;
  cancelBookNowReqModal: boolean;
  serviceData: Array<DataofService>;
  userServiceData: number[];
  updateServiceData: Array<DataofService>;
  menuAnchorEl: null | HTMLElement;
  isInviteFormModalOpen: boolean;
  isNewRequestOrEditRequestOrInviteClient: string;
}

interface SS {
  id: any;
}

export default class DocusignIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  getProfileApiCallId: string | null = "";
  getServicesApiCallId: string | null = "";
  userServicesApiCallId: string | null = "";

  constructor(Props: Props) {
    super(Props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      loader: true,
      roleID: 0,
      username: "",
      userProfilePic: "",
      modalOpen: false,
      cancelBookNowReqModal: false,
      serviceData: [],
      userServiceData:[],
      updateServiceData:[],
      menuAnchorEl: null,
      isInviteFormModalOpen: false,
      isNewRequestOrEditRequestOrInviteClient:"",
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const res = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (this.isValidResponse(res)) {
        switch (apiCallId) {
          case this.getProfileApiCallId:
            this.setState({
              username: res.data.attributes.full_name,
              userProfilePic: res.data.attributes.photo.url,
              roleID: res.data.attributes.role_id,
            });
            break;
          case this.getServicesApiCallId:
            this.setState({ serviceData: res.data, loader: false },() => {
              this.getUserServices();
            });
            break;

            case this.userServicesApiCallId:
              this.setState(
                { userServiceData: res.services, loader: false },
                () => {
                  this.updateServiceDataNew();
                }
              );
              break;
        }
      }
    }
  }


  updateServiceDataNew = () => {
    const { userServiceData } = this.state;
    if (this.state.serviceData && userServiceData) {
      const filteredData = this.state.serviceData.filter((item) =>
        userServiceData.includes(item.attributes.id)
      );  
      this.setState({ updateServiceData: filteredData });
    } 
  };

  isTokenRequiredForApi = (endpoint: string | undefined): boolean => {
    const publicApiEndpoints = [
      configJSON.allServicesApiEndpoint,
    ]
    if(endpoint) return !publicApiEndpoints.some(publicEndpoint => endpoint.includes(publicEndpoint));
    return true;
  };

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint } = apiData;

    if (this.isTokenRequiredForApi(endPoint) && !token) { 
      this.setState({loader:false})     
      return null;
    }

    const header = {
      "Content-Type": contentType,
      ...(token && { token }),
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
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  async componentDidMount() {
    this.getProfile();
    this.getServicesAPI();
  }

  getProfile = async () => {
    this.getProfileApiCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint: configJSON.getProfileEndPoint,
    });
  };

  getServicesAPI = async () => {
    this.getServicesApiCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint: configJSON.allServicesApiEndpoint,
    });
  };

  getUserServices = async () => {
    this.userServicesApiCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint: configJSON.userServicesEndPoint,
    });
  };

  setBookNowModal = (value: boolean) => this.setState({ modalOpen: value });

  closeBookNotaryRequestModal = () => {
    this.setBookNowModal(!this.state.modalOpen);
    this.setState({ cancelBookNowReqModal: true });
  };

  bookNowNoButtonClick = () => {
    this.setBookNowModal(!this.state.modalOpen);
    this.setState({ cancelBookNowReqModal: false });
  };

  bookNowYesButtonClick = () => this.setState({ cancelBookNowReqModal: false });

  setLoader = (value: boolean) => this.setState({ loader: value });

  isGuestUser = () => this.state.roleID === 0;

  isEndUser = () => this.state.roleID === 1;

  isNotaryUser = () => this.state.roleID === 2;

  handleNavigateToMyAccount = () => {
      const msgs = new Message(getName(MessageEnum.NavigationMessage));
      msgs.addData(getName(MessageEnum.NavigationTargetMessage), "UserProfileBasicBlock");
      msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msgs);
  }
  
  handleEmptyButtonClick = () => {
    if(this.isEndUser()) this.setState({isNewRequestOrEditRequestOrInviteClient : "new"}) 
    if(this.isGuestUser()) this.setState({isNewRequestOrEditRequestOrInviteClient : "guest"})     
    this.setBookNowModal(true)
  }
}
// Customizable Area End
