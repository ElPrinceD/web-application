import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";

interface ValidResponseType {
  message: object;
  data: object;
  errors:string;
}

interface IStripeResponseJson {
  data: IStripeResponseData;
}
interface IStripeResponseData {
  url: string;
  quote_id: string;
  user_id: string;
  notary_request_id: string;
  cs_id?: string;
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
  paymentMethod: string;
  quoteId: string;
  notaryRequestId: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PaymentOptionsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  stripePayApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      paymentMethod: "",
      quoteId: "",
      notaryRequestId: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const navigationData = message.getData(getName(MessageEnum.CustomDataMessage));
      this.setState({
        quoteId: navigationData.quoteId,
        notaryRequestId: navigationData.notaryRequestId,
      });
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if(this.isValidResponse(webResponseJson)){
        this.responseSuccessCallBack(webApiRequestCallId,webResponseJson)
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  isValidResponse = (responseJson: ValidResponseType) => {
    return responseJson && !responseJson.errors;
  }

  responseSuccessCallBack = (apiRequestCallId: string, responseJson: IStripeResponseJson) => {
    if (apiRequestCallId === this.stripePayApiCallId) {
      if (responseJson.data.cs_id) {
        setStorageData("cs_id", responseJson.data.cs_id);
      }
      this.redirectToStripe(responseJson.data.url);
    }
  }

  handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({paymentMethod: (event.target as HTMLInputElement).value});
  };

  makePayment = () => {
    if (this.state.paymentMethod === "1") {
      this.stripePay();
    }
  }

  stripePay = async () => {
    let token = await getStorageData("token");
    let requestId = await getStorageData("notaryRequestId");
    const header = {
      token: token,
      "Content-Type": configJSON.stripePayApiContentType
    };
    const apiBody = {
      quote_id: this.state.quoteId,
      success_url: window.location.origin +  `/RequestDetails/${requestId}?isSuccess=true&quoteId=${this.state.quoteId}`,
      cancel_url: window.location.origin + `/RequestDetails/${requestId}?isSuccess=false&quoteId=${this.state.quoteId}`,
      notary_request_id: this.state.notaryRequestId,
    }
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.stripePayApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.stripePayApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.stripePayApiMethodType
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(apiBody)
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  redirectToStripe = (stripeUrl: string) => {
    const link = document.createElement('a');
    link.href = stripeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  navigateToRequestDetails = () => this.props.navigation.goBack();
  // Customizable Area End
}
