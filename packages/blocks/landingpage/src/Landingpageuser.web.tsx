import React from "react";

// Customizable Area Start
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  CardMedia,
  styled,
  CircularProgress
} from "@material-ui/core";

import {
  book,
  group,
  hands,
  home,
  image001,
  image002,
  image003,
  image004,
  image005,
  image006,
  image007,
  leftArrow,
  mision,
  rightArrow,
  vector1,
  vector2,
  vector3,
  vector4,
  vector5,
  vision,
  whyus1,
  whyus2,
  whyus3,
  whyus4,
} from "./assets";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Header from "../src/Header.web";
import { Footer } from "../../../components/src/Footer.web";
// Customizable Area End

import LandingPageController, { Props } from "./LandingPageController";
import { ExpandMore } from "@material-ui/icons";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import CountUp from "react-countup";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import SuccessFailureModal from "../../../components/src/SuccessFailureModal.web";
export default class Landingpageuser extends LandingPageController {
  private sliderRef: any;
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.sliderRef = React.createRef();
    // Customizable Area End
  }
  // Customizable Area Start

  HowItWorksBox = () => {
    const howItWorks = this.state.homeData?.how_it_works;
    return (
      <Box
        style={{ width: "100%", height: "100%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        {howItWorks && (
          <>
            <Typography style={webStyles.groupHeader}>
              {howItWorks.title?.toUpperCase()}
            </Typography>
            <Typography variant="h3" style={webStyles.groupSubHeader}>
              {howItWorks.subtitle}
            </Typography>
            <Typography
              style={{
                ...webStyles.groupBody,
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "26px",
                paddingBottom: 30,
              }}
            >
              {howItWorks.description}
            </Typography>
          </>
        )}
      </Box>
    );
  }

  VisionMissionImageGrid = () => {
    const { loading, homeData } = this.state;
    const imageUrl = homeData?.vision_mission?.vision_mission_image?.url;

    let content;
    if (loading) {
      content = <CircularProgress />;
    } else if (imageUrl) {
      content = (
        <img
          src={imageUrl}
          alt="vision-mission"
          width="100%"
          style={{ borderRadius: "12px" }}
        />
      );
    } else {
      content = null;
    }
  
    return (
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        {content}
      </Grid>
    );
  };
  

  VisionBoxContent = () => {
    const visionData = this.state.homeData?.vision_mission?.vision;
    const iconUrl = visionData?.icon?.url;
  
    if (!visionData) return null;
  
    return (
      <>
        {iconUrl && (
          <img
            src={iconUrl}
            alt="vision-icon"
            style={{ paddingRight: 12, width: '42px', height: '40px' }}
          />
        )}
        <Box>
          {visionData?.title && (
            <Typography style={{ ...webStyles.groupHeader, color: "#012275" }}>
              {visionData.title.toUpperCase()}
            </Typography>
          )}
          {visionData?.description && (
            <Typography style={webStyles.groupBody}>
              {visionData.description}
            </Typography>
          )}
        </Box>
      </>
    );
  };
  

  MissionBoxContent = () => {
    const missionData = this.state.homeData?.vision_mission?.mission;
    const iconUrl = missionData?.icon?.url;
  
    if (!missionData) return null;
  
    return (
      <>
        {iconUrl && (
          <img
            src={iconUrl}
            alt="mission-icon"
            style={{ paddingRight: 12, width: '42px', height: '40px' }}
          />
        )}
        <Box>
          {missionData?.title && (
            <Typography style={{ ...webStyles.groupHeader, color: "#012275" }}>
              {missionData.title.toUpperCase()}
            </Typography>
          )}
          {missionData?.description && (
            <Typography style={webStyles.groupBody}>
              {missionData.description}
            </Typography>
          )}
        </Box>
      </>
    );
  };
  

  SmallVisionMissionBox = () => {
    return <Box
    style={{ width: "100%", height: "100%" }}
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
  >
    <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      paddingBottom: 20,
                    }}
                  >
                    {this.VisionBoxContent()}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    {this.MissionBoxContent()}
                  </Box>
    </Box>
  }

  LargeVisionMissionBox = () => {
    return <Box
                  style={{ width: "100%", height: "100%" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
    <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      paddingBottom: 20,
                      marginLeft: "5%",
                    }}
                  >
                    {this.VisionBoxContent()}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      marginLeft: "5%",
                    }}
                  >
                    {this.MissionBoxContent()}
                  </Box>
</Box>
  }

  MobileHowItWorksContentGridBox = () => {
    return <MobileHowItWorksContentGrid
    item
    xs={12}
    sm={12}
    md={6}
    lg={6}
    xl={6}
    style={{ paddingTop: "24px" }}
  >
    {this.SmallVisionMissionBox()}
  </MobileHowItWorksContentGrid>
  }

  

 
  truncateText(text: any, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  capitalizeFirstLetter=(word:any)=> {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  capitalizeFirstLetterOfEachWord=(text: string)=> {
    if (!text) return ''; // Check if text is undefined or null
    return text
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  capitaleFirstLetterfingurtitle=(fingurtitle: string)=>{
    if (!fingurtitle) return ''; 
    return fingurtitle
      .split(' ')
      .map((title: string) => title.charAt(0).toUpperCase() + title.slice(1).toLowerCase())
      .join(' ');

  }
  captilFirstWhychoosSubTitle=(WhychoosSubTitle: string)=>{
    if (!WhychoosSubTitle) return ''; 
    return WhychoosSubTitle
      .split(' ')
      .map((choosSubTitle: string) => choosSubTitle.charAt(0).toUpperCase() + choosSubTitle.slice(1).toLowerCase())
      .join(' ');

  }

  capitalFirstLetterStepsubtitle=(Stepsubtitle: string)=>{
    if (!Stepsubtitle) return '';
    return Stepsubtitle
      .split(' ')
      .map((StepTitle: string) => StepTitle.charAt(0).toUpperCase() + StepTitle.slice(1).toLowerCase())
      .join(' ');

  }

  capitalFirstLetterStepnamber=(Stepnamber: string)=>{
    if (!Stepnamber) return '';
    return Stepnamber
      .split(' ')
      .map((Stepnumber: string) => Stepnumber.charAt(0).toUpperCase() + Stepnumber.slice(1).toLowerCase())
      .join(' ');
    }

    renderIfTruthy = (value: string, children: JSX.Element) => {
      return value ? children : undefined;
    };
    
    
  // Customizable Area End
  render() {

    const { serviceData = [], faqTitle = {}, expanded} = this.state;
    const faqData = this.state.faqData;
    const servicesData = serviceData;
    const serviceText = this.state?.homeData.service_sub_title;
    const serviceTextSubtitle = this.capitalizeFirstLetterOfEachWord(
      serviceText
    );
    const figuresubtitle = this.capitaleFirstLetterfingurtitle(
      this.state.homeData.notary_services_fingertips?.subtitle
    );
    const stepsubtitle = this.capitalFirstLetterStepsubtitle(
      this.state.homeData.step?.subtitle
    );
    const whychoossubtitle = this.captilFirstWhychoosSubTitle(
      this.state.homeData.why_choose_us?.subtitle
    );

    return (
      // Customizable Area Start
      // Required for all blocks
      <>
      <div ref={this.state.topRef}></div>
      <Header navigation={this.props.navigation} id={""} />
      <HomePageContainerWrapper>
        <Box m={"142px 5% 30px"} className="home-container-box banner-top-padding">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
              <Box width={"100%"}>
                
               {this.renderIfTruthy(
                  this.state.homeData?.notary_services_fingertips?.title,
                    <Typography style={webStyles.typo1}>
                      {this.state.homeData?.notary_services_fingertips?.title?.toUpperCase()}
                    </Typography>
                )}

               {this.renderIfTruthy(
                figuresubtitle,
                  <Typography style={webStyles.typo2}>
                    {figuresubtitle}
                  </Typography>
                )}


                {this.renderIfTruthy(
                  this.state.homeData?.notary_services_fingertips?.description,
                  <Typography style={webStyles.typo3}>
                    {this.state.homeData?.notary_services_fingertips?.description}
                  </Typography>
                )}

                 {this.renderIfTruthy(
                  this.state.homeData?.notary_services_fingertips?.description,
                  <Typography style={webStyles.typo3}>
                    {this.state.homeData?.notary_services_fingertips?.description}
                  </Typography>
                )}

                <GetStartedButtonComponent
                  variant="contained"
                  style={{
                    textTransform:"none"
                  }}
                >
                  Get Started
                </GetStartedButtonComponent>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
              {this.state.loading ? <CircularProgress />:(
              <Box style={{
                borderRadius: "8px",
                border:"1px solid #C5C6C8",
                padding:"13px"
              }}>
                <img
                  src={this.state.homeData.notary_services_fingertips?.image?.url}
                  alt="notary"
                  width={"100%"}
                  style={{
                    maxHeight: "686px",
                    borderRadius: "8px",
                  }}
                />
              </Box>
              )}
            </Grid>
          </Grid>
        </Box>

        {this.state.logoData && (<Box m={"30px 6% 40px"} className="slider-container home-container-box">
          <Slider
            className="slider variable-width"
            variableWidth={true}
            dots={false}
            infinite={true}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            speed={3000}
            autoplaySpeed={3000}
            cssEase="linear"
          >{this.state.logoData.map((logo)=>(
            <Box style={{width: "280px"}}>
              <Box style={webStyles.vector}>
                <img src= {logo?.attributes?.logo_image?.url}
                 alt="notary" width="48px" height={"48px"} />
                <Typography style={webStyles.vectorContent}>
                 
                  {logo?.attributes?.logo_title}
                </Typography>
              </Box>
            </Box>
            ))}
           
          </Slider>
        </Box>)}
        </HomePageContainerWrapper>

        <WhatWeOfferSlider>
          <Box m={"40px 5% 70px"} className="home-container-box">
            <Box
              display={"flex"}
              justifyContent={"space-between"} 
              alignItems={"end"}
            >
              <Box>
               
               {this.renderIfTruthy(
                 this.state.homeData?.service_title,
                    <Typography
                    style={{
                      color: "#0131A8",
                      fontSize: "20px",
                      fontWeight: 700,
                      fontFamily: "INTER",
                    }}
                  >
                    {this.state.homeData?.service_title?.toUpperCase()}
                  </Typography>
                )}
                
                {this.renderIfTruthy(
                  serviceTextSubtitle,
                  <Typography
                    variant="h3"
                    style={{
                      color: "#011342",
                      fontSize: "36px",
                      fontWeight: 700,
                      fontFamily: "INTER",
                    }}
                  >
                    {serviceTextSubtitle}
                  </Typography>
                )}
                
                
              </Box>
              <Box
                display={"flex"}
                justifyContent="space-between"
                style={{gap:"10px"}}
              >
                <Button
                  data-test-id="prevBtn"
                  className="whtweofferbtn"
                  onClick={() => this.sliderRef?.current?.slickPrev()}
                >
                  <img src={leftArrow} alt="notary" width={"44px"} />
                </Button>

                <Button
                  data-test-id="nextBtn"
                  className="whtweofferbtn"
                  onClick={() => this.sliderRef?.current?.slickNext()}
                >
                  <img src={rightArrow} alt="notary" width={"44px"} />
                </Button>
              </Box>
            </Box>
            <Box mt={"33px"}>
              <Slider ref={this.sliderRef} slidesToShow={1} variableWidth={false} infinite={false}>
                {servicesData && servicesData.map((item: { imageUrl: React.Key | null | undefined; attributes: { service_icon: { url: string | undefined; }; service_name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; service_description: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }; }, index: number) => (
                  <Box
                    key={index}
                    maxWidth={"303px"}
                    maxHeight={"240px"}
                    padding={"16px 6px"}
                    style={{ columnGap: "24px" }}
                  >
                    <Card className="whatweoffercard">
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        height={"240px"}
                        width={"302px"}
                      >
                        <CardMedia
                          style={{
                            width: "44px",
                            height: "44px",
                            paddingTop: "40px",
                          }}
                          component="img"
                          image={item?.attributes?.service_icon?.url}
                          alt={`Image ${index + 1}`}
                        />
                        <CardContent>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              textAlign: "center",
                              fontFamily:'Inter',
                            }}
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {item?.attributes?.service_name}
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              textAlign: "center",
                              fontFamily:'Inter',
                            }}
                            variant="body2"
                          >
                            {this.truncateText(item?.attributes?.service_description, 180)}

                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        </WhatWeOfferSlider>

        <HomePageContainerWrapper>
          <Box style={{ background: "#011342" }} p={"72px 5%"} className="home-container-box">

            {this.renderIfTruthy(
            this.state.homeData?.step?.title,
            <Box
            style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingBottom: "50px",
            }}
            >
            <Typography style={webStyles.cardHeader}>{this.state.homeData?.step?.title?.toUpperCase()}</Typography>
            {stepsubtitle && (
            <Typography variant="h3" style={webStyles.cardSubHeader}>
            {stepsubtitle}     
            </Typography>
            )}
            </Box>
            )}

            <DesktopHowItWorksStepsBox>
              <Grid container spacing={2} justifyContent="space-around">
              {Array.isArray(this.state.stepsData) &&
              this.state.stepsData.slice(1).map((steps, index) => (
              <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
              style={{ display: "flex", justifyContent: "center" }}
              >
                <Card style={{ ...webStyles.cards, maxWidth: "100%", width: "100%" }}>
                  <CardContent>
                  {steps?.number && (
                  <Typography style={webStyles.steps1}>
                  {steps.number.toUpperCase()}
                  </Typography>
                  )}
                  {steps?.name && (
                  <Typography style={webStyles.steps2}>
                  {this.capitalFirstLetterStepnamber(steps.name)}
                  </Typography>
                  )}
                  {steps?.description && (
                  <Typography style={webStyles.steps3}>
                  {steps.description}
                  </Typography>
                  )}
                  </CardContent>
                </Card>
              </Grid>
              ))}
              </Grid>

          </DesktopHowItWorksStepsBox>

            <TabletHowItWorksStepsBox>
            <Box display={"flex"} style={{ columnGap: "4px" }}>
            {this.state.stepsData && this.state.stepsData.slice(0, 2).map((steps, index) => (
            <Card key={index} style={{ ...webStyles.cards, maxWidth: "100%" }}>
            <CardContent>
            <Typography style={webStyles.steps1}>
              {steps?.number}
            </Typography>
            <Typography style={webStyles.steps2}>
              {steps?.name}
            </Typography>
            <Typography style={webStyles.steps3}>
              {steps?.description}
            </Typography>
            </CardContent>
            </Card>
            ))}
            </Box>
            <Box display={"flex"} style={{ columnGap: "4px" }}>
            {this.state.stepsData && this.state.stepsData.slice(2, 4).map((steps, index) => (
            <Card key={index} style={{ ...webStyles.cards, maxWidth: "100%" }}>
            <CardContent>
            <Typography style={webStyles.steps1}>
              {steps?.number}
            </Typography>
            <Typography style={webStyles.steps2}>
              {steps?.name}
            </Typography>
            <Typography style={webStyles.steps3}>
              {steps?.description}
            </Typography>
            </CardContent>
            </Card>
            ))}
            </Box>
            </TabletHowItWorksStepsBox>

          </Box>

          <Box>
            <Box mx={"6%"} mt={"80px"} className="home-container-box">
              <Grid container justifyContent="space-evenly">
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                {this.state.loading ? <CircularProgress />:(
                  <StyledImage
                    src={this.state.homeData.how_it_works?.image?.url}
                    alt="notary"
                    style={{ borderRadius: "12px" }}
                  />
                )}
                </Grid>
                <MobileHowItWorksContentGrid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ paddingTop: "24px" }}
                >
                  {this.HowItWorksBox()}
                </MobileHowItWorksContentGrid>
                <DesktopHowITWorksContentGrid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ paddingLeft: "4%" }}
                >
                  {this.HowItWorksBox()}
                </DesktopHowITWorksContentGrid>
              </Grid>
            </Box>
            <DesktopVisionMissionBox mx={"10%"} mt={"48px"} className="home-container-box">
              <Grid container justifyContent="space-between">
                {this.VisionMissionImageGrid()}
                <MobileHowItWorksContentGrid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ paddingTop: "24px" }}
                >
                  {this.LargeVisionMissionBox()}
                </MobileHowItWorksContentGrid>
                <DesktopHowITWorksContentGrid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ paddingLeft: "8%" }}
                >
                  {this.LargeVisionMissionBox()}
                </DesktopHowITWorksContentGrid>
              </Grid>
            </DesktopVisionMissionBox>
            <TabletVisionMissionBox mx={"6%"} mt={"48px"} className="home-container-box">
              <Grid container justifyContent="space-between">
                {this.VisionMissionImageGrid()}
                {this.MobileHowItWorksContentGridBox()}
                <DesktopHowITWorksContentGrid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ paddingLeft: "4%" }}
                >
                  {this.SmallVisionMissionBox()}
                </DesktopHowITWorksContentGrid>
              </Grid>
            </TabletVisionMissionBox>
            <MobileVisionMissionBox mx={"6%"} mt={"48px"} className="home-container-box">
              <Grid justifyContent="space-between" container>
                {this.VisionMissionImageGrid()}
                {this.MobileHowItWorksContentGridBox()}
                <DesktopHowITWorksContentGrid
                  item
                  style={{ paddingLeft: "8%" }}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  {this.LargeVisionMissionBox()}
                </DesktopHowITWorksContentGrid>
              </Grid>
            </MobileVisionMissionBox>
          </Box>
        </HomePageContainerWrapper>

        <SuccessStoriesSection>
          <Box mt={"80px"} className="home-container-box">
            <Grid container style={{ background: "#011342" }}>
              <Grid
                item
                sm={12}
                md={6}
                lg={6}
                xl={6}
                style={{
                  ...webStyles.handsMain,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "48px 0",
                }}
              >
                <Box width="80%">
                  
                  {this.renderIfTruthy(
                    this.state.homeData?.story?.title,
                    <Typography className="smallTitle">
                      {this.state.homeData?.story?.title?.toUpperCase()}
                    </Typography>
                  )}

                  {this.renderIfTruthy(
                    this.state.homeData?.story?.subtitle,
                    <Typography
                    style={{
                      ...webStyles.handsTypo2,
                      fontSize: "48px",
                      lineHeight: "56px",
                      letterSpacing: "-1.5%",
                    }}
                    >
                    {this.formatTitle(this.state.homeData?.story?.subtitle)}
                    </Typography>
                  )}

                  
                  {this.renderIfTruthy(
                      this.state.homeData?.story?.description,
                      <Typography style={webStyles.handsTypo3}>
                      {this.state.homeData?.story?.description}
                    </Typography>
                  )}
                  
                  

                  <Grid container>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Box
                        style={{
                          borderLeft: "1px solid blue",
                          paddingLeft: 10,
                          marginBottom: 15,
                        }}
                      >
                        <Typography style={{ ...webStyles.handsTypo2 }}>
                        <CountUp
                        start={0}
                        end={10}
                        duration={2}
                        enableScrollSpy
                      />x
                        </Typography>
                        <Typography style={webStyles.handsTypo33}>
                          Streamlining of process
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Box
                        style={{
                          borderLeft: "1px solid blue",
                          paddingLeft: 10,
                          marginBottom: 15,
                        }}
                      >
                        <Typography
                          style={{ ...webStyles.handsTypo2, fontSize: 36 }}
                        >
                        <CountUp
                        start={0}
                        end={300}
                        duration={2}
                        enableScrollSpy
                      />%
                        </Typography>
                        <Typography style={webStyles.handsTypo33}>
                          Boost in document security
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Box
                        style={{
                          borderLeft: "1px solid blue",
                          paddingLeft: 10,
                          marginBottom: 15,
                        }}
                      >
                        <Typography
                          style={{ ...webStyles.handsTypo2, fontSize: 36 }}
                        >
                         <CountUp
                        start={0}
                        end={5}
                        duration={2}
                        enableScrollSpy
                      />k+
                        </Typography>
                        <Typography style={webStyles.handsTypo33}>
                          Satisfied clients
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Box
                        style={{
                          borderLeft: "1px solid blue",
                          paddingLeft: 10,
                          marginBottom: 15,
                        }}
                      >
                        <Typography
                          style={{ ...webStyles.handsTypo2, fontSize: 36 }}
                        >
                         <CountUp
                          start={0}
                          end={100}
                          duration={2}
                          enableScrollSpy
                        /> +
                        </Typography>
                        <Typography style={webStyles.handsTypo33}>
                          Top-rated reviews
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <DesktopCustomerSuccessStoriesGrid
                item
                sm={12}
                md={6}
                lg={6}
                xl={6}
              >
              {this.state.loading ? <CircularProgress />:(
                <img
                src={this.state.homeData.story?.image?.url}
                  data-testID="customerSuccessStoryImage"
                alt="notary" width="100%" height={"100%"}/>
                )}
              </DesktopCustomerSuccessStoriesGrid>
              <TabletCustomerSuccessStoriesGrid
                item
                xs={12}
                sm={12}
                md={6}
                style={{ padding: "48px 5% 48px 0" }}
              >
                <Box
                  height={"100%"}
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img src={hands} alt="notary" width="100%" />
                </Box>
              </TabletCustomerSuccessStoriesGrid>
              <MobileHowItWorksContentGrid
                item
                xs={12}
                sm={12}
                md={6}
                style={{ padding: "0 10% 48px" }}
              >
                <Box
                  height={"100%"}
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img src={hands} alt="notary" width="100%" />
                </Box>
              </MobileHowItWorksContentGrid>
            </Grid>
          </Box>
        </SuccessStoriesSection>

        <HomePageContainerWrapper>
          <Box mt={"80px"} className="home-container-box">
            <Grid container justifyContent="center" alignItems="flex-start">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                style={{ ...webStyles.main, padding: "0 5%" }}
                className="mobileNoSpace"
              >
               <MobileWhyChooseUsBox pb={"32px"} width={"100%"}>
                {this.renderIfTruthy(this.state.homeData?.why_choose_us?.title,
                      <Typography
                      style={{ ...webStyles.typo1, textTransform: "uppercase" }}
                    >
                      {this.state.homeData?.why_choose_us?.title?.toUpperCase()}
                    </Typography>
                )}

                {this.renderIfTruthy(whychoossubtitle?.trim(),
                      <Typography style={{ ...webStyles.typo21, fontSize: "36px" }}>
                      {whychoossubtitle}
                    </Typography>
                )}
              </MobileWhyChooseUsBox>

                <DesktopWhychooseUsBox width={"67%"}>

                {this.renderIfTruthy(this.state.homeData.why_choose_us?.title,
                      <Typography
                      style={{ ...webStyles.typo1, textTransform: "uppercase" }}
                    >
                      {this.state.homeData.why_choose_us?.title?.toUpperCase()}
                    </Typography>
                )}

                {this.renderIfTruthy(whychoossubtitle?.trim(),
                      <Typography style={{ ...webStyles.typo21, fontSize: "36px" }}>
                      {whychoossubtitle}
                    </Typography>
                )}
                
                </DesktopWhychooseUsBox>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                style={{ ...webStyles.main, padding: "0 5%" }}
                className="mobileNoSpace"
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "32px",
                  }}
                >
                  {this.state.whyChoosData && this.state.whyChoosData.map((whyUsPoint, index) => (
                  <Box
                    key={index}
                    style={{
                      alignItems: "flex-start",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <img
                      style={{ paddingRight: 12,width:'42px',height:'40px' }}
                      src={whyUsPoint.icon?.url}
                      alt="notary"
                    />
                    <Box>
                      <Typography
                        style={{
                          textTransform: "uppercase",
                          ...webStyles.groupHeader,
                          color: "#012275",
                        }}
                      >
                        {whyUsPoint?.name}
                      </Typography>
                      <Typography style={{ ...webStyles.groupBody }}>
                        {whyUsPoint?.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </HomePageContainerWrapper> 

        <FaqSection>
          <Box mx={"8%"} mt={"120px"} py={"40px"} className="home-container-box">
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
            >
<Typography className="faq-title">
  {this.state.faqTitle.faq_title
    ?.replace(/([a-z])([A-Z])/g, '$1 $2') 
    .replace(/^./, (str: string) => str.toUpperCase())}</Typography>
              <Box className="faq-arrow">
                <Button target="_blank" href="/Faq">
                  <CallMadeIcon style={{ color: "#475569" }} />
                </Button>
              </Box>
            </Box>

            <Box paddingTop={"40px"}>
              
              {faqData?.slice(0, 5).map((accoItem,index) => (
                <Accordion
                key={index}
                style={{ boxShadow: "none", borderBottom: "1px solid #CBD5E1" }}
                expanded={expanded === index}
                data-test-id="handleAccolist"
                onChange={this.handleAcco(index)}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore style={{color: "#011342" ,fontWeight: 600 }} />
                  }
                  id="panel1-header"
                  aria-controls="panel1-content"
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
        </FaqSection>

        <Footer
          key={"name"}
          data-testID="FooteText"
          email={this.state.emailNews}
          error={this.state.error}
          isChecked={false}
          handleSubscribe={() => this.handleSubscribe()}
          onChangeNewsLetter={this.handleNewsletterChange} testID={""}/>


<SuccessFailureModal
          data-testID={"successFailureModal"}
          image={this.state.successFailModalImage}
          isOpen={this.state.isSuccessFailModalOpen}
          text={this.state.successFailModalText}
          textColor={this.state.successFailModalTextColor}
          subText={this.state.successFailModalSubText}
          subText2={this.state.successFailModalSubText2}
          handleButtonClick={() => this.setState({isSuccessFailModalOpen: false})}
          buttonText={this.state.successFailModalButtonText}
          modalWidth="472px"
        />
      </>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const GetStartedButtonComponent = styled(Button)({
  backgroundColor: "#012275",
  color: "#FFFFFF",
  fontWeight: 700,
  fontSize: 16,
  padding: "12px 28px",
  textTransform: "capitalize",
  fontFamily: "INTER",
  border: "2px solid transparent",
  transition: "all 0.5s",
  "&:hover": {
    backgroundColor: "#FFFFFF",
    borderColor: "#012275 !important",
    color: "#012275", 
    transition: "all 0.5s",
  },
})

const HomePageContainerWrapper = styled(Box)({
  "& .home-container-box":{
    "&.banner-top-padding":{
      "@media (max-width: 1199px)":{
        padding:"90px 40px 30px!important"
      },
      "@media (max-width: 991px)":{
        padding:"90px 30px 30px!important"
      },
      "@media (max-width:576px)":{
        padding:"70px 16px 30px!important"
      },
    },
    "@media (max-width: 1199px)":{
      margin:"0 !important",
      padding:"30px 40px !important"
    },
    "@media (max-width: 991px)":{
      padding:"30px !important",
    },
    "@media (max-width: 576px)":{
      padding:"30px 15px !important",
    },
    "& .slick-initialized":{
      "& .slick-slide":{
        height:"auto !important",
      },
    },
    "& .mobileNoSpace":{
      "@media (max-width: 576px)":{
        padding:"0 !important",
      }
    }
  }
})

const FaqSection = styled(Box)({

  "& .faq-title": {
  marginRight: "16px",
   marginBottom: 0, 
   fontSize: "48px",
    color: "#040919", 
    fontWeight: "600",
     lineHeight: "1", 
     whiteSpace: "nowrap",
      overflow: "hidden", 
      textOverflow: "ellipsis"
},
  "& .faq-arrow":{
    "& .MuiButton-text":{
      minWidth:"auto",
      padding:"0",
    }
  },

  "& .MuiAccordionSummary-content":{
    fontSize:"18px",
    fontWeight:"600",
    color:"#040919",
    margin:"20px 0"
  },

  "& .home-container-box":{
    "&.banner-top-padding":{
      "@media (max-width: 1199px)":{
      padding:"60px 40px 30px!important"
    },
    },
    "@media (max-width: 1199px)":{
      margin:"0 !important",
      padding:"30px 40px !important"
    },
    "@media (max-width: 991px)":{
      padding:"30px !important",
    },
    "@media (max-width: 576px)":{
      padding:"30px 15px !important",
    },
    "& .slick-initialized":{
      "& .slick-slide":{
        height:"auto !important",
      },
    },
  }

})

const SuccessStoriesSection = styled(Box)({
  "& .smallTitle":{
    fontSize:"20px",
    color:"#CCD3E3",
    fontWeight:"700",
    fontFamily:"INTER",
  },
  "& .home-container-box":{
    "&.banner-top-padding":{
      "@media (max-width: 1199px)":{
      padding:"60px 40px 30px!important"
    },
    },
    "@media (max-width: 1199px)":{
      margin:"0 !important",
      padding:"30px 40px !important"
    },
    "@media (max-width: 991px)":{
      padding:"30px !important",
    },
    "@media (max-width: 576px)":{
      padding:"30px 15px !important",
    },
    "& .slick-initialized":{
      "& .slick-slide":{
        height:"auto !important",
      },
    },
  }
})

const WhatWeOfferSlider = styled(Box)({
"& .home-container-box":{
    "&.banner-top-padding":{
      "@media (max-width: 1199px)":{
      padding:"60px 40px 30px!important"
    },
    },
    "@media (max-width: 1199px)":{
      margin:"0 !important",
      padding:"30px 40px !important"
    },
    "@media (max-width: 991px)":{
      padding:"30px !important",
    },
    "@media (max-width: 576px)":{
      padding:"30px 15px !important",
    },

    "& .slick-initialized":{
      "& .slick-slide":{
        height:"auto !important",
      },
    },
  },

  "& .whtweofferbtn":{
    transition:"all 0.5s",
    padding:"0",
    minWidth:"auto",
    "& img":{
      width:"100%",
      height:"100%",
    },
    "@media (max-width: 1199px)":{
      width:"38px",
      height:"38px",
    },
    "@media (max-width: 767px)":{
      width:"32px",
      height:"32px",
      minWidth:"auto !important"
    },
    "&:hover":{
      background:"none !important",
      transform:"scale(1.06)"
    }
  },
  "& .whatweoffercard":{
    transition:"all 0.5s",
    "&:hover":{
      backgroundColor: "#b3cfff"
    }
  },
})

const TabletHowItWorksStepsBox = styled(Box)({
  "@media (min-width: 1152px) or (max-width: 499px)": {
    display: "none"
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "4px",
})

const DesktopHowItWorksStepsBox = styled(Box)({
  "@media (max-width: 1151px) and (min-width: 500px)": {
    display: "none"
  }
})

const MobileWhyChooseUsBox = styled(Box)({
  "@media (min-width: 1040px)": {
    display: "none"
  }
})

const DesktopWhychooseUsBox = styled(Box)({
  "@media (max-width: 1040px)": {
    display: "none"
  }
})

const DesktopCustomerSuccessStoriesGrid = styled(Grid)({
  "@media (max-width: 1231px)": {
    display: "none"
  }
})

const TabletCustomerSuccessStoriesGrid = styled(Grid)({
  "@media (min-width: 1232px) or (max-width: 959px)": {
    display: "none"
  }
})

const StyledImage = styled("img")({
  "@media (max-width: 1231px)": {
    width: "100%"
  },
  "@media (min-width: 1232px)": {
    width: "90%"
  }
})

const  MobileHowItWorksContentGrid = styled(Grid) ({
  "@media (min-width: 960px)": {
    display: "none",
  },
})

const DesktopHowITWorksContentGrid = styled(Grid)({
  "@media (max-width: 959px)": {
    display: "none",
  }
})

const MobileVisionMissionBox = styled(Box)({
  "@media (min-width: 884px)": {
    display: "none"
  }
})

const DesktopVisionMissionBox = styled(Box)({
"@media (max-width: 1231px)": {
  display: "none"
}
})

const TabletVisionMissionBox = styled(Box)({
  "@media (max-width: 883px) or (min-width: 1232px)": {
    display: "none"
  }
})

const webStyles = {
  main: {
    textAlign: "left" as const,
  },
  typo1: {
    color: "#0131A8",
    fontWeight: 700,
    fontSize: "20px",
    marginBottom: 20,
    fontFamily: "INTER",
    lineHeight: 1.2, 
  },
  typo2: {
    color: "#011342",
    letterSpacing: -1,
    lineHeight: 1.2,
    marginBottom: 20,
    fontWeight: 700,
    fontSize: "48px",
    fontFamily: "INTER",
    
  },
  typo3: {
    color: "#011342",
    fontWeight: 400,
    fontSize: "20px",
    marginBottom: 20,
    fontFamily: "INTER",
    lineHeight: 1.2, 
  },
  vector: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    columnGap: "8px"
  },
  vectorContent: {
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.5",
    color: "#011342",
    fontFamily: "INTER",
  },
  signup: {
    backgroundColor: "#012275",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 16,
    padding: "12px 28px",
    textTransform: "capitalize",
    fontFamily: "INTER",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      borderColor: "#012275",
      color: "#012275", 
    },
  },
  cardHeader: {
    color: "#E2E8F0",
    fontSize: "20",
    fontWeight: 700,
    textAlign: "center" as const,
    fontFamily: "INTER",
  },
  cardSubHeader: {
    color: "#FFFFFF",
    fontSize: "36px",
    fontWeight: 600,
    textAlign: "center" as const,
    fontFamily: "INTER",
  },
  steps1: {
    color: "#FFFFFF",
    fontSize: "14",
    fontWeight: 700,
    textAlign: "center" as const,
    fontFamily: "INTER",
    marginBottom:"20px",
  },
  steps2: {
    color: "#FFFFFF",
    fontSize: "16",
    fontWeight: 600,
    textAlign: "center" as const,
    fontFamily: "INTER",
    marginBottom:"25px",
  },
  steps3: {
    color: "#FFFFFF",
    fontSize: "14",
    fontWeight: 400,
    textAlign: "center" as const,
    fontFamily: "INTER",
  },
  cards: {
    background: "#000A34",
    padding: "25px 0px",
    width:"100%",
  },
  cardscopy: {
    margin: 5,
    background: "#fff",
    width: 245,
    height: 190,
    padding: "25px 20px",
  },
  groupHeader: {
    color: "#0131A8",
    fontSize: "20",
    fontWeight: 700,
    lineheight: "28px",
    textAlign: "left" as const,
    fontFamily: "INTER",
  },
  groupSubHeader: {
    color: "#011342",
    fontSize: "36px",
    fontWeight: 700,
    lineHeight: "44px",
    textAlign: "left" as const,
    paddingBottom: "24px",
    paddingTop: "8px",
    fontFamily: "INTER",
  },
  groupBody: {
    color: "#011342",
    fontSize: "18px",
    fontFamily: "INTER",
    fontWeight:"400",
  },
  handsMain: {
    textAlign: "left" as const,
  },
  handsTypo1: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "INTER",
  },
  handsTypo2: {
    color: "FFFFFF",
    letterSpacing: "-1%",
    lineHeight: "44px",
    marginBottom: 20,
    fontWeight: 700,
    fontSize: "36px",
    fontFamily: "INTER",
display: "flex", alignItems: "flex-end", gap: "0"
  },
  handsTypo3: {
    color: "#FFFFFF",
    fontWeight: 400,
    lineHeight: "24px",
    fontSize: "16px",
    marginBottom: 20,
    fontFamily: "INTER",
  },
  handsTypo33: {
    color: "#FFFFFF",
    lineHeight: "26px",
    fontWeight: 400,
    fontSize: "18px",
    marginBottom: 20,
    fontFamily: "INTER",
  },
  carouselItem: {
    width: "25%",
  },
  typo21: {
    color: "#011342",
    letterSpacing: -2,
    lineHeight: 1.2,
    marginBottom: 20,
    fontWeight: 650,
    fontSize: "1.875vw",
    fontFamily: "INTER",
  },
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
