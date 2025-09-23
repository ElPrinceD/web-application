import React from 'react';

// Customizable Area Start
import {
  Container,
  Grid,
  Typography,
  styled,
 Box,
  CardContent,
  CardMedia,
  Card,
  Button,Modal,Avatar,CircularProgress
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { Arrow, image001, Logo,image_button_icon_button_,VerificationLogo } from "./assets";
import { Footer } from "../../../components/src/Footer.web";
// Customizable Area End

import OtpVerificationController,{Props} from './OtpVerificationController';

export default class NotaryServices extends OtpVerificationController {
  constructor(props:Props) {
    super(props);
   // Customizable Area Start
   // Customizable Area End
  }

  render() {
    const CardStyling = styled(Box)({
      "& .MuiCardMedia-media": {
        width: "none",
      },
      "& .card-style": {
        width: "300px",
      },
    });
       
    return (
      // Customizable Area Start
      // Required for all blocks
      <>
      <div ref={this.state.topRef}></div>
          <ImgStyling>
          <Grid>
        <Grid
          item
          container
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 40,
            background: '#fff',
            height: 114,
          }}
        >
          <Box onClick={() => this.goToLandingScreen()} data-test-id="LandingButtonID" style={{marginLeft:28,
          ...(this.handleResize() && {
            marginLeft:10
          })
            
        }}>
            <img src={Logo} alt="notary" style={{cursor:"pointer",justifyContent:'center',marginTop:40}} />
          </Box>
         
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        style={{
          width: '100%',
          display:'flex',
          flexDirection: 'row',marginTop: 90, marginLeft: 134,
          ...(this.handleResize() && {
            padding: 0,
            width: '80%',
display:'flex',
marginLeft: '50px',
          }),
        }}
      >
        <Box
          data-test-id="gobackbtn"
          style={{ cursor: 'pointer',flex:0 ,  ...(this.handleResize() && {
            marginLeft:-73,position:'absolute'})}}
          onClick={() => {
            this.GotoVerifyOtpScreen();
          }}
        >
          <img
                    src={Arrow}
                    alt="img"
                    style={{ marginTop:40,marginLeft:-67
                 }}
                  />
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              style={{
                color: '#0131A8',
                fontSize: '18px',
                lineHeight: '26px',
                fontWeight: 700,
              }}
            >
              SERVICES
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography
                style={{
                  color: '#011342',
                  lineHeight: '36px',
                  fontSize: '24px',
                  letterSpacing: '-0.005em',
                  fontWeight: 600,
                }}
              >
                Notary services
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: '#000', fontSize: '16px', lineHeight: '24px' }}>
              Select the services you want to provide to the clients
            </Typography>
          </Grid>
        </Grid>
      </Grid>
           
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%",marginTop:40
             }}>
          <Grid container spacing={2} style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            gap:'12px',marginLeft:123,
            ...(this.handleResize() && {
              padding:0,marginLeft:0,
              flexWrap: "wrap",
            justifyContent: 'center',
            alignContent:  'center',
            alignItems:  'center'})
          }}>
            {this.state.ServiceArrayitems?.map((item: any, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}
                style={webStyles.carouselItem}
              >

                <CardStyling style={{ marginLeft: 0 }} 
                >
                  <Card style={{
                    width: "260px", height: "192px", padding: "16px 8px 16px 8px",
                    borderRadius: '8px',
                    background:item.attributes.is_selected ? '#012275' : '#fff',
                    boxShadow:'0px 2px 8px 0px #00000014',gap:'12px',
                  }} className="card-style"
                  data-test-id="selectserviceBtn"
                  onClick={()=>this.selectService(item.id)} 
                  key={index} 
                  >
                    <CardMedia
                      style={{ width: "44px", height: "44px", margin: "auto" }}
                      component="img"
                      image={item.attributes.service_icon !==null? item.attributes.service_icon?.url:image001}
                      alt={`Image ${index + 1}`}
                    />
                    <CardContent>
                      <Typography style={{ fontSize: "14px",fontFamily:'Font-SemiBold,' ,fontWeight: 600,paddingTop:'4%', margin: "auto" , width:'80%', textAlign:'center',color:item.attributes.is_selected ?'#fff':'#011342' }} gutterBottom variant="h5" component="div">
                        {item.attributes.service_name}
                      </Typography>
                      <Typography style={{
                       fontFamily:'Inter',
                       whiteSpace: "normal",
                            width: "220px",
                            height: "54px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',fontSize: "12px", 
                            fontWeight: 500,  
                            paddingTop:'6%', textAlign:'center',
                            color:item.attributes.is_selected ?'#fff':'#011342'}} 
                            variant="body2"
                        >
                        {item.attributes.service_description}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardStyling>
              </Grid>
            ))}
          </Grid>
        </div>
        
          <Box style={webStyles.buttonBx}>
          <Button
            style={{ ...webStyles.guestbtn2, textTransform: "none" }}
            data-test-id="skipbutton"
            variant="contained"
            fullWidth         
            onClick={this.handleSubmitServices}         
          >
            Skip
          </Button>
          <Button
          disabled={this.state.tempArray.length<=0}
          style={{ 
            ...webStyles.signUpButtonSubmit2, 
            textTransform: "none", 
            opacity: this.state.tempArray.length>0 ? 1 : 0.5
          }}
            data-test-id="contbutton"
            variant="contained"
            fullWidth
            onClick={this.handleSubmitServices}
          >
            Continue
          </Button>
        </Box>
        
        <Modal
          open={this.state.enableVerificationModel}
          data-test-id="account_verification"
          onClick={this.goToLandingScreen}
          style={{  
            position:'absolute',
          alignSelf: "center",
          alignContent: "center",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",}}
        
        >
            <SuccessModalMainOuter sx={otpScreen.modal2} className='successModalMainOuter'>
              <Box 
              style={{
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                display: "flex",
                height: "300px",}}>
            
                <Avatar variant="rounded" 
                src={VerificationLogo} 
                className='successLogo'></Avatar></Box>
            
              <Typography id="modal-modal-description" className='modalDesc'>
              Your account verification is pending. It’ll be verified shortly by our team
              </Typography>
            </SuccessModalMainOuter>
        </Modal>
     
        </ImgStyling>
        <Footer testID="footer" isChecked={false}/>
        </>
         // Customizable Area End
    );
  }
}
// Customizable Area Start
const SuccessModalMainOuter = styled(Box)({
  "& .successLogo":{
    width:'500px',
    height:'270px', 
    "@media(max-width:576px)": {
      width: "320px", 
      height: "auto",
    }
  },
  "& .modalDesc":{
    textAlign:'center',
    marginBottom:'48px',
    maxWidth:'450px',
    margin:"0 auto 20px",
    color:'#011342',
  },
  "& .loginBtn":{
    "@media(max-width:576px)": {
      width:"100% !important",
    },
  },
  "@media(max-width:576px)": {
    width:"calc(100% - 70px) !important",
    padding:"30px 20px 0 !important",
  },
});
export const ImgStyling: any = styled(Box)({
  "@media (min-width: 1080px)":{
    // maxWidth :"800px",
    margin:"0 auto"
  },
  "@media (min-width: 1440px)":{
    // margin:"50px",
    maxWidth :"1440px",
    // padding:40
  },
  "@media (min-width: 1580px)":{
    margin:"0 auto",
    maxWidth :"1440px",
  },
  "@media (max-width: 767px)":{
    ".myComponent": {
      padding:' 0 !important',
      width:' 80% !important'
    },
    ".myComponent img":{
     marginLeft: '-38px !important'
    }
  },
  
  "@media (min-width: 768px)":{
    ".myComponent":{
      padding: '16px',
      width: '100%'
    },
    ".myComponent img ":{
      marginLeft: '-76px'
    }
  }
});
const otpTheme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px",
        "&$focused $notchedOutline": {
          borderColor: "gray",
          borderWidth: "2px",
        },
        "&:hover $notchedOutline": {
          borderColor: "#bdbdbd",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#fff",
      light: "#334155",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});
const webStyles = {
    main: {
      dispplay: "flex",
      alignItems: "center",
      margin: "auto",
    },
    carouselItem: {
      width: 290,
      flex: "initial"
    },
    buttonBx:{ display: "flex", marginTop: "75px", gap: "10px",alignItems:'center',alignContent:'center',justifyContent:'center',justifyItems:'center',marginBottom:100,padding:30 },
    guestbtn2: {
      background: "#fff",
      color: "#011342",
      border: "1px solid #012275",
      borderRadius: "8px",
      padding: "10px 16px 10px 16px",
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "24px",
      width:'217px',
      height:'52px'
    },
    signUpButtonSubmit2: {
      background: "#012275",
      color: "#fff",
      border: "1px solid #012275",
      borderRadius: "8px",
      padding: "10px 16px 10px 16px",
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "24px",
      width:'217px',
      height:'52px'
    },
    
  };
  const otpScreen = {
    otpTypo: {
      fontWeight: 400,
      lineHeight: "22px",
      fontSize: "14px",
      color: "#011342",
      marginBottom: "40px",
    },
    modal2:{
      position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "600px",
    hieght: "550px",
    padding: " 48px 0px 0px 0px",
    gap: " 40px",
    borderRadius: "16px",
    }
    }
  // Customizable Area End

