import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ForgotPassword from "../../src/ForgotPassword";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "ForgotPassword",
};

const formikChildProps = {
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  errors: {
    phone: true,
    email: true,
    otpCode: true,
  },
  setFieldTouched: jest.fn(),
  touched: {
    phone: true,
    email: true,
    otpCode: true,
  },
};

const feature = loadFeature(
  "./__tests__/features/ForgotPassword-scenario.feature"
);

const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testid") === testID);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to ForgotPassword", ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let formikChildWrapper: ShallowWrapper;
    let instance: ForgotPassword;

    given("I am a User loading to ForgotPassword", () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
    });

    when("I navigate to the ForgotPassword Screen", () => {
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.showAlert = jest.fn();
    });

    then("ForgotPassword will load with out errors", () => {
      expect(findByTestID(forgotPasswordWrapper, "enterOtpForm")).toHaveLength(
        0
      );
    });

    then("Network api shoudl be called for getiing validation rules", () => {
      expect(runEngine.sendMessage).not.toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "profile/validations",
            RestAPIRequestHeaderMessage: expect.any(String),
          },
        })
      );
    });

    when("Network response for validation rules is set", () => {
      const mockData = {
        data: [
          {
            email_validation_regexp: "",
            password_validation_rules: "",
          },
        ],
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

      instance.validationAPICallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        undefined
      );

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    then("Email schema is set", () => {
      expect(instance.state.emailSchema).toBeTruthy();
    });

    when(
      "I can click on sms account button for forgot password with mobile number",
      () => {
        const forgotPasswordSmsBtn = forgotPasswordWrapper.findWhere(
          (node) =>
            node.prop("testID") ===
            "startForgotPasswordButtonForForgotPasswordSMS"
        );
        forgotPasswordSmsBtn.simulate("press");
      }
    );

    then("Forgot password with sms form should be render", () => {
      const forgotPasswordSmsForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "forgotPasswordSmsForm"
      );
      formikChildWrapper = shallow(
        forgotPasswordSmsForm.props().children(formikChildProps)
      );

      expect(forgotPasswordSmsForm).toBeTruthy();
    });

    when("I can enter phone number in text field", () => {
      const txtInputPhoneNumber = formikChildWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputPhoneNumber"
      );
      txtInputPhoneNumber.simulate("changeText", "0000000000");
      txtInputPhoneNumber.simulate("blur");
    });

    then("handleChange function should be call for update value", () => {
      expect(formikChildProps.handleChange).toBeCalledWith("phone");
      jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    });

    when(
      "I can submit the form with phone number without selected country code",
      () => {
        const btnOtpForPhoneNumberButton = formikChildWrapper.findWhere(
          (node) => node.prop("testID") === "btnOtpForPhoneNumberButton"
        );
        const forgotPasswordSmsForm = forgotPasswordWrapper.findWhere(
          (node) => node.prop("data-testid") === "forgotPasswordSmsForm"
        );
        forgotPasswordSmsForm.simulate("submit", "0000000000", {
          setSubmitting: jest.fn(),
        });
        btnOtpForPhoneNumberButton.simulate("press");
      }
    );

    then("I can see alert message for country code validation", () => {
      expect(formikChildProps.handleSubmit).toBeCalled();
      expect(instance.showAlert).not.toBeCalledWith(
        "Error",
        "Please select country code"
      );
    });

    when("Country code should be set from message", () => {
      const countrycodeMsg = new Message(
        getName(MessageEnum.CountryCodeMessage)
      );

      countrycodeMsg.addData(getName(MessageEnum.CountyCodeDataMessage), " +1");

      runEngine.sendMessage("Unit Test", countrycodeMsg);
    });

    when("I select country code from select list", () => {
      const forgotPasswordSmsForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "forgotPasswordSmsForm"
      );
      formikChildWrapper = shallow(
        forgotPasswordSmsForm.props().children(formikChildProps)
      );
      instance.setState({ countryCodeSelected: "+1" });
    });

    when("I can press on submit button", () => {
      const btnOtpForPhoneNumberButton = formikChildWrapper.findWhere(
        (node) => node.prop("testID") === "btnOtpForPhoneNumberButton"
      );
      btnOtpForPhoneNumberButton.simulate("press");
    });

    when("Submit function should be called", () => {
      const forgotPasswordSmsForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "forgotPasswordSmsForm"
      );
      forgotPasswordSmsForm.simulate("submit", "0000000000", {
        setSubmitting: jest.fn(),
      });
    });

    then("Network should be called for getting otp", () => {
      expect(runEngine.sendMessage).not.toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "profile/validations",
            RestAPIRequestHeaderMessage: expect.any(String),
          },
        })
      );
    });

    when("Network response should be get with errors", () => {
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: {},
      });

      instance.requestPhoneOtpCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        undefined
      );
      responseMsg.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {});

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    when("Network response should be get with success response data", () => {
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

      instance.requestPhoneOtpCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    then("Token is set", () => {
      expect(findByTestID(forgotPasswordWrapper, "enterOtpForm")).toHaveLength(
        0
      );
    });
  });

  test("User navigates to ForgotPassword with email id", ({
    given,
    when,
    then,
  }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let formikChildWrapper: ShallowWrapper;
    let instance: ForgotPassword;

    given("I am a User loading to ForgotPassword", () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
    });

    when(
      "I can click on email account button for forgot password with mobile number",
      () => {
        const forgotPasswordEmailBtn = forgotPasswordWrapper.findWhere(
          (node) =>
            node.prop("testID") === "startForgotPasswordButtonForForgotEmail"
        );
        forgotPasswordEmailBtn.simulate("press");
      }
    );

    when("Country code should be set from message", () => {
      const countrycodeMsg = new Message(
        getName(MessageEnum.CountryCodeMessage)
      );

      countrycodeMsg.addData(getName(MessageEnum.CountyCodeDataMessage), "+1");

      runEngine.sendMessage("Unit Test", countrycodeMsg);
    });

    then("Forgot password with email form should be render", () => {
      const forgotPasswordEmailForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "forgotPasswordEmailForm"
      );
      formikChildWrapper = shallow(
        forgotPasswordEmailForm.props().children(formikChildProps)
      );

      expect(forgotPasswordEmailForm).toBeTruthy();
    });

    when("I can enter email id in text field", () => {
      jest.spyOn(helpers, "getOS").mockImplementation(() => "android");

      const forgotPasswordEmailForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "forgotPasswordEmailForm"
      );
      formikChildWrapper = shallow(
        forgotPasswordEmailForm.props().children(formikChildProps)
      );
      const txtInputEmail = formikChildWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputEmail"
      );
      txtInputEmail.simulate("changeText", "test@test.com");
      txtInputEmail.simulate("blur");
    });

    then("handleChange function should be call for update value", () => {
      expect(formikChildProps.handleChange).toBeCalledWith("email");
    });

    when("I can submit the form with email id", () => {
      const btnGetOtpForEmailButton = formikChildWrapper.findWhere(
        (node) => node.prop("testID") === "btnGetOtpForEmailButton"
      );
      const forgotPasswordEmailForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "forgotPasswordEmailForm"
      );
      forgotPasswordEmailForm.simulate(
        "submit",
        { accountType: "email", email: "test@test.com" },
        {
          setSubmitting: jest.fn(),
        }
      );
      btnGetOtpForEmailButton.simulate("press");
    });

    then("Network should be called for getting otp for email", () => {
      expect(runEngine.sendMessage).not.toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "forgot_password/otp",
            RestAPIRequestHeaderMessage: expect.any(String),
            RestAPIRequestBodyMessage: JSON.stringify({
              data: {
                type: "email",
                attributes: {
                  email: "test@test.com",
                },
              },
            }),
          },
        })
      );
    });

    when("Network response should be get with error", () => {
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: {},
      });

      instance.requestEmailOtpCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        undefined
      );
      responseMsg.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {});

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    when("Network response should be get with success response", () => {
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

      instance.requestEmailOtpCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    then("Token is set", () => {
      expect(findByTestID(forgotPasswordWrapper, "enterOtpForm")).toHaveLength(
        0
      );
    });

    when("Navigation payLoad message should be get", () => {
      const navigationMsg = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

      navigationMsg.addData(
        getName(MessageEnum.NavigationForgotPasswordPageInfo),
        "email"
      );

      runEngine.sendMessage("Unit Test", navigationMsg);
      instance.setState({ accountStatus: "EnterEmailOTP" });
    });

    when("Forgot password with email form should be render", () => {
      jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
      const enterOtpForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "enterOtpForm"
      );
      formikChildWrapper = shallow(
        enterOtpForm.props().children(formikChildProps)
      );
    });

    when("I can enter otp in text field", () => {
      const txtInputOtpCode = formikChildWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputOtpCode"
      );
      txtInputOtpCode.simulate("changeText", "1234");
      txtInputOtpCode.simulate("blur");
    });

    then("handleChange function should be called", () => {
      expect(formikChildProps.handleChange).toBeCalledWith("otpCode");
    });

    when("I can press submit button to submit otp", () => {
      const handleSubmitButtonForOtpCode = formikChildWrapper.findWhere(
        (node) => node.prop("testID") === "handleSubmitButtonForOtpCode"
      );
      const enterOtpForm = forgotPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "enterOtpForm"
      );
      handleSubmitButtonForOtpCode.simulate("press");
      enterOtpForm
        .props()
        .onSubmit({ otpCode: "1234" }, { setSubmitting: jest.fn() });
    });

    then("Network api request should be call", () => {
      expect(runEngine.sendMessage).not.toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "otp_confirmation",
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
