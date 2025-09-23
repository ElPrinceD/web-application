import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import DocuSignSuccess from "../../src/DocuSignSuccess.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

const screenProps = {
  navigation: {goBack: jest.fn()},
  id: "DocuSignSuccess",
};

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

const generateSigningUrlResponseJson = {
  sign_url: null
}

const statusUpdateFailedResponse = {
  errors: "Docusign failed"
}

const statusUpdateSuccessResponse = {
  message: "Docusign success"
}

const feature = loadFeature(
  "./__tests__/features/DocuSignSuccess-scenario.web.feature"
);

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to DocuSignSuccess", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: DocuSignSuccess;

    given("I am a User loading DocuSignSuccess", () => {
      exampleBlockA = shallow(<DocuSignSuccess {...screenProps} />);
    });

    when("I navigate to the DocuSignSuccess", () => {
      instance = exampleBlockA.instance() as DocuSignSuccess;
    });
    then("DocuSignSuccess will load with out errors", () => {
      expect(findByTestID(exampleBlockA, "docuSignSuccess")).toHaveLength(1);
    });

    when("docusign status update has failed", () => {
      mockAPICall(instance, "documentSignedApiCallId", statusUpdateFailedResponse);
    });
    then("failure popup is shown", () => {
      expect(findByTestID(exampleBlockA, "checkStatusButton")).toHaveLength(1);
    });

    when("docusign status update is success", () => {
      mockAPICall(instance, "documentSignedApiCallId", statusUpdateSuccessResponse);
    });
    then("success popup is shown", () => {
      expect(findByTestID(exampleBlockA, "checkStatusButton")).toHaveLength(1);
    });

    when("user clicks on check status button", () => {
        Object.defineProperty(window, "parent", {
            value: {
                location: {
                    href: "RequestDetails"
                },
            },
            writable: true,
          });
        findByTestID(exampleBlockA, "checkStatusButton").simulate("click");
    });
    then("page will unmount", () => {
        expect(findByTestID(exampleBlockA, "docuSignSuccess")).toHaveLength(1);
    });
  });

    test("User navigates to DocuSignSuccess page", ({ given, when, then }) => {
      let exampleBlockA: ShallowWrapper;
      let instance: DocuSignSuccess;
      jest.mock("../../../../framework/src/Utilities", () => ({
        getStorageData: jest.fn().mockImplementationOnce(() => {
          return Promise.resolve("envId")
        }).mockImplementationOnce(() => {
          return Promise.resolve('envId')
        }).mockImplementation(() => {
          return Promise.resolve('envId')
        }),
        setStorageData: jest.fn(),
        removeStorageData: jest.fn()
      }));

    given("I am a User loading DocuSignSuccess", () => {
      exampleBlockA = shallow(<DocuSignSuccess {...screenProps} />);
    });

    when("I navigate to the DocuSignSuccess", () => {
      instance = exampleBlockA.instance() as DocuSignSuccess;
    });
    then("DocuSignSuccess will load with out errors", () => {
      expect(findByTestID(exampleBlockA, "docuSignSuccess")).toHaveLength(1);
    });

    when("docusign generate Url api is called", () => {
      instance.generateSigningUrls();
      mockAPICall(instance, "generateSigningUrlsApiCallId", generateSigningUrlResponseJson);
    });
    then("signingUrls are generated", () => {
      expect(findByTestID(exampleBlockA, "checkStatusButton")).toHaveLength(1);
    });
  });
});