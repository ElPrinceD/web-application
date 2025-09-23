import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from "enzyme"

import * as helpers from "../../../../framework/src/Helpers"
import {runEngine} from "../../../../framework/src/RunEngine"
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";

import EmailAccountRegistrationWeb from "../../src/EmailAccountRegistrationWeb.web";

import * as utilities from "../../../../framework/src/Utilities";

jest.mock("../../../../framework/src/Utilities", () => ({
  getStorageData: jest.fn(),
  removeStorageData: jest.fn(),
  setStorageData: jest.fn(),
}));

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "email-account-registration-scenario"
  }

const feature = loadFeature("./__tests__/features/EmailAccountRegistrationWeb-scenario.web.feature");

const emailDataNew = {

        email: "example@gmail.com",
        password: "Example@123",
        contact_name: "Example Contact",
        company_name: "Business Company",
        role_id: 1,
        user_type: "individual"
}
const emailHttpBody = {
    data: emailDataNew,
    token: "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q",
  };
const header = {
    "Content-Type": "application/json",
  };
  const emailData = {
    type: "email_account",
    attributes: emailDataNew,
  };
  const responseData2={
    "data": {
        "id": "628",
        "type": "email_account",
        "attributes": {
            "contact_name": null,
            "email": "nofflltest@yopmail.com",
            "activated": false,
            "user_type": null
        }
    },
    "meta": {
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NjI4LCJleHAiOjE3MTMwMDA2MzR9.tgeSHfR6fNrz6kRvguBahAKQ8EL6uFPd5J0Re9dQIsK_timxIFYahVep1si7t7g65_pplgGgrSNr9VjE3beX9A",
        "email_otp_token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6OTMwLCJleHAiOjE3MTI5MTQ4MzQsInR5cGUiOiJBY2NvdW50QmxvY2s6OkVtYWlsT3RwIiwiYWNjb3VudF9pZCI6NjI4fQ.r3SEFUx7fgcLpOa9jYRL-Yc4pKXO7AzyuXrTNDYV2X7W2ReOFgayd1Tku-feXZNwAi5g_zGNlI5DECLDmofMoA"
    }
}
const errorResponse={
    errors: {email: "Email already exists, complete signup process and verify your account using OTP"}
        
  }

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("testID") === testID).first();
  
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock("react-native", () => ({ Platform: { OS: "web" }}))
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("Register Email Account", ({ given, when, then }) => {
        let EmailAccountRegistrationWebWrapperRegistration:ShallowWrapper;
        let emailAccountWebInstance:EmailAccountRegistrationWeb; 

        given("I am a User attempting to Register after confirming OTP", () => {
            EmailAccountRegistrationWebWrapperRegistration = shallow(<EmailAccountRegistrationWeb {...screenProps}/>)
            expect(EmailAccountRegistrationWebWrapperRegistration).toBeTruthy()  
        });

        then("EmailAccountRegistrationWeb will load with out errors", () => {
            emailAccountWebInstance = EmailAccountRegistrationWebWrapperRegistration.instance() as EmailAccountRegistrationWeb
         });
         then("Footer is visible", () => {
            expect(findByTestID(EmailAccountRegistrationWebWrapperRegistration, "footer")).toHaveLength(1);
          })
 
        when("Going back to landing page", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere(
              (node) => node.prop("data-test-id") === "LandingButtonID"
            );
            buttonComponent.simulate("click")
            emailAccountWebInstance.goToLanding();
           
          });

          then("It will navigate to Landing page", () => {
            expect(EmailAccountRegistrationWebWrapperRegistration).toBeTruthy();
          });

          when("Going back to onboarding page", () => {
            
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere(
              (node) => node.prop("data-test-id") === "goToHomeIDE"
            );
            emailAccountWebInstance.goToHome();
          });

          then("It will navigate to onboarding page", () => {
            emailAccountWebInstance.handleStateError("Errors")
            emailAccountWebInstance.setState({loader: false})
            expect(EmailAccountRegistrationWebWrapperRegistration).toBeTruthy();
            expect(emailAccountWebInstance.state.loader).toBe(false)

          });

          when("I navigate to the Registration Screen", () => {
            emailAccountWebInstance = EmailAccountRegistrationWebWrapperRegistration.instance() as EmailAccountRegistrationWeb
        });
        when("I click the Guest buttons", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "continueID" );
            buttonComponent.simulate("click");
        });
        then("Guest alert message will show",()=>{
            emailAccountWebInstance.GuestButton();
            emailAccountWebInstance.showAlert("Alert", "Comming Soon...")
        })
        then("I can enter a first name with out errors", () => {
            const event = {
                preventDefault() { },
                target: {
                    value: "The Ministry Leaders Assistance",
                    checked: true
                },
            };
            emailAccountWebInstance.handleToggle("");
            emailAccountWebInstance.handleClickShowPasswordupdate();
            emailAccountWebInstance.handleSubmit(event);
        });

        then("I can click the buttons", () => {
            let toggleButton = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "toogleBtnBusinessID" );
            toggleButton.simulate("click");
        });

        then("I click on INDIVIDUAL buttons", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "ToogleBtnIndividualId" );
            buttonComponent.simulate("click");
        });

        then("I call api", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        })

        when("I enter fullname with empty data", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "contactNameID" );
            buttonComponent.simulate("change",{target:{value:"",name:"contactName"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});
        });
        then("I call api on fullname", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });

        when("I enter fullname with data", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "contactNameID" );
            buttonComponent.simulate("change",{target:{value:"TestName TestLastNamedfhfdjfhdjfhjfhdjhfdjfhjhj",name:"contactName"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});
        });
        then("I call api on fullname with data", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });


        when("I enter email address", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "emailID" );
            buttonComponent.simulate("change",{target:{value:"",name:"email"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});
        });
        then("I call api on email", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });

        when("I enter invalid email address", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "emailID" );
            buttonComponent.simulate("change",{target:{value:"test@gmail",name:"email"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});
        });

        then("I call api on email invalid", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });

        when("I enter email address second", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "emailID" );
            buttonComponent.simulate("change",{target:{value:"test@gmail.com",name:"email"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});

        });

        then("I call api on email second", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });

        when("I enter reEnter password re", () => {
        
      const selectServiceBtns = EmailAccountRegistrationWebWrapperRegistration.find('[data-test-id="passwordIDs"]');
      selectServiceBtns.forEach((btn, index) => {
        selectServiceBtns.simulate("change",{target:{value:"password12",name:"password"}});

        emailAccountWebInstance.handlePasswordChange('***********')
        expect(emailAccountWebInstance.state.password).toBe('password12');
      expect(emailAccountWebInstance.state.tempPassword).toBe('password12');
        expect(emailAccountWebInstance.state.errorPassword).toBe('')
        emailAccountWebInstance.validateConfirmPassword('password12')

});
        });

        then("I call api on reEnter password re", () => {

            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });


        when("I enter reEnter password", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "reTyprPasswrdID" );
            buttonComponent.simulate("change",{target:{value:"",name:"reTypePassword"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});

           emailAccountWebInstance.setState({reTypePassword:"654321"})
           emailAccountWebInstance.setState({enableReTypePasswordField:true}) 
            buttonComponent.simulate("changeText", "reTypePassword");
            buttonComponent.simulate("change", {
                target: { value: "password123" },
              });
              emailAccountWebInstance.handleComPasswordChange('***********')
            emailAccountWebInstance.handleClickConfirmPassword();
              expect(emailAccountWebInstance.state.reTypePassword).toBe('password12');
            expect(emailAccountWebInstance.state.tempPassword).toBe('password12');
              expect(emailAccountWebInstance.state.errorComPassword).toBe('')
            expect(emailAccountWebInstance.state.enableReTypePasswordField).toBe(false)
            emailAccountWebInstance.validateConfirmPassword('password12')


        });

        then("I call api on reEnter password", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });

        when("I enter reEnter password second", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "reTyprPasswrdID" );
            buttonComponent.simulate("change",{target:{value:"Test@1234",name:"reTypePassword"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});

            emailAccountWebInstance.setState({enablePasswordField:false,password:'',tempPassword: 'password12',errorPassword:''})
            emailAccountWebInstance.handlePasswordChange('*3');
            emailAccountWebInstance.handlePasswordChange('3*');
            emailAccountWebInstance.handlePasswordChange('password123');
            expect(emailAccountWebInstance.state.password).toBe('password123');
            expect(emailAccountWebInstance.state.tempPassword).toBe('password123');
            expect(emailAccountWebInstance.state.errorPassword).toBe('');
            emailAccountWebInstance.validateConfirmPassword('password123');
            expect(emailAccountWebInstance).toBeTruthy();
        });
     
        then("I call api on reEnter password second", () => {
            const waitinglistSuccessApiCallId  = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistSuccessApiCallId.messageId
            );
            waitinglistSuccessApiCallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                emailDataNew
            );
            emailAccountWebInstance.createAccountApiCallId = waitinglistSuccessApiCallId.messageId;
            runEngine.sendMessage("Unit Test", waitinglistSuccessApiCallId);
            expect(waitinglistSuccessApiCallId.id).toBe("RestAPIResponceMessage")
        });
        then("I can toggle the Password Show/Hide with out errors", () => {
           
            EmailAccountRegistrationWebWrapperRegistration.findWhere(node => node.prop("data-test-id") === "btnPasswordShowHide")
            emailAccountWebInstance.setState({enablePasswordField:true})
           const event = {
            preventDefault() { },
            target: {
                value: "654321",
                checked: false
            },
        };
        emailAccountWebInstance.handleClickShowPasswordupdate2();
            expect(emailAccountWebInstance.state.enablePasswordField).toBe(event.target.checked)
        });
        then("I enter login button", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID1" );
            buttonComponent.simulate("click");
        });
        then("I Click GotoHome button", () => {
            let buttonComponentHome = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "goToHomeID" );
            let buttonComponentHomeLogo = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "HomeButtonID" );
        });
        when("I Click on Business ToggleButton", () => {
            let ToggleButtonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "toogleBtnBusinessID" );
            ToggleButtonComponent.simulate("click");
            let bussinesButtonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "businessNameID" );
            bussinesButtonComponent.simulate("change",{target:{value:"TestName TestLastNamedfhfdjfhdjfhjfhdjhfdjfhjhj",name:"BusinessCompanyName"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});
        })
        when("I enter company name without errors", () => {
            let buttonComponent = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "businessNameID" );
            buttonComponent.simulate("change",{target:{value:"Google",name:"BusinessCompanyName"}});

            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "businessNameID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});

        });
        then("company name will save without error", () => {
            const event = {
                preventDefault() { },
                target: {
                    value: "The Ministry Leaders Assistance",
                    checked: true
                },
            };
            emailAccountWebInstance.handleCountryName(event)
        });
        when('Enter wrong password validation',()=>{

            emailAccountWebInstance.setState({enablePasswordField:false,password:'',tempPassword: 'password12',errorPassword:''})
    emailAccountWebInstance.handlePasswordChange('*3');
    expect(emailAccountWebInstance.state.password).toBe('password123');
    expect(emailAccountWebInstance.state.tempPassword).toBe('password123');
      expect(emailAccountWebInstance.state.errorPassword).toBe('')
      expect(emailAccountWebInstance).toBeTruthy();
        });
        then('Validation should failed',()=>{
    expect(emailAccountWebInstance.state.enablePasswordField).toBe(false)
        });
        when('Enter wrong confirm password validation',()=>{
    
            emailAccountWebInstance.setState({enableReTypePasswordField:false,reTypePassword:'password123',tempPassword: 'password12',errorComPassword:''})
    emailAccountWebInstance.handleComPasswordChange('*3');
    expect(emailAccountWebInstance.state.reTypePassword).toBe('password123');
    expect(emailAccountWebInstance.state.tempPassword).toBe('password123');
      expect(emailAccountWebInstance.state.errorComPassword).toBe('')
      emailAccountWebInstance.validateConfirmPassword('password123')

      expect(emailAccountWebInstance).toBeTruthy();
        });
        then('Validation should failed',()=>{
            expect(emailAccountWebInstance.state.enableReTypePasswordField).toBe(false)
    
        });

        then("I can toggle the Password Show/Hide with out errors", () => {
            EmailAccountRegistrationWebWrapperRegistration.findWhere(node => node.prop("data-test-id") === "btnPasswordShowHide")
            emailAccountWebInstance.setState({enablePasswordField:true})
           const event = {
            preventDefault() { },
            target: {
                value: "654321",
                checked: true
            },
        };
        emailAccountWebInstance.handleClickConfirmPassword();
            expect(emailAccountWebInstance.state.enablePasswordField).toBe(event.target.checked)
        });

        when("I click submit button for registration without any errors", () => {
            let signUpID = EmailAccountRegistrationWebWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "signUpID" );
            signUpID.simulate("click",{preventDefault:jest.fn()});
        });
        then("Validation will check on all input data and send to server without error", () => {
            emailAccountWebInstance.setState({
                loader: true,
                contactName: "Deepika k",
                email: "user@yopmail.com",
                password: "654321",
                BusinessCompanyName: "Google",
                reTypePassword: "654321",
                selectedButton: "individual",
                isValidLength: true,
                isNoBlankSpace: true,
                isChecklowerUpperCase: true,
              });
            
              const mockEvent = { preventDefault: jest.fn() };
            
              emailAccountWebInstance.checkValidations = jest.fn(() => true);
            
              emailAccountWebInstance.handleSubmit(mockEvent);

              expect(utilities.setStorageData).toHaveBeenCalledWith(
                'signUpData',
                JSON.stringify({
                  email: "user@yopmail.com",
                  password: "654321",
                  contact_name: "",
                  company_name: "Google",
                  role_id: 1,
                  user_type: "individual",
                  password_confirmation: "654321",
                  full_name: "Deepika k",
                  signupPage: "EmailAccountRegistrationWeb"
                })
              );
            
            emailAccountWebInstance.setState({loader:true})
          const emailAttrs = {
            preventDefault() { },
            full_name:"Deepika k",
                email:"user@yopmail.com",
                password:"654321",
                company_name:"Google",
                role_id: 2,
                reTypePassword:"654321",
                user_type:"individual",
        };
        emailAccountWebInstance.handleSubmit(emailAttrs)

        const SignUpData = {
            type: "email_account",
            attributes: emailAttrs,
          };
            emailAccountWebInstance.checkValidations = jest.fn(() => true);
            emailAccountWebInstance.setState({
              isValidLength: true,
              isNoBlankSpace: true,
              isChecklowerUpperCase: true,
            });
            const SignUpMessageCal = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              SignUpMessageCal.addData(getName(MessageEnum.AuthTokenDataMessage), "TOKEN");
        
              SignUpMessageCal.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                SignUpMessageCal.messageId
              );
              SignUpMessageCal.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
               SignUpData
              );
      emailAccountWebInstance.createSignUpApiCallId = SignUpMessageCal.messageId;
      runEngine.sendMessage("Unit Test", SignUpMessageCal);
            emailAccountWebInstance.handleAPIResponse(responseData2) 
            expect(emailAccountWebInstance.state.loader).toBe(true)
            emailAccountWebInstance.handleAPIResponse(errorResponse) 
            emailAccountWebInstance.showAlert("Alert !",errorResponse.errors.email)
            emailAccountWebInstance.handleStateError(errorResponse)
            emailAccountWebInstance.handleStateError({errors: ["Email is already registered"]})
        });

    });
   
    test("Handle redirect check", ({ given, when, then }) => {
        let EmailAccountRegistrationWebWrapperRegistration: ShallowWrapper;
        let emailAccountWebInstance: EmailAccountRegistrationWeb;
      
        given("I am a User attempting to Register after confirming OTP", () => {
          EmailAccountRegistrationWebWrapperRegistration = shallow(<EmailAccountRegistrationWeb {...screenProps} />);
          expect(EmailAccountRegistrationWebWrapperRegistration).toBeTruthy();
        });
      
        when("I load the EmailAccountRegistrationWeb component", () => {
          emailAccountWebInstance = EmailAccountRegistrationWebWrapperRegistration.instance() as EmailAccountRegistrationWeb;
        });
      
        then("handleRedirectCheck should process stored signup data", async () => {
          const mockSignupData = {
            full_name: "Test User",
            email: "test@example.com",
            password: "password123",
            company_name: "Test Company",
            user_type: "business",
            password_confirmation: "password123",
          };
      
          (utilities.getStorageData as jest.Mock).mockResolvedValue(JSON.stringify(mockSignupData));
          await emailAccountWebInstance.handleRedirectCheck();
      
          expect(emailAccountWebInstance.state.contactName).toBe(mockSignupData.full_name);
          expect(emailAccountWebInstance.state.email).toBe(mockSignupData.email);
          expect(emailAccountWebInstance.state.password).toBe(mockSignupData.password);
          expect(emailAccountWebInstance.state.BusinessCompanyName).toBe(mockSignupData.company_name);
          expect(emailAccountWebInstance.state.selectedButton).toBe(mockSignupData.user_type);
          expect(emailAccountWebInstance.state.reTypePassword).toBe(mockSignupData.password_confirmation);
          expect(emailAccountWebInstance.state.errorConfirmPasswordFlag).toBe(false);
          expect(emailAccountWebInstance.state.isValidLength).toBe(true);
          expect(emailAccountWebInstance.state.isChecklowerUpperCase).toBe(true);
          expect(emailAccountWebInstance.state.isNoBlankSpace).toBe(true);
          expect(utilities.removeStorageData).toHaveBeenCalledWith('signUpData');
          (utilities.getStorageData as jest.Mock).mockResolvedValue(null);
      
          await emailAccountWebInstance.handleRedirectCheck();
      
          expect(emailAccountWebInstance.state.contactName).toBe(mockSignupData.full_name);
        });
      });

      test("User navigate to registration  for both page for checkbox select change", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistrationWeb;
      
        given("I am a User loading email account registration page for both", () => {
          emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistrationWeb {...screenProps} />);
          instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistrationWeb;
        });
      
        when("I change checkbox for privacy policy and terms and condition", () => {
            const check = emailAccountRegistrationWrapperRegistration.findWhere(
                (node) => node.prop("data-test-id") === "checkboxChangeBothID"
              );
              check.simulate("change", { target: { checked: true } });

              instance.setState({
                password: 'Password123',
                reTypePassword: 'Password123',
                BusinessCompanyName: 'Valid Business',
                contactName: 'John Doe',
                isChecked: true,
                email: 'john.doe@example.com',
              });
          
              instance.validateForm();
          
              expect(emailAccountRegistrationWrapperRegistration.state('isButtonEnabled')).toBe("Valid Business");
        });
      
        then("checkbox change successfully", () => {
            expect(emailAccountRegistrationWrapperRegistration).toBeDefined()
        });
      });

});
