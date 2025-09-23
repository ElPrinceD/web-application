import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface ITermsConds {
  id: string;
  description: string;
  is_accepted: boolean;
  created_at: string;
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
  token: string;
  isAdminUser: boolean;
  accountId: number;
  termsConds: ITermsConds | null;
  termsCondsList: ITermsConds[];
  isTermsCondsAccepted: boolean;
  isLoading: boolean;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TermsConditionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getTermsCondsCallId: string = "";
  getTermsCondsListCallId: string = "";
  getAccountGroupsCallId: string = "";
  setAcceptanceOfTermsCondsId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      accountId: -1,
      termsCondsList: [],
      isAdminUser: true,
      termsConds: null,
      isTermsCondsAccepted: false,
      isLoading: false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (!this.isPlatformWeb()) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  navigateToTermsCondsDetail = (termsCondsId: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "TermsConditionsDetail"
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      termsCondsId: termsCondsId,
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(message);
  };

  navigateToTermsCondsEdit = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "TermsConditionsEdit"
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), null);
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(message);
  };

  getAccountGroups = async (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAccountGroupsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAccountGroupsApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    this.setState({ isLoading: true });
  };

  getTermsCondsList = async (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTermsCondsListCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllTermsCondsApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getTermsConds = async (token: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getTermsCondsCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTermsCondsApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleCheckBoxChange = (value: boolean) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const body = {
      id: this.state.termsConds?.id,
      is_accepted: value,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.setAcceptanceOfTermsCondsId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.setTermsCondsAcceptanceApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    if (errorResponse) this.parseApiCatchErrorResponse(errorResponse);
    if (responseJson?.errors) this.parseApiErrorResponse(responseJson);

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      if (token) {
        runEngine.debugLog("TOKEN", token);
        const messageData = JSON.parse(
          message.getData(getName(MessageEnum.SessionResponseData))
        );
        const accountId: number = messageData?.meta?.id;
        this.setState({ accountId });

        this.setState({ token, accountId }, () => this.getAccountGroups(token));
      } else {
        this.props.navigation.goBack();
        return alert("Please Login");
      }
    }

    if (
      responseJson &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getTermsCondsListCallId.length > 0 &&
      apiRequestCallId === this.getTermsCondsListCallId
    ) {
      this.getTermsCondsListCallId = "";
      this.setState({
        termsCondsList: responseJson.data,
        isLoading: false,
      });
    }

    if (
      responseJson &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getTermsCondsCallId.length > 0 &&
      apiRequestCallId === this.getTermsCondsCallId
    ) {
      this.getTermsCondsCallId = "";
      this.setState({
        termsConds: responseJson,
        isTermsCondsAccepted: responseJson.is_accepted,
        isLoading: false,
      });
    }

    if (
      responseJson &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.setAcceptanceOfTermsCondsId.length > 0 &&
      apiRequestCallId === this.setAcceptanceOfTermsCondsId
    ) {
      this.setAcceptanceOfTermsCondsId = "";
      this.setState({
        isTermsCondsAccepted: !this.state.isTermsCondsAccepted,
      });
    }

    if (
      responseJson?.data &&
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAccountGroupsCallId.length > 0 &&
      apiRequestCallId === this.getAccountGroupsCallId
    ) {
      this.getAccountGroupsCallId = "";
      const isAdminUser = responseJson.data.some(
        (group: { attributes: { accounts: [] } }) =>
          group.attributes.accounts.some(
            (account: { id: number; role_id: number | null }) =>
              account.id === this.state.accountId && account.role_id === 1
          )
      );

      this.setState({ isAdminUser: isAdminUser });
      if (isAdminUser) {
        this.getTermsCondsList(this.state.token);
      } else {
        this.getTermsConds(this.state.token);
      }
    }
    // Customizable Area End
  }
}
