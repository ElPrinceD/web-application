// Customizable Area Start
import React from "react";
import InviteFormController, { Props } from "./InviteFormController";
import {
  Button,
  Box,
  TextField,
  Typography,
  Paper,
  styled,
  Modal,
  IconButton,
  createTheme,
  ThemeProvider,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Moment } from "moment";
import DateFnsUtils from "@date-io/moment";
import { Formik, Form, FormikErrors } from "formik";
import { CalendarToday, Close } from "@material-ui/icons";
import CustomAutocomplete from "../../../components/src/CustomAutocomplete.web";
import CustomCalendar from "../../../components/src/CustomCalender";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TimerIcon from '@material-ui/icons/Timer';
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialValues = {
  fullName: "",
  email: "",
  countryCode: "44",
  mobileNumber: "",
  serviceType: "",
  notarisationMethod: "",
  fees: "",
  vatInclusive: false,
  startTime: null,
  endTime: null,
  videoCall: false,
  notes: "",
}

export default class InviteForm extends InviteFormController {
  constructor(props: Props) {
    super(props);
  }

  renderNameLabel = (name: string) => {
    return (
      !name && (
        <span>
          Client's First and Last name <span style={styles.asterisk}>*</span>
        </span>
      )
    );
  };

  renderEmailLabel = (email: string) => {
    return (
      !email && (
        <span>
          Email Address <span style={styles.asterisk}>*</span>
        </span>
      )
    );
  };

  renderMobileNumberLabel = (mobileNumber: string) => {
    return (
      !mobileNumber && (
        <span>
          Mobile Number <span style={styles.asterisk}>*</span>
        </span>
      )
    );
  };

  renderDateLabel = () => {
    return (
      this.state.selectedDate === null &&
      this.state.selectedSession === "" && (
        <span>
          Choose Date <span style={{ color: "red" }}>*</span>
        </span>
      )
    );
  };

  renderCalendar = () => {
    return (
      <Box style={{ position: "relative" }} zIndex={50}>
        {this.state.calendarOpen && (
          <CustomCalendar
            data-testid="CustomCalendar"
            currentMonth={this.state.currentMonth}
            selectedDate={this.state.tempSelectedDate}
            selectedSession={this.state.tempSelectedSession}
            save={this.save}
            cancel={this.cancel}
            setSession={this.setSession}
            leftArrow={this.leftArrow}
            rightArrow={this.rightArrow}
            priorities={this.state.priorities}
            handleDateClick={this.handleDateClick}
            isSessionNotNeeded={true}
          />
        )}
      </Box>
    );
  };

  renderStartTime = (startTime: Date | null) => {
    return (
      !startTime && (
        <span>
          Start time <span style={styles.asterisk}>*</span>
        </span>
      )
    );
  };

  renderEndTime = (endTime: Date | null) => {
    return (
      !endTime && (
        <span>
          End time <span style={styles.asterisk}>*</span>
        </span>
      )
    );
  };

  renderFeesLabel = (fees: string) => {
    return (
      !fees && (
        <span>
          Enter your fees <span style={styles.asterisk}>*</span>
        </span>
      )
    );
  };

  renderVideoCallTitle = (
    videoCallError: any,
    methodValue: string
  ) => {
    return (
      <Typography
        style={{
          ...styles.checkBoxTitle,
          color: this.findVideoCallColor(!!videoCallError),
        }}
      >
        Video call required{" "}
        {this.isVideoCallAsteriskShown(methodValue) && (
          <span style={{ color: "red" }}>*</span>
        )}
      </Typography>
    );
  };

  renderSuccessModal = () => {
    return(
      <CustomConfirmationPopup
          type={"success"} discText={"Invite sent to client's Email address"}  successText={"Invite sent successfully!"} submitPopup={this.navigateToDashboard} btntext={"Dashboard"} showBtnSuccess= {true}  closePopup={()=> this.setState({successModal :  false})}
      /> 
    )
  }

  renderFailureModal = () => {
    return(
      <CustomConfirmationPopup
          type={"warning"} hideBtn={true} discText={this.state.failureModalText} 
      /> 
    )
  }

  renderLoader = () => {
    return (
      <Box className="loaderBox">
        <CircularProgress className="circularProgress" />
      </Box>
    );
  };

  render() {
    const getFeesErrorColor = (feesError: string) => (feesError.trim() !== "" ? "red" : "#011342");
    const getFeesErrorMessage = (feesError: string) => (feesError.trim() !== "" ? feesError : "Please enter your fees.");
    const hasTimeErrors = (errors: FormikErrors<any>) => !!errors.startTime || !!errors.endTime;
    return (
      <>
        <ThemeProvider theme={theme}>
          <Modal
            data-testid="main"
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={this.props.isOpen}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomPaper
              elevation={0}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: "8px",
                width: "min(600px, calc(100vw - 96px))",
                padding: "24px 16px",
                gap: "24px",
              }}
            >
              <Box
                maxHeight="calc(100vh - 96px)"
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                className="innerBox"
                style={{
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  borderBottom={"1px solid #CBD5E1"}
                >
                  <Typography style={styles.heading}>Invite Client</Typography>
                  <IconButton
                    style={{ padding: "10px" }}
                    data-testid = "closeFormBtn"
                    onClick={this.resetErrorsAtClose}
                  >
                    <Close
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#011342",
                      }}
                    />
                  </IconButton>
                </Box>
               
               {<Box width={"100%"}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Formik 
                      enableReinitialize={false}
                      initialValues={initialValues}
                      validationSchema={this.validationSchema}
                      onSubmit={(values:any, { resetForm }) => {
                        this.handleSubmitClientForm(values);       
                        if(this.state.selectedDate !== null &&
                          this.state.selectedSession !== "" ){
                            this.setState({ selectedSession: ""});
                            this.setState({ selectedDate: null });
                            resetForm({ values: initialValues });                      
                          }            
                        if (this.state.feesError.trim() !== ""){
                          this.setState({feesError:""});
                          resetForm({ values: initialValues})
                        }
                      }}
                      validateOnChange={false}
                      validateOnBlur={false}
                      data-testid="formik"                    
                    >
                      {({
                        values,
                        setFieldValue,
                        handleChange,
                        errors,
                        setErrors,
                      }) => (
                        <Form
                          data-testid="form"
                          style={{
                            padding: "12px 8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <Box
                            width={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "4px" }}
                          >
                            <TextField
                              data-testid="fullName"
                              fullWidth
                              InputProps={{ style: { color: "#011342" } }}
                              InputLabelProps={{
                                shrink: false,
                                style: {
                                  marginTop: "4px",
                                  color: "#011342",
                                },
                              }}
                              variant="outlined"
                              name="fullName"
                              label={this.renderNameLabel(values.fullName)}
                              onChange={(event) => {
                                handleChange(event);
                                setErrors({ ...errors, fullName: undefined });
                              }}
                              value={values.fullName}
                            />
                            
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: this.findHelperTextColor(
                                  !!errors.fullName
                                ),
                              }}
                            >
                              Enter your client's first and last name.
                            </Typography>
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "4px" }}
                          >
                            <TextField
                              fullWidth
                              data-testid="email"
                              InputProps={{ style: { color: "#011342" } }}
                              InputLabelProps={{
                                shrink: false,
                                style: {
                                  marginTop: "4px",
                                  color: "#011342",
                                },
                              }}
                              variant="outlined"
                              name="email"
                              label={this.renderEmailLabel(values.email)}
                              onChange={(event) => {
                                handleChange(event);
                                setErrors({ ...errors, email: undefined });
                              }}
                              value={values.email}
                            />
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: this.findHelperTextColor(!!errors.email),
                              }}
                            >
                              {this.getEmailError(errors.email)}
                            </Typography>
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "4px" }}
                          >
                            <Box
                              display={"flex"}
                              style={{ gap: "12px" }}
                              width={"100%"}
                            >
                              <Box width={"100px"}>
                                <CustomAutocomplete
                                  data-testid="countryCode"
                                  options={this.getCountryOptions()}
                                  value={values.countryCode}
                                  label={""}
                                  isAsteriskShown={false}
                                  disableClearable
                                  getOptionLabel={this.getPlusOptionLabel}
                                  onChange={(_, newValue) => {
                                    setFieldValue("countryCode", newValue);
                                  }}                                  
                                />
                              </Box>
                              <TextField
                                fullWidth
                                data-testid="mobileNumber"
                                InputProps={{ style: { color: "#011342" } }}
                                InputLabelProps={{
                                  shrink: false,
                                  style: {
                                    marginTop: "4px",
                                    color: "#011342",
                                  },
                                }}
                                variant="outlined"
                                name="mobileNumber"
                                label={this.renderMobileNumberLabel(
                                  values.mobileNumber
                                )}
                                onChange={(event) => {
                                  if (/^\d*$/.test(event.target.value)) {
                                    setFieldValue(
                                      "mobileNumber",
                                      event.target.value
                                    );
                                    setErrors({
                                      ...errors,
                                      mobileNumber: undefined,
                                    });
                                  }
                                }}
                                value={values.mobileNumber}
                              />
                            </Box>
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: this.findHelperTextColor(
                                  !!errors.mobileNumber
                                ),
                              }}
                            >
                              Enter your client's mobile number.
                            </Typography>
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "4px" }}
                          >
                            <Box width={"100%"}>
                              <CustomAutocomplete                            
                                options={this.getNotaryServicesArray()}
                                data-testid="serviceType"
                                fontWeight={400}
                                value={values.serviceType}
                                label={"Type of notary service"}
                                isAsteriskShown={true}
                                disableClearable
                                onChange={(_, newValue) => {
                                  setFieldValue("serviceType", newValue);
                                  setErrors({
                                    ...errors,
                                    serviceType: undefined,
                                  });
                                }}
                              />
                            </Box>
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: this.findHelperTextColor(
                                  !!errors.serviceType
                                ),
                              }}
                            >
                              Select the options that best describes your notary
                              service.
                            </Typography>
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "4px" }}
                          >
                            <Box width={"100%"}>
                              <CustomAutocomplete
                                options={this.getNotaryMethodsArray()}
                                data-testid="notarisationMethod"
                                fontWeight={400}
                                value={values.notarisationMethod}
                                label={"Method of Notarisations"}
                                isAsteriskShown={true}
                                disableClearable
                                onChange={(_, newValue) => {
                                  setFieldValue("notarisationMethod", newValue);
                                  if (!newValue.includes("REN") && !newValue.includes("REIN")) {
                                    setFieldValue("videoCall", false);
                                  }
                                  setErrors({
                                    ...errors,
                                    notarisationMethod: undefined,
                                    videoCall: undefined,
                                  });
                                }}
                              />
                            </Box>
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: this.findHelperTextColor(
                                  !!errors.notarisationMethod
                                ),
                              }}
                            >
                              Select the method of notarisations.
                            </Typography>
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "4px" }}
                          >
                            <Box
                              display={"flex"}
                              style={{ gap: "12px" }}
                              width={"100%"}
                            >
                              <Box width={"100px"}>
                                <CustomAutocomplete
                                  options={["£"]}
                                  value={"£"}
                                  onChange={undefined}
                                  label={""}
                                  isAsteriskShown={false}
                                  disabled
                                  labelColor="#011342"
                                />
                              </Box>
                              <TextField
                                fullWidth
                                data-testid="fees"
                                InputProps={{ style: { color: "#011342" } }}
                                InputLabelProps={{
                                  shrink: false,
                                  style: {
                                    marginTop: "4px",
                                    color: "#011342",
                                  },
                                }}
                                variant="outlined"
                                name="fees"
                                label={this.renderFeesLabel(values.fees)}
                                onChange={(event) => this.handleFeesChange(event, values, setFieldValue)}
                                value={values.fees}                                
                              />
                            </Box>
                            <Typography style={{...styles.helperText, color: getFeesErrorColor(this.state.feesError)}}>
                              {getFeesErrorMessage(this.state.feesError)}
                            </Typography>
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            alignItems={"start"}
                            style={{ columnGap: "8px" }}
                          >
                            {values.vatInclusive ? (
                              <IconButton
                                data-testid="checkedFees"
                                style={{ padding: 0 }}
                                onClick={() => this.handleVatInclusiveChange(false, values, setFieldValue)}
                              >
                                <CheckBoxIcon fontSize="medium"
                                  style={{ color: "#011342" }}
                                />
                              </IconButton>
                            ) : (
                              <IconButton
                                data-testid="uncheckedFees"
                                style={{ padding: 0 }}
                                onClick={() => this.handleVatInclusiveChange(true, values, setFieldValue)}
                              >
                                <CheckBoxOutlineBlankIcon
                                  fontSize="medium"
                                  style={{ color: "#64748B" }}
                                />
                              </IconButton>
                            )}
                            <Box
                              flexDirection={"column"}
                              display={"flex"}
                              style={{ gap: "4px" }}
                            >
                              <Typography style={styles.checkBoxTitle}>
                                Including VAT
                              </Typography>
                              <Typography style={styles.checkBoxSubtitle}>
                                Tick the check box if your fees includes VAT.
                              </Typography>
                            </Box>
                          </Box>
                          <Box width={"100%"}>
                            <TextField
                              data-testid="date"
                              fullWidth
                              InputProps={{
                                readOnly: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      data-testid="calendarBtn"
                                      edge="end"
                                      onClick={this.calendarOpen}
                                    >
                                      <CalendarToday
                                        style={{
                                          color: "#011342",
                                        }}
                                      />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                style: { color: "#011342" },
                              }}
                              InputLabelProps={{
                                shrink: false,
                                style: {
                                  marginTop: "4px",
                                  color: "#011342",
                                },
                              }}
                              variant="outlined"
                              label={this.renderDateLabel()}
                              onClick={this.calendarOpen}
                              value={this.findDateValue()}
                              className="textField"
                              style={{ height: "48px" }}
                            />
                            
                            {this.renderCalendar()}
                            {!this.state.loader && (
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: this.findHelperTextColor(
                                  this.state.isSelectedDate
                                ),
                              }}
                            >
                              Select the date for your notary service.
                            </Typography>
                            )}
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "4px" }}
                          >
                            <Box display={"flex"} style={{ gap: "12px" }}>
                              <KeyboardTimePicker
                                open={this.state.isStartTimePickerOpen}
                                data-testid={"startTimePicker"}
                                value={values.startTime}
                                onClose={() =>
                                  this.setState({ isStartTimePickerOpen: false })
                                }
                                TextFieldComponent={() => {
                                  return (
                                    <TextField
                                      data-testid="startTime"
                                      fullWidth
                                      InputProps={{
                                        style: { color: "#011342" },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <TimerIcon
                                              style={{
                                                color: "#011342",
                                                width: "24px",
                                                height: "24px",
                                              }}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      InputLabelProps={{
                                        shrink: false,
                                        style: {
                                          marginTop: "4px",
                                          color: "#011342",
                                        },
                                      }}
                                      onClick={() => {
                                        this.setState({
                                          isStartTimePickerOpen: true,
                                        });
                                      }}
                                      variant="outlined"
                                      name="startTime"
                                      label={this.renderStartTime(
                                        values.startTime
                                      )}
                                      value={this.findTimeValue(values.startTime)}
                                    />
                                  );
                                }}
                                onChange={(value: Moment | null) => {
                                  if (value) {
                                    setFieldValue("startTime", value.toDate());
                                    setErrors({
                                      ...errors,
                                      startTime: undefined,
                                    });
                                    this.setState({
                                      isStartTimePickerOpen: false,
                                    });
                                  }
                                }}
                              />
                              <KeyboardTimePicker
                                open={this.state.isEndTimePickerOpen}
                                data-testid={"endTimePicker"}
                                value={values.endTime}
                                onClose={() =>
                                  this.setState({ isEndTimePickerOpen: false })
                                }
                                TextFieldComponent={() => {
                                  return (
                                    <TextField
                                      data-testid="endTime"
                                      fullWidth
                                      InputProps={{
                                        style: { color: "#011342" },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <TimerIcon
                                              style={{
                                                color: "#011342",
                                                width: "24px",
                                                height: "24px",
                                              }}
                                            />
                                          </InputAdornment>
                                        ),
                                      }}
                                      InputLabelProps={{
                                        shrink: false,
                                        style: {
                                          marginTop: "4px",
                                          color: "#011342",
                                        },
                                      }}
                                      onClick={() => {
                                        this.setState({
                                          isEndTimePickerOpen: true,
                                        });
                                      }}
                                      variant="outlined"
                                      name="endTime"
                                      label={this.renderEndTime(values.endTime)}
                                      value={this.findTimeValue(values.endTime)}
                                    />
                                  );
                                }}
                                onChange={(value: Moment | null) => {
                                  if (value) {
                                    setFieldValue("endTime", value.toDate());
                                    setErrors({
                                      ...errors,
                                      endTime: undefined,
                                    });
                                    this.setState({
                                      isEndTimePickerOpen: false,
                                    });
                                  }
                                }}
                              />
                            </Box>
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: this.findHelperTextColor(hasTimeErrors(errors)),
                              }}
                            >
                              {this.getTimeErrorMessage(errors.startTime, errors.endTime)}                        
                            </Typography>
                          </Box>
                          <Box
                            width={"100%"}
                            display={"flex"}
                            alignItems={"start"}
                            style={{ columnGap: "8px" }}
                          >
                            {values.videoCall ? (
                              <IconButton
                                data-testid="checkedVideoCall"
                                onClick={() => {
                                  setFieldValue("videoCall", false);
                                  setErrors({ ...errors, videoCall: undefined });
                                }}
                                style={{ padding: 0 }}
                              >
                                <CheckBoxIcon
                                  fontSize="medium"
                                  style={{ color: "#011342" }}
                                />
                              </IconButton>
                            ) : (
                              <IconButton
                                data-testid={"uncheckedVideoCall"}
                                style={{ padding: 0 }}
                                onClick={() => {
                                  setFieldValue("videoCall", true);
                                  setErrors({ ...errors, videoCall: undefined });
                                }}
                              >
                                <CheckBoxOutlineBlankIcon
                                  data-testid={"videoCallUnchecked"}
                                 fontSize="medium"
                                  style={{
                                    color: this.findVideoCallCheckboxColor(
                                      !!errors.videoCall
                                    ),
                                  }}
                                />
                              </IconButton>
                            )}
                            <Box
                              flexDirection={"column"}
                              display={"flex"}
                              style={{ gap: "4px" }}
                            >
                              {this.renderVideoCallTitle(
                                errors.videoCall,
                                values.notarisationMethod
                              )}
                              <Typography
                                style={{
                                  ...styles.checkBoxSubtitle,
                                  color: this.findVideoCallColor(
                                    !!errors.videoCall
                                  ),
                                }}
                              >
                                {errors.videoCall || "I understand that I am requesting remote digital notarisation. I will need to have audio/video capability for the actual signing."}
                              </Typography>
                            </Box>
                          </Box>
                          <StyledBox width={"100%"} position={"relative"}>
                            <Box
                              width={"100%"}
                              className="fieldBox"
                              position={"relative"}
                            >
                              <TextField
                                className="textField"
                                data-testid="notes"
                                fullWidth
                                multiline
                                rows={4}
                                InputLabelProps={{
                                  shrink: false,
                                  style: {
                                    marginTop: "-8px",
                                    paddingLeft: "12px",
                                    color: "#011342",
                                  },
                                }}
                                placeholder={"Notes"}
                                value={values.notes}
                                onChange={(event) => {
                                  if (event.target.value.length <= 500) {
                                    setFieldValue("notes", event.target.value);
                                    setErrors({ ...errors, notes: undefined });
                                  }
                                }}
                              />
                              <FormHelperText
                                style={{
                                  position: "absolute",
                                  bottom: "0",
                                  right: "10",
                                }}
                              >
                                {500 - values.notes.length} characters left
                              </FormHelperText>
                            </Box>
                            <Typography
                              style={{
                                ...styles.helperText,
                                color: "#011342",
                              }}
                            >
                              Add special instruction or additional information
                              (optional).
                            </Typography>
                          </StyledBox>
                          <Box
                            width="min(332px, 100%)"
                            height={"44px"}
                            display={"flex"}
                            style={{ columnGap: "12px" }}
                          >
                            <Button
                              variant="outlined"
                              style={{
                                borderColor: "#5D5D5D",
                                color: "#FF0000",
                                textTransform: "none",
                                width: "min(160px, calc(50% - 6px))",
                              }}
                              data-testid = "closeFormBtn"
                              onClick={this.resetErrorsAtClose}
                            >
                              <Typography style={styles.cancel}>
                                Cancel
                              </Typography>
                            </Button>
                            <Button
                              variant="contained"
                              data-testid="submit"
                              type="submit"
                              style={{
                                color: "#FFF",
                                textTransform: "none",
                                backgroundColor: "#012275",
                                width: "min(160px, calc(50% - 6px))",
                              }}
                              onClick={() => {this.checkDateError(values)}}
                            >
                              <Typography style={styles.submit}>
                                Send Invite
                              </Typography>
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </MuiPickersUtilsProvider>
                </Box>}
              </Box>
            </CustomPaper>
          </Modal>
        </ThemeProvider>
        {this.state.successModal && this.renderSuccessModal()}
        {this.state.failureModal && this.renderFailureModal()}
      </>
    );
  }
}

const StyledBox = styled(Box)({
  "& .fieldBox": {
    "& .MuiInput-underline": {
      "&:before": { borderBottom: "0px" },
      "&:after": { borderBottom: "0px" },
      "&:focus-visible": {
        outline: "none",
      },
    },
  },
  "& .textField": {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
      color: "#011342",
      fontFamily: "Inter",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#011342",
      opacity: 1,
    },
    border: "1px solid #011342",
    borderRadius: "8px",
    padding: "0 8px",
    boxSizing: "border-box",
    underline: "none",
  },
});

const CustomPaper = styled(Paper)({
  "& .innerBox": {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    height:"100vh"
  },
  "& .loaderBox": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  "& .circularProgress": {
    color: "#012275",
    width: "50px",
    height: "50px",
    margin: "20px 0",
  },
});

const styles = {
  heading: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "18px",
    color: "#011342",
  },
  cancel: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "16px",
    color: "#000A34",
  },
  submit: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "16px",
    color: "#FFFFFF",
  },
  asterisk: {
    color: "red",
  },
  helperText: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
  },
  checkBoxTitle: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#011342",
  },
  checkBoxSubtitle: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#011342",
  },
  labelStyle: {
    paddingLeft: "8px",
    color: "#011342",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  },
};

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        height: "48px",
        "&$focused $notchedOutline": {
          borderColor: "#011342",
        },
        "&:hover $notchedOutline": {
          borderColor: "#011342",
        },
        "&:active $notchedOutline": {
          borderColor: "#011342",
        },
        fieldset: {
          borderRadius: "8px",
        },
      },
      notchedOutline: {
        borderColor: "#011342",
        borderRadius: "8px",
      },
    },
  },
});
// Customizable Area End
