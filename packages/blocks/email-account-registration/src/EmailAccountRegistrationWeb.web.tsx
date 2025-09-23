import React from "react";

// Customizable Area Start
import {
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Container,
  CircularProgress,FormHelperText,
  styled,
  Checkbox
} from "@material-ui/core";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { Logo, Arrow, Warning, Success, Error  } from "./assets";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Footer } from "../../../components/src/Footer.web";

// Customizable Area End

import EmailAccountRegistrationController,{Props} from "./EmailAccountRegistrationController";

export default class EmailAccountRegistrationWeb extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
}
  // Customizable Area Start
  headerBar = () => {
    return (
      <SignupTopBlock>
        <Grid container>
          <Grid
            item
            container
            xs={12}
            className="headerTopBlock"
          >
            <Box
              onClick={() => this.goToLanding()}
              data-test-id="LandingButtonID"
              className="logoBlock"
            >
              <img src={Logo} alt="notary" style={{ cursor: "pointer" }} />
            </Box>
            <Box
              className="linkBlock"
            >
              <Typography
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#011342",
                  fontFamily: "Inter",
                }}
              >
                Already have an Account?
              </Typography>
              <Button
                variant="outlined"
                data-test-id="signUpID1"
                style={{
                  border: "1px solid #012275",
                  borderRadius: "54px",
                  padding: "10px 16px 10px 16px",
                  width: "96px",
                  height: "44px",
                }}
                onClick={() => this.goToLogin()}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#012275",
                    width: "100%",
                    height: "22px",
                    fontFamily: "Inter",
                  }}
                >
                  LOG IN
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SignupTopBlock>
    );
  };

  togglebuttonChange = () => {
    return (
      <>
      <ForgotPasswordBlockMain>
        <Box className="forgot-block">
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
                SIGN UP
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box style={{ display: "flex", position:"relative"}}>
                <Box
                  style={{ marginTop: "5px", cursor: "pointer", position:"absolute", top:"0", left:"-40px"}}
                  onClick={this.goToHome}
                  data-test-id="goToHomeIDE"
                >
                  <img src={Arrow} alt="img" />
                </Box>
                <Box>
                  <Typography
                    style={{
                      color: "#011342",
                      lineHeight: "36px",
                      fontSize: "24px",
                      letterSpacing: "-0.005em",
                      fontWeight: 600,
                      fontFamily: "Inter",
                    }}
                  >
                    Welcome to renotary
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography style={screen.joinNotryTypo}>
                Join the Notarisation Revolution - Where Trust Meets Technology
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className="toggleBtn">
          <Button
            data-test-id="ToogleBtnIndividualId"
            variant="contained"
            disableElevation
            style={{
              background:
                this.state.selectedButton === "individual" ? "#001569" : "#fff",
              color:
                this.state.selectedButton === "individual" ? "#fff" : "#011342",
              borderRadius: "25px",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "26px",
              alignItems: "center",
              width: "214px",
              height: " 48px",
              alignSelf: "center",
            }}
            fullWidth
            onClick={() => this.handleToggle("individual")}
          >
            INDIVIDUAL
          </Button>

          <Button
            data-test-id="toogleBtnBusinessID"
            variant="contained"
            disableElevation
            style={{
              background:
                this.state.selectedButton === "business" ? "#001569" : "#fff",
              color:
                this.state.selectedButton === "business" ? "#fff" : "#011342",
              borderRadius: "25px",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "26px",
              alignItems: "center",
              width: "214px",
              height: " 48px",
              alignSelf: "center",
            }}
            fullWidth
            onClick={() => this.handleToggle("business")}
          >
            BUSINESS
          </Button>
        </Box>
      </ForgotPasswordBlockMain>
      </>
    );
  };

  passwordRequirementFormateNormalUser() {
    return (
      <>
        {!this.state.errorConfirmPasswordFlag ? (
          <ErrorMsgBlockMain>
            <>

              <Box  className="errorMsg">
                {!this.state.isValidLength ? (
                  <>
                    <Box>
                      <img src={Warning} alt="Icon" />
                    </Box>
                    <Box>
                      <Typography style={screen.byDefaultTypo}>
                        Must be at least 8 characters or more.
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box>
                      <img src={Success} alt="warning" />
                    </Box>
                    <Box>
                      <Typography style={screen.passwordSuccessTypo}>
                        Must be at least 8 characters or more.
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box  className="errorMsg">
                {!this.state.isChecklowerUpperCase ? (
                  <>
                    <Box>
                      <img src={Warning} alt="warningIcon" />
                    </Box>
                    <Box>
                      <Typography style={screen.byDefaultTypo}>
                        Use a combination of uppercase and lowercase letters,
                        numbers, and symbols (except symbols or characters with
                        accents, like ñ or â)
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box>
                      <img src={Success} alt="Iconwarning" />
                    </Box>
                    <Box>
                      <Typography style={screen.passwordSuccessTypo}>
                        Use a combination of uppercase and lowercase letters,
                        numbers, and symbols (except symbols or characters with
                        accents, like ñ or â)
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box  className="errorMsg">
                {!this.state.isNoBlankSpace ? (
                  <>
                    <Box>
                      <img src={Warning} alt="Icon" />
                    </Box>
                    <Box>
                      <Typography style={screen.byDefaultTypo}>
                        Don't create a password beginning or ending with a blank
                        space.
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box  className="errorMsg">
                      <Box>
                        <img src={Success} alt="warningIconWarning" />
                      </Box>
                      <Box>
                        <Typography style={screen.passwordSuccessTypo}>
                          Don't create a password beginning or ending with a blank
                          space.
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </>
          </ErrorMsgBlockMain>
        ) : (
          <>
            <Box  className="errorMsg">
              {this.state.isValidLength ? (
                <>
                  <Box>
                    <img src={Success} alt="" />
                  </Box>
                  <Box>
                    <Typography style={screen.passwordSuccessTypo}>
                      Must be at least 8 characters or more.
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <img src={Error} alt="warningIcon" />
                  </Box>
                  <Box>
                    <Typography style={screen.passwordSuccessTypoError}>
                      Must be at least 8 characters or more.
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Box  className="errorMsg">
              {this.state.isChecklowerUpperCase ? (
                <>
                  <Box>
                    <img src={Success} alt="" />
                  </Box>
                  <Box>
                    <Typography style={screen.passwordSuccessTypo}>
                      Use a combination of uppercase and lowercase letters,
                      numbers, and symbols (except symbols or characters with
                      accents, like ñ or â)
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <img
                      src={Error}
                      alt="IconWarning"
                    />
                  </Box>
                  <Box>
                    <Typography style={screen.passwordSuccessTypoError}>
                      Use a combination of uppercase and lowercase letters,
                      numbers, and symbols (except symbols or characters with
                      accents, like ñ or â)
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Box  className="errorMsg">
              {this.state.isNoBlankSpace ? (
                <>
                  <Box style={screen.errorBox}>
                    <Box>
                      <img src={Success} alt="Icon" />
                    </Box>
                    <Box>
                      <Typography style={screen.passwordSuccessTypo}>
                        Don't create a password beginning or ending with a blank
                        space.
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <img src={Error} alt="warningIcon" />
                  </Box>
                  <Box>
                    <Typography style={screen.passwordSuccessTypoError}>
                      Don't create a password beginning or ending with a blank
                      space.
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </>
        )}
      </>
    );
  }

  actionButtonAndInformationLink() {
    return (
      <BottomTextBlock>
        <>
        <Box className="bottomText">
        <CheckboxComponent
        data-test-id="checkboxChangeBothID"
        checked={this.state.isChecked}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onChange={this.handleCheckboxChange}
      />
            <Typography style={screen.policytext}>
              By continuing, you agree to renotary's{"\u00A0"}
              <NavLink
                  to="/Termsandconditions"
                  target="_blank"
                  style={{ color: "#012275" }}
                >
                  Terms of use
                </NavLink>
              {" "}
              and  <br /><p style={{textAlign:"left"}} >confirm
              that you have read renotary's{" "}
              <NavLink
                  to="/Privacypolicy"
                  target="_blank"
                  style={{ color: "#012275" }}
                >
                  {" "}
                Privacy Policy.{" "}
                </NavLink>
                </p>
            </Typography>
          </Box>
          <Box className="buttonWrapper">
            <Button
              style={{ ...screen.guestbtn, textTransform: "none" }}
              data-test-id="continueID"
              variant="contained"
              fullWidth
              onClick={() => this.GuestButton()}
            >
              Continue as a Guest
            </Button>
            <Button
              style={{ ...screen.signUpButtonSubmit, textTransform: "none",
                backgroundColor: this.state.isButtonEnabled ? "#012275" : "#d3d3d3",
                  borderColor: this.state.isButtonEnabled ? "#012275" : "#d3d3d3",
                  pointerEvents: this.state.isButtonEnabled ? "auto" : "none", 
               }}
              data-test-id="signUpID"
              variant="contained"
              fullWidth
              disabled={!this.state.isButtonEnabled}
              onClick={this.handleSubmit}
            >
              {this.state.loader ? <CircularProgress size={"20px"} /> : "Sign up"}
            </Button>
          </Box>
          
        </>
      </BottomTextBlock>
    );
  }

  renderSignupIndividual() {
    return (
      <>
        {this.togglebuttonChange()}
        <FormBlockMain>
          <Box className="formWrapper">
            <Box>
              <Typography style={screen.lableStyle}>
                Full Name <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                data-test-id="contactNameID"
                fullWidth
                variant="outlined"
                name="contactName"
                placeholder="Enter your first and last name"
                onChange={this.handleNameChange}
                value={this.state.contactName}
                margin="dense"
                error={Boolean(this.state.errorsContact)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorsContact}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screen.lableStyle}>
                Email <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="email"
                data-test-id="emailID"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                margin="dense"
                error={Boolean(this.state.errorEmail)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorEmail}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screen.lableStyle}>
                Password <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                data-test-id="passwordID"
                fullWidth
                variant="outlined"
                name="password"
                placeholder="Enter your password"
                type={"text"}
                value={
                  this.state.enablePasswordField
                    ? this.state.password.replace(/./g, "*")
                    : this.state.password
                }
                onChange={(evgs) => this.handlePasswordChange(evgs.target.value)}
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleClickShowPasswordupdate}>
                        {this.state.enablePasswordField ? (
                          <VisibilityOffOutlinedIcon
                            style={{ color: "#94A3B8" }}
                          />
                        ) : (
                          <VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(this.state.errorPassword)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorPassword}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screen.lableStyle}>
                Confirm Password <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                data-test-id="reTyprPasswrdID"
                fullWidth
                variant="outlined"
                name="reTypePassword"
                placeholder="Confirm your password"
                type={"text"}
                margin="dense"
                value={
                  this.state.enableReTypePasswordField
                    ? this.state.reTypePassword.replace(/./g, "*")
                    : this.state.reTypePassword
                }
                onChange={(evgs) =>
                  this.handleComPasswordChange(evgs.target.value)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleClickConfirmPassword} data-test-id="btnPasswordShowHide">
                        {this.state.enableReTypePasswordField ? (
                          <VisibilityOffOutlinedIcon
                            style={{ color: "#94A3B8" }}
                          />
                        ) : (
                          <VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />
                          
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(this.state.errorComPassword)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorComPassword}
                  </FormHelperText>
                }
              />
            </Box>
            {this.passwordRequirementFormateNormalUser()}
            {this.actionButtonAndInformationLink()}
          </Box>
        </FormBlockMain>
      </>
    );
  }

  renderSignupBusiness() {
    return (
      <FormBlockMain>
        <Box>
          {this.togglebuttonChange()}
          <Box className="formWrapper">
            <Box>
              <Typography style={screen.lableStyle}>
                Full Name <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="contactName"
                margin="dense"
                placeholder="Enter your first and last name"
                onChange={this.handleNameChange}
                value={this.state.contactName}
                error={Boolean(this.state.errorsContact)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorsContact}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screen.lableStyle}>
                Business / Company name <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                data-test-id="businessNameID"
                fullWidth
                variant="outlined"
                name="BusinessCompanyName"
                margin="dense"
                placeholder="Enter your company name"
                onChange={this.handleBusniessNameChange}
                value={this.state.BusinessCompanyName}
                error={Boolean(this.state.errorBusinessCompanyName)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorBusinessCompanyName}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screen.lableStyle}>
                Email <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                data-test-id="inputEmail"
                fullWidth
                variant="outlined"
                margin="dense"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                name="email"
                error={Boolean(this.state.errorEmail)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorEmail}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screen.lableStyle}>
                Password <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                data-test-id="passwordIDs"
                type={"text"}
                value={
                  this.state.enablePasswordField
                    ? this.state.password.replace(/./g, "*")
                    : this.state.password
                }
                onChange={(evgs) => this.handlePasswordChange(evgs.target.value)}
                name="password"
                margin="dense"
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleClickShowPasswordupdate2} data-test-id="btnPasswordShowHide">
                        {this.state.enablePasswordField ? (
                          <VisibilityOffOutlinedIcon
                            style={{ color: "#94A3B8" }}
                          />
                        ) : (
                          <VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(this.state.errorPassword)}
                helperText={
                  <FormHelperText
                    style={{ color: "#f44336", marginLeft: "-15px" }}
                  >
                    {this.state.errorPassword}
                  </FormHelperText>
                }
              />
              {this.state.passwordHelperText ? this.state.passwordHelperText : ""}
            </Box>
            <Box>
              <Typography style={screen.lableStyle}>
                Confirm Password <span style={screen.starColor}>*</span>
              </Typography>
              <TextField
                fullWidth
                data-test-id="enterCompassword"
                name="reTypePassword"
                variant="outlined"
                type={"text"}
                margin="dense"
                placeholder="Confirm your password"
                value={
                  this.state.enableReTypePasswordField
                    ? this.state.reTypePassword.replace(/./g, "*")
                    : this.state.reTypePassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleClickConfirmPassword}>
                        {this.state.enableReTypePasswordField ? (
                          <VisibilityOffOutlinedIcon
                            style={{ color: "#94A3B8" }}
                          />
                        ) : (
                          <VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(evgs) =>
                  this.handleComPasswordChange(evgs.target.value)
                }
                
                error={Boolean(this.state.errorComPassword)}
                helperText={
                  <FormHelperText
                    style={{marginLeft: "-15px", color: "#f44336"  }}
                  >
                    {this.state.errorComPassword}
                  </FormHelperText>
                }
              />
            </Box>
            {this.passwordRequirementFormateNormalUser()}
            {this.actionButtonAndInformationLink()}
          </Box>
        </Box>
      </FormBlockMain>
    );
  }
  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      <>
        <ThemeProvider theme={theme}>
          {this.headerBar()}
          <Container maxWidth="sm">
            {this.state.selectedButton === "individual"
              ? this.renderSignupIndividual()
              : this.renderSignupBusiness()}
          </Container>
          <Box style={{ marginTop: "30px" }} />
        </ThemeProvider>
        <Footer testID="footer" isChecked={false}/>
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start

const CheckboxComponent = styled(Checkbox)({
  "&.MuiCheckbox-root": {
    color: "#012275",
    fontSize:"10px",
    paddingLeft:"0px !important"
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
  }, 
  "& .PrivateSwitchBase-root": {
      padding: "0px",
    }, 
});

const SignupTopBlock = styled(Box)({
  "& .headerTopBlock":{
    maxWidth: "1060px",
    gap: "20px",
    display: "flex",
    padding: "0 25px",
    margin: "48px auto 0",
    alignItems: "center",
    justifyContent: "space-between",
    "@media(max-width:767px)":{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    "& .linkBlock":{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      "@media(max-width:375px)":{
        flexDirection: "column",
      },
    },
  }
})
const ForgotPasswordBlockMain = styled(Box)({
  "& .forgot-block":{
    margin:"60px 0 0 60px",
    "@media(max-width:767px)":{
      margin:"40px 0 0 40px",
    }
  },
  "& .toggleBtn":{
    padding: "0 0 0 4px",
    margin: "20px 0 0 60px",
    display: "flex",
    border: "1px solid #0131A8",
    borderRadius: "48px",
    height: "56px",
    maxWidth: "436px",
    "& button":{
      "@media(max-width:576px)":{
        width:"100% !important",
        borderRadius:"14px !important",
        fontSize:"16px !important",
      }
    },
    "@media(max-width:767px)":{
      margin:"20px 0 0 10px",
    },
    "@media(max-width:576px)":{
      flexDirection: "column",
      gap: "12px",
      borderRadius: "18px",
      padding: "8px",
      height: "auto",
      margin: "13px 0 0",
      maxWidth:"100%",
    }
  }
})
const FormBlockMain = styled(Box)({
  "& .formWrapper":{
    marginTop: "35px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginLeft: 60,
    "& .errorMsg":{
    marginTop: "0",
    display: "flex",
    gap: "2px",
    alignItems: "center",
    width: "440px",
    "@media(max-width:767px)":{
      width: "100% !important",
    }
  },
    "& .MuiOutlinedInput-root":{
      "@media(max-width:767px)":{
        width:"100%",
      }
    },
    "@media(max-width:767px)":{
      marginLeft:"0",
    }
  },
})
const ErrorMsgBlockMain = styled(Box)({
  "& .errorMsg":{
    marginTop: "0",
    display: "flex",
    gap: "2px",
    alignItems: "flexStart",
    width: "440px",
    "@media(max-width:767px)":{
      width: "100% !important",
    }
  }
})
const BottomTextBlock = styled(Box)({
  "& .bottomText":{
      maxWidth:"465px",
      display:"flex",
    "@media(max-width:767px)":{
      width: "100% !important",
    }
  },
  "& .buttonWrapper":{
      display: "flex", 
      marginTop: "25px", 
      gap: "10px",
      "@media(max-width:576px)":{
        flexDirection:"column",
        marginTop: "18px", 
      },
      "& button":{
        "@media(max-width:576px)":{
          width:"100% !important",
        },
      }
  }
})


const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px",
        width: "440px",
        height: "44px",
        border: "1 solid #CBD5E1",
        padding: "12px 14px 12px 2px",
        "&$focused $notchedOutline": {
          borderWidth: "1px",
          borderColor: "gray",
        },
        "&:hover $notchedOutline": {
          borderColor: "#CBD5E1",
        },
        "&.MuiOutlinedInput-inputAdornedEnd": {
          marginTop: 6,
          paddingRight: 0,
        },
      },
    },
    MuiContainer: {
      root: {
        "@media(min-width: 600px)":{
          "&.MuiContainer-maxWidthSm": {
            maxWidth: "560px"
          }
        },
        
      }
    }
  },
  palette: {
    primary: {
      light: "#334155",
      contrastText: "#fff",
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

const screen = {
  joinNotryTypo: {
    fontWeight: 400,
    lineHeight: "22px",
    fontSize: "14px",
    fontFamily: "inter",
  },
  signup: {
    color: " #0131A8",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "26px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  wel: {
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "36px",
    letterSpacing: "-0.005em",
    textAlign: "left",
    color: "#011342",
  },
  textJoin: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "22px",
    letterSpacing: " 0em",
    textAlign: "left",
  },
  btn: {
    display: "flex",
    marginTop: "15px",
    border: "2px solid #0131A8",
    borderRadius: "25px",
    gap: "5px",
    padding: "2px",
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
    fontSize: "16px",
    lineHeight: "24px",
    width: "217px",
    height: "52px",
    fontFamily: "Inter",
  },
  signUpButtonSubmit: {
    background: "#012275",
    color: "#fff",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "10px 16px 10px 16px",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    width: "217px",
    height: "52px",
    fontFamily: "Inter",
  },
  errorBox: {
    marginTop: "-2px",
    display: "flex",
    gap: "2px",
    alignItems: "center",
    width: "440px",
  },
  byDefaultTypo: {
    fontFamily: "Inter",
    color: "#334155",
    fontWeight: 400,
    maxWidth: 430,
    fontSize: 13,
  },
  passwordSuccessTypo: {
    fontSize: 13,
    maxWidth: 430,
    color: "#059669",
    fontFamily: "Inter",
    fontWieght: 400,
  },
  passwordSuccessTypoError: {
    fontSize: 13,
    maxWidth: "430px",
    color: "#DC2626",
    fontWeight: 400,
    fontFamily: "Inter",
  },
  policytext: {
    fontFamily: "Inter",
    fontSize: "14px",
    lineHeight: "10px",
    letterSpacing: "0em",
    textAlign: "center" as "center",
    marginTop: "35px",
    color: "#011342",
    fontWeight: 400,
  },
  togglebtn: {
    padding: "4px",
    margin: "20px 0 0 60px",
    display: "flex",
    border: "1px solid #0131A8",
    borderRadius: "48px",
    height: "56px",
    maxWidth: "436px",
    boxSizing: "border-box" as React.CSSProperties['boxSizing'],
  },
  lableStyle: {
    color: "#011342",
    fontWeight: 600,
  },
  starColor: {
    color: "#FF0000",
  },
};
// Customizable Area End
