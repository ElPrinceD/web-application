import React from "react";
// Customizable Area Start
import {
Box,Typography,Button,Container,styled,
Checkbox,
FormControlLabel,
FormGroup,
Dialog,
List,
ListItem,
TextField,
Chip,
DialogTitle,
DialogContent,
DialogContentText,
Select,
MenuItem,
FormControl,
FormHelperText,
Grid,
DialogActions,
Tooltip,
IconButton,
} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
export const configJSON = require("./config");
import Loader from "../../../components/src/Loader.web";
import { closeIcon,calendarIcon } from "./assets";
import {KycDocumentResponse, RequestedKycDocument} from "./KnowYourCustomerKycVerificationController";
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GetAppIcon from '@material-ui/icons/GetApp';
import MomentUtils  from "@date-io/moment";
import { withStyles } from '@material-ui/core/styles';
// Customizable Area End

import KnowYourCustomerKycVerificationController, {
  Props,
} from "./KnowYourCustomerKycVerificationController";
import { Formik } from "formik";
const initialValues = {
  firstNameDefault: "",
  lastNameDefault: "",
  middleNameDefault: "",
  emailStateDefault: "",
  nationalityDefault: "",
  dateOfBirth: "",
  phoneNumber: ""
}

export default class KnowYourCustomerKycVerification extends KnowYourCustomerKycVerificationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  getHeadingText(onfidoId: number | null, configJSON: { verificationHeading: string; requestedDoc: string; }) {
    if (onfidoId !== null) {
      return this.props.isNotaryUser && configJSON.requestedDoc;  
    }
    return this.props.isNotaryUser && configJSON.verificationHeading;
    
  }

  renderKycError () {
    if (!this.state.kycCreateError) return null;
    return (
      <Box className="kycTitle">
        <p className="error-msg" data-test-id="kycCreateError">
          {this.state.kycCreateError}
        </p>
      </Box>
    );
  };

  renderKycTitle() {
    if (this.props.isNotaryUser && this.state.onfidoId) {
      return (
        <>
          <Typography className="kycMainHeading">
            {configJSON.kycTitle}
          </Typography>
          <NotaryKycSection />
        </>
      );
    }
    return null;
  }

  renderKycSuccess() {
    return this.state.statusDiolog ? (
      <CustomConfirmationPopup
        type="success"
        discText="KYC verification completed successfully! Your identity has been verified."
      />
    ) : null;
  }

  renderKycApplicationError() {
    return this.state.applicantCreateApiError ? (
      <p className="error-msg-form" data-test-id="kycCreateError">
        {this.state.applicantCreateApiError}
      </p>
    ) : null
  }

  renderKycCountryError() {
    const { errors } = this.state;
    return !!errors.country ? (
      <FormHelperText>{errors.country}</FormHelperText>
    ) : null;
  }

  // Customizable Area End
  render() {
    // Customizable Area Start
    const { selectAll, handleFormOpen,userFname,userMname,userLname,mobNumber,email,stateCode,identityType,idNumber,address1,address2,city,postcode,kycDocument,loader,disableKyc,kycDocumentStatusDetailsDoc,onfidoIframeOpen,applicantCreateApiDataLink,isStartButtonActive,buttonLable,kycDocumentStatusError,onfidoId } = this.state;
    const { isNotaryUser,isEndUser } = this.props;
    
    return (
      <>
      <Container className="builderCode" style={styles.container}>
          <Typography style={styles.textstyle1}>
            User Details
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={this.signupValidationSchema}
          onSubmit={(values, { resetForm }) => {
            this.createAccount(values)
            resetForm({ values:initialValues })
          }}
          validateOnBlur={true}
          >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            handleSubmit,
            touched
          }) => (
            <>
              <Box style={{ marginTop: 10, marginLeft: 10 }}>
                <Typography style={styles.textheadingstyle}>firstNameDefault</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                     data-test-id={"firstNameweb"}
                    placeholder="Enter the firstNameDefault"
                    onChange={(() =>handleChange("firstNameDefault"))}
                    value={values.firstNameDefault}
                  />
                </Box>
                

                <Typography style={styles.textheadingstyle}>middleNameDefault</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                   data-test-id={"Middlenameweb"}
                   placeholder="Enter the middleNameDefault"
                    onChange={(() =>handleChange("middleNameDefault"))}
                    onBlur={handleBlur('middleNameDefault')}
                    value={values.middleNameDefault}
                  />
                </Box>
               
                <Typography style={styles.textheadingstyle}>lastNameDefault</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                    data-test-id={"lastNameweb"}
                    placeholder="Enter the lastNameDefault"
                    onChange={(() =>handleChange("lastNameDefault"))}
                    onBlur={handleBlur('lastNameDefault')}
                    value={values.lastNameDefault}
                  />
                </Box>
                
                <Typography style={styles.textheadingstyle}> Eamil  Address</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight:600, borderWidth: 0 }}
                    data-test-id={"emailweb"}
                    placeholder="Enter the Mail id"
                    onChange={(() =>handleChange("email"))}
                    value={values.emailStateDefault}
                  />
                </Box>
                
                <Typography style={styles.textheadingstyle}>Phone Number</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                    data-test-id={"phoneweb"}
                    placeholder="Enter the Phone Number"
                    onChange={(() =>handleChange("phone"))}
                    value={values.phoneNumber}
                  />
                </Box>
                
                <Typography style={styles.textheadingstyle} >nationalityDefault </Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight:600, borderWidth: 0 }}
                    data-test-id={"nationalityweb"}
                    placeholder="Enter the nationalityDefault"
                    onChange={(() =>handleChange("nationalityDefault"))}
                    value={values.nationalityDefault}
                  />
                </Box>
                
                <Typography style={styles.textheadingstyle} >Date of Birth </Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                    data-test-id={"Date of Birthweb"}
                    placeholder="Enter the dateOfBirth"
                    onChange={(() =>handleChange("dateOfBirth"))}
                    value={values.dateOfBirth}
                  />
                </Box>
               
              </Box>
              <Box style={styles.btnview}>
                <Button data-test-id={"SubmituserDetailsweb"}style={styles.btnstyle} onClick={()=>handleSubmit()}>
                   Submit
                </Button>
              </Box>
            </>
          )}
        </Formik>
      </Container>
    
        <NotaryKycSection className="notaryMainSection" data-test-id="mainNotarySection">
       
        <Loader loading={loader} />

            {this.renderKycTitle()}

            {!isStartButtonActive && !onfidoId && kycDocument.length > 0 && isNotaryUser &&
              <>
                <Typography className="kycTitle" data-test-id="renotary-doc-list-main">
                  Select any one level of verification from below:
                </Typography>

                <FormGroup className="renotary-checkbox-outer">
                  {this.state.levelKeys.map((level, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={level}
                            checked={this.state[level]}
                            onChange={this.handleLevelChange}
                            color="primary"
                          />
                        }
                        label={level}
                      />
                      <NotaryTool title={this.state.hints[level]} placement="right" arrow>
                        <IconButton size="small" style={{ padding: '0 8px' }}>
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </NotaryTool>

                    </div>
                  ))}
                </FormGroup>
              </> }

              <Typography className="kycTitle" data-test-id="renotary-doc-list-main">
                {this.getHeadingText(onfidoId, configJSON)}
              </Typography>
         
          {!isStartButtonActive && !onfidoId && kycDocument.length > 0 && isNotaryUser &&
            <>
             
              {this.renderKycError()}

              <FormGroup className="renotary-checkbox-outer">
                {kycDocument.map((item: KycDocumentResponse) => (
                  <FormControlLabel
                    key={item.id}
                    data-test-id="singleDocCheck"
                    control={
                      <Checkbox
                        color="primary"
                        data-test-id="renotary-doc-list-checked"
                        checked={item.checked}
                        onChange={this.handleIndividualChange(item.id)}
                      />
                    }
                    label={item.document_type}
                  />
                ))}
              </FormGroup>

              <Button
                variant="contained"
                fullWidth
                className="tabInsiderButton"
                disabled={disableKyc}
                data-testID="KYCVerificationTabButton"
                data-test-id="KYCVerificationTabButton"
                onClick={this.handleRequestKyc}
              >
                <CallMadeOutlinedIcon className="ArrowButton" />
                <Typography className="tabInsiderButtonTypography">
                  {buttonLable}
                </Typography>
              </Button>
            </>
          }

        
        {this.renderKycSuccess()}

        {kycDocumentStatusDetailsDoc &&
          <Box className="kyc-list-wrapper" data-test-id="kycDocStatus">
            <List className="kyc-list-main">
              {kycDocumentStatusDetailsDoc && kycDocumentStatusDetailsDoc?.map((kycDetail: RequestedKycDocument) => (
                <ListItem key={kycDetail.id} data-test-id="kycDocStatusData">
                  <Typography className="info-text">
                    {kycDetail.document_details.data.attributes.document_type}
                  </Typography>
                  <Typography className={`filter-chip ${kycDetail.status === "pending" ? "yellow" : "green"}`}>
                    <Chip label={kycDetail.status} variant="outlined" />
                  </Typography>
                </ListItem>
                )
              )}
            </List>

            {isEndUser && !kycDocumentStatusError && !isStartButtonActive &&
            <Button
                variant="contained"
                fullWidth
                className="tabInsiderButton"
                data-testID="startKycVerfication"
                data-test-id="startKycVerfication"
                onClick={this.handleClickFormOpen}
                disabled={isStartButtonActive}
              >
                <CallMadeOutlinedIcon className="ArrowButton" />
                <Typography className="tabInsiderButtonTypography">
                  Start
                </Typography>
              </Button>
            }

            {isNotaryUser && !kycDocumentStatusError && isStartButtonActive &&
              <Button
                fullWidth
                className="tabInsiderButton grey"
                disabled={true}
                variant="contained"
                >
                <GetAppIcon className="ArrowButton" />
                <Typography className="tabInsiderButtonTypography">
                  Download Report
                </Typography>
              </Button>
            }
          </Box>
        }

        {isEndUser &&
        <>
          <NotaryKycDialog
            open={handleFormOpen}
            onClose={this.handleClickFormClose}
            data-test-id="kycReqForm"
            aria-labelledby="form-dialog-title"
            className="notary-dialog-outer"
          >
            <Loader loading={loader} />
            <DialogTitle className="notary-title-wrapper" id="form-dialog-title">
              <p className="kycTitle">KYC Verification</p>
              <em data-test-id="closeIconClick"  className="closeIconClick" onClick={this.handleClickFormClose}> <img src={closeIcon} alt="close-icon" /> </em>
            </DialogTitle>
            
            {this.renderKycApplicationError()}
             
            <DialogContent className="kyc-content-block">
              <DialogContentText className="content-title">Personal Details</DialogContentText>
              <form onSubmit={this.handleSubmit} className="kyc-form-main">
                <Box className="kyc-form-wrapper">

                  <Box className="form-group">
                    <Typography className="lableStyle2">First Name</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.userFname}
                      helperText={this.state.errors.userFname} value={userFname}  data-test-id="userFname" name="userFname" placeholder="Enter your First Name"  margin="dense" />
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">Middle Name</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.userMname}
                      helperText={this.state.errors.userMname} data-test-id="userMname" name="userMname" placeholder="Enter your Middle Name" value={userMname} margin="dense" />
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">Last Name</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.userLname}
                      helperText={this.state.errors.userLname} data-test-id="userLname" name="userLname" placeholder="Enter Last Name" value={userLname} margin="dense" />
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">Mobile Number</Typography>
                    <div className="number-wrapper">
                      
                      <Select
                        className="country-code input code"
                        data-testID="countrycode"
                        data-test-id="countrycode"
                        name="countrycode"
                        error={!!this.state.errors.countryCode}
                        value={this.getCountryCodeValue(this.state.countryCode)}
                        IconComponent={ExpandMoreIcon}
                        onChange={this.handleCodeChange}
                        displayEmpty
                        fullWidth
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                          keepMounted: true,
                        }}
                      >
                        {this.state.countryCodes.map((item) => (
                          <MenuItem key={item.country_code} value={item.country_code}>
                            {"+"}
                            {item.country_code}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextField fullWidth variant="outlined" onChange={this.handleChange} data-test-id="mobNumber" name="mobNumber" placeholder="Enter your number" error={!!this.state.errors.mobNumber}
                      helperText={this.state.errors.mobNumber}  value={mobNumber} margin="dense" />
                    </div>
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">Email ID</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.email}
                      helperText={this.state.errors.email}  data-test-id="email" name="email" placeholder="Enter your email" value={email} margin="dense" />
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">Date of Birth</Typography>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                          className="kyc-date-picker"
                          name="DOB"
                          data-test-id="DOB"
                          format="DD/MM/yyyy"
                          placeholder="Date of birth"
                          margin="dense"
                          id="date-picker-dialog"
                          maxDate={new Date()}
                          value={this.state.selectedDate}
                          error={!!this.state.errors.selectedDate}
                          helperText={this.state.errors.selectedDate}
                          onChange={this.handleDateChange}
                          keyboardIcon={<img src={calendarIcon} alt="calendar icon" style={{ width: 24, height: 24 }} />}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          variant="dialog"
                          PopoverProps={{
                            anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left',
                            },
                            transformOrigin: {
                              vertical: 'top',
                              horizontal: 'left',
                            },
                            disablePortal: true, 
                          }}
                        />
                    </Grid>
                    </MuiPickersUtilsProvider>
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">ID Type</Typography>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      error={!!this.state.errors.identityType}
                      margin="dense"
                    >

                      <Select
                        className="country-code"
                        data-test-id="identityType"
                        name="identityType"
                        value={identityType}
                        onChange={this.handleIdTypeChange}
                        IconComponent={ExpandMoreIcon}
                        error={!!this.state.errors.identityType}
                        displayEmpty
                        fullWidth
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                          keepMounted: true,
                        }}
                      >
                        <MenuItem value="" disabled> Select ID Type </MenuItem>
                        <MenuItem value="social_insurance"> UK National Insurance </MenuItem>
                        <MenuItem value="tax_id"> Tax Id </MenuItem>
                        <MenuItem value="identity_card"> Identity Card </MenuItem>
                        <MenuItem value="driving_licence"> Driving Licence </MenuItem>
                        <MenuItem value="voter_id"> Voter Id </MenuItem>
                        <MenuItem value="passport"> Passport  </MenuItem>
                        <MenuItem value="work_permit"> Work Permit  </MenuItem>
                        <MenuItem value="other"> Other </MenuItem>

                      </Select>
                      {!!this.state.errors.identityType && (
                        <FormHelperText>{this.state.errors.identityType}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">State Code</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.stateCode}
                      helperText={this.state.errors.stateCode} name="stateCode" placeholder="State Code" value={stateCode} margin="dense" />
                  </Box>

                  <Box className="form-group">
                    <Typography className="lableStyle2">ID Number</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.idNumber}
                      helperText={this.state.errors.idNumber} name="idNumber" placeholder="Enter your ID Number" value={idNumber} margin="dense" />
                  </Box>

                  <Box className="form-group half-width">
                    <Typography className="lableStyle2">Address Line 1</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.address1}
                      helperText={this.state.errors.address1} name="address1" placeholder="Enter your Address" value={address1} margin="dense" />
                  </Box>

                  <Box className="form-group half-width">
                    <Typography className="lableStyle2">Address Line 2 (Optional)</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} name="address2" placeholder="Enter your Address" value={address2} margin="dense" />
                  </Box>

                  <Box className="form-group half-width">
                    <Typography className="lableStyle2">City</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.city}
                      helperText={this.state.errors.city} name="city" placeholder="City" value={city} margin="dense" />
                  </Box>

                    <Box className="form-group half-width">
                      <Typography className="lableStyle2">Country</Typography>

                      <FormControl
                        fullWidth
                        variant="outlined"
                        error={!!this.state.errors.country}
                        margin="dense"
                      >
                        <Select
                          className="country-code"
                          name="country"
                          fullWidth
                          data-testID="countryTestID"
                          data-test-id="country"
                          value={this.getCountryCodeValue(this.state.country)}
                          IconComponent={ExpandMoreIcon}
                          onChange={this.handleCountryChange}
                          error={!!this.state.errors.country}
                          displayEmpty
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                            keepMounted: true,
                          }}
                        >
                          <MenuItem value="" disabled> Select Country </MenuItem>
                          <MenuItem value="NLD"> Netherlands</MenuItem>
                          <MenuItem value="NOR"> Norway</MenuItem>
                          <MenuItem value="IND"> India</MenuItem>
                          <MenuItem value="DEU"> Germany</MenuItem>
                          <MenuItem value="FIN"> Finland</MenuItem>
                          <MenuItem value="CZE"> Czech Republic	</MenuItem>
                          <MenuItem value="FRA"> France</MenuItem>

                        </Select>
                        {this.renderKycCountryError()}
                      </FormControl>
                    </Box>

                  <Box className="form-group half-width">
                    <Typography className="lableStyle2">Postcode</Typography>
                    <TextField fullWidth variant="outlined" onChange={this.handleChange} error={!!this.state.errors.postcode}
                      helperText={this.state.errors.postcode} name="postcode" placeholder="Postcode" value={postcode} margin="dense" />
                  </Box>

                </Box>
              </form>
            </DialogContent>
            <DialogActions className="kyc-footer-block">
              <Button onClick={this.handleClickFormClose} className="renotary-btn border-btn">
                Cancel
              </Button>
              <Button  data-test-id="kycHandleSubmit" onClick={this.handleSubmit} className="renotary-btn">
                Next
              </Button>
            </DialogActions>
          </NotaryKycDialog>


          <NotaryKycDialog
            open={onfidoIframeOpen}
            onClose={this.handleClickFormClose}
            fullWidth
            aria-labelledby="form-dialog-title"
            className="notary-dialog-outer"
          >
            <DialogTitle className="notary-title-wrapper" id="form-dialog-title">
              <p className="kycTitle">KYC Verification</p>
              <em className="closeIconClick" onClick={this.handleClickFormClose}> <img src={closeIcon} alt="close-icon" /> </em>
            </DialogTitle>
            <DialogContent className="kyc-content-block" >
              <iframe
                allow="camera;microphone"
                src={applicantCreateApiDataLink}
                className="kycIframe"
                width="100%"
                height="735px"
                title="KYC Verification Onfido"
                style={{ border: "none", height: "735px", overflow: 'auto' }}
              />
            </DialogContent>
          </NotaryKycDialog>
        </>
        }
       </NotaryKycSection>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = {
  container: {
    display:"none"
  },
  textviewstyle1: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  textstyle1: {
    fontSize: 32,
    fontWeight: 700,
    color: '#282828'
  } ,
  textinputviewstyle: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    padding: 5, borderWidth: 1,
    borderColor: 'gray'
  }as React.CSSProperties,
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textheadingstyle: {
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 10,
    marginTop: 10,
    color: 'gray'
  },
  btnstyle: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'#6C4695'
  },
  btntext: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#FFFFFF'
  },
  btnview: {
    marginTop: 10,
    marginBottom: 30
  },
  errorText: {
    fontSize: 10,
    color: "rgba(220, 96, 104, 1)",
    fontWeight: 700,
    marginTop:5
  },
};

const NotaryTools = styled(Tooltip)({
  "& .MuiTooltip-tooltip": {
    color: "#000A34",
    padding: "12px 20px",
    fontSize: "13px",
    maxWidth: "350px",
    wordWrap: "break-word",
    borderRadius: "2px",
    lineHeight: 1.5,
    fontWeight: 500,
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "#F5F9FF",
    boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.08)"
  }
});

const NotaryTool = withStyles({
  tooltip: {
    color: "#000A34",
    padding: "12px 20px",
    fontSize: "13px",
    maxWidth: "350px",
    wordWrap: "break-word",
    borderRadius: "2px",
    lineHeight: 1.5,
    fontWeight: 500,
    fontFamily: '"Inter", sans-serif',
    backgroundColor: "#F5F9FF",
    boxShadow: "0 2px 0 0 rgba(0, 0, 0, 0.08)"
  },
  arrow: {
    color: "#F5F9FF !important",
    top: "50% !important",
    transform: "translateY(-50%)",
  }
})(Tooltip);

const NotaryKycSection = styled(Box)({
  "&.notaryMainSection":{
    padding:"25px",
  },
  "& .renotary-checkbox-outer":{
    marginBottom: "40px",
    "& label":{
      marginRight:"0",
      "& + button":{
        "& svg":{
          color: "white !important",
          width: "18px !important",
          height: "18px !important",
          backdropFilter: "grayscale(0) invert(1)",
          borderRadius: "50%",
          position: "relative",
          top: "3px"
        }
      }
    },
  },
  "& .kycTitle": {
    fontSize: "18px",
    fontWeight: 500,
    color: "#011342",
    lineHeight: 1.25,
    fontFamily: "Inter",
    marginBottom: "16px",
    "@media(max-width:1199px)": {
      fontSize: "16px",
    },
  },
  "& .kycMainHeading": {
    fontSize: "18px",
    fontWeight: 700,
    color: "#011342",
    lineHeight: 1.25,
    fontFamily: "Inter",
    marginBottom: "24px",
    "@media(max-width:1199px)": {
      fontSize: "16px",
    },
  },
  "& .kycIframe":{
    display:"block",
  },
  "& .tabInsiderButtonTypography": {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
    color: "#FFF"
  },
  "& .tabInsiderButton": {
    backgroundColor: "#012275",
    borderRadius: "4px",
    padding: 0,
    height: "44px",
    textTransform: "none",
    "&.grey":{
      backgroundColor: "#CCD3E3",
    }
  },
  "& .ArrowButton": {
    width: "24px",
    height: "24px",
    marginRight: "8px",
    color: "#FFF",
  },
  "& .error-msg":{
      color:"red",
  },
  "& .kyc-list-wrapper":{
    "& .kyc-list-main":{
      padding:"0",
      margin:"25px 0",
      "& li":{
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        position:"relative",
        paddingLeft:"16px",
        "&::before":{
          position:"absolute",
          content:"''",
          top:"11px",
          left:"0",
          width:"6px",
          height:"6px",
          borderRadius:"50%",
          backgroundColor:"#000A34",
        },
        "&:not(:last-child)":{
          marginBottom:"12px",
        },
        "& .info-text":{
          fontSize:"16px",
          fontWeight:"400",
          color:"#000A34",
          lineHeight:"1.5",
        },
        "& .filter-chip":{
          "& .MuiChip-outlined": {
            border: "0",
            backgroundColor: "transparent",
            height: "auto",
            padding: "6px 10px",
            textTransform: "uppercase",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "110px",
            fontWeight: 700,
            fontSize: "12px"
          },
          "&.green":{
            "& .MuiChip-outlined": {
              color:"#43D270",
              backgroundColor:"#D1FAE5",
            }
          },
          "&.yellow":{
            "& .MuiChip-outlined": {
              color:"#D97706",
              backgroundColor:"#FEF3C7",
            },
          },
        }
      },
    },
  },
});

const NotaryKycDialog = styled(Dialog)({
  "&.notary-dialog-outer":{
    "& .notary-title-wrapper":{
      "@media(max-width:767px)":{
        padding:"15px",
      },
      "& h2": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "15px",
        borderBottom: "1px solid #CBD5E1",
        "@media(max-width:767px)":{
          paddingBottom:"7px",
        },
        "& p": {
          margin: "0",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: 1.5,
          color: "#011342",
          "@media(max-width:767px)":{
            fontSize:"16px",
          },
        },
      }
    },
    "& .error-msg-form":{
       color:"red",
       margin:"0px 0 10px",
       padding:"0 25px",
       fontSize:"16px",
    },
    "& .closeIconClick":{
      cursor:"pointer",
    },
    "& .kyc-content-block":{
      "@media(max-width:767px)":{
        padding:"0 15px",
      },
      "& .content-title":{
        fontFamily: '"Inter", sans-serif',
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: 1.5,
        color: "#001569",
        marginBottom: "20px",
        "@media(max-width:767px)":{
          fontSize:"16px",
          marginBottom:"10px",
        },
      },
      "& .kyc-form-main":{
        "& .kyc-form-wrapper":{
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -8px -16px",
          "@media(max-width:1199px)":{
            margin: "0 -5px -10px",
          },
          "@media(max-width:480px)":{
            margin: "0 0 -15px",
          },
          "& *": { boxSizing: "border-box" },
          "& .form-group": {
            flex: "0 0 33.33%",
            maxWidth: "33.33%",
            padding: "0 8px 16px",
            "@media(max-width:1199px)":{
              padding: "0 5px 10px",
            },
            "@media(max-width:767px)":{
              flex: "0 0 50%",
              maxWidth: "50%",
            },
            "@media(max-width:480px)":{
              flex: "0 0 100%",
              maxWidth: "100%",
              padding: "0 0 15px",
            },
            "&.half-width": {
              flex: "0 0 50%",
              maxWidth: "50%",
              "@media(max-width:480px)":{
                flex: "0 0 100%",
                maxWidth: "100%",
              },
            },
            "& .number-wrapper":{
              display:"flex",
              alignItems:"flex-start",
              gap:"10px",
              "& .MuiInput-underline":{
                "&:before":{
                  top: "0",
                  border: "1px solid #CBD5E1",
                  height: "44px",
                  lineHeight: "42px",
                  borderRadius: "5px"
                },
              },
              "& .MuiSelect-select":{
                padding: "0 0 0 5px",
                "&:focus":{
                  backgroundColor:"transparent !important",
                }
              },
            },
            "& .kyc-date-picker":{
              margin:"8px 0 4px",
              "& .MuiInput-underline":{
                "&:before":{
                  top: "0",
                  border: "1px solid #CBD5E1",
                  height: "44px",
                  lineHeight: "42px",
                  borderRadius: "5px",
                },
                "&:after":{
                  display:"none",
                },
              }
            },
          },
          "& .lableStyle2": {
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: 1.5,
            color: "#334155",
            fontFamily: '"Inter", sans-serif'
          },
          ".MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CBD5E1"
            },
            "&:hover":{
              "& .MuiOutlinedInput-notchedOutline":{
                borderColor: "#CBD5E1"
              }
            },
          },
          "& input": {
            height: "44px",
            lineHeight: "42px",
            borderRadius: "8px",
            border: "0",
            fontFamily: '"Inter", sans-serif',
            color: "#011342",
            fontWeight: 500,
            fontSize: "16px",
            padding:"0 10px",
            "&::placeholder":{
              color:"DDD",
              opacity:"1 !important",
            }
          },
          "& .MuiFormHelperText-root.Mui-error":{
            color: "#ff0000",
            margin: "5px 0 0",
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root":{
            "&.Mui-error":{
              "& .MuiOutlinedInput-notchedOutline":{
                borderColor:"#ff0000",
              },
            },
          },
          "& .MuiInput-underline.Mui-error":{
            "& .MuiOutlinedInput-notchedOutline":{
              borderColor:"#ff0000",
            },
            "&:before":{
              borderColor:"#ff0000 !important",
            }
          }
        }
      }
    },
    "& .code": {
      width: "100px",
      height: "44px",
      padding: "0",
      backgroundColor: "#fff",
      position: "relative",
      top: "6px",
      "& .MuiSelect-icon": {
        color: "#011342",
        right: "6px",
        top:"10px",
      },
    },
    "& .codeCountry": {
      width: "214px",
      backgroundColor: "#fff",
      height: "44px",
      marginRight: "8px",
      padding: "10px",
      "& .MuiSelect-icon": {
        color: "#011342",
        right: "10px",
      },
    },
    "& .kyc-footer-block":{
      padding: "24px",
      "@media(max-width:767px)":{
        padding:"15px",
      },
      "@media(max-width:480px)":{
        flexDirection: "column",
        justifyContent: "center",
        gap: "12px"
      },
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "928px",
      margin: "20px"
    },
    "& .renotary-btn": {
      fontFamily: '"Inter", sans-serif',
      minWidth: "277px",
      textAlign: "center",
      height: "44px",
      lineHeight: "42px",
      color: "#FFF",
      backgroundColor: "#012275",
      borderRadius: "8px",
      transition: "all 0.5s",
      fontSize: "16px",
      fontWeight: 700,
      textTransform: "capitalize",
      "@media(max-width:1199px)":{
        minWidth: "190px",
      },
      "@media(max-width:767px)":{
        minWidth: "160px",
      },
      "@media(max-width:480px)":{
        minWidth: "100%",
      },
      "&.border-btn": {
        border: "1px solid #5D5D5D",
        color: "#000",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
          color: "#000"
        }
      },
      "&:hover": {
        backgroundColor: "#011342",
        color: "#FFF"
      },
    },
  }, 
});
// Customizable Area End
