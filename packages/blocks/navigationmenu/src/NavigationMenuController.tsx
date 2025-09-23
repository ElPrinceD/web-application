import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData, removeStorageData } from "../../../framework/src/Utilities";
import { OutlookAuthProvider } from "../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../components/src/GoogleAuthProvider.web";
import { gapi, loadAuth2, loadGapiInsideDOM } from "gapi-script";
export  interface Item{
  title:string;
  image?:string;
  route?:string
;}

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

interface ValidResponseType {
  message: object;
  data: object;
  errors:string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  drawerContent?: boolean;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  services:Item[];
  supports:Item[];
  handleLogOutPopup:boolean;
  isSideBarOpen: boolean;
  activeTab:string;
  isLoginPopupShowen:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NavigationMenuController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetDataCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      services: [],
      activeTab:"",
      supports: [
        {
          title: "Contact Us",
          image: require("../assets/contactUs.svg")
        }, {
          title: "Help",
          image: require("../assets/Help.svg")
        }, {
          title: "Log Out",
          image: require("../assets/logout.svg")
        }
      ],
      handleLogOutPopup:false,
      isSideBarOpen: false,
      isLoginPopupShowen:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
    } 
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
      let role_id = await getStorageData("role_id"); 
      if (role_id === null || role_id === undefined) {
        role_id = null;
      } else {
        role_id = Number(role_id);
      }
  
      if (role_id === 1 || role_id === null) {
        this.setState({
          services: [
            {
              title: "Dashboard",
              image: require("../assets/dashboard.svg"),
              route: "/Dashboard",
            },
            {
              title: "Requests",
              image: require("../assets/request.svg"),
              route: "/RequestManagement",
            },
            {
              title: "Catalogue",
              image: require("../assets/book.svg"),
              route: "/Catalogue",
            },
            {
              title: "Calendar",
              image: require("../assets/calendar.svg"),
              route: "/Calendar",
            },
            {
              title: "My Account",
              image: require("../assets/Vector.svg"),
              route: "/UserProfileBasicBlock",
            },
          ],
        });
      } else if (role_id === 2) {
       this.setState({
          services: [
            {
              title: "Dashboard",
              image: require("../assets/dashboard.svg"),
              route: "/Dashboard",
            },
            {
              title: "Requests",
              image: require("../assets/request.svg"),
              route: "/RequestManagement",
            },
            {
              title: "Calendar",
              image: require("../assets/calendar.svg"),
              route: "/Calendar",
            },
            {
              title: "My Account",
              image: require("../assets/Vector.svg"),
              route: "/UserProfileBasicBlock",
            },
          ],
        });
      }
   
    const url = window?.location.pathname;
    this.setState({activeTab:url})
    this.tabByUser();
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  logOutNvigation = ( support: string) => {
    if(support === "Log Out") {
      this.setState({handleLogOutPopup: !this.state.handleLogOutPopup});
      this.handleLogoutNavigation();
    } else if (support === "Contact Us"){
      this.runEngineRedirection("ContactUs");
    } else if (support === "Help"){
      this.runEngineRedirection("FAQ");
    }
  };

  runEngineRedirection(RedirectionUrl: string){
    const RedirectionPoint = new Message(getName(MessageEnum.NavigationMessage));
    RedirectionPoint.addData(getName(MessageEnum.NavigationTargetMessage), RedirectionUrl);
    RedirectionPoint.addData( getName(MessageEnum.NavigationPropsMessage), this.props );
    this.send(RedirectionPoint);
    return true;
  }


  handleSideBarNavigation = async(service: string) => {
    let token = await getStorageData("token")
    if(token){
      if(service === "My Account"){
        this.runEngineRedirection("UserProfileBasicBlock");
      } else if (service === "Dashboard"){
        this.runEngineRedirection("Dashboard");
       } else if (service === "Requests"){
        this.runEngineRedirection("RequestManagement");
      }  else if (service === "Catalogue"){
        this.runEngineRedirection("Catalogue");
      } else if (service === "Calendar"){
        this.runEngineRedirection("Calendar");
       }
    }
    else{
      this.setState({isLoginPopupShowen:true})
    }
  };

  landingRedirect = () => {
    this.runEngineRedirection("Home");
  }

  tabByUser = async() => {
    let token = await getStorageData("token");
    if(token) return 
    this.setState({services: [
      {
        title: "Dashboard",
        image: require("../assets/dashboard.svg"),
        route:"/Dashboard"
      }, {
        title: "Requests",
        image: require("../assets/request.svg"),
        route:"/RequestManagement"
      }, {
        title: "Catalogue",
        image: require("../assets/book.svg"),
        route:"/Catalogue"
      }, {
        title: "Calendar",
        image: require("../assets/calendar.svg"),
        route:"/Calendar"
      }
    ],
    supports: [
      {
        title: "Contact Us",
        image: require("../assets/contactUs.svg")
      }, {
        title: "Help",
        image: require("../assets/Help.svg")
      }
    ],
    })
  }


  navigateToLogin = () => {
    this.props.navigation.navigate("EmailAccountLoginBlock");
  }

  navigateToSignUp = () => {
    this.props.navigation.navigate("EmailAccountRegistrationWeb");
  }

  closeLoginPopup = () => {
    this.setState({isLoginPopupShowen:false})
  }

  handleLogoutNavigation = async()=>{
    const RemoveStorageKeys = [
      "token",
      "google_auth",
      "guestClient",
      "saveUserInfo",
      "isGoogleSync",
      "isOutlookSync",
      "ms_accessToken",
      "OTPToken",
      "authToken",
      "notaryRequestId",
      "otptokenOnly",
      "saveUserInfo",
      "settingemail",
      "userName",
      "userRoleId",
      "role_id"
    ];
    
    RemoveStorageKeys.forEach(removeStorageData);
    
    await GoogleAuthProvider.signOut();
    await OutlookAuthProvider.signOut();
    
    this.runEngineRedirection("Home")
  }

  toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    this.setState({isSideBarOpen: open});
  };


  toggleSideBar = (open: boolean) => {
    if(open){
      return "true"
    }else {
      return "false"
    }
  }
  toggleMenu = (open: boolean) => {
    if(open){
      return "true"
    }else {
      return "false"
    }
  }
  // Customizable Area End
}
