import {IBlock} from "../../../framework/src/IBlock";
import {Message} from "../../../framework/src/Message";
import {BlockComponent} from "../../../framework/src/BlockComponent";
import MessageEnum, {getName,} from "../../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../../framework/src/RunEngine";

// Customizable Area Start
import { googleIcon } from "./assets";
import { EventContentArg } from "@fullcalendar/react";
import { CalendarData, EventItem } from "./types";
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
import { GoogleAuthProvider } from "../../../components/src/GoogleAuthProvider.web";
// Customizable Area End

export const configJSON = require("./config.js");


export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  date: any;
  onCalendarDataChange?: any
  calendarData?: CalendarData[]
  isSynced?: any
  triggerEvent?: any
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  calendarData: CalendarData[];
  selectedEventItem: EventItem | null;
  selectedEvent: EventContentArg | null;
  authDetails: unknown;
  openAddModal: boolean;
  inputFields: {
    summary: string;
    start: string;
    end: string;
    location: string;
    description: string;
    timezone: string;
    attendees: string;
  };
  isSingedIn: boolean;
  selectedDay: string | null;
  openDatePicker: string | null;
  loader: boolean;
  filteredEventData: CalendarData[],
  isSynced: boolean,
  token: string;
  refresh_token: string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GoogleCalendarSyncController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  addEventCallId: string = "";
  getEventCallId: string = "";
  timeZone = [
    {
      label: "(GMT+01:00) United Kingdom Time",
      value: "Europe/London",
    },
    {
      label: "(GMT-04:00) Eastern Time - New York",
      value: "America/New_York",
    },
    {
      label: "(GMT+05:30) India Standard Time - Kolkata",
      value: "Asia/Kolkata",
    },
  ];

  updateGoogleCalendarTokenApiCallId: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      calendarData: [],
      selectedEventItem: null,
      selectedEvent: null,
      authDetails: null,
      openAddModal: false,
      inputFields: {
        summary: "",
        start: new Date().toISOString(),
        end: new Date().toISOString(),
        location: "",
        description: "",
        timezone: this.timeZone[0].value,
        attendees: "",
      },
      isSingedIn: false,
      selectedDay: null,
      openDatePicker: null,
      loader: false,
      filteredEventData: [],
      isSynced: false,
      token: "",
      refresh_token: ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start

    const isGoogleSync = await getStorageData("isGoogleSync", true);
    const token = await getStorageData("token");
    this.setToken(token)
    this.setIsSync(isGoogleSync);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getEventCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const error = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (error) {
        this.parseApiCatchErrorResponse(error);
      } else {
        const responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        if (responseJson && responseJson.error) {
          this.parseApiCatchErrorResponse(configJSON.errorMsg);
        } else {
          this.closeModalHandle();
          this.getEvents(this.state.authDetails as string);
        }
      }
    }
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.updateGoogleCalendarTokenApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ){
      this.setState({loader: false})
    }

    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>) {
    if (prevState.isSynced !== this.state.isSynced && this.state.isSynced) {
      const refresh_token = await getStorageData("refresh_google_auth");
      if(refresh_token){
        this.updateCalendarTokenApiCall(refresh_token);
      }else {
        this.setState({isSynced: false});
      }
    }
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({ token });
    }
  }

  setIsSync = (isSynced: boolean) => {
    if (isSynced) {
      this.setState({ isSynced: true });
    } else {
      this.setState({ isSynced: false });
    }
  }

  getEvents = (token: string) => {
    this.setState({ loader: true });
    const header = {
      "Content-Type": configJSON.googleEventApiContentType,
      Authorization: `Bearer ${token}`,
    };

    const getEventMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getEventCallId = getEventMessage.messageId;

    getEventMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleEventEntPoint
    );

    getEventMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    getEventMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getEventApiMethod
    );

    runEngine.sendMessage(getEventMessage.id, getEventMessage);
    return true;
  };

  googleIconWebProps = {
    src: googleIcon,
  };

  googleIconProps = {
    source: googleIcon,
  };

  closeModalHandle = () => {
    this.setState({ selectedEvent: null, openAddModal: false });
  };

  getDate = (date1: string | Date, date2: string | Date) => {
    let sDate = new Date(date1);
    let eDate = new Date(date2);

    if (Math.abs(sDate.getTime() - eDate.getTime()) / 36e5 === 24) {
      return sDate.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
      });
    }

    let startDate = sDate.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    });

    let endDate = eDate.toLocaleString(undefined, {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    });

    return startDate + " - " + endDate;
  };

  addEvent = () => {
    let attendees: {
      responseStatus?: string;
      email: string;
    }[] = [];

    if (this.state.inputFields.attendees?.length > 0) {
      this.state.inputFields.attendees
        .replace(/\s/g, "")
        .split(",")
        ?.map((item: string) => {
          attendees.push({ email: item });
        });
    }
    const event = {
      summary: this.state.inputFields.summary,
      location: this.state.inputFields.location,
      description: this.state.inputFields.description,
      start: {
        dateTime: new Date(this.state.inputFields.start).toISOString(),
        timeZone: this.state.inputFields.timezone,
      },
      end: {
        dateTime: new Date(this.state.inputFields.end).toISOString(),
        timeZone: this.state.inputFields.timezone,
      },
      attendees: attendees,
    };

    const header = {
      "Content-Type": configJSON.googleEventApiContentType,
      Authorization: `Bearer ${this.state.authDetails}`,
    };

    const addEventMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.addEventCallId = addEventMessage.messageId;

    addEventMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googleEventEntPoint
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.addEventApiMethod
    );

    addEventMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(event)
    );

    runEngine.sendMessage(addEventMessage.id, addEventMessage);
    return true;
  };

  setEventInfo = (eventInfo: EventContentArg) => {
    this.setState({ selectedEvent: eventInfo });
  };

  handleGoogleSync = async () => {
    const refresh_token = await getStorageData("refresh_google_auth");
    if(refresh_token){
      this.refreshGoogleToken(refresh_token);
    }
  };

  openAddModal = () => this.setState({ openAddModal: true });

  onChangeHandler = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (event.target.name) {
      this.setState({
        inputFields: {
          ...this.state.inputFields,
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  renderFilteredEvents = () => {
    const { calendarData } = this.state
    const filteredEvents = calendarData?.filter(
      event => new Date(event?.start).toDateString() === this.props.date.toDateString()
    );
    this.setState({ filteredEventData: filteredEvents });
    return filteredEvents;
  }

  refreshGoogleToken = async (token: string) => {
    try {
      const access_token = await GoogleAuthProvider.refreshAccessToken(token);

      setStorageData('google_auth', access_token);
      setStorageData('isGoogleSync', true);
      this.setState({ isSynced: true });
      this.props.triggerEvent(access_token);
    } catch (error) {
      removeStorageData('google_auth');
      removeStorageData('isGoogleSync');
      this.setState({ isSynced: false, });

      console.error('Error refreshing Google token:', error);
    }
  }

  updateCalendarTokenApiCall = (refresh_token: string) => {
    this.setState({ loader: true });

    const header = {
      "Content-Type": "application/json",
      token: this.state.token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateGoogleCalendarTokenApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.updateCalendarTokenEndpoint}google_calendar_token=${refresh_token}&google_calendar_sync=${this.state.isSynced}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      "PUT"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area End
}
