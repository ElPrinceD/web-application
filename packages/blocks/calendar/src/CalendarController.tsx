import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { EventContentArg } from "@fullcalendar/react";
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
import { OutlookAuthProvider } from "../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../components/src/GoogleAuthProvider.web";


interface EventItem {
  id?: string;
  title: string;
  description?: string;
  start?: { dateTime: string; date: string };
  end?: { dateTime: string; date: string };
  conferenceData?: {
    entryPoints: { uri: string }[];
  };
  attendees?: {
    responseStatus: string;
    email: string;
  }[];
  summary: string;
  passcode?: string;
}

interface OutlookEventItem {
  id?: string;
  title: string;
  onlineMeetingUrl: string;
  subject: string;
  bodyPreview?: string;
  start?: { dateTime: string; date: string };
  end?: { dateTime: string; date: string };
  conferenceData?: {
    entryPoints: { uri: string }[];
  };
  attendees?: {
    email: string;
    responseStatus: string;
  }[];
}

interface RenotaryMeetingResponseItem {
  account_id: number;
  notary_request_id?: number;
  meeting: {
    id: number;
    host_email: string;
    topic: string;
    password: string
    timezone: string;
    start_url?: string;
    join_url?: string;
    settings?: {
      meeting_invitees?: any[];
    };
  },
  accounts: Array<{
    id: string;
    name: string;
    role: string;
    photoUrl?: string;
  }>
  start_time: string;
  end_time: string;
}

interface CalendarData extends Omit<EventItem, 'start' | 'end'> {
  start?: any;
  end?: any;
}
interface OutlookCalendarData extends Omit<OutlookEventItem, 'start' | 'end'> {
  start?: any;
  end?: any;
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  date: any;
  selectedEventTab: number
  loading: boolean
  renotaryEvents: CalendarData[]
  selectedCalendarEvent: EventContentArg | null;
  token: string;
  userId: number | null; // Add user ID for API calls
  googleCalendarData: CalendarData[];
  outlookCalendarData: OutlookCalendarData[];
  loader: boolean;
  google_auth: string,
  googleAuthDetails: boolean;
  outlook_auth: string,
  outlookAuthDetails: boolean;
  isMeetingConflicting: boolean;
  refresh_google_auth: string;
  refresh_outlook_auth: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CalendarController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  renotaryCalendarEventCallId: string = "";
  getGoogleEventCallId: string = "";
  getOutlookEventCallId: string = "";

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage), // Add session response to get user ID
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      date: new Date(),
      selectedEventTab: 0,
      loading: false,
      renotaryEvents: [],
      selectedCalendarEvent: null,
      token: "",
      userId: null, // Initialize user ID
      googleCalendarData: [],
      outlookCalendarData: [],
      loader: false,
      google_auth: "",
      googleAuthDetails: false,
      outlook_auth: "",
      outlookAuthDetails: false,
      isMeetingConflicting: false,
      refresh_google_auth: "",
      refresh_outlook_auth: ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Handle session response to get user ID
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      if (token) {
        // Extract user ID from session data
        const messageData = JSON.parse(
          message.getData(getName(MessageEnum.SessionResponseData))
        );
        const userId: number = messageData?.meta?.id;
        if (userId) {
          this.setState({ userId, token });
          console.log("Calendar: User ID set to:", userId);
        }
      }
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
          if (apiRequestCallId === this.renotaryCalendarEventCallId) {
        if (response && !response.errors) {
          this.handleRenotaryCalendarEvents(response);
        } else {
          console.log("Calendar API error:", response?.errors || "Unknown error");
          this.setState({ loading: false });
        }
      }
      if (apiRequestCallId === this.getOutlookEventCallId) {
        this.handleOutlookEventRes(response);
      }
      if (apiRequestCallId === this.getGoogleEventCallId) {
        this.handleGoogleEventsRes(response);
      }
    }
    
    // Handle network errors (like 422s) gracefully
    if (getName(MessageEnum.RestAPIResponceErrorMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const errorMessage = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      
      console.log(`Calendar network error for API call ${apiRequestCallId}:`, errorMessage);
      
      if (apiRequestCallId === this.renotaryCalendarEventCallId) {
        console.log("Calendar availabilities network error, stopping loading");
        this.setState({ loading: false });
      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    const token = await getStorageData("authToken");
    const ms_refreshToken = await getStorageData("ms_refreshToken");
    const google_auth = await getStorageData("refresh_google_auth");
    const isGoogleSync = await getStorageData("isGoogleSync", true);
    const isOutlookSync = await getStorageData("isOutlookSync", true);

    this.setToken(token);
    this.setGoogleAuth(google_auth, isGoogleSync);
    this.setOutlookAuth(ms_refreshToken, isOutlookSync);
    this.getRenotaryCalendarEvent();
    // Customizable Area End
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>,) {
    if (prevState.date !== this.state.date) {
      const { google_auth, outlook_auth } = this.state;
      this.getRenotaryCalendarEvent();
      this.getGoogleEvents(google_auth);
      this.getOutlookEvents(outlook_auth);
    }
    if (
      prevState.googleCalendarData !== this.state.googleCalendarData ||
      prevState.outlookCalendarData !== this.state.outlookCalendarData ||
      prevState.renotaryEvents !== this.state.renotaryEvents
    ) {
      this.checkMeetingsConflit();
    }
  }

  setGoogleAuth = async (token: string, isSync: boolean) => {
    if (token && isSync) {
      this.setState({ refresh_google_auth: token });
      const auth_token = await GoogleAuthProvider.refreshAccessToken(token);
      this.setState({ google_auth: auth_token, });
      this.getGoogleEvents(auth_token);
    }
  }

  setOutlookAuth = async (token: string, isSync: boolean) => {
    if (token && isSync) {
      this.setState({ refresh_outlook_auth: token });
      const auth_token = await OutlookAuthProvider.refreshAccessToken(token);
      this.setState({ outlook_auth: auth_token, });
      this.getOutlookEvents(auth_token);
    }
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({ token })
    }
  }

  onChange = (date: any) => {
    this.setState({ date });
  };

  handleEventTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ selectedEventTab: newValue });
  };

  a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  getRenotaryCalendarEvent = () => {
    // Check if we have user ID before making the API call
    if (!this.state.userId) {
      console.log("Calendar: User ID not available, cannot fetch availabilities");
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: true });

    const start_time = this.state.date ? new Date(this.state.date) : new Date();
    start_time.setHours(0, 0, 0, 0);
    const end_time = this.state.date ? new Date(this.state.date) : new Date();
    end_time.setHours(23, 59, 59, 999);

    const header = {
      "Content-Type": configJSON.ApiContentType,
      "token": this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.renotaryCalendarEventCallId = requestMessage.messageId;

    // Include user ID in the endpoint path as required by backend
    const endpoint = `${configJSON.renotaryEventApiEndpoint}/${this.state.userId}?start_time=${start_time}&end_time=${end_time}`;
    console.log("Calendar: Calling endpoint:", endpoint);

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
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

  handleRenotaryCalendarEvents = (response: any) => {
    this.setState({ loading: false });
    const { date } = this.state;
    if (!response.errors) {
      const events = response.zoom_meetings;

      const renotaryEvents = events.map((meetingItem: any) => {
        const accounts = meetingItem.accounts.map((account: any) => ({
          id: account.data.id,
          name: account.data.attributes.name,
          role: account.data.attributes.role,
          photoUrl: account.data.attributes.photo?.url,
        }));

        return {
          start: new Date(meetingItem.start_time),
          end: new Date(meetingItem.end_time),
          id: meetingItem.meeting.id.toString(),
          title: "Renotary Meeting",
          summary: meetingItem.meeting.topic,
          attendees: this.handleMeetInvitees(meetingItem),
          conferenceData: meetingItem.meeting.start_url
            ? { entryPoints: [{ uri: meetingItem.meeting.start_url }] }
            : undefined,
          passcode: meetingItem.meeting.password.toString(),
          accounts: accounts
        };
      });
      this.setState({
        renotaryEvents: renotaryEvents,
      });
    }
  };


  renderFilteredEvents = () => {
    const { renotaryEvents, date } = this.state;

    const styledRenotaryEvents = renotaryEvents.map(event => ({
      ...event,
      backgroundColor: '#012275',
      className: 'renotary-meeting',
    }));

    return styledRenotaryEvents;
  }

  setEventInfo = (eventInfo: any) => {
    this.setState({ selectedCalendarEvent: eventInfo });
  };

  closeModalHandle = () => {
    this.setState({ selectedCalendarEvent: null });
  };

  renderDate = (date1: string | Date, date2: string | Date) => {
    let startDate = new Date(date1);
    let endDate = new Date(date2);

    if (Math.abs(startDate.getTime() - endDate.getTime()) / 36e5 === 24) {
      return startDate.toLocaleString(undefined, {
        weekday: "long",
        month: "long",
      });
    }

    let day = startDate.toLocaleString(undefined, { day: "2-digit" });
    let weekday = startDate.toLocaleString(undefined, { weekday: "long" });
    let month = startDate.toLocaleString(undefined, { month: "long" });

    let startTime = startDate.toLocaleString(undefined, {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    });

    let endTime = endDate.toLocaleString(undefined, {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    });

    return `${weekday}, ${day} ${month} / ${startTime} - ${endTime}`;
  };

  getGoogleEvents = (token: string) => {
    if (token) {
      this.setState({ loader: true, googleAuthDetails: true });
      const startOfDay = new Date(this.state.date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(this.state.date);
      endOfDay.setHours(23, 59, 59, 999);
      const header = {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const getGoogleEventMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.getGoogleEventCallId = getGoogleEventMessage.messageId;
      getGoogleEventMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.googleEventEntPoint}?timeMin=${startOfDay.toISOString()}&timeMax=${endOfDay.toISOString()}&singleEvents=true`
      );
      getGoogleEventMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      getGoogleEventMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        "GET"
      );
      runEngine.sendMessage(getGoogleEventMessage.id, getGoogleEventMessage);
    }

  };

  getOutlookEvents = (token: string) => {
    const startOfDay = new Date(this.state.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(this.state.date);
    endOfDay.setHours(23, 59, 59, 999);

    if (token) {
      this.setState({ loader: true, outlookAuthDetails: true });
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const getEventMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getOutlookEventCallId = getEventMessage.messageId;

      getEventMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.getOutlookMeetingEndpoint}startDateTime=${startOfDay.toISOString()}&endDateTime=${endOfDay.toISOString()}`
      );

      getEventMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );

      getEventMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        "GET"
      );

      runEngine.sendMessage(getEventMessage.id, getEventMessage);
      return true;
    }
  };

  handleOutlookEventRes = async (responseJson: any) => {
    this.setState({ loader: false });
    if (!responseJson.error) {
      const events: OutlookEventItem[] = responseJson.value;

      this.setState({
        outlookCalendarData: events
          .filter((v) => !!v.start)
          .map((v) => ({
            ...v,
            title: v.subject,
            description: v.bodyPreview,
            start: new Date(v.start!.dateTime + "Z"),
            end: v.end ? new Date(v.end.dateTime + "Z") : undefined,
            conferenceData: v.onlineMeetingUrl
              ? { entryPoints: [{ uri: v.onlineMeetingUrl }] }
              : undefined,
            attendees: v.attendees?.map((attendee: any) => ({
              responseStatus: attendee.status?.response,
              email: attendee.emailAddress?.address,
            })),
          })),
      });
    } else if (responseJson.error.code === "InvalidAuthenticationToken") {
      const token = await OutlookAuthProvider.refreshAccessToken(this.state.refresh_outlook_auth);
      setStorageData("ms_accessToken", token);
      this.setState({ outlook_auth: token });
      this.getOutlookEvents(token);
    } else {
      removeStorageData('ms_accessToken');
      removeStorageData('isOutlookSync');
      this.setState({ outlookAuthDetails: false, });
    }
  }

  handleGoogleEventsRes = (response: any) => {
    this.setState({ loader: false });
    if (!response.error) {
      const events: EventItem[] = response.items;
      this.setState({
        googleCalendarData: events
          .filter((v) => !!v.start)
          .map((v) => ({
            ...v,
            title: v.summary,
            description: v.description,
            start: new Date(v.start!.dateTime),
            end: v.end ? new Date(v.end.dateTime) : undefined,
          })),
      });
    } else if (response.error?.code === 401) {
      this.refreshGoogleToken();
    } else {
      this.setState({ googleAuthDetails: false })
    }
  }

  renderFilteredGoogleEvents = () => {
    const { googleCalendarData } = this.state
    const filteredEvents = googleCalendarData?.filter(
      event => new Date(event?.start).toDateString() === this.state.date.toDateString()
    );

    return filteredEvents;
  }

  renderFilteredOutlookEvents = () => {
    const { outlookCalendarData } = this.state
    const filteredEvents = outlookCalendarData?.filter(
      event => new Date(event?.start).toDateString() === this.state.date.toDateString()
    );
    return filteredEvents;
  }

  renderFilteredAllEvents = () => {
    const { outlookCalendarData, googleCalendarData, renotaryEvents } = this.state;

    const styledRenotaryEvents = renotaryEvents.map(event => ({
      ...event,
      backgroundColor: '#012275',
      className: 'renotary-meeting',
    }));

    const styledGoogleEvents = googleCalendarData.map(event => ({
      ...event,
      backgroundColor: '#1A73E8',
      className: 'google-meeting',
    }));

    const styledOutlookEvents = outlookCalendarData.map(event => ({
      ...event,
      backgroundColor: '#1A73E8',
      className: 'outlook-meeting',
    }));

    const allEventsData = [...styledOutlookEvents, ...styledGoogleEvents, ...styledRenotaryEvents];

    return allEventsData;
  }

  checkMeetingsConflit = () => {

    const { outlookCalendarData, googleCalendarData, renotaryEvents } = this.state;
    const allEventsData = [...outlookCalendarData, ...googleCalendarData, ...renotaryEvents];
    const filteredEvents = allEventsData?.filter(
      event => new Date(event?.start).toDateString() === this.state.date.toDateString()
    );

    for (let i = 0; i < filteredEvents.length; i++) {
      const event1Start = filteredEvents[i].start.getTime();
      const event1End = filteredEvents[i].end.getTime();

      for (let j = i + 1; j < filteredEvents.length; j++) {
        const event2Start = filteredEvents[j].start.getTime();
        const event2End = filteredEvents[j].end.getTime();

        if (event1Start < event2End && event1End > event2Start) {
          this.setState({ isMeetingConflicting: true });
        }
      }
    }
  }

  handleClose = () => {
    this.setState({ isMeetingConflicting: false });
  }

  showDate = () => {
    return this.state.date &&
      (new Date().toLocaleDateString("en-GB") === this.state.date.toLocaleDateString("en-GB")
        ? `Today, ${this.state.date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}`
        : this.state.date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      )
  }

  refreshGoogleToken = async () => {
    try {
      const access_token = await GoogleAuthProvider.refreshAccessToken(this.state.refresh_google_auth);

      setStorageData('google_auth', access_token);
      this.getGoogleEvents(access_token);
    } catch (error) {
      this.setState({ googleAuthDetails: false, });
      console.error('Error refreshing Google token:', error);
    }
  }

  calculatedTime = (eventItem: any) => {
    const todayDate = new Date();
    const meetingStartTime = new Date(eventItem?.event?.start);

    if (isNaN(meetingStartTime.getTime())) {
      return;
    }

    const timeDifference = meetingStartTime.getTime() - todayDate.getTime();

    const totalMinutes = Math.floor(Math.abs(timeDifference) / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const daysDifference = Math.floor(totalHours / 24);

    const hoursDifference = totalHours % 24;
    const minutesDifference = totalMinutes % 60;

    let result = "";
    if (daysDifference > 0) {
      result += `${daysDifference} day${daysDifference > 1 ? 's' : ''} `;
    }
    if (hoursDifference > 0) {
      result += `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} `;
    }
    if (minutesDifference > 0) {
      result += `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''}`;
    }

    result = result.trim() || "0 minutes";

    if (timeDifference < 0) {
      return `${result} before`;
    } else {
      return `${result} after`;
    }
  };

  handleMeetInvitees = (meetingEvent: any) => {
    const { meeting } = meetingEvent;
    if (meeting.settings?.meeting_invitees?.length > 0) {
      return meeting.settings?.meeting_invitees?.map((invitee: any) => ({
        email: invitee.email,
        responseStatus: 'accepted'
      }))
    } else {
      return [{
        email: meeting.host_email,
        responseStatus: 'accepted'
      }]
    }
  }

  // Customizable Area End
}
