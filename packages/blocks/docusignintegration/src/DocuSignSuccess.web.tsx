// Customizable Area Start
import React from "react";
import DocuSignSuccessController, { Props } from "./DocuSignSuccessController";
import { Paper, Box, Typography, Button, styled } from "@material-ui/core";
import Loader from "../../../components/src/Loader.web";

export default class DocuSignSuccess extends DocuSignSuccessController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Loader loading={this.state.loader} />
        <MainBox
          data-testID="docuSignSuccess"
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.isSuccessFailurePopupShown && (
            <Paper
              elevation={0}
              style={{
                width: "100%",
                maxWidth: "536px",
                borderRadius: "16px",
                maxHeight: "492px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "48px",
                gap: "24px",
              }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                style={{ gap: "24px" }}
                justifyContent={"center"}
                alignItems={"center"}
                maxWidth={"431px"}
              >
                <Box width={"160px"} height={"160px"}>
                  <img
                    src={this.state.popupImg}
                    width={"100%"}
                    height={"100%"}
                  />
                </Box>
                <Typography
                  style={{
                    color: "#059669",
                    fontSize: "36px",
                    fontWeight: 600,
                    lineHeight: "44px",
                    fontFamily: "Inter",
                  }}
                  align="center"
                >
                  {this.state.popupText}
                </Typography>
              </Box>
              <Typography variant="body2" align="center">
                {this.state.popupSubText}
              </Typography>
              <Button
                data-testID="checkStatusButton"
                onClick={this.navigateToRequestDetails}
                fullWidth
                style={{
                  color: "white",
                  fontFamily: "Inter",
                  fontSize: "18px",
                  fontWeight: 700,
                  backgroundColor: "#012275",
                  lineHeight: "26px",
                  textTransform: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                }}
              >
                {this.state.buttonText}
              </Button>
            </Paper>
          )}
        </MainBox>
      </>
    );
  }
}

const MainBox = styled(Box)({
  "@media (max-width: 1024px)": {
    width: "100%",
  },
  "@media (min-width: 1025px)": {
    width: "calc(100% - 264px)",
  },
});
// Customizable Area End
