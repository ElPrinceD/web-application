import React from "react";
// Customizable Area Start
import {
  Box,
  styled,
  Paper,
  Typography,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import { image, notary } from "./assets";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CreditCardOutlinedIcon from "@material-ui/icons/CreditCardOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ModeNightIcon from "@material-ui/icons/Brightness2";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";

export const configJSON = require("./config");
// Customizable Area End

import UserProfileBasicController, {
  Props
} from "./UserProfileBasicController";


export default class UserProfileBasicBlock extends UserProfileBasicController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAccount = () => {
    return (
      <ContentBox>
        <Box className="imgBox">
          <img
            src={this.state.avatar?.url ? this.state.avatar?.url : image}
            alt=""
          />
          {!this.state.online ? (
            <Box className="status" />
          ) : (
            <ModeNightIcon className="offline" />
          )}
        </Box>
        <Box className="statusText">
          <span className="greenText">{configJSON.setYourself}</span>{" "}
          <span
            className="blueText"
            data-testID="onlineBtn"
            onClick={this.setOnline}
          >
            {this.state.online ? configJSON.onlineText : configJSON.offline}
          </span>
          {this.state.online ? (
            <Box className="statusGreen" />
          ) : (
            <ModeNightIcon className="blueText" />
          )}
        </Box>
        <OptionsBox>
          <Box
            className="option"
            component={Paper}
            data-testID="profileBtn"
            onClick={this.handleProfileOpen}
          >
            <Box className="nameIcon">
              <AccountCircleOutlinedIcon className="iconStyle" />
              <p className="profileText">{configJSON.myProfile}</p>
            </Box>
            <NavigateNextIcon />
          </Box>
          <Box
            className="option"
            component={Paper}
            onClick={this.goToTransactionHistory}
          >
            <Box className="nameIcon">
              <CreditCardOutlinedIcon className="iconStyle" />
              <p className="profileText">{this.state.roleID === 2 ? "Transaction History" : "Payments"}</p>
            </Box>
            <NavigateNextIcon />
          </Box>
          {this.state.roleID === 2 && (
            <Box
              className="option"
              component={Paper}
              data-testID="notaryNavigateBtn"
              onClick={this.notaryNavigation}
            >
              <Box className="nameIcon">
                <img src={notary} className="iconStyle" />
                <p className="profileText">{configJSON.notaryServices}</p>
              </Box>
              <NavigateNextIcon />
            </Box>
          )}
          <Box
            className="option"
            component={Paper}
            onClick={this.handleSettingsBtn}
          >
            <Box className="nameIcon">
              <SettingsOutlinedIcon className="iconStyle" />
              <p className="profileText">{configJSON.settings}</p>
            </Box>
            <NavigateNextIcon />
          </Box>
        </OptionsBox>
      </ContentBox>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <RequestSectionBox>
      <Box className={this.state.isSideBarOpen ? "sideBarOpen" : "sideBar"}>
        <NavigationMenu navigation={this.props.navigation} id="" />
      </Box>
      <Box className="accountContainer">
        <Box 
          className="headerContainer"
          data-testID="headerContainerBtn"
           onClick={this.handleBackArrow}
        >
        
          <HeaderMyAccount>
            {configJSON.myAccount}
            
          </HeaderMyAccount>
        </Box>
        {this.renderAccount()}

      </Box>
    </RequestSectionBox>
    );
    // Customizable Area End
  }
  
}
// Customizable Area Start
const RequestSectionBox = styled(Box)({
  display: "flex",
  height: "100vh",
  overflowY: "hidden",
  "& .accountContainer": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "whitesmoke",
    justifyContent: "flex-start",
    overflowY: "scroll",
    padding: "35px 0px",
    "& .headerContainer": {
      display: "flex",
      alignItems: "center",
      marginLeft: "24px",
      justifyContent: "flex-start",
      cursor: "pointer",
    },
  },
  "& .svgDesign": {
    cursor: "pointer",
  },
});

const HeaderMyAccount = styled(Typography)({
  fontSize: "24px",
  fontFamily: "Inter",
  fontWeight: 700,
  color: "#011342",
});

const ContentBox = styled(Box)({
  margin: "100px auto",
  background: "#fff",
  boxShadow: "0px 2px 2px 0px #00000014",
  width: "514px",
  padding: "62px 24px 24px 24px",
  height: "547px",
  "& .imgBox": {
    height: "92px",
    width: "92px",
    margin: "0 auto",
    position: "relative",
  },
  "& .imgBox img": {
    height: "92px",
    width: "92px",
    borderRadius: "50%",
    border: "2px solid #CCD3E3",
  },
  "& .status": {
    height: "12px",
    width: "12px",
    background: "#34D399",
    borderRadius: "50%",
    position: "absolute",
    right: "2px",
    bottom: "2px",
    border: "2px solid #fff",
  },
  "& .offline": {
    height: "12px",
    width: "12px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    position: "absolute",
    right: "2px",
    bottom: "2px",
    border: "2px solid #fff",
  },
  "& .statusText": {
    fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: 400,
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "14px",
    marginBottom: "24px",
    "& .greenText": {
      color: "#34D399",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
    },
    "& .blueText": {
      color: "#012275",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 700,
      cursor: "pointer",
    },
    "& .statusGreen": {
      height: "12px",
      width: "12px",
      background: "#34D399",
      borderRadius: "100%",
      border: "2px solid #fff",
    },
  },
});

const OptionsBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  fontSize: "16px",
  fontWeight: 500,
  fontFamily: "Inter",
  "& .option": {
    width: "450px",
    height: "56px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
  },
  "& .nameIcon": {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  "& .profileText": {
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Inter",
    color: "#011342",
    margin: "0",
    cursor: "pointer",
  },
  "& .iconStyle": {
    height: "20px",
    width: "20px",
  },
});

// Customizable Area End
