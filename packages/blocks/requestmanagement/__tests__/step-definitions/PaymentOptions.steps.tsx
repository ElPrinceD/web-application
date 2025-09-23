import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";

import React from "react";
import PaymentOptions from "../../src/PaymentOptions";

const navigate = jest.fn();

const screenProps = {
  navigation: {
    navigate,
  },
  id: "PaymentOptions",
};

const feature = loadFeature(
  "./__tests__/features/PaymentOptions-scenario.feature"
);

const findByTestId = (wrapper: ShallowWrapper<any>, testID: string) =>
    wrapper.findWhere((node) => node.prop("testID") === testID).first();


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to PaymentOptions", ({ given, when, then }) => {
    let paymentOptions: ShallowWrapper;
    let instance: PaymentOptions;

    given("I am a User loading PaymentOptions", () => {
      paymentOptions = shallow(<PaymentOptions {...screenProps} />);
    });

    when("I navigate to the PaymentOptions", () => {
      instance = paymentOptions.instance() as PaymentOptions;
    });

    then("PaymentOptions will load with out errors", () => {          
      const viewScreen = findByTestId(paymentOptions,"test1");
      expect(viewScreen).toHaveLength(1);
    });
  });
});
