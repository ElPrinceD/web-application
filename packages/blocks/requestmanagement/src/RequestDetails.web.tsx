// Customizable Area Start
import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";
import {  
  service,
  cancelImage,
  verified,
  emptyFolder,
  logoBlueImg,
} from "./assets";
import {
  ArrowBackIosRounded,
  VisibilityOutlined,
  DescriptionOutlined,
  Menu,
  Close,
  EventOutlined,
} from "@material-ui/icons";
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import CancelNotaryRequestModal from "../../../components/src/CancelNotaryRequestModal.web";
import RequestDetailsController, {
  FileDocumentsEntity,
  Props,
} from "./RequestDetailsController";
import Loader from "../../../components/src/Loader.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import CustomAutocomplete from "../../../components/src/CustomAutocomplete.web";
import CustomTextField from "../../../components/src/CustomTextField.web";
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import RequestModal from "./../../dashboard/src/BookNotaryRequest.web";
import SuccessFailureModal from "../../../components/src/SuccessFailureModal.web";
import KnowYourCustomerKycVerification from "../../knowyourcustomerkycverification/src/KnowYourCustomerKycVerification.web"
import "date-fns";
import DateFnsUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import TrackingDetails from "../../ordermanagement/src/TrackingDetails.web";
import DocumentList from "../../docusignintegration/src/DocumentList.web";
import Chat from "../../../../packages/blocks/chat/src/Chat.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CustomConfirmationPopupMarkComplete from "../../../components/src/CustomConfirmationPopupMarkComplete";
export const configJSON = require("./config");
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
// Customizable Area End

export default class RequestDetailsWeb extends RequestDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <HeaderTopBlock>
        <StyledIconButton data-testID="toggleButton" onClick={this.openSideBar}>
          {this.state.isSideBarOpen ? (
            <Close style={{ width: "50px", height: "56px" }} />
          ) : (
            <Menu style={{ width: "50px", height: "56px" }} />
          )}
        </StyledIconButton>
        <Box className="orderIdBoxOuter">
          <Box
            className="orderIdBox"
          >
            <Box
              height={"48px"}
              display={"flex"}
              alignItems={"center"}
              style={{ columnGap: "8px" }}
            >
              <IconButton
                onClick={this.navigateBack}
                data-testID="backIconButton"
              >
                <ArrowBackIosRounded height={"24px"} width={"24px"} />
              </IconButton>
              <Typography
                style={{
                  fontWeight: 700,
                  fontSize: "24px",
                  fontFamily: "Inter",
                  lineHeight: "32px",
                  letterSpacing: "-0.5%",
                }}
              >
                Order ID:{this.state.notaryRequestId}
              </Typography>
              <StatusBox>
                <Typography
                  className={`${this.getRequestStatusForDisplay()
                    .toLowerCase()
                    .replace(/\s/g, "")} statusBox`}
                  style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: 700,
                    lineHeight: "18px",
                  }}
                  variant="body1"
                >
                  {this.getRequestStatusForDisplay()}
                </Typography>
              </StatusBox>
            </Box>           
            <MiniHeader 
              navigation={this.props.navigation} 
              id={""}           
            />
          </Box>
        </Box>
      </HeaderTopBlock>
    );
  };

  renderMobileNavigationMenu = () => {
    return (
      <>
        {this.state.isSideBarOpen && (
          <NavigationMenu navigation={this.props.navigation} id={""} />
        )}
      </>
    );
  };

  renderCancelRequestButton = () => {
    return (
      <>
        {this.isCancelButtonShown() && (
          <Button
            data-testID="cancelButton"
            variant="contained"
            style={{
              backgroundColor: "#DC2626",
              borderRadius: "4px",
              color: "#FFF",
              padding: "0 12px",
              height: "32px",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={this.openModalForCancellation}
          >
            <Typography
              style={{
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "18px",
              }}
            >
              {(!this.isRequestInDraft() ? "CANCEL" : "DELETE") + " REQUEST"}
            </Typography>
          </Button>
        )}
      </>
    );
  };

  renderMakeQuoteAndDeclineButton = () => {
    return (
      <>
        {this.areMakeQuoteAndDeclineButtonsShown() && (
          <Box
            mt={"8px"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Box
              mx={"24px"}
              display={"flex"}
              style={{ columnGap: "12px" }}
              width={"100%"}
            >
              <Button
                variant="outlined"
                fullWidth
                style={{
                  ...webStyle.buttonStyle,
                  borderColor: "#FF0000",
                  color: "#FF0000",
                  textTransform: "none",
                }}
                data-testID="openDeaclineQuoteModal"
                onClick={this.openDeclineModal}
              >
                <Typography style={webStyle.buttonTypography}>
                  Decline
                </Typography>
              </Button>
              <Button
                variant="contained"
                fullWidth
                style={{
                  ...webStyle.buttonStyle,
                  backgroundColor: "#012275",
                  color: "#FFF",
                  textTransform: "none",
                }}
                data-testID="openMakeQuoteModal"
                onClick={this.toggleIsMakeQuoteModalOpen}
              >
                <Typography style={webStyle.buttonTypography}>
                  Submit Quote
                </Typography>
              </Button>
            </Box>
          </Box>
        )}
      </>
    );
  };

  renderCancelQuoteButton = (quoteStatusId: number, quoteId: string) => {
    return (
      <>
        {this.isQuoteSubmitted(quoteStatusId) && (
          <Button
            data-testID="cancelQuoteButton"
            variant="contained"
            style={{
              backgroundColor: "#DC2626",
              borderRadius: "4px",
              color: "#FFF",
              padding: "12px",
              width: "156px",
              height: "44px",
              textTransform: "none",
            }}
            onClick={() =>
              this.openModal(
                "Are you sure you want to withdraw this quote?",
                quoteId
              )
            }
          >
            <Typography
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              Cancel
            </Typography>
          </Button>
        )}
      </>
    );
  };

  renderNullQuotesMessage = () => {
    return (
      <>
        {this.isQuotesNullForEndUser() && (
          <Box data-testID={"noQuotesMessage"} p={"24px"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ rowGap: "14px" }}
              alignItems={"center"}
            >
              <Box p={"16px"}>
                <img src={emptyFolder} />
              </Box>
              <Typography style={webStyle.tabTitle}>No Quotes yet</Typography>
              <Box maxWidth={"329px"}>
                <Typography style={webStyle.kycInfoText} align="center">
                  stay calm you'll get one very soon
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  };

  renderNotes = () => {
    if (this.isRequestStatusInInvite()) {
      return (
        <>
          <span 
            data-testID="invite-note"
            style={{ color:"#011342" }}
          >
            <b style={{fontWeight:500}}>Note:</b> In order to preview and make payments for the quote, you need to accept the invite request first. Once accepted, you will be able to proceed with the necessary actions.
          </span>
        </>
      );
    }  
    if (this.isRequestStatusInRejected()) {
      return (
        <>
          <span 
            data-testID="rejected-note"
            style={{ color:"#011342" }}
          >
            <b style={{fontWeight:500}}>Note:</b> This request has already been rejected. As a result, you will not be able to preview the details or make payments for the quote.
          </span>
        </>
      );
    }      
  };

  renderQuotesForEndUser = () => {
    return (
      <>
        {this.areQuotesAvailableForEndUser() &&
          this.state.quotes.map((quote, quoteIndex: number) => (
            <div key={quoteIndex}>
              <Box
                p={"24px"}
                display={"flex"}
                flexDirection={"column"}
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: "8px",
                  gap: "16px",
                }}
              >
                <Typography style={webStyle.quoteTitle}>
                  Quote #{quoteIndex + 1}
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box
                      display={"flex"}
                      width={"90%"}
                      flexDirection={"column"}
                      style={{ gap: "4px" }}
                    >
                      <Typography style={webStyle.quoteDetailTypography1}>
                        Notary Service:
                      </Typography>
                      <Typography data-testID="service-name" style={webStyle.quoteDetailTypography2}>
                        {this.state.typeOfNotaryService}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box
                      display={"flex"}
                      width={"90%"}
                      flexDirection={"column"}
                      style={{ gap: "4px" }}
                    >
                      <Typography style={webStyle.quoteDetailTypography1}>
                        Notary Date & Time:
                      </Typography>
                      <Typography style={webStyle.quoteDetailTypography2}>
                        {this.getQuoteDateTime(quote.attributes.start_time)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      style={{ gap: "4px" }}
                    >
                      <Typography style={webStyle.quoteDetailTypography1}>
                        Fees:
                      </Typography>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Typography style={webStyle.quoteDetailTypography1}>
                          Notary Fees:
                        </Typography>
                        <Typography style={webStyle.quoteDetailTypography1}>
                          £{parseFloat(quote.attributes.notary_fees).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Typography style={webStyle.quoteDetailTypography1}>
                          Platform Fees:
                        </Typography>
                        <Typography style={webStyle.quoteDetailTypography1}>
                          +£
                          {parseFloat(quote.attributes.platform_fees).toFixed(
                            2
                          )}
                        </Typography>
                      </Box>
                      <Box
                        data-testID="requestVat"
                        display={"flex"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Typography style={webStyle.quoteDetailTypography1}>
                          Vat Fees:
                        </Typography>
                        <Typography style={webStyle.quoteDetailTypography1}>
                          +£{parseFloat(quote.attributes.vat_fee).toFixed(2)}
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Typography style={webStyle.quoteDetailTypography2}>
                          Total:
                        </Typography>
                        <Typography style={webStyle.quoteDetailTypography2}>
                          £
                          {(parseFloat(quote.attributes.total_fee)).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box width={"100%"} display={"flex"} justifyContent={"end"}>
                  {!this.isRequestStatusInInvite() && !this.isRequestStatusInRejected() && 
                     <Button
                     variant="contained"
                     style={{
                       ...webStyle.tabInsiderButton,
                       textTransform: "none",
                       width: "156px",
                     }}
                     data-testID="previewQuoteButton"
                     onClick={() => this.previewQuote(quote, quoteIndex + 1)}
                   >
                     <Typography style={webStyle.tabInsiderButtonTypography}>
                       Preview
                     </Typography>
                   </Button>
                  }                       
                  {this.renderNotes()}                            
                </Box>
              </Box>
            </div>
          ))}
      </>
    );
  };

  renderQuotesForNotaryUser = () => {
    return (
      <>
        {this.areQuotesAvailableForNotaryUser() &&
          this.state.quotes.map((quote, quoteIndex: number) => (
            <div key={quoteIndex}>
              <Box
                p={"24px"}
                display={"flex"}
                flexDirection={"column"}
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: "8px",
                  gap: "16px",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  style={{ rowGap: "16px" }}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ rowGap: "4px" }}
                  >
                    <Typography style={webStyle.quoteDetailTypography1}>
                      Quote Date:
                    </Typography>
                    <Typography style={webStyle.quoteDetailTypography2}>
                      {this.formNotaryRequestDate()}
                    </Typography>
                  </Box>
                  {this.renderCancelQuoteButton(
                    quote.attributes.quote_statuses_id,
                    quote.id
                  )}
                  {!this.isQuoteSubmitted(
                    quote.attributes.quote_statuses_id
                  ) && (
                    <Box width={"123px"}>
                      <StatusBox width={"90px"}>
                        <Typography
                          className={`cancelled statusBox`}
                          style={{
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: 700,
                            lineHeight: "18px",
                          }}
                          variant="body1"
                        >
                          Withdrawn
                        </Typography>
                      </StatusBox>
                    </Box>
                  )}
                </Box>
                <Divider style={{ color: "#CBD5E1" }} />
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ rowGap: "4px" }}
                  >
                    <Typography style={webStyle.quoteDetailTypography1}>
                      Start time & end time
                    </Typography>
                    <Typography style={webStyle.quoteDetailTypography2}>
                      {this.getQuoteMeetTime(
                        quote.attributes.start_time,
                        quote.attributes.end_time
                      )}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    width={"160px"}
                    flexDirection={"column"}
                    style={{ rowGap: "4px" }}
                  >
                    <Typography style={webStyle.quoteDetailTypography1}>
                      Fees:
                    </Typography>
                    <Typography style={webStyle.quoteDetailTypography2}>
                      £{parseFloat(quote.attributes.notary_fees).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
      </>
    );
  };

  renderMeetingTab = () => {
    return (
      <>
        {this.state.meetingStartTime && this.state.meetingEndTime ? (
          <Box
            p={"24px"}
            display={"flex"}
            flexDirection={"column"}
            style={{
              borderRadius: "8px",
              gap: "16px",
            }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ gap: "24px" }}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  style={{ gap: "8px" }}
                >
                  <NotesOutlinedIcon
                    style={{
                      color: "#475569",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <Typography style={webStyle.meetingText}>
                    Renotary Meeting
                  </Typography>
                </Box>
                <IconButton style={{ padding: "8px" }}>
                  <Badge
                    color="secondary"
                    data-testID="unReadMessageCount"
                    badgeContent={this.state.unReadMessageCount}
                    invisible={this.state.openChatModal || !this.state.unReadMessageCount}
                  >
                  <MessageOutlinedIcon
                    style={{
                      color: "#3D4754",
                      width: "24px",
                      height: "24px",
                    }}
                    onClick={this.handleChatButton}
                  />
                  </Badge>
                </IconButton>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box display={"flex"} style={{ columnGap: "4px" }}>
                  <EventOutlined
                    style={{
                      width: "18px",
                      height: "18px",
                      color: "#475569",
                    }}
                  />
                  <Typography style={webStyle.meetingDetails} data-testID="meetingDateTime">
                    {this.findMeetDateTime()}
                  </Typography>
                </Box>
                <Box display={"flex"} style={{ columnGap: "2px" }}>
                  <LocationOnOutlinedIcon
                    style={{
                      color: "#475569",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  <Typography style={webStyle.meetingDetails}>
                    Zoom Call
                  </Typography>
                </Box>
              </Box>
            </Box>
            {this.isRequestStatusInProgress() && (
              <>
                <Box
                  display={"flex"}
                  style={{ columnGap: "8px" }}
                  py={"12px"}
                  borderTop={"1px solid #CBD5E1"}
                >
                  <CheckBoxIcon fontSize="medium" style={{ color: "#011342" }} />
                  <Typography style={webStyle.meetingDetails}>
                    Notify 15 mins before meeting
                  </Typography>
                </Box>
                
                <Box display={"flex"} justifyContent={"end"}>
                  <Button
                    variant="contained"
                    style={{
                      ...webStyle.tabInsiderButton,
                      textTransform: "none",
                      width: "324px",
                    }}
                    data-testID="joinMeetingButton"
                    onClick={() => this.setIsMeetingModalOpen(true)}
                  >
                    <Typography style={webStyle.tabInsiderButtonTypography}>
                      Join Meeting
                    </Typography>
                  </Button>
                  </Box>
              </>
            )}
          </Box>
         
        ) : <Box
        display={"flex"}
        flexDirection={"column"}
        p={"24px"}
        style={{ rowGap: "16px" }}
      >
        <Typography style={webStyle.tabTitle}>
          Renotary Meeting
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          style={{ rowGap: "14px" }}
          alignItems={"center"}
        >
          <Box p={"16px"}>
            <img src={verified} />
          </Box>
          <Typography style={webStyle.tabTitle}>
            No Meetings
          </Typography>
          <Box maxWidth={"329px"}>
            <Typography
              style={webStyle.kycInfoText}
              align="center"
            >
              You don't have any meeting scheduled for this notary request
            </Typography>
          </Box>
        </Box>
      </Box>}
      </>
    );
  };

  renderDescriptionBox = () => {
    return (
      <>
        {this.state.description !== "" && (
          <Box
            p={"24px"}
            display={"flex"}
            flexDirection={"column"}
            style={{
              borderRadius: "8px",
              backgroundColor: "#FFF",
              rowGap: "16px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "16px",
                color: "#012275",
                lineHeight: "22px",
              }}
            >
              Description
            </Typography>
            <Typography
              style={{
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#011342",
              }}
            >
              {this.state.description}
            </Typography>
          </Box>
        )}
      </>
    );
  };

  renderOrderReceiptDetailsBox = () => {
    return (
      <OrderReceiptDetailsBox>
      <Box className="mainOrderReceipt">
        <Typography className="OrderText"> Order Receipt </Typography>
        <Box style={{ display: "inline-table"}}>
          <IconButton
            style={{ padding: "10px" }}
            data-testID="invoiceViewButton"
            onClick={() => {
              this.navigateToDocumentOpener(this.state.notaryInvoiceDetails?.invoice as string);
            }}
          >
            <VisibilityOutlined className="iconDesign" />
          </IconButton>
            <IconButton
              style={{ padding: "10px" }}
              data-testID="invoiceDownloadButton"
              onClick={() => {
                this.handleDownload(
                  this.state.notaryInvoiceDetails?.invoice as string,
                  `invoice_${this.state.notaryRequestId}`
                );
              }}
            >
            <GetAppOutlinedIcon className="iconDesign" />
          </IconButton>
        </Box>
      </Box>

      {this.state.notaryInvoiceDetails && <Box className="OrderReceiptSection">
      {this.renderReceiptRow(this.isEndUser() ? "Notary Name:" : "Customer Name:", `${this.state.notaryInvoiceDetails.notary_name}`)}
      {this.renderReceiptRow("Amount:", `£${this.state.notaryInvoiceDetails.amount}`,)}
      {this.renderReceiptRow("Platform Fee:", `£${this.state.notaryInvoiceDetails.platform_fee}`)}
      {this.state.notaryInvoiceDetails.vat > 0 && this.renderReceiptRow("VAT:", `£${this.state.notaryInvoiceDetails.vat}`)}
        <Box display="flex" justifyContent="space-between" style={{ lineHeight: "24px", fontWeight: "600" }}>
          <Typography className="ReceiptAmount">Total Amount:</Typography>
           <Typography className="ReceiptAmount">£{this.state.notaryInvoiceDetails.total_amount}</Typography>
        </Box>
      </Box> }
      </OrderReceiptDetailsBox>
    );
  };
  
  
  renderReceiptRow = (label: string, value: string) => (
    <Box display="flex" justifyContent="space-between" style={{ lineHeight: "24px" }}>
      <Typography className="OrderReceiptLabel">{label}</Typography>
      <Typography className="ReceiptLabelValue">{value}</Typography>
    </Box>
  );
  

  renderStartTime = (startTime: Date | null) => {
    return (
      !startTime && (
        <span>
          Start time <span style={{color: "red"}}>*</span>
        </span>
      )
    );
  };

  renderEndTime = (endTime: Date | null) => {
    return (
      !endTime && (
        <span>
          End time <span style={{color: "red"}}>*</span>
        </span>
      )
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    const TabPanel = (props: TabPanelProps) => {
      const { children, value, index, ...other } = props;
     
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {children}
        </div>
      );
    };
    const {isComesFromCompletedModal,status} = this.state;
    return (
      
      <>
        <Loader loading={this.state.loader} />
      <CancelNotaryRequestModalOuter>      
          <CancelNotaryRequestModal
          data-testID="cancelNotaryModal"
          titleText={ this.state.status !== "DRAFT" ? "Confirm Cancellation" : "Confirm Deletion"}
          text={this.state.cancelReqModalTitle}
          subText={this.findSubtext()}
          cancelImage={cancelImage}
          cancelReqModal={this.state.cancelReqModal}
          handleYesButtonClick={this.yesButtonClick}
          handleNoButtonClick={this.noButtonClick}
          yesBtnText="Yes"
        />
        </CancelNotaryRequestModalOuter>
        <RequestModal
          id={""}
          navigation={undefined}
          isOpen={this.state.modalOpen}
          closeModal={this.closeBookNotaryRequestModal}
          data-testID="modalOpen"
          serviceData={this.state.serviceData}
          allRequestAPI={() => {}}
          cancelReqModal={this.state.cancelBookNowReqModal}
          yesButtonClick={this.bookNowYesButtonClick}
          noButtonClick={this.bookNowNoButtonClick}
          setLoader={this.setLoader}
          setModal={this.setBookNowModal}
          backToEditRequest={() => {}}  
          editRequest={undefined}
          isNewRequestOrEditRequestOrInviteClient={"new"}
        />
        <MakeQuoteModal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={this.state.isMakeQuoteModalOpen}
        >
          <Paper elevation={0} className="makeQuoteModalPaper">
            <Box
              width={"568px"}
              alignItems={"center"}
              display={"flex"}
              flexDirection={"column"}
              style={{ rowGap: "32px" }}
            >
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pb={"8px"}
                borderBottom={"1px solid #CBD5E1"}
              >
                <Typography style={webStyle.quotationHeading}>
                  Quotation
                </Typography>
                <Box p={"10px"}>
                  <IconButton
                    style={{ padding: 0 }}
                    data-testID="closeMakeQuoteModal"
                    onClick={this.closeMakeQuoteModal}
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
              </Box>
              <Box
                display={"flex"}
                className="innerBox"
                width={"536px"}
                flexDirection={"column"}
                maxHeight={"calc(100vh - 300px)"}
                style={{
                  rowGap: "24px",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <Box
                  display={"flex"}
                  width={"100%"}
                  flexDirection={"column"}
                  style={{ gap: "4px" }}
                >
                  <Typography style={webStyle.fieldTitle}>
                    Choose meeting time <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Box display={"flex"} style={{ gap: "16px" }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Box>
                        <KeyboardTimePicker
                          open={this.state.isStartTimePickerOpen}
                          data-testID={"startTimePicker"}
                          value={this.state.startTime}
                          onClose={() =>
                            this.setState({ isStartTimePickerOpen: false })
                          }
                          TextFieldComponent={() => {
                            return (
                              <TextField
                                data-testId="startTime"
                                fullWidth
                                InputProps={{
                                  style: { color: "#011342" },
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <TimerOutlinedIcon
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
                                  this.state.startTime
                                )}
                                value={this.findTimeValue(this.state.startTime)}
                              />
                            );
                          }}
                          onChange={this.handleStartTimeChange}
                        />
                      </Box>
                      <Box>
                      <KeyboardTimePicker
                          open={this.state.isEndTimePickerOpen}
                          data-testID={"endTimePicker"}
                          value={this.state.endTime}
                          onClose={() =>
                            this.setState({ isEndTimePickerOpen: false })
                          }
                          TextFieldComponent={() => {
                            return (
                              <TextField
                                data-testId="endTime"
                                fullWidth
                                InputProps={{
                                  style: { color: "#011342" },
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <TimerOutlinedIcon
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
                                label={this.renderEndTime(
                                  this.state.endTime
                                )}
                                value={this.findTimeValue(this.state.endTime)}
                              />
                            );
                          }}
                          onChange={this.handleEndTimeChange}
                        />
                      </Box>
                    </MuiPickersUtilsProvider>
                  </Box>
                  <Typography
                    data-testID="timeErrorText"
                    style={webStyle.errorText}
                  >
                    {this.state.timeErrorText}
                  </Typography>
                </Box>
                <Box
                  width={"100%"}
                  display={"flex"}
                  alignItems={"start"}
                  style={{ columnGap: "8px" }}
                >
                  {this.state.isVideoCallChecked ? (
                    <IconButton
                      onClick={this.toggleIsVideoCallChecked}
                      style={{ padding: 0 }}
                    >
                      <CheckBoxIcon fontSize="medium" style={{ color: "#011342" }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      data-testID={"videoCallButton"}
                      style={{ padding: 0 }}
                      onClick={this.toggleIsVideoCallChecked}
                    >
                      <CheckBoxOutlineBlankIcon
                        data-testID={"videoCallUnchecked"}
                        fontSize="medium"
                        style={{ color: this.findVideoCallCheckboxColor() }}
                      />
                    </IconButton>
                  )}
                  <Box
                    flexDirection={"column"}
                    display={"flex"}
                    style={{ gap: "4px" }}
                  >
                    <Typography
                      style={{
                        ...webStyle.checkBoxTitle,
                        color: this.findVideoCallColor(),
                      }}
                    >
                      Video call required{" "}
                      {this.isVideoCallAsteriskShown() && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </Typography>
                    <Typography
                      style={{
                        ...webStyle.checkBoxSubtitle,
                        color: this.findVideoCallColor(),
                      }}
                    >
                      I understand that I am requesting remote digital
                      notarisation. I will need to have audio/video capability
                      for the actual signing.
                    </Typography>
                  </Box>
                </Box>
                <Box
                  width={"100%"}
                  flexDirection={"column"}
                  display={"flex"}
                  style={{ gap: "12px" }}
                >
                  <Box
                    flexDirection={"column"}
                    width={"100%"}
                    display={"flex"}
                    style={{ gap: "4px" }}
                  >
                    <Typography style={webStyle.fieldTitle}>
                      Your Fees <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Box
                      display={"flex"}
                      width={"100%"}
                      style={{ gap: "12px" }}
                    >
                      <Box width={"80px"}>
                        <CustomAutocomplete
                          options={["£"]}
                          value={"£"}
                          onChange={undefined}
                          label={""}
                          isAsteriskShown={false}
                          disabled={true}
                          border="1px solid #CBD5E1"
                          labelColor="#011342"
                        />
                      </Box>
                      <CustomTextField
                        placeholder={"Enter your fees"}
                        onChange={this.handleFeesChange}
                        data-testID={"feesField"}
                        value={this.state.fees}
                        borderColor={"#CBD5E1"}
                        isAsteriskShown={true}
                        type={"tel"}
                        endAdornment={
                          <InputAdornment position="end">
                            <PaymentOutlinedIcon
                              style={{
                                color: "#011342",
                                width: "24px",
                                height: "24px",
                              }}
                            />
                          </InputAdornment>
                        }
                      />
                    </Box>
                    <Typography style={webStyle.errorText}>
                      {this.state.feesErrorText}
                    </Typography>
                  </Box>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    alignItems={"start"}
                    style={{ columnGap: "8px" }}
                  >
                    {this.state.isVATChecked ? (
                      <IconButton
                        onClick={this.toggleIsVATChecked}
                        style={{ padding: 0 }}
                      >
                        <CheckBoxIcon
                          fontSize="medium"
                          style={{ color: "#011342" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ padding: 0 }}
                        data-testID={"platformFeesButton"}
                        onClick={this.toggleIsVATChecked}
                      >
                        <CheckBoxOutlineBlankIcon
                          data-testID={"platformFeesUnchecked"}
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
                      <Typography style={webStyle.checkBoxTitle}>
                        Including VAT
                      </Typography>
                      <Typography style={webStyle.checkBoxSubtitle}>
                        Tick the check box if your fees includes VAT
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  style={{ gap: "4px" }}
                  width={"100%"}
                >
                  <Typography style={webStyle.fieldTitle}>
                    Message(optional)
                  </Typography>
                  <Box className="fieldBox" position={"relative"}>
                    <TextField
                      className="textField"
                      data-testID="messageField"
                      fullWidth
                      multiline
                      rows={4}
                      value={this.state.message}
                      onChange={this.handleMessageChange}
                    />
                    <FormHelperText
                      style={{ position: "absolute", bottom: "0", right: "10" }}
                    >
                      {500 - this.state.message.length} characters left
                    </FormHelperText>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              width={"398px"}
              height={"44px"}
              display={"flex"}
              style={{ columnGap: "12px" }}
            >
              <Button
                variant="outlined"
                fullWidth
                data-testID={"makeQuoteDeclineButton"}
                style={{
                  borderColor: "#FF0000",
                  color: "#FF0000",
                }}
                onClick={this.closeMakeQuoteModal}
              >
                <Typography style={webStyle.buttonTypography}>
                  Decline
                </Typography>
              </Button>
              <Button
                variant="contained"
                data-testID="submitQuoteButton"
                fullWidth
                style={{
                  backgroundColor: this.findSubmitButtonBackgroundColor(),
                  color: "#FFF",
                }}
                disabled={this.state.isSubmitQuoteButtonDisabled}
                onClick={this.handleSubmitQuote}
              >
                <Typography style={webStyle.buttonTypography}>
                  Submit
                </Typography>
              </Button>
            </Box>
          </Paper>
        </MakeQuoteModal>
        <SuccessFailureModal
          data-testID={"successFailureModal"}
          image={this.state.successFailModalImage}
          isOpen={this.state.isSuccessFailModalOpen}
          text={this.state.successFailModalText}
          textColor={this.state.successFailModalTextColor}
          subText={this.state.successFailModalSubText}
          subText2={this.state.successFailModalSubText2}
          handleButtonClick={this.handleSuccessFailureModalButtonClick}
          buttonText={this.state.successFailModalButtonText}
          modalWidth="472px"
        />
        <PreviewQuoteModal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          data-testID="previewQuoteModal"
          open={this.state.isPreviewQuoteModalOpen}
        >
          <Paper elevation={0} className="previewQuoteModalPaper">
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={"8px"}
              borderBottom={"1px solid #CBD5E1"}
            >
              <Typography style={webStyle.quoteHeading}>
                Quote #{this.state.quotePreviewIndex}
              </Typography>
              <Box p={"10px"}>
                <IconButton
                  style={{ padding: 0 }}
                  data-testID="closePreviewQuoteModal"
                  onClick={this.closePreviewQuote}
                >
                  <Close
                    style={{ width: "24px", height: "24px", color: "#011342" }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              maxHeight={"calc(100vh - 300px)"}
              flexDirection={"column"}
              className="innerBox"
              style={{
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <Box
                    display={"flex"}
                    width={"90%"}
                    flexDirection={"column"}
                    style={{ gap: "4px" }}
                  >
                    <Typography style={webStyle.quoteDetailTypography1}>
                      Date:
                    </Typography>
                    <Typography style={webStyle.quoteDetailTypography2}>
                      {this.formNotaryRequestDate()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <Box
                    display={"flex"}
                    width={"90%"}
                    flexDirection={"column"}
                    style={{ gap: "4px" }}
                  >
                    <Typography style={webStyle.quoteDetailTypography1}>
                      Time:
                    </Typography>
                    <Typography style={webStyle.quoteDetailTypography2}>
                      {this.getQuoteTime()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ gap: "4px" }}
                  >
                    <Typography style={webStyle.quoteDetailTypography1}>
                      Fees:
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Typography style={webStyle.quoteDetailTypography1}>
                        Notary Fees:
                      </Typography>
                      <Typography style={webStyle.quoteDetailTypography1}>
                        £{this.state.quoteNotaryFees}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Typography style={webStyle.quoteDetailTypography1}>
                        VAT:
                      </Typography>
                      <Typography style={webStyle.quoteDetailTypography1}>
                        +£{this.state.quoteVATFees}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Typography style={webStyle.quoteDetailTypography1}>
                        Vat Fees:
                      </Typography>
                      <Typography style={webStyle.quoteDetailTypography1}>
                        +£{this.state.vat_fee}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Typography style={webStyle.quoteDetailTypography2}>
                        Total:
                      </Typography>
                      <Typography style={webStyle.quoteDetailTypography2}>
                        £{this.state.finalTotalWithVat}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box
                display={"flex"}
                flexDirection={"column"}
                style={{ gap: "4px" }}
              >
                <Typography style={webStyle.quoteDetailTypography1}>
                  Message
                </Typography>
                <Box>
                  <style>{`
                    
                    `}</style>
                  <Box
                    display={"flex"}
                    border={"1px solid #CBD5E1"}
                    p={"10px 12px"}
                    height={"92px"}
                    className="innerBox"
                    borderRadius={"4px"}
                    style={{
                      overflowY: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <Typography
                      style={webStyle.messageTypography}
                      dangerouslySetInnerHTML={{
                        __html: this.state.quoteMessage,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Box width={"552px"} display={"flex"} style={{ gap: "12px" }}>
                <Button
                  variant="outlined"
                  fullWidth
                  style={{
                    ...webStyle.buttonStyle,
                    borderColor: "#5D5D5D",
                    color: "#000A34",
                    textTransform: "none",
                  }}
                  onClick={this.closePreviewQuote}
                >
                  <Typography style={webStyle.buttonTypography}>
                    Cancel
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    ...webStyle.buttonStyle,
                    backgroundColor: "#012275",
                    color: "#FFF",
                    textTransform: "none",
                  }}
                  data-testID="payNowButton"
                  onClick={this.redirectToPaymentOptions}
                >
                  <Typography style={webStyle.buttonTypography}>
                    Pay Now
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Paper>
        </PreviewQuoteModal>

        
        <ZoomMeetingModal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          data-testID="zoomMeetingModal"
          open={this.state.isZoomModalOpen}
        >
          <Paper elevation={0} className="zoomMeetingModalPaper">
            <Box
              display={"flex"}
              mt={"8px"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box height={"62px"} display={"flex"} justifyContent={"center"}>
                <img src={logoBlueImg} width={"auto"} height={"42px"} />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                style={{ rowGap: "8px" }}
              >
                <Typography align="center" style={webStyle.zoomModalText}>
                  Click <b>Allow</b> on the dialog shown by your browser
                  <br />
                  If you don't see a dialog, click <b>Launch Meeting</b> below
                </Typography>
                <Typography align="center" style={webStyle.zoomModalText2}>
                  By joining a meeting, you agree to our{" "}
                  <span style={{ color: "#1A73E8" }}>Terms of Service</span> and{" "}
                  <span style={{ color: "#1A73E8" }}>Privacy Statement</span>
                </Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              mb={"16px"}
              justifyContent={"center"}
              style={{ columnGap: "12px" }}
            >
              <Button
                variant="outlined"
                data-testID="zoomModalCancelButton"
                style={{
                  ...webStyle.tabInsiderButton,
                  backgroundColor: "#FFF",
                  borderColor: "#5D5D5D",
                  color: "#5D5D5D",
                  textTransform: "none",
                  width: "193px",
                }}
                onClick={() => this.setIsMeetingModalOpen(false)}
              >
                <Typography style={webStyle.buttonTypography}>
                  Cancel
                </Typography>
              </Button>
              <Button
                variant="contained"
                style={{
                  ...webStyle.tabInsiderButton,
                  textTransform: "none",
                  width: "193px",
                }}
                data-test-id="launchMeetingButton"
                onClick={this.navigateToMeeting}
              >
                <Typography style={webStyle.tabInsiderButtonTypography}>
                  Launch Meeting
                </Typography>
              </Button>
            </Box>
          </Paper>
        </ZoomMeetingModal>

        
        <Box display={"flex"} className="test1">
          <DesktopDrawerBox>
            <NavigationMenu navigation={this.props.navigation} id={""} data-testID="sidebar" />
          </DesktopDrawerBox>
          <MobileTabletDrawerBox>
            {this.renderMobileNavigationMenu()}
          </MobileTabletDrawerBox>
          <MainBox
            height={"100vh"}
            overflow={"auto"}
            width={this.findMainBoxWidth()}
            style={{ backgroundColor: "#F9F9F9",marginTop:"25px" }}
          >
            {this.Header()}
            <MainContentBox mt={"32px"} mx={"27px"}>
              <LeftSideBox
                display={"flex"}
                flexDirection={"column"}
                style={{ rowGap: "24px", alignSelf: "flex-start" }}
                width={"60%"}
                mr={"27px"}
              >
                <Box
                  p={"24px"}
                  display={"flex"}
                  flexDirection={"column"}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "#FFF",
                    rowGap: "24px",
                  }}
                >
                  <Box
                    className="topButtonBlock"
                  >
                    <Box
                      display={"flex"}
                      style={{ columnGap: "12px" }}
                      alignItems={"center"}
                    >
                      <img
                        style={{ borderRadius: "50%", backgroundColor: "red" }}
                        src={service}
                        width="32px"
                        height="32px"
                        alt="profile_pic"
                      />
                      <Typography
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "21px",
                          color: "#0131A8",
                        }}
                      >
                        Request Details
                      </Typography>
                    </Box>
                    {(this.state.status.toLowerCase() === "in progress") && 
                      this.state.isKYCCompleted && 
                      this.showMarketAsCompleteButton() && 
                      !this.isEndUser() &&
                      (<Box>
                      <Button  data-test-id="openCompleteID"onClick={() => this.openModalForCompilation()} variant="contained" startIcon={<DoneAllIcon/>} style={{
                        backgroundColor: "#059669",
                        color: "#ffffff",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        textAlign: "center"
                      }}>Mark Completed</Button>
                    </Box>)
                    }
                 {this.state.status.toLowerCase() !== "in progress" && 
  this.renderCancelRequestButton()
                   }
                  </Box>
                  <Grid container style={{ rowGap: "24px" }}>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <Box pr={"16px"}>
                        <Typography style={webStyle.detailKey}>
                          Type of notary service:
                        </Typography>
                        <Typography data-testID="service-name" style={webStyle.detailValue}>
                          {this.state.typeOfNotaryService}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <Box pr={"16px"}>
                        <Typography style={webStyle.detailKey}>
                          Method of notarisations:
                        </Typography>
                        <Typography  data-testID="notarisation-method" style={webStyle.detailValue}>
                          {this.state.notarisationMethod}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <Box pr={"16px"}>
                        <Typography style={webStyle.detailKey}>
                          Number of Documents:
                        </Typography>
                        <Typography style={webStyle.detailValue}>
                          {this.state.documents.length}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <Box pr={"16px"}>
                        <Typography style={webStyle.detailKey}>
                          Notary Date:
                        </Typography>
                        <Typography
                          style={{
                            ...webStyle.detailValue,
                            color: this.findDateColor(),
                          }}
                          data-testID="notary-date"
                        >
                          {this.findNotaryDateSession()}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <Box pr={"16px"}>
                        <Typography style={webStyle.detailKey}>
                          Jurisdiction:
                        </Typography>
                        <Typography style={webStyle.detailValue}>
                          {this.state.jurisdiction}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <Box pr={"16px"}>
                        <Typography style={webStyle.detailKey}>
                          Number of signatory:
                        </Typography>
                        <Typography style={webStyle.detailValue}>
                          {this.state.numberOfSignatory}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                {this.renderMakeQuoteAndDeclineButton()}
                {this.areTabsShown() && (
                  <Box style={{ borderRadius: "8px", backgroundColor: "#FFF" }}>
                    <AppBar
                      className="tabChange"
                      position="static"
                      style={{ backgroundColor: "#F9F9F9", boxShadow: "none" }}
                    >
                      <Tabs
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "#0131A8",
                          },
                        }}
                        variant="scrollable"
                        scrollButtons="off"
                        data-testID={"tabs"}
                        value={this.state.tabIndex}
                        onChange={this.handleTabChange}
                        aria-label="simple tabs example"
                      >
                        <Tab
                          label={this.toShowMeetingTab() ? "Meeting" : "Quotes"}
                          disabled={this.isMeetingTabDisabled()}
                          {...this.a11yProps(0)}
                          style={{
                            ...webStyle.tabHeadings,
                            textTransform: "none",
                            color: this.findTabColor(0),
                          }}
                        />
                        <Tab
                          label="Document Signing"
                          disabled={this.isDocuSignTabDisabled()}
                          {...this.a11yProps(1)}
                          style={{
                            ...webStyle.tabHeadings,
                            textTransform: "none",
                            color: this.findTabColor(1),
                          }}
                        />
                        <Tab
                          label="Tracking Details"
                          disabled={this.state.areTabsDisabled}
                          {...this.a11yProps(2)}
                          style={{
                            ...webStyle.tabHeadings,
                            textTransform: "none",
                            color: this.findTabColor(2),
                          }}
                        />
                        <Tab
                          label="KYC Verification"
                          disabled={this.state.areTabsDisabled}
                          {...this.a11yProps(3)}
                          style={{
                            ...webStyle.tabHeadings,
                            textTransform: "none",
                            color: this.findTabColor(3),
                          }}
                        />
                      </Tabs>
                    </AppBar>
                    <Box style={{ backgroundColor: "#FFF" }}>
                      <TabPanel
                        data-testID="quoteOrMeetingTab"
                        value={this.state.tabIndex}
                        index={0}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          style={{ gap: "16px" }}
                        >
                          {this.renderNullQuotesMessage()}
                          {this.renderQuotesForEndUser()}
                          {this.renderQuotesForNotaryUser()}
                          {this.toShowMeetingTab() && this.renderMeetingTab()}
                        </Box>
                      </TabPanel>
                      <TabPanel
                        data-testID="docusignTab"
                        value={this.state.tabIndex}
                        index={1}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          p={"24px"}
                          style={{
                            rowGap: "16px",
                            borderRadius: "8px",
                          }}
                        >
                          {this.state.tabIndex === 1 && (
                            <DocumentList
                              data-testID="documentList"
                              navigation={this.props.navigation}
                              id={""}
                              roleID={this.state.roleID}
                              email={this.state.email}
                            />
                          )}
                        </Box>
                      </TabPanel>
                      <TabPanel
                        data-testID="trackingDetailsTab"
                        value={this.state.tabIndex}
                        index={2}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          p={"24px"}
                          style={{ rowGap: "16px" }}
                        >
                          {this.state.tabIndex === 2 && (
                            <TrackingDetails
                              navigation={this.props.navigation}
                              id={""}
                              email={this.state.email}
                              data-testID="trackingDetails"
                            />
                          )}
                        </Box>
                      </TabPanel>
                      <TabPanel
                        data-testID="KYCVerificationTab"
                        value={this.state.tabIndex}
                        index={3}
                      >
                        {this.isEndUser() && this.state.endUserDocStatus && (
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            p={"24px"}
                            style={{ rowGap: "16px" }}
                          >
                            <Typography style={webStyle.tabTitle}>
                              KYC Request
                            </Typography>
                            <Box
                              display={"flex"}
                              flexDirection={"column"}
                              style={{ rowGap: "14px" }}
                              alignItems={"center"}
                            >
                              <Box p={"16px"}>
                                <img src={verified} />
                              </Box>
                              <Typography style={webStyle.tabTitle}>
                                No KYC verification request
                              </Typography>
                              <Box maxWidth={"329px"}>
                                <Typography
                                  style={webStyle.kycInfoText}
                                  align="center"
                                >
                                  You don't have any kyc verification request
                                  sent by your notary
                                </Typography>
                              </Box>
                            </Box>
                            
                          </Box>
                        )}
                        {this.isNotaryUser() && this.state.endUserDocStatus && (
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            p={"24px"}
                            style={{ rowGap: "16px" }}
                          >
                            <Typography style={webStyle.tabTitle}>
                              KYC Request
                            </Typography>
                            <Typography style={webStyle.tabDetails}>
                              The KYC verification helps to confirm the identity
                              and other demographics before proceeding with
                              notary to eliminate chances of fraud
                            </Typography>
                          </Box>
                        )}

                      {this.state.tabIndex === 3 && <KnowYourCustomerKycVerification onComplete={this.handleKYCCompletion} navigation={this.props.navigation} orderID={this.state.notaryRequestId} initialEndUserDocStatus={this.docStatusResultForEndUser} isEndUser={this.isEndUser()} isNotaryUser={this.isNotaryUser()}  UserProfileDetails={this.state.userProfileDetails[0]}/>}
                      </TabPanel>
                    </Box>
                  </Box>
                )}
              </LeftSideBox>
              <RightSideBox
                width={"40%"}
                display={"flex"}
                flexDirection={"column"}
                style={{ alignSelf: "flex-start", rowGap: "24px" }}
              >
                {this.renderDescriptionBox()}
                <Box
                  p={"24px"}
                  display={"flex"}
                  flexDirection={"column"}
                  style={{
                    rowGap: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#FFF",
                  }}
                >
                  
                  {this.state.documents.length > 0 &&
                    this.state.documents.map((doc: FileDocumentsEntity) => (

                        <>
                        <Typography
                          style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "#012275",
                            lineHeight: "22px",
                          }}
                        >
                          Document(s)
                        </Typography>
                          <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          style={{
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                            borderRadius: "8px",
                          }}
                          p={"8px"}
                        >
                            <Box display={"flex"} style={{ gap: "8px" }}>
                              <Box style={webStyle.documentIconBox}>
                                <DescriptionOutlined
                                  style={webStyle.documentIcon} />
                              </Box>
                              <Box>
                                <Typography style={webStyle.documentName}>
                                  {doc.doc_name}
                                </Typography>
                                <Typography style={webStyle.documentSignatories}>
                                  {this.findSignatoriesText(doc)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box display={"flex"}>
                              <IconButton
                                style={{ padding: "10px" }}
                                data-testID="viewButton"
                                onClick={() => {
                                  this.navigateToDocumentOpener(doc.doc_file_url);
                                } }
                              >
                                <VisibilityOutlined
                                  style={{
                                    color: "#012275",
                                    height: "24px",
                                    width: "24px",
                                  }} />
                              </IconButton>
                              <IconButton
                                style={{ padding: "10px" }}
                                data-testID="downloadButton"
                                onClick={() => {
                                  this.handleDownload(
                                    doc.doc_file_url,
                                    doc.doc_name
                                  );
                                } }
                              >
                                <GetAppOutlinedIcon
                                  style={{
                                    color: "#012275",
                                    height: "24px",
                                    width: "24px",
                                  }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </>
                    ))}
                </Box>
                
                {(this.state.status.toLowerCase() === "in progress" || this.state.status.toLowerCase() === "completed") && this.renderOrderReceiptDetailsBox()}


              </RightSideBox>
            </MainContentBox>
          </MainBox>
        </Box>
        <Chat 
          navigation={undefined} 
          id={""} 
          open={this.state.openChatModal} 
          onClose={this.handleChatClose} 
          notary_request_id={this.state.notaryRequestId}
          accountId={this.state.account_id}
          userProfilePic={this.state.userProfilePic}
          sendMessage={this.sendMessage}
          newReceivedMsg={this.state.newReceivedMessage}
          fullName={this.state.fullName}
          profile={this.state.profile}
        />
          {this.state.showCompletePopup && 
        <CustomConfirmationPopupMarkComplete 
        data-test-id="merkCompleteID"
        type={configJSON.warning}
        discText={configJSON.discText} 
        discText2={configJSON.discText2}
        btntext={configJSON.btnText}   
        closePopup={() => this.setState({showCompletePopup :false})} 
        submitPopup={() => this.requestMarkButtonClick()}  
      />}
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start

const HeaderTopBlock = styled(Box)({
  display:"flex",
  alignItems:"center",
  mrginTop:"32px",
  "& .orderIdBoxOuter":{
    width:"calc(100vw - 74px)",
    "@media(max-width:576px)":{
      width:"100%"
    }
  },
  "& .orderIdBox":{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    margin:"0 25px",
    "@media(max-width:576px)":{
      paddingRight:"16px",
      margin:"0",
    }
  },
  "@media(max-width:576px)":{
    flexDirection:"column",
    alignItems:"flex-start",
  }
})

const OrderReceiptDetailsBox = styled(Box)({
  borderRadius: "8px",
  backgroundColor: "#FFF",
  rowGap: "16px",
  display:"flex",
  padding:"24px",
  flexDirection:"column",

  "& .mainOrderReceipt":{
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "26px",
    color: "#012275",
    borderBottom: "1px solid #E2E8F0",
    paddingBottom: "8px",
    marginBottom: "8px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  },
  "& .OrderText":{
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "16px",
    color: "#012275",
  },
  "& .OrderReceiptSection":{
      display:"flex",
     flexDirection:"column",
     maxWidth: "100%",
     rowGap: "12px"
  },
  "& .iconDesign":{
      color: "#012275",
      height: "24px",
      width: "24px",
  },
  "& .OrderReceiptLabel":{
     fontFamily: "Inter",
     fontWeight: 500,
     fontSize: "14px",
     color: "#011342"
  },
  "& .ReceiptLabelValue":{
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "14px",
      color: "#011342"
  },
  "& .ReceiptAmount":{
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "14px",
      color: "#011342"
  }
})

const CancelNotaryRequestModalOuter = styled(Box)({
  "& .request_title":{
    fontSize: "20px !important", 
    maxWidth: "380px", 
    lineHeight:"1.25 !important",
    textAlign:"center",
    marginBottom:"14px",
    "@media(max-width:576px)":{
      fontSize: "18px !important", 
    }
  },
  "& .request_sub_text":{
    fontSize: "16px !important", 
    maxWidth: "320px",
    textAlign:"center",
    lineHeight:"1.25 !important",
    color:"#5D5D5D !important",
  },
})

const PreviewQuoteModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px",
  "& .previewQuoteModalPaper": {
    borderRadius: "8px",
    width: "607px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "24px 16px",
    boxSizing: "border-box",
    gap: "32px",
  },
  "& .messageBox": {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  "& .innerBox": {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const MakeQuoteModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .makeQuoteModalPaper": {
    borderRadius: "8px",
    width: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px 16px 32px",
    boxSizing: "border-box",
    gap: "32px",
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
    border: "1px solid #011342",
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

const ZoomMeetingModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px",
  "& .zoomMeetingModalPaper": {
    borderRadius: "8px",
    width: "100%",
    maxWidth: "607px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "24px 16px",
    boxSizing: "border-box",
    gap: "32px",
  },
});

const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const MainContentBox = styled(Box)({
  "& .topButtonBlock":{
    display: "flex",
    alignItems:"center",
    justifyContent:"space-between",
    gap:"12px",
    "@media (max-width:480px)": {
      flexDirection:"column",
      alignItems:"flex-start",
    }
  },
  "@media (min-width: 1025px)": {
    display: "flex",
  },
});

const MarkCompletedBox = styled(Box)({
  "& .completebtn": {
    backgroundColor: "#059669",
    borderRadius: "4px",
    color: "#FFF",
    padding: "0 12px",
    height: "32px",
    display: "flex",
   },
   "& .completebtnText": {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "18px",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: "7px",
   }
});


const LeftSideBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "60%",
  },
  width: "100%",
});

const RightSideBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "40%",
  },
  "@media (max-width: 1024px)": {
    marginTop: "24px",
  },
  width: "100%",
});

const MainBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "calc(100vw - 200px)",
  },
});

const DesktopDrawerBox = styled(Box)({
  "@media (max-width: 1024px)": {
    display: "none",
  },
  display: "flex",
});

const MobileTabletDrawerBox = styled(Box)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const StatusBox = styled(Box)({
  "& .completed, .inviteaccepted": {
    background: "#D1FAE5",
    color: "#059669",
  },
  "& .cancelled, .inviterejected": {
    background: "#FF000038",
    color: "#FF0000",
  },
  "& .pending, .invite, .invited": {
    background: "#F0E5FF",
    color: "#6200EA",
  },
  "& .inprogress": {
    background: "#FEF3C7",
    color: "#D97706",
  },
  "& .draft":{
    background:"#64748B",
    color:"#FFFFFF",
  },
  "& .statusBox": {
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 12px",
  },
});

const webStyle = {
  documentIconBox: {
    width: "42px",
    height: "43px",
    borderRadius: "4px",
    backgroundColor: "#0131A8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  documentIcon: {
    color: "#FFF",
    height: "24px",
    width: "24px",
  },
  kycInfoText: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 300,
    color: "#64748B",
  },
  zoomModalText: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 400,
    color: "#1E293B",
  },
  zoomModalText2: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 400,
    color: "#1E293B",
  },
  tabTitle: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 600,
    color: "#011342",
  },
  tabDetails: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 400,
    color: "#011342",
    maxWidth: "800px"
    
  },
  meetingDetails: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 400,
    color: "#475569",
  },
  meetingNoteDetails: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "16px",
    color: "#012275",
  },
  meetingText: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 600,
    color: "#011342",
  },
  buttonStyle: {
    flex: 1,
    borderRadius: "8px",
    padding: "10px 16px",
    height: "44px",
  },
  quoteHeading: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    color: "#011342",
  },
  tabInsiderButtonTypography: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
    color: "#FFF",
  },
  tabInsiderButton: {
    backgroundColor: "#012275",
    borderRadius: "4px",
    padding: 0,
    height: "44px",
  },
  quoteDetailTypography1: {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "21px",
    color: "8B91A9",
  },
  quoteDetailTypography2: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "21px",
    color: "#011342",
  },
  messageTypography: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    color: "#011342",
  },
  quoteTitle: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    color: "#011342",
  },
  errorText: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#DC2626",
  },
  documentName: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    color: "#011342",
  },
  documentSignatories: {
    fontWeight: 500,
    fontFamily: "Inter",
    fontSize: "12px",
    lineHeight: "14.52px",
    color: "#011342",
  },
  tabHeadings: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    fontFamily: "Inter",
    minWidth: "auto",
    padding: "16px 18px",
  },
  buttonTypography: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "24px",
  },
  detailKey: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#5D5D5D",
  },
  detailValue: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#011342",
  },
  quotationHeading: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "27px",
    color: "#011342",
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
  fieldTitle: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#011342",
  },
  time: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "21px",
    color: "#011342",
  },
};
// Customizable Area End
