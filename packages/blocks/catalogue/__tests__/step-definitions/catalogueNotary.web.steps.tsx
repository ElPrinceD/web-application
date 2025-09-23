import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import CatalogueNotary from "../../src/CatalogueNotary.web";
import { runEngine } from "../../../../framework/src/RunEngine";
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
  id: "CatalogueNotary",
};


const feature = loadFeature(
  "./__tests__/features/catalogueNotaryweb-scenario.feature"
);
jest.useFakeTimers()
const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  const { receive: MockRecieve } =  instance
  MockRecieve("", msgSucessRestAPI)
}


const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
 
 
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    Object.assign(global, {
      window: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    });
   

    const mockScrollData = {
      scrollTop: 900,
      scrollHeight: 1000,
      clientHeight: 800,
    };

    jest.spyOn(React, 'createRef').mockReturnValue({ current: mockScrollData } as React.RefObject<HTMLDivElement>);
    
   
  });
  test("User navigates to CatelogueNotary", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CatalogueNotary;

    given("I am a User loading CatelogueNotary", () => {
      exampleBlockA = shallow(<CatalogueNotary {...screenProps} />);
    });

    when("I navigate to the CatelogueNotary", () => {
      instance = exampleBlockA.instance() as CatalogueNotary;
    });

    then("CatelogueNotary will load with out errors", () => {
      const main = exampleBlockA.find('.main_cont');
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {  "data": [
        {
            "name": "back end",
            "jurisdiction": "Englend",
            "rating": 0.0,
            "total_notaries": 0
        },
        {
            "name": "back end",
            "jurisdiction": "Englend",
            "rating": 0.0,
            "total_notaries": 0
        },
        {
            "name": "Eshant Test",
            "jurisdiction": "India",
            "rating": 0.0,
            "total_notaries": 0
        },]
       
    })
      instance.getPopularNotaryApiCallID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);

      instance.setState({serviceData:[  {
        "name": "back end",
        "jurisdiction": "Englend",
        "rating": 0.0,
        "total_notaries": 0
    },
    {
        "name": "back end",
        "jurisdiction": "Englend",
        "rating": 0.0,
        "total_notaries": 0
    },
    {
        "name": "Eshant Test",
        "jurisdiction": "India",
        "rating": 0.0,
        "total_notaries": 0
    }
       
    ]})
     
      expect(main).toHaveLength(1);
    });
    when("I can filterData from api", () => {
      instance = exampleBlockA.instance() as CatalogueNotary;
    });

    then("I can filterData when select", () => {
      const main = exampleBlockA.find('.main_cont');
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        "data": {
          "accounts": {
            "data": [
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
                  "rating": 0,
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
                  },
                  "total_notaries": 0
                }
              },
             
            ]
          },
          "pagination": {
            "current_page": 1,
            "next_page": null,
            "previous_page": null,
            "total_pages": 1,
            "total_entries": 5
          }
        }
      })
      instance.getjurisdictionApiCallID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);

      instance.setState({accountData:[ 
          {
              "id": "459",
              "type": "profile",
              "attributes": {
                  "id": 459,
                  "first_name": null,
                  "last_name": null,
                  "full_phone_number": "",
                  "city": null,
                  "post_code": null,
                  "country_code": null,
                  "phone_number": null,
                  "email": "anya002@yopmail.com",
                  "activated": false,
                  "user_type": "individual",
                  "user_name": null,
                  "platform": null,
                  "rating": 0.0,
                  "suspend_until": null,
                  "status": "regular",
                  "role_id": 2,
                  "full_name": "Test user",
                  "gender": null,
                  "date_of_birth": null,
                  "age": null,
                  "country": "India",
                  "address": null,
                  "address_line_2": null,
                  "contact_name": null,
                  "company_name": null,
                  "is_online": true,
                  "photo": {
                      "url": null
                  },
                  "total_notaries" : 0,
              }
          },
       
    ]})
     

    const apiMsg1: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    apiMsg1.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg1.messageId);
    apiMsg1.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
      "data": {
        "accounts": {
          "data": [
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
                "rating": 0,
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
                  "url": "null"
                },
              }
            },
           
          ]
        },
        "pagination": {
          "current_page": 1,
          "next_page": null,
          "previous_page": null,
          "total_pages": 1,
          "total_entries": 5
        }
      }
    })
    instance.getjurisdictionApiCallID = apiMsg1.messageId
    runEngine.sendMessage("Unit Test", apiMsg1);
      expect(main).toHaveLength(1);
      const mockEvent = { target: { value: 'test value' } };  

       instance.handleSearchChange(mockEvent)

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
       instance.handleSearchChange(mockEvent2)

       const mockNewValues = "";
       instance.handleChange(mockEvent2,mockNewValues)
       instance.handleSearchChange(mockEvent2)

       jest.runAllTimers()
       jest.useFakeTimers()
      mockAPICall(instance, "", {});
      expect(main).toHaveLength(1);
    });
    when("I can filterData select from api", () => {
      instance = exampleBlockA.instance() as CatalogueNotary;
    });

    then("I can see filterData when select", () => {
      instance.gotoback()
    });

    when("I can scroll the main section", () => {
      exampleBlockA.setState({
        loader: false,  
        currentPage: 2, 
        totalPage: 5, 
        popularSelectData:false,
      });
      exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "scrollsection"
      ).simulate("scroll");

      exampleBlockA.setState({
        loader: false,  
        currentPage: 2, 
        totalPage: 5, 
        popularSelectData:true,
      });
      exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "scrollsection"
      ).simulate("scroll");
      jest.runAllTimers();
    });

    then("I can see latest notary data", () => {
      expect(exampleBlockA.state("currentPage")).toBe(2); 
      expect(exampleBlockA.state("loader")).toBe(true);
    });

    when("I can click button to open sidebar", () => {
      exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "toggleButton"
      ).simulate("click");
    });

    then("I should remove the scroll event listener on unmount", () => {
      const removeEventListenerSpy = jest.spyOn(global.window, "removeEventListener");
      exampleBlockA.unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        instance.handleScroll,
        true
      );
      removeEventListenerSpy.mockRestore();
      instance.handleSideBarNavigation("My Account");
    });




   

  });
});