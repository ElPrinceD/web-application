import React from "react";

// Customizable Area Start
import {
  Box,
  Button,
  styled,
  Drawer,
  Divider,
  MenuItem,
  Typography,
  Paper,
} from "@material-ui/core";
import { logo, localProfile } from "./assets";
import { NavLink } from "react-router-dom";
import { Close } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
// Customizable Area End
import LandingPageController, { Props } from "./LandingPageController";

export default class Header extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start

  renderUsernameForMobile = () => {
    if (this.state.userName) {
      return (
        <>
          <Box
            data-test-id="menu-box-mobile"
            borderRadius={"8px"}
            display={"flex"}
            height={"48px"}
            px={"8px"}
            alignItems={"center"}
            style={{
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
              columnGap: "15px",
              backgroundColor: "#FFFFFF",
              maxWidth: "70%",
            }}
            onClick={this.handleNavigateToMyAccount}
          >
            <img
              style={{
                borderRadius: "50%",
                backgroundColor: "grey",
                width: "40px",
                height: "40px",
                minWidth: "32px"
              }}
              src={
                this.state.userProfilePic !== null
                  ? this.state.userProfilePic
                  : localProfile
              }
              alt="profile_pic"
            />
            <Typography
              style={{
                fontWeight: 600,
                fontFamily: "Inter",
                fontSize: "1.3rem",
                lineHeight: "1.5",
                cursor: 'pointer',
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
              data-testid="userName"
              variant="body2"
            >
              {this.state.userName}
            </Typography>
          </Box>
        </>
      )
    }
  }

  renderMobileDashboardButton = () => {
    if (this.state.userName) {
      return (
        <>
          <StyledNavLink
            to="/Dashboard"
            style={webStyles.navLink}
            onClick={this.handleNavigationScroll}
          >
            <Typography
            className="mobile-links"
              style={{
                padding: "24px 12px",
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: "INTER",
                cursor: "pointer"
              }}
            >
              Dashboard
            </Typography>
          </StyledNavLink>
        </>
      )
    }
  }

  renderMobileLoginLogout = () => {
    if (this.state.userName) {
      return (
        <>
          <Divider />
          <StyledNavLink
            to="/"
            style={webStyles.navLink}
            onClick={this.logOutFromNevigation}
          >
            <Typography
            className="mobile-links"
              style={{
                padding: "24px 12px",
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: "INTER",
                cursor: "pointer"
              }}
            >
              Logout
            </Typography>
          </StyledNavLink>
        </>
      )
    }
    else {
      return (
        <>
          <Divider />
          <StyledNavLink
            to="/EmailAccountLoginBlock"
            style={webStyles.navLink}
            onClick={this.handleNavigationScroll}
          >
            <Typography className="mobile-links" style={{ padding: "24px 12px" }}>
              Log In
            </Typography>
          </StyledNavLink>
          <Divider />
          <StyledNavLink
            to="/OnboardingPageWeb"
            style={webStyles.navLink}
            onClick={this.handleNavigationScroll}
          >
            <Typography className="mobile-links" style={{ padding: "24px 12px" }}>
              Sign Up
            </Typography>
          </StyledNavLink>
        </>
      )
    }
  }

  // Customizable Area End
  render() {
    return (
      // Customizable Area Start
      // Required for all blocks
      <Box sx={webStyles.headerbox} id="renotary-header">
        <DesktopBox
          px={"80px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <NavLink to="/">
              <img width={"auto"} height={"50px"} src={logo} alt="notary" />
            </NavLink>
          </Box>
          <Box style={webStyles.tabs}>
            <Box data-test-id="home" className="nav-item" style={webStyles.boxes}>
              <StyledNavLink
                data-test-id="homeNavLink1"
                to="/"
                exact
                style={webStyles.navLink}
                onClick={this.handleNavigationScroll}
              >
                Home
              </StyledNavLink>
            </Box>
            <Box data-test-id="services" className="nav-item" style={webStyles.boxes}>
              <StyledNavLink
                to="/Services"
                style={webStyles.navLink}
                onClick={this.handleNavigationScroll}
              >
                Services
              </StyledNavLink>
            </Box>
            <Box data-test-id="aboutus" className="nav-item" style={webStyles.boxes}>
              <StyledNavLink
                to="/Aboutus"
                style={webStyles.navLink}
                onClick={this.handleNavigationScroll}
              >
                About us
              </StyledNavLink>
            </Box>
            <Box data-test-id="contactus" className="nav-item" style={webStyles.boxes}>
              <StyledNavLink
                to="/Contactus"
                style={webStyles.navLink}
                onClick={this.handleNavigationScroll}
              >
                Contact us
              </StyledNavLink>
            </Box>
            <Box data-test-id="faq" className="nav-item" style={webStyles.boxes}>
              <StyledNavLink
                to="/Faq"
                style={webStyles.navLink}
                onClick={this.handleNavigationScroll}
              >
                FAQs
              </StyledNavLink>
            </Box>
          </Box>
          <Box>
            {this.state.token ? (
              <Typography
                ref={this.anchorRef}
                aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                data-test-id="headmenutoggle"
                className="headButton"
                onClick={this.handleToggle}
                style={{
                  border: "none"
                }}
              >

                {
                  this.state.userProfilePic ? (
                    <img
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      src={this.state.userProfilePic}
                      width="32px"
                      height="32px"
                      alt="profile_pic"
                    />
                  ) : (
                       <Typography style={{
                          backgroundColor: "#012275",
                          lineHeight: "32px",
                          fontSize: "16px",
                          textAlign:"center",
                          width:"32px",
                          height:"32px",
                          display:"flex",
                          justifyContent:"center",
                          alignItems:"center",
                          color: "white",
                          borderRadius: "100%",
                          textTransform: "uppercase",
                          cursor: "pointer"
                        }}>
                        {this.state.userName?.charAt(0) || ""}
                       </Typography>
                    
                  )
                }

                <Typography
                  style={{
                    fontWeight: 600,
                    fontFamily: "Inter",
                    fontSize: "14px",
                    lineHeight: "21px",
                    cursor: 'pointer'
                  }}
                  data-testid="userName"
                  variant="body2"
                >
                  <>
                    <Popper
                      open={this.state.open}
                      anchorEl={this.anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                      style={{
                        zIndex: 10,
                        pointerEvents: "none",
                      }}
                    >
                      <Paper
                        variant="elevation"
                        elevation={3}
                        style={{
                          position: "relative",
                          top: "14px",
                          right: "36px",
                          borderRadius: "1rem",
                          pointerEvents: "auto",
                          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.30)"
                        }}
                      >
                        <ClickAwayListener onClickAway={this.handleTClose}>
                          <StyledMuiList
                            autoFocusItem={this.state.open}
                            data-test-id="menu-list-grow"
                            id="menu-list-grow"
                            style={{ padding: 10 }}
                          >
                            <MenuItem onClick={this.handleSubNavigation} >
                              <Typography
                                style={{
                                  fontWeight: 500,
                                }}
                              >
                                Dashboard
                              </Typography>
                            </MenuItem>
                            <MenuItem onClick={this.handleNavigateToMyAccount}>
                              <Typography
                                style={{
                                  fontWeight: 500,
                                }}
                              >
                                My Account
                              </Typography>
                            </MenuItem>
                            <MenuItem onClick={this.logOutFromNevigation}>
                              <Typography
                                style={{
                                  fontWeight: 500,
                                }}
                              >
                                Logout
                              </Typography>
                            </MenuItem>
                          </StyledMuiList>
                        </ClickAwayListener>
                        <Box
                          style={{
                            zIndex: 10,
                            position: "absolute",
                            top: "-8px",
                            right: "22px",
                            width: "18px",
                            height: "18px",
                            transform: "rotate(315deg)",
                            borderRadius: "5px",
                            backgroundColor:"#ffffff",
                            boxShadow: "5px -5px 10px rgba(0, 0, 0, 0.3)"
                          }}
                        />
                      </Paper>
                    </Popper>
                  </>


                </Typography>
              </Typography>
            ) : (
              <Box style={webStyles.loginsignup}>
                <NavLink
                  to="/EmailAccountLoginBlock"
                  onClick={this.handleNavigationScroll}
                >
                  <StyledButton
                    data-test-id="loginBtn"
                    variant="outlined"
                    className="loginBtn"
                    style={{ ...webStyles.login, textTransform: "none" }}
                  >
                    Log In
                  </StyledButton>
                </NavLink>
                <NavLink
                  to="/OnboardingPageWeb"
                  onClick={this.handleNavigationScroll}
                >
                  <SignUpStyledButton
                    data-test-id="loginBtn"
                    variant="outlined"
                    className="signUpBtn"
                    style={{ ...webStyles.signup, textTransform: "none" }}
                  >
                    Sign Up
                  </SignUpStyledButton>
                </NavLink>
              </Box>
            )}
          </Box>
        </DesktopBox>
        <MobileBox
          px={"3.5%"}
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
        >
          <NavLink to="/">
            <img width={"158px"} height={"50px"} src={logo} alt="notary" />
          </NavLink>
          <Button data-test-id="toggleButton" onClick={this.toggleDrawer(true)} className="hamburger-menu-wrapper">
            <MenuIcon className="hamburger-menu" />
          </Button>
          <StyledDrawer
            data-test-id="togglebutton"
            open={this.state.isDrawerOpen}
            onClose={this.toggleDrawer(false)}
            PaperProps={{ style: { width: "100%" } }}
          >
            <Box width={"100%"} onClick={this.toggleDrawer(false)}>
              <Box className="mobile-menu-main">
                <Box
                  width={"100%"}
                  mb={"35px"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  position={"relative"}
                >
                  {this.renderUsernameForMobile()}
                  <Button
                    className="cross-icon"
                    onClick={this.toggleDrawer(false)}
                  >
                    <Close style={{ width: "32px", height: "32px" }} />
                  </Button>
                </Box>
                <NavLink
                  data-test-id="homeNavLink2"
                  to="/"
                  exact
                  style={webStyles.navLink}
                  onClick={this.handleNavigationScroll}
                >
                  <Typography className="mobile-links" style={{ padding: "24px 12px" }}>Home</Typography>
                </NavLink>
                <Divider />
                {this.renderMobileDashboardButton()}
                <Divider />
                <NavLink
                  data-test-id="services2"
                  to="/Services"
                  style={{ ...webStyles.navLink, width: "100%" }}
                  onClick={this.handleNavigationScroll}
                >
                  <Typography className="mobile-links" style={{ padding: "24px 12px" }}>
                    Services
                  </Typography>
                </NavLink>

                <Divider />
                <NavLink
                  data-test-id="aboutus2"
                  to="/Aboutus"
                  style={{ ...webStyles.navLink, width: "100%" }}
                  onClick={this.handleNavigationScroll}
                >
                  <Typography className="mobile-links" style={{ padding: "24px 12px" }}>
                    About us
                  </Typography>
                </NavLink>

                <Divider />
                <NavLink
                  data-test-id="contactus2"
                  to="/Contactus"
                  style={webStyles.navLink}
                  onClick={this.handleNavigationScroll}
                >
                  <Typography className="mobile-links" style={{ padding: "24px 12px" }}>
                    Contact us
                  </Typography>
                </NavLink>

                <Divider />
                <NavLink
                  data-test-id="faq2"
                  to="/Faq"
                  style={webStyles.navLink}
                  onClick={this.handleNavigationScroll}
                >
                  <Typography className="mobile-links" style={{ padding: "24px 12px" }}>FAQs</Typography>
                </NavLink>
                {this.renderMobileLoginLogout()}
              </Box>
            </Box>
          </StyledDrawer>
        </MobileBox>
      </Box>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const DesktopBox = styled(Box)({
  "@media (max-width: 1232px)": {
    display: "none",
  },
  "& .headButton": {
    boxShadow: "none",
    border: "1px solid #ddd",
    borderRadius: "8px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "transparent",
    }
  }
});

const MobileBox = styled(Box)({
  "@media (min-width: 1232px)": {
    display: "none",
  },
  "& .hamburger-menu-wrapper":{
    background:"transparent !important",
    padding: "0",
    width: "auto",
    height: "auto",
    minWidth: "auto",
  },
  "& .hamburger-menu":{
    width:"40px",
  }
});

const StyledDrawer = styled(Drawer)({
  "@media (min-width: 1232px)": {
    display: "none",
  },
  "& .mobile-menu-main":{
    padding:"48px 30px 0",
    "@media (max-width: 576px)": {
      padding:"48px 15px 0",
    },
  },
  "& .cross-icon":{
    position:"absolute",
    right:"0",
    background:"transparent",
  },
  "& .mobile-links":{
    "@media (max-width: 991px)": {
        padding:"12px 15px !important"
    }
  }
});

const webStyles = {
  headerbox: {
    position: "fixed",
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "10px",
    zIndex: 999,
    backgroundColor: "white",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "4px",
    color: "#000000",
    fontWeight: 500,
    fontSize: 16,
    fontFamily: "sans-serif",
    zIndex: 99,
  },
  loginsignup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    border: "1px solid #012275",
    fontWeight: 700,
    fontSize: 16,
    padding: "10px 33px",
    color: "#012275",
    marginRight: 12,
    fontFamily: "INTER",
    width: "125px",
    height: "48px",
  },
  signup: {
    backgroundColor: "#012275",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 16,
    padding: "12px 28px",
    fontFamily: "INTER",
    height: "48px",
    width: "125px",
  },
  boxes: {
    fontFamily: "INTER",
    cursor: "pointer",
    padding: "8px 16px",
  },
  navLink: {
    textDecoration: "none",
    fontFamily: "INTER",
    color: "#000000",
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 500,
    paddingBottom: "5px",
    borderBottom: "1px solid transparent",
    transition: "all 0.5s",
  },
};

const StyledNavLink = styled(NavLink)({
  transition: "all 0.5s",
  position: "relative",
  textDecoration: "none",

  "&::after": {
    position: "absolute",
    content: '""',
    left: 0,
    bottom: 0,
    height: "2px",
    backgroundColor: "#012275",
    width: 0,
    transition: "all 0.5s",
    display:"inline-block"
  },

  "&.active::after, &:hover::after": {
    width: "100% !important",
    right: 0,
    "@media (min-width: 1232px)": {
      width:"0",
    }
  },
});

const SignUpStyledButton = styled(Button)({
  transition: "all 0.5s",
  "&:hover": {
    color: "#012275 !important",
    backgroundColor: "#FFF !important",
    borderColor: "#012275 !important",
  },
});


const StyledButton = styled(Button)({
  transition: "all 0.5s",
  "&:hover": {
    color: "#fff !important",
    backgroundColor: "#012275 !important",
  },
});

const StyledMuiList = styled(MenuList)({
  "& .MuiListItem-root.Mui-focusVisible": {
    background: '#FFF'
  }
});



// Customizable Area End
