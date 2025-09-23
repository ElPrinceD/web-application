import React from "react";

// Customizable Area Start
import {
  Modal,
  Container,
  Box,
  Button,
  Typography,
  Input,
  Paper,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  Divider,
  Dialog,
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  Theme,
  styled,
} from "@material-ui/core/styles";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
  typography: {
    body1: {
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: '14px'
    }
  },
  overrides: {
    MuiDialog: {

    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'transparent'
      }
    }
  }
});
import { sendImg } from "./assets"
import Loader from "../../../../packages/components/src/Loader.web";
// Customizable Area End

import ChatController, { IMessage, Props } from "./ChatController";

export default class Chat extends ChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Customizable Area End

  render() {
    // Customizable Area Start
    const { chatData, newMessage, isLoading } = this.state;
    let lastSenderId: number | null = null;
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Dialog
            open={this.props.open || false}
            aria-labelledby="simple-dialog-title"
          >
            <Paper
              elevation={3}
              style={{
                width: 'clamp(300px, 464px, 40%)',
                position: 'fixed',
                bottom: 0,
                right: 20,
              }}
            >
              <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px' }}>
                <Avatar variant="rounded" src={this.props.profile} data-test-id="other-user-profile" />
                <Typography style={{ fontSize: '20px', fontWeight: 600, }}>{this.props.fullName}</Typography>
                <CloseRoundedIcon
                  onClick={() => this.props.onClose()}
                  style={{ position: 'absolute', right: '15px', cursor: 'pointer' }}
                  data-test-id="close-btn"
                />
              </Box>
              <Divider />
              <div
                ref={this.messageContainerRef}
                style={{ height: '60vh', overflowY: 'auto', padding: '16px', marginBottom: '16px', 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none' }}
              >
                {chatData ? (
                  chatData.map((msg: IMessage) => {
                    const showAvatar = lastSenderId !== msg.account_id;
                    lastSenderId = msg.account_id;

                    return (
                      <Box
                        key={msg.id}
                        display="flex"
                        justifyContent={this.getJustifyContent(msg.account_id, this.props.accountId)}
                        marginBottom="8px"
                      >
                        {showAvatar && msg.account_id !== this.props.accountId && (
                          <Avatar variant="rounded" style={{ marginRight: '8px' }} src={msg.profile}>
                          </Avatar>
                        )}
                        <Box
                          bgcolor={msg.account_id === this.props.accountId ? '#012275' : '#F1F1F1'}
                          padding="8px 16px"
                          borderRadius="12px"
                          maxWidth="60%"
                            style={{
                              marginLeft: this.getLeftPadding(showAvatar, msg.account_id, this.props.accountId),
                              marginRight: this.getRightPadding(showAvatar, msg.account_id, this.props.accountId)
                            }}
                        >
                          <Typography
                            variant="body1"
                            style={{ 
                              color: this.getColor(msg.account_id, this.props.accountId),
                            }}
                          >
                            {msg.message}
                          </Typography>
                        </Box>
                        {showAvatar && msg.account_id === this.props.accountId && (
                          <Avatar variant="rounded" style={{ marginLeft: '8px' }} src={this.props.userProfilePic || ""}>
                          </Avatar>
                        )}
                      </Box>
                    )
                  })
                ) : (
                  <Typography variant="body1">No messages yet.</Typography>
                )}

                {isLoading && <Loader loading={isLoading} />}
              </div>

              <Box display="flex" justifyContent="space-between" alignItems="center" style={{ padding: '16px' }}>
                <CustomInput
                  data-test-id="msg-input"
                  label="Type a message"
                  value={newMessage}
                  onChange={this.handleInputChange}
                  fullWidth
                  variant="outlined"
                  onKeyPress={this.handleKeyPress}
                  inputRef={this.inputRef}
                  InputProps={{
                    endAdornment:
                      <InputAdornment
                        position="end"
                        onClick={this.sendMessage}
                        style={{ cursor: 'pointer' }}
                        data-test-id="send-btn"
                      >
                        <img src={sendImg} />
                      </InputAdornment>,
                  }}
                />
              </Box>
            </Paper>
          </Dialog>
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {};

const CustomInput = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: '1px solid #CBD5E1',
    borderRadius: '8px'
  },
  "& .MuiFormLabel-root": {
    color: 'grey',
    fontSize: '16px',
    fontWeight: 500,
    fontFamily: "Inter"
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: '#000',
  }
});
// Customizable Area End
