import React from "react";

import {
    Box,
    Button,
    Switch,
    Typography,
    // Customizable Area Start
    // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Loader from "../../../components/src/Loader.web";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


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
            color: '#011342',
            fontWeight: 700,
            fontSize: '16px',
            marginTop: '15px'
        },
        subtitle2: {
            color: '#011342',
            fontWeight: 500,
            fontSize: '14px'
        },
    },
    overrides: {
        MuiSwitch: {
            root: {
                "&.MuiSwitch-colorSecondary-40.Mui-checked": {
                    color: "green"
                }
            },
            switchBase: {
                // padding: 1,
                '&$checked': {
                    //   transform: 'translateX(16px)',
                    color: "white",
                    '& + $track': {
                        backgroundColor: 'green',
                        opacity: 1,
                        // border: 'none',
                    },
                },
                '&$focusVisible $thumb': {
                    color: 'yellow',
                    //   border: '6px solid #fff',
                },
            },

            checked: {
                // color: '#fff'
            },
            track: {
                // backgroundColor: '#059669'
            }
        }
    }
});


// Customizable Area End

import CalendarSyncController, {
    Props,
    configJSON,
} from "./CalendarSyncController";

export default class CalendarSync extends CalendarSyncController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    render() {

        return (
            // Customizable Area Start
            <ThemeProvider theme={theme}>
                {this.state.loader && <Loader loading={this.state.loader} />}
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Box style={{ height: 'fit-content', padding: '20px', boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px", borderRadius: '12px' }}>
                        <Box style={{ width: 'full', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <Box style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#011342' }}>Google Calendar</h1>
                                    <span style={{ color: "#64748B", fontWeight: 500, fontSize: '16px' }}>(Two way sync)</span>
                                </Box>
                                {this.state.googleAuthDetails &&
                                    <Box style={{ display: 'flex', width: 'fit-content', alignItems: 'center' }}>
                                        Sync on
                                        <CustomSwitch
                                            checked={this.state.googleSynced}
                                            onChange={this.handleSyncChange}
                                            name="googleSynced"
                                            data-test-id="google-sync-switch"
                                        />
                                    </Box>}
                            </Box>
                            <Box>
                                {this.state.googleAuthDetails ?
                                    <>
                                        <Box style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                {this.state.googleAuthDetails.picture ?
                                                    <img
                                                        src={this.state.googleAuthDetails.picture}
                                                        alt=""
                                                        style={{ width: "48px", height: '48px', borderRadius: '50%' }}
                                                    /> :
                                                    <AccountCircleRoundedIcon style={{ color: '#0131A8' }} />
                                                }
                                                <Box>
                                                    <Typography variant="subtitle1">{this.state.googleAuthDetails.email}</Typography>
                                                    <Typography variant="subtitle2">Authenticated Account</Typography>
                                                </Box>

                                            </Box>
                                            <Box>
                                                <Button
                                                    style={{ color: 'red', textTransform: 'capitalize', background: '#fff' }}
                                                    onClick={this.handleRemoveGoogleAccount}
                                                    data-test-id="google-remove-btn"
                                                >
                                                    <CloseRoundedIcon style={{ width: '16px', height: '16px', color: 'red' }} /> Remove
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box style={{ display: 'flex', width: '100%', gap: '15px', flexDirection: 'column' }}>

                                            <Typography variant="subtitle1">Calendars</Typography>

                                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="subtitle2">{this.state.googleAuthDetails.email}</Typography>
                                                <Typography style={{ fontSize: '14px', fontWeight: 500, color: '#496BF2' }}>Synchronize</Typography>
                                            </Box>

                                        </Box>
                                    </> :
                                    <>
                                        <Box style={{ width: '100%' }}>
                                            <p style={{ fontWeight: 400, fontSize: '16px', color: '#011342', margin: 0, padding: 0 }}>
                                                {configJSON.google_auth_para1}
                                            </p>
                                        </Box>
                                        <Box style={{ display: 'flex', width: '100%', gap: '2px', marginTop: '15px' }}>
                                            <input
                                                onChange={this.handleCheckedChange}
                                                type="checkbox"
                                                style={{ width: '24px', height: '24px', accentColor: "#012275" }}
                                                data-test-id="google-check-input"
                                                checked={this.state.handleGoogleUi}
                                                name="handleGoogleUi"
                                            />
                                            <p style={{ fontWeight: 400, fontSize: '16px', color: '#011342', margin: 0, padding: 0 }}>
                                                {configJSON.google_auth_para2}
                                            </p>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            style={{
                                                ...screen.buttonStyle,
                                                backgroundColor: `${this.state.handleGoogleUi ? '#012275' : '#CCD3E3'}`,
                                            }}
                                            data-test-id="google-auth-btn"
                                            onClick={() => this.state.handleGoogleUi && this.handleGoogleAuthenticate()}
                                        >
                                            Authenticate Google
                                        </Button>
                                    </>
                                }
                            </Box>


                        </Box>
                    </Box>
                    <Box style={{ height: 'fit-content', padding: '20px', boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px", borderRadius: '12px' }}>
                        <Box style={{ width: 'full', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <Box style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#011342' }}>Outlook Calendar</h1>
                                    <span style={{ color: "#64748B", fontWeight: 500, fontSize: '16px' }}>(Two way sync)</span>
                                </Box>
                                {
                                    this.state.outlookAuthDetails &&
                                    <Box style={{ display: 'flex', width: 'fit-content', alignItems: 'center' }}>
                                        Sync on
                                        <CustomSwitch
                                            checked={this.state.outlookSynced}
                                            onChange={this.handleSyncChange}
                                            name="outlookSynced"
                                            data-test-id="outlook-sync-switch"
                                        />
                                    </Box>

                                }

                            </Box>
                            <Box>
                                {this.state.outlookAuthDetails ?
                                    <>
                                        <Box style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                {this.state.outlookUserProfile ?
                                                    <img
                                                        src={this.state.outlookUserProfile}
                                                        alt=""
                                                        style={{ width: "48px", height: '48px', borderRadius: '50%' }}
                                                    /> :
                                                    <AccountCircleRoundedIcon style={{ color: "#0131A8" }} />
                                                }
                                                <Box>
                                                    <Typography variant="subtitle1">{this.state.outlookAuthDetails.mail}</Typography>
                                                    <Typography variant="subtitle2">Authenticated Account</Typography>
                                                </Box>

                                            </Box>
                                            <Box>
                                                <Button
                                                    style={{ color: 'red', textTransform: 'capitalize', background: '#fff' }}
                                                    data-test-id="outlook-remove-btn"
                                                    onClick={this.handleRemoveOutLookAccount}
                                                >
                                                    <CloseRoundedIcon style={{ width: '16px', height: '16px', color: 'red' }} /> Remove
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box style={{ display: 'flex', width: '100%', gap: '15px', flexDirection: 'column' }}>

                                            <Typography variant="subtitle1">Calendars</Typography>

                                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="subtitle2">{this.state.outlookAuthDetails.mail}</Typography>
                                                <Typography style={{ fontSize: '14px', fontWeight: 500, color: '#496BF2' }}>Synchronize</Typography>
                                            </Box>

                                        </Box>
                                    </> :
                                    <>
                                        <Box style={{ width: '100%' }}>
                                            <p style={{ fontWeight: 400, fontSize: '16px', color: '#011342', margin: 0, padding: 0 }}>
                                                {configJSON.outlook_auth_para1}
                                            </p>
                                        </Box>
                                        <Box style={{ display: 'flex', width: '100%', gap: '2px', marginTop: '15px' }}>
                                            <input
                                                onChange={this.handleCheckedChange}
                                                type="checkbox"
                                                style={{ width: '24px', height: '24px', accentColor: "#012275" }}
                                                checked={this.state.handleOutlookUi}
                                                name="handleOutlookUi"
                                                data-test-id="outlook-check-input"
                                            />
                                            <p style={{ fontWeight: 400, fontSize: '16px', color: '#011342', margin: 0, padding: 0 }}>
                                                {configJSON.outlook_auth_para2}
                                            </p>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            style={{
                                                ...screen.buttonStyle,
                                                backgroundColor: `${this.state.handleOutlookUi ? '#012275' : '#CCD3E3'}`,
                                            }}
                                            data-test-id="outlook-auth-btn"
                                            onClick={() => this.state.handleOutlookUi && this.handleOutlookAuth()}
                                        >
                                            Authenticate Outlook
                                        </Button>
                                    </>}
                            </Box>


                        </Box>
                    </Box>
                </Box>

            </ThemeProvider>
            // Customizable Area End
        );
    }
}

// Customizable Area Start

const CustomSwitch = withStyles({
    root: {
        width: '65px'
    },
    switchBase: {
        color: "#fff",
        marginTop: "5px",
        '&$checked': {
            color: "#fff",
            marginTop: "5px"
        },
        '&$checked + $track': {
            backgroundColor: "#059669",
            height: "24px",
            borderRadius: '40px'
        },
    },
    checked: {},
    track: {
        height: "24px",
        borderRadius: '40px'
    },
})(Switch);

const screen = {
    byDefaultTypo: {
        color: "#334155",
        fontWeight: 400,
        fontSize: '13px'
    },
    starColor: {
        color: "#FF0000",
    },
    buttonStyle: {
        marginTop: '20px',
        padding: '10px 16px 10px 16px',
        width: '280px',
        height: '54px',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '16px',
        color: "#FFFFFF",
        textTransform: 'capitalize' as 'capitalize'
    },
    lableStyle: {
        color: "#011342",
        fontWeight: 600
    },
    Input: {
        '& :focus': {
            border: '1px groove gray',
            width: '30px'
        }
    },
};
// Customizable Area End