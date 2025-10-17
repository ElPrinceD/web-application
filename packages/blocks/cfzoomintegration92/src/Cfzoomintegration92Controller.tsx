import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// import generateSignature from "./GenerateSignature"; // REMOVED: Using server-side generation for security
import { ZoomMtg } from "@zoom/meetingsdk";
import { getStorageData } from "../../../framework/src/Utilities";

// Zoom SDK CSS is loaded via CDN in index.html to avoid module resolution issues

/*
 * ZOOM SDK 4.0.7 INTEGRATION - CRITICAL REQUIREMENTS:
 * 
 * 1. DOMAIN WHITELISTING (CRITICAL):
 *    - Add your domain to Zoom Marketplace app allowlist
 *    - For development: https://localhost:3000
 *    - For production: your actual domain
 *    - Without this, you'll get Error Code 1
 * 
 * 2. CSP CONFIGURATION (CRITICAL):
 *    - Ensure CSP allows source.zoom.us
 *    - Include wasm-unsafe-eval for WebAssembly
 *    - Allow blob: for worker-src
 * 
 * 3. SDK EXECUTION ORDER (CRITICAL):
 *    - preLoadWasm() → prepareWebSDK() → init() → join()
 *    - Each step must complete before the next
 * 
 * 4. JWT SIGNATURE (CRITICAL):
 *    - Must contain appKey field (not sdkKey)
 *    - Must not be expired
 *    - Must match meeting number
 */
interface ValidResponseType {
  message: object;
  data: object;
  errors: string;
}
interface APIPayloadType {
  contentType?: string;
  method: string;
  endPoint: string;
  body?: object;
  token?: string;
  type?: string;
}
interface IProfile {
  data: IProfileData;
}
interface IProfileData {
  id: string;
  type: string;
  attributes: IProfileAttributes;
}
interface IProfileAttributes {
  id: number;
  first_name?: null;
  last_name?: null;
  full_phone_number: string;
  city?: null;
  post_code?: null;
  country_code?: null;
  phone_number?: null;
  email: string;
  activated: boolean;
  user_type: string;
  user_name?: null;
  platform?: null;
  suspend_until?: null;
  status: string;
  role_id: number;
  full_name: string;
  gender?: null;
  date_of_birth?: null;
  age?: null;
  country?: null;
  address?: null;
  address_line_2?: null;
  contact_name: string;
  company_name: string;
  photo: IProfilePhoto;
}
interface IProfilePhoto {
  url: string | null;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  sdkKey: string;
  sdkSecret: string;
  meetingNumber: string;
  passWord: string;
  signature: string; // Backend-provided signature
  signatureType: string; // Backend-provided signature type
  role: number;
  userName: string;
  userEmail: string;
  isSideBarOpen: boolean;
  modalOpen: boolean;
  userProfilePic: string | null;
  status: string;
  roleID:number;
  loader:boolean;
  notaryRequestId:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Cfzoomintegration92Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getProfileApiCallId: string = "";
  zoomCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      sdkKey: "",
      sdkSecret: "",
      meetingNumber: "",
      passWord: "",
      signature: "", // Backend-provided signature
      signatureType: "", // Backend-provided signature type
      role: 0,
      userName: "",
      userEmail: "",
      isSideBarOpen: false,
      modalOpen: false,
      userProfilePic: null,
      status: "",
      roleID:0,
      loader:false,
      notaryRequestId: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const webApiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let webResponseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (this.isValidResponse(webResponseJson)) {
        switch (webApiRequestCallId) {
          case this.getProfileApiCallId:
            this.setState({
              userName: webResponseJson.data.attributes.full_name,
              userEmail: webResponseJson.data.attributes.email,
            },this.getZoomApi);
            break;
          case this.zoomCallId:
        console.log('Backend response data:', webResponseJson.zoom_meetings);
        console.log('Meeting number from backend:', webResponseJson.zoom_meetings.meeting_number);
        console.log('Meeting ID from backend:', webResponseJson.zoom_meetings.meeting?.id);
        console.log('Signature from backend:', webResponseJson.zoom_meetings.signature);
        console.log('Signature type:', webResponseJson.zoom_meetings.signature_type || 'jwt');
        console.log('Meeting password from backend:', webResponseJson.zoom_meetings.meeting?.password);
        console.log('Password length:', webResponseJson.zoom_meetings.meeting?.password?.length);
        console.log('🔍 PASSWORD DEBUG: Backend provides:', webResponseJson.zoom_meetings.meeting?.password);
        console.log('🔍 PASSWORD DEBUG: Zoom expects: VeryRosie (from console)');
            
            this.setState({
              sdkSecret: webResponseJson.zoom_meetings.zoom_sdk_secret_key,
              sdkKey: webResponseJson.zoom_meetings.zoom_sdk_key,
              meetingNumber: webResponseJson.zoom_meetings.meeting_number.toString(), // Use meeting_number directly
              passWord: webResponseJson.zoom_meetings.meeting.password,
              signature: webResponseJson.zoom_meetings.signature, // Use existing backend signature
              loader:true,
            }, this.startZoomMeeting)
            break
        }
      }
    }
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    this.getProfile();
    const notaryRequestId = await getStorageData("notaryRequestId")
    this.setState({notaryRequestId:notaryRequestId});
  }

  async componentWillUnmount() {
    // Clean up Zoom if still active
    try {
      if ((window as any).ZoomMtg) {
        (window as any).ZoomMtg.leaveMeeting({});
      }
    } catch (err) {
      console.log("Cleanup error:", err);
    }
  }

  startZoomMeeting() {
    const fullUrl = window.location.href; 
    const baseUrl = new URL(fullUrl).origin;
    
    console.log('🚀 ZOOM SDK 4.0.7 INTEGRATION - Starting Meeting Flow');
    console.log('📍 Current Domain:', baseUrl);
    console.log('⚠️  IMPORTANT: Ensure this domain is whitelisted in Zoom Marketplace app settings');
    
    try {
      // Step 1: Validate SDK is loaded
      if (!(window as any).ZoomMtg) {
        console.error('❌ CRITICAL: Zoom SDK not loaded on window object');
        console.error('💡 Check: 1) SDK import 2) CSP allows source.zoom.us 3) Network connectivity');
        this.setState({ loader: false });
        return;
      }
      console.log('✅ Step 1: Zoom SDK found on window object');

      // Step 2: Validate SDK methods
      if (typeof (window as any).ZoomMtg.preLoadWasm !== 'function') {
        console.error('❌ CRITICAL: ZoomMtg.preLoadWasm is not a function');
        this.setState({ loader: false });
        return;
      }
      if (typeof (window as any).ZoomMtg.prepareWebSDK !== 'function') {
        console.error('❌ CRITICAL: ZoomMtg.prepareWebSDK is not a function');
        this.setState({ loader: false });
        return;
      }
      if (typeof (window as any).ZoomMtg.init !== 'function') {
        console.error('❌ CRITICAL: ZoomMtg.init is not a function');
        this.setState({ loader: false });
        return;
      }
      if (typeof (window as any).ZoomMtg.join !== 'function') {
        console.error('❌ CRITICAL: ZoomMtg.join is not a function');
        this.setState({ loader: false });
        return;
      }
      console.log('✅ Step 2: All required Zoom SDK methods available');

      // Step 3: Validate meeting parameters
      if (!this.state.sdkKey) {
        console.error('❌ CRITICAL: SDK Key is missing');
        this.setState({ loader: false });
        return;
      }
      if (!this.state.meetingNumber) {
        console.error('❌ CRITICAL: Meeting number is missing');
        this.setState({ loader: false });
        return;
      }
      if (!this.state.signature) {
        console.error('❌ CRITICAL: JWT signature is missing');
        this.setState({ loader: false });
        return;
      }
      console.log('✅ Step 3: Meeting parameters validated');

      // Step 4: Pre-load SDK assets (CRITICAL for SDK 4.0.7)
      console.log('🔄 Step 4: Pre-loading Zoom SDK assets...');
      try {
        ZoomMtg.preLoadWasm();
        console.log('✅ Step 4a: preLoadWasm() completed');
      } catch (error) {
        console.error('❌ Step 4a: preLoadWasm() failed:', error);
        this.setState({ loader: false });
        return;
      }

      try {
        ZoomMtg.prepareWebSDK();
        console.log('✅ Step 4b: prepareWebSDK() completed');
      } catch (error) {
        console.error('❌ Step 4b: prepareWebSDK() failed:', error);
        this.setState({ loader: false });
        return;
      }

      // Step 5: Show meeting container
      const zoomRoot = document.getElementById("zmmtg-root");
      if (zoomRoot) {
        zoomRoot.style.display = "block";
        console.log('✅ Step 5: Meeting container displayed');
      } else {
        console.warn('⚠️ Step 5: Meeting container not found');
      }
      
      // Step 6: Initialize Zoom SDK (CRITICAL - must complete before join)
      console.log('🔄 Step 6: Initializing Zoom SDK...');
      console.log('📋 Init Config:', {
        leaveUrl: `${baseUrl}/${this.state.notaryRequestId}`,
        patchJsMedia: true,
        leaveOnPageUnload: true
      });
      
      ZoomMtg.init({
        leaveUrl: `${baseUrl}/${this.state.notaryRequestId}`,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        success: (res: any) => {
          console.log('✅ Step 6: Zoom SDK initialized successfully:', res);
          console.log('🎯 Ready to join meeting - calling joinMeeting()');
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
          this.joinMeeting();
        },
        error: (err: any) => {
          console.error('❌ Step 6: Zoom SDK initialization failed:', err);
          console.error('💡 Common causes: 1) CSP restrictions 2) Domain not whitelisted 3) Network issues');
          this.setState({ loader: false });
        }
      });
    } catch (error) {
      console.error('❌ CRITICAL: Unexpected error in startZoomMeeting:', error);
      this.setState({ loader: false });
    }
  }
  
  // Signature is now provided by existing backend API response

  joinMeeting() {
    console.log('🎯 ZOOM SDK 4.0.7 - JOIN MEETING FLOW');
    
    try {
      // Step 1: Validate meeting number
      if (!this.state.meetingNumber || this.state.meetingNumber === '') {
        console.error('❌ CRITICAL: Meeting number is empty or invalid');
        this.setState({ loader: false });
        return;
      }
      
      // Ensure meeting number is a clean numeric string
      const cleanMeetingNumber = this.state.meetingNumber.replace(/\D/g, '');
      console.log('✅ Step 1: Meeting number validated');
      console.log('📋 Original meeting number:', this.state.meetingNumber);
      console.log('📋 Clean meeting number:', cleanMeetingNumber);
      
      // Step 2: Decode and analyze JWT signature
      if (this.state.signature && this.state.signature.includes('.')) {
        try {
          const parts = this.state.signature.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            console.log('✅ Step 2: JWT signature decoded successfully');
            console.log('🔍 JWT Payload Analysis:', {
              appKey: payload.appKey,
              sdkKey: payload.sdkKey,
              mn: payload.mn,
              role: payload.role,
              iat: new Date(payload.iat * 1000).toISOString(),
              exp: new Date(payload.exp * 1000).toISOString(),
              tokenExp: new Date(payload.tokenExp * 1000).toISOString(),
              video_webrtc_mode: payload.video_webrtc_mode
            });
            
            console.log('🔍 JWT Payload Keys:', Object.keys(payload));

            // Verify critical fields
            const now = Math.floor(Date.now() / 1000);
            const timeDiff = payload.iat - now;
            
            console.log('🔍 JWT Validation:', {
              appKeyMatch: payload.appKey === this.state.sdkKey,
              meetingNumberMatch: payload.mn.toString() === cleanMeetingNumber,
              roleCorrect: payload.role === 0,
              timeDifference: timeDiff + ' seconds',
              isExpired: payload.exp < now,
              timeUntilExpiry: payload.exp - now + ' seconds'
            });

            // Check for common issues
            if (payload.appKey !== this.state.sdkKey) {
              console.error('❌ JWT appKey mismatch!');
              console.error('Expected:', this.state.sdkKey);
              console.error('Got:', payload.appKey);
              
              // TEMPORARY WORKAROUND: Check if sdkKey exists and matches
              if (payload.sdkKey === this.state.sdkKey) {
                console.warn('⚠️ TEMPORARY WORKAROUND: Using sdkKey instead of appKey');
                console.warn('Backend needs to add appKey field to JWT payload');
              } else {
                console.error('❌ Both appKey and sdkKey mismatch!');
                console.error('Backend JWT payload is incorrect');
              }
            }

            if (payload.mn.toString() !== cleanMeetingNumber) {
              console.error('❌ JWT meeting number mismatch!');
              console.error('Expected:', cleanMeetingNumber);
              console.error('Got:', payload.mn);
            }

            if (Math.abs(timeDiff) > 300) {
              console.error('❌ JWT timestamp too far off!');
              console.error('Difference:', timeDiff, 'seconds');
            }

            if (payload.exp < now) {
              console.error('❌ JWT signature expired!');
              console.error('Expired at:', new Date(payload.exp * 1000).toISOString());
            }
          }
        } catch (error) {
          console.error('❌ Error decoding JWT:', error);
        }
      }

      // Step 3: Prepare join parameters (SDK 4.0.7 format)
      console.log('✅ Step 3: Preparing join parameters');
      console.log('📋 Using JWT signature from backend:', this.state.signature?.substring(0, 50) + '...');
      console.log('📋 Signature length:', this.state.signature?.length);
      
      const joinParams = {
        meetingNumber: cleanMeetingNumber,
        userName: this.state.userName,
        signature: this.state.signature,
        userEmail: this.state.userEmail,
        passWord: this.state.passWord  // Restored - password is needed
        // sdkKey removed - not needed in v4.0.0+ as per SDK warning
      };
      
      console.log('📋 Final join parameters:', {
        meetingNumber: joinParams.meetingNumber,
        userName: joinParams.userName,
        userEmail: joinParams.userEmail,
        hasPassword: !!joinParams.passWord,
        passwordValue: joinParams.passWord,
        passwordLength: joinParams.passWord?.length,
        signatureLength: joinParams.signature?.length
      });
      
      // Additional password validation
      if (!joinParams.passWord) {
        console.error('❌ CRITICAL: No password provided from backend');
        console.error('Backend response should include: webResponseJson.zoom_meetings.meeting.password');
        this.setState({ loader: false });
        return;
      }
      
      console.log('✅ Password validation passed:', {
        password: joinParams.passWord,
        length: joinParams.passWord.length,
        type: typeof joinParams.passWord
      });
      console.log('ℹ️ Note: sdkKey removed from join params as per v4.0.0+ requirements');
      
      // Step 4: Join the meeting
      console.log('🔄 Step 4: Calling ZoomMtg.join()...');
      console.log('🔍 PASSWORD DEBUG - Final check:');
      console.log('   Backend password:', this.state.passWord);
      console.log('   Password length:', this.state.passWord?.length);
      console.log('   Password type:', typeof this.state.passWord);
      console.log('⚠️  IMPORTANT: If this fails, check:');
      console.log('   1) Meeting is active and accessible');
      console.log('   2) Test direct URL: https://us05web.zoom.us/j/' + cleanMeetingNumber);
      console.log('   3) PMI meetings need to be started by host first');
      console.log('   4) Password format might be incorrect');
      console.log('   5) JWT signature is valid and not expired');
      
      ZoomMtg.join({
        ...joinParams,
        success: (res: any) => {
          console.log('🎉 SUCCESS: Meeting joined successfully!');
          console.log('📋 Join response:', res);
          console.log('✅ Zoom SDK 4.0.7 integration working correctly');
          
          // Set up meeting event listeners
          ZoomMtg.inMeetingServiceListener('onUserLeave', () => {
            console.log('👋 User left meeting');
          });
          
          ZoomMtg.inMeetingServiceListener('onMeetingStatus', (data: any) => {
            console.log('📊 Meeting status update:', data);
          });
        },
        error: (err: any) => {
          console.error('❌ CRITICAL: Zoom Meeting Join Failed');
          console.error('📋 Error Details:', {
            errorCode: err.errorCode,
            errorMessage: err.errorMessage,
            method: err.method,
            result: err.result,
            status: err.status,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            currentUrl: window.location.href,
            meetingConfig: {
              meetingNumber: cleanMeetingNumber,
              sdkKey: this.state.sdkKey,
              signatureLength: this.state.signature?.length,
              hasPassword: !!this.state.passWord
            }
          });
          
          // Enhanced error code analysis
          console.error('🔍 ERROR CODE ANALYSIS:');
          switch (err.errorCode) {
            case 1:
              console.error('❌ Error Code 1: "Fail to join the meeting"');
              console.error('💡 TROUBLESHOOTING STEPS:');
              console.error('   1. Verify meeting exists and is active');
              console.error('   2. Check domain is whitelisted in Zoom Marketplace');
              console.error('   3. Verify CSP allows source.zoom.us');
              console.error('   4. Test meeting URL directly: https://us05web.zoom.us/j/' + cleanMeetingNumber);
              console.error('   5. Check network connectivity');
              console.error('   6. Verify JWT signature is valid');
              break;
            case 2:
              console.error('❌ Error Code 2: "Invalid meeting number"');
              console.error('💡 Check meeting number format and validity');
              break;
            case 3:
              console.error('❌ Error Code 3: "Invalid join parameters"');
              console.error('💡 Check all required parameters are present');
              break;
            case 4:
              console.error('❌ Error Code 4: "Meeting is locked"');
              console.error('💡 Meeting host has locked the meeting');
              break;
            case 5:
              console.error('❌ Error Code 5: "Meeting is full"');
              console.error('💡 Meeting has reached participant limit');
              break;
            case 3705:
              console.error('❌ Error Code 3705: "The signature has expired"');
              console.error('💡 JWT signature is expired - backend needs to generate new signature');
              break;
            case 3706:
              console.error('❌ Error Code 3706: "The meeting number is wrong"');
              console.error('💡 Meeting number in JWT does not match join parameter');
              break;
            case 3707:
              console.error('❌ Error Code 3707: "Invalid password"');
              console.error('💡 Password mismatch - backend provides:', this.state.passWord);
              console.error('💡 Check if meeting password is correct in Zoom settings');
              break;
            case 3712:
              console.error('❌ Error Code 3712: "Signature is invalid"');
              console.error('💡 JWT signature validation failed - check appKey and secret');
              break;
            default:
              console.error(`❌ Unknown error code: ${err.errorCode}`);
              console.error('💡 Check Zoom SDK documentation for error code details');
          }
          
          this.setState({ loader: false });
        }
      });
    } catch (error) {
      console.error('❌ CRITICAL: Unexpected error in joinMeeting:', error);
      this.setState({ loader: false });
    }
  }
  

  getProfile = async () => {
    let Usertoken = await getStorageData("token");
    const header = {
      "Content-Type": configJSON.getProfileContentType,
      token: Usertoken,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProfileApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProfileApiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getProfileApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  isValidResponse = (responseJson: ValidResponseType) =>
    responseJson && !responseJson.errors;

  apiCall = async (apiData: APIPayloadType) => {
    const { contentType, method, endPoint, body, type } = apiData;
    let token = await getStorageData("token");
    const header = {
      "Content-Type": contentType,
      token: token,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    body && type !== "formData"
      ? requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      : requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  };
  getZoomApi = async () => {
    const notaryRequestID = await getStorageData("notaryRequestId");
    this.setState({ loader: !this.state.isSideBarOpen });
    this.zoomCallId = await this.apiCall({
      method: configJSON.validationApiMethodType,
      contentType: configJSON.validationApiContentType,
      endPoint: configJSON.zoomEndPoint + notaryRequestID
    });
  }
  openSideBar = () =>
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen });

  navigateToDashboard = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "Dashboard");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  navigateToRequestManagement = () =>{
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), "RequestManagement");
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  navigateBack = () => {
    const previousPage = sessionStorage.getItem('previousPage');

    if (previousPage === '/Dashboard') {
      this.navigateToDashboard();
    } else if (previousPage === '/RequestManagement') {
      this.navigateToRequestManagement();
    } else {
      this.navigateToDashboard();
    }
    sessionStorage.removeItem('previousPage');
  };


  setBookNowModal = (value: boolean) => this.setState({ modalOpen: value });

  isRoleId2 = () => this.state.roleID === 2;
  findMainBoxWidth = () =>
    this.state.isSideBarOpen ? "calc(100vw - 200px)" : "100vw";

  // Customizable Area End
}
