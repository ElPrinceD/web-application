import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OutlookCalendar from "../../src/OutlookCalendar"
import { GraphManagers } from "../../src/graph/GraphManagers";
const navigation = require("react-navigation")
// require("isomorphic-fetch")
jest.useFakeTimers()
const screenProps = {
    navigation: {
        navigate: jest.fn()
    },
    addListener: jest.fn((event, callback) => {
        if (event === 'didFocus') {
            callback();
        }
    }),
    id: "OutlookCalendar",
    msalContext: {}
}

const feature = loadFeature('./__tests__/features/OutlookCalendar-scenario.feature');

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'web', // or 'ios'
    select: () => null
}));


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'IOS' } }));
        jest.spyOn(helpers, 'getOS')
            .mockImplementation(() => 'IOS')
    });

    test('User interacts with OutlookCalendar', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: OutlookCalendar;

        given('I am a User on the OutlookCalendar screen', () => {
            exampleBlockA = shallow(<OutlookCalendar {...screenProps} />);
        });

        when('I navigate to the OutlookCalendar screen', async () => {
            instance = exampleBlockA.instance() as OutlookCalendar
        });

        then('the OutlookCalendar screen loads without errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });

});