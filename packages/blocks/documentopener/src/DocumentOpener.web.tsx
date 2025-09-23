import React from "react";

// Customizable Area Start
import { Box, IconButton, Typography } from "@material-ui/core";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import Loader from "../../../components/src/Loader.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
import { ArrowBackIosRounded } from "@material-ui/icons";
import CustomFooter from "../../../components/src/CustomFooter.web";
// Customizable Area End

import DocumentOpenerController, {
  Props,
  configJSON,
} from "./DocumentOpenerController.web";

export default class DocumentOpener extends DocumentOpenerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"32px"}>
        <Box width={"100%"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mx={"25px"}
          >
            <Box
              display={"flex"}
              height={"48px"}
              alignItems={"center"}
              style={{ columnGap: "8px" }}
            >
              <IconButton
                data-testID="backIconButton"
                onClick={this.navigateBack}
              >
                <ArrowBackIosRounded height={"24px"} width={"24px"} />
              </IconButton>
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "-0.5%",
                }}
              >
                {this.state.docUrl
                  .split("/")
                  .pop()
                  ?.split(".")
                  .slice(0, -1)
                  .join(".")}
              </Typography>
            </Box>
            <MiniHeader navigation={this.props.navigation} id={""} />
          </Box>
        </Box>
      </Box>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Loader loading={this.state.loader} />
        <Box display={"flex"} className="test1">
          <NavigationMenu navigation={this.props.navigation} id={""} />
          <MainBox
            height={"100vh"}
            overflow={"auto"}
            width={"100vw"}
            style={{ backgroundColor: "#F9F9F9" }}
          >
            {this.Header()}
            <Box height={"calc(100% - 191px)"} my={"32px"} mx={"27px"}>
              {this.state.type === "img" && (
                <img
                  src={this.state.docUrl}
                  alt="image"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
              {this.state.type === "pdf" && (
                <embed
                  style={{ width: "100%", height: "100%" }}
                  src={this.state.docUrl}
                />
              )}
              {this.state.type === "doc" && (
                <embed
                  data-testID="doc"
                  src={this.state.docUrl}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </Box>
            <CustomFooter />
          </MainBox>
        </Box>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Inter",
    },
  },
});

const MainBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "calc(100vw - 200px)",
  },
});
// Customizable Area End
