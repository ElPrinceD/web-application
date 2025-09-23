import React from 'react';
import { Box, Typography, Button, styled } from '@material-ui/core';

interface FooterProps {}

const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "10px 20px",
  alignItems: "center",
  justifyContent: "space-between",
  "& .MuiTypography-body1": {
    color: "#64748B",
    fontFamily: "Inter",
    lineHeight: "21px",
    fontSize: "14px",
    fontWeight: 500
  },
  "& .MuiButton-root": {
    color: "#64748B",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "21px",
    textTransform: "none",
    padding: "0px 10px",
    textDecoration: "underline"
  },
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
    alignItems: 'center', 
    '& .MuiTypography-body1': {
      width: '100%',
      textAlign: 'center',
      marginBottom: '10px',
    },
    '& .footerBtnBox': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center', 
      flexWrap: 'wrap', 
    },
    '& .MuiButton-root': {
      margin: '5px', 
    },
  },
  [theme.breakpoints.between(600, 743)]: {
    padding: '8px 15px',
  },
  [theme.breakpoints.between(744, 1023)]: {
    padding: '10px 20px',
  },
  [theme.breakpoints.between(1024, 1279)]: {
    padding: '12px 25px',
  },
  [theme.breakpoints.between(1280, 1919)]: {
    padding: '15px 30px',
  },
  [theme.breakpoints.up(1920)]: {
    padding: '20px 40px',
  },
}));

const currentYear = new Date().getFullYear();

const Footer: React.FC<FooterProps> = ( ) => {
  return (
    <FooterBox>
      <Typography variant="body1">&copy; renotary {currentYear}</Typography>
      <Box className="footerBtnBox">
        <Button 
          target="_blank" 
          href="/Termsandconditions" 
          data-testID="termsBtn"
        >
          Terms of service
        </Button>
        <Button 
          target="_blank" 
          href="/PrivacyPolicy" 
          data-testID="privacyBtn"
        >
          Privacy policy
        </Button>
      </Box>
    </FooterBox>
  );
};

export default Footer;