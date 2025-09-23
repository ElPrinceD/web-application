import React from "react";

import {
  Box,
  Typography,
  // Customizable Area Start
  styled,
  Grid,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { privacyPolicy } from "./assets";
import moment from "moment";
import { createTheme } from "@material-ui/core/styles";
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

import PrivacyPolicyController, {
  Props,
} from "./PrivacyPolicyController";
import Header from "../../../blocks/landingpage/src/Header.web"


export default class PrivacyPolicy extends PrivacyPolicyController {
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
        <Grid className="imgContainer">
          <img className="privacyPolicyImg" src={privacyPolicy} alt="groupImage" />
          <Grid className="headingCont">
        <Typography className="headingPolicy">
        Privacy Policy
            </Typography>
            <Typography className="updateDate">
        Last update on: {moment(this.state.updated_time).format("ddd DD, YYYY")} 
            </Typography>  
      </Grid>
        </Grid>
        <Grid className="contentBox">
{this.state?.privacyPolicyData!==null&&<div className="subContentPP"  dangerouslySetInnerHTML={{ __html: this.state?.privacyPolicyData}} />}
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
  "& .headingCont":{
    top: "52%",
    position: "absolute",
    flexDirection:"column",
    left: "50%", 
    display:"flex",
    transform:"translate(-50%,-50%)",
    alignItems:"center",
    
  },
  "& .imgContainer": {
    position:"relative",
   },
   "& .updateDate":{
     fontWeight: 700,
     fontFamily: "Inter",
     fontSize: "20px",
     color:"#fff",
    },
    "& .headingPolicy":{
      fontFamily: "Inter",
      textAlign: "center" as const,
      color:"#fff",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: "46px",
    },
    
    "& .privacyPolicyImg": {
      width: "100%",
      display: "flex",
      marginTop: "2%",
    },
    "& .subContentPP": {
      "& p":{
        fontSize: '20px',
        fontFamily: 'Inter',
        fontWeight: 400,
        lineHeight: '30px',
        color: "#5D5D5D",
        textAlign: 'justify' as const,
        
      },
      "& h2":{
        lineHeight: '30px',
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '20px',
        textAlign: 'justify' as const,
        color: "#000A34",
      },
      "& ul":{
        "& li":{
          "& strong":{
            color: "#000A34",
            fontFamily: 'Inter',
            fontWeight: 600,
            lineHeight: '30px',
            marginLeft:"-14px",
            textAlign: 'justify' as const,
            fontSize: '20px',
          },
          fontSize: '20px',
          fontWeight: 400,
          textAlign: 'justify' as const,
          color: "#5D5D5D",
          marginBottom: "0.5% ",
          lineHeight: '30px',
          fontFamily: 'Inter',
          
        } 
      }
    },
    '& li::marker': {
      color: "#000A34",
    },
    "& .contentBox": {
      margin: "60px",
      height: "auto",
    },
});

// Customizable Area End
