import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
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
    loader: boolean;
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class StripeConnectResponseController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
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
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    async componentDidMount() {
        super.componentDidMount();
        if (window.opener) {
            const targetOrigin = window.opener.location.origin;
            window.opener.postMessage("stripe-setup-completed", targetOrigin);
            window.close();
        }
    }

    // Customizable Area End
}