import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OTPInputAuth from "../../src/OTPInputAuth";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "EmailAccountLoginBlock",
};

const feature = loadFeature(
  "./__tests__/features/OTPInputAuth-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");
  });
  afterEach(() => {
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "web",
      select: jest.fn(),
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to OTPInputAuth", ({ given, when, then }) => {
    let otpInputAuth: ShallowWrapper;
    let instance: OTPInputAuth;

    given("I am a User loading OTPInputAuth", () => {
      otpInputAuth = shallow(<OTPInputAuth {...screenProps} />);
    });

    when("I navigate to the OTPInputAuth", () => {
      instance = otpInputAuth.instance() as OTPInputAuth;
      instance.showAlert = jest.fn();
    });

    then("OTPInputAuth will load with out errors", () => {
      expect(otpInputAuth).toBeTruthy();
    });

    when("Getting payload message from navigation adapter", () => {
      const responseTokenMsg = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

      responseTokenMsg.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "token-string"
      );

      responseTokenMsg.addData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage),
        "0000000000"
      );

      responseTokenMsg.addData(
        getName(MessageEnum.AuthTokenEmailMessage),
        "test@test.com"
      );

      runEngine.sendMessage("Unit Test", responseTokenMsg);
    });

    when("I can press submit button without entering otp", () => {
      const btnSubmitOTP = otpInputAuth.findWhere(
        (node) => node.prop("testID") === "btnSubmitOTP"
      );
      btnSubmitOTP.simulate("press");
    });

    then("Alert message should be display", () => {
      expect(instance.showAlert).toBeCalledWith("Error", "OTP is not valid.");
    });

    when("I am entering otp in otp text input", () => {
      const txtMobilePhoneOTP = otpInputAuth.findWhere(
        (node) => node.prop("testID") === "txtMobilePhoneOTP"
      );
      txtMobilePhoneOTP.simulate("changeText", "1234");
    });

    when("I click anywhere to hide keyboard view", () => {
      const hideKeyboard = otpInputAuth.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      hideKeyboard.simulate("press");
    });

    then("Otp state should be updated", () => {
      expect(instance.state.otp).toBe("1234");
    });

    when("I can press submit button to verfy otp", () => {
      const btnSubmitOTP = otpInputAuth.findWhere(
        (node) => node.prop("testID") === "btnSubmitOTP"
      );
      btnSubmitOTP.simulate("press");
    });

    then("Network should be send request for verify otp", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage:
              "account/accounts/sms_confirmation?pin=1234",
            RestAPIRequestHeaderMessage: expect.any(String),
            RestAPIRequestBodyMessage: '"{}"',
          },
        })
      );
    });

    when("Network response should be set for verify otp", () => {
      const mockData = {
        meta: {
          token: "token-string",
        },
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockData
      );

      instance.otpAuthApiCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    when("I submit otp for forgot password", () => {
      instance.setState({ isFromForgotPassword: true });
      instance.submitOtp();
    });

    when("Network response should be set for verify otp", () => {
      const mockData = {
        meta: {
          token: "token-string",
        },
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockData
      );
      responseMsg.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {});

      instance.otpAuthApiCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    then("Network should be send request for verify otp", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "forgot_password/otp_confirmation",
            RestAPIRequestHeaderMessage: expect.any(String),
            RestAPIRequestBodyMessage: JSON.stringify({
              data: {
                token: "token-string",
                otp_code: "1234",
              },
            }),
          },
        })
      );
    });
  });
  test("User navigates to OTPInputAuth in web", ({ given, when, then }) => {
    let otpInputAuth: ShallowWrapper;
    let instance: OTPInputAuth;

    given("I am a User loading to OTPInputAuth", () => {
      otpInputAuth = shallow(<OTPInputAuth {...screenProps} />);
      instance = otpInputAuth.instance() as OTPInputAuth;
    });

    then("OTPInputAuth will load with out errors", () => {
      expect(otpInputAuth).toBeTruthy();
    });

    when("I can enter otp in otp text input field", () => {
      const txtMobilePhoneOTP = otpInputAuth.findWhere(
        (node) => node.prop("testID") === "txtMobilePhoneOTP"
      );
      txtMobilePhoneOTP.simulate("changeText", "4321");
    });

    then("Text field is set", () => {
      expect(instance.state.otp).toBe("4321");
    });

    when("I can press submit button with wrong entered otp", () => {
      instance.submitOtp();
    });

    when("Network response should be get with error message", () => {
      const mockData = {
        errors: {},
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockData
      );
      responseMsg.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {});

      instance.otpAuthApiCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    then("Network should be send request for verify otp", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "forgot_password/otp_confirmation",
            RestAPIRequestHeaderMessage: expect.any(String),
            RestAPIRequestBodyMessage: JSON.stringify({
              data: {
                token: "token-string",
                otp_code: "1234",
              },
            }),
          },
        })
      );
    });
  });
});
