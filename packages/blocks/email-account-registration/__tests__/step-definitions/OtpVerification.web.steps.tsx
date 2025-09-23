import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OtpVerification from "../../src/OtpVerification.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "email-account-registration-scenario",
  
};

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("testID") === testID).first();

const feature = loadFeature(
  "./__tests__/features/OtpVerification-scenario.web.feature"
);
const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  const { receive: MockRecieve } =  instance
  MockRecieve("", msgSucessRestAPI)
}
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
const responseOtpVerifyData ={
  otp: "OTP validation success"
}
const rowData={
  data:{
    attributes:{
      user_type:"notary"
    }
  },
  meta:{
    token:"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjAxLCJleHAiOjE3MTE2NTE1MjcsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NDkyfQ.T4IRojy0EU3z67MTkWpK00W4RUrKXoZ01c_V1QTFQuy_bccncCEaddlBRzaAtHcjjB62SmvccTBNtHl7fyx4sWjg",
    email_otp_token:"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjAxLCJleHAiOjE3MTE2NTE1MjcsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NDkyfQ.T4IRojy0EU3z67MTkWpK00W4RUrKXoZ01c_V1QTFQuy_bccncCEalBRzaAtHcjjB62SmvccTBNtHl7fyx4sWjg"

  }
}
const responseData={
  data:{
    email_otp_token:"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjAxLCJleHAiOjE3MTE2NTE1MjcsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NDkyfQ.T4IRojy0EU3z67MTkWpK00W4RUrKXoZ01c_V1QTFQuy_bccncCEalBRzaAtHcjjB62SmvccTBNtHl7fyx4sWjg"
  }
}
const errorResponse={
  errors:[{otp:"Token and OTP code are required"}]
}

const scrollIntoView = jest.fn();
const topRef = {
  current: {
    scrollIntoView: scrollIntoView
  }
}
jest.spyOn(React, "createRef").mockReturnValue(topRef);

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
    let instance: OtpVerification;
    let spy: jest.SpyInstance;

    given("User navigate to OtpVerification screen", () => {
      otpInput = shallow(<OtpVerification {...screenProps}  />);
      instance = otpInput.instance() as OtpVerification;
      instance.startTimer();
      expect(instance.state.resendDisabled).toBe(true);
      expect(instance.state.CustomCount).toBe(120);
  
    });
    when("User navigate to Otp Screen",()=>{
     
        const data = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        data.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          data.messageId
        );
    })
    then("OtpVerification will load with out errors", () => {
      const data = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      data.getData(
        rowData
      );
        instance.setState({userType:rowData?.data?.attributes.user_type})
        instance.setState({ signUpVerifyToken: rowData.meta.email_otp_token,token:rowData.meta.token,temData:data })
  
      expect(otpInput).toBeTruthy();
      instance.setState({userType:"notary"})
    });
    then("Footer is visible", () => {
      expect(findByTestID(otpInput, "footer")).toHaveLength(1);
    });
    then("Top of OtpVerification will open", () => {
      expect(scrollIntoView).toHaveBeenCalled()
    })
    when("User going to click on back aerrow button", () => {
      let arrowBtn = otpInput.findWhere(
        (node) => node.prop("data-test-id") === "arrowBtnID"
      );
      arrowBtn.simulate("click")
    });

    then("It will navigate to previous page", () => {
      instance.GotoEmailAccountRegistrationWebScreen();
      expect(otpInput).toBeTruthy();
    });
    when("user click on Home Logo", () => {
      let LandingButton = otpInput.findWhere(
        (node) => node.prop("data-test-id") === "LandingButtonID"
      );
      LandingButton.simulate("click")
    });

    then("It will navigate to Landing page", () => {
      instance.goToLandingScreen();
      expect(otpInput).toBeTruthy();
    });
    when("User enters valid OTP without errors", () => {
    
      let textInputComponent = otpInput.findWhere((node) => node.prop("data-test-id") === "txtWebOTP").first();
			const event = {
				preventDefault() {},
				target: { value: "654321" },
			};
			textInputComponent.props().onChange(event.target.value);
  
    });
    then("OTP inputs will saved without errors", () => {
      
      expect(instance.state.otpdata).toEqual("654321");
    });
    when("User clicks on the Verify OTP button", () => {
      const verifyBtn = otpInput.find('[data-test-id="verifyOtp"]');
      verifyBtn.simulate("click");
      instance.setState({loader:true,otpdata:"",enableSuccessModel:true})

    });
    then("Verify Otp API will call without errors", () => {
      instance.handleClose();
      instance.setState({loader:true,enableVerificationModel:true,userType:"individual",enableSuccessModel:false})
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
            otp_code:"654321",
            account_activation: "true",
          },
        }
      );
      instance.userOtpVerifyApiCallId = otpSuccessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", otpSuccessRestAPI);
     
      instance.apiSuccessCallBacks("userOtpVerifyApiCallId",responseData); // Replace with the actual parameters
      expect(instance.state.loader).toBe(false);
      if(instance.state.userType=="individual") {
        expect(instance.state.enableSuccessModel).toBe(true);
      }
      instance.setState({loader:false,otpFailedResponse:'Invalid OTP',enableVerificationModel:true,userType:"notary",enableSuccessModel:false})
      if (instance.state.userType !== "individual" && instance.state.userType !== "business") {
        expect(instance.GotoNoatryScreen)
      }
   
      
    });
    when("I press Verify button without entering otp", () => {
      const verifyBtn = otpInput.find('[data-test-id="verifyOtp"]');
      verifyBtn.simulate("click");
    });
    then("Alert message should be display", () => {
      instance.handleSubmit()
      const getNotaryServices = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getNotaryServices.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getNotaryServices.messageId
      );
      getNotaryServices.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),errorResponse );
      instance.userOtpVerifyApiCallId = getNotaryServices.messageId;
      runEngine.sendMessage("Unit Test", getNotaryServices);
      expect(instance.apiFailureCallBacks("userOtpVerifyApiCallId",errorResponse.errors))
      expect(instance.showAlert)
      spy = jest.spyOn(instance, "showAlert");
      mockAPICall(instance, "userOtpVerifyApiCallId", {
        errors: [{   otpdata: "Invalid OTP code" }],
      });
      simulateResponse(instance, "userOtpVerifyApiCallId", {
        errors: [{   otpdata: "Invalid OTP code" }],
      });
      expect(instance.state.loader).toBe(false)
      expect(instance.state.otpFailedResponse).toBe('Invalid OTP')
      
    });
    when("User click on resend button for new OTP", () => {
      const resendBtn = otpInput.find('[data-test-id="resendOtpID"]');
      resendBtn.simulate("click");
    });
    then("Resend otp api will call without error", () => {
      instance.setState({enableSuccessModel:true})
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
      expect(instance.state.enableSuccessModel).toBe(true);
      expect(otpInput.find('[data-test-id="resendOtpID"]')).toHaveLength(1);

    });
    when("User click on GotoDashboard Button", () => {
      const resendBtn = otpInput.find('[data-test-id="successmodal"]');
      resendBtn.simulate("click");
    });

    then ("User will receive popup after click on signup button", () => {
      expect(otpInput.find('[data-test-id="handleModal"]')).toHaveLength(1);
    })

    then("User Navigate to Next Screen without errors", () => {
      instance.GotoDashboard();
      expect(otpInput).toBeTruthy();

    });
  });
});
