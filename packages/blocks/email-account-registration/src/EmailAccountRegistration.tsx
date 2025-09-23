import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";

import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
// Customizable Area End

import EmailAccountRegistrationController, {
  Props
} from "./EmailAccountRegistrationController";

export default class EmailAccountRegistration extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            <View>
              <View style={styles.headline}>
                {this.isPlatformWeb() ? (
                  <Text style={styles.signUpText}>Sign Up</Text>
                ) : null}
                <Text style={styles.titleWhySignUp}>{this.labelHeader}</Text>
              </View>
              <TextInput
                testID={"txtInputFirstName"}
                style={Platform.OS === "web" ? styles.inputWeb : styles.bgInput}
                placeholder={this.labelFirstName}
                {...this.txtInputFirstNamePrpos} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <TextInput
                testID={"txtInputLastName"}
                style={Platform.OS === "web" ? styles.inputWeb : styles.bgInput}
                placeholder={this.lastName}
                {...this.txtInputLastNamePrpos} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <TextInput
                testID={"txtInputEmail"}
                style={Platform.OS === "web" ? styles.inputWeb : styles.bgInput}
                placeholder={this.labelEmail}
                {...this.txtInputEmailPrpos} //Merge Engine::From BDS - {...this.testIDProps}
              />

              <View style={styles.bgPasswordContainer}>
                <TextInput
                  testID={"txtInputPassword"}
                  style={styles.bgPasswordInput}
                  placeholder={this.labelPassword}
                  {...this.txtInputPasswordProps}
                />

                <TouchableOpacity
                  testID={"btnPasswordShowHide"}
                  style={styles.passwordShowHide}
                  {...this.btnPasswordShowHideProps}
                >
                  <Image
                    testID={"imgEnablePasswordField"}
                    style={styles.imgPasswordShowhide}
                    {...this.imgEnablePasswordFieldProps}
                  />
                </TouchableOpacity>
              </View>

              <Text>{this.state.passwordHelperText}</Text>
              <View style={styles.bgPasswordContainer}>
                <TextInput
                  testID={"txtInputConfirmPassword"}
                  style={styles.bgPasswordInput}
                  placeholder={this.labelRePassword}
                  {...this.txtInputConfirmPasswordProps}
                />

                <TouchableOpacity
                  testID={"btnConfirmPasswordShowHide"}
                  style={styles.passwordShowHide}
                  {...this.btnConfirmPasswordShowHideProps}
                >
                  <Image
                    testID={"imgEnableRePasswordField"}
                    style={styles.imgPasswordShowhide}
                    {...this.imgEnableRePasswordFieldProps}
                  />
                </TouchableOpacity>
              </View>

              <CountryCodeSelector
                allowPropChange={true}
                navigation={this.isPlatformWeb() ? null : this.props.navigation}
                id={"CountryCodeSelector"}
                placeHolder={"Country Code"}
                style={styles.bgRectBorder}
                disable={false}
                value={this.state.countryCodeSelected}
              />

              <TextInput
                testID={"txtPhoneNumber"}
                style={Platform.OS === "web" ? styles.inputWeb : styles.bgInput}
                placeholder={"Phone"}
                {...this.txtPhoneNumberProps}
              />

              <Text style={styles.leagalText}>{this.labelLegalText}</Text>

              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  marginBottom: 30
                }}
              >
                <Text
                  testID={"btnLegalTermsAndCondition"}
                  style={styles.btnLegalTermsAndCondition}
                  {...this.btnLegalTermsAndConditionProps}
                >
                  {this.labelLegalTermCondition}
                </Text>
                <Text
                  testID={"btnLegalPrivacyPolicy"}
                  style={styles.btnLegalPrivacyPolicy}
                  {...this.btnLegalPrivacyPolicyProps}
                >
                  {this.labelLegalPrivacyPolicy}
                </Text>
              </View>

              <Button
                testID={"btnSignUp"}
                title={this.btnTextSignUp}
                color="#6200EE"
                {...this.btnSignUpProps}
              />
            </View>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10
  },

  inputWeb: {
    flex: 1,
    flexDirection: "row",
    marginTop: 24,
    fontSize: 18,
    padding: 10,
    borderBottomColor: "#767676",
    includeFontPadding: true,
    borderBottomWidth: 1
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 10
  },
  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    marginTop: 10,
    paddingLeft: 0
  },
  passwordShowHide: {
    alignSelf: "center"
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: -1
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  keyboardPadding: { flex: 1 },
  btnLegalTermsAndCondition: { color: "#6200EE" },
  btnLegalPrivacyPolicy: { color: "#6200EE", marginLeft: "auto" },
  leagalText: { marginTop: 10 },
  headline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  signUpText: {
    fontSize: 32,
    color: "#6200EE",
    fontWeight: "bold"
  }
  // Customizable Area End
});
