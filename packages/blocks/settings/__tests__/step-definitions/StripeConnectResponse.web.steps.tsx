import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import StripeConnectResponse from "../../src/StripeConnectResponse.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "StripeConnectResponse",
};

const mockApiCall = (
  instance: any,
  messageIdProperty: string,
  data: any,
  isError: boolean = false
) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    requestMessage.messageId
  );

  requestMessage.addData(
    getName(
      !isError
        ? MessageEnum.RestAPIResponceSuccessMessage
        : MessageEnum.RestAPIResponceErrorMessage
    ),
    data
  );

  instance[messageIdProperty] = requestMessage.messageId;

  runEngine.sendMessage("Unit Test", requestMessage);
};
const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-test-id") === testID);


const feature = loadFeature(
  "./__tests__/features/StripeConnectResponse-scenario.web.feature"
);

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {
  let mockPostMessage: jest.Mock;
  let mockClose: jest.Mock;

  beforeEach(() => {
    mockPostMessage = jest.fn();
    mockClose = jest.fn();

    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    Object.defineProperty(window, 'opener', {
      writable: true,
      value: { postMessage: mockPostMessage, location: { origin: 'http://localhost' } },
    });

    window.close = mockClose;

  });

  test("User navigates to StripeConnectResponse", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: StripeConnectResponse;

    given("I am a User loading StripeConnectResponse", () => {
      exampleBlockA = shallow(<StripeConnectResponse {...screenProps} />);
    });

    when("I navigate to the StripeConnectResponse", () => {
      instance = exampleBlockA.instance() as StripeConnectResponse;
    });

    then("StripeConnectResponse will load with out errors", () => {
      instance.componentDidMount();
      expect(mockPostMessage).toHaveBeenCalledWith('stripe-setup-completed', "http://localhost");
      expect(mockClose).toHaveBeenCalled();

      expect(exampleBlockA).toBeTruthy();
    });


  });
});
