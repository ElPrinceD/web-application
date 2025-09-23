

import React from "react";

import {
  Box,
  Typography,
  IconButton,
  // Customizable Area Start
  styled,
  Grid,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { termsAndConditions } from "./assets";
import { createTheme } from "@material-ui/core/styles";
import moment from "moment";
import { Footer } from "../../../components/src/Footer.web";

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
// Customizable Area End

import TermsandconditionsController, {
  Props,
  configJSON,
} from "./TermsandconditionsController";
import Header from "../../../blocks/landingpage/src/Header.web"

export default class Termsandconditions extends TermsandconditionsController {
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
      <Header navigation={this.props.navigation} id={""} />
      <div ref={this.state.topRef}></div>
      <ImgStyling>
        <Grid className="header">
          <img className="termsAndConditionImg" src={termsAndConditions} alt="groupImage" />
          <Grid className="headingContainer">
        <Typography className="heading">
        Terms of service
            </Typography>
            <Typography className="updatedDate">
          Last update on: {moment(this.state.updated_time).format("ddd DD, YYYY")}
            </Typography>  
      </Grid>
        </Grid>
        <Grid className="contentBoxTc">
          <Typography className="headTypo1" dangerouslySetInnerHTML={{ __html: this.state?.titleTerm}}>
          </Typography>
         
            <Grid className="subContent" style={{lineHeight:"26px",color:"#5D5D5D"}}>
        {this.state?.termsAndConditionsData!==null&& <div dangerouslySetInnerHTML={{ __html: this.state?.termsAndConditionsData}} />}
            </Grid>
        </Grid>
      </ImgStyling>
      <Footer  testID="FooteText" isChecked={false}/>
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start

export const ImgStyling: any = styled(Box)({
  "blockquote":{
    "@media (max-width:567px)":{
        margin:"0px 15px !important"
      }
  },
  "& .header": {
   position:"relative",
  },
  "& .headingContainer":{
    left: "50%", 
    top: "52%",
    position: "absolute",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    transform:"translate(-50%,-50%)",
  },
  "& .subContent": {
    "& h2":{
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '32px ',
      fontFamily: 'Inter',
      textAlign: 'justify' as const,
      margin: " 0px 35px ",
      color: "#000A34",
      "@media (max-width:567px)":{
        margin:"0px 15px",
        textAlign:"left"
      }
    },
    "& p": {
      lineHeight: '26px',
      fontSize: '20px',
      textAlign: 'justify' as const,
      fontFamily: 'Inter',
      fontWeight: 400,
      color: "#5D5D5D",
    }
  },
  "& .heading":{
    color:"#fff",
    textAlign: "center" as const,
    fontFamily: "Inter",
    fontSize: "46px",
    fontWeight: 600,
    fontStyle: "normal",
    "@media (max-width: 576px)":{
      fontSize: "36px",
      lineHeight:"1.21",
    }
  },
  "& .updatedDate":{
    fontWeight: 700,
    fontFamily: "Inter",
    color:"#fff",
    fontSize: "20px",
    "@media (max-width: 576px)":{
      fontSize: "14px",
      textAlign:"center",
    }
  },
  "& .termsAndConditionImg": {
    display: "flex",
    width: "100%",
    marginTop: "2%",
    minHeight:"410px",
    objectFit:"cover",
  },
  "& .contentBoxTc": {
    height: "auto",
    margin: "60px",
    "@media (max-width:767px)":{
      margin:"0",
    }
  },
  "& .headTypo1": {
    "& h1":{
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: "24px",
      color: "#000A34",
      fontWeight: 700,
      lineHeight:"38.4px",
      margin:"10px 35px",
      "@media (max-width:567px)":{
        margin:"10px 15px"
      }
    },
  },

});

// Customizable Area End
