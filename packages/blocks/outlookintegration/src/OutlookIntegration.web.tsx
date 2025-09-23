import React from "react";
import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
require("isomorphic-fetch");
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

// import ProfileContent from 'ProfileContent'

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End

import OutlookIntegrationController, {
  Props,
  configJSON,
} from "./OutlookIntegrationController";

class OutlookIntegration extends OutlookIntegrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <div style={webStyle.wraper}>
          <div style={webStyle.container}>
            <h2>Outlook Integration Example</h2>
            <Button
              style={webStyle.link}
              onClick={this.handleLogin}
              data-test-id={"TestSignInButton"}
            >
              Login
            </Button>
          </div>
        </div>
      </ThemeProvider>
      // Customizable Area End
    );
  }
  // Customizable Area End
}

// Customizable Area Start
export default OutlookIntegration;
const webStyle = {
  wraper: {
    flex: 1,
    width: "100vw",
    height: "80vh",
    padding: 16,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  container: {
    width: "80vw",
    margin: "0 auto",
  },
  link: {
    color: "blue",
    cursor: "pointer",
    fontSize: 18,
  },
};
// Customizable Area End
