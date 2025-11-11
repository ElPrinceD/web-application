import React from "react";

// Customizable Area Start
import SuccessFailureModal from "../../../components/src/SuccessFailureModal.web";
import {
  Button,
  Typography,
  IconButton,
  styled,
  ClickAwayListener,
  Box,
  Tabs,
  Tab, Zoom, Tooltip, Popper, Paper,
  Dialog,
  RadioGroup,
  Select,
  FormControl,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import {    
  Close,
  MoreVert,
  Link,
  Edit,  
  CalendarToday as CalendarIcon,
  DeleteOutlineOutlined,
  Done,
} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import RequestModal from "./../../dashboard/src/BookNotaryRequest.web";
import CancelNotaryRequestModal from "../../../components/src/CancelNotaryRequestModal.web";
import Loader from "../../../components/src/Loader.web";
import StyledRadio from "../../../components/src/StyledRadio.web";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';

import "date-fns";
import {
  localProfile,
  bellIcon,
  cancelImage,
  crossIcon,
  groupImg
} from "./assets";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CustomFooter from "../../../components/src/CustomFooter.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import InviteForm from "../../dashboard/src/InviteForm.web";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ee",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Inter",
    subtitle1: {
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: '14px',
      color: '#1E293B',
      padding: '15px 0 10px 0'
    },
  },
  overrides: {
    MuiMenu: {
      paper: {
        top: '55% !important',
        height: "35%"
      }
    },
    MuiMenuItem: {
      root: {
        "&$selected": {
          background: "#0131A8",
          color: "#fff"
        },
        "&$selected:hover": {
          background: "#0131A8",
          color: "#fff"
        },
        "&:hover": {
          background: "#0131A8",
          color: "#fff"
        }
      }
    },
    MuiDialog: {
      paperWidthSm: {
        width: '80%'
      }
    },
    MuiSelect: {
      icon:{
        color: '#011342'
      }
    }
  }
});
// Customizable Area End

import RequestManagementController, {
  Props,
  configJSON,
} from "./RequestManagementController";

export default class RequestManagement extends RequestManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"32px"}>
        <Box width={"calc(100vw - 74px)"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mx={"20px"}
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
                Requests
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
      <TabBox>
        <Tabs data-testID="tabBtn" value={this.state.value} onChange={this.handletabItemChange}>
          <Tab label="New Requests" />
          <Tab label="Ongoing Requests" />
          <Tab label="Invites"/>
        </Tabs>
      </TabBox>
    );
  };

  renderEndUserTabs =() => {
    return (
      <TabBox>
        <Tabs data-testID="tabBtn" value={this.state.value} onChange={this.handletabItemChange}>
          <Tab label="Your Requests" />          
          <Tab label="Invites"/>
        </Tabs>
      </TabBox>
    );
  }

  renderPriorityButtons = () => {
    return (
      <>
        <Button
          onClick={()=>this.handleUrgencyFilterStatus("Priority")}
          style={{
            color: "#011342",
            fontSize: "14px",
            lineHeight: "17px",
            backgroundColor: "#F1F5F9",
            borderRadius: "22px",
            textTransform: "none",
            padding: "8px 12px 8px 12px",
            width: "fit-content",
            border: this.state.urgencyFilter === "Priority" ? '1px solid #012275' : ''
          }}
          endIcon={
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                backgroundColor: "#F59E0B",
                borderRadius: "50%",
              }}
            />
          }
          data-testID="urgency-filter-button"
        >
          Priority
        </Button>

        <Button
         onClick={()=>this.handleUrgencyFilterStatus("Standard")}
          style={{
            backgroundColor: "#F1F5F9",
            borderRadius: "22px",
            color: "#011342",
            fontSize: "14px",
            lineHeight: "17px",
            textTransform: "none",
            padding: "8px 12px 8px 12px",
            width: "fit-content",
            border: this.state.urgencyFilter === "Standard" ? '1px solid #012275' : ''
          }}
          endIcon={
            <span
              style={{
                alignContent: "center",
                width: "8px",
                height: "8px",
                backgroundColor: "#34D399",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
          }
          data-testID="urgency-filter-button"
        >
          Standard
        </Button>
        <Button
        onClick={()=>this.handleUrgencyFilterStatus("Super Priority")}
          style={{
            width: "fit-content",
            backgroundColor: "#F1F5F9",
            borderRadius: "22px",
            color: "#011342",
            fontSize: "14px",
            lineHeight: "17px",
            textTransform: "none",
            padding: "8px 12px 8px 12px",
            border: this.state.urgencyFilter ==="Super Priority" ? '1px solid #012275' : ''
          }}
          endIcon={
            <span
              style={{
                backgroundColor: "#F87171",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
          }
          data-testID="urgency-filter-button"
        >
          Super Priority
        </Button>

      </>
    )
  }

  renderSearchBar = () => {
    return (
      <div style={{ position: 'relative', width: '300px' }}>
        <SearchIcon
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#011342',
          }}
        />
        <input
          type="text"
          placeholder="Search Order ID"
          style={{
            width: '100%',
            height: '40px',
            borderRadius: '5px',
            backgroundColor: '#FFF',
            border: '1px solid #D1FAE5',
            padding: '8px 12px 8px 36px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
          data-testID="SearchOrderIdInput"
          value={this.state.orderId}
          onChange={this.handleSearchChange}
        />
      </div>
    );
  };

  renderFilterIcon = () => {
    return (
      <ThemeProvider theme={theme}>
        <Box
          borderRadius={"4px"}
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "#FFFFFF",
            borderRadius: '5px',
            border: '1px solid #D1FAE5',
          }}
          width={"40px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"40px"}
        >
          <FilterListIcon onClick={this.handleOpenFilter} data-test-id="filter-popup-box" />
          <Dialog
            open={this.state.openFilterPopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box style={webStyle.popUpStyle} >
              <Box sx={webStyle.popUpHeader}>
                <Box style={{ fontWeight: 500, fontSize: '18px', color: '#012275' }}>
                  Filter
                </Box>
                <Box onClick={this.handleCloseFilter}>
                  <img src={crossIcon} alt="" height='44px' width='44px' />
                </Box>
              </Box>
              <Box style={{ width: '100%', padding: '0 0 0 10px ' }}>
                <Typography variant="subtitle1">Urgency Level</Typography>
                <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} >
                  <Button
                    style={{
                      ...webStyle.urgencyButtonStyle,
                      border: this.state.priority === 'Standard' ? '1px solid #012275' : ''
                    }}
                    data-testID="simulate-buttons"
                    onClick={() => this.handleUrgencyLevel('Standard')}
                    endIcon={
                      <span
                        style={{
                          alignContent: "center",
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#34D399",
                          borderRadius: "50%",
                          display: "inline-block",
                        }}
                      />
                    }
                  >
                    Standard
                  </Button>

                  <Button
                    style={{
                      ...webStyle.urgencyButtonStyle,
                      border: this.state.priority === 'Priority' ? '1px solid #012275' : ''
                    }}
                    onClick={() => this.handleUrgencyLevel('Priority')}
                    endIcon={
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#F59E0B",
                          borderRadius: "50%",
                          display: "inline-block",
                        }}
                      />
                    }
                    data-testID="PriorityBtn"
                  >
                    Priority
                  </Button>

                  <Button
                    style={{
                      ...webStyle.urgencyButtonStyle,
                      border: this.state.priority === 'Super Priority' ? '1px solid #012275' : ''
                    }}
                    onClick={() => this.handleUrgencyLevel('Super Priority')}
                    endIcon={
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#F87171",
                          borderRadius: "50%",
                          display: "inline-block",
                        }}
                      />
                    }
                    data-testID="SuperPriorityBtn"
                  >
                    High Priority
                  </Button>
                </Box>
              </Box>
              <Box style={{ width: '100%', padding: '0 0 0 10px ' }}>
                <Typography variant="subtitle1">Request Status</Typography>
                <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} >
                  {
                    this.state.roleID === 2 ?
                      <>
                        {this.state.notaryRequestButtons.map((buttons, index) => (
                          <Button
                            key={buttons}
                            style={{
                              ...webStyle.urgencyButtonStyle,
                              border: index === this.state.handleRequestButton ? '1px solid #012275' : ''
                            }}
                            onClick={() => this.handleRequestButtons(index)}
                            data-testID="request-status-buttons"
                          >
                            {buttons}
                          </Button>
                        ))}
                      </> :
                      <>
                        {this.state.customerRequestButtons.map((buttons, index) => (
                          <Button
                            key={buttons}
                            style={{
                              ...webStyle.urgencyButtonStyle,
                              border: index === this.state.handleRequestButton ? '1px solid #012275' : ''
                            }}
                            onClick={() => this.handleRequestButtons(index)}
                            data-testID="request-status-buttons"
                          >
                            {buttons}
                          </Button>
                        ))}
                      </>
                  }
                </Box>
              </Box>
              <CustomSelectBox>
                <Typography variant="subtitle1">
                  Type of Notary Service <span style={{ color: '#F87171' }} >*</span>
                </Typography>
                <FormControl variant="outlined" className="mui-form_controll">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.notary}
                    onChange={this.handleNotaryChange}
                    displayEmpty
                    data-testID="notary-service-type"
                    IconComponent = {ExpandMoreRoundedIcon}
                  >
                    <MenuItem value="">
                      Type of Notary Service
                    </MenuItem>
                    {this.state.notaryType?.length > 0 &&
                      this.state.notaryType.map((item) =>
                        <MenuItem key={item.id} value={item.id}>{item.attributes.service_name}</MenuItem>)}
                  </Select>
                </FormControl>
                <Box style={{ paddingTop: '5px' }}>
                  <span style={{ color: '#011342', fontSize: '12px', fontFamily: 'Inter' }}>Select the options that best describes your notary service.</span>
                </Box>
              </CustomSelectBox>
              <Box style={{ padding: '10px 0 0 10px ' }}>
                <Typography variant="subtitle1">Date <span style={{ color: '#F87171' }}>*</span></Typography>
                <RadioGroup aria-label="gender" data-testID="date-type-button"
                  name="date" value={this.state.dateType} onChange={this.handleDateTypeChange}>
                  <Box style={{ display: 'flex', paddingLeft: '10px' }}>
                    <StyledRadio label="Request Date" value="Request Date" />
                    <StyledRadio label="Completion Date" value="Completion Date" />

                  </Box>
                </RadioGroup>
                <CustomDatePicker>
                  <TextField
                    fullWidth
                    value={this.formatDateRange(this.state.selectedDate)}
                    onClick={this.openCalendar}
                    data-testID="calendar-field"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={this.openCalendar}>
                            <CalendarIcon style={{color: '#011342', width: 20, height: 20}}/>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {this.state.calendarOpen && (
                    <div style={webStyle.reactCalendarBox}>
                      <Calendar
                        selectRange
                        onChange={this.handleDateChange}
                        data-testID="calendar"
                        value={this.state.tempDate || this.state.selectedDate}
                      />
                      <div className="hr-divider"></div>
                      <div className="action-button-div">
                        <Button 
                          className="action-btn cancel-btn" 
                          onClick={this.handleCalendarCancelBtn}
                          data-testID="cancel-btn"
                        >
                          Cancel
                        </Button>
                        <Button 
                          data-testID="save-btn"
                          className={this.state.tempDate ? `action-btn save-btn active` : `action-btn save-btn`} 
                          onClick={this.handleCalendarSaveBtn}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </CustomDatePicker>

                <Box style={{ paddingTop: '5px' }}>
                  <span style={{ color: '#011342', fontSize: '12px' }}>Select Date Range</span>
                </Box>
              </Box>

              <Box style={{ paddingTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={this.handleReset}
                  style={{
                    ...webStyle.buttonStyle,
                    backgroundColor: '#FFF',
                    color: '#000A34',
                    border: '1px solid #000A34'
                  }}
                  data-testID="reset-filter-btn"
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  style={{
                    ...webStyle.buttonStyle,
                    backgroundColor: this.getBackgroundColor(),
                    color: 'white'
                  }}
                  data-testID="apply-filter-btn"
                  onClick={this.handleApplyFilter}
                >
                  Apply Filter
                </Button>
              </Box>


            </Box>
          </Dialog>
        </Box>
      </ThemeProvider>
    )
  }

  renderRejectConfirmationModal = () => {
    return(      
      <CustomConfirmationPopup closePopup={() => {this.closeRejectRequestModal()}} type="warning" discText="Are you want to reject this request" submitPopup={() => this.rejectRequest()} btntext="Yes" 
      />
    )
  }

  renderInvitedRequestAccept = () => {
    return (
      <>
         <RequestModal
          navigation={undefined}
          id={""}
          isOpen={this.state.isRequestAccepted} 
          closeModal={this.closeInviteRequestModal}
          data-testID="inviteRequestModalOpen"
          allRequestAPI={this.allRequestAPI}
          serviceData={this.state.serviceData}
          cancelReqModal={this.state.cancelReqModal}
          yesButtonClick={this.yesButtonClick}
          noButtonClick={this.inviteRequestModalNoButtonClick}
          setLoader={this.setLoader}
          setModal={this.setBookInvitedRequestModal}
          editRequest={undefined}
          isNewRequestOrEditRequestOrInviteClient={"invite"} 
          acceptedRequest = {this.state.acceptedRequest}
          backToEditRequest={() => {}}  
        />
      </>
    )
  }

  renderEmpty = () => {
   
    const {value} = this.state;
    let requestMessage;
    let content;
    let buttonText: string | undefined;
    if (this.isEndUser()) {
      if(value === 0){
        requestMessage = "No requests yet!";
        content = (
          <>
            {configJSON.textEmpty} <span data-testID="bookNowText">‘{configJSON.bookNow}’</span>.
          </>
        );
        buttonText = "Book Now";
      }else{
        requestMessage = "No invites yet!";
        content = "Stay calm and relax. You'll receive your first invite soon";
      }
    } else{
      switch(value){
        case 0:
          requestMessage = "No Notary Requests!";
          content = "Stay calm and relax. You'll receive your first notary request soon";
          break;
        case 1:
          requestMessage = "No Ongoing Requests!";
          content = "Stay calm and relax. You'll receive your notary request soon";
          break;
        case 2:
          requestMessage = "No Invites Sent!";
          content = "Send your first invite with renotary by clicking ‘Invite Client’.";
          buttonText = "Invite Client";
          break;  
      }
    } 
    return (
      this.state.noFilterResult ? 
      <Box
      style={{
        height: 'calc(100vh - 154px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9', 
        border: '1px solid #e0e0e0', 
        borderRadius: 8, 
        padding: '20px',
        color: '#9e9e9e', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', 
      }}
    >
      <SearchIcon style={{ fontSize: 70, color: '#9e9e9e', marginBottom: 15 }} />
      <Typography
        style={{
          fontFamily: 'Inter',
          fontSize: 20,
          fontWeight: 600,
          textAlign: 'center',
          color: '#333333', 
        }}
      >
        No Records Found
      </Typography>
      <Typography
        style={{
          fontFamily: 'Inter',
          fontSize: 16,
          marginTop: 10,
          textAlign: 'center',
          color: '#666666', 
        }}
      >
        Try adjusting your filters or search with different keywords.
      </Typography>
    </Box>: 
      <EmptyBox>
        <Box className="imgBox">
          <img src={groupImg} alt="" width={"100%"} height="100%" data-testID="emptyImage" />
        </Box>
        <Box className="txtBox">
          <Typography variant="body1" align="center" data-testID="requestMessage">
            {requestMessage} </Typography>
          <Typography variant="body2" align="center" data-testID="contentMessage">
            {content}
          </Typography>
        </Box>
        {buttonText && (
          <Button
            className="bookBtn"
            data-testID="bookNowBtn"
            onClick={() => {
              this.isEndUser() ? this.setIsNewRequestOrEditRequestOrInviteClient("new") : this.setState({isInviteFormModalOpen: true})
            }}
          >
            <AddIcon className="addIcon" /> {buttonText}
          </Button>
        )}
      </EmptyBox>
    );
  };


  renderRequestTable = () => {
    const { isActionBoxActive, actionBoxIndex,rows } = this.state;
   
    return (
      <MainBox
        style={
          this.state.roleID === 1
            ? { height: "100%" }
            : { height: "100%", marginTop: "5px" }
        }
        onScroll={this.handleScroll}
      >
        <StyledTable>
          <thead data-testID="resultTable" style={{ position: "sticky", top: "0px", zIndex: 1 }}>
            <th className="tableTitle">{configJSON.urgency}</th>
            <th className="tableTitle">{configJSON.orderID}</th>
            <th className="tableTitle">{configJSON.notaryService}</th>
            <th className="tableTitle">{configJSON.method}</th>
            <th className="tableTitle">{configJSON.requestDate}</th>
            <th className="tableTitle">{configJSON.status}</th>
            <th className="tableTitle">{configJSON.action}</th>
          </thead>
          <tbody>
         
            {rows.length > 0 && rows.map((rowsData, index) => (
              <>
              {rowsData.attributes &&
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
                      data-test-ID="requestTooltip"
                      title="Popper has the title"
                      PopperComponent={(popperProps) => (
                        <Popper {...popperProps} placement="bottom">
                          <Paper style={{ backgroundColor: 'white', padding: '8px', maxWidth: "400px", boxShadow: '0px 2px 4px rgba(0,0,0,0.2)' }}>
                            <Typography align="center" style={{ fontSize: "12px", fontFamily: "Inter" }}>{this.findToolTiptext(rowsData.attributes.notarisation_method_id)}</Typography>
                          </Paper>
                          <div style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderBottom: '8px solid white',
                          }} />
                        </Popper>
                      )}
                      TransitionComponent={Zoom}
                    >
                      <IconButton className="infoIconBtn"  data-testID="tooltipMenus">
                        <InfoOutlinedIcon className="infoIcon" />
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
                    {this.dateReturn(rowsData.attributes.date)}
                  </span>
                </td>
                <td align="center">
                  <Box
                    className={`${this.getStatusClass(
                      this.getStatusForRequests(rowsData.attributes).toUpperCase()
                    )} statusBox`}
                  >
                    <Typography variant="body1">
                    {this.getStatusForRequests(rowsData.attributes).toUpperCase()}                  
                    </Typography>
                  </Box>
                </td>
                <td align="center" className="viewBtn">
                  <div
                    data-testID="threeDots"
                    onClick={() => this.handleActionBoxOpen(index)}
                  >
                    <MoreVert className="moreIcon" />
                  </div>
                  {isActionBoxActive && actionBoxIndex === index && (
                    <ClickAwayListener
                      onClickAway={this.handleActionBoxClose}
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
                            this.setIsNewRequestOrEditRequestOrInviteClient(
                              "edit",
                              rowsData.id
                            )
                          }
                          startIcon={<EditOutlinedIcon className="eyeIcon" />}
                          className="menuBtn"
                          data-testID="editRequestButton"
                        >
                          <Typography className="viewText">Edit</Typography>
                        </Button>}
                        {this.isMeetingActionButtonShown(rowsData) && <Button
                          onClick={this.getZoomApi}
                          startIcon={<Link className="eyeIcon" />}
                          className="menuBtn"
                          data-test-id="meetLinkButton"
                        >
                          <Typography className="viewText">
                            Meeting link
                          </Typography>
                        </Button>}
                        {this.isMessageActionButtonShown(rowsData) && <Button
                          startIcon={
                            <MessageOutlinedIcon className="eyeIcon" />
                          }
                          className="menuBtn"
                          data-test-id="messageBtn"
                          onClick={()=> this.navigateToRequestDetails(rowsData.id) }
                        >
                          <Typography className="viewText">Message</Typography>
                        </Button>}
                        {this.isSubmitQuoteActionButtonShown(rowsData) && <Button
                          onClick={() => this.navigateToRequestDetails(rowsData.id, true)}
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
                          startIcon={!this.isRequestInDraft(rowsData.attributes.status) ? <Close className="eyeIcon" /> : <DeleteOutlineOutlined
                            className="eyeIcon" />}                         
                          className="menuBtn"
                        >
                          <Typography className="viewText">{!this.isRequestInDraft(rowsData.attributes.status) ? "Cancel" : "Delete"}</Typography>
                        </Button>}
                        {this.isAcceptRejectActionButtomShown(rowsData) &&
                            <>
                              <Button
                                data-testID="acceptNotaryRequestButton"
                                onClick={() =>
                                  this.setIsNewRequestOrEditRequestOrInviteClient(
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
  }
              </>
            ))}
          </tbody>
        </StyledTable>
      </MainBox>
    );
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <div style={{ overflow: "hidden" }}>
        <SuccessFailureModal
          data-testid={"successFailureModal"}
          image={this.state.successFailModalImage}
          isOpen={this.state.isSuccessFailModalOpen}
          text={this.state.successFailModalText}
          textColor={this.state.successFailModalTextColor}
          subText={this.state.successFailModalSubText}
          subText2={this.state.successFailModalSubText2}
          handleButtonClick={() => this.setState({isSuccessFailModalOpen: false})}
          buttonText={this.state.successFailModalButtonText}
          modalWidth="472px"
        />
        <Box display={"flex"} className="test1">
          <NavigationMenu navigation={this.props.navigation} id={""} />
          <MainBox
            height={"100vh"}
            overflow={"auto"}
            width={this.findMainBoxWidth()}
            style={{ backgroundColor: "#F9F9F9", overflow: "hidden" }}
          >
            {this.Header()}
            <MainBox
              id="mainBox"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 12px",
                overflow: "hidden",
              }}
            >
              <div style={{ gap: "8px", display: "flex" }}>
                {this.isActiveNotaryUser() && this.renderOngoingNewRequest()}
                {this.isEndUser() && this.renderEndUserTabs()}
                {this.renderPriorityButtons()}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {this.renderSearchBar()}
                {this.renderFilterIcon()}
              </div>
            </MainBox>
            <>
              {(() => {
                const rowsLength = this.state.rows?.length || 0;
                const isEndUserCheck = this.isEndUser();
                const isActiveNotaryUserCheck = this.isActiveNotaryUser();
                const isNotaryUserCheck = this.isNotaryUser();
                const isUserActiveCheck = this.state.isUserActive;
                
                console.log('🔍 Render condition check:', {
                  rowsLength,
                  isEndUser: isEndUserCheck,
                  isActiveNotaryUser: isActiveNotaryUserCheck,
                  isNotaryUser: isNotaryUserCheck,
                  isUserActive: isUserActiveCheck,
                  roleID: this.state.roleID,
                  shouldRenderTable: rowsLength !== 0 && (isEndUserCheck || isActiveNotaryUserCheck),
                  rowsIsArray: Array.isArray(this.state.rows),
                  firstRow: this.state.rows[0]
                });
                
                return rowsLength !== 0 && (isEndUserCheck || isActiveNotaryUserCheck) ? (
                  <>
                    {this.renderRequestTable()}
                  </>
                ) : (
                  <>
                    {this.renderEmpty()}
                  </>
                );
              })()}
            </>
            <CustomFooter/>
          </MainBox>
        </Box>

        <>
          <Loader loading={this.state.loader} />
          <RequestSectionBox>
            <CancelNotaryRequestModal
              data-testID="cancelNotaryModal"
              titleText={ this.state.cancelRequestStatus !== "DRAFT" ? "Confirm Cancellation" : "Confirm Deletion"}
              text={"Are you sure you want to " + (this.state.cancelRequestStatus !== "DRAFT" ? "cancel" : "delete") + " this order?"}
              subText={this.state.cancelNotaryRequestSubText}
              cancelImage={cancelImage}
              cancelReqModal={this.state.cancelNotaryRequestModal}
              handleYesButtonClick={this.cancelNotaryrequest}
              handleNoButtonClick={this.cancelNotaryRequestNoButtonClick}
            />

            <RequestModal
              navigation={undefined}
              id={""}
              isOpen={this.state.modalOpen}
              closeModal={this.closeModal}
              data-testID="modalOpen"
              allRequestAPI={this.allRequestAPI}
              serviceData={this.state.serviceData}
              cancelReqModal={this.state.cancelReqModal}
              yesButtonClick={this.yesButtonClick}
              noButtonClick={this.noButtonClick}
              setLoader={this.setLoader}
              setModal={this.setModal}
              editRequest={this.state.editRequest}
              isNewRequestOrEditRequestOrInviteClient={this.state.isNewRequestOrEditRequestOrInviteClient}
              backToEditRequest={() => {}}              
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
          </RequestSectionBox>
        </>
        {this.renderInvitedRequestAccept()}
        {this.state.rejectRequestModal && this.renderRejectConfirmationModal()}
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const EmptyBox = styled(Box)({
  padding: "0px 20px",
  display: "flex",
  alignItems: "center",
  height: "100%",
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
const RequestSectionBox = styled(Box)({
  display: "flex",
  height: "100vh",
  overflowY: "hidden",
  "& .mainSection": {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "scroll",
    backgroundColor: "#f9f9f9"
  },
  "& .tabLogo": {
    display: "none",
    width: "100%",
    paddingTop: "20px"
  },
  "& .tabLogoBox": {
    width: "160px",
    height: "50px"
  },
  "@media screen and (max-width:1024px)": {
    "& .sideBar": {
      display: "none"
    },
    "& .sideBarOpen": {
      display: "block"
    },
    "& .tabLogo": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  },

});
const FooterBox = styled(Box)({
  display: "flex",
  padding: "10px 20px",
  alignItems: "center",
  width: "97%",
  justifyContent: "space-between",
  "& .MuiTypography-body1": {
    color: "#64748B",
    fontFamily: "Inter",
    lineHeight: "21px",
    fontSize: "14px",
    fontWeight: 500
  },
  "& .MuiButton-root": {
    color: "#64748B",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "21px",
    textTransform: "none",
    padding: "0px 10px",
    textDecoration: "underline"
  }
});

const TabBox = styled(Box)({
  display: "flex",
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

const MainBox = styled(Box)({
  padding: "0px 10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowX: "auto",
});
const StyledTable = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
  "& .tableTitle": {
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
    color: "red"
  },
  "& .superPriority": {
    borderLeft: "6px solid #F87171"
  },
  "& .draft":{
    borderLeft:"6px solid #64748B"
  },
  "& .completed , .accepted": {
    background: "#D1FAE5",
    "& .MuiTypography-body1": {
      color: "#059669"
    }
  },
  "& .cancelled , .rejected": {
    background: "#FF000038",
    "& .MuiTypography-body1": {
      color: "#FF0000"
    }
  },
  "& .pending , .invited": {
    background: "#F0E5FF",
    "& .MuiTypography-body1": {
      color: "#6200EA"
    }
  },
  "& .inprogress": {
    background: "#FEF3C7",
    "& .MuiTypography-body1": {
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
    width: "90px",
    "& .MuiTypography-body1": {
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
  "& .methodTxt": {
    color: "#011342",
    fontSize: "14px",
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
const ActionBoxNotary = styled(Box)({
  position: "absolute",
  right: 0,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "white",
  borderRadius: "4px",
  cursor: "pointer",
  zIndex: 1,
  boxShadow: "0px 2px 8px 0px #00000014",
  "& .visibleIcon": {
    marginRight: "8px",
    "&:hover": {
      color: "#fff"
    }
  },
  "& .menuButton": {
    height: "45px",
    width: "220px",
    display: "flex",
    padding: "25px",
    alignItems: "center",
    gap: "10px",
    justifyContent: "flex-start",
    "& .MuiTypography-body1": {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      textTransform: "none",
      textAlign: "left"
    },
    "&:hover": {
      backgroundColor: "#0131A8",
      color: "#fff !important"
    }
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
    "&:hover": {
      color: "#fff"
    }
  },
  "& .menuBtn": {
    minWidth: "200px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
    justifyContent: "flex-start",
    "& .MuiTypography-body1": {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
      textAlign: "left",
      textTransform: "none"
    },
    "&:hover": {
      color: "#fff !important",
      backgroundColor: "#0131A8"
    }
  },
});
const CustomSelectBox = styled(Box)({
  width: '100%',
  padding: '10px 0 0 10px ',
  boxSizing: 'border-box',
  "& .MuiFormControl-root": {
    width: '100%',
  },
  "& .MuiSelect-selectMenu": {
    height: '48px',
    boxSizing: 'border-box',
    padding: '12px',
    border: '1px solid #011342',
    borderRadius: '8px'
  },
  "& .MuiOutlinedInput-notchedOutline": {
    display: 'none'
  }
});

const CustomDatePicker = styled(Box)({
    border: '1px solid black',
    paddingLeft: '12px',
    borderRadius: '8px',
    // width: '100%',
    position: 'relative' as 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    height: "48px",
    boxSizing: "border-box",
    alignItems: "center",

    "& .MuiInput-underline::after, .MuiInput-underline::before": {
      display: 'none'
    },
    "& .react-calendar": {
      border: "none",
      fontFamily: "Inter",
    },
    "& .react-calendar__navigation__prev2-button, .react-calendar__navigation__next2-button":{
      display: "none",
    },
    "& .react-calendar__navigation button": {
      fontSize: '14px',
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#0F172A"
    },
    "& .react-calendar__month-view__weekdays__weekday": {
      textTransform: 'capitalize',
      fontSize: '14px',
      color: '#64748B',
      fontWeight: 400,

    },
    "& .react-calendar__month-view__days__day--weekend": {
      background: '#FEE2E2'
    },
    "& .react-calendar__tile.react-calendar__tile--hasActive": {
      background: '#012275',
      color: '#fff'
    },
    "& .react-calendar__tile--hasActive:enabled:hover, .react-calendar__tile--hasActive:enabled:focus": {
      background: '#012275',
      color: '#fff'
    },
    "& .react-calendar__tile": {
      fontSize: '14px',
      fontWeight: 400,
      color: '#011342',
      width: '50px',
      height: '50px',
      borderRadius: '50%'
    },
    "& .react-calendar__tile.react-calendar__year-view__months__month": {
      width: 'unset',
      height: 'unset',
      borderRadius: 0
    },
    "& .react-calendar__tile.react-calendar__tile--active, .react-calendar__tile.react-calendar button:enabled": {
      background: '#012275',
      color: '#fff'
    },
    "& .react-calendar__tile.react-calendar__month-view__days__day--neighboringMonth": {
      color: '#94A3B8'
    },
    "& .action-button-div": {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 15px',
      gap: '20px'
    },
    "& .action-button-div button": {
      width: '160px',
      height: '44px',
      borderRadius: '8px',
      fontFamily: "Inter",
      textTransform: 'capitalize',
      fontSize: '16px',

    },
    "& .action-button-div .cancel-btn": {
      border: '1px solid #5D5D5D',
      color: '#000A34'
    },
    "& .action-button-div .save-btn.active": {
      background: '#012275',
      color: '#FFF'
    },
    "& .action-button-div .save-btn": {
      background: '#CCD3E3',
      color: '#64748B'
    },
    "& .hr-divider": {
      width: '100%',
      height: '2px',
      background: '#E2E8F0',
      margin: '10px 0'
    }

});
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  topWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  tableTitleStyle: {
    alignSelf: "flex-start",
    marginTop: 20,
  },
  tableBtnStyle: {
    marginRight: 10,
  },
  inputStyle: {
    marginTop: 15,
    width: 350,
    maxWidth: "100%",
  },
  popUpStyle: {
    // width: '600px',
    padding: '24px 20px',
    boxSizing: 'border-box' as 'border-box',
  },
  popUpHeader: {
    width: '100%',
    borderBottom: '1px solid #CBD5E1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  resetButton: {
    width: '180px',
    borderRadius: '10px',
    fontWeight: 700,
    color: '#012275',
    border: '1px solid #012275'
  },
  urgencyButtonStyle: {
    backgroundColor: "#E2E8F0",
    borderRadius: "22px",
    color: "#011342",
    fontSize: "14px",
    height: "33px",
    textTransform: "none" as 'none',
    padding: "8px 12px 8px 12px",
    width: "fit-content",
    fontFamily: 'Inter'
  },
  selectField: {
    width: '100%',
    border: '1px solid #011342',
    backgroundColor: 'transparent',
    outline: 'none',
    padding: '10px 12px 10px 12px',
    borderRadius: '8px',
    fontSize: '16px'
  },
  buttonStyle: {
    width: '160px',
    borderRadius: '8px',
    fontWeight: 700,
    fontFamily: 'Inter',
    textTransform: 'capitalize' as 'capitalize',
    height: '44px'
  },
  reactCalendarBox: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute' as 'absolute',
    top: '48px',
    right: 0,
    flexDirection: 'column' as 'column',
    border: '1px solid grey',
    borderRadius: '8px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px',
    background: "#FFF",
    overflow: 'hidden',
    padding: '20px 0',
    zIndex: 9
  }
};
// Customizable Area End
