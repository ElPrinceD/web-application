import React from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Link,
  Typography,
  // Customizable Area Start
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
require("isomorphic-fetch");
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { calendar2 } from "./assets";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import Loader from "../../../components/src/Loader.web";
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';

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
});
// Customizable Area End

import OutlookCalendarController, {
  Props,
  configJSON,
} from "./OutlookCalendarController";

class OutlookCalendar extends OutlookCalendarController {
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

  renderEventAttendee = (attendee: { responseStatus: string; email: string }, index: number) => {
    let IconComponent;

    switch (attendee.responseStatus) {
      case "accepted":
        IconComponent = CheckIcon;
        break;
      case "declined":
        IconComponent = CancelIcon;
        break;
      default:
        IconComponent = CircleIcon;
    }

    return (
      <Box key={index} style={webStyle.attendeedWrapper}>
        <IconComponent style={webStyle.attendeedIcon} fontSize={"small"} />
        <Typography>{attendee.email}</Typography>
      </Box>
    );
  }

  renderOutlookCalendarScreen = () => {
    if (this.props.calendarData && this.props.calendarData.length > 0) {
      return (
        <Box className="dashboard-calendar" style={webStyle.calendarWrapper}>
          <FullCalendar
            key={this.props.date}
            plugins={[timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
            initialView="timeGridDay"
            events={this.props.calendarData}
            initialDate={this.props.date}
            headerToolbar={false}
            allDaySlot={false}
            eventContent={this.renderEventContent}
            slotLabelFormat={{
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }}
          />
        </Box>
      )
    } else {
      return (
        <Box style={{ paddingBottom: "40px" }}>
          <Box style={{ justifyContent: 'center', display: 'flex' }}>
            <img
              style={{ width: "280px", height: "280px" }}
              src={calendar2}
            />
          </Box>
          <Box>
            <Typography
              style={{
                fontFamily: "Inter",
                color: "#011342",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "26px",
              }}
            >
              No Meetings!
            </Typography>
            <Typography
              style={{
                color: "#011342",
                textAlign: "center",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "21px",  
              }}
            >
              Sit back and Relax. You don’t have any meetings scheduled for
              today
            </Typography>
          </Box>
        </Box>
      )
    }
  }

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"} style={{ padding: 0 }}>
          {this.state.loader && <Loader loading={this.state.loader} />}
          <Box sx={webStyle.mainWrapper}>
            {
              this.state.isSynced ? this.renderOutlookCalendarScreen() :
                <Box style={{ paddingBottom: "40px" }}>
                  <Box style={webStyle.syncOffBoxStyle}>
                    <Typography
                      style={{
                        fontFamily: "Inter",
                        color: "#64748B",
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    >
                      {configJSON.outlookSyncOffText}
                    </Typography>
                    <Button style={webStyle.syncButtonStyle} onClick={this.handleSyncWithOutlook} data-test-id="sync-outlook-btn">
                      <LoopRoundedIcon style={{color: '#fff', marginRight: '5px'}}/>
                      Sync Now
                    </Button>
                  </Box>
                </Box>
            }
          </Box>
        </Container>
        <Dialog
          open={this.state.selectedEventDetails !== null}
          onClose={this.closeModalHandle}
        >
          {this.state.selectedEventDetails && (
            <DialogContent>
              <Typography variant="h6">
                {this.state.selectedEventDetails.event.title}
              </Typography>
              <Typography>
                {this.getDate(
                  this.state.selectedEventDetails.event.start ?? Date(),
                  this.state.selectedEventDetails.event.end ?? Date()
                )}
              </Typography>
              <Typography component={'div'}>
                <div dangerouslySetInnerHTML={{ __html: this.state.selectedEventDetails.event.extendedProps.description }}></div>
              </Typography>
              <Typography>
                {this.state.selectedEventDetails.event.extendedProps.conferenceData
                  ?.entryPoints[0]?.uri && (
                    <Link
                      style={webStyle.link}
                      target="_blank"
                      href={
                        this.state.selectedEventDetails.event.extendedProps
                          .conferenceData.entryPoints[0].uri
                      }
                    >
                      {
                        this.state.selectedEventDetails.event.extendedProps
                          .conferenceData.entryPoints[0].uri
                      }
                    </Link>
                  )}
              </Typography>
              <Box>
                <Typography style={webStyle.guestTitle}>
                  {configJSON.guestText}
                </Typography>
                {this.state.selectedEventDetails.event.extendedProps.attendees?.map(
                  (
                    attendee: { responseStatus: string; email: string },
                    index: number
                  ) => this.renderEventAttendee(attendee, index))}
              </Box>
            </DialogContent>
          )}
          <DialogActions>
            <Button
              data-test-id="btnCloseModal"
              style={{ backgroundColor: "#3f51b5" }}
              onClick={this.closeModalHandle}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
      // Customizable Area End
    );
  }
  // Customizable Area End
}

// Customizable Area Start
export default OutlookCalendar;
const webStyle = {
  wraper: {
    flex: 1,
    width: "100vw",
    height: "80vh",
    padding: 16,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  container: {
    width: "80vw",
    margin: "0 auto",
  },
  link: {
    color: "#1A73E8",
    cursor: "pointer",
    fontSize: 18,
  },
  event: {
    backgroundColor: "#1A73E8",
    padding: '0 5px',
    borderRadius: 4,
    width: "100%",
    height: '100%',
    overflow: "hidden",
    cursor: "pointer",
  },
  eventTitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: 'Inter'
  },
  mainWrapper: {
    display: "flex",
    flexDirection: 'column' as 'column',
    alignItems: "center",
    background: "#fff",
    position: 'relative'
  },
  calendarWrapper: {
    width: "320px",
    marginTop: 15,
  },
  googleSigninButton: {
    backgroundColor: "#fff",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.54)",
    boxShadow:
      "rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px",
    borderRadius: 2,
    border: "1px solid transparent",
    fontSize: 14,
    fontWeight: 500,
    padding: 10,
    marginTop: 20,
    textTransform: 'capitalize' as 'capitalize',
    position: 'absolute' as 'absolute',
    left: 0
  },
  attendeedWrapper: {
    display: "flex",
    flexDirection: "row" as "row",
    padding: 2,
  },
  attendeedIcon: {
    marginTop: 3,
    marginRight: 10,
  },
  guestTitle: {
    marginTop: 20,
    marginBottom: 5,
  },
  syncButtonStyle: {
    background: '#012275',
    color: '#fff',
    width: '122px',
    height: '38px',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'Inter',
    textTransform: 'capitalize' as 'capitalize'
  },
  syncOffBoxStyle: {
    minHeight: '348px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    gap: '10px',
    alignItems: 'center'
  }
};
// Customizable Area End
