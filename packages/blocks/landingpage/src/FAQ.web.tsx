import React from "react";

// Customizable Area Start
import LandingPageController, { Props } from "./LandingPageController";
import { Box, Typography,styled,TextField} from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ExpandMore, Search } from "@material-ui/icons";
import Header from "../src/Header.web";
import { Footer } from "../../../components/src/Footer.web";

// Customizable Area End

export default class FAQ extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  SearchField = () => {
    return <SearchInput
    placeholder="Search"
    type="search"
    variant="outlined"
    className="faqSearch"
    fullWidth
    data-test-id="searchfield"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}
    onChange={this.handleSearchChange}
  />

 }
  capitalizeFirstLetter(text :any) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    const {expanded} = this.state
    // const acco = [
    //   { 
    //     Title: "What is notarization",
    //     Panel: "panel1",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   { 
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //     Panel: "panel2",
    //     Title: "What is notarization",
    //           },
    //   {
    //     Panel: "panel3",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //     Title: "What are online notarization legal and valid ?",

    //   },
    //   {
    //     Title: "What are online notarization legal and valid ?",
    //     Panel: "panel4",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel5",
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel6",
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel7",
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel8",
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },

    //   {
    //     Panel: "panel9",
    //     Title: "where are online notarization valid and enforceble ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel10",
    //     Title: "Where are online notarization valid and enforceble ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel11",
    //     Title: "Where are online notarization valid and enforceble ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel12",
    //     Title: "Where are online notarization valid and enforceble ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel13",
    //     Title: "Where are online notarization valid and enforceble ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel14",
    //     Title: "Where are online notarization valid and enforceble ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Panel: "panel15",
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    //   {
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //     Panel: "panel16",
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //   },
    //   {
    //     Panel: "panel17",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //   },
    //   {
        
    //     Title:
    //       "Can two and more signer get their signature notarised in a single meeting ?",
    //       Panel: "panel18",
    //     Detail:
    //       " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    //   },
    // ];
    const faqDatas=this.state.faqData ||[]
    const filteredFAQs = faqDatas.filter(faq => 
      faq.question.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );
    const FAQAccordions = () => {
      return <Box width={"100%"}>
    {filteredFAQs.map((accoItem,index) => (
      <SiteAccordianMain>
        <Accordion
        data-test-id="handleAccolist"
        expanded={expanded === index}
        key={index}
        onChange={this.handleAcco(index)}
        style={{  borderBottom: "1px solid #CBD5E1" ,boxShadow: "none", borderRadius:"0"}}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMore style={{fontWeight: 600, color: "#000000" }} />
          }
          id="panel1-header"
          aria-controls="panel1-content"
          style={{
          fontWeight:600,
          padding:"unset",
          fontSize: "18px",
          color: "#040919"
          }}
          

        >
          {accoItem.question}
        </AccordionSummary>
        <AccordionDetails
          style={{
            fontWeight: 400,
            color: "#011342",
            padding:"0px 0px 16px",
            font: "INTER"
          }}
        >
          {accoItem.answer}
        </AccordionDetails>
      </Accordion>
      </SiteAccordianMain>
            ))}
    </Box>
    }
    const title = this.state.faqTitle?.faq_title || ''; // Ensure faq_title is a string
    const capitalizedTitle = this.capitalizeFirstLetter(title);
    return (
      <>
      <Header navigation={this.props.navigation} id={""} />
      <div ref={this.state.topRef}></div>
        <DesktopBox>
          <Box style={{...webStyles.headingSearchBox, flexDirection: "column"}}>
            <Typography
              style={{...webStyles.heading,
                letterSpacing: "-0.56px",
                lineHeight: "57.6px",
                fontSize: "48px",
               }}
            >
            {capitalizedTitle}
            </Typography>
            <Box style={{width: "828px"}}>
            {this.SearchField()}
            </Box>
          </Box>
          {FAQAccordions()}
        </DesktopBox>

        <MobileBox>
        <Box style={{flexDirection: "column", ...webStyles.headingSearchBox }}>
            <Typography
              style={{...webStyles.heading,
                fontSize: "48px",
                lineHeight: "57.6px",
                letterSpacing: "-0.56px",
               }}
            >
              Frequently asked questions
            </Typography>
            <Box style={{width: "100%",maxWidth: "664px"}}>
            {this.SearchField()}
            </Box>
          </Box>
          {FAQAccordions()}
        </MobileBox>
        <Footer testID="FooteText" isChecked={false} />
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
// 
const SiteAccordianMain = styled(Box)({
  "& .MuiAccordion-root":{
    "&:before":{
      opacity:"0 !important",
    },
    "&.Mui-expanded":{
      "&:before":{
        opacity:"0 !important"
      }
    }
  }
})
const DesktopBox = styled(Box)({
  "@media (max-width: 1231px)": {
    display: "none",
  },
  marginTop: "162px",
  padding: "40px 80px",
  display: "flex",
  flexDirection: "column",
  rowGap: "40px"
});

const MobileBox = styled(Box)({
  "@media (min-width: 1232px)": {
    display: "none",
  },
  marginTop: "80px",
  padding: "0 3.5%",
  display: "flex",
  flexDirection: "column",
  rowGap: "32px"
});

const SearchInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#011342", // Text color
    borderRadius: "8px", // Border radius
    "& fieldset": {
      borderColor: "#011342", // Border color
    },
    "&:hover fieldset": {
      borderColor: "#011342", // Hover border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "#011342", // Focus border color
    },
    "&:focus-visible": {
      outline: "none", // Remove default focus outline
    },
  },
  "& .MuiInputBase-input": {
    color: "#011342", // Input text color
    "&::placeholder": {
      color: "#011342", // Placeholder text color
      opacity: 1, 
    },
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: "#012275", // Icon color
  },
});

const webStyles = {
  heading: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#040919",
  },
  headingSearchBox: {
    width: "100%",
    display:"flex",
    alignItems:"center",
    rowGap: "40px"
  }
}
// Customizable Area End
