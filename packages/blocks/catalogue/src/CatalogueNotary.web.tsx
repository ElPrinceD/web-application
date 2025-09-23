// Customizable Area Start
import React from "react";
import CatalogueNotaryController, { Props } from "./CatalogueNotaryController";
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import RequestModal from "../../dashboard/src/BookNotaryRequest.web";
import Loader from "../../../components/src/Loader.web";
import { AddRounded, Close, Menu } from "@material-ui/icons";

import {
  localProfile,
  notartyBackButton,
  logoBlueImg,
} from "./assets";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import CustomFooter from "../../../components/src/CustomFooter.web";
import CustomSearchField from "../../../components/src/CustomSearchField.web";
import CustomAutocomplete from "../../../components/src/CustomAutocomplete.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
// Customizable Area End

export default class CatalogueNotary extends CatalogueNotaryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"32px"}>
        <StyledIconButton onClick={this.openSideBar} data-test-id="toggleButton" data-testID="toggleButton">
          {this.state.isSideBarOpen ? (
            <Close style={webStyle.closeIcon} data-testID="closeIcon" />
          ) : (
            <Menu style={webStyle.closeIcon} />
          )}
        </StyledIconButton>
        <Box width={"calc(100vw - 74px)"}>
          <Box
            alignItems={"center"}
            mx={"25px"}
            justifyContent={"space-between"}
            display={"flex"}
          >
            <Box
              alignItems={"center"}
              height={"48px"}
              display={"flex"}
              style={webStyle.headingBox}
            >
              <Button onClick={this.gotoback}>
                <img src={notartyBackButton} />
              </Button>
              <Typography style={webStyle.headingText}>Notaries</Typography>
            </Box>          
            <MiniHeader 
              navigation={this.props.navigation}
              id={""}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  filterdData = () => {
    if (!this.state.accountData || this.state.accountData.length === 0) {
      return (
        <Box style={{ margin: "32px 24px" }}>
          <Loader loading={this.state.loader} />

          {!this.state.loader ? (
            <Typography variant="h6" align="center">
              No notaries are available
            </Typography>
          ) : (
            ""
          )}
        </Box>
      );
    }
    return (
      <Box style={{ margin: "32px 24px 32px 24px" }}>
        <Grid container spacing={2}>
          {this.state?.accountData?.map((notary) => (
            <Grid item md={6} lg={3} xl={3} xs={12} sm={6}>
              <Box
                display={"flex"}
                style={{
                  rowGap: "16px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                  backgroundColor: "#F5F9FF",
                }}
                justifyContent={"center"}
                minHeight={"160px"}
                flexDirection={"column"}
                alignItems={"center"}
                p={"24px 8px"}
                borderRadius={"8px"}
              >
                <img
                  style={{ borderRadius: "50px" }}
                  height={"72px"}
                  src={
                    notary.attributes.photo && notary.attributes.photo.url
                      ? notary.attributes.photo.url
                      : localProfile
                  }
                  width={"72px"}
                />
                <Box
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  style={{ rowGap: "8px" }}
                  width={"90%"}
                  display={"flex"}
                >
                  <Typography style={webStyle.notaryName} align="center">
                    {notary.attributes.full_name}
                  </Typography>
                  <Box
                    justifyContent={"center"}
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <LocationOnOutlinedIcon
                      style={{
                        height:"16px",
                        color:"red",
                        width:"16px"
                      }}
                      
                    />
                    <Typography style={webStyle.notaryPlace}>
                      {notary.attributes.country}
                    </Typography>
                  </Box>
                  <Box
                    alignItems={"center"}
                    justifyContent={"center"}
                    display={"flex"}
                  >
                    <StarOutlinedIcon
                      style={{
                        color:"#F59E0B",
                        width:"14px",
                        height:"14px"
                      }}
                    />
                    <Typography
                      style={webStyle.serviceDescription}
                      align="center"
                    >
                      {notary.attributes.rating} Ratings |{" "}
                      {notary?.attributes?.total_notaries ?? 0} Orders  
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  allData = () => {
    return (
      <Box style={{ margin: "32px 24px 32px 24px" }}>
        <Grid container spacing={2}>
          {this.state.serviceData.map((notary) => (
            <Grid item xl={3} sm={6} md={6} lg={3} xs={12}>
              <Box
                display={"flex"}
                style={{
                  backgroundColor: "#F5F9FF",
                  rowGap: "16px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                }}
                justifyContent={"center"}
                borderRadius={"8px"}
                minHeight={"160px"}
                flexDirection={"column"}
                alignItems={"center"}
                p={"24px 8px"}
              >
                <img
                  height={"72px"}
                  src={
                    notary.photo !== "No Photo" ? notary.photo : localProfile
                  }
                  style={{ borderRadius: "50px" }}
                  width={"72px"}
                />
                <Box
                  justifyContent={"center"}
                  width={"90%"}
                  display={"flex"}
                  style={{ rowGap: "8px" }}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <Typography style={webStyle.notaryName} align="center">
                    {notary.name}
                  </Typography>
                  <Box
                    justifyContent={"center"}
                    alignItems={"center"}
                    display={"flex"}
                  >
                    <LocationOnOutlinedIcon
                      style={{
                        height:"16px",
                        color:"red",
                        width:"16px"
                      }}
                    />
                    <Typography style={webStyle.notaryPlace}>
                      {notary.jurisdiction}
                    </Typography>
                  </Box>
                  <Box
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <StarOutlinedIcon
                      style={{
                        color:"#F59E0B",
                        width:"14px",
                        height:"14px"
                      }}
                    />
                    <Typography
                      style={webStyle.serviceDescription}
                      align="center"
                    >
                      {notary.rating} Ratings | {notary.total_notaries} Orders
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  truncateText(text: any, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <div className="main_cont">
        <RequestSectionBox>
          <Loader loading={this.state.loader} />
          <RequestModal
            setLoader={this.setLoader}
            setModal={this.setModal}
            editRequest={undefined}
            isNewRequestOrEditRequestOrInviteClient={"new"}
            id={""}
            serviceData={this.state.serviceData}
            isOpen={this.state.modalOpen}
            closeModal={this.closeBookNotaryRequestModal}
            data-testID="modalOpen"
            cancelReqModal={this.state.cancelReqModal}
            yesButtonClick={this.yesButtonClick}
            noButtonClick={this.noButtonClick}
            allRequestAPI={() => {}}
            navigation={undefined}
            backToEditRequest={() => {}} 
          />
          <Box className={this.state.isSideBarOpen ? "sideBarOpen" : "sideBar"}>
            <NavigationMenu navigation={this.props.navigation} id={""} />
          </Box>
          <div className="mainSection" data-test-id="scrollsection" ref={this.scrollData} onScroll={this.handleScroll}>
            <Grid container>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box className="tabLogo">
                  {" "}
                  <Box className="tabLogoBox">
                    <img
                      src={logoBlueImg}
                      alt=""
                      width={"100%"}
                      height="100%"
                    />
                  </Box>
                </Box>
                {this.Header()}
                <Searchandauto>
                  <AutocompleteBox>
                    <CustomAutocomplete
                      options={this.state.jurisdictions}
                      value={this.state.selectedJurisdiction}
                      onChange={this.handleChange}
                      label={"Choose your Jurisdiction"}
                      isAsteriskShown={true}
                    />
                  </AutocompleteBox>

                  <SearchFieldBox>
                    <CustomSearchField
                      placeholder={"Search"}
                      onChange={this.handleSearchChange}
                      inputColor={"#011342"}
                      borderColor={"#011342"}
                      placeholderColor={"#011342"}
                      searchIconColor={"#012275"}
                      borderRadius="8px"
                    />
                  </SearchFieldBox>
                </Searchandauto>
              </Grid>
            </Grid>
            {this.state.popularSelectData ? this.filterdData() : this.allData()}

            <CustomFooter />
          </div>
        </RequestSectionBox>
      </div>
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

const RequestSectionBox = styled(Box)({
  display: "flex",
  height: "100vh",
  overflowY: "hidden",
  "& .mainSection": {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "scroll",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  "& .tabLogo": {
    display: "none",
    width: "100%",
    paddingTop: "20px",
  },
  "& .tabLogoBox": {
    width: "160px",
    height: "50px",
  },
  "@media screen and (max-width:1024px)": {
    "& .sideBar": {
      display: "none",
    },
    "& .sideBarOpen": {
      display: "block",
    },
    "& .tabLogo": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});
const SearchFieldBox = styled(Box)({
  width: "390px",
  "@media (max-width: 819px)": {
    width: "48%",
  },
});
const webStyle = {
  productContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "white",
    marginTop: "20px",
  },
  notaryName: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
    color: "#011342",
  },
  notaryPlace: {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "14.52px",
    color: "#64748B",
  },
  serviceDescription: {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "18px",
  },
  closeIcon: { width: "50px", height: "56px" },

  headingBox: { columnGap: "8px" },
  headingText: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.5%",
    color: "#011342",
  },
  bellIconShadow: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#FFF",
  },
  cardTitle: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "21px",
    color: "#011342",
  },
  productBox: {
    height: 250,
    width: "49%",
    marginRight: "5px",
    flexDirection: "column",
  },
  ImgContainer: {
    //marginBottom: 15,
    height: 150,
  },
  productImg: {
    width: "100%",
    height: "100%",
  },
  detailContent: {
    display: "flex",
    flexDirection: "column",
  },
};

const DashboardBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "20px",
  justifyContent: "space-between",
  "& .menuIconBtn": {
    display: "none",
  },
  "& .dashboardHeading": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& .MuiTypography-body1": {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "32px",
      fontFamily: "Inter",
      color: "#011342",
    },
  },
  "& .menuIcon": {
    display: "none",
  },
  "& .profileBox": {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    gap: "15px",
    "& .MuiButton-root": {
      fontSize: "16px",
      fontWeight: 700,
      fontFamily: "Inter",
      textTransform: "none",
      color: "white",
      background: "#012275",
      borderRadius: "4px",
      paddingRight: "15px",
      paddingLeft: "15px",
      height: "49px",
    },
  },
  "& .addIcon": {
    paddingRight: "8px",
  },
  "& .bellIconBox": {
    boxShadow: "0px 0px 3px rgba(0,0,0,0.1)",
  },
  "& .profile": {
    boxShadow: "0px 0px 3px rgba(0,0,0,0.1)",
    padding: "8px 25px 8px 8px",
    "& .MuiTypography-body2": {
      fontSize: "14px",
      fontWeight: 600,
      fontFamily: "Inter",
      color: "#011342",
    },
    display: "flex",
    alignItems: "center",
    gap: "5px",
    order: 3,
  },
  "& .userImage": {
    width: "32px",
    height: "32px",
    "& img": {
      borderRadius: "50%",
    },
  },
  "@media screen and (max-width:1024px)": {
    "& .menuIconBtn": {
      display: "block",
    },
    "& .tabHeading": {
      display: "none",
    },
    "& .MuiButton-root": {
      fontSize: "14px",
      order: 2,
    },
    "& .profileBox": {
      "& img": {
        order: 1,
      },
    },
    "& .menuIcon": {
      display: "block",
    },
  },
  "@media screen and (max-width:599px)": {
    "& .dashboardHeading": {
      gap: "5px",
      "& .MuiTypography-body1": {
        fontSize: "20px !important",
        lineHeight: "20px !important",
      },
    },
    "& .profileBox": {
      padding: "5px",
      gap: "10px",
      "& .MuiButton-root": {
        fontSize: "10px !important",
        paddingRight: "5px !important",
        paddingLeft: "5px !important",
        height: "30px !important",
      },
    },
    "& .addIcon": { display: "none" },
    padding: "10px",
    "& .profile": {
      gap: "2px",
      "& .MuiTypography-body2": { display: "none" },
    },
  },
});
const AutocompleteBox = styled(Box)({
  width: "354px",
  "@media (max-width: 819px)": {
    width: "48%",
  },
});
const Searchandauto = styled(Box)({
  width: "96%",
  display: "flex",
  justifyContent: "space-between",
  marginInline: "25px",
  marginBlock: "32px",
  "@media (max-width: 1270px)": {
    width: "95% !important",
  },
});
// Customizable Area End
