import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import React, { RefObject } from "react";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
}

export interface S {
  // Customizable Area Start
  topRef: RefObject<HTMLDivElement>;
  isDrawerOpen: boolean;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class OnboardingPageWebController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseToken),
      getName(MessageEnum.SessionResponseMessage)
    ];
    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      // Customizable Area Start
      topRef: React.createRef(),
      isDrawerOpen: false,
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  componentDidMount(): Promise<void> {
    this.handleNavigationScroll();
    return Promise.resolve();
  }

  handleNavigationScroll=()=>{
    const currentState = this.state;
    const {topRef} = currentState;
    const currentRef = topRef.current;
    currentRef?.scrollIntoView();
  }

  gotoIndividual = (item: string) => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "EmailAccountRegistrationWeb");
    msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    const raiseMessage: Message = new Message(
    getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), item)
    this.send(msgs);
    return true;
};
gotoIamNotary = () => {
  const msgs = new Message(getName(MessageEnum.NavigationMessage));
  msgs.addData(getName(MessageEnum.NavigationTargetMessage), "EmailAccountIamNotaryRegWeb");
  msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
  this.send(msgs);
  return true;
};

gotoLandingPage = () => {
  const msgs = new Message(getName(MessageEnum.NavigationMessage));
  msgs.addData(getName(MessageEnum.NavigationTargetMessage), "Home");
  msgs.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
  this.send(msgs);
  return true;
};

goToLogin() {
    const msgs: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgs);
  }

  toggleDrawer = (newOpen: boolean) => () => {
    this.setState({ isDrawerOpen: newOpen });
  };
  // Customizable Area End
}
