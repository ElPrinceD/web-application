import React from "react";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Loader from "../../../components/src/Loader.web";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: 'Inter',
        h6: {
            fontWeight: 500,
        },
    },
});


// Customizable Area End

import StripeConnectResponseController, {
    Props,
} from "./StripeConnectResponseController";

export default class StripeConnectResponse extends StripeConnectResponseController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    render() {

        return (
            // Customizable Area Start
            <ThemeProvider theme={theme}>
                {this.state.loader && <Loader loading={this.state.loader} />}
            </ThemeProvider>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
// Customizable Area End