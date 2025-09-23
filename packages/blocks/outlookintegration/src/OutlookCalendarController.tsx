import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
require("isomorphic-fetch");
import { EventContentArg } from "@fullcalendar/react";
import { OutlookAuthProvider } from "../../../components/src/OutlookAuthProvider.web";
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";



interface Event {
  id: string;
  subject: string;
  start: { dateTime: string };
  end: { dateTime: string };
  organizer: {
    emailAddress: { name: string };
    start: { dateTime: string };
    end: { dateTime: string };
  };
}

interface EventItem {
  onlineMeetingUrl: string;
  id?: string;
  title: string;
  bodyPreview?: string;
  start?: { dateTime: string; date: string };
  end?: { dateTime: string; date: string };
  conferenceData?: {
    entryPoints: { uri: string }[];
  };
  attendees?: {
    responseStatus: string;
    email: string;
  }[];
  subject: string;
}

interface CalendarData extends Omit<EventItem, 'start' | 'end'> {
  start?: any;
  end?: any;
}

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  date?: any
  onCalendarDataChange?: any;
  calendarData?: CalendarData[]
  isSynced?: any
  triggerEvent?: any
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  displayName: string;
  calendars: Array<Event>;
  token: string;
  selectedEventDetails: EventContentArg | null;
  authDetails: unknown
  calendarData: CalendarData[];
  loader: boolean;
  filteredOutlookEventData: CalendarData[]
  isSynced: boolean
  refresh_token: string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OutlookCalendarController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // static contextType = MsalContext;
  getOutlookCalendarEventCallId: string = "";
  updateOutlookCalendarTokenApiCallId: string = "";
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
      displayName: "",
      calendars: [],
      token: "",
      selectedEventDetails: null,
      authDetails: null,
      calendarData: [],
      loader: false,
      filteredOutlookEventData: [],
      isSynced: false,
      refresh_token: ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    const isOutlookSync = await getStorageData("isOutlookSync", true);
    const token = await getStorageData("token");
    this.setToken(token)
    this.setIsSync(isOutlookSync);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getOutlookCalendarEventCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
    }

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.updateOutlookCalendarTokenApiCallId ===
      message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      this.setState({loader: false});
    }
    // Customizable Area End
  }

  // Customizable Area Start

  setToken = (token: string) => {
    if(token){
      this.setState({token});
    }
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>) {
    if(prevState.isSynced !== this.state.isSynced && this.state.isSynced){
      const refresh_token = await getStorageData("ms_refreshToken");
      if(refresh_token){
        this.updateCalendarTokenApiCall(refresh_token);
      } else {
        this.setState({isSynced: false});
      }
    }
  } 

  handleSyncWithOutlook = async () => {
    const refresh_token = await getStorageData("ms_refreshToken");
    if(refresh_token){
      this.getNewAccessToken(refresh_token)
    }
  }

  getNewAccessToken = async (refresh_token: string) => {
    this.setState({refresh_token})
    try {
      const token = await OutlookAuthProvider.refreshAccessToken(refresh_token);
      setStorageData("ms_accessToken", token);
      setStorageData("isOutlookSync", true);
      this.setState({ isSynced: true });
      this.props.triggerEvent(token);

    }catch (error) {
      removeStorageData('ms_accessToken');
      removeStorageData('isOutlookSync');
      this.setState({ isSynced: false, });

      console.error('Error refreshing Google token:', error);
    }
  }

  setIsSync = (isSynced: boolean) => {
    if (isSynced) {
      this.setState({ isSynced: true });
    } else {
      this.setState({ isSynced: false });
    }
  }

  renderFilteredEvents = () => {
    const { calendarData } = this.state
    const filteredEvents = calendarData?.filter(
      event => new Date(event?.start).toDateString() === this.props.date.toDateString()
    );
    this.setState({ filteredOutlookEventData: filteredEvents });
    return filteredEvents;
  }
  setEventInfo = (eventInfo: any) => {
    this.setState({ selectedEventDetails: eventInfo });
  };

  closeModalHandle = () => {
    this.setState({ selectedEventDetails: null });
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

  updateCalendarTokenApiCall = (refresh_token: string) => {
    this.setState({ loader: true });

    const header = {
        "Content-Type": "application/json",
        token: this.state.token,
    };

    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateOutlookCalendarTokenApiCallId = requestMessage.messageId;

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.updateCalendarTokenEndpoint}outlook_calendar_token=${refresh_token}&outlook_calendar_sync=${this.state.isSynced}`
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        "PUT"
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  // Customizable Area End
}
