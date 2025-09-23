//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { beforeEach, expect, jest } from '@jest/globals'
import KnowYourCustomerKycVerification from "../../src/KnowYourCustomerKycVerification.web"


const screenPropsweb = {
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
    id: "KnowYourCustomerKycVerification",
    isNotaryUser:true,
    isEndUser:false,
    onComplete: jest.fn(),
}

const screenPropsForEndUserweb = {
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
    id: "KnowYourCustomerKycVerification",
    isNotaryUser:false,
    isEndUser:true,
    onComplete: jest.fn(),
}
const tokenweb = ""
const reportIdweb = ""
const idweb = ""

const findByTestId = (wrapper: ShallowWrapper<any>, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-test-id") === testID);
    const countryCodeList = {"countries":
                        [{"country_code":"1","name":"American Samoa","flag":""},
                        {"country_code":"2","name":"Jamaica","flag":""}]
    };

    const countryList = {"data":[{"id":"1","type":"country","attributes":{"name":"England"}},
                        {"id":"2","type":"country","attributes":{"name":"Wales"}}]};

    const createKyc = {"message": "KYC request cannot be processed because the notary status is not in progress."}; 
    
    const createKycSucess = {
        "id": "6",
        "type": "onfido",
        "attributes": {
            "id": 6,
            "document_type": [],
            "onfido_applicant_id": "371dffbf-33e6-4e56-90d1-b60aab9f367e",
            "onfido_check_id": null,
            "onfido_report_id": [],
            "kyc_status": "pending",
            "reports_status": [],
            "email": null,
            "notary_request_id": 1018,
            "workflow_id": "b42cf165-031f-4792-a57e-eea4fa10c4e2",
            "requester_id": 1870,
            "requested_kyc_documents": [
                {
                    "id": 1,
                    "onfido_id": 6,
                    "status": "pending",
                    "document_details": {
                        "data": {
                            "id": "4",
                            "type": "kyc_document",
                            "attributes": {
                                "id": 4,
                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                "region_name": "Europe",
                                "document_type": "Passport",
                                "number_of_sides": 1
                            }
                        }
                    }
                },
                {
                    "id": 2,
                    "onfido_id": 6,
                    "status": "pending",
                    "document_details": {
                        "data": {
                            "id": "5",
                            "type": "kyc_document",
                            "attributes": {
                                "id": 5,
                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                "region_name": "Europe",
                                "document_type": "Driving Licence",
                                "number_of_sides": 2
                            }
                        }
                    }
                },
                {
                    "id": 3,
                    "onfido_id": 6,
                    "status": "pending",
                    "document_details": {
                        "data": {
                            "id": "6",
                            "type": "kyc_document",
                            "attributes": {
                                "id": 6,
                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                "region_name": "Europe",
                                "document_type": "Residence Permit",
                                "number_of_sides": 2
                            }
                        }
                    }
                }
            ]
        }
    }; 


    const notaryRequestStatus = { "data" : {
         "id": "6",
        "type": "onfido",
        "attributes": {
            "id": 6,
            "document_type": [],
            "onfido_applicant_id": "371dffbf-33e6-4e56-90d1-b60aab9f367e",
            "onfido_check_id": null,
            "onfido_report_id": [],
            "kyc_status": "pending",
            "reports_status": [],
            "email": null,
            "notary_request_id": 1018,
            "workflow_id": "b42cf165-031f-4792-a57e-eea4fa10c4e2",
            "requester_id": 1870,
            "requested_kyc_documents": [
                {
                    "id": 1,
                    "onfido_id": 6,
                    "status": "pending",
                    "document_details": {
                        "data": {
                            "id": "4",
                            "type": "kyc_document",
                            "attributes": {
                                "id": 4,
                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                "region_name": "Europe",
                                "document_type": "Passport",
                                "number_of_sides": 1
                            }
                        }
                    }
                },
                {
                    "id": 2,
                    "onfido_id": 6,
                    "status": "pending",
                    "document_details": {
                        "data": {
                            "id": "5",
                            "type": "kyc_document",
                            "attributes": {
                                "id": 5,
                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                "region_name": "Europe",
                                "document_type": "Driving Licence",
                                "number_of_sides": 2
                            }
                        }
                    }
                },
                {
                    "id": 3,
                    "onfido_id": 6,
                    "status": "pending",
                    "document_details": {
                        "data": {
                            "id": "6",
                            "type": "kyc_document",
                            "attributes": {
                                "id": 6,
                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                "region_name": "Europe",
                                "document_type": "Residence Permit",
                                "number_of_sides": 2
                            }
                        }
                    }
                }
            ]
        }
    }};  

    const notaryRequestStatusWithVerifioed = { "data" : {
        "id": "6",
       "type": "onfido",
       "attributes": {
           "id": 6,
           "document_type": [],
           "onfido_applicant_id": "371dffbf-33e6-4e56-90d1-b60aab9f367e",
           "onfido_check_id": null,
           "onfido_report_id": [],
           "kyc_status": "pending",
           "reports_status": [],
           "email": null,
           "notary_request_id": 1018,
           "workflow_id": "b42cf165-031f-4792-a57e-eea4fa10c4e2",
           "requester_id": 1870,
           "requested_kyc_documents": [
               {
                   "id": 1,
                   "onfido_id": 6,
                   "status": "verified",
                   "document_details": {
                       "data": {
                           "id": "4",
                           "type": "kyc_document",
                           "attributes": {
                               "id": 4,
                               "country_name": "United Kingdom of Great Britain and Northern Ireland",
                               "region_name": "Europe",
                               "document_type": "Passport",
                               "number_of_sides": 1
                           }
                       }
                   }
               },
           ]
       }
   }};

    const documentListDocData = [
        {
            "id": 3,
            "country_name": "United Kingdom of Great Britain ",
            "region_name": "Europe",
            "document_type": "Visa",
            "number_of_sides": 3,
            "created_at": "2023-09-19T14:39:44.837Z",
            "updated_at": "2023-09-19T14:39:44.837Z",
            "checked": false,
        },
        {
        "id": 4,
        "country_name": "United Kingdom of Great Britain and Northern Ireland",
        "region_name": "Europe",
        "document_type": "Passport",
        "number_of_sides": 1,
        "created_at": "2024-09-19T14:39:44.837Z",
        "updated_at": "2024-09-19T14:39:44.837Z",
        "checked": false,
    }];
    const notaryRequestStatusWithError = {
        "header": "KYC Request",
        "title": "No KYC verification request",
        "message": "You don’t have any kyc verification request sent by your notary"
    }
    const createApplication = {"applicant": {
        "id": "b64cc815-4a40-461f-9e73-a595f285b3bb",
        "created_at": "2024-10-03T15:25:02Z",
        "sandbox": true,
        "first_name": "Rajiv1",
        "last_name": "Poolrrstack",
        "email": "raj3333@yopmail1.com",
        "dob": "1972-08-26",
        "delete_at": null,
        "href": "/v3.6/applicants/b64cc815-4a40-461f-9e73-a595f285b3bb",
        "address": {
            "flat_number": "",
            "building_number": "",
            "building_name": "",
            "street": "",
            "sub_street": "k",
            "town": "Sample Town",
            "state": "Sample State",
            "postcode": "12345",
            "country": "IND",
            "line1": "Main Road",
            "line2": "Block 2",
            "line3": "Apt 12"
        },
        "id_numbers": [
            {
                "value": "12365",
                "state_code": "CA",
                "type": "passport"
            }
        ],
        "phone_number": "441234567700",
        "location": {
            "ip_address": null,
            "country_of_residence": "GBR"
        }
    },
    "workflow": {
        "applicant_id": "b64cc815-4a40-461f-9e73-a595f285b3bb",
        "created_at": "2024-10-03T15:25:02Z",
        "customer_user_id": "b64cc815-4a40-461f-9e73-a595f285b3bb",
        "dashboard_url": "https://dashboard.onfido.com/results/cd92c304-1c16-4bb5-8395-d5b8fe27088e",
        "error": null,
        "id": "cd92c304-1c16-4bb5-8395-d5b8fe27088e",
        "link": {
            "completed_redirect_url": null,
            "expired_redirect_url": null,
            "expires_at": null,
            "language": "en",
            "url": "https://eu.onfido.app/l/cd92c304-1c16-4bb5-8395-d5b8fe27088e"
        },
        "output": null,
        "reasons": [],
        "sdk_token": "eyJhbGciOiAiRVM1MTIifQ.eyJpc3MiOiAic3R1ZGlvIiwgImF1ZCI6ICIyMGUyNDIxYy03ODc4LTQ4ZDYtYmQxMC1iZDIzOTViYmY2MTciLCAic3ViIjogImNkOTJjMzA0LTFjMTYtNGJiNS04Mzk1LWQ1YjhmZTI3MDg4ZSIsICJpYXQiOiAxNzI3OTY5MTAyLCAianRpIjogInN0dWRpby1jZDkyYzMwNC0xYzE2LTRiYjUtODM5NS1kNWI4ZmUyNzA4OGUiLCAiZXhwIjogMTczMDk5MzEwMiwgInBheWxvYWQiOiB7ImFwcCI6ICJiNjRjYzgxNS00YTQwLTQ2MWYtOWU3My1hNTk1ZjI4NWIzYmIiLCAiYXBwbGljYXRpb25faWQiOiAiKiIsICJjbGllbnRfdXVpZCI6ICIyMGUyNDIxYy03ODc4LTQ4ZDYtYmQxMC1iZDIzOTViYmY2MTciLCAiaXNfc2FuZGJveCI6IHRydWUsICJpc19zZWxmX3NlcnZpY2VfdHJpYWwiOiB0cnVlLCAiaXNfdHJpYWwiOiBmYWxzZSwgInNhcmRpbmVfc2Vzc2lvbiI6ICI4MDEwYjMyMC04NTQ5LTRlOTgtYWZmYi03NmMzMThjZWNlYWUiLCAiY3VzdG9tZXJfdXNlcl9oYXNoIjogIkxicEpsd2Q3MWI4ZDhobzNPS1Z1Zk5MeG1Gd2VPcEJCQUhyVFAxTVFLSVU9In0sICJ1cmxzIjogeyJzeW5jX3VybCI6ICJodHRwczovL3N5bmMub25maWRvLmNvbSIsICJob3N0ZWRfc2RrX3VybCI6ICJodHRwczovL2lkLm9uZmlkby5jb20iLCAiYXV0aF91cmwiOiAiaHR0cHM6Ly9hcGkuZXUub25maWRvLmNvbSIsICJvbmZpZG9fYXBpX3VybCI6ICJodHRwczovL2FwaS5ldS5vbmZpZG8uY29tIiwgInRlbGVwaG9ueV91cmwiOiAiaHR0cHM6Ly9hcGkuZXUub25maWRvLmNvbSJ9LCAiZW50ZXJwcmlzZV9mZWF0dXJlcyI6IHsidmFsaWRDcm9zc0RldmljZVVybHMiOiBbIiJdfX0.MIGIAkIAncFKguSoUhR9EfY2KGLedTbsoZmN660o6WDGbgRcoEMuyYguxQw_3FlGjmUHOimSTA9ulJvib7SSZtDRsG8oB1cCQgGRdWImtz-01oUG9VINnxpZZRiKaDK4Tb_haPhWhw4QxsPXyOIwhOgfh6F3GR_JEObccvMOrLPtQDd9BuhdILH_ZQ",
        "status": "awaiting_input",
        "tags": [
            "kyc-process",
            "user-verification"
        ],
        "updated_at": "2024-10-03T15:25:03Z",
        "workflow_id": "b42cf165-031f-4792-a57e-eea4fa10c4e2",
        "workflow_version_id": 2
    }}
    const createApplicationError = {
        "message": "There was a validation error on this request"
    }



const mockAPIRequest = jest
  .fn()
  .mockImplementation((instance: any, apiCallID: string, mockData: Object) => {
    const messageRestApiCall = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    messageRestApiCall.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      messageRestApiCall.messageId
    );
    messageRestApiCall.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      mockData
    );
    instance[apiCallID] = messageRestApiCall.messageId;
    const { receive: mockResponse } = instance;
    mockResponse("unit test", messageRestApiCall);
  });


const featureweb = loadFeature('./__tests__/features/KnowYourCustomerKycVerification-scenario.web.feature');
global.FormData = require('react-native/Libraries/Network/FormData');
defineFeature(featureweb, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User move to KnowYourCustomerKycVerificationweb screen', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;

        given('User can do KYC from this screen', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsweb} />);
        });

        when('I navigate to the KnowYourCustomerKycVerificationweb Screen', async () => {
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
        });

        then('I can enter a firstName in web with out errors', () => {
            let textInputComponent1 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'firstNameweb');
            textInputComponent1.simulate('change', { target: { firstName: 'full_nameweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter a lastName in web with out errors', () => {
            let textInputComponent2 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'lastNameweb');
            textInputComponent2.simulate('change', { target: { lastName: 'lastNameweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a middlename in web with out errors', () => {
            let textInputComponent3 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'Middlenameweb');
            textInputComponent3.simulate('change', { target: { middlename: 'Middlenameweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter a email in web with out errors', () => {
            let textInputComponent4 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'emailweb');
            textInputComponent4.simulate('change', { target: { email: 'emailweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a phonenumber in web with out errors', () => {
            let textInputComponent5 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'phoneweb');
            textInputComponent5.simulate('change', { target: { phone: 'phoneweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a nationality in web with out errors', () => {
            let textInputComponent6 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'nationalityweb');
            textInputComponent6.simulate('change', { target: { nationality: 'nationalityweb', value: 'mailto:jonroweby@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a DOB in web with out errors', () => {
            let textInputComponent7 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'Date of Birthweb');
            textInputComponent7.simulate('change', { target: { dob: 'dobweb', value: 'mailto:jonroyeeb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can select Submit button in web without errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can load CreateAccount in web without errors', () => {
            instance.onfidouserdeta();
            const viewAllCertificateApiIDs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                viewAllCertificateApiIDs.messageId
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(idweb))
            );
            instance.getCreateaccountCallID = viewAllCertificateApiIDs.messageId;
            runEngine.sendMessage("Unit Test", viewAllCertificateApiIDs);
            expect(exampleBlockA).toBeTruthy();
        })
        then('I can navigate Onfido page in web without errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can load onfido in web without errors', () => {
            instance.onfidouserdeta();
            const viewAllCertificateApiIDs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                viewAllCertificateApiIDs.messageId
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(tokenweb))
            );
            instance.getVerifyIndentitycallID = viewAllCertificateApiIDs.messageId;
            runEngine.sendMessage("Unit Test", viewAllCertificateApiIDs);
            expect(exampleBlockA).toBeTruthy();
        })
        then('I can load OnreportApi in web without errors', () => {
            instance.onfidouserdeta();
            const viewAllCertificateApiIDs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                viewAllCertificateApiIDs.messageId
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(reportIdweb))
            );
            instance.getreportCallID = viewAllCertificateApiIDs.messageId;
            runEngine.sendMessage("Unit Test", viewAllCertificateApiIDs);
            expect(exampleBlockA).toBeTruthy();
        })
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


    test('User can not create Kyc notary service', ({ given, when, then }) => {
        let kycNotary: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;

        given('User create KnowYourCustomerKycVerificationweb for any document', () => {
            kycNotary = shallow(<KnowYourCustomerKycVerification {...screenPropsweb} />);
        });

        when('User navigate to the KnowYourCustomerKycVerificationweb Screen', async () => {
            instance = kycNotary.instance() as KnowYourCustomerKycVerification;
            mockAPIRequest(instance, "kycDocumentListAPICall", documentListDocData);
            mockAPIRequest(instance, "getCountryCodeApiCallID", countryCodeList);
            mockAPIRequest(instance, "getCountryAPICallID", countryList);
        });

        then('User Can see the list of the document', () => {
            expect(kycNotary.find('[data-test-id="mainNotarySection"]')).toHaveLength(1);
        });

        when('Notary User document kyc status is in pending status', async () => {
            mockAPIRequest(instance, "getKycRequestStatusAPI", notaryRequestStatusWithError);
        });

        then('Notary User document kyc status pending ui will display', () => {
           const buttonNode = kycNotary.findWhere((node) => node.prop("data-test-id") === "KYCVerificationTabButton");
            expect(buttonNode).toHaveLength(1); 
         });


    });

    test('User can create Kyc notary service', ({ given, when, then }) => {
        let kycNotary: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;

        given('User can create kyc for any document', () => {
            kycNotary = shallow(<KnowYourCustomerKycVerification {...screenPropsweb} />);
        });

        when('User navigate to the kyc Screen', async () => {
            instance = kycNotary.instance() as KnowYourCustomerKycVerification;
            mockAPIRequest(instance, "kycDocumentListAPICall", documentListDocData);
            mockAPIRequest(instance, "getCountryCodeApiCallID", countryCodeList);
            mockAPIRequest(instance, "getCountryAPICallID", countryList);
        });

        then('User can review the list of the documents', () => {
            expect(kycNotary.find('[data-test-id="mainNotarySection"]')).toHaveLength(1);
        });

        when('User can select single document for kyc', async () => {
            const singleDocument = shallow(kycNotary
                .findWhere((node) => node.prop("data-test-id") == "singleDocCheck").first().props().control)
                singleDocument.dive().simulate("change",{ target: { checked: true }})
        });

        then('User can see single document is checked', () => {
            const singleCheckBox = kycNotary.find('Checkbox[data-test-id="singleDocCheck"]');
            singleCheckBox.forEach((checkbox) => {
                expect(checkbox.prop('checked')).toBe(true);
             });
             
        });

        when('User unselects a single document', async () => {
            const singleDocument = shallow(
                kycNotary
                    .findWhere((node) => node.prop("data-test-id") === "singleDocCheck")
                    .first()
                    .props().control
            );
            singleDocument.dive().simulate("change", { target: { checked: false } });
        });
        
        then('User can see the document is unchecked', () => {
            const singleCheckBox = kycNotary.find('Checkbox[data-test-id="singleDocCheck"]');
            singleCheckBox.forEach((checkbox) => {
                expect(checkbox.prop('checked')).toBe(false);
            });
        });
        
        when('User can create KYC for selected document with complete result', async () => {
            const singleDocumentEvent = shallow(kycNotary
                .findWhere((node) => node.prop("data-test-id") == "singleDocCheck").first().props().control)
            singleDocumentEvent.dive().simulate("change", { target: { checked: true } })
            kycNotary.find('[data-test-id="KYCVerificationTabButton"]').simulate('click');
            mockAPIRequest(instance, "kycCreateApiCall", createKycSucess);
        });
        
        then('User can review the responce message with complete result', () => {
            expect(kycNotary.find('[data-test-id="kycCreateError"]')).toHaveLength(0); 
        });

        when('User can create KYC for selected document', async () => {
            const singleDocumentEvent = shallow(kycNotary
                .findWhere((node) => node.prop("data-test-id") == "singleDocCheck").first().props().control)
            singleDocumentEvent.dive().simulate("change", { target: { checked: true } })
            kycNotary.find('[data-test-id="KYCVerificationTabButton"]').simulate('click');
            mockAPIRequest(instance, "kycCreateApiCall", createKyc);
          });
        
        then('User can review the responce message', () => {
            jest.runAllTimers();
            expect(kycNotary.find('[data-test-id="kycCreateError"]')).toHaveLength(1);           
            mockAPIRequest(instance, "getkycDocumentListAPI", documentListDocData);
            mockAPIRequest(instance, "getKycRequestStatusAPI", notaryRequestStatusWithVerifioed);
            jest.useRealTimers();
        });

    });


    test('End User get Kyc notary list', ({ given, when, then }) => {
        let endUserKycNotary: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;

        given('End User get KnowYourCustomerKycVerificationweb for any document', () => {
            endUserKycNotary = shallow(<KnowYourCustomerKycVerification {...screenPropsForEndUserweb} />);
        });

        when('End User navigate to the KnowYourCustomerKycVerificationweb Screen', async () => {
            instance = endUserKycNotary.instance() as KnowYourCustomerKycVerification;
            mockAPIRequest(instance, "getCountryCodeApiCallID",countryCodeList);
            mockAPIRequest(instance, "getCountryAPICallID",countryList);
            mockAPIRequest(instance, "getKycRequestStatusAPI",notaryRequestStatus);
        });


        then('User Can see the list of the document with status', () => {
            expect(endUserKycNotary.find('[data-test-id="kycDocStatus"]')).toHaveLength(1); 
        }); 


        when('End User document kyc status is in pending status', async () => {
            mockAPIRequest(instance, "getKycRequestStatusAPI", notaryRequestStatusWithError);
        });

        then('End User document kyc status pending ui will display', () => {
           expect(endUserKycNotary.find('[data-test-id="kycDocStatusData"]')).toHaveLength(3); 
           expect(endUserKycNotary.find('[data-test-id="kycDocStatus"]')).toHaveLength(1); 
         });

         when('End user can review the form and review the added data', async () => {
            expect(endUserKycNotary.find('[data-test-id="kycReqForm"]')).toHaveLength(1); 
         });

        then('End User can review kyc form', () => {
            expect(endUserKycNotary.find('[data-test-id="closeIconClick"]')).toHaveLength(1); 
        });

         when('User can submit the kyc form', async () => {
            endUserKycNotary.find('[data-test-id="kycHandleSubmit"]').simulate('click',{preventDefault:jest.fn()});
            expect(endUserKycNotary.state().errors).toEqual({
                userFname: 'First name is required',
                userMname: 'Middle name is required',
                userLname: 'Last name is required',
                address1: "Address is required",
                city: "City is required",
                country: "Country is required",
                email: "Email is required",
                idNumber: "ID number is required",
                mobNumber: "Mobile number is required",
                identityType: "Identity Type is required",
                postcode: "Postcode is required",
                selectedDate: "Date of Birth is required",
                stateCode: "State Code is required",
            });
        });

         then('User found the validation error', () => {
            endUserKycNotary.find('[data-test-id="kycHandleSubmit"]').simulate('click', { preventDefault: jest.fn() });
            expect(endUserKycNotary.state().errors).toEqual({
                userFname: 'First name is required',
                userMname: 'Middle name is required',
                userLname: 'Last name is required',
                address1: "Address is required",
                city: "City is required",
                country: "Country is required",
                email: "Email is required",
                idNumber: "ID number is required",
                mobNumber: "Mobile number is required",
                identityType: "Identity Type is required",
                postcode: "Postcode is required",
                selectedDate: "Date of Birth is required",
                stateCode: "State Code is required",
            });
          });

        when('User can submit the kyc form for invalid email', async () => {
            endUserKycNotary.find('[data-test-id="email"]').simulate('change', { target: {name: 'email', value: 'demo' } });
            endUserKycNotary.find('[data-test-id="kycHandleSubmit"]').simulate('click',{preventDefault:jest.fn()});
         });

         then('User found the validation error on invalid email', () => {
             expect(endUserKycNotary.state().errors).toEqual({
                userFname: 'First name is required',
                userMname: 'Middle name is required',
                userLname: 'Last name is required',
                address1: "Address is required",
                city: "City is required",
                country: "Country is required",
                email: "Invalid email address",
                mobNumber: "Mobile number is required",
                idNumber: "ID number is required",
                identityType: "Identity Type is required",
                postcode: "Postcode is required",
                selectedDate: "Date of Birth is required",
                stateCode: "State Code is required",
            });
        });


         when('User can submit the kyc form for long email', async () => {
            const long250Email = 'a'.repeat(250) + '@test.com';
            endUserKycNotary.find('[data-test-id="email"]').simulate('change', { target: {name: 'email', value: long250Email } });
            endUserKycNotary.find('[data-test-id="kycHandleSubmit"]').simulate('click',{preventDefault:jest.fn()});
         });

        
         then('User found the validation error on long email', () => {
            expect(endUserKycNotary.state().errors).toEqual({
                userFname: 'First name is required',
                userMname: 'Middle name is required',
                userLname: 'Last name is required',
                address1: "Address is required",
                city: "City is required",
                country: "Country is required",
                email: "Email address is too long.",
                idNumber: "ID number is required",
                mobNumber: "Mobile number is required",
                identityType: "Identity Type is required",
                postcode: "Postcode is required",
                selectedDate: "Date of Birth is required",
                stateCode: "State Code is required",
            });
        });
        

         when('User can add the text input details and save value', async () => {
            endUserKycNotary.find('[data-test-id="userFname"]').simulate('change', { target: {name: 'userFname', value: 'John' } });
            endUserKycNotary.find('[data-test-id="userMname"]').simulate('change', { target: {name: 'userMname', value: 'Doe' } });
            endUserKycNotary.find('[data-test-id="userLname"]').simulate('change', { target: {name: 'userLname', value: 'L' } });
            endUserKycNotary.find('[data-test-id="mobNumber"]').simulate('change', { target: {name: 'mobNumber', value: '123456' } });
            endUserKycNotary.find('[data-test-id="countrycode"]').simulate('change', { target: {name: 'countrycode', value: '44' } });
            endUserKycNotary.find('[data-test-id="country"]').simulate('change', { target: {name: 'country', value: 'India' } });
            endUserKycNotary.find('[data-test-id="identityType"]').simulate('change', { target: {name: 'identityType', value: 'social_insurance' } });
            endUserKycNotary.find('[data-test-id="DOB"]').simulate('change', { target: {name: 'DOB', value: '2024-10-03T00:00:00.000Z' } });
            endUserKycNotary.update();
         });

         then('User can review the saved value', () => {
            expect(endUserKycNotary.find('[data-test-id="userFname"]').props().value).toBe('John');
            expect(endUserKycNotary.find('[data-test-id="userMname"]').props().value).toBe('Doe');
            expect(endUserKycNotary.find('[data-test-id="userLname"]').props().value).toBe('L');
            expect(endUserKycNotary.find('[data-test-id="mobNumber"]').props().value).toBe('123456');
            expect(endUserKycNotary.find('[data-test-id="countrycode"]').props().value).toBe('44');
            expect(endUserKycNotary.find('[data-test-id="country"]').props().value).toBe('India');
            expect(endUserKycNotary.find('[data-test-id="identityType"]').props().value).toBe('social_insurance');
          });


         when('User can submit the form for onfido verification', async () => {
            endUserKycNotary.find('[data-test-id="userFname"]').simulate('change', { target: {name: 'userFname', value: '' } });
            endUserKycNotary.find('[data-test-id="userMname"]').simulate('change', { target: {name: 'userMname', value: '' } });
            endUserKycNotary.find('[data-test-id="userLname"]').simulate('change', { target: {name: 'userLname', value: '' } });
            endUserKycNotary.find('[data-test-id="email"]').simulate('change', { target: {name: 'email', value: '' } });
            endUserKycNotary.find('[data-test-id="kycHandleSubmit"]').simulate('click',{preventDefault:jest.fn()});
            mockAPIRequest(instance, "applicantCreateApiCall", createApplication);
         });

         then('user can stay on onfido verification box', () => {
            expect(endUserKycNotary.find('[data-test-id="kycReqForm"]')).toHaveLength(1); 
            expect(endUserKycNotary.state().userFname).toBe('');
            expect(endUserKycNotary.state().userLname).toBe('');
            expect(endUserKycNotary.state().userLname).toBe('');
            expect(endUserKycNotary.state().email).toBe('');
        });

        when('User can submit the form for onfido verification with error', async () => {
            endUserKycNotary.find('[data-test-id="kycHandleSubmit"]').simulate('click',{preventDefault:jest.fn()});
            mockAPIRequest(instance, "applicantCreateApiCall", createApplicationError);
         });

         then('user can stay on onfido verification box with error', () => {
            expect(endUserKycNotary.find('[data-test-id="kycReqForm"]')).toHaveLength(1); 
            expect(endUserKycNotary.find('[data-test-id="closeIconClick"]')).toHaveLength(1); 
        });

        when('user can close the kyc form', async () => {
            endUserKycNotary.find('[data-test-id="kycReqForm"]').simulate('close');
            mockAPIRequest(instance, "getKycRequestStatusAPI",notaryRequestStatus);
         });


    });


});
