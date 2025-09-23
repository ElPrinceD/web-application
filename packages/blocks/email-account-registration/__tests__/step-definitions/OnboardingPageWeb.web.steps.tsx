import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";

import OnboardingPageWeb from "../../src/OnboardingPageWeb.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "email-account-registration-scenario-landing-page",
};

const feature = loadFeature(
  "./__tests__/features/OnboardingPageWeb-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("Onboarding Page", ({ given, when, then }) => {
    let Onboardingpage: ShallowWrapper;
    let instance: OnboardingPageWeb;

    given("I am a User loading the OnboardingPageWeb", () => {
      Onboardingpage = shallow(<OnboardingPageWeb {...screenProps} />);
      expect(Onboardingpage.find("Welcome")).toBeVisible;
    });

    then("OnboardingPageWeb will load with out errors", () => {
      instance = Onboardingpage.instance() as OnboardingPageWeb;
      expect(Onboardingpage.find("Welcome")).toBeVisible;
    });

    when("I click the Login button", () => {
      Onboardingpage.findWhere(
        (node) => node.prop("data-test-id") === "loginBtn"
      ).simulate("click");
    });
    then("It will navigate to LoginScreen", () => {
      expect(Onboardingpage.find("Welcome")).toBeVisible;
    });
    when("I click the cards", () => {
      instance.gotoIamNotary();
      let buttonComponent = Onboardingpage.findWhere(
        (node) => node.prop("data-test-id") === "CardTest1"
      );
      buttonComponent.simulate("click");
      Onboardingpage.findWhere(
        (node) => node.prop("data-test-id") === "CardTestBtn1"
      ).simulate("click");
    });
    when("I click the cards on tablet", () => {
      let buttonComponent = Onboardingpage.findWhere(
        (node) => node.prop("data-test-id") === "CardTest"
      );
      buttonComponent.simulate("click");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(Onboardingpage.find("Welcome")).toBeVisible;
    });

    when("I click on toggle button", () => {
      let buttonComponent = Onboardingpage.findWhere(
        (node) => node.prop("data-test-id") === "toggleButton"
      );
      buttonComponent.simulate("click");
    });

    then("Drawer should open", () => {
      expect(Onboardingpage.find("Already")).toBeVisible;
    });

    when("I click on renotary logo", () => {
      let buttonComponent = Onboardingpage.findWhere(
        (node) => node.prop("data-test-id") === "renotaryLogo"
      );
      buttonComponent.simulate("click");
    });

    then("It will navigate to Landing Page", () => {
      expect(Onboardingpage.find("Already")).not.toBeVisible;
    });
  });
});
