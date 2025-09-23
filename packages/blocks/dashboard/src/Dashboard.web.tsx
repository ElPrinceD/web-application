import React from "react";
// Customizable Area Start
import { Box, Grid, Paper, Card, CardContent, Button, IconButton, Typography, styled, ClickAwayListener, Tabs, Tab, Zoom, Tooltip, Popper, ThemeProvider, createTheme } from "@material-ui/core";
import { allRequest, completeRequest, service, groupImg, progressRequest, cancelImage, outgoing } from "./assets";
import { Close, MoreVert, Link , Edit , DeleteOutlineOutlined , Done } from "@material-ui/icons";
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import AddIcon from "@material-ui/icons/Add";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SuccessFailureModal from "../../../components/src/SuccessFailureModal.web";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import Loader from "../../../components/src/Loader.web"; // TEMPORARILY REMOVED
import CancelNotaryRequestModal from "../../../components/src/CancelNotaryRequestModal.web";
import RequestModal from "./BookNotaryRequest.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import MiniHeader from "./MiniHeader.web";
import CustomFooter from "../../../components/src/CustomFooter.web";
import InviteForm from "./InviteForm.web";
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";
// Customizable Area End
import DashboardController, { Props } from "./DashboardController.web";
import Calendarr from "../../calendar/src/Calendar.web";


export default class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  

  // Customizable Area Start
  renderRequestTotal = () => {

    

    
    return (
      <MainGrid container>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
          <Paper className="requestSections" elevation={2}>
            <Box className="requestImageBox">
              <img src={allRequest} width="100%" height="100%" />
            </Box>
            <Box className="requestInfo">
              <Box className="requestTypeBox"><Typography className="requestTitle" variant="body1">All Requests</Typography></Box>
              <Typography data-testID="allRequestCount" className="requestTitle all" variant="body2">{this.standardizeRequestCounts(this.state.allRequest)}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
          <Paper className="requestSections" elevation={2}>
            <Box className="requestImageBox">
              <img src={progressRequest} width="100%" height="100%" />
            </Box>
            <Box className="requestInfo">
              <Box className="requestTypeBox"><Typography className="requestTitle" variant="body1">Requests In progress</Typography></Box>
              <Typography className="requestTitle progress" variant="body2">{this.standardizeRequestCounts(this.state.progressRequest)}</Typography>
            </Box>
          </Paper>
        </Grid>         <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
          <Paper className="requestSections" elevation={2}>
            <Box className="requestImageBox">
              <img src={completeRequest} width="100%" height="100%" />
            </Box>
            <Box className="requestInfo">
              <Box className="requestTypeBox">
                <Typography className="requestTitle" variant="body1">Completed Requests</Typography>
              </Box>
              <Typography className="requestTitle completed" variant="body2">{this.standardizeRequestCounts(this.state.completeCount)}</Typography>
            </Box>
          </Paper>
        </Grid>
          <TabBox mt={"20px"} data-testID="tabBox">
            <Tabs data-testID="tabBtn" value={this.state.tabValue} onChange={this.handleTabItemChange}>
              <Tab label="Your Requests" />
              <Tab label="Invites" />
            </Tabs>
          </TabBox>
      </MainGrid>
    );
  };

  renderRequestTotalNotary = () => {
    return (
      <MainGrid container>
        <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
          <Paper
            elevation={2}
            className="requestSections"
          >
            <Box className="requestImageBox">
              <img src={allRequest} height="100%" width="100%" />
            </Box>
            <Box className="requestInfo">
              <Box className="requestTypeBox">
                <Typography
                  variant="body1"
                  className="requestTitle">All Requests</Typography>
              </Box>

              <Typography
                data-testID="allRequestCount"
                variant="body2"
                className="requestTitle all">
                {this.countStatus()
                  ? this.standardizeRequestCounts(this.state.allRequest)
                  : "00"
                }
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
          <Paper className="requestSections" elevation={2}>
            <Box className="requestImageBox">
              <img src={progressRequest} width="100%" height="100%" />
            </Box>
            <Box className="requestInfo">
              <Box className="requestTypeBox"><Typography className="requestTitle" variant="body1">Requests In progress</Typography></Box>
              <Typography className="requestTitle progress" variant="body2">{this.standardizeRequestCounts(this.state.progressRequest)}</Typography>
            </Box>
          </Paper>
        </Grid> 
        <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
          <Paper  elevation={2} className="requestSections">
            <Box className="requestImageBox">
              <img src={completeRequest} height="100%" width="100%" />
            </Box>
            <Box className="requestInfo">
              <Box className="requestTypeBox"><Typography className="requestTitle" variant="body1">Completed Requests</Typography></Box>
              <Typography className="requestTitle completed" variant="body2">{this.standardizeRequestCounts(this.state.completeCount)}</Typography>
            </Box>
          </Paper>
        </Grid>
       <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
          <Paper className="requestSections" elevation={2}>
            <Box className="requestImageBox">
              <img src={outgoing} width="100%" height="100%" />
            </Box>
            <Box className="requestInfo">
              <Box className="requestTypeBox"><Typography className="requestTitle" variant="body1">Outgoing Requests</Typography></Box>
              <Typography className="requestTitle outgoing" variant="body2">{this.standardizeRequestCounts(this.state.outgoingCount)}</Typography>
            </Box>
          </Paper>
        </Grid> 
      </MainGrid>
    );
  };

  renderRequestTable = () => {
    const { isActionBoxActive, actionBoxIndex } = this.state;
    return (
      <MainBox style={{ height: this.isEndUser() ? "440px" : "800px" }}>
        <StyledTable>
          <thead style={{ position: "sticky", top: "0px", zIndex: 1 }}>
            <th className="tableTitle">Urgency</th>
            <th className="tableTitle">Order ID</th>
            <th className="tableTitle">Notary Services</th>
            <th className="tableTitle">Method</th>
            <th className="tableTitle">Request Date</th>
            <th className="tableTitle">Status</th>
            <th className="tableTitle">Action</th>
          </thead>
          <tbody>
            {this.state.rows?.map((rowsData, index) => (
              <tr key={index} className="dataRow">
                <td
                  align="center"
                  className={this.getUrgencyClass(rowsData.attributes.priority)}
                >
                  {this.getValuesForNullOrDraft(rowsData.attributes.priority)}
                </td>
                <td align="center">{rowsData.id}</td>
                <td align="center">
                  {this.getValuesForNullOrDraft(rowsData.attributes.notary_service_name)}
                </td>
                <td align="center">
                  <Box className="methodBox">
                    <Typography className="methodTxt">
                      {this.getNotarisationMethod(
                        rowsData.attributes.notarisation_method_id
                      )}
                    </Typography>
                    <Tooltip 
                      arrow
                      data-testID="tooltip"
                      title="Popper has the title"
                      PopperComponent={(popperProps) => (
                        <Popper {...popperProps} placement="bottom">
                          <Paper style={{ backgroundColor: 'white', padding: '8px', maxWidth: "400px", boxShadow: '0px 2px 4px rgba(0,0,0,0.2)' }}>
                            <Typography align="center" style={{fontSize: "12px", fontFamily: "Inter"}}>{this.findToolTiptext(rowsData.attributes.notarisation_method_id)}</Typography>
                          </Paper>
                          <div style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: 0,
                            width: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderBottom: '8px solid white',
                          }} />
                        </Popper>
                      )}
                      TransitionComponent={Zoom}
                      >
                      <IconButton className="infoIconBtn">
                        <InfoOutlinedIcon className="infoIcon"/>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </td>
                <td align="center">
                  <span
                    style={{
                      color: this.findDateColor(rowsData),
                    }}
                  >
                    {this.formatDate(rowsData.attributes.date)}
                  </span>
                </td>
                <td align="center">
                  <Box
                    className={`${this.getStatusClass(
                      this.getStatusForRequests(rowsData.attributes).toLowerCase()
                    )} statusBox`}
                  >
                    <Typography variant="body1">
                      {this.getStatusForRequests(rowsData.attributes).toUpperCase()}
                    </Typography>
                  </Box>
                </td>
                <td align="center" className="viewBtn">
                  <IconButton
                    data-testID="threeDots"
                    onClick={() => this.openActionBox(index)}
                  >
                    <MoreVert className="moreIcon" />
                  </IconButton>
                  {isActionBoxActive && actionBoxIndex === index && (
                      <ClickAwayListener
                        onClickAway={this.closeActionBox}
                      >
                        <ActionBox>
                          <Button
                            data-testID="getNotaryTestId"
                            onClick={() =>
                              this.navigateToRequestDetails(rowsData.id)
                            }
                            startIcon={
                              <VisibilityOutlinedIcon className="eyeIcon" />
                            }
                            className="menuBtn"
                          >
                            <Typography className="viewText">View</Typography>
                          </Button>
                          {this.isEditActionButtonShown(rowsData) && <Button
                            onClick={() =>
                              this.setIsRequestNewOrEditOrInvite(
                                "edit",
                                rowsData.id
                              )
                            }
                            startIcon={<EditOutlinedIcon className="eyeIcon" />}
                            className="menuBtn"
                            data-testID="editButton"
                          >
                            <Typography className="viewText">Edit</Typography>
                          </Button>}
                          {this.isMeetingActionButtonShown(rowsData) && <Button
                          onClick={() => this.getZoomApi(rowsData.id)}
                            startIcon={<Link className="eyeIcon" />}
                            className="menuBtn"
                            data-testID="meetLinkButton"
                          >
                            <Typography className="viewText">
                              Meeting link
                            </Typography>
                          </Button>}
                          {this.isMessageActionButtonShown(rowsData) && <Button
                            startIcon={
                              <MessageOutlinedIcon className="eyeIcon" />
                            }
                            data-test-id="messageBtn"
                            onClick={()=> this.navigateToRequestDetails(rowsData.id)}
                            className="menuBtn"
                          >
                            <Typography className="viewText">Message</Typography>
                          </Button>}
                          {this.isSubmitQuoteActionButtonShown(rowsData) && <Button
                            onClick={() =>this.navigateToRequestDetails(rowsData.id, true)}
                            startIcon={<Edit className="eyeIcon" />}
                            className="menuBtn"
                          >
                            <Typography className="viewText">Submit Quote</Typography>
                          </Button>}
                          {this.isWithdrawQuoteActionButtonshown(rowsData) && <Button
                            onClick={() =>
                              this.navigateToRequestDetails(rowsData.id)
                            }
                            startIcon={<Close className="eyeIcon" />}
                            className="menuBtn"
                          >
                            <Typography className="viewText">
                              Withdraw Quote
                            </Typography>
                          </Button>}
                          {this.isCancelActionButtonShown(rowsData) && <Button
                            data-testID="cancelNotaryRequestButton"
                            onClick={() =>
                              this.openCancelRequestModal(
                                rowsData.id,
                                rowsData.attributes.status
                              )
                            }
                            startIcon={!this.isRequestInDraft(rowsData.attributes.status) ? <Close className="eyeIcon" /> : <DeleteOutlineOutlined className="eyeIcon" />}
                            className="menuBtn"
                          >
                            <Typography className="viewText">{!this.isRequestInDraft(rowsData.attributes.status) ? "Cancel" : "Delete"}</Typography>
                          </Button>}
                          {this.isAcceptRejectActionButtomShown(rowsData) &&
                            <>
                              <Button
                                data-testID="acceptNotaryRequestButton"
                                onClick={() =>
                                  this.setIsRequestNewOrEditOrInvite(
                                    "invite",
                                    rowsData.id
                                  )
                                }
                                startIcon={<Done className="eyeIcon" />}
                                className="menuBtn"
                              >
                                <Typography className="viewText">Accept</Typography>
                              </Button>
                              <Button
                                data-testID="rejectNotaryRequestButton"
                                onClick={() =>
                                    this.rejectInvitedRequest(rowsData)
                                }
                                startIcon={<Close className="eyeIcon" />}
                                className="menuBtn"
                              >
                                <Typography className="viewText">Reject</Typography>
                              </Button>
                            </>}
                        </ActionBox>
                      </ClickAwayListener>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </MainBox>
    );
  }

  renderServices = () => {
    return (
         <NotaryMainBox>
        <Box className="notaryServiceHeading">
          <Typography variant="body1">Notary Services</Typography>
         {this.state.serviceData.length > 3 && <Box className="slideBtnBox">
            <IconButton data-test-id="handlePrevTxtId"onClick={this.handlePrev}>
              <ArrowBackIosIcon className="slideBtn" />
            </IconButton>
            <IconButton data-test-id="handleNextTxtId" onClick={this.handleNext}>
              {" "}
              <ArrowBackIosIcon className="slideBtnView" />
            </IconButton>
          </Box>}
        </Box>

        <Box className="sliderBox">
         <Slider arrows={false} ref={this.sliderRef} slidesToShow={1} variableWidth={false} infinite={false}>
              {this.state.serviceData.map((item, index) => {
                 return ( <Box
                  key={item.id}
                  maxWidth={"260px"}
                  maxHeight={"192px"}
                  padding={"16px 6px"}
                  style={{ columnGap: "30px" }}
                >
                  <Card
                  className="serviceAll"
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      height={"192px"}
                      width={"261px"}
                    >
                      <ImageCardBox>
                      <CardMediaImg
                        src={item.attributes.service_icon.url}
                        alt={`Image ${index + 1}`}
                      />
                      </ImageCardBox>
                      <CardContent>
                        <Typography className="titleBox"
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            textAlign: "center",
                            fontFamily: "Inter",
                            lineHeight: "21px",
                            color: "#011342"
                          }}
                          gutterBottom
                          variant="h5"
                          component="div"
                        >
                          {item.attributes.service_name}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Inter",
                            color: "#334155",
                            lineHeight: "18px",
                            whiteSpace: "normal",
                            height: "54px",
                            width: "220px",                            
                            textAlign: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}
                          variant="body2"
                        >
                          {item.attributes.service_description}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Box> )
              })}
            </Slider>
        </Box>
      </NotaryMainBox>
    )
  };

  renderEmpty = () => {
    const {tabValue} = this.state;
    let requestMessage;
    let content;
    let buttonText: string | undefined;
    if (this.isEndUser()) {
      if (tabValue === 0) {
        requestMessage = "No requests yet!";
        content = "Create your first notary request with renotary by clicking ‘Book Now’.";
        buttonText = "Book Now";
      } else {
        requestMessage = "No invites yet!";
        content = "Stay calm and relax. You'll receive your first invite soon";
      }
    }
    else if(this.isGuestUser()){
      requestMessage = "No requests yet!";
      content = "Create your first notary request with renotary by clicking ‘Book Now’.";
      buttonText = "Book Now";
    } 
    else {
      switch (tabValue) {
        case 0: requestMessage = "No notary requests!";
          content = "Stay calm and relax. You'll receive your first notary request soon";
          break;
        case 1: requestMessage = "No ongoing requests!";
          content = "Stay calm and relax. You'll receive your notary request soon";
          break;
        case 2: requestMessage = "No invites sent!";
          content = "Send your first invite with renotary by clicking ‘Invite Client’.";
          buttonText = "Invite Client";
          break;
      }
    }

    return (
      <EmptyBox data-testID="emptyBookNowBox">
        <Box className="imgBox">
          <img src={groupImg} alt="" width={"100%"} height="100%" />
        </Box>
        <Box className="txtBox">
          <Typography variant="body1" align="center">
            {requestMessage}{" "}
          </Typography>
          <Typography variant="body2" align="center">
            {content}
          </Typography>
        </Box>
        {buttonText && (
          <Button
            data-testID="emptyBookNow"
            className="bookBtn"
            onClick={this.onEmptyButtonClick}
          >
            <AddIcon className="addIcon" /> {buttonText}
          </Button>
        )}
      </EmptyBox>
    );
  };

  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"33px"} mb={"32px"}>
        <Box width={"100vw"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mx={"25px"}
          >
            <Box
              display={"flex"}
              height={"48px"}
              alignItems={"center"}
              style={{ columnGap: "8px" }}
            >
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "-0.5%",
                }}
              >
                Dashboard
              </Typography>
            </Box>
            <MiniHeader 
              navigation={this.props.navigation} 
              id={""} 
              allRequestAPI={this.allRequestAPI}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  renderOngoingNewRequest = () => {
    return (
      <TabBox ml={"20px"} data-testID="tabBox">
        <Tabs data-testID="tabBtn" value={this.state.tabValue} onChange={this.handleTabItemChange}>
          <Tab label="New Requests" />
          <Tab label="Ongoing Requests" />
          <Tab label="Invites"/>
        </Tabs>
      </TabBox>
    );
  };

  renderCompleteProfile = () => {
    const {isProfileCompleteData} = this.state;
    return (
      <CompleteProfileBox>
        <Box className="headBox">
          <Typography variant="body1">
          Complete your profile
          </Typography>
          <Typography variant="body2">
          By completing all the details you'll be able to receive the Notary request.
          </Typography>
        </Box>
        <ThemeProvider theme={completeProfileGridTheme}>
          <Grid container className="btnContainer">
            {!isProfileCompleteData?.is_phone_number && (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="btnItem"
              >
                <Button
                  data-testID="phoneNumberBtn"
                  onClick={this.navigateToEditProfile}
                  className="addDetailBox"
                  endIcon={<ArrowForwardIosRoundedIcon />}
                >
                  <Typography variant="body1">
                  Add Phone Number
                  </Typography>
                </Button>
              </Grid>
            )}
            {!isProfileCompleteData?.is_notary_service && (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="btnItem"
              >
                <Button
                  data-testID="notaryServiceBtn"
                  onClick={() => this.navigateTo("UserNotaryService")}
                  className="addDetailBox"
                  endIcon={<ArrowForwardIosRoundedIcon />}
                >
                  <Typography variant="body1">
                  Choose Notary Service
                  </Typography>
                </Button>
              </Grid>
            )}
            {!isProfileCompleteData?.is_address && (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="btnItem"
              >
                <Button
                  onClick={this.navigateToEditProfile}
                  className="addDetailBox"
                  endIcon={<ArrowForwardIosRoundedIcon />}
                >
                  <Typography variant="body1">
                  Add Complete Address
                  </Typography>
                </Button>
              </Grid>
            )}
            {!isProfileCompleteData?.is_qualified_signature && (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="btnItem"
              >
                <Button
                  data-testID="addQualifiedSignatureButton"
                  onClick={() => this.navigateToSettings(1)}
                  className="addDetailBox"
                  endIcon={<ArrowForwardIosRoundedIcon />}
                >
                  <Typography variant="body1">
                    Add Qualified Signature
                  </Typography>
                </Button>
              </Grid>
            )}
            {!isProfileCompleteData?.is_vat_sales_tax && (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="btnItem"
              >
                <Button
                  data-testID="addVATSalesTaxButton"
                  onClick={() => this.navigateToSettings(3)}
                  className="addDetailBox"
                  endIcon={<ArrowForwardIosRoundedIcon />}
                >
                  <Typography variant="body1">Add VAT (Value Added Tax)</Typography>
                </Button>
              </Grid>
            )}
            {!isProfileCompleteData?.is_payment_details && (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="btnItem"
              >
                <Button
                  data-testID="addPaymentDetailsButton"
                  onClick={() => this.navigateToSettings(4)}
                  className="addDetailBox"
                  endIcon={<ArrowForwardIosRoundedIcon />}
                >
                  <Typography variant="body1">Add Payment Details</Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </ThemeProvider>
      </CompleteProfileBox>
    );
  };

  renderAllRequestFile = () => {
    return(
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
      {this.Header()}
      {this.isNotaryUser() && this.renderRequestTotalNotary()}
    </Grid>
    )
  }

  renderInvitedRequestAccept = () => {
    return (
      <>
         <RequestModal
          navigation={this.props.navigation}
          id={""}
          isOpen={this.state.isRequestAccepted} 
          closeModal={this.closeInviteRequestModal}
          data-testID="inviteRequestModalOpen"
          allRequestAPI={this.allRequestAPI}
          serviceData={this.state.serviceData}
          noButtonClick={this.requestModalNoButtonClick}
          cancelReqModal={this.state.cancelReqModal}
          yesButtonClick={this.requestModalYesButtonClick}
          backToEditRequest={() => this.setIsRequestNewOrEditOrInvite("editRequest", this.state.currentRequestID)}
          setLoader={this.setLoader}
          setModal={this.setBookInvitedRequestModal}
          editRequest={undefined}
          isNewRequestOrEditRequestOrInviteClient={"invite"} 
          acceptedRequest = {this.state.acceptedRequest}
        />
      </>
    )
  }

  renderRejectConfirmationModal = () => {
    return(      
      <CustomConfirmationPopup closePopup={() => {this.closeRejectRequestModal()}} type="warning" discText="Are you want to reject this request" submitPopup={() => this.rejectRequest()} btntext="Yes" 
      />
    )
  }

  renderMainSectionBottom = () =>{
    return (
      <RequestSectionBox>
        <SuccessFailureModal
          data-testID={"successFailureModal"}
          image={this.state.successFailModalImage}
          text={this.state.successFailModalText}
          textColor={this.state.successFailModalTextColor}
          subText={this.state.successFailModalSubText}
          isOpen={this.state.isSuccessFailModalOpen}
          subText2={this.state.successFailModalSubText2}
          handleButtonClick={() => this.setState({isSuccessFailModalOpen: false})}
          buttonText={this.state.successFailModalButtonText}
          modalWidth="472px"
        />
      <CancelNotaryRequestModal
        data-testID="cancelNotaryModal"
        titleText={ this.state.cancelRequestStatus !== "DRAFT" ? "Confirm Cancellation" : "Confirm Deletion"}
        text={"Are you sure you want to " + (this.state.cancelRequestStatus !== "DRAFT" ? "cancel" : "delete") + " this order?"}
        cancelImage={cancelImage}
        subText={this.state.cancelNotaryRequestSubText}
        cancelReqModal={this.state.cancelNotaryRequestModal}
        handleYesButtonClick={this.cancelRequest}
        handleNoButtonClick={this.closeCancelRequestModal}
      />
                      {/* Loader removed for testing */}
        


        

        

        

        

        

        

        

      <RequestModal
        navigation={this.props.navigation}
        id={""}
        isOpen={this.state.modalOpen} 
        closeModal={this.closeRequestModal}
        data-testID="modalOpen"
        allRequestAPI={this.allRequestAPI}
        serviceData={this.state.serviceData}
        cancelReqModal={this.state.cancelReqModal}
        yesButtonClick={this.requestModalYesButtonClick}
        noButtonClick={this.requestModalNoButtonClick}
        backToEditRequest={() => this.setIsRequestNewOrEditOrInvite("editRequest", this.state.currentRequestID)}
        setLoader={this.setLoader}
        setModal={this.setBookRequestModal}
        editRequest={this.state.editRequest}
        isNewRequestOrEditRequestOrInviteClient={this.state.isRequestNewOrEditOrInvite} 
      />
      <InviteForm 
          navigation={this.props.navigation} 
          id={""} 
          isOpen={this.state.isInviteFormModalOpen}
          serviceData={this.state.serviceData}
          setLoader={this.setLoader}
          closeModal={() => this.setState({isInviteFormModalOpen: false})}
          allRequestAPI={this.allRequestAPI}
          />
      <Box>
        <NavigationMenu data-testID="sidebar" navigation={this.props.navigation} id=""/>
      </Box>

      
      <Box className="mainSection" data-testID="mainSection">
        <Grid container>
         {this.renderAllRequestFile()}
          <DashboardContentBox className="requestGrid">
            {this.isEndUser() && this.renderRequestTotal()}
            {this.isActiveNotaryUser() && this.renderOngoingNewRequest()}
            {this.state.rows.length !== 0 && (this.isEndUser() || this.state.isUserActive) ? 
              <> 
                 {this.renderRequestTable()}
                 {this.isEndUser() && this.renderServices()}
              </> :
              <Box className="emptyRender" data-testID="emptyRender">
                {this.isProfileIncomplete() && this.renderCompleteProfile()} 
                {this.renderEmpty()}
                {(this.isEndUser() || this.isGuestUser()) && this.renderServices()}
              </Box>
            }
              
          </DashboardContentBox>
          <Box data-testID="requestGridcalender" className={this.state.roleId ===2 ? "requestGridcalender": ""}>
            <Calendarr id="" navigation=""/>
          </Box>
        </Grid>        
        <CustomFooter/>
      </Box>
    </RequestSectionBox>
    )
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <div style={{background: "whitesmoke"}}>
        {this.renderMainSectionBottom()}        
        {this.renderInvitedRequestAccept()}
        {this.state.rejectRequestModal && this.renderRejectConfirmationModal()}
      </div>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const ImageCardBox = styled(Box)({
  borderRadius: "50%",
  width: "44px",
  height: "44px",
  marginTop: "40px",
  overflow:"hidden"
});

const CardMediaImg = styled("img")({
  height:"44px",
  width:"44px",
  objectFit:"cover"
})

const NotaryMainBox = styled(Box)({
  padding: "16px 20px",
  bottom: 0,
  "& .notaryServiceHeading": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiTypography-body1": {
      fontSize: "18px",
      fontWeight: 600,
      fontFamily: "Inter",
      color: "#011342",
      lineHeight: "26px"
    },
  },
  "& .sliderBox":{
    "& .slick-slider":{
      height:"210px"
    }
  },
  "& .serviceAll":{
    '&:hover': {
    backgroundColor: "#b3cfff !important"
  },
  },
  "& .slider":{
    height: "100%"
  },
  "& .itemGrid": {
    padding: "10px",
    boxSizing: "border-box",
  },
  "& .itemPaper": {
    height: "190px",
    width: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    "& .notaryImgBox": {
      width: "44px",
      height: "44px"
    },
    "& .MuiTypography-body1": {
      fontSize: "14px",
      fontWeight: 600,
      fontFamily: "Inter",
      color: "#011342",
      lineHeight: "21px"
    },
    "& .MuiTypography-body2": {
      fontSize: "12px",
      fontWeight: 500,
      fontFamily: "Inter",
      color: "#334155",
      lineHeight: "18px"
    }
  },
  "& .slideBtnBox": {
    display: "flex",
    justifyContent: "flex-end",
  },
  "& .slideBtn": {
    color: "#011342",
    height: "20px",
    width: "20px"
  },
  "& .slideBtnView" :{
    color: "#011342",
    rotate: "180deg",
    height: "20px",
    width: "20px"
  }
});

const RequestSectionBox = styled(Box)({
  display: "flex",
  height: "100vh",
  overflowY: "hidden",
  background: "whitesmoke",
  "& .mainSection": {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "scroll",
    // backgroundColor: "#f9f9f9"
  },
  "& .tabLogo": {
    display: "none",
    width: "100%",
    paddingTop: "20px",
  },
  "& .tabLogoBox": {
    width: "160px",
    height: "50px",
  },
  "@media screen and (max-width:1024px)": {
    "& .sideBar": {
      display: "none",
    },
    "& .sideBarOpen": {
      display: "block",
    },
    "& .tabLogo": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const MainGrid= styled(Grid)({
  padding:"0px 20px 20px 10px",
"& .requestSections":{
margin:"0px 0px 0px 10px",
padding:"15px",
display:"flex",
gap:"10px",
alignItems:"center",
borderRadius:"8px",
boxShadow:'2px 2px 4px -4px',
},
"& .headingBox": {
  padding: "5px",
  margin:"10px 0px 0px 10px",
  top:0,
  zIndex:10,
  "& .MuiTypography-body1": {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "26px",
    fontFamily: "Inter",
    color: "#011342"
  },
},
"& .requestInfo":{

  "& .MuiTypography-body2":{
      fontSize:"26px",
      fontWeight:700,
      fontFamily:"Inter"
  }
},
"& .requestTypeBox":{
display:"flex",
alignItems:"center",
  height:"27px",
  "& .MuiTypography-body1":{
      fontSize:"14px",
      fontWeight:600,
      fontFamily:"Inter",
      color:"#011342"
  },
},
"& .all":{
  color:"#496BF2 !important"
},
"& .progress":{
  color:"#FFB111 !important"
},
"& .completed":{
  color:"#6EC58B !important"
},
"& .outgoing":{
  color:"#6200EA !important"
},
"& .requestImageBox":{
  width: '48px',
  minWidth:"48px",
  height:"48px",
  "& img":{
      borderRadius:"50%"
  }
},
  "@media screen and (min-width: 745px) and (max-width: 845px)": {
      "& .requestInfo":{
          "& .MuiTypography-body1":{
              fontSize:"13px !important",
              lineHeight:"14px !important"
          }

      }
  },
"@media screen and (min-width: 600px) and (max-width:744px)":{
  "& .requestSections":{
      flexDirection:"column",
      justifyContent:"center"
  },
  "& .requestInfo":{
      textAlign:"center"
  }
},
"@media screen and (min-width: 600px) and (max-width: 664px)": {
  "& .requestInfo":{
      "& .MuiTypography-body1":{
          fontSize:"13px !important",
          lineHeight:"14px !important"
      }

  }
},
"@media screen and (max-width: 599px)": {
  "& .requestInfo":{
     display:"flex",
     justifyContent:"space-between",
     width:"100%",
  }
}
});

const MainBox = styled(Box)({
  padding: "0px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowX: "auto",
});

const StyledTable = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
  "& .tableTitle":{
    backgroundColor: "#E2E8F0",
    margin: "5px"
  },
  "& .viewBtn": {
    position: "relative"
  },
  "& thead": {
    backgroundColor: "#f9f9f9",
    "& th": {
      height: "54px",
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "22px",
      fontFamily: "Inter",
      color: "#011342",
      borderBottom: "2px solid #ddd",
      "&:first-child": {
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px"
      },
      "&:last-child": {
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px"
      },
    },
  },
  "& tbody": {
    "& .dataRow": {
      height: "54px",
      "& td": {
        height: "54px",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "22px",
        fontFamily: "Inter",
        color: "#011342",
        padding: "0px 8px",
        borderBottom: "2px solid #ddd",
        background: "#fff",
        "&:first-child": {
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px"
        },
        "&:last-child": {
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px"
        },
      },
    },
  },
  "& .priority": {
    borderLeft: "6px solid #F59E0B"
  },
  "& .standard": {
    borderLeft: "6px solid #34D399",
    color:"red"
  },
  "& .superPriority": {
    borderLeft: "6px solid #F87171"
  },
  "& .draft":{
    borderLeft:"6px solid #64748B"
  },
  "& .completed , .accepted": {
    background: "#D1FAE5",
    "& .MuiTypography-body1":{
      color: "#059669"
    }    
  },
  "& .cancelled , .rejected": {
    background: "#FF000038",
    "& .MuiTypography-body1":{
          color: "#FF0000"
    } 
  },
  "& .pending , .invited": {
    background: "#F0E5FF",
    "& .MuiTypography-body1":{
          color: "#6200EA"
    }
  },
    "& .inprogress": {
      background: "#FEF3C7",
      "& .MuiTypography-body1":{
            color: "#D97706"
      } 
  },
  "& .draftStatus":{
    background:"#64748B",
    "& .MuiTypography-body1":{
      color:"#FFFFFF"
    }
  },
"& .statusBox": {
    height: "30px",
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width:"90px",
    "& .MuiTypography-body1":{
      fontFamily: "Inter",
      fontSize: "10px",
      fontWeight: 700,
      lineHeight: "18px"
  }
  },
  "& .methodBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "& .methodTxt":{
    color: "#011342",
    fontSize :"14px",
    fontWeight: 400,
    fontFamily: "Inter"
  },
  "& .infoIconBtn": {
    padding: "0px 5px !important"
  },
  "& .infoIcon": {
    height: "18px",
    width: "18px",
    color: "#475569"
  },
});

const ActionBox = styled(Box)({
  right: 0,
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  cursor: "pointer",
  borderRadius: "4px",
  zIndex: 1,
  boxShadow: "0px 2px 8px 0px #00000014",
  "& .eyeIcon": {
    marginRight: "8px",
    "&:hover":{
      color: "#fff"
    }
  },
  "& .menuBtn":{
    minWidth:"200px",
    height:"40px",
    display: "flex",
    alignItems: "center",
    padding:"20px",
    gap:"10px",
    justifyContent:"flex-start",
    "& .MuiTypography-body1": {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      textAlign: "left",
      textTransform:"none"
    },
    "&:hover":{
      color: "#fff !important",
      backgroundColor:"#0131A8"
    }
  },
});

const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const EmptyBox = styled(Box)({
  padding: "0px 20px",
  display: "flex",
  alignItems: "center",
  height: "440px",
  justifyContent: "center",
  flexDirection: "column",
  gap: "20px",
  "& .imgBox": {
    width: "200px",
    height: "200px"
  },
  "& .txtBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
    "& .MuiTypography-body1": {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "26px",
      fontFamily: "Inter",
      color: "#011342",
    },
    "& .MuiTypography-body2": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "#64748B",
      width: "390px",
      "& span": { fontWeight: 600, lineHeight: "22px", color: "#64748B" }
    },
  },
  "& .MuiButton-root": {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "24px",
    fontFamily: "Inter",
    textTransform: "none",
    color: "white",
    background: "#012275",
    borderRadius: "4px",
    paddingRight: "15px",
    paddingLeft: "15px",
    height: "45px"
  },
  "& .addIcon": {
    paddingRight: "8px"
  },
});

const TabBox = styled(Box)({
  display: "flex",
  marginBottom:"10px",
  marginLeft: "18px",
  "& .MuiTabs-root": {
    minHeight: "30px",
    height: "36px",
    padding: "2px",
    border: "1px solid #012276",
    background: "#f9faf9",
    borderRadius: "80px",
  },
  "& .MuiTab-root": {
    minWidth: "140px",
    width: "160px",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "16px",
    minHeight: "30px",
    height: "36px",
    color: "#011342",
    opacity: 1,
    textTransform: "none",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    background: "#012275",
    color: "white",
    borderRadius: "35px",
    opacity: 1,
    fontWeight: "600"
  },
});

const completeProfileGridTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1536,
    },
  },
});  

const CompleteProfileBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  padding: "15px 0px",
  borderRadius: "12px",
  margin: "10px 20px",
  bottom:"5px",
  boxShadow: "0px 2px 8px 0px #00000014",
  "& .headBox": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "0px 25px",
    "& .MuiTypography-body2": {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "14px",
      fontFamily: "Inter",
      color: "#334155",
    },
    "& .MuiTypography-body1": {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "21px",
      fontFamily: "Inter !important",
      color: "#011342",
    },
  },
  "& .btnContainer": {
    padding: "0px 15px",
  },
  "& .btnItem": {
    padding: "10px",
    boxSizing: "border-box",
    "& .MuiButton-root": {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "16px",
      fontFamily: "Inter",
      color: "white",
      backgroundColor: "#0131A8"
    },
  },
  "& .addDetailBox": {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    padding: "10px 12px",
    backgroundColor: "#0131A8",
    borderRadius: "8px",
    boxSizing: "border-box",
    textTransform: "none",
  },
});

const DashboardContentBox = styled(Box)({
  width: "calc(100% - 395px)",
  '& .emptyRender':{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  "@media(max-width: 1160px)": {
    width: "calc(100%)",
  }
});
// Customizable Area End
