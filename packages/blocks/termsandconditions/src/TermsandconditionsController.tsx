import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import React, { RefObject } from "react";
interface UserTermAndCondition {
  id: number;
  terms_and_condition_id: number;
  created_at: string;
  updated_at: string;
  subtitle: string;
  description: string;
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
  termsAndConditionsData:string|null;
  titleTerm:string,
  updated_time:string;
  topRef: RefObject<HTMLDivElement>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TermsandconditionsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  termsAndConditionsGetId:string="";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      termsAndConditionsData:null,
      titleTerm:"",
  updated_time:"",
  topRef: React.createRef(),
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
      const apiRequestid = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
      );

  let response = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
  );

  if (apiRequestid === this.termsAndConditionsGetId) {
      this.handleTermsAndCondition(response.data.attributes)
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
componentDidMount =async ()=> {
  this.handleNavigationScroll();
  this.getTermsAndConditions();
}

handleNavigationScroll=()=>{
  const currentState = this.state;
    const {topRef} = currentState;
    const currentRef = topRef.current;
    currentRef?.scrollIntoView();
}

  getTermsAndConditions = () => {
    const header = {
        "Content-Type": configJSON.validationApiContentType,
    };
    
const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
);

this.termsAndConditionsGetId = requestMessage.messageId;

requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    `${configJSON.termsAndConditions}`

);
requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
);
requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    configJSON.validationApiMethodType
);
runEngine.sendMessage(requestMessage.id, requestMessage);
};
handleTermsAndCondition= (response:any) =>{
  this.setState({termsAndConditionsData:response.description,titleTerm:response.title,updated_time:response.updated_at})

  // Customizable Area End
}
}
