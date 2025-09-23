import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import {
  getStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
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
  isDrawerOpen: boolean;
  docUrl: string;
  type: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DocumentOpenerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loader: false,
      isDrawerOpen: false,
      docUrl: "",
      type: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    const docUrl = await getStorageData("docUrl");
    this.setState({ docUrl: docUrl }, this.findFileType);
  }

  findFileType = () => {
    const fileExtension =
      this.state.docUrl.split(".").pop()?.toLowerCase() || "";
    if (fileExtension.includes("jpeg") || fileExtension.includes("jpg") || fileExtension.includes("png"))
      this.setState({ type: "img" });
    if (fileExtension.includes("pdf")) this.setState({ type: "pdf" });
    if (fileExtension.includes("doc") || fileExtension.includes("docx"))
      this.setState({ type: "doc" });
  };

  navigateBack = () => {
    removeStorageData("docUrl");
    this.props.navigation.goBack();
  };
  // Customizable Area End
}
