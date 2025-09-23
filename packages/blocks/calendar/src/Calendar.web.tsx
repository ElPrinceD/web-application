import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  Link,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Avatar
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { darkBellIcon, googleImg, meetingDescIcon, meetingHeadingIcon, outlookImg, peopleIcon, renotaryImg } from "./assets"
import GoogleCalendarSync from "../../googlecalendarsync/src/GoogleCalendarSync.web";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import OutlookCalendar from "../../outlookintegration/src/OutlookCalendar.web";
import Loader from "../../../components/src/Loader.web";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },

  overrides: {
    MuiTabs: {
      "flexContainer": {
        justifyContent: 'space-around'
      },
      root: {
        "& .MuiTabs-indicator": {
          backgroundColor: "#012275",
        },
      }
    },

    MuiTab: {
      root: {
        fontWeight: 500,
        fontFamily: 'Inter',
        textTransform: 'capitalize',
        "&.MuiTab-textColorPrimary": {
          color: "#000"
        },
        "&.MuiTab-textColorPrimary.Mui-selected": {
          color: "#64748B",
        },
        "@media(min-width: 600px)": {
          "&.MuiTab-root": {
            minWidth: '50px',
            opacity: 1
          }
        }

      }
    }
  }
});

const PageStyling = styled(Box)({
  "& .react-calendar": {
    border: "none",
    fontFamily: "Inter",
    width: '310px'
  },
  "& .react-calendar__month-view__weekdays": {
    fontWeight: 400,
    textTransform: "none",
    color: "#64748B",
    fontSize: "14px",
    lineHeight: "22px",
  },
  "& .react-calendar__month-view__weekdays__weekday": {
    // padding: '0',
    // width: '40px'
  },
  "& .react-calendar__month-view__days__day--weekend": {
    color: "#011342",
  },
  "& .react-calendar__tile": {
    fontSize: "14px",
  },
  "& .react-calendar__month-view__days__day--neighboringMonth": {
    color: "#757575 !important",
  },
  "& .react-calendar__navigation": {
    margin: 0
  },
  "& .react-calendar__navigation__arrow react-calendar__navigation__prev2-button":
  {
    display: "none",
  },
  "& .react-calendar__tile--active": {
    background: "#012275",
  },
  "& .react-calendar__tile--active:enabled:hover": {
    background: "#012275",
  },

  "& .react-calendar__tile--active:enabled:focus": {
    background: "#012275",
  },
  "& .react-calendar__tile--now:enabled:hover, & .react-calendar__tile--now:enabled:focus":
  {
    background: "#012275",
    color: "white",
  },
  "& .react-calendar__tile--now": {
    background: "#F0E5FF",
    color: "black",
  },
  "& .react-calendar__month-view__days__day": {
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    maxWidth: "45px"
  },
  "& .react-calendar__navigation__next-button": {
    fontSize: "30px",
    color: "#94A3B8",
  },
  "& .react-calendar__navigation__prev-button": {
    fontSize: "30px",
    color: "#94A3B8",
  },
  "& .react-calendar__navigation__label__labelText--from": {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "14px",
  },
  "& .Styled(MuiBox)-root-4 .react-calendar__tile--now:enable:focus !important":
  {
    color: "white",
  },
  "& .sidebarul": {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
  },
  "& .sidebarul li": {
    fontSize: "20px",
    color: "#011342",
    cursor: "pointer",
    transition: "color 0.3s ease",
    position: "relative",
    fontFamily: "Inter",
  },
  "& .sidebarul li:hover::after": {
    content: "''",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "-2px",
    height: "2px",
    backgroundColor: "blue",
  },
});
import { configJSON } from "./CalendarController";
// Customizable Area End
import CalendarController, { Props } from "./CalendarController";
import { calendar2 } from "./assets";
export default class Calendarr extends CalendarController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End     
  }
  // Customizable Area Start
  renderEventContent = (eventInfo: any) => {
    return (
      <Box
        data-test-id="btnEventInfo"
        style={webStyle.event}
        onClick={() => this.setEventInfo(eventInfo)}
      >
        <Typography style={webStyle.eventTitle}>
          {eventInfo.event.title}
        </Typography>
      </Box>
    );
  };

  renderEventAttendee = (item: { responseStatus: string; email: string }, index: number) => {
    let IconComponent;

    switch (item.responseStatus) {
      case "declined":
        IconComponent = CancelIcon;
        break;
      case "accepted":
        IconComponent = CheckIcon;
        break;
      default:
        IconComponent = CircleIcon;
    }

    return (
      <Box key={index} style={webStyle.attendeeBox}>
        <IconComponent fontSize={"small"} style={webStyle.attendeeIcon} />
        <Typography>{item.email}</Typography>
      </Box>
    );
  }

  renderRenotaryEventAttendee = (item: {
    id: string;
    name: string;
    role: string;
    photoUrl?: string;
  }, index: number) => {

    return (
      <Box key={index} style={{ ...webStyle.attendeeBox, alignItems: 'center', gap: '10px' }}>
        <Avatar style={{ width: '32px', height: '32px' }} src={item.photoUrl} />
        <Typography>{item.name}</Typography>
      </Box>
    );
  }
  // Customizable Area End

  render() {

    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <MainContainerBox>
          {/* TEMPORARILY REMOVED LOADER */}
        {/* {this.state.loader && <Loader loading={this.state.loader} />} */}
          <Box>
            <Box>
              <PageStyling>
                <Calendar
                  onChange={this.onChange}
                  data-test-id="calendar"
                  value={this.state.date}
                  next2Label={null}
                  prev2Label={null}
                  showFixedNumberOfWeeks={true}
                />
              </PageStyling>
            </Box>
            <Box
              style={{
                marginTop: "10px",
                marginLeft: "5px",
                fontWeight: 500,
                color: "#011342",
                fontSize: "14px",
                lineHeight: "21px",
                fontFamily: "Inter",
              }}
            >
              {this.showDate()}
            </Box>
          </Box>
          <Box>
            <Tabs
              value={this.state.selectedEventTab}
              onChange={this.handleEventTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="All" {...this.a11yProps(0)} style={{ textTransform: 'capitalize', color: "#011342", fontFamily: "Inter", fontWeight: 500 }} />
              <Tab icon={<img src={renotaryImg} />} label="" {...this.a11yProps(1)} />
              <Tab icon={<img src={outlookImg} width={30} height={30} />} label="" {...this.a11yProps(2)} />
              <Tab icon={<img src={googleImg} width={30} height={30} />} label="" {...this.a11yProps(3)} />
            </Tabs>
            {
              this.state.selectedEventTab === 0 &&
              (
                this.renderFilteredAllEvents().length > 0 ?
                  <Box className="dashboard-calendar" style={webStyle.calendarWrapper}>
                    <FullCalendar
                      key={this.state.date}
                      plugins={[timeGridPlugin, interactionPlugin]}
                      events={this.renderFilteredAllEvents()}
                      headerToolbar={false}
                      initialView="timeGridDay"
                      initialDate={this.state.date}
                      eventContent={this.renderEventContent}
                      allDaySlot={false}
                      eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }}
                      slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }}
                    />
                  </Box> :

                  <Box style={{ paddingBottom: "40px" }}>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={calendar2}
                        style={{ height: "280px", width: "280px" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          fontWeight: 700,
                          lineHeight: "26px",
                          fontSize: "18px",
                          fontFamily: "Inter",
                          color: "#011342",
                          textAlign: "center",
                        }}
                      >
                        No Meetings!
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Inter",
                          lineHeight: "21px",
                          color: "#011342",
                          fontWeight: 500,
                          fontSize: "14px",
                          textAlign: "center",
                        }}
                      >
                        Sit back and Relax. You don’t have any meetings scheduled for
                        today
                      </Typography>
                    </Box>
                  </Box>
              )

            }
            {
              this.state.selectedEventTab === 1 &&
              (
                this.renderFilteredEvents().length > 0 ?
                  <Box style={webStyle.calendarWrapper} className="dashboard-calendar">
                    <FullCalendar
                      key={this.state.date}
                      plugins={[timeGridPlugin, interactionPlugin]}
                      initialView="timeGridDay"
                      initialDate={this.state.date}

                      events={this.renderFilteredEvents()}
                      headerToolbar={false}
                      eventContent={this.renderEventContent}
                      slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }}
                      allDaySlot={false}
                      eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }}
                    />
                  </Box> :

                  <Box style={{ paddingBottom: "40px" }}>
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={calendar2}
                        style={{ width: "280px", height: "280px" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          fontSize: "18px",
                          fontFamily: "Inter",
                          fontWeight: 700,
                          lineHeight: "26px",
                          color: "#011342",
                          textAlign: "center",
                        }}
                      >
                        No Meetings!
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "21px",
                          color: "#011342",
                          textAlign: "center",
                        }}
                      >
                        Sit back and Relax. You don’t have any meetings scheduled for
                        today
                      </Typography>
                    </Box>
                  </Box>
              )

            }
            {
              this.state.selectedEventTab === 2 &&
              <OutlookCalendar
                navigation={undefined}
                id={""}
                date={this.state.date}
                onCalendarDataChange={this.renderFilteredOutlookEvents}
                calendarData={this.state.outlookCalendarData}
                isSynced={this.state.outlookAuthDetails}
                triggerEvent={this.getOutlookEvents}
              />
            }
            {
              this.state.selectedEventTab === 3 &&
              <GoogleCalendarSync
                navigation={undefined}
                id={""}
                date={this.state.date}
                onCalendarDataChange={this.renderFilteredGoogleEvents}
                calendarData={this.state.googleCalendarData}
                isSynced={this.state.googleAuthDetails}
                triggerEvent={this.getGoogleEvents}
              />
            }
          </Box>

        </MainContainerBox>
        <Dialog
          open={this.state.selectedCalendarEvent !== null}
          onClose={this.closeModalHandle}
        >
          {this.state.selectedCalendarEvent && (
            <DialogContent style={{ position: 'relative' }}>
              <CloseRoundedIcon style={webStyle.closeIconStyle} onClick={this.closeModalHandle} />
              <Box style={{ display: "flex", gap: '10px' }}>
                <img src={meetingHeadingIcon} alt="" style={{ width: '24px', height: '24px' }} />
                <Typography style={webStyle.meetingHeadingStyle}>
                  Renotary Meeting
                </Typography>
              </Box>

              <Typography style={webStyle.meetingPopupDateStyle}>
                {this.renderDate(
                  this.state.selectedCalendarEvent.event.start ?? Date(),
                  this.state.selectedCalendarEvent.event.end ?? Date()
                )}
              </Typography>
              <Box style={{ overflow: "hidden", display: "flex", gap: '10px', padding: '20px 0' }}>
                <LocationOnRoundedIcon />

                {this.state.selectedCalendarEvent.event.extendedProps.conferenceData
                  ?.entryPoints[0]?.uri &&
                  <Typography style={webStyle.meetLocationStyle}>
                    {
                      this.state.selectedCalendarEvent.event.extendedProps
                        .conferenceData.entryPoints[0].uri
                    }
                  </Typography>
                }
              </Box>
              <Box>
                <Typography style={webStyle.guestTitle}>
                  <img src={peopleIcon} alt="" style={{ width: '24px', height: '24px' }} />
                  Guest
                </Typography>
                {
                  this.state.selectedCalendarEvent.event.extendedProps.accounts ?
                    <>
                      {this.state.selectedCalendarEvent.event.extendedProps.accounts.map(
                        (item: {
                            name: string;
                            role: string;
                            id: string;
                            photoUrl?: string;
                          },index: number) => this.renderRenotaryEventAttendee(item, index))}
                    </> :
                    <>
                      {this.state.selectedCalendarEvent.event.extendedProps.attendees?.map(
                        (
                          item: { responseStatus: string; email: string },
                          index: number
                        ) => this.renderEventAttendee(item, index))}
                    </>
                }
              </Box>
              <Box style={{ display: 'flex', padding: '20px 0', gap: '10px', overflow: 'hidden' }}>
                <img src={meetingDescIcon} alt="" style={{ width: '24px', height: '24px' }} />
                <Typography style={webStyle.meetingDescriptionStyle}>
                  <div dangerouslySetInnerHTML={{ __html: this.state.selectedCalendarEvent.event.extendedProps.description || this.state.selectedCalendarEvent.event.extendedProps.summary }}></div>
                </Typography>
              </Box>

              <Box style={{ display: "flex", gap: '10px', overflow: "hidden", flexDirection: 'column', paddingLeft: '30px' }}>
                <Typography
                  style={{ color: "#011342", fontSize: '14px', fontWeight: 500, fontFamily: "Inter", }}>
                  Join Meeting
                </Typography>
                <Typography>
                  {this.state.selectedCalendarEvent.event.extendedProps.conferenceData
                    ?.entryPoints[0]?.uri && (
                      <Link
                        style={webStyle.link}
                        target="_blank"
                        href={
                          this.state.selectedCalendarEvent.event.extendedProps
                            .conferenceData.entryPoints[0].uri
                        }
                      >
                        {
                          this.state.selectedCalendarEvent.event.extendedProps
                            .conferenceData.entryPoints[0].uri
                        }
                      </Link>
                    )}
                </Typography>
              </Box>

              <Box style={{ fontFamily: "Inter", padding: '10px 0 0 30px', display: 'flex', gap: '10px', fontSize: '14px', fontWeight: 500, color: '#011342' }}>
                {`Meeting ID : ${this.state.selectedCalendarEvent.event.id}`}
              </Box>
              <Box style={{ padding: '10px 0 0 30px', fontFamily: "Inter", display: 'flex', gap: '10px', fontSize: '14px', fontWeight: 500, color: '#011342' }}>
                {this.state.selectedCalendarEvent.event._def?.extendedProps.passcode ? `Passcode :${this.state.selectedCalendarEvent.event._def.extendedProps.passcode}` : ''}
              </Box>
              <Box style={{ color: '#011342', fontFamily: "Inter", padding: '30px 0 20px 0', display: 'flex', gap: '10px', fontSize: '14px', fontWeight: 500, }}>
                <img src={darkBellIcon} alt="" width='15.17px' height='19.5px' />
                {this.calculatedTime(this.state.selectedCalendarEvent)}
              </Box>

            </DialogContent>
          )}
        </Dialog>
        <Dialog
          open={this.state.isMeetingConflicting}
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ color: '#0131A8', fontSize: '20px', fontWeight: 700, fontFamily: 'Inter' }}>Meeting Conflict</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{ color: '#011342', fontSize: '14px', fontWeight: 400, fontFamily: 'Inter' }}>
              There are meeting conflicts for the day in your calendars. Please check.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ background: '#012275', color: '#fff' }}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>

      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "40px",
    background: "#fff",
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },

  calendarWrapper: {
    // width: "100%",
    marginTop: 15,
    width: "320px"
  },
  event: {
    padding: 5,
    borderRadius: 4,
    width: "100%",
    overflow: "hidden",
    cursor: "pointer",
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  eventTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: 'Inter'
  },
  link: {
    color: "#1A73E8",
  },
  guestTitle: {
    marginTop: 20,
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  attendeeBox: {
    display: "flex",
    flexDirection: "row" as "row",
    padding: 2,
  },
  attendeeIcon: {
    marginTop: 3,
    marginRight: 10,
  },
  closeIconStyle: {
    position: 'absolute' as 'absolute',
    top: 10,
    right: 20,
    color: '#011342'
  },
  meetingHeadingStyle: {
    fontSize: '18px',
    fontWeight: 500,
    color: '#011342',
    fontFamily: "Inter"
  },
  meetingPopupDateStyle: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#011342',
    fontFamily: "Inter",
    paddingLeft: '30px'
  },
  meetLocationStyle: {
    color: "#011342",
    fontSize: '14px',
    fontweight: 500,
    fontFamily: "Inter",
    overflow: "hidden",
    textWrap: "nowrap" as "nowrap",
    textOverflow: "ellipsis",
  },
  meetingDescriptionStyle: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#011342',
    fontFamily: "Inter",
    wordWrap: "break-word" as "break-word"
  }
};

const MainContainerBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  width: "375px",
  padding: "24px 24px 24px 24px",
  background: "#ffffff",
  borderRadius: "12px",
  flexDirection: "column",
  // marginTop: "8px",
  position: "relative",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  boxSizing: 'border-box',
  "@media(max-width: 1160px)": {
    width: "auto",
    flexDirection: "row",
  }
});

// Customizable Area End
