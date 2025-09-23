import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import DocumentOpener from "../../src/DocumentOpener.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: { goBack: jest.fn() },
  id: "DocumentOpener",
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "web",
  select: jest.fn(),
}));

jest.mock("../../../../framework/src/Utilities", () => ({
  getStorageData: jest.fn().mockImplementationOnce(() => {
    return Promise.resolve("url/sample-blank.docx");
  }),
  removeStorageData: jest.fn(),
}));

jest.mock("@azure/msal-browser", () => {
  return {
    PublicClientApplication: jest.fn().mockImplementation(() => ({
      loginPopup: jest.fn().mockResolvedValue({
        accessToken: "mocked_access_token",
      }),
      logoutPopup: jest.fn().mockResolvedValue(true),
      getAllAccounts: jest.fn().mockReturnValue([{ username: "test_user" }]),
      acquireTokenSilent: jest.fn().mockResolvedValue({
        accessToken: "mocked_silent_access_token",
      }),
    })),
  };
});

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true),
}));

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

const feature = loadFeature(
  "./__tests__/features/DocumentOpener-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to DocumentOpener", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: DocumentOpener;

    given("I am a User loading DocumentOpener", () => {
      wrapper = shallow(<DocumentOpener {...screenProps} />);
    });
    when("I navigate to the DocumentOpener", () => {
      instance = wrapper.instance() as DocumentOpener;
    });
    then("DocumentOpener will load with out errors", () => {
      expect(wrapper).toHaveLength(1);
    });

    when("user clicks on back arrow button", () => {
      findByTestID(wrapper, "backIconButton").simulate("click");
    });
    then("component will unmount", () => {
      expect(wrapper).toHaveLength(1);
    });
  });
});
