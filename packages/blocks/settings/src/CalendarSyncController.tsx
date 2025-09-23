import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";
import { gapi, loadAuth2, loadGapiInsideDOM } from "gapi-script";
import { Message } from "../../../framework/src/Message";
import { OutlookAuthProvider } from "../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../components/src/GoogleAuthProvider.web";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    loader: boolean;
    handleGoogleUi: boolean
    handleOutlookUi: boolean
    googleSynced: boolean;
    outlookSynced: boolean;
    googleAuthToken: string;
    googleAuthDetails: any;
    outlookAuthToken: string;
    outlookAuthDetails: any;
    outlookUserProfile: any;
    token: string;
    googleRefreshAuthToken: string;
    outlookRefreshAuthToken: string;
    skipNextApiCall: boolean;  
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class CalendarSyncController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getGoogleAuthUserInfoApiCallId: string = "";
    getOutLookInfoApiCallId: string = "";
    updateCalendarTokenApiCallId: string = "";
    removeCalendarTokenApiCallId: string = "";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            // Customizable Area End
        ];

        this.state = {
            // Customizable Area Start
            loader: false,
            handleGoogleUi: false,
            handleOutlookUi: false,
            googleSynced: false,
            outlookSynced: false,
            googleAuthDetails: null,
            googleAuthToken: "",
            outlookAuthDetails: null,
            outlookAuthToken: "",
            outlookUserProfile: null,
            token: "",
            googleRefreshAuthToken: "",
            outlookRefreshAuthToken: "",
            skipNextApiCall: false,
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const webApiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            let webResponseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (webApiRequestCallId === this.getGoogleAuthUserInfoApiCallId) {
                this.handleGoogleAuthUserDetailsApiRes(webResponseJson)
            }

            if (webApiRequestCallId === this.getOutLookInfoApiCallId) {
                this.handleOutLookDetailsApiRes(webResponseJson)
            }

            if (webApiRequestCallId === this.updateCalendarTokenApiCallId) {
                this.handleUpdateCalendarTokenApiRes(webResponseJson)
            }

            if (webApiRequestCallId === this.removeCalendarTokenApiCallId) {
                this.handleRemoveCalendarTokenApiRes(webResponseJson)
            }
        }
    }

    async componentDidMount() {
        super.componentDidMount();

        let token = await getStorageData("token");
        this.setToken(token);

        const googleAuth = await getStorageData("refresh_google_auth");
        const outLookToken = await getStorageData("ms_refreshToken")
        this.setGoogleAuth(googleAuth);
        this.setOutlookAuth(outLookToken)
    }    

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<S>) {        
        if(prevState.googleSynced !== this.state.googleSynced) {
            if(this.state.skipNextApiCall && this.state.googleSynced!== null) {
                this.updateCalendarTokenApiCall('google');
                this.setState({ skipNextApiCall: false });
            }
        }
                    
        if(prevState.outlookSynced !== this.state.outlookSynced) {
            if(this.state.skipNextApiCall && this.state.outlookSynced !== null) {
                this.updateCalendarTokenApiCall('outlook');
                this.setState({ skipNextApiCall: false }); 
            }
        }
    }

    setToken = (token: string) => {
        if (token) {
          this.setState({ token });
        }
      }

    setGoogleAuth = async (token: string) => {
        if (token) {
            this.setState({ googleRefreshAuthToken: token });
            const auth_token = await GoogleAuthProvider.refreshAccessToken(token);
            this.getGoogleUserInfoDetails(auth_token);
        }
    }

    setOutlookAuth = async (token: string) => {
        if (token) {

            this.setState({ outlookRefreshAuthToken: token });
            const access_token = await OutlookAuthProvider.refreshAccessToken(token);
            this.setState({ outlookAuthToken: access_token });
            this.getOutlookUserInfoDetails(access_token);
            const profilePic = await OutlookAuthProvider.fetchUserProfilePicture(access_token);
            if (profilePic) {
                this.setState({ outlookUserProfile: profilePic });
            }
        }
    }

    handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        this.setState({ ...this.state, [name]: checked });
    }

    handleGoogleAuthenticate = async () => {
        try {
            const access_token = await GoogleAuthProvider.getAccessToken();
            
            const data = await GoogleAuthProvider.fetchTokens(access_token);            
            this.setState({ googleAuthToken: data.access_token, googleRefreshAuthToken: data.refresh_token || "" });
            setStorageData("google_auth", data.access_token,);
            setStorageData("refresh_google_auth", data.access_token,);
            setStorageData("isGoogleSync", true);

            this.getGoogleUserInfoDetails(data.access_token);
        } catch (error) {
            removeStorageData("isGoogleSync");
        }
    };

    getGoogleUserInfoDetails = async (token: string) => {
        this.setState({ loader: true })
        const header = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getGoogleAuthUserInfoApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.googleAuthUserEndpoint
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "GET"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    setGoogleSync = (isGoogleSync: boolean) => {
        if(isGoogleSync) {
            this.setState({ googleSynced: true });
        } else {
            this.setState({ googleSynced: false });
        }
    }

    handleGoogleAuthUserDetailsApiRes = async (response: any) => {
        const isGoogleSync = await getStorageData("isGoogleSync", true);
        this.setState({ loader: false });
        
        if (!response.error) {
            this.setState({ 
                googleAuthDetails: response, 
                handleGoogleUi: true,
                googleSynced: isGoogleSync,
                skipNextApiCall:!this.state.skipNextApiCall,
            });
        } else if (response.error?.code === 401) {
            this.refreshGoogleToken();
        } else {
            this.setState({ googleAuthDetails: null });
        }
    }

    handleRemoveGoogleAccount = async () => {
        const signOut = await GoogleAuthProvider.signOut();
        if(signOut){
            removeStorageData("google_auth");
            removeStorageData("isGoogleSync");
            this.removeCalendarTokenApiCall('google');
            this.setState({ googleAuthToken: "", googleAuthDetails: null, handleGoogleUi: false, });
        }
    }

    handleSyncChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;                
        this.setState({ 
            ...this.state, 
            [name]: checked,
            skipNextApiCall: true  
        });
    
        if (name === "googleSynced" && !checked) {
            removeStorageData("isGoogleSync");
        } else if (name === "googleSynced" && checked) {
            setStorageData("isGoogleSync", true);
            this.refreshGoogleToken();
        } else if (name === "outlookSynced" && !checked) {
            removeStorageData("isOutlookSync");
        } else if (name === "outlookSynced" && checked) {
            setStorageData("isOutlookSync", true);
            this.handleOutlookAuth();
        }
    };

    handleOutlookAuth = async () => {
        const token = await OutlookAuthProvider.getAccessToken();
        setStorageData("ms_accessToken", token.access_token);
        setStorageData("ms_refreshToken", token.refresh_token);
        setStorageData("isOutlookSync", true);
        this.setState({outlookAuthToken: token.access_token, outlookRefreshAuthToken: token.refresh_token })
        this.getOutlookUserInfoDetails(token.access_token);
        const outlookUserPic = await OutlookAuthProvider.fetchUserProfilePicture(token.access_token);
        if (outlookUserPic) {
            this.setState({ outlookUserProfile: outlookUserPic });
        }
    }

    getOutlookUserInfoDetails = async (token: string) => {
        this.setState({ loader: true })
        const header = {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        this.getOutLookInfoApiCallId = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.outlookAuthUserInfoEndpoint
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "GET"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }   

    setOutlookSync = (isOutlookSync: boolean) => {
        if(isOutlookSync) {
            this.setState({ outlookSynced: true });
        } else {
            this.setState({ outlookSynced: false });
        }
    }

    handleOutLookDetailsApiRes = async (response: any) => {
        const isOutlookSync = await getStorageData('isOutlookSync', true);
        this.setState({ loader: false });
        this.setOutlookSync(isOutlookSync);

        if (!response.error) {                        
            this.setState({ 
                outlookAuthDetails: response, 
                handleOutlookUi: true,
                outlookSynced: isOutlookSync,
                skipNextApiCall:!this.state.skipNextApiCall,                
            });
        } else if (response.error?.code === "InvalidAuthenticationToken") {
            const token = await OutlookAuthProvider.refreshAccessToken(this.state.outlookRefreshAuthToken);
            setStorageData("ms_accessToken", token);
            this.getOutlookUserInfoDetails(token);
            const outlookUserPic = await OutlookAuthProvider.fetchUserProfilePicture(token);
            if (outlookUserPic) {
                this.setState({ outlookUserProfile: outlookUserPic });
            }
        } else {
            removeStorageData('ms_accessToken');
            removeStorageData('isOutlookSync');
            this.setState({ outlookAuthDetails: null, });
        }
    }

    handleRemoveOutLookAccount = async () => {
        const result = await OutlookAuthProvider.signOut();
        if (result) {
            removeStorageData("isOutlookSync");
            this.removeCalendarTokenApiCall('outlook');
            this.setState({ handleOutlookUi: false, outlookSynced: false, outlookAuthDetails: null, outlookAuthToken: "" });
        }
    }

    refreshGoogleToken = async () => {
        try {
            const token = await GoogleAuthProvider.refreshAccessToken(this.state.googleRefreshAuthToken);
            if(token){
                this.setState({googleAuthToken: token});
                setStorageData('google_auth', token);
                this.getGoogleUserInfoDetails(token);
            }

           
        } catch (error) {
            removeStorageData('google_auth');
            removeStorageData('isGoogleSync');
            this.setState({ googleAuthDetails: null, });
            console.error('Error refreshing Google token:', error);
        }
    };

    updateCalendarTokenApiCall = async (type: 'google' | 'outlook') => {
        this.setState({ loader: true });
        
        let endpoint = "";

        if(type === 'google'){
            endpoint = `google_calendar_token=${this.state.googleRefreshAuthToken}&google_calendar_sync=${this.state.googleSynced}`
        }else {
            endpoint = `outlook_calendar_token=${this.state.outlookRefreshAuthToken}&outlook_calendar_sync=${this.state.outlookSynced}`
        }

        const header = {
            "Content-Type": "application/json",
            token: this.state.token,
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.updateCalendarTokenApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `${configJSON.updateCalendarTokenEndpoint}${endpoint}`
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "PUT"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    removeCalendarTokenApiCall = async (type: 'google' | 'outlook') => {
        this.setState({ loader: true });
        
        let endpoint = "";

        if(type === 'google'){
            endpoint = `remove_google_calender=${true}`
        }else {
            endpoint = `remove_outlook_calender=${true}`
        }

        const header = {
            "Content-Type": "application/json",
            token: this.state.token,
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.removeCalendarTokenApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `${configJSON.removeCalendarTokenEndpoint}${endpoint}`
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            "PUT"
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    handleUpdateCalendarTokenApiRes = (response: any) => {
        this.setState({loader: false})
    }

    handleRemoveCalendarTokenApiRes = (response: any) => {
        this.setState({loader: false})
    }

    

    // Customizable Area End
}