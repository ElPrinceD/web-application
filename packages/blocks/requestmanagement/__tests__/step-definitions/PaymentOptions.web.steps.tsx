import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import PaymentOptions from "../../src/PaymentOptions.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {goBack: jest.fn()},
  id: "PaymentOptions",
};

const feature = loadFeature(
  "./__tests__/features/PaymentOptions-scenario.web.feature"
);

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  const { receive: MockRecieve } =  instance
  MockRecieve("", msgSucessRestAPI)
}

const mockNavigationPayLoadMessage = (instance: any, navigationData: object, messageType: MessageEnum.NavigationMessage = MessageEnum.NavigationMessage) => {
  const message = new Message(getName(MessageEnum.NavigationPayLoadMessage))
  message.addData(getName(MessageEnum.NavigationPayLoadMessage), message.messageId);
  message.addData(getName(MessageEnum.CustomDataMessage), navigationData);
  instance[messageType] = message.messageId
  const { receive: MockRecieve } =  instance
  MockRecieve("", message)
}

const navigationData = {
  quoteId: "35",
  notaryRequestId: "663"
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

const stripeResponseJson = {
  "data": {
      "url": "https://checkout.stripe.com/c/pay/cs_test_a1BB6mhO0LlpgusaHZfXRUznOyjSYzvNVYdZAt3oRaE25n9KOyg5er5G5s#fidkdWxOYHwnPyd1blpxYHZxWjA0SlUwPWZPVD1NTTAydEFoR2RgM1NuSHdBM0A3XHFLcFVIcDIxdHZSf0IyU1A3NnJoMkhJZ2RBM2syaFRXRl1JYUB0SURST3FsdEZuME9%2FXHVvUFFcRFx0NTVQNTFyTz1yYicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
      "quote_id": "35",
      "user_id": "1045",
      "notary_request_id": "663",
      cs_id: "something",
  }
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to PaymentOptions", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PaymentOptions;

    given("I am a User loading PaymentOptions", () => {
      exampleBlockA = shallow(<PaymentOptions {...screenProps} />);
    });

    when("I navigate to the PaymentOptions", () => {
      instance = exampleBlockA.instance() as PaymentOptions;
      mockNavigationPayLoadMessage(instance, navigationData);
    });
    then("PaymentOptions will load with out errors", () => {
      const main = findByTestID(exampleBlockA, "paymentOptionsPage");
      expect(main).toHaveLength(1);
    });

    when("User clicks on back arrow button", () => {
      findByTestID(exampleBlockA, "backArrow").simulate("click");
    })
    then("PaymentOptions page will unmount", () => {
      const main = findByTestID(exampleBlockA, "paymentOptionsPage");
      expect(main).toHaveLength(1);
    })

    when("user selects credit/debit option", () => {
      const radioGroup = findByTestID(exampleBlockA, "radioGroup");
      radioGroup.simulate("change", {target: {value: "1"}});
    });
    then("credit/debit option is selected", () => {
      const radioGroup = findByTestID(exampleBlockA, "radioGroup");
      expect(radioGroup.props().value).toBe("1");
    });

    when("user clicks on the continue button", () => {
      const continueButton  =findByTestID(exampleBlockA, "continueButton");
      continueButton.simulate("click");
    });
    then("user gets redirected to Stripe payment page", () => {
      mockAPICall(instance, "stripePayApiCallId", stripeResponseJson)
    })
  });
});