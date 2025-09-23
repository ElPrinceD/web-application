import { Box, Button } from "@material-ui/core";
import React, { Component } from "react";
import { successImage, warningImage } from "./assets";
type MyProps = {
  closePopup?: () => void;
  btntext?: string;
  type: string;
  submitPopup?: () => void;
  discText: string;
  discText2? : string;
  hideBtn? : boolean;
  successText?:string;
  showBtnSuccess?:boolean;
};
type MyState = { text: string; };

export default class CustomConfirmationPopupMarkComplete extends Component<MyProps, MyState> {
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
          <Box style={{...screen.popUpBox, width: this.props.type === "success" ? "488px" : "520px"}}>
            <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              {this.props.type === "success" && <img src={successImage} alt="" width='140px' height='140px' />}
              {this.props.type === "warning" && <img src={warningImage} alt="" width='140px' height='140px' />}
            </Box>
            <Box style={screen.buttonField}>
              {this.props.type === "success" && 
                <p style={{ color: '#47A573', textAlign: 'center', fontWeight: 600, fontSize: '36px', margin: 0 }}>{ this.props.successText ? this.props.successText : "Success!"}</p>
              }
              <p style={{ color: '#011342', textAlign: 'center', fontWeight: 500, fontSize: '20px' }}>{this.props.discText}</p>
              {this.props.discText2 && <p style={{ color: '#5D5D5D', textAlign: 'center', fontWeight: 500, fontSize: '16px' }}>{this.props.discText2}</p>}
              {this.props.type === "success" && !this.props.hideBtn && this.props.showBtnSuccess &&
                <Box style={screen.buttonBox}>
                  <Button variant="contained"
                    data-test-id= "ok-btn"
                    style={{...screen.commonButton}}
                    onClick={this.props.submitPopup}
                  >
                    {this.props.btntext}
                  </Button>                 
                </Box>
              }
                <Box style={screen.buttonBox}>
                  <Button variant="contained"
                    data-test-id= "ok-btn"
                    style={{...screen.deleteButton, background: "#012275"}}
                    onClick={this.props.submitPopup}
                  >
                    {this.props.btntext}
                  </Button>
                  <Button variant="contained"
                    data-test-id= "cancel-btn"
                    style={screen.cancleButton}
                    onClick={this.props.closePopup}
                  >
                    No
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
  deleteButton: {
    borderRadius: '8px',
    padding: '10px 16px 10px 16px',
    width: '100%',
    fontWeight: 700,
    fontSize: '18px',
    color: 'white',
    textTransform: 'capitalize' as 'capitalize'
  },
  cancleButton: {
    borderRadius: '8px',
    padding: '10px 16px 10px 16px',
    width: '100%',
    fontWeight: 700,
    fontSize: '18px',
    color: '#011342',
    border: '1px solid #011342',
    backgroundColor: 'transparent',
    textTransform: 'capitalize' as 'capitalize'
  },
  commonButton:{
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
