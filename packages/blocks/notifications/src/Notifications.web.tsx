import React from "react";

// Customizable Area Start
import { receipt } from "./assets";
import {
  Box,
  Button,
  Hidden,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

interface INotification {
  type: string;
  id: string;
  attributes: {
    created_by: number;
    id: number;
    contents: string;
    headings: string;
    is_read: boolean;
    app_url: string;
    created_at: string;
    updated_at: string;
    read_at?: null;
    account: {
      first_name?: null;
      id: number;
      full_phone_number: string;
      last_name?: null;
      phone_number?: null;
      country_code?: null;
      activated: boolean;
      email: string;
      unique_auth_id: string;
      device_id?: null;
      password_digest: string;
      updated_at: string;
      created_at: string;
      user_name?: null;
      user_type: string;
      platform?: null;
      last_visit_at?: null;
      app_language_id?: null;
      suspend_until?: null;
      is_blacklisted: boolean;
      role_id: number;
      status: string;
      stripe_subscription_id?: null;
      stripe_id?: null;
      full_name: string;
      stripe_subscription_date?: null;
      date_of_birth?: null;
      gender?: null;
      country?: null;
      age?: null;
      contact_name?: null;
      address?: null;
      google_calendar_credentials?: null;
      company_name?: null;
      is_otp_verify: boolean;
      password_history?: string[] | null;
      post_code?: null;
      city?: null;
      address_line_2?: null;
      activation_time?: null;
      rating: number;
      last_activation_time?: null;
      session_id?: null;
      is_online: boolean;
      deletion_time?: null;
      connected_account_id?: null;
      outlook_calendar_token?: null;
      google_calendar_sync: boolean;
      outlook_calendar_sync: boolean;
      is_deleted: boolean;
      google_calendar_token?: null;
    };
  };
}
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notifications extends NotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderNotifications = (timeFrame: number) => {
    let heading: string = "";
    let notifications: INotification[] = [];
    switch (timeFrame) {
      case 0:
        heading = "Today";
        notifications = this.state.today;
        break;
      case 1:
        heading = "Yesterday";
        notifications = this.state.yesterday;
        break;
      case 2:
        heading = "2 days ago";
        notifications = this.state.twoDaysAgo;
        break;
      case 3:
        heading = "1 week ago";
        notifications = this.state.oneWeekAgo;
        break;
      case 4:
        heading = "2 weeks Ago";
        notifications = this.state.twoWeeksAgo;
        break;
      case 5:
        heading = "1 month ago";
        notifications = this.state.monthAgo;
        break;
      case 6:
        heading = "1 year ago";
        notifications = this.state.yearAgo;
        break;
    }
    return (
      <>
        {notifications.length > 0 && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ gap: "16px" }}
          >
            <Box px={"24px"}>
              <Typography style={styles.timeFrame}>{heading}</Typography>
            </Box>
            <Box>
              {notifications.map((notification, notificationIndex) => (
                <Box
                  key={notificationIndex}
                  borderTop={notificationIndex !== 0 && "1px solid #E2E8F0"}
                  py={"12px"}
                  px={"24px"}
                  data-testID="notification"
                  onClick={() => {
                    this.markAsRead(notification.id);
                  }}
                  display={"flex"}
                  style={{
                    gap: "24px",
                    backgroundColor: notification.attributes.is_read
                      ? "#FFF"
                      : "#00000016",
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"100px"}
                    minWidth={"44px"}
                    height={"44px"}
                    bgcolor={"#F5F9FF"}
                  >
                    <img src={receipt} alt="notification" />
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ gap: "2px", paddingTop: "10px"}}
                  >
                    <Box width={"100%"}>
                      <Typography
                        style={{ ...styles.content, textWrap: "wrap" }}
                        dangerouslySetInnerHTML={{
                          __html: this.cleanHtmlContent(notification.attributes.contents),
                        }}
                      />
                    </Box>
                    <Typography style={styles.time}>
                      {this.showTime(notification.attributes.created_at)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme} data-testID="notifications">
        <Hidden xsDown>
          <IconButton
            data-testID="bell"
            onClick={this.handleClick}
            style={{ padding: 0 }}
          >
            <Box
              borderRadius={"4px"}
              bgcolor={this.isOpen() ? "#012275" : "#FFF"}
              boxShadow="rgba(0, 0, 0, 0.2) 0px 3px 5px 0px"
              width={"48px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"48px"}
            >
              <img src={this.notificationIcon()} />
            </Box>
          </IconButton>
        </Hidden>
        <Hidden smUp>
          <Button
            fullWidth
            variant="text"
            style={{ textTransform: "none", paddingLeft: "16px" }}
            onClick={this.handleClick}
          >
            <Box
              width={"100%"}
              display="flex"
              alignItems="center"
              style={{ columnGap: "8px" }}
            >
              <img
                src={this.notificationIcon()}
                style={{ width: "30px", height: "30px" }}
              />
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Notifications
              </Typography>
            </Box>
          </Button>
        </Hidden>
        <Popover
          data-testID="popover"
          disablePortal
          style={{ marginTop: "12px" }}
          id="popover"
          open={this.isOpen()}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{ style: { borderRadius: "8px" } }}
        >
          <Box
            maxWidth={"675px"}
            maxHeight={"min(852px, calc(100vh - 154px))"}
            width={"90vw"}
            borderRadius={"8px"}
            display={"flex"}
            flexDirection={"column"}
            py={"24px"}
            style={{ gap: "24px" }}
            boxShadow={"0px 8px 32px 0px #0000000F"}
          >
            <Box px={"24px"} display={"flex"} justifyContent={"space-between"}>
              <Typography style={styles.heading}>Notifications</Typography>
              <Button
                data-testID="markAllAsRead"
                variant="text"
                onClick={() => this.markAsRead()}
              >
                <Typography style={styles.markAllAsRead}>
                  MARK ALL AS READ
                </Typography>
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ gap: "16px" }}
            >
              <div
                style={{
                  overflow: "auto",
                  gap: "12px",
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "min(746px, calc(100vh - 260px))",
                }}
                ref={this.state.boxRef}
                onScroll={this.handleScroll}
              >
                {this.renderNotifications(0)}
                {this.renderNotifications(1)}
                {this.renderNotifications(2)}
                {this.renderNotifications(3)}
                {this.renderNotifications(4)}
                {this.renderNotifications(5)}
                {this.renderNotifications(6)}
              </div>
            </Box>
          </Box>
        </Popover>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Inter",
    },
  },
});

const styles = {
  heading: {
    fontWeight: 700,
    fontSize: "20px",
  },
  markAllAsRead: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#012275",
  },
  timeFrame: {
    fontWeight: 600,
    fontSize: "16px",
  },
  content: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  },
  time: {
    fontSize: "14px",
    fontWeight: 600,
  },
};
// Customizable Area End
