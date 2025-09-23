import React from "react";

import {
  Container,
  Box,
  Button,
  Typography,
  // Customizable Area Start
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  TextField,
  Select,
  MenuItem,
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { calendar2 } from "./assets";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Loader from "../../../components/src/Loader.web";
import LoopRoundedIcon from '@material-ui/icons/LoopRounded';


const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
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

import GoogleCalendarSyncController, {
  Props,
  configJSON,
} from "./GoogleCalendarSyncController.web";

export default class GoogleCalendarSync extends GoogleCalendarSyncController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderEventContent = (eventInfo: EventContentArg) => {
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

  renderGoogleCalendarScreen = () => {
    if (this.props.calendarData && this.props.calendarData.length > 0) {
      return (
        <Box className="dashboard-calendar" style={webStyle.calendarWrapper}>
          <FullCalendar
            key={this.props.date}
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            initialDate={this.props.date}

            events={this.props.calendarData}
            headerToolbar={false}
            allDaySlot={false}
            eventContent={this.renderEventContent}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
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
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{ width: "280px", height: "280px" }}
              src={calendar2}
            />
          </Box>
          <Box>
            <Typography
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "18px",
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
              {configJSON.noMeetingText}
            </Typography>
          </Box>
        </Box>
      )
    }
  }

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container style={{ padding: 0 }} maxWidth={"md"}>
          {this.state.loader && <Loader loading={this.state.loader} />}
          <Box sx={webStyle.mainWrapper}>
            {
              this.state.isSynced ? this.renderGoogleCalendarScreen() :
              <Box style={{ paddingBottom: "40px" }}>
                <Box style={webStyle.syncOffBoxStyle}>
                  <Typography
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      color: "#64748B",
                      textAlign: "center",
                    }}
                  >
                    {configJSON.googleSyncOffText}
                  </Typography>
                  <Button style={webStyle.syncButtonStyle} onClick={this.handleGoogleSync} data-test-id="googleSyncBtn">
                    <LoopRoundedIcon style={{color: '#fff', marginRight: '5px'}}/>
                    Sync Now
                  </Button>
                </Box>
              </Box>
            }
          </Box>
        </Container>

        <Dialog
          open={this.state.selectedEvent !== null}
          onClose={this.closeModalHandle}
        >
          {this.state.selectedEvent && (
            <DialogContent>
              <Typography variant="h6">
                {this.state.selectedEvent.event.title}
              </Typography>
              <Typography>
                {this.getDate(
                  this.state.selectedEvent.event.start ?? Date(),
                  this.state.selectedEvent.event.end ?? Date()
                )}
              </Typography>
              <Typography component={'div'}>
                <div dangerouslySetInnerHTML={{ __html: this.state.selectedEvent.event.extendedProps.description }}></div>
              </Typography>
              <Typography>
                {this.state.selectedEvent.event.extendedProps.conferenceData
                  ?.entryPoints[0]?.uri && (
                    <Link
                      style={webStyle.link}
                      target="_blank"
                      href={
                        this.state.selectedEvent.event.extendedProps
                          .conferenceData.entryPoints[0].uri
                      }
                    >
                      {
                        this.state.selectedEvent.event.extendedProps
                          .conferenceData.entryPoints[0].uri
                      }
                    </Link>
                  )}
              </Typography>
              <Box>
                <Typography style={webStyle.guestTitle}>
                  {configJSON.guestText}
                </Typography>
                {this.state.selectedEvent.event.extendedProps.attendees?.map(
                  (
                    item: { responseStatus: string; email: string },
                    index: number
                  ) => {
                    return (
                      <Box key={index} style={webStyle.attendeedWrapper}>
                        {item.responseStatus === "accepted" ? (
                          <CheckIcon
                            style={webStyle.attendeedIcon}
                            fontSize={"small"}
                          />
                        ) : item.responseStatus === "declined" ? (
                          <CancelIcon
                            style={webStyle.attendeedIcon}
                            fontSize={"small"}
                          />
                        ) : (
                          <CircleIcon
                            style={webStyle.attendeedIcon}
                            fontSize={"small"}
                          />
                        )}
                        <Typography>{item.email}</Typography>
                      </Box>
                    );
                  }
                )}
              </Box>
            </DialogContent>
          )}
          <DialogActions>
            <Button
              style={{ backgroundColor: "#3f51b5" }}
              onClick={this.closeModalHandle}
              color="primary"
              variant="contained"
              data-test-id="btnCloseModal"
            >
              {configJSON.cancelText}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.openAddModal} onClose={this.closeModalHandle}>
          <DialogTitle>{configJSON.addEventText}</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              label={configJSON.summaryPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.summary}
              name="summary"
              onChange={this.onChangeHandler}
              data-test-id="summaryInput"
            />
            <TextField
              variant="outlined"
              label={configJSON.startDatePlaceholder}
              fullWidth
              style={webStyle.textField}
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={this.state.inputFields.start}
              name="start"
              onChange={this.onChangeHandler}
              data-test-id="startDateInput"
            />
            <TextField
              variant="outlined"
              label={configJSON.endDatePlaceholder}
              fullWidth
              style={webStyle.textField}
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={this.state.inputFields.end}
              name="end"
              onChange={this.onChangeHandler}
              data-test-id="endDateInput"
            />
            <Select
              variant="outlined"
              name="timezone"
              value={this.state.inputFields.timezone}
              onChange={this.onChangeHandler}
              fullWidth
              style={webStyle.textField}
            >
              {this.timeZone.map((zone) => (
                <MenuItem key={zone.value} value={zone.value}>
                  {zone.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              variant="outlined"
              label={configJSON.locationPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.location}
              name="location"
              onChange={this.onChangeHandler}
              data-test-id="locationInput"
            />
            <TextField
              variant="outlined"
              label={configJSON.descriptionPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.description}
              name="description"
              onChange={this.onChangeHandler}
              data-test-id="descriptionInput"
            />
            <TextField
              variant="outlined"
              label={configJSON.attendeesPlaceholder}
              fullWidth
              style={webStyle.textField}
              value={this.state.inputFields.attendees}
              name="attendees"
              onChange={this.onChangeHandler}
              helperText={configJSON.attendeesHelperText}
              data-test-id="attendeesInput"
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ backgroundColor: "#3f51b5" }}
              onClick={this.closeModalHandle}
              color="primary"
              variant="contained"
            >
              {configJSON.cancelText}
            </Button>
            <Button
              style={{ backgroundColor: "#3f51b5" }}
              onClick={this.addEvent}
              color="primary"
              variant="contained"
              data-test-id="btnSaveEvent"
            >
              {configJSON.saveText}
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
    position: 'relative',
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
  },
  googleSigninButton: {
    position: 'absolute' as 'absolute',
    left: 0,
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
    textTransform: 'capitalize' as 'capitalize'
  },
  googleIcon: {
    height: 18,
    marginRight: 10,
  },
  calendarWrapper: {
    width: "320px",
    marginTop: 15,
  },
  event: {
    width: "100%",
    height: '100%',
    backgroundColor: "#1A73E8",
    padding: '0 5px',
    borderRadius: 4,
    overflow: "hidden",
    cursor: "pointer",
  },
  eventTitle: {
    color: "#fff",
    fontSize: 14,
  },
  link: {
    color: "#1A73E8",
    cursor: "pointer",
    fontSize: 18,
  },
  guestTitle: {
    marginTop: 20,
    marginBottom: 5,
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
  textField: {
    marginBottom: 15,
  },
  syncButtonStyle: {
    width: '122px',
    height: '38px',
    fontFamily: 'Inter',
    background: '#012275',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '14px',
    textTransform: 'capitalize' as 'capitalize'
  },
  syncOffBoxStyle: {
    minHeight: '348px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  }
};
// Customizable Area End
