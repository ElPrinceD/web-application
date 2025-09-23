// @ts-nocheck
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import * as yuppp from "yup";
// Customizable Area Start
import { Platform } from "react-native";
import moment from 'moment';
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import  {IProfileAttributes} from "../../requestmanagement/src/RequestDetailsController";
export interface CountryDataObject {
  country_code: string,
  name: string
}

export interface ResponseCountry  {
  id: string,
  type: string,
  attributes: {
      name: string
  }
}

export interface KycDocumentResponse  {
  id: string,
  country_name: string,
  region_name: string,
  document_type: string,
  number_of_sides: number,
  created_at: Date,
  updated_at: Date,
  checked:boolean,
}

interface Errors {
  userFname: string;
  userMname: string;
  userLname: string;
  email: string;
  mobNumber: string;
  stateCode: string;
  identityType: string;
  idNumber: string;
  address1: string;
  city: string;
  country: string;
  postcode: string;
  countryCode: string;
  selectedDate:string;
  // Add other fields as necessary
}
export interface ApiCallInterface {
  contentType:string;
  method:string;
  endPoint:string;
  body:object;
  type:string;
}


export interface KycRequestStatusDetails {
  data: {
    id: string;
    type: string;
    attributes: Attributes;
  };
}

export interface Attributes {
  id: number;
  document_type: any[];
  onfido_applicant_id: string;
  onfido_check_id: any;
  onfido_report_id: any[];
  kyc_status: string;
  reports_status: any[];
  email: any;
  notary_request_id: number;
  workflow_id: string;
  requester_id: number;
  requested_kyc_documents: RequestedKycDocument[];
}

export interface RequestedKycDocument {
  id: number;
  onfido_id: number;
  status: string;
  document_details: DocumentDetails;
}

export interface DocumentDetails {
  data: {
    id: string;
    type: string;
    attributes: {
      id: number;
      country_name: string;
      region_name: string;
      document_type: string;
      number_of_sides: number;
    };
  };
}

const countryCodeMap = {
  "England": "GBR",
  "Wales": "GBR",
  "Nothern Ireland": "NIR",
  "Nothern": "GBR",
  "Ireland": "IRL",
  "India": "IND",
  "Finland": "FIN",
  "Scotland": "GBR"
};
// Customizable Area End
export const configJSON = require("./config");
export interface Props {
  navigation: any;

  // Customizable Area Start
  orderID: string;
  isEndUser: boolean;
  isNotaryUser: boolean;
  UserProfileDetails:IProfileAttributes;
  initialEndUserDocStatus: (hasData:boolean) => void;
  onComplete?: () => void;
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  firstNameDefault:string,
  lastNameDefault: string,
  middleNameDefault:string,
  emailStateDefault:string,
  nationalityDefault:string,
  dateOfBirth:string,
  selectAll:boolean,
  countryCode: string;
  country: string;
  countryCodes: Array<CountryDataObject>;
  countries: Array<ResponseCountry>;
  kycDocument: Array<KycDocumentResponse>;
  selectedDate: Date | null;
  userFname:string,
  userMname:string,
  userLname:string,
  mobNumber:string,
  email:string,
  stateCode:string,
  identityType:string,
  idNumber:string,
  address1:string,
  address2:string,
  city:string,
  postcode:string,
  sendKycAPIDocumentIds:[],
  kycDocumentStatusDetails:KycRequestStatusDetails[],
  kycDocumentStatusDetailsDoc:RequestedKycDocument[],
  applicantCreateApiDataLink:string,
  applicantCreateApiError:"",
  kycDocumentStatusError:string,
  errors: Errors
  handleFormOpen:boolean,
  disableKyc:boolean,
  loader:boolean,
  kycCreateError:string,
  statusDiolog:boolean,
  onfidoIframeOpen:boolean,
  kycCreateResponce:[],
  getKycRequestStatusDetails:[],
  onfidoId:number | null,
  isStartButtonActive:boolean;
  buttonLable:string,
  level1:boolean,
  level2:boolean,
  level3a:boolean,
  level3b:boolean,
  levelKeys:[],
  uuidMap:[],
  workflowIDs:string,
  selectedLevel:string,
  hints:{},
  phoneNumber:string,
  isInitialLoad: boolean
  // Customizable Area End
}
interface SS {
  // Customizable Area Start

  // Customizable Area End
}
export default class KnowYourCustomerKycVerificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  getVerifyIndentitycallID: string = '';
  getCreateaccountCallID: string = '';
  getreportCallID: string = '';
  // Customizable Area Start
  getCountryCodeApiCallID: string = "";
  getCountryAPICallID: string = "";
  kycDocumentListAPICall: string = "";
  kycCreateApiCall: string = "";
  applicantCreateApiCall: string = "";
  getKycRequestStatusAPI: string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
      // Customizable Area Start
      // Customizable Area End
    ];
    this.state = {
      // Customizable Area Start
      firstNameDefault: "",
      lastNameDefault: "",
      middleNameDefault: "",
      emailStateDefault: "",
      nationalityDefault: "",
      dateOfBirth: "",
      selectAll: false,
      countryCodes:[],
      countries:[],
      kycDocument:[],
      country:"",
      countryCode:"",
      selectedDate:null,
      userFname:this.props.UserProfileDetails?.first_name || '',
      userMname:"",
      userLname:this.props.UserProfileDetails?.last_name || '',
      mobNumber:this.props.UserProfileDetails?.phone_number || '',
      email:this.props.UserProfileDetails?.email || '',
      stateCode:"",
      identityType:"",
      idNumber:"",
      address1:this.props.UserProfileDetails?.address || '',
      address2:this.props.UserProfileDetails?.address_line_2 || '',
      city:this.props.UserProfileDetails?.city || '',
      postcode:this.props.UserProfileDetails?.post_code || '',
      sendKycAPIDocumentIds:[],
      kycDocumentStatusDetails:[],
      getKycRequestStatusDetails:[],
      kycDocumentStatusDetailsDoc:[],
      applicantCreateApiDataLink:"",
      applicantCreateApiError:"",
      kycDocumentStatusError:"",
      errors: {},
      handleFormOpen: false,
      disableKyc:true,
      loader:false,
      kycCreateError:"",
      statusDiolog:false,
      onfidoIframeOpen:false,
      kycCreateResponce:[],
      onfidoId:null,
      isStartButtonActive:false,
      buttonLable:"Request KYC",
      level1:false,
      level2:false,
      level3a:false,
      level3b:false,
      levelKeys: ['Level1', 'Level2', 'Level3a', 'Level3b'],
      workflowIDs:"",
      uuidMap : {
        Level1: "68c0f7f6-3bf0-4411-812c-c6e44402ed7c",
        Level2: "35a10f5b-68ae-4882-8752-0f92a57391ba",
        Level3a: "cb90793a-54b7-48a9-a81b-7c06bfad3aa6",
        Level3b: "47992ac9-64b8-4c7a-96a9-e9261eda65fe"
      },
      hints:{
        Level1: "Level 1: Basic Document & Motion (Liveness check).",
        Level2: "Level 2: Document report, Motion & Watchlist AML.",
        Level3a: "Level 3a: Document report, Motion, Watchlist AML, along with fraud signals - Known Faces and Device Intelligence reports.",
        Level3b: "Level 3b: Document report, Motion, Watchlist AML along with just one fraud signal - Device Intelligence report and also, the Manual decision task for you to review the watchlist report results manually and check whether you would want to Approve or Reject the end user."
      },
      phoneNumber: "",
      selectedLevel:"",
      isInitialLoad: true,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }
  async receive(from: string, message: Message)//istanbul ignore next
  {
    // Customizable Area Start
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if (apiRequestCallId == null) return; // Exit early if no API call ID

    switch (apiRequestCallId) {
      case this.getCreateaccountCallID:
        if (!responseJson.error) {
          await setStorageData("AppicantId", responseJson.id);
          await setStorageData("ReportID", responseJson.id);
          this.onfidouserdeta();
        }
        break;

      case this.getVerifyIndentitycallID:
        this.startSDK(responseJson.token);
        break;

      case this.getreportCallID:
        this.props.navigation.navigate("KnowYourCustomerKycVerificationAccount");
        break;

      case this.getCountryCodeApiCallID:
        this.setLoader(false);
        const uniqueCountryCodeData = responseJson.countries.filter(
          (country, index, self) =>
            index === self.findIndex((c) => c.country_code === country.country_code)
        );
        this.setState({ countryCodes: uniqueCountryCodeData });
        break;

      case this.getCountryAPICallID:
        this.setLoader(false);
        this.setState({ countries: responseJson.data });
        break;

      case this.kycDocumentListAPICall:
        this.setLoader(false);
        const kycDocumentListData = responseJson.map((item) => ({
          ...item,
          checked: false,
        }));
       
        this.setState({ kycDocument: kycDocumentListData });
        break;

      case this.kycCreateApiCall:
        this.setLoader(false);
        if(responseJson.message){
          this.setState({ kycCreateError: responseJson.message});
        }else{
          this.setState({kycCreateResponce: responseJson.data},() => {
            this.setState({statusDiolog: true});
            
                  setTimeout(() => {
                    this.setState({ statusDiolog: false });
                    this.getkycDocumentListAPI();
                    this.getKycOrderRequestStatusAPI();
                  }, 3000); 
            });
        }
        break;
    
      case this.getKycRequestStatusAPI:
        this.setLoader(false);
        this.createKycApiCall(responseJson);
        break;

        case this.applicantCreateApiCall:
        this.setLoader(false);
        if(responseJson.message){
          this.setState({ applicantCreateApiError: responseJson?.message });
          }else{
            this.setState({ applicantCreateApiDataLink: responseJson?.workflow.link.url,handleFormOpen:false,onfidoIframeOpen:true });
        }
        break;
        
      default:
        
        break;
    }
  }

  startSDK(responseJson: string) {
    Onfido?.start({
      sdkToken: responseJson,
      flowSteps: {
        welcome: true,
        userConsent: true,
        captureDocument: {
        },
        captureFace: {
          type: OnfidoCaptureType.PHOTO
        },
        enableNFC: false
      }
    })
      ?.then((response: string) => { this.onreportApi() })
      .catch((error: string) => { })
  }

  signupValidationSchema = () => {
    return yuppp.object().shape({
      firstNameDefault: yuppp.string().required("Please, Enter your firstNameDefault!"),
      lastNameDefault: yuppp.string().required("Please, Enter your lastNameDefault!"),
      middleNameDefault: yuppp.string().required("Please, Enter your middleNameDefault!"),
      emailStateDefault: yuppp
        .string()
        .required("Please, provide your email")
        .email("Please enter valid email"),
      phoneNumber: yuppp
        .string()
        .required("Please, provide your mobile number"),
      nationalityDefault: yuppp.string().required("Please, Enter your nationalityDefault!"),
      dateOfBirth: yuppp.string().required("Please, Enter your Date of Birth!"),
    })
  }
  onNavigationGobackscreen = () => {
    
    this.props.navigation.navigate("KnowYourCustomerKycVerification")
  }

  createAccount = async (values: { firstNameDefault: string; lastNameDefault: string; middleNameDefault: string; emailStateDefault: string; nationalityDefault: string; dateOfBirth: string; phoneNumber: string; }) => {
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const codedata = {
      first_name: values.firstNameDefault,
      last_name: values.lastNameDefault,
      middle_name: values.middleNameDefault,
      date_of_birth: values.dateOfBirth,
      nationalityDefault: values.nationalityDefault,
      phone_number: values.phoneNumber,
      email: values.emailStateDefault,
    }
    const httpBody = {
      data: codedata,
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage))
    this.getCreateaccountCallID = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      "bx_block_knowyourcustomerkycverification2/onfidos/applicant_create"
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTAPiMethod
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  onfidouserdeta = async () => {
    const UserDataValidation = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getVerifyIndentitycallID = UserDataValidation.messageId;
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getonfidoApi
    )
    const headers = {
      "Authorization":"Token token=api_sandbox.VfzFDCaYox9.rTHqR4jClR6-IHzdAQQUML5bd7PlNZ_Q"
    }
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    )
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POSTAPiMethod
    )
    let APPID = Platform.OS == "ios" ? "DatingAppDemo" : "com.DatingAppDemo";
    let formdata = new FormData();
    const confidoId = await getStorageData('AppicantId');
    formdata.append("applicant_id", confidoId)
    formdata.append("application_id", APPID)
    UserDataValidation.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    )
    runEngine.sendMessage(UserDataValidation.id, UserDataValidation);
  }

  onreportApi = async () => {
    const confidoId = await getStorageData('AppicantId');
    const header = {
      "Content-Type": configJSON.validationApiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    this.getreportCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_knowyourcustomerkycverification2/onfidos/retrieve_onfido_report?applicant_id=${confidoId}`
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GETApiMethod
    )
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }
  // web events
  // Customizable Area Start

  createKycApiCall = (responseJson) => {
    if(responseJson?.message){
      this.setState({ kycDocumentStatusError: responseJson?.message });
      this.props.initialEndUserDocStatus(true);
    }else{
      const documents = responseJson.data.attributes.requested_kyc_documents;
      const allVerified = documents.every((doc) => doc.status === "verified");
      const wasAllVerified = this.state.kycDocumentStatusDetailsDoc && 
        this.state.kycDocumentStatusDetailsDoc.every((doc) => doc.status === "verified");
     
      this.setState({ kycDocumentStatusDetailsDoc: responseJson?.data.attributes.requested_kyc_documents,
                      onfidoId: responseJson.data.id,
                      kycDocumentStatusDetails: responseJson?.data,
                      isStartButtonActive: allVerified,
                      disableKyc:!allVerified,
                      buttonLable:!allVerified ? "KYC Already Requested" : "Request KYC",
                      isInitialLoad: false // Mark that initial load is complete
                    });
                    
        this.props.initialEndUserDocStatus(false);
        
        // If KYC was just completed (transition from not all verified to all verified) and not on initial load
        if (allVerified && !wasAllVerified && !this.state.isInitialLoad) {
          this.handleKYCCompletion();
        }
     }
  }

  handleLevelChange = (event) => {
    const { name, checked } = event.target;
    this.setState({
      selectedLevel: checked ? name : '',
      workflowIDs: checked ? this.state.uuidMap[name] : ''
    });
  };
  
  
  
  handleIndividualChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.getKycOrderRequestStatusAPI();
    let updatedSendKycAPIDocumentIds;
    const checked = event.target.checked;
    this.setState((prevState) => {
      const updatedDocuments = prevState.kycDocument.map((doc) =>
        doc.id === id ? { ...doc, checked } : doc
      );
      const allSelected = updatedDocuments.every((doc) => doc.checked);
      if (checked) {
        updatedSendKycAPIDocumentIds = [...prevState.sendKycAPIDocumentIds, id];
      } else {
        updatedSendKycAPIDocumentIds = prevState.sendKycAPIDocumentIds.filter((docId) => docId !== id);
      }
      return {
        kycDocument: updatedDocuments,
        selectAll: allSelected,
        sendKycAPIDocumentIds: updatedSendKycAPIDocumentIds,
        disableKyc:false,
      };
    });
  };
    
  handleRequestKyc = () => {
   this.createKycStartAPI();
  };

  setLoader = (value: boolean) => {
    this.setState({loader: value})
  }

  async componentDidMount() {
    super.componentDidMount();
    if(this.props.isEndUser){
      this.countryCodeAPI();
      this.getCountryAPI();
      this.getkycDocumentListAPI();
    }else{
      !this.state.onfidoId && this.getkycDocumentListAPI();
    }
    this.getKycOrderRequestStatusAPI();
  }

  countryCodeAPI = async() => {
    this.getCountryCodeApiCallID = await this.apiCall({
      method: configJSON.GETApiMethod,
      endPoint: configJSON.countryCodeAPIEndPoint
    });
  };

  getCountryAPI = async () => {
    this.getCountryAPICallID = await this.apiCall({
      method: configJSON.GETApiMethod,
      endPoint: configJSON.getCountryAPI
    })
  }

  getKycOrderRequestStatusAPI = async () => {
    this.setLoader(true);
    const {orderID} = this.props;
    const workflow_id = this.state.workflowIDs;
    this.getKycRequestStatusAPI = await this.apiCall({
      method: configJSON.GETApiMethod,
      endPoint: `${configJSON.getKycRequestStatus}?notary_request_id=${orderID}&workflow_id=${workflow_id}`,
    });
  }

  createKycStartAPI = async () => {
    const {orderID} = this.props;
    const {sendKycAPIDocumentIds} = this.state;
    const apiBodyData = {
      workflow_id: this.state.workflowIDs,
      workflow_level:this.state.selectedLevel,
      notary_request_id: orderID as number,
      requested_kyc_documents: sendKycAPIDocumentIds,
    };
    this.setLoader(true);
    this.kycCreateApiCall = await this.apiCall({
      method: configJSON.POSTAPiMethod,
      endPoint: configJSON.kycCreateApi,
      body: apiBodyData,
    });
  }

  getkycDocumentListAPI = async () => {
    this.kycDocumentListAPICall = await this.apiCall({
      method: configJSON.GETApiMethod,
      endPoint: configJSON.kycDocumentList
    })
  }

  handleClickFormOpen = () => {
    this.setState({handleFormOpen: true});
  };
  
  handleClickFormClose = () => {
    this.setState({handleFormOpen: false,userFname:"",userMname:"",userLname:"",mobNumber:"",email:"",stateCode:"",identityType:"",idNumber:"",country:"",address1:"",address2:"",city:"",postcode:"",countries:[],errors:{},applicantCreateApiError:"",selectedDate:null,});
    this.setState({onfidoIframeOpen:false},() => {
      this.getKycOrderRequestStatusAPI();
    });
  };

  // Method to handle actual KYC completion (called when verification is successful)
  handleKYCCompletion = () => {
    this.getKycOrderRequestStatusAPI();
    // Call onComplete callback to notify parent component of KYC completion
    if (this.props.onComplete) {
      this.props.onComplete();
    }
    // Show success message to user
    this.setState({
      statusDiolog: true,
      kycCreateError: "" // Clear any previous errors
    });
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      this.setState({ statusDiolog: false });
    }, 3000);
  };
  
  getCountryCodeValue = (value) => {
    return value === "" ? "44" : value;
  };
  
  handleCodeChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    this.setState({ countryCode: event.target.value as string});
  };

   handleCountryChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { value } = event.target;
    const countryCode = this.getCountryCodeValue(this.state.countryCode);
    this.setState({ countryCode: countryCode,country: value as string });
  };

  handleIdTypeChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { value } = event.target;
    this.setState({ identityType: value as string });
  };
 
  handleDateChange = (date) => {
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      this.setState({ selectedDate: formattedDate });
    }
  };

  validateForm = () => {
    const errors = {};
    const emailMaxLength = 254;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  
    const requiredFields = [
      { field: 'userFname', message: 'First name is required' },
      { field: 'userMname', message: 'Middle name is required' },
      { field: 'userLname', message: 'Last name is required' },
      { field: 'mobNumber', message: 'Mobile number is required' },
      { field: 'selectedDate', message: 'Date of Birth is required' },
      { field: 'identityType', message: 'Identity Type is required' },
      { field: 'idNumber', message: 'ID number is required' },
      { field: 'stateCode', message: 'State Code is required' },
      { field: 'address1', message: 'Address is required' },
      { field: 'country', message: 'Country is required' },
      { field: 'city', message: 'City is required' },
      { field: 'postcode', message: 'Postcode is required' },
    ];
   
    requiredFields.forEach(({ field, message }) => {
      if (!this.state[field]) {
        errors[field] = message;
      }
    });
    
    if (!this.state.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(this.state.email)) {
      errors.email = 'Invalid email address';
    } else if (this.state.email.length > emailMaxLength) {
      errors.email = 'Email address is too long.';
    }
  
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };
  
  getCountryCode = (countryName) => {
    return countryCodeMap[countryName] || "Unknown";
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const formData = {
        userFname: this.state.userFname,
        userMname: this.state.userMname,
        userLname: this.state.userLname,
        mobNumber: `+${this.state.countryCode}${this.state.mobNumber}`,
        email: this.state.email,
        DOB: this.state.selectedDate,
        identityType: this.state.identityType,
        stateCode: this.state.stateCode,
        idNumber: this.state.idNumber,
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        country: this.state.country,
        postcode: this.state.postcode,
      };

      const formattedData = {
        first_name: formData.userFname,
        middle_name: formData.userMname,
        last_name: formData.userLname,
        email: formData.email,
        dob: formData.DOB, 
        id_numbers: [
          {
            type: formData.identityType, 
            value: formData.idNumber,
            state_code: formData.stateCode
          }
        ],
        phone_number: formData.mobNumber,
        consents: [
          {
            granted: false,  
            name: "ssn_verification",
          },
          {
            granted: true,  
            name: "phone_number_verification",
          },
        ],
        address: {
          country: formData.country,
          postcode: formData.postcode,
          flat_number: "", 
          building_number: "", 
          building_name: formData.address1, 
          street: formData.address2, 
          sub_street: "", 
          town: formData.city,
          state: "", 
          line1: formData.address1, 
          line2: formData.address2, 
          line3: "" 
        }
      };
      const requestData = {
        data: formattedData,
      };

      this.setLoader(true);
      this.setState({ applicantCreateApiError: "" });
      this.applicantCreateApiCall = await this.apiCall({
        method: configJSON.POSTAPiMethod,
        endPoint: `${configJSON.endUserApplicantCreate}?onfido_id=${this.state.onfidoId}`,
        body: requestData,
      });
    }
  };
  
   handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };


  apiCall = async (apiData: ApiCallInterface) => {
    let Token = await getStorageData("token");
     const {method, endPoint, body, type } = apiData;
    const header = {
      token: Token,
      "Content-Type":"application/json"
    };
     const requestMessages = new Message(
         getName(MessageEnum.RestAPIRequestMessage)
     );
     requestMessages.addData(
         getName(MessageEnum.RestAPIRequestHeaderMessage),
         JSON.stringify(header)
     );
     requestMessages.addData(
         getName(MessageEnum.RestAPIResponceEndPointMessage),
         endPoint
     );
     requestMessages.addData(
         getName(MessageEnum.RestAPIRequestMethodMessage),
         method
     );
    body && type !== "formData" ?
      requestMessages.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      ) :
      requestMessages.addData(getName(
        MessageEnum.RestAPIRequestBodyMessage),
        body
      )
    runEngine.sendMessage(requestMessages.id, requestMessages);
    return requestMessages.messageId;
  };

  // Customizable Area End
}


