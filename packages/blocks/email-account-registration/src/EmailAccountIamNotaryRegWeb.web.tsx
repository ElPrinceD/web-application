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
  CircularProgress,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  styled,
  Checkbox
} from "@material-ui/core";
import { Footer } from "../../../components/src/Footer.web";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { Logo, Arrow, Warning, Success, Error } from "./assets";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import { NavLink } from "react-router-dom";
// Customizable Area End

import EmailAccountIamNotaryRegWebController, {
  Props,
} from "./EmailAccountIamNotaryRegWebController";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export default class EmailAccountIamNotaryRegWeb extends EmailAccountIamNotaryRegWebController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  headerBar = () => {
    return (
      <SignupTopBlock>
        <Grid container >
          <Grid
            item
            container
            xs={12}
            className="headerTopBlock"
          >
            <Box onClick={this.goToLandingPage} data-test-id="HomeButtonID" className="logoBlock">
              <img src={Logo} alt="notary" style={{ cursor: "pointer" }} />
            </Box>
            <Box
              className="linkBlock"
            >
              <Typography style={{fontSize:16,fontWeight:400,color:'#011342',fontFamily:'Inter'}}>Already have an Account?</Typography>
              <Button
                variant="outlined"
                data-test-id="LoginBtnID"
                style={{
                  color: "#012275",
                  border: "1px solid #012275",
                  borderRadius: "54px",
                  padding: "8px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
                onClick={() => this.goToLoginScreen()}
              >
                  <Typography style={{fontSize: "14px",fontWeight: 700,color: "#012275",width:'100%',height:'22px',fontFamily:'Inter'}}>LOG IN</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </SignupTopBlock>
    );
  };

  toggleButton = () => {
    return (
      <ForgotPasswordBlockMain>
        <>
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
                <Box style={{ display: "flex" }}>
                  <Box
                    style={{ marginTop: "5px", cursor: "pointer" }}
                    onClick={() => this.goToHomeScreen()}
                    data-test-id="goToHomeID"
                  >
                    <img src={Arrow} alt="img" style={{ marginLeft: "-5rem" }} />
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        color: "#011342",
                        lineHeight: "36px",
                        fontSize: "24px",
                        letterSpacing: "-0.005em",
                        fontWeight: 600,
                      }}
                    >
                      Welcome to renotary
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography style={screenStyle.joinNotryTypo22}>
                  Join the Notarisation Revolution - Where Trust Meets Technology
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      </ForgotPasswordBlockMain>
    );
  };

  passwordRequirementFormateNotary() {
    return (
      <ErrorMsgBlockMain>
        <>
          {!this.state.errorConfirmPasswordFlag ? (
            <>
              <Box className="errorMsg">
                {!this.state.isValidLength ? (
                  <>
                    <Box>
                      <img src={Warning} alt="warning" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.byDefaultTypo2}>
                        Must be at least 8 characters or more.
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box>
                      <img src={Success} alt="Wicon" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.passwordSuccessTypo2}>
                        Must be at least 8 characters or more.
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box className="errorMsg">
                {!this.state.isChecklowerUpperCase ? (
                  <>
                    <Box style={{marginTop:-16}}>
                      <img src={Warning} alt="warningIcon" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.byDefaultTypo2}>
                        Use a combination of uppercase and lowercase letters,
                        numbers, and symbols (except symbols or characters with
                        accents, like ñ or â)
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box style={{marginTop:-16}}>
                      <img src={Success} alt="warningIcon" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.passwordSuccessTypo2}>
                        Use a combination of uppercase and lowercase letters,
                        numbers, and symbols (except symbols or characters with
                        accents, like ñ or â)
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box className="errorMsg">
                {!this.state.isNoBlankSpace ? (
                  <>
                    <Box>
                      <img src={Warning} alt="Warningicons" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.byDefaultTypo2}>
                        Don"t create a password beginning or ending with a blank
                        space.
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box className="errorMsg">
                      <Box>
                        <img src={Success} alt="IconWarning" />
                      </Box>
                      <Box>
                        <Typography style={screenStyle.passwordSuccessTypo2}>
                          Don"t create a password beginning or ending with a blank
                          space.
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </>
          ) : (
            <>
              <Box className="errorMsg">
                {this.state.isValidLength ? (
                  <>
                    <Box>
                      <img src={Success} alt="warningIcon" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.passwordSuccessTypo2}>
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
                      <Typography style={screenStyle.passwordSuccessTypoError2}>
                        Must be at least 8 characters or more.
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box className="errorMsg">
                {this.state.isChecklowerUpperCase ? (
                  <>
                    <Box style={{marginTop:-16}}>
                      <img src={Success} alt="warningIcon" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.passwordSuccessTypo2}>
                        Use a combination of uppercase and lowercase letters,
                        numbers, and symbols (except symbols or characters with
                        accents, like ñ or â)
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box style={{marginTop:-16}}>
                      <img src={Error} alt="warningIcon" />
                    </Box>
                    <Box>
                      <Typography style={screenStyle.passwordSuccessTypoError2}>
                        Use a combination of uppercase and lowercase letters,
                        numbers, and symbols (except symbols or characters with
                        accents, like ñ or â)
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <Box className="errorMsg">
                {this.state.isNoBlankSpace ? (
                  <>
                    <Box className="errorMsg">
                      <Box>
                        <img src={Success} alt="warningIcon" />
                      </Box>
                      <Box>
                        <Typography style={screenStyle.passwordSuccessTypo2}>
                          Don"t create a password beginning or ending with a blank
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
                      <Typography style={screenStyle.passwordSuccessTypoError2}>
                        Don"t create a password beginning or ending with a blank
                        space.
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </>
          )}
        </>
      </ErrorMsgBlockMain>
    );
  }

  actionButtonAndInformationLink() {
    return (
      <BottomTextBlock>
        <>
        <Box className="bottomText">
        <CheckboxComponent
        data-test-id="checkboxChangeID"
        checked={this.state.isChecked}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onChange={this.handleCheckboxChange}
      />
          <Typography style={screenStyle.policytext2}>
              By continuing, you agree to renotary's{"\u00A0"}
              <NavLink
                to="/Termsandconditions"
                target="_blank"
                style={{ color: "#012275" }}
              >
                Terms of use
              </NavLink>
              {" "}
              and  <br /><p style={{ textAlign: "left" }} >confirm
                that you have read renotary's {" "}
                <NavLink
                  style={{ color: "#012275" }}
                  to="/Privacypolicy"
                  target="_blank"
                >
                  {" "}
                  Privacy Policy.{" "}
                </NavLink>
              </p>
            </Typography>
          </Box>
          <Box className="buttonWrapper">
            <Button
              style={{
                ...screenStyle.signUpButtonSubmit2,
                textTransform: "none",
                  backgroundColor: this.state.isButtonEnabled ? "#012275" : "#d3d3d3",
                  borderColor: this.state.isButtonEnabled ? "#012275" : "#d3d3d3",
                  pointerEvents: this.state.isButtonEnabled ? "auto" : "none",  
              }}
              data-test-id="signUpID"
              variant="contained"
              fullWidth
              onClick={this.handleSubmitChange}
              disabled={!this.state.isButtonEnabled}
            >
              {this.state.loader ? <CircularProgress size={"20px"} /> : "Sign up"}
            </Button>
          </Box>
         
        </>
      </BottomTextBlock>
    );
  }

  renderSignupIndividual() {
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    return (
      <>
        {this.toggleButton()}
        <FormBlockMain>
          <Box className="formWrapper">
            <Box>
              <Typography style={screenStyle.lableStyle2}>
                Full Name <span style={screenStyle.starColor2}>*</span>
              </Typography>
              <TextField
                data-test-id="contactNameID"
                fullWidth
                variant="outlined"
                name="userName"
                placeholder="Enter your first and last name"
                onChange={this.handleNameChange2}
                value={this.state.userName}
                margin="dense"
                error={Boolean(this.state.errorsContact)}
                helperText={
                  <FormHelperText
                    style={{
                      color: "#f44336",
                      marginLeft: "-15px",
                      marginTop: -2,
                    }}
                  >
                    {this.state.errorsContact}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screenStyle.lableStyle2}>
                Business / Company Name{" "}
                <span style={screenStyle.starColor2}>*</span>
              </Typography>
              <TextField
                data-test-id="companyNameId"
                fullWidth
                name="BusinessCompanyName"
                placeholder="Enter your company name"
                onChange={this.handleBusniessName}
                value={this.state.BusinessCompanyName}
                margin="dense"
                error={Boolean(this.state.errorBusinessCompanyName)}
                variant="outlined"
                helperText={
                  <FormHelperText
                    style={{
                      color: "#f44336",
                      marginLeft: "-15px",
                      marginTop: -2,
                    }}
                  >
                    {this.state.errorBusinessCompanyName}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screenStyle.lableStyle2}>
                Email <span style={screenStyle.starColor2}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                name="userEmail"
                data-test-id="emailID"
                placeholder="Enter your email"
                value={this.state.userEmail}
                onChange={this.handleEmail}
                margin="dense"
                error={Boolean(this.state.errorEmail)}
                helperText={
                  <FormHelperText
                    style={{
                      color: "#f44336",
                      marginLeft: "-15px",
                      marginTop: -2,
                    }}
                  >
                    {this.state.errorEmail}
                  </FormHelperText>
                }
              />
            </Box>

            <Box style={{ marginBottom: 10, zIndex: 99 }}>
              <Typography style={screenStyle.lableStyle2}>
                Country <span style={screenStyle.starColor2}>*</span>
              </Typography>
              <FormControl
                variant="filled"
                className="sm-width"
                style={{
                  width: "550px",
                  height: 40,
                  lineHeight: 1.1876,
                  marginTop: 10,
                }}
              >             
                
                <Box style={{width:"440px"}} className="sm-width">
                <style>
                  {countryAutocompleteStyles()}
                </style>
                <Autocomplete
                  classes={{
                    root: "customAutocomplete-root",
                    inputRoot: "customAutocomplete-root",
                    listbox: "MuiAutocomplete-listbox",
                    option: "MuiAutocomplete-option",
                    paper: "MuiAutocomplete-paper",
                  }}
                  fullWidth
                  options={this.state.countryListArray}
                  value={this.state.countryName}
                  disableClearable
                  onChange={this.handlecountry}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          width: "100%",
                        },
                      }}
                      placeholder="Choose your country"
                      variant="outlined"
                    />
                  )}
                />
                </Box>
              </FormControl>
              <FormHelperText style={{ color: "#f44336", marginTop: 5 }}>
                {this.state.errorCountry}
              </FormHelperText>{" "}
            </Box>
            <Box>
              <Typography style={screenStyle.lableStyle2}>
                Password <span style={screenStyle.starColor2}>*</span>
              </Typography>
              <TextField
                data-test-id="passwordID"
                fullWidth
                variant="outlined"
                name="password"
                placeholder="Enter your password"
                type={ "text"}
              value={this.state.enablePasswordField ? this.state.password.replace(/./g, "*") : this.state.password}
                onChange={(evgs) => this.handlePasswordUpdate(evgs.target.value)}

                margin="dense"
                // type={this.state.enablePasswordField ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleClickShowPasswordChange}
                        data-test-id="btnPasswordShowHide"
                      >
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
                    style={{
                      color: "#f44336",
                      marginLeft: "-15px",
                      marginTop: -2,
                    }}
                  >
                    {this.state.errorPassword}
                  </FormHelperText>
                }
              />
            </Box>
            <Box>
              <Typography style={screenStyle.lableStyle2}>
                Confirm Password <span style={screenStyle.starColor2}>*</span>
              </Typography>
              <TextField
                data-test-id="reTyprPasswrdID"
                fullWidth
                variant="outlined"
                name="reTypePassword"
                placeholder="Confirm your password"
                type={ "text"}
              value={this.state.enableReTypePasswordField ? this.state.reTypePassword.replace(/./g, "*") : this.state.reTypePassword}
                onChange={(evgs) => this.handleComPasswordUpdate(evgs.target.value)}
                // value={this.state.reTypePassword}
                // onChange={this.handleComPasswordUpdate}
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleClickConfirmPassword}
                        data-test-id="btnComPasswordShowHide"
                      >
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
                    style={{
                      color: "#f44336",
                      marginLeft: "-15px",
                      marginTop: -2,
                    }}
                  >
                    {this.state.errorComPassword}
                  </FormHelperText>
                }
              />
            </Box>
            {this.passwordRequirementFormateNotary()}
            {this.actionButtonAndInformationLink()}
          </Box>
        </FormBlockMain>
      </>
    );
  }

  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      <>
        <ThemeProvider theme={newtheme}>
          {this.headerBar()}
          <Container maxWidth="sm">{this.renderSignupIndividual()}</Container>
          <Box style={{ marginTop: "40px" }}>
          </Box>
        </ThemeProvider>
        <Footer testID="footer" isChecked={false}/>
      </>
      // Customizable Area End
    );
  }
}
// Customizable Area Start
const SignupTopBlock = styled(Box)({
  "& .headerTopBlock":{
    maxWidth: "1060px",
    display: "flex",
    gap: "20px",
    padding: "0 25px",
    alignItems: "center",
    margin: "48px auto 0",
    justifyContent: "space-between",
    "@media(max-width:767px)":{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    "& .linkBlock":{
      justifyContent: "center",
      display: "flex",
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
      margin:"40px 0 0 0",
    }
  },
  "& .toggleBtn":{
    margin: "20px 0 0 60px",
    padding: "0 0 0 4px",
    border: "1px solid #0131A8",
    borderRadius: "48px",
    display: "flex",
    height: "56px",
    maxWidth: "436px",
    "& button":{
      "@media(max-width:576px)":{
        borderRadius:"14px !important",
        width:"100% !important",
        fontSize:"16px !important",
      }
    },
    "@media(max-width:767px)":{
      margin:"20px 0 0 10px",
    },
    "@media(max-width:576px)":{
      flexDirection: "column",
      borderRadius: "18px",
      gap: "12px",
      padding: "8px",
      height: "auto",
      margin: "13px 0 0",
      maxWidth:"100%",
    }
  }
})

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
      gap: "10px",
      marginTop: "25px", 
      "@media(max-width:576px)":{
         marginTop: "18px", 
         flexDirection:"column",
      },
      "& button":{
        "@media(max-width:576px)":{
          width:"100% !important",
        },
      }
  }
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
const FormBlockMain = styled(Box)({
  "& .formWrapper":{
    display: "flex",
    marginTop: "35px",
    flexDirection: "column",
    gap: "10px",
    marginLeft: 60,
    "& .sm-width":{
      "@media(max-width:767px)":{
        width:"100% !important"
      }
    },
    "& .errorMsg":{
    marginTop: "0",
    gap: "2px",
    display: "flex",
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



const newtheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        padding:"12px 14px 12px 2px",
        borderRadius: "8px",
        height:"42px",
        border:"1 solid #CBD5E1",
        width:"440px",
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
      main: "#fff",
      contrastText: "#fff",
      light: "#334155",

    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

const screenStyle = {
  joinNotryTypo22: {
    fontWeight: 400,
    lineHeight: "22px",
    fontSize: "14px",
    fontFamily:"Inter",
    linehieght:"22px"
  },
  texterrorMargin:{
      marginLeft: "0px",
      marginRight: "0px",
  },
  guestbtn2: {
    background: "#fff",
    color: "#011342",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "10px 16px 10px 16px",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    width:"217px",
    height:"52px",
    fontFamily:"Inter"
  },
  signUpButtonSubmit2: {
    background: "#012275",
    color: "#fff",
    border: "1px solid #012275",
    borderRadius: "8px",
    padding: "10px 16px 10px 16px",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    width:"440px",
    height:"52px",
    fontFamily:"Inter"
  },
  errorBox2: {
    marginTop:"-2px",
    display: "flex",
    gap: "2px",
    alignItems: "center",
    width:"440px"
  },
  byDefaultTypo2: {
    fontWeight:400,
    fontFamily:'Inter',
    maxWidth:430,
    color: "#334155",
    fontSize:13
  },
  passwordSuccessTypo2: {
    color: "#059669",
    fontSize:13,
    fontWeight:400,
    fontFamily:"Inter",
    maxWidth:430
  },
  passwordSuccessTypoError2: {
    fontWeight:400,
    fontSize:13,
    color: "#DC2626",
    fontFamily:"Inter",
    width: '430px'
  },
  policytext2: {
    fontFamily: "Inter",
    fontSize: "14px",
    lineHeight: "10px",
    letterSpacing: "0em",
    marginTop: "32px",
    color:"#011342",
    fontWeight:400,
    paddingLeft: "13px"
  },

  lableStyle2: {
    color: "#011342",
    fontWeight: 600,
  },
  starColor2: {
    color: "#FF0000",
  },
};

const countryAutocompleteStyles = () => `
      .customAutocomplete-root .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
        padding: 0;
        border-radius: "8px";
        border: "1px solid #CBD5E1";
        height: 48px;
        color: "#808080";
      }
  
      .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child {
        padding-left: 16px;
      }
  
      .MuiInputLabel-outlined {
        transform: translate(14px, 12px) scale(1);
        color: "lightgray";
      }
  
      .customAutocomplete-root .MuiAutocomplete-input {
        padding: 8px 16px;
        font-size: "16px";
        fontweight: 500;
      }
  
      .customAutocomplete-root .MuiOutlinedInput-notchedOutline {
        border: "1px solid #CBD5E1";
      }
  
      .MuiAutocomplete-listbox {
        padding: 0;
        border: "1px solid #E2E8F0";
        border-radius: "8px";
      }
  
      .MuiAutocomplete-paper {
        border-radius: "8px";
      }
  
      .MuiAutocomplete-option {
        padding: 8px 16px;
        height: 48px;
      }
      
      .MuiAutocomplete-option:hover,
      .MuiAutocomplete-option[data-focus="true"],
      .MuiAutocomplete-option.Mui-focused {
        background-color: "#0131a8";
        color: "white";
      }
      
      .customAutocomplete-root .MuiInputLabel-shrink {
        display: none;
      }
`;

// Customizable Area End
