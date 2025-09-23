// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DocumentList from "../../src/DocumentList"
// const navigation = require("react-navigation")

const navigation = {
    // require("react-navigation")
    navigate: () => jest.fn(),
    goBack: () => jest.fn(),
    state: { params: { screen: 'terms' } }
};
const screenProps = {
    navigation: navigation,
    id: "DocumentList",
    roleID: 4,
    email: "something"
}

const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
    wrapper.findWhere((node) => node.prop("testID") === testID);

const feature = loadFeature('./__tests__/features/DocumentList-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to DocumentList', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocumentList;

        given('I am a User loading DocumentList', () => {
            exampleBlockA = shallow(<DocumentList {...screenProps} />);
        });

        when('I navigate to the DocumentList', () => {
            instance = exampleBlockA.instance() as DocumentList
        });

        then('I can click open button with out errors', () => {
            expect(findByTestID(exampleBlockA, "something")).toHaveLength(1);
        });
    });

});
// Customizable Area End
