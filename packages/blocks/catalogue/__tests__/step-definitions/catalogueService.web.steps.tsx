import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CatalogueService from "../../src/CatalogueService.web";
const navigation = require("react-navigation");

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

const screenProps = {
  navigation: navigation,
  id: "CatalogueService",
};

const feature = loadFeature(
  "./__tests__/features/catalogueServiceweb-scenario.feature"
);
jest.useFakeTimers()
const tempListData = [
  {
    id: 1,
    attributes: {
      name: "test name1",
      price: 10,
      average_rating: 5,
    },
  },
  {
    id: 2,
    attributes: {
      name: "test name2",
      price: 12,
      average_rating: 4,
    },
  },
  {
    id: 3,
    attributes: {
      name: "test name3",
      price: 13,
      average_rating: 4,
    },
  },
];
const mockAPICall = jest.fn().mockImplementation(
    (
        instance,
        apiCallId: string,
        mockData: object = {},
        messageType: number = MessageEnum.RestAPIResponceSuccessMessage
    ) => {
        const messageRestApiCall = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
        );
  
        messageRestApiCall.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            messageRestApiCall.messageId
        );
  
        messageRestApiCall.addData(
            getName(messageType),
            mockData
        );
  
        instance[apiCallId] = messageRestApiCall.messageId;
  
        const { receive: mockResponse } = instance;
        mockResponse("mockAPICallTest", messageRestApiCall);
    }
  );

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-testID") === testID).first();
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogueservice", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CatalogueService;

    given("I am a User loading catalogueservice", () => {
      exampleBlockA = shallow(<CatalogueService {...screenProps} />);
    });

    when("I navigate to the catalogueservice", () => {
      instance = exampleBlockA.instance() as CatalogueService;
    });

    then("catalogueservice will load with out errors", () => {
      instance.componentDidMount();
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
        {"data": {
            "id": "613",
            "type": "profile",
            "attributes": {
              "id": 613,
              "first_name": "CHeck test",
              "last_name": null,
              "full_phone_number": "7768987442",
              "city": null,
              "post_code": null,
              "country_code": null,
              "phone_number": 7768987442,
              "email": "ds01@yopmail.com",
              "activated": true,
              "user_type": "individual",
              "user_name": null,
              "platform": null,
              "suspend_until": null,
              "status": "regular",
              "role_id": 1,
              "full_name": "Deep singh",
              "gender": null,
              "date_of_birth": null,
              "age": null,
              "country": "England",
              "address": "india",
              "contact_name": "Deep singh ",
              "company_name": "null Check Test",
              "photo": {
                "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
              }
            }
          }}
    )
      instance.getProfileApiCallID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);
      expect(exampleBlockA).toBeTruthy();
      instance.setState({accountData:[
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
      ]
      })
    });

    then("catalogueservice will load data with internal module", () => {
      instance.getListRequest("test token");
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), 
        {serviceData:[
            {
              attributes:{
                service_description:"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
              }
            }
        ]}
    )
      instance.getservicedataRequestDetailsCallId = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setState({serviceData:[
        {
          attributes:{
            service_description:"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
          }
        }
    ]})
    instance.noButtonClick()
      expect(exampleBlockA).toBeTruthy();
      instance.gotoback()
    });

    then("catalogueservice will load data from API", () => {
      const msgProductRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgProductRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgProductRestAPI.messageId
      );
      msgProductRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: tempListData,
        }
      );
      instance. getservicedataRequestDetailsCallId = msgProductRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgProductRestAPI);

      mockAPICall(instance, "getProfileApiCallID",{"data": {
        "id": "613",
        "type": "profile",
        "attributes": {
          "id": 613,
          "first_name": "CHeck test",
          "last_name": null,
          "full_phone_number": "7768987442",
          "city": null,
          "post_code": null,
          "country_code": null,
          "phone_number": 7768987442,
          "email": "ds01@yopmail.com",
          "activated": true,
          "user_type": "individual",
          "user_name": null,
          "platform": null,
          "suspend_until": null,
          "status": "regular",
          "role_id": 1,
          "full_name": "Deep singh",
          "gender": null,
          "date_of_birth": null,
          "age": null,
          "country": "England",
          "address": "india",
          "contact_name": "Deep singh ",
          "company_name": "null Check Test",
          "photo": {
            "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
          }
        }
      }})
    instance.closeBookNotaryRequestModal()
    instance.logOutNvigation()
    instance.openSideBar()
    instance.yesButtonClick()
    });

    when("User go to my account", () => {
       });
 
       then("User will navigate to the user profile page",()=>{
         expect(MessageEnum.NavigationPayLoadMessage).toBeGreaterThan(0);

         const mockEvent = {
          target: {
            value: 'sample query',
          },
        };
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
        instance.setState({accountData:[
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
        ]
        })
        jest.runAllTimers()
        jest.useFakeTimers()
      });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
