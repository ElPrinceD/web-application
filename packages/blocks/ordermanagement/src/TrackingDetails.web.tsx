// Customizable Area Start
import React from "react";
import TrackingDetailsController, { Props } from "./TrackingDetailsController";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";
import {
  AddRounded,
  Close,
  EditOutlined,
  ExpandMore,
} from "@material-ui/icons";
import CustomTextField from "../../../components/src/CustomTextField.web";
import Loader from "../../../components/src/Loader.web";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { TrackingDetail } from "./types";
// Customizable Area End

export default class TrackingDetails extends TrackingDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {
      trackingDetails,
      expanded,
      successFailModalImage,
      isSuccessFailModalOpen,
      successFailModalTextColor,
      successFailModalText,
      successFailModalSubText,
      isFormOpen,
      shipmentProviderName,
      trackingNumber,
      additionalNotes,
      isSubmitButtonDisabled,
      submitButtonText,
    } = this.state;
    return (
      <div data-testID="trackingDetails">
        <Loader loading={this.state.loader} />
        <CustomModal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={isSuccessFailModalOpen}
        >
          <Paper
            elevation={0}
            className="saveModalPaper"
            style={{ maxWidth: "525px" }}
          >
            <Box width={"100%"} display={"flex"} justifyContent={"end"}>
              <IconButton
                style={{ padding: "10px" }}
                data-testID="closeIconButton"
                onClick={() => this.setState({ isSuccessFailModalOpen: false })}
              >
                <Close style={{ width: "24px", height: "24px" }} />
              </IconButton>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ gap: "24px" }}
              justifyContent={"center"}
              alignItems={"center"}
              maxWidth={"431px"}
            >
              <Box className="imgBox">
                <img
                  src={successFailModalImage}
                  width={"100%"}
                  height={"100%"}
                />
              </Box>
              <Typography
                variant="body1"
                style={{ color: successFailModalTextColor }}
                align="center"
              >
                {successFailModalText}
              </Typography>
            </Box>
            <Typography variant="body2" align="center">
              {successFailModalSubText}
            </Typography>
          </Paper>
        </CustomModal>
        <TrackingDetailsModal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={isFormOpen}
        >
          <Paper elevation={0} className="trackingDetailsPaper">
            <Box width={"100%"}>
              <Typography style={webStyle.formTitle}>
                Tracking Details
              </Typography>
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              flexDirection={"column"}
              style={{ gap: "12px" }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                style={{ gap: "8px" }}
              >
                <Typography style={webStyle.fieldName}>
                  Shipment Provider Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <CustomTextField
                  onChange={this.handleShipmentProviderNameChange}
                  data-testID={"shipmentProviderNameField"}
                  value={shipmentProviderName}
                  placeholder={""}
                  bgColor="#F1F5F9"
                  borderColor="#F1F5F9"
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                style={{ gap: "8px" }}
              >
                <Typography style={webStyle.fieldName}>
                  Tracking Number <span style={{ color: "red" }}>*</span>
                </Typography>
                <CustomTextField
                  onChange={this.handleTrackingNumberChange}
                  data-testID={"trackingNumberField"}
                  value={trackingNumber}
                  placeholder={""}
                  bgColor="#F1F5F9"
                  borderColor="#F1F5F9"
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                style={{ gap: "8px" }}
              >
                <Typography style={webStyle.fieldName}>
                  Additional Note (Optional)
                </Typography>
                <Box className="fieldBox" position={"relative"}>
                  <TextField
                    className="textField"
                    data-testID="additionalNoteField"
                    fullWidth
                    multiline
                    rows={3}
                    style={{ backgroundColor: "#F1F5F9" }}
                    value={additionalNotes}
                    onChange={this.handleAdditionalNotesChange}
                  />
                  <FormHelperText
                    style={{ position: "absolute", bottom: "0", right: "10" }}
                  >
                    {100 - additionalNotes.length} characters left
                  </FormHelperText>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"} style={{ columnGap: "12px" }} width={"100%"}>
              <Button
                variant="outlined"
                fullWidth
                data-testID="cancelButton"
                style={{
                  ...webStyle.buttonStyle,
                  borderColor: "#5D5D5D",
                  textTransform: "none",
                }}
                onClick={this.handleCancelClick}
              >
                <Typography style={webStyle.buttonTypography}>
                  Cancel
                </Typography>
              </Button>
              <Button
                variant="contained"
                fullWidth
                disabled={isSubmitButtonDisabled}
                style={{
                  ...webStyle.buttonStyle,
                  backgroundColor: isSubmitButtonDisabled
                    ? "#01227565"
                    : "#012275",
                  color: "#FFF",
                  textTransform: "none",
                }}
                data-testID="submitButton"
                onClick={this.handleSubmit}
              >
                <Typography style={webStyle.buttonTypography}>
                  {submitButtonText}
                </Typography>
              </Button>
            </Box>
          </Paper>
        </TrackingDetailsModal>
        {trackingDetails.length === 0 && (
          <>
            <Typography style={webStyle.tabTitle}>Tracking Details</Typography>
            <Typography style={webStyle.tabDetails}>
              You’ll be able to add the tracking details for the notary provider
              to track your documents.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              style={{
                ...webStyle.tabInsiderButton,
                textTransform: "none",
              }}
              data-testID="addTrackingDetailsButton"
              onClick={() =>
                this.setState({
                  submitButtonText: "Add Details",
                  isSubmitButtonDisabled: true,
                  isFormOpen: true,
                })
              }
            >
              <AddRounded style={{ marginRight: "8px", color: "#FFF" }} />
              <Typography style={webStyle.tabInsiderButtonTypography}>
                Add Tracking Details
              </Typography>
            </Button>
          </>
        )}
        {trackingDetails.length > 0 && (
          <>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography style={webStyle.formTitle}>
                Tracking Details
              </Typography>
              <Button
                variant="contained"
                style={{
                  borderRadius: "4px",
                  color: "#FFF",
                  padding: "10px",
                  backgroundColor: "#012275",
                  textTransform: "none",
                }}
                data-testID="addMoreButton"
                onClick={() =>
                  this.setState({
                    submitButtonText: "Add Details",
                    isSubmitButtonDisabled: true,
                    isFormOpen: true,
                  })
                }
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  style={{ gap: "4px" }}
                  alignItems={"center"}
                >
                  <AddRounded style={{ width: "24px", height: "24px" }} />
                  <Typography style={webStyle.addMoreButtonTypography}>
                    Add More
                  </Typography>
                </Box>
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ gap: "16px" }}
            >
              {trackingDetails.map(
                (detail: TrackingDetail, detailIndex: number) => (
                  <Box>
                    <Accordion
                      data-testID="detailAccordion"
                      style={{
                        backgroundColor: "#F8FAFC",
                        boxShadow: "none",
                        border: "none",
                        margin: 0,
                      }}
                      expanded={expanded === detailIndex}
                      onChange={this.handleAccordion(detailIndex)}
                    >
                      <AccordionSummary
                        style={{ border: "none" }}
                        expandIcon={
                          <ExpandMore
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "#000",
                            }}
                          />
                        }
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          style={{ gap: "8px" }}
                        >
                          <Typography
                            data-testID="trackingNumberTest"
                            style={{
                              fontFamily: "Inter",
                              fontSize: "18px",
                              fontWeight: 700,
                            }}
                          >
                            {detail.attributes.tracking_number}
                          </Typography>
                          {expanded !== detailIndex && (
                            <>
                              <Typography style={webStyle.addedByTypography}>
                                Added by
                              </Typography>
                              <Box
                                display={"flex"}
                                flexDirection={"column"}
                                style={{ gap: "8px" }}
                              >
                                <Typography
                                  style={webStyle.accordionSummaryTypography}
                                >
                                  {detail.attributes.added_by}
                                </Typography>
                                <Typography
                                  style={webStyle.accordionSummaryTypography}
                                >
                                  {new Date(
                                    detail.attributes.added_date
                                  ).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </>
                          )}
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails data-testID="accordionDetails">
                        <Box
                          width={"100%"}
                          display={"flex"}
                          flexDirection={"column"}
                          style={{ gap: "16px" }}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            width={"100%"}
                          >
                            <Box
                              display={"flex"}
                              flexDirection={"column"}
                              style={{ gap: "8px" }}
                            >
                              <Typography
                                style={webStyle.accordionDetailsTitleTypography}
                              >
                                Tracking Number
                              </Typography>
                              <Typography
                                style={webStyle.accordionDetailsValueTypography}
                              >
                                {detail.attributes.tracking_number}
                              </Typography>
                            </Box>
                            <CopyToClipboard
                              text={detail.attributes.tracking_number}
                            >
                              <FileCopyOutlinedIcon style={{ color: "#000" }} />
                            </CopyToClipboard>
                          </Box>
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "8px" }}
                          >
                            <Typography
                              style={webStyle.accordionDetailsTitleTypography}
                            >
                              Shipment Provider Name
                            </Typography>
                            <Typography
                              style={webStyle.accordionDetailsValueTypography}
                            >
                              {detail.attributes.shipment_provider_name}
                            </Typography>
                          </Box>
                          <Typography
                            style={webStyle.accordionDetailsTitleTypography}
                          >
                            Added by
                          </Typography>
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            style={{ gap: "8px" }}
                          >
                            <Typography
                              style={webStyle.accordionDetailsValueTypography}
                            >
                              {detail.attributes.added_by}
                            </Typography>
                            <Typography
                              style={webStyle.accordionDetailsValueTypography}
                            >
                              {new Date(
                                detail.attributes.added_date
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                          {detail.attributes.additional_notes && (
                            <Box
                              display={"flex"}
                              flexDirection={"column"}
                              style={{ gap: "8px" }}
                            >
                              <Typography
                                style={webStyle.accordionDetailsTitleTypography}
                              >
                                Additional Note
                              </Typography>
                              <style>
                                {`"& .innerBox": {
                                    "&::-webkit-scrollbar": {
                                      display: "none",
                                    },
                                  }`}
                              </style>
                              <Box
                                display={"flex"}
                                maxHeight={"92px"}
                                className="innerBox"
                                style={{
                                  overflowY: "auto",
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                              >
                                <Typography
                                  style={
                                    webStyle.accordionDetailsValueTypography
                                  }
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      detail.attributes.additional_notes.replace(
                                        /\n/g,
                                        "<br />"
                                      ),
                                  }}
                                />
                              </Box>
                            </Box>
                          )}
                          {this.props.email ===
                            detail.attributes.added_by_email && (
                            <Button
                              variant="contained"
                              fullWidth
                              style={{
                                ...webStyle.tabInsiderButton,
                                textTransform: "none",
                              }}
                              data-testID="editTrackingDetailsButton"
                              onClick={() =>
                                this.setState({
                                  shipmentProviderName:
                                    detail.attributes.shipment_provider_name,
                                  trackingNumber:
                                    detail.attributes.tracking_number,
                                  additionalNotes:
                                    detail.attributes.additional_notes || "",
                                  isSubmitButtonDisabled: false,
                                  submitButtonText: "Update",
                                  editTrackingDetailsId: detail.id,
                                  isFormOpen: true,
                                })
                              }
                            >
                              <EditOutlined
                                style={{ marginRight: "8px", color: "#FFF" }}
                              />
                              <Typography
                                style={webStyle.tabInsiderButtonTypography}
                              >
                                Edit
                              </Typography>
                            </Button>
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                )
              )}
            </Box>
          </>
        )}
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const CustomModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .saveModalPaper": {
    width: "90vw",
    borderRadius: "16px",
    maxHeight: "492px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px 24px 32px 24px",
    gap: "24px",
    "& .MuiTypography-body1": {
      fontSize: "36px",
      fontWeight: 600,
      fontFamily: "Inter",
    },
    "& .MuiTypography-body2": {
      fontSize: "16px",
      fontWeight: 400,
      fontFamily: "Inter",
      color: "#000",
    },
  },
  "& .imgBox": {
    width: "160px",
    height: "160px",
  },
});

const TrackingDetailsModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .trackingDetailsPaper": {
    borderRadius: "8px",
    width: "461px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px 23px",
    boxSizing: "border-box",
    gap: "24px",
    "& .MuiButton-root": {
      textTransform: "none",
      borderRadius: "8px",
      padding: "10px 16px",
      height: "auto",
    },
  },
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
      fontWeight: 400,
      color: "#011342",
      fontFamily: "Inter",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    border: "0px",
    borderRadius: "8px",
    padding: "8px 8px",
    boxSizing: "border-box",
    underline: "none",
  },
  "& .innerBox": {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const webStyle = {
  accordionDetailsTitleTypography: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
    fontColor: "#475569",
  },
  accordionDetailsValueTypography: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "16px",
    fontColor: "#1E293B",
  },
  accordionSummaryTypography: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "16px",
    color: "#1E293B",
  },
  addedByTypography: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
    color: "#64748B",
  },
  addMoreButtonTypography: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
  },
  fieldName: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    color: "#475569",
  },
  formTitle: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "18px",
    color: "#012275",
  },
  buttonStyle: {
    borderRadius: "8px",
    padding: "10px 16px",
    height: "44px",
  },
  buttonTypography: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 700,
  },
  tabInsiderButtonTypography: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    color: "#FFF",
  },
  tabTitle: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 600,
    color: "#011342",
  },
  tabDetails: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 400,
    color: "#011342",
  },
  tabInsiderButton: {
    backgroundColor: "#012275",
    borderRadius: "4px",
    padding: 0,
    height: "44px",
  },
};
// Customizable Area End
