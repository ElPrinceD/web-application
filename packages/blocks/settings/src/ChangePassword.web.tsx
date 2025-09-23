import React from "react";

import {
    Box,
    Button,
    Typography,
    // Customizable Area Start
    // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import { Warning, error } from "./assets";
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";
import Loader from "../../../components/src/Loader.web";


const theme = createTheme({
    palette: {
        primary: {
            main: "#fff",
            contrastText: "#fff",
        },
    },
});


// Customizable Area End

import ChangePasswordController, {
    Props,
    configJSON,
} from "./ChangePasswordController";

export default class ChangePassword extends ChangePasswordController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderVisibilityIcon = ()=> {
        return this.state.enableCurrentPasswordField ? <VisibilityOffOutlinedIcon style={{ color: "#94A3B8" }} /> : <VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />
    }
    // Customizable Area End

    render() {
        return (
            // Customizable Area Start
            <ThemeProvider theme={theme}>
                {this.state.loader && <Loader loading={this.state.loader} />}
                <CustomBox>
                    <Box style={{ display: "flex" }}>
                        <Typography
                            style={{
                                color: "#011342",
                                lineHeight: "36px",
                                fontSize: "24px",
                                letterSpacing: "-0.005em",
                                fontWeight: 700,
                                font: 'bold'
                            }}
                        >
                            Change Password
                        </Typography>
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: '15px' }}>
                        <Box>
                            <Typography style={screen.lableStyle}>Current Password <span style={screen.starColor}>*</span></Typography>
                            <Box style={{ display: 'flex', border: '2px solid #CBD5E1', padding: '10px 12px 10px 12px', borderRadius: '8px' }}>
                                <input
                                    value={this.state.enableCurrentPasswordField ? this.state.currentPassword.replace(/./g, "*") : this.state.currentPassword}
                                    name="currentPassword"
                                    type="text"
                                    placeholder="Enter your Current Password"
                                    onChange={this.handleCurrentPasswordChange}
                                    style={{ outline: 'none', width: '100%', border: 0 }}
                                    data-test-id="current-password-field"
                                    className="input-field"
                                />
                                <Box onClick={this.handleClickShowCurrentPassword}>
                                    {this.renderVisibilityIcon()}
                                    
                                </Box>

                            </Box>
                            {this.state.currentPasswordError &&
                                <Typography style={screen.errorMessageTypo}>{this.state.currentPasswordError}</Typography>
                            }
                        </Box>
                        <Box>
                            <Typography style={screen.lableStyle}>New Password <span style={screen.starColor}>*</span></Typography>
                            <Box style={{ display: 'flex', border: '2px solid #CBD5E1', padding: '10px 12px 10px 12px', borderRadius: '8px' }}>
                                <input
                                    name="newPassword"
                                    type="text"
                                    placeholder="Enter your password"
                                    value={this.state.enablePasswordField ? this.state.newPassword.replace(/./g, "*") : this.state.newPassword}
                                    onChange={(event) => this.handlePasswordChange(event.target.value)}
                                    style={{ outline: 'none', width: '100%', border: 0 }}
                                    data-test-id="new-password-field"
                                    className="input-field"
                                />
                                <Box onClick={this.handleClickShowPassword}>
                                    {this.state.enablePasswordField ? (<VisibilityOffOutlinedIcon style={{ color: "#94A3B8" }} />)
                                        : (<VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />)}
                                </Box>
                            </Box>
                            {this.state.newPasswordError &&
                                <Typography style={screen.errorMessageTypo}>{this.state.newPasswordError}</Typography>
                            }
                        </Box>
                        <Box>
                            <Typography style={screen.lableStyle}>Confirm New Password <span style={screen.starColor}>*</span></Typography>
                            <Box style={{ display: 'flex', border: '2px solid #CBD5E1', padding: '10px 12px 10px 12px', borderRadius: '8px' }}>
                                <input
                                    name="confirmPassword"
                                    type="text"
                                    placeholder="Confirm your password"
                                    style={{ outline: 'none', width: '100%', border: 0 }}
                                    value={this.state.enableConfirmPasswordField ? this.state.confirmPassword.replace(/./g, "*") : this.state.confirmPassword}
                                    onChange={this.handleConfirmPasswordChange}
                                    data-test-id="confirm-password-field"
                                    className="input-field"
                                />
                                <Box onClick={this.handleClickShowConfirmPassword}>
                                    {this.state.enableConfirmPasswordField ? (<VisibilityOffOutlinedIcon style={{ color: "#94A3B8" }} />)
                                        : (<VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />)}
                                </Box>
                            </Box>
                            {this.state.confirmPasswordError &&
                                <Typography style={screen.errorMessageTypo}>{this.state.confirmPasswordError}</Typography>
                            }
                        </Box>
                        <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <Box style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <Box><img src={this.renderValidLengthImg("icon")} alt="Icon" /></Box>
                                <Typography style={{...screen.byDefaultTypo, color: this.renderValidLengthImg("text")}}>{configJSON.checkCondition_1}</Typography>
                            </Box>
                            <Box style={{ display: 'flex', gap: '2px' }}>
                                <Box><img src={this.renderCondition_2Img("icon")} alt="Icon" /></Box>
                                <Typography style={{...screen.byDefaultTypo, color: this.renderCondition_2Img("text")}}>Use a combination of uppercase and lowercase letters, numbers, and symbols
                                    (except symbols or characters with accents, like ñ or â)</Typography>
                            </Box>
                            <Box style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <Box><img src={this.renderCondition_3Img("icon")} alt="Icon" /></Box>
                                <Typography style={{...screen.byDefaultTypo, color: this.renderCondition_3Img("text")}}>Don't create a password beginning or ending with a blank space.</Typography>
                            </Box>
                            <Box style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <Box>
                                    { <img src={ this.renderCondition_4Img("icon")} alt="Icon" />}
                                </Box>
                                <Typography style={{...screen.byDefaultTypo, color: this.renderCondition_4Img("text")}}>
                                    Must be different from your last 3 passwords.
                                </Typography>
                            </Box>

                        </Box>
                    </Box>
                    <Box style={{ flexDirection: "column", marginTop: "25px", gap: "10px", display: "flex", }}>
                        <Box>
                            <Button
                                style={{ ...screen.signUpButtonSubmit, textTransform: "none" }}
                                data-test-id="change-password-btn"
                                variant="contained"
                                fullWidth
                                onClick={this.handleSubmit}
                            >
                                Change Password
                            </Button>
                        </Box>
                    </Box>
                </CustomBox>
                {this.state.openConfirmationPopup &&
                    <CustomConfirmationPopup
                        type={"warning"}
                        closePopup={this.handleCloseConfimationPopup}
                        btntext="Yes"
                        submitPopup={this.handleSubmitConfirmationPopup}
                        discText="Are you sure, you want to change the password?"
                    />
                }
                {this.state.openSuccessPopup &&
                    <CustomConfirmationPopup
                        type={"success"}
                        discText="Your password has been changed successfully!"
                    />
                }
            </ThemeProvider>
            // Customizable Area End
        );
    }
}

// Customizable Area Start

const screen = {
    byDefaultTypo: {
        // color: "#334155",
        fontWeight: 400,
        fontSize: '13px'
    },
    starColor: {
        color: "#FF0000",
    },
    signUpButtonSubmit: {
        background: "#012275",
        color: "#fff",
        border: "1px solid #012275",
        borderRadius: "8px",
        padding: "10px 16px 10px 16px",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 700,
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
    errorMessageTypo: {
        color: "red",
        fontWeight: 400,
        fontSize: '13px',
        fontFamily: 'Inter',

    }
};

const CustomBox = styled(Box)({
    "& .input-field": {
        fontSize: "16px"
    }
})
// Customizable Area End
