import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock.web";
import { getStorageData, setStorageData } from "../../../../framework/src/Utilities";

const navigation = require("react-navigation");

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("testID") === testID).first();

const screenProps = {
  id: "EmailAccountLoginBlock",
  navigation: {
    goBack: jest.fn(),
    getParam: jest.fn().mockReturnValue("1234"),
    navigate: jest.fn(), // Mock navigate
  },

};
const responseData={
  meta:{
    token:"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzY3LCJleHAiOjE3MTcwNDgzODksInRva2VuX3R5cGUiOiJsb2dpbiJ9.D6m14lPSiTbGNjU1dnKHkCfKuvmxR_pAlNtkPuGH8EmYiRAlmb5k7S5ofyEsidPZ6KG3mVX24yNc8t2707MnMw","refresh_token":"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NzY3LCJleHAiOjE3NDg0OTc5ODksInRva2VuX3R5cGUiOiJyZWZyZXNoIn0.BzzOfAot_lS4zz8yoZbt993Kn-VIS0_7LIuVUAYfWBAOE_svv0bvuZbayrV7-W67-lssArtTG77KWW4dO8605A",
    id:767,
    role:"end_user",
    is_otp_verify:true,
  activated:true,
  "profile": {
    "data": {
        "id": "2125",
        "type": "profile",
        "attributes": {
            "id": 2125,
            "first_name": null,
            "last_name": null,
            "full_phone_number": "",
            "city": null,
            "post_code": null,
            "country_code": null,
            "phone_number": null,
            "email": "santos1@yopmail.com",
            "activated": true,
            "user_type": "business",
            "user_name": null,
            "platform": null,
            "rating": 0.0,
            "suspend_until": null,
            "status": "regular",
            "role_id": 1,
            "full_name": "sant van",
            "gender": null,
            "date_of_birth": null,
            "age": null,
            "country": null,
            "address": null,
            "address_line_2": null,
            "contact_name": "",
            "company_name": "santos",
            "is_online": true,
            "device_id": null,
            "photo": {
                "url": null
            },
            "total_notaries": 0
        }
    }
},
"google_calendar_token": null,
"outlook_calendar_token": null,
"google_calendar_sync": false,
"outlook_calendar_sync": false
}
}
const errorResponse={
    errors: [
      {
        failed_login: "Login Failed",
        role: false
      },
    ],
  
}
Object.defineProperty(global, "localStorage", {
  value: {

      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),

  },
});

jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
  removeStorageData: jest.fn()
}));

const feature = loadFeature(
  "./__tests__/features/email-account-login-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });


  
  test("User navigates to Email Log In", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();

      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
     
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              email_validation_regexp:
                "^[a-zA-Z0-9.!\\#$%&‘*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
              password_validation_regexp:
                "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
              password_validation_rules:
                "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_).",
            },
          ],
        }
      );
      instance.validationApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    when("I navigate to the Log In Screen", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
    });
    then("Login Screen will load without errors",()=>{
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({checkedRememberMe:true})
      instance.componentDidMount();
      
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      const rememberedPassword = localStorage.getItem('rememberedPassword');
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
  expect(rememberMe).toBe(false);
  expect(rememberedEmail).toBeUndefined();
  expect(rememberedPassword).toBeUndefined();
      if(rememberMe)
      expect(instance.state.email).toBe(rememberedEmail || '')
  expect(instance.state.password).toBe(rememberedPassword || '')
  expect(instance.state.checkedRememberMe).toBe(rememberMe);
    });
    then("Footer is visible", () => {
      expect(findByTestID(mobileAccountLogInWrapper, "footer")).toHaveLength(1);
    })

    when("I can toggle the Remember Me with out errors", () => {
     
      const selectServiceBtns = mobileAccountLogInWrapper.find('[data-test-id="btnRememberMe"]');
      selectServiceBtns.forEach((btn, index) => {
  btn.simulate("onClick");
  instance.setRememberMe()
  expect(instance.state.checkedRememberMe).toBe(true); 
  expect(instance.state.tempRemember).toBe(true); 
});

    });
    then("Toggle button will show on", () => {
      instance.setState({ checkedRememberMe: false,tempRemember:false });
      instance.setRememberMe()
      expect(instance.state.checkedRememberMe).toEqual(true)
      expect(instance.state.tempRemember).toEqual(true)
    });
    when("I click on continue as guest button without error", () => {
      let buttonsComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "continueID"
      );
      buttonsComponent.simulate("click");
    });
    then("Alert message will for coming soon", () => {
      instance.showAlert("Alert!","Coming soon");
    });
    then("I can select the Log In button with out errors", () => {
      let buttonsComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnEmailLogIn"
      );
      buttonsComponent.simulate("click");
    });

    then("I can select the Forgot Password button with out errors", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnForgotPassword"
      );
      buttonComponent.simulate("click");
    });

    then("I can enter a email address with out errors", () => {
      let textInputComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "txtInputEmail"
      );
      textInputComponent.simulate("change", {
        target: { value: "hello@aol.com" },
      });
    });

    then("I can enter a password with out errors", () => {
      instance.setState({password: 'password123', tempPassword: 'password123',isPasswordError:'',emailError2:''})
      let textInputComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "txtInputPassword"
      );
      textInputComponent.simulate("change", {
        target: { value: "password123" },
      });
      instance.setPassword('***********')
      expect(instance.state.password).toBe('password12');
    expect(instance.state.tempPassword).toBe('password12');
      expect(instance.state.isPasswordError).toBe('')
      expect(instance.state.emailError2).toBe('')

    });

    then("I can leave the screen with out errors", () => {

      instance.componentWillUnmount();
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I click on drawer toggle button", () => {
      let buttonComponent = mobileAccountLogInWrapper.findWhere(
        (node) => node.prop("data-test-id") === "toggleButton"
      );
      buttonComponent.simulate("click");
    });
    
    then("Drawer should open", () => {
      expect(mobileAccountLogInWrapper.find("Account")).toBeVisible;
    });
  });

  test("Empty Email Address", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email Address", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I Log In with an empty Email Address", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "", password: "password!" });
    });

    then("Log In Should Fail", () => {
      instance.setState({ emailError2:"Please enter your valid email address",isPasswordError:"The password do not match",checkedRememberMe:false})
      expect(instance.CallLoginApi()).toBe(true);
      expect(instance.state.emailError2).toEqual("Please enter your email address")
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorResponse
      );

      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      instance.apiEmailLoginCallId2 = msgLogInErrorRestAPI.messageId;

      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      instance.handleResponse(responseData,msgLogInErrorRestAPI,errorResponse)
      
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberMe");
      expect(instance.state.checkedRememberMe).toBe(false)

      instance.handleFailureResponse(errorResponse)
      instance.sendLoginFailMessage();
      expect(instance.state.isPasswordError).toBe("Incorrect password");
      expect(instance.state.emailError2).toBe("Please enter your email address");
    });

    then("Account not found", () => {
      const errorResponse={
        errors: [
          {
            failed_login: "Account not found",
            role: false
          },
        ],
      
    }      
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorResponse
      );

      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      instance.apiEmailLoginCallId2 = msgLogInErrorRestAPI.messageId;

      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);      
      expect(instance.state.emailError2).toBe("We cannot find an account with this email address");
    });

    then("User get the role", () => {
      const errorResponse={
        errors: [
          {
            failed_login: "Account not found",
            role: true
          },
        ],
      
    }      
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        errorResponse
      );

      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      instance.apiEmailLoginCallId2 = msgLogInErrorRestAPI.messageId;

      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);      
      expect(instance.state.emailError2).toBe("We cannot find an account with this email address");
    });
  });

  test("Email Address and Empty Password", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email Address", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({password:'',tempPassword: 'password12',isPasswordError:'',emailError2:''})
    instance.setPassword('*3');
    expect(instance.state.password).toBe('password123');
    expect(instance.state.tempPassword).toBe('password123');
      expect(instance.state.isPasswordError).toBe('')
      expect(instance.state.emailError2).toBe('')
      expect(mobileAccountLogInWrapper).toBeTruthy();

    });

    when("I Log In with a Email Address and empty Password", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "test@aol.com", password: "" });
    });

    then("Log In Should Fail", () => {
      instance.setState({emailError2:"",isPasswordError:""})
      let data={
        userEmail:"example@gmail.com",
        password:"654321",
      }
      const event = {
        preventDefault() { },
        target: {
            value: "The Ministry Leaders Assistance",
            checked: true
        },
    };
     expect(instance.CallLoginApi()).toBe(undefined);
     expect(instance.state.isPasswordError).toEqual("Please enter your password")
     expect(instance.state.emailError2).toEqual("")

    });
  });

  test("Password and Empty Email Address", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given("I am a User attempting to Log In with a Email Address", () => {
      mobileAccountLogInWrapper = shallow(
        <EmailAccountLoginBlock {...screenProps} />
      );
      expect(mobileAccountLogInWrapper).toBeTruthy();
    });

    when("I Log In with a Password and empty Email Address", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "", password: "password" });
    });

    then("Log In Should Fail", () => {
      instance.setState({emailError2:""})
      expect(instance.CallLoginApi()).toBe(true);
      expect(instance.state.emailError2).toEqual("Please enter your email address")
    });
  });

  test("Email Address and Password", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given(
      "I am a Registed User attempting to Log In with a Email Address",
      () => {
        mobileAccountLogInWrapper = shallow(
          <EmailAccountLoginBlock {...screenProps} />
        );
        expect(mobileAccountLogInWrapper).toBeTruthy();
      }
    );

    when("I Log In with Email Address and Password", () => {
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({ email: "abc@aol.com", password: "password"});
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
      instance.setState({isPasswordError:"false",emailError2:"user@yopmail.com"});
    });

    then("Log In Should Succeed", () => {
      instance.setState({emailError2:"",isPasswordError:"",checkedRememberMe:true})
      expect(instance.CallLoginApi()).toBe(true);
      const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                responseData
            });
            instance.apiEmailLoginCallId2 = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
            instance.handleResponse(responseData,magLogInSucessRestAPI,errorResponse)
            localStorage.setItem("rememberedEmail", "test@example.com");
            localStorage.setItem("rememberedPassword", "password123");
            localStorage.setItem("rememberMe", "true");
            expect(instance.state.checkedRememberMe).toBe(true)
           
            instance.saveLoggedInUserData(responseData)
            instance.sendLoginSuccessMessage();
            instance.openInfoNavigation();

      expect(instance.state.emailError2).toEqual("")
      expect(instance.state.isPasswordError).toEqual("")
    });

    then("RestAPI will return token", () => {
      instance.setState({checkedRememberMe:false})
      const msgLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInSucessRestAPI.messageId
      );
      msgLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseData
      );
      instance.apiEmailLoginCallId2 = msgLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI);
      instance.handleResponse(responseData,msgLogInSucessRestAPI,errorResponse)
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberMe");
      expect(instance.state.checkedRememberMe).toBe(false)
            instance.saveLoggedInUserData(responseData)
            instance.sendLoginSuccessMessage();
            instance.openInfoNavigation();
    });
  });

  test("Remember Me - Email Address Account Log In", ({
    given,
    when,
    then,
  }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;

    given(
      "I am a Registed User who has already Logged In and selected Remember Me",
      () => {
        //Force ios to render mobile layout once.
        jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
        mobileAccountLogInWrapper = shallow(
          <EmailAccountLoginBlock {...screenProps} />
        );
        expect(mobileAccountLogInWrapper).toBeTruthy();
      }
    );

    when("I navigate to Email Address Account Log In", () => {

      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;

      const msgRestoreCreds = new Message(
        getName(MessageEnum.ReciveUserCredentials)
      );
      msgRestoreCreds.addData(getName(MessageEnum.LoginPassword), "passWord1!");
      msgRestoreCreds.addData(
        getName(MessageEnum.LoginUserName),
        "test@aol.com"
      );
      runEngine.sendMessage("Unit Test", msgRestoreCreds);
    });

    then(
      "The Country Code, Email Address and Password will be restored",
      () => {
        expect(mobileAccountLogInWrapper).toBeTruthy();
        instance.setState({ isPasswordError: "" })
        const buttonType = {}
        instance.handleToggle(buttonType)
        instance.btnForgotPasswordProps.onPress()
        instance.CustomCheckBoxProps.onChangeValue(true)
        instance.CustomCheckBoxProps.onChangeValue(false)
        // instance.setRememberMe(false)
        // instance.setRememberMe(true)
        instance.setPassword("")

        instance.setEmail("")
        instance.handleClickShowPassword()
        instance.btnPasswordShowHideProps.onPress()
        instance.btnEmailLogInProps.onPress()
        instance.btnRememberMeProps.onPress()
        instance.setState({
          email: "true",
          emailError2: ""
        })
      }
    );
    when ('Remember me is not selected and doing login with email and password',()=>{
      instance.setState({checkedRememberMe:false})
      let onclick=true
      // instance.setRememberMe(!onclick)
      expect(instance.state.checkedRememberMe).toBe(false)
      
    })
    then('Api will call for login without remember Me selected',()=>{
      instance.setState({emailError2:"",isPasswordError:"",checkedRememberMe:false})
      const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                responseData,
                
            });
            instance.apiEmailLoginCallId2 = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
            instance.handleResponse(responseData,magLogInSucessRestAPI,errorResponse)
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
            localStorage.removeItem("rememberMe");
            expect(instance.state.checkedRememberMe).toBe(false)
           
            instance.saveLoggedInUserData(responseData)
            instance.sendLoginSuccessMessage();
            instance.openInfoNavigation();

      expect(instance.state.emailError2).toEqual("")
      expect(instance.state.isPasswordError).toEqual("")

    })
    then("I Click On Goto Button", () => {
      let btnGotoHome = mobileAccountLogInWrapper.findWhere((node) => node.prop("data-test-id") === "arrowBtnID" );
      btnGotoHome.simulate("click");
      let btnGotoHomeLogo = mobileAccountLogInWrapper.findWhere((node) => node.prop("data-test-id") === "HomeButtonIDLogin" );
      btnGotoHomeLogo.simulate("click");
   });
   
   then("I Click On Email Button", () => {
    let btnGotoSignUp = mobileAccountLogInWrapper.findWhere((node) => node.prop("data-test-id") === "signUpID1" );
    btnGotoSignUp.simulate("click");
 });

  });

  test("User navigates to Email Log In for role id", ({ given, when, then }) => {
    let mobileAccountLogInWrapper: ShallowWrapper;
    let instance: EmailAccountLoginBlock;
  
    given("I am a User loading Email Log In", () => {
      mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
      instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
    });
  
    when("User has role_id 1", async () => {
      (getStorageData as jest.Mock).mockResolvedValueOnce("1");
      
    });
  
    then("role is set successfully", () => {
      expect(instance.state.userRoleId).toBe(0); // Validate state update
    });
  });
  
});