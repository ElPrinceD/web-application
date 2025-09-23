import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React from "react";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IChat {
  id: string;
  muted: boolean;
  unreadCount: number;
  lastMessage: string;
  name: string;
}
interface IChatResponse {
  id: string;
  attributes: {
    name: string;
    accounts_chats: [
      {
        id: string;
        attributes: {
          account_id: number;
          muted: boolean;
          unread_count: number;
        };
      }
    ];
    messages: {
      id: string;
      attributes: { id: number; message: string };
      message: string;
    };
  };
}

export interface IChatData {
  id: string;
  attributes: {
    id: number;
    is_notification_mute: boolean;
    name: string;
    accounts_chats: [
      {
        id: string;
        attributes: {
          muted: boolean;
          account_id: number;
          unread_count: number;
        };
      }
    ];
    messages: IMessage[];
  };
  relationships: { accounts: { data: { id: string; type: string }[] } };
}

export interface IMessage {
  id: number;
  message: string;
  account_id: number;
  profile: string;
  created_at: string;
}
// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  open?: boolean;
  accountId?: number | null;
  onClose?: any;
  notary_request_id?: string;
  userProfilePic?: string | null;
  newReceivedMsg?: string;
  sendMessage?:any
  fullName?:string;
  profile?:string
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  accountId: number;
  chatName: string;
  chatId: string | number;
  chatList: IChat[];
  isVisibleModal: boolean;
  chatData: IMessage[] | null;
  newMessage: string;
  isLoading: boolean;
  error: string | null;
  notaryRequestId: string;
  newReceivedMessage: string
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatListApiCallId: string = "";
  createChatRoomApiCallId: string = "";

  inputRef: React.RefObject<HTMLInputElement>;
  messageContainerRef: React.RefObject<HTMLDivElement>
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      accountId: -1,
      chatName: "ChatChannel",
      chatId: "",
      chatList: [],
      isVisibleModal: false,
      chatData: null,
      newMessage: "",
      isLoading: false,
      error: null,
      notaryRequestId: "",
      newReceivedMessage: ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.inputRef = React.createRef();
    this.messageContainerRef = React.createRef();
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    // Customizable Area Start
    const token = await getStorageData("authToken");
    this.setToken(token);

    this.inputRef.current?.focus();
    document.addEventListener('click', this.handleClickOutside);

    this.scrollToBottom();
    // Customizable Area End
  }

  async componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  async componentDidUpdate(prevProps: Props, prevState: S) {
    if (prevState.chatData !== this.state.chatData) {
      this.scrollToBottom();
    }
    if (prevProps.notary_request_id !== this.props.notary_request_id && this.props.notary_request_id) {
      this.setState({ notaryRequestId: this.props.notary_request_id });
    }
    if (prevProps.newReceivedMsg !== this.props.newReceivedMsg && !!this.props.open) {
      this.getChatList(this.state.token);
    }
    if (prevProps.open !== this.props.open && this.props.open) {
      this.getChatList(this.state.token)
    }
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  setToken = (token: string) => {
    if (token) {
      this.setState({ token });
      this.getChatList(token);
    }
  }

  isStringNullOrBlank = (string: string) => {
    return string === undefined || string === null || string.length === 0;
  };

  showModal = () => {
    this.setState({ isVisibleModal: true });
  };

  hideModal = () => {
    this.setState({ isVisibleModal: false });
  };

  navigateToChatView = (chatId: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "ViewChat");

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      chatId: chatId,
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    this.send(message);
  };

  getChatList = async (token: string) => {
    this.setState({ isLoading: true });
    if (this.state.notaryRequestId) {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.getChatListApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `${configJSON.getMyChatsApiEndpoint}${this.state.notaryRequestId}`
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.getApiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };

  createChatRoom = (chatName: string) => {
    if (this.props.open) {
      const header = {
        "Content-Type": configJSON.apiContentType,
        token: this.state.token,
        "Access-Control-Allow-Origin": "*",
      };
      const bodyData = {
        "chat": {
          "name": chatName,
          "notary_request_id": this.state.notaryRequestId
        }
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );

      this.createChatRoomApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.createChatRoomApiEndPoint
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(bodyData)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.postApiMethod
      );

      runEngine.sendMessage(requestMessage.id, requestMessage);

    }
  };

  inputRoomNameProps = {
    onChangeText: (chatName: string) => {
      this.setState({ chatName });
    },
  };

  btnAddRoomProps = {
    onPress: () => this.createChatRoom(this.state.chatName),
  };

  btnCloseModalProps = {
    onPress: () => this.hideModal(),
  };

  btnShowAddModalProps = {
    onPress: () => {
      this.showModal();
    },
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getChatListApiCallId) {
        this.handleChatListApiRes(responseJson);
      }
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMessage: event.target.value });
  };

  handleClickOutside = (event: MouseEvent) => {
    if (this.inputRef.current && !this.inputRef.current.contains(event.target as Node)) {
      this.inputRef.current?.blur();
    } else {
      this.inputRef.current?.focus();
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && this.state.newMessage.trim()) {
      this.sendMessage();
    }
  };

  scrollToBottom = () => {
    if (this.messageContainerRef.current) {
      this.messageContainerRef.current.scrollTop = this.messageContainerRef.current.scrollHeight;
    }
  };

  sendMessage = () => {
    const { newMessage} = this.state;

    this.props.sendMessage && this.props.sendMessage(newMessage);
    this.setState({ newMessage: "" });
  };

  handleChatListApiRes = (response: any) => {
    this.setState({ isLoading: false });
    const processedMessages: IMessage[] = response.messages?.map((msg: IMessage) => ({
      id: msg.id,
      message: msg.message,
      account_id: msg.account_id,
      profile: msg.profile,
      created_at: msg.created_at,
    }));

    this.setState({
      chatData: processedMessages,
    });
  }

  getColor = (msgId: any , accId: any) => {
    if(msgId !== accId){
      return "#000000"
    } else return "#FFFFFF"
  }

  getLeftPadding = (showAvatar: boolean, msg_id: any, accountId: any) => {
    if(showAvatar && msg_id !== accountId){
      return "0px"
    } else if(!showAvatar && msg_id !== accountId){
      return "48px"
    }
  }

  getRightPadding = (showAvatar: boolean, msg_id: any, accountId: any) => {
    if(showAvatar && msg_id === accountId){
      return "0px"
    } else if(!showAvatar && msg_id === accountId) {
      return "48px"
    }
  }

  getJustifyContent = (msgId: any , accId: any) => {
    if(msgId === accId){
      return "flex-end"
    } else return "flex-start"
  }

  getBgColor = (msgId: any , accId: any) => {
    if(msgId === accId){
      return "#012275"
    } else return "#F1F1F1"
  }

  // Customizable Area End
}
