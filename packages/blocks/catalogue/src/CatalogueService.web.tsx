// Customizable Area Start
import React from "react";
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";
import { styled, } from "@material-ui/core/styles";
import RequestModal from "../../dashboard/src/BookNotaryRequest.web";
import Loader from "../../../components/src/Loader.web";
import { AddRounded, Close, Menu } from "@material-ui/icons";

import { localProfile,bellIcon ,logoImg,notartyBackButton,logoBlueImg} from "./assets";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import CustomFooter from "../../../components/src/CustomFooter.web";
import CustomSearchField from "../../../components/src/CustomSearchField.web";
import CatalogueServiceController ,{Props} from "./CatalogueServiceController";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
// Customizable Area End

export default class CatalogueService extends CatalogueServiceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start


    // Customizable Area End
  }

  // Customizable Area Start

Header = () => {
  return (
    <Box
    display={"flex"}
    alignItems={"center"}
    mt={"32px"}
       >
      <StyledIconButton  data-testID="toggleButton"  onClick={this.openSideBar}>
        {this.state.isSideBarOpen ? (
          <Close    style={webStyle.closeIcon}  data-testID="closeIcon"/>
        ) : (
          <Menu style={webStyle.closeIcon} />
        )}
      </StyledIconButton>
      <Box
       width={"calc(100vw - 74px)"}>
        <Box
          justifyContent={"space-between"}
          mx={"25px"}
          display={"flex"}
          alignItems={"center"}
        
        >

          <Box
           height={"48px"}
           alignItems={"center"}
           
           display={"flex"}
           style={webStyle.headingBox}
          >
         <Button onClick={this.gotoback}>

          <img src={notartyBackButton}/>
          </Button>
            <Typography style={webStyle.headingText}>
            Notary services  </Typography>
          </Box>          
          <MiniHeader
            navigation={this.props.navigation}
            id={""}
            />
        </Box>
      </Box>
    </Box>
  );
};
service =()=>{
  return(
    <Box style={{margin: '32px 24px 32px 24px'}}>
              <Grid container spacing={2}>
                     {this.state?.serviceData?.map((item: any, index: any) => (
                        <Grid item xl={3} sm={6} md={6} xs={12} lg={3} >
                          <Box
                            flexDirection={"column"}
                            p={"16px 8px"}
                            display={"flex"}
                            justifyContent={"center"}
                            borderRadius={"8px"}
                            minHeight={"179px"}
                            alignItems={"center"}
                            style={{
                              rowGap: "12px",
                              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                              backgroundColor: "#fff",
                            }}
                         
                          >
                            <img
                              width={"44px"}
                              src={item.attributes.service_icon?.url}
                              height={"44px"}
                            />
                            <Box width={"90%"}>
                              <Typography  style={webStyle.cardTitle} align="center" >
                        {item.attributes.service_name}
                              </Typography>
                            </Box>
                            <Box width={"90%"} style={{overflowWrap: "break-word", wordBreak: "break-word"}}>
                              <Typography
                                style={webStyle.serviceDescription}
                                align="center"
                              >
                      {this.truncateText(item.attributes.service_description, 170)}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
              </Box>
  )
}
serviceSearch =()=>{
  console.log('datafilter',this.state.accountData.length)
  if(this.state.accountData.length===0 ||!this.state.accountData){
    return(
      <Box style={{ margin: '32px 24px' , minHeight:'400px'}}>
           <Loader loading={this.state.loader} />

         {!this.state.loader ? <Typography variant="h6" align="center">
         No services are available
                   </Typography>:""}
        </Box>
    )
  }
  return(
    <Box style={{margin: '32px 24px 32px 24px'}}>
              <Grid container spacing={2}>
                     {this.state?.accountData?.map((item: any, index: any) => (
                        <Grid item xs={12}  xl={3} sm={6} md={6} lg={3}>
                          <Box
                            borderRadius={"8px"}
                            p={"16px 8px"}
                            style={{
                              rowGap: "12px",
                              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                              backgroundColor: "#fff",
                            }}
                            flexDirection={"column"}
                            justifyContent={"center"}
                            display={"flex"}
                            minHeight={"179px"}
                            alignItems={"center"}
                            
                          >
                            <img
                              height={"44px"}
                              src={item.attributes.service_icon?.url}
                              width={"44px"}
                            />
                            <Box width={"90%"}>
                              <Typography align="center" style={webStyle.cardTitle}>
                        {item.attributes.service_name}
                              </Typography>
                            </Box>
                            <Box width={"90%"} style={{
    overflowWrap: "break-word",
    wordBreak: "break-word",}}>
                              <Typography
                                style={webStyle.serviceDescription}
                                align="center"
                                
                              >
                      {this.truncateSearchText(item.attributes.service_description, 170)}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
              </Box>
  )
}
truncateText(text: any, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  truncateSearchText(searchtext: any, searchmaxLength: number) {
    if (searchtext.length > searchmaxLength) {
      return searchtext.substring(0, searchmaxLength) + '...';
    }
    return searchtext;
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
     <div>
        <RequestSectionBox >
          <RequestModal
           id={""}
           serviceData={this.state.serviceData}
           isOpen={this.state.modalOpen}
           closeModal={this.closeBookNotaryRequestModal}
           data-testID="modalOpen"
           cancelReqModal={this.state.cancelReqModal}
           yesButtonClick={this.yesButtonClick}
           noButtonClick={this.noButtonClick}
           allRequestAPI={() => {}}
           navigation={undefined}
            editRequest={undefined}
            setLoader={this.setLoader}
             setModal={this.setModal}
              isNewRequestOrEditRequestOrInviteClient={"new"}
              backToEditRequest={() => {}} 
           

          />
        <Box className={this.state.isSideBarOpen ? "sideBarOpen" : "sideBar"}>
        <NavigationMenu navigation={this.props.navigation} id={""} />
        </Box>
        <Box className="mainSection">
          <Grid container>
            <Grid md={12} sm={12} xs={12}  item xl={12} lg={12}>
              <Box className="tabLogo"> <Box className="tabLogoBox">
              <img width={"100%"} height="100%"  src={logoBlueImg} alt="" />

              </Box></Box>
              {this.Header()}
              <Box style={{justifyContent:'end',marginTop:'32px ',width:'98%',display:'flex'}}>
              <SearchFieldBox>
                      <CustomSearchField
                       inputColor={"#011342"}
                       borderColor={"#011342"}
                       placeholderColor={"#011342"}
                       searchIconColor={"#012275"}
                       borderRadius="8px"
                        placeholder={"Search"}
                        onChange={this.handleSearchChange}   
                       
                      />
                    </SearchFieldBox>
              </Box>
              </Grid>
              </Grid>
                {this.state.searchfilterData ? this.serviceSearch():this.service()}
              <CustomFooter/>

              </Box>
              </RequestSectionBox>

     </div>

    );
    // Customizable Area End
  }
}

// Customizable Area Start
const SearchFieldBox = styled(Box)({
  width: "390px",
  "@media (max-width: 819px)": {
    width: "48%",
  },
})
const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const RequestSectionBox = styled(Box)({
  overflowY: "hidden",
  display: "flex",
  height: "100vh",
  "& .mainSection": {
    flexDirection: "column",
    height: "100%",
    display: "flex",
    width:'100%',
    overflowY: "scroll",
    backgroundColor: "#f9f9f9",
  },
  "& .tabLogo": {
    paddingTop: "20px",
    display: "none",
    width: "100%",
  },
  "& .tabLogoBox": {
    height: "50px",
    width: "160px",
  },
  "@media screen and (max-width:1024px)": {
    "& .sideBar": {
      display: "none"
    },
    "& .sideBarOpen": {
      display: "block"
    },
    "& .tabLogo": {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    }
  },

});

const webStyle = {
  headingText: {
    fontFamily: "Inter",
    color: "#011342",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.5%",
  },
  productContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "wrap",
    width: "100%",
  },
  serviceDescription: {
    fontFamily: "Inter",
    lineHeight: "18px",
    fontSize: "12px",
    fontWeight: 500,
  },
  closeIcon: {  height: "56px",width: "50px" },

  headingBox: { columnGap: "8px" },
  
  bellIconShadow: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#FFF",
  },
  cardTitle: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "21px",
    color: "#011342",
  },
  productBox: {
    flexDirection: "column",
    height: 250,
    width: "49%",
    marginRight: "5px",
  },
  ImgContainer: {
    height: 150,
    //marginBottom: 15,
  },
  productImg: {
    height: "100%",
    width: "100%",
  },
  detailContent: {
    flexDirection: "column",
    display: "flex",
  },
};

const DashboardBox = styled(Box)({
  padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent:"space-between",
    "& .menuIconBtn":{
      display: "none"
    },
    "& .dashboardHeading": {
      gap: "10px",
      display: "flex",
      alignItems: "center",
      "& .MuiTypography-body1": {
        fontWeight: 700,
        fontSize: "24px",
        color: "#011342",
        lineHeight: "32px",
        fontFamily: "Inter",
      },
    },
    "& .menuIcon": {
      display: "none",
    },
    "& .profileBox": {
      alignItems: "center",
      display: "flex",
      gap: "15px",
      padding: "10px",
      "& .MuiButton-root": {
        color: "white",
        background: "#012275",
        borderRadius: "4px",
        paddingRight: "15px",
        paddingLeft: "15px",
        height: "49px",
        fontSize: "16px",
        fontWeight: 700,
        fontFamily: "Inter",
        textTransform: "none",
      
      },
    },
    "& .addIcon": {
      paddingRight: "8px",
    },
    "& .bellIconBox":{
      boxShadow: "0px 0px 3px rgba(0,0,0,0.1)",
    },
    "& .profile": {
      boxShadow: "0px 0px 3px rgba(0,0,0,0.1)",
      padding:"8px 25px 8px 8px",
      "& .MuiTypography-body2": {
        fontFamily: "Inter",
        color: "#011342",
        fontSize: "14px",
        fontWeight: 600,
       
      },
      display: "flex",
      order: 3,
      alignItems: "center",
      gap: "5px",
    },
    "& .userImage": {
      height: "32px",
      width: "32px",
      "& img": {
        borderRadius: "50%",
      },
    },
    "@media screen and (max-width:1024px)": {
      "& .menuIconBtn":{
        display: "block"
      },
      "& .tabHeading":{
        display: "none"
      },
      "& .MuiButton-root": {
        fontSize: "14px",
        order: 2,
      },
      "& .profileBox": {
        "& img": {
          order: 1,
        },
      },
      "& .menuIcon": {
        display: "block",
      },
    },
    "@media screen and (max-width:599px)": {
      "& .dashboardHeading": {
        gap: "5px",
        "& .MuiTypography-body1": {
          lineHeight: "20px !important",
          fontSize: "20px !important",
        },
      },
      "& .profileBox": {
        padding: "5px",
        gap: "10px",
        "& .MuiButton-root": {
          height: "30px !important",
          fontSize: "10px !important",
          paddingRight: "5px !important",
          paddingLeft: "5px !important",
        },
      },
      "& .addIcon": { display: "none" },
      padding: "10px",
      "& .profile": {
        gap: "2px",
        "& .MuiTypography-body2": { display: "none" },
      },
    },
  });
// Customizable Area End
