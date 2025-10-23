import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

export const configJSON = require("./config");

// Customizable Area Start
import React from "react";
import { getStorageData } from "../../../framework/src/Utilities";
import moment from "moment";
import {
  format,
  addDays,
  getDay,
  subMonths,
  addMonths,
  parseISO,
} from "date-fns";
import { failureImage } from "./assets";

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
}

interface ValidateResponseType {
  message: object;
  error: string;
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
  };
}

interface RecipientErrors {
  nameErr: boolean;
  emailErr: boolean;
  emailInvalidErr: boolean;
}

interface Document {
  id: number;
  isfileMax: boolean;
  isInvalidSize: boolean;
  document?: File | null;
  base64: string;
  doc_size: number;
  ellapsed: boolean;
  recipients_attributes: Recipient[];
}

interface Recipient {
  name: string;
  email: string;
  is_signatory: boolean;
}

type PriorityType =
  | "Standard"
  | "Priority"
  | "Super Priority"
  | "Not Available";

interface Priorities {
  [key: string]: PriorityType;
}

export interface NotarisationMethod {
  id: number;
  notarisation_method: string;
  created_at: string;
  updated_at: string;
}

export interface Juridiction {
  id: number;
  jurisdiction: string;
  created_at: string;
  updated_at: string;
}

interface NotaryRequest {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
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
  file_documents: FileDocumentsEntity[];
  juridiction: Juridiction;
  notarisation_method: NotarisationMethod;
  quote_statuses_id: number;
}

interface FileDocumentsEntity {
  doc_id: number;
  doc_type: string;
  doc_size: number;
  doc_base_64: string;
  doc_name: string;
  doc_file_url: string;
  signatory_count: number;
  recipients?: RecipientsEntity[] | null;
}

interface RecipientsEntity {
  id: number;
  created_at: string;
  updated_at: string;
  file_document_id: number;
  name: string;
  email: string;
  is_signatory: boolean;
  signed: boolean;
  is_notary: boolean;
}

interface Relationships {
  jurisdiction: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
  notary: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
  notarisation_method: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
  account: JurisdictionOrNotaryOrNotarisationMethodOrAccount;
}
interface JurisdictionOrNotaryOrNotarisationMethodOrAccount {
  data: Data | null;
}
interface Data {
  id: string;
  type: string;
}
interface PriorityMethod {
  priority: number;
  date: any;
}
type PriorityMethodArray = PriorityMethod[];
interface DateRange {
  firstDay: string;
  lastDay: string;
}

interface PhotoData {
  url: string;
}

interface ProfileAttributes {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_phone_number: string;
  city: string;
  post_code: string;
  country_code: number;
  phone_number: number;
  email: string;
  activated: boolean;
  user_type: string;
  user_name: string | null;
  platform: string | null;
  rating: number;
  suspend_until: string | null;
  status: string;
  role_id: number;
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  age: number | null;
  country: string;
  address: string;
  address_line_2: string | null;
  contact_name: string;
  company_name: string;
  is_online: boolean;
  device_id: string | null;
  photo: PhotoData;
  total_notaries: number;
}

interface ProfileData {
  id: string;
  type: string;
  attributes: ProfileAttributes;
}

interface ProfileResponse {
  data: ProfileData;
}

export interface CountryDataObject {
  country_code: string,
  name: string
}

interface CountryData {
  country_code: string;
  name: string;
  flag: string;
}

interface CountryResponse {
  countries: CountryData[];
}

// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  isOpen: boolean;
  closeModal: () => void;
  allRequestAPI?: () => void;
  serviceData: Array<DataofService>;
  cancelReqModal: boolean;
  yesButtonClick: () => void;
  noButtonClick: () => void;
  backToEditRequest: () => void;
  isNewRequestOrEditRequestOrInviteClient: string;
  editRequest: NotaryRequest | undefined;
  setLoader: (value: boolean) => void;
  setModal: (value: boolean) => void;
  acceptedRequest?: NotaryRequest;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isSignatoryAvailable: boolean[];
  onStep: number;
  selectedService: string;
  isSelectService: boolean;
  selectedMethod: string;
  isSelectedMethod: boolean;
  selectedDate: Date | null;
  tempSelectedDate: Date | null;
  tempSelectedSession: string;
  selectedSession: string;
  isCalendarOpen: boolean;
  currentMonth: Date;
  priorities: { [key: string]: PriorityType };
  isSelectedDate: boolean;
  isCorrectDate: boolean;
  additionalDetails: string;
  selectedJuridiction: string;
  isSelectedJuridiction: boolean;
  totalDocuments: number;
  isValidDocument: boolean;
  isDocument: boolean;
  files: Document[];
  documentErrors: boolean[];
  termOneError: boolean;
  checkboxOne: boolean;
  termTwoError: boolean;
  checkboxTwo: boolean;
  recipientErrors: RecipientErrors[][];
  saveModal: boolean;
  priorityName: string;
  juridiction: Array<Juridiction>;
  notarisationMethod: Array<NotarisationMethod>;
  loader: boolean;
  clientAddress1:string;
  clientAddress2:string | null;
  city : string;
  postCode : string;
  isClientAddress1:boolean;
  isCity:boolean;
  isPostCode:boolean;
  isDrafted:boolean;
  isCreatingRequest:boolean;
  clientFullName:string;
  clientEmail:string;
  clientPhoneNumber:number | string;
  clientCountryCode:number | string;
  clientCountryName:string;
  isClientFullName:boolean;
  isClientEmail:boolean;
  isClientPhoneNumber:boolean;
  countryCodes: Array<CountryDataObject>;
  loginSignupPopup: boolean;
  isLoginNavigateModalOpen: boolean,
  loginNavigateModalImage: string,
  loginNavigateModalText: string,
  loginNavigateModalTextColor: string | undefined,
  loginNavigateModalSubText: string,
  loginNavigateModalSubTextTwo: string,
  loginNavigateModalButtonText: string,
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class BookNotaryRequestController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPriorityTimeoutId: any;
  getPriorityCallId: string | null = "";
  createRequestCallId: string | null = "";
  getJurisdictionCallId: string | null= "";
  getNotarisationMethodCallId: string | null= "";
  getProfileCallId: string | null= "";
  acceptRequestCallId: string | null= "";
  getCountryCodeApiCallID: string | null="";
  postGuestRequestApiCallId: string | null="";
  validateGuestEmailCallId:string | null = "";
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
      isSignatoryAvailable: [],
      onStep: 1,
      selectedService: "",
      tempSelectedDate: null,
      tempSelectedSession: "",
      isSelectService: false,
      selectedMethod: "",
      isSelectedMethod: false,
      selectedDate: null,
      selectedSession: "",
      isCalendarOpen: false,
      currentMonth: new Date(),
      priorities: {},
      isSelectedDate: false,
      isCorrectDate: false,
      additionalDetails: "",
      selectedJuridiction: "",
      isSelectedJuridiction: false,
      totalDocuments: 0,
      isValidDocument: false,
      isDocument: false,
      files: [],
      documentErrors: [],
      termOneError: false,
      checkboxOne: false,
      termTwoError: false,
      checkboxTwo: false,
      recipientErrors: [],
      saveModal: false,
      priorityName: "",
      notarisationMethod: [],
      juridiction: [],
      loader: false,
      clientAddress1: "",
      clientAddress2: "",
      city: "",
      postCode: "",
      isClientAddress1: false,
      isCity: false,
      isPostCode: false,
      isDrafted: false,
      isCreatingRequest: false,
      clientFullName:"",
      clientEmail:"",
      clientPhoneNumber:"",
      clientCountryCode:"44",
      clientCountryName:"",
      isClientFullName:false,
      isClientEmail:false,
      isClientPhoneNumber:false,
      countryCodes:[],
      loginSignupPopup:false,
      isLoginNavigateModalOpen: false,
      loginNavigateModalImage: "",
      loginNavigateModalText: "",
      loginNavigateModalTextColor: "",
      loginNavigateModalSubText: "",
      loginNavigateModalSubTextTwo:"",
      loginNavigateModalButtonText: "",
            // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const callId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let res = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorRes = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      console.log(`🔍 BookNotaryRequest API Response for callId ${callId}:`, {
        success: !!res,
        error: !!errorRes,
        response: res,
        errorResponse: errorRes
      });

      if (this.isValidResponse(res)) {
        console.log(`✅ BookNotaryRequest API Success for callId ${callId}`);
        switch (callId) {
          case this.validateGuestEmailCallId:
              this.handleResponse(res);
              break;
          case this.createRequestCallId:
            console.log("🎉 Request created successfully:", res);
            this.setState({ isCreatingRequest: false });
            this.props.setLoader(false);
            this.props.setModal(false);
            this.setState(
              {
                onStep: 1,
                selectedMethod: "",
                selectedDate: null,
                selectedJuridiction: "",
                selectedService: "",
                totalDocuments: 0,
                additionalDetails: "",
                files: [],
                selectedSession: "",
                checkboxOne: false,
                checkboxTwo: false,
                saveModal: true,
              },
              () => {
                this.props.allRequestAPI && this.props.allRequestAPI();
              }
            );
            break;
          case this.acceptRequestCallId:
          case this.postGuestRequestApiCallId:
            this.props.setLoader(false);
            this.props.setModal(false);
            this.setState(
              {
                onStep: 1,
                selectedMethod: "",
                selectedDate: null,
                selectedJuridiction: "",
                selectedService: "",
                totalDocuments: 0,
                additionalDetails: "",
                files: [],
                selectedSession: "",
                checkboxOne: false,
                checkboxTwo: false,
                saveModal: true,
              },
              () => {
                this.props.allRequestAPI && this.props.allRequestAPI();
              }
            );
            break;
          case this.getJurisdictionCallId:
            this.setState({ juridiction: res });
            break;
          case this.getNotarisationMethodCallId:
            this.setState({ notarisationMethod: res });
            break;
          case this.getPriorityCallId:
            clearTimeout(this.getPriorityTimeoutId);
            if (this.isPriorityMethodArray(res)) this.handlePrioritySet(res);
            break;
          case this.getCountryCodeApiCallID:
            this.handleCountryCode(res);
            break;
          case this.getProfileCallId:
            this.handleProfileResponse(res);
            break;
            
        }
      } else {
        console.error(`❌ BookNotaryRequest API Error for callId ${callId}:`, {
          response: res,
          errorResponse: errorRes,
          errors: res?.errors,
          error: res?.error
        });

        // Handle specific API errors
        if (callId === this.createRequestCallId) {
          console.error("🚨 REQUEST CREATION FAILED!");
          this.setState({ isCreatingRequest: false });
          this.props.setLoader(false);
          this.setState({
            saveModal: false,
            failureModal: true,
            failureModalText: res?.errors || res?.error || "Failed to create request. Please try again."
          });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getProfile();
    this.getJurisdictions();
    this.getNotarisationMethods();
    this.countryCodeAPI()
    this.getPriorityApi(this.getDateRangeFromMonth(new Date()));
  }

  getDateRangeFromMonth(month: Date) {
    const today = new Date();
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    let firstDay,lastDay;

    if (year === today.getFullYear() && monthIndex === today.getMonth()) {
      firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split("T")[0];
      lastDay = new Date(year, monthIndex + 1, 0).toISOString().split("T")[0];
    } else {
      firstDay = new Date(year, monthIndex, 1).toISOString().split("T")[0];
      lastDay = new Date(year, monthIndex + 1, 0).toISOString().split("T")[0];
    }
    return { firstDay, lastDay };
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<S>,
    snapshot?: SS | undefined
  ): void {
    if (
      prevProps.isOpen !== this.props.isOpen &&
      this.props.editRequest !== undefined
    ) {
      this.editRequestStateSetter();
          }
    else if ( prevProps.isOpen !== this.props.isOpen && this.props.acceptedRequest !== undefined){
      this.acceptRequestStateSetter();
    }
  }

  acceptRequestStateSetter = () => {
    const {acceptedRequest} = this.props;
    if(acceptedRequest){
      this.setState({
        selectedService: !this.isEmpty(acceptedRequest.attributes.notary_service_type) ? acceptedRequest.attributes.notary_service_type.toString() : "",
        selectedMethod:!this.isEmpty(acceptedRequest.attributes.notarisation_method_id) ?acceptedRequest.attributes.notarisation_method_id.toString() : "",
        selectedDate: !this.isEmpty(acceptedRequest.attributes.date) ? new Date(acceptedRequest.attributes.date) : null,
        tempSelectedDate: !this.isEmpty(acceptedRequest.attributes.date) ? new Date(acceptedRequest.attributes.date) : null,
        selectedSession: acceptedRequest.attributes.timing_slot,
        tempSelectedSession: acceptedRequest.attributes.timing_slot,
        additionalDetails: acceptedRequest.attributes.notes,
        selectedJuridiction: !this.isEmpty(acceptedRequest.attributes.jurisdiction_id) ?  acceptedRequest.attributes.jurisdiction_id.toString() : "",                
        priorityName: !this.isEmpty(acceptedRequest.attributes.priority) ? acceptedRequest.attributes.priority : "",
      });
    }
  }

  editRequestStateSetter = () => {
    const { editRequest } = this.props;
    if(editRequest !== undefined){      
      let transformedFiles = editRequest.attributes?.file_documents?.length > 0 ? editRequest.attributes.file_documents.map(
        (item) => ({
          id: item.doc_id,
          isfileMax: false,
          isInvalidSize: false,
          document: new File([], item.doc_name, { type: item.doc_type }),
          base64: item.doc_base_64,
          doc_size: item.doc_size,
          ellapsed: false,
          recipients_attributes: item.recipients
            ? item.recipients.map((recipient) => ({
              name: recipient.name,
              email: recipient.email,
              is_signatory: recipient.is_signatory,
            }))
            : [],
        })
      ) : [];
      const editTotalDocument = editRequest.attributes?.notarised_document;
      this.setState({
        selectedService: !this.isEmpty(editRequest.attributes.notary_service_type) ? editRequest.attributes.notary_service_type.toString() : "",
        selectedMethod:!this.isEmpty(editRequest.attributes.notarisation_method_id) ?editRequest.attributes.notarisation_method_id.toString() : "",
        selectedDate: !this.isEmpty(editRequest.attributes.date) ? new Date(editRequest.attributes.date) : null,
        tempSelectedDate: !this.isEmpty(editRequest.attributes.date) ? new Date(editRequest.attributes.date) : null,
        selectedSession: editRequest.attributes.timing_slot,
        tempSelectedSession: editRequest.attributes.timing_slot,
        additionalDetails: editRequest.attributes.notes,
        selectedJuridiction: !this.isEmpty(editRequest.attributes.jurisdiction_id) ?  editRequest.attributes.jurisdiction_id.toString() : "",
        totalDocuments: editTotalDocument === undefined ? 0 : editTotalDocument,
        files: transformedFiles,
        priorityName: !this.isEmpty(editRequest.attributes.priority) ? editRequest.attributes.priority : "",
      });
    }

  }

  isValidResponse = (res: ValidResponseType) => res && !res.errors;

  handleBack = () => {
    if (this.isOnStep1()) this.props.closeModal();
    else
      this.setState((prevState) => ({
        onStep: prevState.onStep - 1,
        checkboxOne: false,
        checkboxTwo: false,
      }));
  };

  tokenRequiredForApi = (endpoint: string | undefined) => {
    const publicApiEndpoints = [
      configJSON.allServicesApiEndpoint,
      configJSON.getjuridictionAPIEndPoint,
      configJSON.getNotrisationMetodEndpoint,
      configJSON.getPriorityAPIEndPoint,
      configJSON.countryCodeAPIEndPoint,
      configJSON.postGuestRequestApiEndPoint,
      configJSON.validateGuestEmailEndPoint
    ]
    if(endpoint ){      
      let baseEndpoint = endpoint.split('?')[0];
      return !publicApiEndpoints.some(publicEndpoint => baseEndpoint.includes(publicEndpoint));
    }
  };

  validateToken = async () => {
    const token = await getStorageData("token");
    if (!token) {
      console.error("❌ No authentication token found");
      return false;
    }
    
    // Check if token is expired (basic JWT decode)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        console.error("❌ Authentication token has expired");
        return false;
      }
      console.log("✅ Token is valid, expires at:", new Date(payload.exp * 1000));
      return true;
    } catch (error) {
      console.error("❌ Invalid token format:", error);
      return false;
    }
  };

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint, body } = apiData;

    console.log(`🚀 BookNotaryRequest API Call:`, {
      endpoint: endPoint,
      method: method,
      hasToken: !!token,
      tokenLength: token?.length || 0,
      body: body ? JSON.stringify(body).substring(0, 200) + '...' : 'No body'
    });

    if (this.tokenRequiredForApi(endPoint)) {
      if (!token) {
        console.error("❌ BookNotaryRequest API Call Failed: No token available for protected endpoint");
        this.setState({loader:false})    
        return null;
      }
      
      // Validate token before making the call
      const isValidToken = await this.validateToken();
      if (!isValidToken) {
        console.error("❌ BookNotaryRequest API Call Failed: Invalid or expired token");
        this.setState({loader:false})    
        return null;
      }
    }

    const header = {
      "Content-Type": contentType,
      token: token,
    };

    console.log(`📤 BookNotaryRequest API Request Headers:`, header);

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
    
    console.log(`📨 BookNotaryRequest Sending message with ID: ${requestMessage.messageId}`);
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };

  countryCodeAPI = async() => {
    this.getCountryCodeApiCallID = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint: configJSON.countryCodeAPIEndPoint
    });
  };

  getJurisdictions = async () => {
    this.getJurisdictionCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint: configJSON.getjuridictionAPIEndPoint,
    });
  };

  getProfile = async () => {
    this.getProfileCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint: configJSON.getProfileEndPoint,
    });
  };

  getNotarisationMethods = async () => {
    this.getNotarisationMethodCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint: configJSON.getNotrisationMetodEndpoint,
    });
  };

  createRequestEndPoint = (isDraft:boolean) => {
    const { isNewRequestOrEditRequestOrInviteClient , editRequest } = this.props;
    switch( isNewRequestOrEditRequestOrInviteClient){
      case "new":
        if (isDraft){
          return (configJSON.newNotaryEndPoint + "?is_draft=true");
        }
        else{
          return (configJSON.newNotaryEndPoint);
        }
      case "edit":
        return (configJSON.editNotaryRequestEndPoint + "/" + editRequest?.id);
      default:
        return (configJSON.newNotaryEndPoint);
    }
  }

  transformData = (data: Array<Document>) => {
    return data.map((item: Document) => {
      // Ensure we have the full data URL format like the working curl request
      let docFile = item.base64;
      if (!docFile.includes("data:")) {
        // If it's just base64, add the data URL prefix
        const mimeType = item?.document?.type || "image/jpeg"; // Default to jpeg if no type
        docFile = `data:${mimeType};base64,${docFile}`;
      }
      
      console.log("📁 TRANSFORMING FILE DATA:", {
        originalBase64: item.base64.substring(0, 50) + "...",
        finalDocFile: docFile.substring(0, 50) + "...",
        fileName: item?.document?.name,
        recipientsCount: item.recipients_attributes.length
      });

      return {
        doc_file: docFile,  // Use 'doc_file' instead of 'base64' to match API
        file: item?.document?.name,
        recipients_attributes: item.recipients_attributes.map(
          (recipient) => ({
            name: recipient.name,
            email: recipient.email,
            is_signatory: recipient.is_signatory,
          })
        ),
      };
    });
  };

  validateGuestEmail = async () => {
    let requestData = {
      email: this.state.clientEmail
    };
    this.validateGuestEmailCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.postMethod,
      endPoint: configJSON.validateGuestEmailEndPoint,
      body: requestData,
    });
  }

  createInviteRequest = async() => {
    const { acceptedRequest} = this.props;
    this.props.setLoader(true);
    const transformedData = this.transformData(this.state.files);
    let requestData = {
      id: acceptedRequest?.id,
      client_address: this.state.clientAddress1,
      client_address2: this.state.clientAddress2,
      city:this.state.city,
      country : this.state.clientCountryName,
      post_code : this.state.postCode,
      jurisdiction_id: this.state.selectedJuridiction,
      date: moment(this.state.selectedDate).format("YYYY-MM-DD"),
      additional_information : this.state.additionalDetails,
      notarisation_method_id: this.state.selectedMethod,
      notary_service_type: this.state.selectedService,
      file_documents_attributes: transformedData,
    };
    this.setState({ tempSelectedDate: null, tempSelectedSession: "" });
    this.acceptRequestCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method : configJSON.postMethod,
      endPoint: configJSON.acceptRequestEndPoint,
      body: requestData,
    });
  }

  createRequest = async (isDraft:boolean = false) => {
    const { isNewRequestOrEditRequestOrInviteClient } = this.props;
    
    // Prevent double-click by checking if request is already being created
    if (this.state.isCreatingRequest) {
      console.log("⚠️ Request creation already in progress, ignoring duplicate click");
      return;
    }
    
    console.log("🎯 CREATE REQUEST DEBUG:", {
      isNewRequestOrEditRequestOrInviteClient,
      isDraft,
      selectedService: this.state.selectedService,
      selectedMethod: this.state.selectedMethod,
      selectedJuridiction: this.state.selectedJuridiction,
      selectedDate: this.state.selectedDate,
      totalDocuments: this.state.totalDocuments,
      selectedSession: this.state.selectedSession,
      priorityName: this.state.priorityName,
      filesCount: this.state.files.length
    });

    if( isNewRequestOrEditRequestOrInviteClient !== "invite" && isNewRequestOrEditRequestOrInviteClient !== "guest" ) {
      // Set creating state to prevent double-clicks
      this.setState({ isCreatingRequest: true });
      this.props.setLoader(true);
      const transformedData = this.transformData(this.state.files);
      let requestData = {
        notary_request: {
          notary_service_type: this.state.selectedService,
          notarisation_method_id: this.state.selectedMethod,
          jurisdiction_id: this.state.selectedJuridiction,
          date: moment(this.state.selectedDate).format("YYYY-MM-DD"),
          notes: this.state.additionalDetails,
          notarised_document: this.state.totalDocuments,
          timing_slot: this.state.selectedSession,
          priority: this.state.priorityName,
          file_documents_attributes: transformedData,
        },
      };

      console.log("📋 REQUEST DATA TO SEND:", JSON.stringify(requestData, null, 2));
      console.log("🔗 ENDPOINT:", this.createRequestEndPoint(isDraft));
      console.log("📝 METHOD:", this.props.isNewRequestOrEditRequestOrInviteClient === "new" ? configJSON.postMethod : configJSON.putMethod);
      
      // Log the exact structure to compare with working curl
      console.log("🔍 COMPARING WITH WORKING CURL FORMAT:");
      console.log("Frontend file_documents_attributes:", requestData.notary_request.file_documents_attributes);
      console.log("Expected format (from curl):", {
        "doc_file": "data:image/jpeg;base64,/9j/4AAQ...",
        "file": "1.jpg",
        "recipients_attributes": [{"name": "Black Stars", "email": "elprince.elp@gmail.com", "is_signatory": true}]
      });

      this.setState({ tempSelectedDate: null, tempSelectedSession: "" });
      this.createRequestCallId = await this.apiCall({
        contentType: configJSON.appJsonContentType,
        method:
          this.props.isNewRequestOrEditRequestOrInviteClient === "new"
            ? configJSON.postMethod
            : configJSON.putMethod,
        endPoint: this.createRequestEndPoint(isDraft),
        body: requestData,
      });

      console.log("🆔 CREATE REQUEST CALL ID:", this.createRequestCallId);
    }else if (isNewRequestOrEditRequestOrInviteClient === "invite"){
      this.props.setLoader(false);
      this.createInviteRequest();
    }
    else{
      this.createGuestRequest();
    }
  };

  createGuestRequest = async() => {
    this.props.setLoader(true);
    const transformedData = this.transformData(this.state.files);
    let requestData = {
      guest_params: {
        name: this.state.clientFullName,
        email: this.state.clientEmail,
        phone_number: Number(this.state.clientPhoneNumber),
        address: this.state.clientAddress1,
        address2: this.state.clientAddress2,
        city: this.state.city,
        jurisdiction: Number(this.state.selectedJuridiction),
        post_code: this.state.postCode,
        notary_service: Number(this.state.selectedService),
        notarisation_method: Number(this.state.selectedMethod),
        date: moment(this.state.selectedDate).format("YYYY-MM-DD"),
        notes: this.state.additionalDetails,
        notarised_document: Number(this.state.totalDocuments),
        timing_slot: this.state.selectedSession,
        priority: this.state.priorityName,
        status: 1,
      country_code:Number(this.state.clientCountryCode),
        file_documents_attributes: transformedData
      }
    }
    this.postGuestRequestApiCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.postMethod,
      endPoint: configJSON.postGuestRequestApiEndPoint,
      body: requestData,
    });
  }

  getPriorityApi = async (dates: DateRange) => {
    this.setState({ loader: true });
    const { firstDay, lastDay } = dates;
    let isResponseReceived = false;
    this.getPriorityTimeoutId = setTimeout(() => {
      if (!isResponseReceived)
        this.setState({ priorities: this.setInitialPriorities() });
    }, 30000);

    this.getPriorityCallId = await this.apiCall({
      contentType: configJSON.appJsonContentType,
      method: configJSON.getMethod,
      endPoint:
        configJSON.getPriorityAPIEndPoint +
        `?from_date=${firstDay}&to_date=${lastDay}`,
    });
     this.setState({ loader: false });
  };

  getClassName = (isError: boolean) => (isError ? "errorStyle" : "textStyle");

  findFormTitle = () => {
    switch (this.props.isNewRequestOrEditRequestOrInviteClient) {
      case "new":
      case "invite":
      case "guest":
        return "New Notary Request";
      case "edit":
        return "Edit Notary Request";
    }
  };

  validateStep3 = () => {
    const recipientErrors = this.state.files.map((docs) =>
      docs.recipients_attributes.map((recipient) => ({
        nameErr: recipient.name === "",
        emailErr: recipient.email === "",
        emailInvalidErr:
          recipient.email !== "" &&
          !configJSON.emailRegex.test(recipient.email),
      }))
    );
    const isSignatoryAvailable = this.state.files.map((file) =>
      file.recipients_attributes.some((recipient) => recipient.is_signatory)
    );
    this.setState(
      {
        recipientErrors: recipientErrors,
        isSignatoryAvailable: isSignatoryAvailable,
      },
      () => {
        const hasErrors = recipientErrors.some((docErrors) =>
          docErrors.some(
            (error) => error.nameErr || error.emailErr || error.emailInvalidErr
          )
        );
        if (!hasErrors && !this.state.isSignatoryAvailable.includes(false)) {
          this.createRequest();
        }
      }
    );
  };

  validateStep2 = () => {
    let documentErrors = this.state.documentErrors;
    let termOneError;
    let termTwoError;
    if (this.state.files.length > 0) {
      for (let iValue = 0; iValue < this.state.files.length; iValue++) {
        if (this.state.files[iValue].document === null)
          documentErrors[iValue] = true;
        else documentErrors[iValue] = false;
      }
    }
    documentErrors = documentErrors.slice(0, this.state.files.length);
    if (!this.state.checkboxOne) {
      termOneError = true;
    } else {
      termOneError = false;
    }
    if (!this.state.checkboxTwo) {
      termTwoError = true;
    } else {
      termTwoError = false;
    }
    if (
      Object.values(documentErrors).includes(true) ||
      termOneError ||
      termTwoError
    ) {
      this.setState({
        documentErrors: documentErrors,
        termOneError: termOneError,
        termTwoError: termTwoError,
      });
    } else {
      this.setState((prevState) => ({ onStep: prevState.onStep + 1 }));
    }
  };

  validateStep1 = () => {
    const dateToday = new Date();
    const {
      selectedService,
      selectedMethod,
      selectedJuridiction,
    } = this.state;
    const validationChecks = [
      {
        value: this.isEmpty(selectedService),
        errorState: "isSelectService",
      },
      {
        value:this.isEmpty(selectedMethod),          
        errorState: "isSelectedMethod",
      },
      {
        value:this.isEmpty(selectedJuridiction),        
        errorState: "isSelectedJuridiction",
      },
      { value: this.state.totalDocuments === 0, errorState: "isDocument" },
      { value: this.state.selectedDate === null, errorState: "isSelectedDate" },
      {
        value:
          this.state.selectedDate !== null &&
          this.state.selectedDate < dateToday,
        errorState: "isCorrectDate",
      },
    ];
    this.setState(
      (prevState) => {
        const updatedState: { [key: string]: boolean | string } = {};
        validationChecks.forEach(({ value, errorState }) => {
          updatedState[errorState] = value;
        });
        return { ...prevState, ...updatedState };
      },
      () => {
        if (
          !this.state.isSelectService &&
          !this.state.isSelectedMethod &&
          !this.state.isSelectedJuridiction &&
          !this.state.isDocument &&
          this.state.selectedSession !== "" &&
          !this.state.isSelectedDate &&
          !this.state.isCorrectDate
        )
          this.setState((prevState) => ({ onStep: prevState.onStep + 1 }));
      }
    );
  };

  validateStep1ForInviteUser = () => {
    const {
      clientFullName,
      clientEmail,
      clientPhoneNumber,
      clientAddress1 ,
      city,
      postCode,
    } = this.state;
    const phoneNumberString = String(clientPhoneNumber);
    const validationState =  [
      {
        value: this.isEmpty(clientFullName) && !this.checkRequestPropInvite(),
        errorState:"isClientFullName",
      },
      {
        value: (this.isEmpty(clientEmail) || !configJSON.emailRegex.test(clientEmail)) && !this.checkRequestPropInvite(),
        errorState: "isClientEmail",
      },
      {
        value: (this.isEmpty(phoneNumberString) || !/^\d{10}$/.test(phoneNumberString)) && !this.checkRequestPropInvite(),
        errorState: "isClientPhoneNumber",
      },
      {
        value: this.isEmpty(clientAddress1),
        errorState: "isClientAddress1",
      },
      {
        value: this.isEmpty(city),
        errorState: "isCity",
      },
      {
        value: this.isEmpty(postCode),
        errorState: "isPostCode",
      }
    ];
    this.setState(
      (prevState) => {
        const updatedState: { [key: string]: boolean | string } = {};
        validationState.forEach(({ value, errorState }) => {
          updatedState[errorState] = value;
        });
        return {...prevState,...updatedState };
      },
      () => {
        if (
          !this.state.isClientFullName &&
          !this.state.isClientEmail &&
          !this.state.isClientPhoneNumber &&
          !this.state.isClientAddress1 &&
          !this.state.isCity &&
          !this.state.isPostCode
        ) 
        {
          this.setState((prevState) => ({ onStep: prevState.onStep + 1 }));
        }
      });
  }

  isOnStep1 = () => this.state.onStep === 1;
  isOnStep2 = () => this.state.onStep === 2;
  isOnStep3 = () => this.state.onStep === 3;
  isOnStep4 = () => this.state.onStep === 4;

  handleNext = async () => {
    if (this.props.isNewRequestOrEditRequestOrInviteClient === "invite" || this.props.isNewRequestOrEditRequestOrInviteClient === "guest") {
      if (this.isOnStep1()) {
        if (this.props.isNewRequestOrEditRequestOrInviteClient === "guest") {         
         await this.validateGuestEmail(); // API call for guest
        }
        this.validateStep1ForInviteUser();
      }
      else if (this.isOnStep2()) this.validateStep1();
      else if (this.isOnStep3()) this.validateStep2();
      else if(this.isOnStep4()) this.validateStep3();
    }
    else{
      if (this.isOnStep1()) this.validateStep1();
      else if (this.isOnStep2()) this.validateStep2();
      else if (this.isOnStep3()) this.validateStep3();
    }
  };

  findNextButtonText = () => {
    if (
      this.isOnStep3() &&
      this.props.isNewRequestOrEditRequestOrInviteClient === "edit"
    )
      return "Update";
    else if (this.isOnStep3() && this.props.isNewRequestOrEditRequestOrInviteClient !== "invite") return "Create Request";
    else if (this.isOnStep4()) return "Create Request";
    else return "Next";
  };

  handleServiceSelection = (event: { target: { value: unknown } }) => {
    this.setState({
      selectedService: event.target.value as string,
      isSelectService: false,
    });
  };

  handleNotarisationMethodSelection = (event: {
    target: { value: unknown };
  }) => {
    this.setState({
      selectedMethod: event.target.value as string,
      isSelectedMethod: false,
    });
  };

  openCalendar = () => this.setState({ isCalendarOpen: true });

  handleCalendarSaveClick = () => {
    this.setState({
      isCalendarOpen: false,
      selectedDate: this.state.tempSelectedDate,
      selectedSession: this.state.tempSelectedSession,
    });
  };

  findDateValue = () => {
    if (this.state.selectedDate !== null && !this.isEmpty(this.state.selectedSession))
      return (
        format(this.state.selectedDate, "dd/MM/yyyy") +
        "-" +
        this.state.selectedSession
      );
    else if (!this.isEmpty(this.state.selectedSession))
      return this.state.selectedSession;
    else if (this.state.selectedDate !== null)
      return format(this.state.selectedDate, "dd/MM/yyyy");
    else return "";
  };

  handleCalendarCancelClick = () => {
    this.setState({
      isCalendarOpen: false,
      tempSelectedDate: this.props.editRequest
        ? new Date(this.props.editRequest.attributes.date)
        : this.state.selectedDate,
      tempSelectedSession: this.state.selectedSession,
      currentMonth: new Date(),
    });
  };

  leftArrow = () => {
    const {
      currentMonth,
      priorities,
    }: { currentMonth: Date; priorities: { [key: string]: any } } = this.state;
    const prevMonth: Date = subMonths(currentMonth, 1);
    const year: string = format(prevMonth, "yyyy");
    const month: string = format(prevMonth, "MM");
    const daysInMonth: number = new Date(
      parseInt(year),
      parseInt(month),
      0
    ).getDate();
    const currentDate: Date = new Date();
    const startOfCurrMonth: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    if (prevMonth < startOfCurrMonth) {
      this.setState({ currentMonth: prevMonth });
      return;
    }
    const dayFoundInPriorities = Array.from(
      { length: daysInMonth },
      (_, day) => {
        const dayOfMonth: string = `${year}-${month}-${(day + 1)
          .toString()
          .padStart(2, "0")}`;
        return priorities[dayOfMonth];
      }
    ).some(Boolean);
    if (dayFoundInPriorities) {
      this.setState({ currentMonth: prevMonth });
      return;
    }
    this.setState({ currentMonth: prevMonth });
    this.getPriorityApi(this.getDateRangeFromMonth(prevMonth));
  };

  rightArrow = () => {
    const {
      currentMonth,
      priorities,
    }: { currentMonth: Date; priorities: { [key: string]: any } } = this.state;
    const nextMonth: Date = addMonths(currentMonth, 1);
    const year: string = format(nextMonth, "yyyy");
    const month: string = format(nextMonth, "MM");
    const daysInMonth: number = new Date(
      parseInt(year),
      parseInt(month),
      0
    ).getDate();
    const currDate: Date = new Date();
    const startOfCurrMonth: Date = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      1
    );
    if (nextMonth < startOfCurrMonth) {
      this.setState({ currentMonth: nextMonth });
      return;
    }
    const dayFoundInPriorities = Array.from(
      { length: daysInMonth },
      (_, day) => {
        const dayOfMonth: string = `${year}-${month}-${(day + 1)
          .toString()
          .padStart(2, "0")}`;
        return priorities[dayOfMonth];
      }
    ).some(Boolean);
    if (dayFoundInPriorities) {
      this.setState({ currentMonth: nextMonth });
      return;
    }
    this.setState({ currentMonth: nextMonth });
    this.getPriorityApi(this.getDateRangeFromMonth(nextMonth));
  };

  isDecreasable = () => {
    return (
      (this.props.editRequest !== undefined &&
        this.state.totalDocuments <=
        this.props.editRequest.attributes?.file_documents?.length) ||
      this.state.totalDocuments <= 1
    );
  };

  isDeletable = (docIndex: number) => {
    return (
      this.props.isNewRequestOrEditRequestOrInviteClient !== "edit" ||
      (this.props.editRequest !== undefined &&
        docIndex + 1 > this.props.editRequest.attributes?.file_documents?.length)
    );
  };

  handleDateClick = (date: Date | null, priorityName: string) => {
    this.setState({
      tempSelectedDate: date,
      isSelectedDate: false,
      priorityName: priorityName,
    });
  };

  handleAdditionalDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => this.setState({ additionalDetails: event.target.value });

  handleJurisdictionSelection = (event: { target: { value: unknown } }) => {
    this.setState({
      selectedJuridiction: event.target.value as string,
      isSelectedJuridiction: false,
    });
  };

  addDocument = () => {
    let files = this.state.files;
    files.push({
      id: files.length + 1,
      document: null,
      base64: "",
      doc_size: 0,
      isfileMax: false,
      ellapsed: false,
      recipients_attributes: [
        {
          name: "",
          email: "",
          is_signatory: false,
        },
      ],
      isInvalidSize: false,
    });
    this.setState({ files: files });
  };

  onDocNumberChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event?.target?.value;
    if (configJSON.regexForNumber.test(value) && !isNaN(Number(value))) {
      const totalDocuments = parseInt(value, 10);
      if (totalDocuments <= 10) {
        this.setState(
          {
            files: [],
            totalDocuments: totalDocuments,
            isDocument: false,
            isValidDocument: false,
          },
          () => {
            for (let iValue = 0; iValue < totalDocuments; iValue++) {
              this.addDocument();
            }
          }
        );
      }
    } else {
      this.setState({ isValidDocument: true, totalDocuments: 0 });
    }
  };

  increase = () => {
    if (this.state.totalDocuments < 10) {
      this.incrementValue();
      this.setState({ isDocument: false, isValidDocument: false });
    }
  };

  removeDocument = (indexValue: number) => {
    let files = this.state.files;
    files.splice(indexValue, 1);
    this.setState({ files: files });
  };

  decrementValue = (value: number) => {
    this.setState(
      (prevState) => {
        const newValue = prevState.totalDocuments - 1;
        return {
          totalDocuments: newValue >= 0 ? newValue : prevState.totalDocuments,
        };
      },
      () => {
        this.removeDocument(value);
      }
    );
  };

  handleDragOver = (event: React.DragEvent<HTMLElement>) =>
    event.preventDefault();

  handleDrop = (event: React.DragEvent<HTMLElement>, indexValue: number) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const file = event.dataTransfer.files[0];

      const allowedExtensions = [
        "pdf",
        "docx",
        "jpg",
        "png",
        "jpeg",
        "docx",
        "doc",
      ];
      const fileExtension = file?.name?.split(".").pop()?.toLowerCase();

      const maxSizeInBytes = 2 * 1024 * 1024;
      let files = this.state.files;
      if (file.size > maxSizeInBytes) {
        this.state.files[indexValue].isfileMax = true;
        this.setState({ files: files });
        return;
      } else {
        files[indexValue].isfileMax = false;
      }
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        this.state.files[indexValue].isInvalidSize = true;
        this.setState({ files: files });
        return;
      }

      files[indexValue].document = file;
      this.setState({
        files: files,
      });
    }
  };

  handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexValue: number
  ) => {
    if (event?.target?.files) {
      const filesMax = event.target.files[0];
      const maxSizeInBytes = 2 * 1024 * 1024;

      let files = this.state.files;
      if (filesMax.size > maxSizeInBytes) {
        this.state.files[indexValue].isfileMax = true;
        this.setState({ files: files });
        return;
      } else {
        files[indexValue].isfileMax = false;
      }

      files[indexValue].document = filesMax;
      this.setState({ files: files });

      const reader = new FileReader();
      reader.readAsDataURL(filesMax);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        files[indexValue].base64 = base64String;
      };
    }
  };

  deleteFile = (indexValue: number) => {
    let files = this.state.files;
    files[indexValue].document = null;
    this.setState({ files: files });
  };

  incrementValue = () => {
    this.setState((prevState) => {
      const newValue =
        prevState.totalDocuments < 10
          ? prevState.totalDocuments + 1
          : prevState.totalDocuments;
      return { totalDocuments: newValue };
    }, this.addDocument);
  };

  handleCheckbox1Click = () =>
    this.setState({ checkboxOne: !this.state.checkboxOne });

  handleCheckbox2Click = () =>
    this.setState({ checkboxTwo: !this.state.checkboxTwo });

  addRecipient = (docIndex: number) => {
    let files = this.state.files;
    const dataItem = { name: "", email: "", is_signatory: false };

    if (files[docIndex].recipients_attributes.length < 4) {
      files[docIndex].recipients_attributes.push(dataItem);
      this.setState({ files: files });
    } else {
      alert("You can only add up to 4 recipients.");
    }
  };

  handleEllapsed = (docIndex: number) => {
    let files = [...this.state.files];
    files[docIndex].ellapsed = !files[docIndex].ellapsed;
    this.setState({ files: files });
  };

  removeRecipient = (docIndex: number, recipientIndex: number) => {
    let files = this.state.files;
    files[docIndex].recipients_attributes.splice(recipientIndex, 1);
    this.setState({ files: files });
  };

  handleRecipientNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    docIndex: number,
    recipientIndex: number
  ) => {
    if (
      configJSON.nameRegex.test(event.target.value) ||
      event.target.value === ""
    ) {
      let files = this.state.files;
      files[docIndex].recipients_attributes[recipientIndex].name =
        event.target.value;
      if (
        this.state.recipientErrors[docIndex] &&
        this.state.recipientErrors[docIndex][recipientIndex]
      ) {
        this.state.recipientErrors[docIndex][recipientIndex].nameErr = false;
      }
      this.setState({ files: files });
    }
  };

  handleRecipientEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    docIndex: number,
    recipientIndex: number
  ) => {
    let files = this.state.files;
    files[docIndex].recipients_attributes[recipientIndex].email =
      event.target.value;
    if (
      this.state.recipientErrors[docIndex] &&
      this.state.recipientErrors[docIndex][recipientIndex]
    ) {
      this.state.recipientErrors[docIndex][recipientIndex].emailErr = false;
    }
    this.setState({ files: files });
  };

  handleSignatory = (docIndex: number, recipientIndex: number) => {
    this.state.isSignatoryAvailable[docIndex] = true;
    let files = this.state.files;
    files[docIndex].recipients_attributes[recipientIndex].is_signatory =
      !files[docIndex].recipients_attributes[recipientIndex].is_signatory;
    this.setState({ files: files });
  };

  yesButtonClick = () => {
    this.setState(
      {
        onStep: 1,
        isCalendarOpen: false,
        selectedDate: null,
        tempSelectedDate: null,
        selectedJuridiction: "",
        selectedMethod: "",
        selectedService: "",
        totalDocuments: 0,
        additionalDetails: "",
        selectedSession: "",
        tempSelectedSession: "",
        files: [],
        isSelectedDate: false,
        isCorrectDate: false,
        isValidDocument: false,
        isSelectedMethod: false,
        isSelectService: false,
        isSelectedJuridiction: false,
        isDocument: false,
        checkboxOne: false,
        checkboxTwo: false,
      },
      () => this.props.yesButtonClick()
    );
  };

  closeSuccessModal = () =>{
    const { isNewRequestOrEditRequestOrInviteClient} = this.props;
    this.setState({ saveModal: false });
    if(isNewRequestOrEditRequestOrInviteClient ==="guest"){
      this.setState({loginSignupPopup:true})
    }
  }

  closeLoginPopup = () => {
    this.setState({loginSignupPopup:false})
  }

  navigateToLogin = () => {
    this.props.navigation.navigate("EmailAccountLoginBlock")
  }

  navigateToSignUp = () => {
    this.props.navigation.navigate("EmailAccountRegistrationWeb");
  }

  setInitialPriorities(): Priorities {
    const priorities: Priorities = {};
    const indices = Array.from({ length: 31 }, (intial, itemData) => itemData);
    let priorityLimit = 0;
    const today = new Date();
    const tomorrow = addDays(today, 1);

    indices.forEach((value) => {
      const date = addDays(tomorrow, value - 1);
      const dateString = format(date, "yyyy-MM-dd");
      const isWeekend = getDay(date) === 0 || getDay(date) === 6;
      if (isWeekend) {
        priorities[dateString] = "Super Priority";
      } else {
        priorityLimit += 1;
        if (priorityLimit <= 10) {
          priorities[dateString] = "Priority";
        } else {
          priorities[dateString] = "Standard";
        }
      }
    });
    this.setState({ loader: false });
    return priorities;
  }

  isPriorityMethodArray = (obj: any): obj is PriorityMethodArray => {
    return (
      Array.isArray(obj) &&
      obj.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          typeof item.priority === "number" &&
          typeof item.date === "string"
      )
    );
  };

  handlePrioritySet(responseArray: PriorityMethodArray) {
    const newPriorities: Record<string, PriorityType> = {};
  
    responseArray.forEach((response) => {
      const priorityCount: number = response.priority || 0;
      let priorityString: PriorityType;
  
      switch (priorityCount) {
        case 0:
          priorityString = "Standard";
          break;
        case 1:
          priorityString = "Priority";
          break;
        case 2:
          priorityString = "Super Priority";
          break;
        case 3:
          priorityString = "Not Available";
          break;
        default:
          priorityString = "Standard";
          break;
      }
  
      if (response.date) {
        const dateObj = new Date(response.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;
  
        newPriorities[dateString] = priorityString;
      }
    });
  
    this.setState((prevState) => ({
      priorities: {
        ...prevState.priorities,
        ...newPriorities,
      },
      loader: false,
    }));
  }
  
  isEmpty = (value: any): boolean => !value || value === "" || value === "null" || value ==="-" || value === null;

  isFormEmptyStep1 = (): boolean => {
    const {
      selectedService,
      selectedMethod,
      selectedJuridiction,
      totalDocuments,
      selectedDate,
      selectedSession,
    } = this.state;

    return (
      this.isEmpty(selectedService) &&
      this.isEmpty(selectedMethod) &&
      this.isEmpty(selectedJuridiction) &&
      totalDocuments === 0 &&
      selectedDate === null && this.isEmpty(selectedSession)
    );
  };


  handleOnChangeTextfieldForInvitedRequestStep1 = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | { target: { value: any; name?: string } },
    stateKey: string , errorStateKey:string | undefined = ""
  ) => {
    const value = event.target.value;
      if(errorStateKey !== ""){
      this.setState((prevState) => {
          let isError =  value === null || value === "";
          if(stateKey === "clientEmail"){
          isError = isError || !configJSON.emailRegex.test(value)
        }
          if(stateKey === "clientPhoneNumber"){
          isError = isError || !/^\d{10}$/.test(String(value))
        }
        return {
          ...prevState,
          [stateKey]: value,
          [errorStateKey]: isError,
        };
      });
    }
      else{
        this.setState( (prevState) => ({
        ...prevState,
        [stateKey]: value,
      }));
    }
  };

  checkRequestPropNewOrInvite = () =>{
    const { isNewRequestOrEditRequestOrInviteClient} = this.props;
    return (this.checkRequestPropInvite() || isNewRequestOrEditRequestOrInviteClient === "new" || isNewRequestOrEditRequestOrInviteClient === "guest" )      
  }

  handleResponse = (res:  ValidateResponseType) => {
    if(res.message){
this.setState({
  isLoginNavigateModalOpen: false
})
    }
    if(res.error){
      this.setState({
      isLoginNavigateModalOpen: true,
      loginNavigateModalImage: failureImage,
      loginNavigateModalText: "Failed!",
      loginNavigateModalTextColor: "#FF0000",
      loginNavigateModalSubText: "This email is already registered with us.",
      loginNavigateModalSubTextTwo:"Please login to continue",
      loginNavigateModalButtonText: "Continue",
      })
      
    }
  }

  handleLoginNavigate =() =>{
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "EmailAccountLoginBlock");
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }

  handleProfileResponse = (res: ProfileResponse) => {
    const { clientAddress1, clientAddress2, city, postCode, clientFullName, clientEmail, clientPhoneNumber, clientCountryCode } = this.state;
    const attr = res.data.attributes;
    this.setState({
      clientFullName: !this.isEmpty(attr.full_name) ? attr.full_name : clientFullName,
      clientEmail : !this.isEmpty(attr.email) ? attr.email : clientEmail,
      clientPhoneNumber: !this.isEmpty(attr.phone_number) ? attr.phone_number : clientPhoneNumber,
      clientCountryCode: !this.isEmpty(attr.country_code) ? attr.country_code : clientCountryCode,
      clientAddress1: !this.isEmpty(attr.address) ? attr.address : clientAddress1,
      clientAddress2: !this.isEmpty(attr.address_line_2) ? attr.address_line_2 : clientAddress2,
      city: !this.isEmpty(attr.city) ? attr.city : city,
      postCode: !this.isEmpty(attr.post_code) ? attr.post_code : postCode,
      clientCountryName: !this.isEmpty(attr.country) ? attr.country : "",
    });
  }

  checkRequestPropInvite = () => {
    const { isNewRequestOrEditRequestOrInviteClient} = this.props;  
    return isNewRequestOrEditRequestOrInviteClient === "invite";
  }

  saveDraft = () => {
    this.setState({isDrafted : true})
    this.createRequest(true)
  }

  getCalenderDateErrors = () => {
    if (this.checkRequestPropInvite()) {
      return this.state.selectedDate === null;
    } else {
      return this.state.selectedDate === null && this.state.selectedSession === "";
    }
  }

  getReadOnlyClass = () => (this.checkRequestPropInvite() ? "readonly" : "");

  getLabelPrefix = () => {
    const { isNewRequestOrEditRequestOrInviteClient} = this.props;  
    if(isNewRequestOrEditRequestOrInviteClient === "guest") return "Enter "
  }

  handleCountryCode = (res:CountryResponse) => {
    const uniqueCountryCodeData = res.countries.filter((country, index, self) =>
      index === self.findIndex((c) => c.country_code === country.country_code)
    );
    this.setState({ countryCodes: uniqueCountryCodeData})   
  }

  // Customizable Area End
}
