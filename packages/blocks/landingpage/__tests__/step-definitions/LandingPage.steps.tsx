import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import LandingPage from "../../src/LandingPage";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "LandingPage",
};

const feature = loadFeature(
  "./__tests__/features/LandingPage-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

    test('User navigates to LandingPage', ({ given, when, then }) => {
        let landingPageBlock:ShallowWrapper;
        let instance:LandingPage; 

        given('I am a User loading LandingPage', () => {
            landingPageBlock = shallow(<LandingPage {...screenProps}/>)
        });

        when('I navigate to the LandingPage', () => {
             instance = landingPageBlock.instance() as LandingPage
        });

        then('LandingPage will load with out errors', () => {
            // instance.openFaqPage()
            expect(landingPageBlock).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = landingPageBlock.findWhere((node) => node.prop('testID') === 'goToHomeButton');
            buttonComponent.simulate('press')
            const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId),
            apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data: {
           
            }})
            instance.getlandingdataRequestDetailsCallId = apiMsg.messageId
            runEngine.sendMessage("Unit Test", apiMsg);
      
            const apiErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            apiErrorResponceMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:"Error"})
            runEngine.sendMessage("Unit Test", apiErrorResponceMsg);
      
            const apiFailedErrorResponceMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            runEngine.sendMessage("Unit Test", apiFailedErrorResponceMsg);

            jest.useFakeTimers();
            jest.runAllTimers();
      
            const apiMsgNew: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
            apiMsgNew.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsgNew.messageId),
            apiMsgNew.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {errors:"Error"})
            instance.getlandingdataRequestDetailsCallId = apiMsgNew.messageId
            runEngine.sendMessage("Unit Test", apiMsgNew);
        });

        then('I can leave the screen with out errors', () => {
            instance.goToHome();
            instance.componentWillUnmount()
            expect(landingPageBlock).toBeTruthy();
        });
    });

   
});
