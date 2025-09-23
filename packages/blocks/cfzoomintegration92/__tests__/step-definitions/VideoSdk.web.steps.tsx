import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import VideoSdk from "../../src/VideoSdk.web";
import BookNotaryRequestWeb from "../../../dashboard/src/BookNotaryRequest.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {goBack: jest.fn()},
  id: "VideoSdk",
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

jest.mock('@azure/msal-browser', () => ({
  PublicClientApplication: jest.fn(() => ({
    loginPopup: jest.fn(),
    acquireTokenSilent: jest.fn(),
  })),
}));

jest.mock('@zoom/videosdk-ui-toolkit', () => {
  return {
    uitoolkit: {
      joinSession: jest.fn(),
      closeSession: jest.fn(),
    },
  };
});  

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
const zoomVideoSDKResponse = {
  "zoom_meeting": {
      "zoom_sdk_key": "test",
      "zoom_sdk_secret_key": "test"
  }
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

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

const feature = loadFeature(
  "./__tests__/features/VideoSdk-scenario.web.feature"
);

defineFeature(feature, (test) => {
  test("User navigates to VideoSdk", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: VideoSdk;

    given("I am a User loading VideoSdk", () => {
      exampleBlockA = shallow(<VideoSdk {...screenProps} />);
      instance = exampleBlockA.instance() as VideoSdk;
    });

    when("The apis are called", () => {
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse);
      mockAPICall(instance, "getServicesApiCallId", getAllServicesApiResponse);
      mockAPICall(instance, "getVideoSDKConfigsApiCallId", zoomVideoSDKResponse);
    });

    then("Data will be rendered on the screen", async () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(6);
    });

    when("Notary user logs in", () => {
      mockAPICall(instance, "getProfileApiCallId", notaryUserProfileResponse)
    })
    then("Invite client button is rendered", () => {
      expect(findByTestID(exampleBlockA, "bookNowBtn")).toHaveLength(1);
    })

    when("End user logs in", () => {
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse)
    })
    then("Book Now button is rendered", () => {
      expect(findByTestID(exampleBlockA, "bookNowBtn")).toHaveLength(1);
    })

    when("User clicks on book now request modal", () => {
      const bookNowBtn = findByTestID(exampleBlockA, "bookNowBtn");
      bookNowBtn.simulate("click");
    });
    then("Book Now modal should open", () => {
      const bookNowRequestModal = shallow(
        <BookNotaryRequestWeb {...bookNotaryRequestProps} />
      );
      const serviceSelectionBtn = findByTestID(
        bookNowRequestModal,
        "servieSelection"
      );
      expect(serviceSelectionBtn).toHaveLength(1);
      findByTestID(exampleBlockA, "modalOpen").prop("setLoader")();
      findByTestID(exampleBlockA, "modalOpen").prop("closeModal")();
      findByTestID(exampleBlockA, "modalOpen").prop("yesButtonClick")();
      findByTestID(exampleBlockA, "modalOpen").prop("noButtonClick")();
      findByTestID(exampleBlockA, "modalOpen").prop("allRequestAPI")();
    });
    
    when("User clicks on hamburger menu icon", () => {
      findByTestID(exampleBlockA, "toggleButton").simulate("click");
    });
    then("sidebar is toggled", () => {
      expect(findByTestID(exampleBlockA, "toggleButton").simulate("click")).toHaveLength(1);
    })

    when("User clicks on back icon button", () => {
      const iconBtn = findByTestID(exampleBlockA, "backIconButton");
      iconBtn.simulate("click");
    });

    then("Page will unmount", () => {
      const iconBtn = findByTestID(exampleBlockA, "backIconButton");
      iconBtn.simulate("click");
    });
  });
});
