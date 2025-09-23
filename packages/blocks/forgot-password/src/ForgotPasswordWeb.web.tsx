import React from "react";

// Customizable Area Start
import {
  styled,
  Box,
  Button,
  Typography,
  TextField} from "@material-ui/core";
import { Arrow, Logo } from "./assets";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Footer } from "../../../components/src/Footer.web";

// Customizable Area End

import ForgotPasswordController,{Props} from "./ForgotPasswordController";

export default class ForgotPasswordWeb extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}
 // Customizable Area Start
 headerBar = () => {
  return (
    <ForgotPasswordHeaderBox>
        <Box className="headerWrapper" data-test-id="HomeButtonIDLogin">
          <NavLink to="/">
                <img src={Logo} alt="notary" style={{cursor:"pointer"}} width={"194px"} height={"auto"}  />
               </NavLink>          
        </Box>
    </ForgotPasswordHeaderBox>
    );
};

toggleButton = () => {
  return (
       <ForgotPasswordBox width={"100%"} maxWidth={"525px"}>
        <ForgotPasswordContentBox display={"flex"} alignItems={"center"}>
          <ArrowBox data-test-id="arrowBtnID" width={"56px"} height={"52px"} display={"flex"} justifyContent={"center"} alignItems={"center"} onClick={() => this.goToLoginPage()}  style={{ cursor:"pointer" }} >
            <img src={Arrow} alt="img" width={"24px"} height={"24px"}/>
          </ArrowBox>
          <ForgotPasswordTextBox>
            <Typography
              style={{
                lineHeight: "26px",
                fontWeight: 700,
                color: "#0131A8",
                fontSize: "18px",
                fontFamily: "INTER"
              }}
            >
              FORGOT PASSWORD
            </Typography>
            <Typography
              style={{
                    font: "Semibold",
                    fontWeight: 600,
                    color:"#011342",
                    lineHeight: "36px",
                    fontSize: "24px",
                    letterSpacing: "-0.005em",
                  
                }}
              >
              Forgot your Password?
            </Typography>
            <Typography style={screen.joinNotryTypo}>
              Enter your registered email to send a reset password link
            </Typography>
          </ForgotPasswordTextBox>
        </ForgotPasswordContentBox>
      </ForgotPasswordBox>
  )
};

actionButton() {
  return (
    <BottomSpacingBox>
      <Box mt={"28px"} display={"flex"} flexDirection={"column"} style={{ rowGap: "24px" }}>
        <Button
          style={{ ...screen.signUpButtonSubmit ,width: "90vw", maxWidth: "440px",textTransform: "none"}}
          data-test-id={"btnEmailLogIn"}
          variant="contained"
          fullWidth
          onClick={this.handleSubmit}
        >
          <Typography style={{fontSize:"16px",fontWeight:700,fontFamily:"Inter",lineHeight:"24px"}}>Send Link</Typography>
        </Button>
        <Box
          width={"90vw"}
          maxWidth={"440px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              color:"#011342",
              lineHeight: "22px",
              fontSize: "14px",               
            }}
          >
            Back to
          </Typography>
              <Button 
                style={{
                  color:"#012275",
                  fontWeight: 700,
                  cursor:"pointer",
                  fontSize: "14px",
                  lineHeight: "22px",
                  fontFamily: "Inter",
                  textDecoration: "underline",
                  textDecorationColor: "#496BF2"
                }}
                data-test-id= "logingoto"
                onClick={() => {
                 this.goToLoginPage()
                }}
              >
                LOG IN
              </Button>
        </Box>
      </Box>
    </BottomSpacingBox>
    )}

loginForm = () => {
  return (
    <Box mt={"40px"} width={"90vw"} maxWidth={"440px"}>
      <form onSubmit={this.handleSubmit} style={{marginBottom: "0px"}}>
        <Box width={"100%"} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography style={screen.lableStyle}>Email <span style={screen.starColor}>*</span></Typography>
            <TextField
              variant="outlined"
              type="email"
              name="email"
              data-test-id="txtInputEmail"
              value={this.state.emailValue}
              onChange={(evnt) => this.setEmail(evnt.target.value)}
              margin="dense"
              placeholder="Enter your email"
              fullWidth
              error={this.state.emailError ? true : false}
            />
            {this.state.emailError && (<p style={{marginTop:5, color: "#DC2626", fontSize: "12px",fontWeight:400,fontFamily:"Inter" }}>{this.state.emailError}</p>)}
        </Box>
      </form>
    </Box>
  )}

 // Customizable Area End
  render() {
    return (
       // Customizable Area Start
       <>
         <ThemeProvider theme={newtheme}>
         {this.headerBar()}
          <Box style={{width: "100%", display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          {this.toggleButton()}
             {this.loginForm()}
             {this.actionButton()}
          </Box>
        </ThemeProvider>
        <Footer testID="footer" isChecked={false}/>
     </>
       // Customizable Area End
    );
  }
}
// Customizable Area Start
const newtheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        width: "440px",
        borderRadius: "8px",
        padding:"12px 14px 12px 14px",
        height:"44px",
        border:"1 solid #CBD5E1",
        "@media (max-width: 500px)": {
          width: "100%"
        },
        "&$focused $notchedOutline": {
          borderColor: "gray",
          borderWidth: "1px",
        },
        "&:hover $notchedOutline": {
          borderColor: "#CBD5E1",
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

const ForgotPasswordContentBox = styled(Box)({
  // "@media (min-width: 580px)": {
  //   width: "100%", 
  //   maxWidth: "525px",
  // },
})

const ForgotPasswordTextBox = styled(Box)({
"@media (max-width: 580px)": {
  maxWidth: "90%",
  paddingLeft: "5vw",
  paddingRight: "5vw",
},
"@media (min-width: 580px)": {
  marginLeft: "32px",
}
})

const ForgotPasswordBox = styled(Box)({
  padding:"120px 0 0",
  "@media (max-width: 1199px)": {
    padding:"80px 0 0",
  },
  "@media (max-width: 767px)": {
    padding:"60px 0 0",
  },
})
const BottomSpacingBox = styled(Box)({
  padding:"0 0 120px",
  "@media (max-width: 1199px)": {
    padding:"0 0 80px",
  },
  "@media (max-width: 767px)": {
    padding:"0 0 60px",
  },
})

const ForgotPasswordHeaderBox = styled(Box)({
  "& .headerWrapper":{
    padding:"48px 80px 0",
    margin:"0 auto",
    "@media (max-width: 1199px)": {
      padding:"30px 50px 0",
    },
    "@media (max-width: 767px)": {
      padding:"30px 25px 0",
    },
    "@media (max-width: 576px)": {
      padding:"30px 15px 0",
    },
  }
})
const ArrowBox = styled(Box)({
  "@media (max-width: 580px)": {  
    display: "none"
  },
  "@media (min-width: 580px)": {
    marginLeft: "-46px"
  }
})

const screen = {
  gridContainer: {
    display: "flex",
    justifyContent: "start",
    paddingInline: 50,
    width: "11.11vw",
    paddingBlock: 30,  
    height: "13.33vh",
    cursor:"pointer"
  },
  joinNotryTypo: {
    fontFamily: "INTER",
    lineHeight: "22px",
    fontSize: "14px",
    fontWeight: 400,
    color: "#011342"
  },
  signup: {
    color: " #0131A8",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "0em",
    textAlign: "left",
    lineHeight: "26px",
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
    color: "#fff",
    borderRadius: "25px",
  },
  guestbtn: {
    background: "#fff",
    color: "#011342",
    border: "1px solid #012275",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "10px 16px 10px 16px",
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
    height:"52px",
    width:"440px"
    
  },
  errorBox:{
    marginTop:"12px",
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  byDefaultTypo:{
    color:"#334155"
  },
  passwordSuccessTypo: {
    color: "#059669"
  },
  passwordSuccessTypoError: {
    color: "#DC2626"
  },
  policytext: {
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center" as "center",
    marginTop: "60px",
    color:"#011342",
    letterSpacing: "0em",
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
    fontFamily: "INTER",
    color: "#011342",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "21.09px"
  },
  starColor: {
    color: "#FF0000",
  },
};
// Customizable Area End
