import React from "react";

// Customizable Area Start
import {
  Grid,
  Typography,
  styled,
  CardContent,
  CardMedia,
  Card, Box, Container,
  CircularProgress
} from "@material-ui/core";
import VisibilitySensor from "react-visibility-sensor";
//@ts-ignore
import classes from './Services.module.css';
import Header from "../src/Header.web";
import { Footer } from "../../../components/src/Footer.web";
// Customizable Area End
import LandingPageController, { Props } from "./LandingPageController";

export default class Services extends LandingPageController {

  constructor(props: Props) {
    super(props);

  }
  handleScroll(event:any) {

    const setpDatas =this.state.stepsData ||[]

    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const maxScrollTop = scrollHeight - clientHeight;
    const scrollPercent = scrollTop / maxScrollTop;
    const currentIndex = Math.round(scrollPercent * (setpDatas.length - 1));
    this.setState({ currentIndex });
  }
  
  truncateText(text: any, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  capitalFirstLetterStepnamber(texts: string){
    if (!texts) return '';
    return texts
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  render() {
    const CardStyling = styled(Box)({
      "& .MuiCardMedia-media": {
        width: "none",
      },
      "& .card-style": {
        width: "300px",
        transition:"all 0.5s",
        "&:hover":{
          backgroundColor: "#b3cfff !important"
        }
      },
    });

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      maxHeight: '600px',
      margin: '10px',
      marginTop:150,
      flexWrap: 'wrap',
      
    };

    const containerStylemob: React.CSSProperties = {
      display: 'flex',
      margin: '10px',
      marginTop:150,
      flexWrap: 'wrap',
      maxHeight: 'inherit',
      position:'relative'
      
    };
    const setpDatas =this.state.stepsData ||[]

    const {currentIndex } = this.state;
  const currentStep = setpDatas[currentIndex] ||[];
    const isMobiles = typeof window !== 'undefined' ? window.innerWidth <= 767 : false
    return (
      <div>
        <Header navigation={this.props.navigation} id={""} />
          <Container maxWidth="lg">
            <div ref={this.state.topRef}></div>
            <div style={!isMobiles?containerStyle:containerStylemob} className={classes.containerStyles}>
            <div
            className={classes.cantBox}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width:'100%',
                
                ...(isMobiles && {
                  flexWrap: 'wrap'
                })
                
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  scrollSnapType: "y mandatory",
                  height: "455px", 
                  width: "600",
                  scrollbarWidth: "none",
                ...(isMobiles && {
                  width:'100%',
                  height:'455px',
                  marginTop:0,
                marginLeft: '0'
                  

                })
                }}
                data-test-id="ImageScroll"
                onScroll={this.handleScroll.bind(this)}
              >
                {this.state.loading ? (
        <CircularProgress />
      ) : (
        setpDatas.map((image: any, index: React.Key | null | undefined) => (
          <img
            key={index}
            src={image?.image?.url}
            style={{
              width: '100%',
              height: '100%',
              objectFit:"cover",
              minHeight:"455px",
              borderRadius: 8,
              scrollSnapAlign: 'start',
              marginBottom: '20px',
              ...(isMobiles && {
                width: '100%',
              }),
            }}
          />
        ))
      )}

              </div>
              <div className={classes.textBox} style={{ marginTop: "0px",width:'65%',padding:"0 20px 20px",
            ...(isMobiles && {
            marginTop: '0px',
              width:' 100%',
              marginLeft: 0,
              padding: '10px',
              minHeight:"100%",

            }) }}>
                
              <Grid  md={12} sm={12}  style={{ position: "sticky", overflow: "hidden" }}>
                            <Box >
                            <div >
            <Typography gutterBottom variant="subtitle1" component="div" style={{ color: "blue" }}>
              <h4 style={{ color: "#0131A8", fontSize: "20px", fontWeight: 700, fontFamily: "Inter", margin:"0 0 030px" }}>
                {currentStep.number ? currentStep.number.toUpperCase() : ""}
              </h4>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <h1 style={{ color: "#000A34", fontSize: "36px", marginTop: "0", fontFamily: "Inter", letterSpacing: "-0.01em", fontWeight: 600, lineHeight: "44px", width: '372px' }}>
              {this.capitalFirstLetterStepnamber(currentStep?.name)}
              </h1>
            </Typography>
            <Typography variant="body2" style={{ color: "#011342", fontFamily: "Inter", fontSize: "18px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: "24px" }}>
              {currentStep.description}
            </Typography>
          
          </div>
                              
                            </Box></Grid>
                
                </div>
                <div className={classes.scrollBar} style={{ marginTop: 0,
                ...(isMobiles && {
                  marginTop: '0',
                  position: 'absolute',
                  top: 0,
                  right: 0
                }) }}>
                  <div style={{
                    width: '6px', 
                    height: 'calc(100% - 135px)',
                    background: '#012275',
                    borderRadius: '5px',
                    position: 'relative',
                    marginTop: '0',
                    ...(isMobiles && {
                      marginTop:16
                    })
                  }}>
                    <div
                      className="vertical-progress-bar"
                      style={{ height: `${this.imagesArray[this.state.currentIndex]?.progress}%` }}
                    />
                  </div>
                </div>
            </div>
              
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50, marginBottom: 30 }}>
                <h1 style={{ color: "#031742", fontWeight: "bold" }}>Remote Notarisation Services</h1>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "106%",marginBottom:50,marginLeft:-55,
            ...(isMobiles && {
              marginLeft:-35
            }) }}>
                <Grid container spacing={2} style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",gap:'40px'
                }}>
                  {this.state?.serviceData?.map((item: any, index: any) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}
                      style={webStyles.carouselItem}
                    >

                      <CardStyling style={{ height: "240px", marginLeft: 0 }} >
                        <Card style={{
                          width: "301px", height: "240px", padding: "16px 8px 16px 8px",
                          boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.08)", gap: "12px",
                          borderRadius: "8px",
                          background: "#fff"
                        }} className="card-style" >
                          <CardMedia
                            style={{ width: "48px", height: "48px", margin: "auto" }}
                            component="img"
                            height="140"
                            image={item.attributes.service_icon?.url}
                            alt={`Image ${index + 1}`}
                          />
                          <CardContent>
                            <Typography style={{ fontSize: "14px", fontFamily: "Font-SemiBold,", fontWeight: 600, paddingTop: "4%", margin: "auto", width: "80%", textAlign: "center", color: "#011342" }} gutterBottom variant="h5" component="div">
                              {item.attributes.service_name}
                            </Typography>
                            <Typography style={{ fontSize: "12px", fontFamily: "Inter", fontWeight: 500, paddingTop: "6%", textAlign: "center", color: "#011342" }} variant="body2">

                            {this.truncateText(item.attributes.service_description, 170)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </CardStyling>
                    </Grid>
                  ))}
                </Grid>
              </div>
          </Container>
        <Footer testID="FooteText" isChecked={false} />
      </div>
    );
  }
}
// Customizable Area Start
const webStyles = {
  main: {
    dispplay: "flex",
    alignItems: "center",
    margin: "auto",
  },
  carouselItem: {
    width: 290,
    flex: "initial",
    gap:'12px'
  },

};
export const ImgStyling: any = styled(Box)({
  "@media (min-width: 1280px)": {
    maxWidth: "1280px",
    padding: 50,
    margin: "auto"


  },
  "@media (min-width: 1580px)": {
    maxWidth: "1280px",
    padding: 50,
    margin: "auto"
  },

});
export const ImageSliderSection: any = styled(Box)({

})
// Customizable Area End

