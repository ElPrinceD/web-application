import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

export const configJSON = require("./config");
const navigation = require("react-navigation");

// Customizable Area Start
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";
import React from "react";

// Customizable Area End

export interface Props {
  navigation: typeof navigation;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface RowsData {
  "id": number,
  "account_id": number,
  "request_type": string | null,
  "payment_date": string | null,
  "payment_method": string | null,
  "transaction_number": string | null,
  "notary_request_id": number | null,
  "notary_id": string | null,
  "status": string | null,
  "amount": string,
  "created_at": string | null,
  "updated_at": string | null
}
export interface ApiCallInterface {
  contentType?: string;
  method?: string;
  endPoint?: string;
  body?: object;
  type?: string;
}

export interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}

export interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
  status: number;
}

type DateType = [Date, Date] | Date | null;

interface S {
  // Customizable Area Start
  isSideBarOpen: boolean;
  transactionsList: any[]
  pages: string[]
  tabs: string[]
  tabeValue: number,
  filteredData: any[],
  orderId: string;
  userRoleId: number
  token: string
  loader: boolean
  page: number;
  isLoading: boolean;
  hasMore: boolean;
  openFilterDialog: boolean,
  dateType: string;
  filterTempDuration: string;
  filterDuration: string;
  calendarOpen: boolean;
  tempDate: DateType,
  selectedDate: DateType,
  filterStatus: string;
  filterTempStatus: string;
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class TransactionHistoryController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  tableContainerRef: React.RefObject<HTMLDivElement>;
  userProfileInfoCallId: string = "";

  fetchTransactionHistoryListId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      isSideBarOpen: false,
      transactionsList: [],
      pages: ['ALL', 'PAID', 'FAILED'],
      tabs: ["All", "PAID", "FAILD"],
      tabeValue: 0,
      filteredData: [],
      orderId: '',
      userRoleId: 0,
      token: '',
      loader: false,
      page: 1,
      isLoading: false,
      hasMore: true,
      openFilterDialog: false,
      dateType: 'single',
      filterDuration: '',
      filterTempDuration: '',
      calendarOpen: false,
      tempDate: null,
      selectedDate: null,
      filterStatus: "",
      filterTempStatus: ""
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.tableContainerRef = React.createRef();
    this.scrollListener = this.scrollListener.bind(this);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      setStorageData("token", token)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(webResponseJson)) {
        this.responseSuccessCallBack(webApiRequestCallId, webResponseJson)
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  isValidResponse = (responseJson: ValidResponseType) => {
    return responseJson && !responseJson.errors;
  }

  async componentDidMount() {
    super.componentDidMount();
    const token = await getStorageData("authToken");
    const filter = await getStorageData("filter");
    this.getToken();
    this.setToken(token);
    this.setState({ filteredData: this.state.transactionsList })
    this.getTransactionHistoryList();
    window.addEventListener('scroll', this.scrollListener);
    if (this.tableContainerRef.current) {
      this.tableContainerRef.current.addEventListener('scroll', this.scrollListener);
    }
  }

  async componentWillUnmount() {
    super.componentWillUnmount();
    if (this.tableContainerRef.current) {
      this.tableContainerRef.current.removeEventListener('scroll', this.scrollListener);
    }
  }

  scrollListener() {
    if (this.tableContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = this.tableContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && this.state.hasMore && !this.state.isLoading) {
        this.setState(
          (prevState) => ({
            page: prevState.page + 1,
          }),
          () => {
            this.getTransactionHistoryList();
          }
        );
      }
    }
  }

  handleEventTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ tabeValue: newValue });
    if (newValue !== 0) {
      this.setState({ filterTempStatus: "", filterStatus: "" });
    }
  };

  a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  handleUserDetails = (response: any) => {
    if (response.data) {
      const { attributes } = response.data;
      this.setState({ userRoleId: attributes.role_id });
    } else {
      const { error } = response;
      console.error(error);
    }
  }


  getToken = () => {
    const message: Message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  handleOrderIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    this.setState({ orderId: event.target.value });
  };

  convertDate = (inputDate: string | Date) => {
    if (inputDate) {
      const date = new Date(inputDate);

      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();

      return `${day}/${month}/${year}`;
    } else {
      return ""
    }

  }

  goToUserProfile = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "UserProfileBasicBlock");
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({ token });
      this.getUserDetails(token);
    } else {
      this.setState({ token: "" });
    }
  }

  getUserDetails = (token: string) => {
    if (token) {
      this.setState({ loader: true });
      const header = {
        "Content-Type": configJSON.ApiContentType,
        "token": token
      };

      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.userProfileInfoCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getUserProfileEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpGetMethod
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
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

  getTabStatus = (value: number) => {
    const { filterStatus } = this.state;
    if (value === 0 && filterStatus === "successfull") {
      return "PAID"
    } else if (value === 0 && filterStatus === "failed") {
      return "FAILED"
    } else if (value === 1) {
      return "PAID"
    } else if (value === 2) {
      return "FAILED"
    } else return ""
  }

  getStartTime = (selectedDate: DateType) => {
    if (Array.isArray(selectedDate) && selectedDate.length === 2) {
      let startDate = new Date(selectedDate[0]);
      startDate.setHours(0, 0, 0, 0);
      return startDate;
    } else if (selectedDate instanceof Date) {
      let startDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);
      return startDate;
    } else return ""
  }

  getEndTime = (selectedDate: DateType) => {
    if (Array.isArray(selectedDate) && selectedDate.length === 2) {
      let endDate = new Date(selectedDate[1]);
      endDate.setHours(23, 59, 59, 999);
      return endDate;
    } else if (selectedDate instanceof Date) {
      let endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999);
      return endDate;
    } else return ""
  }

  getTransactionHistoryList = async () => {
    const { isLoading, hasMore, page, selectedDate } = this.state;

    const startTime = this.getStartTime(selectedDate);
    const endTime = this.getEndTime(selectedDate);

    if (isLoading && !hasMore) return;
    this.setState({ isLoading: true });
    const Status = this.getTabStatus(this.state.tabeValue);
    const orderId = this.state.orderId.length > 0 ? Number(this.state.orderId) : ''
    this.fetchTransactionHistoryListId = await this.apiCall({
      contentType: configJSON.ApiContentType,
      method: configJSON.httpGetMethod,
      endPoint: `${configJSON.transactionHistoryListEndpoint}filter=${Status}&order_id=${orderId}&per_page=${10}&page=${page}&request_date_start=${startTime}&request_date_end=${endTime}`
    });
  };

  responseSuccessCallBack = (apiRequestCallId: string, responseJson: any) => {
    this.setState({ loader: false });
    if (apiRequestCallId === this.fetchTransactionHistoryListId) {
      this.handleTransactionHistoryRes(responseJson);
    }
    if (apiRequestCallId === this.userProfileInfoCallId) {
      this.handleUserDetails(responseJson);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>, snapshot?: SS | undefined): void {
    if (this.state.tabeValue !== prevState.tabeValue || this.state.orderId !== prevState.orderId || prevState.filterDuration !== this.state.filterDuration || prevState.filterStatus !== this.state.filterStatus) {

      this.setState({ transactionsList: [], hasMore: true, page: 1 }, () => this.getTransactionHistoryList());
    }
  }

  handleTransactionHistoryRes = (response: any) => {

    if (!response.error) {
      this.setState((prevState) => ({
        transactionsList: [...prevState.transactionsList, ...response.transaction_history],
        isLoading: false,
        hasMore: response.transaction_history.length === 10,
      }))
    } else {
      console.error("Error loading transactions:", response);
      this.setState({ isLoading: false, hasMore: false });
    }
  }

  handleFilterOpen = () => {
    this.setState({ openFilterDialog: true });
  }

  handleDateTypeChange = (event: any) => {
    this.setState({ dateType: event.target.value, filterTempDuration: '', tempDate: null, selectedDate: null })
  }

  handleFilterDurationBtn = (duration: string) => {

    const today = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = today;
    let dateType: string = "";

    switch (duration) {
      case 'today':
        dateType = "single"
        break;
      case 'last_7_days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        dateType = "range"
        break;
      case 'last_30_days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        dateType = "range"
        break;
      case 'last_90_days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 90);
        dateType = "range"
        break;
      default:
    }

    let selectedDate: Date | [Date, Date] | null;

    if (dateType === "single") {
      selectedDate = endDate;
    } else if (startDate) {
      selectedDate = [startDate, endDate] as [Date, Date];
    } else {
      selectedDate = null;
    }

    this.setState({
      filterTempDuration: duration,
      tempDate: selectedDate,
      selectedDate,
      dateType
    });
  }

  handleCloseFilter = () => {
    this.setState({ openFilterDialog: false });
  }

  openCalendar = () => {
    this.setState({ calendarOpen: true });
  };

  formatDateRange = (dateRange: DateType) => {

    if (Array.isArray(dateRange) && dateRange.length === 2) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
      const startDate = dateRange[0].toLocaleDateString('en-GB', options);
      const endDate = dateRange[1].toLocaleDateString('en-GB', options);

      return `${startDate} - ${endDate}`;

    } else if (dateRange instanceof Date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as const;
      const startDate = dateRange.toLocaleDateString('en-GB', options);

      return `${startDate}`;
    }
    return 'Date';
  };

  handleDateChange = (date: any) => {
    if (Array.isArray(date)) {
      this.setState({ tempDate: [new Date(date[0]), new Date(date[1])] });
    } else if (date instanceof Date) {
      this.setState({ tempDate: date });
    }
  };

  handleCalendarCancelBtn = () => {
    this.setState({
      calendarOpen: false,
      tempDate: null
    });
  }

  handleCalendarSaveBtn = () => {

    if (Array.isArray(this.state.tempDate) && this.state.tempDate.length === 2) {
      this.setState({
        selectedDate: [this.state.tempDate[0], this.state.tempDate[1]],
        calendarOpen: false,
        tempDate: null
      });

    } else if (this.state.tempDate instanceof Date) {
      this.setState({
        selectedDate: this.state.tempDate,
        calendarOpen: false,
        tempDate: null
      });
    }
  }

  handleReset = () => {
    this.setState({
      dateType: '',
      selectedDate: null,
      tempDate: null,
      calendarOpen: false,
      filterDuration: "",
      filterStatus: "",
      filterTempDuration: "",
      filterTempStatus: ""
    }, ()=> this.getTransactionHistoryList())
  }

  getBackgroundColor = () => {
    const { selectedDate, dateType } = this.state;
    if (dateType && selectedDate) {
      return "#012275";
    } else return '#CCD3E3';
  }

  handleApplyFilter = () => {
    const { selectedDate, dateType, filterTempDuration } = this.state;
    if (dateType && selectedDate) {
      this.setState({
        filterDuration: this.state.filterTempDuration,
        filterStatus: this.state.filterTempStatus,
        openFilterDialog: false,
      })
    }
    if (dateType && selectedDate && !filterTempDuration) {
      this.setState({
        transactionsList: [], 
        page: 1, 
        hasMore: true,
        filterDuration: this.state.filterTempDuration,
        filterStatus: this.state.filterTempStatus,
        openFilterDialog: false,
      }, () => this.getTransactionHistoryList())
    }
  }

  handleFilterStatus = (status: string) => {
    const { tabeValue } = this.state;
    if (tabeValue === 0) {
      this.setState({ filterTempStatus: status })
    }
  }

  handleDeleteChip = (type: string) => {
    if (type === 'duration') {
      this.setState({
        filterDuration: "",
        filterTempDuration: "",
        selectedDate: null,
        tempDate: null,
        dateType: ""
      })
    } else if (type === 'status') {
      this.setState({
        filterStatus: "",
        filterTempStatus: ""
      })
    }
  }

  renderDurationChip = (duration: string) => {
    switch (duration) {
      case 'today':
        return "Today"
      case 'last_7_days':
        return "Last 7 Days"
      case 'last_30_days':
        return "Last 30 Days"
      case 'last_90_days':
        return "Last 90 Days"
      default:
        return ""
    }
  }

  renderStatusChip = (status: string) => {
    if (status === "successful") {
      return "Successful"
    } else if (status === "failed") {
      return "Failed"
    } else return ""
  }

  getBorderColorDuration(conditionValue: string) {
    return this.state.filterTempDuration === conditionValue ? '1px solid #012275' : '';
  }

  getBorderColorStatus(conditionValue: string) {
    return this.state.filterTempStatus === conditionValue ? '1px solid #012275' : '';
  }

  // Customizable Area End
}
