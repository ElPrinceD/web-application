import React from "react";

// Customizable Area Start
import {Box, Grid, Typography,styled,CircularProgress } from "@material-ui/core";
import { contactImg, mail, map, phone } from "./assets";
import Header from "../src/Header.web";
import { Footer } from "../../../components/src/Footer.web";
// Customizable Area End

import LandingPageController, { Props } from "./LandingPageController";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";

export default class ContactUs extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  
  // Customizable Area End
  render() {

    return (
      // Customizable Area Start
      <>
      <Header navigation={this.props.navigation} id="" />
        <div ref={this.state.topRef}></div>
        <Box style={webStyles.mainBox}>
        <ImgStyling>
        
          <Grid container className="contact-wrapper-main">

            <Grid item lg={6} xl={6} md={6} sm={12} xs={12} style={webStyles.main} className="leftTextSection">
              <Box p={"0"}>
              {this.state.loading ? (
                     <Skeleton
                     variant="rect"
                     width={500}
                     height={500}
                     style={{ borderRadius: "10px" }}
                   />
                  ) : (
                    <>
                    <Typography data-testid="contactTitle" data-testID="contactTitle" style={webStyles.typo1}>
                      {this.state.contactData && this.captilFirstWhychoosSubTitle(this.state.contactData?.title)}
                    </Typography>
                    <Typography style={webStyles.typo2} className="contact-h2">
                      {this.state.contactData &&  this.state.contactData.subtitle}
                    </Typography>
                    <Typography style={webStyles.headsChild}>
                      <img
                        src={mail}
                        alt="mail"
                        style={{ paddingRight: 8, height: "32px", width: "32px" }}
                      />
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          window.location.href = `mailto:${this.state.contactData.email}`;
                        }}
                      >
                        {this.state.contactData && this.state.contactData.email}
                      </span>
                    </Typography>
                    <Typography style={webStyles.headsChild}>
                      <img
                        src={phone}
                        alt="phone"
                        style={{ paddingRight: 8, height: "32px", width: "32px" }}
                      />
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          window.location.href = `tel:${this.state.contactData.country_code}${this.state.contactData.phone_number}`;
                        }}
                      >
                        {this.state.contactData &&  this.state.contactData.country_code}-
                        {this.state.contactData &&  this.state.contactData.phone_number}
                      </span>
                    </Typography>
                    <Typography style={webStyles.headsChild}>
                      <img
                        src={map}
                        alt="map"
                        style={{ paddingRight: 8, height: "32px", width: "32px" }}
                      />
                      {this.state.contactData &&  this.state.contactData.address}
                    </Typography>
                  </>
                  )}
              </Box>
            </Grid>

            <Grid
              item
              lg={6}
              xl={6}
              md={6}
              sm={12}
              xs={12}
              className="rightTextSection"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              
              <Box p={0}>
                {this.state.loading ? (
                  <Skeleton
                    variant="rect"
                    width={500}
                    height={500}
                    style={{ borderRadius: "10px" }}
                  />
                ) : (
                  <>
                    {this.state.imageLoad && (
                      <Skeleton
                        variant="rect"
                        width={500}
                        height={500}
                        style={{ borderRadius: "10px" }}
                      />
                    )}
                    <img
                      src={this.state.contactData?.contact_image_url?.url}
                      alt="Contact Us"
                      width="100%"
                      onLoad={() => this.setState({ imageLoad: false })}
                      style={{
                        maxWidth: "500px",
                        maxHeight: "500px",
                        display: this.state.imageLoad ? "none" : "block", 
                      }}
                    />
                  </>
                )}
              </Box>


            </Grid>

          </Grid>
        </ImgStyling>
        </Box>
        <Footer testID="FooteText" isChecked={false} />
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const ImgStyling = styled(Box)({
  width: "100%",
  padding:"0 80px",
  "@media (max-width: 1366px)": {
    padding:"0 50px"
  },
  "@media (max-width: 1199px)": {
    padding:"0 30px"
  },
  "@media (max-width: 576px)": {
    padding:"0 15px"
  },
  "& .contact-wrapper-main":{
    alignItems:"center",
  },
  "& .contact-h2":{
    "@media (max-width: 1199px)": {
      fontSize:"24px !important",
      paddingBottom:"20px !important",
      lineHeight:"1.4 !important",
    },
    "@media (max-width: 767px)": {
      fontSize:"22px !important",
    },
  }
});
const webStyles = {
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "78px" 
  },
  main: {
    dispplay: "flex",
    alignItems: "center",
  },
  headsChild: {
    fontSize: "18px",
    fontWeight: 500,
    display: "flex",
    fontFamily: "INTER",
    paddingBottom: "8px",
    paddingTop: "8px",
    lineHeight: "28px",
    color:"#000A34"
  },
  typo1: {
    color: "#023FDA",
    fontSize: "20px",
    fontWeight: 700,
    fontFamily: "INTER",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  typo2: {
    fontFamily: "INTER",
    fontSize: "28px",
    fontWeight: 600,
    lineHeight: "40px",
    width: "90%",
    paddingBottom: "30px",
    color:"#000A34"
  },
};
// Customizable Area End
