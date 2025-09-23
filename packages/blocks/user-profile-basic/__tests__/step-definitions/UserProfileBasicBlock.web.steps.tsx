import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import UserProfileBasicBlock from "../../src/UserProfileBasicBlock.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "UserProfileBasicBlock",
};

const feature = loadFeature(
  "./__tests__/features/UserProfileBasicBlock-scenario.web.feature"
);


const mockAPICall = jest.fn().mockImplementation(
  (
      instance,
      apiCallId: string,
      mockData: object = {},
      messageType: number = MessageEnum.RestAPIResponceSuccessMessage
  ) => {
      const messageRestApiCall = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
      );

      messageRestApiCall.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          messageRestApiCall.messageId
      );

      messageRestApiCall.addData(
          getName(messageType),
          mockData
      );

      instance[apiCallId] = messageRestApiCall.messageId;

      const { receive: mockResponse } = instance;
      mockResponse("mockAPICallTest", messageRestApiCall);
  }
);

const mockNavigationPayLoadMessage = jest.fn().mockImplementation(
  (
    instance,
    dataJson: object = {},
    messageType: MessageEnum.NavigationMessage
  ) => {
    const msgNavigationPayLoadMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgNavigationPayLoadMessage.addData(
      getName(messageType),
      dataJson
    );
  });

const getProfileResponse = {
  "data": {
      "id": "808",
      "type": "profile",
      "attributes": {
          "id": 808,
          "first_name": null,
          "last_name": null,
          "full_phone_number": "",
          "city": null,
          "post_code": null,
          "country_code": null,
          "phone_number": null,
          "email": "anyaTestNotary01@yopmail.com",
          "activated": true,
          "user_type": 'notary',
          "user_name": null,
          "platform": null,
          "suspend_until": null,
          "status": "regular",
          "role_id": 2,
          "full_name": "Test userone",
          "gender": null,
          "date_of_birth": null,
          "age": null,
          "country": "Wales",
          "address": "wales 1",
          "address_line_2": null,
          "contact_name": null,
          "company_name": "HCL",
          "photo": {
              "url": null
          }
      }
  }
}

const getProfileResponseBuisneess = {
  "data": {
      "id": "808",
      "type": "profile",
      "attributes": {
          "id": 808,
          "first_name": null,
          "last_name": null,
          "full_phone_number": "",
          "city": null,
          "post_code": null,
          "country_code": null,
          "phone_number": null,
          "email": "anyaTestNotary01@yopmail.com",
          "activated": true,
          "user_type": 'business',
          "user_name": null,
          "platform": null,
          "suspend_until": null,
          "status": "regular",
          "role_id": 2,
          "full_name": "Test userone",
          "gender": null,
          "date_of_birth": null,
          "age": null,
          "country": "Wales",
          "address": "wales 1",
          "address_line_2": null,
          "contact_name": null,
          "company_name": "HCL",
          "photo": {
              "url": null
          }
      }
  }
}

const getCountryCodeData = {
  countries: [
    {
      country_code: "966",
      name: "test"
    }
  ]
}

const countries = {
  data: [
    {
      "id": "1",
      "type": "country",
      "attributes": {
          "name": "England"
      }
  },
  ]
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserProfileBasicBlock", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: UserProfileBasicBlock;

    given("I am a User loading UserProfileBasicBlock", () => {
      exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps} />);
      instance = exampleBlockA.instance() as UserProfileBasicBlock;
    });

    when("I navigate to the UserProfileBasicBlock", () => {
      mockAPICall(instance, "getUserProfileApiCallID", getProfileResponse)
    });

    then("UserProfileBasicBlock will load with out errors", () => {
      const main = findByTestID(exampleBlockA, 'profileBtn');
      expect(main.props().className).toMatch("option");
      instance.handleBackArrow()
    });

    when("Country code api will call", () => {
      mockAPICall(instance, "getCountryCodeApiCallID", getCountryCodeData)
    });

    then("Country code api called succesfully",() => {
      expect(instance["getCountryCodeApiCallID"].length).toBeGreaterThan(0);
      instance.handleProfileOpen()
    });

    when("Country code list api will call", () => {
      mockAPICall(instance, "getCountryAPICallID", countries)
    });

    then("Country list api called successfully",()=>{
      expect(instance["getCountryAPICallID"].length).toBeGreaterThan(0);
      instance.handleSettingsBtn()
    });

    when("User click on the offline button", () => {
      let onlineBtn = findByTestID(exampleBlockA, "onlineBtn");
      onlineBtn.simulate("click");
    });

    then("User set there status online", () => {
      let onlineBtn = findByTestID(exampleBlockA, "onlineBtn");
      expect(onlineBtn.props().children).toMatch('Online');
      instance.goToTransactionHistory()
    });

    when("I navigate to the UserProfileBasicBlock", () => {
      mockAPICall(instance, "getUserProfileApiCallID", getProfileResponseBuisneess)
    });

    then("UserProfileBasicBlock will load with out errors", () => {
      expect(instance.getUserProfileApiCallID.length).toBeGreaterThan(0);
      instance.notaryNavigation()
    });

    when("I get role id in UserProfileBasicBlock", () => {
      mockAPICall(instance, "getUserProfileApiCallID", getProfileResponseBuisneess)
    });

    then("UserProfileBasicBlock user get id", () => {
      expect(instance.getUserProfileApiCallID.length).toBeGreaterThan(0);
      instance.getProfile()
    });

  });
});
