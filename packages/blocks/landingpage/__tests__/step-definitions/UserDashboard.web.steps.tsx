import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper, mount } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import { expect,jest, beforeEach } from "@jest/globals";
import React from "react";
import UserDashboard from "../../src/UserDashboard.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "UserDashboard",
};

const feature = loadFeature(
  "./__tests__/features/UserDashboard-scenario.web.feature"
);

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    
  });

  test("User navigates to UserDashboard", ({ given, when, then }) => {
    let DbBlocWapper: ShallowWrapper;
    let instance: UserDashboard;

    given("I am a User loading UserDashboard", () => {
        DbBlocWapper = shallow(<UserDashboard {...screenProps} />);
    });

    when("I navigate to the UserDashboard", () => {
      instance = DbBlocWapper.instance() as UserDashboard;
   
    });

    then("userDashboard will load with out errors", () => {
      expect(DbBlocWapper).toBeTruthy();
      
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(DbBlocWapper).toBeTruthy();
    });
  });
});
