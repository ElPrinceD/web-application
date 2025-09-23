import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import AlertBlock from '../../blocks/alert/src/AlertBlock';
import CustomTextItem from "./CustomTextItem";
import NavigationBlock from "../../framework/src/Blocks/NavigationBlock";
import SingletonFactory from '../../framework/src/SingletonFactory';

import HomeScreenAdapter from '../../blocks/adapters/src/HomeScreenAdapter';
import InfoPageAdapter from '../../blocks/adapters/src/InfoPageAdapter';
import AlertPageWebAdapter from "../../blocks/adapters/src/AlertPageWebAdapter";

// Customizable Area Start
import PrivacyPolicyAdapter from "../../blocks/adapters/src/PrivacyPolicyAdapter";
import TermsAndConditionAdapter from "../../blocks/adapters/src/TermsAndConditionAdapter";
import SplashScreenAdapter from "../../blocks/adapters/src/SplashScreenAdapter";
import SocialMediaLogInAdapter from "../../blocks/adapters/src/SocialMediaLogInAdapter";
import EmailAccountLogInAdapter from "../../blocks/adapters/src/EmailAccountLogInAdapter";
import EmailAccountSignUpAdapter from "../../blocks/adapters/src/EmailAccountSignUpAdapter";
import ForgotPasswordAdapter from "../../blocks/adapters/src/ForgotPasswordAdapter";
import MobilePhoneToOTPAdapter from "../../blocks/adapters/src/MobilePhoneToOTPAdapter";
import OtpToNewPasswordAdapter from "../../blocks/adapters/src/OtpToNewPasswordAdapter";
import EmailAccountSignUpNewAdapter from "../../blocks/adapters/src/EmailAccountSignUpNewAdapter";
import ForgotPasswordOTPAdapter from "../../blocks/adapters/src/ForgotPasswordOTPAdapter";
//Assembler generated adapters start

//Assembler generated adapters end



//Assembler generated adapters start

//Assembler generated adapters end



//Assembler generated adapters start
const socialMediaLogInAdapter = new SocialMediaLogInAdapter();
const emailAccountLogInAdapter = new EmailAccountLogInAdapter();
const emailAccountSignUpAdapter = new EmailAccountSignUpAdapter();
const forgotPasswordAdapter = new ForgotPasswordAdapter();
const mobilePhoneToOTPAdapter = new MobilePhoneToOTPAdapter();
const otpToNewPasswordAdapter = new OtpToNewPasswordAdapter();
const emailAccountSignUpNewAdapter = new EmailAccountSignUpNewAdapter();
const forgotPasswordOTPAdapter = new ForgotPasswordOTPAdapter();
//Assembler generated adapters end



const privacyAdapter = new PrivacyPolicyAdapter();
const termAndConditionAdapter = new TermsAndConditionAdapter();
const splashScreenAdapter = new SplashScreenAdapter();
// Customizable Area End


const restAPIBlock = SingletonFactory.getRestBlockInstance();
const alertBlock = new AlertBlock();
const navigationBlock = new NavigationBlock();
const sessionBlock = SingletonFactory.getSessionBlockInstance();
const userAccountManagerBlock = SingletonFactory.getUserManagerInstance();
const homeScreenAdapter = new HomeScreenAdapter();
const infoPageAdapter = new InfoPageAdapter();
const alertPageWebAdapter = new AlertPageWebAdapter()

const instructions = Platform.select({
  // Customizable Area Start
  ios: "The iOS APP to rule them all!",
  android: "Now with Android AI",
  web: "Selector your adventure."
  // Customizable Area End
});

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class HomeScreen extends BlockComponent<Props, S, SS> {

  static instance:HomeScreen;

  constructor(props: Props) {
    super(props);
    HomeScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView} bounces={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.welcome}>
                Welcome to ZoomNotary!
              </Text>
            </View>

            <Text style={styles.instructions}>{instructions}</Text>
            <Text style={styles.header}>DEFAULT BLOCKS</Text>
            <CustomTextItem
              content={'InfoPage'}
              onPress={() => navigation.navigate("InfoPage")}
            />
            <CustomTextItem
              content={'Alert'}
              onPress={() => this.showAlert("Example", "This happened")}
            />
<CustomTextItem content={'NavigationMenu'}  onPress={() => navigation.navigate("NavigationMenu")} />
<CustomTextItem content={'core'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Location'}  onPress={() => navigation.navigate("Location")} />
<CustomTextItem content={'Analytics'}  onPress={() => navigation.navigate("Analytics")} />
<CustomTextItem content={'knowyourcustomerkycverification'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'utilities'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'StripePayments'}  onPress={() => navigation.navigate("StripePayments")} />
<CustomTextItem content={'SocialMediaAccountRegistrationScreen'}  onPress={() => navigation.navigate("SocialMediaAccountRegistrationScreen")} />
<CustomTextItem content={'social-media-account'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'EmailAccountLoginBlock'}  onPress={() => navigation.navigate("EmailAccountLoginBlock")} />
<CustomTextItem content={'EmailAccountRegistration'}  onPress={() => navigation.navigate("EmailAccountRegistration")} />
<CustomTextItem content={'CountryCodeSelector'}  onPress={() => navigation.navigate("CountryCodeSelector")} />
<CustomTextItem content={'ForgotPassword'}  onPress={() => navigation.navigate("ForgotPassword")} />
<CustomTextItem content={'OTPInputAuth'}  onPress={() => navigation.navigate("OTPInputAuth")} />
<CustomTextItem content={'SocialMediaAccountLoginScreen'}  onPress={() => navigation.navigate("SocialMediaAccountLoginScreen")} />
<CustomTextItem content={'CameraAccess'}  onPress={() => navigation.navigate("CameraAccess")} />
<CustomTextItem content={'BulkUploading'}  onPress={() => navigation.navigate("BulkUploading")} />
<CustomTextItem content={'Geofence'}  onPress={() => navigation.navigate("Geofence")} />
<CustomTextItem content={'TermsConditions'}  onPress={() => navigation.navigate("TermsConditions")} />
<CustomTextItem content={'DocumentOpener'}  onPress={() => navigation.navigate("DocumentOpener")} />
<CustomTextItem content={'UserProfileBasicBlock'}  onPress={() => navigation.navigate("UserProfileBasicBlock")} />
<CustomTextItem content={'EducationalUserProfile'}  onPress={() => navigation.navigate("EducationalUserProfile")} />
<CustomTextItem content={'contentmanagement'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'docusignintegration'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Search'}  onPress={() => navigation.navigate("Search")} />
<CustomTextItem content={'Scheduling'}  onPress={() => navigation.navigate("Scheduling")} />
<CustomTextItem content={'LandingPage'}  onPress={() => navigation.navigate("LandingPage")} />
<CustomTextItem content={'Tasks'}  onPress={() => navigation.navigate("Tasks")} />
<CustomTextItem content={'AccountGroups'}  onPress={() => navigation.navigate("AccountGroups")} />
<CustomTextItem content={'RequestManagement'}  onPress={() => navigation.navigate("RequestManagement")} />
<CustomTextItem content={'collecttransactionfees'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'OrderManagement'}  onPress={() => navigation.navigate("OrderManagement")} />
<CustomTextItem content={'Catalogue'}  onPress={() => navigation.navigate("Catalogue")} />
<CustomTextItem content={'outlookintegration'}  onPress={() => this.showAlert("Error", "Could not determine assembler export")} />
<CustomTextItem content={'Splashscreen'}  onPress={() => navigation.navigate("Splashscreen")} />
<CustomTextItem content={'GoogleCalendarSync'}  onPress={() => navigation.navigate("GoogleCalendarSync")} />
<CustomTextItem content={'Rolesandpermissions2'}  onPress={() => navigation.navigate("Rolesandpermissions2")} />
<CustomTextItem content={'Adminconsole2'}  onPress={() => navigation.navigate("Adminconsole2")} />
<CustomTextItem content={'Settings2'}  onPress={() => navigation.navigate("Settings2")} />
<CustomTextItem content={'Cfzoomintegration92'}  onPress={() => navigation.navigate("Cfzoomintegration92")} />
<CustomTextItem content={'Emailnotifications2'}  onPress={() => navigation.navigate("Emailnotifications2")} />
<CustomTextItem content={'Quotemanagement2'}  onPress={() => navigation.navigate("Quotemanagement2")} />

<CustomTextItem content={'Calendar'}  onPress={() => navigation.navigate("Calendar")} />
<CustomTextItem content={'Adminconsole'}  onPress={() => navigation.navigate("Adminconsole")} />
<CustomTextItem content={'Catalogue1'}  onPress={() => navigation.navigate("Catalogue1")} />
<CustomTextItem content={'Analytics1'}  onPress={() => navigation.navigate("Analytics1")} />
<CustomTextItem content={'Payments'}  onPress={() => navigation.navigate("Payments")} />
<CustomTextItem content={'Rolesandpermissions'}  onPress={() => navigation.navigate("Rolesandpermissions")} />
<CustomTextItem content={'Settings'}  onPress={() => navigation.navigate("Settings")} />
<CustomTextItem content={'Signuplogin'}  onPress={() => navigation.navigate("Signuplogin")} />
<CustomTextItem content={'Splashscreen1'}  onPress={() => navigation.navigate("Splashscreen1")} />
<CustomTextItem content={'Termsandconditions'}  onPress={() => navigation.navigate("Termsandconditions")} />
<CustomTextItem content={'Contentmanagement1'}  onPress={() => navigation.navigate("Contentmanagement1")} />

<CustomTextItem content={'Pushnotifications'}  onPress={() => navigation.navigate("Pushnotifications")} />
<CustomTextItem content={'Notifications'}  onPress={() => navigation.navigate("Notifications")} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default HomeScreen;