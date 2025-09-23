import { Box, Button, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from "react";

type MyProps = {
  closePopup?: () => void;    
  submitSignUp?: () => void;
  submitLogin?: () => void;
};

export default class CustomLoginSignUpPopup extends Component<MyProps> {
  constructor(props: any) {
    super(props);   
  }

  render() {
    return (
      <>
        <Box style={screen.main}>
          <Box style={{...screen.popUpBox}}>
            <Box style={screen.header}>
              <IconButton 
                onClick={this.props.closePopup}
                style={screen.closeButton}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <span style={screen.title}>LOG IN/SIGN UP</span>								
            </Box>
            <Box style={screen.buttonField}>
              <p style={screen.description}>
                Please Signup/Login to view the quotes sent by the notary.
              </p>
              <Box style={screen.buttonBox}>
                <Button 
                  variant="contained"
                  data-test-id="ok-btn"
                  style={{...screen.commonButton}}
                  onClick={this.props.submitLogin}
                >
                  LOG IN
                </Button>                 
              </Box>                          
              <Box style={screen.buttonBox}>
                <Button 
                  variant="contained"
                  data-test-id="ok-btn"
                  style={{...screen.commonOtherButton}}
                  onClick={this.props.submitSignUp}
                >
                  SIGN UP
                </Button>                  
              </Box>              
            </Box>
          </Box>
        </Box>
      </>
    )
  }
}

const screen = {
  main: {
    position: "absolute" as "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(0, 0, 0, .4)",
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popUpBox: {
    width: '425px',
    height: 'fit-content',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: '32px',
    borderRadius: '16px',
    position: 'relative' as 'relative'
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
    position: 'relative' as 'relative'
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    right: -20,
    top: -20,
    color: '#011342',
    backgroundColor: 'white',
    padding: '8px',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  title: {
    color: "#0131A8",
    fontSize: "18px",
    textAlign: 'center' as 'center',
    fontWeight: 700,
    lineHeight: "26px"
  },
  description: {
    color: '#011342',
    textAlign: 'center' as 'center',
    fontSize: '16px',
    lineHeight: "24px",
    margin: 0
  },
  buttonField: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '15px',
    width: '100%'
  },
  buttonBox: {    
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '15px'
  },
  commonOtherButton: {
    borderRadius: '8px',
    padding: '10px 16px 10px 16px',
    width: '100%',
    fontWeight: 700,
    fontSize: '18px',
    color: '#012275',
    border: '1px solid #012275',
    backgroundColor: 'transparent',
    textTransform: 'capitalize' as 'capitalize'
  },
  commonButton: {
    borderRadius: '8px',
    padding: '10px 16px 10px 16px',
    width: '100%',
    fontWeight: 700,
    fontSize: '18px',
    backgroundColor: '#012275',
    color: 'white',
    textTransform: 'capitalize' as 'capitalize'
  }
}