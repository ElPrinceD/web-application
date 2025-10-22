import React from "react";

// Customizable Area Start
import { Box, Typography, IconButton } from '@material-ui/core';
import { styled } from "@material-ui/core/styles";

import { logo1 } from "./assets";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CustomLoginSignUpPopup from "../../../components/src/CustomLoginSignUpPopup.web";
// Customizable Area End
import NavigationMenuController, {
  Props,
  configJSON,
} from "./NavigationMenuController";
import MiniDrawer from "../../../components/src/MiniDrawer";
import CustomConfirmationPopup from "../../../components/src/CustomConfirmationPopup";
export default class NavigationMenu extends NavigationMenuController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderLoginPopup = () => {
    return(
      <>
        {this.state.isLoginPopupShowen && 
          <CustomLoginSignUpPopup closePopup={this.closeLoginPopup} submitLogin={this.navigateToLogin} submitSignUp={this.navigateToSignUp} />          
        }
      </>
    )
  } 

  renderSideBar = () => {
    return (
      <SideBox>
        {/* <Box className="logoBox" data-test-id="landing-redirect" onClick={() => this.landingRedirect()}>
          <img src={logo} alt="" width={"100%"} height="100%" />
        </Box> */}
        <Box className="serviceSection" data-test-id="serviceSection" style={{gap:"20px"}}>
          {this.state.services?.map((service, index) => (
           
          <Box style={{ display:"flex"}}>
            {service?.route === this.state.activeTab && (<Box data-test-id="indicateBox" 
              style={{
              position:"absolute", 
              left: "0",
              width: "5px", 
              height: "45px", 
              backgroundColor: "white",
              borderTopRightRadius:"5px",
              borderBottomRightRadius: "5px"
              }}
              />)}  
            <Box
              key={index}
              data-testID={`naviButton${index}`}
              className="services"
              onClick={() => this.handleSideBarNavigation(service?.title)}
              >
              <img src={service.image} style={{width: "20px", height: "20px"}}/>
              <Typography>{service.title}</Typography>
            </Box>
          </Box>
          ))}
        </Box>
        <Box className="supportSection">
          {this.state.supports?.map((support, index) => (
            <Box
              key={index}
              data-test-id="NevigationLinks"
              data-testid={`navigationBtn${index}`}
              className="services"
              onClick={() => this.logOutNvigation(support.title)}
            >
              <img src={support.image} style={{width:"20px", height: "20px"}} />
              <Typography>{support.title}</Typography>
            </Box>
          ))}
        </Box>
      </SideBox>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <>
      {this.renderLoginPopup()}
      <MenuIconBox style={!this.state.isSideBarOpen ? {minWidth: 10} : {}}>
        {!this.state.isSideBarOpen ?   
        <IconButton 
          onClick={this.toggleDrawer(true)} 
          aria-label="menu"
          style={{position: 'fixed', top: 35, left: -5}}
          data-test-id = "menu-icon"
        >
          <MenuRoundedIcon style={{ color: '#000' }} />
        </IconButton> :
        <IconButton 
          onClick={this.toggleDrawer(false)} 
          aria-label="menu" 
          style={{position: 'fixed', top: 35, left: 192}}
          data-test-id = "close-menu-icon"
        >
          <ClearRoundedIcon style={{ color: '#000' }} />
        </IconButton> 
        }
      </MenuIconBox>
      
      {this.state.isSideBarOpen &&
        <MobileSideBar>
        <Box className="logoBox" data-test-id="landing-redirect" onClick={() => this.landingRedirect()} style={{
          display:'flex',
          justifyContent: 'center',
          height: '50px'
        }}>
          <img src={logo1} alt="notary" width={"156px"} />
        </Box>
          {this.renderSideBar()}
        </MobileSideBar>
      }

      <DesktopSideBar>
        <Box className="logoBox" data-test-id="landing-redirect" onClick={() => this.landingRedirect()} style={{
          display:'flex',
          justifyContent: 'center',
          height: '50px'
        }}>
          <img src={logo1} alt="notary" width={"156px"} />
        </Box>
        {this.renderSideBar()}
      </DesktopSideBar>
      {this.state.handleLogOutPopup &&
      <CustomConfirmationPopup 
        type={configJSON.warning}
        discText={configJSON.discText}   
        btntext={configJSON.btnText}   
        closePopup={() => this.logOutNvigation("Log Out")} 
        submitPopup={this.handleLogoutNavigation}  
      />}
    </>
    )
    // Customizable Area End
  }
}

// Customizable Area Start
const SideBox = styled(Box)({
  padding: "44px 20px 11px ",
  boxSizing: "border-box",
  display: "flex",
  align: "center",
  height: 'calc(100vh - 160px)',
  flexDirection: "column",
  paddingTop: 0,
  backgroundColor: "#012275",
  "& .serviceSection": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    "& .MuiTypography-body1": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "white",
    },
  },
  "& .supportSection": {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& .MuiTypography-body1": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "white",
    },
  },
  "& .services": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    height:"45px",
    cursor: "pointer",
  },
});

const MenuIconBox = styled(Box)({
  display: 'none',
  "@media(max-width: 1024px)":{
    display: 'block'
  }
})

const MobileSideBar = styled(Box)({
  height: '100vh',
  width: '200px',
  minWidth: '200px',
  display: 'none',
  overflow: 'hidden',
  backgroundColor: "#012275",
  borderRadius: "0px 24px 24px 0px",
  "@media(max-width: 1024px)":{
    display: 'block'
  },
  "& .logoBox": {
    width: '200px',
    height: '65px',
    padding: '40px 0'
  }
})

const DesktopSideBar = styled(Box)({
  height: '100vh',
  width: '200px',
  minWidth: '200px',
  display: 'none',
  backgroundColor: "#012275",
  borderRadius: "0px 24px 24px 0px",
  overflow: 'hidden',
  "@media(min-width: 1024px)":{
    display: 'block'
  },
  "& .logoBox": {
    width: '200px',
    height: '65px',
    padding: '33px 0'
  }
})

const webStyle = {
  openMenuBar: {
    position: 'fixed' as 'fixed',
    top: 40,
    left: 0
  },
  closeMenuBar: {
    position: 'fixed' as 'fixed',
    top: 40,
    left: 200
  }
}
// Customizable Area End
