// Customizable Area Start
import React from "react";
import PaymentOptionsController, { Props, configJSON } from "./PaymentOptionsController";
import {
  Box,
  Typography,
  styled,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  amazonPay,
  americanExpress,
  applePay,
  gPay,
  maestro,
  mastercard,
  payPal,
  unionPay,
  visa,
} from "./assets";
import {ArrowBackRounded} from '@material-ui/icons';
import CustomAutocomplete from "../../../components/src/CustomAutocomplete.web";
// Customizable Area End

export default class PaymentOptions extends PaymentOptionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <Box
        data-testID="paymentOptionsPage"
        display={"flex"}
        justifyContent={"center"}
        width={"100vw"}
        pt={"128px"}
      >
        <Box
          width={"90%"}
          maxWidth={"536px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <TitleBox>
            <IconButton data-testID="backArrow" onClick={this.navigateToRequestDetails} style={{padding: "11px 16px" }}>
              <ArrowBackRounded style={{height: "24px", width: "24px", color: "#000"}}/>
            </IconButton>
            <Typography style={webStyle.titleTypography}>
              How would you like to pay?
            </Typography>
          </TitleBox>
          <Box
            mt={"32px"}
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            maxWidth={"536px"}
            style={{ gap: "12px" }}
          >
            <Typography style={webStyle.currencyTitle}>
              {configJSON.chooseYourCurrency}
            </Typography>
            <Box>
              <CustomAutocomplete
                options={["GBP - British Pound Sterling"]}
                value={"GBP - British Pound Sterling"}
                label={""}
                labelColor="#011342"
                fontSize="16px"
                fontWeight={500}
                isAsteriskShown={false}
                onChange={undefined}
                disableClearable={true}
              />
            </Box>
          </Box>
          <Box
            mt={"16px"}
            display={"flex"}
            flexDirection={"column"}
            style={{ gap: "16px" }}
            width={"100%"}
          >
            <FormControl>
              <RadioGroup
                data-testID={"radioGroup"}
                value={this.state.paymentMethod}
                onChange={this.handleMethodChange}
              >
                <ActiveOptionBox>
                  <FormControlLabel
                    value="1"
                    control={<Radio style={{color: "#011342"}}/>}
                    label={
                      <Box>
                        <Typography
                          style={{
                            ...webStyle.optionTypography,
                            color: "#222222",
                          }}
                        >
                          Credit/Debit card
                        </Typography>
                      </Box>
                    }
                  />
                  <Box display={"flex"} style={{ gap: "12px" }}>
                    <img src={unionPay} width={"auto"} height={"30px"} />
                    <img src={mastercard} width={"auto"} height={"30px"} />
                    <img src={maestro} width={"auto"} height={"30px"} />
                    <img src={visa} width={"auto"} height={"30px"} />
                    <img src={americanExpress} width={"auto"} height={"30px"} />
                  </Box>
                </ActiveOptionBox>
                <DisabledOptionBox>
                  <DisabledOptionInnerBox>
                    <FormControlLabel
                      style={{ height: "30px" }}
                      disabled
                      value="2"
                      control={<Radio style={{color: "#64748B"}}/>}
                      label={
                        <Typography
                          style={{
                            ...webStyle.optionTypography,
                            color: "#64748B",
                          }}
                        >
                          PayPal
                        </Typography>
                      }
                    />
                    <img src={payPal} width={"auto"} height={"30px"} />
                  </DisabledOptionInnerBox>
                  <Box ml={"32px"}>
                    <Typography style={webStyle.comingSoon}>
                      {configJSON.commingSoonText}
                    </Typography>
                  </Box>
                </DisabledOptionBox>
                <DisabledOptionBox>
                  <DisabledOptionInnerBox>
                    <FormControlLabel
                      style={{ height: "30px" }}
                      disabled
                      value="3"
                      control={<Radio style={{color: "#64748B"}}/>}
                      label={
                        <Typography
                          style={{
                            ...webStyle.optionTypography,
                            color: "#64748B",
                          }}
                        >
                          Amazon Pay
                        </Typography>
                      }
                    />
                    <img src={amazonPay} width={"auto"} height={"30px"} />
                  </DisabledOptionInnerBox>
                  <Box ml={"32px"}>
                    <Typography style={webStyle.comingSoon}>
                      {configJSON.commingSoonText}
                    </Typography>
                  </Box>
                </DisabledOptionBox>
                <DisabledOptionBox>
                  <DisabledOptionInnerBox>
                    <FormControlLabel
                      style={{ height: "30px" }}
                      disabled
                      value="4"
                      control={<Radio style={{color: "#64748B"}}/>}
                      label={
                        <Typography
                          style={{
                            ...webStyle.optionTypography,
                            color: "#64748B",
                          }}
                        >
                          Apple Pay
                        </Typography>
                      }
                    />
                    <img src={applePay} width={"auto"} height={"30px"} />
                  </DisabledOptionInnerBox>
                  <Box ml={"32px"}>
                    <Typography style={webStyle.comingSoon}>
                      {configJSON.commingSoonText}
                    </Typography>
                  </Box>
                </DisabledOptionBox>
                <DisabledOptionBox>
                  <DisabledOptionInnerBox>
                    <FormControlLabel
                      style={{ height: "30px" }}
                      disabled
                      value="5"
                      control={<Radio style={{color: "#64748B"}}/>}
                      label={
                        <Typography
                          style={{
                            ...webStyle.optionTypography,
                            color: "#64748B",
                          }}
                        >
                          GooglePay
                        </Typography>
                      }
                    />
                    <img src={gPay} width={"auto"} height={"30px"} />
                  </DisabledOptionInnerBox>
                  <Box ml={"32px"}>
                    <Typography style={webStyle.comingSoon}>
                      {configJSON.commingSoonText}
                    </Typography>
                  </Box>
                </DisabledOptionBox>
              </RadioGroup>
            </FormControl>
          </Box>
          <Box width={"100%"} mt={"56px"}>
            <ContinueButton
              fullWidth
              data-testID="continueButton"
              variant="contained"
              disabled={this.state.paymentMethod === ""}
              onClick={this.makePayment}
            >
              <Typography style={webStyle.buttonTypography}>
                Continue
              </Typography>
            </ContinueButton>
          </Box>
        </Box>
      </Box>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const TitleBox = styled(Box)({
  display: "flex",
  columnGap: "24px",
  width: "100%",
  "@media (min-width: 700px)": {
    width: "calc(100% + 80px)",
    marginLeft: "-80px",
  }
})
const ContinueButton = styled(Button)({
  height: "50px",
  backgroundColor: "#012275",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#012275"
  },
  "&.Mui-disabled": {
    opacity: "60%",
    backgroundColor: "#012275",
  },
});

const ActiveOptionBox = styled(Box)({
  border: "1px solid #012275",
  boxShadow: "0 8 32px rgba(0, 0, 0, 0.06)",
  padding: "21px 12px",
  borderRadius: "8px",
  marginTop: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const DisabledOptionBox = styled(Box)({
  border: "1px solid #0131A8",
  boxShadow: "0 8 32px rgba(0, 0, 0, 0.06)",
  padding: "16px 12px",
  borderRadius: "8px",
  marginTop: "16px",
  display: "flex",
  flexDirection: "column",
});

const DisabledOptionInnerBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const webStyle = {
  titleTypography: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "36px",
    lineHeight: "54px",
    color: "#011342",
  },
  currencyTitle: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#011342",
  },
  comingSoon: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#5D5D5D",
  },
  optionTypography: {
    fontFamily: "Inter",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "30px",
  },
  buttonTypography: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "26px",
    color: "#FFFFFF",
  },
};
// Customizable Area End