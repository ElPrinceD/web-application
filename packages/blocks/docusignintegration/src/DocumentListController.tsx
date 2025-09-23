// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import {
  getStorageData,
  setStorageData,
} from "../../../framework/src/Utilities";

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

interface IDocumentSigningStatusEntity {
  document_id: number;
  file_name: string;
  signing_urls: string | null;
  is_docusign_start: boolean;
  signatory: ISignatoryEntity[];
  notary: INotaryEntity[];
  document_url: string;
}

interface ISignatoryEntity {
  name: string;
  email: string;
  is_signatory: boolean;
  signed: boolean;
}

interface INotaryEntity {
  name: string;
  email: string;
  signed: boolean;
}

export interface Props {
  navigation: any;
  id: string;
  roleID: number;
  email: string;
}

interface S {
  hasDocusignStartedForEven1Document: boolean;
  documentDetails: IDocumentSigningStatusEntity[];
  notaryRequestId: string;
  loader: boolean;
}

interface SS {
  id: any;
}

export default class DocumentListController extends BlockComponent<
  Props,
  S,
  SS
> {
  getDocusignDetailsApiCallId: string = "";
  startDocuSignApiCallId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      hasDocusignStartedForEven1Document: false,
      documentDetails: [],
      notaryRequestId: "",
      loader: true,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.setState(
      { notaryRequestId: await getStorageData("notaryRequestId") },
      this.getDocusignDetails
    );
  }

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let res = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(res)) {
        switch (apiRequestCallId) {
          case this.getDocusignDetailsApiCallId:
            this.setState(
              { documentDetails: res.document_signing_status, loader: false },
              this.checkDocusignStartForAtleast1Doc
            );
            break;
          case this.startDocuSignApiCallId:
            setStorageData("docusign_envelope_id", res.envelope_id);
            setStorageData("docusign_access_token", res.access_token);
            this.navigateToDocuSign(res.signing_urls.url);
            break;
        }
      }
    }
  }

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint, body } = apiData;
    const header = {
      "Content-Type": contentType,
      token: token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    message.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    body &&
      message.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    runEngine.sendMessage(message.id, message);
    return message.messageId;
  };

  getDocusignDetails = async () => {
    this.getDocusignDetailsApiCallId = await this.apiCall({
      contentType: configJSON.getDocusignDetailsApiContentType,
      method: configJSON.getDocusignDetailsApiMethodType,
      endPoint: configJSON.getDocusignApiEndpoint + this.state.notaryRequestId,
    });
  };

  checkDocusignStartForAtleast1Doc = () => {
    this.setState({
      hasDocusignStartedForEven1Document: this.state.documentDetails.some(
        (document) => document.is_docusign_start === true
      ),
    });
  };

  areDocumentsShown = () => {
    return this.isNotaryUser() || this.state.hasDocusignStartedForEven1Document;
  };

  handleStartOrSignNowButtonClick = (
    document: IDocumentSigningStatusEntity
  ) => {
    this.setState({ loader:true});
    setStorageData("documentId", document.document_id);
    if (document.is_docusign_start) {
      this.navigateToDocuSign(document.signing_urls);
    } else {
      this.startDocuSignForThisDoc(document.document_id);
    }
  };

  startDocuSignForThisDoc = async (docId: number) => {
    const bodyData = {
      document_id: docId,
      base_url: window.location.origin + "/DocuSignSuccess",
    };
    this.startDocuSignApiCallId = await this.apiCall({
      contentType: configJSON.startDocuSignApiContentType,
      method: configJSON.startDocuSignApiMethodType,
      endPoint: configJSON.startDocuSignApiEndpoint,
      body: bodyData,
    });
  };

  navigateToDocuSign = (sender_url: string | null) => {
    this.setState({ loader: false });
    setStorageData("doc_sign_url", sender_url);
    window.open(window.location.origin + "/DocuSign", "_blank");
   };

  isStartOrSignNowButtonShown = (document: IDocumentSigningStatusEntity) => {
    const signatory = document.signatory.find(
      (signatory) => signatory.email === this.props.email
    );
    const allSignatoriesSigned =
      document.is_docusign_start &&
      document.signatory
        .filter((signatory) => signatory.is_signatory)
        .every((signatory) => signatory.signed);
    return (
      (this.isEndUser() &&
        document.is_docusign_start &&
        (signatory ? !signatory.signed && signatory.is_signatory : false)) ||
      (this.isNotaryUser() &&
        !document.notary[0].signed &&
        (!document.is_docusign_start ||
          (document.is_docusign_start && allSignatoriesSigned)))
    );
  };

  isSignedOrPending = (isSigned: boolean) => {
    return isSigned ? "SIGNED" : "PENDING";
  };

  isStartOrSignNow = (hasDocuSignStartedForThisDocument: boolean) =>
    this.isNotaryUser() && !hasDocuSignStartedForThisDocument
      ? "Start"
      : "Sign Now";

  isThisDocumentShown = (hasDocuSignStartedForThisDocument: boolean) => {
    return this.isNotaryUser() || hasDocuSignStartedForThisDocument;
  };

  findSignatories = (noOfSignatories: number) => {
    return noOfSignatories === 1
      ? "1 Signatory"
      : noOfSignatories + " Signatories";
  };

  isEndUser = () => {
    return this.props.roleID === 1;
  };

  isNotaryUser = () => {
    return this.props.roleID === 2;
  };

  navigateToDocumentOpener = (docUrl: string) => {
    setStorageData("docUrl", docUrl);
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Document");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  handleDownload = async (fileUrl: string, fileName: string) => {
    const response = await fetch(fileUrl);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(await response.blob());
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(
      window.URL.createObjectURL(await response.blob())
    );
  };
}
// Customizable Area End
