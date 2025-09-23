import React from "react";

// Customizable Area Start
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, Typography } from "@material-ui/core";
import NavigationMenu from "./NavigationMenu.web";
import { AddRounded, Close, Menu } from "@material-ui/icons";
import { bellIcon, darkBellIcon, localProfile, meetingDescIcon, meetingHeadingIcon, peopleIcon, } from "./assets";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import CircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import Loader from "../../../components/src/Loader.web";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import RequestModal from "../../dashboard/src/BookNotaryRequest.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";



const theme = createTheme({
    palette: {
        primary: {
            main: "#fff",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: 'Inter',
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
                padding: '2px',
                gap: '10px'
            },
            root: {
                minWidth: '220px',
                width: '22%',
                "& .MuiTabs-indicator": {
                    backgroundColor: "#012275",
                    display: 'none'
                },
            }
        },
    }
});






// Customizable Area End

import CalendarsController, {
    Props,
} from "./CalendarsController";

export default class Calendars extends CalendarsController {
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
                className="event_box"
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
            <Box key={index} style={{ ...webStyle.attendeedWrapper, alignItems: 'center', gap: '10px' }}>
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
                {this.state.loader && <Loader loading={this.state.loader} />}
                <Box sx={{ display: 'flex', width: '100%', height: "100%", overflow: 'hidden' }}>
                    <DesktopDrawerBox>
                        <NavigationMenu navigation={this.props.navigation} id="" />
                        <Box className="right-side-container">
                            <Box display={"flex"} alignItems={"center"} padding={"32 25"}>
                                <Box style={{ width: '100%' }}>
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            style={{ columnGap: "8px" }}
                                        >
                                            <Typography
                                                style={{
                                                    fontFamily: "Inter",
                                                    fontWeight: 700,
                                                    fontSize: "24px",
                                                    letterSpacing: "-0.5%",
                                                }}
                                            >
                                                Calendar
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
                            <Box className={`calendar-container ${this.state.selectedTab}-calendar-container`} style={webStyle.calendarWrapper}>
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    initialView="timeGridDay"
                                    headerToolbar={{
                                        left: 'title',
                                        center: 'prev,next customButtons1 customButtons2 customButtons3 customButtons4',
                                        right: 'timeGridDay,timeGridWeek,dayGridMonth'
                                    }}
                                    events={this.renderCalendarEvent()}
                                    dayHeaderFormat={{
                                        weekday: 'short',
                                    }}

                                    slotLabelFormat={{
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: false
                                    }}
                                    eventContent={this.renderEventContent}
                                    handleWindowResize={true}
                                    aspectRatio={1}
                                    contentHeight="auto"
                                    customButtons={{
                                        customButtons1: {
                                            text: 'All',
                                            click: () => this.handleTabClick('All'),
                                        },
                                        customButtons2: {
                                            text: '',
                                            click: () => this.handleTabClick('renotary'),
                                        },
                                        customButtons3: {
                                            text: "",
                                            click: () => this.handleTabClick('outlook'),
                                        },
                                        customButtons4: {
                                            text: "",
                                            click: () => this.handleTabClick('google'),
                                        },
                                    }}
                                    allDaySlot={false}
                                    datesSet={(info) => { this.setdateInfo(info) }}
                                />
                            </Box>
                        </Box>
                    </DesktopDrawerBox>
                </Box>
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
                                    {this.state.selectedCalendarEvent.event.title}
                                </Typography>
                            </Box>

                            <Typography style={webStyle.meetingDateStyle}>
                                {this.getDate(
                                    this.state.selectedCalendarEvent.event.start ?? Date(),
                                    this.state.selectedCalendarEvent.event.end ?? Date()
                                )}
                            </Typography>
                            <Box style={{ display: "flex", gap: '10px', overflow: "hidden", padding: '20px 0' }}>
                                <LocationOnRoundedIcon />

                                {this.state.selectedCalendarEvent.event.extendedProps.conferenceData
                                    ?.entryPoints[0]?.uri &&
                                    <Typography style={webStyle.locationStyle}>
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
                                                (
                                                    item: {
                                                        id: string;
                                                        name: string;
                                                        role: string;
                                                        photoUrl?: string;
                                                    },
                                                    index: number
                                                ) => this.renderRenotaryEventAttendee(item, index))}
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
                            <Box style={{ display: 'flex', gap: '10px', padding: '20px 0', overflow: 'hidden' }}>
                                <img src={meetingDescIcon} alt="" style={{ width: '24px', height: '24px' }} />
                                <Typography style={webStyle.meetingDescStyle}>
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

                            <Box style={{ padding: '10px 0 0 30px', display: 'flex', gap: '10px', fontSize: '14px', fontWeight: 500, }}>
                                {`Meeting ID : ${this.state.selectedCalendarEvent.event.id}`}
                            </Box>
                            <Box style={{ padding: '10px 0 0 30px', display: 'flex', gap: '10px', fontSize: '14px', fontWeight: 500, }}>
                                {this.state.selectedCalendarEvent.event._def?.extendedProps.passcode ? `Passcode :
                                ${this.state.selectedCalendarEvent.event._def.extendedProps.passcode}` : ''}
                            </Box>
                            <Box style={{ padding: '30px 0 20px 0', display: 'flex', gap: '10px', fontSize: '14px', fontWeight: 500, }}>
                                <img src={darkBellIcon} alt="" width='15.17px' height='
19.5px' />
                                {this.calculatedTime(this.state.selectedCalendarEvent)
                                }
                            </Box>
                        </DialogContent>
                    )}
                </Dialog>
                <Dialog
                    open={this.state.isMeetingConflicting}
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
                        <Button onClick={this.handleConflictClose} style={{ background: '#012275', color: '#fff' }}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <RequestModal
                    navigation={undefined}
                    id={""}
                    isOpen={this.state.notaryRequestModalOpen}
                    closeModal={this.closeReqModal}
                    data-testID="modalOpen"
                    allRequestAPI={this.allRequestAPI}
                    serviceData={this.state.serviceData}
                    cancelReqModal={this.state.cancelReqModal}
                    yesButtonClick={this.yesButtonClick}
                    noButtonClick={this.noButtonClick}
                    setLoader={this.setLoader}
                    setModal={this.setModal}
                    editRequest={this.state.editRequest}
                    backToEditRequest={() => {}} 
                    isNewRequestOrEditRequestOrInviteClient={this.state.isNewRequestOrEditRequestOrInviteClient}
                />
            </ThemeProvider>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const DesktopDrawerBox = styled(Box)({
    width: '100%',
    display: "flex",
    background: "whitesmoke",
    "& .right-side-container": {
        width: "calc(100% - 200px)",
        height: "100%",
        overflowY: 'scroll'
    },
    "& .calendar-container .fc": {
        width: "100%",
        overflowX: "auto",
        background: "#fff",
    },
    "& .calendar-container .fc-direction-ltr .fc-timegrid-slot-label-frame": {
        fontFamily: "Inter",
        fontSize: "14px",
        color: "#011342",
        textAlign: "left",
    },
    "& .calendar-container .fc .fc-view-harness": {
        height: "calc(100vh - 240px)",
        overflowY: "scroll",
        scrollbarWidth: "none",
    },
    "& .calendar-container .fc .fc-view-harness::-webkit-scrollbar": {
        display: "none"
    },
    "& .calendar-container .fc .fc-timegrid-slot": {
        height: "2em"
    },
    "& .calendar-container .fc .fc-scroller::-webkit-scrollbar": {
        display: "none"
    },
    "& .calendar-container .fc .fc-scroller": {
        msOverflowStyle: "none",
        scrollbarWidth: "none"
    },
    "& .calendar-container .fc .fc-button-primary.fc-customButtons2-button": {
        backgroundImage: 'url(./renotary.png)',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "65px",
        height: "30px",
        border: "none",
        borderRadius: 0,
        backgroundColor: "unset",
        marginLeft: '2rem'
    },
    "& .calendar-container .fc .fc-button-primary.fc-customButtons3-button": {
        backgroundImage: 'url(./outlook_image.png)',
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "30px",
        height: "30px",
        border: "none",
        borderRadius: 0,
        backgroundColor: "unset",
        marginLeft: '2rem'
    },
    "& .calendar-container .fc .fc-button-primary.fc-customButtons4-button": {
        backgroundImage: 'url(./google_image.png)',
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "30px",
        height: "30px",
        border: "none",
        borderRadius: 0,
        backgroundColor: "unset",
        marginLeft: '2rem',
        position: 'relative'
    },
    "& .calendar-container .fc-customButtons1-button": {
        background: "#fff",
        color: "#011342",
        border: "none",
        borderRadius: 0,
        fontFamily: "Inter",
        marginLeft: '2rem',
        position: 'relative'
    },
    "& .calendar-container .fc-customButtons1-button::before": {
        content: "close-quote",
        width: '1px',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: '-14px',
        background: "#CCD3E3",
    },
    "& .calendar-container .fc-customButtons4-button::after": {
        content: "close-quote",
        width: '1px',
        height: '100%',
        position: 'absolute',
        top: 0,
        right: '-14px',
        background: "#CCD3E3",
    },
    "& .calendar-container .fc .fc-toolbar.fc-header-toolbar": {
        flexWrap: 'wrap',
    },
    "& .calendar-container .fc .fc-button-primary:focus": {
        boxShadow: "none"
    },
    "& .calendar-container.All-calendar-container .fc .fc-button-primary.fc-customButtons1-button": {
        borderBottom: "2px solid #011342"
    },
    "& .calendar-container.renotary-calendar-container .fc .fc-button-primary.fc-customButtons2-button": {
        borderBottom: "2px solid #011342"
    },
    "& .calendar-container.outlook-calendar-container .fc .fc-button-primary.fc-customButtons3-button": {
        borderBottom: "2px solid #011342"
    },
    "& .calendar-container.google-calendar-container .fc .fc-button-primary.fc-customButtons4-button": {
        borderBottom: "2px solid #011342"
    },
    "& .calendar-container .fc .fc-button-primary.fc-customButtons1-button:not(:disabled):active": {
        background: 'none',
        border: 'none',
        color: "#012275",
        borderRadius: 0,
        fontWeight: 400,
    },
    "& .calendar-container .fc .fc-button-primary.fc-customButtons2-button:not(:disabled):active": {
        backgroundColor: "unset",
        border: 'none',
        color: "#012275",
        borderRadius: 0,
        backgroundImage: 'url(./renotary.png)',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    "& .calendar-container .fc .fc-button-primary.fc-customButtons3-button:not(:disabled):active": {
        backgroundColor: "unset",
        backgroundImage: 'url(./outlook_image.png)',
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: 'none',
        color: "#012275",
        borderRadius: 0,
    },
    "& .calendar-container .fc .fc-button-primary.fc-customButtons4-button:not(:disabled):active": {
        backgroundColor: "unset",
        backgroundImage: 'url(./google_image.png)',
        backgroundSize: "20px 20px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: 'none',
        color: "#012275",
        borderRadius: 0,
    },
    "& .calendar-container .fc-next-button.fc-button.fc-button-primary": {
        background: "none",
        border: "none",
    },
    "& .calendar-container .fc-prev-button.fc-button.fc-button-primary": {
        background: "none",
        border: "none",
    },
    "& .calendar-container .fc-icon": {
        color: "#011342"
    },
    "& .calendar-container .fc .fc-button-group": {
        height: "50px",
        alignItems: "center",
        background: "#F8FAFC",
        padding: "10px",
        gap: "10px",
    },
    "& .calendar-container .fc .fc-button-group > .fc-button": {
        background: "#F8FAFC",
        color: "#64748B",
        fontsize: "14px",
        fontweight: 500,
        textTransform: "capitalize",
        fontFamily: "Inter",
        borderRadius: "50px",
        border: "none",
        lineHeight: "normal",
    },
    "& .calendar-container .fc .fc-button-primary:not(:disabled):active": {
        background: "#012275",
        color: "#FFFFFF",
        fontWeight: 700,
        borderRadius: "50px"
    },
    "& .calendar-container .fc .fc-button-primary:not(:disabled).fc-button-active": {
        background: "#012275",
        color: "#FFFFFF",
        fontWeight: 700,
        borderRadius: "50px"
    },
    "& .calendar-container .fc .fc-toolbar-title": {
        fontSize: "20px",
        fontWeight: 700,
        color: "#011342",
    },
    "& .fc .fc-daygrid-event": {
        backgroundColor: "#1A73E8",
    },
    "& .fc .fc-daygrid-event.renotary-meeting": {
        backgroundColor: "#012275",
    },
    "& .fc .fc-timegrid-col.fc-day-today": {
        backgroundColor: 'unset'
    },
    "@media (max-width: 1024px)": {
        "& .right-side-container": {
            width: "100%"
        },
    },
});

const StyledIconButton = styled(IconButton)({
    "@media (min-width: 1025px)": {
        display: "none",
    },
});

const webStyle = {
    mainWrapper: {

    },
    headerButtonStyle: {
        backgroundColor: "#012275",
        color: "#FFF",
        height: "48px",
        padding: "0 16px",
        textTransform: "capitalize" as "capitalize"
    },
    calendarWrapper: {
        maxWidth: "100%",
        margin: "0 auto",
        padding: "0 25px",
        borderRadius: "24px",
    },
    event: {
        display: 'flex',
        alignItems: 'center',
        padding: 5,
        borderRadius: 4,
        width: "100%",
        overflow: "hidden",
        cursor: "pointer",
        height: '100%'
    },
    eventTitle: {
        color: "#fff",
        fontSize: 14,
        fontFamily: 'Inter'
    },
    link: {
        color: "#0131A8",
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: "Inter",
        wordWrap: "break-word" as "break-word"
    },
    guestTitle: {
        color: '#011342',
        fontSize: '14px',
        fontweight: 500,
        fontFamily: "Inter",
        margin: '10px 0',
        display: "flex",
        gap: '10px',
        alignItems: 'center'
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
    meetingDateStyle: {
        fontSize: '14px',
        fontWeight: 500,
        color: '#011342',
        fontFamily: "Inter",
        paddingLeft: '32px'
    },
    locationStyle: {
        color: "#011342",
        fontSize: '14px',
        fontweight: 500,
        fontFamily: "Inter",
        overflow: "hidden",
        textWrap: "nowrap" as "nowrap",
        textOverflow: "ellipsis",
    },
    meetingDescStyle: {
        fontSize: '14px',
        fontWeight: 500,
        color: '#011342',
        fontFamily: "Inter",
        wordWrap: "break-word" as "break-word"
    }
}
// Customizable Area End
