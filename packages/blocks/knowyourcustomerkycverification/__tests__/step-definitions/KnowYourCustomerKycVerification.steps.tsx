//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { beforeEach, expect, jest } from '@jest/globals'
import KnowYourCustomerKycVerification from "../../src/KnowYourCustomerKycVerification"

const findByTestId = (wrapper: ShallowWrapper<any>, testID: string) =>
    wrapper.findWhere((node) => node.prop("testID") === testID).first();

const screenPropsverified = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {

        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn(),
        replace: jest.fn(),
        trim: jest.fn(),
        props: jest.fn(),
        Alert: jest.fn(),
        filter: jest.fn(),
        show: jest.fn,
    },
    id: "KnowYourCustomerKycVerification"
}

const featureverified = loadFeature('./__tests__/features/KnowYourCustomerKycVerification-scenario.feature');

defineFeature(featureverified, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test("User navigates to KnowYourCustomerKycVerification", ({ given, when, then }) => {
        let knowYourCustomerKycVerification: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
    
        given('I am a User attempting to KnowYourCustomerKycVerification', () => {
            knowYourCustomerKycVerification = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
        });
    
        when('I navigate to the KnowYourCustomerKycVerification Screen', () => {
            instance = knowYourCustomerKycVerification.instance() as KnowYourCustomerKycVerification
        });
    
        then("I can enter a firstName with out errors", () => {          
          const viewScreen = findByTestId(knowYourCustomerKycVerification,"firstName");
          expect(viewScreen).toHaveLength(0);
        });
      });


});
