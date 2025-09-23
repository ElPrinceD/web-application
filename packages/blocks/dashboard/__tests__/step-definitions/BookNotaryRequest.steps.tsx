import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import BookNotaryRequest from "../../src/BookNotaryRequest"

const navigation = require("react-navigation");

const mockSetLoader = jest.fn<void, [boolean]>();

const screenProps = {
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
  backToEditRequest:jest.fn(),
  isNewRequestOrEditRequestOrInviteClient: "new",
  editRequest: undefined,
  setLoader: mockSetLoader,
  setModal: mockSetLoader,
};
const feature = loadFeature("./__tests__/features/BookNotaryRequest-scenario.feature");

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to BookNotaryRequest", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequest;
    given("I am a User loading BookNotaryRequest", () => {
      wrapper = shallow(<BookNotaryRequest {...screenProps} />);
    });

    when("I navigate to the BookNotaryRequest", () => {
      instance = wrapper.instance() as BookNotaryRequest;
    });

    then("BookNotaryRequest will load with out errors", () => {
      expect(findByTestID(wrapper, "view")).toHaveLength(1);
    });
  });
});
