import React from "react";

// Customizable Area Start
import { Box, IconButton, Typography, Button, CircularProgress } from "@material-ui/core";
import { createTheme, styled, ThemeProvider } from "@material-ui/core/styles";
import NavigationMenu from "../../navigationmenu/src/NavigationMenu.web";
import Loader from "../../../components/src/Loader.web";
import MiniHeader from "../../dashboard/src/MiniHeader.web";
import { ArrowBackIosRounded } from "@material-ui/icons";
import CustomFooter from "../../../components/src/CustomFooter.web";
// Customizable Area End

import DocumentOpenerController, {
  Props,
  configJSON,
} from "./DocumentOpenerController.web";

export default class DocumentOpener extends DocumentOpenerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => {
    return (
      <Box display={"flex"} alignItems={"center"} mt={"32px"}>
        <Box width={"100%"}>
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
              style={{ columnGap: "8px" }}
            >
              <IconButton
                data-testID="backIconButton"
                onClick={this.navigateBack}
              >
                <ArrowBackIosRounded height={"24px"} width={"24px"} />
              </IconButton>
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "-0.5%",
                }}
              >
                {this.state.docUrl
                  ? this.state.docUrl
                      .split("/")
                      .pop()
                      ?.split(".")
                      .slice(0, -1)
                      .join(".") || "Document"
                  : "Document"}
              </Typography>
            </Box>
            <MiniHeader navigation={this.props.navigation} id={""} />
          </Box>
        </Box>
      </Box>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Loader loading={this.state.loader} />
        <Box display={"flex"} className="test1">
          <NavigationMenu navigation={this.props.navigation} id={""} />
          <MainBox
            height={"100vh"}
            overflow={"auto"}
            width={"100vw"}
            style={{ backgroundColor: "#F9F9F9" }}
          >
            {this.Header()}
            <Box height={"calc(100% - 191px)"} my={"32px"} mx={"27px"}>
              {/* ✅ ERROR STATE: Show user-friendly error message */}
              {this.state.type === "error" || (!this.state.docUrl && !this.state.loader) ? (
                <Box 
                  display="flex" 
                  flexDirection="column"
                  justifyContent="center" 
                  alignItems="center" 
                  height="100%"
                  padding={3}
                >
                  <Typography variant="h6" color="error" gutterBottom>
                    Unable to Load Document
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" gutterBottom style={{ marginBottom: 16 }}>
                    The document URL is missing or invalid. Please try:
                  </Typography>
                  <Box display="flex" style={{ gap: 16 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={this.navigateBack}
                    >
                      Go Back
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => window.location.reload()}
                      style={{ marginLeft: 8 }}
                    >
                      Refresh Page
                    </Button>
                  </Box>
                </Box>
              ) : this.state.loader ? (
                /* Loading State */
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                  <Typography variant="body1" style={{ marginTop: 16 }}>
                    Loading document...
                  </Typography>
                </Box>
              ) : (
                <>
                  {/* Image Documents */}
                  {this.state.type === "img" && (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                      <img
                        src={this.state.docUrl}
                        alt="Document"
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        onError={() => {
                          console.error("❌ Failed to load image:", this.state.docUrl);
                          this.setState({ type: "error" });
                        }}
                      />
                    </Box>
                  )}
                  {/* PDF Documents */}
                  {this.state.type === "pdf" && (
                    <Box height="100%" display="flex" flexDirection="column">
                      {process.env.NODE_ENV === "development" && (
                        <Box style={{ marginBottom: 8, padding: 8, backgroundColor: "#f0f0f0", borderRadius: 4 }}>
                          <Typography variant="body2" style={{ fontSize: "12px", marginBottom: 4 }}>
                            📄 PDF: {this.state.docUrl.split("/").pop()}
                          </Typography>
                          {this.state.blobUrl && (
                            <Typography variant="caption" style={{ fontSize: "10px", color: "#4caf50" }}>
                              ✅ Using authenticated blob URL
                            </Typography>
                          )}
                          {this.state.loadError && (
                            <Typography variant="caption" style={{ fontSize: "10px", color: "#f44336" }}>
                              ⚠️ Load error - trying direct URL
                            </Typography>
                          )}
                        </Box>
                      )}
                      {/* Use blob URL if available (authenticated), otherwise use direct URL */}
                      <iframe
                        src={this.state.blobUrl || this.state.docUrl}
                        width="100%"
                        height={process.env.NODE_ENV === "development" ? "calc(100% - 50px)" : "100%"}
                        style={{ 
                          border: "none",
                          flex: 1,
                          minHeight: 0,
                          display: "block"
                        }}
                        title="Document Viewer"
                        onLoad={() => {
                          console.log("✅ [DocumentOpener] PDF iframe loaded successfully:", {
                            url: this.state.blobUrl || this.state.docUrl,
                            usingBlob: !!this.state.blobUrl
                          });
                        }}
                        onError={(e) => {
                          console.error("❌ [DocumentOpener] Failed to load PDF iframe:", {
                            url: this.state.blobUrl || this.state.docUrl,
                            usingBlob: !!this.state.blobUrl,
                            error: e
                          });
                          // If blob URL failed and we haven't tried direct URL yet, try it
                          if (this.state.blobUrl && !this.state.loadError) {
                            console.log("🔄 [DocumentOpener] Blob URL failed, trying direct URL...");
                            this.setState({ blobUrl: "", loadError: true });
                          } else {
                            this.setState({ type: "error" });
                          }
                        }}
                      />
                      {/* Fallback: Object tag for better PDF rendering */}
                      {this.state.loadError && !this.state.blobUrl && (
                        <Box height="100%" width="100%" style={{ display: "none" }}>
                          <object
                            data={this.state.docUrl}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                          >
                            <Typography variant="body2" color="error">
                              Unable to display PDF. <a href={this.state.docUrl} target="_blank" rel="noopener noreferrer">Click here to download</a>
                            </Typography>
                          </object>
                        </Box>
                      )}
                    </Box>
                  )}
                  {/* Word Documents */}
                  {this.state.type === "doc" && (
                    <Box 
                      display="flex" 
                      flexDirection="column"
                      justifyContent="center" 
                      alignItems="center" 
                      height="100%"
                      padding={3}
                    >
                      <Typography variant="h6" gutterBottom>
                        Word Document
                      </Typography>
                      <Typography variant="body2" color="textSecondary" style={{ marginBottom: 16 }}>
                        Word documents cannot be displayed inline. Please download to view.
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => window.open(this.state.docUrl, "_blank")}
                      >
                        Download Document
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
            <CustomFooter />
          </MainBox>
        </Box>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Inter",
    },
  },
});

const MainBox = styled(Box)({
  "@media (min-width: 1025px)": {
    width: "calc(100vw - 200px)",
  },
});
// Customizable Area End
