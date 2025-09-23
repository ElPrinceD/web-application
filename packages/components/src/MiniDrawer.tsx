import React, { Component } from 'react';
import { Box, Typography } from '@material-ui/core';
import { styled } from "@material-ui/core/styles";
interface Props {
  services?: Array<DataItem>;
  logoImg?: string;
  supports?: Array<DataItem>;
  datatestid?: string;
  logOutNvigation?: () => void;
  handleNavigation?: (value: string) => void;
}
interface MiniDrawerProps {
}

interface DataItem{
  image: string;
  title: string;
}

interface S {
  // Customizable Area Start
  // Customizable Area End
}
export default class MiniDrawer extends Component<Props, S, MiniDrawerProps> {
  // class MiniDrawer extends Component<MiniDrawerProps> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { services, logoImg, supports, logOutNvigation, handleNavigation } = this.props;

    return (
      <>
       <SideBox>
        <Box className="logoBox">
          <img src={logoImg} alt="" width={"100%"} height="100%" />
        </Box>
        <Box className="serviceSection">
            {services?.map((service, index) => (<Box key={index} className="services" onClick={() => { if (handleNavigation) { handleNavigation(service?.title) } }}>
              <img src={service.image} />
              <Typography>{service.title}</Typography>
            </Box>))}
        </Box>
        <Box className="supportSection">
            {supports?.map((support, index) => (<Box key={index} className="services" onClick={logOutNvigation} >
              <img src={support.image} />
              <Typography>{support.title}</Typography>
            </Box>))}
        </Box>
      </SideBox>
      
      </>
    );
  }
}

const SideBox = styled(Box)({
  padding: "44px 25px",
  boxSizing: "border-box",
  display: "flex",
  postion: "fixed",
  height: "100vh",
  align: "center",
  gap: "50px",
  flexDirection: "column",
  width: "200px",
  backgroundColor: "#012275",
  borderRadius: "0px 24px 24px 0px",
  "& .logoBox": {
    width: "160px",
    height: "50px"
  },
  "& .serviceSection": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& .MuiTypography-body1": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "white"
    },
  },
  "& .supportSection": {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    "& .MuiTypography-body1": {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "Inter",
      color: "white",
    },
  },
  "& .services": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  }
});

// export default MiniDrawer;
