import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Typography } from "@mui/material";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";

import ContactUs from "../../src/ContactUs.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "ContactUs",
};

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first(); 

const contactAPIData = {
      "id": "1",
      "type": "contact_us",
      "attributes": {
          "id": 1,
          "title": "GET IN TOUCH",
          "subtitle": "Reach out to us from anywhere in the world and we’ll be available to help",
          "email": "support@renotary.co.uk",
          "country_code": "+44",
          "phone_number": "1234567890",
          "address": "49 Featherstone Street, LONDON, United Kingdom - EC1Y 8SY",
          "contact_image_url": {
              "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcjRKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8c09640ec636c2b095a6548380bca9f6cbcfbfa1/Renotary%20for%20Devs__-page-1.png"
          }
      }
}

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
  const msgSucessRestAPI = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgSucessRestAPI.messageId
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    apiData
  );
  instance[apiCallID] = msgSucessRestAPI.messageId;
  const { receive: MockRecieve } = instance;
  MockRecieve("", msgSucessRestAPI);
};

const feature = loadFeature("./__tests__/features/ContactUs-scenario.feature");
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
                  signIn: () =>
                    Promise.resolve({
                      getAuthResponse: () => ({ access_token: "access_token" })
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

  test("User navigates to ContactUs", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: ContactUs;

    given("I am a User loading ContactUs", () => {
      landingPageBlock = shallow(<ContactUs {...screenProps} />);
    });

    when("I navigate to the ContactUs", () => {
      instance = landingPageBlock.instance() as ContactUs;
    });

    then("ContactUs page will load with out errors", () => {
      expect(landingPageBlock).toBeTruthy();
    });

    then("Contact data will display and hide skeleton", () => {
      mockAPICall(instance, "getcontactdataRequestDetailsCallId", contactAPIData);
    });

    then("contact page data display with clicks", () => {
      landingPageBlock.setState({ 
        contactData: { title: "GET IN TOUCH" } 
      });
      const typography = findByTestID(landingPageBlock, "contactTitle");
      expect(typography.text()).toBe("GET IN TOUCH");
   });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
