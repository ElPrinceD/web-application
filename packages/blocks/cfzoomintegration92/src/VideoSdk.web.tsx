// Customizable Area Start
import React from "react";
import { Box, Button, IconButton, Typography, styled } from "@material-ui/core";
import { localProfile, bellIcon } from "./assets";
import {
  ArrowBackIosRounded,
  AddRounded,
  Menu,
  Close,
} from "@material-ui/icons";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import VideoSdkController, { Props } from "./VideoSdkController";
import Loader from "../../../components/src/Loader.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import RequestModal from "./../../dashboard/src/BookNotaryRequest.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
// Customizable Area End

export default class VideoSdk extends VideoSdkController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"32px"}>
        <StyledIconButton data-testID="toggleButton" onClick={this.openSideBar}>
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
                  className={`statusBox`}
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
            <MiniHeader 
              navigation={this.props.navigation}
              id={""}
              allRequestAPI={() => {}}
              />
          </Box>
        </Box>
      </Box>
    );
  };

  renderMobileNavigationMenu = () => {
    return (
      <>
        {this.state.isSideBarOpen && (
          <NavigationMenu navigation={this.props.navigation} id={""} />
        )}
      </>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <>
        <Loader loading={this.state.loader} />
        <RequestModal
          navigation={undefined}
          id={""}
          isOpen={this.state.isBookRequestModalOpen}
          closeModal={this.closeBookNotaryRequestModal}
          data-testID="modalOpen"
          allRequestAPI={() => {}}
          serviceData={this.state.serviceData}
          cancelReqModal={this.state.cancelBookRequestModal}
          yesButtonClick={this.bookNowYesButtonClick}
          noButtonClick={this.bookNowNoButtonClick}
          setLoader={this.setLoader}
          setModal={this.setIsBookRequestModalOpen}
          editRequest={undefined}
          backToEditRequest={() => {}} 
          isNewRequestOrEditRequestOrInviteClient={"new"}
        />
        <Box display={"flex"} className="test1">
          <DesktopDrawerBox>
            <NavigationMenu navigation={this.props.navigation} id={""} />
          </DesktopDrawerBox>
          <MobileTabletDrawerBox>
            {this.renderMobileNavigationMenu()}
          </MobileTabletDrawerBox>
          <MainBox
            height={"100vh"}
            overflow={"auto"}
            width={this.findMainBoxWidth()}
            style={{ backgroundColor: "#F9F9F9" }}
          >
            {this.Header()}
            <MainContentBox mt={"32px"} mx={"27px"}>
            <div id="sessionContainer"></div>
            </MainContentBox>
          </MainBox>
        </Box>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const MainContentBox = styled(Box)({
  "@media (min-width: 1025px)": {
    display: "flex",
  },
});

const MainBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "calc(100vw - 200px)",
  },
});

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

const StatusBox = styled(Box)({
  "& .statusBox": {
    background: "#FEF3C7",
    color: "#D97706",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 12px",
  },
});
// Customizable Area End
