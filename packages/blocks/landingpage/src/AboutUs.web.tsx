import React from "react";

// Customizable Area Start
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  CircularProgress,
  CardMedia,
  styled,
} from "@material-ui/core";

import {
  CEO1,
  CEO2,
  CPO1,
  CPO2,
  Cofounder1,
  Cofounder2,
  Founder1,
  Founder2,
  book,
  builder1,
  business1,
  docusign,
  fasttrack,
  gbg,
  group,
  group1,
  mision,
  vision,
  whyus1,
  whyus2,
  whyus3,
  whyus4,
  zoom1,
} from "./assets";
import CallMadeIcon from "@material-ui/icons/CallMade";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import CountUp from "react-countup";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Header from "../src/Header.web";
import { Footer } from "../../../components/src/Footer.web";
import Slider from "react-slick";

// Customizable Area End

import LandingPageController, { Props } from "./LandingPageController";
import { ExpandMore } from "@material-ui/icons";

export default class AboutUs extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
    // Customizable Area End
  render() {
    
    const ImgStyling = styled(Box)({
      "@media (min-width: 1280px)": {
        "& .MuiContainer-maxWidthLg": {
          maxWidth: "unset",
        },
        "& .MuiGrid-grid-lg-3": {
          flexBasis: "unset",
        },
      },
      "& .heading": {
        "& .heading2": {
          color: "#FFFFFF",
          fontSize: "45.19px",
          fontWeight: 700,
          textAlign: "center" as const,
          fontFamily: "INTER",
          width: "90%",
          margin: "auto",
          lineHeight: "56px",
          letterSpacing: "-1px",
          "@media (max-width: 1280px) and (min-width: 1080px)": {
            width: "86%",
          },

          "@media (min-width: 1280px)": {
            width: "71%",
          },
          "@media (min-width: 1540px)": {
            width: "59%",
          },
        },
      },
      "& .heading3": {
        width: "auto",
        height: "131px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      },

      "& .mainContainer": {
        padding: "2% 8%",
      },

      "& .notarySample": {
        borderRadius: 10,
        height: "287px",
        marginLeft: "11%",
        width: "36vw",
        "@media (max-width:958px)": {
          backgroundColor: "red",
          height: "90%",
          width: "90%",
        },
      },

      "& .aboutUsImage": {
        display: "flex",
        width: "100%",
        marginTop: "9%",
        "@media (min-width: 815px) and (max-width:959px)": {
          marginTop: "25%",
        },
        "@media (min-width: 650px) and (max-width:815px)": {
          marginTop: "30%",
        },
        "@media (min-width: 600px) and (max-width:650px)": {
          marginTop: "35%",
        },
        "@media (min-width: 500px) and (max-width:600px)": {
          marginTop: "40%",
        },
        "@media (min-width: 350px) and (max-width:500px)": {
          marginTop: "45%",
        },
      },

      "& .contentRes": {
        "@media (min-width: 675px) and (max-width:959px)": {
          width: "67vw",
        },
        "@media (min-width: 458px) and (max-width:674px)": {
          width: "89vw",
        },
      },

      "& .ourPartners": {
        "@media (min-width: 829px) and (max-width:959px)": {
          marginTop: "30%",
        },
        "@media (min-width: 627px) and (max-width:829px)": {
          marginTop: "40%",
        },
        //  "@media (min-width: 500px) and (max-width:627px)": {
        //   marginTop: "40%"
        //  },
      },
    });
    const {expanded} = this.state;
    const partners =this.state.patnerData ||[]
     const leaderShipDatas=this.state.leaderShipData||[]
     const faqDatas=this.state.faqData ||[]
     const title = this.state.faqTitle.faq_title || '';
    const firstTwoWords = title.split(' ').slice(0, 2);
    const transformedFirstWord = firstTwoWords.length > 0 ? this.capitalizeFirstLetter(firstTwoWords[0]) : '';
    const remainingWords = firstTwoWords.slice(1).join(' ');
    const leaderShiptitle = this.state.leaderShipstory?.story_title||'';
    
    return (
      // Customizable Area Start
      // Required for all blocks
      <>
        <Header navigation={this.props.navigation} id={""} />
      <div ref={this.state.topRef}></div>
        <Box mt={"122px"} display={"flex"} justifyContent={"center"}>
          <StyledImage className="aboutUsImage" width="100%" src={group1} alt="groupImage" />
        </Box>

        <AboutSectionWrapper>
          <Box className="about-us-container-box">
            <Grid
              container
              spacing={10}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box>
                  <Typography style={webStyles.groupHeader1}>
                    {leaderShiptitle.toUpperCase()}
                  </Typography>
                  <Typography style={{ ...webStyles.groupBody1 }}>
                    {this.state.leaderShipstory?.story_description}

                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              {this.state.loading ? <CircularProgress />:(

                <img
                  style={{ borderRadius: 10, width: "100%", height: "auto" }}
                  src={this.state.leaderShipstory?.story_image?.url}
                  alt="notary"
                />
              )}
              </Grid>
            </Grid>
          </Box>

          <Box className="about-us-container-box">
            <Grid
              container
              spacing={10}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              {this.state.loading ? <CircularProgress />:(

                <img
                  style={{ borderRadius: 10, width: "100%", height: "auto" }}
                  src={this.state.homeData.vision_mission?.vision_mission_image?.url}
                  alt="notary"
                />
              )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box style={{ width: "100%", height: "50%" }}>
                  <Box
                  className="content-spacing"
                    style={{
                      alignItems: "flex-start",
                      paddingBottom: "5%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img src={this.state.homeData.vision_mission?.vision?.icon?.url} alt="notary" style={{ paddingRight: 12 ,width:'42px',height:'40px'}} />
                    <Box>
                      <Typography
                        style={{ ...webStyles.groupHeader, color: "#012275" }}
                      >
                          {this.state.homeData.vision_mission?.vision?.title?.toUpperCase() || ''}
                      </Typography>
                      <Typography style={webStyles.groupBodySubHeading}>
                      {this.state.homeData.vision_mission?.vision?.description}

                      </Typography>
                    </Box>
                  </Box>
                  <Box
                      className="content-spacing"
                    style={{
                      alignItems: "flex-start",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img src={this.state.homeData.vision_mission?.mission?.icon?.url} alt="notary" style={{ paddingRight: 12,width:'42px',height:'40px' }} />
                    <Box>
                      <Typography
                        style={{ ...webStyles.groupHeader, color: "#012275" }}
                      >
                        {this.state.homeData.vision_mission?.mission?.title?.toUpperCase() || ''}
                      </Typography>
                      <Typography style={webStyles.groupBodySubHeading}>
                      {this.state.homeData.vision_mission?.mission?.description}

                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        <Box sx={webStyles.cardContainer}>
          <Container maxWidth="xl">
            <ImgStyling>
              <Box className="heading" style={{ display: "grid", gap: "12px" }}>
                <Box>
                  <Typography style={webStyles.cardHeader}>
                  {this.state.homeData.story?.title?.toUpperCase() || ''}
                  </Typography>
                </Box>

                <Typography variant="h3" className="heading2">
               {this.formatTitle(this.state.homeData.story?.subtitle)}
                </Typography>
              </Box>
            </ImgStyling>
            <Grid
              container
              style={{
                justifyContent: "center",
                marginTop: "3%",
                columnGap: "3%",
                rowGap: "12px",
              }}
            >
              <Grid item>
                <Card style={webStyles.cards}>
                  <CardContent style={{ padding: "24px 24px" }}>
                  
                    <Typography style={webStyles.steps11}>
                    <CountUp
                      start={0}
                      end={5}
                      duration={2}
                      enableScrollSpy
                     />k+</Typography>
                    <Typography style={webStyles.cardDescription}>
                      Satisfied clients
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={webStyles.cards}>
                  <CardContent style={{ padding: "24px 8px" }}>
                    <Typography style={webStyles.steps11}>
                    <CountUp
                      start={0}
                      end={100}
                      duration={2}
                      enableScrollSpy
                     />+</Typography>
                    <Typography style={webStyles.cardDescription}>
                      Top-rated reviews
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={webStyles.cards}>
                  <CardContent style={{ padding: "24px 8px" }}>
                    <Typography style={webStyles.steps11}>
                    <CountUp
                      start={0}
                      end={300}
                      duration={2}
                      enableScrollSpy
                     />%</Typography>
                    <Typography style={webStyles.cardDescription}>
                      Boost in document security
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={webStyles.cards}>
                  <CardContent style={{ padding: "24px 8px" }}>
                    <Typography style={webStyles.steps11}>
                      <CountUp
                      start={0}
                      end={10}
                      duration={2}
                      enableScrollSpy
                     />x</Typography>
                    <Typography style={webStyles.cardDescription}>
                      Streamlining of process
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box className="about-us-container-box">
          <WhyUsMobileBox>
            <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
              <Typography
                style={{ ...webStyles.typo1, textTransform: "uppercase" }}
              >
                  {this.state.homeData.why_choose_us?.title?.toUpperCase() || ''}
              </Typography>
              <Typography
                style={{
                  ...webStyles.typo21,
                  paddingBottom: "30px",
                  width: "100%",
                  textAlign: "start"                  
                }}
              >               
               {this.formatTitle(this.state.homeData.why_choose_us?.subtitle)}

              </Typography>
            </Box>
            <Box style={{ ...webStyles.main }}>
              <Box style={{ width: "100%", height: "auto" }}>
              {this.state.whyChoosData && this.state.whyChoosData.map((whyUsPoint, index) => (

                <Box
                  style={{
                    display: "flex",
                    marginBottom: "32px",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <img src={whyUsPoint.icon?.url}
                 alt="notary" style={{ width:"22px", paddingRight: 12 }} />
                  <Box>
                    <Typography
                      style={{
                        ...webStyles.groupHeader,
                        textTransform: "uppercase",
                        color: "#012275",
                      }}
                    >
              {whyUsPoint?.name?.toUpperCase() || ''}
                    </Typography>
                    <Typography style={{ ...webStyles.groupBody }}>
                    {whyUsPoint?.description}

                    </Typography>
                  </Box>
                </Box>
              ))}
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
            {this.state.loading ? <CircularProgress />:(

               <img
                src={this.state.homeData.why_choose_us?.image?.url}
                alt="business"
                style={{ width: "100%", height: "auto", marginRight: "-9%" }}
              /> 
              )}
            </Box>
          </WhyUsMobileBox>
          <WhyUsDesktopBox>
            <Grid container justifyContent="center" alignItems="flex-start">
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{ ...webStyles.main }}
              >
                <Box style={{ width: "100%", height: "50%" }}>
                {this.state.whyChoosData && this.state.whyChoosData.map((whyUsPoint, index) => (

                  <Box
                    style={{
                      display: "flex",
                      marginBottom: "32px",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <img
            src={whyUsPoint.icon?.url}
            alt="notary"
                      style={{ paddingRight: 12,width:'42px',height:'40px' }}
                    />
                    <Box>
                      <Typography
                        style={{
                          ...webStyles.groupHeader,
                          textTransform: "uppercase",
                          color: "#012275",
                        }}
                      >
               {whyUsPoint?.name?.toUpperCase() || ''}
                      </Typography>
                      <Typography style={{ ...webStyles.groupBody }}>
                      {whyUsPoint?.description}

                      </Typography>
                    </Box>
                  </Box>
                ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"end"}
                >
                  <Typography
                    style={{ ...webStyles.typo1, textTransform: "uppercase" }}
                  >
                  {this.state.homeData.why_choose_us?.title?.toUpperCase() || ''}
                  </Typography>
                  <Typography style={{ ...webStyles.typo21, textAlign: "end" }}>
                  {this.captilFirstWhychoosSubTitle(this.state.homeData.why_choose_us?.subtitle)}

                  </Typography>
                  {this.state.loading ? <CircularProgress />:(

                  <img
                    src={this.state.homeData.why_choose_us?.image?.url}
                    alt="business"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginRight: "-9%",
                    }}
                  />
                  )}
                </Box>
              </Grid>
            </Grid>
          </WhyUsDesktopBox>
        </Box>

        <Box className="about-us-container-box">
          <Box sx={webStyles.cardContainer1}>
            <Box>
              <Typography
                style={{
                  color: "#0131A8",
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: "INTER",
                  textTransform: "uppercase",
                }}
              >
                OUR Partners
              </Typography>
              <Typography
                variant="h3"
                style={{
                  color: "#011342",
                  fontSize: "36px",
                  fontWeight: 700,
                  paddingBottom: "3%",
                  fontFamily: "INTER",
                }}
              >
                We have the most trusted partners with us
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"} width={"100%"} style={webStyles.slickMainSlider}>
            <Grid container spacing={4}>
            <Slider
              className="slider variable-width"
              variableWidth={true}
              dots={false}
              infinite={true}
              slidesToShow={2}
              slidesToScroll={1}
              autoplay={true}
              speed={4000}
              autoplaySpeed={0}
              cssEase="linear"
              pauseOnHover={false}
            >
              {partners.map((eachItem, index) => (
                 <Box>
                    <Box style={webStyles.sliderLoopMain} >
                      <Box style={webStyles.vector} className="sliderLoopSecondMain">
                        <img src={eachItem.attributes?.logo_image?.url}
                          alt="notary" width="48px" height={"48px"} />
                        <Typography style={webStyles.vectorContent}>
                          {eachItem.attributes.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
              ))}
              </Slider>
            </Grid>

          </Box>

          
        </Box>
      </AboutSectionWrapper>


        <LeardershipSection>
            <Box mt={"80px"} py={"80px"} style={webStyles.cardContainer2}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "48px",
                }}
              >
                <Typography style={webStyles.cardHeader}>LEADERSHIP</Typography>
                <Typography variant="h3" style={webStyles.cardSubHeader1}>
                  {this.state.leaderShipTitle.title}
                </Typography>
              </Box>
              <Box mx={"16px"}>
                <Grid
                  container
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  
                  {leaderShipDatas.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} xl={3} lg={3}>
                      <Card
                        style={{
                          ...webStyles.cardGrid,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CardMedia className="leadership-image"
                          component="img"
                          image={item?.image?.url}          
                                      alt={`leader ${index + 1}`}
                          style={{
                            maxWidth: "270px",
                            maxHeight: "260px",
                            borderRadius: "8px",
                          }}
                        />
                        <CardContent className="leadership-content">
                          <Typography style={webStyles.steps1} className="leadership-title">
                            {item.designation}
                          </Typography>
                          <Typography style={webStyles.steps2} className="leadership-subtitle">
                            {item.name}
                          </Typography>
                        </CardContent>
                      
                      </Card>
                    </Grid>
                    ))}
                </Grid>
              </Box>
            </Box>
        </LeardershipSection>

        <AboutSectionWrapper>
          <Box className="about-us-container-box">
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
            >
              <Typography   style={{
                  ...webStyles.typo1,
                  marginBottom: 0,
                  marginRight: "16px",
                  fontSize: "2.5rem",
                  color: "#040919",
                }}>
  {this.state.faqTitle.faq_title
    ?.replace(/([a-z])([A-Z])/g, '$1 $2') 
    .replace(/^./, (str: string) => str.toUpperCase())}
</Typography>
              <Box

                sx={{
                  paddingTop: "8px",
                  alignItems: "end",
                  display: "flex",
                }}
              >
              <Button target="_blank" href="/Faq">
                <CallMadeIcon 
                
                style={{ color: "#475569" }}
                // onClick={this.openFaqPage}
                />
                </Button>
              </Box>
            </Box>

            <Box pt={"40px"}>
  {faqDatas.slice(0, 5).map((accoItem,index) => (
        <Accordion
        key={index}
        onChange={this.handleAcco(index)}
        style={{ boxShadow: "none", borderBottom: "1px solid #CBD5E1" }}
        expanded={expanded === index}
        data-test-id="handleAccolist"
      >
        <AccordionSummary
          expandIcon={
            <ExpandMore style={{  color: "#011342",fontWeight: 600, }} />
          }
          style={{color: "#011342",
          fontWeight:600,
          padding:"unset"}}
          aria-controls="panel1-content"
          
          id="panel1-header"

        >
          {accoItem.question}
        </AccordionSummary>
        <AccordionDetails
          style={{
            font: "INTER",
            fontWeight: 400,
            color: "#011342",
            fontSize: "18px",
          }}
        >
          {accoItem.answer}
        </AccordionDetails>
      </Accordion>
              ))}
            </Box>
          </Box>
        </AboutSectionWrapper>
        <Footer testID="FooteText" isChecked={false} />
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const LeardershipSection = styled(Box)({
  "& .leadership-image":{
    ovderflow:"hidden",
    transition:"all 0.5s",
    "&:hover":{
      transform:"scale(1.03)",
    }
  },
  "& .leadership-content":{
    "& .leadership-title":{
      "@media(max-width:1199px)":{
        fontSize:"20px !important"
      },
      "@media(max-width:767px)":{
        fontSize:"16px !important"
      },
      "@media(max-width:576px)":{
        fontSize:"14px !important"
      },
    },
    "& .leadership-subtitle":{
      "@media(max-width:1199px)":{
        fontSize:"16px !important",
        lineHeight:"1.25",
      },
      "@media(max-width:767px)":{
        fontSize:"14px !important"
      },
      "@media(max-width:576px)":{
        fontSize:"12px !important"
      },
    }
  }
})

const StyledImage = styled("img")({
  "@media (min-width: 1400px)": {
    width: "100%"
  },
  "@media (max-width: 1000px)": {
    objectFit: "cover",
    width: "100%"
  }
})

const AboutSectionWrapper = styled(Box)({
  "& .about-us-container-box":{
    maxWidth:"1440px",
    margin:"0 auto",
    padding:"50px 80px",
    overflow:"hidden",
    "@media (max-width: 1199px)": {
      padding:"50px",
    },
    "@media (max-width: 767px)": {
      padding:"40px 30px",
    },
    "@media (max-width: 576px)": {
      padding:"40px 25px",
    }
  }
})

const WhyUsDesktopBox = styled(Box)({
  "@media (max-width: 959px)": {
    display: "none",
  },
});

const WhyUsMobileBox = styled(Box)({
  "@media (min-width: 960px)": {
    display: "none",
  },
});

const webStyles = {
  main: {
    textAlign: "left" as const,
  },
  main2: {
    textAlign: "left" as const,
    paddingBottom: 20,
  },
  typo1: {
    color: "#0131A8",
    fontWeight: 700,
    fontSize: "20px",
    marginBottom: 20,
    fontFamily: "INTER",
  },
  typo2: {
    color: "#011342",
    letterSpacing: -1,
    lineHeight: 1,
    marginBottom: 20,
    fontWeight: 700,
    fontSize: "48px",
    fontFamily: "INTER",
    width: "623px",
    height: "170px",
  },
  vector: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    columnGap: "8px",
  },
  vectorContent: {
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.5",
    color: "#011342",
  },
  slickMainSlider:{
    overflow:"hidden",
  },
  sliderLoopMain: {
    padding: "25px",
  },
  cardContainer: {
    width: "100%",
    background: "#011342",
    padding: "65px 0px",
    marginTop: "4%",
  },
  cardContainer2: {
    background: "#011342",
  },

  cardContainer1: {
    width: "100%",
    background: "#FFF",
  },
  steps1: {
    color: "#FFFFFF",
    fontSize: "24px",
    fontWeight: 600,
    textAlign: "center" as const,
    fontFamily: "INTER",
    lineHeight: "1.25",
  },
  steps2: {
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: 400,
    textAlign: "center" as const,
    fontFamily: "INTER",
    lineHeight: "26px",
  },
  steps3: {
    color: "#FFFFFF",
    fontSize: "12",
    textAlign: "center" as const,
    fontFamily: "INTER",
  },
  cardHeader: {
    color: "#E2E8F0",
    fontSize: "20",
    fontWeight: 700,
    textAlign: "center" as const,
    fontFamily: "INTER",
    textTrasform: "uppercase",
  },

  cardSubHeader1: {
    color: "#FFFFFF",
    fontSize: "45.19px",
    fontWeight: 700,
    textAlign: "center" as const,
    fontFamily: "INTER",
    margin: "auto 16px",
    lineHeight: "56px",
    letterSpacing: "-1px",
  },
  steps11: {
    fontSize: "36px",
    fontWeight: 700,
    textAlign: "center" as const,
    fontFamily: "INTER",
    lineHeight: "44px",
    display: "flex", 
    alignItems: "flex-end", 
    gap: "0",
    justifyContent: "center", 
  },
  cardDescription: {
    fontSize: "18px",
    fontWeight: 400,
    textAlign: "center" as const,
    linHeight: "26px",
    fontFamily: "INTER",
    paddingTop: "10px"
  },
  cards: {
    margin: 5,
    background: "#F5F9FF",
    width: 270,
    height: 138,
    boxShadow: "0px 2px 8px 0px #00000014",
  },

  cardGrid: {
    background: "#F5F9FF",
    boxShadow: "none",
    backgroundColor: "#011342",
  },
  groupHeader: {
    color: "#0131A8",
    fontSize: "20",
    fontWeight: 600,
    textAlign: "left" as const,
    fontFamily: "INTER",
  },
  groupHeader1: {
    color: "#011342",
    fontSize: "20",
    fontWeight: 700,
    textAlign: "left" as const,
    fontFamily: "INTER",
  },
  groupBody: {
    color: "#011342",
    fontSize: "14px",
    fontFamily: "INTER",
    marginTop: "6px",
  },
  groupBodySubHeading: {
    color: "#5D5D5D",
    fontSize: "18px",
    fontFamily: "INTER",
    width: "93%",
    fontWeight: 400,
  },
  groupBody1: {
    color: "#011342",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "26px",
    fontFamily: "INTER",
    marginTop: "4%",
    textAlign: "justify" as const,
  },
  carouselItem: {
    width: "25%",
  },
  typo21: {
    color: "#011342",
    letterSpacing: -1,
    lineHeight: 1.2,
    marginBottom: 20,
    fontWeight: 700,
    fontSize: "30px",
    fontFamily: "INTER",
    width: "70%",
  }
};

const FAQBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const FAQTypography = styled(Typography)({
  ...webStyles.typo1,
  fontSize: 18,
  width: "70%",
  marginTop: 20,
  fontWeight: 600,
  color: "#040919",
});

const ExpandMoreBox = styled(Box)({
  width: "28%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "end",
});
// Customizable Area End
