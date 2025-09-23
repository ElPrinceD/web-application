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
import Draggable from 'react-draggable'; 
import Cfzoomintegration92 from "../../../../packages/blocks/cfzoomintegration92/src/Cfzoomintegration92";

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

          <Box data-testID="test1"  className="test1">
            <MainBox
            height="100vh"
            overflow="auto"
            width="100%"
            justifyContent="space-between"
            data-testID="test2"
            style={{ backgroundColor: "#F4F6F8" }}
            >
            <MainContentBox mt="32px" mx="27px">
            <style>
            {`
            #docusign-iframe {
            border: none;
            border-radius: 12px;
            }
            `}
            </style>


            {this.state.sender_url !== "" && (
            <iframe
            id="docusign-iframe"
            className="iframeDocu"
            src={this.state.sender_url}
            ></iframe>
            )}

            <Box className="buttonArea">
                {!this.state.zoomModal && (
                <Button
                variant="contained"
                className="joinButton"
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#115293')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#012275')}
                onClick={() => this.setState({ zoomModal: true })}
                >
                  <Typography style={{ fontWeight: 500, color: "#fff" }}>
                  Join Meeting
                  </Typography>
                </Button>
                )}

              {this.state.zoomModal && (
                <Draggable>
                  <Box className="draggableArea">
                    <Box className="draggableAreaInside">
                        <Cfzoomintegration92 navigation={undefined} id="" />
                    </Box>
                  </Box>
                </Draggable>
              )}
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

  "& .iframeDocu": {
    width: "70%",
    height: "600px",
    overflow: "hidden",
    marginBottom: "24px",
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

  "& .draggableArea":{
    width: '900px',
    height: '650px',
    position: 'fixed',
    left: '72%',
    top: '10%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    borderRadius: '16px',
    zIndex: 1300,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  },

  "& .draggableAreaInside":{
    flex: 1,
    overflow: 'hidden',
    }
  
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
