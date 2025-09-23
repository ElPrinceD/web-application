import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";

import AboutUs from "../../src/AboutUs.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Typography } from "@material-ui/core";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "AboutUs",
};

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-test-id") === testID).first(); 

const feature = loadFeature("./__tests__/features/AboutUs-scenario.feature");

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

  test("User navigates to AboutUs", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: AboutUs;

    given("I am a User loading AboutUs", () => {
      landingPageBlock = shallow(<AboutUs {...screenProps} />);
    });

    when("I can review the about us content page", () => {
      instance = landingPageBlock.instance() as AboutUs;
    });

    then("AboutUs page content will load with out errors", () => {
      const apiMsg: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: [
          {
            id: "1",
            type: "partner",
            attributes: {
              id: 1,
              title: "Instagram",
              logo_image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaGdDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4c68dc294572975facc2cff4850a2cf3c4dafe2d/Flag_of_Bahrain.svg.png",
              },
              url: "https://www.instagram.com/",
            },
          },
        ],
      });
      instance.getpatnerdataRequestDetailsCallId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setState({ faqData: [{ "": "" }] });
      instance.setState({
        patnerData: [
          {
            id: "1",
            type: "partner",
            attributes: {
              id: 1,
              title: "Instagram",
              logo_image: {
                url: "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaGdDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4c68dc294572975facc2cff4850a2cf3c4dafe2d/Flag_of_Bahrain.svg.png",
              },
              url: "https://www.instagram.com/",
            },
          },
        ],
      });
      instance.setState({ leaderShipData: [{ "": "" }] });
      instance.setState({
        homeData: {
          "vision_mission": {
            "vision_mission_image": {
                "url": null
            },
            "vision": {
                "title": "",
                "description": "",
                "icon": {
                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1f21e39d337fb6108b7a44932a98bcb0ed5deff5/33f1a9beca507f9c83828724d96e2eea.png"
                }
            },
            "mission": {
                "title": "",
                "description": "",
                "icon": {
                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUlFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a03759df8988551d4bb294ff5cd43147acccee58/efd81fdd8e3a4cf5681fc3ba89553c9c.png"
                }
            }
        },
        },
      });
      expect(landingPageBlock).toBeTruthy();
      const faqTitle = {
        faq_title: 'Friquently asked questions',
      };

      instance.setState({ faqTitle });
      expect(landingPageBlock.exists()).toBe(true);

    });

    then("I can review the about page content", () => {
      const handleAccolistID = findByTestID(landingPageBlock, "handleAccolist");
      expect(handleAccolistID).toHaveLength(1);
    });

    then("I can leave the about us screen", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });
});
