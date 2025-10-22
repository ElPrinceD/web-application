// Customizable Area Start
import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  styled,
  Grid,
} from "@material-ui/core";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import { localProfile } from "./assets";
import CatalogueController, { Props } from "./CatalogueController";
import RequestModal from "./../../dashboard/src/BookNotaryRequest.web";
import Loader from "../../../components/src/Loader.web";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import CustomFooter from "../../../components/src/CustomFooter.web";
import CustomSearchField from "../../../components/src/CustomSearchField.web";
import CustomAutocomplete from "../../../components/src/CustomAutocomplete.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
// Customizable Area End

export default class Catalogue extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"33px"}>
        <Box width={"calc(100vw - 74px)"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mx={"25px"}
          >
            <Box
              display={"flex"}
              height={"48px"}
              alignItems={"center"}
              style={webStyle.headingBox}
            >
              <Typography style={webStyle.headingText}>Catalogue</Typography>
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

  
  popularNotaryDataall = () => {
    const { selectedJurisdiction, popularNotariesData,searchQuery } = this.state; 
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // Safety check to ensure popularNotariesData is an array
    if (!Array.isArray(popularNotariesData)) {
      return (
        <Box style={{ margin: '32px 24px' }}>
          <Loader loading={this.state.loader} />
          {!this.state.loader ? <Typography variant="h6" align="center">
            No popular notaries available.
          </Typography> : ""}
        </Box>
      );
    }

    const filteredNotaries = popularNotariesData.filter(notary => {
      const matchesJurisdiction = selectedJurisdiction ? notary.jurisdiction === selectedJurisdiction : true;
      const matchesName = notary.name.toLowerCase().includes(normalizedQuery);
      return matchesJurisdiction && matchesName;
    });
     
      if (filteredNotaries.length === 0) {
        return (
          <Box style={{ margin: '32px 24px' }}>
           <Loader loading={this.state.loader} />

         {!this.state.loader ? <Typography variant="h6" align="center">
         No popular notaries available .
                   </Typography>:""}
        </Box>
        );
      }
  
    return (
      <Grid container spacing={2}>
        {
          filteredNotaries.map((notary, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={index}>
              <Box
                p={"24px 8px"}
                display={"flex"}
                justifyContent={"center"}
                minHeight={"160px"}
                flexDirection={"column"}
                alignItems={"center"}
                borderRadius={"8px"}
                style={{
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                  backgroundColor: "#F5F9FF",
                  rowGap: "16px",
                }}
              >
                <img
                  src={
                    notary.photo !== "No Photo" ? notary.photo : localProfile
                  }
                  height={"72px"}
                  width={"72px"}
                  style={{ borderRadius: "50px" }}
                  alt={notary.name}
                />
                <Box
                  width={"90%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  style={{ rowGap: "8px" }}
                >
                  <Typography align="center" style={webStyle.notaryName}>
                    {notary.name}
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <LocationOnOutlinedIcon
                      style={{
                        color: "red",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    <Typography style={webStyle.notaryPlace}>
                      {notary.jurisdiction}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <StarOutlinedIcon
                      style={{
                        color:"#F59E0B",
                        width: "14px",
                        height: "14px",
                      }}
                      />
                    <Typography
                      align="center"
                      style={webStyle.serviceDescription}
                    >
                      {notary.rating} Ratings | {notary.total_notaries} Orders
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))

      }
      </Grid>
    );
  };


  popularService = () => {
    const { PoplarServiceseData, searchQuery } = this.state;
    const normalizedQuery = searchQuery.trim().toLowerCase();


    const filteredPOpularServices = PoplarServiceseData.filter(service => {

      const serviceName = service?.attributes.service_name.toLowerCase();
      return (
        serviceName.includes(normalizedQuery) 
      );
    });
    if (filteredPOpularServices.length === 0) {
      return (

        <Box style={{ margin: '32px 24px' }}>
        <Loader loading={this.state.loader} />

      {!this.state.loader ? <Typography variant="h6" align="center">
      No popular services available.
                </Typography>:""}
     </Box>
       
      );
    }
  
    return (
      <Grid container spacing={2}>
        {filteredPOpularServices.map((service, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={index}>
            <Box
              p="16px 8px"
              flexDirection="column"
              display="flex"
              minHeight="179px"
              alignItems="center"
              borderRadius="8px"
              style={{
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                backgroundColor: "#F5F9FF",
                rowGap: "12px",
              }}
              justifyContent="center"
            >
              <img
                src={service?.attributes.service_icon.url}
                height="44px"
                width="44px"
                alt={service?.attributes.service_name}
              />
              <Box width="90%">
                <Typography align="center" style={webStyle.cardTitle}>
                  {service?.attributes.service_name}
                </Typography>
              </Box>
              <Box width="90%">
                <Typography align="center" style={webStyle.serviceDescription}>
                  {service?.attributes.service_description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };
  

 
  notaryservice = () => {
 
    const { searchQuery } = this.state;
  
    const normalizedQuery = searchQuery.trim().toLowerCase();
  
    const filteredServices = this.state.servicedatashow.filter(service => {
      const serviceName = service.attributes.service_name.toLowerCase();
      const serviceDescription = service.attributes.service_description.toLowerCase();
      return (
        serviceName.includes(normalizedQuery)
      );
    });
  
    if (filteredServices.length === 0) {
      return (
        <Box style={{ margin: '32px 24px' }}>
        <Loader loading={this.state.loader} />

      {!this.state.loader ? <Typography variant="h6" align="center">
      No notary services available.
                </Typography>:""}
     </Box>
      );
    }
       const servicesToDisplay = filteredServices.slice(0, 4);


    return (
        <Grid container spacing={2}>
            {servicesToDisplay.map((service, index) => (
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={index}>
                    <Box
                        p={"16px 8px"}
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"8px"}
                        minHeight={"179px"}
                        style={{
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                            backgroundColor: "#F5F9FF",
                            rowGap: "12px",
                        }}
                    >
                        <img
                            src={service?.attributes?.service_icon?.url}
                            width={"44px"}
                            height={"44px"}
                            alt={service?.attributes?.service_name}
                        />
                        <Box width={"90%"}>
                            <Typography style={webStyle.cardTitle} align="center">
                                {service?.attributes?.service_name}
                            </Typography>
                        </Box>
                        <Box width={"90%"}>
                            <Typography align="center" style={webStyle.serviceDescription}>
                                {this.truncateText(service?.attributes?.service_description, 150)}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

  truncateText(text: any, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <>
        <Box display={"flex"} data-testid="test1">
          <Loader loading={this.state.loader} />
          <RequestModal
            navigation={undefined}
            id={""}
            isOpen={this.state.modalOpen}
            closeModal={this.closeBookNotaryRequestModal}
            data-testid="modalOpen"
            allRequestAPI={() => {}}
            serviceData={this.state.serviceData}
            cancelReqModal={this.state.cancelReqModal}
            yesButtonClick={this.yesButtonClick}
            noButtonClick={this.noButtonClick}
            setLoader={this.setLoader}
            setModal={this.setModal}
            editRequest={undefined}
            isNewRequestOrEditRequestOrInviteClient={"new"}
            backToEditRequest={() => {}}  
          />
          <NavigationMenu navigation={this.props.navigation} id={""} />
          <MainBox
            height={"100vh"}
            overflow={"auto"}
            width={this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw"}
            style={{ backgroundColor: "#F9F9F9" }}
          >
            <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"} justifyContent={"space-between"}>
              <Box>
                {this.Header()}
                <MainContentBox mt={"32px"} mx={"25px"}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <AutocompleteBox>
                      <CustomAutocomplete
                        options={this.state.jurisdictions}
                        value={this.state.selectedJurisdiction}
                        onChange={this.handleChange}
                        label={"Choose your Jurisdiction"}
                        isAsteriskShown={true}
                      />
                    </AutocompleteBox>
                    <SearchFieldBox>
                      <CustomSearchField
                        placeholder={"Search"}
                        onChange={this.handleSearchChange}     
                        inputColor={"#011342"}
                        borderColor={"#011342"}
                        placeholderColor={"#011342"}
                        searchIconColor={"#012275"}
                        borderRadius="8px"
                      />
                    </SearchFieldBox>
                  </Box>
                  <Box
                    width={"95.97%"}
                    p={"24px"}
                    borderRadius={"8px"}
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ backgroundColor: "#FFFFFF", rowGap: "16px" ,marginTop:'24px'}}
                  >
                    <Typography style={webStyle.sectionTitles}>
                      Popular Services
                    </Typography>
                    { this.popularService()}
                  </Box>
                  <Box
                    width={"95.97%"}
                    p={"24px"}
                    borderRadius={"8px"}
                    display={"flex"}
                    flexDirection={"column"}
                    style={{ backgroundColor: "#FFFFFF", rowGap: "16px",marginTop:'24px' }}
                  >
                    <Box display={"flex"} justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
                      <Typography style={webStyle.sectionTitles} >
                        Popular Notaries
                      </Typography>
                       
                      <Button onClick={this.goToNotaryPage} data-test-id="popluarNotary"
>
                      <Typography style={webStyle.veiwAll}>
                        View All
                      </Typography>
                        </Button>
                    </Box>
                     {this.popularNotaryDataall()}
                  </Box>
                  <Box
                    width={"95.97%"}
                    p={"24px"}
                    borderRadius={"8px"}
                    display={"flex"}
                    flexDirection={"column"}
                    marginY={'24px'}
                    style={{ backgroundColor: "#FFFFFF", rowGap: "16px" }}
                  >
                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                      <Typography style={webStyle.sectionTitles}>
                        Notary Services
                      </Typography>
                      <Button onClick={this.goToServicePage} >
  
                      <Typography style={webStyle.veiwAll}>View All</Typography>
                      </Button>
                    </Box>
                  {this.notaryservice()}


                  </Box>
                </MainContentBox>
              </Box>
              <CustomFooter/>
            </Box>
          </MainBox>
        </Box>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const AutocompleteBox = styled(Box)({
  width: "354px",
  "@media (max-width: 819px)": {
    width: "48%",
  },
})

const SearchFieldBox = styled(Box)({
  width: "390px",
  "@media (max-width: 819px)": {
    width: "48%",
  },
})

const DesktopDrawerBox = styled(Box)({
  "@media (max-width: 1024px)": {
    display: "none",
  },
  display: "flex",
});

const MobileTabletDrawerBox = styled(Box)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const MainBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "calc(100vw - 200px)",
  },
});

const StyledIconButton = styled(IconButton)({
  "@media (min-width: 1025px)": {
    display: "none",
  },
});

const MainContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const webStyles = {
  root: `
    .customAutocomplete-root .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
      padding: 0;
      border-radius: 8px;
      border: 1px solid #011342;
      height: 48px;
    }

    .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child {
      padding-left: 16px;
    }

    .MuiInputLabel-outlined {
      transform: translate(14px, 12px) scale(1);
      color: #011342;
    }

    .customAutocomplete-root .MuiAutocomplete-input {
      padding: 8px 16px;
    }

    .customAutocomplete-root .MuiOutlinedInput-notchedOutline {
      border: none;
    }

    .MuiAutocomplete-listbox {
      padding: 0;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
    }

    .MuiAutocomplete-paper {
      border-radius: 8px;
    }

    .MuiAutocomplete-option {
      padding: 8px 16px;
      height: 48px;
    }
    
    .MuiAutocomplete-option:hover,
    .MuiAutocomplete-option[data-focus="true"],
    .MuiAutocomplete-option.Mui-focused {
      background-color: #0131a8;
      color: white;
    }
    
    .customAutocomplete-root .MuiInputLabel-shrink {
      display: none
    }
    
    .customAutocomplete-root .MuiFormLabel-asterisk {
      color: #FF0000; 
    }
    
  `,
};

const webStyle = {
  closeIcon: { width: "50px", height: "56px" },
  headingBox: { columnGap: "8px" },
  headingText: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.5%",
    color: "#011342",
  },
  bellIconShadow: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#FFF",
  },
  sectionTitles: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "18px",
    color: "#011342",
    lineHeight: "21.78px",
  },
  cardTitle: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "21px",
    color: "#011342",
  },
  veiwAll: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "22px",
    color: "#000000",
  },
  serviceDescription: {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "18px",
  },
  notaryName: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "22px",
    color: "#011342",
  },
  notaryPlace: {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "14.52px",
    color: "#64748B",    
  }
};
// Customizable Area End
