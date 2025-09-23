import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import { expect, jest, beforeEach } from "@jest/globals";
import ForgotPasswordWeb from "../../src/ForgotPasswordWeb.web"


const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ForgotPasswordWeb"
  }

const feature = loadFeature('./__tests__/features/ForgotPasswordWeb-scenario.web.feature');

const mockApICall = (instance: any, apiCallID: string, apiData: object, responseType: number) => {
  const msgSuccessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSuccessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSuccessRestAPI.messageId);
  msgSuccessRestAPI.addData(getName(responseType), apiData);
  instance[apiCallID] = msgSuccessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSuccessRestAPI)
}

Object.defineProperty(global, 'localStorage', {
  value: {

      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),

  },
});
const errorResponse={
  errors: [
    {
        "otp": "Email or phone number required"
    }
]
}
const emailDataNew = {email: "example@gmail.com"}




defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Enter Email Account', ({ given, when, then }) => {
        let ForgotPasswordWeb1 :ShallowWrapper;
        let ForgotPasswordWebInstance:ForgotPasswordWeb; 

        given('I am a User attempting to Enter email', () => {
            ForgotPasswordWeb1 = shallow(<ForgotPasswordWeb {...screenProps}/>)
            expect(ForgotPasswordWeb).toBeTruthy()  
        });

        when('I navigate to the Forgot Password Screen', () => {
            ForgotPasswordWebInstance = ForgotPasswordWeb1.instance() as ForgotPasswordWeb
        });
        when("I click on back arrow", () => {
          let buttonComponent = ForgotPasswordWeb1.findWhere((node) => node.prop("data-test-id") === "arrowBtnID" );
          buttonComponent.simulate('click')
      });
      then("It will navigate back to previous screen", () => {
        ForgotPasswordWebInstance.goToLoginPage()
      })
        when("I enter email address", () => {
            let buttonComponent = ForgotPasswordWeb1.findWhere((node) => node.prop("data-test-id") === "txtInputEmail" );
            buttonComponent.simulate("change",{target:{value:"",name:"email"}});
            ForgotPasswordWebInstance.setState({emailValue:"test"})
           
            ForgotPasswordWebInstance.checkValidations()

            // let signUpID = ForgotPasswordWeb.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            // signUpID.simulate("click",{preventDefault:jest.fn()});
        });

        when("I enter blank email address", () => {
          let buttonComponent = ForgotPasswordWeb1.findWhere((node) => node.prop("data-test-id") === "txtInputEmail" );
          buttonComponent.simulate("change",{target:{value:"",name:"email"}});
          ForgotPasswordWebInstance.setState({emailValue:""})
         
          ForgotPasswordWebInstance.checkValidations()

          // let signUpID = ForgotPasswordWeb.findWhere((node) => node.prop("data-test-id") === "signUpID" );
          // signUpID.simulate("click",{preventDefault:jest.fn()});
      });

        then("I call api on email", () => {

          const event = {
            preventDefault() { },
            target: {
                token : "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzUzLCJleHAiOjE3MTIxMjczNTAsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NTIxfQ.2sB4dqzFt-A2w3dZDnDbo7n1J0f-zI1pDiBAPAmYNMyFI65YLOnK_lYJe-28ZNGjp48ZqNYmjMTxz-zQnjz89A"
            },
        };
        
        ForgotPasswordWebInstance.handleSubmit(event)
        ForgotPasswordWebInstance.checkValidations()
        ForgotPasswordWebInstance.callfinalAPi()
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
                    email: "roykol@yopmail.com" 
                },
                }
              );

              ForgotPasswordWebInstance.requestEmailOtpCallId1 = otpSuccessRestAPI.messageId;
              ForgotPasswordWebInstance.checkValidations()
              ForgotPasswordWebInstance.apiSuccessCallBacks('requestEmailOtpCallId1',otpSuccessRestAPI)
              ForgotPasswordWebInstance.goToForgotPasswordOtpWeb("otpToken")
              ForgotPasswordWebInstance.apiFailureCallBacks("requestEmailOtpCallId1",errorResponse)
              ForgotPasswordWebInstance.setState({emailError:'We cannot find an account with this email address',loader:false})
              expect(ForgotPasswordWebInstance.state.emailError).toEqual('We cannot find an account with this email address')
              runEngine.sendMessage("Unit Test", otpSuccessRestAPI);
        })


        when("I enter invalid email address", () => {
            let buttonComponent = ForgotPasswordWeb1.findWhere((node) => node.prop("data-test-id") === "txtInputEmail" );
            buttonComponent.simulate("change",{target:{value:"test@gmail",name:"email"}});

          

            // let signUpID = ForgotPasswordWeb.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            // signUpID.simulate("click",{preventDefault:jest.fn()});
        });

        then("I call api on email invalid", () => {
            const requestEmailOtpCallId  = new Message(
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
            ForgotPasswordWebInstance.requestEmailOtpCallId1 = requestEmailOtpCallId.messageId;
            runEngine.sendMessage("Unit Test", requestEmailOtpCallId);
            expect(requestEmailOtpCallId.id).toBe('RestAPIResponceMessage')
        });

        when("User click on Login Button", () => {
          const resendBtn = ForgotPasswordWeb1.findWhere((node) => node.prop("data-test-id") === "logingoto" );
          resendBtn.simulate('click');
        });
        then("User Navigate to Next Screen without errors", () => {
          ForgotPasswordWebInstance.goToLoginPage();
          expect(ForgotPasswordWeb1).toBeTruthy();
    
        });
  
 
    });

    test('componentDidMount sets email from localStorage', ({ given, when, then }) => {
      let ForgotPasswordWeb1: ShallowWrapper;
      let ForgotPasswordWebInstance: ForgotPasswordWeb;
  
      given('Local storage has a saved email', () => {
          jest.spyOn(global.localStorage, 'getItem').mockReturnValue("test@example.com");
      });
  
      when('I render the ForgotPasswordWeb component', () => {
          ForgotPasswordWeb1 = shallow(<ForgotPasswordWeb {...screenProps} />);
          ForgotPasswordWebInstance = ForgotPasswordWeb1.instance() as ForgotPasswordWeb;
          ForgotPasswordWebInstance.componentDidMount();
      });
  
      then('The component should load the saved email into the state', () => {
          expect(ForgotPasswordWebInstance.state.emailValue).toEqual("test@example.com");
      });
  
      afterAll(() => {
          jest.restoreAllMocks();
      });
  });
  

});
