import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ChangePassword from "../../src/ChangePassword.web";

import { Box, Tabs } from "@material-ui/core";
import TabPanel from "../../../../components/src/SettingsTabPanel.web";
import CustomConfirmationPopup from "../../../../components/src/CustomConfirmationPopup";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "ChangePassword",
};

const mockApiCall = (
  instance: any,
  messageIdProperty: string,
  data: any,
  isError: boolean = false
) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    requestMessage.messageId
  );

  requestMessage.addData(
    getName(
      !isError
        ? MessageEnum.RestAPIResponceSuccessMessage
        : MessageEnum.RestAPIResponceErrorMessage
    ),
    data
  );

  instance[messageIdProperty] = requestMessage.messageId;

  runEngine.sendMessage("Unit Test", requestMessage);
};
const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-test-id") === testID);

const endUserProfileResponse = {
  "data": {
    "id": "613",
    "type": "profile",
    "attributes": {
      "id": 613,
      "first_name": "CHeck test",
      "last_name": null,
      "full_phone_number": "7768987442",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": 7768987442,
      "email": "ds01@yopmail.com",
      "activated": true,
      "user_type": "individual",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 1,
      "full_name": "Deep singh",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": "England",
      "address": "india",
      "contact_name": "Deep singh ",
      "company_name": "null Check Test",
      "photo": {
        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
      }
    }
  }
};

const notaryUserProfileResponse = {
  "data": {
    "id": "613",
    "type": "profile",
    "attributes": {
      "id": 613,
      "first_name": "CHeck test",
      "last_name": null,
      "full_phone_number": "7768987442",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": 7768987442,
      "email": "ds01@yopmail.com",
      "activated": true,
      "user_type": "notary",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 2,
      "full_name": "Deep singh",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": "England",
      "address": "india",
      "contact_name": "Deep singh ",
      "company_name": "null Check Test",
      "photo": {
        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
      }
    }
  }
};

const stripeConnectMockRes = {
  "data": {
    "url": "https://connect.stripe.com/setup/s/acct_1PrJMJQo2myev5TR/bJWHq1cJr5KL"
  },
  "connected_account": "acct_1PrJMJQo2myev5TR"
}

const feature = loadFeature(
  "./__tests__/features/ChangePassword-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ChangePassword", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ChangePassword;

    given("I am a User loading ChangePassword", () => {
      exampleBlockA = shallow(<ChangePassword {...screenProps} />);
    });

    when("I navigate to the ChangePassword", () => {
      instance = exampleBlockA.instance() as ChangePassword;
      instance.setToken("token");
      instance.handleClickShowPassword()
      instance.handleClickShowCurrentPassword()
      instance.handleClickShowConfirmPassword()
      instance.validateConfirmPassword("hg")
    });

    then("User can see the new password input field", () => {
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");

      expect(newPasswordInput).toBeTruthy();
    });

    then("ChangePassword will load with out errors", () => {
      const currentPasswordInput = findByTestID(exampleBlockA, "current-password-field");
      currentPasswordInput.simulate('change', { target: { value: 'jjsd*' } });
      currentPasswordInput.simulate('change', { target: { value: '*jjsd' } });
      currentPasswordInput.simulate('change', { target: { value: '*jjsd*' } })
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      newPasswordInput.simulate('change', { target: { value: 'jjsd*' } })
      newPasswordInput.simulate('change', { target: { value: '*jjsd' } })
      newPasswordInput.simulate('change', { target: { value: '*jjsd*' } })
      const confirmPasswordInput = findByTestID(exampleBlockA, "confirm-password-field");
      confirmPasswordInput.simulate('change', { target: { value: 'jjsd*' } })
      confirmPasswordInput.simulate('change', { target: { value: '*jjsd' } })
      confirmPasswordInput.simulate('change', { target: { value: '*jjsd*' } });

      const button1 = findByTestID(exampleBlockA, "change-password-btn");
      button1.simulate('click')
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter different new and confirm password and click change password button", () => {
      const currentPasswordInput = findByTestID(exampleBlockA, "current-password-field");
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      const confirmPasswordInput = findByTestID(exampleBlockA, "confirm-password-field");

      currentPasswordInput.simulate('change', { target: { value: 'Jjsd#123' } });
      newPasswordInput.simulate('change', { target: { value: 'Jjsd#123' } });
      confirmPasswordInput.simulate('change', { target: { value: 'jsd#123' } });

      const button1 = findByTestID(exampleBlockA, "change-password-btn");
      button1.simulate('click')
      expect(instance.state.openConfirmationPopup).toBeFalsy();

    });

    then("I can enter same new and confirm password and click change password button", () => {
      const currentPasswordInput = findByTestID(exampleBlockA, "current-password-field");
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      const confirmPasswordInput = findByTestID(exampleBlockA, "confirm-password-field");

      currentPasswordInput.simulate('change', { target: { value: 'Jjsd#123' } });
      newPasswordInput.simulate('change', { target: { value: 'Jjsd#123' } });
      confirmPasswordInput.simulate('change', { target: { value: 'Jjsd#123' } });

      const button1 = findByTestID(exampleBlockA, "change-password-btn");
      button1.simulate('click')
      expect(instance.state.openConfirmationPopup).toBeTruthy();

      const popupProps = {
        type:"warning",
        closePopup:jest.fn(),
        btntext:" Yes",
        submitPopup:instance.handleSubmitConfirmationPopup,
        discText:"Are you sure, you want to change the password?",
      }
      const customPopup = shallow(<CustomConfirmationPopup {...popupProps} />);
      const button2 = findByTestID(customPopup, "ok-btn");
      button2.simulate('click');

      mockApiCall(instance, "changePasswordApiCallId", { error: "Incorrect old password." })
      mockApiCall(instance, "changePasswordApiCallId", { error: "Must be different from your last 3 passwords." });
      mockApiCall(instance, "changePasswordApiCallId", { message: "success" });
      
      expect(instance.state.openSuccessPopup).toBeTruthy();
    });

    then("User can see the first errors message in red color if validation is not passed", () => {
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      newPasswordInput.simulate('change', { target: { value: 'Jjs' } });

      expect(instance.state.isValidLength).toBeFalsy();
    });

    then("User can see the second errors message in red color if validation is not passed", () => {
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      newPasswordInput.simulate('change', { target: { value: 'Jjswcwc' } });

      expect(instance.state.isChecklowerUpperCase).toBeFalsy()
    });

    then("User can see the third errors message in red color if validation is not passed", () => {
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      newPasswordInput.simulate('change', { target: { value: ' Jjswcwc' } });

      expect(instance.state.isNoBlankSpace).toBeFalsy()
    });

    then("User can see the fourth error message in red color if validation is not passed", () => {
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      newPasswordInput.simulate('change', { target: { value: '' } });
      mockApiCall(instance, "checkLastPasswordApiCallId", {error: "password must be different from last 3 password"});
      mockApiCall(instance, "checkLastPasswordApiCallId", {message: "password not matched"})

      newPasswordInput.simulate('change', { target: { value: 'sdff' } });

      mockApiCall(instance, "checkLastPasswordApiCallId", {message: "password not matched"});
      mockApiCall(instance, "checkLastPasswordApiCallId", {error: "password must be different from last 3 password"});
      

      expect(instance.state.previousPasswordError).toBeTruthy()
    });

    then("User can see the all errors message in red color no password is passed", () => {
      const currentPasswordInput = findByTestID(exampleBlockA, "current-password-field");
      const newPasswordInput = findByTestID(exampleBlockA, "new-password-field");
      const confirmPasswordInput = findByTestID(exampleBlockA, "confirm-password-field");

      currentPasswordInput.simulate('change', { target: { value: '' } });
      newPasswordInput.simulate('change', { target: { value: '' } });

      const button1 = findByTestID(exampleBlockA, "change-password-btn");
      button1.simulate('click')

      expect(instance.state.openConfirmationPopup).toBeFalsy()
    });

    then("I can leave the screen with out errors", () => {
      // instance.checkEmpty();
      instance.handleCloseConfimationPopup();
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
