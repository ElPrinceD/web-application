import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import UserNotaryService from "../../src/UserNotaryService"

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "UserNotaryService",
};

const feature = loadFeature("./__tests__/features/UserNotaryService-scenario.feature");

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserNotaryService", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: UserNotaryService;
    given("I am a User loading UserNotaryService", () => {
      wrapper = shallow(<UserNotaryService {...screenProps} />);
    });

    when("I navigate to the UserNotaryService", () => {
      instance = wrapper.instance() as UserNotaryService;
    });

    then("UserNotaryService will load with out errors", () => {
      expect(findByTestID(wrapper, "view")).toHaveLength(1);
    });
  });
});
