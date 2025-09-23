import React, { Component } from 'react';
import { Box, Button, Typography, styled } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    format,
    addDays,
    startOfWeek,
    isSameMonth,
    isSameDay,
    isBefore,
    startOfMonth,
    endOfMonth,
    endOfWeek
  } from "date-fns";

interface Props {
    selectedDate: Date | null;
    selectedSession: string;
    currentMonth: Date;
    cancel: () => void;
    save?: () => void;
    setSession: (value: string) => void;
    handleDateClick: (date: Date | null, priorityName: string) => void;
    leftArrow: () => void;
    rightArrow: () => void;
    priorities: { [key: string]: "Standard" | "Priority" | "Super Priority" | "Not Available" };
    isSessionNotNeeded?: boolean;
}
interface CustomCalenderProps {
}

interface S {
    // Customizable Area Start
    // Customizable Area End
}
export default class CustomCalender extends Component<Props, S, CustomCalenderProps> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    // Customizable Area Start
    renderTimeSelection = () => {
        const { selectedSession, setSession } = this.props
        return (
            <>
                <TimeSelection>
                    <Button
                        className={
                            selectedSession === "Morning"
                                ? "selectedSessionBtn"
                                : "btn"
                        }
                        onClick={() => {setSession("Morning")}}
                    >
                       Morning
                    </Button>
                    <Button
                        className={
                            selectedSession === "Afternoon"
                                ? "selectedSessionBtn"
                                : "btn"
                        }
                        onClick={() => {setSession("Afternoon")}}
                    >
                        Afternoon
                    </Button>
                    <Button
                        className={
                            selectedSession === "Evening"
                                ? "selectedSessionBtn"
                                : "btn"
                        }
                        onClick={() => {setSession("Evening")}}
                    >
                       Evening
                    </Button>
                </TimeSelection>
            </>
        );
    };

    renderSaveDisable = () => {
        const { isSessionNotNeeded, selectedDate, selectedSession, cancel, save , priorities} =  this.props;
        let dateString =  selectedDate !== null ? format(new Date(selectedDate) , "yyyy-MM-dd") : ""
        const selectedPriority = priorities[dateString]; 
        if (isSessionNotNeeded !== undefined && isSessionNotNeeded){
            return ( selectedDate === null ||  selectedPriority === "Not Available")
        }
        else{
            return( selectedDate === null ||
                selectedSession === "" || selectedPriority === "Not Available")
        }
    }

    renderSlotTimes = () => {
        const { isSessionNotNeeded} =  this.props;
        if (isSessionNotNeeded !== undefined && isSessionNotNeeded){
            return false;
        }
        else return true;
    }

    renderPriorityRange = () => {
        return (
            <>
                <PriorityInfoBox>
                    <PriorityBox>
                        <StandardDot />
                        <PriorityTypoGraphy>Standard: &pound;</PriorityTypoGraphy>
                    </PriorityBox>
                    <PriorityBox>
                        <PriorityDot />
                        <PriorityTypoGraphy>Priority: &pound;&pound;</PriorityTypoGraphy>
                    </PriorityBox>
                    <PriorityBox>
                        <SuperPriorityDot />
                        <PriorityTypoGraphy>Super Priority: &pound;&pound;&pound;</PriorityTypoGraphy>
                    </PriorityBox>
                </PriorityInfoBox>
            </>
        );
    };

    renderHeader = () => {
        const { currentMonth, leftArrow, rightArrow } = this.props;
        return (
            <CalenderHeader>
                <ArrowBackIosIcon
                    className="changeMonth"
                    onClick={leftArrow}
                />
                <Typography variant="body1">
                    {format(currentMonth, "MMMM yyyy")}{" "}
                </Typography>

                <ArrowForwardIosIcon
                    className="changeMonth"
                    onClick={rightArrow}
                />
            </CalenderHeader>
        );
    };

    getWeekDays = () => {
        const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        return Array.from({ length: 7 }, (intial, value) =>  format(addDays(startDate, value), "E"));
      };

      getCalendarData = (currentMonth: Date, selectedDate: Date | null, priorities: { [key: string]: "Standard" | "Priority" | "Super Priority" | "Not Available"}) => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
        const today = new Date();

        const calendarData = [];
        let dayValue = startDate;

        while (dayValue <= endDate) {
            const weekData = Array.from({ length: 7 }).map(() => {
                const formattedDate = format(dayValue, "d");
                const dayString = format(dayValue, "yyyy-MM-dd");
                const isToday = isSameDay(dayValue, today);
                const dayInfo = {
                    date: dayValue,
                    formattedDate,
                    isSameMonth: isSameMonth(dayValue, currentMonth),
                    isSelected: selectedDate && isSameDay(dayValue, selectedDate),
                    isPast: isBefore(dayValue, today),                    
                    priorityClass: isToday ? "" : priorities[dayString] || ""
                };
                dayValue = addDays(dayValue, 1);
                return dayInfo;
            });
            calendarData.push(weekData);
        }
        return calendarData;
    };

    renderDays = () => {
        const { currentMonth, selectedDate, priorities, handleDateClick } = this.props;
        const calendarData = this.getCalendarData(currentMonth, selectedDate, priorities);
        return (
            <ResponsiveTable>
                <thead>
                    <tr>
                        {this.getWeekDays().map((days, index) => (
                            <th key={index}>
                                <Days>{days}</Days>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendarData.map((weekData, weekIndex) => (
                        <tr key={weekIndex}>
                            {weekData.map((dayInfo, dayIndex) => (
                                <td key={dayIndex}>
                                    <DateCell
                                        className={`cell ${!dayInfo.isSameMonth
                                                ? "disabled"
                                                : dayInfo.isSelected
                                                    ? "selected"
                                                    : dayInfo.priorityClass === "Super Priority" ? "Super" : dayInfo.priorityClass
                                            }`}
                                        onClick={() => {
                                            if (dayInfo.isSameMonth && !dayInfo.isPast && dayInfo.priorityClass) {
                                                handleDateClick(dayInfo.date, dayInfo.priorityClass);
                                            }
                                        }}
                                    >
                                        <span className="number">{dayInfo.isSameMonth ? dayInfo.formattedDate : ""}</span>
                                    </DateCell>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </ResponsiveTable>
        );
    };


    // Customizable Area End

    render() {
        const { selectedDate, selectedSession, cancel, save , priorities } = this.props;                
         let dateString =  selectedDate !== null ? format(new Date(selectedDate) , "yyyy-MM-dd") : ""
        const selectedPriority = priorities[dateString];        
        return (
            <>
                <Calendar>
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderPriorityRange()}
                    {this.renderSlotTimes() && this.renderTimeSelection()}
                   { selectedPriority === "Not Available" && <Box className = "calender-priority-warning" >
                        <Typography variant="body1" color="error">
                            No time slot are available for the selected service , <br/>Choose another date to continue.
                        </Typography>
                    </Box>}                   
                    <Actions>
                        <Button
                            className="calenderCancel"
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="calenderSave"
                            onClick={save}
                            disabled={this.renderSaveDisable()}
                        >
                           Save
                        </Button>
                    </Actions>
                </Calendar>
            </>
        );
    };
}

const Calendar = styled(Box)(({ theme }) => ({
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "24px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    backgroundColor: "white",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",    
    maxWidth: "70.15%",
    margin: "0 auto",
    "& .calender-priority-warning" : {               
        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
        textAlign: "center",        
        padding : "2px",
    },
    "& .cell": {
        height: "40px",
        width: "40px",
        textAlign: "center",
        cursor: "pointer",
        margin: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "60%",
        color: "#D1FAE5"
    },
    "& .cell.disabled": {
        backgroundColor: "transparent",
        cursor: "not-allowed",
        border: "none",
    },
    "& .cell.selected": {
        backgroundColor: "#012275",
        color: "white",
    },
    "& .cell.standard": {
        backgroundColor: "#D1FAE5",
        color: "#011342"
    },
    "& .cell.priority": {
        backgroundColor: "#FEF3C7",
        color: "#011342"
    },
    "& .cell.Super": {
        backgroundColor: "#FEE2E2",
        color: "#011342"
    },
    "@media screen and (max-width:540px)": {
        padding: "10px",        
        maxWidth:"93%"
    },
    [theme.breakpoints.down('sm')]: {
        padding: "10px",        
    },
}));

const Actions = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    "& .MuiButton-root": {
        border: "1px solid #5D5D5D",
        borderRadius: "8px",
        fontFamily: "Inter",
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "24px",
        textTransform: "none",
        width: "160px",
        height: "45px",
        textAlign: "center",
    },
    "& .calenderCancel": {
        backgroundColor: "white",
        color: "#000A34 !important",
    },
    "& .calenderSave": {
        backgroundColor: "#012275",
        color: "white !important",
        "&:disabled": {
            background: "#CCD3E3",
            color: "#64748B !important",
            border: "none !important",
        },
    },
});

const PriorityBox = styled(Box)({
    display: "flex",
    gap: "5px",
    alignItems: "center",
    "& .MuiTypography-body1": {
        fontFamily: "Inter",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "18px",
        color: "#334155",
        letterSpacing: "0.1px",
    },
    "@media screen and (max-width:540px)": {
        gap: "2px",
        "& .MuiTypography-body1": {
            fontSize: "10px"
        }
    }
});


const TimeSelection = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",    
    gap: "8px", 
    "& .MuiButton-root": {
        backgroundColor: "white",
        border: "1px solid #E2E8F0",
        borderRadius: "6px",
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "22px",
        color: "#011342",
        textTransform: "none",
        width: "105px",
        height: "40px",
        textAlign: "center",      
    },
    "& .selectedSessionBtn": {
        backgroundColor: "#012275",
        color: "#FFFF !important",
        fontWeight: "bold",
    },
    [theme.breakpoints.down('sm')]: {
        gap: "16px", 
        "& .MuiButton-root": {
            width: "90px", 
            fontSize: "12px",
        }
    },
    [theme.breakpoints.down('xs')]: {        
        gap: "12px",
        "& .MuiButton-root": {
            width: "100%", 
            maxWidth: "200px", 
        }
    }
}));

const CalenderHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    "& .changeMonth": {
        color: "black",
        cursor: "pointer",
        width: "16px",
        height: "21px",
    },
    "& .MuiTypography-body1": {
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "22px",
    },
    [theme.breakpoints.down('xs')]: {
        "& .MuiTypography-body1": {
            fontSize: "12px",
        },
    },
}));

const PriorityTypoGraphy = styled(Typography)({
    fontSize: "10px",
});

const StandardDot = styled(Box)({
    height: "13px",
    width: "13px",
    borderRadius: "50%",
    background: "#34D399",
});

const PriorityDot = styled(Box)({
    height: "13px",
    width: "13px",
    borderRadius: "50%",
    background: "#F59E0B",
});

const SuperPriorityDot = styled(Box)({
    height: "13px",
    width: "13px",
    borderRadius: "50%",
    background: "#F87171",
});

const DaysRow = styled(Box)({
    display: "flex",
    width: "98%",
    gap: "25px",
    marginLeft: "2px"
});

const Days = styled(Typography)(({ theme }) => ({
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "22px",
    color: "#64748B",
    gap: "4px",
    textAlign:"center",
    [theme.breakpoints.down('sm')]: {
        fontSize: "12px",
        lineHeight: "18px",
    },
}));

const Body = styled(Box)({
    display: "flex",
    flexDirection: "column",
});

const Rows = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
});

const ResponsiveTable = styled('table')(({ theme }) => ({
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '2px',
    tableLayout: 'fixed',
    '& td': {
        padding: 0, 
        verticalAlign: 'middle',
        textAlign: 'center', 
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
        borderSpacing: '1px',
    },
}));

const DateCell = styled(Box)(({ theme }) => ({
    height: "40px",
    width: "40px",
    textAlign: "center",
    cursor: "pointer",
    margin: "2px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    color: "#D1FAE5",   
    "&.disabled": {
        backgroundColor: "transparent",
        cursor: "not-allowed",
        border: "none",
    },
    "&.selected": {
        backgroundColor: "#012275",
        color: "white",
    },
    "&.standard": {
        backgroundColor: "#D1FAE5",
        color: "#011342",
    },
    "&.priority": {
        backgroundColor: "#FEF3C7",
        color: "#011342",
    },
    "&.Super": {
        backgroundColor: "#FEE2E2",
        color: "#011342",
    },
}));

const PriorityInfoBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",    
    gap: "45px", 
    "& .MuiButton-root": {
        backgroundColor: "white",
        border: "1px solid #E2E8F0",
        borderRadius: "6px",
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "22px",
        color: "#011342",
        textTransform: "none",
        width: "105px",
        height: "40px",
        textAlign: "center",
    },
    "& .selectedSessionBtn": {
        backgroundColor: "#012275",
        color: "#FFFF !important",
        fontWeight: "bold",
    },
    [theme.breakpoints.down('sm')]: {
        gap: "40px", 
        flexWrap: "wrap", 
        padding: "12px 0",
    },
    [theme.breakpoints.down('xs')]: {
        gap: "11.25px", 
    }
}));
