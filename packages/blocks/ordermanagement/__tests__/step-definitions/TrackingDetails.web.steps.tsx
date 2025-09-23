import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TrackingDetails from "../../src/TrackingDetails.web";

jest.mock('../../../../framework/src/Utilities', () => ({
    getStorageData: jest.fn(),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  }));

const screenProps = {
  navigation: {goBack: jest.fn()},
  id: "TrackingDetails",
  email: "qwert@gmail.com"
};

const feature = loadFeature(
  "./__tests__/features/TrackingDetails-scenario.web.feature"
);

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  const { receive: MockRecieve } =  instance
  MockRecieve("", msgSucessRestAPI)
}

const submitResponseJson = {
  "id":20,
  "message":"Tracking details added successfully."
};

const getResponseJson = {
  "data": [
    {
      "id": "20",
      "type": "tracking_detail",
      "attributes": {
        "shipment_provider_name": "jhb",
        "tracking_number": "jbjb",
        "additional_notes": "",
        "added_by": " ",
        "added_by_email": "qwert@gmail.com",
        "added_date": "2024-10-03T07:17:20.036Z"
      }
    },
    {
      "id": "19",
      "type": "tracking_detail",
      "attributes": {
        "shipment_provider_name": "kjdchkd",
        "tracking_number": "ljhlkdjc343544rkmvlkdnvlkfnkdr",
        "additional_notes": "jbfjvfv\n\n\n\nFvd\nvDVfd\nvdvdfv\nv\nddG\nffvvfv\nfdv\nfdvfdvfdvfdvdfvdfvfdvdfvmnhvkjshdjshbc\ndjvhcbfjvhbj\n\njk",
        "added_by": " ",
        "added_by_email": "",
        "added_date": "2024-10-03T06:25:51.536Z"
      }
    }
  ]
};

const editResponseJson = {
  "id":20,
  "message":"Tracking details updated successfully."
};

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TrackingDetails", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: TrackingDetails;

    given("I am a User loading TrackingDetails", () => {
      exampleBlockA = shallow(<TrackingDetails {...screenProps} />);
    });

    when("I navigate to the TrackingDetails", () => {
      instance = exampleBlockA.instance() as TrackingDetails;
    });
    then("TrackingDetails will load with out errors", () => {
      expect(findByTestID(exampleBlockA, "trackingDetails")).toHaveLength(1);
    });

    when("User clicks on add tracking details button", () => {
      findByTestID(exampleBlockA, "addTrackingDetailsButton").simulate("click");
    });
    then("Add tracking details modal will open", () => {
      expect(exampleBlockA.find(".trackingDetailsPaper")).toHaveLength(1);
    });

    when("User clicks on cancel button", () => {
      findByTestID(exampleBlockA, "cancelButton").simulate("click");
    });
    then("Add tracking details modal will close", () => {
      expect(findByTestID(exampleBlockA, "trackingDetails")).toHaveLength(1);
    });

    when("User clicks on add tracking details button", () => {
      findByTestID(exampleBlockA, "addTrackingDetailsButton").simulate("click");
    });
    then("Add tracking details modal will open", () => {
      expect(exampleBlockA.find(".trackingDetailsPaper")).toHaveLength(1);
    });

    when("User adds shipment provider name", () => {
      findByTestID(exampleBlockA, "shipmentProviderNameField").simulate("change", { target: { value: "Bluedart" } });
    });
    then("shipment provider name is entered", () => {
      expect(findByTestID(exampleBlockA, "shipmentProviderNameField").props().value).toBe("Bluedart");
    });

    when("User leaves tracking number empty", () => {
      findByTestID(exampleBlockA, "trackingNumberField").simulate("change", { target: { value: "" } });
    });
    then("tracking number is empty", () => {
      expect(findByTestID(exampleBlockA, "trackingNumberField").props().value).toBe("");
    });

    when("User adds tracking number", () => {
      findByTestID(exampleBlockA, "trackingNumberField").simulate("change", { target: { value: "ABCD1234" } });
    });
    then("tracking number is entered", () => {
      expect(findByTestID(exampleBlockA, "trackingNumberField").props().value).toBe("ABCD1234");
    });

    when("User adds additional note", () => {
      findByTestID(exampleBlockA, "additionalNoteField").simulate("change", { target: { value: "Something" } });
    });
    then("additional note is entered", () => {
      expect(findByTestID(exampleBlockA, "additionalNoteField").props().value).toBe("Something");
    });

    when("User clicks on submit button", () => {
      findByTestID(exampleBlockA, "submitButton").simulate("click");
      mockAPICall(instance, "submitTrackingDetailsApiCallId", submitResponseJson)
      mockAPICall(instance, "getTrackingDetailsApiCallId", getResponseJson);
    });
    then("Tracking details are submitted", () => {
      expect(exampleBlockA.find(".saveModalPaper")).toHaveLength(1);
    });

    when("User clicks on close icon", () => {
      findByTestID(exampleBlockA, "closeIconButton").simulate("click");
    });
    then("Success modal closes", () => {
      expect(findByTestID(exampleBlockA, "trackingDetails")).toHaveLength(1);
    });

    when("user clicks on edit button", () => {
      findByTestID(exampleBlockA, "editTrackingDetailsButton").simulate("click");
    });
    then("edit form opens", () => {
      expect(exampleBlockA.find(".trackingDetailsPaper")).toHaveLength(1);
    });

    when("User edits shipment provider name", () => {
      findByTestID(exampleBlockA, "shipmentProviderNameField").simulate("change", { target: { value: "Bluedart" } });
    });
    then("shipment provider name is entered", () => {
      expect(findByTestID(exampleBlockA, "shipmentProviderNameField").props().value).toBe("Bluedart");
    });

    when("User edits tracking number", () => {
      findByTestID(exampleBlockA, "trackingNumberField").simulate("change", { target: { value: "ABCD1234" } });
    });
    then("tracking number is entered", () => {
      expect(findByTestID(exampleBlockA, "trackingNumberField").props().value).toBe("ABCD1234");
    });

    when("User edits additional note", () => {
      findByTestID(exampleBlockA, "additionalNoteField").simulate("change", { target: { value: "Something" } });
    });
    then("additional note is entered", () => {
      expect(findByTestID(exampleBlockA, "additionalNoteField").props().value).toBe("Something");
    });

    when("User clicks on submit button", () => {
      findByTestID(exampleBlockA, "submitButton").simulate("click");
      mockAPICall(instance, "editTrackingDetailsApiCallId", editResponseJson)
      mockAPICall(instance, "getTrackingDetailsApiCallId", getResponseJson);
    });
    then("Tracking details are updated", () => {
      expect(exampleBlockA.find(".saveModalPaper")).toHaveLength(1);
    });

    when("User clicks on close icon", () => {
      findByTestID(exampleBlockA, "closeIconButton").simulate("click");
    });
    then("Success modal closes", () => {
      expect(findByTestID(exampleBlockA, "trackingDetails")).toHaveLength(1);
    });
    then("User sees the tracking number", () => {
      expect(findByTestID(exampleBlockA, "trackingNumberTest")).toHaveLength(1);
    })

    when("User clicks on add more button", () => {
      findByTestID(exampleBlockA, "addMoreButton").simulate("click");
    });
    then("add tracking details modal opens", () => {
      expect(exampleBlockA.find(".trackingDetailsPaper")).toHaveLength(1);
    });

    when("User clicks on close icon", () => {
      findByTestID(exampleBlockA, "closeIconButton").simulate("click");
    });
    then("Success modal closes", () => {
      expect(findByTestID(exampleBlockA, "trackingDetails")).toHaveLength(1);
    });

    when("User expands the accordion", () => {
      findByTestID(exampleBlockA, "detailAccordion").simulate("change", {}, false);
      findByTestID(exampleBlockA, "detailAccordion").simulate("change", {}, true);
    });
    then("Accordion is expanded", () => {
      expect(findByTestID(exampleBlockA, "accordionDetails")).toHaveLength(1);
    })
  });
});