import { Box, Button } from "@material-ui/core";
import React, { Component } from "react";
import { successImage, warningImage } from "./assets";
type MyProps = {
  closePopup?: () => void;
  btntext?: string;  
  submitPopup?: () => void;
  discText: string;
};
type MyState = { text: string; };

export default class CustomConfirmationPopupDisconnectStripe extends Component<MyProps, MyState> {

  static propTypes = {

  };

  constructor(props: any) {
    super(props);

    this.state = {
      text: '',

    };
  }

  render() {

    return (
      <>
        <Box style={screen.main}>
          <Box style={{...screen.popUpBox, width: "520px"}}>
            <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              <img src={warningImage} alt="" width='160px' height='160px' />
            </Box>
            <Box style={screen.buttonField}>             
              <p style={{ color: '#011342', textAlign: 'center', fontWeight: 500, fontSize: '16px' }}>{this.props.discText}</p>
                <Box style={screen.buttonBox}>
                  <Button variant="contained"
                    data-test-id= "ok-btn"
                    style={{...screen.cancleButton, background: "#012275"}}
                    onClick={this.props.closePopup}
                  >
                    Cancel
                  </Button>
                  <Button 
                    data-test-id= "cancel-btn"
                    style={screen.submitButton}
                    onClick={this.props.submitPopup}
                  >
                    {this.props.btntext}
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
    height: 'fit-content',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: '32px',
    borderRadius: '16px'
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
  cancleButton: {
    borderRadius: '8px',
    padding: '10px 16px 10px 16px',
    width: '100%',
    fontWeight: 700,
    fontSize: '18px',
    color: 'white',
    textTransform: 'capitalize' as 'capitalize'
  },
  submitButton: {
    padding: '10px 16px 10px 16px',
    width: '100%',
    fontWeight: 700,
    fontSize: '18px',
    color: '#011342',
    backgroundColor: 'transparent',
    textTransform: 'capitalize' as 'capitalize'
  }
}





