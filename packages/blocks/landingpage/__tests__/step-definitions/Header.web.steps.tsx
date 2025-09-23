import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import React from "react";

import Header from "../../src/Header.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Header",
};
Object.defineProperty(global, "window", {
  value: {
    scrollTo: jest.fn(),
    location: {
      search: "test",
      pathname: "/",
    },
    document: {
      getElementById: jest.fn(),
    },
  },
});
const feature = loadFeature("./__tests__/features/Header-scenario.feature");

const notaryUserProfileResponse = {
  data: {
    id: "1204",
    type: "profile",
    attributes: {
      id: 1204,
      first_name: "Suraj",
      last_name: "Rathod",
      full_phone_number: "567993470",
      city: "Anand",
      post_code: "778 jkkk",
      country_code: null,
      phone_number: 567993470,
      email: "Testdeviam1@yopmail.com",
      activated: true,
      user_type: "notary",
      user_name: null,
      platform: null,
      suspend_until: null,
      status: "regular",
      role_id: 2,
      full_name: "Dev User",
      gender: null,
      date_of_birth: null,
      age: null,
      country: "India",
      address: "Dev User Dev User Dev User Dev Dev User Dev User D",
      address_line_2: "hhyhh",
      contact_name: "Test dev iam",
      company_name: "Test devnotary",
      is_online: true,
      photo: {
        url: "f76c29a9fb2dc556e138f1cbce07aed7411e/download.jpg",
      },
    },
  },
};

const endUserProfileApiResponse = {
  data: {
    id: "1045",
    type: "profile",
    attributes: {
      id: 1045,
      first_name: "suraj",
      last_name: "rathod",
      full_phone_number: "",
      city: "",
      post_code: "",
      country_code: "",
      phone_number: "",
      email: "qwert@gmail.com",
      activated: true,
      user_type: "individual",
      user_name: "",
      platform: "",
      suspend_until: null,
      status: "regular",
      role_id: 1,
      full_name: "sdf wer",
      gender: null,
      date_of_birth: null,
      age: null,
      country: null,
      address: null,
      address_line_2: null,
      contact_name: "",
      company_name: "",
      is_online: true,
      photo: {
        url: "f76c29a9fb2dc556e138f1cbce07aed7411e/download.jpg",
      },
    },
  },
};

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

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {
  let originalWindow: any;
  beforeEach(() => {
    originalWindow = { ...window };

    Object.defineProperty(window, "history", {
      writable: true,
      value: {
        pushState: jest.fn(),
      },
    });

    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        href: "/some-url",
        replace: jest.fn(),
      },
    });

        // const windowSpy = jest.spyOn(global, "window", "get");
        // windowSpy.mockImplementation(() => ({
        //     ...originalWindow,
        //     gapi: {
        //       auth2: {
        //         getAuthInstance: () => ({
        //           signIn: () =>
        //             Promise.resolve({
        //               getAuthResponse: () => ({ access_token: "access_token" })
        //             }),
        //             isSignedIn: {
        //               get: jest.fn(() => true),
        //             },
        //             currentUser: {
        //               get: jest.fn(() => ({
        //                 disconnect: jest.fn(),
        //                 reloadAuthResponse: jest.fn(() => Promise.resolve({
        //                   access_token: "new_access_token"
        //                 })),
        //                 isSignedIn: jest.fn(),
        //               })),
        //             },
        //             signOut: jest.fn().mockResolvedValue("")
        //         }),
        //         init() {
        //         }
        //       },
        //       load(value: string, callback: () => void) {
        //         callback();
        //       }
        //     }
        //   }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("User navigates to Header", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: Header;

    given("I am a User loading Header", () => {
      landingPageBlock = shallow(<Header {...screenProps} />);
    });

    when("I navigate to the Header", () => {
      instance = landingPageBlock.instance() as Header;
      instance.setToken("token");
    });

    then("Header will load with out errors", () => {
      expect(landingPageBlock).toBeTruthy();
    });

    when("I click on toggle button", () => {
      let buttonComponent = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "toggleButton"
      );
      buttonComponent.simulate("click");
    });

    then("Drawer should open", () => {
      expect(landingPageBlock.find("home")).toBeTruthy();
    });

    then("I can click the home button", () => {
      let buttonComponent = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "home"
      );
      buttonComponent.simulate("click");
    });
    then("I am navigated to the home page", () => {
      const homeNavLink = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "homeNavLink2"
      );
      homeNavLink.simulate("click");
    });

    then("I can click the services button", () => {
      let buttonComponent = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "services"
      );
      buttonComponent.simulate("click");
    });

    then("I can click the aboutus button", () => {
      let buttonComponent = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "aboutus"
      );
      buttonComponent.simulate("click");
    });

    then("I can click on contact menu from the header", () => {
      let contactButton = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "contactus"
      );
      contactButton.simulate("click");
    });

    then("I can click faq menu from the header", () => {
      let buttonComponent = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "faq"
      );
      buttonComponent.simulate("click");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock).toBeTruthy();
    });
  });

  test("User navigates to Header Upright side", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: Header;

    given("I am a User loading Header Upright side", () => {
      landingPageBlock = shallow(<Header {...screenProps} />);
    });

    when("I navigate to the Header Upright side", () => {
      instance = landingPageBlock.instance() as Header;
      mockAPICall(instance, "getProfileApiCallId", {errors: [{token: "Invalid token"}]});
      mockAPICall(instance, "getProfileApiCallId", notaryUserProfileResponse);
      mockAPICall(instance, "getProfileApiCallId", endUserProfileApiResponse);
    });

    then("Header will load with out errors on Upright side", () => {
      expect(landingPageBlock).toBeTruthy();
    });

    when("I click on username toggle button", () => {
      instance.setState({ userName: "suraj rathod", token: "token" });
      landingPageBlock
        .findWhere(
          (wrapper) => wrapper.prop("data-test-id") === "headmenutoggle"
        )
        .simulate("click");
    });

    then("User can review the dashboard menu", () => {
      expect(
        landingPageBlock.findWhere(
          (node) => node.prop("data-test-id") === "menu-box"
        )
      ).toEqual;
      let box = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "menu-box-mobile"
      )
      box.simulate("click");
    });
  });
});
