import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper, mount } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { expect,jest, beforeEach } from "@jest/globals";
import React from "react";
import Termsandconditions, { ImgStyling } from "../../src/Termsandconditions.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "TermAndConditions",
};

const feature = loadFeature(
  "./__tests__/features/termsandconditions-scenario.web.feature"
);
const mockApICall = (instance: any, apiCallID: string, apiData: object, responseType: number) => {
  const msgSuccessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSuccessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSuccessRestAPI.messageId);
  msgSuccessRestAPI.addData(getName(responseType), apiData);
  instance[apiCallID] = msgSuccessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSuccessRestAPI)
}

const TnCAPIResponse = {

    "data": {
        "id": "5",
        "type": "terms_and_conditions",
        "attributes": {
            "title": "<p>AGREEMENT TO OUR LEGAL TERMS</p>",
            "description": "<p><strong>1. OUR SERVICES</strong></p><p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p><p><strong>2. INTELLECTUAL PROPERTY RIGHTS</strong></p><p>Our intellectual property</p><p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks').</p><p>Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.</p><p>The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use or internal business purpose only.</p><p><strong>3. USER REPRESENTATIONS</strong></p><p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3)</p>",
            "created_at": "2024-04-11T18:14:09.633Z",
            "updated_at": "2024-04-12T05:01:25.903Z"
        }
}
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to termsandconditions", ({ given, when, then }) => {
    let TSBlocWapper: ShallowWrapper;
    let instance: Termsandconditions;

    given("I am a User loading termsandconditions", () => {
      TSBlocWapper = shallow(<Termsandconditions {...screenProps} />);
    });

    when("I navigate to the termsandconditions", () => {
      instance = TSBlocWapper.instance() as Termsandconditions;
      instance.getTermsAndConditions();
      instance.handleTermsAndCondition(TnCAPIResponse?.data?.attributes   )
      mockApICall(instance, "termsAndConditionsGetId", TnCAPIResponse,
                MessageEnum.RestAPIResponceSuccessMessage);
                instance.setState({termsAndConditionsData :TnCAPIResponse?.data?.attributes?.description})
    });

    then("termsandconditions will load with out errors", () => {
      expect(TSBlocWapper).toBeTruthy();
      expect(instance.state.termsAndConditionsData).toBe(TnCAPIResponse?.data?.attributes?.description);
      expect(instance.state.titleTerm).toBe(TnCAPIResponse?.data?.attributes?.title);
      expect(instance.state.updated_time).toBe(TnCAPIResponse?.data?.attributes?.updated_at);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(TSBlocWapper).toBeTruthy();
    });
  });
});
