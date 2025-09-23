import React from "react";
import { Box } from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

export default function TabPanel (props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{width: '72%'}}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }