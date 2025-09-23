import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import {
  getStorageData,
  setStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
import React from "react";
import { Moment } from "moment";
import { failureImage, successImage } from "./assets";
import { setupWebSocket } from "../../../components/src/SetupWebSocket";
const { baseURL } = require("../../../framework/src/config");
import moment from "moment";

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

interface IAllServices {
  data?: IAllServicesDataEntity[] | null;
}

interface MarkCompletetResponse {
  message?: string;
  error?: string;
}
interface IAllServicesDataEntity {
  id: string;
  type: string;
  attributes: IAllServicesAttributes;
}
interface IAllServicesAttributes {
  id: number;
  service_icon: IAllServicesServiceIcon;
  service_name: string;
  service_description: string;
  is_selected: boolean;
}
interface IAllServicesServiceIcon {
  url: string;
}

interface IKYCStatus {
  status: string | null;
}

export interface InvoiceDownload {
  id: number,
  notary_name:string,
  amount:number,
  platform_fee:number,
  vat:number,
  total_amount:number,
  invoice:string,
}

export interface IProfile {
  data: IProfileData;
}
export interface IProfileData {
  id: string;
  type: string;
  attributes: IProfileAttributes;
}
export interface IProfileAttributes {
  id: number;
  first_name?: null;
  last_name?: null;
  full_phone_number: string;
  city?: null;
  post_code?: null;
  country_code?: null;
  phone_number?: null;
  email: string;
  activated: boolean;
  user_type: string;
  user_name?: null;
  platform?: null;
  suspend_until?: null;
  status: string;
  role_id: number;
  full_name: string;
  gender?: null;
  date_of_birth?: null;
  age?: null;
  country?: null;
  address?: null;
  address_line_2?: null;
  contact_name: string;
  company_name: string;
  photo: IProfilePhoto;
}
export interface IProfilePhoto {
  url: string | null;
}

export interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}

export interface ISubmitQuoteFailureResponse {
  errors: string[];
}

export interface ICancellationChargeFailure {
  errors: string;
}

export interface NotaryRequestDetails {
  data: Data;
}
export interface Data {
  id: string;
  type: string;
  attributes: RequestDetailAttributes;
  relationships: RequestDetailRelationships;
}
export interface RequestDetailAttributes {
  status: string;
  notary_id: number | null;
  notary_service_type: number;
  priority?: string | null;
  notarisation_method_id: number;
  jurisdiction_id: number;
  date: string;
  notes: string;
  notarised_document: number;
  timing_slot: string;
  platform_fee_details: {
    fee_type: string,
    fee_value: string,
  },
  juridiction: Juridiction;
  notarisation_method: NotarisationMethod;
  notary_service_name: string;
  file_documents: FileDocumentsEntity[];
  token?: string;
  invite_request: boolean;
  invited_request_status: string | null;
}
export interface Juridiction {
  id: number;
  jurisdiction: string;
  created_at: string;
  updated_at: string;
}
export interface NotarisationMethod {
  id: number;
  notarisation_method: string;
  created_at: string;
  updated_at: string;
}
export interface FileDocumentsEntity {
  doc_id: number;
  doc_type: string;
  doc_size: number;
  doc_base_64: string;
  doc_name: string;
  doc_file_url: string;
  signatory_count: number;
  recipients?: RecipientsEntity[] | null;
}
export interface RecipientsEntity {
  id: number;
  created_at: string;
  updated_at: string;
  file_document_id: number;
  name: string;
  email: string;
  is_signatory?: boolean | null;
}
export interface RequestDetailRelationships {
  jurisdiction: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
  notary: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
  notarisation_method: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
  account: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
}
export interface JurisdictionOrNotaryOrNotarisationMethodOrAccount {
  data: JurisdictionOrNotaryOrNotarisationMethodOrAccountData1;
}
export interface JurisdictionOrNotaryOrNotarisationMethodOrAccountData1 {
  id: string;
  type: string;
}
export interface Notary {
  data?: null;
}

export interface CancellationCharge {
  cancellation_charges: number;
}

export interface CancelNotaryRequest {
  notary_id: number;
  message: string;
}

export interface ISubmitQuoteResponse {
  id: number;
  message: string;
}

export interface IGetQuotesList {
  data?: IQuote[] | null;
}

export interface IQuote {
  id: string;
  type: string;
  attributes: IQuoteAttributes;
}
export interface IQuoteAttributes {
  notary_requests_id: number;
  start_time: string;
  video_call_required: boolean;
  fees: string;
  end_time: string;
  platform_fee_inclusive: boolean;
  message: string;
  notary_id: number;
  vat_fee:string;
  finalTotalWithVat:string;
  created_at: string;
  updated_at: string;
  quote_statuses_id: number;
  total_fee:string;
  quote_status: string;
  notary_fees: string;
  platform_fees: string;
}

interface IAcceptQuote {
  message: string;
}

interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
}

enum SuccessFailModalType {
  None = "None",
  PaymentSuccess = "PaymentSuccess",
  PaymentFail = "PaymentFail",
  QuoteSubmission = "QuoteSubmission",
}

interface IMeetingCreated {
  start_time: string;
  end_time: string;
  message: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  token?: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isStartTimePickerOpen: boolean;
  isEndTimePickerOpen: boolean;
  quotes: IQuote[];
  quoteId: string;
  isPreviewQuoteModalOpen: boolean;
  quotePreviewIndex: number;
  quoteStartTime: string;
  quoteEndTime: string;
  quoteNotaryFees: string;
  quoteVATFees: string;
  vat_fee:string;
  finalTotalWithVat:string;
  quoteMessage: string;
  modalOpen: boolean;
  serviceData: Array<DataofService>;
  cancelBookNowReqModal: boolean;
  roleID: number;
  userName: string;
  userProfileDetails: IProfileAttributes[];
  userProfilePic: string | null;
  email: string;
  tabIndex: number;
  areTabsDisabled: boolean;
  status: string;
  notaryDate: Date | string;
  jurisdiction: string;
  numberOfSignatory: number;
  description: string;
  documents: FileDocumentsEntity[];
  typeOfNotaryService: string;
  notarisationMethod: string;
  notaryRequestId: string;
  vatFeeType: string,
  vatFeeValue: string,
  isSideBarOpen: boolean;
  cancelReqModal: boolean;
  cancelReqModalTitle: string;
  cancelQuoteId: string;
  cancellationCharges: string;
  timing_slot: string;
  loader: boolean;
  isMakeQuoteModalOpen: boolean;
  isVideoCallChecked: boolean;
  fees: string | null;
  isVATChecked: boolean;
  message: string;
  startTime: Date | null;
  endTime: Date | null;
  isSubmitQuoteButtonDisabled: boolean;
  timeErrorText: string;
  feesErrorText: string;
  videoCallError: boolean;
  messageError: boolean;
  isSuccessFailModalOpen: boolean;
  successFailModalType: SuccessFailModalType;
  successFailModalImage: string;
  successFailModalText: string;
  successFailModalTextColor: string | undefined;
  successFailModalSubText: string;
  successFailModalSubText2: string;
  successFailModalButtonText: string;
  isZoomModalOpen: boolean;
  meetingStartTime: string | null;
  meetingEndTime: string | null;
  cancellationChargeErrorText: string;
  meetingLink: string;
  endUserDocStatus: boolean;
  isComesFromCompletedModal: boolean;
  isKYCCompleted: boolean;
  openChatModal: boolean;
  account_id: number | null;
  chatId: string | number;
  chatName: string;
  newReceivedMessage: string;
  token: string
  unReadMessageCount: number
  fullName: string;
  profile: string;
  isInviteRequest: boolean | null;
  invitedRequestStatus: string | null
  isDocumentSigned: boolean;
  showCompletePopup: boolean;
  todayDate: string;
  notaryInvoiceDetails:InvoiceDownload | null;
  declineNotaryRequest:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BlockController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getServicesApiCallId: string = "";
  getProfileApiCallId: string = "";
  getInvoiceDownload: string = "";
  notaryDeleteRequest: string = "";
  submitQuoteApiCallId: string = "";
  getNotaryRequestDetailsCallId: string = "";
  getCancellationChargesApiCallId: string = "";
  putCancelNotaryRequestCallId: string = "";
  getQuotesListApiCallId: string = "";
  acceptQuoteApiCallId: string = "";
  withdrawQuoteApiCallId: string = "";
  getMeetingTimeApiCallId: string = "";
  generateMeetingApiCallId: string = "";
  zoomCallId: string = "";
  getKYCStatusCallId: string = "";
  createChatRoomApiCallId: string = "";
  webSocket: WebSocket | null = null;
  checkUnreadMessageCountApiCallId: string = "";
  markAsCompleteCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      isStartTimePickerOpen: false,
      isEndTimePickerOpen: false,
      quotes: [],
      quoteId: "",
      quoteStartTime: "09:30 AM",
      isPreviewQuoteModalOpen: false,
      quotePreviewIndex: 0,
      quoteEndTime: "09:30 AM",
      quoteNotaryFees: "",
      quoteVATFees: "",
      vat_fee:"",
      finalTotalWithVat:"",
      quoteMessage: "",
      serviceData: [],
      modalOpen: false,
      cancelBookNowReqModal: false,
      roleID: 0,
      userName: "",
      userProfileDetails: [],
      userProfilePic: null,
      email: "",
      tabIndex: 0,
      areTabsDisabled: true,
      status: "",
      notaryDate: new Date(),
      jurisdiction: "",
      numberOfSignatory: 0,
      description: "",
      documents: [],
      notarisationMethod: "",
      notaryRequestId: "",
      typeOfNotaryService: "",
      vatFeeType: "",
      vatFeeValue: "",
      isSideBarOpen: false,
      cancelReqModal: false,
      cancelReqModalTitle: "",
      cancelQuoteId: "",
      cancellationCharges: "",
      timing_slot: "",
      loader: true,
      isMakeQuoteModalOpen: false,
      isVideoCallChecked: false,
      fees: "",
      isVATChecked: false,
      message: "",
      startTime: null,
      endTime: null,
      isSubmitQuoteButtonDisabled: true,
      timeErrorText: "",
      feesErrorText: "",
      videoCallError: false,
      messageError: false,
      isSuccessFailModalOpen: false,
      successFailModalType: SuccessFailModalType.None,
      successFailModalText: "",
      successFailModalTextColor: undefined,
      successFailModalSubText: "",
      successFailModalSubText2: "",
      successFailModalButtonText: "",
      successFailModalImage: "",
      isZoomModalOpen: false,
      meetingStartTime: null,
      meetingEndTime: null,
      cancellationChargeErrorText: "",
      endUserDocStatus: false,
      meetingLink: "",
      isKYCCompleted: false,
      openChatModal: false,
      isComesFromCompletedModal: false,
      account_id: null,
      newReceivedMessage: "",
      token: "",
      chatName: "ChatChannel",
      chatId: "",
      unReadMessageCount: 0,
      fullName: "",
      profile: "",
      isInviteRequest: false,
      invitedRequestStatus: null,
      isDocumentSigned: false,
      showCompletePopup: false,
      todayDate: "",
      declineNotaryRequest:false,
      notaryInvoiceDetails:null,
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
        this.apiSuccessCall(webApiRequestCallId, webResponseJson);
        if (webApiRequestCallId === this.createChatRoomApiCallId) {
          this.handleCreateChatRoomApiRes(webResponseJson);
        }
        if (webApiRequestCallId === this.checkUnreadMessageCountApiCallId) {
          this.handleCheckMessageCountApiRes(webResponseJson);
        }
        if (webApiRequestCallId === this.markAsCompleteCallId) {
          this.handleMarkAsCompleteApiRes(webResponseJson);
        }
        if (
          webApiRequestCallId === this.getMeetingTimeApiCallId &&
          webResponseJson.zoom_meetings.start_time &&
          webResponseJson.zoom_meetings.end_time
        )
          this.setState({
            loader: false,
            meetingStartTime: webResponseJson.zoom_meetings.start_time,
            meetingEndTime: webResponseJson.zoom_meetings.end_time,
          });
        this.responseSuccessCallBack(webApiRequestCallId, webResponseJson);
      } else {
        this.responseFailureCallBack(webApiRequestCallId, webResponseJson);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleCreateChatRoomApiRes = (response: any) => {
    if (response.data) {
      const { attributes } = response.data;
      this.setState({ chatId: attributes.id, fullName: attributes.full_name, profile: attributes.profile, chatName: "ChatChannel" },
        () => this.webSocketConnection());
    }
  }

  apiSuccessCall = async (
    apiRequestCallId: string,
    responseJson: { zoom_meetings: { meeting: { join_url: string } } }
  ) => {
    if (apiRequestCallId === this.zoomCallId) {
      this.zoomCallSuccessCallback(responseJson);
    }
  }

  zoomCallSuccessCallback = (responseJson: { zoom_meetings: { meeting: { join_url: string } } }) => {
    const meetingLinkValue = responseJson.zoom_meetings.meeting;
    this.setState(
      { meetingLink: meetingLinkValue.join_url },
      () => {
        window.open(this.state.meetingLink, "_blank");
      }
    );
  };

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  setToken = (token: string) => {
    if (token) {
      this.setState({ token });
    }
  }
  async componentDidMount() {
    this.getToken();
    const token = await getStorageData("authToken");
    this.setToken(token);
    const isSubmitQuoteOpen = await getStorageData("isSubmitQuoteOpen");
    removeStorageData("isSubmitQuoteOpen");
    let id;
    if (this.props.navigation.getParam("id")) {
      id = this.props.navigation.getParam("id");
    }
    else {
      id = await getStorageData("notaryRequestId");
    }
    this.setState(
      {
        notaryRequestId: id,
        isMakeQuoteModalOpen: isSubmitQuoteOpen === "true" ? true : false,
      },
      this.getNotaryRequestDetails
    );
    this.getProfile();
    this.getServicesAPI();
    this.getInvoiceDetails();
    const queryParams = new URLSearchParams(window.location.search);
    const isPaymentSuccess = queryParams.get("isSuccess") as string;
    const quoteId = queryParams.get("quoteId") as string;
    this.setState({ quoteId: quoteId });
    if (isPaymentSuccess === "true") {
      this.showPaymentSuccessModal();
      this.acceptQuoteApi(true);
    } else if (isPaymentSuccess === "false") {
      this.showPaymentFailureModal();
      this.acceptQuoteApi(false);
    }
    if (id) {
      this.createChatRoom("ChatChannel")
    }
  }

  async componentDidUpdate(prevProps: Props, prevState: S) {
    if (prevState.chatId !== this.state.chatId) {
      this.checkUnreadMessageCount();
    }
    if (prevState.newReceivedMessage !== this.state.newReceivedMessage) {
      this.checkUnreadMessageCount();
    }
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

  getKYCStatus = async () => {
    this.setState({ loader: true });
    this.getKYCStatusCallId = await this.apiCall({
      contentType: configJSON.getKYCStatusApiContentType,
      method: configJSON.getKYCStatusApiMethodType,
      endPoint: configJSON.getKYCStatusApiEndpoint + this.state.notaryRequestId
    });
  }

  // Enhanced method to handle post-KYC completion actions
  handleKYCCompletion = async () => {
    // Refresh KYC status
    await this.getKYCStatus();
    
    // Refresh other relevant data that might depend on KYC status
    if (this.isRequestStatusInProgress()) {
      this.getMeetingTime();
      this.getCancellationCharges();
    }
    
    // Refresh quotes list to ensure UI is up to date
    this.getQuotesList();
    
    // Show success feedback to user only when KYC is actually completed
    // This method is called from the KYC component, indicating a new completion
    this.setState({
      successFailModalImage: successImage,
      successFailModalText: "KYC Verification Completed!",
      successFailModalSubText: "Your identity has been successfully verified. You can now proceed with the notary process.",
      successFailModalButtonText: "Continue",
      isSuccessFailModalOpen: true,
    });
  }

  acceptQuoteApi = async (toAccept: boolean) => {
    const bodyData = {
      is_accepted: toAccept.toString(),
      cs_id: await getStorageData("cs_id"),
    };
    removeStorageData("cs_id");
    this.acceptQuoteApiCallId = await this.apiCall({
      contentType: configJSON.acceptQuoteApiContentType,
      method: configJSON.acceptQuoteApiMethodType,
      endPoint:
        configJSON.acceptQuoteApiEndpoint1 +
        this.state.quoteId +
        configJSON.acceptQuoteApiEndpoint2,
      body: bodyData,
    });
  };

  getMeetingTime = async () => {
    this.setState({ loader: true });
    this.getMeetingTimeApiCallId = await this.apiCall({
      contentType: configJSON.getMeetingTimeApiContentType,
      method: configJSON.getMeetingTimeApiMethodType,
      endPoint:
        configJSON.getMeetingTimeApiEndpoint + this.state.notaryRequestId,
    });
  };

  generateMeeting = async () => {
    const body = {
      notary_request_id: this.state.notaryRequestId,
      quote_id: this.state.quoteId,
    };
    this.generateMeetingApiCallId = await this.apiCall({
      contentType: configJSON.generateMeetingApiContentType,
      method: configJSON.generateMeetingApiMethodType,
      endPoint: configJSON.generateMeetingApiEndpoint,
      body: body,
    });
  };

  showPaymentSuccessModal = async () => {
    this.setState({
      isSuccessFailModalOpen: true,
      successFailModalType: SuccessFailModalType.PaymentSuccess,
      successFailModalImage: successImage,
      successFailModalText: "Payment Successful",
      successFailModalSubText: `Your Payment towards Order ID: ${this.state.notaryRequestId} has been successfully processed.`,
      successFailModalSubText2:
        "You can review the details of your order below.",
      successFailModalButtonText: "Check status",
    });
  };

  showPaymentFailureModal = () => {
    this.setState({
      isSuccessFailModalOpen: true,
      successFailModalType: SuccessFailModalType.PaymentFail,
      successFailModalImage: failureImage,
      successFailModalText: "Payment Failed",
      successFailModalTextColor: "#FF0000",
      successFailModalSubText: `Unfortunately, your payment attempt for Order ID: ${this.state.notaryRequestId} was not successful.`,
      successFailModalSubText2: "Please attempt the payment again below.",
      successFailModalButtonText: "Retry",
    });
  };

  redirectToPaymentOptions = () => {
    const navigationData = {
      quoteId: this.state.quoteId,
      notaryRequestId: this.state.notaryRequestId,
    };

    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "PaymentOptions"
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(
      getName(MessageEnum.CustomDataMessage),
      navigationData
    );
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
  };

  getQuotesList = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getQuotesListApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getQuotesListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getQuotesListApiEndPointPart1 +
      this.state.notaryRequestId +
      configJSON.getQuotesListApiEndPointPart2
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getQuotesListApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  previewQuote = (quote: IQuote, quoteIndex: number) => {
    let msg = this.isEmptyOrNull(quote.attributes.message) ? "" : quote.attributes.message;
    const formattedMessage = msg.replace(/\n/g, "<br />");
    this.setState({
      quoteId: quote.id,
      quotePreviewIndex: quoteIndex,
      quoteStartTime: quote.attributes.start_time,
      quoteEndTime: quote.attributes.end_time,
      quoteNotaryFees: parseFloat(quote.attributes.notary_fees).toFixed(2),
      quoteVATFees: parseFloat(quote.attributes.platform_fees).toFixed(2),
      vat_fee: parseFloat(quote.attributes.vat_fee).toFixed(2),
      finalTotalWithVat: parseFloat(quote.attributes.total_fee).toFixed(2),
      quoteMessage: formattedMessage,
      isPreviewQuoteModalOpen: true,
    });
  };

  closePreviewQuote = () => this.setState({ isPreviewQuoteModalOpen: false });
  navigateToMeeting = () => {
    this.setIsMeetingModalOpen(false);
    window.open(window.location.origin + "/MeetSDK", "_blank");
  };

  handleStartTimeChange = (value: Moment | null) => {
    if (value !== null)
      this.setState(
        {
          startTime: value.toDate(),
          timeErrorText: "",
        },
        this.toggleIsSubmitQuoteButtonDisabled
      );
  };

  handleEndTimeChange = (value: Moment | null) => {
    if (value !== null)
      this.setState(
        {
          endTime: value.toDate(),
          timeErrorText: "",
        },
        this.toggleIsSubmitQuoteButtonDisabled
      );
  };

  setLoader = (value: boolean) => this.setState({ loader: value });

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

  getServicesAPI = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.allservicesApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getServicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allServicesApiEndpoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.allServicesApiMethodType
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
    this.getProfileApiCallId = requestMessage.messageId;
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

  isEndTimeNotGreaterThanStartTimeBy30Minutes = (
    startTime: Date,
    endTime: Date
  ) => {
    if (endTime > startTime) {
      const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
      const minutesto = 30 * 60 * 1000;
      const diff = minutesto - differenceInMilliseconds;
      return diff > 0;
    } else {
      return true;
    }
  };

  toggleIsSubmitQuoteButtonDisabled = () => {
    const { startTime, endTime, fees } = this.state;
    let isAnythingNull = false;
    if (startTime === null) {
      isAnythingNull = true;
    }
    if (endTime === null) {
      isAnythingNull = true;
    }
    if (fees === "") {
      isAnythingNull = true;
    }
    this.setState({ isSubmitQuoteButtonDisabled: isAnythingNull });
  };

  findSubmitButtonBackgroundColor = () =>
    this.state.isSubmitQuoteButtonDisabled ? "grey" : "#012275";

  getStartTimeToSubmitQuote = () => {
    const { startTime, notaryDate } = this.state;
    if (startTime !== null && typeof notaryDate !== 'string' && notaryDate instanceof Date) {
      startTime.setDate(notaryDate.getDate());
      startTime.setMonth(notaryDate.getMonth());
      startTime.setFullYear(notaryDate.getFullYear());
      return startTime.toISOString();
    }
  };

  getEndTimeToSubmitQuote = () => {
    const { endTime, notaryDate } = this.state;
    if (endTime !== null && typeof notaryDate !== 'string' && notaryDate instanceof Date) {
      endTime.setDate(notaryDate.getDate());
      endTime.setMonth(notaryDate.getMonth());
      endTime.setFullYear(notaryDate.getFullYear());
      return endTime.toISOString();
    }
  };

  submitQuoteApiCall = async () => {
    this.setState({ loader: true });
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.submitQuoteApiContentType,
      token: token,
    };
    const body = {
      quote: {
        notary_requests_id: this.state.notaryRequestId,
        start_time: this.getStartTimeToSubmitQuote(),
        end_time: this.getEndTimeToSubmitQuote(),
        video_call_required: this.state.isVideoCallChecked,
        fees: this.state.fees,
        isVATInclusive: this.state.isVATChecked,
        message: this.state.message,
      },
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.submitQuoteApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.submitQuoteApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.submitQuoteApiMethodType
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  findVideoCallCheckboxColor = () =>
    this.state.videoCallError ? "red" : "#64748B";

  findVideoCallColor = () => (this.state.videoCallError ? "red" : "#011342");

  handleSubmitQuote = () => {
    const { startTime, endTime, notarisationMethod, isVideoCallChecked, fees, vatFeeType, vatFeeValue, isVATChecked } =
      this.state;
    let isEverthingOk = true;
    if (
      startTime !== null &&
      endTime !== null &&
      this.isEndTimeNotGreaterThanStartTimeBy30Minutes(startTime, endTime)
    ) {
      this.setState({
        timeErrorText:
          "End time must be at least 30 minutes later than start time",
      });
      isEverthingOk = false;
    }
    if (
      (notarisationMethod.includes("REN") ||
        notarisationMethod.includes("REIN")) &&
      !isVideoCallChecked
    ) {
      this.setState({ videoCallError: true });
      isEverthingOk = false;
    }
    if (fees !== null && parseFloat(fees) === 0) {
      this.setState({ feesErrorText: "Fees must be greater than 0" });
      isEverthingOk = false;
    }
    if (isVATChecked && fees !== null && vatFeeType.toLowerCase() === "flat fee" && parseFloat(fees) <= parseFloat(vatFeeValue)) {
      this.setState({ feesErrorText: `Fees must be greater than £${vatFeeValue}` });
      isEverthingOk = false;
    }
    if (isEverthingOk) {
      this.submitQuoteApiCall();
    }
  };

  toggleIsVideoCallChecked = () => {
    this.setState(
      {
        isVideoCallChecked: !this.state.isVideoCallChecked,
        videoCallError: false,
      },
      this.toggleIsSubmitQuoteButtonDisabled
    );
  };

  isVideoCallAsteriskShown = () =>
    this.state.notarisationMethod.includes("REN") ||
    this.state.notarisationMethod.includes("REIN");

  toggleIsVATChecked = () =>
    this.setState({ isVATChecked: !this.state.isVATChecked });

  closeMakeQuoteModal = () => {
    this.setState({
      isMakeQuoteModalOpen: false,
      isVideoCallChecked: false,
      fees: "",
      isVATChecked: false,
      message: "",
      startTime: null,
      endTime: null,
      isSubmitQuoteButtonDisabled: true,
      timeErrorText: "",
      feesErrorText: "",
      videoCallError: false,
      messageError: false,
    });
  };

  findMainBoxWidth = () =>
    this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw";

  findTabColor = (tabNo: number) =>
    this.state.tabIndex === tabNo ? "#0131A8" : "#64748B";

  findSignatoriesText = (doc: FileDocumentsEntity) =>
    doc.signatory_count > 1
      ? doc.signatory_count + " Signatories"
      : doc.signatory_count + " Signatory";

  toggleIsMakeQuoteModalOpen = () =>
    this.setState({ isMakeQuoteModalOpen: true });

  handleFeesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    this.setState({ feesErrorText: "" });
    if (configJSON.regex.test(event.target.value))
      this.setState(
        { fees: event.target.value },
        this.toggleIsSubmitQuoteButtonDisabled
      );
  };

  handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.target.value.length <= 500)
      this.setState({ message: event.target.value });
  };

  findSubtext = () =>
    this.isRequestStatusPending() || this.isRequestInDraft()
      ? undefined
      : `Cancellation charges will be applied of £${parseFloat(this.state.cancellationCharges).toFixed(2)}`;

  isCancelButtonShown = () =>
    this.isEndUser() &&
    (this.isRequestStatusPending() || this.isRequestStatusInProgress() || this.isRequestInDraft()) && (!this.isRequestStatusInInvite() && !this.isRequestStatusInRejected());

  getNotaryRequestDetails = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getNotaryRequestDetailsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getNotaryRequestDetailsCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getNotaryRequestDetailsApiEndPoint + this.state.notaryRequestId
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getNotaryRequestDetailsApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };


  getInvoiceDetails = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getNotaryRequestDetailsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getInvoiceDownload = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.invoiceDownload + this.state.notaryRequestId
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getNotaryRequestDetailsApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  notaryDeclineRequest = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getNotaryRequestDetailsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.notaryDeleteRequest = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.notaryDeleteRequestAPIEndPoint + this.state.notaryRequestId + '/notary_decline_request'
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  openModalForCompilation = () => {
    this.setState({showCompletePopup: true});
  }

  openDeclineModal = () => {
    this.openModal(`Are you sure you want to decline this order?`);
    this.setState({declineNotaryRequest: true});
  }

  openModalForCancellation = () => {
    if (this.state.cancellationChargeErrorText === "") {
      let modalMsg = !this.isRequestInDraft() ? "cancel" : "delete";
      this.openModal(`Are you sure you want to ${modalMsg} this order?`)
    }
    else {
      this.setState({
        isSuccessFailModalOpen: true,
        successFailModalType: SuccessFailModalType.PaymentSuccess,
        successFailModalImage: failureImage,
        successFailModalText: "Request Cancellation Failed",
        successFailModalTextColor: "#FF0000",
        successFailModalSubText: this.state.cancellationChargeErrorText,
        successFailModalButtonText: "OK",
      });
    }
  }

  openModal = (cancelModalTitle: string, quoteId: string = "") =>
    this.setState({
      cancelReqModalTitle: cancelModalTitle,
      cancelReqModal: true,
      cancelQuoteId: quoteId,
    });

  getCancellationCharges = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getCancellationChargesContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCancellationChargesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCancellationChargesApiEndpointPart1 +
      this.state.notaryRequestId +
      configJSON.getCancellationChargesApiEndpointPart2
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getCancellationChargesApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  cancelNotaryrequest = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.cancelNotaryRequestContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.putCancelNotaryRequestCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.cancelNotaryRequestApiEndpointPart1 +
      this.state.notaryRequestId +
      configJSON.cancelNotaryRequestApiEndpointPart2
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.cancelNotaryRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  withdrawQuote = async () => {
    this.withdrawQuoteApiCallId = await this.apiCall({
      contentType: configJSON.withdrawQuoteApiContentType,
      method: configJSON.withdrawQuoteApiMethodType,
      endPoint:
        configJSON.withdrawQuoteApiEndpoint1 +
        this.state.cancelQuoteId +
        configJSON.withdrawQuoteApiEndpoint2,
    });
  };

  noButtonClick = () => {
    this.setState({ cancelReqModal: false });
  };

  yesButtonClick = () => {
    if (this.state.declineNotaryRequest) {
      this.notaryDeclineRequest();
    } else {
      if (this.state.cancelQuoteId !== "") {
          this.withdrawQuote();
      } else {
          this.cancelNotaryrequest();
      }
    }
    this.setState({ cancelReqModal: false, loader: true });
  };

  requestMarkButtonClick = async () => {
    this.setState({
      loader: true,
      showCompletePopup: false,
    })
    this.markAsCompleteCallId = await this.apiCall({
      method: configJSON.PatchApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: `${configJSON.markAsCompleteApiEndPoint}${this.state.notaryRequestId}/mark_as_completed`
    });
  };

  openSideBar = () =>
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });

  isEndUser = () => this.state.roleID === 1;

  isNotaryUser = () => this.state.roleID === 2;

  isRequestStatusPending = () => this.state.status.toLowerCase() === "pending";

  isRequestInDraft = () => this.state.status.toLowerCase() === "draft";

  isRequestStatusInProgress = () =>
    this.state.status.toLowerCase() === "in progress";

  isRequestStatusCancelled = () =>
    this.state.status.toLowerCase() === "cancelled";

  isRequestStatusInInvite = () => this.state.isInviteRequest && this.state.invitedRequestStatus !== null && this.state.invitedRequestStatus.toLowerCase() === "invite"

  isRequestStatusInAccepted = () => this.state.isInviteRequest && this.state.invitedRequestStatus !== null && this.state.invitedRequestStatus.toLowerCase() === "accepted"

  isRequestStatusInRejected = () => this.state.isInviteRequest && this.state.invitedRequestStatus !== null && this.state.invitedRequestStatus.toLowerCase() === "rejected"

  getRequestStatusForDisplay = () => {
    const { isInviteRequest, status, invitedRequestStatus } = this.state;
    if (this.getStatusPriority()) return status;
    if (isInviteRequest && invitedRequestStatus !== null) return this.getRequestStatusDisplayLabel(invitedRequestStatus.toUpperCase())
    return status;
  }

  getStatusPriority = () => {
    if (this.isRequestStatusCancelled()) return true;
    return false;
  }

  getRequestStatusDisplayLabel = (reqStatus: string) => {
    let addToString = this.isEndUser() ? "" : "D";
    switch (reqStatus) {
      case "INVITE":
        return reqStatus + addToString;
      case "ACCEPTED":
      case "REJECTED":
        return "INVITE " + reqStatus;
      default:
        return ""
    }
  }

  toShowMeetingTab = () =>
    !this.isRequestStatusPending() &&
    !this.isRequestStatusCancelled() &&
    !this.isRequestInDraft() &&
    this.state.status.toLowerCase() !== "";

  isMeetingTabDisabled = () => this.isRequestStatusInProgress() && !this.state.isKYCCompleted;

  isDocuSignTabDisabled = () => this.state.areTabsDisabled || this.state.notarisationMethod.includes("RIN") || (this.isRequestStatusInProgress() && !this.state.isKYCCompleted)

  areTabsShown = () =>
    this.state.status !== "" &&
    !this.isRequestStatusCancelled() &&
    ((this.isEndUser() ||
      this.state.quotes.length > 0 ||
      !this.isRequestStatusPending()) && !this.isRequestInDraft());

  isSubmittedQuotePresent = () =>
    this.state.quotes.some((quote) => quote.attributes.quote_statuses_id === 1);

  areMakeQuoteAndDeclineButtonsShown = () =>
    this.isNotaryUser() &&
    !this.isSubmittedQuotePresent() &&
    !this.isRequestInDraft() &&
    this.isRequestStatusPending();

  isQuoteSubmitted = (quoteStatus: number) => quoteStatus === 1 && !this.isRequestStatusInRejected();

  navigateBack = async() => {
   const  path = await getStorageData("fromPath")
  await removeStorageData("fromPath")
if(path){  
  this.props.navigation.navigate(path)
}else{

  this.props.navigation.navigate("Dashboard")
}
  };

  formNotaryRequestDate = () => {
    const { notaryDate } = this.state;
    if (typeof notaryDate !== 'string' && notaryDate instanceof Date) {
      const date = notaryDate.getDate();
      const month = notaryDate.getMonth();
      const year = notaryDate.getFullYear();
      
      // Array of month names
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
      ];
      
      return `${date} ${monthNames[month]} ${year}`;
    }
    return "-";
  };

  findDateColor = () => {
    const notaryDate = this.state.notaryDate;
    if (typeof notaryDate !== 'string' && notaryDate instanceof Date) {
      const dateToday = new Date();
      notaryDate.setHours(0, 0, 0, 0);
      dateToday.setHours(0, 0, 0, 0);
      return notaryDate < dateToday &&
        this.isEndUser() &&
        (this.isRequestStatusPending() || this.isRequestStatusInProgress() || this.isRequestInDraft())
        ? "red"
        : "#011342";
    }
    return "#011342";
  };

  findNotaryDateSession = () => {
    const { timing_slot } = this.state;
    if (!this.isEmptyOrNull(timing_slot)) {
      return (
        this.formNotaryRequestDate() +
        " - " +
        timing_slot.charAt(0).toUpperCase() +
        timing_slot.slice(1)
      );
    }
    return this.formNotaryRequestDate();
  };

  findMeetDateTime = () => {
    const { meetingStartTime: start, meetingEndTime: end } = this.state;
    const date = this.formNotaryRequestDate();
    return `${date} | ${this.getQuoteMeetTime(start as string, end as string)}`;
  };

  showMarketAsCompleteButton = () => {
    const endMeetingTime = moment(this.state.meetingEndTime);
    const newDate = moment();
    if (newDate.isAfter(endMeetingTime)) {
      return true
    } else {
      return false
    }
  }

  setIsMeetingModalOpen = (value: boolean) =>
    this.setState({ isZoomModalOpen: value });

  getQuoteMeetTime = (startTime: string, endTime: string) => {
    const startMeetTime = new Date(startTime);
    const endMeetTime = new Date(endTime);
    let startHour: string | number = startMeetTime.getHours();
    let startMinute: string | number = startMeetTime.getMinutes();
    let startMerdian: string = "AM";
    let endHour: string | number = endMeetTime.getHours();
    let endMinute: string | number = endMeetTime.getMinutes();
    let endMerdian: string = "AM";
    if (startHour >= 12) {
      startMerdian = "PM";
    }
    if (startHour === 0) {
      startHour = startHour + 12;
    }
    if (startHour > 12) {
      startHour = startHour - 12;
    }
    if (startHour <= 9) {
      startHour = "0" + startHour.toString();
    }
    if (startMinute <= 9) {
      startMinute = "0" + startMinute.toString();
    }

    if (endHour >= 12) {
      endMerdian = "PM";
    }
    if (endHour === 0) {
      endHour = endHour + 12;
    }
    if (endHour > 12) {
      endHour = endHour - 12;
    }
    if (endHour <= 9) {
      endHour = "0" + endHour.toString();
    }
    if (endMinute <= 9) {
      endMinute = "0" + endMinute.toString();
    }
    return (
      startHour +
      ":" +
      startMinute +
      " " +
      startMerdian +
      " - " +
      endHour +
      ":" +
      endMinute +
      " " +
      endMerdian
    );
  };

  getQuoteDateTime = (quoteTime: string) => {
    const dateTime = new Date(quoteTime);
    let hour: string | number = dateTime.getHours();
    let minute: string | number = dateTime.getMinutes();
    let merdian: string = "AM";
    if (hour >= 12) {
      merdian = "PM";
    }
    if (hour === 0) {
      hour = hour + 12;
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour <= 9) {
      hour = "0" + hour.toString();
    }
    if (minute <= 9) {
      minute = "0" + minute.toString();
    }
    return (
      this.formNotaryRequestDate() + " - " + hour + ":" + minute + " " + merdian
    );
  };

  getQuoteTime = () => {
    const { quoteStartTime, quoteEndTime } = this.state;
    const quoteST = new Date(quoteStartTime);
    const quoteET = new Date(quoteEndTime);
    let startHour: string | number = quoteST.getHours();
    let startMinute: string | number = quoteST.getMinutes();
    let startMerdian: string = "AM";
    let endHour: string | number = quoteET.getHours();
    let endMinute: string | number = quoteET.getMinutes();
    let endMerdian: string = "AM";
    if (startHour >= 12) {
      startMerdian = "PM";
    }
    if (endHour >= 12) {
      endMerdian = "PM";
    }
    if (startHour === 0) {
      startHour = startHour + 12;
    }
    if (startHour > 12) {
      startHour = startHour - 12;
    }
    if (endHour === 0) {
      endHour = endHour + 12;
    }
    if (endHour > 12) {
      endHour = endHour - 12;
    }
    if (startHour <= 9) {
      startHour = "0" + startHour.toString();
    }
    if (startMinute <= 9) {
      startMinute = "0" + startMinute.toString();
    }
    if (endHour <= 9) {
      endHour = "0" + endHour.toString();
    }
    if (endMinute <= 9) {
      endMinute = "0" + endMinute.toString();
    }
    return (
      startHour +
      ":" +
      startMinute +
      " " +
      startMerdian +
      " - " +
      endHour +
      ":" +
      endMinute +
      " " +
      endMerdian
    );
  };

  a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    this.setState({ tabIndex: newValue });

  handleSuccessFailureModalButtonClick = () => {
    if (
      this.state.successFailModalType === SuccessFailModalType.PaymentSuccess
    ) {
      this.refreshPage();
    } else if (
      this.state.successFailModalType === SuccessFailModalType.PaymentFail
    ) {
      this.redirectToPaymentOptions();
    }
    
    // Handle KYC completion success modal
    if (this.state.successFailModalText === "KYC Verification Completed!") {
      // Refresh the page to show updated status
      this.refreshPage();
    }
    
    this.setState({ isSuccessFailModalOpen: false });
    this.isRequestInDraft() && this.props.navigation.goBack();
  };

  isQuotesNullForEndUser = () =>
    this.isEndUser() &&
    this.isRequestStatusPending() &&
    this.state.quotes.length <= 0;

  areQuotesAvailableForEndUser = () =>
    this.isEndUser() &&
    this.isRequestStatusPending() &&
    this.state.quotes.length > 0;

  areQuotesAvailableForNotaryUser = () =>
    this.isNotaryUser() &&
    this.isRequestStatusPending() &&
    this.state.quotes.length > 0;

  pendingOrInProgressApiCalls = () => {
    if (this.isRequestStatusPending()) this.getQuotesList();
    else this.setLoader(false);
    if (this.isRequestStatusInProgress()) {
      this.getMeetingTime();
      this.getCancellationCharges();
      this.getKYCStatus();
    }
  };

  refreshPage = async () => {
    let requestId: string;
    if (this.props.navigation.getParam("id")) {
      requestId = this.props.navigation.getParam("id");
    }
    else {
      requestId = await getStorageData("notaryRequestId");
    }
    this.props.navigation.navigate("RequestDetails", { id: requestId });
  };

  handleKYCStatusResponse = (res: IKYCStatus) => {
    if (res.status !== null && res.status.toLowerCase() === "verified") {
      this.setState({ isKYCCompleted: true, loader: false, tabIndex: 0 });
    } else {
      this.setState({ isKYCCompleted: false, loader: false, tabIndex: 3 });
    }
  }

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  responseSuccessCallBack = (
    apiRequestCallId: string,
    responseJson: IProfile &
      NotaryRequestDetails &
      CancellationCharge &
      CancelNotaryRequest &
      IAllServices &
      ISubmitQuoteResponse &
      IGetQuotesList &
      IAcceptQuote &
      IMeetingCreated &
      IKYCStatus & 
      InvoiceDownload
  ) => {
    switch (apiRequestCallId) {
      case this.getProfileApiCallId:
        this.setState({
          userName: responseJson.data.attributes.full_name,
          userProfilePic: responseJson.data.attributes.photo.url,
          roleID: responseJson.data.attributes.role_id,
          email: responseJson.data.attributes.email,
          account_id: responseJson.data.attributes.id,
          userProfileDetails: [responseJson.data.attributes],
        });
        break;
      case this.getInvoiceDownload:
        this.downloadInvoiceHandle(responseJson);
        break;
      case this.notaryDeleteRequest:
        this.deleteNotaryRequest(responseJson);
        break;
      case this.getNotaryRequestDetailsCallId:
        this.handleResOfNotaryReqDetails(responseJson);
        break;
      case this.getCancellationChargesApiCallId:
        this.setState({
          cancellationCharges: responseJson.cancellation_charges.toString(),
          cancellationChargeErrorText: "",
        });
        break;
      case this.putCancelNotaryRequestCallId:
        if (responseJson.message) {
          this.handleCancelNotaryRequestTResponse();
        }
        break;
      case this.getServicesApiCallId:
        this.setState({ serviceData: responseJson.data });
        break;
      case this.submitQuoteApiCallId:
        if (responseJson.message === "Quote submitted successfully.") {
          this.closeMakeQuoteModal();
          this.setState({
            successFailModalImage: successImage,
            successFailModalText: "Your Quote Submitted Successfully!",
            successFailModalSubText:
              "You can check the status from the below button.",
            successFailModalButtonText: "Check Status",
            loader: false,
            isSuccessFailModalOpen: true,
          });
          this.getQuotesList();
        }
        break;
      case this.getQuotesListApiCallId:
        const quotes = responseJson.data;
        quotes.sort(
          (a: IQuote, b: IQuote) =>
            new Date(b.attributes.created_at).getTime() -
            new Date(a.attributes.created_at).getTime()
        );
        this.setState({ quotes: quotes, loader: false });
        break;
      case this.acceptQuoteApiCallId:
        if (responseJson.message === "Quote accepted successfully.")
          this.generateMeeting();
        this.getNotaryRequestDetails();
        break;
      case this.generateMeetingApiCallId:
        if (
          responseJson.message.toLowerCase() ===
          "you have successfully created zoom meeting"
        )
          this.getMeetingTime();
        break;
      case this.withdrawQuoteApiCallId:
        if (responseJson.message === "Quote withdrawn successfully.") {
          this.setState({
            successFailModalImage: successImage,
            successFailModalText: "Success!",
            successFailModalSubText:
              "Your order has been cancelled successfully.",
            successFailModalButtonText: "Check Status",
            loader: false,
            isSuccessFailModalOpen: true,
          });
          this.getQuotesList();
        }
        break;
      case this.getKYCStatusCallId:
        this.handleKYCStatusResponse(responseJson);
        break;
    }
  };

  responseFailureCallBack = (
    apiRequestCallId: string,
    responseJson: ISubmitQuoteFailureResponse & ICancellationChargeFailure
  ) => {
    if (apiRequestCallId === this.submitQuoteApiCallId) {
      this.setState({
        successFailModalImage: failureImage,
        successFailModalText: "Your Quote Submission Failed!",
        successFailModalSubText: responseJson.errors[0],
        successFailModalButtonText: "OK",
        loader: false,
        isSuccessFailModalOpen: true,
      });
    }
    if (apiRequestCallId === this.getCancellationChargesApiCallId) {
      this.setState({
        cancellationChargeErrorText: responseJson.errors,
      });
    }
    if (apiRequestCallId === this.getMeetingTimeApiCallId) {
      this.setState({ loader: false })
    }
  };

  downloadInvoiceHandle = (responseJson:InvoiceDownload) => {
    this.setState({ notaryInvoiceDetails: responseJson });
  }

  deleteNotaryRequest = (responseJson:any) => {
    const message: Message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Dashboard");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  handleResOfNotaryReqDetails = (responseJson: NotaryRequestDetails) => {
    const docs = responseJson.data.attributes.file_documents.length > 0 ? responseJson.data.attributes.file_documents : [];
    const totalSignatoryCount = docs.reduce((total, doc) => {
      return total + doc.signatory_count;
    }, 0);
    this.setState(
      {
        notaryRequestId: responseJson.data.id,
        status: responseJson.data.attributes.status,
        typeOfNotaryService: !this.isEmptyOrNull(responseJson.data.attributes.notary_service_name) ? responseJson.data.attributes.notary_service_name : "-",
        notarisationMethod: !this.isEmptyOrNull(responseJson.data.attributes.notarisation_method) ? responseJson.data.attributes.notarisation_method.notarisation_method : "-",
        notaryDate: !this.isEmptyOrNull(responseJson.data.attributes.date) ? new Date(responseJson.data.attributes.date) : "",
        jurisdiction: !this.isEmptyOrNull(responseJson.data.attributes.juridiction) ? responseJson.data.attributes.juridiction.jurisdiction : "-",
        documents: responseJson.data.attributes.file_documents.length > 0 ? responseJson.data.attributes.file_documents : [],
        description: responseJson.data.attributes.notes,
        numberOfSignatory: totalSignatoryCount,
        timing_slot: responseJson.data.attributes.timing_slot,
        areTabsDisabled:
          responseJson.data.attributes.status.toLowerCase() === "pending" ||
          responseJson.data.attributes.status.toLowerCase() === "cancelled" ||
          responseJson.data.attributes.status.toLowerCase() === "draft",
        vatFeeType: responseJson.data.attributes.platform_fee_details.fee_type,
        vatFeeValue: responseJson.data.attributes.platform_fee_details.fee_value,
        isInviteRequest: !this.isEmptyOrNull(responseJson.data.attributes.invite_request) ? responseJson.data.attributes.invite_request : false,
        invitedRequestStatus: responseJson.data.attributes.invited_request_status,
      },
      this.pendingOrInProgressApiCalls
    );
  }


  handleMarkAsCompleteApiRes = (response: MarkCompletetResponse) => {
    if (response.message) {
      this.setState({
        successFailModalImage: successImage,
        successFailModalText: "Success!",
        successFailModalSubText:
          "Your request Mark as completed successfully",
        successFailModalButtonText: "Check Status",
        isSuccessFailModalOpen: true,
        loader: false,
      })
    }
    if (response.error) {
      this.setState({
        successFailModalImage: failureImage,
        successFailModalText: "Failed!",
        successFailModalTextColor: "#FF0000",
        successFailModalSubText: response.error,
        successFailModalButtonText: "Check Status",
        isSuccessFailModalOpen:true,
        loader: false,
      })
    }
    setTimeout(() => {
      this.setState({
        successFailModalImage: "",
        successFailModalText: "",
        successFailModalTextColor: "",
        successFailModalSubText: "",
        successFailModalButtonText: "",
        isSuccessFailModalOpen: false,
      })

    }, 3000);
  }

  getZoomApi = async () => {
    const notaryRequestID = await getStorageData("notaryRequestId")
    this.zoomCallId = await this.apiCall({
      method: configJSON.validationApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: configJSON.zoomEndPoint + notaryRequestID
    });
  }

  docStatusResultForEndUser = (hasData: boolean) => {
    if (this.state.endUserDocStatus !== hasData) {
      this.setState({ endUserDocStatus: hasData });
    }
  }

  handleChatButton = () => {
    this.setState({ openChatModal: true });
  }
  handleChatClose = () => {
    this.setState({ openChatModal: false });
    this.checkUnreadMessageCount();
  }

  webSocketConnection = () => {
    const URL = baseURL.replace(/^https?:\/\//i, "");
    const token = localStorage.getItem("token");
    this.webSocket = setupWebSocket(
      URL,
      token,
      this.state.chatId,
      this.state.chatName,
      this.handleMessage,
    );
  };

  handleMessage = (message: any) => {
    this.setState({ newReceivedMessage: message });
  };


  createChatRoom = (chatName: string) => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const bodyData = {
      "chat": {
        "name": chatName,
        "notary_request_id": this.state.notaryRequestId
      }
    };
    const reqMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createChatRoomApiCallId = reqMessage.messageId;

    reqMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createChatRoomApiEndPoint
    );
    reqMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    reqMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(bodyData)
    );
    reqMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );

    runEngine.sendMessage(reqMessage.id, reqMessage);
  };

  sendMessage = (newMessage: string) => {
    const { chatId, chatName } = this.state;

    if (newMessage && this.webSocket) {
      this.webSocket.send(
        JSON.stringify({
          command: "message",
          identifier: JSON.stringify({
            channel: chatName,
            id: chatId,
          }),
          data: JSON.stringify({ message: newMessage, action: "speak" }),
        })
      );
    }
  };

  async componentWillUnmount() {
    this.webSocket?.close();
  }

  checkUnreadMessageCount = () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.checkUnreadMessageCountApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.checkUnreadMessageCountApiEndPoint}${this.state.chatId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "GET"
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleCheckMessageCountApiRes = (response: any) => {
      this.setState({ unReadMessageCount: response.count });
  }

  isEmptyOrNull = (value: any) => {
    return (
      value === "" || value === undefined || value === null || value === "null"
    )
  }

  handleCancelNotaryRequestTResponse = () => {
    let modalText = !this.isRequestInDraft() ? "cancelled" : "deleted";
    let updatedStatus = !this.isRequestInDraft() ? "CANCELLED" : "DRAFT";
    this.setState({
      successFailModalImage: successImage,
      successFailModalText: "Success!",
      successFailModalSubText:
        `Your order has been ${modalText} successfully.`,
      successFailModalButtonText: "Check Status",
      loader: false,
      isSuccessFailModalOpen: true,
      status: updatedStatus,
    });
  }

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

  navigateToDocumentOpener = (docUrl: string) => {
    setStorageData("docUrl", docUrl);
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Document");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  findTimeValue = (time: Date | null) => {
    if (time === null) return "";
    let hours: string | number = time.getHours();
    let minutes: string | number = time.getMinutes();
    let meridian = "AM";
    if (hours >= 12) meridian = "PM";
    if (hours === 0) hours = hours + 12;
    if (hours > 12) hours = hours - 12;
    if (hours <= 9) hours = "0" + hours.toString();
    if (minutes <= 9) minutes = "0" + minutes.toString();
    return `${hours}:${minutes} ${meridian}`;
  };
  // Customizable Area End
}
