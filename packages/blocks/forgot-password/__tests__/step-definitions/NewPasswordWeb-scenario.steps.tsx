import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { expect, jest, beforeEach } from "@jest/globals";
import NewPasswordWeb from "../../src/NewPasswordWeb.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "NewPasswordWeb",
};

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgSucessRestAPI.messageId
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    apiData
  );
  instance[apiCallID] = msgSucessRestAPI.messageId;
  runEngine.sendMessage("Unit Test", msgSucessRestAPI);
  return instance[apiCallID];
};

const feature = loadFeature(
  "./__tests__/features/NewPasswordWeb-scenario.web.feature"
);

const emailDataNew = {
  email: "example@gmail.com",
  password: "Example@123",
  contact_name: "Example Contact",
  company_name: "Business Company",
  role_id: 1,
  user_type: "individual",
};

const CheckPasswordError = {
  error: "Must be different from your last 3 passwords.",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("Enter New Password", ({ given, when, then }) => {
    let NewPasswordWeb1: ShallowWrapper;
    let NewPasswordWebInstance: NewPasswordWeb;

    given("I am a User attempting to Enter New Password", () => {
      NewPasswordWeb1 = shallow(<NewPasswordWeb {...screenProps} />);
      expect(NewPasswordWeb).toBeTruthy();
    });

    when("I navigate to the New Password Screen", () => {
      NewPasswordWebInstance = NewPasswordWeb1.instance() as NewPasswordWeb;
    });

    when("I enter password", () => {
      let buttonComponent = NewPasswordWeb1.findWhere(
        (node) => node.prop("data-test-id") === "passwordID"
      );
      buttonComponent.simulate("change", {
        target: { value: "", name: "newPassword" },
      });
    });

    when("I enter confirm password", () => {
      let buttonComponent = NewPasswordWeb1.findWhere(
        (node) => node.prop("data-test-id") === "reTyprPasswrdID"
      );
      buttonComponent.simulate("change", {
        target: { value: "", name: "reTypePassword" },
      });
      NewPasswordWebInstance.setState({ isValidLength: true });
      NewPasswordWebInstance.setState({ iSValidPassword: true });
      NewPasswordWebInstance.validateConfirmPassword("Test@1234");
      mockAPICall(NewPasswordWeb1, "getProfileApiCallID", CheckPasswordError);
    });

    then("I handle failed API call and show error result", () => {
      const failedApiResponse = {
        errors: [{ detail: "Must be different from your last passwords." }],
      };

      const requestEmailOtpCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestEmailOtpCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestEmailOtpCallId.messageId
      );
      requestEmailOtpCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        failedApiResponse
      );
      NewPasswordWebInstance.requestpasswordCallId =
        requestEmailOtpCallId.messageId;
      runEngine.sendMessage("Unit Test", requestEmailOtpCallId);
      expect(requestEmailOtpCallId.id).toBe("RestAPIResponceMessage");
    });

    then("I call api again on email", () => {
      NewPasswordWebInstance.setState({ errorConfirmPasswordFlag: false });
      const event = {
        preventDefault() {},
        target: {
          message: "Password updated successfully",
        },
      };
      NewPasswordWebInstance.handleNewPassword(event);
      NewPasswordWebInstance.checkPasswordValidations();
      expect(NewPasswordWebInstance.state.errorConfirmPasswordFlag).toEqual(
        true
      );
      const requestEmailOtpCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestEmailOtpCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestEmailOtpCallId.messageId
      );
      requestEmailOtpCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        emailDataNew
      );
      NewPasswordWebInstance.requestpasswordCallId =
        requestEmailOtpCallId.messageId;
      runEngine.sendMessage("Unit Test", requestEmailOtpCallId);
      expect(requestEmailOtpCallId.id).toBe("RestAPIResponceMessage");

      NewPasswordWebInstance.handleClickShowPassword();
      NewPasswordWebInstance.handleClickConfirmPassword();
      NewPasswordWebInstance.checkPasswordValidations();
      NewPasswordWebInstance.handleClose();
      NewPasswordWebInstance.GotoDashboard();
      NewPasswordWebInstance.goToLoginPage();

      NewPasswordWebInstance.setState({ enableSuccessModel: true });
      NewPasswordWebInstance.handlepasswordFunction("test");

      NewPasswordWebInstance.setState({
        newPassword: "test",
        reTypePassword: "test@2",
      });
      NewPasswordWebInstance.checkPasswordValidations();

      NewPasswordWebInstance.setState({
        newPassword: "Test@123",
        reTypePassword: "Test@123",
        isNoBlankSpace: true,
        isChecklowerUpperCase: true,
        isValidLength: true,
      });
      NewPasswordWebInstance.checkPasswordValidations();
    });

    when("User click on Login Button", () => {
      const resendBtn = NewPasswordWeb1.findWhere(
        (node) => node.prop("data-test-id") === "logintestid"
      );
      resendBtn.simulate("click");
    });
    then("User Navigate to Next Screen without errors", () => {
      NewPasswordWebInstance.goToLoginPage();
      expect(NewPasswordWeb1).toBeTruthy();
    });

    when("User clicks on go to dashboard button", () => {
      const goToDashboardPage = NewPasswordWeb1.findWhere(
        (node) => node.prop("data-test-id") === "logintestid"
      );
      goToDashboardPage.simulate("click");
    });

    then("User gets navigated to dashboard page", () => {
      const goToDashboard = NewPasswordWeb1.findWhere(
        (node) => node.prop("data-test-id") === "logintestid"
      );
      expect(goToDashboard).toHaveLength(1);
    });
  });
});
