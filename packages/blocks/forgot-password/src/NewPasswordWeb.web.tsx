import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Grid,
  Link,
  Modal,
  Avatar,
  styled,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { Arrow, Logo, Success, Warning, Error, successLogo } from "./assets";
import { NavLink } from "react-router-dom";
import { Footer } from "../../../components/src/Footer.web";
import Loader from "../../../components/src/Loader.web";
export const configJSON = require("./config");


// Customizable Area End

import ForgotPasswordController,{Props} from "./ForgotPasswordController";

export default class NewPasswordWeb extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}
  // Customizable Area Start 
  toggleButton = () => {
    return (
      <>
        <Box style={{ marginTop: "50px" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography
                style={{
                  color: "#0131A8",
                  lineHeight: "26px",
                  fontWeight: 700,
                  fontSize: "18px",
                }}
              >
                FORGOT PASSWORD
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box style={{ display: "flex" }}>
                <Box style={{ marginTop: "5px", cursor: "pointer" }} data-test-id="arrowBtnId">
                <NavLink to="/ForgotPasswordOTPWeb">
                  <img src={Arrow} alt="img" style={{ marginLeft: "-5rem" }} />
               </NavLink> 
                  
                </Box>
                <Box>
                  <Typography
                    style={{
                      color: "#011342",
                      lineHeight: "36px",
                      fontSize: "24px",
                      letterSpacing: "-0.005em",
                      fontWeight: 600,
                      font: "Semibold",
                      fontFamily: "Inter",
                    }}
                  >
                    Forgot your Password?
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography style={screen.joinNotryTypo}>
                Enter your new password.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  };

  headerBar = () => {
    return (
      
          <Box  m={"48px 80px 0"}  data-test-id="HomeButtonIDLogin" >
            <NavLink to="/">
                  <img src={Logo} alt="notary" style={{ cursor: "pointer" }} width={"194px"} height={"auto"}  />
               </NavLink>
          </Box>      
    );
  };  

  actionButton() {
    return (
      <>
        <Box style={{ flexDirection: "column", marginTop: "25px", gap: "10px", display: "flex", }}>
          <Box>
            <Button
              style={{ ...screen.signUpButtonSubmit, textTransform: "none" }}
              data-test-id={"btnEmailLogIn"}
              variant="contained"
              fullWidth
              onClick={(e) => {
                this.handleNewPassword(e)
              }}
            // onClick={this.handlePasswordSubmit}

            >
              Reset Password
            </Button>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography
              style={{
                color: "#011342",
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: 350,
                marginRight: "10px",
              }}
              component={"span"}

            >
              Back to
            </Typography>
            <Link
              component={"span"}
              underline="always"
              style={{
                color: "#0131A8",
                fontFamily: "Inter",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "14px",
              }}
              data-test-id="logintestid"
              onClick={() => {
                this.goToLoginPage()

              }}
            >
              LOG IN
            </Link>
          </Box>
        </Box>
      </>)
  }

  passwordRequirementFormateNewPassword() {
    return (
      <>
        {!this.state.errorConfirmPasswordFlag ?
          <>
            <Box style={screen.errorBox}>
              {!this.state.isValidLength ?
                <>
                  <Box><img src={Warning} alt="Icon" /></Box>
                  <Box><Typography style={screen.byDefaultTypo}>Must be at least 8 characters or more.</Typography></Box>
                </>
                :
                <>
                  <Box><img src={Success} alt="Iconwarning" /></Box>
                  <Box><Typography style={screen.passwordSuccessTypo}>Must be at least 8 characters or more.</Typography></Box>
                </>
              }
            </Box>
            <Box style={screen.errorBox}>
              {!this.state.isChecklowerUpperCase ?
                <>
                  <Box><img style={{marginBottom:"25px"}} src={Warning} alt="warningIcon" /></Box>
                  <Box><Typography style={screen.byDefaultTypo}>Use a combination of uppercase and lowercase letters, numbers, and symbols (except symbols or characters with accents, like ñ or â)</Typography></Box>
                </>
                :
                <>
                  <Box><img style={{marginBottom:"25px"}}  src={Success} alt="warningIcon" /></Box>
                  <Box><Typography style={screen.passwordSuccessTypo}>Use a combination of uppercase and lowercase letters, numbers, and symbols (except symbols or characters with accents, like ñ or â)</Typography></Box>
                </>
              }
            </Box>
            <Box style={screen.errorBox}>
              {!this.state.isNoBlankSpace ?
                <>
                  <Box><img src={Warning} alt="warningIcon" /></Box>
                  <Box><Typography style={screen.byDefaultTypo}>Don't create a password beginning or ending with a blank space.</Typography></Box>
                </>
                :
                <>
                  <Box style={screen.errorBox}>
                    <Box><img src={Success} alt="warningIcon" /></Box>
                    <Box><Typography style={screen.passwordSuccessTypo}>Don't create a password beginning or ending with a blank space.</Typography></Box>
                  </Box>
                </>
              }
            </Box>

            <Box style={screen.errorBox}>
              {!this.state.previousPasswordError ?
                <>
                  {this.state.previousPasswordErrorMessage === "Successfully verified that the password is new and not used recently." ? (
                      <Box style={screen.errorBox}>
                        <Box><img src={Success} alt="successIcon" /></Box>
                        <Box>
                          <Typography style={screen.passwordSuccessTypo}>
                            {configJSON.passWordValidationError}
                          </Typography>
                        </Box>
                      </Box>
                    ) : (

                      <Box style={screen.errorBox}>
                      <Box><img src={Warning} alt="warningIcon" /></Box>
                      <Box><Typography style={screen.byDefaultTypo}>{configJSON.passWordValidationError}</Typography></Box>
                    </Box>
                    )}
                </>
                :
                  <>
                    {this.state.previousPasswordErrorMessage === "Successfully verified that the password is new and not used recently." ? (
                      <Box style={screen.errorBox}>
                        <Box><img src={Success} alt="successIcon" /></Box>
                        <Box>
                          <Typography style={screen.passwordSuccessTypo}>
                            {configJSON.passWordValidationError}
                          </Typography>
                        </Box>
                      </Box>
                    ) : (

                      <Box style={screen.errorBox}>
                        <Box><img src={Error} alt="warningIcon" /></Box>
                        <Box>
                          <Typography style={screen.passwordSuccessTypoError}>
                            {configJSON.passWordValidationError}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </>
              }
            </Box>
          </>
          :
          <>
            <Box style={screen.errorBox}>
              {this.state.isValidLength ?
                <>
                  <Box><img src={Success} alt="warningIcon" /></Box>
                  <Box><Typography style={screen.passwordSuccessTypo}>Must be at least 8 characters or more.</Typography></Box>
                </>
                :
                <>
                  <Box><img src={Error} alt="warningIcon" /></Box>
                  <Box><Typography style={screen.passwordSuccessTypoError}>Must be at least 8 characters or more.</Typography></Box>
                </>
              }

            </Box>
            <Box style={screen.errorBox}>
              {this.state.isChecklowerUpperCase ?
                <>
                  <Box><img style={{marginBottom:"25px"}}  src={Success} alt="successIcon" /></Box>
                  <Box><Typography style={screen.passwordSuccessTypo}>Use a combination of uppercase and lowercase letters, numbers, and symbols (except symbols or characters with accents, like ñ or â)</Typography></Box>
                </>
                :
                <>
                  <Box><img style={{marginBottom:"25px"}}  src={Error} alt="warningIcon" /></Box>
                  <Box><Typography style={screen.passwordSuccessTypoError}>Use a combination of uppercase and lowercase letters, numbers, and symbols (except symbols or characters with accents, like ñ or â)</Typography></Box>
                </>
              }

            </Box>
            <Box style={screen.errorBox}>
              {this.state.isNoBlankSpace ?
                <>
                  <Box style={screen.errorBox}>
                    <Box><img src={Success} alt="warningIcon" /></Box>
                    <Box><Typography style={screen.passwordSuccessTypo}>Don't create a password beginning or ending with a blank space.</Typography></Box>
                  </Box>
                </>
                :
                <>
                  <Box><img src={Error} alt="warningIcon" /></Box>
                  <Box><Typography style={screen.passwordSuccessTypoError}>Don't create a password beginning or ending with a blank space.</Typography></Box>
                </>
              }
            </Box>
  
          </>}
      </>
      )
  }

  renderSignupIndividual() {
    return (
      <>
        <Box style={{ marginTop: "4.8vh", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box>
            <Typography style={screen.lableStyle}>Password <span style={screen.starColor}>*</span></Typography>
            <TextField
              data-test-id="passwordID"
              fullWidth
              variant="outlined"
              name="newPassword"
              placeholder="Enter your password"
              value={this.state.newPassword}
              onChange={this.handlePasswordChange}
              margin="dense"
              type={this.state.enablePasswordField ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleClickShowPassword}>
                      {this.state.enablePasswordField ? (
                        <VisibilityOffOutlinedIcon style={{ color: "#94A3B8" }} />
                      ) : (
                        <VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(this.state.errorPassword)}
              helperText={this.state.errorPassword}
            />
          </Box>
          <Box>
            <Typography style={screen.lableStyle}>Confirm Password <span style={screen.starColor}>*</span></Typography>
            <TextField
              data-test-id="reTyprPasswrdID"
              fullWidth
              variant="outlined"
              name="reTypePassword"
              placeholder="Confirm your password"
              type={this.state.enableReTypePasswordField ? "password" : "text"}
              value={this.state.reTypePassword}
              onChange={this.handleComPasswordChange}
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleClickConfirmPassword}>
                      {this.state.enableReTypePasswordField ? (<VisibilityOffOutlinedIcon style={{ color: "#94A3B8" }} />) : (<VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />)}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(this.state.errorComPassword)}
              helperText={this.state.errorComPassword}
            />
          </Box>
          {this.passwordRequirementFormateNewPassword()}
         
        </Box>
      </>
    );
  }

  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      <>
        {this.headerBar()}
        <Loader loading={this.state.loader} />
        <Container maxWidth="sm" >
          {this.toggleButton()}
          {this.renderSignupIndividual()}
          {this.actionButton()}
          
          <Modal
            open={this.state.enableSuccessModel}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <SuccessModalMainOuter sx={screen.model} className="successModalMainOuter">
              <Box style={{ alignContent: "center", alignItems: "center", alignSelf: "center", justifyContent: "center", display: "flex" }}><Avatar src={successLogo} className="successLogo"></Avatar></Box>
              <Typography id="modal-modal-description" style={{ textAlign: "center", marginTop: 20 }}>
                New Password has been created successfully
              </Typography>
              <Button
                style={{
                  ...screen.otpButtonSubmit,
                  textTransform: "none",
                }}
                data-test-id="successmodal"
                variant="contained"
                fullWidth
                className="loginBtn"
                onClick={this.GotoDashboard}
              >
                Go to Login
              </Button>
            </SuccessModalMainOuter>
          </Modal>
        </Container>
        <Footer testID="footer" isChecked={false}/>
      </>
      // Customizable Area End
    );
  }
}
const SuccessModalMainOuter = styled(Box)({
  "& .successLogo":{
    width: "431px", 
    height: "228px", 
    gap: 24, 
    "@media(max-width:576px)": {
      width: "280px", 
      height: "auto",
    }
  },
  "& .loginBtn":{
    "@media(max-width:576px)": {
      width:"100% !important",
    },
  },
  "@media(max-width:576px)": {
    width:"calc(100% - 70px) !important",
    padding:"30px 20px 0 !important",
  },
});
// Customizable Area Start
const loginTheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px",
        "&$focused $notchedOutline": {
          borderColor: "gray",
          borderWidth: "2px"
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
    fontFamily:"Inter",
    color: "#011342",
  },
  signup: {
    color: " #0131A8",
    fontWeight: "700",
    lineHeight: "26px",
    letterSpacing: "0em",
    textAlign: "left",
    fontSize: "18px",
  },
  wel: {
    fontWeight: "bold",
    fontSize: "24px",
    letterSpacing: "-0.005em",
    textAlign: "left",
    color: "#011342",
    lineHeight: "36px",
  },
  textJoin: {
    fontSize: "14px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "22px",
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
    padding: "10px 16px 10px 16px",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    borderRadius: "8px",
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
  errorBox: {
    display: "flex",
    gap: "5px",
    alignItems: "center"
  },
  byDefaultTypo: {
    color: "#334155"
  },
  errorColor: {
    color: "red"
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
    letterSpacing: "0em",
    textAlign: "center" as "center",
    color: "#011342",
    marginTop: "60px",
  },
  togglebtn: {
    padding: "5px",
    display: "flex",
    border: "0.6px solid #0131A8",
    borderRadius: "30px",
    height: "56px",
    marginTop: "21px",
  },
  lableStyle: {
    color: "#011342",
    fontWeight: 600,
    fontSize:"18px",
  },
  starColor: {
    color: "#FF0000",
  },
  model: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "600px",
    hieght: "550px",
    padding: " 48px 0px 0px 0px",
    gap: " 40px",
    borderRadius: "16px",
  },
  otpButtonSubmit: {
    background: "#012275",
    color: "#fff",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "14px 19px",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    marginTop: "25px",
    marginBottom: "40px",
    width: "500px"

  },
};
// Customizable Area End
