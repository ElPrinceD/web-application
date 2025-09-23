import React from "react";

// Customizable Area Start
import {
  styled,
  Box,
  Button,
  Drawer,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  TextField,
  Grid,
  FormControlLabel
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { Arrow, Logo } from "./assets";
import { Menu, Close } from "@material-ui/icons";
import { Footer } from "../../../components/src/Footer.web";
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}
  // Customizable Area Start
  headerBar = () => {
    return (
      <Box mt={"48px"} mx={"6%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Box onClick={() => this.goToHome()} data-test-id="HomeButtonIDLogin">
            <img src={Logo} alt="notary" width={"194px"} height={"auto"} style={{cursor:"pointer"}} />
          </Box>
          <DesktopAlreadyHaveAnAccountBox>
            <Typography style={screen.dontAccountStyle}>Don't have an Account?</Typography>
            <Button
              variant="outlined"
              data-test-id="signUpID1"
              style={{
                border: "1px solid #012275",
                borderRadius: "54px",
                padding: "10px 16px 10px 16px",
                width:'96px',
                height:'44px'
              }}
              onClick={()=> this.goToEmailWeb()}
            >
              <Typography style={{fontSize: "14px",
                fontWeight: 700,color: "#012275",width:'100%',lineHeight:'22px',fontFamily:'Inter'}}>SIGN UP</Typography>
            </Button>
          </DesktopAlreadyHaveAnAccountBox>
          <TabletMobileAlreadyHaveAnAccountBox>
            <Button data-test-id="toggleButton" onClick={this.toggleDrawer(true)}>
              <Menu style={{width: "50px", height: "56px"}}  />
            </Button>
            <Drawer
              data-test-id="togglebutton"
              open={this.state.isDrawerOpen}
              PaperProps={{ style: { width: "100%" } }}
            >
              <Box width={"100%"}>
                <Box sx={{ padding: "48px 8% 0" }}>
                  <Box
                    width={"100%"}
                    mb={"35px"}
                    display={"flex"}
                    justifyContent={"end"}
                  >
                    <Button
                      style={{ padding: "0", minWidth: "0" }}
                      onClick={this.toggleDrawer(false)}
                    >
                      <Close style={{ width: "32px", height: "32px" }} />
                    </Button>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    style={{ columnGap: "8px" }}
                  >
                    <Typography style={screen.dontAccountStyle}>Don't have an Account?</Typography>
                    <Button
                variant="outlined"
                data-test-id="signUpID"
                style={{
                  border: "1px solid #012275",
                  borderRadius: "54px",
                  padding: "10px 16px 10px 16px",
                  width:'96px',
                  height:'44px'
                }}
                onClick={this.goToEmailWeb}
              >
                <Typography style={{fontSize: "14px",
                  fontWeight: 700,color: "#012275",width:'100%',lineHeight:'22px',fontFamily:'Inter'}}>SIGN UP</Typography>
              </Button>
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </TabletMobileAlreadyHaveAnAccountBox>
      </Box>
    );
  };

  toggleButton = () => {
    return (
         <LogInTopBox width={"100%"} maxWidth={"440px"}>
         <LogInContentBox display={"flex"} alignItems={"center"}>
          <ArrowBox style={{ cursor:"pointer" }}  width={"56px"} height={"52px"} display={"flex"} justifyContent={"center"} alignItems={"center"} onClick={()=> this.goToHome()} data-test-id="arrowBtnID">
                <img src={Arrow} alt="img" width={"24px"} height={"24px"}/>
                </ArrowBox>
            <LogInTextBox >
              <Typography
                style={{
                  color: "#0131A8",
                  fontSize: "18px",
                  lineHeight: "26px",
                  fontWeight: 700,
                  fontFamily:"Inter"
                }}
              >
                LOG IN
              </Typography>
                  <Typography
                    style={{
                      color:"#011342",
                      lineHeight: "36px",
                      fontSize: "24px",
                      letterSpacing: "-0.005em",
                      fontWeight: 600,
                      fontFamily:"Inter"
                    }}
                  >
                    Welcome back to renotary
                  </Typography>
              <Typography style={screen.joinNotryTypo}>
                Enter your email and password to login your dashboard
              </Typography>
            </LogInTextBox>
            
            </LogInContentBox>
            {this.state.IsVerifiedNotaryUser && 
            <LogInTextBox style={{height:'32%',marginTop:20,
              padding: '12px 16px 12px 16px',
              gap: '8px',
              borderRadius: '4px',
              border:' 0px 0px 0px 4px',
              opacity: '0px',
              borderLeft: '4px solid #DC2626',
              background:' #FEE2E2'
              }}>
                          <Typography style={{fontFamily:'Inter',fontWeight:500,fontSize:16,color:'#011342',lineHeight:'22px'}}>
                          Your account verification is still pending. You’ll be able to login to your account once the verification is completed by renotary.
                            </Typography>
                          </LogInTextBox>}
            
        </LogInTopBox>
    )
  };

  actionButton() {
    return (
        <Box style={{ display: "flex", width: "90vw", maxWidth: "440px", marginTop: "40px", columnGap: "6px" }}>
          <Button
            style={{ ...screen.guestbtn, textTransform: "none" }}
            data-test-id="continueID"
            variant="contained"
            fullWidth
            onClick={() => this.GuestButton()}
           >
            <Typography style={{
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px"       
            }}>Continue as a Guest</Typography>
          </Button>
          <Button
            style={{ ...screen.signUpButtonSubmit, textTransform: "none" }}
            data-test-id={"btnEmailLogIn"}
            variant="contained"
            fullWidth
            onClick={() => this.CallLoginApi()}
          >
            <Typography style={{
fontFamily: "Inter",
fontSize: "16px",
fontWeight: 700,
lineHeight: "24px"
            }}>Log In</Typography>
          </Button>
        </Box>
    )}

  loginForm = () => {
    return (
      <>
        <Box style={{ width: "90vw", maxWidth: "440px", marginTop: "44px", display: "flex", flexDirection: "column" }}>
        <Typography style={screen.lableStyle}> Email <span style={screen.starColor}>*</span></Typography>
          <TextField
            variant="outlined"
            type="email"
            name="email"
            data-test-id="txtInputEmail"
            value={this.state.email}
            onChange={(evgs) => this.setEmail(evgs.target.value)}
            placeholder="Enter your email"
            margin="dense"
            InputProps={{
              style: {
                color: '#011342',
              }}}
            fullWidth
            error={this.state.emailError2 ? true : false}
          />
          {this.state.emailError2 && <p style={{ color: "#DC2626", fontSize: "12px",fontWeight:400,fontFamily:"Inter",marginTop:"0px", marginBottom: "0px",lineHeight: "18px"}}>{this.state.emailError2}</p>}
        </Box>
        <Box style={{width: "90vw", maxWidth: "440px", marginTop: "12px", display: "flex", flexDirection: "column", }}>    
        <Typography style={screen.lableStyle}>Password <span style={screen.starColor}>*</span></Typography>
        <TextField
            variant="outlined"
            name="password"
            type={ "text"}
            value={this.state.enablePasswordField ? this.state.password.replace(/./g, "*") : this.state.password}
            onChange={(evgs) => this.setPassword(evgs.target.value)}
            margin="dense"
            data-test-id="txtInputPassword"
            fullWidth
            error={this.state.isPasswordError ? true : false}
            placeholder="Enter your password"
           
            InputProps={{
              style: {
                color: '#011342',
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword}
                    data-test-id="passwordvisiblityId"
                  >
                    {this.state.enablePasswordField ? (
               <VisibilityOffOutlinedIcon /> 
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {this.state.isPasswordError && <p style={{ marginTop:"0px", marginBottom: "4px",color: "#DC2626", fontSize: "12px",fontWeight:400, fontFamily:"Inter", lineHeight: "18px" }}>{this.state.isPasswordError}</p>}
        </Box>
        <Box mt={"12px"} style={{ display: "flex", width: "90vw", maxWidth: "440px", justifyContent: "space-between", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
              data-test-id={"btnRememberMe"}
                onClick={
                  this.setRememberMe
                }
                checked={this.state.checkedRememberMe}
                name="rememberMe"
                style={{color:"#012275",borderRadius:"6px"}}
              />
            }
            style={screen.rememberTextStyle}
            label="Remember me"
          />
          <Box 
            data-test-id={"btnForgotPassword"}
            onClick={() => this.commingSoon()}
          >
            <Typography style={screen.fogotPassword}>Forgot Password?</Typography>
          </Box>
        </Box>
        {this.actionButton()}
      </>
    )
  };

  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      // Required for all blocks
      <>
        <div ref={this.state.topRef}></div>
        <ThemeProvider theme={loginTheme}>
          {this.headerBar()}
          <Box style={{width: "100%", display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            {this.toggleButton()}
            {this.loginForm()}
          </Box>
         <EmptyBox></EmptyBox>
        </ThemeProvider>
        <Footer testID="footer" isChecked={false}/>
      </>

      // Customizable Area End
    );
  }
}
// Customizable Area Start
const loginTheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px",
        padding:"12px 14px 12px 2px",
        maxWidth:"440px",
        width: "90vw",
        height:"44px",
        border:"1 solid #CBD5E1",
        "&$focused $notchedOutline": {
          borderWidth: "1px",
          borderColor: "gray",
        },
        "&:hover $notchedOutline": {
          borderColor: "#CBD5E1",
        },
        "&.MuiOutlinedInput-inputAdornedEnd":{
          paddingRight:0,
          marginTop:6,
        }
        
      },
    },
  },
  palette: {
    primary: {
      light: "#334155",
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily:"Inter",
  },
});

const EmptyBox = styled(Box)({
  "@media (min-width: 580px)": {
    marginTop:"200px"
  },
  marginTop: "80px"
})

const DesktopAlreadyHaveAnAccountBox = styled(Box)({
  "@media (max-width: 1231px)": {
    display: "none"
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "12px",
})

const TabletMobileAlreadyHaveAnAccountBox = styled(Box)({
  "@media (min-width: 1232px)": {
    display: "none",
  },
})

const LogInContentBox = styled(Box)({
  "@media (min-width: 580px)": {
    width: "100%", 
    maxWidth: "525px",
  },
})

const LogInTextBox = styled(Box)({
"@media (max-width: 580px)": {
  maxWidth: "90%",
  paddingRight: "5vw",
  marginLeft: 15,
    width: '80%'
},
"@media (min-width: 580px) and (max-width: 650px)": {
  paddingLeft: "2vw"
},
"@media (min-width: 580px)": {
  marginLeft: "0",
},
display: "flex",
flexDirection: "column",
rowGap: "4px",
maxWidth: "440px",
})

const LogInTopBox = styled(Box)({
  "@media (min-width: 580px)": {
    marginTop: "122.6px"
  },
  marginTop: "60px"
})

const ArrowBox = styled(Box)({
  "@media (max-width: 650px)": {  
    display: "none"
  },
  "@media (min-width: 650px)": {
    marginLeft: "-84px",
    position:'absolute'
  }
})

const screen = {
  joinNotryTypo: {
    fontFamily: "INTER",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    color: "#011342",
  },
  guestbtn: {
    background: "#fff",
    color: "#011342",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "10px 16px",
    fontWeight: 700,
    width:"217px",
    height:"52px"
  },
  signUpButtonSubmit: {
    background: "#012275",
    color: "#fff",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "10px 16px",
    width:"217px",
    height:"52px"
  },
  lableStyle: {
    color: "#011342",
    fontWeight: 500,
    fontSize:18,
    lineHeight: "21.09px",
    fontFamily:'Inter'
  },
  starColor: {
    color: "#FF0000",
    fontSize:18,
    fontweight:500
  },
  rememberTextStyle: {
    color: "#011342",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    fontFamily:'Inter'
  },
  fogotPassword: {
    color: "#011342",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    cursor:"pointer",
    fontFamily:"Inter" 
  },
  dontAccountStyle:{
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color:'#011342'
  },
};

// Customizable Area End
