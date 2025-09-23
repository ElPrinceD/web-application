import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import KnowYourCustomerKycVerificationController, {
  Props,
} from "./KnowYourCustomerKycVerificationController";
import { Formik } from "formik";
import Scale from "../../../components/src/Scale";
const StartingValues = {
  firstNameDefault: "",
  lastNameDefault: "",
  middleNameDefault: "",
  emailStateDefault: "",
  nationalityDefault: "",
  dateOfBirth: "",
  phoneNumber: ""

}

export default class KnowYourCustomerKycVerification extends KnowYourCustomerKycVerificationController {

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <View style={styles.textviewstyle1}>
          <Text style={styles.textstyle1}>
            User Details
          </Text>
        </View>
        <Formik
          initialValues={StartingValues}
          validationSchema={this.signupValidationSchema}
          onSubmit={(values, { resetForm }) => {
            this.createAccount(values)
            resetForm({ values: StartingValues })
          }}
          validateOnBlur={true}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            handleSubmit,
            touched
          }) => (
            <>
              <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={styles.textheadingstyle}>Firstname</Text>
                <View style={styles.textinputviewstyle}>
                  <TextInput style={{ flex: 1, height: 40, fontSize: 14, fontWeight: '600', borderWidth: 0 }}
                    testID='firstName'
                    placeholder="Enter the Firstname"
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur('firstName')}
                    value={values.firstNameDefault}
                  />
                </View>
                {errors?.firstNameDefault && touched?.firstNameDefault && (<Text style={styles.errorText}>{errors?.firstNameDefault}</Text>)}

                <Text style={styles.textheadingstyle}>Middlename</Text>
                <View style={styles.textinputviewstyle}>
                  <TextInput style={{ flex: 1, height: 40, fontSize: 14, fontWeight: '600', borderWidth: 0 }}
                    testID="Middlename"
                    placeholder="Enter the Middlename"
                    onChangeText={handleChange("middlename")}
                    onBlur={handleBlur('middlename')}
                    value={values.middleNameDefault}
                  />
                </View>
                {errors?.middleNameDefault && touched?.middleNameDefault && (<Text style={styles.errorText}>{errors?.middleNameDefault}</Text>)}
                <Text style={styles.textheadingstyle}>Lastname</Text>
                <View style={styles.textinputviewstyle}>
                  <TextInput style={{ flex: 1, height: 40, fontSize: 14, fontWeight: '600', borderWidth: 0 }}
                    testID="lastName"
                    placeholder="Enter the lastname"
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur('lastName')}
                    value={values.lastNameDefault}
                  />
                </View>
                {errors?.lastNameDefault && touched?.lastNameDefault && (<Text style={styles.errorText}>{errors?.lastNameDefault}</Text>)}
                <Text style={styles.textheadingstyle}> Eamil  Address</Text>
                <View style={styles.textinputviewstyle}>
                  <TextInput style={{ flex: 1, height: 40, fontSize: 14, fontWeight: '600', borderWidth: 0 }}
                    testID='email'
                    placeholder="Enter the Mail id"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur('email')}
                    value={values.emailStateDefault}
                  />
                </View>
                {errors?.emailStateDefault && touched?.emailStateDefault && (<Text style={styles.errorText}>{errors?.emailStateDefault}</Text>)}
                <Text style={styles.textheadingstyle}>Phone Number</Text>
                <View style={styles.textinputviewstyle}>
                  <TextInput style={{ flex: 1, height: 40, fontSize: 14, fontWeight: '600', borderWidth: 0 }}
                    testID="phone"
                    placeholder="Enter the Phone Number"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur('phone')}
                    value={values.phoneNumber}
                  />
                </View>
                {errors?.phoneNumber && touched?.phoneNumber && (<Text style={styles.errorText}>{errors?.phoneNumber}</Text>)}
                <Text style={styles.textheadingstyle} >Nationality </Text>
                <View style={styles.textinputviewstyle}>
                  <TextInput style={{ flex: 1, height: 40, fontSize: 14, fontWeight: '600', }}
                    testID="nationality"
                    placeholder="Enter the Nationality"
                    onChangeText={handleChange("nationality")}
                    onBlur={handleBlur('nationality')}
                    value={values.nationalityDefault}
                  />
                </View>
                {errors?.nationalityDefault && touched?.nationalityDefault &&
                  (<Text style={styles.errorText}>
                    {errors.nationalityDefault}</Text>
                  )}
                <Text style={styles.textheadingstyle} >Date of Birth </Text>
                <View style={styles.textinputviewstyle}>
                  <TextInput style={{ flex: 1, height: 40, fontSize: 14, fontWeight: '600', }}
                    testID="Date of Birth"
                    placeholder="Enter the dateofbirth"
                    onChangeText={handleChange("dateofbirth")}
                    onBlur={handleBlur('dateofbirth')}
                    value={values.dateOfBirth}
                  />
                </View>
                {errors?.dateOfBirth && touched?.dateOfBirth && (<Text style={styles.errorText}>{errors?.dateOfBirth}</Text>)}
              </View>
              <View style={styles.btnview}>
                <TouchableOpacity testID="SubmituserDetails" style={styles.btnstyle} onPress={() => handleSubmit()}>
                  <Text style={styles.btntext}>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffffff",
  },
  textviewstyle1: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  textstyle1: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    color: '#282828'
  },
  textinputviewstyle: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    padding: 5, borderWidth: 1,
    borderColor: 'gray'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textheadingstyle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    marginTop: 10,
    color: 'gray'
  },
  btnstyle: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#6C4695'
  },
  btntext: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF'
  },
  btnview: {
    marginTop: 10,
    marginBottom: 30
  },
  errorText: {
    fontSize: Scale(10),
    color: "rgba(220, 96, 104, 1)",
    fontWeight: '700',
    marginTop: Scale(5)
  },
});
// Customizable Area End
