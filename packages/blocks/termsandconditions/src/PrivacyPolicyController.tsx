import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React, { RefObject } from "react";
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
  privacyPolicyData:string|null;
  updated_time:string;
  topRef: RefObject<HTMLDivElement>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PrivacyPolicyController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  privacyPolicyGetId:string="";
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
    privacyPolicyData:"",
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
      const apiRequestid = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
    );

let response = message.getData(
    getName(MessageEnum.RestAPIResponceSuccessMessage)
);
if (apiRequestid === this.privacyPolicyGetId) {
    this.handlePrivacyPolicy(response.data.attributes)
}

    // Customizable Area End
  }
  // Customizable Area Start
  componentDidMount =async ()=> {
    this.handleNavigationScroll()
    this.getPrivacyPolicy();

  }

  handleNavigationScroll=()=>{
    const currentState = this.state;
    const {topRef} = currentState;
    const currentRef = topRef.current;
    currentRef?.scrollIntoView();
  }

  getPrivacyPolicy = () => {
    const header = {
        "Content-Type": configJSON.validationApiContentType,
    };
    
const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
);

this.privacyPolicyGetId = requestMessage.messageId;

requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    `${configJSON.privacyPolicy}`

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

  handlePrivacyPolicy= (response:any) =>{
    this.setState({privacyPolicyData:response.description,updated_time:response.updated_at})
  }
  // Customizable Area End
}
