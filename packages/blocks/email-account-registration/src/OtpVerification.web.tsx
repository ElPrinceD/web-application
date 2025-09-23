import React from "react";

// Customizable Area Start
import { Container, Box, Button, Typography, Grid,Modal,Avatar } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Arrow, Logo,successLogo } from "./assets";
import OtpInput from "react-otp-input";
import { Footer } from "../../../components/src/Footer.web";
// Customizable Area End

import OtpVerificationController, { Props } from "./OtpVerificationController";

export default class OtpVerification extends OtpVerificationController {
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
        <ThemeProvider theme={otpTheme}>
          <div ref={this.state.topRef}></div>
          <Grid container style={{ padding: "20px", marginBottom: "20px" }}>
            <Grid
              item
              container
              xs={12}
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBlock: 30,
                paddingInline: 50,
              }}
            >
              <Box onClick={() => this.goToLandingScreen()} data-test-id="LandingButtonID">
                <img src={Logo} alt="notary" />
              </Box>
            </Grid>
          </Grid>
          <Container style={{ maxWidth: "575px" }}>
            <Box style={{ marginTop: "50px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    style={{
                      color: "#0131A8",
                      fontSize: "18px",
                      lineHeight: "26px",
                      fontWeight: 700,
                    }}
                  >
                    ONE TIME PASSWORD
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box style={{ display: "flex" }}>
                    <Box
                      style={{ marginTop: "5px", cursor: "pointer" }}
                      onClick={() => {this.GotoEmailAccountRegistrationWebScreen()}}
                      data-test-id="arrowBtnID"
                    >
                      <img
                        src={Arrow}
                        alt="img"
                        style={{ marginLeft: "-5rem" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          color: "#011342",
                          lineHeight: "36px",
                          fontSize: "24px",
                          letterSpacing: "-0.005em",
                          font: "Semibold",
                          fontWeight: 600,
                        }}
                      >
                        Verify your account
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={otpScreen.otpTypo}>
                  Enter your OTP below, the code has been sent to your registered email address
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Grid item container>
              <Grid item xs={12} md={10}>
                <OtpInput
                  value={this.state.otpdata}
                  onChange={this.handleChange}
                  numInputs={6}
                  inputType={"tel"}
                  containerStyle={{ gap: "12px" }}
                  inputStyle={{
                    width: "100%",
                    height: "56px",
                    border: this.state.otpFailedResponse ? "1px solid red":"1px solid #5D5D5D",
                    borderRadius: "8px",
                  }}
                  renderInput={(props:any) => <input {...props} />}
                  shouldAutoFocus
                  data-test-id="txtWebOTP"
                />
                <Typography style={{ color: "red",fontSize:"12px" }}>
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
                    }}
                    onClick={this.handleResendClick}
                    disabled={this.state.resendDisabled}
                    data-test-id="resendOtpID"
                  >
                    <Typography style={{textTransform:"capitalize",marginLeft:"-10px",color:"#011342",fontSize:"16px"}}>Resend code ?</Typography>
                  </Button>
                  <Typography style={{ color: "#011342" }}>
                    {Math.floor(this.state.CustomCount / 60)}:
                    {this.state.CustomCount % 60 < 10
                      ? `0${this.state.CustomCount % 60}`
                      : this.state.CustomCount % 60}
                  </Typography>
                </Box>

                <Button
                  style={{
                    ...otpScreen.otpButtonSubmit,
                    textTransform: "none",
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
            <Modal
          open={this.state.enableSuccessModel}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-test-id="handleModal"
        
        >
          <Box sx={otpScreen.model}>
            <Box style={{alignContent:"center",alignItems:"center",alignSelf:"center",justifyContent:"center",display:"flex"}}><Avatar src={successLogo} style={{width:"431px",height:"228px",gap:24}}></Avatar></Box>
           
            <Typography id="modal-modal-description" style={{color:'#011342',lineHeight:'24px',textAlign:"center",marginTop:20,fontSize:16,fontWeight:500,fontFamily:"Inter",width:"440px",height:"24px",alignItems:"center",alignSelf:"center",justifyContent:"center",marginLeft:50}}>
            Your account has been verified!
            </Typography>
            <Button
                  style={{
                    ...otpScreen.otpButtonSubmit,
                    textTransform: "none",
                  }}
                  data-test-id="successmodal"
                  variant="contained"
                  fullWidth
                  onClick={this.GotoDashboard}
                >
                  Go to Dashboard
                </Button>
          </Box>
        </Modal>
    
          </Container>
          <Footer testID="footer" isChecked={false}/>
        </ThemeProvider>
      // Customizable Area End
    );
  }
}
// Customizable Area Start
const otpTheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px",
        "&$focused $notchedOutline": {
          borderColor: "gray",
          borderWidth: "2px",
        },
        "&:hover $notchedOutline": {
          borderColor: "#bdbdbd",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#fff",
      light: "#334155",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});
// Customizable Area End
// Customizable Area Start
const otpScreen = {
  otpTypo: {
    fontWeight: 400,
    lineHeight: "22px",
    fontSize: "14px",
    color: "#011342",
    marginBottom: "40px",
  },
  otpButtonSubmit: {
    background: "#012275",
    color: "#fff",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "14px 19px",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "24px",
    marginTop: "25px",
    marginBottom:"40px",
    width:"440px",
    height:"52px",
    fontFamily:"Inter"

  },
  model:{
    position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "536px",
  hieght: "464px",
  padding: " 48px 0px 0px 0px",
  gap: " 40px",
  borderRadius: "16px",
  }
};
// Customizable Area End

