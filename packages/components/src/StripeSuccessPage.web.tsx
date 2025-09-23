import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";
import { logoWhite, successImage } from "./assets";

interface Props {}

interface S {}

export default class StripeSuccessPage extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box width={"100vw"} height={"100vh"}>
        <Box
          width={"100vw"}
          height={"82px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          style={{ backgroundColor: "#011342" }}
        >
          <img src={logoWhite} height={"50px"} width={"auto"} />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"calc(100vh - 82px)"}
        >
          <Box
            width={"90%"}
            display={"flex"}
            flexDirection={"column"}
            style={{ gap: "24px" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box height={"160px"} width={"160px"}>
              <img src={successImage} width={"100%"} height={"100%"} />
            </Box>
            <Typography style={webStyle.title} align="center">
              Payment successful
            </Typography>
            <Typography style={webStyle.subtitle} align="center">
              Exit this page and go back to app by closing it
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}

const webStyle = {
  title: {
    fontSize: "36px",
    fontWeight: 600,
    lineHeight: "44px",
    fontFamily: "Inter",
    color: "#059669",
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    fontFamily: "Inter",
    color: "#011342",
  },
};
