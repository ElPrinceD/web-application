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
  Tabs,
  Tab,
  // Customizable Area Start

  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { Close, Menu } from "@material-ui/icons";
import { imgChngPasswordIcon, imgPaymentIcon, imgSyncIcon, imgTaxIcon, imgPenIcon } from "./assets";
import Loader from "../../../components/src/Loader.web";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TabPanel from "../../../components/src/SettingsTabPanel.web";
import SalesText from "../../settings/src/SalesText.web";
import CustomConfirmationPopupDisconnectStripe from "../../../components/src/CustomConfirmationPopupDisconnectStripe";
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";

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
        gap: '16px'
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

    MuiTab: {
      root: {
        fontWeight: 500,
        fontFamily: 'Inter',
        textTransform: 'capitalize',
        "&.MuiTab-textColorPrimary": {
          color: "#000"
        },
        "&.MuiTab-textColorInherit.Mui-selected": {
          borderRadius: '8px',
          borderLeft: '4px',
          borderColor: '#001569',
          borderStyle: "solid"
        },
        "&.MuiTab-textColorInherit.delete_tab.Mui-selected": {
          borderColor: '#FF0000',
        },
        "&.MuiTab-root": {
          textAlign: "left",
          borderRadius: '8px',
          borderLeft: '4px',
          borderColor: '#fff',
          borderStyle: "solid",
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: 500,
          opacity: 1,
          color: '#011342',
          boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px"
        },
        "&.MuiTab-root.delete_tab": {
          color: '#FF0000',
          boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px"
        },
        "&.MuiTab-labelIcon": {
          minHeight: '56px'
        },
        "&.MuiTab-labelIcon span": {
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: '10px'
        },
        "@media(min-width: 600px)": {
          "&.MuiTab-root": {
            minWidth: '50px',
          }
        }

      }
    },
  }
});


// Customizable Area End

import SettingsController, {
  Props,
  configJSON,
} from "./SettingsController";
import CalendarSync from "./CalendarSync.web";
import ChangePassword from "./ChangePassword.web";
import DeletePassword from "./DeletePassword.web";

export default class Settings extends SettingsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"12px"}>
        <HeadingContentMobileBox
         sx={{
                width: 'full',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '29px',
                marginBottom: '28px',
              }}
              data-test-id="go-back-btn"
            >
              <ArrowBackIosIcon style={{ width: "30px",height:'30px', cursor: 'pointer' }} onClick={this.backToMyAccount}/>
              <Typography 
                style={{ cursor: 'pointer', fontSize: '24px', fontWeight: 600, color: '#011342' }}
                onClick={this.backToMyAccount}
              >
                Settings
              </Typography>
            </HeadingContentMobileBox>
        </Box>
    )
  }

  renderConfimation = () =>{
    if(this.state.disconnectStripePopup){
      return(
        <CustomConfirmationPopupDisconnectStripe
           closePopup={this.handleDisconnectBtn}
           btntext=" Yes, Disconnect" submitPopup={this.handleDisconnectStripe}
           discText="Are you sure, you want to disconnect?"
           />
      )
    }
  }

  renderPopup = () => {
    if(this.state.successPopup){
      return(
        <CustomConfirmationPopup
          type={"success"} discText={this.state.disconnectStripeText} 
        />
      )
    }
    else if(this.state.failurePopup){
      return(
        <CustomConfirmationPopup
          type={"warning"} discText={this.state.disconnectStripeText} hideBtn={true}
        />               
      )
    }
  }

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>

        <Box sx={{ display: 'flex' }}>

          <NavigationMenu navigation={this.props.navigation} id={""} />

          <StyleContentBox>
            {this.state.loader && <Loader loading={this.state.loader} />}
            {this.Header()}
           
            <HeadingContentBox
              sx={{
                width: 'full',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2.5rem',
              }}
              data-test-id="go-back-btn"
            >
              <ArrowBackIosIcon style={{ width: "28px", cursor: 'pointer' }} onClick={this.backToMyAccount}/>
              <Typography style={{ cursor: 'pointer', fontSize: '24px', fontWeight: 600, color: '#011342' }} onClick={this.backToMyAccount}>Settings</Typography>
            </HeadingContentBox>
  

            <StyleContentBox2 >
              {this.state.userRoleId === 2 ?
                <Tabs
                  orientation="vertical"
                  value={this.state.value}
                  onChange={this.handleChange}
                  aria-label="icon label tabs example"
                >
                  <Tab icon={<img style={{ margin: 0 }} src={imgChngPasswordIcon} />} label="Change Password" {...this.a11yProps(0)} />
                  <Tab icon={<img style={{ margin: 0 }} src={imgPenIcon} />} label="Qualified Signature" {...this.a11yProps(1)} />
                  <Tab icon={<img style={{ margin: 0 }} src={imgSyncIcon} />} label="Calendar Sync" {...this.a11yProps(2)} />
                  <Tab icon={<img style={{ margin: 0 }} src={imgTaxIcon} />} label="VAT (Value Added Tax)" {...this.a11yProps(3)} />
                  <Tab icon={<img style={{ margin: 0 }} src={imgPaymentIcon} />} label="Payments" {...this.a11yProps(4)} />
                  <Tab className="delete_tab" icon={<DeleteOutlineIcon style={{ margin: 0 }} />} label="Delete Account" {...this.a11yProps(5)} />

                </Tabs>
                :

                <Tabs
                  orientation="vertical"
                  value={this.state.value}
                  onChange={this.handleChange}
                  aria-label="icon label tabs example"
                >
                  <Tab icon={<img style={{ margin: 0 }} src={imgChngPasswordIcon} />} label="Change Password" {...this.a11yProps(0)} />
                  <Tab icon={<img style={{ margin: 0 }} src={imgSyncIcon} />} label="Calendar Sync" {...this.a11yProps(1)} />
                  <Tab className="delete_tab" icon={<DeleteOutlineIcon style={{ margin: 0 }} />} label="Delete Account" {...this.a11yProps(2)} />
                </Tabs>

              }

              {this.state.userRoleId === 2 ?
                <>
                  <TabPanel value={this.state.value} index={0}>
                    <Box flexGrow={1} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px", borderRadius: "12px", maxWidth: "490px", padding: '24px' }}>
                      <ChangePassword navigation={undefined} id={""} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={this.state.value} index={1}>
                    <Box flexGrow={1} > Qualified Signature</Box>
                  </TabPanel>
                  <TabPanel value={this.state.value} index={2}>
                    <Box flexGrow={1} >
                      <CalendarSync navigation={undefined} id={""} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={this.state.value} index={3}>
                    < SalesText navigation={undefined} id={""} />
                  </TabPanel>
                  <TabPanel value={this.state.value} index={4}>
                    <Box flexGrow={1} style={webStyle.paymentTabContentBoxStyle}>
                      <Box style={webStyle.paymentTabContentHeaderStyle}>
                      {this.state.isStripeConnected === "true" && <span style={webStyle.connectedTagStyle}>connected</span>}
                      <Typography style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'Inter', color: '#011342', marginBottom: '10px' }}>Payment</Typography>
                      </Box>
                      <Typography style={{ fontSize: '14px', fontWeight: 400, fontFamily: 'Inter', color: '#011342' }}>
                        Accept payments in your renotary account with funds going directly into your bank
                        account with stripe payment method.
                      </Typography>
                      {this.state.isStripeConnected === "true" &&
                        <Box style={{ marginTop: '50px' }}>
                          <Box style={{ display: "flex", gap: '50px', marginBottom: '10px' }}>
                            <Typography style={webStyle.accountDetailsLeftTypo}>Currency:</Typography>
                            <Typography style={{...webStyle.accountDetailsRightTypo, textTransform: 'uppercase'}}>
                              {`${this.state.stripeAccountDetails?.currency} (£)`}
                            </Typography>
                          </Box>
                          <Box style={{ display: "flex", gap: '50px', marginBottom: '10px' }}>
                            <Typography style={{...webStyle.accountDetailsLeftTypo, textTransform: 'capitalize'}}>
                              Account Name:
                            </Typography>
                            <Typography style={webStyle.accountDetailsRightTypo}>{this.state.stripeAccountDetails?.account_name}</Typography>
                          </Box>
                          <Box style={{ display: "flex", gap: '50px', marginBottom: '10px' }}>
                            <Typography style={webStyle.accountDetailsLeftTypo}>Account Email:</Typography>
                            <Typography style={webStyle.accountDetailsRightTypo}>{this.state.stripeAccountDetails?.account_email}</Typography>
                          </Box>
                        </Box>
                      }
                      <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {this.state.isStripeConnected === "true" ?
                          <Button
                            style={{ ...webStyle.buttonStyle, background: '#DC2626', width: "196px", }}
                            data-test-id="disconnect-btn" onClick={this.handleDisconnectBtn}
                          >
                            Disconnect Account
                          </Button> :
                          <Button
                            style={{ ...webStyle.buttonStyle, background: '#012275', width: "170px", }}
                            onClick={this.handleConnectBtn}
                            data-test-id="connect-btn"
                          >
                            Connect Account
                          </Button>
                        }                        
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value={this.state.value} index={5}>
                    <Box flexGrow={1} > 
                      <DeletePassword navigation={this.props.navigation} id={this.props.id} />
                    </Box>
                  </TabPanel>
                </>
                :
                <>
                  <TabPanel value={this.state.value} index={0}>
                    <Box flexGrow={1} style={{ boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px", borderRadius: "12px", maxWidth: "488px", padding: '24px' }}>
                      <ChangePassword navigation={undefined} id={""} />
                    </Box>
                  </TabPanel>
                  <TabPanel value={this.state.value} index={1}>
                    <Box flexGrow={1} >
                      {<CalendarSync navigation={undefined} id={""} />}
                    </Box>
                  </TabPanel>
                  <TabPanel value={this.state.value} index={2}>
                    <Box flexGrow={1} >
                      {<DeletePassword navigation={this.props.navigation} id={this.props.id}/>}
                    </Box>
                  </TabPanel>
                </>
              }
              {this.renderConfimation()}
              {this.renderPopup()}
            </StyleContentBox2>
          </StyleContentBox>
        </Box>

      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const StyleContentBox = styled(Box)({
  width: "calc(100% - 215px)",
  paddingLeft: '24px',
  maxHeight: '100vh',
  overflowY: 'scroll',
  backgroundColor:'#F9F9F9',
  "@media(max-width: 1160px)": {
    width: "calc(100%)",
  },
  '& .MuiBox-root-135':{
    "@media(max-width: 575px)": {
      minWidth: "100%",
      maxWidth:'100% !important'
    },
  },
  '& .MuiTabs-root ':{
    "@media(max-width: 575px)": {
      width: "100%",
    },
  }
});
const StyleContentBox2 = styled(Box)({
  display: 'flex', gap: '3%' ,
  "@media(max-width: 575px)": {
    flexWrap:'wrap'
  }
});
const HeadingContentBox = styled(Box)({
  "@media(max-width: 1025px)": {  
    display:'none'
  }
});
const HeadingContentMobileBox = styled(Box)({
  display:'none',

  "@media(max-width: 1025px)": {  
    display:'flex'
  }
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
const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const webStyle = {
  mainWrapper: {
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
  },
  inputStyle: {
    justifyContent: "space-between",
    width: "100%",
    height: "100px",
    display: "flex",
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    flexDirection: "column",
  },
  salesInputmessage: {
    marginTop: '8px',
    fontSize: '14px',
    color: ' #011342',
    fontWeight: 400,
    fontFamily: 'Inter',
  },
  salescheckBoxLabel: {
    fontWeight: 400,
    fontSize: '16px',
    color: ' #011342',
    fontFamily: 'Inter',
  },
  salesInputLabel: {
    fontWeight: 700,
    fontSize: '16px',
    color: ' #011342',
    fontFamily: 'Inter',
  },
  vatInfoHeading: {
    color: ' #011342',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: 'Inter',
  },
  vatNumber: {
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'Inter',
    color: ' #011342',
  },
  vatNumber2: {
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: 'Inter',
    color: ' #011342',
  },
  salesInput: {
    fontWeight: 500,
    fontFamily: 'Inter',
    color: ' #011342',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '50%',
    padding: '10px',
  },
  buttonStyle: {
    marginTop: "40px",
    border: "none",
    borderRadius: '8px',
    height: "44px",
    textTransform: 'capitalize' as 'capitalize',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: 'Inter',
  },
  paymentTabContentBoxStyle: {
    position: 'relative' as 'relative',
    boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 8px",
    borderRadius: "12px",
    padding: '24px'
  },
  accountDetailsLeftTypo: {
    // textAlign: 'start',
    fontSize: '14px',
    fontFamily: 'Inter',
    width: '108px',
    fontWeight: 600,
    color: '#011342'
  },
  accountDetailsRightTypo: {
    fontSize: '14px',
    fontFamily: 'Inter',
    fontWeight: 400,
    color: '#011342',
  },
  connectedTagStyle: {
    position: 'absolute' as 'absolute',
    top: 0,
    right: 0,
    width: '83px',
    display: 'flex',
    height: '24px',
    background: '#D1FAE5',
    borderRadius: '100px',
    color: '#059669',
    fontSize: '12px',
    alignItems: 'center',
    fontWeight: 600,
    fontFamily: 'Inter',
    justifyContent: 'center',
  },
  closeIcon: { 
   width: "50px",
   height: "56px"
   },
  paymentTabContentHeaderStyle: {
    display: 'flex',    
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    position: 'relative' as 'relative',
  },
};    
// Customizable Area End
