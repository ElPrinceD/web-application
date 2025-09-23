import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";


// Customizable Area Start
export const config = require("./config");
import { getStorageData } from "../../../framework/src/Utilities";
import * as yup from "yup";
import {
  format,
  addMonths,
  subMonths,
  addDays,
  getDay,
} from "date-fns";


interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
}

interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}

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

interface NotarisationMethod {
  id: number;
  notarisation_method: string;
  created_at: string;
  updated_at: string;
}

interface PriorityMethod {
  priority: number;
  date: any;
}

type PriorityMethodArray = PriorityMethod[];

type PriorityType =
  | "Standard"
  | "Priority"
  | "Super Priority"
  | "Not Available";

interface Priorities {
  [key: string]: PriorityType;
}

interface DateRange {
  firstDay: string;
  lastDay: string;
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

interface FormValues {
  fullName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  serviceType: string;
  notarisationMethod: string;
  fees: string;
  vatInclusive: boolean;
  startTime: Date | string | null;
  endTime: Date | string | null;
  videoCall: boolean;
  notes: string;
}

interface PlateFormAttributes {
  id : number,
  services_id : number,
  notarisation_methods_id : number,
  fee_type : string,
  fee_value : string,
  notary_fees : string | undefined
}

export interface ClientRequestApiResponse{
  message?: string;
  error?: string;
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
  setLoader: (value: boolean) => void;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  isEndTimePickerOpen: boolean;
  isStartTimePickerOpen: boolean;
  tempSelectedDate: Date | null;
  tempSelectedSession: string;
  currentMonth: Date;
  calendarOpen: boolean;
  selectedSession: string;
  priorities: { [key: string]: PriorityType };
  selectedDate: Date | null;
  isSelectedDate: boolean;
  loader: boolean;
  priorityName: string;
  countryCodes: Array<CountryDataObject>;
  countryCode:string;
  serviceType: string;
  notarisationMethods: Array<NotarisationMethod>;
  notarisationMethod: string;
  successModal: boolean;
  failureModal: boolean;
  failureModalText: string;
  plateformFeesObj: PlateFormAttributes[];
  feesError: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class InviteFormController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  apiCallTimeoutId: any;
  getCountryCodeApiCallID: string = "";
  getPlateFormFeesApiCallId: string = "";
  getNotarisationMethodCallId: string = "";
  getPriorityApiCallId: string = "";
  postClientRequestApiCallId: string = "";
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
      isStartTimePickerOpen: false,
      isEndTimePickerOpen: false,
      currentMonth: new Date(),
      tempSelectedSession: "",
      calendarOpen: false,
      tempSelectedDate: null,
      selectedDate: null,
      priorities: {},
      selectedSession: "",
      isSelectedDate: false,
      loader: false,
      priorityName: "",
      countryCodes:[],
      countryCode:"",
      serviceType:"",
      notarisationMethods: [],
      notarisationMethod: "",
      successModal:false,
      failureModal:false,
      failureModalText:"",
      plateformFeesObj:[],
      feesError: "",
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

      if (this.isValidResponse(res)) {
        if (callId === this.getPriorityApiCallId) {
          clearTimeout(this.apiCallTimeoutId);
          if (
            callId === this.getPriorityApiCallId &&
            this.isPriorityMethodArray(res)
          ) {
            this.handlePrioritySet(res);
          }
        }                
        if(callId === this.getCountryCodeApiCallID){
          this.setCountryCodes(res);
        }
        if(callId === this.getNotarisationMethodCallId){          
          this.setState({ notarisationMethods: res });
        }
        if(callId === this.postClientRequestApiCallId){
          this.handleClientRequestResponse(res);       
        }
        this.setPlateFormFees(res , callId);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getPlateformFees();
    this.countryCodeAPI();
    this.getNotarisationMethods();
    this.getPriorityApi(this.getDateRangeFromMonth(new Date()));
  }

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

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
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
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

  getPriorityApi = async (dates: DateRange) => {
    this.setState({ loader: true });
    const { firstDay, lastDay } = dates;
    let isResponseReceived = false;
    const timeoutId = setTimeout(() => {
      if (!isResponseReceived) {
        this.setState({ priorities: this.setInitialPriorities() });
      }
    }, 30000);

    this.getPriorityApiCallId = await this.apiCall({
      contentType: config.appJsonContentType,
      method: config.getMethod,
      endPoint:
        config.getPriorityAPIEndPoint +
        `?from_date=${firstDay}&to_date=${lastDay}`,
    });
    this.apiCallTimeoutId = timeoutId;
  };

  getPlateformFees =  async() => {
    this.getPlateFormFeesApiCallId = await this.apiCall({
      contentType: config.appJsonContentType,
      method: config.getMethod,
      endPoint: config.getPlateFormFeesAPIEndPoint
    })
  }

  countryCodeAPI = async() => {
    this.getCountryCodeApiCallID = await this.apiCall({
      contentType: config.appJsonContentType,
      method: config.getMethod,
      endPoint: config.countryCodeAPIEndPoint
    });
  };

  getNotarisationMethods = async () => {
    this.getNotarisationMethodCallId = await this.apiCall({
      contentType: config.appJsonContentType,
      method: config.getMethod,
      endPoint: config.getNotrisationMetodEndpoint,
    });
  };

  getDateRangeFromMonth(date: Date) {
    const today = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    let firstDay,lastDay;
    if (year === today.getFullYear() && month === today.getMonth()) {
      firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split("T")[0];
      lastDay = new Date(year, month + 1, 0).toISOString().split("T")[0];
    } else {
      firstDay = new Date(year, month, 1).toISOString().split("T")[0];
      lastDay = new Date(year, month + 1, 0).toISOString().split("T")[0];
    }        
    return { firstDay, lastDay };
  }

  setInitialPriorities = (): Priorities => {
    const priorities: Priorities = {};
    const indices = Array.from({ length: 31 }, (_, itemData) => itemData);
    let priorityLimit = 0;
    const today = new Date();
    const tomorrow = addDays(today, 1);

    indices.forEach((value) => {
      const date = addDays(tomorrow, value - 1);
      const dateString = format(date, "yyyy-MM-dd");
      const isWeekend = getDay(date) === 0 || getDay(date) === 6;
      if (!isWeekend) {
        priorityLimit += 1;
        if (priorityLimit > 10) {
          priorities[dateString] = "Standard";
        } else {
          priorities[dateString] = "Priority";
        }
      } else {
        priorities[dateString] = "Super Priority";
      }
    });
    this.setState({ loader: false });
    return priorities;
  };

  isPriorityMethodArray(obj: any): obj is PriorityMethodArray {
    return (
      Array.isArray(obj) &&
      obj.every(
        (item) =>
          typeof item === "object" &&
          typeof item.priority === "number" &&
          typeof item.date === "string" &&
          item !== null
      )
    );
  }

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
  


  validationSchema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Enter your client's email address."),
    countryCode: yup.string(),
    mobileNumber: yup.string().required(),
    serviceType: yup.string().required(),
    notarisationMethod: yup.string().required(),    
    vatInclusive: yup.boolean(),
    startTime: yup.date().nullable().required("Select the time slot for your notary service."),
    endTime: yup.date().nullable().required("Select the time slot for your notary service.")
      .test("is-after-start", "Then end time must be after start time", function(endTime) {
        const startTime = this.parent.startTime;
        if (!startTime || !endTime) return false;
        return endTime > startTime;
      })
      .test(
        "min-duration",
        "Session must be at least 30 minutes long",
        function(endTime) {
          const startTime = this.parent.startTime;
          if (!startTime || !endTime) return false;
          const diffInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
          return diffInMinutes >= 30;
        }
      ),
      videoCall: yup.boolean().when("notarisationMethod", {
        is: (method) => {       
          if (!method) return false;
          const videoCallRequiredMethods = ["REN", "REIN"];           
          return videoCallRequiredMethods.some(reqMethod => 
            method.toUpperCase().includes(reqMethod)
          );
        },
        then: yup
          .boolean()
          .oneOf(
            [true],
            "Video call is required for REN and REIN notarisation methods"
          ),
        otherwise: yup.boolean(),
      }),  
    notes: yup.string(),
  });

  getTimeErrorMessage = (startTimeError: any, endTimeError: any) => {
    if (startTimeError && endTimeError) {
      return "Select the time slot for your notary service.";
    }
    if (startTimeError) {
      return startTimeError;
    }
    if (endTimeError) {
      return endTimeError;
    }
    return "Select the time slot for your notary service.";
  };

  findHelperTextColor = (isError: boolean | undefined) =>
    isError ? "red" : "#011342";

  
  findDateValue = () => {
    if (this.state.selectedDate !== null) {
      const dateObj = new Date(this.state.selectedDate);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); 
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      return "";
    }
  };

  findTimeValue = (time: Date | null) => {
    if (time === null) return "";
    let hours : string | number = time.getHours();
    let minutes : string | number = time.getMinutes();
    let meridian = "AM";
    if (hours >= 12) meridian = "PM";
    if (hours === 0) hours = hours + 12;
    if (hours > 12) hours = hours - 12;
    if (hours <= 9) hours = "0" + hours.toString();
    if (minutes <= 9) minutes = "0" + minutes.toString();
    return `${hours}:${minutes} ${meridian}`;
  };

  findVideoCallCheckboxColor = (isError: boolean) =>
    isError ? "red" : "#64748B";

  findVideoCallColor = (isError: boolean) => (isError ? "red" : "#011342");

  isVideoCallAsteriskShown = (method: string) =>
    method.includes("REN") || method.includes("REIN");

  calendarOpen = () => {
    this.setState({ calendarOpen: true, isSelectedDate: false });
  };

  save = () => {
    this.setState({
      calendarOpen: false,
      selectedDate: this.state.tempSelectedDate,
      selectedSession: this.state.tempSelectedSession,
    });
  };

  cancel = () => {
    this.setState({
      calendarOpen: false,
      tempSelectedDate: this.state.selectedDate,
      currentMonth: new Date(),
      tempSelectedSession: this.state.selectedSession,
    });
  };

  setSession = (session: string) => this.setState({ tempSelectedSession: session });

  leftArrow = () => {
    const {
      currentMonth,
      priorities,
    }: { currentMonth: Date; priorities: { [key: string]: any } } = this.state;
    const previousMonth: Date = subMonths(currentMonth, 1);
    const month: string = format(previousMonth, "MM");
    const year: string = format(previousMonth, "yyyy");
    const daysInMonth: number = new Date(
      parseInt(year),
      parseInt(month),
      0
    ).getDate();
    const currentDate: Date = new Date();
    const startOfCurrentMonth: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    if (previousMonth < startOfCurrentMonth) {
      this.setState({ currentMonth: previousMonth });
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
      this.setState({ currentMonth: previousMonth });
      return;
    }
    this.setState({ currentMonth: previousMonth });
    this.getPriorityApi(this.getDateRangeFromMonth(previousMonth));
  };

  rightArrow = () => {
    const {
      currentMonth,
      priorities,
    }: { currentMonth: Date; priorities: { [key: string]: any } } = this.state;
    const nextMonth: Date = addMonths(currentMonth, 1);
    const month: string = format(nextMonth, "MM");
    const year: string = format(nextMonth, "yyyy");
    const daysInMonth: number = new Date(
      parseInt(year),
      parseInt(month),
      0
    ).getDate();
    const currentDate: Date = new Date();
    const startOfCurrentMonth: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    if (nextMonth < startOfCurrentMonth) {
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

  handleDateClick = (date: Date | null, priorityName: string) => {
    this.setState({
      tempSelectedDate: date,
      isSelectedDate: false,
      priorityName: priorityName,
    });
  };

  getEmailError = (error: any ) =>
    error ? error : "Enter your client's email address.";

  checkDateError = (values:FormValues) => {
    this.setState({
      isSelectedDate:
        this.state.selectedDate === null,
        feesError: values.fees.trim() === "" ? "Please enter your fees.":"" 
    });
  };

  setCountryCodes = (res:CountryResponse) => {    
    const uniqueCountryCodeData = res.countries.filter((country, index, self) =>
      index === self.findIndex((c) => c.country_code === country.country_code)
    );      
    this.setState({ countryCodes: uniqueCountryCodeData})        
  }

  getCountryCodeValue = (value:string) => {
    if(value === null){
      this.setState({countryCode: "44"});
      return "44"
    }else {
      return value;
    }
  };

  getNotaryServicesArray = ():any => {
    let servicesArray:string[] = [];
    const {
      serviceData
    } = this.props;    
    serviceData.forEach((menu, index) => {
      servicesArray[index] = menu.attributes.service_name;
    });
    return servicesArray;
  }

  getNotaryMethodsArray = ():any => {
    let methodsArray:string[] = [];
    const {
      notarisationMethods
    } = this.state;
    notarisationMethods.forEach((menu, index) => (
      methodsArray[index] = menu.notarisation_method
    ));
    return methodsArray;
  }

  validateFees = (fees: string, vatInclusive: boolean, serviceType: string, notarisationMethod: string): string => {   
    if (!fees || fees.trim() === '') {    
      return "Please enter your fees";
    }
    if (!vatInclusive) {     
      return "";
    }
    const feesNumber = Number(fees);
    if (isNaN(feesNumber) || feesNumber <= 0) {     
      return "Please enter a valid fees amount";
    }
    const serviceId = this.props.serviceData.find(
      (service: DataofService) => service.attributes.service_name === serviceType
    )?.id;
    const methodId = this.state.notarisationMethods.find(
      (method: NotarisationMethod) => method.notarisation_method === notarisationMethod
    )?.id;
    if (!serviceId || !methodId) {     
      return "";
    }
    const platformFee = this.state.plateformFeesObj.find(
      (fee: PlateFormAttributes) => fee.services_id.toString() === serviceId && 
            fee.notarisation_methods_id === methodId
    );
    if (!platformFee) {    
      return "";
    }
    const feeValue = parseFloat(platformFee.fee_value);    
    let remainingFees = feesNumber;
    if (platformFee.fee_type === "Percent") {
      const deduction = (feesNumber * feeValue) / 100;
      remainingFees = feesNumber - deduction;
    } else {
      remainingFees = feesNumber - feeValue;
    }    
    if (remainingFees <= 0) {      
      return platformFee.fee_type === "Percent" 
        ? `VAT of ${platformFee.fee_value}% exceeds the entered fees amount`
        : `VAT of £${platformFee.fee_value} exceeds the entered fees amount`;
    }    
    return "";
  };

  handleFeesChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    values: FormValues, 
    setFieldValue: any
  ) => {
    const newValue = event.target.value;    
      setFieldValue("fees", newValue);
      const error = this.validateFees(
        newValue,
        values.vatInclusive,
        values.serviceType,
        values.notarisationMethod
      );
      this.setState({ feesError: error });    
  };
  
  handleVatInclusiveChange = (checked: boolean, values: FormValues, setFieldValue: any) => {
    setFieldValue("vatInclusive", checked);
    const error = this.validateFees(
      values.fees,
      checked,
      values.serviceType,
      values.notarisationMethod
    );
    this.setState({ feesError: error });
  };

  handleSubmitClientForm = async (values: FormValues) => {       
    if (this.state.feesError) {      
      return; 
    }
    if(this.state.selectedDate !== null){                      
        this.props.setLoader(true);
        let selectedMethodId = this.state.notarisationMethods.find(
          method => method.notarisation_method === values.notarisationMethod
        )?.id;            
        let selectedServiceId = this.props.serviceData.find(
          service => service.attributes.service_name === values.serviceType
        )?.id;                
        let startTimeForPayload = new Date(values.startTime as Date);
        let endTimeForPayload = new Date(values.endTime as Date);                        
        const selectedYear = this.state.selectedDate.getFullYear();
        const selectedMonth = this.state.selectedDate.getMonth();
        const selectedDay = this.state.selectedDate.getDate();                        
        startTimeForPayload.setFullYear(selectedYear);
        startTimeForPayload.setMonth(selectedMonth);
        startTimeForPayload.setDate(selectedDay);
        endTimeForPayload.setFullYear(selectedYear);
        endTimeForPayload.setMonth(selectedMonth);
        endTimeForPayload.setDate(selectedDay); 
        const selectedDateFormated = new Date(selectedYear, selectedMonth, selectedDay); 
        let requestData={
          notary_request: {
            notary_service_type: selectedServiceId,
            notarisation_method_id: selectedMethodId,   
            jurisdiction_id : 1,         
            date: selectedDateFormated,
            notes: values.notes,    
            notarised_document: 1,        
            priority: this.state.priorityName,
            invite_email: values.email,
            invite_name: values.fullName,
            invite_number: values.mobileNumber
          },
          quote: {
          start_time: startTimeForPayload,
          end_time: endTimeForPayload,
          video_call_required: values.videoCall,
          fees: parseFloat(values.fees), 
          vat_inclusive:  values.vatInclusive,
          }
        }
        
        this.postClientRequestApiCallId = await this.apiCall({
          contentType: config.appJsonContentType,
          method: config.postMethod,
          endPoint: config.clientRequestAPIEndPoint,
          body: requestData,
        })

      }
    else{
      return;
    }        
  }
     
  handleClientRequestResponse = (res:ClientRequestApiResponse) => {
    this.setState({
      tempSelectedSession : "",
      calendarOpen : false,
      tempSelectedDate: null,
      selectedDate: null,
      selectedSession : "",
      isSelectedDate : false,
      feesError:""
    })
    if(!res.error){
      this.props.setLoader(false);
      this.props.closeModal(); 
      this.setState(
        {successModal: true},
        ()=>{
          this.props.allRequestAPI && this.props.allRequestAPI();                
        }
      );
    }
    else{
      this.props.setLoader(false);
      this.props.closeModal();
      this.setState({
          failureModal:true ,
          failureModalText:res.error,
        },
        ()=>{
          setTimeout(()=> {
            this.setState({failureModal: false, failureModalText:""});
          }, 3000);
          this.props.allRequestAPI && this.props.allRequestAPI();                
        }
      );
    }
  }

  navigateToDashboard = () =>{    
    this.setState({
     successModal : false,
     failureModal : false,
    });
    this.props.navigation.navigate("Dashboard");
  }

  getCountryOptions = () => {
    let codes = this.state.countryCodes.map( code => {
      return code.country_code.toString();
    })
    return codes;
  }

  getPlusOptionLabel = (option: any) => {
    if (!option) return "";    
    const cleanCode = option.replace('+', '');
    return `+${cleanCode}`;
  };

  resetErrorsAtClose = () => {
    this.setState({
      isSelectedDate :false
    })
    this.props.closeModal()
  }

  setPlateFormFees = (res:any , apiCallId:string) => {
    if( apiCallId === this.getPlateFormFeesApiCallId){
      if(res?.platform_fees){
        this.setState({ plateformFeesObj : res.platform_fees })
      }
    }
  }

  // Customizable Area End
}
