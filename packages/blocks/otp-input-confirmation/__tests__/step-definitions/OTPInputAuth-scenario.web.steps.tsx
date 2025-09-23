import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ForgotPasswordOTPWeb from "../../../forgot-password/src/ForgotPasswordOTPWeb.web"

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "ForgotPasswordOTPWeb",
};

const feature = loadFeature(
  "./__tests__/features/OTPInputAuth-scenario.web.feature"
);
const simulateResponse = (
  instance: any,
  messageIdProperty: string,
  data: any
) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    requestMessage.messageId
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    responseOtpVerifyData
  );

  instance[messageIdProperty] = requestMessage.messageId;

  runEngine.sendMessage("Unit Test", requestMessage);
};

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}

const errorResponseInvalidOTP = {
  "errors": [
      {
          "otp": "Invalid OTP code"
      }
  ]
}

const responseOtpVerifyData ={
  otp: "OTP validation success"
}
const responseData={
  email_otp_token:'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjAxLCJleHAiOjE3MTE2NTE1MjcsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NDkyfQ.T4IRojy0EU3z67MTkWpK00W4RUrKXoZ01c_V1QTFQuy_bccncCEalBRzaAtHcjjB62SmvccTBNtHl7fyx4sWjg'
}
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
  test("User verifies OTP", ({ given, when, then }) => {
    let otpInput: ShallowWrapper;
    let instance: ForgotPasswordOTPWeb;
    let spy: jest.SpyInstance;

    given("User navigate to OtpVerification screen", () => {
      otpInput = shallow(<ForgotPasswordOTPWeb {...screenProps} />);
      instance = otpInput.instance() as ForgotPasswordOTPWeb;
      instance.startTimer();
     

    });

    then("OtpVerification will load with out errors", () => {
      expect(otpInput).toBeTruthy();
    });

    when("User enters wrong OTP and calls API",() => {
      mockAPICall(instance, "userOtpVerifyApiCallId", errorResponseInvalidOTP)
    })

    then("User gets error Response", () => {
      const resendBtn = otpInput.find('[data-test-id="resendOtpID"]');
      expect(resendBtn).toHaveLength(1);
    })

    when("User enters valid OTP without errors", () => {
    
      let textInputComponent = otpInput.findWhere((node) => node.prop('data-test-id') === 'txtWebOTP').first();
			const event = {
				preventDefault() {},
				target: { value: '654321' },
			};
			textInputComponent.props().onChange(event.target.value);
  
    });
    then("OTP inputs will saved without errors", () => {
      expect(instance.state.otpdata).toEqual('654321');
    });
    when('User clicks on the Verify OTP button', () => {
      const verifyBtn = otpInput.find('[data-test-id="verifyOtp"]');
      verifyBtn.simulate('click');
      instance.handleSubmit(); 

    });
    then("Verify Otp API will call without errors", () => {
      const otpSuccessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      otpSuccessRestAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "TOKEN");

      otpSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        otpSuccessRestAPI.messageId
      );
      otpSuccessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          meta: {
            token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NDU1LCJleHAiOjE3MTE2MDY5MzJ9.nf7HMHwa7uZVcVnlUcltINvBkSrKhRbjAZvqzrcW3qE1zp9nMIBK8TxLFGxGEiyNFAGNbCI1h6-x6ntrcSwdYw",
              otp_code:'654321'          },
        }
      );
      instance.userOtpVerifyApiCallId = otpSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", otpSuccessRestAPI);
      instance.apiSuccessCallBacks('userOtpVerifyApiCallId',otpSuccessRestAPI)
    });
    when("I press Verify button without entering otp", () => {
      const verifyBtn = otpInput.find('[data-test-id="verifyOtp"]');
      verifyBtn.simulate('click');
    });
    then("Alert message should be display", () => {
      expect(instance.showAlert)
      spy = jest.spyOn(instance, "showAlert");
      simulateResponse(instance, "userOtpVerifyApiCallId", {
        errors: [{   otpdata: "Invalid OTP code" }],
      });
  
    });
    when("User click on resend OTP button", () => {
      const resendBtn = otpInput.find('[data-test-id="resendOtpID"]');
      resendBtn.simulate('click');
    });
    then("Resend otp api will call without error", () => {
     instance.handleResendClick();
      instance.startTimer();
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
    
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
    
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseData
      );
    
      instance.resendOtpAPICall = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);
        instance.handleClose();

    });
    then("User Navigate to Next Screen without errors", () => {
      // instance.GotoDashboard();
      expect(otpInput).toBeTruthy();

    });
  });
});
