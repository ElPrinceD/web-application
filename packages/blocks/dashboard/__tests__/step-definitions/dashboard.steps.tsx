import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Dashboard from "../../src/Dashboard";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";

const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "Dashboard"
};
const feature = loadFeature("./__tests__/features/dashboard-scenario.feature");

const dashboadrData = { "id": "4", "type": "candidate", "attributes": { "total_candidates": 260, "sub_attributres": [{ "type": "Interview with client", "quantity": "100" }, { "type": "Submitted for feedback", "quantity": "70" }, { "type": "Candidates expecting offer", "quantity": "50" }, { "type": "Candidates accepted", "quantity": "40" }] } }

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to dashboard", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given("I am a User loading dashboard", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      expect(dashboardWrapper).toBeTruthy();

    });

    when("I navigate to the dashboard", () => {
      instance = dashboardWrapper.instance() as Dashboard;
      expect(dashboardWrapper).toBeTruthy();

    });

    then("dashboard will load with out errors", () => {
      expect(dashboardWrapper).toBeTruthy();
    });


    then("Dashboard will display data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dashboadrData
      );
      instance.apiDashboardItemCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      expect(dashboardWrapper).toBeTruthy();

    });

    then("Render flatlist without errors", () => {
      const flatlist = dashboardWrapper.findWhere(node => node.prop("testID") === "dashboardFlatlist")
      flatlist.props().renderItem({ item: { "type": "Interview with client", "quantity": "10" } })
      flatlist.props().renderItem({ item: { "type": "Submitted for feedback", "quantity": "10" } })
      flatlist.props().renderItem({ item: { "type": "Candidates expecting offer", "quantity": "10" } })
      flatlist.props().renderItem({ item: { "type": "Candidates accepted", "quantity": "10" } })
      flatlist.props().keyExtractor({ "type": "Candidates accepted", "quantity": "40" }, 0)
      expect(dashboardWrapper).toBeTruthy();
    });

    then("Dashboard will display notifcation if API failure", () => {
      const magLogInSucessRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: "Error"
        }
      );
      magLogInSucessRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        magLogInSucessRestAPI.messageId
      );
      instance.apiDashboardItemCallId = magLogInSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
      expect(dashboardWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(dashboardWrapper).toBeTruthy();

    });

  });
});
