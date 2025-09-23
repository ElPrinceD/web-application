import React from "react";

// Customizable Area Start

import LandingPageController, { Props } from "./LandingPageController";
import { Box, Typography } from "@material-ui/core";
// Customizable Area End



export default class UserDashboard extends LandingPageController {
  private sliderRef: any;
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
   
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      // Required for all blocks
      <Box>
        <Box style={{  fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "32px",
    letterSpacing: "-0.005em",
    textAlign: "center",
   height: "48px", 
    position: "absolute",
    top: "33px",
    left: "225px",
    display: "flex",
    justifyContent: "space-between",
    opacity: 0,}}>
          <Typography style={{  fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "32px",
    letterSpacing: "-0.005em",
    textAlign: "center",}}>
            DashBoard
          </Typography>
        </Box>
      </Box>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyles = {

};
// Customizable Area End
