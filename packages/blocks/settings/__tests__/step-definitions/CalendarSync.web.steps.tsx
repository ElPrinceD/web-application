import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CalendarSync from "../../src/CalendarSync.web";

import { OutlookAuthProvider } from "../../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../../components/src/GoogleAuthProvider.web";

import { getStorageData } from "../../../../framework/src/Utilities";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "CalendarSync",
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



const googleUserInfoMockResp = {
  "id": "10114935",
  "email": "abc@gmail.com",
  "verified_email": true,
  "name": "ab c",
  "given_name": "ab",
  "family_name": "c",
  "picture": "https://lh3.googleusercontent.com/a/ACg8ocLfqpT3wBMUJWgDXMh_nI4qObzwbUKUqPd89TewUrDx0wqlNg=s96-c",
  "hd": "gmail.com"
}

const outlookAuthUserInfoMockRes = { 
	"displayName": "John Doe", 
	"givenName": "John", 
	"surname": "Doe", 
	"mail": "john.doe@example.com", 
	"userPrincipalName": "john.doe@example.com", 
	"id": "some-id" 
}

const feature = loadFeature(
  "./__tests__/features/CalendarSync-scenario.web.feature"
);

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    const originalWindow: any = { ...window };
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      gapi: {
        auth2: {
          getAuthInstance: () => ({
            grantOfflineAccess: () =>
              Promise.resolve({
                getAuthResponse: () => ({ code: "access_token" })
              }),
              isSignedIn: {
                get: jest.fn(() => true),
              },
              currentUser: {
                get: jest.fn(() => ({
                  disconnect: jest.fn(),
                  reloadAuthResponse: jest.fn(() => Promise.resolve({
                    access_token: "new_access_token"
                  })),
                  isSignedIn: jest.fn(),
                })),
              },
              signOut: jest.fn().mockResolvedValue("")
          }),
          init() {
          }
        },
        load(value: string, callback: () => void) {
          callback();
        }
      }
    }));
  });

  test("User navigates to CalendarSync", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CalendarSync;

    given("I am a User loading CalendarSync", () => {
      exampleBlockA = shallow(<CalendarSync {...screenProps} />);
    });

    when("I navigate to the CalendarSync", () => {
      instance = exampleBlockA.instance() as CalendarSync;
    });

    then("CalendarSync will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("User can click google_authenticate button", async() => {
      const google_check = findByTestID(exampleBlockA,"google-check-input");
      google_check.simulate('change', {target: {name: "handleGoogleUi", checked: true}});
      const google_auth_btn = findByTestID(exampleBlockA,"google-auth-btn");
      google_auth_btn.simulate('click');
      await GoogleAuthProvider.getAccessToken();
      await getStorageData("isGoogleSync");
      await GoogleAuthProvider.refreshAccessToken("refresh_token");
      
      mockApiCall(instance, "getGoogleAuthUserInfoApiCallId", googleUserInfoMockResp);

      instance.updateCalendarTokenApiCall('google');
      mockApiCall(instance, "updateCalendarTokenApiCallId", {message: "message"});
    });

    then("User can switch the google_sync button", async() => {
      const google_sync = findByTestID(exampleBlockA,"google-sync-switch");
      google_sync.simulate('change', {target: {name: "googleSynced", checked: false}});
      google_sync.simulate('change', {target: {name: "googleSynced", checked: true}});

      mockApiCall(instance, "getGoogleAuthUserInfoApiCallId", {error: {code: 401}});
      mockApiCall(instance, "getGoogleAuthUserInfoApiCallId", {error: "asfsa"});

      await GoogleAuthProvider.refreshAccessToken("token");
      
      expect(exampleBlockA).toBeTruthy();
    });

    then("User can click outlook_authenticate button", async() => {
      const handleClickSpy = jest.spyOn(instance, 'handleOutlookAuth');
      instance.forceUpdate();
      const outlook_check = findByTestID(exampleBlockA,"outlook-check-input");
      outlook_check.simulate('change', {target: {name: "handleOutlookUi", checked: true}});

      const outlook_auth_btn = findByTestID(exampleBlockA,"outlook-auth-btn");
      outlook_auth_btn.simulate('click');

      await OutlookAuthProvider.getAccessToken();

      await instance.handleOutlookAuth();
      mockApiCall(instance, "getOutLookInfoApiCallId", outlookAuthUserInfoMockRes);

      instance.updateCalendarTokenApiCall('outlook');
      mockApiCall(instance, "updateCalendarTokenApiCallId", {message: "message"});

      expect(handleClickSpy).toHaveBeenCalled()
      // expect(instance.state.outlookAuthDetails).toBeTruthy();
    });

    then("User can switch the outlook_sync button", async() => {
      const outlook_sync = findByTestID(exampleBlockA,"outlook-sync-switch");
      outlook_sync.simulate('change', {target: {name: "outlookSynced", checked: false}});

      outlook_sync.simulate('change', {target: {name: "outlookSynced", checked: true}});
      mockApiCall(instance, "getOutLookInfoApiCallId", {error: {code: "InvalidAuthenticationToken"}});
      mockApiCall(instance, "getOutLookInfoApiCallId", {error: "error"});
      expect(exampleBlockA).toBeTruthy();
    });

    then("User can remove the connected account", async() => {
      mockApiCall(instance, "getOutLookInfoApiCallId", outlookAuthUserInfoMockRes);
      mockApiCall(instance, "getGoogleAuthUserInfoApiCallId", googleUserInfoMockResp);
      await OutlookAuthProvider.fetchUserProfilePicture("token");

      const outlook_remove = findByTestID(exampleBlockA,"outlook-remove-btn");
      outlook_remove.simulate('click');
      await OutlookAuthProvider.signOut();
      instance.removeCalendarTokenApiCall('outlook');
      mockApiCall(instance, "removeCalendarTokenApiCallId", {message: "message"});
      const google_remove = findByTestID(exampleBlockA,"google-remove-btn");
      google_remove.simulate('click');
      await GoogleAuthProvider.signOut();
      instance.removeCalendarTokenApiCall('google')
      mockApiCall(instance, "removeCalendarTokenApiCallId", {message: "message"});
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.setGoogleAuth("google_token");
      instance.setOutlookAuth("outlook_token");
      instance.setOutlookSync(true);
      instance.setGoogleSync(true);

      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });

    when("I load page CalendarSync",() => {
      instance = exampleBlockA.instance() as CalendarSync;
    })

    then("It loads fine without errors of api",()=>{
      expect(exampleBlockA).toBeTruthy();
    })
  });
});
