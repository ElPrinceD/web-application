import React from "react";

import {
    Box,
    Button,
    Typography,
    // Customizable Area Start
    // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import DeletePasswordController, { Props, configJSON } from "./DeletePasswordController";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";


const theme = createTheme({

});

// Customizable Area End
export default class DeletePassword extends DeletePasswordController {
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
                <StyleContentBox style={screen.mainBox}>
                    <Box>
                        <h1 style={screen.heading}>Delete Account check</h1>
                        <p style={{ color: '#D97706', padding: 0, margin: 0, fontStyle: 'italic' }}>{configJSON.delete_account_para1}</p>
                        <p style={{ color: '#011342' }}>
                            {configJSON.delete_account_para2}
                        </p>
                    </Box>
                    <Box style={screen.buttonsField}>
                        <Box>
                            <Typography style={screen.lableStyle}>Password <span style={screen.starColor}>*</span></Typography>
                            <Box style={screen.passwordInputBox}>
                                <input
                                    name="newPassword"
                                    type="text"
                                    placeholder="Enter your password"
                                    value={!this.state.enablePasswordField ? this.state.password.replace(/./g, "*") : this.state.password}
                                    onChange={this.handlePasswordChange}
                                    style={screen.passwordInputField}
                                    data-test-id="password-field"
                                />
                                <Box
                                    onClick={this.handleClickShowPassword}
                                    data-test-id="eye-icon"
                                >
                                    {this.state.enablePasswordField ? (<VisibilityOutlinedIcon style={{ color: "#94A3B8" }} />)
                                        : (<VisibilityOffOutlinedIcon style={{ color: "#94A3B8" }} />)}
                                </Box>
                            </Box>
                            {this.state.error && (
                                <Typography style={{ color: 'red', marginTop: '5px' }}>
                                    {this.state.error}
                                </Typography>
                            )}
                        </Box>
                        <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Button variant="contained"
                                style={screen.deleteButton}
                                onClick={this.handleClickDeletePassword}
                                data-test-id="delete-button"
                            >
                                Yes, Delete Account
                            </Button>
                            <Button variant="contained"
                                style={screen.deleteCancle}
                                onClick={() => this.handleNavigate("UserProfileBasicBlock")}
                                data-test-id="cancel-delete-button"
                            >
                                No
                            </Button>
                        </Box>
                    </Box>
                    {this.state.handlePopup && <CustomConfirmationPopup
                        type={"warning"} closePopup={this.handleClickDeletePassword}
                        btntext=" Yes, Delete Account" submitPopup={this.handleDeleteAccount}
                        discText="Are you sure, you want to Delete the account?"
                    />}
                    {this.state.handleSuccessPopup && <CustomConfirmationPopup
                        type={"success"} discText={this.state.message} 
                    />}
                    {this.state.failurePopup && <CustomConfirmationPopup
                        type={"warning"} discText={this.state.message} hideBtn={true}
                    /> }
                </StyleContentBox>
            </ThemeProvider>
            // Customizable Area End
        );
    }
}

// Customizable Area Start
const StyleContentBox = styled(Box)({
    width: '488px',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
    padding: '20px',
    boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px", 
    borderRadius: '12px',
    
    "@media(max-width: 575px)": {
        width: '450px !important',

    },
    "@media(max-width: 530px)": {
        width: '410px !important',

    },
    "@media(max-width: 480px)": {
        width: '370px !important',

    },
   
  });
const screen = {
    byDefaultTypo: {
        color: "#334155",
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
    mainBox: {
        width: '488px',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '10px',
        padding: '20px',
        boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px", 
        borderRadius: '12px',
        
    },
    heading: {
        fontWeight: 700,
        fontSize: '20px',
        color: '#011342'
    },
    buttonsField: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap: '20px'
    },
    passwordInputBox: {
        display: 'flex',
        border: '2px solid #CBD5E1',
        padding: '10px 12px 10px 12px',
        borderRadius: '8px'
    },
    passwordInputField: {
        outline: 'none', 
        width: '100%', 
        border: 0 ,
        fontSize: '16px',
        fontWeight: 400,
        fontFamily: "Inter"
    },
    deleteButton: {
        borderRadius: '8px',
        padding: '10px 16px 10px 16px',
        width: '100%',
        fontWeight: 700,
        fontSize: '18px',
        textTransform: 'capitalize' as 'capitalize',
        background: '#DC2626',
        color: "#FFF"
    },
    deleteCancle: {
        borderRadius: '8px',
        padding: '10px 16px 10px 16px',
        width: '100%',
        fontWeight: 700,
        fontSize: '18px',
        color: '#012275',
        border: '1px solid #011342',
        backgroundColor: 'transparent',
        textTransform: 'capitalize' as 'capitalize'
    }
};

// Customizable Area End