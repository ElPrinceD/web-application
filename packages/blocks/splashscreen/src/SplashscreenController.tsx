import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SplashscreenController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    this.state = {
      // Customizable Area Start
      // Customizable Area End
    };

    // Customizable Area Start
    this.subScribedMessages = [];
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    setTimeout(() => {
      this.goToHome();
    }, configJSON.timeout);
    // Customizable Area End
  }

  // Customizable Area Start
  goToHome() {
      const message: Message = new Message(
        getName(MessageEnum.NavigationHomeScreenMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
  }
  // Customizable Area End
}
