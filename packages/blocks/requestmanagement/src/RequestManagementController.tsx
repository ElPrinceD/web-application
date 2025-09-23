import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { failureImage, successImage } from "./assets";

interface IRequest {
  id: string;
  type: string;
  attributes: {
    sender_id: number;
    status: string;
    rejection_reason: string | null;
    request_text: string;
    created_at: string;
    updated_at: string;
    reviewer_group_id: number;
    sender_full_name: string;
  };
}
import moment from "moment";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import React from "react";
export interface ValidResponseType {
  message: object;
  data: object;
  errors:string;
  status: number;
}
export interface ApiCallInterface {
  contentType?:string;
  method?:string;
  endPoint?:string;
  body?:object;
}

interface FileDocumentsEntity {
  doc_type: string;
  doc_name: string;
  doc_id: number;
  doc_base_64: string;
  doc_size: number;
  signatory_count: number;
  doc_file_url: string;
  recipients?: (RecipientsEntity)[] | null;
}

export interface RecipientsEntity {
  created_at: string;
  id: number;
  updated_at: string;
  file_document_id: number;
  email: string;
  name: string;
  is_notary: boolean;
  signed: boolean;
  is_signatory: boolean;
}

interface Relationships {
  jurisdiction: RelationshipData;
  notary: RelationshipDataNullable;
  notarisation_method: RelationshipData;
  account: RelationshipData;
}

interface RelationshipDataNullable {
  data: {
      id: string;
      type: string;
  } | null;
}

interface RelationshipData {
  data: {
      id: string;
      type: string;
  };
}

export interface DataofService {
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
  }
}

interface Attributes {
  status: string;
  notary_id: number | null;
  notarisation_method_id: number;
  notary_service_name: string;
  priority: string;
  notary_service_type: number;
  jurisdiction_id: number;
  date: string;
  notes: string;
  notarised_document: number;
  timing_slot: string;
  file_documents: (FileDocumentsEntity)[];
  juridiction: Juridiction;
  notarisation_method: NotarisationMethod;
  quote_statuses_id: number;
  invited_request_status:string | null;
}

interface Juridiction {
  id: number;
  jurisdiction: string;
  created_at: string;
  updated_at: string;
}

interface NotarisationMethod {
  id: number;
  notarisation_method: string;
  created_at: string;
  updated_at: string;
}

interface NotaryRequest {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

interface CompleteProfileData {
  is_phone_number: boolean;
  is_address: boolean;
  is_notary_service: boolean;
}

interface CompleteProfileDataApiRes {
  data: CompleteProfileData
}

export interface GetAllServices {
  all_request: number;
  data: [];
}
export interface CancelNotaryRequest {
  notary_id: number;
  message: string;
}
export interface CancellationCharge {
  cancellation_charges: number;
}


export interface GetAllRequest {
  all_request_count: number;
  in_progress_request_count: number;
  notary_completed_request_count: number;
  user_completed_request_count: number;
  data: {
    attributes : {
      user_type: string;
      full_name : string;
      photo: {
        url : string;
      };
      role_id: number;
      full_phone_number: string;
    }
  }
  end_user_notary_requests: {
    data: NotaryRequest;
  },
  invite_request: {
    data: Array<NotaryRequest>
  } 
}

interface EndUserNotaryRequest {
  end_user_notary_requests: {
    data: Array<NotaryRequest>
  },
  new_notary_requests: {
    data: Array<NotaryRequest>
  },
  notary_ongoing_requests: {
    data: Array<NotaryRequest>
  },
  invite_request: {
    data: Array<NotaryRequest>
  } 
}

interface RejectRequestResponse {
  message?: string;
  error?: string;
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
  cancelRequestStatus: string;
  isSuccessFailModalOpen: boolean;
  successFailModalImage: string;
  successFailModalText: string;
  successFailModalTextColor: string | undefined;
  successFailModalSubText: string;
  successFailModalSubText2: string;
  successFailModalButtonText: string;
  type: string;
  token: string;
  errorMsg: string;
  loading: boolean;
  receivedRequests: IRequest[];
  rejectText: string;
  rejectTextError: string | null;
  selectedId: string | null;
  viewRequest: IRequest | null;
  filterKey: string;
  userProfilePic: string;
  roleID: number;
  userName: string;
  value: number;
  isSideBarOpen:boolean;
  modalOpen: boolean;
  isNewRequestOrEditRequestOrInviteClient: string;
  editRequest: NotaryRequest | undefined;
  rows: Array<NotaryRequest>;
  ongoingRequest: Array<NotaryRequest>;
  isActionBoxActive: boolean;
  actionBoxIndex: number | null;
  newRequest: Array<NotaryRequest>;
  cancelNotaryRequestModal: boolean;
  loader: boolean;
  cancelNotaryRequestStatus: string;
  cancelNotaryRequestSubText: string | undefined;
  cancellationChargesErrorText: string;
  serviceData: Array<DataofService>;
  currentCancelRequest: string;
  phoneNumber: string;
  allRequest: number;
  progressRequest: number;
  completeCount: number;
  completeProfileData: CompleteProfileData | null;
  isUserActive: boolean;
  userType: string;
  currentPage: number;
  orderId: string;
  openFilterPopup:boolean;
  customerRequestButtons:string[];
  notaryRequestButtons:string[];
  dateType:string
  hasMoreRequests: boolean; 
  priority :string ;
  handleRequestButton:number | null;
  notaryType:any[];
  notary:number | string;
  presentDate:string
  cancelReqModal: boolean;
  tempDate:[Date, Date] | null,
  selectedDate:[Date, Date] | null,
  calendarOpen: boolean;
  noFilterResult: boolean;
  urgencyFilter:string;
  meetingLink:string;
  isInviteFormModalOpen: boolean;
  acceptedRequest: NotaryRequest | undefined;
  isRequestAccepted: boolean;
  rejectRequestModal: boolean;
  rejectedRequest :  NotaryRequest | undefined;
  invitedRequest : Array<NotaryRequest>;
  noRecordsMessage:string | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RequestManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllReceivedRequestCallId: string = "";
  updateRequestReviewCallId: string = "";
  deleteRequestCallId: string = "";
  apiDashboardItemCallId: string = "";
  dashboardApiCallId: string = "";
  apiGetQueryStrinurl: string = "";
  getAllRequestApiCallId: string = "";
  getAllNotaryRequestsCallId: string = "";
  getServicesApiCallId: string = "";
  getProfileApiCallID: string = "";
  createNewNotaryApiCallID: string = "";
  getCancellationChargesApiCallId: string = "";
  putCancelNotaryRequestCallId: string = "";
  completeProfileApiCallId: string = "";
  getAllNotaryTypeRequestId: string = "";
  zoomCallId: string = "";
  rejectRequestCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      cancelRequestStatus: "",
      isSuccessFailModalOpen: false,
      successFailModalImage: "",
      successFailModalText: "",
      successFailModalTextColor: undefined,
      successFailModalSubText: "",
      successFailModalSubText2: "",
      successFailModalButtonText: "",
      token: "",
      type: "",
      errorMsg: "",
      loading: false,
      receivedRequests: [],
      rejectText: "",
      rejectTextError: null,
      selectedId: null,
      viewRequest: null,
      filterKey: '',
      userProfilePic: "",
      roleID: 0,
      userName: "",
      value: 0,
      isSideBarOpen:false,
      modalOpen: false,
      isNewRequestOrEditRequestOrInviteClient: "new",
      editRequest: undefined,
      rows:[],
      ongoingRequest: [],
      isActionBoxActive: false,
      actionBoxIndex: null,
      newRequest: [],
      cancelNotaryRequestModal: false,
      loader: false,
      cancelNotaryRequestStatus: "",
      cancelNotaryRequestSubText: undefined,
      cancellationChargesErrorText: "",
      serviceData: [],
      currentCancelRequest: "",
      phoneNumber: "",
      allRequest: 0,
      progressRequest: 0,
      completeCount: 0,
      completeProfileData: null,
      isUserActive: false,
      userType:'',
      currentPage: 1,
      orderId: "",
      openFilterPopup:false,
      customerRequestButtons:['Pending','In Progress','Completed','Cancelled','Draft'],
      notaryRequestButtons:['Pending','In Progress','Completed'],
      dateType:'',
      priority:'',
      hasMoreRequests: true,
      handleRequestButton:null,
      notaryType:[],
      notary:"",
      presentDate:'Date',
      cancelReqModal: false,
      tempDate: null,
      selectedDate: null,
      calendarOpen: false,
      noFilterResult: false,
      urgencyFilter:'',
      meetingLink:"",
      isInviteFormModalOpen: false,
      acceptedRequest: undefined,
      isRequestAccepted: false,
      rejectRequestModal: false,
      rejectedRequest: undefined,
      invitedRequest:[],
      noRecordsMessage:"",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if(this.isValidResponse(webResponseJson)){
        this.responseSuccessCallBack(webApiRequestCallId,webResponseJson)
        this.apiSuccessCall(webApiRequestCallId, webResponseJson);
       } else {
        if (webApiRequestCallId === this.getCancellationChargesApiCallId) {
          this.setState({
            loader: false,
            isSuccessFailModalOpen: true,
            successFailModalImage: failureImage,
            successFailModalText: "Request Cancellation Failed",
            successFailModalTextColor: "#FF0000",
            successFailModalSubText: webResponseJson.errors,
            successFailModalButtonText: "OK",
          });
        }
       }
    }

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      setStorageData("token",token)
    }

  }

  componentDidMount = async () => {
    this.setState({ loader: true});
    this.getProfile();
    this.getServicesAPI();
    this.getNotaryServicesAPI();
    this.completeProfileInfo();
  };
  
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>, snapshot?: SS | undefined): void {
    if (this.state.orderId !== prevState.orderId) {
      this.setState({ rows: [], hasMoreRequests: true, currentPage: 1 }, ()=> this.allRequestAPI());
    }
    if(this.state.urgencyFilter !== prevState.urgencyFilter){
      this.setState({ rows: [], hasMoreRequests: true, currentPage: 1 ,priority:this.state.urgencyFilter}, ()=> this.allRequestAPI());
    }
  }

  getToken = () => {
    const tokenMsg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(tokenMsg);
  };

  handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const scrollHeight = event.currentTarget.scrollHeight;
    const clientHeight = event.currentTarget.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (this.state.hasMoreRequests && !this.state.loader) {
        this.loadMoreRequests();
      }
    }
  } 

  loadMoreRequests = async () => {
    if (this.state.hasMoreRequests) {
      this.setState({ loader: true, currentPage: this.state.currentPage + 1 });
      await this.allRequestAPI();
    }
  };

  getAllReceivedRequest = () => {
    const headers = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token,
    };

    const getAllRequestMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllReceivedRequestCallId = getAllRequestMsg.messageId;

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getReceivedRequestApiEndpoint
    );

    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getAllRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getReceivedRequestApiMethod
    );
    runEngine.sendMessage(getAllRequestMsg.id, getAllRequestMsg);
  };

  getNotaryServicesAPI = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.allservicesApiContentType,
      token: token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllNotaryTypeRequestId = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allNotaryServicesApiEndpoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.allServicesApiMethodType
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };

  updateRequestReview = (requestReviewId: string, is_accepted: boolean) => {
    const headers = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token,
    };

    if (!is_accepted && this.state.rejectText.length < 1) {
      this.setState({ rejectTextError: configJSON.rejectTextFieldIsRequired });
      return;
    }

    const httpBody = {
      is_accepted,
      ...(!is_accepted && {
        rejection_reason: this.state.rejectText,
      }),
    };

    const updateRequestReviewMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateRequestReviewCallId = updateRequestReviewMsg.messageId;

    updateRequestReviewMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.updateRequestApiEndpointStart +
        requestReviewId +
        configJSON.updateRequestApiEndpointEnd
    );

    updateRequestReviewMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    updateRequestReviewMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.updateRequestApiMethod
    );

    updateRequestReviewMsg.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(updateRequestReviewMsg.id, updateRequestReviewMsg);
  };

  deleteRequest = (deleteRequestId: string) => {
    const headers = {
      "Content-Type": configJSON.requestApiContentType,
      token: this.state.token,
    };

    const deleteRequestMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteRequestCallId = deleteRequestMsg.messageId;

    deleteRequestMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteRequestApiEndpoint + deleteRequestId
    );

    deleteRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    deleteRequestMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteRequestApiMethod
    );

    runEngine.sendMessage(deleteRequestMsg.id, deleteRequestMsg);
  };

  onChangeRejectText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rejectText: event.target.value });
  };

  onChangeTextRejectText = (rejectText: string) => {
    this.setState({ rejectText });
  };

  setSelectedId = (selectedId: string | null) => {
    this.setState({ selectedId, rejectText: "", rejectTextError: null });
  };

  
  navigateToRequestDetails (requestId: string , isSubmitQuote: boolean = false) {    
    sessionStorage.setItem('previousPage', window.location.pathname);
    setStorageData("fromPath", "RequestManagement");
    setStorageData("notaryRequestId", requestId);
    setStorageData("isSubmitQuoteOpen", isSubmitQuote);   
    this.props.navigation.navigate("RequestDetails", {id : requestId });
  }

  handletabItemChange = (event: React.ChangeEvent<{}>, newValue: number) => {    
    const rowsLookup: { [key: number]: Array<NotaryRequest> } = this.isNotaryUser()
    ?{
      0:this.state.newRequest,
      1:this.state.ongoingRequest,
      2:this.state.invitedRequest
    }
    :{
      0:this.state.newRequest,
      1:this.state.invitedRequest
    }
    this.setState({ value: newValue, rows:  rowsLookup[newValue] });
  };

  setModal = (value: boolean) => {
    this.setState({modalOpen: value})
  }

  closeModal = () => {
    this.setModal(!this.state.modalOpen);
    this.setState({ cancelReqModal: true });
  };

  noButtonClick = () => {
    this.setModal(!this.state.modalOpen);
    this.setState({ cancelReqModal: false });
  };

  yesButtonClick = () => {
    this.setState({cancelReqModal: false})
  };


  setIsNewRequestOrEditRequestOrInviteClient = (value: string, requestId: string = "") => {
    if(value === "new"){
      this.setState({
        isNewRequestOrEditRequestOrInviteClient: value,
      });
      this.setModal(true)
    } else {
      const stateKey = value === "invite"  ? "acceptedRequest" : "editRequest"; 
      this.setState((prevState) => ({
        ...prevState, 
        isNewRequestOrEditRequestOrInviteClient: value,
        [stateKey]: this.state.rows.find(row => row.id === requestId),
      }), () => this.setRequestModal(value));
    }
  }

  setRequestModal = (value:string) => {
    if(value === "invite"){
      this.setBookInvitedRequestModal(true);
    }else{
      this.setModal(true);
    }
  }


  handleActionBoxOpen = (indexValue: number) => {
    this.setState({ isActionBoxActive: true, actionBoxIndex: indexValue });
  };

  handleActionBoxClose = () => {
    this.setState({ isActionBoxActive: false, actionBoxIndex: null });
  };

  openCancelRequestModal = (requestId: string, requestStatus: string) => {
    this.setState({currentCancelRequest: requestId, cancelRequestStatus: requestStatus});
    if (requestStatus.toLowerCase() === "pending" || this.isRequestInDraft(requestStatus)) {
      this.setState({
        cancellationChargesErrorText: "",
        cancelNotaryRequestSubText: undefined,
        cancelNotaryRequestModal: true,
      })
    } else {
      this.setState({loader: true});
      this.getCancellationCharges();
    }
  }

  getCancellationCharges = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getCancellationChargesContentType,
      token: token
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
      configJSON.getCancellationChargesApiEndpointPart1 + this.state.currentCancelRequest + configJSON.getCancellationChargesApiEndpointPart2
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getCancellationChargesApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  cancelNotaryRequestNoButtonClick = () => {
    this.setState({
      cancelNotaryRequestModal: false, 
      currentCancelRequest: "",
      cancelRequestStatus: "",
      cancelNotaryRequestSubText: undefined,
      cancellationChargesErrorText: "",
    });
  };

  checkIfRequestIsCancelledOrNot = (message: string) => {
    if (message === "Notary request cancelled successfully.") this.allRequestAPI();
  }

  cancelNotaryrequest = async () => {
    let token = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.cancelNotaryRequestContentType,
      token: token
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
      configJSON.cancelNotaryRequestApiEndpointPart1 + this.state.currentCancelRequest + configJSON.cancelNotaryRequestApiEndpointPart2
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.cancelNotaryRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    this.setState({ 
      cancelNotaryRequestModal: false, 
      currentCancelRequest: "",
      cancelRequestStatus: "",
      cancelNotaryRequestSubText: undefined,
      cancellationChargesErrorText: "",
    });
  }

  dateReturn = (value : string | null) => {
    if (this.isEmptyOrNull(value)) return "-"
    let formattedDate =  moment(value).format("DD/MM/yyyy");
    return formattedDate;
   };

   findMainBoxWidth = () =>
    this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw";

  getProfile = async () => {
    this.getProfileApiCallID = await this.apiCall({
      contentType: configJSON.dashboarContentType,
      method: configJSON.dashboarApiMethodType,
      endPoint: configJSON.getProfileEndPoint
    });
  };

  openSideBar = () => {
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });
  };

  setBookNowModal = (value: boolean) => this.setState({ modalOpen: value });


  navigateHandler = () => {
    const navigationMsg = new Message(getName(MessageEnum.NavigationMessage));
    navigationMsg.addData(getName(MessageEnum.NavigationTargetMessage), "SentRequest");

    navigationMsg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    
    navigationMsg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(navigationMsg);
  };

  setViewRequest = (viewRequest: IRequest) => {
    this.setState({viewRequest})
  }

  closeViewModal = () => {
    this.setState({viewRequest: null})
  }

  setLoader = (value: boolean) => {
    this.setState({loader: value})
  }

  onChangeFilterKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterKey: event.target.value });
  };

  onChangeTextFilterKey = (filterKey: string) => {
    this.setState({ filterKey });
  };

  findDateColor = (notaryRequest : NotaryRequest) => {
    if (this.isEmptyOrNull(notaryRequest.attributes.date)) return "#011342"
    const receivedDate = new Date(notaryRequest.attributes.date);
    const dateToday = new Date();
    receivedDate.setHours(0,0,0,0);
    dateToday.setHours(0,0,0,0);
    return receivedDate < dateToday && this.isEndUser() && (this.isRequestStatusPending(notaryRequest.attributes.status) || this.isRequestStatusInProgress(notaryRequest.attributes.status) || this.isRequestInDraft(notaryRequest.attributes.status) || (this.shouldShowInvited() && this.isRequestInInvited(notaryRequest.attributes.invited_request_status))) ? "red" : "#011342"
  }

  isRequestStatusPending = (requestStatus: string) => requestStatus.toLowerCase() === "pending";

  isRequestStatusInProgress = (requestStatus: string) =>
    requestStatus.toLowerCase() === "in progress";

  isRequestInDraft = (status: string) => status.toLowerCase() === "draft";

  isEndUser = () => this.state.roleID === 1;

  isNotaryUser = () => this.state.roleID === 2;

  isRequestInInvited = (status: string | null) => status !== null && status.toLowerCase() === "invite";

  isRequestInAccepted = (status: string | null) => status !== null && status.toLowerCase() === "accepted";

  isRequestInRejected = (status: string | null) => status !== null && status.toLowerCase() === "rejected";
  
  isEditActionButtonShown = (notaryRequest: NotaryRequest) => this.isEndUser() && (this.isRequestStatusPending(notaryRequest.attributes.status) || this.isRequestInDraft(notaryRequest.attributes.status)) && !this.shouldShowInvited();

  isCancelActionButtonShown = (notaryRequest: NotaryRequest) => {
    if(this.isEndUser() && !this.shouldShowInvited()){
      return (
        this.isRequestStatusPending(notaryRequest.attributes.status) || 
        this.isRequestStatusInProgress(notaryRequest.attributes.status) ||
        this.isRequestInDraft(notaryRequest.attributes.status)
      )
    }
  }

  isAcceptRejectActionButtomShown = (request:NotaryRequest) => {
    if(this.isEndUser() && this.shouldShowInvited()){
      return (this.isRequestInInvited(request.attributes.invited_request_status));
    }
  }

  isMessageActionButtonShown = (notaryRequest: NotaryRequest) => this.isRequestStatusInProgress(notaryRequest.attributes.status);

  isMeetingActionButtonShown = (notaryRequest: NotaryRequest) => this.isRequestStatusInProgress(notaryRequest.attributes.status);

  isSubmitQuoteActionButtonShown = (notaryRequest: NotaryRequest) => this.isNotaryUser() && (notaryRequest.attributes.quote_statuses_id === 2 || notaryRequest.attributes.quote_statuses_id === null) && !this.shouldShowInvited();

  isWithdrawQuoteActionButtonshown = (notaryRequest: NotaryRequest) => this.isNotaryUser() && notaryRequest.attributes.quote_statuses_id === 1  && !this.shouldShowInvited();

  
  inValidResponses = (responseJson: ValidResponseType) => {
    return responseJson &&  responseJson.errors;
  }
  isValidResponse = (responseJson: ValidResponseType) => {
    if(responseJson.status !== 500){
    return responseJson && !responseJson.errors;
    }
  }

  responseSuccessCallBack = (apiRequestCallId: string, responseJson: EndUserNotaryRequest 
    & GetAllRequest 
    & GetAllServices  
    & CancelNotaryRequest 
    & CompleteProfileDataApiRes
    & CancellationCharge 

   ) => {    
    if(apiRequestCallId === this.getServicesApiCallId) { 
      this.setState({ serviceData: responseJson.data })
    }
    if( apiRequestCallId === this.getProfileApiCallID){
        this.setState({ userName: responseJson.data.attributes.full_name, 
          roleID: responseJson.data.attributes.role_id, 
          userProfilePic: responseJson.data.attributes.photo?.url, 
          phoneNumber: responseJson.data.attributes.full_phone_number,
          userType:responseJson.data.attributes.user_type}, this.allRequestAPI);
    }

    if (apiRequestCallId === this.getAllNotaryRequestsCallId) {
      this.handleAllNotaryRequestRes(responseJson,this.state.orderId,this.state.urgencyFilter)
    }

    if(apiRequestCallId === this.getAllNotaryTypeRequestId) { 
        this.setState({notaryType:responseJson.data})
    }

    if (apiRequestCallId === this.putCancelNotaryRequestCallId) {
      if (responseJson.message) {
        this.allRequestAPI();
      }
    }
    if (apiRequestCallId === this.getCancellationChargesApiCallId){
      this.setState({
        loader: false,
        cancellationChargesErrorText: "",
        cancelNotaryRequestModal: true, 
        cancelNotaryRequestSubText: `Cancellation charges will be applied of £${parseFloat(responseJson.cancellation_charges.toString()).toFixed(2)}`,
      });
    }
    if(apiRequestCallId === this.completeProfileApiCallId){
      this.handleCompleteProfileInfo(responseJson.data)
    }    
    this.handleRejectRequestRes(responseJson , apiRequestCallId);    
   }
  
    apiCall = async (apiData: ApiCallInterface) => {
      let token = await getStorageData("token");
       const { contentType, method, endPoint, body } = apiData;
       const header = {
           "Content-Type": contentType,
            token: token
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

    allRequestAPI = async () => {
      this.setState({loader: true});
      let startDate = "";
      let endDate = "";

      const {dateType, selectedDate, handleRequestButton, customerRequestButtons,urgencyFilter  } = this.state;
      const orderId = this.state.orderId === "" ? this.state.orderId : '';
      const requestStatus = handleRequestButton ? customerRequestButtons[handleRequestButton].toUpperCase() : "";
      
      if (selectedDate) {
        const firstDate = selectedDate[0];
        if (firstDate instanceof Date) {
          startDate = firstDate.toISOString();
        }
      }
      
      if (selectedDate) {
        const secondDate = selectedDate[1];
        if (secondDate instanceof Date) {
          endDate = secondDate.toISOString();
        }
      }
      
      const queryParams = new URLSearchParams({
        page: this.state.currentPage.toString(),
        per_page: "20",
        order_id: orderId,
        service_type: this.state.notary.toString(),
        request_status: requestStatus,
        urgency_level: urgencyFilter,
      });
      
      if (dateType === "Request Date") {
        queryParams.append("request_date_start", startDate);
        queryParams.append("request_date_end", endDate);
      } else if (dateType === "Completion Date") {
        queryParams.append("completion_date_start", startDate);
        queryParams.append("completion_date_end", endDate);
      }
      
      this.getAllNotaryRequestsCallId = await this.apiCall({
        contentType: configJSON.dashboarContentType,
        method: configJSON.dashboarApiMethodType,
        endPoint: configJSON.getAllNotaryRequestApiEndpoint
      });
    };

    getServicesAPI = async () => {
      this.getServicesApiCallId = await this.apiCall({
        contentType: configJSON.dashboarContentType,
        method: configJSON.dashboarApiMethodType,
        endPoint: configJSON.allServiceApiEndpoint
      });
    };
  
    completeProfileInfo = async () => {
      this.completeProfileApiCallId = await this.apiCall({
        contentType: configJSON.dashboarContentType,
        method: "GET",
        endPoint: "bx_block_profile/complete_profile"
      });
    };

  findToolTiptext = (idOfMethod: number | null) => {
    if(this.isEmptyOrNull(idOfMethod)) return "No information available";
    switch (idOfMethod) {
      case 1:
        return "Remote Electronic Notarisation (Fully Automated and e-signatures)";
      case 2:
        return "Remote Ink Notarisation (Completely Manual; User and Notary signs it physically)";
      default:
        return "Remote Electronic Ink Notarisation (Partially Automated; User digitally signs it and Notary signs it physically)";
    }
  };

  isEmptyOrNull = (value:any) => {
    return(
      value === ""|| value === undefined || value === null || value === "null"
    )
  }

  getValuesForNullOrDraft = (value:any) =>{
    if(this.isEmptyOrNull(value)) return "-";
    return value;
  }

  getUrgencyClass = (urgency: string | null | undefined ) => {
    if (this.isEmptyOrNull(urgency)) return "draft";
    urgency = urgency?.toLowerCase();
    switch (urgency) {
      case "super priority":
        return "superPriority";
      case "priority":
        return "priority";
      case "standard":
        return "standard";
      default:
        return "";
    }
  };
  
  getStatusClass = (status: string) => {
    switch (status) {
      case "IN PROGRESS":
        return "inprogress";
      case "COMPLETED":
        return "completed";
      case "PENDING":
        return "pending";
      case "CANCELLED":
        return "cancelled";
      case "DRAFT":
        return "draftStatus";
      case "INVITED":
      case "INVITE":
        return "invited";
      case "ACCEPTED":
        return "accepted";
      case "REJECTED":
        return "rejected";
      default:
        return "";
    }
  };
  
  getNotarisationMethod = (idOfMethod: number | null) => {
    if(this.isEmptyOrNull(idOfMethod)) return "-";
    switch (idOfMethod) {
      case 1:
        return "REN";
      case 2:
        return "RIN";
      default:
        return "REIN";
    }
  };

    handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      this.setState({orderId: value}, () => this.allRequestAPI());
    }


    handleDateTypeChange = (event:any)=>{
         this.setState({dateType:event.target.value})
    }

    handleUrgencyLevel = (button :string)=>{
         this.setState({priority:button})
    }


    handleRequestButtons = (index :number | null)=>{
       this.setState({handleRequestButton:index})
    }

    handleNotaryChange = (event :any)=>{
      this.setState({notary:event.target.value})
    }

    handleReset = ()=>{
      const {selectedDate, dateType, notary} = this.state;
      if(selectedDate || dateType || notary){
        this.setState({
          notary:"",
          priority:'',
          handleRequestButton:null,
          dateType:'',
          selectedDate:null,
          tempDate: null,
          calendarOpen: false,
          urgencyFilter:''
        }, ()=> this.allRequestAPI());
      }else {
        this.setState({
          notary:"",
          priority:'',
          handleRequestButton:null,
          dateType:'',
          selectedDate:null,
          tempDate: null,
          calendarOpen: false,
          urgencyFilter:''
        });
      }
      
    }
   
     
    handleAllNotaryRequestRes = (
      responseJson: any,
      searchInput: string,
      filterCriteria: any
    ) => {
      if (this.isNoRequestsAvailable(responseJson)) {
        this.setState({ noFilterResult: true, rows: [],loader:false });
        return;
      }
    
      const requests = this.extractRequests(responseJson);
      const filteredRequests = this.filterRequests(requests, searchInput, filterCriteria);
    
      this.updateStateWithFilteredRequests(filteredRequests);
    };
    
   
    isNoRequestsAvailable = (responseJson: any): boolean => {
      
      return (
        responseJson.message &&
        responseJson.message === "There are no requests available for chosen filters."
      );
    };
    
   
    extractRequests = (responseJson: any) => {
      const isEndUser = this.isEndUser();
      return {
        newRequests: isEndUser
          ? responseJson.end_user_notary_requests?.data || []
          : responseJson.new_notary_requests?.data || [],
        ongoingRequests: responseJson.notary_ongoing_requests?.data || [],
        invitedRequest: responseJson.invite_request?.data || [],
      };
    };
    
   
    filterRequests = (
      { newRequests, ongoingRequests, invitedRequest }: any,
      searchInput: string,
      filterCriteria: any
    ) => {
      const filterBySearch = (requests: Array<any>) =>
        !searchInput
          ? requests
          : requests.filter(request =>
              request.id.toLowerCase().includes(searchInput.toLowerCase())
            );
    
      const filterByCriteria = (requests: Array<any>) =>
        requests.filter(request => {
          const { status, notaryService, priority, startDate, endDate } = filterCriteria;
          const attributes = request.attributes;
    
          return (
            (!status || attributes.status === status) &&
            (!notaryService || attributes.notary_service_name === notaryService) &&
            (!priority || attributes.priority === priority) &&
            (!startDate || !endDate ||
              (new Date(attributes.date) >= new Date(startDate) &&
                new Date(attributes.date) <= new Date(endDate)))
          );
        });
    
      return {
        filteredNewRequests: filterByCriteria(filterBySearch(newRequests)),
        filteredOngoingRequests: filterByCriteria(filterBySearch(ongoingRequests)),
        filteredInvitedRequests: filterByCriteria(filterBySearch(invitedRequest)),
      };
    };
    
    
    updateStateWithFilteredRequests = ({
      filteredNewRequests,
      filteredOngoingRequests,
      filteredInvitedRequests,
    }: any) => {
      const isNotaryUser = this.isNotaryUser();
      let hasFilteredResults:boolean;
      if(this.state.value === 1){
        hasFilteredResults = filteredInvitedRequests.length > 0;
      }else{
        hasFilteredResults = filteredNewRequests.length > 0 || filteredOngoingRequests.length > 0
      }
        const keyForRow: { [key: number]: Array<any> } = isNotaryUser
        ? {
            0: filteredNewRequests,
            1: filteredOngoingRequests,
            2: filteredInvitedRequests,
          }
        : {
            0: filteredNewRequests,
            1: filteredInvitedRequests,
          };
    
      this.setState((prevState) => ({
        ongoingRequest: [...prevState.ongoingRequest, ...filteredOngoingRequests],
        invitedRequest: [...prevState.invitedRequest, ...filteredInvitedRequests],
        newRequest: [...prevState.newRequest, ...filteredNewRequests],
        rows:  [...prevState.rows, ...keyForRow[this.state.value]],
        loader: false,
        hasMoreRequests: hasFilteredResults,
        noFilterResult: !hasFilteredResults,
      }));
    };

    
    handleCompleteProfileInfo = (responseJson: CompleteProfileData) => {
      const {is_phone_number, is_address, is_notary_service} = responseJson;
      if(is_phone_number && is_address && is_notary_service){
        this.setState({isUserActive: true});
      }
      this.setState({completeProfileData: responseJson})
    }

    isActiveNotaryUser = () => this.isNotaryUser() && this.state.isUserActive;

    handleDateChange = (date: any) => {
      if (Array.isArray(date)) {
        this.setState({ tempDate: [new Date(date[0]), new Date(date[1])]});
      }
    };
  
    openCalendar = () => {
      this.setState({calendarOpen: true});
    };
  
    formatDateRange = (dateRange: [Date, Date] | null) => {
      if (dateRange && dateRange.length === 2) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
        const startDate = dateRange[0].toLocaleDateString('en-GB', options);
        const endDate = dateRange[1].toLocaleDateString('en-GB', options);
        return `${startDate} - ${endDate}`;
      }
      return 'Date';
    };

    handleApplyFilter = () => {
      const {selectedDate, dateType, notary} = this.state;
      if(notary && dateType && selectedDate){
      this.setState({ 
        rows: [], 
        hasMoreRequests: true, 
        currentPage: 1, 
        openFilterPopup: false ,
        urgencyFilter:this.isEmptyOrNull(this.state.priority) ? "" : this.state.priority
      }, 
        ()=> this.allRequestAPI()
      );
    }
    }

    getBackgroundColor = () => {
      const {selectedDate, dateType, notary} = this.state;
      if(notary && dateType && selectedDate){
        return "#012275";
      }else return '#CCD3E3';
    }

    handleOpenFilter = () => {
      this.setState({openFilterPopup: true})
    }

    handleCloseFilter = () => {
      this.setState({
        notary:"",
        handleRequestButton:null,
        dateType:'',
        selectedDate:null,
        tempDate: null,
        calendarOpen: false
      })
      this.setState({openFilterPopup: false});
    }

    handleCalendarCancelBtn = () => {
      this.setState({
        calendarOpen: false,
        tempDate: null
      });
    }

    handleCalendarSaveBtn = () => {
      if(this.state.tempDate && this.state.tempDate.length===2){
        this.setState({ 
          selectedDate: [this.state.tempDate[0], this.state.tempDate[1]], 
          calendarOpen: false,
          tempDate: null
        });
      }
    }

    handleUrgencyFilterStatus = (status:string)=>{
      if(status === this.state.urgencyFilter){
        this.setState({urgencyFilter:''})
      }else{
        this.setState({urgencyFilter:status})
      }
    }

    getZoomApi = async () => {
      const notaryRequestID = await getStorageData("notaryRequestId")
      this.zoomCallId = await this.apiCall({
        method: configJSON.validationApiMethodType,
        contentType: configJSON.validationApiContentType,
        endPoint: configJSON.zoomEndPoint + notaryRequestID
      });
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
            window.open(window.location.origin+"/MeetSDK", "_blank");
        }
    );
  };

  shouldShowInvited = () =>  { 
    return(this.state.value === 2 && this.isNotaryUser()) || (this.state.value === 1 && this.isEndUser())
  };   

  getStatusKey = () => {
    const shouldShowInvited = this.shouldShowInvited();    
    return shouldShowInvited ? "invited_request_status" : "status" 
  }

  getStatusForRequests = (attributes: Attributes) => {    
    const requestStatus = this.getStatusKey() as "status" | "invited_request_status";    
    const status = this.isRequestInInvited(attributes[requestStatus]) ? "invited" : attributes[requestStatus] || "";  
    return status ==="invited" ? (this.isEndUser() ? "invite" : "invited")  : status;
  }

  rejectInvitedRequest = async(request:NotaryRequest) => {
    this.setState({
      isRequestAccepted : false,
      rejectRequestModal : true,
      rejectedRequest : request,
    });   
  }

  rejectRequest = async() => {
    const {rejectedRequest} = this.state;
    const request = rejectedRequest;
    this.rejectRequestCallId = await this.apiCall({
      contentType: configJSON.getAllRequestContentType,
      method: configJSON.postMethod,
      endPoint: configJSON.newNotaryEndPoint + `/${request?.id}/` + configJSON.rejectRequestAPIEndPoint,
    });
  }

  handleRejectRequestRes = (res: RejectRequestResponse , apiRequestCallId:string) => {    
    if ( apiRequestCallId !== this.rejectRequestCallId) return;
    const resetState = {
      isSuccessFailModalOpen: false,
      successFailModalImage: "",
      successFailModalText: "",
      successFailModalTextColor: "",
      successFailModalSubText: "",
      successFailModalButtonText: "",
    };
    const commonState = {
      rejectRequestModal: false,
      rejectedRequest: undefined,
      isSuccessFailModalOpen: true,
    };
    this.setState({
      ...commonState,
      successFailModalImage: res.error ? failureImage : successImage,
      successFailModalText: res.error ? "Request rejection Failed" : "Request rejected successfully",
      successFailModalTextColor: res.error ? "#FF0000" : "",
      successFailModalSubText: res.error ? res.error : "",
      successFailModalButtonText: res.error ? "OK" : "",
    }, () => {
      setTimeout(() => this.setState(resetState), 3000);
      this.allRequestAPI();
    });
  };

  closeRejectRequestModal = () => {
    this.setState({ 
      rejectRequestModal: false,
      rejectedRequest:undefined
     });
  }

  setBookInvitedRequestModal = (value: boolean) => this.setState({isRequestAccepted: value});

  closeInviteRequestModal = () => {
    this.setBookInvitedRequestModal(!this.state.isRequestAccepted);
    this.setState({ cancelReqModal: true });
  };

  inviteRequestModalNoButtonClick = () => {
    this.setBookInvitedRequestModal(!this.state.isRequestAccepted);
    this.setState({ cancelReqModal: false });
  };


  // Customizable Area End
}
