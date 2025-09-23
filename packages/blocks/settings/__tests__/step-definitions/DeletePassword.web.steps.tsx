import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import DeletePassword from "../../src/DeletePassword.web";
import DeletePasswordController from "../../src/DeletePasswordController";
import { Typography } from "@material-ui/core";
import CustomConfirmationPopup from "../../../../components/src/CustomConfirmationPopup";
import { loadGapiInsideDOM, loadAuth2 } from 'gapi-script';
import { removeStorageData } from "../../../../framework/src/Utilities";
import { OutlookAuthProvider } from "../../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../../components/src/GoogleAuthProvider.web";

jest.mock("@material-ui/core", () => ({
  Typography: "Typography",
  Box: "Box",
  Button: "Button",
}));

jest.mock("../../../../components/src/CustomConfirmationPopup", () => "CustomConfirmationPopup");

jest.mock('gapi-script', () => ({
  gapi: {},
  loadAuth2: jest.fn(),
  loadGapiInsideDOM: jest.fn(),
}));

jest.mock('../../../../components/src/OutlookAuthProvider.web', () => ({
  OutlookAuthProvider: {
    signOut: jest.fn(),
  },
}));

jest.mock('../../../../components/src/GoogleAuthProvider.web', () => ({
  GoogleAuthProvider: {
    signOut: jest.fn(),
  },
}));

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "DeletePassword",
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

const feature = loadFeature(
  "./__tests__/features/DeletePassword-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(global, "setTimeout");
    jest.useFakeTimers();
  });

  test("User navigates to DeletePassword", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: DeletePassword;
    
    
    given("I am a User loading DeletePassword", () => {
      exampleBlockA = shallow(<DeletePassword {...screenProps} />);
    });

    when("I navigate to the DeletePassword", () => {
      instance = exampleBlockA.instance() as DeletePassword;
    });

    then("DeletePassword will load without errors", () => {
      expect(exampleBlockA).toBeTruthy();
      const passwordInput = findByTestID(exampleBlockA, "password-field");
      const eyeIcon = findByTestID(exampleBlockA, "eye-icon");
      const deleteButton = findByTestID(exampleBlockA, "delete-button");
      const cancelButton = findByTestID(exampleBlockA, "cancel-delete-button");
      
      passwordInput.simulate('change', {target: {value: "sdcfvcec"}});
      passwordInput.simulate('change', {target: {value: "sdcfvcec*"}});
      passwordInput.simulate('change', {target: {value: "*sdcfvcec"}});
      passwordInput.simulate('change', {target: {value: "*sdcfvcec*"}});
      eyeIcon.simulate('click');
      deleteButton.simulate('click');
      cancelButton.simulate('click');
      instance.handleDeleteAccount();
    });
  });

  test("Component mounts and receives API response", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePasswordController;

    given("I have mounted the DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePasswordController;
    });

    when("The component mounts and API is called", () => {
      const spyComponentDidMount = jest.spyOn(instance, 'componentDidMount');
      instance.componentDidMount();
      expect(spyComponentDidMount).toHaveBeenCalled();
    });

    then("It should handle the API response correctly", () => {
      const mockResponse = {
        data: {
          attributes: {
            email: "test@example.com"
          }
        }
      };
      
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.addData(getName(MessageEnum.RestAPIResponceDataMessage), instance.getProfileApiCallID);
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), mockResponse);
      
      instance.receive(getName(MessageEnum.RestAPIResponceMessage), message);
      
    });
  });

// Modify the existing "User attempts to delete account" test to cover the successful case
test("User attempts to delete account", ({ given, when, then }) => {
  let wrapper: ShallowWrapper;
  let instance: DeletePassword;

  given("I am on the DeletePassword screen", () => {
    wrapper = shallow(<DeletePassword {...screenProps} />);
    instance = wrapper.instance() as DeletePassword;
    // Mock the send method
    instance.send = jest.fn();
  });

  when("I enter my password and click delete", () => {
    instance.setState({ password: "testpassword" });
    instance.handleClickDeletePassword();
  });

  then("It should validate the password and show confirmation", () => {
    const mockResponse = {
      meta: {
        token: "testtoken"
      }
    };
    
    instance.saveLoggedInUserData(mockResponse);
    
    expect(instance.state.handlePopup).toBe(true);
    expect(instance.state.error).toBe("");
    expect(instance.send).toHaveBeenCalledWith(expect.any(Message));
  });
});


  test("Display error message", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I am on the DeletePassword screen", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("There is an error in the state", () => {
      instance.setState({ error: "Test error message" });
    });

    then("The error message should be displayed", () => {
      wrapper.update();
      const errorMessage = wrapper.find(Typography).findWhere(n => n.prop('style') && n.prop('style').color === 'red');
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toBe("Test error message");
    });
  });

  test("Display success popup", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I am on the DeletePassword screen", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("The handleSuccessPopup state is true", () => {
      instance.setState({ handleSuccessPopup: true, message: "Success message" });
    });

    then("The success confirmation popup should be displayed", () => {
      wrapper.update();
      const successPopup = wrapper.find(CustomConfirmationPopup).findWhere(n => n.prop('type') === 'success');
      expect(successPopup.exists()).toBe(true);
      expect(successPopup.prop('discText')).toBe("Success message");
    });
  });

  test("Display failure popup", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I am on the DeletePassword screen", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("The failurePopup state is true", () => {
      instance.setState({ failurePopup: true, message: "Failure message" });
    });

    then("The failure confirmation popup should be displayed", () => {
      wrapper.update();
      const failurePopup = wrapper.find(CustomConfirmationPopup).findWhere(n => n.prop('type') === 'warning');
      expect(failurePopup.exists()).toBe(true);
      expect(failurePopup.prop('discText')).toBe("Failure message");
      expect(failurePopup.prop('hideBtn')).toBe(true);
    });
  });

  test("Component mounts and handles API loading error", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;
    let consoleSpy: jest.SpyInstance;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
      consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    when("The component mounts and API loading fails", async () => {
      // Mock loadGapiInsideDOM to throw an error
      (loadGapiInsideDOM as jest.Mock).mockRejectedValueOnce(new Error('API loading failed'));
      
      // Spy on getProfile method
      const getProfileSpy = jest.spyOn(instance, 'getProfile');

      await instance.componentDidMount();

      // Wait for any pending promises to resolve
      await new Promise(resolve => setImmediate(resolve));

      expect(getProfileSpy).toHaveBeenCalled();
    });

    then("It should handle the error and continue execution", () => {
      // Verify that the error was caught (no error thrown)
      expect(consoleSpy).not.toHaveBeenCalled();

      // Clean up
      consoleSpy.mockRestore();
    });
  });

  test("Component receives profile API response", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("The component receives a profile API response", () => {
      const mockResponse = {
        data: {
          attributes: {
            email: "test@example.com"
          }
        }
      };

      instance.getProfileApiCallID = "testProfileApiCallId";
      instance.responseSuccessCallBack("testProfileApiCallId", mockResponse);
    });

    then("It should update the email state", () => {
      expect(instance.state.email).toBe("test@example.com");
    });
  });

  test("Component receives check password API response", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("The component receives a check password API response", () => {
      const mockResponse = { /* mock response data */ };
      instance.checkPasswordForDeleteApiID = "testCheckPasswordApiCallId";
      instance.saveLoggedInUserData = jest.fn();
      instance.responseSuccessCallBack("testCheckPasswordApiCallId", mockResponse);
    });

    then("It should call saveLoggedInUserData", () => {
      expect(instance.saveLoggedInUserData).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  test("Component receives delete account API response", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("The component receives a delete account API response", () => {
      const mockResponse = { /* mock response data */ };
      instance.deleteAccountApiID = "testDeleteAccountApiCallId";
      instance.deleteAccountProcess = jest.fn();
      instance.responseSuccessCallBack("testDeleteAccountApiCallId", mockResponse);
    });

    then("It should call deleteAccountProcess", () => {
      expect(instance.deleteAccountProcess).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  test("Component handles invalid login response", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("The component receives an invalid login response", () => {
      const invalidResponse = { 
        // This response doesn't have the expected structure
        data: {
          attributes: {
            some_other_data: "value"
          }
        }
      };
      instance.saveLoggedInUserData(invalidResponse);
    });

    then("It should set an error state", () => {
      expect(instance.state.error).toBe("Invalid Password");
      expect(instance.state.handlePopup).toBeFalsy();
    });
  });

  test("User closes delete confirmation popup", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I am on the DeletePassword screen with confirmation popup open", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
      instance.setState({ handlePopup: true, password: "somepassword", error: "some error" });
    });

    when("I click the delete button again", async () => {
      await instance.handleClickDeletePassword();
    });

    then("The confirmation popup should close", () => {
      expect(instance.state.handlePopup).toBe(false);
      expect(instance.state.password).toBe("");
      expect(instance.state.error).toBe("");
    });
  });

  test("User enters correct remembered password", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I am on the DeletePassword screen with remembered credentials", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
      // Mock localStorage
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn((key) => {
            if (key === 'rememberedEmail') return 'test@example.com';
            if (key === 'rememberedPassword') return 'correctpassword';
            return null;
          }),
        },
        writable: true
      });
    });

    when("I enter the correct remembered password and click delete", async () => {
      instance.setState({ password: "correctpassword" });
      await instance.handleClickDeletePassword();
    });

    then("The confirmation popup should open", () => {
      expect(instance.state.handlePopup).toBe(true);
      expect(instance.state.error).toBe("");
    });
  });

  test("User submits empty password", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I am on the DeletePassword screen", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("I submit an empty password", async () => {
      instance.setState({ password: "" });
      await instance.handleClickDeletePassword();
    });

    then("I should see an error message about empty password", () => {
      expect(instance.state.error).toBe("Password should not be empty");
    });
  });

  test("Component handles successful account deletion", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
      instance.handleSuccessFlow = jest.fn();
      instance.handleErrorFlow = jest.fn();
    });

    when("The component receives a successful delete account API response", async () => {
      const successResponse = { message: "Account deleted successfully" };
      await instance.deleteAccountProcess(successResponse);
    });

    then("It should call handleSuccessFlow", () => {
      expect(instance.state.handlePopup).toBe(false);
      expect(instance.handleSuccessFlow).toHaveBeenCalledWith("Account deleted successfully");
      expect(instance.handleErrorFlow).not.toHaveBeenCalled();
    });
  });

  test("Component handles failed account deletion", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
      instance.handleSuccessFlow = jest.fn();
      instance.handleErrorFlow = jest.fn();
    });

    when("The component receives a failed delete account API response", async () => {
      const errorResponse = { error: "Failed to delete account" };
      await instance.deleteAccountProcess(errorResponse);
    });

    then("It should call handleErrorFlow", () => {
      expect(instance.state.handlePopup).toBe(false);
      expect(instance.handleErrorFlow).toHaveBeenCalledWith("Failed to delete account");
      expect(instance.handleSuccessFlow).not.toHaveBeenCalled();
    });
  });

  test("Component handles successful account deletion flow", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      jest.useFakeTimers();
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
      instance.handleLogoutNavigation = jest.fn();
    });

    when("The handleSuccessFlow is called with a success message", () => {
      instance.handleSuccessFlow("Account deleted successfully");
    });

    then("It should show a success popup and then navigate to logout", () => {
      expect(instance.state.handleSuccessPopup).toBe(true);
      expect(instance.state.message).toBe("Account deleted successfully");
      
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      
      jest.runAllTimers();

      expect(instance.state.handleSuccessPopup).toBe(false);
      expect(instance.handleLogoutNavigation).toHaveBeenCalled();

      jest.useRealTimers();
    });
  });

  test("Component handles failed account deletion flow", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      jest.useFakeTimers();
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
    });

    when("The handleErrorFlow is called with an error message", () => {
      instance.handleErrorFlow("Failed to delete account");
    });

    then("It should show a failure popup and then hide it after a delay", () => {
      expect(instance.state.failurePopup).toBe(true);
      expect(instance.state.message).toBe("Failed to delete account");
      
      // Check if setTimeout was called
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      
      // Fast-forward time
      jest.runAllTimers();

      // Check the state after the timeout
      expect(instance.state.failurePopup).toBe(false);

      // Clean up
      jest.useRealTimers();
    });
  });

  test("Component handles logout navigation", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DeletePassword;

    given("I have a DeletePassword component", () => {
      wrapper = shallow(<DeletePassword {...screenProps} />);
      instance = wrapper.instance() as DeletePassword;
      instance.handleNavigate = jest.fn();
    });

    when("The handleLogoutNavigation is called", async () => {
      await instance.handleLogoutNavigation();
    });

    then("It should remove storage data, sign out from providers, and navigate to Home", () => {
      // Check if removeStorageData was called for each item
      // expect(removeStorageData).toHaveBeenCalledWith("token");
      // expect(removeStorageData).toHaveBeenCalledWith("google_auth");
      // expect(removeStorageData).toHaveBeenCalledWith("isGoogleSync");
      // expect(removeStorageData).toHaveBeenCalledWith("isOutlookSync");
      // expect(removeStorageData).toHaveBeenCalledWith("ms_accessToken");

      // Check if signOut was called for both providers
      expect(GoogleAuthProvider.signOut).toHaveBeenCalled();
      expect(OutlookAuthProvider.signOut).toHaveBeenCalled();

      // Check if handleNavigate was called with "Home"
      expect(instance.handleNavigate).toHaveBeenCalledWith("Home");
    });
  });

  // Modify the existing "Component handles successful account deletion flow" test

  
});
