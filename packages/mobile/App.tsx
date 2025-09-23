import React from 'react';

import {
  createStackNavigator
} from "react-navigation";

import HomeScreen from "../components/src/HomeScreen";
import InfoPage from '../blocks/info-page/src/InfoPageBlock'
import Quotemanagement2 from "../blocks/quotemanagement2/src/Quotemanagement2";
import AccountGroups from "../blocks/accountgroups/src/AccountGroups";
import BulkUploading from "../blocks/bulkuploading/src/BulkUploading";
import StripePayments from "../blocks/stripepayments/src/StripePayments";
import Search from "../blocks/search/src/Search";
import DocumentOpener from "../blocks/documentopener/src/DocumentOpener";
import SocialMediaAccountLoginScreen from "../blocks/social-media-account-login/src/SocialMediaAccountLoginScreen";
import ForgotPassword from "../blocks/forgot-password/src/ForgotPassword";
import ForgotPasswordOTP from "../blocks/forgot-password/src/ForgotPasswordOTP";
import NewPassword from "../blocks/forgot-password/src/NewPassword";
import TermsConditions from "../blocks/termsconditions/src/TermsConditions";
import TermsConditionsDetail from "../blocks/termsconditions/src/TermsConditionsDetail";
import TermsConditionsUsers from "../blocks/termsconditions/src/TermsConditionsUsers";
import Catalogue from "../blocks/catalogue/src/Catalogue";
import SocialMediaAccountRegistrationScreen from "../blocks/social-media-account-registration/src/SocialMediaAccountRegistrationScreen";
import Emailnotifications2 from "../blocks/emailnotifications2/src/Emailnotifications2";
import CountryCodeSelector from "../blocks/country-code-selector/src/CountryCodeSelector";
import CountryCodeSelectorTable from "../blocks/country-code-selector/src/CountryCodeSelectorTable";
import UserProfileBasicBlock from "../blocks/user-profile-basic/src/UserProfileBasicBlock";
import Splashscreen from "../blocks/splashscreen/src/Splashscreen";
import Settings2 from "../blocks/settings2/src/Settings2";
import EmailAccountRegistration from "../blocks/email-account-registration/src/EmailAccountRegistration";
import Adminconsole2 from "../blocks/adminconsole2/src/Adminconsole2";
import Location from "../blocks/location/src/Location";
import Analytics from "../blocks/analytics/src/Analytics";
import EmailAccountLoginBlock from "../blocks/email-account-login/src/EmailAccountLoginBlock";
import NavigationMenu from "../blocks/navigationmenu/src/NavigationMenu";
import LandingPage from "../blocks/landingpage/src/LandingPage";
import CameraAccess from "../blocks/cameraaccess/src/CameraAccess";
import EducationalUserProfile from "../blocks/educational-user-profile/src/EducationalUserProfile";
import Tasks from "../blocks/tasks/src/Tasks";
import TaskList from "../blocks/tasks/src/TaskList";
import Task from "../blocks/tasks/src/Task";
import RequestDetails from "../blocks/requestmanagement/src/RequestDetails";
import RequestManagement from "../blocks/requestmanagement/src/RequestManagement";
import Rolesandpermissions2 from "../blocks/rolesandpermissions2/src/Rolesandpermissions2";
import GoogleCalendarSync from "../blocks/googlecalendarsync/src/GoogleCalendarSync";
import Geofence from "../blocks/geofence/src/Geofence";
import Cfzoomintegration92 from "../blocks/cfzoomintegration92/src/Cfzoomintegration92";
import Scheduling from "../blocks/scheduling/src/Scheduling";
import OrderManagement from "../blocks/ordermanagement/src/OrderManagement";
import OTPInputAuth from "../blocks/otp-input-confirmation/src/OTPInputAuth";
import Contentmanagement1 from "../blocks/contentmanagement1/src/Contentmanagement1";
import Adminconsole from "../blocks/adminconsole/src/Adminconsole";
import Signuplogin from "../blocks/signuplogin/src/Signuplogin";
import Calendar from "../blocks/calendar/src/Calendar";
import Analytics1 from "../blocks/analytics1/src/Analytics1";
import Catalogue1 from "../blocks/catalogue1/src/Catalogue1";
import Termsandconditions from "../blocks/termsandconditions/src/Termsandconditions";
import Splashscreen1 from "../blocks/splashscreen1/src/Splashscreen1";
import Rolesandpermissions from "../blocks/rolesandpermissions/src/Rolesandpermissions";
import Settings from "../blocks/settings/src/Settings";
import Payments from "../blocks/payments/src/Payments";
import Pushnotifications from "../blocks/pushnotifications/src/Pushnotifications";
import Notifications from "../blocks/notifications/src/Notifications";
import { title } from 'process';




const HomeStack = createStackNavigator({
Home: { screen: Catalogue, navigationOptions: { header: null, title: "Home" } },
Pushnotifications:{ screen:Pushnotifications,navigationOptions:{ title:"Pushnotifications"}},
Notifications:{ screen:Notifications,navigationOptions:{ title:"Notifications"}},

Contentmanagement1:{ screen:Contentmanagement1,navigationOptions:{ title:"Contentmanagement1"}},
Adminconsole:{ screen:Adminconsole,navigationOptions:{ title:"Adminconsole"}},
Signuplogin:{ screen:Signuplogin,navigationOptions:{ title:"Signuplogin"}},
Calendar:{ screen:Calendar,navigationOptions:{ title:"Calendar"}},
Analytics1:{ screen:Analytics1,navigationOptions:{ title:"Analytics1"}},
Catalogue1:{ screen:Catalogue1,navigationOptions:{ title:"Catalogue1"}},
Termsandconditions:{ screen:Termsandconditions,navigationOptions:{ title:"Termsandconditions"}},
Splashscreen1:{ screen:Splashscreen1,navigationOptions:{ title:"Splashscreen1"}},
Rolesandpermissions:{ screen:Rolesandpermissions,navigationOptions:{ title:"Rolesandpermissions"}},
Settings:{ screen:Settings,navigationOptions:{ title:"Settings"}},
Payments:{ screen:Payments,navigationOptions:{ title:"Payments"}},

Quotemanagement2:{ screen:Quotemanagement2,navigationOptions:{ title:"Quotemanagement2"}},
AccountGroups:{ screen:AccountGroups,navigationOptions:{ title:"AccountGroups"}},
BulkUploading:{ screen:BulkUploading,navigationOptions:{ title:"BulkUploading"}},
StripePayments:{ screen:StripePayments,navigationOptions:{ title:"StripePayments"}},
Search:{ screen:Search,navigationOptions:{ title:"Search"}},
DocumentOpener:{ screen:DocumentOpener,navigationOptions:{ title:"DocumentOpener"}},
SocialMediaAccountLoginScreen:{ screen:SocialMediaAccountLoginScreen,navigationOptions:{ title:"SocialMediaAccountLoginScreen"}},
ForgotPassword:{ screen:ForgotPassword,navigationOptions:{ title:"ForgotPassword"}},
ForgotPasswordOTP:{ screen:ForgotPasswordOTP,navigationOptions:{ title:"ForgotPasswordOTP"}},
NewPassword:{ screen:NewPassword,navigationOptions:{ title:"NewPassword"}},
TermsConditions:{ screen:TermsConditions,navigationOptions:{ title:"TermsConditions"}},
TermsConditionsDetail:{ screen:TermsConditionsDetail,navigationOptions:{ title:"TermsConditionsDetail"}},
TermsConditionsUsers:{ screen:TermsConditionsUsers,navigationOptions:{ title:"TermsConditionsUsers"}},
Catalogue:{ screen:Catalogue,navigationOptions:{ title:"Catalogue"}},
SocialMediaAccountRegistrationScreen:{ screen:SocialMediaAccountRegistrationScreen,navigationOptions:{ title:"SocialMediaAccountRegistrationScreen"}},
Emailnotifications2:{ screen:Emailnotifications2,navigationOptions:{ title:"Emailnotifications2"}},
CountryCodeSelector:{ screen:CountryCodeSelector,navigationOptions:{ title:"CountryCodeSelector"}},
CountryCodeSelectorTable:{ screen:CountryCodeSelectorTable,navigationOptions:{ title:"CountryCodeSelectorTable"}},
UserProfileBasicBlock:{ screen:UserProfileBasicBlock,navigationOptions:{ title:"UserProfileBasicBlock"}},
Splashscreen:{ screen:Splashscreen,navigationOptions:{ title:"Splashscreen"}},
Settings2:{ screen:Settings2,navigationOptions:{ title:"Settings2"}},
EmailAccountRegistration:{ screen:EmailAccountRegistration,navigationOptions:{ title:"EmailAccountRegistration"}},
Adminconsole2:{ screen:Adminconsole2,navigationOptions:{ title:"Adminconsole2"}},
Location:{ screen:Location,navigationOptions:{ title:"Location"}},
Analytics:{ screen:Analytics,navigationOptions:{ title:"Analytics"}},
EmailAccountLoginBlock:{ screen:EmailAccountLoginBlock,navigationOptions:{ title:"EmailAccountLoginBlock"}},
NavigationMenu:{ screen:NavigationMenu,navigationOptions:{ title:"NavigationMenu"}},
LandingPage:{ screen:LandingPage,navigationOptions:{ title:"LandingPage"}},
CameraAccess:{ screen:CameraAccess,navigationOptions:{ title:"CameraAccess"}},
EducationalUserProfile:{ screen:EducationalUserProfile,navigationOptions:{ title:"EducationalUserProfile"}},
Tasks:{ screen:Tasks,navigationOptions:{ title:"Tasks"}},
TaskList:{ screen:TaskList,navigationOptions:{ title:"TaskList"}},
Task:{ screen:Task,navigationOptions:{ title:"Task"}},
RequestManagement:{ screen:RequestManagement,navigationOptions:{ title:"RequestManagement"}},
Rolesandpermissions2:{ screen:Rolesandpermissions2,navigationOptions:{ title:"Rolesandpermissions2"}},
GoogleCalendarSync:{ screen:GoogleCalendarSync,navigationOptions:{ title:"GoogleCalendarSync"}},
Geofence:{ screen:Geofence,navigationOptions:{ title:"Geofence"}},
Cfzoomintegration92:{ screen:Cfzoomintegration92,navigationOptions:{ title:"Cfzoomintegration92"}},
Scheduling:{ screen:Scheduling,navigationOptions:{ title:"Scheduling"}},
OrderManagement:{ screen:OrderManagement,navigationOptions:{ title:"OrderManagement"}},
OTPInputAuth:{ screen:OTPInputAuth,navigationOptions:{ title:"OTPInputAuth"}},
RequestDetails: {screen: RequestDetails, navigationOptions: {title: "RequestDetails"}},
  InfoPage: { screen: InfoPage, navigationOptions: { title: "Info" } }, 
});

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "HomeScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  return (
    <HomeStack />
  );
};