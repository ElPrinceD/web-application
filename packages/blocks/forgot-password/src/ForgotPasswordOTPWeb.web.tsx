import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { Arrow, Logo } from "./assets";
import OtpInput from "react-otp-input";
import { NavLink } from "react-router-dom";
import { Footer } from "../../../components/src/Footer.web";
// Customizable Area End

import OTPInputAuthController,{Props} from  "../../otp-input-confirmation/src/OTPInputAuthController";

export default class ForgotPasswordOTPWeb extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}
 // Customizable Area Start
 headerBar = () => {
  return (    
        <Box  m={"48px 80px 0"}  data-test-id="HomeButtonIDLogin"  >
             <NavLink to="/">
                <img src={Logo} alt="notary" style={{cursor:"pointer"}} width={"194px"} height={"auto"}  />
               </NavLink>    
        </Box>    
  );
};

toggleButton = () => {
  return (
    <>
       <Box style={{ marginTop: "51px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              style={{
                fontSize: "18px",
                lineHeight: "26px",
                fontWeight: 700,
                color: "#0131A8",
              }}
            >
             ONE TIME PASSWORD
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box style={{ display: "flex" }}>
              <Box data-test-id="arrowBtnID" style={{ marginTop: "5px", cursor:"pointer" }}>
              <NavLink to="/ForgotPasswordWeb">
                  <img style={{ marginLeft: "-5rem" }} src={Arrow} alt="img"  />
               </NavLink>               
                
              </Box>
              <Box>
                <Typography
                  style={{
                    lineHeight: "36px",
                    fontSize: "24px",
                    letterSpacing: "-0.005em",
                    font: "Semibold",
                    fontWeight: 600,
                    color:"#011342",
                  }}
                >
                  Verify your account
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography style={screen.joinNotryTypo}>
            Enter your OTP below, the code has been sent your registered email address.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
};


   loginBox(){
    return(
      <>
          <Grid item container>
          <Grid item xs={12} md={10}>
            <OtpInput
              value={this.state.otpdata}
              onChange={this.handleChange}
              numInputs={6}
              inputType="tel"
              containerStyle={{ gap: "12px" }}
              inputStyle={{
                width: "93%",
                height: "66px",
                border: this.state.otpFailedResponse ? "1px solid red":"1px solid #5D5D5D",
                borderRadius: "8px",
                marginBottom: "1.4vh",
                marginTop: "4.8vh",
                fontSize: "25px"
              }}
              renderInput={(props) => <input {...props} />}
              data-test-id="txtWebOTP"
            />
            <Typography style={{ color: "red" }}>
              {this.state.otpFailedResponse
                ? this.state.otpFailedResponse
                : ""}
               
            </Typography>

            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <Button
                variant="text"
                style={{
                  color: "#011342",
                  opacity: this.state.resendDisabled ? 0.5 : 1, 
                  textTransform: "none",                 
                }}
                onClick={this.handleResendClick}
                disabled={this.state.resendDisabled}
                data-test-id="resendOtpID"
              >
                Resend code ?
              </Button>
              <Typography style={{ color: "#011342",marginTop:"5px" }}>
                {Math.floor(this.state.CustomCount / 60)}:
                {this.state.CustomCount % 60 < 10
                  ? `0${this.state.CustomCount % 60}`
                  : this.state.CustomCount % 60}
              </Typography>
            </Box>

            <Button
              style={{
                ...screen.signUpButtonSubmit,
                textTransform: "none",
                marginTop:"1.4vh"
              }}
              data-test-id="verifyOtp"
              variant="contained"
              fullWidth
              onClick={this.handleSubmit}
              
            >
              Verify OTP
            </Button>
          </Grid>
        </Grid>
      </>
    )
   }
 // Customizable Area End
  render() {
    return (
       // Customizable Area Start
    <>   
         {this.headerBar()}
         <Container maxWidth="sm">
             {this.toggleButton()}
             {this.loginBox()}
         </Container>
         <Box style={{marginTop:"61vh"}}> </Box>
         <Footer testID="footer" isChecked={false}/>
     </>
       // Customizable Area End
    );
  }
}
// Customizable Area Start
const screen = {
  gridContainer: {
    display: "flex",
    justifyContent: "start",
    paddingBlock: 30,
    width: "11.11vw",
    height: "13.33vh",
    paddingInline: 50,
  },
  joinNotryTypo: {
    lineHeight: "22px",
    fontSize: "14px",
    fontWeight: 400,
  },
  signup: {
    color: " #0131A8",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "26px",
    textAlign: "left",
    letterSpacing: "0em",
  },
  wel: {
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "36px",
    textAlign: "left",
    color: "#011342",
    letterSpacing: "-0.005em",
  },
  textJoin: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "22px",
    textAlign: "left",
    letterSpacing: " 0em",
  },
  btn: {
    display: "flex",
    marginTop: "15px",
    border: "2px solid #0131A8",
    gap: "5px",
    padding: "2px",
    borderRadius: "25px",
  },
  btnBusi: {
    background: "#001569",
    borderRadius: "25px",
    color: "#fff",
  },
  guestbtn: {
    background: "#fff",
    color: "#011342",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "10px 16px 10px 16px",
    fontWeight: 700,
    lineHeight: "24px",
    fontSize: "16px",
  },
  signUpButtonSubmit: {
    background: "#012275",
    color: "#fff",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "10px 16px 10px 16px",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 700,
  },
  errorBox:{
    marginTop:"12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  passwordSuccessTypo: {
    color: "#059669"
  },
  passwordSuccessTypoError: {
    color: "#DC2626"
  },
  byDefaultTypo:{
    color:"#334155"
  },
  policytext: {
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "center" as "center",
    color:"#011342",
    marginTop: "60px",
  },
  togglebtn: {
    padding :"5px",
    display: "flex",
    border: "0.6px solid #0131A8",
    borderRadius: "30px",
    height: "56px",
    marginTop: "21px",
  },
  lableStyle: {
    color: "#011342",
    fontWeight: 600
  },
  starColor: {
    color: "#FF0000",
  },
};
// Customizable Area End
