// Customizable Area Start
import React from "react";
import DocumentListController, { Props } from "./DocumentListController";
import { Typography, Box, IconButton, Button, styled } from "@material-ui/core";
import { DescriptionOutlined, VisibilityOutlined } from "@material-ui/icons";
import { verified } from "./assets";
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Loader from "../../../components/src/Loader.web";
// Customizable Area End

export default class DocumentList extends DocumentListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <div data-testID="documentListPage">

        
        <Loader loading={this.state.loader} />
        {this.isEndUser() && !this.state.hasDocusignStartedForEven1Document && (
          <>
            <Typography style={webStyle.tabTitle}>
              Document Signing Request
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ rowGap: "14px" }}
              alignItems={"center"}
            >
              <Box p={"16px"}>
                <img src={verified} />
              </Box>
              <Typography style={webStyle.tabTitle}>
                No Document Signing request
              </Typography>
            </Box>
          </>
        )}
        

        {this.areDocumentsShown() && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            style={{ gap: "24px" }}
          >
            <Box>
              <Typography style={webStyle.docuSignHeading}>
                Document Signing Status
              </Typography>
              <Typography style={webStyle.docuSignSubHeading}>
                The status of documents sent for sign
              </Typography>
            </Box>
            {this.state.documentDetails && Array.isArray(this.state.documentDetails) && this.state.documentDetails.length > 0 ? (
              this.state.documentDetails.map(
                (document, documentIndex) =>
                  this.isThisDocumentShown(document.is_docusign_start) && (
                    <Box
                      key={`document-${document.document_id || documentIndex}`}
                      p={"12px"}
                      display={"flex"}
                      flexDirection={"column"}
                      style={{
                        borderRadius: "16px",
                        gap: "12px",
                        backgroundColor: "#F5F9FF",
                      }}
                    >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography style={webStyle.docIndexTypography}>
                        Document #{documentIndex + 1}
                      </Typography>
                      
                      {this.isStartOrSignNowButtonShown(document) && (
                        <Button
                          style={{
                            borderRadius: "8px",
                            padding: "10px 16px",
                            width: "120px",
                            height: "44px",
                            backgroundColor: "#012275",
                          }}
                          data-testID="startOrSignNowButton"
                          onClick={() =>
                            this.handleStartOrSignNowButtonClick(document)
                          }
                        >
                          <Typography
                            style={{
                              ...webStyle.buttonTypography,
                              color: "#FFF",
                            }}
                          >
                            {this.isStartOrSignNow(document.is_docusign_start)}
                          </Typography>
                        </Button>
                      )}
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      p={"8px"}
                      style={{
                        backgroundColor: "#FFF",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <Box display={"flex"} style={{ gap: "8px" }}>
                        <Box style={webStyle.documentIconBox}>
                          <DescriptionOutlined style={webStyle.documentIcon} />
                        </Box>
                        <Box
                          display={"flex"}
                          flexDirection="column"
                          style={{ gap: "4px" }}
                        >
                          <Typography style={webStyle.documentName}>
                            {document.file_name}
                          </Typography>
                          <Typography style={webStyle.documentSignatories}>
                            {this.findSignatories(document.signatory.length)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display={"flex"}>
                        <IconButton
                          style={{ padding: "10px" }}
                          data-testID="viewButton"
                          onClick={() => {
                            this.navigateToDocumentOpener(
                              document.document_url
                            );
                          }}
                        >
                          <VisibilityOutlined
                            style={{
                              color: "#012275",
                              height: "24px",
                              width: "24px",
                            }}
                          />
                        </IconButton>
                        <IconButton
                          style={{ padding: "10px" }}
                          data-testID="downloadButton"
                          onClick={() => {
                            this.handleDownload(
                              document.document_url,
                              document.file_name
                            );
                          }}
                        >
                          <GetAppOutlinedIcon
                            style={{
                              color: "#012275",
                              height: "24px",
                              width: "24px",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box
                      p={"12px 5px"}
                      borderRadius={"8px"}
                      display={"flex"}
                      bgcolor={"#FFF"}
                      flexDirection={"column"}
                      style={{ gap: "12px" }}
                    >
                      <Typography style={webStyle.signatoriesNotaryText}>
                        Signatories
                      </Typography>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        style={{ gap: "12px" }}
                      >
                        {document.signatory && Array.isArray(document.signatory) ? (
                          document.signatory.map(
                            (signatory, signatoryIndex) =>
                              signatory.is_signatory && (
                                <Box
                                  key={`signatory-${signatoryIndex}`}
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                >
                                  <Box display={"flex"} style={{ gap: "8px" }}>
                                    
                                    <Box>
                                      <Typography style={webStyle.signatoryName}>
                                        {signatory.name}
                                      </Typography>
                                      <Typography style={webStyle.signatoryEmail}>
                                        {signatory.email}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <SignStatusBox>
                                    <Typography
                                      className={`${this.isSignedOrPending(
                                        signatory.signed
                                      )} statusBox`}
                                    >
                                      {this.isSignedOrPending(signatory.signed)}
                                    </Typography>
                                  </SignStatusBox>
                                </Box>
                              )
                          )
                        ) : (
                          <Typography variant="body2" style={{ color: "#6b7280" }}>
                            No signatories found
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box
                      p={"12px 5px"}
                      borderRadius={"8px"}
                      display={"flex"}
                      bgcolor={"#FFF"}
                      flexDirection={"column"}
                      style={{ gap: "12px" }}
                    >
                      <Typography style={webStyle.signatoriesNotaryText}>
                        Notary
                      </Typography>
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Box display={"flex"} style={{ gap: "8px" }}>
                          <Box>
                            <Typography style={webStyle.signatoryName}>
                              {document.notary && document.notary[0] ? document.notary[0].name : "Notary"}
                            </Typography>
                            <Typography style={webStyle.signatoryEmail}>
                              {document.notary && document.notary[0] ? document.notary[0].email : "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                        <SignStatusBox>
                          <Typography
                            className={`${
                              document.notary && document.notary[0] && document.notary[0].signed ? "signed" : "pending"
                            } statusBox`}
                          >
                            {document.notary && document.notary[0] && document.notary[0].signed ? "SIGNED" : "PENDING"}
                          </Typography>
                        </SignStatusBox>
                      </Box>
                    </Box>
                  </Box>
                )
              )
            ) : (
              <Box p={3} style={{ textAlign: "center", backgroundColor: "#F5F9FF", borderRadius: "16px" }}>
                <Typography variant="body2" style={{ color: "#6b7280" }}>
                  {this.state.loader 
                    ? "Loading document status..." 
                    : "No documents found. Documents will appear here once DocuSign signing is started."}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const SignStatusBox = styled(Box)({
  "& .statusBox": {
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    fontFamily: "INTER",
    fontSize: "12px",
    fontWeight: 700,
  },
  "& .SIGNED": {
    background: "#D1FAE5",
    color: "#059669",
  },
  "& .PENDING": {
    background: "#FEF3C7",
    color: "#F59E0B",
  },
});

const docuSignMainContainer = styled(Box)({
  "& .statusBox": {
    borderRadius: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 8px",
    fontFamily: "INTER",
    fontSize: "12px",
    fontWeight: 700,
  },
});

const webStyle = {
  signatoryName: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 500,
    color: "#000",
  },
  signatoryEmail: {
    fontFamily: "Inter",
    fontSize: "12px",
    fontWeight: 400,
    color: "#000",
  },
  signatoriesNotaryText: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "12px",
    color: "#334155",
  },
  docIndexTypography: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: "14px",
    color: "#334155",
  },
  docuSignHeading: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 600,
    color: "#011342",
  },
  docuSignSubHeading: {
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: 400,
    color: "#334155",
  },
  documentIconBox: {
    width: "42px",
    height: "43px",
    borderRadius: "4px",
    backgroundColor: "#0131A8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  documentIcon: {
    color: "#FFF",
    height: "24px",
    width: "24px",
  },
  tabTitle: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: 600,
    color: "#011342",
  },
  documentName: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    color: "#011342",
  },
  documentSignatories: {
    fontWeight: 500,
    fontFamily: "Inter",
    fontSize: "12px",
    lineHeight: "14.52px",
    color: "#011342",
  },
  buttonTypography: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "24px",
  },
};
// Customizable Area End
