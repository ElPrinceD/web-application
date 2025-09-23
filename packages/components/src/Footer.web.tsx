import React, { Component } from "react";
type MyProps = {
  testID: string;
  isChecked: boolean;
  onChangeValue?: (value: boolean) => void;
};
type MyState = { isChecked: boolean; onChangeValue?: (value: boolean) => void };

// Customizable Area Start
import {
  TextField,
  Box,
  Button,
  Grid, Typography, Link, styled,  
} from "@material-ui/core";
import { GBC, ICO, ISO, UKAS, appStore, builder, coming, cross, crown, download, facebook, fast, googlePlay, greenRating, insta, linkedin, logo1, rating, tictok, youtube, zoom } from "../src/assets";
import { NavLink, } from 'react-router-dom';
// Customizable Area End
import { BlockComponent } from "../../../packages/framework/src/BlockComponent";
import MessageEnum, { getName } from "../../../packages/framework/src/Messages/MessageEnum";
import { runEngine } from "../../../packages/framework/src/RunEngine";
import { IBlock } from "../../../packages/framework/src/IBlock";
import { Message } from "../../../packages/framework/src/Message";

// Customizable Area Start
interface AllPartners {
  id: number;
  logo_image: string;
  url: string;
}
export interface Props {
  testID: string;
  isChecked?: boolean;
  onChangeValue?: (value: boolean) => void;
  onChangeNewsLetter?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  key?: any
  handleSubscribe?: () => void;
  email?: string;
  error?: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  allPartnerData:any;
  socialMediaData:any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class FooterController extends BlockComponent<
  Props,
  S,
  SS
> {
  allPartnersId:string="";
  socialMediaId:string="";
  
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      allPartnerData:[],
      socialMediaData:[],
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  componentDidMount =async ()=> {
    this.getAllPartners();
    this.getSocialMedia();
  }
  
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
      // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestid = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let response = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestid === this.allPartnersId) {
        this.handleAllPartner(response.data)
      }

      if (apiRequestid === this.socialMediaId) {
        this.handleSocialMedia(response.data)
      }
    }
  }

  handleAllPartner= (response:any) =>{
    this.setState({allPartnerData:response})
    // Customizable Area End
  }

  getAllPartners = () => {
    const header = {
        "Content-Type": "application/json"
    };
    
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.allPartnersId = requestMessage.messageId;

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    `bx_block_landing_page/admin_landing_pages/get_all_partner`
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    "GET"
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleSocialMedia = (response:any) => {
    this.setState({socialMediaData: response})
  }

  getSocialMedia = () => {
    const header = {
        "Content-Type": "application/json"
    };
    
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );

  this.socialMediaId = requestMessage.messageId;

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    `bx_block_landing_page/admin_landing_pages/get_social_media`
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    "GET"
  );
  runEngine.sendMessage(requestMessage.id, requestMessage);
  };
};


const currentYear = new Date().getFullYear();
// Customizable Area End
export class  Footer extends FooterController {

  constructor(props: any) {
    super(props);   
  }
 
    render(){
      const TextFieldArea= styled(TextField)({
        "& .MuiOutlinedInput-root": {
         height:"44px"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: 0
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: 'rgba(0, 0, 0, 0)'
         },
         "& .MuiOutlinedInput-notchedOutline": {
          borderColor: 'rgba(0, 0, 0, 0)'
         },
      })
  return (
    // Customizable Area Start
    // Required for all blocks
    <Box style={webStyles.mainBox}>
      <DesktopFooterBox>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          style={{ columnGap: "60px" }}
          width={"100%"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ rowGap: "48px" }}
          >
            <NavLink to="/">
              <img src={logo1} alt="notary" width={"158px"} height={"50px"} />
            </NavLink>          
            
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              style={{ rowGap: "16px" }}
              width={"100%"}
            >
              <Typography style={webStyles.accredit}>Accredited by</Typography>
              <Box display={"flex"} width={"100%"} style={{ columnGap: "7px" }}>
                <img src={ICO} alt="notary" width={"50px"} height={"41px"} />
                <img src={ISO} alt="notary" width={"35px"} height={"33px"} style={{borderRadius: "50%"}}/>
                <img src={crown} alt="notary" width={"22px"} height={"33px"} />
                <img src={UKAS} alt="notary" width={"128px"} height={"29px"} />
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            style={{ rowGap: "12px" }}
          >
            <Typography style={webStyles.heads}>Partners</Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ rowGap: "8px" }}
            >
              {
                this.state.allPartnerData?.map((item:any)=>(
              <Box
                display={"flex"}
                alignItems={"center"}
                style={{ columnGap: "8px" }}
                key={item?.id}
              >
                <img src={item?.attributes?.logo_image?.url} alt="notary" width={22} height={22}/>
               <Button href={item?.attributes?.url} style={webStyles.partnersLink} variant="text" target="_blank">
                <Typography style={{...webStyles.headsChild, textTransform: "none",textDecorationLine:"none"}}>
                    {item?.attributes?.title}
                </Typography>
                  </Button>
              </Box>
                ))
              }
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            style={{ rowGap: "12px" }}
          >
            <Typography style={webStyles.heads}>Company</Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ rowGap: "8px" }}
            >
              <Typography style={{...webStyles.headsChild,textDecorationLine:"none"}}>
              <NavLink
                to="/Aboutus"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                style={webStyles.partnersLink}
              >
                About us
              </NavLink></Typography>
              <Typography style={{...webStyles.headsChild,textDecorationLine:"none"}}>
              <NavLink
                to="/Services"
                style={webStyles.partnersLink}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                Services
              </NavLink></Typography>
              <Typography style={{...webStyles.headsChild,textDecorationLine:"none"}}>
              <NavLink
                to="/Faq"
                style={webStyles.partnersLink}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                FAQ
              </NavLink></Typography>
              <Typography style={{...webStyles.headsChild,textDecorationLine:"none"}}>
              <NavLink
                to="/Contactus"
                style={webStyles.partnersLink}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                Contact us
              </NavLink></Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            style={{ rowGap: "24px" }}
            justifyContent={"start"}
          >
            <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ rowGap: "24px" }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"end"}
              justifyContent={"space-between"}
              style={{ rowGap: "24px" }}
              width={"100%"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                style={{ rowGap: "12px" }}
                width={"100%"}
              >
                <Typography style={webStyles.heads}>Newsletter</Typography>
                <Box
                  display={"flex"}
                  style={{ columnGap: "8px" }}
                  width={"100%"}
                >
             <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
  <input
    value={this.props.email}
    placeholder="Your E-mail Address"
    onChange={this.props.onChangeNewsLetter}
    style={{
      border: !!this.props.error ? '1px solid red' : '1px solid #ccc',
      padding: '8px',
      borderRadius: '4px',
      height:"41px"
    }}
  />
  {!!this.props.error && (
    <span style={{ color: 'red', fontSize: '11px' }}>
      {this.props.error}
    </span>
  )}
</div>


                  <Button
                    variant="contained"
                    style={{ ...webStyles.signup, textTransform: "none" }}
                    onClick={this.props.handleSubscribe}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Box>
            </Box>
            
            <Box
              style={webStyles.socialCont}
            > 
            {
              this.state.socialMediaData?.map((item:any)=>(
                <a
                key={item?.id}
                href={item?.attributes?.url}
                target="_blank"
                >
                <img src={item?.attributes?.logo?.url} width={24} height={24} alt="notary"/>
               
              </a>
                ))
              }
             </Box> 
          </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{ columnGap: "48px",gap:"3.5rem" }}
          width={"100%"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            style={{ columnGap: "16px" }}
          >
            <img src={appStore} alt="notary" />
            <img src={googlePlay} alt="notary" />
          </Box>
          <Typography style={{ ...webStyles.footerreno }}>
            renotary is the leader in remote online notarisation, which is
            simpler, smarter and safer than notarising documents on paper.
            renotary™ Network is the world's largest network of on-demand
            notaries.
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          style={{ columnGap: "24px" }}
          width={"100%"}
        >
          <Typography style={webStyles.copyrightText}>
            © renotary {currentYear}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            style={{ columnGap: "24px" }}
          >
            <NavLink
              to="/Termsandconditions"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Typography style={webStyles.privacyPolicyTnCText}>
                Terms of Service
              </Typography>
            </NavLink>
            <NavLink
              to="/Privacypolicy"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Typography style={webStyles.privacyPolicyTnCText}>
                Privacy policy
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </DesktopFooterBox>
      <TabletFooterBox>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"95%"}
          style={{ rowGap: "48px" }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            width={"100%"}
            style={{ columnGap: "24px" }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"292px"}
              style={{ rowGap: "48px" }}
            >
              <NavLink to="/">
              <img src={logo1} alt="notary" width={"194px"} />
            </NavLink>              
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                style={{ rowGap: "16px" }}
                width={"100%"}
              >
                <Typography style={webStyles.accredit}>
                  Accredited by
                </Typography>
                <Box
                  display={"flex"}
                  width={"100%"}
                  style={{ columnGap: "7px" }}
                >
                  <img src={ICO} alt="notary" width={"50px"} height={"41px"} />
                  <img src={ISO} alt="notary" width={"35px"} height={"33px"} style={{borderRadius: "50%"}}/>
                  <img src={crown} alt="notary" width={"22px"} height={"33px"} />
                  <img src={UKAS} alt="notary" width={"128px"} height={"29px"} />
                </Box>
              </Box>
            </Box>
            <Box
              width={"360px"}
              display={"flex"}
              justifyContent={"space-between"}
              style={{ columnGap: "24px" }}
            >
              <Box
                display={"flex"}
                flexDirection="column"
                width={"50%"}
                style={{ rowGap: "12px" }}
              >
                <Typography style={webStyles.heads}>Partners</Typography>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  style={{ rowGap: "8px" }}
                 >
                  {
                this.state.allPartnerData?.map((item:any)=>(
              <Box
                display={"flex"}
                alignItems={"center"}
                style={{ columnGap: "8px" }}
                key={item?.id}
              >
                <img src={item?.attributes?.logo_image?.url} alt="notary" width={22} height={22}/>
               <Button href={item?.attributes?.url} style={webStyles.partnersLink} variant="text" target="_blank">
                <Typography style={{...webStyles.headsChild, textTransform: "none",textDecorationLine:"none"}}>
                    {item?.attributes?.title}
                </Typography>
                  </Button>
              </Box>
                ))
              }
            </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection="column"
                width={"50%"}
                style={{ rowGap: "12px" }}
              >
                <Typography style={webStyles.heads}>Company</Typography>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  style={{ rowGap: "8px" }}
                >
                  <NavLink
                    to="/Aboutus"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    style={webStyles.headsChild}
                  >
                    About us
                  </NavLink>
                  <NavLink
                    to="/Services"
                    style={webStyles.headsChild}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Services
                  </NavLink>
                  <NavLink
                    to="/Faq"
                    style={webStyles.headsChild}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    FAQ
                  </NavLink>
                  <NavLink
                    to="/Contactus"
                    style={webStyles.headsChild}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Contact us
                  </NavLink>
                </Box>
              </Box>
            </Box>
          </Box>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={6}
            style={{display:"flex"}}
          >
            <TabletNewsletterGrid item sm={12} md={6} lg={6}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
                style={{ rowGap: "24px" }}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  style={{ rowGap: "12px" }}
                  width={"402px"}
                >
                  <Typography style={webStyles.heads}>Newsletter</Typography>
                  <Box display={"flex"} style={{ columnGap: "8px" }} width={"100%"} >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
  <input
    value={this.props.email}
    placeholder="Your E-mail Address"
    onChange={this.props.onChangeNewsLetter}
    style={{
      border: !!this.props.error ? '1px solid red' : '1px solid #ccc',
      padding: '8px',
      borderRadius: '4px',
      height:"41px"
    }}
  />
  {!!this.props.error && (
    <span style={{ color: 'red', fontSize: '11px' }}>
      {this.props.error}
    </span>
  )}
</div>
                    <Button
                      variant="contained"
                      style={{ ...webStyles.signup, textTransform: "none" }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </Box>
              </Box>
            </TabletNewsletterGrid>
            <TabletSocialMediaGrid item sm={12} md={6} lg={6}
            >
              <TabletSocialMediaBox
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"end"}
                style={{ rowGap: "4px" }}
              >
              <Box
                style={webStyles.socialCont}
                display={"flex"}
                justifyContent={"center"}
              > 
              {
                this.state.socialMediaData?.map((item:any)=>(
                <a
                key={item?.id}
                href={item?.attributes?.url}
                target="_blank"
                >
                  <img src={item?.attributes?.logo?.url} width={28} height={28} alt="notary"/>
                </a>
                ))
              }
              </Box>
            </TabletSocialMediaBox>
            </TabletSocialMediaGrid>
          </Grid>
          <Box
            display={"flex"}
            justifyContent={"center"}
            style={{ columnGap: "16px" }}
          >
            <img src={appStore} alt="notary" />
            <img src={googlePlay} alt="notary" />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              align="center"
              style={{ ...webStyles.footerreno, width: "738px" }}
            >
              renotary is the leader in remote online notarisation, which is
              simpler, smarter and safer than notarising documents on paper.
              renotary™ Network is the world's largest network of on-demand
              notaries.
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          style={{ columnGap: "24px" }}
          width={"95%"}
        >
          <Typography style={webStyles.copyrightText}>
            © renotary {currentYear}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            style={{ columnGap: "24px" }}
          >
            <NavLink
              to="/Termsandconditions"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Typography style={webStyles.privacyPolicyTnCText}>
                Terms of Service
              </Typography>
            </NavLink>
            <NavLink
              to="/Privacypolicy"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Typography style={webStyles.privacyPolicyTnCText}>
                Privacy policy
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </TabletFooterBox>
      <MobileFooterBox>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          style={{ rowGap: "48px" }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            style={{ rowGap: "48px" }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              style={{ rowGap: "48px" }}
            >
              <NavLink to="/">
              <img src={logo1} alt="notary" width={"194px"} />
            </NavLink>              
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                style={{ rowGap: "16px" }}
              >
                <Typography style={webStyles.accredit}>
                  Accredited by
                </Typography>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ columnGap: "12px" }}
                >
                  <img src={ICO} alt="notary" width={"50px"} height={"41px"} />
                  <img src={ISO} alt="notary" width={"35px"} height={"33px"} style={{borderRadius: "50%"}}/>
                  <img src={crown} alt="notary" width={"22px"} height={"33px"} />
                  <img src={UKAS} alt="notary" width={"128px"} height={"29px"} />
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"center"}
              style={{ rowGap: "48px" }}
            >
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  flexDirection="column"
                  style={{ rowGap: "12px" }}
                >
                  <Typography style={webStyles.heads}>Partners</Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ rowGap: "8px" }}
                  >
                     {
                this.state.allPartnerData?.map((item:any)=>(
              <Box
                display={"flex"}
                alignItems={"center"}
                style={{ columnGap: "8px" }}
                key={item?.id}
              >
                <img src={item?.attributes?.logo_image?.url} alt="notary" width={22} height={22}/>
               <Button href={item?.attributes?.url} style={webStyles.partnersLink} variant="text" target="_blank">
                <Typography style={{...webStyles.headsChild, textTransform: "none",textDecorationLine:"none"}}>
                    {item?.attributes?.title}
                </Typography>
                  </Button>
              </Box>
                ))
              }
              </Box>
              </Box>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  style={{ rowGap: "12px" }}
                >
                  <Typography style={webStyles.heads}>Company</Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ rowGap: "8px" }}
                  >
                    <NavLink
                      to="/Aboutus"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      style={webStyles.headsChild}
                    >
                      About us
                    </NavLink>
                    
                    <NavLink
                      to="/Services"
                      style={webStyles.headsChild}
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Services
                    </NavLink>
                    <NavLink
                      to="/Faq"
                      style={webStyles.headsChild}
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      FAQ
                    </NavLink>
                    <NavLink
                      to="/Contactus"
                      style={webStyles.headsChild}
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      Contact us
                    </NavLink>
                  </Box>
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"space-between"}
                style={{ rowGap: "32px" }}
                width={"100%"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  style={{ rowGap: "24px" }}
                  width={"100%"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    style={{ rowGap: "12px" }}
                    width={"100%"}
                  >
                    <Typography style={webStyles.heads}>Newsletter</Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      style={{ gap: "8px" }}
                      width={"100%"}
                      justifyContent={"center"}
                    >                    
                       <TextFieldArea
                         id="outlined-basic"
                         variant="outlined"
                         style={webStyles.input}
                         placeholder="Your E-mail Address" >
                       </TextFieldArea>
                      <Button
                        variant="contained"
                        style={{ ...webStyles.signup, textTransform: "none" }}
                      >
                        Subscribe
                      </Button>
                    </Box>
                  </Box>

                </Box>
                <Box
                display={"flex"}
                style={webStyles.socialCont}
                justifyContent={"center"}
              > 
              {
                this.state.socialMediaData?.map((item:any)=>(
                <a
                key={item?.id}
                href={item?.attributes?.url}
                target="_blank"
                >
                <img src={item?.attributes?.logo?.url} width={28} height={28} alt="notary"/>
              </a>
                ))
              }
              </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            style={{ rowGap: "24px" }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              style={{ columnGap: "16px" }}
            >
              <img src={appStore} alt="notary" />
              <img src={googlePlay} alt="notary" />
            </Box>
            <Typography align="center" style={{ ...webStyles.footerreno }}>
              renotary is the leader in remote online notarisation, which is
              simpler, smarter and safer than notarising documents on paper.
              renotary™ Network is the world's largest network of on-demand
              notaries.
            </Typography>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          style={{ columnGap: "24px" }}
        >
          <Typography style={webStyles.copyrightText}>
            © renotary {currentYear}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            style={{ columnGap: "24px" }}
          >
            <NavLink
              to="/Termsandconditions"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Typography style={webStyles.privacyPolicyTnCText}>
                Terms of Service
              </Typography>
            </NavLink>
            <NavLink
              to="/Privacypolicy"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Typography style={webStyles.privacyPolicyTnCText}>
                Privacy policy
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </MobileFooterBox>
    </Box>
    // Customizable Area End
  );
    }
}




// Customizable Area Start
const DesktopFooterBox = styled(Box)({
  "@media (max-width: 1152px)": {
    display: "none"
  },
  padding: "80px 80px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "60px"
})

const TabletFooterBox = styled(Box)({
  "@media (max-width: 600px) or (min-width: 1153px)": {
    display: "none"
  },
  padding: "80px 24px 40px",
  display: "flex",
  flexDirection: "column",
  alignItems:"center",
  gap: "60px"
})

const MobileFooterBox = styled(Box)({
  "@media (min-width: 601px)": {
    display: "none"
  },
  padding: "80px 24px 40px",
  display: "flex",
  flexDirection: "column",
  gap: "60px",
  "& .MuiOutlinedInput-root":{
    "@media (max-width: 767px)": {
      width:"100% !important"
    }
  }
})

const TabletNewsletterGrid = styled(Grid)({
  "@media (min-width:959px)": {
    display: "flex",
    justifyContent: "end",   
  },
})

const TabletSocialMediaGrid = styled(Grid)({
  "@media (min-width: 959px)": {
    display: "flex",
    justifyContent: "start",
  },
})

const TabletSocialMediaBox = styled(Box)({
  "@media (min-width: 959px)": {
    width: "402px",
  },
})

const webStyles = {
  mainBox: {
    backgroundColor: "#011342", 
    color: "#FFF",
    marginTop: "44px"
  },
  copyrightText: {
    color: "#CBD5E1",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "21px",
    fontFamily: "INTER"
  },
  privacyPolicyTnCText: {
    color: "#CBD5E1",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "16.94px",
    textDecoration: "underline",
    fontFamily: "INTER"
  },
  footerreno: {
    color: "#CBD5E1",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    fontFamily: "INTER",
  },

  input: {
    background: "#FFFFFF",
    borderRadius: "8px",
    width: "262px",
    height: "44px"
  },
  signup: {
    backgroundColor: "#012275",
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: "24px",
    borderRadius: "8px",
    padding: "12px 16px",
    fontFamily: "INTER",
    width: "100%",
    maxWidth: "132px",
    height: "44px"
  },
  socialCont: {
    width:"100%",
    display: "flex",
    gap:"22px",
    cursor: 'pointer'
  },
  heads: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 700,
    lineHeight: "26px",
    fontFamily: "INTER"
  },
  headsChild: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "INTER",
    textDecoration:"underline",
    fontWeight: 500,
    
  },
  partnersLink:{   
    color: "#FFFFFF",
    fontWeight:500,
    textDecoration:"none",
    fontSize:14,
    fontFamily:'Inter',
    lineHeight:'16px',
    padding: "0px",
    display: "flex",
    justifyContent: "start"
  },
  accredit: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "22px",
    color: "#FFF",
    fontFamily: "INTER",
  }
};
// Customizable Area End