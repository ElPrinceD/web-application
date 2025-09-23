import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
import { gapi, loadAuth2, loadGapiInsideDOM } from "gapi-script";
import { OutlookAuthProvider } from "../../../components/src/OutlookAuthProvider.web";
import { EventContentArg } from "@fullcalendar/react";
import { GoogleAuthProvider } from "../../../components/src/GoogleAuthProvider.web";



export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

interface ApiCallInterface {
    contentType?: string;
    method?: string;
    endPoint?: string;
    body?: object;
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
    }
}

interface OutlookEventItem {
    id?: string;
    subject: string;
    title: string;
    onlineMeetingUrl: string;
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
}

interface RenotaryMeetingResponseItem {
    notary_request_id?: number;
    account_id: number;
    start_time: string;
    end_time: string;
    meeting: {
        id: number;
        password: string
        host_email: string;
        topic: string;
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
    }>;
}

interface OutlookCalendarData extends Omit<OutlookEventItem, 'start' | 'end'> {
    start?: any;
    end?: any;
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
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    loader: boolean;
    isSideBarOpen: boolean;
    token: string
    googleAuthToken: string;
    outlookAuthToken: string
    userName: string;
    userProfile: string;
    userRoleId: number;
    renotaryEvents: CalendarData[];
    googleCalendarData: CalendarData[];
    outlookCalendarData: OutlookCalendarData[];
    selectedTab: string;
    googleAuthDetails: any;
    outlookAuthDetails: any;
    selectedCalendarEvent: EventContentArg | null;
    startDate: Date | string;
    endDate: Date | string;
    isMeetingConflicting: boolean;
    notaryRequestModalOpen: boolean;
    cancelReqModal: boolean;
    serviceData: DataofService[];
    editRequest: any;
    isNewRequestOrEditRequestOrInviteClient: string
    rows: any[];
    refresh_google_auth: string
    refresh_outlook_auth: string
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

interface EventItem {
    id?: string;
    title: string;
    description?: string;
    start?: { dateTime: string; date: string };
    end?: { dateTime: string; date: string };
    location?: string,
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

export default class CalendarsController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getUserProfileDetailsApiCallId: string = "";
    getGoogleEventCallId: string = "";
    getOutlookEventCallId: string = "";
    renotaryCalendarEventCallId: string = "";
    getAllNotaryRequestsCallId: string = "";
    getServicesApiCallId: string = "";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            // Customizable Area End
        ];

        this.state = {
            // Customizable Area Start
            loader: false,
            isSideBarOpen: false,
            token: "",
            googleAuthToken: "",
            outlookAuthToken: "",
            userName: "",
            userProfile: "",
            userRoleId: 0,
            renotaryEvents: [],
            googleCalendarData: [],
            outlookCalendarData: [],
            selectedTab: "All",
            googleAuthDetails: false,
            outlookAuthDetails: false,
            selectedCalendarEvent: null,
            startDate: "",
            endDate: "",
            isMeetingConflicting: false,
            notaryRequestModalOpen: false,
            cancelReqModal: false,
            serviceData: [],
            editRequest: undefined,
            isNewRequestOrEditRequestOrInviteClient: "new",
            rows: [],
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

        // Customizable Area Start
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const webApiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            let webResponseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            if (webApiRequestCallId === this.getUserProfileDetailsApiCallId) {
                this.handleUserdetailsApiRes(webResponseJson);
            }
            if (webApiRequestCallId === this.getGoogleEventCallId) {
                this.handleGoogleEventsRes(webResponseJson);
            }
            if (webApiRequestCallId === this.getOutlookEventCallId) {
                this.handleOutlookEventRes(webResponseJson);
            }
            if (webApiRequestCallId === this.renotaryCalendarEventCallId) {
                this.handleRenotaryCalendarEvents(webResponseJson);
            }
            if (webApiRequestCallId === this.getAllNotaryRequestsCallId) {
                this.handleGetAllNotaryRequestResponse(webResponseJson);
            }
            if (webApiRequestCallId === this.getServicesApiCallId) {
                this.handleServiceRes(webResponseJson);
            }
        }
        // Customizable Area End
    }
    // Customizable Area Start
    async componentDidMount() {
        super.componentDidMount();

        let token = await getStorageData("token");
        this.setToken(token);

        const googleAuth = await getStorageData("refresh_google_auth");
        const outLookToken = await getStorageData("ms_refreshToken")
        this.setGoogleAuth(googleAuth);
        this.setOutlookAuth(outLookToken);

    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>,) {
        if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
            const {googleAuthToken, outlookAuthToken} = this.state;
            this.getGoogleEvents(googleAuthToken);
            this.getOutlookEvents(outlookAuthToken);
            this.getRenotaryCalendarEvent();
        }
        if (
            prevState.googleCalendarData !== this.state.googleCalendarData ||
            prevState.outlookCalendarData !== this.state.outlookCalendarData ||
            prevState.renotaryEvents !== this.state.renotaryEvents
        ) {
            this.checkMeetingsConflict();
        }
    }

    setToken = (token: string) => {
        if (token) {
            this.setState({ token });
            this.getUserProfileDetails(token);
            this.getRenotaryCalendarEvent();
            this.allRequestAPI();
            this.getServicesAPI();
        }
    }

    setGoogleAuth = async (token: string) => {
        let isGoogleSync = await getStorageData("isGoogleSync", true);
        if (token && isGoogleSync) {
            this.setGoogleToken(token);
        }
    }

    setGoogleToken = async (token: string) => {
        this.setState({ refresh_google_auth: token });
        const google_auth = await GoogleAuthProvider.refreshAccessToken(token);
        this.setState({ googleAuthToken: google_auth });
        this.getGoogleEvents(google_auth);
    }

    setOutlookAuth = async (token: string) => {
        let isOutlookSync = await getStorageData("isOutlookSync", true);
        if (token && isOutlookSync) {
            this.setOutlookToken(token)
        }
    }

    setOutlookToken = async (token: string) => {
        this.setState({ refresh_outlook_auth: token });
        const outlook_auth = await OutlookAuthProvider.refreshAccessToken(token);
        this.setState({ outlookAuthToken: outlook_auth });
        this.getOutlookEvents(outlook_auth);
    }

    getUserProfileDetails = async (token: string) => {
        this.setState({ loader: true })
        const header = {
            "Content-Type": "application/json",
            token: token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getUserProfileDetailsApiCallId = requestMessage.messageId;
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
            "GET"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    handleUserdetailsApiRes = (response: any) => {
        this.setState({ loader: false });
        if (!response.errors || !response.error) {
            const { full_name, role_id, photo } = response.data.attributes;
            this.setState({
                userName: full_name,
                userRoleId: role_id,
                userProfile: photo?.url
            })
        }
    }


    getGoogleEvents = (token: string) => {
        if (token) {
            this.setState({ loader: true, googleAuthDetails: true });
            const startOfDay = new Date(this.state.startDate);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(this.state.endDate);
            endOfDay.setHours(23, 59, 59, 999);
            const header = {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const getEventMessage = new Message(
                getName(MessageEnum.RestAPIRequestMessage)
            );

            this.getGoogleEventCallId = getEventMessage.messageId;

            getEventMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                `${configJSON.googleEventEntPoint}?timeMin=${startOfDay.toISOString()}&timeMax=${endOfDay.toISOString()}&singleEvents=true`
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

    refreshGoogleToken = async () => {
        try {
            const access_token = await GoogleAuthProvider.refreshAccessToken(this.state.refresh_google_auth);

            setStorageData('google_auth', access_token);
            this.getGoogleEvents(access_token);
        } catch (error) {
            removeStorageData('google_auth');
            removeStorageData('isGoogleSync');
            this.setState({ googleAuthDetails: null, });

            console.error('Error refreshing Google token:', error);
        }
    }

    handleGoogleEventsRes = (responseJson: any) => {
        
        if (!responseJson.error) {
            const events: EventItem[] = responseJson.items;
            this.setState({
                googleCalendarData: events
                    .filter((v) => !!v.start)
                    .map((v) => ({
                        ...v,
                        title: v.summary,
                        description: v.description,
                        start: new Date(v.start!.dateTime),
                        end: v.end ? new Date(v.end.dateTime) : undefined,
                        conferenceData: v.location
                            ? { entryPoints: [{ uri: v.location }] }
                            : undefined,
                    })),
                    loader: false
            });
        } else if (responseJson.error?.code === 401 || responseJson.error?.code === 403) {
            this.refreshGoogleToken();
            this.setState({ loader: false });
        } else {
            this.setState({
                googleAuthDetails: null,
                loader: false
            })
        }

    }

    handleTabClick = (tabName: string) => {
        this.setState({ selectedTab: tabName });
    };

    getOutlookEvents = (token: string) => {
        const startOfDay = new Date(this.state.startDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(this.state.endDate);
        endOfDay.setHours(23, 59, 59, 999);

        if (token) {
            this.setState({ loader: true, outlookAuthDetails: true });
            const header = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const eventMessage = new Message(
                getName(MessageEnum.RestAPIRequestMessage)
            );

            this.getOutlookEventCallId = eventMessage.messageId;

            eventMessage.addData(
                getName(MessageEnum.RestAPIResponceEndPointMessage),
                `${configJSON.getOutlookMeetingEndpoint}startDateTime=${startOfDay.toISOString()}&endDateTime=${endOfDay.toISOString()}`
            );

            eventMessage.addData(
                getName(MessageEnum.RestAPIRequestHeaderMessage),
                JSON.stringify(header)
            );

            eventMessage.addData(
                getName(MessageEnum.RestAPIRequestMethodMessage),
                "GET"
            );

            runEngine.sendMessage(eventMessage.id, eventMessage);
            return true;
        }
    };

    handleOutlookEventRes = async (responseJson: any) => {
        this.setState({ loader: false });
        if (!responseJson.error) {
            const eventList: OutlookEventItem[] = responseJson.value;

            this.setState({
                outlookCalendarData: eventList
                    .filter((v) => !!v.start)
                    .map((v) => ({
                        ...v,
                        title: v.subject,
                        description: v.bodyPreview,
                        start: new Date(v.start!.dateTime + "Z"),
                        end: v.end ? new Date(v.end.dateTime + "Z") : undefined,
                        attendees: v.attendees?.map((attendee: any) => ({
                            responseStatus: attendee.status?.response,
                            email: attendee.emailAddress?.address,
                        })),
                        conferenceData: v.onlineMeetingUrl
                            ? { entryPoints: [{ uri: v.onlineMeetingUrl }] }
                            : undefined,
                    })),
                loader: false
            });
        } else if (responseJson.error.code === "InvalidAuthenticationToken") {
            const token = await OutlookAuthProvider.refreshAccessToken(this.state.refresh_outlook_auth);
            setStorageData("ms_accessToken", token);
            this.setState({outlookAuthToken: token});
            this.getOutlookEvents(token);
        } else {
            removeStorageData('ms_accessToken');
            removeStorageData('isOutlookSync');
            this.setState({ outlookAuthDetails: null, });
        }
    }

    setEventInfo = (eventInfo: any) => {
        this.setState({ selectedCalendarEvent: eventInfo });
    };

    closeModalHandle = () => {
        this.setState({ selectedCalendarEvent: null });
    };

    getDate = (date1: string | Date, date2: string | Date) => {
        let modifiedStartDate = new Date(date1);
        let modifiedEndDate = new Date(date2);

        if (Math.abs(modifiedStartDate.getTime() - modifiedEndDate.getTime()) / 36e5 === 24) {
            return modifiedStartDate.toLocaleString(undefined, {
                weekday: "long",
                month: "long",
            });
        }

        let weekday = modifiedStartDate.toLocaleString(undefined, { weekday: "long" });
        let month = modifiedStartDate.toLocaleString(undefined, { month: "long" });
        let day = modifiedStartDate.toLocaleString(undefined, { day: "2-digit" });

        let startTime = modifiedStartDate.toLocaleString(undefined, {
            hour: "2-digit",
            hour12: true,
            minute: "2-digit",
        });

        let endTime = modifiedEndDate.toLocaleString(undefined, {
            hour: "2-digit",
            hour12: true,
            minute: "2-digit",
        });

        return `${weekday}, ${day} ${month} / ${startTime} - ${endTime}`;
    };


    setdateInfo = (info: { startStr: string, endStr: string }) => {
        this.setState({ startDate: info.startStr, endDate: info.endStr })
    }

    renderCalendarEvent = () => {
        const { selectedTab, googleCalendarData, outlookCalendarData, renotaryEvents } = this.state;

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

        switch (selectedTab) {
            case "All":
                return [...styledRenotaryEvents, ...styledOutlookEvents, ...styledGoogleEvents]
            case "renotary":
                return styledRenotaryEvents
            case "google":
                return styledGoogleEvents
            case "outlook":
                return styledOutlookEvents
            default:
                return []
        }
    }

    checkMeetingsConflict = () => {
        const { outlookCalendarData, googleCalendarData, renotaryEvents, startDate, endDate } = this.state;
        const allEventsData = [...outlookCalendarData, ...googleCalendarData, ...renotaryEvents];

        const filteredEvents = allEventsData.filter(event => {
            const eventStart = new Date(event.start).getTime();
            const eventEnd = new Date(event.end).getTime();
            return (
                (eventStart >= new Date(startDate).getTime() && eventStart <= new Date(endDate).getTime()) ||
                (eventEnd >= new Date(startDate).getTime() && eventEnd <= new Date(endDate).getTime()) ||
                (eventStart <= new Date(startDate).getTime() && eventEnd >= new Date(endDate).getTime())
            );
        });

        for (let i = 0; i < filteredEvents.length; i++) {
            const event1Start = new Date(filteredEvents[i].start).getTime();
            const event1End = new Date(filteredEvents[i].end).getTime();

            for (let j = i + 1; j < filteredEvents.length; j++) {
                const event2Start = new Date(filteredEvents[j].start).getTime();
                const event2End = new Date(filteredEvents[j].end).getTime();

                if (event1Start < event2End && event1End > event2Start) {
                    this.setState({ isMeetingConflicting: true });
                    break;
                }
            }
        }
    };

    handleConflictClose = () => {
        this.setState({ isMeetingConflicting: false });
    }

    getRenotaryCalendarEvent = () => {
        const startOfDay = this.state.startDate ? new Date(this.state.startDate) : new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = this.state.endDate ?  new Date(this.state.endDate) : new Date();
        endOfDay.setHours(23, 59, 59, 999);

        console.log("startOfDay", startOfDay.toDateString(), "endOfDay", endOfDay.toString());

        this.setState({ loader: true });
        const header = {
            "Content-Type": configJSON.jsonApiContentType,
            "token": this.state.token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.renotaryCalendarEventCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `${configJSON.renotaryEventApiEndpoint}?start_time=${startOfDay.toISOString()}&end_time=${endOfDay.toISOString()}`
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

    }

    handleRenotaryCalendarEvents = (response: any) => {
        this.setState({ loader: false });
    
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
                loader: false
            });
        }
    };

    calculatedTime = (event: any) => {
        const todayDate = new Date();
        const eventStartTime = new Date(event?.event?.start);

        if (isNaN(eventStartTime.getTime())) {
            return;
        }

        const timeDifference = eventStartTime.getTime() - todayDate.getTime();

        const totalMin = Math.floor(Math.abs(timeDifference) / (1000 * 60));
        const totalHrs = Math.floor(totalMin / 60);
        const daysDifference = Math.floor(totalHrs / 24);

        const hoursDiff = totalHrs % 24;
        const minutesDiff = totalMin % 60;

        let result = "";
        if (daysDifference > 0) {
            result += `${daysDifference} day${daysDifference > 1 ? 's' : ''} `;
        }
        if (hoursDiff > 0) {
            result += `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} `;
        }
        if (minutesDiff > 0) {
            result += `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''}`;
        }

        result = result.trim() || "0 minutes";

        if (timeDifference < 0) {
            return `${result} before`;
        } else {
            return `${result} after`;
        }
    };

    handleMeetInvitees = (meetingItem: any) => {
        const { meeting } = meetingItem;
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

    closeReqModal = () => {
        this.setState({ cancelReqModal: true, notaryRequestModalOpen: false });
    };

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
        this.getAllNotaryRequestsCallId = await this.apiCall({
            contentType: "application/json",
            method: "GET",
            endPoint: configJSON.getAllNotaryRequestApiEndpoint
        });
    };

    yesButtonClick = () => {
        this.setState({ cancelReqModal: false })
    };

    noButtonClick = () => {
        this.setState({ cancelReqModal: false });
    };

    setLoader = (value: boolean) => {
        this.setState({ loader: value })
    }

    setModal = (value: boolean) => {
        this.setState({ notaryRequestModalOpen: value })
    }

    getServicesAPI = async () => {
        this.getServicesApiCallId = await this.apiCall({
            contentType: "application/json",
            method: "GET",
            endPoint: configJSON.allServiceApiEndpoint
        });
    };

    handleGetAllNotaryRequestResponse = (responseJson: any) => {
        this.setState({ rows: [], loader: false });
        
        // Handle response from request_counts endpoint instead of paginated requests
        console.log("Navigation menu request counts response:", responseJson);
        
        // Since we're now using request_counts, we'll set empty rows
        // The actual request data will need to come from a different endpoint
        this.setState({
            rows: []
        });
        
        // Log the counts for debugging
        const totalRequests = responseJson.total_requests || 0;
        const pendingRequests = responseJson.pending_requests || 0;
        const completedRequests = responseJson.completed_requests || 0;
        const cancelledRequests = responseJson.cancelled_requests || 0;
        
        console.log("Request counts:", {
            total: totalRequests,
            pending: pendingRequests,
            completed: completedRequests,
            cancelled: cancelledRequests
        });
    }

    handleServiceRes = (response: any) => {
        this.setState({ loader: false });
        if (response.data) {
            this.setState({ serviceData: response.data });
        }
    }

    setIsNewRequestOrEditRequestOrInviteClient = (value: string, requestId: string = "") => {
        this.setState(
            {
                isNewRequestOrEditRequestOrInviteClient: value,
                editRequest: this.state.rows.find((row) => row.id === requestId),
                notaryRequestModalOpen: true
            },
        );
    }

    // Customizable Area End
}
