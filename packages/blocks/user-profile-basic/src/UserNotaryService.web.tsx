// Customizable Area Start
import React from "react";
import UserNotaryServiceController, {
  Props,
} from "./UserNotaryServiceController";
import { Box, Grid, Typography, styled, Button } from "@material-ui/core";
import { allService, cancelRequest } from "./assets";
import { ArrowBackIos } from "@material-ui/icons";
export const configJSON = require("./config");
import CancelNotaryRequestModal from "../../../components/src/CancelNotaryRequestModal.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
// Customizable Area End

export default class UserNotaryService extends UserNotaryServiceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <Box display={"flex"}>
        <CancelNotaryRequestModal
          data-testID="cancelModal"
          text="Are you sure you want to save the changes?"
          cancelImage={cancelRequest}
          cancelReqModal={this.state.confirmationModal}
          handleYesButtonClick={this.updateUserServices}
          handleNoButtonClick={this.noBtn}
          yesBtnText="Yes"
          noBtnText="No"
          titleText="Confirm Changes"
        />
        <NavigationMenu navigation={this.props.navigation} id="" />
        <Box height="100vh" overflow={"auto"}>
          <Box
            display="flex"
            style={{ gap: "5px" }}
            alignItems="center"
            data-testID="goBackBtn"
            mt={"32px"}
            mx={"25px"}
          >
            <ArrowBackIos onClick={this.goBack}/>
            <Typography style={webStyles.pageTitle} onClick={this.goBack}>
              {configJSON.notaryServices}
            </Typography>
          </Box>
          <Box margin={"100px 65px"}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <CardBox
                  style={{
                    backgroundColor: this.state.areAllSelected
                      ? "#012275"
                      : "#FFF",
                  }}
                  onClick={this.toggleAreAllSelected}
                  data-testID="unSelectBtn"
                >
                  <Box>
                    <img src={allService} width={"44px"} height={"44px"} />
                  </Box>
                  <Typography
                    style={{
                      ...webStyles.serviceTitle,
                      color: this.state.areAllSelected ? "#FFF" : "#011342",
                    }}
                  >
                    {configJSON.selectAllService}
                  </Typography>
                </CardBox>
              </Grid>
              {this.state.allServices.map((service) => (
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                  <CardBoxComponent
                    data-testID="multiSelectBtn"
                    style={{
                      backgroundColor: service.isSelected ? "#012275" : "#ffff",
                    }}
                    onClick={() => this.multiSelect(service)}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "160px",
                        gap: "12px",
                      }}
                    >
                      <Box
                        style={{
                          backgroundColor: "#FFF",
                          height: "44px",
                          width: "44px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={service.attributes?.service_icon?.url}
                          alt="logo"
                        />
                      </Box>
                      <Typography
                        align="center"
                        style={{
                          ...webStyles.serviceTitle,
                          color: service.isSelected ? "#FFF" : "#011342",
                        }}
                      >
                        {service.attributes.service_name}
                      </Typography>
                      <Box
                        width={"90%"}
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          textOverflow: "ellipsis",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        <Typography
                          style={{
                            width: "100%",
                            color: service.isSelected ? "#FFF" : "#011342",
                            fontWeight: 500,
                            fontFamily: "Inter",
                            fontSize: "12px",
                          }}
                          align="center"
                        >
                          {service.attributes.service_description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardBoxComponent>
                </Grid>
              ))}
            </Grid>
            <Box m={"100px 48px 32px"}>
              {this.state.errorMsg && (
                <Typography style={{ color: "red" }} align="center">
                  {this.state.errorMsg}
                </Typography>
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              width={"100%"}
              alignItems={"center"}
              style={{ gap: "16px" }}
            >
              <SaveCancelButton
                variant="contained"
                fullWidth
                data-testID="saveBtn"
                style={{
                  backgroundColor: this.state.isAnyServiceSelected
                    ? "#012275"
                    : "#01227565",
                }}
                disabled={!this.state.isAnyServiceSelected}
                onClick={this.yesButtonClick}
              >
                <Typography style={{...webStyles.buttonText, color: "#FFF"}}>
                  {configJSON.saveChanges}
                </Typography>
              </SaveCancelButton>
              <SaveCancelButton
                variant="outlined"
                fullWidth
                data-testID="cancelBtn"
                style={{ border: "1px solid #5D5D5D" }}
                onClick={this.goBack}
              >
                <Typography style={webStyles.buttonText}>
                  {configJSON.cancel}
                </Typography>
              </SaveCancelButton>
            </Box>
          </Box>
        </Box>
      </Box>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const CardBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  height: "192px",
  padding: "16px 8px",
});

const CardBoxComponent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  height: "192px",
  padding: "16px 8px",
  transition: "background-color 0.3s ease", 
  '&:hover': {
    backgroundColor: "#b3cfff !important"
  },
});

const SaveCancelButton = styled(Button)({
  maxWidth: "440px",
  height: "52px",
  borderRadius: "8px",
  textTransform: "none",
});

const webStyles = {
  pageTitle: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 700,
    letterSpacing: "-0.5%",
    fontFamily: "inter",
    color: "#011342",
  },
  serviceTitle: {
    fontWeight: 600,
    fontFamily: "Inter",
    fontSize: "14px",
  },
  buttonText: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 700,
  },
};
// Customizable Area End
