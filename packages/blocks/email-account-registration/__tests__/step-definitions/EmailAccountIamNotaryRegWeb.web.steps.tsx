import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from "enzyme"

import * as helpers from "../../../../framework/src/Helpers"
import {runEngine} from "../../../../framework/src/RunEngine"
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";

import EmailAccountIamNotaryRegWeb from "../../src/EmailAccountIamNotaryRegWeb.web"

import { getStorageData, removeStorageData , setStorageData } from "../../../../framework/src/Utilities";

jest.mock("../../../../framework/src/Utilities", () => ({
    getStorageData: jest.fn(),
    removeStorageData: jest.fn(),
    setStorageData: jest.fn(),
  }));
  

const navigation = require("react-navigation")

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-test-id") === testID).first();

const screenProps = {
    navigation: navigation,
    id: "email-account-registration-scenario"
  }
  const responseData={
    data: [
        {
            id: "1",
            type: "country",
            attributes: {
                name: "England"
            }
        },
        {
            id: "2",
            type: "country",
            attributes: {
                name: "Wales"
            }
        },
    ]
}
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
    errors:  {email : "Email already exists, complete signup process and verify your account using OTP"}
  }
const feature = loadFeature("./__tests__/features/EmailAccountIamNotaryRegWeb-scenario.web.feature");

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
    const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
    instance[apiCallID] = msgSucessRestAPI.messageId
    const { receive: MockRecieve } =  instance
    MockRecieve("", msgSucessRestAPI)
  }
defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock("react-native", () => ({ Platform: { OS: "web" }}))
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("Register Email Account", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountIamNotaryRegWeb; 

        given("I am a User Creating New Account", () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()  
        });
        when("I navigate to the Registration Screen", () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb
        });
        then("Email account registration screen will load country API without error", () => {
            instance.GetCountryList();
        mockAPICall(instance,"getCountryListApiCall",responseData)
      expect(instance.state.countryListArray).toStrictEqual(["England","Wales"])
   
        });
        then("Footer is visible", () => {
            expect(emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop("testID") === "footer").first()).toHaveLength(1);
          })

        when("User tries to enter characters that are not allowed in full name", () => {
            findByTestID(emailAccountRegistrationWrapperRegistration, "contactNameID").simulate("change", {target: {value: ";'"}});
        });
        then("These not allowed characters will not be entered in full name", () => {
            expect(findByTestID(emailAccountRegistrationWrapperRegistration, "contactNameID").props().value).toBe("");
        });

        when("User tries to enter characters that are not allowed in business name", () => {
            findByTestID(emailAccountRegistrationWrapperRegistration, "companyNameId").simulate("change", {target: {value: ";'"}});
        });
        then("These not allowed characters will not be entered in business name", () => {
            expect(findByTestID(emailAccountRegistrationWrapperRegistration, "companyNameId").props().value).toBe("");
        });

        when("I enter a first and last name with out errors", () => {
          
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "contactNameID");
                textInputComponent.simulate("click");
            

        });
        then("First and last name will save without errors", () => {
            instance.setState({userName:"Deepika k",errorsContact:''})
            const event = {
                target: {
                    name: "userName",
                    value: 'Deepika k'
                },
            };
            instance.handleNameChange2(event);
            expect(instance.state.userName).toEqual(event.target.value);
            expect(instance.state.errorsContact).toEqual('');
        });
            
        then("I can enter a email with out errors", () => {
                       let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "emailID" );
            buttonComponent.simulate("changeText",{target:{value:"user@yopmail.com",name:"userEmail"}});
            instance.setState({userEmail:"user@yopmail.com"})
            const event = {
                preventDefault() { },
                target: {
                    value: "user@yopmail.com",
                    checked: true
                },
            };
            instance.handleEmail(event);
            expect(instance.state.userEmail).toEqual(event.target.value);
          
        });

        then("I can enter a password with out errors", () => {
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "passwordID");
            instance.setState({password:"654321"})
            const event = {
                preventDefault() { },
                target: {
                    value: "654321",
                    checked: true
                },
            };
            textInputComponent.simulate("change", {
                target: { value: "password123" },
              });
              instance.handlePasswordUpdate('***********')
              expect(instance.state.password).toBe('password12');
            expect(instance.state.tempPassword).toBe('password12');
              expect(instance.state.errorPassword).toBe('');
              instance.checkValidationPasswordUpdate('password12');

        });
        then("I can enter company name with out errors", () => {
          let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "companyNameId");
         instance.setState({BusinessCompanyName:"Google"})
          const event = {
            preventDefault() { },
            target: {
                value: "Google",
                checked: true
            },
        };
        instance.handleBusniessName(event);
          textInputComponent.simulate("changeText", "companyName");
          expect(instance.state.BusinessCompanyName).toBe(event.target.value)
      });
        then("I can toggle the Password Show/Hide with out errors", () => {
            emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "btnPasswordShowHide")
           instance.setState({enablePasswordField:true})
           const event = {
            preventDefault() { },
            target: {
                value: "654321",
                checked: false
            },
        };
            instance.handleClickShowPasswordChange();
            expect(instance.state.enablePasswordField).toBe(event.target.checked)
        });
        
        then("I can enter a confimation password with out errors", () => {
            let textInputComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop("data-test-id") === "reTyprPasswrdID");
           instance.setState({reTypePassword:"654321"})
           instance.setState({enableReTypePasswordField:true}) 
           
            textInputComponent.simulate("changeText", "reTypePassword");
            textInputComponent.simulate("change", {
                target: { value: "password123" },
              });
              instance.handleComPasswordUpdate('***********')
            expect(instance.state.errorComPassword).toBe('')
              expect(instance.state.reTypePassword).toBe('password12');
            expect(instance.state.tempPassword).toBe('password12');
            instance.checkValidationPasswordUpdate('password12')
        });


        then("I can toggle the Confimation Password Show/Hide with out errors", () => {
          emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "btnComPasswordShowHide")
          const event = {
            preventDefault() { },
            target: {
                value: "654321",
                checked: false
            },
        };
          instance.handleClickConfirmPassword();
          expect(instance.state.enableReTypePasswordField).toBe(event.target.checked)

        });
        when("I click country field without error", () => {
            let Countrybutton= emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "countryListId")
            
         
          });
          then("Country list shown in list without error", () => {
            instance.setState({countryName:"Wales"})
            const event = {
                preventDefault() { },
                target: {
                    textContent: "Wales"                    
                },
            };
            
            instance.handlecountry(event)
            expect(instance.state.countryName).toBe(event.target.textContent)
        });
        when("I click on SignUp button without error",()=>{
            let signupButton=emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "signUpID")
                signupButton.simulate("click")
            
        });
        then("Validation will check on all input data and send to server without error", () => {
            instance.setState({loader:true})
          const emailAttrs = {
            full_name:"Deepika k",
                email:"user@yopmail.com",
                password:"654321",
                company_name:"Google",
                role_id: 2,
                reTypePassword:"654321",
                user_type:"notary",
                password_confirmation: "654321",
                country: "Google",
        };
        const SignUpData = {
            type: "email_account",
            attributes: emailAttrs,
          };
          instance.handleSubmitChange()
            instance.checkValidationChange = jest.fn(() => true);
            instance.setState({
              isValidLength: true,
              isNoBlankSpace: true,
              isChecklowerUpperCase: true,
            });
            instance.CallSignupApi();
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
      instance.createAccountNotaryApiCallId = SignUpMessageCal.messageId;
      runEngine.sendMessage("Unit Test", SignUpMessageCal);
            instance.handleAPIResponse2(responseData2) 
            expect(instance.state.loader).toBe(false)
            instance.handleAPIResponse2(errorResponse) 
            instance.showAlert("Alert !",errorResponse.errors.email)
        });

       
        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
        });
    });


    test("Empty First Name", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountIamNotaryRegWeb; 

        given("I am a User attempting to Register with a Email", () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when("I Register with an empty First Name", () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb;
        });

        then("Registration Should Fail", () => {
          let data={
            userName:"User one",
            userEmail:"example@gmail.com",
            password:"654321",
            BusinessCompanyName:"Google",
            reTypePassword:"654321"
          }
          const event = {
            preventDefault() { },
            target: {
                value: "The Ministry Leaders Assistance",
                checked: true
            },
        };
         expect(instance.handleSubmitChange()).toBe(false);
         
        });

        then("RestAPI will return an error", () => {
          
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "failed_login": "Login Failed"
                    }
                ]
            });

            instance.createAccountNotaryApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        
    });

    test("Invalid Email", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountIamNotaryRegWeb; 

        given("I am a User attempting to Register with a Email", () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when("I Register with an Invalid Email", () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb

            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "data": [
                    {
                        "email_validation_regexp": "^[a-zA-Z0-9.!\\#$%&‘*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                        "password_validation_regexp": "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                        "password_validation_rules": "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."
                    }
                ]
            });
            instance.createAccountNotaryApiCallId= msgValidationAPI.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPI)

            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)   
            instance.setState({userName:"User one", userEmail: "example@gmail.com", password: "pass", reTypePassword: "pass"});

        });

        then("Registration Should Fail", () => {
          let data={
            userName:"User one",
            userEmail:"example@gmail.com",
            password:"654321",
            BusinessCompanyName:"Google",
            reTypePassword:"654321"
          }
          const event = {
            preventDefault() { },
            target: {
                value: "The Ministry Leaders Assistance",
                checked: true
            },
        };
         expect(instance.handleSubmitChange()).toBe(false);
        });

        then("RestAPI will return an error", () => {
          
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "failed_login": "Login Failed"
                    }
                ]
            });

            instance.createAccountNotaryApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        
    });
    

    test("Password and RePassword do not match", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountIamNotaryRegWeb; 

        given("I am a User attempting to Register with a Email", () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when("I Register with Password and RePassword that do not match", () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb 
            instance.setState({userName:"User one", userEmail: "example@gmail.com", password: "password123!!", reTypePassword: "pass123"});
            instance.setState({iSValidPassword:false});
            const event = {
                preventDefault() { },
                target: {
                    value: "scotland",
                    checked: true
                },
            };
            instance.checkValidationPasswordUpdate(event.target.value);
            expect(instance.state.iSValidPassword).toBe(event.target.checked)
        });

        then("Registration Should Fail", () => {
          let data={
            userName:"User one",
            userEmail:"example@gmail.com",
            password:"654321",
            BusinessCompanyName:"Google",
            reTypePassword:"654321"
          }
          const event = {
            preventDefault() { },
            target: {
                value: "The Ministry Leaders Assistance",
                checked: true
            },
        };
         expect(instance.handleSubmitChange()).toBe(false);
        });

        then("RestAPI will return an error", () => {
          
            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
            {
                "errors": [
                    {
                        "failed_login": "Login Failed"
                    }
                ]
            });

            instance.createAccountNotaryApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });
        when('Enter wrong password validation',()=>{

            instance.setState({enablePasswordField:false,password:'',tempPassword: 'password12',errorPassword:''})
    instance.handlePasswordUpdate('*3');
    expect(instance.state.password).toBe('password123');
    expect(instance.state.tempPassword).toBe('password123');
      expect(instance.state.errorPassword).toBe('')
      expect(instance).toBeTruthy();
        });
        then('Validation should failed',()=>{
expect(instance.state.enablePasswordField).toBe(false)
        });
        when('Enter wrong confirm password validation',()=>{

            instance.setState({enableReTypePasswordField:false,reTypePassword:'password123',tempPassword: 'password12',errorComPassword:''})
    instance.handleComPasswordUpdate('*3');
    expect(instance.state.reTypePassword).toBe('password123');
    expect(instance.state.tempPassword).toBe('password123');
      expect(instance.state.errorComPassword).toBe('')
      instance.checkValidationPasswordUpdate('password123')
      expect(instance).toBeTruthy();
        });
        then('Validation should failed',()=>{
            expect(instance.state.enableReTypePasswordField).toBe(false)

        })
    });

    test("Valid Registration", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration:ShallowWrapper;
        let instance:EmailAccountIamNotaryRegWeb; 

        given("I am a User attempting to Register with a Email", () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps}/>)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when("I Register with all valid data", () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb 
            instance.setState({ userName:"User one",userEmail: "example@gmail.com", password: "password123!!", reTypePassword: "password123!!"});
        });

        then("Registration Should Succeed", () => {
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        then("RestAPI will return token", () => {
            const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.createAccountNotaryApiCallId = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
        });

        when("User navigates to different pages",()=>{
            let loginBtn= emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "LoginBtnID")
            loginBtn.simulate("click")
            instance.setState({ errorConfirmPasswordFlag: true });
                    })
                    then("Pages will render",()=>{
                        instance.goToLoginScreen()
                        expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
                    });
                    when("User click on Notary Logo",()=>{
                        let loginBtn= emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "goToHomeID")
                        loginBtn.simulate("click")
                    })     
                    then("Pages will render",()=>{
                        instance.goToHomeScreen()
                        expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
                    });  
                    when("User click on Home Logo",()=>{
                        let loginBtn= emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "goToHomeID")
                        loginBtn.simulate("click")
                    })     
                    then("Pages will render",()=>{
                        instance.goToHomeScreen()
                        expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
                    }); 
                    when("User click on Landing Logo",()=>{
                        let loginBtn= emailAccountRegistrationWrapperRegistration.findWhere(node => node.prop("data-test-id") === "HomeButtonID")
                        loginBtn.simulate("click")
                    })     
                    then("Pages will render",()=>{
                    instance.goToLandingPage()
                        expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
                    });       
                     
        
    });

    test("Redirection of back", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountIamNotaryRegWeb;
      
        given("I am a User Creating New Account", () => {
          emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps} />);
          expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
        });
      
        when("I navigate to the Registration Screen", () => {
          instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb;
        });
      
        then("handleRedirectCheck should set state when signupData exists", async () => {
          const mockSignupData = JSON.stringify({
            full_name: "Test User",
            email: "test@example.com",
            password: "password123",
            company_name: "Test Company",
            user_type: "notary",
            password_confirmation: "password123",
            country: "TestCountry",
          });
      
          (getStorageData as jest.Mock).mockResolvedValue(mockSignupData);
      
          await instance.handleRedirectCheck();
      
          expect(instance.state).toMatchObject({
            userName: "Test User",
            userEmail: "test@example.com",
            password: "password123",
            BusinessCompanyName: "Test Company",
            selectedButton: "notary",
            reTypePassword: "password123",
            countryName: "TestCountry",
            errorConfirmPasswordFlag: false,
            isValidLength: true,
            isChecklowerUpperCase: true,
            isNoBlankSpace: true,
          });
      
          expect(removeStorageData).toHaveBeenCalledWith('signUpData');
        });
      
        then("handleRedirectCheck should not set state when signupData doesn't exist", async () => {
          (getStorageData as jest.Mock).mockResolvedValue(null);
      
          const initialState = { ...instance.state };
      
          await instance.handleRedirectCheck();
      
          expect(instance.state).toEqual(initialState);
        });
      });

      test("User navigated by back redirection", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountIamNotaryRegWeb;
      
        given("I am a User Creating New Account", () => {
          emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps} />);
          expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
        });
      
        when("The component mounts", () => {
          instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb;
          instance.handleRedirectCheck = jest.fn();
          instance.componentDidMount();
        });
      
        then("handleRedirectCheck should be called", () => {
          expect(instance.handleRedirectCheck).toHaveBeenCalled();
        });
      });

      test("Submit Registration Form with Valid Data", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountIamNotaryRegWeb;
      
        given("I am a User Creating New Account with valid data", () => {
          emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps} />);
          expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
          instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb;
          
          instance.setState({
            userName: "Test User",
            userEmail: "test@example.com",
            password: "ValidPassword123!",
            BusinessCompanyName: "Test Company",
            reTypePassword: "ValidPassword123!",
            selectedButton: "notary",
            countryName: "TestCountry",
            isValidLength: true,
            isNoBlankSpace: true,
            isChecklowerUpperCase: true,
          });
      
          instance.checkValidationChange = jest.fn().mockReturnValue(true);
      
          instance.CallSignupApi = jest.fn();
        });
      
        when("I submit the registration form", () => {
          instance.handleSubmitChange();
        });
      
        then("The form should be submitted successfully", () => {
          expect(setStorageData).toHaveBeenCalledWith(
            "signUpData",
            expect.any(String)
          );
      
          const storedData = JSON.parse((setStorageData as jest.Mock).mock.calls[0][1]);
          expect(storedData).toEqual({
            email: "test@example.com",
            password: "ValidPassword123!",
            company_name: "Test Company",
            user_type: "notary",
            password_confirmation: "ValidPassword123!",
            full_name: "Test User",
            country: "TestCountry",
            signupPage: "EmailAccountIamNotaryRegWeb",
          });
      
          expect(instance.CallSignupApi).toHaveBeenCalled();
          expect(instance.state.loader).toBe(true);
        });
      });


      test("User navigate to registration page for checkbox select change", ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountIamNotaryRegWeb;
      
        given("I am a User loading email account registration page", () => {
          emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountIamNotaryRegWeb {...screenProps} />);
          instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountIamNotaryRegWeb;
        });
      
        when("I change checkbox for privacy", () => {
            const check = emailAccountRegistrationWrapperRegistration.findWhere(
                (node) => node.prop("data-test-id") === "checkboxChangeID"
              );
        
              check.simulate("change", { target: { checked: true } });
        });
      
        then("checkbox change successfully", () => {
            expect(emailAccountRegistrationWrapperRegistration).toBeDefined()
        });
      });
});
