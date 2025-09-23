import React from "react";

// Customizable Area Start
import { Box, Button, Typography, styled, Drawer } from "@material-ui/core";
import { Logo, ad_card_1_Banner, cardimage1, cardimage2 } from "./assets";
import { Menu, Close } from "@material-ui/icons";
// Customizable Area End

import OnboardingPageWebController, {
  Props,
} from "./OnboardingPageWebController";

export default class OnboardingPageWeb extends OnboardingPageWebController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    const StyledTypography = styled(Typography)({
      color: "#011342",
      fontWeight: 400,
      fontSize: "16px",
    });
    const BoxHover = styled(Box)({
      "&:hover": {
        backgroundColor: "#0131A8",
        "& .MuiTypography-root": {
          color: "white",
        },
      },
    });
    const PageStyling = styled(Box)({
      "& .logoImg": {
        "@media(min-width:1480px)": {
          marginLeft: "3%",
          width: "194px",
          height: "65.66px",
        },
      },
      "& .welcomBox": {
        "@media(min-width:1480px)": {
          marginTop: "-18%",
          marginLeft: "8%",
        },
      },
      "& .renoImg": {
        maxWidth: "100%",
        height: "100%",
        maxHeight: "1080px",
        width: "650px",
        "@media(min-width:1480px)": {
          width: "580px",
          height: "98vh",
        },
      },
    });
    return (
      // Customizable Area Start
      <PageWrapper>
        <Box className="pageBgImage">
          <div ref={this.state.topRef}></div>
          <DesktopHeaderBox>
            <img
              data-test-id="renotaryLogo"
              src={Logo}
              onClick={this.gotoLandingPage}
              alt="notary"
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              style={{ columnGap: "12px" }}
            >
              <Typography
                align="center"
                style={webStyles.alreadyHaveAnAccountText}
              >
                Already have an Account?
              </Typography>
              <Button
                data-test-id="loginBtn"
                onClick={() => this.goToLogin()}
                style={webStyles.logInBtn}
              >
                LOG IN
              </Button>
            </Box>
          </DesktopHeaderBox>
          <MobileHeaderBox>
            <ImageStyling
              onClick={this.gotoLandingPage}
              src={Logo}
              alt="notary"
            />
            <Button data-test-id="toggleButton" onClick={this.toggleDrawer(true)}>
              <Menu style={{ color: "#FFF" }} />
            </Button>
            <Drawer
              data-test-id="togglebutton"
              open={this.state.isDrawerOpen}
              PaperProps={{ style: { width: "100%" } }}
            >
              <Box width={"100%"} onClick={this.toggleDrawer(false)}>
                <Box sx={{ padding: "48px 8% 0" }}>
                  <Box
                    width={"100%"}
                    mb={"35px"}
                    display={"flex"}
                    justifyContent={"end"}
                  >
                    <Button
                      style={{ padding: "0", minWidth: "0" }}
                      onClick={this.toggleDrawer(false)}
                    >
                      <Close style={{ width: "32px", height: "32px" }} />
                    </Button>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    style={{ columnGap: "8px" }}
                    className="openMenuBox"
                  >
                    <Typography
                      align="center"
                      style={{
                        ...webStyles.alreadyHaveAnAccountText,
                        color: "black",
                      }}
                    >
                      Already have an Account?
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => this.goToLogin()}
                      style={{
                        ...webStyles.logInBtn,
                        backgroundColor: "#012275",
                      }}
                    >
                      <Typography>LOG IN</Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Drawer>
          </MobileHeaderBox>
          <DesktopBodyBox>
            <Box
              display="flex"
              width={"100%"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              style={{ rowGap: "40px" }}
            >
              <Box width={"75%"}>
                <Typography
                  style={{
                    ...webStyles.contentText1,
                    fontSize: "1.5rem",
                    lineHeight: "2.25rem",
                    letterSpacing: "-0.5%",
                  }}
                >
                  Welcome to renotary!
                </Typography>
                <Typography
                  style={{
                    ...webStyles.contentText2,
                    fontSize: "3.5rem",
                    lineHeight: "4.841rem",
                  }}
                >
                  Remote Notary Services
                </Typography>
              </Box>
              <Box display={"flex"} style={{ columnGap: "24px" }}>
                <CustomBox
                  onClick={() => this.gotoIndividual("")}
                  data-test-id="CardTest1"
                  sx={webStyles.cardBox}
                >
                  <img
                    style={{ 
                      height: "128px", 
                      width: "128px",
                    }}
                    src={cardimage1}
                    alt="cardimage1"
                    className="cardImage"
                  />
                  <StyledTypography>
                    <CardContentSpan> I need </CardContentSpan> a Notary
                  </StyledTypography>
                </CustomBox>
                <CustomBox
                  onClick={this.gotoIamNotary}
                  data-test-id="CardTestBtn1"
                  sx={webStyles.cardBox}
                >
                  <img
                    src={cardimage2}
                    style={{ 
                      height: "128px", 
                      width: "128px",
                    }}
                    alt="cardimage2"
                    className="cardImage"
                  />
                  <StyledTypography>
                    <CardContentSpan> I am </CardContentSpan> a Notary
                  </StyledTypography>
                </CustomBox>
              </Box>
            </Box>
          </DesktopBodyBox>
          <MobileBodyBox>
            <Box className="boxWrapper">
              <Box
                alignItems={"center"}
                display={"flex"}
                flexDirection={"column"}
                paddingX={"16px"}
              >
                <WelcomeContentTypography
                  align="center"
                  style={{ ...webStyles.contentText1 }}
                >
                  Welcome to renotary!
                </WelcomeContentTypography>
                <RenotaryServiceContentTypography
                  align="center"
                  style={{ ...webStyles.contentText2 }}
                >
                  Remote Notary Services
                </RenotaryServiceContentTypography>
              </Box>
              <Box className="boxWrapper">
                <BoxHover
                  onClick={() => this.gotoIndividual("")}
                  data-test-id="CardTest"
                  sx={webStyles.cardBox}
                >
                  <img src={cardimage1} alt="cardimage1" width={"51%"} />
                  <StyledTypography>
                    <CardContentSpan> I need </CardContentSpan> a Notary
                  </StyledTypography>
                </BoxHover>
                <BoxHover
                  onClick={this.gotoIamNotary}
                  data-test-id="CardTestBtn"
                  sx={webStyles.cardBox}
                >
                  <img src={cardimage2} alt="cardimage2" width={"51%"} />
                  <StyledTypography>
                    <CardContentSpan> I am </CardContentSpan> a Notary
                  </StyledTypography>
                </BoxHover>
              </Box>
            </Box>
          </MobileBodyBox>
          <PageStyling display={"none"} />
        </Box>
      </PageWrapper>
      // Customizable Area End
    );
  }
}
// Customizable Area Start
const PageWrapper = styled(Box)({
  "& .pageBgImage":{  
    backgroundImage: `url(${ad_card_1_Banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "50% 100%",
    backgroundPosition: "right",
    height: "100vh",
    width: "100%",
    "@media (max-width: 767px)": {
      background:"none",
    }
  }
})
const DesktopHeaderBox = styled(Box)({
  "@media (max-width: 1231px)": {
    display: "none",
  },
  padding:"4.5vh 48px 0",
  margin: "0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const MobileHeaderBox = styled(Box)({
  "@media (min-width: 1232px)": {
    display: "none",
  },
  margin:"0",
  padding: "20px 35px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .openMenuBox":{
    flexDirection:"column"
  },
  "& button":{
    minWidth:"auto !important",
    padding:"0 !important",
    "& svg":{
      "@media (max-width:767px)": {
        fill:"#212121 !important",
      }
    }
  },
});

const DesktopBodyBox = styled(Box)({
  "@media (max-width: 1231px)": {
    display: "none",
  },
  height: "87vh",
  width: "50vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const MobileBodyBox = styled(Box)({
  "@media (min-width: 1232px)": {
    display: "none",
  },
  height: "88vh",
  width: "50vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width:767px)": {
    width:"100%",
    height: "calc(100% - 80px)",
  },
  "& .boxWrapper":{
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    gap:"20px",        
  }
});

const ImageStyling = styled("img")({
  "@media (max-width: 450px)": {
    width: "140px",
  },
});

const WelcomeContentTypography = styled(Typography)({
  "@media (max-width: 450px)": {
    fontSize: "1rem",
    lineHeight: "1rem",
    letterSpacing: "-0.5%",
  },
  "@media (min-width: 450px)": {
    fontSize: "1.25rem",
    lineHeight: "2.25rem",
    letterSpacing: "-0.5%",
  },
});

const RenotaryServiceContentTypography = styled(Typography)({
  "@media (max-width: 450px)": {
    lineHeight: "2rem",
  },
  "@media (min-width: 450px)": {
    lineHeight: "2.375rem",
  },
  fontSize: "2rem",
});

const CardContentSpan = styled("span")({
  fontWeight: 700,
});

const CustomBox = styled(Box)({
  "&:hover": {
    backgroundColor: "#0131A8",
    "& .MuiTypography-root": {
      color: "white",
    },
    "& .cardImage": {
      filter: 'invert()',
      msFilter:'invert()',
      WebkitFilter:'invert()',
      mixBlendMode: 'plus-lighter'
    }
  },
});

const webStyles = {
  pageBackgroundImage: {
    backgroundImage: `url(${ad_card_1_Banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "50% 100%",
    backgroundPosition: "right",
    height: "100vh",
    width: "100%",
  },
  alreadyHaveAnAccountText: {
    fontWeight: 400,
    fontSize: "16px",
    color: "#FFFFFF",
    fontFamily: "INTER",
    lineHeight: "24px",
  },
  logInBtn: {
    height: "44px",
    width: "96px",
    borderRadius: "54px",
    border: "1px solid white",
    color: "#FFFFFF",
  },
  cardBox: {
    cursor: "pointer",
    height: "17vw",
    width: "17vw",
    minWidth: "150px",
    minHeight: "150px",
    border: "1px solid black",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  contentText1: {
    color: "#011342",
    fontWeight: 600,
  },
  contentText2: {
    fontWeight: 700,
    color: "#012275",
  },
};
// Customizable Area End
