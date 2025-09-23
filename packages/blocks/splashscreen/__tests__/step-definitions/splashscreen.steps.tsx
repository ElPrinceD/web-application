import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Splashscreen from "../../src/Splashscreen";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Splashscreen",
};

const feature = loadFeature(
  "./__tests__/features/splashscreen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.doMock("react-native/Libraries/Utilities/Dimensions", () => ({
      get: () => 300,
      addEventListener: (event: string, callback: () => null) => callback(),
    }));
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  test("User navigates to Splashscreen", ({ given, when, then }) => {
    let splashscreen: ShallowWrapper;
    let instance: Splashscreen;

    given("I am a User loading Splashscreen", () => {
      splashscreen = shallow(<Splashscreen {...screenProps} />);
    });

    when("I navigate to the Splashscreen", () => {
      instance = splashscreen.instance() as Splashscreen;
    });

    then("Splashscreen will load with out errors", () => {
      expect(Splashscreen).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(Splashscreen).toBeTruthy();
    });
  });
});
