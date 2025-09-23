//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { beforeEach, expect, jest } from '@jest/globals'
import KnowYourCustomerKycVerificationAccount from "../../src/KnowYourCustomerKycVerificationAccount"


const screenPropsverifiedweb = {
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

const findByTestId = (wrapper: ShallowWrapper<any>, testID: string) =>
    wrapper.findWhere((node) => node.prop("testID") === testID).first();

const featureverifiedweb = loadFeature('./__tests__/features/KnowYourCustomerKycVerifiedAccount2-scenario.feature');

defineFeature(featureverifiedweb, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

   

    test("User navigates to KnowYourCustomerKycVerifiedAccount2", ({ given, when, then }) => {
        let knowYourCustomerKycVerificationAccount: ShallowWrapper;
        let instance: KnowYourCustomerKycVerificationAccount;
    
        given('I am a User attempting to KnowYourCustomerKycVerifiedAccount2', () => {
            knowYourCustomerKycVerificationAccount = shallow(<KnowYourCustomerKycVerificationAccount {...screenPropsverifiedweb} />);
        });
    
        when('I navigate to the KnowYourCustomerKycVerifiedAccount2 Screen', () => {
            instance = knowYourCustomerKycVerificationAccount.instance() as KnowYourCustomerKycVerificationAccount
        });
    
        then("I can success with out errors", () => {          
          const viewScreen = findByTestId(knowYourCustomerKycVerificationAccount,"backbtn");
          expect(viewScreen).toHaveLength(1);
        });
      });


});
