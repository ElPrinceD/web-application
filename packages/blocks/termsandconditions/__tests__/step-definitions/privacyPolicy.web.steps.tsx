import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper, mount } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { expect, jest, beforeEach } from "@jest/globals";
import React from "react";
import PrivacyPolicy, { ImgStyling } from "../../src/PrivacyPolicy.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "PrivacyPolicy",
};

const feature = loadFeature(
  "./__tests__/features/privacyPolicy-scenario.web.feature"
);

const mockApICall = (instance: any, apiCallID: string, apiData: object, responseType: number) => {
  const msgSuccessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSuccessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSuccessRestAPI.messageId);
  msgSuccessRestAPI.addData(getName(responseType), apiData);
  instance[apiCallID] = msgSuccessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSuccessRestAPI)
}

const privacyPolicyResponse = {
  
    "data": {
        "id": "4",
        "type": "privacy",
        "attributes": {
            "description": "<p>This privacy notice for Renotary (\\\"we,\\\" \\\"us,\\\" or \\\"our\\\"), describes how and why we might collect, store, use, and/or share (\\\"process\\\") your information when you use our services (\\\"Services\\\")</p><h2>1. WHAT INFORMATION DO WE COLLECT?</h2><p>Personal information you disclose to us. We only collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p><p>We do not process sensitive information.</p><p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal informatin.</p><h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2><p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p><h2>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2><p>In Short: We may share information in specific situations described in this section and/or with the following third parties.</p><p>We may need to share your personal information in the following situations:</p><ul><li>&nbsp;&nbsp;<strong>&nbsp;Business Transfers. </strong>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li><li>&nbsp;&nbsp;<strong>&nbsp;Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that</li></ul>",
            "created_at": "2024-04-11T16:49:22.955Z",
            "updated_at": "2024-04-11T17:33:12.939Z"
        }
    }
}


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to privacypolicy", ({ given, when, then }) => {
    let TSBlocWapper: ShallowWrapper;
    let instance: PrivacyPolicy;

    given("I am a User loading privacypolicy", () => {
      TSBlocWapper = shallow(<PrivacyPolicy {...screenProps} />);
    });

    when("I navigate to the privacypolicy", () => {
      instance = TSBlocWapper.instance() as PrivacyPolicy;
      mockApICall(instance, "privacyPolicyGetId", privacyPolicyResponse,
      MessageEnum.RestAPIResponceSuccessMessage);
    });

    then("privacypolicy will load with out errors", () => {
      expect(TSBlocWapper).toBeTruthy();

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(TSBlocWapper).toBeTruthy();
    });
  });
});
