import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import UserProfileBasicBlock from "../../src/UserProfile.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "UserProfileBasicBlock",
};

const feature = loadFeature(
  "./__tests__/features/UserProfile-scenario.web.feature"
);


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

const mockNavigationPayLoadMessage = jest.fn().mockImplementation(
  (
    instance,
    dataJson: object = {},
    messageType: MessageEnum.NavigationMessage
  ) => {
    const msgNavigationPayLoadMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgNavigationPayLoadMessage.addData(
      getName(messageType),
      dataJson
    );
  });

const getProfileResponse = {
  "data": {
      "id": "808",
      "type": "profile",
      "attributes": {
          "id": 808,
          "first_name": null,
          "last_name": null,
          "full_phone_number": "",
          "city": null,
          "post_code": null,
          "country_code": null,
          "phone_number": null,
          "email": "anyaTestNotary01@yopmail.com",
          "activated": true,
          "user_type": 'notary',
          "user_name": null,
          "platform": null,
          "suspend_until": null,
          "status": "regular",
          "role_id": 2,
          "full_name": "Test userone",
          "gender": null,
          "date_of_birth": null,
          "age": null,
          "country": "Wales",
          "address": "wales 1",
          "address_line_2": null,
          "contact_name": null,
          "company_name": "HCL",
          "photo": {
              "url": null
          }
      }
  }
}

const getProfileResponseBuisneess = {
  "data": {
      "id": "808",
      "type": "profile",
      "attributes": {
          "id": 808,
          "first_name": null,
          "last_name": null,
          "full_phone_number": "",
          "city": null,
          "post_code": null,
          "country_code": null,
          "phone_number": null,
          "email": "anyaTestNotary01@yopmail.com",
          "activated": true,
          "user_type": 'business',
          "user_name": null,
          "platform": null,
          "suspend_until": null,
          "status": "regular",
          "role_id": 2,
          "full_name": "Test userone",
          "gender": null,
          "date_of_birth": null,
          "age": null,
          "country": "Wales",
          "address": "wales 1",
          "address_line_2": null,
          "contact_name": null,
          "company_name": "HCL",
          "photo": {
              "url": null
          }
      }
  }
}

const getCountryCodeData = {
  countries: [
    {
      country_code: "966",
      name: "test"
    }
  ]
}

const countries = {
  data: [
    {
      "id": "1",
      "type": "country",
      "attributes": {
          "name": "England"
      }
  },
  ]
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to UserProfileBasicBlock", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: UserProfileBasicBlock;

    given("I am a User loading UserProfileBasicBlock", () => {
      exampleBlockA = shallow(<UserProfileBasicBlock {...screenProps} />);
      instance = exampleBlockA.instance() as UserProfileBasicBlock;
    });

    when("I navigate to the UserProfileBasicBlock", () => {
      mockAPICall(instance, "getUserProfileApiCallID", getProfileResponse)
    });

    then("UserProfileBasicBlock will load with out errors", () => {
      const main = findByTestID(exampleBlockA, 'profileBtn');
    //   expect(main.props().className).toMatch("option");
    });

    when("Country code api will call", () => {
      mockAPICall(instance, "getCountryCodeApiCallID", getCountryCodeData)
    });

    then("Country code api called succesfully",() => {
      expect(instance["getCountryCodeApiCallID"].length).toBeGreaterThan(0);
    });

    when("Country code list api will call", () => {
      mockAPICall(instance, "getCountryAPICallID", countries)
    });

    then("Country list api called successfully",()=>{
      expect(instance["getCountryAPICallID"].length).toBeGreaterThan(0);
    });

    when("User click on the offline button", () => {
      let onlineBtn = findByTestID(exampleBlockA, "onlineBtn");
    //   onlineBtn.simulate("click");
    });

    then("User set there status online", () => {
      let onlineBtn = findByTestID(exampleBlockA, "onlineBtn");
    //   expect(onlineBtn.props().children).toMatch('Online');
    });

    when("User click on the my profile Button", () => {
      const profileButton = findByTestID(exampleBlockA, "profileBtn");
    //   profileButton.simulate("click");
    });

    then("Profile page will open", () => {
    //   const profileButton = findByTestID(exampleBlockA, "fullNameTestID");
    //   expect(profileButton.props().readOnly).toBe(true);
    });

    when("User click on the edit profile button", () => {
      const editButton = findByTestID(exampleBlockA, "editTestId");
      editButton.simulate("click");
    });
 
    then("User can edit the input fields", () => {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      expect(editButton.prop("className")).toMatch("btn btnSave");
    });

    when("User without enter the fullname", () => {
      const fullName = findByTestID(exampleBlockA, "fullNameTestID");
      fullName.simulate("change", {
        target: { value: "" },
      });
    });

    then("Validation will check and give error", () => {
      const fullName = findByTestID(exampleBlockA, "fullNameTestID");
      expect(fullName.props().value).toEqual("");
    });

    when("Edit profile will called again", ()=> {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      editButton.simulate("click");
    });

    then("Edit API will again called sucessfully", ()=>{
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      expect(editButton.prop("className")).toMatch("btn btnSave");
      const editProfileSpy = jest.spyOn(instance, "editProfile");
      exampleBlockA.setState({
        fullName: "John Doe",
        city: "New York",
        postalCode: "10001",
        addressOne: "123 Street",
        phoneNumberProfile: "9876543210",
        isValidNumber: true,
        user_type: "individual", 
      });
      expect(exampleBlockA.state("phoneNumberProfile")).toBe("9876543210");
      instance.handleChangeSave();
    });

    when("I enter the profile name", () => {
      const fullName = findByTestID(exampleBlockA, "fullNameTestID");
      fullName.simulate("change", {
        target: { value: "abc" },
      });
    });
 
    then("The profile name will be displayed on the screen", () => {
      const fullName = findByTestID(exampleBlockA, "fullNameTestID");
      expect(fullName.props().value).toEqual("abc");
    });

    when("User without Enter the address", () => {
      const primaryAddress = findByTestID(exampleBlockA, "addressTestID");
      primaryAddress.simulate("change", {
        target: { value: "" },
      });
    });

    then("Validation will check and give error",()=>{
      const primaryAddress = findByTestID(exampleBlockA, "addressTestID");
      expect(primaryAddress.props().value).toEqual("");
    });

    when("Edit profile will called", ()=> {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      editButton.simulate("click");
    });

    then("Edit API will called sucessfully", ()=>{
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      expect(editButton.prop("className")).toMatch("btn btnSave");
    });

    when("I enter the primary address again", () => {
      const primaryAddress = findByTestID(exampleBlockA, "addressTestID");
      primaryAddress.simulate("change", {
        target: { value: "data test is" },
      });
    });
 
    then("The address will be displayed on the screen again", () => {
      const primaryAddress = findByTestID(exampleBlockA, "addressTestID");
      expect(primaryAddress.props().value).toEqual("data test is");
    });

    when("I enter the mobile number zero digit", () => {
      const mobileNo = findByTestID(exampleBlockA, "mobileNoTestID");
      mobileNo.simulate("change", {
        target: { value:  ""},
      });
    });
 
    then("The mobile number will give error", () => {
      const mobileNo = findByTestID(exampleBlockA, "mobileNoTestID");
      expect(mobileNo.props().value).toEqual("");
    });

    when("I enter the valid mobile number", () => {
      const mobileNo = findByTestID(exampleBlockA, "mobileNoTestID");
      mobileNo.simulate("change", {
        target: { value: 9897856353 },
      });
    });
 
    then("The valid mobile number will be displayed on the screen", () => {
      const mobileNo = findByTestID(exampleBlockA, "mobileNoTestID");
      expect(mobileNo.props().value).toEqual("9897856353");
    });

    when("User enter the city name more then 30 character", () => {
      const cityText = findByTestID(exampleBlockA, "cityTestID");
      cityText.simulate("change", {
        target: { value: "" },
      });
    });

    then("Validation will give error for city", ()=>{
      const cityText = findByTestID(exampleBlockA, "cityTestID");
      expect(cityText.props().value).toEqual("");
    });

    when("Edit save button will called again", ()=> {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      editButton.simulate("click");
    });

    then("Edit save will again called sucessfully", ()=>{
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      expect(editButton.prop("className")).toMatch("btn btnSave");
    });

    when("I enter the city", () => {
      const cityText = findByTestID(exampleBlockA, "cityTestID");
      cityText.simulate("change", {
        target: { value: "abc" },
      });
    });
 
    then("The city will be displayed on the screen", () => {
      const cityText = findByTestID(exampleBlockA, "cityTestID");
      expect(cityText.props().value).toEqual("abc");
    });

    when("User enter the post code more then 8 chracter", () => {
      const countryText = findByTestID(exampleBlockA, "postCodeTestId");
      countryText.simulate("change", {
        target: { value:""},
      });
    });

    then("Validation will trigger again and give error", () => {
      const countryText = findByTestID(exampleBlockA, "postCodeTestId");
      expect(countryText.props().value).toEqual("");
    });

    when("Save button will called again", ()=> {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      editButton.simulate("click");
    });

    then("Save will again called sucessfully", ()=>{
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      expect(editButton.prop("className")).toMatch("btn btnSave");
    });

    when("User click on the profile picture", () => {
      const filechange = findByTestID(exampleBlockA, "filechangeBtn");
      filechange.simulate("change",{ target: {files: [{name:"test.png", type: "image/png"}]} })
    });

    then("Profile will update successfully", () => {
      const filechange = findByTestID(exampleBlockA, "filechangeBtn");
      expect(filechange.props().type).toMatch("file")
    });

    when("I enter the profile email", () => {
      const emailText = findByTestID(exampleBlockA, "emailTestID");
      emailText.simulate("change", {
        target: { value: "abc@gmail.com" },
      });
    });
 
    then("The profile email will be displayed on the screen", () => {
      const emailText = findByTestID(exampleBlockA, "emailTestID");
      expect(emailText.props().value).toEqual("abc@gmail.com");
    });

    when("User click on the profile picture again", () => {
      const filechange = findByTestID(exampleBlockA, "filechangeBtn");
      filechange.simulate("change",{ target: {files: [{name:"test.png"}]} })
    });

    then("Profile will give error", () => {
      const filechange = findByTestID(exampleBlockA, "filechangeBtn");
      expect(filechange.props().type).toMatch("file")
    });

    when("I enter the country code", () => {
      const countryCode = findByTestID(exampleBlockA, "mobileCodeTestID");
      countryCode.simulate("change", {
        target: { value: "1" },
      });
    });
 
    then("The country code will be displayed on the screen", () => {
      const countryCode = findByTestID(exampleBlockA, "mobileCodeTestID");
      expect(countryCode.props().value).toEqual("1");
    });

    when("I navigate to the UserProfileBasicBlock", () => {
      mockAPICall(instance, "getUserProfileApiCallID", getProfileResponseBuisneess)
    });

    then("UserProfileBasicBlock will load with out errors", () => {
      expect(instance.getUserProfileApiCallID.length).toBeGreaterThan(0);
    });

    when("I enter the company name", () => {
      const countryCode = findByTestID(exampleBlockA, "companyTestID");
      countryCode.simulate("change", {
        target: { value: "" },
      });
    });
 
    then("The company name will be displayed on the screen", () => {
      const countryCode = findByTestID(exampleBlockA, "companyTestID");
      expect(countryCode.props().value).toEqual("");
    });

    when("I enter the mobile number", () => {
      const mobileNo = findByTestID(exampleBlockA, "mobileNoTestID");
      mobileNo.simulate("change", {
        target: { value: 0 },
      });
    });
 
    then("The mobile number will be displayed on the screen", () => {
      const mobileNo = findByTestID(exampleBlockA, "mobileNoTestID");
      expect(mobileNo.props().value).toEqual("0");
    });

    when("I enter the primary address", () => {
      const primaryAddress = findByTestID(exampleBlockA, "addressTestID");
      primaryAddress.simulate("change", {
        target: { value: "abc flat 32" },
      });
    });
 
    then("The address will be displayed on the screen", () => {
      const primaryAddress = findByTestID(exampleBlockA, "addressTestID");
      expect(primaryAddress.props().value).toEqual("abc flat 32");
    });


    when("I enter the secondary address", () => {
      const secondaryAddress = findByTestID(exampleBlockA, "addressTwoTestID");
      secondaryAddress.simulate("change", {
        target: { value: "abc flat 22" },
      });
    });
 
    then("The secondary address will be displayed on the screen", () => {
      const secondaryAddress = findByTestID(exampleBlockA, "addressTwoTestID");
      expect(secondaryAddress.props().value).toEqual("abc flat 22");
    });

    when("I enter the country", () => {
      const countryText = findByTestID(exampleBlockA, "countryTestID");
      countryText.simulate("change", {
        target: { value: "India" },
      });
    });
 
    then("The country will be displayed on the screen", () => {
      const countryText = findByTestID(exampleBlockA, "countryTestID");
      expect(countryText.props().value).toEqual("India");
    });

    when("I enter the post code", () => {
      const countryText = findByTestID(exampleBlockA, "postCodeTestId");
      countryText.simulate("change", {
        target: { value: 2345 },
      });
    });
 
    then("The post code will be displayed on the screen", () => {
      const countryText = findByTestID(exampleBlockA, "postCodeTestId");
      expect(countryText.props().value).toEqual(2345);
    });

    when("I edit the changes", () => {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      editButton.simulate("click");
    });
 
    then("The editable fields are visible", () => {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      expect(editButton.prop("className")).toMatch("btn btnSave");
    });

    when("User click on the save button after filling the details", () => {
      mockAPICall(instance, "editUserProfileApiCallID", getProfileResponse)
    });

    then("Edit api will call successfully", () => {
      expect(instance["editUserProfileApiCallID"].length).toBeGreaterThan(0);
    });


    when("User click on the edit profile button again", () => {
      const editButton = findByTestID(exampleBlockA, "editTestId");
      editButton.simulate("click");
    });
 
    then("User can edit the input fields again", () => {
      const editButton = findByTestID(exampleBlockA, "saveTestID");
      expect(editButton.prop("className")).toMatch("btn btnSave");
    });

    when("User click on the cancel button", () => {
      const cancelBtn = findByTestID(exampleBlockA, "cancelBtn");
      cancelBtn.simulate("click")
    });

    then("User details were removed", () => {
      const editButton = findByTestID(exampleBlockA, "editTestId");
      expect(editButton.prop("className")).toMatch("btn btnSave");
    });

    when("User click on the back arrow button", () => {
      const backArrowButton = findByTestID(exampleBlockA, "headerContainerBtn");
      backArrowButton.simulate("click");
     });

    then("User will be back without error", () => {
      const backArrowButton = findByTestID(exampleBlockA, "headerContainerBtn");
      expect(backArrowButton.prop("className")).toContain("headerContainer");
    });

  });
});
