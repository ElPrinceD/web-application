import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import UserNotaryService from "../../src/UserNotaryService.web";

const screenProps = {
  navigation: {
    navigation: jest.fn(),
    goBack: jest.fn(),
  },
  id: "UserNotaryService",
};

const mockAPICall = jest
  .fn()
  .mockImplementation(
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

      messageRestApiCall.addData(getName(messageType), mockData);

      instance[apiCallId] = messageRestApiCall.messageId;

      const { receive: mockResponse } = instance;
      mockResponse("mockAPICallTest", messageRestApiCall);
    }
  );

const getServiceResponse = {
  data: [
    {
      id: "29",
      type: "service",
      attributes: {
        id: 29,
        service_icon: {
          url: "active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm9DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--da6861d2b80bd8b91589b57f9704516146bc8012/image_stamp.png",
        },
        service_name: " Other (Translation, Diploma verification, apostille)",
        service_description:
          "Other services will be added after launch. Prior to the launch, they should be grayed out.",
        is_selected: false,
      },
    },
  ],
};

const getUserService = [35, 31, 32, 29];

const response = {
  message: "text",
};

const mockSeesionToken = jest
  .fn()
  .mockImplementation((instance: UserNotaryService, token: string = "") => {
    const msgSeesionToken = new Message(
      getName(MessageEnum.SessionResponseMessage)
    );
    msgSeesionToken.addData(getName(MessageEnum.SessionResponseToken), token);
    const { receive: mockResponse } = instance;
    mockResponse("mockSeesionTokenTest", msgSeesionToken);
  });

const feature = loadFeature(
  "./__tests__/features/UserNotaryService-scenario.web.feature"
);

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserNotaryService", ({ given, when, then }) => {
    let userWrapper: ShallowWrapper;
    let instance: UserNotaryService;
    given("I am a User loading UserNotaryService", () => {
      userWrapper = shallow(<UserNotaryService {...screenProps} />);
      instance = userWrapper.instance() as UserNotaryService;
    });

    when("User comes to the UserNotaryService", () => {
      mockSeesionToken(instance, "egdg");
    });

    then("Token get saved", () => {
      expect(MessageEnum.SessionResponseToken).toBe(59);
    });

    when("I navigate to the UserNotaryService", () => {
      mockAPICall(instance, "getAllServicesApiCallId", getServiceResponse);
    });

    then("UserNotaryService will load with out errors", () => {
      expect(findByTestID(userWrapper, "goBackBtn")).toHaveLength(1);
    });

    when("User get service api will called", () => {
      mockAPICall(instance, "getUserServicesApiCallId", getUserService);
    });

    then("Service API will called successful", () => {
      expect(findByTestID(userWrapper, "goBackBtn")).toHaveLength(1);
    });

    when("User click on the back button", () => {
      let goBackBtn = findByTestID(userWrapper, "goBackBtn");
      goBackBtn.simulate("click");
    });

    then("User will go back from notary service screen", () => {
      let goBackBtn = findByTestID(userWrapper, "goBackBtn");
      expect(goBackBtn).toHaveLength(1);
    });

    when("User click on the all select service button", () => {
      let allSelectBtn = findByTestID(userWrapper, "unSelectBtn");
      allSelectBtn.simulate("click");
    });

    then("Users all services will be selected", () => {
      let allSelectBtn = findByTestID(userWrapper, "unSelectBtn");
      expect(allSelectBtn).toHaveLength(1);
    });

    when("User click on the all unselect service button", () => {
      let unSelect = findByTestID(userWrapper, "unSelectBtn");
      unSelect.simulate("click");
    });

    then("Users all services will be unSelected", () => {
      let allSelectBtn = findByTestID(userWrapper, "unSelectBtn");
      expect(allSelectBtn).toHaveLength(1);
    });

    when("User click on the particular service block", () => {
      let serviceBlock = findByTestID(userWrapper, "multiSelectBtn");
      serviceBlock.simulate("click");
    });

    then("Service block will be selected", () => {
      let serviceBlock = findByTestID(userWrapper, "multiSelectBtn");
      expect(serviceBlock).toHaveLength(1);
    });

    when("User click on the particular service block again", () => {
      let serviceBlock = findByTestID(userWrapper, "multiSelectBtn");
      serviceBlock.simulate("click");
    });

    then("Service block will be un selected", () => {
      let serviceBlock = findByTestID(userWrapper, "multiSelectBtn");
      expect(serviceBlock).toHaveLength(1);
    });

    when("User click on the save button", () => {
      let saveBtn = findByTestID(userWrapper, "saveBtn");
      saveBtn.simulate("click");
    });

    then("Add services api will be called", () => {
      let saveBtn = findByTestID(userWrapper, "saveBtn");
      expect(saveBtn).toHaveLength(1);
    });

    when("Add service api will called", () => {
      mockAPICall(instance, "updateUserServicesApiCallId", getServiceResponse);
    });

    then("Services api will called successfuly", () => {
      expect(findByTestID(userWrapper, "goBackBtn")).toHaveLength(1);
    });

    when("User click on the cancel button", () => {
      let cancelBtn = findByTestID(userWrapper, "cancelBtn");
      cancelBtn.simulate("click");
    });

    then("User will be go back to the my account", () => {
      let cancelBtn = findByTestID(userWrapper, "cancelBtn");
      expect(cancelBtn).toHaveLength(1);
    });

    when("User click on the yes button in the modal", () => {
      findByTestID(userWrapper, "cancelModal").prop("handleYesButtonClick")();
    });

    then("user notary service add api will called", () => {
      let cancelBtn = findByTestID(userWrapper, "cancelBtn");
      expect(cancelBtn).toHaveLength(1);
    });

    when("Add service api will called again", () => {
      mockAPICall(instance, "updateUserServicesApiCallId", response);
    });

    then("Services api will called successfuly again", () => {
      expect(findByTestID(userWrapper, "goBackBtn")).toHaveLength(1);
      instance.goBack();
    });
  });
});
