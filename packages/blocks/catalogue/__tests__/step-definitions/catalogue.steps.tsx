import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Catalogue from "../../src/Catalogue";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Catalogue",
};

jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
  removeStorageData: jest.fn()
}));

const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
  wrapper.findWhere((node) => node.prop("testID") === testID);

const feature = loadFeature("./__tests__/features/catalogue-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Catalogue;

    given("I am a User loading catalogue", () => {
      exampleBlockA = shallow(<Catalogue {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = exampleBlockA.instance() as Catalogue;
    });

    then("catalogue will load with out errors", () => {
      const main = findByTestID(exampleBlockA, "main");
      expect(main).toHaveLength(0);
    });
  });
});
