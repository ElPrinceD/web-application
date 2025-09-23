import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Settings from "../../src/Settings.web";

import { Box, Tabs } from "@material-ui/core";
import TabPanel  from "../../../../components/src/SettingsTabPanel.web";
import CustomConfirmationPopupDisconnectStripe from "../../../../components/src/CustomConfirmationPopupDisconnectStripe";
import CustomConfirmationPopup from "../../../../components/src/CustomConfirmationPopup";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Settings",
};

const mockNavigationPayLoadMessage = (instance: any, navigationData: object, messageType: MessageEnum.NavigationMessage = MessageEnum.NavigationMessage) => {
  const message = new Message(getName(MessageEnum.NavigationPayLoadMessage))
  message.addData(getName(MessageEnum.NavigationPayLoadMessage), message.messageId);
  message.addData(getName(MessageEnum.CustomDataMessage), navigationData);
  instance[messageType] = message.messageId
  const { receive: MockRecieve } =  instance
  MockRecieve("", message)
}

const navigationData = {
  tabValue: 1
 }

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

const endUserProfileResponse = {
  "data": {
    "id": "613",
    "type": "profile",
    "attributes": {
      "id": 613,
      "first_name": "CHeck test",
      "last_name": null,
      "full_phone_number": "7768987442",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": 7768987442,
      "email": "ds01@yopmail.com",
      "activated": true,
      "user_type": "individual",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 1,
      "full_name": "Deep singh",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": "England",
      "address": "india",
      "contact_name": "Deep singh ",
      "company_name": "null Check Test",
      "photo": {
        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
      }
    }
  }
};

const notaryUserProfileResponse = {
  "data": {
    "id": "613",
    "type": "profile",
    "attributes": {
      "id": 613,
      "first_name": "CHeck test",
      "last_name": null,
      "full_phone_number": "7768987442",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": 7768987442,
      "email": "ds01@yopmail.com",
      "activated": true,
      "user_type": "notary",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 2,
      "full_name": "Deep singh",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": "England",
      "address": "india",
      "contact_name": "Deep singh ",
      "company_name": "null Check Test",
      "photo": {
        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
      }
    }
  }
};

const stripeConnectMockRes = {
  "data": {
      "url": "https://connect.stripe.com/setup/s/acct_1PrJMJQo2myev5TR/bJWHq1cJr5KL"
  },
  "connected_account": "acct_1PrJMJQo2myev5TR"
}

const feature = loadFeature(
  "./__tests__/features/settings-scenario.web.feature"
);

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    const originalWindow: any = { ...window };
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      gapi: {
        auth2: {
          getAuthInstance: () => ({
            signIn: () =>
              Promise.resolve({
                getAuthResponse: () => ({ access_token: "access_token" })
              })
          }),
          init() {
          }
        },
        load(value: string, callback: () => void) {
          callback();
        }
      }
    }));
  });

  test("Notary User navigates to settings", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Settings;

    given("I am a User loading settings", () => {
      exampleBlockA = shallow(<Settings {...screenProps} />);
    });

    when("I navigate to the settings", () => {
      instance = exampleBlockA.instance() as Settings;
      instance.setToken("token");
    });

    then("settings will load with out errors", () => {
      mockApiCall(instance, "getUserProfileDetailsApiCallId", notaryUserProfileResponse);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      // textInputComponent.simulate("change", event);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can select any tab", () => {
      exampleBlockA.find(Tabs).simulate('change', {}, 1);
      exampleBlockA.find(Tabs).simulate('change', {}, 2);
      exampleBlockA.find(Tabs).simulate('change', {}, 3);
      exampleBlockA.find(Tabs).simulate('change', {}, 5);
      exampleBlockA.find(Tabs).simulate('change', {}, 4);
    
      expect(exampleBlockA.state('value')).toEqual(4);
    });

    then("I can select the Connect button without errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "connect-btn"
      );
      buttonComponent.simulate("click");
      mockApiCall(instance, "stripeConnectApiCallId", stripeConnectMockRes);
      instance.handleStripeConnectRes(stripeConnectMockRes);
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("EndUser navigates to settings", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Settings;

    given("I am a User loading settings", () => {
      exampleBlockA = shallow(<Settings {...screenProps} />);
    });

    when("I navigate to the settings", () => {
      instance = exampleBlockA.instance() as Settings;
      instance.setToken("token");
    });

    then("settings will load with out errors", () => {
      mockApiCall(instance, "getUserProfileDetailsApiCallId", endUserProfileResponse);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      const settingButton = findByTestID(exampleBlockA, 'go-back-btn');
      settingButton.at(0).simulate('click');
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("Notary User navigates to settings after account connect", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Settings;

    given("I am a User loading settings", () => {
      exampleBlockA = shallow(<Settings {...screenProps} />);
    });

    when("I navigate to the settings", () => {
      instance = exampleBlockA.instance() as Settings;
      instance.setToken("token");
      instance.stripeProcess("processing");
    });

    then("settings will load with out errors", () => {
      const error = {
        "error": "The setup was unsuccessful."
      }
      const data = {
        "message": "The setup was successful.",
        "currency": "gbp",
        "account_name": null,
        "account_email": "aky3@yopmail.com"
    }
      mockApiCall(instance, "getUserProfileDetailsApiCallId", notaryUserProfileResponse);
      mockApiCall(instance, "checkStripeConnectApiCallId", error);
      mockApiCall(instance, "checkStripeConnectApiCallId", data);

      const childText = 'Test Content';


      const wrapper = shallow(
        <TabPanel value={0} index={0}>
          <div>{childText}</div>
        </TabPanel>
      );
  
      expect(wrapper.find(Box).exists()).toBe(true);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      const settingButton = findByTestID(exampleBlockA, 'go-back-btn');
      settingButton.at(0).simulate('click');
      instance.backToMyAccount();
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("Notary User disconnects Stripe account", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Settings;
  
    given("I am a Notary User with a connected Stripe account", () => {
      jest.useFakeTimers();
      exampleBlockA = shallow(<Settings {...screenProps} />);
      instance = exampleBlockA.instance() as Settings;
      instance.setState({ 
        isStripeConnected: "true",
        stripeAccountDetails: {
          currency: "usd",
          account_name: "Test Account",
          account_email: "test@example.com"
        }
      });
    });
  
    when("I navigate to the settings", () => {
      instance.setToken("token");
      mockApiCall(instance, "getUserProfileDetailsApiCallId", notaryUserProfileResponse);
    });
  
    when("I click on the Disconnect button", () => {
      const disconnectButton = findByTestID(exampleBlockA, 'disconnect-btn');
      disconnectButton.simulate('click');
    });

    then("the disconnect button toggles the popup", () => {
      instance.handleDisconnectBtn();
      expect(instance.state.disconnectStripePopup).toBeFalsy();
      instance.handleDisconnectBtn();
      expect(instance.state.disconnectStripePopup).toBeTruthy();
    });
  
    then("I should see a confirmation popup", () => {
      expect(instance.state.disconnectStripePopup).toBeTruthy();
      expect(exampleBlockA.find(CustomConfirmationPopupDisconnectStripe).exists()).toBeTruthy();
    });
  
    when("I confirm the disconnection", () => {
      mockApiCall(instance, "disconnectStripeApiCallId", { message: "Successfully disconnected" });
      instance.handleDisconnectStripe();
      instance.handleResponseDisconnectStripe({ message: "Successfully disconnected" });
    });
  
    then("I should see a success popup", () => {
      expect(instance.state.successPopup).toBeTruthy();
      expect(instance.state.disconnectStripeText).toEqual("Successfully disconnected");
    });
  
    then("the Stripe account should be disconnected", () => {
      jest.advanceTimersByTime(2000); 
      expect(instance.state.isStripeConnected).toEqual('false');
      expect(instance.state.stripeAccountDetails).toBeNull();
    });

    afterAll(() => {
      jest.useRealTimers(); 
    })
  });
  
  test("Notary User fails to disconnect Stripe account", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Settings;
  
    given("I am a Notary User with a connected Stripe account", () => {
      jest.useFakeTimers();
      exampleBlockA = shallow(<Settings {...screenProps} />);
      instance = exampleBlockA.instance() as Settings;
      instance.setState({ 
        isStripeConnected: "true",
        stripeAccountDetails: {
          currency: "usd",
          account_name: "Test Account",
          account_email: "test@example.com"
        }
      });
    });
  
    when("I navigate to the settings", () => {
      instance.setToken("token");
      mockApiCall(instance, "getUserProfileDetailsApiCallId", notaryUserProfileResponse);
    });
  
    when("I click on the Disconnect button", () => {
      const disconnectButton = findByTestID(exampleBlockA, 'disconnect-btn');
      disconnectButton.simulate('click');
    });
  
    then("I should see a confirmation popup", () => {
      expect(instance.state.disconnectStripePopup).toBeTruthy();
      expect(exampleBlockA.find(CustomConfirmationPopupDisconnectStripe).exists()).toBeTruthy();
    });
  
    when("I confirm the disconnection", () => {
      instance.handleDisconnectStripe();
    });
  
    when("the disconnection fails", () => {
      mockApiCall(instance, "disconnectStripeApiCallId", { error: "Failed to disconnect" }, true);
      instance.handleResponseDisconnectStripe({ error: "Failed to disconnect" });
    });
  
    then("I should see a failure popup", () => {
      jest.advanceTimersByTime(2000); 
      expect(instance.state.failurePopup).toBeTruthy();
      expect(instance.state.disconnectStripeText).toEqual("Failed to disconnect");
    });

    afterAll(() => {
      jest.useRealTimers(); 
    })

  });

  
  test("Notary User redirected to Setting page", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Settings;
  
    given("I am redirected to the Setting", () => {      
      exampleBlockA = shallow(<Settings {...screenProps} />);
      instance = exampleBlockA.instance() as Settings;
    });
  
    when("I Redirect to the Setting", () => {
      mockNavigationPayLoadMessage(instance, navigationData);
    });

  });

});
