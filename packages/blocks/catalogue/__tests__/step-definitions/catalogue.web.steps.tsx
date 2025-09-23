import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

jest.mock('../../../../components/src/OutlookAuthProvider.web', () => ({
  __esModule: true,
  default: {
    msalConfig: {
      auth: {
        clientId: '42b5b413-2926-4c01-96b3-683376a1c328',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'http://localhost:3000', 
      },
      cache: {
        cacheLocation: "localStorage",
      },
    },
  },
}));

jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
  removeStorageData: jest.fn()
}));

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Catalogue from "../../src/Catalogue.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Catalogue",
};

const feature = loadFeature(
  "./__tests__/features/catalogueweb-scenario.feature"
);

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}


const getProfileApiResponse = {
  "data": {
    "id": "1045",
    "type": "profile",
    "attributes": {
      "id": 1045,
      "first_name": null,
      "last_name": null,
      "full_phone_number": "",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": null,
      "email": "qwert@gmail.com",
      "activated": true,
      "user_type": "individual",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 1,
      "full_name": "sdf wer",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": null,
      "address": null,
      "address_line_2": null,
      "contact_name": "",
      "company_name": "",
      "photo": {
        "url": "pic"
      }
    }
  }
}

const getAllServicesApiResponse = {
  "data": [
      {
          "id": "29",
          "type": "service",
          "attributes": {
              "id": 29,
              "service_icon": {
                  "url": null
              },
              "service_name": " Other (Translation, Diploma verification, apostille)",
              "service_description": "Other services wi",
              "is_selected": false
          }
      },
      {
          "id": "28",
          "type": "service",
          "attributes": {
              "id": 28,
              "service_icon": {
                  "url": "blank.test"
              },
              "service_name": "Probate Matters",
              "service_description": "Involvement in estate management for the deceased, including certifying related documents and assisting in legal processes.",
              "is_selected": false
          }
      }
  ]
}

const getAllJurisdictionsApiResponse = [
  {
      "id": 1,
      "jurisdiction": "India",
      "created_at": "2024-02-09T05:07:19.691Z",
      "updated_at": "2024-02-09T05:07:19.691Z"
  },
  {
      "id": 2,
      "jurisdiction": "Wales",
      "created_at": "2024-04-12T11:19:04.487Z",
      "updated_at": "2024-04-12T11:19:04.487Z"
  },
  {
      "id": 3,
      "jurisdiction": "Scotland",
      "created_at": "2024-07-29T11:31:12.284Z",
      "updated_at": "2024-07-29T11:31:12.284Z"
  }
]

const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Catalogue;

    given("I am a User loading catalogue", () => {
      exampleBlockA = shallow(<Catalogue {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = exampleBlockA.instance() as Catalogue;
    });

    then("catalogue will load with out errors", () => {
      expect(findByTestID(exampleBlockA, "test1")).toHaveLength(1);
      const mockEvent2: React.ChangeEvent<HTMLInputElement> = {
        target: { value: 'mockValue' } as EventTarget & HTMLInputElement,
        currentTarget: { value: 'mockValue' } as EventTarget & HTMLInputElement,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        nativeEvent: {} as Event,
        preventDefault: jest.fn(),
        isDefaultPrevented: jest.fn(),
        stopPropagation: jest.fn(),
        isPropagationStopped: jest.fn(),
        persist: jest.fn(),
        timeStamp: Date.now(),
        type: 'change',
      } as React.ChangeEvent<HTMLInputElement>;
      
      
      const mockNewValue = "New Jurisdiction";
       instance.handleChange(mockEvent2,mockNewValue)
       instance.yesButtonClick()
       instance.goToServicePage()
    });

    when("User gets navigated to catalogue getProfile Api should get called", () => {
      mockAPICall(instance, "getProfileApiCallID", getProfileApiResponse);
    })

    then("User name is shown on the screen", () => {
      instance.closeBookNotaryRequestModal()
      instance.goToNotaryPage()

      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
        {servicefilterData:[
          {
            "id": "37",
            "type": "service",
            "attributes": {
                "id": 37,
                "service_icon": {
                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGtFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--807cc94b86f8f300ebebf46ce436b51b6b2d3f6a/media_20240722_153712_5642185173591259185.png"
                },
                "service_name": "Testing dev",
                "service_description": "Testing Testing Testing Testing Testing",
                "is_selected": false
            }
        },
        ]}
    )
      instance.getjurisdictionApiCallID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setState({servicefilterData: [
        {
          "id": "37",
          "type": "service",
          "attributes": {
              "id": 37,
              "service_icon": {
                  "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGtFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--807cc94b86f8f300ebebf46ce436b51b6b2d3f6a/media_20240722_153712_5642185173591259185.png"
              },
              "service_name": "Testing dev",
              "service_description": "Testing Testing Testing Testing Testing",
              "is_selected": false
          }
      }
    ]
      })

       
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
        {servicedatashow:[
          {
            "id": "37",
            "type": "service",
            "attributes": {
                "id": 37,
                "service_icon": {
                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGtFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--807cc94b86f8f300ebebf46ce436b51b6b2d3f6a/media_20240722_153712_5642185173591259185.png"
                },
                "service_name": "Testing dev",
                "service_description": "Testing Testing Testing Testing Testing",
                "is_selected": false
            }
        },
        ]}
    )
      instance.getservicedataApiCallID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setState({servicedatashow: [
        {
          "id": "37",
          "type": "service",
          "attributes": {
              "id": 37,
              "service_icon": {
                  "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGtFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--807cc94b86f8f300ebebf46ce436b51b6b2d3f6a/media_20240722_153712_5642185173591259185.png"
              },
              "service_name": "Testing dev",
              "service_description": "Testing Testing Testing Testing Testing",
              "is_selected": false
          }
      }
    ]
      })

    })

    when("User gets navigated to catalogue getServices Api should get called", () => {
      mockAPICall(instance, "getServicesApiCallId", getAllServicesApiResponse);
    })

    then("User name is shown on the screen", () => {
      instance.handleNavigation('')
    })

    when("User gets navigated to catalogue getJurisdictions Api should get called", () => {
      mockAPICall(instance, "getJuridictionApiCallId", getAllJurisdictionsApiResponse);
    })

    then("User name is shown on the screen", () => {

      const mockEvent = {
        target: {
          value: 'sample query',
        },
      };
      instance.handleSearchChange(mockEvent);  

      jest.runAllTimers()
      jest.useFakeTimers()

      instance.handleSearchChange(mockEvent);  
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
        {serviceData:[
          {
            "id": "37",
            "type": "service",
            "attributes": {
                "id": 37,
                "service_icon": {
                    "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbGtFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--807cc94b86f8f300ebebf46ce436b51b6b2d3f6a/media_20240722_153712_5642185173591259185.png"
                },
                "service_name": "Testing dev",
                "service_description": "Testing Testing Testing Testing Testing",
                "is_selected": false
            }
        },
        ]}
    )
      instance.getjurisdictionApiCallID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setState({accountData: [
        {
            "id": "1171",
            "type": "profile",
            "attributes": {
                "id": 1171,
                "first_name": null,
                "last_name": null,
                "full_phone_number": "",
                "city": null,
                "post_code": null,
                "country_code": null,
                "phone_number": null,
                "email": "testdevnotaryuser@yopmail.com",
                "activated": false,
                "user_type": "notary",
                "user_name": null,
                "platform": null,
                "rating": 0.0,
                "suspend_until": null,
                "status": "regular",
                "role_id": 2,
                "full_name": "Testdev notary",
                "gender": null,
                "date_of_birth": null,
                "age": null,
                "country": "India",
                "address": null,
                "address_line_2": null,
                "contact_name": null,
                "company_name": "test dev notary",
                "is_online": true,
                "photo": {
                    "url": null
                }
            }
        },
    ]
      })
      jest.runAllTimers()
      jest.useFakeTimers()

      instance.handleSearchChange(mockEvent); 
    })
  });
});
