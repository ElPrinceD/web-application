import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import SalesText from "../../src/SalesText.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "SalesText",
};

const mockApiCall = (
  instance: any,
  messageIdProperty: string,
  data: any,
  isError: boolean = false
) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    requestMessage.messageId
  );

  requestMessage.addData(
    getName(
      !isError
        ? MessageEnum.RestAPIResponceSuccessMessage
        : MessageEnum.RestAPIResponceErrorMessage
    ),
    data
  );

  instance[messageIdProperty] = requestMessage.messageId;

  runEngine.sendMessage("Unit Test", requestMessage);
};
const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
wrapper.findWhere((node) => node.prop("data-test-id") === testID);



const notaryUserProfileResponse = {
  "data": {
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
      "user_type": "notary",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 2,
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
  }
};


const feature = loadFeature(
  "./__tests__/features/salesText-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("salesText User navigates to salesText", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: SalesText;

    given("I am a User loading SalesText", () => {
      exampleBlockA = shallow(<SalesText {...screenProps} />);
    });

    when("I navigate to the SalesText", () => {
      instance = exampleBlockA.instance() as SalesText;
      instance.setToken("token");
    });

    then("SalesText will load with out errors", () => {
      mockApiCall(instance, "getUserProfileDetailsApiCallId", notaryUserProfileResponse);
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };

      const event1 = { target:{ value:'64893265sdbkjfsdbkjt387r'} };

      const mockResponse = {
        error: 'Error message', 
      };
      instance.handleSalesTaxt(mockResponse)
      instance.handleVatNumberChange(event1)
      instance.canselDetails()
      instance.setState({noVatcheked:true,vatNumber:'AAAAAAaasadsaassda12345678907654',vatcheked:true})
      instance.savesales()


    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
      const event1 = { target:{ value:'#455'} };

      instance.handleVatNumberChange(event1)
      instance.savesales()

      instance.setState({vatcheked:true})
      instance.savesales()
      instance.setState({
        savedetailsScreen: true,
        editScreen: false,
        noVatcheked: true,
        vatcheked: true
      });
  
      instance.canselDetails();

    });

    then("I can select any tab", () => {
      
      instance.editDetails()
      instance.setState({vatcheked:true})
      instance.canselDetails()
      instance.savesales()

        const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
          apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
          apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {salesShowdad: {
            "data": {
                "id": "1",
                "type": "sales_tax",
                "attributes": {
                    "id": 1,
                    "account_id": 1683,
                    "has_vat": false
                }
            }
        }
           
          })
          instance.getSalesTextApiCallId = apiMsg.messageId
          runEngine.sendMessage("Unit Test", apiMsg);
          instance.setState({salesShowdad:{
            "data": {
                "id": "1",
                "type": "sales_tax",
                "attributes": {
                    "id": 1,
                    "account_id": 1683,
                    "has_vat": false
                }
            }
        }})
        const mock = {
          "data": {
              "id": "1",
              "type": "sales_tax",
              "attributes": {
                  "id": 1,
                  "account_id": 1683,
                  "has_vat": false
              }
          }
      }
        instance.handleSalesTaxt(mock)

    });

    then("I can select the Connect button without errors", () => {
      const event = { target: { checked: true } };
   instance.vatChange(event)
   instance.noVatHave(event)
   const event1 = { target:{ value:2} };

   instance.handleVatNumberChange(event1)
   instance.SaveDetails()

   const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
   apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
   apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {salesShowEditdad: {
     "data": {
         "id": "1",
         "type": "sales_tax",
         "attributes": {
             "id": 1,
             "account_id": 1683,
             "has_vat": false
         }
     }
 }
    
   })
   instance.getSalesTextEditApiCallId = apiMsg.messageId
   runEngine.sendMessage("Unit Test", apiMsg);
   instance.setState({salesShowEditdad:{
    "data": {
        "id": "1",
        "type": "sales_tax",
        "attributes": {
            "id": 1,
            "account_id": 1683,
            "has_vat": false
        }
    }
}})
instance.handleSalesEditText('3475783dfjh')
 instance.setState({
vatcheked:true
 })
 instance.savesales()
    });
    then("I can select the Connect button", () => {

      instance.canselDetails()
      instance.savesales()
      instance.closePopup()
      instance.componentWillUnmount()
      expect(exampleBlockA).toBeTruthy();

    })
    
  });

});
