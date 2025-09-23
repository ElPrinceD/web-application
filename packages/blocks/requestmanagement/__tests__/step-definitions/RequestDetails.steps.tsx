import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";

import React from "react";
import RequestDetails from "../../src/RequestDetails";

const navigate = jest.fn();

const screenProps = {
  navigation: {
    navigate,
  },
  id: "RequestDetails",
};

const feature = loadFeature(
  "./__tests__/features/RequestDetails-scenario.feature"
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

  test("User navigates to RequestDetails", ({ given, when, then }) => {
    let requestDetails: ShallowWrapper;
    let instance: RequestDetails;

    given("I am a User loading RequestDetails", () => {
      requestDetails = shallow(<RequestDetails {...screenProps} />);
    });

    when("I navigate to the RequestDetails", () => {
      instance = requestDetails.instance() as RequestDetails;
    });

    then("RequestDetails will load with out errors", () => {          
      const viewScreen = findByTestId(requestDetails,"test1");
      expect(viewScreen).toHaveLength(1);
    });
  });
});
