// Customizable Area Start
import React from "react";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import { Box, TextField, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, AppBar, Toolbar, Tabs, Tab, InputAdornment, Typography, CircularProgress, RadioGroup, Button, Dialog, IconButton } from "@material-ui/core";

import {
    CalendarToday as CalendarIcon
} from "@material-ui/icons";
export const configJSON = require("./config");
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import TransactionHistoryController, { Props } from "./TransactionHistoryController";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';
import Loader from "../../../components/src/Loader.web";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import StyledRadio from "../../../components/src/StyledRadio.web";
import Calendar from "react-calendar";
import { crossIcon } from "./assets";
import Chip from '@material-ui/core/Chip';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


const theme = createTheme({
    palette: {},
    typography: {
        fontFamily: 'Inter',
        h6: {
            fontWeight: 500,
        },
        subtitle1: {
            marginTop: "20px",
        },
    },

    overrides: {
        MuiTabs: {
            "flexContainer": {
            },
            root: {

                "& .MuiTabs-indicator": {
                    display: 'none'
                },
            },
        },

        MuiTab: {
            root: {
                "&.MuiTab-textColorPrimary": {},
                "&.MuiTab-textColorPrimary.Mui-selected": {},
                "@media(min-width: 600px)": {
                    "&.MuiTab-root": {}
                }

            }
        },
        MuiTable: {
            "root": {
                "& .MuiTableCell-body": {
                    color: "#011342",
                    fontSize: '16px',
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    height: '72px'
                }
            }
        },
        MuiPopover: {
            root: {
                "& .MuiPopover-paper": {
                    top: '140px !important'
                },
                "& .MuiMenuItem-root": {
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: "inter",
                    height: '37px'
                },
                "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
                    background: '#0131A8',
                    color: '#fff'
                },
                "@media(max-width: 750px)": {
                    "& .MuiPopover-paper": {
                        top: '240px !important'
                    },
                }
            }
        },
    }
});
// Customizable Area End

export default class TransactionHistoryWeb extends TransactionHistoryController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderTable = () => {
        return (
            <>
                <TableContainer
                    style={{ height: 'calc(100vh - 200px)', maxHeight: '725px' }}
                    component={Paper}
                    ref={this.tableContainerRef}
                    data-test-id="scrollsection"
                >
                    <Table stickyHeader aria-label="simple table sticky table">
                        <TableHead>
                            <TableRow >
                                <TableCell
                                    style={webstyle.tableHeadStyle}
                                >{configJSON.tableColumn_1}
                                </TableCell>
                                <TableCell
                                    style={webstyle.tableHeadStyle}
                                >
                                    {this.state.userRoleId === 2 ? "Transaction Date" : "Payment Date"}
                                </TableCell>
                                <TableCell
                                    style={webstyle.tableHeadStyle}
                                >
                                    {this.state.userRoleId === 2 ? configJSON.tableColumn_3 : "Payment Method"}
                                </TableCell>
                                <TableCell
                                    style={webstyle.tableHeadStyle}
                                >{configJSON.tableColumn_4}</TableCell>
                                <TableCell style={webstyle.tableHeadStyle}
                                >{configJSON.tableColumn_5}</TableCell>
                                <TableCell style={webstyle.tableHeadStyle}
                                >{configJSON.tableColumn_6}</TableCell>
                                <TableCell style={webstyle.tableHeadStyle}
                                >
                                    {this.state.userRoleId === 2 ? configJSON.tableColumn_7 : "Amount"}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.transactionsList?.length > 0 && this.state.transactionsList.map((row: any) => (
                                <TableRow>
                                    <TableCell align="center">{row?.request_type}</TableCell>
                                    <TableCell align="center">{this.convertDate(row.payment_date)}</TableCell>
                                    <TableCell align="center">{row?.payment_method || 'not entered'}</TableCell>
                                    <TableCell align="center">{row?.transaction_number}</TableCell>
                                    <TableCell align="center">{row?.notary_request_id}</TableCell>
                                    <TableCell align="center">
                                        <div
                                            style={
                                                {
                                                    padding: '2px 12px 2px 12px',
                                                    backgroundColor: row.status === "PAID" ? "#D1FAE5" : "#FEE2E2",
                                                    color: row.status === "PAID" ? "#059669" : '#DC2626',
                                                    fontWeight: 700,
                                                    fontSize: '12px',
                                                    width: '54px',
                                                    margin: 'auto',
                                                    borderRadius: '40px'
                                                }}
                                        >
                                            {row.status}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">£{row.amount}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                    {this.state.transactionsList.length === 0 &&
                        <Box style={{ padding: '20px' }}>
                            <Typography
                                style={webstyle.noDataStyle}>
                                {configJSON.noDataText}
                            </Typography>
                        </Box>
                    }
                    {this.state.isLoading && (
                        <div style={{ textAlign: 'center', padding: '10px' }}>
                            <CircularProgress />
                        </div>
                    )}
                    {!this.state.hasMore && (
                        <div style={{ textAlign: 'center', padding: '10px' }}>
                            <p>{configJSON.noMoreTransactionsText}</p>
                        </div>
                    )}
                </TableContainer>
            </>
        )
    }

    // Customizable Area End

    render() {
        // Customizable Area Start
        return (
            <ThemeProvider theme={theme}>
                <MainStyle>
                    <NavigationMenu navigation={this.props.navigation} id="" />
                    <Box className="right-side-container">
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <Box
                                style={{ gap: '8px', display: 'flex', alignItems: 'center' }}
                                onClick={this.goToUserProfile}
                            >
                                <ArrowBackIosIcon />
                                <h2 style={{ fontWeight: 700 }}>
                                    {this.state.userRoleId === 1 ? "Payments" : "Transaction History"}
                                </h2>
                            </Box>
                            <Box>

                            </Box>

                        </Box>
                        {this.state.loader && <Loader loading={this.state.loader} />}

                        <Box >
                            <AppBar position="static" className="heading" style={webstyle.appBarStyle}>

                                <Toolbar style={webstyle.toolbarStyle}>
                                    <Box>
                                        <div>
                                            <TabsContainer
                                                value={this.state.tabeValue}
                                                textColor="primary"
                                                onChange={this.handleEventTabChange}
                                                aria-label="disabled tabs example"
                                                data-test-id="tabs-input"
                                            >
                                                <Tab style={{ textTransform: 'capitalize' }} className={`${this.state.tabeValue === 0 && "All"}`} label="All" />
                                                <Tab className={`${this.state.tabeValue === 1 && "PAID"}`} label="PAID" />
                                                <Tab className={`${this.state.tabeValue === 2 && "FAILED"}`} label="FAILED" />
                                            </TabsContainer>

                                        </div>
                                    </Box>
                                    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                        <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

                                            {this.state.filterStatus &&
                                                <Chip
                                                    style={{ color: "#FFF", backgroundColor: "#001569" }}
                                                    key="status-chip"
                                                    size="small"
                                                    label={this.renderStatusChip(this.state.filterStatus)}
                                                    onDelete={() => this.handleDeleteChip("status")}
                                                    deleteIcon={<CloseRoundedIcon style={{ color: "#FFF" }} />}
                                                />}
                                            {this.state.filterDuration &&
                                                <Chip
                                                    style={{ color: "#FFF", backgroundColor: "#001569" }}
                                                    key="duration-chip"
                                                    size="small"
                                                    label={this.renderDurationChip(this.state.filterDuration)}
                                                    onDelete={() => this.handleDeleteChip("duration")}
                                                    deleteIcon={<CloseRoundedIcon style={{ color: "#FFF" }} />}
                                                />}
                                        </Box>
                                        <Box style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                                            <div >
                                                <SearchField
                                                    data-test-id="orderId-input"
                                                    value={this.state.orderId}
                                                    onChange={this.handleOrderIdInputChange}
                                                    InputProps={{

                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SearchIcon style={{ color: '#5D5D5D' }} />
                                                            </InputAdornment>),

                                                    }}
                                                    placeholder="Search Order ID"
                                                    variant="outlined"
                                                    style={{ width: '360px' }}
                                                />
                                            </div>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    width: "44px",
                                                    height: "44px",
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #DBDBDB',
                                                    boxSizing: 'border-box'
                                                }}>
                                                <FilterListRoundedIcon
                                                    data-test-id="filter-btn"
                                                    style={{
                                                        color: '#012275',
                                                        width: '26px',
                                                        height: '26px',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={this.handleFilterOpen}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Toolbar>
                            </AppBar>
                        </Box>
                        {this.renderTable()}
                    </Box>
                </MainStyle>
                <Dialog
                    open={this.state.openFilterDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Box style={webstyle.popUpStyle} >
                        <Box sx={webstyle.popUpHeader}>
                            <Box style={{ fontWeight: 500, fontSize: '18px', color: '#012275' }}>
                                Filter
                            </Box>
                            <Box onClick={this.handleCloseFilter}>
                                <img src={crossIcon} alt="" height='44px' width='44px' />
                            </Box>
                        </Box>
                        <Box style={{ width: '100%', padding: '0 0 0 10px ' }}>
                            <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} >
                                <Button
                                    style={{
                                        ...webstyle.durationButtonStyle,
                                        border: this.getBorderColorDuration("today")
                                    }}
                                    data-test-id="filter-duration-input"
                                    onClick={() => this.handleFilterDurationBtn('today')}
                                >
                                    Today
                                </Button>

                                <Button
                                    style={{
                                        ...webstyle.durationButtonStyle,
                                        border: this.getBorderColorDuration('last_7_days')
                                    }}
                                    onClick={() => this.handleFilterDurationBtn('last_7_days')}
                                    data-test-id="filter-duration-input"
                                >
                                    Last 7 Days
                                </Button>

                                <Button
                                    style={{
                                        ...webstyle.durationButtonStyle,
                                        border: this.getBorderColorDuration( 'last_30_days')
                                    }}
                                    onClick={() => this.handleFilterDurationBtn('last_30_days')}
                                    data-test-id="filter-duration-input"
                                >
                                    Last 30 Days
                                </Button>
                                <Button
                                    style={{
                                        ...webstyle.durationButtonStyle,
                                        border: this.getBorderColorDuration( 'last_90_days')
                                    }}
                                    onClick={() => this.handleFilterDurationBtn('last_90_days')}
                                    data-test-id="filter-duration-input"
                                >
                                    Last 90 Days
                                </Button>

                            </Box>
                        </Box>
                        <Box style={{ padding: '10px 0 0 10px ' }}>
                            <Typography variant="subtitle1">Date</Typography>
                            <RadioGroup aria-label="gender" data-test-id="date-type-button"
                                name="date" value={this.state.dateType} onChange={this.handleDateTypeChange}>
                                <Box style={{ display: 'flex', paddingLeft: '10px' }}>
                                    <StyledRadio label="Single Date" value="single" />
                                    <StyledRadio label="Date Range" value="range" />

                                </Box>
                            </RadioGroup>
                            <CustomDatePicker>
                                <TextField
                                    fullWidth
                                    value={this.formatDateRange(this.state.selectedDate)}
                                    onClick={this.openCalendar}
                                    data-test-id="calendar-field"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={this.openCalendar}>
                                                    <CalendarIcon style={{ color: '#011342', width: 20, height: 20 }} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </CustomDatePicker>

                            <Box style={{ paddingTop: '5px' }}>
                                <span style={{ color: '#011342', fontSize: '12px' }}>Select Date Range</span>
                            </Box>
                        </Box>
                        {this.state.tabeValue === 0 && ( 
                        <Box style={{ padding: '10px 0 0 10px ' }}>
                            <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>Status</Typography>
                            <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} >
                                <Button
                                    style={{
                                        ...webstyle.durationButtonStyle,
                                        border: this.getBorderColorStatus('successful')
                                    }}
                                    data-test-id="status-filter-input"
                                    onClick={() => this.handleFilterStatus('successful')}
                                >
                                    Successful
                                </Button>

                                <Button
                                    style={{
                                        ...webstyle.durationButtonStyle,
                                        border: this.getBorderColorStatus('failed')
                                    }}
                                    onClick={() => this.handleFilterStatus('failed')}
                                    data-test-id="status-filter-input"
                                >
                                    Failed
                                </Button>
                            </Box>

                            </Box>
                        )}
                        <Box style={{ paddingTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={this.handleReset}
                                style={{
                                    ...webstyle.buttonStyle,
                                    backgroundColor: '#FFF',
                                    color: '#000A34',
                                    border: '1px solid #000A34'
                                }}
                                data-test-id="reset-filter-btn"
                            >
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    ...webstyle.buttonStyle,
                                    backgroundColor: this.getBackgroundColor(),
                                    color: 'white'
                                }}
                                data-test-id="apply-filter-btn"
                                onClick={this.handleApplyFilter}
                            >
                                Apply Filter
                            </Button>
                        </Box>
                    </Box>
                </Dialog>
                <CalendarDialog
                    open={this.state.calendarOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={webstyle.reactCalendarBox}>
                        <Calendar
                            selectRange={this.state.dateType === "range"}
                            onChange={this.handleDateChange}
                            data-test-id="react-calendar"
                            value={this.state.tempDate || this.state.selectedDate}
                        />
                        <div className="hr-divider"></div>
                        <div className="action-button-div">
                            <Button
                                className="action-btn cancel-btn"
                                onClick={this.handleCalendarCancelBtn}
                                data-test-id="cancel-btn"
                            >
                                Cancel
                            </Button>
                            <Button
                                data-test-id="save-btn"
                                className={this.state.tempDate ? `action-btn save-btn active` : `action-btn save-btn`}
                                onClick={this.handleCalendarSaveBtn}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </CalendarDialog>
            </ThemeProvider>
        );
        // Customizable Area End
    }
}

// Customizable Area Start
const TabsContainer = styled(Tabs)({
    width: '219px',
    backgroundColor: "transparent",
    color: "#012275",

    '& .Mui-selected': {
        color: "#012275",
        fontWeight: 600
    },
    '& .MuiTab-root': {
        width: "fit-content",
        padding: "10px 12px 12px 12px",
        "@media (min-width: 600px)": {
            minWidth: "fit-content"
        },
    },
    '& .MuiTabs-indicator': {

    },
    '& .ALL': {
        color: '#012275',
        borderBottom: '2px solid #012275',
        textTransform: 'capitalize'
    },
    '& .PAID': {
        color: '#059669',
        borderBottom: '2px solid #059669'
    },
    '& .FAILED': {
        color: '#DC2626',
        borderBottom: '2px solid #DC2626'
    }
});

const SearchField = styled(TextField)({
    width: 'fit-content',
    '& .MuiInputBase-root': {
        width: '360px',
        height: '44px',
        backgroundColor: '#fff',
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#DBDBDB'
        }
    }
});

const CalendarDialog = styled(Dialog)({
    "& .react-calendar": {
        border: "none",
        fontFamily: "Inter",
    },
    "& .react-calendar__navigation__prev2-button, .react-calendar__navigation__next2-button": {
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

const MainStyle = styled(Box)({
    display: 'flex',
    "& .right-side-container": {
        width: "calc(100% - 200px)",
        padding: '0 24px',
        boxSizing: 'border-box'
    },
    "@media (max-width: 1024px)": {
        "& .right-side-container": {
            width: "100%"
        },
    },
});

const webstyle = {
    tableHeadStyle: {
        color: '#012275',
        fontWeight: 600,
        textAlign: 'center' as 'center',
        width: '134px',
        fontSize: '16px',
    },
    noDataStyle: {
        fontFamily: "Inter",
        fontSize: '16px',
        color: '#012275',
        textAlign: 'center' as 'center',
        fontWeight: 500
    },
    appBarStyle: {
        backgroundColor: '#F1F5F9',
        padding: '24px',
        width: '100%',
        paddingBottom: 0,
    },
    toolbarStyle: {
        display: 'flex ',
        justifyContent: 'space-between',
        flexWrap: 'wrap' as 'wrap',
        gap: '15px'
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
    durationButtonStyle: {
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
    reactCalendarBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column' as 'column',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px',
        background: "#FFF",
        overflow: 'hidden',
        padding: '20px 0',
    },
    buttonStyle: {
        width: '160px',
        borderRadius: '8px',
        fontWeight: 700,
        fontFamily: 'Inter',
        textTransform: 'capitalize' as 'capitalize',
        height: '44px'
    },
}

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


});

// Customizable Area End
