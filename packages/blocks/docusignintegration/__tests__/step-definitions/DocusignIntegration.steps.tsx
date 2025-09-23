import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";

import React from "react";
import DocuSignIntegration from "../../src/DocusignIntegration";

const navigate = jest.fn();

const screenProps = {
  navigation: {
    navigate,
  },
  id: "DocusignIntegration",
};

const feature = loadFeature(
  "./__tests__/features/DocusignIntegration-scenario.feature"
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

  test("User navigates to DocusignIntegration", ({ given, when, then }) => {
    let docusign: ShallowWrapper;
    let instance: DocuSignIntegration;

    given("I am a User loading DocusignIntegration", () => {
      docusign = shallow(<DocuSignIntegration {...screenProps} />);
    });

    when("I navigate to the DocusignIntegration", () => {
      instance = docusign.instance() as DocuSignIntegration;
    });

    then("DocusignIntegration will load with out errors", () => {          
      const viewScreen = findByTestId(docusign,"test1");
      expect(viewScreen).toHaveLength(1);
    });
  });
});
