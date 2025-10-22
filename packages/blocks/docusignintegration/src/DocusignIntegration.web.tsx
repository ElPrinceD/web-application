// Customizable Area Start
import React from "react";

import DocusignIntegrationController, {
  Props,
} from "./DocusignIntegrationController";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import RequestModal from "./../../dashboard/src/BookNotaryRequest.web";
import Loader from "../../../components/src/Loader.web";
import { Box, IconButton, Typography, Button, styled, } from "@material-ui/core";
import {
  Menu,
  Close,
  ArrowBackIosRounded,
  AddRounded,
} from "@material-ui/icons";
import { localProfile, bellIcon } from "./assets";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
import EmbeddedZoom from "./EmbeddedZoom.web";

export default class DocusignIntegration extends DocusignIntegrationController {
  constructor(props: Props) {
    super(props);
  }

 

  render() {
    return (
      <>
        <Loader loading={this.state.loader} />
        <RequestModal
          data-testID="modalOpen"
          navigation={undefined}
          id={""}
          closeModal={this.closeBookNotaryRequestModal}
          isOpen={this.state.modalOpen}
          allRequestAPI={() => { } }
          serviceData={this.state.serviceData}
          cancelReqModal={this.state.cancelBookNowReqModal}
          yesButtonClick={this.bookNowYesButtonClick}
          noButtonClick={this.bookNowNoButtonClick}
          setModal={this.setBookNowModal}
          setLoader={this.setLoader}
          isNewRequestOrEditRequestOrInviteClient={"new"}
          backToEditRequest={() => { } }
          editRequest={undefined}        />

          <Box data-testid="test1"  className="test1">
            <MainBox
            height="100vh"
            overflow="auto"
            width="100%"
            justifyContent="space-between"
            data-testid="test2"
            style={{ backgroundColor: "#F4F6F8" }}
            >
            <MainContentBox mt="32px" mx="27px">
            <style>
            {`
            #docusign-iframe {
            border: none;
            border-radius: 12px;
            }
            /* Ensure Zoom stays contained and does not override page scroll */
            #meetingSDKElement,
            #zmmtg-root,
            #react-zoom-app {
              position: relative !important;
              width: 100% !important;
              height: 100% !important;
              top: 0 !important;
              left: 0 !important;
              z-index: 1 !important;
            }
            html, body {
              overflow: auto !important;
              height: auto !important;
            }
            /* Hide Join Meeting button when side-by-side layout is active */
            .sideBySideContainer .buttonArea {
              display: none !important;
            }
            .sideBySideContainer .joinButton {
              display: none !important;
            }
            
            /* Hide any buttons inside DocuSign iframe when in side-by-side mode */
            .sideBySideContainer .docusignPanel iframe {
              /* Note: We cannot directly style content inside iframes due to CORS */
              /* The DocuSign iframe content has its own "Join Meeting" button */
              /* This is part of the DocuSign workflow, not our React component */
            }
            `}
            </style>


            {/* Side-by-side layout container */}
            <Box className="sideBySideContainer">
              {/* DocuSign signing experience */}
              {this.state.sender_url !== "" && (
                <Box className="docusignPanel">
                  {this.state.isLoadingDocuSign && (
                    <Box className="loadingSpinner">
                      <Typography variant="body2" style={{ color: "#6b7280" }}>
                        Loading DocuSign...
                      </Typography>
                    </Box>
                  )}
                  <div id="docusign-container" className="docusignContainer"></div>
                </Box>
              )}

              {/* Zoom meeting panel */}
              {this.state.zoomModal && (
                <Box className="zoomPanel">
                  {this.state.isLoadingZoom && (
                    <Box className="loadingSpinner">
                      <Typography variant="body2" style={{ color: "#6b7280" }}>
                        Loading Zoom meeting...
                      </Typography>
                    </Box>
                  )}
                  {this.state.sdkKey && this.state.signature && this.state.meetingNumber && this.state.password ? (
                    <EmbeddedZoom
                      sdkKey={this.state.sdkKey}
                      signature={this.state.signature}
                      meetingNumber={this.state.meetingNumber}
                      password={this.state.password}
                      userName={this.state.userName}
                      userEmail={this.state.email}
                      onClose={() => this.setState({ zoomModal: false })}
                    />
                  ) : (
                    <Typography variant="body2" style={{ padding: 16, color: "#6b7280" }}>
                      Preparing meeting...
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* React Join Meeting button */}
            <Box
              className="buttonArea"
              style={{
                display: this.state.zoomModal ? "none" : "flex",
              }}
            >
              <Button
                variant="contained"
                className="joinButton"
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#115293')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#012275')}
                onClick={() => {
                  this.setState({ zoomModal: true });
                  this.getZoomMeetingData();
                }}
              >
                <Typography style={{ fontWeight: 500, color: "#fff" }}>
                  Join Meeting
                </Typography>
              </Button>
            </Box>

            </MainContentBox>
            </MainBox>
          </Box>

      </>
    );
  }
}

const MainBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width:"100%",
    justifyContent:"space-between"
  },


  "& .sideBySideContainer": {
    display: "flex",
    gap: "16px",
    height: "calc(100vh - 120px)",
    width: "100%",
    marginBottom: "24px",
  },

  "& .docusignPanel": {
    flex: 3,
    width: "75%",
    height: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },

  "& .docusignContainer": {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "12px",
  },

  "& .zoomPanel": {
    flex: 1,
    width: "25%",
    height: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    position: "relative",
    overflow: "hidden",
    resize: "none",
    minWidth: "300px",
    maxWidth: "400px",
  },

  "& .loadingSpinner": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "16px",
    borderRadius: "8px",
  },


  "& .buttonArea": {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  "& .joinButton": {
    padding: '10px 20px',
    backgroundColor: '#012275',
    borderRadius: '8px',
    textTransform: 'none',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#fff',
  },





});

const MainContentBox = styled(Box)({
  height: "calc(100vh - 144px)",
  "@media (min-width: 1025px)": {
    display: "flex",
    justifyContent:"space-between"
  },

  "& .zoomMettingSection": {
    width: "400px",
    height: "500px",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    padding: "16px",
    overflow: "hidden",
  },

  "& .tabInsiderButton":{
    backgroundColor: "#012275",
    borderRadius: "4px",
    padding: 0,
    height: "44px",
    width: "324px",
    textTransform: "none",
  },
  "& .tabInsiderButtonTypography":{
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
    color: "#FFF",
  }
});

// Customizable Area End
// Customizable Area End
