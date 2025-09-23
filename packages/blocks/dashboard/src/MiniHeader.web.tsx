// Customizable Area Start
import React from "react";
import MiniHeaderController, { Props } from "./MiniHeaderController";
import RequestModal from "./../../dashboard/src/BookNotaryRequest.web";
import { 
  Box, 
  Button, 
  Typography, 
  Menu,
  MenuItem,
  IconButton,
  Hidden,
  Divider
} from "@material-ui/core";
import { AddRounded, MoreHoriz as MoreHorizIcon  } from "@material-ui/icons";
import { localProfile, bellIcon } from "./assets";
import Loader from "../../../components/src/Loader.web";
import Notifications from "../../notifications/src/Notifications.web";
import InviteForm from "./InviteForm.web";

export default class MiniHeader extends MiniHeaderController {
  constructor(props: Props) {
    super(props);
  }

  handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuAnchorEl: null });
  };

  renderMenuItems = () => {
    return (
      <>
        {this.isNotaryUser() && (
          <MenuItem 
            onClick={() => {    
              this.handleMenuClose();
              this.setState({isInviteFormModalOpen: true});
            }}
            data-testID="inviteClientMenuButton"
          >
            <Box display="flex" alignItems="center" style={{ columnGap: "8px" }}>
              <AddRounded />
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  lineHeight: "24px",
                  textTransform: "none",
                  fontWeight:700
                }}
              >
                Invite Client
              </Typography>
            </Box>
          </MenuItem>
        )}
        {(this.isEndUser() || this.isGuestUser()) && (
          <MenuItem
            onClick={() => {
              this.setBookNowModal(true);
              this.handleMenuClose();
            }}
            data-testID="bookNowMenuButton"
          >
            <Box display="flex" alignItems="center" style={{ columnGap: "8px" }}>
              <AddRounded style={{ height: "24px", width: "24px" }} />
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Book Now
              </Typography>
            </Box>
          </MenuItem>
        )}
        <Divider />
        <MenuItem style={{padding: 0}}>
          <Notifications data-testID="notifications" navigation={this.props.navigation} id={""}/>
        </MenuItem>
        <MenuItem
            onClick={() => {
              this.handleNavigateToMyAccount();              
            }}
            data-testID="userProfileButton"
        >
          <Box display="flex" alignItems="center" style={{ columnGap: "8px" }}>
            {!this.isGuestUser() ?
              <>
                <img
                  style={{ borderRadius: "50%", backgroundColor: "grey" }}
                  src={this.state.userProfilePic !== null ? this.state.userProfilePic : localProfile}
                  width="32px"
                  height="32px"
                  alt="profile_pic"
                />
                <Typography
                  style={{
                    fontWeight: 600,
                    fontFamily: "Inter",
                    fontSize: "14px",
                    lineHeight: "21px",
                  }}
                  data-testID="userNameMenu"
                >
                  {this.state.username}
                </Typography>
              </>
              :
              <>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontFamily: "Inter",
                    fontSize: "14px",
                    lineHeight: "21px",
                  }}
                  data-testID="userNameMenu"
                >
                  Join Now
                </Typography>
              </>}
          </Box>
        </MenuItem>
      </>
    );
  };

  renderProfilePart = () => {
    return (
      <>
      {!this.isGuestUser() ? 
        <Box
          borderRadius={"8px"}
          display={"flex"}
          height={"48px"}
          px={"8px"}
          alignItems={"center"}
          onClick={this.handleNavigateToMyAccount} 
          style={{

            boxShadow: "rgba(0, 0, 0, 0.2) 4px 5px 7px -2px",
            columnGap: "8px",
            backgroundColor: "#FFFFFF",
            cursor: 'pointer'
          }}
          data-testID="userProfileBox"  
        >
        
            <img
              style={{ borderRadius: "50%", backgroundColor: "grey" }}
              src={this.state.userProfilePic !== null ? this.state.userProfilePic : localProfile}
              width="32px"
              height="32px"
              alt="profile_pic"
            />
            <Typography
              style={{
                fontWeight: 600,
                fontFamily: "Inter",
                fontSize: "14px",
                lineHeight: "21px",
              }}
              data-testID="userName"
              variant="body2"
            >
              {this.state.username}
            </Typography>         
        </Box>
        :
        <Box
          borderRadius={"8px"}
          display={"flex"}
          height={"48px"}
          px={"8px"}
          alignItems={"center"}
          onClick={this.handleNavigateToMyAccount} 
          style={{

            boxShadow: "rgba(0, 0, 0, 0.2) 4px 5px 7px -2px",
            columnGap: "8px",
            backgroundColor: "#012275",
            cursor: 'pointer',
            width:"109px"
          }}
          data-testID="userProfileBox"  
        >          
            <Typography
              style={{
                padding:"25px 13px 25px 25px",
                fontWeight: 600,
                fontFamily: "Inter",
                fontSize: "14px",
                lineHeight: "21px",
                color:"white"
              }}
              data-testID="userName"
              variant="body2"
            >
              Join Now
            </Typography>
        </Box>
        }
      </>
    )
  }

  render() {
    const { menuAnchorEl } = this.state;
    return (
      <>
        {/* TEMPORARILY REMOVED LOADER */}
        {/* <Loader loading={this.state.loader} /> */}
        <RequestModal
          navigation={this.props.navigation}
          id={""}
          isOpen={this.state.modalOpen}
          closeModal={this.closeBookNotaryRequestModal}
          data-testID="modalOpen"
          allRequestAPI={this.props.allRequestAPI}
          serviceData={this.state.serviceData}
          cancelReqModal={this.state.cancelBookNowReqModal}
          yesButtonClick={this.bookNowYesButtonClick}
          noButtonClick={this.bookNowNoButtonClick}
          backToEditRequest={() => this.bookNowNoButtonClick()}
          setLoader={this.setLoader}
          setModal={this.setBookNowModal}
          editRequest={undefined}
          isNewRequestOrEditRequestOrInviteClient={this.state.isNewRequestOrEditRequestOrInviteClient}
        />
        <InviteForm 
          navigation={this.props.navigation} 
          id={""} 
          isOpen={this.state.isInviteFormModalOpen}
          serviceData={this.state.updateServiceData}
          setLoader={this.setLoader}
          closeModal={() => this.setState({isInviteFormModalOpen: false})}
          allRequestAPI={this.props.allRequestAPI}
          />
        <Hidden xsDown>
          <Box data-testID="miniHeader" display={"flex"} style={{ columnGap: "16px" }}>
            {this.isNotaryUser() && (
              <Button
                style={{
                  backgroundColor: "#012275",
                  color: "#FFF",
                  height: "48px",
                  padding: "0 16px",
                }}
                startIcon={<AddRounded />}
                data-testID="inviteClientButton"
                onClick={() => this.setState({isInviteFormModalOpen: true})}
              >
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    lineHeight: "24px",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Invite Client
                </Typography>
              </Button>
            )}
            {(this.isEndUser() || this.isGuestUser())&& (
              <Button
                style={{
                  backgroundColor: "#012275",
                  color: "#FFF",
                  height: "48px",
                  padding: "0 16px",
                  textTransform: "none",
                }}
                onClick={this.handleEmptyButtonClick}
                startIcon={<AddRounded style={{ height: "24px", width: "24px" }} />}
                data-testID="bookNowBtn"
              >
                <Typography
                  style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Book Now
                </Typography>
              </Button>
            )}
            <Notifications data-testID="notifications" navigation={this.props.navigation} id={""}/>
            {this.renderProfilePart()}
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={this.handleMenuOpen}
              style={{ 
                padding: "12px",
                backgroundColor: "#012275",
                color: "#FFF"
              }}
              data-testID="mobileMenuButton"
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={this.handleMenuClose}
              PaperProps={{
                style: {
                  width: "280px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }
              }}
            >
              {this.renderMenuItems()}
            </Menu>
          </Box>
        </Hidden>
      </>
    );
  }
}
// Customizable Area End
