import React from "react";
// Customizable Area Start
import {
  Box,
  styled,
  Typography,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import { image} from "./assets";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CreateIcon from "@material-ui/icons/Create";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";

export const configJSON = require("./config");
// Customizable Area End

import UserProfileController, {
  Props
} from "./UserProfileController";


export default class UserProfile extends UserProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderOption = () => {
    return (
      <OptionsBoxEdit>
        <OptionEdit>
          <p className="option">{configJSON.fullName}</p>
          <Input
            className="input"
            data-testID="fullNameTestID"
            disableUnderline
            inputProps={{
              maxLength: 30,
            }}
            readOnly={!this.state.isEditing}
            value={this.state.fullName !== null && this.state.fullName}
            onChange={this.handleNameChange}
          />
        </OptionEdit>
        {this.state.isFullName && (
          <p className="errorText1">{configJSON.errorFullName}</p>
        )}
        <OptionEdit>
          <p className="option">{configJSON.emailID}</p>
          <Input
            className={this.state.emailProfile ? "inputEmail" : "input"}
            data-testID="emailTestID"
            disableUnderline
            readOnly={true}
            value={this.state.emailProfile}
            onChange={this.handleEmailChange}
          />
        </OptionEdit>
        {(this.state.user_type === "notary" || this.state.user_type === "business") 
        && (
      <OptionEdit>
      <p className="option">Business / Company Name</p>
      <Input
        className="input"
        data-testID="companyTestID"
        disableUnderline
        readOnly={!this.state.isEditing}
        value={this.state.companyName}
        onChange={this.handleCompanyChange}
        inputProps={{
          maxLength: 30,
        }}
      />
    </OptionEdit>
  )
}
        {this.state.isCompany && (
          <p className="errorText1">{configJSON.companyError}</p>
        )}
        <OptionEdit>
          <p className="option">{configJSON.mobileText}</p>
          <Select
            className="input code"
            data-testID="mobileCodeTestID"
            value={this.getCountryCodeValue(this.state.countryCode)}
            readOnly={!this.state.isEditing}
            IconComponent={ExpandMoreIcon}
            onChange={this.handleCodeChange}
            displayEmpty
            fullWidth
            disableUnderline
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
              keepMounted: true,
            }}
          >
            {this.state.countryCodes.map((item) => (
              <MenuItem key={item.country_code} value={item.country_code}>
                {"+"}
                {item.country_code}
              </MenuItem>
            ))}
          </Select>
          <Input
            className="input mobileNumber"
            disableUnderline
            data-testID="mobileNoTestID"
            type="phone_number"
            readOnly={!this.state.isEditing}
            value={
              this.state.phoneNumberProfile
                ? this.state.phoneNumberProfile
                : ""
            }
            inputProps={{
              maxLength: 12,
            }}
            onChange={this.handlePhoneNumberChange}
          />
        </OptionEdit>
        {this.state.isPhone && (
          <p className="errorText1">{configJSON.errorMobile}</p>
        )}
         {!this.state.isValidNumber && (
          <p className="errorText1">{configJSON.countryValidation}</p>
        )}
        <OptionEdit>
          <p className="option">{configJSON.addressLine}</p>
          <Input
            className="input"
            disableUnderline
            data-testID="addressTestID"
            inputProps={{
              maxLength: 50,
            }}
            readOnly={!this.state.isEditing}
            value={this.getValueOrDefault(this.state.addressOne)}
            onChange={this.handleAddressOneChange}
          />
        </OptionEdit>
        {this.state.isAddressOne && (
          <p className="errorText1">{configJSON.errorAddress}</p>
        )}
        <OptionEdit>
          <p className="option">{configJSON.addressLineTwo}</p>
          <Input
            className="input"
            disableUnderline
            data-testID="addressTwoTestID"
            inputProps={{
              maxLength: 50,
            }}
            readOnly={!this.state.isEditing}
            value={this.getValueOrDefault(this.state.addressTwo)}
            onChange={this.handleAddressTwoChange}
          />
        </OptionEdit>
        <OptionEdit>
          <Box className="city left">
            <p className="option">{configJSON.city}</p>
            <Input
              className="input cityInput"
              disableUnderline
              data-testID="cityTestID"
              inputProps={{
                maxLength: 30,
              }}
              readOnly={!this.state.isEditing}
              value={this.getValueOrDefault(this.state.city)}
              onChange={this.handleCityChange}
            />
          </Box>
          <Box className="city">
            <p className="option">{configJSON.country}</p>
            <Select
              className="input codeCountry"
              data-testID="countryTestID"
              value={this.getValueOrDefault(this.state.country)}
              readOnly={!this.state.isEditing}
              IconComponent={ExpandMoreIcon}
              onChange={this.handleCountryChange}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
                keepMounted: true,
              }}
            >
              {this.state.countries.map((item) => (
                <MenuItem
                  key={item.attributes.name}
                  value={item.attributes.name}
                >
                  {item.attributes.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {this.state.isCity && (
            <p className="errorTexte">{configJSON.errorCity}</p>
          )}
        </OptionEdit>
        {this.state.isCity && (
          <p className="errorText1">{configJSON.errorCity}</p>
        )}
        <OptionEdit>
          <p className="option">{configJSON.postCode}</p>
          <Input
            className="input"
            disableUnderline
            data-testID="postCodeTestId"
            inputProps={{
              maxLength: 8,
            }}
            readOnly={!this.state.isEditing}
            value={this.getValueOrDefault(this.state.postalCode)}
            onChange={this.handlePostalCodeChange}
          />
        </OptionEdit>
        {this.state.isPostCode && (
          <p className="errorText1">{configJSON.errorPost}</p>
        )}
      </OptionsBoxEdit>
    );
  };

  renderOptionEdit = () => {
    return (
      <OptionsBoxEdit>
        {this.state.isEditing ? (
          <button
            className="btn btnSave"
            data-testID="saveTestID"
            onClick={this.handleChangeSave}
          >
            <p>Save Changes</p>
          </button>
        ) : (
          <button
            className="btn btnSave"
            data-testID="editTestId"
            onClick={this.handleChangeEditing}
          >
            <CreateIcon />
            <p>Edit Profile</p>
          </button>
        )}
        {this.state.isEditing && (
          <button
            data-testID="cancelBtn"
            className="btn btnCancel"
            onClick={this.handleCancel}
          >
            {configJSON.cancel}
          </button>
        )}
      </OptionsBoxEdit>
    );
  };

  renderEditProfile = () => {
    return (
      <ContentBoxEdit>
        <InnerContentBoxEdit>
          <ImageBoxEdit>
            <label htmlFor="file" className="profileLableContainer">
              <img
                src={this.state.avatar?.url ? this.state.avatar?.url : image}
                alt=""
              />
              {this.state.isEditing && (
                <Box className="camIconBox">
                  <CameraAltOutlinedIcon />
                  <p>{configJSON.editPicture}</p>
                </Box>
              )}
            </label>
            {this.state.isEditing && (
              <input
                type="file"
                id="file"
                data-testID="filechangeBtn"
                className="imgInput"
                accept=".png, .jpeg, .jpg"
                readOnly={!this.state.isEditing}
                onChange={this.handleAvatarChanges}
              />
            )}
          </ImageBoxEdit>
          {this.state.invalidFile && (
            <p className="invalidFile">{configJSON.invalidDes}</p>
          )}
          {this.renderOption()}
          {this.renderOptionEdit()}
        </InnerContentBoxEdit>
      </ContentBoxEdit>
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
          >
            <ArrowBackIosIcon className="svgDesign" onClick={this.handleBackArrow}/>

            <HeaderMyAccount onClick={this.handleBackArrow}>
              {configJSON.myProfile}
            </HeaderMyAccount>
          </Box>
          { this.renderEditProfile()}
        </Box>
      </RequestSectionBox>
    );
    // Customizable Area End
  }
  
}
// Customizable Area Start
const RequestSectionBox = styled(Box)({
  overflowY: "hidden",
  display: "flex",
  height: "100vh",
  "& .accountContainer": {
    padding: "35px 0px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "whitesmoke",
    justifyContent: "flex-start",
    overflowY: "scroll",
    "& .headerContainer": {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      marginLeft: "24px",
      justifyContent: "flex-start",
    },
  },
  "& .svgDesign": {
    cursor: "pointer",
  },
});

const HeaderMyAccount = styled(Typography)({
  color: "#011342",
  fontSize: "24px",
  fontFamily: "Inter",
  fontWeight: 700,
});

const ContentBoxEdit = styled(Box)({
  boxSizing: "border-box",
  width: "504px",
  margin: "0 auto",
  background: "#fff",
  borderRadius: "8px",
  padding: "52px 32px 32px 32px",
  height: "auto",
  marginTop: "32px",
});

const InnerContentBoxEdit = styled(Box)({
  margin: "0 auto",
  width: "440px",
  "& .invalidFile": {
    fontFamily: "Inter",
    color: "red",
    textAlign: "center",
    width: "100%",
    fontSize: "10px",
  },
});

const ImageBoxEdit = styled(Box)({
  border: "1px solid",
  height: "96px",
  borderRadius: "50%",
  width: "96px",
  margin: "0 auto",
  position: "relative",
  "& img": {
    borderRadius: "50%",
    height: "96px",
    width: "96px",
  },

  "& .camIconBox": {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    color: "white",
    fontWeight: 700,
    backgroundColor: "black",
    width: "96px",
    height: "96px",
    bottom: "22px",
    fontSize: "14px",
    lineHeight: "14px",
    borderRadius: "50%",
    marginBottom: "-20px",
    opacity: 0.4,
  },
  "& .camIconBox p": {},
  "& .imgInput": {
    display: "none",
  },
  "& .profileLableContainer": {
    height: "0px",
    display: "block",
  },
});

const OptionsBoxEdit = styled(Box)({
  gap: "13px",
  marginTop: "32px",
  display: "flex",
  flexDirection: "column",
  "& .phoneNumber": {
    display: "flex",
  },
  "& .errorText": {
    margin: "4px",
    color: "red",
    fontSize: "11px",
    fontWeight: 500,
    fontFamily: "Inter",
  },
  "& .errorTexte": {
    margin: "4px",
    color: "white",
    fontSize: "11px",
    fontWeight: 500,
    fontFamily: "Inter",
  },
  "& .errorText1": {
    marginBottom: "7px",
    color: "red",
    fontSize: "11px",
    fontWeight: 500,
    fontFamily: "Inter",
  },
  "& .btn": {
    fontFamily: "Inter",
    borderRadius: "8px",
    height: "52px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  "& .btnSave": {
    alignItems: "center",
    gap: "5px",
    color: "white",
    background: "#012275",
    border: "none",
    outline: "none",
    display: "flex",
    justifyContent: "center",
  },
  "& .btnCancel": {
    boxSizing: "border-box",
    border: "1px solid #5D5D5D",
    background: "#fff",
  },
});

const OptionEdit = styled(Box)({
  height: "70px",
  width: "440px",
  "& .MuiInput-underline:hover:not(.Mui-disabled)::before": {
    borderBottom: "0px",
  },
  "& .MuiInput-underline::before": {
    borderBottom: "0px",
  },
  "& .left": {
    marginRight: "12px",
  },
  "& .option": {
    color: "#011342",
    fontWeight: 700,
    fontSize: "14px",
    marginBottom: "6px",
    fontFamily: "Inter",
  },
  "& .input": {
    padding: "12px 14px",
    border: "1px solid #CBD5E1",
    width: "440px",
    boxSizing: "border-box",
    height: "44px",
    color: "#011342",
    fontSize: "16px",
    fontFamily: "Inter",
    borderRadius: "8px",
    "& .MuiInputBase-input": {
      padding: "0px",
      backgroundColor: "#fff",
      fontFamily: "Inter",
      color: "#011342",
    },
  },
  "& .mobileNumber": {
    width: "332px",
  },
  "& .inputEmail": {
    color: "#64748B !important",
    border: "1px solid #CBD5E1",
    width: "440px",
    height: "44px",
    fontSize: "16px",
    boxSizing: "border-box",
    fontFamily: "Inter",
    borderRadius: "8px",
    padding: "12px 14px",
  },
  "& .code": {
    padding: "10px",
    width: "100px",
    height: "44px",
    marginRight: "8px",
    backgroundColor: "#fff",
    "& .MuiSelect-icon": {
      color: "#011342",
      right: "10px",
    },
  },
  "& .codeCountry": {
    width: "214px",
    backgroundColor: "#fff",
    height: "44px",
    marginRight: "8px",
    padding: "10px",
    "& .MuiSelect-icon": {
      color: "#011342",
      right: "10px",
    },
  },
  "& .city ,.cityInput": {
    display: "inline-block",
    width: "214px",
    "& .MuiInputBase-input": {
      padding: "0px",
    },
  },

  
});
// Customizable Area End
