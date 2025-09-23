import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import UserProfile from "../../src/UserProfile"

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "UserProfile",
};

const feature = loadFeature("./__tests__/features/UserProfile-scenario.feature");

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserProfile", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: UserProfile;
    given("I am a User loading UserProfile", () => {
      wrapper = shallow(<UserProfile {...screenProps} />);
    });

    when("I navigate to the UserProfile", () => {
      instance = wrapper.instance() as UserProfile;
    });

    then("UserProfile will load with out errors", () => {
      expect(wrapper).toBeTruthy();
    });
  });
});
