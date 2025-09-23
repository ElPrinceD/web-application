import React, { Component } from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Typography,
  styled,
} from "@material-ui/core";

interface Props {
  cancelImage: string;
  cancelReqModal: boolean;
  text: string;
  subText?: string;
  handleYesButtonClick: () => void;
  handleNoButtonClick: () => void;
  yesBtnText?: string;
  noBtnText?: string;
  titleText?: string;
  titleTextClassName?: string;
  subTextClassName?: string;
}

interface S {}

export default class CancelNotaryRequestModal extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CancelRequestModal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={this.props.cancelReqModal}
      >
        <Paper elevation={0} className="cancelModalPaper">
          <Box className="imgBox">
            <img src={this.props.cancelImage} width={"100%"} height={"100%"} />
          </Box>
          <Typography
            style={{
              fontFamily: "Inter",
              fontSize: "36px",
              fontWeight: 600,
              color: "#FF0000",
            }}
          >
            {this.props.titleText}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            style={{ rowGap: "8px" }}
          >
            <Typography variant="body2" className={this.props.titleTextClassName} align="center">
              {this.props.text}
            </Typography>
            <Typography  className={`${this.props.subTextClassName} subText`}>{this.props.subText}</Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ gap: "16px" }}
            width={"100%"}
          >
            <Button
              fullWidth
              onClick={this.props.handleYesButtonClick}
              style={{
                ...webStyle.button,
                textTransform: "none",
                color: "white",
                backgroundColor: "#012275",
              }}
            >
              {this.props.yesBtnText ? this.props.yesBtnText : "Yes"}
            </Button>
            <Button
              fullWidth
              onClick={this.props.handleNoButtonClick}
              style={{
                ...webStyle.button,
                color: "#011342",
                border: "1px solid #012275",
                textTransform: "none",
              }}
            >
              {this.props.noBtnText ? this.props.noBtnText : "No"}
            </Button>
          </Box>
        </Paper>
      </CancelRequestModal>
    );
  }
}

const CancelRequestModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 32px",
  "& .cancelModalPaper": {
    borderRadius: "16px",
    width: "520px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 32px",
    boxSizing: "border-box",
    gap: "24px",
    "& .MuiTypography-body2": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "#1E293B",
    },
    "& .subText": {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "16.94px",
      fontFamily: "Inter",
      color: "#1E293B",
    },
  },
  "& .imgBox": {
    width: "160px",
    height: "160px",
  },
});

const webStyle = {
  button: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "26px",
    borderRadius: "8px",
    padding: "10px",
    height: "52px",
  },
};
