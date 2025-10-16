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
import { createTheme, styled} from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";

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
import { AddRounded, ArrowBackIosRounded, Close, Menu} from "@material-ui/icons";
import { bellIcon, localProfile } from "../../../../packages/blocks/catalogue/src/assets";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
import Loader from "../../../components/src/Loader.web";
// Customizable Area End

import Cfzoomintegration92Controller, {
  Props,
  configJSON,
} from "./Cfzoomintegration92Controller";  

export default class Cfzoomintegration92 extends Cfzoomintegration92Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderMobileNavigationMenu = () => {
    return (
      <>
        {this.state.isSideBarOpen && (
          <NavigationMenu navigation={this.props.navigation} id={""} />
        )}
      </>
    );
  }

  renderMiniHeader = () => {
    return(
      <>
        <MiniHeader 
          navigation={this.props.navigation}
          id={""}
        />
      </>
    )
  }

  renderHeader = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"32px"}>
        <StyledIconButton data-test-id="toggleButton" onClick={this.openSideBar}>
          {this.state.isSideBarOpen ? (
            <Close style={{ width: "50px", height: "56px" }} />
          ) : (
            <Menu style={{ width: "50px", height: "56px" }} />
          )}
        </StyledIconButton>
        <Box width={"calc(100vw - 74px)"}>
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
                Order ID:{this.state.notaryRequestId}
              </Typography>
              <StatusBox>
                <Typography
                  className={` statusBox`}
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 700,
                    lineHeight: "18px",
                  }}
                  variant="body1"
                >
                  IN PROGRESS
                </Typography>
              </StatusBox>
            </Box>
            {this.renderMiniHeader()}
          </Box>
        </Box>
      </Box>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
        <> {this.state.loader && <Loader loading={this.state.loader} />}
        <Box display={"flex"} className="test1">
          
          <MainBox
            height={"100vh"}
            overflow={"auto"}
            width={this.findMainBoxWidth()}
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <ZoomContainer>
              <div id="zoom-meeting-container">
                <div id="zmmtg-root"></div>
                <div id="aria-notify-area"></div>
                <div id="meetingSDKElement"></div>
              </div>
            </ZoomContainer>
          </MainBox>
        </Box> </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

const StatusBox = styled(Box)({
  "& .statusBox": {
    color: "#D97706",
    background: "#FEF3C7",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 12px",
  },
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
};
const DesktopDrawerBox = styled(Box)({
  "@media (max-width: 1024px)": {
    display: "none",
  },
  display: "flex",
});

const MobileTabletDrawerBox = styled(Box)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});
const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});
const MainBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "calc(100vw - 200px)",
  },
});

const ZoomContainer = styled(Box)({
  width: "100%",
  height: "100vh",
  position: "relative",
  "& #zmmtg-root": {
    display: "none",
    position: "relative",
    width: "100%",
    height: "100%",
  },
  "& #zoom-meeting-container": {
    width: "100%",
    height: "100%",
    position: "relative",
  }
});
const MainContentBox = styled(Box)({
  "@media (min-width: 1025px)": {
    display: "flex",
  },
});

// Customizable Area End
