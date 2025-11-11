// App.js - WEB
import React, { Component } from "react";
import { View } from "react-native";
// Use production Firebase imports (individual modules instead of full package)
import firebase from 'firebase/app'
import 'firebase/analytics'
import { connect } from 'react-firebase'
import { gapi, loadAuth2, loadGapiInsideDOM } from "gapi-script";

import WebRoutesGenerator from "../../components/src/NativeWebRouteWrapper";
import { ModalContainer } from "react-router-modal";
import HomeScreen from "../../components/src/HomeScreen";
import TopNav from "../../components/src/TopNav";

import InfoPage from '../../blocks/info-page/src/InfoPageBlock'
import AlertBlock from '../../blocks/alert/src/AlertBlock.web'
import Quotemanagement2 from "../../blocks/quotemanagement2/src/Quotemanagement2";
import AccountGroups from "../../blocks/accountgroups/src/AccountGroups";
import BulkUploading from "../../blocks/bulkuploading/src/BulkUploading";
// import StripePayments from "../../blocks/stripepayments/src/StripePayments";
import Search from "../../blocks/search/src/Search";
import Document from "../../blocks/documentopener/src/DocumentOpener";
import DocuSign from "../../blocks/docusignintegration/src/DocusignIntegration.web";
import DocuSignSuccess from "../../blocks/docusignintegration/src/DocuSignSuccess.web";
import SocialMediaAccountLoginScreen from "../../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import ForgotPassword from "../../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../../blocks/forgot-password/src/NewPassword";
import TermsConditions from "../../blocks/termsconditions/src/TermsConditions";
import TermsConditionsDetail from "../../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../../blocks/termsconditions/src/TermsConditionsUsers";
import Catalogue from "../../blocks/catalogue/src/Catalogue";
import CatalogueService from "../../blocks/catalogue/src/CatalogueService.web";
import SocialMediaAccountRegistrationScreen from "../../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Emailnotifications2 from "../../blocks/emailnotifications2/src/Emailnotifications2";
import CountryCodeSelector from "../../blocks/country-code-selector/src/CountryCodeSelector";
import UserProfileBasicBlock from "../../blocks/user-profile-basic/src/UserProfileBasicBlock.web";
import Splashscreen from "../../blocks/splashscreen/src/Splashscreen";
import Settings2 from "../../blocks/settings2/src/Settings2";
import EmailAccountRegistration from "../../blocks/email-account-registration/src/EmailAccountRegistration";
import Adminconsole2 from "../../blocks/adminconsole2/src/Adminconsole2";
import Location from "../../blocks/location/src/Location";
import Analytics from "../../blocks/analytics/src/Analytics";
import EmailAccountLoginBlock from "../../blocks/email-account-login/src/EmailAccountLoginBlock";
import NavigationMenu from "../../blocks/navigationmenu/src/NavigationMenu.web";
import LandingPage from "../../blocks/landingpage/src/LandingPage";
import CameraAccess from "../../blocks/cameraaccess/src/CameraAccess";
import EducationalUserProfile from "../../blocks/educational-user-profile/src/EducationalUserProfile";
import Tasks from "../../blocks/tasks/src/Tasks";
import TaskList from "../../blocks/tasks/src/TaskList";
import Task from "../../blocks/tasks/src/Task";
import PaymentOptions from "../../blocks/requestmanagement/src/PaymentOptions.web";
import RequestDetails from "../../blocks/requestmanagement/src/RequestDetails.web";
import RequestManagement from "../../blocks/requestmanagement/src/RequestManagement";
import Rolesandpermissions2 from "../../blocks/rolesandpermissions2/src/Rolesandpermissions2";
import GoogleCalendarSync from "../../blocks/googlecalendarsync/src/GoogleCalendarSync.web";
import Geofence from "../../blocks/geofence/src/Geofence";
import Cfzoomintegration92 from "../../blocks/cfzoomintegration92/src/Cfzoomintegration92";
import VideoSdk from "../../blocks/cfzoomintegration92/src/VideoSdk.web"
import Scheduling from "../../blocks/scheduling/src/Scheduling";
import OrderManagement from "../../blocks/ordermanagement/src/OrderManagement";
import OTPInputAuth from "../../blocks/otp-input-confirmation/src/OTPInputAuth";
import Contentmanagement1 from "../../blocks/contentmanagement1/src/Contentmanagement1";
import Adminconsole from "../../blocks/adminconsole/src/Adminconsole";
import Signuplogin from "../../blocks/signuplogin/src/Signuplogin";
import Calendar from "../../blocks/navigationmenu/src/Calendars.web";
import Analytics1 from "../../blocks/analytics1/src/Analytics1";
import Catalogue1 from "../../blocks/catalogue1/src/Catalogue1";
import Termsandconditions from "../../blocks/termsandconditions/src/Termsandconditions";
import Splashscreen1 from "../../blocks/splashscreen1/src/Splashscreen1";
import Rolesandpermissions from "../../blocks/rolesandpermissions/src/Rolesandpermissions";
import Settings from "../../blocks/settings/src/Settings.web";
import Payments from "../../blocks/payments/src/Payments";
import Pushnotifications from "../../blocks/pushnotifications/src/Pushnotifications";
import Notifications from "../../blocks/notifications/src/Notifications";
import EmailAccountRegistrationWeb from "../../blocks/email-account-registration/src/EmailAccountRegistrationWeb.web";

import OnboardingPageWeb from "../../blocks/email-account-registration/src/OnboardingPageWeb.web"
import Header from "../../blocks/landingpage/src/Header.web";
import Landingpageuser from "../../blocks/landingpage/src/Landingpageuser.web";
import AboutUs from "../../blocks/landingpage/src/AboutUs.web"
import EmailAccountIamNotaryRegWeb from '../../blocks/email-account-registration/src/EmailAccountIamNotaryRegWeb.web'
import OtpVerification from '../../blocks/email-account-registration/src/OtpVerification.web'
import ContactUs from "../../blocks/landingpage/src/ContactUs.web";
import Services from '../../blocks/landingpage/src/Services.web'
import { Footer } from "../../components/src/Footer.web";
import FAQ from "../../blocks/landingpage/src/FAQ.web";
import NotaryServices from '../../blocks/email-account-registration/src/NotaryServices.web';
import PrivacyPolicy from "../../blocks/termsandconditions/src/PrivacyPolicy.web";
import UserDashboard from "../../blocks/landingpage/src/UserDashboard.web";
import ForgotPasswordWeb from "../../blocks/forgot-password/src/ForgotPasswordWeb.web"
import ForgotPasswordOTPWeb from "../../blocks/forgot-password/src/ForgotPasswordOTPWeb.web"
import NewPasswordWeb from "../../blocks/forgot-password/src/NewPasswordWeb.web"
import Dashboard from '../../blocks/dashboard/src/Dashboard.web'
import UserNotaryService from "../../blocks/user-profile-basic/src/UserNotaryService.web"
import CatalogueNotary from "../../blocks/catalogue/src/CatalogueNotary.web"
import StripeSuccessPage from "../../components/src/StripeSuccessPage.web";
import StripeFailurePage from "../../components/src/StripeFailurePage.web";
import TransactionHistory from '../../blocks/user-profile-basic/src/TransactionHistory.web'
import UserProfile from '../../blocks/user-profile-basic/src/UserProfile.web'
import StripeConnectResponse from '../../blocks/settings/src/StripeConnectResponse.web'
import Chat from '../../blocks/chat/src/Chat.web'
import path from "path";

const routeMap = {
  Chat: {
    component: Chat,
    path: "/Chat"
  },
  StripeConnectResponse: {
    component: StripeConnectResponse,
    path: "/StripeConnectResponse"
  },
  StripeSuccessPage: {
    component: StripeSuccessPage,
    path: "/StripeSuccessPage"
  },
  StripeFailurePage: {
    component: StripeFailurePage,
    path: "/StripeFailurePage"
  },
  EmailAccountIamNotaryRegWeb: {
    component: EmailAccountIamNotaryRegWeb,
    path: '/EmailAccountIamNotaryRegWeb'
  },
  Dashboard: {
    component: Dashboard,
    path: '/Dashboard'
  },
  OtpVerification: {
    component: OtpVerification,
    path: '/OtpVerification'
  },
  Pushnotifications: {
    component: Pushnotifications,
    path: "/Pushnotifications"
  },
  Notifications: {
    component: Notifications,
    path: "/Notifications"
  },

  Contentmanagement1: {
    component: Contentmanagement1,
    path: "/Contentmanagement1"
  },
  Adminconsole: {
    component: Adminconsole,
    path: "/Adminconsole"
  },
  Signuplogin: {
    component: Signuplogin,
    path: "/Signuplogin"
  },
  Calendar: {
    component: Calendar,
    path: "/Calendar"
  },
  Analytics1: {
    component: Analytics1,
    path: "/Analytics1"
  },
  Catalogue1: {
    component: Catalogue1,
    path: "/Catalogue1"
  },
  Termsandconditions: {
    component: Termsandconditions,
    path: "/Termsandconditions"
  },
  UserDashboard: {
    component: UserDashboard,
    path: "/Userdashboard"
  },
  PrivacyPolicy: {
    component: PrivacyPolicy,
    path: "/Privacypolicy"
  },
  Splashscreen1: {
    component: Splashscreen1,
    path: "/Splashscreen1"
  },
  Rolesandpermissions: {
    component: Rolesandpermissions,
    path: "/Rolesandpermissions"
  },
  Settings: {
    component: Settings,
    path: "/Settings"
  },
  Payments: {
    component: Payments,
    path: "/Payments"
  },

  Quotemanagement2: {
    component: Quotemanagement2,
    path: "/Quotemanagement2"
  },
  AccountGroups: {
    component: AccountGroups,
    path: "/AccountGroups"
  },
  BulkUploading: {
    component: BulkUploading,
    path: "/BulkUploading"
  },
  // StripePayments:{
  //  component:StripePayments,
  // path:"/StripePayments"},
  Search: {
    component: Search,
    path: "/Search"
  },
  Document: {
    component: Document,
    path: "/Document"
  },
  DocuSign: {
    component: DocuSign,
    path: "/DocuSign",
  },
  DocuSignSuccess: {
    component: DocuSignSuccess,
    path: "/DocuSignSuccess",
  },
  SocialMediaAccountLoginScreen: {
    component: SocialMediaAccountLoginScreen,
    path: "/SocialMediaAccountLoginScreen"
  },
  ForgotPassword: {
    component: ForgotPassword,
    path: "/ForgotPassword"
  },
  ForgotPasswordOTP: {
    component: ForgotPasswordOTP,
    path: "/ForgotPasswordOTP"
  },
  NewPassword: {
    component: NewPassword,
    path: "/NewPassword"
  },
  TermsConditions: {
    component: TermsConditions,
    path: "/TermsConditions"
  },
  TermsConditionsDetail: {
    component: TermsConditionsDetail,
    path: "/TermsConditionsDetail"
  },
  TermsConditionsUsers: {
    component: TermsConditionsUsers,
    path: "/TermsConditionsUsers"
  },
  Catalogue: {
    component: Catalogue,
    path: "/Catalogue"
  },
  CatalogueService: {
    component: CatalogueService,
    path: "/CatalogueService"
  },
  SocialMediaAccountRegistrationScreen: {
    component: SocialMediaAccountRegistrationScreen,
    path: "/SocialMediaAccountRegistrationScreen"
  },
  Emailnotifications2: {
    component: Emailnotifications2,
    path: "/Emailnotifications2"
  },
  CountryCodeSelector: {
    component: CountryCodeSelector,
    path: "/CountryCodeSelector"
  },
  UserProfileBasicBlock: {
    component: UserProfileBasicBlock,
    path: "/UserProfileBasicBlock"
  },
  TransactionHistory: {
    component: TransactionHistory,
    path: "/TransactionHistory"
  }
  ,
  UserProfile:{
    component:UserProfile,
    path:'/UserProfile'
  },
  Splashscreen: {
    component: Splashscreen,
    path: "/Splashscreen"
  },
  Settings2: {
    component: Settings2,
    path: "/Settings2"
  },
  EmailAccountRegistration: {
    component: EmailAccountRegistration,
    path: "/EmailAccountRegistration"
  },
  Adminconsole2: {
    component: Adminconsole2,
    path: "/Adminconsole2"
  },
  Location: {
    component: Location,
    path: "/Location"
  },
  Analytics: {
    component: Analytics,
    path: "/Analytics"
  },
  EmailAccountLoginBlock: {
    component: EmailAccountLoginBlock,
    path: "/EmailAccountLoginBlock"
  },
  NavigationMenu: {
    component: NavigationMenu,
    path: "/NavigationMenu"
  },
  LandingPage: {
    component: LandingPage,
    path: "/LandingPage"
  },
  CameraAccess: {
    component: CameraAccess,
    path: "/CameraAccess"
  },
  EducationalUserProfile: {
    component: EducationalUserProfile,
    path: "/EducationalUserProfile"
  },
  Tasks: {
    component: Tasks,
    path: "/Tasks"
  },
  TaskList: {
    component: TaskList,
    path: "/TaskList"
  },
  Task: {
    component: Task,
    path: "/Task"
  },
  RequestDetails: {
    component: RequestDetails,
    path: "/RequestDetails/:id"
  },
  PaymentOptions: {
    component: PaymentOptions,
    path: "/PaymentOptions"
  },
  RequestManagement: {
    component: RequestManagement,
    path: "/RequestManagement"
  },
  Rolesandpermissions2: {
    component: Rolesandpermissions2,
    path: "/Rolesandpermissions2"
  },
  GoogleCalendarSync: {
    component: GoogleCalendarSync,
    path: "/GoogleCalendarSync"
  },
  Geofence: {
    component: Geofence,
    path: "/Geofence"
  },
  Cfzoomintegration92: {
    component: Cfzoomintegration92,
    path: "/MeetSdk"
  },
  VideoSdk: {
    component: VideoSdk,
    path: "/VideoSdk"
  },
  Scheduling: {
    component: Scheduling,
    path: "/Scheduling"
  },
  OrderManagement: {
    component: OrderManagement,
    path: "/OrderManagement"
  },
  OTPInputAuth: {
    component: OTPInputAuth,
    path: "/OTPInputAuth"
  },

  Home: {
    component: Landingpageuser,
    path: '/',
    exact: true
  },
  InfoPage: {
    component: InfoPage,
    path: '/InfoPage'
  },

  AlertWeb: {
    component: AlertBlock,
    path: "*/AlertWeb",
    modal: true
  },

  EmailAccountRegistrationWeb: {
    component: EmailAccountRegistrationWeb,
    path: "/EmailAccountRegistrationWeb"
  },

  OnboardingPageWeb: {
    component: OnboardingPageWeb,
    path: "/OnboardingPageWeb"
  },
  FAQ: {
    component: FAQ,
    path: "/Faq"
  },
  Services: {
    component: Services,
    path: "/Services"
  },
  ContactUs: {
    component: ContactUs,
    path: "/ContactUs"
  },
  AboutUs: {
    component: AboutUs,
    path: "/AboutUs"
  },
  ForgotPasswordWeb: {
    component: ForgotPasswordWeb,
    path: "/ForgotPasswordWeb"
  },

  ForgotPasswordOTPWeb: {
    component: ForgotPasswordOTPWeb,
    path: "/ForgotPasswordOTPWeb"
  },

  NewPasswordWeb: {
    component: NewPasswordWeb,
    path: "/NewPasswordWeb"
  },
  NotaryServices: {
    component: NotaryServices,
    path: '/NotaryServices'
  },
  UserNotaryService: {
    component: UserNotaryService,
    path: '/UserNotaryService'
  },
  CatalogueNotary: {
    component: CatalogueNotary,
    path: '/CatalogueNotary'
  }
};

const firebaseAPI = firebase.initializeApp({
  apiKey: "AIzaSyDgl9aTbKMdRZ9-ijSZRionh3V591gMJl4",
  authDomain: "rnmasterapp-c11e9.firebaseapp.com",
  databaseURL: "https://rnmasterapp-c11e9.firebaseio.com",
  projectId: "rnmasterapp-c11e9",
  storageBucket: "rnmasterapp-c11e9.appspot.com",
  messagingSenderId: "649592030497",
  appId: "1:649592030497:web:7728bee3f2baef208daa60",
  measurementId: "G-FYBCF3Z2W3"
});


class App extends Component {

  async componentDidMount() {
    try {
      await loadGapiInsideDOM();

      loadAuth2(
        gapi,
        process.env.REACT_APP_GOOGLE_CLIENT_ID,
        process.env.REACT_APP_GOOGLE_CALENDAR_SCOPE
      );
    } catch (error) {
      console.error("loading gapi error", error)
     }
  }

  render() {
    const defaultAnalytics = firebaseAPI.analytics();
    defaultAnalytics.logEvent('APP_Loaded');

    return (
      <View style={{ height: '100vh' }}>
        {/* <TopNav /> */}
        {WebRoutesGenerator({ routeMap })}
        <ModalContainer />
      </View>
    );
  }
}


export default App;