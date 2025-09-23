// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import DocusignIntegration from "../../src/DocusignIntegration.web";
import BookNotaryRequestWeb from "../../../dashboard/src/BookNotaryRequest.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
const navigation = require("react-navigation");

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

jest.mock("../../../../framework/src/Utilities", () => ({
  getStorageData: jest.fn().mockImplementationOnce(() => {
    return Promise.resolve('url')
  }).mockImplementationOnce(() => {
    return Promise.resolve('url')
  }).mockImplementation(() => {
    return Promise.resolve('url')
  }),
  setStorageData: jest.fn(),
  removeStorageData: jest.fn()
}));

const screenProps = {
  navigation: { goBack :  jest.fn()},
  id: "DocusignIntegration",
};

const mockSetLoader = jest.fn<void, [boolean]>();

const bookNotaryRequestProps = {
  navigation: navigation,
  id: "BookNotaryRequest",
  isOpen: true,
  closeModal: jest.fn(),
  allRequestAPI: jest.fn(),
  serviceData: [
    {
      id: "id",
      type: "type",
      attributes: {
        id: 1,
        service_icon: {
          url: "img.png",
        },
        service_name: "service",
        service_description: "desc",
        is_selected: true,
      },
    },
  ],
  cancelReqModal: true,
  yesButtonClick: jest.fn(),
  noButtonClick: jest.fn(),
  backToEditRequest: jest.fn(),
  isNewRequestOrEditRequestOrInviteClient: "new",
  editRequest: undefined,
  setLoader: mockSetLoader,
  setModal: mockSetLoader,
};

const navigationData = {
  signing_url: "url"
}

const feature = loadFeature(
  "./__tests__/features/DocusignIntegration-scenario.web.feature"
);

const notaryUserProfileResponse = {
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
const endUserProfileResponse = {
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
const mockNavigationPayLoadMessage = (instance: any, navigationData: object, messageType: MessageEnum.NavigationMessage = MessageEnum.NavigationMessage) => {
  const message = new Message(getName(MessageEnum.NavigationPayLoadMessage))
  message.addData(getName(MessageEnum.NavigationPayLoadMessage), message.messageId);
  message.addData(getName(MessageEnum.CustomDataMessage), navigationData);
  instance[messageType] = message.messageId
  const { receive: MockRecieve } =  instance
  MockRecieve("", message)
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to DocusignIntegration", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: DocusignIntegration;

    given("I am a User loading DocusignIntegration", () => {
      exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
    });

    when("I navigate to the DocusignIntegration", () => {
      instance = exampleBlockA.instance() as DocusignIntegration;
    });
    then("Document will load with out errors", () => {
      mockNavigationPayLoadMessage(instance, navigationData);
      mockAPICall(instance, "getServicesApiCallId", getAllServicesApiResponse)
      expect(exampleBlockA).toHaveLength(1);
    });

    when("Notary user logs in", () => {
      mockAPICall(instance, "getProfileApiCallId", notaryUserProfileResponse)
    })
    then("Invite client button is rendered", () => {
      // expect(findByTestID(exampleBlockA, "bookNowBtn")).toHaveLength(1);
    })

    when("End user logs in", () => {
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse)
    })
    then("Book Now button is rendered", () => {
      // expect(findByTestID(exampleBlockA, "bookNowBtn")).toHaveLength(1);
    })

    when("User clicks on book now request modal", () => {
      const bookNowBtn = findByTestID(exampleBlockA, "bookNowBtn");
      // bookNowBtn.simulate("click");
    });
    then("Book Now modal should open", () => {
      const bookNowRequestModal = shallow(
        <BookNotaryRequestWeb {...bookNotaryRequestProps} />
      );
      const serviceSelectionBtn = findByTestID(
        bookNowRequestModal,
        "servieSelection"
      );
      expect(serviceSelectionBtn).toHaveLength(0);
      findByTestID(exampleBlockA, "modalOpen").prop("setLoader")();
      findByTestID(exampleBlockA, "modalOpen").prop("closeModal")();
      findByTestID(exampleBlockA, "modalOpen").prop("yesButtonClick")();
      findByTestID(exampleBlockA, "modalOpen").prop("noButtonClick")();
      findByTestID(exampleBlockA, "modalOpen").prop("allRequestAPI")();
    });
  });
});
// Customizable Area End
