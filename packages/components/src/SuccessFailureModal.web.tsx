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
  image: string;
  isOpen: boolean;
  text: string;
  textColor?: string;
  subText?: string;
  subText2?: string;
  handleButtonClick: () => void;
  buttonText?: string;
  modalWidth?: string;
  navigation?: any;
}

interface S {}

export default class SuccessFailureModal extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CustomModal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={this.props.isOpen}
      >
        <Paper elevation={0} className="saveModalPaper" style={{maxWidth: this.props.modalWidth || "536px"}}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ gap: "24px" }}
            justifyContent={"center"}
            alignItems={"center"}
            maxWidth={"431px"}
          >
            <Box className="imgBox">
              <img src={this.props.image} width={"100%"} height={"100%"} />
            </Box>
            <Typography variant="body1" style={{color: this.props.textColor || "#059669"}} align="center">
              {this.props.text}
            </Typography>
          </Box>
          {this.props.subText && <Typography variant="body2" align="center">
            {this.props.subText}
          </Typography>}
          {this.props.subText2 && <Typography variant="body2" align="center">
            {this.props.subText2}
          </Typography>}
          <Button onClick={this.props.handleButtonClick} fullWidth>
            {this.props.buttonText ? this.props.buttonText : "Check Status"}
          </Button>
        </Paper>
      </CustomModal>
    );
  }
}

const CustomModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .saveModalPaper": {
    borderRadius: "16px",
    maxHeight: "492px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "48px",
    gap: "24px",
    "& .MuiTypography-body1": {
      fontSize: "36px",
      fontWeight: 600,
      lineHeight: "44px",
      fontFamily: "Inter",
    },
    "& .MuiTypography-body2": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "#011342",
    },
    "& .MuiButton-root": {
      color: "white",
      fontFamily: "Inter",
      fontSize: "18px",
      fontWeight: 700,
      backgroundColor: "#012275",
      lineHeight: "26px",
      textTransform: "none",
      borderRadius: "8px",
      padding: "10px 16px",
    },
  },
  "& .imgBox": {
    width: "160px",
    height: "160px",
  },
});
