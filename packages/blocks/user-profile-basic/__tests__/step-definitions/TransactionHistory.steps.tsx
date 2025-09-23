import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TransactionHistory from "../../src/TransactionHistory"

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "TransactionHistory",
};

const feature = loadFeature("./__tests__/features/TransactionHistory-scenario.feature");

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TransactionHistory", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: TransactionHistory;
    given("I am a User loading TransactionHistory", () => {
      wrapper = shallow(<TransactionHistory {...screenProps} />);
    });

    when("I navigate to the TransactionHistory", () => {
      instance = wrapper.instance() as TransactionHistory;
    });

    then("TransactionHistory will load with out errors", () => {
      expect(wrapper).toBeTruthy();
    });
  });
});
