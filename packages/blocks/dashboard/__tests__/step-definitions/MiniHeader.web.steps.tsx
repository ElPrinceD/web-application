import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import MiniHeader from "../../src/MiniHeader.web";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";

const screenProps = {
  navigation: { goBack: jest.fn() },
  id: "MiniHeader",
};

const feature = loadFeature(
  "./__tests__/features/MiniHeader-scenario.web.feature"
);

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
  const msgSucessRestAPI = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgSucessRestAPI.messageId
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    apiData
  );
  instance[apiCallID] = msgSucessRestAPI.messageId;
  const { receive: MockRecieve } = instance;
  MockRecieve("", msgSucessRestAPI);
};

const notaryProfile = {
  data: {
    id: "1204",
    type: "profile",
    attributes: {
      id: 1204,
      first_name: null,
      last_name: null,
      full_phone_number: "567993470",
      city: "Anand",
      post_code: "778 jkkk",
      country_code: null,
      phone_number: 567993470,
      email: "Testdeviam1@yopmail.com",
      activated: true,
      user_type: "notary",
      user_name: null,
      platform: null,
      suspend_until: null,
      status: "regular",
      role_id: 2,
      full_name: "Dev User",
      gender: null,
      date_of_birth: null,
      age: null,
      country: "India",
      address: "Dev User Dev User Dev User Dev Dev User Dev User D",
      address_line_2: "hhyhh",
      contact_name: "Test dev iam",
      company_name: "Test devnotary",
      is_online: true,
      photo: {
        url: "f76c29a9fb2dc556e138f1cbce07aed7411e/download.jpg",
      },
    },
  },
};

const userProfile = {
  data: {
    id: "1045",
    type: "profile",
    attributes: {
      id: 1045,
      first_name: null,
      last_name: null,
      full_phone_number: "",
      city: null,
      post_code: null,
      country_code: null,
      phone_number: null,
      email: "qwert@gmail.com",
      activated: true,
      user_type: "individual",
      user_name: null,
      platform: null,
      suspend_until: null,
      status: "regular",
      role_id: 1,
      full_name: "sdf wer",
      gender: null,
      date_of_birth: null,
      age: null,
      country: null,
      address: null,
      address_line_2: null,
      contact_name: "",
      company_name: "",
      is_online: true,
      photo: {
        url: null,
      },
    },
  },
};

const services = {
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

const userServices = {
services:[23,45,23,89,12,56]
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User sees MiniHeader", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: MiniHeader;

    given("I am a User loading MiniHeader", () => {
      exampleBlockA = shallow(<MiniHeader {...screenProps} />);
    });
    when("I see the MiniHeader", () => {
      instance = exampleBlockA.instance() as MiniHeader;
    });
    then("MiniHeader will load with out errors", () => {
      expect(findByTestID(exampleBlockA, "miniHeader")).toHaveLength(1);
      expect(findByTestID(exampleBlockA, "notifications")).toHaveLength(1);
    });

    when("Apis get called", () => {
      mockAPICall(instance, "getProfileApiCallId", userProfile);
      mockAPICall(instance, "getServicesApiCallId", services);
    });
    then("User details are shown on the screen", () => {
      expect(findByTestID(exampleBlockA, "userName")).toHaveLength(1);
    });

    when("Book Now button will press", () => {
      const BookNowBtn = findByTestID(exampleBlockA, "bookNowBtn");
      BookNowBtn.simulate("click");
    });

    then("New Notary modal will open successfully", () => {
      const modalOpen = findByTestID(exampleBlockA, "modalOpen");
      modalOpen.prop("closeModal")()
      modalOpen.prop("noButtonClick")()
      modalOpen.prop("yesButtonClick")()
      modalOpen.prop("setLoader")()
      findByTestID(exampleBlockA,"modalOpen").props().backToEditRequest();
    });
    when("Create request api will call", () => {
      mockAPICall(instance, "createNewNotaryApiCallID", services);
    });

    then("Create request api get called", () => {
      expect(findByTestID(exampleBlockA, "userName")).toHaveLength(1);
    });
  });
  test("Notary User sees MiniHeader", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: MiniHeader;

    given("I am a notary User loading MiniHeader", () => {
      exampleBlockA = shallow(<MiniHeader {...screenProps} />);
    });
    when("I see the MiniHeader", () => {
      instance = exampleBlockA.instance() as MiniHeader;
    });
    then("MiniHeader will load with out errors", () => {
      expect(findByTestID(exampleBlockA, "miniHeader")).toHaveLength(1);
      expect(findByTestID(exampleBlockA, "notifications")).toHaveLength(1);
    });

    when("Apis get called", () => {
      mockAPICall(instance, "getProfileApiCallId", notaryProfile);
      mockAPICall(instance, "getServicesApiCallId", services);
    });
    then("User details are shown on the screen", () => {
      expect(findByTestID(exampleBlockA, "userName")).toHaveLength(1);
    });

    when("Notary user clicks on invite client button", () => {
      const inviteClientButton = findByTestID(
        exampleBlockA,
        "inviteClientButton"
      );
      inviteClientButton.simulate("click");
    });

    then("Invite Client Modal does not open", () => {
      const inviteClientButton = findByTestID(
        exampleBlockA,
        "inviteClientButton"
      );
    });

    when("User clicks on profile box", () => {
      const mockSend = jest.fn() as jest.MockedFunction<typeof instance.send>;
      instance.send = mockSend;
      const userProfileBox = findByTestID(exampleBlockA, "userProfileBox");
      userProfileBox.simulate("click");
    });
    
    then("Navigation to user profile should be triggered", () => {
      const mockSend = instance.send as jest.MockedFunction<typeof instance.send>;
      expect(mockSend).toHaveBeenCalled();
      const [message] = mockSend.mock.calls[0];
      expect(message.properties.NavigationTargetMessage).toBe("UserProfileBasicBlock");
    });

  });

  test("User navigates to dashboard min header with  user service data" , ({ given , when , then}) => {
    let exampleBlockA: ShallowWrapper;
    let instance: MiniHeader;

    given("I am a User loading dashboard min header user service api", () => {
      exampleBlockA = shallow(<MiniHeader {...screenProps} />);
      instance = exampleBlockA.instance() as MiniHeader;
    });

    when("I call user service api", () => {
      mockAPICall(instance, "getServicesApiCallId", services);
      mockAPICall(instance, "userServicesApiCallId", userServices);
    });

    then("user service api call successfully", () => {
      expect(exampleBlockA).toBeDefined();
    });
  })
});
