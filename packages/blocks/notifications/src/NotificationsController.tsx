import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React, { RefObject } from "react";
import { badgeBell, bell, bells } from "./assets";
import { getStorageData } from "../../../framework/src/Utilities";

interface INotification {
  id: string;
  type: string;
  attributes: {
    id: number;
    created_by: number;
    headings: string;
    contents: string;
    app_url: string;
    is_read: boolean;
    read_at?: null;
    created_at: string;
    updated_at: string;
    trigger_for_notification: number;
    account: {
      id: number;
      first_name?: null;
      last_name?: null;
      full_phone_number: string;
      country_code?: null;
      phone_number?: null;
      email: string;
      activated: boolean;
      device_id?: null;
      unique_auth_id: string;
      password_digest: string;
      created_at: string;
      updated_at: string;
      user_name?: null;
      platform?: null;
      user_type: string;
      app_language_id?: null;
      last_visit_at?: null;
      is_blacklisted: boolean;
      suspend_until?: null;
      status: string;
      role_id: number;
      stripe_id?: null;
      stripe_subscription_id?: null;
      stripe_subscription_date?: null;
      full_name: string;
      gender?: null;
      date_of_birth?: null;
      age?: null;
      country?: null;
      address?: null;
      contact_name?: null;
      company_name?: null;
      google_calendar_credentials?: null;
      password_history?: string[] | null;
      is_otp_verify: boolean;
      city?: null;
      post_code?: null;
      activation_time?: null;
      address_line_2?: null;
      last_activation_time?: null;
      rating: number;
      is_online: boolean;
      session_id?: null;
      connected_account_id?: null;
      deletion_time?: null;
      google_calendar_token?: null;
      outlook_calendar_token?: null;
      google_calendar_sync: boolean;
      outlook_calendar_sync: boolean;
      is_deleted: boolean;
    };
  };
}

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
  boxRef: RefObject<HTMLDivElement>;
  pageNumber: number;
  notifications: INotification[];
  anchorEl: HTMLButtonElement | null;
  today: INotification[];
  yesterday: INotification[];
  twoDaysAgo: INotification[];
  oneWeekAgo: INotification[];
  twoWeeksAgo: INotification[];
  monthAgo: INotification[];
  yearAgo: INotification[];
  areUnread: boolean;
  areMoreNotificationsPresent: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NotificationsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getNotificationsCallId: string = "";
  markAsReadCallId: string = "";
  private componentMounted: boolean = false;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      boxRef: React.createRef<HTMLDivElement>(),
      pageNumber: 0,
      notifications: [],
      anchorEl: null,
      today: [],
      yesterday: [],
      twoDaysAgo: [],
      oneWeekAgo: [],
      twoWeeksAgo: [],
      monthAgo: [],
      yearAgo: [],
      areUnread: false,
      areMoreNotificationsPresent: true,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.componentMounted = true;
    this.getNotifications();
    if (this.state.boxRef.current) {
      this.state.boxRef.current.addEventListener("scroll", this.handleScroll);
    }
    // Customizable Area End
  }
  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (!this.componentMounted) return; // Prevent state updates on unmounted component
    
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const callId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let res = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(res)) {
        if (callId === this.getNotificationsCallId) {
          this.setState(
            (prevState) => ({
              notifications: [...prevState.notifications, ...res.data],
            }),
            () => {
              this.areAllRead();
              this.filterNotifications();
            }
          );
        } else if (callId === this.markAsReadCallId) {
          this.handleMarkAsReadRes(res?.data?.id);
        }
      } else {
        if (
          callId === this.getNotificationsCallId &&
          res.errors[0].message === "No notification found."
        ) {
          this.setState({ areUnread: false, notifications: [], areMoreNotificationsPresent: false });
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  apiCall = async (apiData: ApiCallInterface) => {
    let token = await getStorageData("token");
    const { contentType, method, endPoint, body } = apiData;
    const header = {
      "Content-Type": contentType,
      token: token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    message.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    body &&
      message.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    runEngine.sendMessage(message.id, message);
    return message.messageId;
  };

  getNotifications = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 }, async () => {
      if (this.state.areMoreNotificationsPresent)
        this.getNotificationsCallId = await this.apiCall({
          contentType: configJSON.applicationJsonContentType,
          method: configJSON.getMethod,
          endPoint:
            configJSON.getNotificationsApiEndpoint1 +
            this.state.pageNumber +
            configJSON.getNotificationsApiEndpoint2,
        });
    });
  };

  markAsRead = async (id?: string) => {
    this.markAsReadCallId = await this.apiCall({
      contentType: configJSON.applicationJsonContentType,
      method: configJSON.patchMethod,
      endPoint: id
        ? configJSON.markAsReadApiEndpoint + "?id=" + id
        : configJSON.markAsReadApiEndpoint,
    });
  };

  handleMarkAsReadRes = (id?: string | number) => {
    if (!this.componentMounted) return; // Prevent state updates on unmounted component
    
    if (id) {
      this.setState(
        (prevState) => ({
          notifications: prevState.notifications.map((notification) =>
            notification.id === id
              ? {
                  ...notification,
                  attributes: {
                    ...notification.attributes,
                    is_read: true,
                  },
                }
              : notification
          ),
        }),
        () => {
          this.filterNotifications();
          this.areAllRead();
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          notifications: prevState.notifications.map((notification) => ({
            ...notification,
            attributes: {
              ...notification.attributes,
              is_read: true,
            },
          })),
        }),
        () => {
          this.filterNotifications();
          this.areAllRead();
        }
      );
    }
  }

  calculateTimeDuration = (date: string) => {
    const receivedTime = new Date(date);
    const now = new Date();

    const differenceInMilliseconds = now.getTime() - receivedTime.getTime();

    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0)
      return `${hours} hr${hours > 1 ? "s" : ""} ${minutes % 60} min${
        minutes % 60 !== 1 ? "s" : ""
      } ago`;
    else if (minutes > 0)
      return `${minutes} min${minutes !== 1 ? "s" : ""} ${seconds % 60} sec${
        seconds % 60 !== 1 ? "s" : ""
      } ago`;
    else return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  };

  formatTime = (date: string) => {
    const receivedDate = new Date(date);
    let hours = receivedDate.getHours();
    const minutes = receivedDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  showTime = (date: string) => {
    const receivedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    receivedDate.setHours(0, 0, 0, 0);
    if (today.getTime() === receivedDate.getTime())
      return this.calculateTimeDuration(date);
    else return this.formatTime(date);
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  isOpen = () => Boolean(this.state.anchorEl);

  notificationIcon = () => {
    if (!this.isOpen() && this.state.areUnread) return badgeBell;
    else if (this.isOpen()) return bells;
    else return bell;
  }

  areAllRead = () => {
    if (!this.componentMounted) return; // Prevent state updates on unmounted component
    
    const allRead = this.state.notifications.every(
      (notification) => notification.attributes.is_read
    );
    this.setState({ areUnread: !allRead });
  };

  filterNotifications = () => {
    if (!this.componentMounted) return; // Prevent state updates on unmounted component
    
    const today: INotification[] = [];
    const yesterday: INotification[] = [];
    const twoDaysAgo: INotification[] = [];
    const oneWeekAgo: INotification[] = [];
    const twoWeeksAgo: INotification[] = [];
    const monthAgo: INotification[] = [];
    const yearAgo: INotification[] = [];

    const now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    const oneYear = 365 * oneDay;

    this.state.notifications.forEach((notification) => {
      const createdAt = new Date(notification.attributes.created_at);
      const diffTime = now.getTime() - createdAt.getTime();

      if (diffTime < oneDay) today.push(notification);
      else if (diffTime < 2 * oneDay) yesterday.push(notification);
      else if (diffTime < oneWeek) twoDaysAgo.push(notification);
      else if (diffTime < 2 * oneWeek) oneWeekAgo.push(notification);
      else if (diffTime < oneMonth) twoWeeksAgo.push(notification);
      else if (diffTime < oneYear) monthAgo.push(notification);
      else yearAgo.push(notification);
    });

    this.setState({
      today: today,
      yesterday: yesterday,
      oneWeekAgo: oneWeekAgo,
      twoDaysAgo: twoDaysAgo,
      twoWeeksAgo: twoWeeksAgo,
      monthAgo: monthAgo,
      yearAgo: yearAgo,
    });
  };

  async componentWillUnmount() {
    this.componentMounted = false; // Mark component as unmounted
    if (this.state.boxRef.current) {
      this.state.boxRef.current.removeEventListener(
        "scroll",
        this.handleScroll
      );
    }
  }

  handleScroll = () => {
    const box = this.state.boxRef.current;
    if (box) {
      const { scrollTop, scrollHeight, clientHeight } = box;
      if (scrollTop + clientHeight >= scrollHeight) this.getNotifications();
    }
  };

  cleanHtmlContent(htmlContent: string | undefined | null): string {
    if (!htmlContent) return "";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
  
    const paragraphs = tempDiv.querySelectorAll("p");
  
    if (paragraphs.length > 0) {
      const firstParagraph = paragraphs[0];
      const firstMessage = firstParagraph.innerHTML.trim();

      const firstDiv = document.createElement("div");
      firstDiv.className = "first-message"; 
      firstDiv.innerHTML = firstMessage;
  
      tempDiv.replaceChild(firstDiv, firstParagraph);
    }
  
    paragraphs.forEach((p) => {
      if (p.innerHTML.trim() === "<br>" || p.innerHTML.trim() === "") {
        p.remove();
      }
    });

    return tempDiv.innerHTML;
  }
  // Customizable Area End
}
