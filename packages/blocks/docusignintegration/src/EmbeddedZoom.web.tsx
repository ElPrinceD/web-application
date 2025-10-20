import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, Typography, styled } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";

interface EmbeddedZoomProps {
  sdkKey: string;
  signature: string;
  meetingNumber: string;
  password: string;
  userName: string;
  userEmail: string;
  onClose?: () => void;
}

const EmbeddedZoom: React.FC<EmbeddedZoomProps> = ({
  sdkKey,
  signature,
  meetingNumber,
  password,
  userName,
  userEmail,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    console.log("🚀 ZOOM EMBEDDED SDK - Initializing...");
    console.log("Meeting params:", {
      sdkKey,
      meetingNumber,
      userName,
      userEmail,
      hasSignature: !!signature,
      hasPassword: !!password,
    });

    const initializeZoom = async () => {
      try {
        // Small delay to ensure DocuSign iframe is fully loaded
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!clientRef.current) {
          clientRef.current = ZoomMtgEmbedded.createClient();
        }

        const root = document.getElementById("meetingSDKElement");
        if (!root) throw new Error("Embedded Zoom root '#meetingSDKElement' not found");

        console.log("✅ Zoom containers ready, initializing embedded client...");

        // Calculate initial view size based on the container
        const containerEl = root.closest('.zoomPanel') as HTMLElement || root.parentElement as HTMLElement || root as HTMLElement;
        const rect = containerEl.getBoundingClientRect();

        // Hard constraints to keep Zoom fully sandboxed
        injectScopedZoomCss();
        unlockGlobalScroll();

        await clientRef.current.init({
          zoomAppRoot: root,
          language: "en-US",
          viewSize: {
            width: Math.floor((root as HTMLElement).offsetWidth || rect.width),
            height: Math.floor((root as HTMLElement).offsetHeight || rect.height),
          },
          customize: {
            meetingInfo: ["topic", "host", "mn", "pwd", "telPwd", "participant", "dc", "enctype"],
            toolbar: { buttons: [] },
            // Prevent SDK from injecting global CSS and CORP style that may affect the whole page
            disableCORP: true,
            isResizable: true,
          }
        });

        console.log("✅ Embedded client initialized, joining meeting...");

        await clientRef.current.join({
          signature,
          meetingNumber: String(meetingNumber).replace(/\D/g, ""),
          password,
          userName: userName || "Guest",
          userEmail
        });

        console.log("🎉 Successfully joined Zoom meeting (embedded)!");
        setIsLoading(false);

        // Ensure Zoom app stays within the local container even if SDK re-parents it
        try {
          setTimeout(() => {
            const rootEl = document.getElementById("meetingSDKElement");
            const reactZoomApp = document.getElementById("react-zoom-app");
            const zmmtgRoot = document.getElementById("zmmtg-root");
            if (rootEl) {
              if (reactZoomApp && reactZoomApp.parentElement !== rootEl) {
                rootEl.appendChild(reactZoomApp);
              }
              if (zmmtgRoot && zmmtgRoot.parentElement !== rootEl) {
                rootEl.appendChild(zmmtgRoot);
              }
            }
            
            // Ensure DocuSign iframe is still functional and content is visible
            const docusignIframe = document.getElementById("docusign-iframe");
            if (docusignIframe) {
              docusignIframe.style.pointerEvents = "auto";
              docusignIframe.style.zIndex = "2";
              docusignIframe.style.display = "block";
              docusignIframe.style.visibility = "visible";
              docusignIframe.style.opacity = "1";
              console.log("✅ DocuSign iframe protected and functional");
              
              // Start continuous monitoring of iframe content
              const monitorIframe = () => {
                try {
                  const iframe = docusignIframe as HTMLIFrameElement;
                  if (iframe && iframe.contentDocument) {
                    const body = iframe.contentDocument.body;
                    if (!body || body.innerHTML.trim() === '') {
                      console.log("🔄 DocuSign iframe content is blank, reloading...");
                      const currentSrc = iframe.src;
                      if (currentSrc) {
                        iframe.src = '';
                        setTimeout(() => {
                          iframe.src = currentSrc;
                        }, 100);
                      }
                    }
                  }
                } catch (e) {
                  // Cross-origin access denied, which is normal
                }
              };
              
              // Monitor every 2 seconds
              const intervalId = setInterval(monitorIframe, 2000);
              
              // Clean up interval when component unmounts
              setTimeout(() => {
                clearInterval(intervalId);
              }, 30000); // Stop monitoring after 30 seconds
            }
          }, 0);
        } catch {}

        // Observe size changes on the container to keep Zoom within bounds
        setupResizeHandling(containerEl);
        // Dispatch a resize so Zoom recalculates layout
        safeDispatchResize();
      } catch (err: any) {
        console.error("❌ Zoom initialization error:", err);
        setError(err.message || "Failed to initialize Zoom meeting");
        setIsLoading(false);
      }
    };

    // Only initialize if we have required data
    if (sdkKey && signature && meetingNumber) {
      initializeZoom();
    } else {
      console.error("❌ Missing required Zoom parameters");
      setError("Missing meeting information");
      setIsLoading(false);
    }

    // Cleanup on unmount
    return () => {
      try {
        if (clientRef.current) {
          clientRef.current.leave();
          console.log("✅ Left Zoom meeting (embedded)");
        }
      } catch (err) {
        console.error("Error leaving meeting:", err);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
      // Restore any potential global scroll locks from SDK
      unlockGlobalScroll();
    };
  }, [sdkKey, signature, meetingNumber, password, userName, userEmail]);

  const injectScopedZoomCss = () => {
    // Ensure a single style tag is injected
    const styleId = "embedded-zoom-scoped-styles";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
#meetingSDKElement,
#zmmtg-root,
#react-zoom-app {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 1 !important;
}
html, body {
  overflow: auto !important;
  height: auto !important;
}
/* Prevent SDK from forcing fixed/fullscreen layouts */
#zmmtg-root, #react-zoom-app {
  inset: auto !important;
}
/* Protect DocuSign iframe from Zoom interference */
#docusign-iframe {
  position: relative !important;
  z-index: 2 !important;
  pointer-events: auto !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  width: 100% !important;
  height: 100% !important;
}
.docusignPanel {
  z-index: 2 !important;
  position: relative !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
/* Ensure iframe content is not hidden by any overlay */
.docusignPanel iframe {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
`;
    document.head.appendChild(style);

    // Mutation observer to re-assert styles if Zoom tries to override them after join
    try {
      const reassert = () => {
        const html = document.documentElement as HTMLElement;
        const body = document.body as HTMLElement;
        if (html) html.style.overflow = "auto";
        if (body) {
          body.style.overflow = "auto";
          if (body.style.position === "fixed") body.style.position = "static";
        }
        
        // Protect DocuSign iframe and ensure content is visible
        const docusignIframe = document.getElementById("docusign-iframe");
        const docusignPanel = document.querySelector(".docusignPanel");
        if (docusignIframe) {
          docusignIframe.style.position = "relative";
          docusignIframe.style.zIndex = "2";
          docusignIframe.style.pointerEvents = "auto";
          docusignIframe.style.display = "block";
          docusignIframe.style.visibility = "visible";
          docusignIframe.style.opacity = "1";
          docusignIframe.style.width = "100%";
          docusignIframe.style.height = "100%";
          // Force iframe to reload content if it's blank
          const iframe = docusignIframe as HTMLIFrameElement;
          if (!iframe.contentDocument || iframe.contentDocument.body.innerHTML.trim() === '') {
            const currentSrc = iframe.src;
            if (currentSrc) {
              iframe.src = '';
              setTimeout(() => {
                iframe.src = currentSrc;
              }, 100);
            }
          }
        }
        if (docusignPanel) {
          (docusignPanel as HTMLElement).style.zIndex = "2";
          (docusignPanel as HTMLElement).style.position = "relative";
          (docusignPanel as HTMLElement).style.display = "block";
          (docusignPanel as HTMLElement).style.visibility = "visible";
          (docusignPanel as HTMLElement).style.opacity = "1";
        }
        
        // Constrain Zoom elements
        const zmRoot = document.getElementById("zmmtg-root");
        const reactApp = document.getElementById("react-zoom-app");
        [zmRoot, reactApp].forEach((el) => {
          if (el) {
            const style = (el as HTMLElement).style;
            if (style.position === "fixed" || style.position === "absolute") {
              style.position = "relative";
            }
            style.zIndex = "1";
            style.top = "0";
            style.left = "0";
            style.width = "100%";
            style.height = "100%";
          }
        });
      };

      const mo = new MutationObserver(() => reassert());
      mo.observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["style", "class"]
      });
      mutationObserverRef.current = mo;
      // initial reassert
      reassert();
    } catch {}
  };

  const unlockGlobalScroll = () => {
    try {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    } catch {}
  };

  const safeDispatchResize = () => {
    try {
      window.dispatchEvent(new Event("resize"));
    } catch {}
  };

  const setupResizeHandling = (containerEl: HTMLElement) => {
    try {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const cr = entry.contentRect;
        // Update Zoom view size if supported, otherwise trigger a window resize
        try {
          if (clientRef.current && typeof clientRef.current.setViewSize === "function") {
            clientRef.current.setViewSize({ width: Math.floor(cr.width), height: Math.floor(cr.height) });
          } else {
            safeDispatchResize();
          }
        } catch {
          safeDispatchResize();
        }
      });
      ro.observe(containerEl);
      resizeObserverRef.current = ro;
    } catch {
      // Fallback to window resize listener
      const onResize = () => safeDispatchResize();
      window.addEventListener("resize", onResize);
    }
  };

  return (
    <ZoomPanelContainer>
      {/* Header with close button */}
      <ZoomPanelHeader>
        <Typography variant="h6" style={{ fontWeight: 600, color: "#1f2937" }}>
          Video Meeting
        </Typography>
        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            style={{ color: "#6b7280" }}
          >
            <Close />
          </IconButton>
        )}
      </ZoomPanelHeader>

      {/* Zoom container */}
      <ZoomContainerWrapper>
        {isLoading && (
          <LoadingOverlay>
            <Typography variant="body1" style={{ color: "#6b7280" }}>
              Loading meeting...
            </Typography>
          </LoadingOverlay>
        )}
        {error && (
          <ErrorOverlay>
            <Typography variant="body1" style={{ color: "#dc2626" }}>
              {error}
            </Typography>
          </ErrorOverlay>
        )}
        <div id="zoom-container" style={{ width: "100%", height: "100%" }}>
          <div id="zoom-meeting-container">
            <div id="meetingSDKElement" style={{ width: "100%", height: "100%" }}></div>
          </div>
        </div>
      </ZoomContainerWrapper>
    </ZoomPanelContainer>
  );
};

// Styled components
const ZoomPanelContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  backgroundColor: "#f5f5f5",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
});

const ZoomPanelHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  borderBottom: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
});

const ZoomContainerWrapper = styled(Box)({
  flex: 1,
  position: "relative",
  overflow: "hidden",
  "& #zoom-container": {
    width: "100%",
    height: "100%",
  },
});

const LoadingOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  zIndex: 10,
});

const ErrorOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  zIndex: 10,
  padding: "20px",
  textAlign: "center",
});

export default EmbeddedZoom;

