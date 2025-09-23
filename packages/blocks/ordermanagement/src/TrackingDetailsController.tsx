import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";
import { ApiCallInterface, ValidResponseType } from "./types";
import { successImage } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  email: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  notaryRequestId: string;
  loader: boolean;
  trackingDetails: Array<any>;
  isFormOpen: boolean;
  shipmentProviderName: string;
  trackingNumber: string;
  additionalNotes: string;
  submitButtonText: string;
  isSubmitButtonDisabled: boolean;
  isSuccessFailModalOpen: boolean;
  successFailModalImage: string;
  successFailModalText: string;
  successFailModalTextColor: string | undefined;
  successFailModalSubText: string;
  expanded: any;
  editTrackingDetailsId: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TrackingDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getTrackingDetailsApiCallId: string = "";
  submitTrackingDetailsApiCallId: string = "";
  editTrackingDetailsApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      notaryRequestId: "",
      loader: true,
      trackingDetails: [],
      isFormOpen: false,
      shipmentProviderName: "",
      trackingNumber: "",
      additionalNotes: "",
      submitButtonText: "",
      isSubmitButtonDisabled: true,
      isSuccessFailModalOpen: false,
      successFailModalText: "",
      successFailModalTextColor: "",
      successFailModalSubText: "",
      successFailModalImage: "",
      expanded: null,
      editTrackingDetailsId: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (this.isValidResponse(responseJson))
        switch (apiRequestCallId) {
          case this.getTrackingDetailsApiCallId:
            this.setState({
              trackingDetails: responseJson.data,
              loader: false,
            });
            break;
          case this.submitTrackingDetailsApiCallId:
            if (
              responseJson.message === "Tracking details added successfully."
            ) {
              this.setState({
                successFailModalText: "Success!",
                successFailModalTextColor: "#47A573",
                successFailModalSubText: "Tracking details added successfully.",
                successFailModalImage: successImage,
                isSuccessFailModalOpen: true,
                loader: false,
              });
            }
            this.getTrackingDetails();
            break;
          case this.editTrackingDetailsApiCallId:
            if (
              responseJson.message === "Tracking details updated successfully."
            ) {
              this.setState({
                successFailModalText: "Success!",
                successFailModalTextColor: "#47A573",
                successFailModalSubText:
                  "Tracking details updated successfully.",
                successFailModalImage: successImage,
                isSuccessFailModalOpen: true,
                loader: false,
              });
            }
            this.getTrackingDetails();
            break;
        }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.setState(
      { notaryRequestId: await getStorageData("notaryRequestId") },
      this.getTrackingDetails
    );
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
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  getTrackingDetails = async () => {
    this.getTrackingDetailsApiCallId = await this.apiCall({
      contentType: configJSON.getTrackingDetailsApiContentType,
      method: configJSON.getTrackingDetailsApiMethodType,
      endPoint:
        configJSON.getTrackingDetailsApiEndPoint + this.state.notaryRequestId,
    });
  };

  submitTrackingDetails = async () => {
    this.setState({ loader: true });
    const {
      notaryRequestId,
      shipmentProviderName,
      trackingNumber,
      additionalNotes,
    } = this.state;
    const body = {
      tracking_detail: {
        notary_requests_id: notaryRequestId,
        shipment_provider_name: shipmentProviderName,
        tracking_number: trackingNumber,
        ...(additionalNotes &&
          additionalNotes.trim() && { additional_notes: additionalNotes }),
      },
    };
    this.submitTrackingDetailsApiCallId = await this.apiCall({
      contentType: configJSON.submitTrackingDetailsApiContentType,
      method: configJSON.submitTrackingDetailsApiMethodType,
      endPoint: configJSON.submitTrackingDetailsApiEndPoint,
      body: body,
    });
  };

  editTrackingDetails = async () => {
    this.setState({ loader: true });
    const {
      notaryRequestId,
      shipmentProviderName,
      trackingNumber,
      additionalNotes,
      editTrackingDetailsId,
    } = this.state;
    const body = {
      tracking_detail: {
        notary_requests_id: notaryRequestId,
        shipment_provider_name: shipmentProviderName,
        tracking_number: trackingNumber,
        ...(additionalNotes &&
          additionalNotes.trim() && { additional_notes: additionalNotes }),
      },
    };
    this.editTrackingDetailsApiCallId = await this.apiCall({
      contentType: configJSON.editTrackingDetailsApiContentType,
      method: configJSON.editTrackingDetailsApiMethodType,
      endPoint:
        configJSON.editTrackingDetailsApiEndPoint + editTrackingDetailsId,
      body: body,
    });
  };

  isSubmitButtonDisabled = () => {
    if (
      this.state.shipmentProviderName !== "" &&
      this.state.trackingNumber !== ""
    )
      this.setState({ isSubmitButtonDisabled: false });
    else this.setState({ isSubmitButtonDisabled: true });
  };

  handleShipmentProviderNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.target.value.length <= 30)
      this.setState(
        { shipmentProviderName: event.target.value },
        this.isSubmitButtonDisabled
      );
  };

  handleTrackingNumberChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (configJSON.regex.test(event.target.value) || event.target.value === "")
      this.setState(
        { trackingNumber: event.target.value },
        this.isSubmitButtonDisabled
      );
  };

  handleAdditionalNotesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.target.value.length <= 100)
      this.setState({ additionalNotes: event.target.value });
  };

  handleCancelClick = () =>
    this.setState({
      isFormOpen: false,
      shipmentProviderName: "",
      trackingNumber: "",
      additionalNotes: "",
      submitButtonText: "",
    });

  handleSubmit = () => {
    if (this.state.submitButtonText === "Update") this.editTrackingDetails();
    else this.submitTrackingDetails();
    this.setState({
      isFormOpen: false,
      shipmentProviderName: "",
      trackingNumber: "",
      additionalNotes: "",
      submitButtonText: "",
    });
  };

  handleAccordion =
    (Panel: number) => (event: React.ChangeEvent<{}>, newExpanded: boolean) =>
      this.setState({ expanded: newExpanded ? Panel : false });
  // Customizable Area End
}
