// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";

export const configJSON = require("./config");

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

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
}

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  roleID: number;
  userName: string;
  userProfilePic: string | null;
  email: string;
  isSideBarOpen: boolean;
  notaryRequestId: string;
  modalOpen: boolean;
  cancelBookNowReqModal: boolean;
  loader: boolean;
  serviceData: Array<DataofService>;
  sender_url: string;
  zoomModal:boolean;
}

interface SS {
  id: any;
}

export default class DocusignIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  getProfileApiCallId: string = "";
  getServicesApiCallId: string = "";

  constructor(Props: Props) {
    super(Props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      roleID: 0,
      userName: "",
      userProfilePic: null,
      email: "",
      isSideBarOpen: false,
      notaryRequestId: "",
      modalOpen: false,
      cancelBookNowReqModal: false,
      loader: true,
      serviceData: [],
      sender_url: "",
      zoomModal:false,
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(responseJson)) {
        switch (apiRequestCallId) {
          case this.getProfileApiCallId:
            this.setState({
              userName: responseJson.data.attributes.full_name,
              userProfilePic: responseJson.data.attributes.photo.url,
              roleID: responseJson.data.attributes.role_id,
              email: responseJson.data.attributes.email,
              loader: false,
            });
            break;
          case this.getServicesApiCallId:
            this.setState({ serviceData: responseJson.data });
            break;
        }
      }
    }
  }

  async componentDidMount() {
    this.setState({ notaryRequestId: await getStorageData("notaryRequestId") });
    this.getProfile();
    this.getServicesAPI();
    const url = await getStorageData("doc_sign_url")
    if (url) {
      this.setState({ sender_url: url }, () => {
        const iframe = document.getElementById(
          "docusign-iframe"
        ) as HTMLIFrameElement;
        iframe.style.display = "block";
      });
    }
  }

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint } = apiData;
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
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  getProfile = async () => {
    this.getProfileApiCallId = await this.apiCall({
      contentType: configJSON.getProfileContentType,
      method: configJSON.getProfileApiMethodType,
      endPoint: configJSON.getProfileApiEndPoint,
    });
  };

  getServicesAPI = async () => {
    this.getServicesApiCallId = await this.apiCall({
      contentType: configJSON.allservicesApiContentType,
      method: configJSON.allServicesApiMethodType,
      endPoint: configJSON.allServicesApiEndpoint,
    });
  };

  isNotaryUser = () => this.state.roleID === 2;

  isEndUser = () => this.state.roleID === 1;

  openSideBar = () =>
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });

  setBookNowModal = (value: boolean) => this.setState({ modalOpen: value });

  closeBookNotaryRequestModal = () => {
    this.setBookNowModal(!this.state.modalOpen);
    this.setState({ cancelBookNowReqModal: true });
  };

  bookNowNoButtonClick = () => {
    this.setBookNowModal(!this.state.modalOpen);
    this.setState({ cancelBookNowReqModal: false });
  };

  findMainBoxWidth = () =>
    this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw";

  bookNowYesButtonClick = () => this.setState({ cancelBookNowReqModal: false });

  setLoader = (value: boolean) => this.setState({ loader: value });
}
// Customizable Area End
