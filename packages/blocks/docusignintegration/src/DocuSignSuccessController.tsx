// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../framework/src/Message";
import {
  getStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
import { failureImage, successImage } from "./assets";

export const configJSON = require("./config");

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
}

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  loader: boolean;
  isSuccessFailurePopupShown: boolean;
  popupImg: string;
  popupText: string;
  popupSubText: string;
  buttonText: string;
}

interface SS {
  id: any;
}

export default class DocusignIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  documentSignedApiCallId: string = "";
  generateSigningUrlsApiCallId: string = "";

  constructor(Props: Props) {
    super(Props);
    this.receive = this.receive.bind(this);
    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];

    this.state = {
      loader: true,
      isSuccessFailurePopupShown: false,
      popupImg: "",
      popupText: "",
      popupSubText: "",
      buttonText: "",
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
      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (this.isValidResponse(webResponseJson)) {
        if (apiCallId === this.generateSigningUrlsApiCallId) {
          this.setState({
            popupImg: successImage,
            popupText: "Document Sent Successfully!",
            popupSubText: "Document has been sent to signatories successfully",
            buttonText: "Check Status",
            isSuccessFailurePopupShown: true,
            loader: false,
          });
        }
        if (apiCallId === this.documentSignedApiCallId) {
          this.setState({
            popupImg: successImage,
            popupText: "Document Signed Successfully!",
            popupSubText: "Document has been sent to your email successfully",
            buttonText: "Check Status",
            isSuccessFailurePopupShown: true,
            loader: false,
          });
        }
      } else {
        if (apiCallId === this.documentSignedApiCallId) {
          this.setState({
            popupImg: failureImage,
            popupText: "Document Signing Failed!",
            popupSubText: "Please try again",
            buttonText: "OK",
            isSuccessFailurePopupShown: true,
            loader: false,
          });
        }
      }
    }
  }

  async componentDidMount() {
    const docusign_envelope_id = await getStorageData("docusign_envelope_id");
    if (docusign_envelope_id !== null) this.generateSigningUrls();
    else this.documentSignedApiCall();
  }

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
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  generateSigningUrls = async () => {
    let envelopeId = await getStorageData("docusign_envelope_id");
    let accessToken = await getStorageData("docusign_access_token");
    removeStorageData("docusign_envelope_id");
    removeStorageData("docusign_access_token");
    const body = {
      envelope_id: envelopeId,
      access_token: accessToken,
      base_url: window.location.origin + "/DocuSignSuccess",
    };
    this.generateSigningUrlsApiCallId = await this.apiCall({
      contentType: configJSON.generateSigningUrlsApiContentType,
      method: configJSON.generateSigningUrlsApiMethodType,
      endPoint: configJSON.generateSigningUrlsApiEndPoint,
      body: body,
    });
  };

  documentSignedApiCall = async () => {
    let documentSignedId = await getStorageData("documentId");
    removeStorageData("documentId");
    this.documentSignedApiCallId = await this.apiCall({
      contentType: configJSON.documentSignedApiContentType,
      method: configJSON.documentSignedApiMethodType,
      endPoint: configJSON.documentSignedApiEndPoint + documentSignedId,
    });
  };

  navigateToRequestDetails = async() => {
    let notaryRequestId = await getStorageData("notaryRequestId");
    removeStorageData("doc_sign_url");
    const { parent } = window;
    const { location } = parent;
    location.href = location.origin + `/RequestDetails/${notaryRequestId}`;
  };
}
// Customizable Area End
