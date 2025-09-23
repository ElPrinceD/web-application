// Customizable Area Start
import React from "react";
import {
  Box,
  Paper,
  Button,
  IconButton,
  Modal,
  Typography,
  styled,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  FormLabel,
  Select,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import {
  Add,
  Close,
  NavigateNext,
  ExpandMore,
  ExpandLess,
  CalendarToday,
  GroupAdd,
  Clear,
  Description,
} from "@material-ui/icons";
import { saveImage, cancelImage } from "./assets";
import CustomCalender from "../../../components/src/CustomCalender";
import BookNotaryRequestController, {
  Props,
} from "./BookNotaryRequestController";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CustomLoginSignUpPopup from "../../../components/src/CustomLoginSignUpPopup.web";
import SuccessFailureModal from "../../../components/src/SuccessFailureModal.web";

// Customizable Area End

export default class BookNotaryRequestWeb extends BookNotaryRequestController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderPaperStepClassName = () =>{
    const { isNewRequestOrEditRequestOrInviteClient } = this.props;
    if(isNewRequestOrEditRequestOrInviteClient === "invite" || isNewRequestOrEditRequestOrInviteClient === "guest" ){
      return(
        this.isOnStep3() || this.isOnStep4()
      )
    }
    else{
      return (
        this.isOnStep2() || this.isOnStep3()
      )
    }
  }

  renderModal = () => {
    return (
      <NewModal
        data-testID="modalOpen"
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={this.props.isOpen}
      >
        <Paper
          elevation={0}
          className={
            this.renderPaperStepClassName()? "formPaperStep" : "formPaper"
          }
        >
          <Box className="frmHeading">
            <Typography variant="body1">{this.findFormTitle()}</Typography>
            <Close
              data-testID="closeModalBtn"
              onClick={this.props.closeModal}
            />
          </Box>
          <>
            {/* TEMPORARILY REMOVED LOADER */}
            {/* {this.state.loader && this.renderLoader()} */}
            {!this.state.loader && this.renderStepBox()}
          </>
        </Paper>

      </NewModal>
    );
  };

  renderLoader = () => {
    return (
      <Box className="loaderBox">
        <CircularProgress className="circularProgress" />
      </Box>
    );
  };

  renderInvitedRequestStepBox = () => {    
    if(this.props.isNewRequestOrEditRequestOrInviteClient === "invite" || this.props.isNewRequestOrEditRequestOrInviteClient === "guest"){      
      return(
        <>
         <NavigateNext className="rightIcon" />
          <Typography
            variant="body1"
            className={this.isOnStep4() ? "onStep" : "step"}
          >
            {this.isOnStep4() ? <b>STEP 4</b> : "STEP 4"}
          </Typography>
        </>
      )
    }
  }

  renderInvitedRequestStepOneModal = () => {        
    return(
      <>
        <Box className="form">
          <Box className="fieldBox">            
            <TextField
              data-testID="notaryClientNameField"
              className={`textField ${this.checkRequestPropInvite() ?"readonly":""}`}
              fullWidth
              value = {this.state.clientFullName}
              InputProps={{
                readOnly: this.checkRequestPropInvite(),
                style:{
                  marginTop:0
                }
              }}
              disabled = {this.checkRequestPropInvite()}
              onChange = {(event) => {
                this.handleOnChangeTextfieldForInvitedRequestStep1(event , "clientFullName" , "isClientFullName");
              }}  
              style={{height:"48px"}} 
              InputLabelProps={{
                shrink: false,
                style: { marginTop: "-14px" },
              }}  
              label = {
                this.isEmpty(this.state.clientFullName) && !this.checkRequestPropInvite() &&
                <Typography style={webStyle.labelStyle}>
                Client's First and Last name{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              }          
            />
            <Typography className={this.getClassName(this.state.isClientFullName)}>
              {this.getLabelPrefix()}Your client’s first and last name
            </Typography>
          </Box>
          <Box className="fieldBox">            
            <TextField
              data-testID="notaryClientEmailField"
              className={`textField ${this.checkRequestPropInvite() ?"readonly":""}`}           
              fullWidth
              value = {this.state.clientEmail}
              InputProps={{
                readOnly: this.checkRequestPropInvite(),
                style:{
                  marginTop:0
                }
              }}
              disabled = {this.checkRequestPropInvite()}
              onChange = {(event) => {
                this.handleOnChangeTextfieldForInvitedRequestStep1(event , "clientEmail" , "isClientEmail");
              }}
              style={{height:"48px"}}    
              InputLabelProps={{
                shrink: false,
                style: { marginTop: "-14px" },
              }}  
              label = {
                this.isEmpty(this.state.clientEmail) && !this.checkRequestPropInvite() &&
                <Typography style={webStyle.labelStyle}>
                Email Address{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              }         
            />
            <Typography className={this.getClassName(this.state.isClientEmail)}>
            {this.getLabelPrefix()}Your client’s email address
            </Typography>
          </Box>
          <Box className="fieldBox">
            <Box 
              style={{
                display:"flex",
                gap:"12px",
                flexDirection:"row",
              }}
            >
              <Select 
                className={`selectField ${this.checkRequestPropInvite() ?"readonly":""}`}
                data-testID="notaryClientMobileCodeField"
                value={this.state.clientCountryCode}
                readOnly={this.checkRequestPropInvite()}
                IconComponent={ExpandMoreIcon}
                disableUnderline
                style={{
                  width: "100px",
                  height: "48px" 
                }}
                onChange={(event) => {
                  this.handleOnChangeTextfieldForInvitedRequestStep1(event, "clientCountryCode");
                }}
              >
                {this.state.countryCodes.map((code) => (
                  <MenuItem key={code.country_code} value={code.country_code}>
                    +{code.country_code}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                data-testID="notaryClientMobileNumberField"
                className={`textField ${this.checkRequestPropInvite() ?"readonly":""}`}                  
                value = {this.state.clientPhoneNumber}
                InputProps={{
                  readOnly: this.checkRequestPropInvite(),
                  style:{
                    marginTop:0
                  }
                }}
                fullWidth
                disabled={this.checkRequestPropInvite()}
                style={{height:"48px"}}
                onChange = {(event) => {
                  this.handleOnChangeTextfieldForInvitedRequestStep1(event , "clientPhoneNumber" , "isClientPhoneNumber");
                }}  
                InputLabelProps={{
                  shrink: false,
                  style: { marginTop: "-14px" },
                }}  
                label = {
                  this.isEmpty(this.state.clientPhoneNumber) && !this.checkRequestPropInvite() &&
                  <Typography style={webStyle.labelStyle}>
                  Mobile Number{" "}
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                }          
              />
            </Box>          
            <Typography className={this.getClassName(this.state.isClientPhoneNumber)}>
            {this.getLabelPrefix()}Your client’s mobile number
            </Typography> 
          </Box>
          <Box className="fieldBox">            
            <TextField
              data-testID="notaryClientAddress1Field"
              className="textField placeHolderColor"              
              fullWidth
              value = {this.state.clientAddress1}
              onChange = {(event) => {
                this.handleOnChangeTextfieldForInvitedRequestStep1(event , "clientAddress1" , "isClientAddress1");
              }}      
              label = {
                this.isEmpty(this.state.clientAddress1) &&
                <Typography style={webStyle.labelStyle}>
                Address Line 1{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              }
              InputLabelProps={{
                shrink: false,
                style: { marginTop: "-14px" },
              }}
              InputProps={{
                style:{
                  marginTop:0
                }
              }}
              style={{height: "48px"}}
            />
            <Typography className={this.getClassName(this.state.isClientAddress1)}>
              Enter your client’s Address
            </Typography>
          </Box>
          <Box className="fieldBox">            
            <TextField
              data-testID="notaryClientAddress2Field"
              className="textField placeHolderColor"              
              fullWidth
              value = {this.state.clientAddress2}
              onChange = {(event) => {
                this.handleOnChangeTextfieldForInvitedRequestStep1(event , "clientAddress2");
              }}      
              label = {
                this.isEmpty(this.state.clientAddress2) &&
                <Typography style={webStyle.labelStyle}>
                Address Line 2 (Optional)                
              </Typography>
              }
              InputLabelProps={{
                shrink: false,
                style: { marginTop: "-14px" },
              }}
              InputProps={{
                style:{
                  marginTop:0
                }
              }}
              style={{height: "48px"}}
            />
            <Typography className="textStyle">
              Enter your client’s Address
            </Typography>
          </Box>
          <Box className="fieldBox">            
          <TextField
              data-testID="notaryClientCityField"
              className="textField placeHolderColor"              
              fullWidth
              value = {this.state.city}
              onChange = {(event) => {
                this.handleOnChangeTextfieldForInvitedRequestStep1(event , "city" , "isCity");
              }}      
              label = {
                this.isEmpty(this.state.city) &&
                <Typography style={webStyle.labelStyle}>
                City{" "}
                <span style={{ color: "red" }}>*</span>            
              </Typography>
              }
              InputLabelProps={{
                shrink: false,
                style: { marginTop: "-14px"},
              }}
              style={{height: "48px"}}
              InputProps={{
                style:{
                  marginTop:0
                }
              }}
            />
            <Typography
              className={this.getClassName(this.state.isCity)}
            >
              Enter your city name
            </Typography>
          </Box>
          <Box className="fieldBox">            
            <TextField
              data-testID="notaryPostCodeField"
              className="textField placeHolderColor"              
              fullWidth
              value = {this.state.postCode}
              onChange = {(event) => {
                this.handleOnChangeTextfieldForInvitedRequestStep1(event , "postCode" , "isPostCode");
              }}
              label = {
                this.isEmpty(this.state.postCode) &&
                <Typography style={webStyle.labelStyle}>
                Post Code{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              }
              InputLabelProps={{
                shrink: false,
                style: { marginTop: "-14px" },
              }}
              style={{height: "48px"}}
              InputProps={{
                style:{
                  marginTop:0
                }
              }}
            />
            <Typography className={this.getClassName(this.state.isPostCode)}>
              Enter the Post Code
            </Typography>
          </Box>
        </Box>
      </>
    )
  }

  renderInvitedRequestStepModal = () =>{    
    if( this.props.isNewRequestOrEditRequestOrInviteClient === "invite" || this.props.isNewRequestOrEditRequestOrInviteClient === "guest" ){      
        return(
          <>
            {this.isOnStep1() && this.renderInvitedRequestStepOneModal()}
            {this.isOnStep2() && this.renderStepOneModal()}
            {this.isOnStep3() && this.renderStepTwoForModal()}
            {this.isOnStep4() && this.renderStepThreeModal()}
          </>
        )      
    }    
    else{
      return (
        <>        
          {this.isOnStep1() && this.renderStepOneModal()}
          {this.isOnStep2() && this.renderStepTwoForModal()}
          {this.isOnStep3() && this.renderStepThreeModal()}
          </>
      )
    }
  }

  renderStepBox = () => {  
    return (
      <>
        <Box className="stepBox">
          <Typography
            variant="body1"
            className={this.isOnStep1() ? "onStep" : "step"}
          >
            {this.isOnStep1() ? <b>STEP 1</b> : "STEP 1"}
          </Typography>
          <NavigateNext className="rightIcon" />
          <Typography
            variant="body1"
            className={this.isOnStep2() ? "onStep" : "step"}
          >
            {this.isOnStep2() ? <b>STEP 2</b> : "STEP 2"}
          </Typography>
          <NavigateNext className="rightIcon" />
          <Typography
            variant="body1"
            className={this.isOnStep3() ? "onStep" : "step"}
          >
            {this.isOnStep3() ? <b>STEP 3</b> : "STEP 3"}
          </Typography>
          {this.renderInvitedRequestStepBox()}
        </Box>
        { this.renderInvitedRequestStepModal()}
        <Box className="frmBtnBox">
          <Button
            data-testID="backButton"
            onClick={this.handleBack}
            style={{
              width: "160px",
              height: "44px",
              color: "#011342",
              border: "1px solid #5D5D5D",
            }}
          >
            {this.isOnStep1() ? "Cancel" : "Back"}
          </Button>
          <Button
            data-testID="createBtn"
            onClick={this.handleNext}
            style={{
              width: "160px",
              height: "44px",
              color: "white",
              backgroundColor: "#012275",
            }}
          >
            {this.findNextButtonText()}
          </Button>
        </Box>
      </>
    );
  };

  renderStepOneModal = () => {
    return (
      <Box className="form">
        <Box className="fieldBox">
          <Select
            data-testID="servieSelection"
            value={this.state.selectedService}
            onChange={this.handleServiceSelection}
            displayEmpty
            className={`selectField ${this.getReadOnlyClass()}`}
            fullWidth
            IconComponent={ExpandMore}
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
            }}
            disabled = {this.checkRequestPropInvite()}
          >
            <CustomMenuItem value="" disabled>
              Type of notary service <span className="imp">*</span>
            </CustomMenuItem>
            {this.props.serviceData.map((menu, index) => (
              <CustomMenuItem key={index} value={menu.id}>
                {menu?.attributes?.service_name}
              </CustomMenuItem>
            ))}
          </Select>
          <Typography className={this.getClassName(this.state.isSelectService)}>
            Select the options that best describes your notary service.
          </Typography>
        </Box>
        <Box className="fieldBox">
          <Select
            data-testID="notarizationMethodSelect"
            value={this.state.selectedMethod}
            onChange={this.handleNotarisationMethodSelection}
            displayEmpty
            className={`selectField ${this.getReadOnlyClass()}`}
            fullWidth
            IconComponent={ExpandMore}
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
            }}
            disabled = {this.checkRequestPropInvite()}
          >
            <CustomMenuItem value="" disabled>
              Method of Notarisations <span className="imp">*</span>
            </CustomMenuItem>
            {this.state.notarisationMethod.map((menu, index) => (
              <CustomMenuItem key={index} value={menu.id}>
                {menu?.notarisation_method}
              </CustomMenuItem>
            ))}
          </Select>
          <Typography
            className={this.getClassName(this.state.isSelectedMethod)}
          >
            Select the method of notarisations.
          </Typography>
        </Box>
        <Box className="fieldBox">
          <TextField
            data-testID="dateTextField"
            className="textField"
            fullWidth
            style={{ height: "48px" }}
            onClick={this.openCalendar}
            value={this.findDateValue()}
            label={
              this.getCalenderDateErrors() && (
                <Typography style={webStyle.labelStyle}>
                  Choose Date <span style={{ color: "red" }}>*</span>
                </Typography>
              )
            }
            InputLabelProps={{
              shrink: false,
              style: { marginTop: "-14px" },
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    data-testID="calenderBtn"
                    edge="end"
                    onClick={this.openCalendar}
                  >
                    <CalendarToday className="calenderIcon" />
                  </IconButton>
                </InputAdornment>
              ),
              style: { marginTop: 0 },
            }}
          />
          <Box style={{ position: "relative" }}>
            {this.state.isCalendarOpen && (
              <CustomCalender
                data-testID="CustomCalender"
                currentMonth={this.state.currentMonth}
                selectedDate={this.state.tempSelectedDate}
                selectedSession={this.state.tempSelectedSession}
                save={this.handleCalendarSaveClick}
                cancel={this.handleCalendarCancelClick}
                setSession={(session: string) =>
                  this.setState({ tempSelectedSession: session })
                }
                leftArrow={this.leftArrow}
                rightArrow={this.rightArrow}
                priorities={this.state.priorities}
                handleDateClick={this.handleDateClick}
                isSessionNotNeeded = {this.checkRequestPropInvite()}
              />
            )}
          </Box>
          <Typography
            className={this.getClassName(
              this.state.isSelectedDate || this.state.isCorrectDate
            )}
          >
            {(this.state.isSelectedDate || !this.state.isCorrectDate) &&
              "Select the date and time slot for your notary service."}
            {this.state.isCorrectDate &&
              "Select the date between tomorrow and 30 days from tomorrow"}
          </Typography>
        </Box>
        <Box className="fieldBox">
          <TextField
            data-testID="notesField"
            className="textField"
            fullWidth
            multiline
            placeholder="Notes"
            rows={4}
            value={this.state.additionalDetails}
            onChange={this.handleAdditionalDetailsChange}
          />
          <Typography className="textStyle">
            Add special instruction or additional information (optional)
          </Typography>
        </Box>

        <Box className="fieldBox">
          <Select
            data-testID="juridictionSelect"
            value={this.state.selectedJuridiction}
            onChange={this.handleJurisdictionSelection}
            displayEmpty
            disabled={this.state.isCalendarOpen}
            className="selectField"
            fullWidth
            IconComponent={ExpandMore}
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
            }}
          >
            <CustomMenuItem value="" disabled>
              Choose your Jurisdiction <span className="imp">*</span>
            </CustomMenuItem>
            {this.state.juridiction.map((menu, index) => (
              <CustomMenuItem key={index} value={menu.id}>
                {menu.jurisdiction}
              </CustomMenuItem>
            ))}
          </Select>
          <Typography
            className={this.getClassName(this.state.isSelectedJuridiction)}
          >
            Choose your jurisdiction where you need a notary service.
          </Typography>
        </Box>
        <Box className="fieldBox">
          <FormLabel>
            <TextField
              data-testID="notarisedField"
              className="textField placeHolderColor"
              fullWidth
              onChange={(event) => {
                this.onDocNumberChange(event);
              }}
              style={{ height: "48px" }}
              label={
                !this.state.totalDocuments && (
                  <Typography style={webStyle.labelStyle}>
                    No of document(s) to be notarised{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                )
              }
              value={this.state.totalDocuments ? this.state.totalDocuments : ""}
              InputLabelProps={{
                shrink: false,
                style: { marginTop: "-14px" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box className="expandIcons">
                      <IconButton
                        onClick={this.increase}
                        style={{
                          padding: 0,
                          color:
                            this.state.totalDocuments >= 10
                              ? "gray"
                              : "#011342",
                        }}
                        data-testID="incrementBtn"
                        disabled={this.state.totalDocuments >= 10}
                      >
                        <ExpandLess className="iconButton" />
                      </IconButton>
                      <IconButton
                        data-testID="decrementBtn"
                        style={{
                          padding: 0,
                          color: this.isDecreasable() ? "gray" : "#011342",
                        }}
                        disabled={this.isDecreasable()}
                        onClick={() => {
                          this.decrementValue(this.state.files.length - 1);
                        }}
                      >
                        <ExpandMore className="iconButton" />
                      </IconButton>
                    </Box>
                  </InputAdornment>
                ),
                style: { marginTop: 0 },
              }}
            />
          </FormLabel>
          {this.state.isValidDocument ? (
            <Typography
              className={this.getClassName(this.state.isValidDocument)}
            >
              Please enter the vaild Number of document notarised
            </Typography>
          ) : (
            <Typography className={this.getClassName(this.state.isDocument)}>
              Select the number of documents to be notarised.
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  renderTwoStep = (
    docs: { doc_size?: number; document?: File | null },
    docIndex: number
  ) => {
    const documentSize = docs?.document?.size
      ? (docs.document.size / 1000).toFixed(0)
      : 0;
    const documentSizeValue =
      docs.doc_size !== 0 ? docs.doc_size : documentSize;
    return (
      <>
        <Box className="doc" key={docIndex}>
          <Box className="docHead">
            <Typography variant="body1" data-testID={`documentText${docIndex}`}>
              Document #{docIndex + 1} <span className="star">*</span>
            </Typography>
            {this.isDeletable(docIndex) && (
              <Button
                startIcon={<Clear />}
                data-testID="documentRemoveButton"
                onClick={() => {
                  this.decrementValue(docIndex);
                }}
              >
                Remove
              </Button>
            )}
          </Box>
          <Typography variant="body2">
            Your Documents to be Notarised
          </Typography>
          {docs.document === null && (
            <>
              <label htmlFor={`fileInput-${docIndex}`}>
                <Box
                  className="upload"
                  data-testID="dragFile"
                  onDragOver={this.handleDragOver}
                  onDrop={(event) => {
                    this.handleDrop(event, docIndex);
                  }}
                >
                  <Typography variant="body1">
                    Upload a document or Drag it here
                  </Typography>
                  <Typography variant="body2">
                    docx, png, jpg, jpeg, pdf, Max upload size 2MB
                  </Typography>
                </Box>
                <input
                  id={`fileInput-${docIndex}`}
                  data-testID="fileUploadBtn"
                  type="file"
                  multiple
                  hidden
                  accept=".png, .jpg, .jpeg, .pdf, .docx, .doc"
                  onChange={(event) => {
                    this.handleFileChange(event, docIndex);
                  }}
                />
                {this.state.files[docIndex].isfileMax === true && (
                  <Box className="errorTxt">
                    Invalid file size, Choose another file.
                  </Box>
                )}
                {this.state.files[docIndex].isInvalidSize === true && (
                  <Box className="errorTxt">
                    Invalid file format, Choose another file.
                  </Box>
                )}
                {this.state.documentErrors[docIndex] && (
                  <Box className="errorTxt">Please upload file</Box>
                )}
              </label>
            </>
          )}
        </Box>
        {docs.document !== null && (
          <Paper className="files" key={docIndex} elevation={2}>
            <Box className="iconcontent">
              <Box className="ficon">
                <Description />
              </Box>
              <Box>
                <Typography variant="body1" data-testID="fileName">
                  {docs?.document?.name}
                </Typography>
                <Typography variant="body2">{documentSizeValue} KB</Typography>
              </Box>
            </Box>
            {this.isDeletable(docIndex) && (
              <Box>
                <Clear
                  onClick={() => {
                    this.deleteFile(docIndex);
                  }}
                />
              </Box>
            )}
          </Paper>
        )}
      </>
    );
  };

  renderStepTwoForModal = () => {
    return (
      <Wrapper>
        {this.state.files.length > 0 &&
          this.state.files.map((docs, docIndex) => {
            {
              return this.renderTwoStep(docs, docIndex);
            }
          })}
        {this.state.files.length < 10 && (
          <Box className="docbutton">
            <Button
              className="addbut"
              data-testID="incrementBtnDoc"
              startIcon={<Add />}
              onClick={this.incrementValue}
            >
              Add More Documents
            </Button>
          </Box>
        )}
        <Box className="termBox">
          <FormControlLabel
            className={this.state.termOneError ? "errTerm" : "checkgap"}
            control={<Checkbox />}
            data-testID="checkbox1"
            checked={this.state.checkboxOne}
            label={
              "I understand that I am requesting remote digital notarisation. I will need to have audio/video capability for the actual signing."
            }
            onChange={this.handleCheckbox1Click}
            value={this.state.checkboxOne}
          />
          <FormControlLabel
            className={this.state.termTwoError ? "errTerm" : "checkgap"}
            control={<Checkbox />}
            data-testID="checkbox2"
            label={
              "By uploading these files, I understand that a Notary Public may modify permissions and settings of uploaded files and/or merge form content with document master in order to complete the online document notarisation process."
            }
            checked={this.state.checkboxTwo}
            onChange={this.handleCheckbox2Click}
            value={this.state.checkboxTwo}
          />
        </Box>
      </Wrapper>
    );
  };

  renderStepThreeModal = () => {
    return (
      <RecipientBox>
        {this.state.files.length > 0 &&
          this.state.files.map((docs, docIndex) => (
            <>
              <Box key={docIndex} className="headBox">
                <Box className="headings">
                  <Typography variant="body1">
                    Document #{docIndex + 1}
                  </Typography>
                  <Typography variant="body2">{docs.document?.name}</Typography>
                </Box>
                <Box className="iconBox">
                  <Box
                    className="iconBtn"
                    data-testID="addReceipientsbtn"
                    onClick={() => {
                      this.addRecipient(docIndex);
                    }}
                  >
                    <GroupAdd />
                  </Box>
                  <Box
                    className="iconBtn"
                    data-testID="handleEllapsedBtn"
                    onClick={() => this.handleEllapsed(docIndex)}
                  >
                    {!docs.ellapsed ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                </Box>
              </Box>
              {this.state.isSignatoryAvailable[docIndex] === false && (
                <Typography className="errorStyle" data-testID="signatoryError">
                  Make atleast one recipient a signatory
                </Typography>
              )}
              {!docs.ellapsed &&
                docs.recipients_attributes.map((recipient, recipientIndex) => (
                  <Box className="ellaspedDetails">
                    <Box className="docHead">
                      <Typography variant="body1">
                        Recipients #{recipientIndex + 1}
                      </Typography>
                      {(recipientIndex > 0 ||
                        docs.recipients_attributes.length > 1) && (
                        <Button
                          data-testID="removeReceipientsBtn"
                          startIcon={<Clear />}
                          onClick={() => {
                            this.removeRecipient(docIndex, recipientIndex);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>
                    <TextField
                      data-testID="receipientsName"
                      className="textField"
                      placeholder="Recipients Name"
                      fullWidth
                      value={recipient.name}
                      onChange={(event) => {
                        this.handleRecipientNameChange(
                          event,
                          docIndex,
                          recipientIndex
                        );
                      }}
                    />
                    {this.state.recipientErrors[docIndex] &&
                      this.state.recipientErrors[docIndex][recipientIndex] &&
                      this.state.recipientErrors[docIndex][recipientIndex]
                        .nameErr && (
                        <Typography className="errorStyle">
                          Please enter recipient name
                        </Typography>
                      )}
                    <TextField
                      data-testID="receipientsEmail"
                      className="textField"
                      placeholder="Recipients Email"
                      fullWidth
                      value={recipient.email}
                      onChange={(event) => {
                        this.handleRecipientEmailChange(
                          event,
                          docIndex,
                          recipientIndex
                        );
                      }}
                    />
                    {this.state.recipientErrors[docIndex] &&
                      this.state.recipientErrors[docIndex][recipientIndex] &&
                      this.state.recipientErrors[docIndex][recipientIndex]
                        .emailErr && (
                        <Typography className="errorStyle">
                          Please enter recipient email
                        </Typography>
                      )}
                    {this.state.recipientErrors[docIndex] &&
                      this.state.recipientErrors[docIndex][recipientIndex] &&
                      this.state.recipientErrors[docIndex][recipientIndex]
                        .emailInvalidErr && (
                        <Typography className="errorStyle">
                          Please enter a valid email address
                        </Typography>
                      )}
                    <Box className="signatoryBox">
                      <Checkbox
                        data-testID="isSignatory"
                        value={recipient.is_signatory}
                        checked={recipient.is_signatory}
                        onChange={() => {
                          this.handleSignatory(docIndex, recipientIndex);
                        }}
                      />
                      Also a signatory
                    </Box>
                  </Box>
                ))}
              <Divider className="docDivider" />
            </>
          ))}
      </RecipientBox>
    );
  };

  renderSaveDraft = () => {
    let isSaveDraftHidden:boolean = this.isFormEmptyStep1();
    if (!isSaveDraftHidden && this.checkRequestPropNewOrInvite() && this.props.isNewRequestOrEditRequestOrInviteClient !=="invite" && this.props.isNewRequestOrEditRequestOrInviteClient !=="guest" ){
       return (
        <>
          <Button fullWidth data-testID="yesBtn" className="draftButton" onClick={this.saveDraft}>
            Save Draft
          </Button>
        </>
       )
    }
  }

  renderCancelRequestModal = () => {
    return (
      <CancelRequestModal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={this.props.cancelReqModal}
      >
        <Paper elevation={0} className="cancelModalPaper">
          <Box className="imgBox">
            <img src={cancelImage} width={"100%"} height={"100%"} />
          </Box>
          <Typography variant="body2" align="center">
            {this.checkRequestPropNewOrInvite() 
              ? "Do you really want to cancel the request?"
              : "Do you really want to cancel editing the request?"}
          </Typography>
          <Button
            fullWidth
            className="cancelButton"
            onClick={this.yesButtonClick}
          >
            {this.checkRequestPropNewOrInvite()
              ? "Yes, Cancel request"
              : "Yes, Cancel Editing"}
          </Button>
          <Button
            fullWidth
            className="noButton"
            data-testID="noBtn"
            onClick={this.checkRequestPropNewOrInvite()
              ? this.props.noButtonClick
              : this.props.backToEditRequest}
          >
            No
          </Button>
         {this.renderSaveDraft()}
        </Paper>
      </CancelRequestModal>
    );
  };

  rendersuccessfullyText = () => {
    const { isNewRequestOrEditRequestOrInviteClient } = this.props;
    switch( isNewRequestOrEditRequestOrInviteClient ){
      case "invite":
      case "new":
      case "guest":
        if(this.state.isDrafted){
          return  "Notary request draft created successfully!"
        }
        else{
          return "Notary request created successfully!"
        }
      case "edit":
        return "Notary request updated successfully!"      
    } 
  }

  renderLoginPopup = () => {
    return(
      <>
        {this.state.loginSignupPopup && 
          <CustomLoginSignUpPopup closePopup={this.closeLoginPopup} submitLogin={this.navigateToLogin} submitSignUp={this.navigateToSignUp} />          
        }
      </>
    )
  } 

  renderSaveRequest = () => {
    return (
      <SaveModal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={this.state.saveModal}
      >
        <Paper elevation={0} className="saveModalPaper">
          <Box className="closeModal">
            <Close
              data-testID="closeSaveModal"
              onClick={this.closeSuccessModal}
            />
          </Box>
          <Box className="imgBox">
            <img src={saveImage} width={"100%"} height={"100%"} />
          </Box>
          <Typography variant="body1" align="center">
            {this.rendersuccessfullyText()}
          </Typography>
          <p className="subHeading">
            You can check your notary request status in notaries section.
          </p>
          <Button onClick={this.closeSuccessModal} fullWidth>
            Check Status
          </Button>
        </Paper>
      </SaveModal>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <>
        {this.renderModal()}
        {this.state.saveModal && this.renderSaveRequest()}
        {this.props.cancelReqModal && !this.state.isDrafted && this.renderCancelRequestModal()}
        {this.renderLoginPopup()}
        <SuccessFailureModal
        navigation={this.props.navigation}
          data-testID={"successFailureModal"}
          image={this.state.loginNavigateModalImage}
          isOpen={this.state.isLoginNavigateModalOpen}
          textColor={this.state.loginNavigateModalTextColor}
          subText={this.state.loginNavigateModalSubText}
          subText2={this.state.loginNavigateModalSubTextTwo}
          handleButtonClick={() =>this.handleLoginNavigate()}
          buttonText={this.state.loginNavigateModalButtonText}
          modalWidth="472px"  text={"Failed!"}        />
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const NewModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  padding: "10px",
  "& .errorStyle": {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
    fontWeight: 500,
    fontFamily: "Inter",
  },
  "& .textStyle": {
    fontSize: "12px",
    fontWeight: 500,
    marginTop: "5px",
    fontFamily: "Inter",
    color: "#334155",
  },
  "& .formPaper": {
    width: "580px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    overflowY: "scroll",
    overflowX: "hidden",
    gap: "10px",
  },

  "& .formPaperStep": {
    width: "580px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    overflowY: "hidden",
    overflowX: "hidden",
    gap: "10px",
  },
  "& .frmHeading": {
    display: "flex",
    width: "100%",
    padding: "10px 0px",
    borderBottom: "1px solid #CBD5E1",
    "& .MuiTypography-body1": {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "27px",
      fontFamily: "Inter",
      color: "#011342",
      flexGrow: 1,
    },
  },
  "& .form": {
    display: "flex",
    gap: "15px",
    flexDirection: "column",
    width: "100%",
    padding: "20px",
    flexGrow: 1,
    "& .placeHolderColor": {
      "& ::placeholder": {
        color: "#011342",
        opacity: 1,
      },
    },
  },
  "& .stepBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    paddingTop: "10px",
    "& .MuiTypography-body1": {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "22px",
      fontFamily: "Inter",
      color: "#64748B",
    },
  },
  "& .rightIcon": {
    color: "#64748B",
  },
  "& .onStep": {
    color: "black !important",
    fontWeight: "bold",
  },
  "& .imp": {
    color: "red",
  },
  "& .fieldBox": {
    "& .MuiInput-underline": {
      "&:before": { borderBottom: "0px" },
      "&:after": { borderBottom: "0px" },
      "&:focus-visible": {
        outline: "none",
      },
    },
    "& .MuiTypography-body2": {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "18px",
      fontFamily: "Inter",
      color: "#011342",
      flexGrow: 1,
    },
  },
  "& .selectField": {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 400,
    color: "#011342",
    fontFamily: "Inter",
    border: "1px solid #011342",
    borderRadius: "8px",
    padding: "8px 10px",
    "& .MuiSelect-icon": {
      color: "#011342",
      padding: "0px 5px",
    },
  },
  "& .textField": {
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
      color: "#011342",
      fontFamily: "Inter",
    },
    border: "1px solid #011342",
    borderRadius: "8px",
    padding: "8px 8px",
    boxSizing: "border-box",
  },
  "& .readOnly":{
    "& .MuiInputBase-input": {
      opacity : "60%",
    },
  },
  "& .calenderIcon": {
    color: "#011342",
  },
  "& .expandIcons": {
    display: "flex",
    flexDirection: "column",
  },
  "& .iconButton": {
    cursor: "pointer",
    fontSize: "20px",
  },
  "& .frmBtnBox": {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: "10px",
    flexGrow: 1,
    "& .MuiButton-root": {
      textTransform: "none",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700,
      fontFamily: "Inter",
      width: "160px",
      "@media(max-width: 400px)": {
        width: "130px",
        fontSize: "12px",
      },
    },
  },
  "& .nxtBtncolor": {
    color: "white",
    backgroundColor: "gray",
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

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "-webkit-fill-available",
  gap: "10px",
  overflowY: "scroll",
  padding: "10px",
  "& .errTerm": {
    alignItems: "flex-start",
    "& .MuiTypography-body1": {
      fontWeight: 400,
      fontSize: "12px",
      color: "#FF0000 ",
      lineHeight: "18px",
      fontFamily: "Inter",
    },
    "& .MuiIconButton-root": {
      padding: "0px 9px",
    },
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#012275",
    },
  },
  "& .doc": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& .MuiTypography-body1": {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "24px",
      color: "#011342",
    },
    "& .MuiTypography-body2": {
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "22px",
      color: "#475569",
    },
  },
  "& .docHead": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiButton-root": {
      color: "#FF0000",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      textTransform: "none",
    },
  },
  "& .upload": {
    cursor: "pointer",
    margin: "10px 0px",
    height: "90px",
    border: "1px dashed #012275",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
    "@media(max-width: 450px)": {
      height: "150px",
    },
    "& .MuiTypography-body1": {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: "18px",
      color: "#012275",
    },
    "& .MuiTypography-body2": {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "18px",
      color: "#64748B",
    },
  },
  "& .errorTxt": {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "24px",
    color: "#FF0000",
  },
  "& .addbut": {
    color: "#059669",
    fontSize: "14px",
    fontFamily: "Inter",
    fontWeight: "600",
  },
  "& .docbutton": {
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0px",
  },
  "& .termBox": {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    flexGrow: 1,
    gap: "20px",
    padding: "10px 0px",
  },
  "& .checkgap": {
    alignItems: "flex-start",
    "& .MuiTypography-body1": {
      fontFamily: "Inter",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "18px",
      color: "#334155",
    },
    "& .MuiIconButton-root": {
      padding: "0px 9px",
    },
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#012275",
    },
  },
  "& .files": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "72px",
    padding: "5px",
    width: "552px",
    borderRadius: "8px",
    "@media(max-width: 450px)": {
      height: "auto",
    },
  },
  "& .iconcontent": {
    display: "flex",
    gap: 10,
    alignItems: "center",
    "& .MuiTypography-root": {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      color: "#334155",
      width: "20px",
    },
    "& .MuiTypography-body1": {
      color: "#64748B",
      width: "400px",
      wordWrap: "break-word",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
    "& .MuiTypography-body2": {
      color: "#64748B",
      width: "200px",
    },
  },
  "& .ficon": {
    color: "white",
    width: "56px",
    height: "56px",
    background: "#012275",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .star": {
    color: "red",
  },
});

const RecipientBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  overflowY: "scroll",
  "& .headBox": {
    display: "flex",
    justifyContent: "space-between",
  },
  "& .headings": {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    "& .MuiTypography-body2": {
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "22px",
      color: "#334155",
      width: "400px",
      wordWrap: "break-word",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    "& .MuiTypography-body1": {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "19px",
      color: "#011342",
    },
  },
  "& .iconBox": {
    display: "flex",
  },
  "& .iconBtn": {
    padding: "10px",
    cursor: "pointer",
  },
  "& .ellaspedDetails": {
    display: "flex",
    borderRadius: "4px",
    padding: "10px",
    flexDirection: "column",
    backgroundColor: "#F5F9FF",
    gap: "8px",
    "& .MuiInput-underline": {
      "&:before": { borderBottom: "0px" },
      "&:after": { borderBottom: "0px" },
      "&:focus-visible": {
        outline: "none !important",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
      color: "#011342",
      fontFamily: "Inter",
    },
  },
  "& .addDetail": {
    display: "none",
    borderRadius: "4px",
    padding: "10px",
    flexDirection: "column",
    backgroundColor: "#F5F9FF",
    gap: "8px",
    "& .MuiInput-underline": {
      "&:before": { borderBottom: "0px" },
      "&:after": { borderBottom: "0px" },
      "&:focus-visible": {
        outline: "none !important",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 400,
      color: "#011342",
      fontFamily: "Inter",
    },
  },
  "& .docHead": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .MuiButton-root": {
      color: "#FF0000",
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "21px",
      textTransform: "none",
    },
    "& .MuiTypography-body1": {
      fontSize: "14px",
      fontFamily: "Inter",
      lineHeight: "22px",
      fontWeight: 700,
      color: "#011342",
    },
  },
  "& .textField": {
    border: "1px solid #CBD5E1",
    borderRadius: "8px",
    padding: "8px 8px",
    boxSizing: "border-box",
    height: "48px",
  },
  "& .docDivider": {
    backgroundColor: "#D1FAE5",
    height: "1px",
    width: "100%",
  },
  "& .signatoryBox": {
    fontSize: "14px",
    color: "black",
    lineHeight: "16px",
    fontWeight: 500,
    fontFamily: "Inter",
    display: "flex",
    alignItems: "center",
    gap: "3px",
    "& .MuiIconButton-root": {
      padding: "0px",
    },
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#012275",
    },
  },
});

const CustomMenuItem = styled(MenuItem)({
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  fontFamily: "Inter",
  color: "#011342",
  "&:hover": {
    backgroundColor: "#0131A8",
    color: "white",
  },
});

const SaveModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  "& .subHeading": {
    textAlign: "center",
    color: "#011342",
    width: "80%",
    marging: "0 auto",
    lineHeight: "25px",
  },
  "& .saveModalPaper": {
    borderRadius: "16px",
    maxWidth: "540px",
    maxHeight: "480px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "32px",
    gap: "25px",
    "& .MuiTypography-body1": {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "36px",
      fontFamily: "Inter",
      color: "#059669",
    },
    "& .MuiTypography-body2": {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "#011342",
    },
    "& .MuiButton-root": {
      color: "white",
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: 700,
      backgroundColor: "#012275",
      lineHeight: "26px",
      textTransform: "none",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  "& .closeModal": {
    display: "flex",
    width: "100%",
    flexDirection: "row-reverse",
  },
  "& .imgBox": {
    width: "160px",
    height: "160px",
  },
});

const CancelRequestModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  "& .cancelModalPaper": {
    borderRadius: "16px",
    width: "520px",
    height: "470px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "32px 40px",
    boxSizing: "border-box",
    gap: "25px",
    "& .MuiTypography-body2": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "19px",
      fontFamily: "Inter",
      color: "#011342",
    },
    "& .MuiButton-root": {
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "26px",
      textTransform: "none",
      borderRadius: "8px",
      padding: "10px",
      height: "52px",
    },
  },
  "& .imgBox": {
    width: "160px",
    height: "160px",
  },
  "& .cancelButton": {
    color: "white",
    backgroundColor: "#012275",
  },
  "& .noButton": {
    color: "#011342",
    border: "1px solid #012275",
  },
  "& .draftButton": {
    color: "#011342",
  },
});

const webStyle = {
  labelStyle: {
    paddingLeft: "8px",
    color: "#011342",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  },
};
// Customizable Area End
