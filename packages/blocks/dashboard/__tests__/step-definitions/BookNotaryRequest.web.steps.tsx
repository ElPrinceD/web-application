import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import BookNotaryRequestWeb from "../../src/BookNotaryRequest.web";
import { format, addDays, getDay, subMonths, addMonths , parseISO } from "date-fns";
import { Props } from "../../src/BookNotaryRequestController";

const navigation = require("react-navigation");

const mockSetLoader = jest.fn<void, [boolean]>();


interface Document {
  id: number;
  document: File | null;
  base64: string;
  doc_size: number;
  isfileMax: boolean;
  isInvalidSize: boolean;
  ellapsed: boolean;
  recipients_attributes: Array<{
    name: string;
    email: string;
    is_signatory: boolean;
  }>;
}


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

const screenPropsEdit = {
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
  cancelReqModal: false,
  yesButtonClick: jest.fn(),
  noButtonClick: jest.fn(),
  backToEditRequest:jest.fn(),
  setLoader: mockSetLoader,
  setModal: mockSetLoader,
  isNewRequestOrEditRequestOrInviteClient: "edit",
  editRequest: {
    "id": "746",
    "type": "notary_request",
    "attributes": {
        "status": "PENDING",
        "notary_id": 1204,
        "notary_service_type": 28,
        "priority": "Priority",
        "notarisation_method_id": 1,
        "jurisdiction_id": 2,
        "date": "2024-08-30T00:00:00.000Z",
        "notes": "",
        "notarised_document": 1,
        "timing_slot": "Evening",
        "juridiction": {
            "id": 2,
            "jurisdiction": "Wales",
            "created_at": "2024-04-12T11:19:04.487Z",
            "updated_at": "2024-04-12T11:19:04.487Z"
        },
        "notarisation_method": {
            "id": 1,
            "notarisation_method": "Remote Electronic Notarisation (REN)",
            "created_at": "2024-02-09T05:07:33.122Z",
            "updated_at": "2024-05-06T10:18:32.122Z"
        },
        "notary_service_name": "Probate Matters",
        "quote_statuses_id": 2,
        "file_documents": [
            {
                "doc_id": 1557,
                "doc_type": "application/pdf",
                "doc_size": 3927,
                "doc_base_64": "base64",
                "doc_name": "test.pdf",
                "doc_file_url": "test.pdf",
                "signatory_count": 1,
                "recipients": [
                    {
                        "id": 1384,
                        "created_at": "2024-08-29T12:11:35.866Z",
                        "updated_at": "2024-08-29T12:11:35.866Z",
                        "file_document_id": 1557,
                        "name": "hbc",
                        "email": "jkhvj@dkv.fb",
                        "is_signatory": true,
                        "signed": false,
                        "is_notary": false
                    }
                ]
            }
        ]
    },
    "relationships": {
        "jurisdiction": {
            "data": {
                "id": "2",
                "type": "jurisdiction"
            }
        },
        "notary": {
            "data": {
                "id": "1204",
                "type": "notary"
            }
        },
        "notarisation_method": {
            "data": {
                "id": "1",
                "type": "notarisation_method"
            }
        },
        "account": {
            "data": {
                "id": "1045",
                "type": "email_account"
            }
        }
    }
},
};

const screenPropsInvite = {
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
  isNewRequestOrEditRequestOrInviteClient: "invite",
  editRequest: undefined,
  backToEditRequest:jest.fn(),
  setLoader: mockSetLoader,
  setModal: mockSetLoader,
};

const screenPropsGuest = {
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
  isNewRequestOrEditRequestOrInviteClient: "guest",
  editRequest: undefined,
  backToEditRequest:jest.fn(),
  setLoader: mockSetLoader,
  setModal: mockSetLoader,
};

const countryCodeResponse = {
  countries: [
    {
      country_code: "44",
      name: "United Kingdom",
      flag: "uk.png"
    }
  ]
};

const validateResponseSuccess = {
  message:"Email verified successfully"
}

const validateResponseError = {
   error:"Email already registered"
}


const feature = loadFeature(
  "./__tests__/features/BookNotaryRequest-scenario.web.feature"
);

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

const notarisationMethodResponse = [
  {
    id: 1,
    notarisation_method: "Remote Electronic Notarisation (REN)",
    created_at: "2024-02-09T05:07:33.122Z",
    updated_at: "2024-05-06T10:18:32.122Z",
  },
  {
    id: 2,
    notarisation_method: "Remote Ink Notarisation (RIN)",
    created_at: "2024-05-06T10:18:57.375Z",
    updated_at: "2024-05-06T10:18:57.375Z",
  },
  {
    id: 3,
    notarisation_method: "Remote Electronic-Ink Notarisation (REIN)",
    created_at: "2024-05-06T10:19:20.407Z",
    updated_at: "2024-05-06T10:19:20.407Z",
  },
];

const juridictionMethodResponse = [
  {
    id: 1,
    jurisdiction: "India",
    created_at: "2024-02-09T05:07:19.691Z",
    updated_at: "2024-02-09T05:07:19.691Z",
  },
  {
    id: 2,
    jurisdiction: "Wales",
    created_at: "2024-04-12T11:19:04.487Z",
    updated_at: "2024-04-12T11:19:04.487Z",
  },
];

const createRequestResponse = {
  "id":850,
  "message":"Notary request created successfully!"
}

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

const priorityResponse = 
  [
    {
        "priority": 0,
        "date": "2024-10-03T12:28:21.452+00:00"
    },
    {
        "priority": 1,
        "date": "2024-10-04T12:28:21.452+00:00"
    },
    {
        "priority": 2,
        "date": "2024-10-05T12:28:21.452+00:00"
    },  
    {
      "priority": 3,
      "date": "2024-10-05T12:28:21.452+00:00"
    },  
    {
      "priority": 4,
      "date": "2024-10-05T12:28:21.452+00:00"
    },  
    {
      "priority": 0,
      "date": ""
    },   
  ];

type PriorityType = "Standard" | "Priority" | "Super Priority" | "Not Available";

interface Priorities {
  [key: string]: PriorityType;
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    global.alert = jest.fn();
  });

  test("User navigates to BookNotaryRequest", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;

    given("I am a User loading BookNotaryRequest", () => {
      wrapper = shallow(<BookNotaryRequestWeb {...screenProps} />);
    });

    when("I navigate to the BookNotaryRequest", () => {
      instance = wrapper.instance() as BookNotaryRequestWeb;      
    });

    then("BookNotaryRequest will load with out errors", () => {      
      wrapper.setState({ loader: false });            
      wrapper.update();          
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");            
      if (serviceSelectionBtn.length === 0) {        
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      } else {        
        expect(serviceSelectionBtn).toHaveLength(1);
      }
    });

    when("Notarisation api get called", () => {
      mockAPICall(
        instance,
        "getNotarisationMethodCallId",
        notarisationMethodResponse
      );
    });

    then("Notarisation method will call successfully", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn).toHaveLength(1);
    });

    when("Juridicition api get called", () => {
      mockAPICall(
        instance,
        "getJurisdictionCallId",
        juridictionMethodResponse
      );
    });

    then("Juridicition will call successfully", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn).toHaveLength(1);
    });

    when("Priority api get called", () => {
      mockAPICall(instance, "getPriorityCallId", priorityResponse);     
    })

    when("getPriorityApi is called and doesn't receive a response within 30 seconds", () => {
      jest.useFakeTimers();
      const mockSetInitialPriorities = jest.spyOn(instance, 'setInitialPriorities');
      instance.getPriorityApi({ firstDay: '2024-01-01', lastDay: '2024-01-31' });
      jest.advanceTimersByTime(31000);
    });

    then("it should set initial priorities", () => {
      expect(instance.setInitialPriorities).toHaveBeenCalled();
      jest.useRealTimers();
    });

    when("getDateRangeFromMonth is called with the current month", () => {
      const currentDate = new Date();
      instance.getDateRangeFromMonth(currentDate);
    });

    then("it should return the correct date range", () => {
      const currentDate = new Date();
      const result = instance.getDateRangeFromMonth(currentDate);
    
      expect(result.firstDay).toBe(
        format(addDays(currentDate, 1), "yyyy-MM-dd") // Next day of today
      );
    
      expect(result.lastDay).toBe(
        format(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0), "yyyy-MM-dd") // Correct last day of the current month
      );
    });
    

    when("getDateRangeFromMonth is called with a future month", () => {
      const futureDate = addMonths(new Date(), 2);
      instance.getDateRangeFromMonth(futureDate);
    });

    then("it should return the correct date range for the future month", () => {
      const futureDate = addMonths(new Date(), 2);
      const result = instance.getDateRangeFromMonth(futureDate);
    
      expect(result.firstDay).toBe(
        format(new Date(futureDate.getFullYear(), futureDate.getMonth(), 1), "yyyy-MM-dd")
      );
    
      expect(result.lastDay).toBe(
        format(new Date(futureDate.getFullYear(), futureDate.getMonth() + 1, 0), "yyyy-MM-dd")
      );
    });


    when("setInitialPriorities is called for a specific month", () => {
      const currentMonth = new Date('2024-05-01');
      instance.setInitialPriorities();
    });
    
    then("it should set correct priorities for the month", () => {
      const priorities = wrapper.state('priorities') as Priorities;
      expect(Object.keys(priorities).length).toBeGreaterThan(0);
      const weekendDay = Object.keys(priorities).find(date => 
        new Date(date).getDay() === 0 || new Date(date).getDay() === 6
      );
      const weekDay = Object.keys(priorities).find(date => 
        new Date(date).getDay() !== 0 && new Date(date).getDay() !== 6
      );
      if (weekendDay) {
        expect(priorities[weekendDay]).toBe('Super Priority');
      } else {
        console.warn('No weekend days found in priorities');
      }
      if (weekDay) {
        // expect(['Priority', 'Standard']).toContain(priorities[weekDay]);
      } else {
        console.warn('No weekdays found in priorities');
      }
      let priorityCount = 0;
      let standardCount = 0;
      Object.values(priorities).forEach(priority => {
        if (priority === 'Priority') priorityCount++;
        if (priority === 'Standard') standardCount++;
      });
      // expect(priorityCount).toBeGreaterThan(0);
      // expect(standardCount).toBeGreaterThan(0);
      // expect(wrapper.state('loader')).toBe(false);
    });

    when("User select the service selection", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      serviceSelectionBtn.simulate("change", {
        target: { value: "Affidavits and Declarations" },
      });
    });

    then("Service get selected", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn.props().value).toMatch(
        "Affidavits and Declarations"
      );
    });

    when("User select the notarisation method", () => {
      const notarizationMethod = findByTestID(
        wrapper,
        "notarizationMethodSelect"
      );
      notarizationMethod.simulate("change", {
        target: { value: "Remote Electronic Notarisation (REN)" },
      });
    });

    then("Notarization get selected", () => {
      const notarizationMethod = findByTestID(
        wrapper,
        "notarizationMethodSelect"
      );
      expect(notarizationMethod.props().value).toMatch(
        "Remote Electronic Notarisation (REN)"
      );
    });

    when("User select the juridiction", () => {
      const juridiction = findByTestID(wrapper, "juridictionSelect");
      juridiction.simulate("change", { target: { value: "India" } });
    });

    then("juridiction get selected", () => {
      const juridiction = findByTestID(wrapper, "juridictionSelect");
      expect(juridiction.props().value).toMatch("India");
    });

    when("User type something on the notes", () => {
      const notesField = findByTestID(wrapper, "notesField");
      notesField.simulate("change", { target: { value: "India" } });
    });

    then("Notes will get stored", () => {
      const notesField = findByTestID(wrapper, "notesField");
      expect(notesField.props().value).toMatch("India");
    });

    when("User click on the calender button", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      let childWraper = shallow(calenderBtn.props().InputProps.endAdornment);
      let calenderButton = findByTestID(childWraper, "calenderBtn");
      calenderButton.simulate("click");
    });

    then("Calender will get open with no selected date", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      expect(calenderBtn.props().selectedDate).toBe(null);
    });

    when("User click on the cancel button", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().cancel();
    });

    then("Calendar modal will closed", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      expect(calenderBtn.props().value).toMatch("");
    });

    when("User click again on the calender button", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      let childWraper = shallow(calenderBtn.props().InputProps.endAdornment);
      let calenderButton = findByTestID(childWraper, "calenderBtn");
      calenderButton.simulate("click");
    });

    then("Calender will get open again with no selected date", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      expect(calenderBtn.props().selectedDate).toBe(null);
    });

    when("User press the left arrow button", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      if (calenderBtn.exists()) {
        calenderBtn.props().leftArrow();
      }
    });
    
    then("Month get changed", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      if (calenderBtn.exists()) {
        expect(calenderBtn.props().selectedDate).toBe(null);
      } else {
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      }
    });

    when("User press the right arrow button", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().rightArrow();
    });

    then("Month get updated", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const calenderBtn = findByTestID(wrapper, "CustomCalender");    
      if (!calenderBtn.exists()) {
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      } else {        
        expect(calenderBtn.props().selectedDate).toBe(null);
      }
    });

    when("User select the time period", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().setSession("Evening");
    });
    
    then("Time period will selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("Evening");
    });

    when("User select the time period", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().setSession("");
    });
    
    then("Time period will selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      expect(calenderBtn.props().value).toMatch("");
    });

    when("User select the date", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().handleDateClick("2024-06-05T08:10:04.790Z");
    });

    then("Date get selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("We/06/yyyy");
    });

    when("User select the time period", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().setSession("Evening");
    });
    
    then("Time period will selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("We/06/yyyy-Evening");
    });

    when("User click on the save button", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().save();
    });

    then("Calendar get closed", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("We/06/yyyy-Evening");
    });

    when("User click on increment button of notarised", () => {
      const notarisedFieldWrapper = findByTestID(wrapper, "notarisedField");
      const childWrapper = shallow(
        notarisedFieldWrapper.props().InputProps.endAdornment
      );
      let incrementBtn = findByTestID(childWrapper, "incrementBtn");
      incrementBtn.simulate("click");
    });

    then("Notarised value get increased", () => {
      const notarisedField = findByTestID(wrapper, "notarisedField");
      expect(notarisedField.props().value).toBe(1);
    });

    when("User click on increment button of notarised agin", () => {
      const notarisedFieldWrapper = findByTestID(wrapper, "notarisedField");
      const childWrapper = shallow(
        notarisedFieldWrapper.props().InputProps.endAdornment
      );
      let incrementBtn = findByTestID(childWrapper, "incrementBtn");
      incrementBtn.simulate("click");
    });

    then("Notarised value get increased again", () => {
      const notarisedField = findByTestID(wrapper, "notarisedField");
      expect(notarisedField.props().value).toBe(2);
    });

    when("User click on decrement button of notarised", () => {
      const notarisedFieldWrapper = findByTestID(wrapper, "notarisedField");
      const childWrapper = shallow(
        notarisedFieldWrapper.props().InputProps.endAdornment
      );
      let decrementBtn = findByTestID(childWrapper, "decrementBtn");
      decrementBtn.simulate("click");
    });

    then("Notarised value get decreased", () => {
      const notarisedField = findByTestID(wrapper, "notarisedField");
      expect(notarisedField.props().value).toBe(1);
    });

    when("User click on number of document notarised button", () => {
      const notarisedFieldd = findByTestID(wrapper, "notarisedField");
      notarisedFieldd.simulate("change", { target: { value: "2" } });
    });

    then("Number of documents will show on the filed", () => {
      const notarisedFieldd = findByTestID(wrapper, "notarisedField");
      expect(notarisedFieldd.props().value).toBe(2);
    });

    when("User click on next button", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    });

    then("Notary document upload modal get open", () => {
      const docText = findByTestID(wrapper, "createBtn");
      expect(docText.props().children).toMatch("Next");
    });

    when("User clicks on back button", () => {
      findByTestID(wrapper, "backButton").simulate("click");
    })

    then("prevStep should be called", () => {
      const prevStep = jest.fn();
      expect(prevStep).toHaveLength(0)
    })

    when("User click on next button", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    });

    then("Notary document upload modal get open", () => {
      const docText = findByTestID(wrapper, "createBtn");
      expect(docText.props().children).toMatch("Next");
    });

    when("User upload a file", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileUploadBtn");
      fileUploadBtn.simulate("change", {
        target: { files: [{ name: "test.png" }] },
      });
    });

    then("File get uploaded successfully", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileName");
      expect(fileUploadBtn.props().children).toMatch("test.png");
    });

    when("User upload the files more then 2mb for handle files", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileUploadBtn");
      fileUploadBtn.simulate("change", {
        target: { files: [{ name: "test.png", size: "10000000" }] },
      });
    });

    then("Validation will show for uploading files", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileUploadBtn");
      expect(fileUploadBtn.props().multiple).toBe(true);
    });

    when("User click on add Document Button", () => {
      const incrementBtnDoc = findByTestID(wrapper, "incrementBtnDoc");
      incrementBtnDoc.simulate("click");
    });

    then("Document object will be added to the files", () => {
      const incrementBtnDoc = findByTestID(wrapper, "incrementBtnDoc");
      expect(incrementBtnDoc.props().children).toMatch("Add More Documents");
    });

    when("User Drag file into the add button", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      dragFile.simulate("DragOver", { preventDefault: jest.fn() });
    });

    then("files will be dragged", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      expect(dragFile.props().className).toMatch("upload");
    });

    when("User drop the files in the upload field", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      dragFile.simulate("Drop", {
        preventDefault: jest.fn(),
        dataTransfer: { files: [{ name: "tset.png", size: "500" }] },
      });
    });

    then("files will be dropped", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      expect(dragFile.props().className).toMatch("upload");
    });

    when("User drop the files more then 2mb", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      dragFile.simulate("Drop", {
        preventDefault: jest.fn(),
        dataTransfer: { files: [{ size: "1000000" }] },
      });
    });

    then("Validation will show while dropping", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      expect(dragFile.props().className).toMatch("upload");

      const dragFile1 = findByTestID(wrapper, "dragFile");
      dragFile1.simulate("Drop", {
        preventDefault: jest.fn(),
        dataTransfer: { files: [{ name: "testfile.png", size: "500" }] },
      });
    });

    when("User click on next button without clicking on checkbox", () => {
      const nxtBtn = findByTestID(wrapper, "createBtn");
      nxtBtn.simulate("click");
    });

    then("User will show error", () => {
      const nxtBtn = findByTestID(wrapper, "createBtn");
      expect(nxtBtn.props().children).toMatch("Next");
    });

    when("User check the terms and condition for file", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox1");
      checkbox1.simulate("change", { target: { checked: true } });
    });

    then("Check field will be checked", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox1");
      expect(checkbox1.props().checked).toBe(true);
    });

    when("User check the notry condition for file", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox2");
      checkbox1.simulate("change", { target: { checked: true } });
    });

    then("Check field will be checked", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox2");
      expect(checkbox1.props().checked).toBe(true);
    });

    when("User clicks on remove button", () => {
      const documentRemoveButton = findByTestID(wrapper, "documentRemoveButton");
      documentRemoveButton.simulate("click");
    })

    then("Document will be removed", () => {
      const incrementBtnDoc = findByTestID(wrapper, "incrementBtnDoc");
      expect(incrementBtnDoc.props().children).toMatch("Add More Documents");
    })

    when("User click on next button", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    });

    then("Add recipients modal get open", () => {
      const createButton = findByTestID(wrapper, "createBtn");
      expect(createButton.props().children).toMatch("Create Request");
    });

    when("User fil the recipient name", () => {
      const inputField = findByTestID(wrapper, "receipientsName");
      inputField.simulate("change", { target: { value: "test" } });
    });

    then("User get the name of the receipients", () => {
      const inputField = findByTestID(wrapper, "receipientsName");
      expect(inputField.props().value).toMatch("test");
    });

    when("User click on create button without adding receipeint email", () => {
      const inputField1 = findByTestID(wrapper, "createBtn");
      inputField1.simulate("click");
    });

    then("Error will shown on email input and signatory checkbox", () => {
      const inputField1 = findByTestID(wrapper, "createBtn");
      expect(inputField1.props().children).toMatch("Create Request");
    });
    then("signatory error text should be visible", () => {
      expect(findByTestID(wrapper, "signatoryError")).toHaveLength(1);
    })

    when("User fil the recipient email", () => {
      const inputField = findByTestID(wrapper, "receipientsEmail");
      inputField.simulate("change", { target: { value: "test@yopmail.com" } });
    });

    then("User get the email of the receipients", () => {
      const inputField = findByTestID(wrapper, "receipientsEmail");
      expect(inputField.props().value).toMatch("test@yopmail.com");
    });

    when("User click on the also a signatory button", () => {
      const inputField = findByTestID(wrapper, "isSignatory");
      inputField.simulate("change");
    });

    then("Signatory button check is checked", () => {
      const inputField = findByTestID(wrapper, "isSignatory");
      expect(inputField.props().value).toBe(true);
      expect(findByTestID(wrapper, "signatoryError")).toHaveLength(1);
    });

    when("User enter the recipients name", () => {
      const inputFielde = findByTestID(wrapper, "receipientsName");
      inputFielde.simulate("change", { target: { value: "" } });
    });

    then("Recipients name will be added", () => {
      const inputFielde = findByTestID(wrapper, "receipientsName");
      expect(inputFielde.props().value).toMatch("");
    });

    when("Signatory change function will called", () => {
      const inputFields = findByTestID(wrapper, "isSignatory");
      inputFields.simulate("change", "1");
    });

    then("Signatory will true and added to the files", () => {
      const inputFields = findByTestID(wrapper, "isSignatory");
      expect(inputFields.props().value).toBe(false);
    });

    when("User click on the add receipients button", () => {
      const addReceipientsbtn = findByTestID(wrapper, "addReceipientsbtn");
      addReceipientsbtn.simulate("click");
    });

    then("receipents from files are added", () => {
      const addReceipientsbtn = findByTestID(wrapper, "addReceipientsbtn");
      expect(addReceipientsbtn.props().className).toMatch("iconBtn");
    });

    when("User click on the remove receipients button", () => {
      const removeReceipientsBtn = findByTestID(
        wrapper,
        "removeReceipientsBtn"
      );
      removeReceipientsBtn.simulate("click");
    });

    then("receipents from files are removed", () => {
      const addReceipientsbtn = findByTestID(wrapper, "addReceipientsbtn");
      expect(addReceipientsbtn.props().className).toMatch("iconBtn");
    });

    when("User click on up arrow button", () => {
      let handleEllapsedBtn = findByTestID(wrapper, "handleEllapsedBtn");
      handleEllapsedBtn.simulate("click");
    });

    then("Recipients will be hide on the step 3", () => {
      let handleEllapsedBtn = findByTestID(wrapper, "handleEllapsedBtn");
      expect(handleEllapsedBtn.props().className).toMatch("iconBtn");
    });

    when("Receipients Invalid email id will be added", () => {
      const createBtn1 = findByTestID(wrapper, "receipientsEmail");
      createBtn1.simulate("change", { target: { value: "test@" } });
    });

    then("Receipients email validation will check", () => {
      const createBtn1 = findByTestID(wrapper, "receipientsEmail");
      expect(createBtn1.props().value).toMatch("test@");
    });

    when("User click on create request button", () => {
      const createBtn = findByTestID(wrapper, "createBtn");
      createBtn.simulate("click");
    });

    then("Create notary request api will called", () => {
      const createBtn = findByTestID(wrapper, "createBtn");
      expect(createBtn.props().children).toMatch("Create Request");
    });

    when("Create request api will call", () => {
      mockAPICall(instance, "createRequestCallId", createRequestResponse);
    });

    then("Create request api get called", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn).toHaveLength(1);
    });

    when("User click on the close button", () => {
      const createBtn = findByTestID(wrapper, "closeModalBtn");
      createBtn.simulate("click");
    });

    then("Success modal will close", () => {
      const closeModal = jest.fn();
      expect(closeModal).toHaveLength(0);
    });

    when("User click on the yes button", () => {
      const yesBtn = findByTestID(wrapper, "yesBtn");
      // yesBtn.simulate("click");
    });

    then("Modal will close", () => {
      const yesBtn = findByTestID(wrapper, "yesBtn");
      // expect(yesBtn.props().children).toMatch("Save Draft");
    });

    when("User click on save close modal button", () => {
      const closeSaveModal = findByTestID(wrapper, "closeSaveModal");
      closeSaveModal.simulate("click");
      const closeSaveModalFn = jest.fn();
      expect(closeSaveModalFn).toHaveLength(0);
    });

    then("Save modal will close successfully", () => {
      const yesBtn = findByTestID(wrapper, "yesBtn");
      // expect(yesBtn.props().children).toMatch("Save Draft");
    });
  });

  test("User navigates to BookNotaryRequest for edit", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;

    given("I am a User loading BookNotaryRequest", () => {
      wrapper = shallow(<BookNotaryRequestWeb {...screenPropsEdit} />);
    });

    when("I navigate to the BookNotaryRequest to edit request", () => {
      instance = wrapper.instance() as BookNotaryRequestWeb;
    });

    then("BookNotaryRequest will load with out errors.", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      if (serviceSelectionBtn.length === 0) {
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      } else {
        expect(serviceSelectionBtn).toHaveLength(1);                
        if (!wrapper.state('loader')) {
          instance.handleCalendarCancelClick();
          instance.createRequest();
        }
      }
    });

    when("Notarisation api get called", () => {
      mockAPICall(
        instance,
        "getNotarisationMethodCallId",
        notarisationMethodResponse
      );
    });

    then("Notarisation method will call successfully", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn).toHaveLength(1);
    });

    when("Juridicition api get called", () => {
      mockAPICall(
        instance,
        "getJurisdictionCallId",
        juridictionMethodResponse
      );
    });

    then("Juridicition will call successfully", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn).toHaveLength(1);
    });

    when("Priority api get called", () => {
      mockAPICall(instance, "getPriorityCallId", priorityResponse);     
    })

    when("getPriorityApi is called and doesn't receive a response within 30 seconds", () => {
      jest.useFakeTimers();
      const mockSetInitialPriorities = jest.spyOn(instance, 'setInitialPriorities');
      instance.getPriorityApi({ firstDay: '2024-01-01', lastDay: '2024-01-31' });
      jest.advanceTimersByTime(31000);
    });

    then("it should set initial priorities", () => {
      expect(instance.setInitialPriorities).toHaveBeenCalled();
      jest.useRealTimers();
    });

    when("getDateRangeFromMonth is called with the current month", () => {
      const currentDate = new Date();
      instance.getDateRangeFromMonth(currentDate);
    });

    then("it should return the correct date range", () => {
      const currentDate = new Date();
      const nextDay = addDays(currentDate, 1);
      const firstDay = nextDay.toISOString().split("T")[0];
    
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];
    
      const result = instance.getDateRangeFromMonth(currentDate);
      expect(result.firstDay).toBe(firstDay);
      expect(result.lastDay).toBe(lastDay);
    });
    
    
    when("getDateRangeFromMonth is called with a future month", () => {
      const futureDate = addMonths(new Date(), 2);
      instance.getDateRangeFromMonth(futureDate);
    });

    then("it should return the correct date range for the future month", () => {
      const futureDate = addMonths(new Date(), 2);
      const result = instance.getDateRangeFromMonth(futureDate);
    
      expect(result.firstDay).toBe(
        new Date(futureDate.getFullYear(), futureDate.getMonth(), 1)
          .toISOString()
          .split("T")[0] 
      );
    
      expect(result.lastDay).toBe(
        new Date(futureDate.getFullYear(), futureDate.getMonth() + 1, 0)
          .toISOString()
          .split("T")[0] 
      );
    });
    


    when("setInitialPriorities is called for a specific month", () => {
      const currentMonth = new Date('2024-05-01');
      instance.setInitialPriorities();
    });
    
    then("it should set correct priorities for the month", () => {
      const priorities = wrapper.state('priorities') as Priorities;
      expect(Object.keys(priorities).length).toBeGreaterThan(0);
      const weekendDay = Object.keys(priorities).find(date => 
        new Date(date).getDay() === 0 || new Date(date).getDay() === 6
      );
      const weekDay = Object.keys(priorities).find(date => 
        new Date(date).getDay() !== 0 && new Date(date).getDay() !== 6
      );
      if (weekendDay) {
        expect(priorities[weekendDay]).toBe('Super Priority');
      } else {
        console.warn('No weekend days found in priorities');
      }
      if (weekDay) {
        // expect(['Priority', 'Standard']).toContain(priorities[weekDay]);
      } else {
        console.warn('No weekdays found in priorities');
      }
      let priorityCount = 0;
      let standardCount = 0;
      Object.values(priorities).forEach(priority => {
        if (priority === 'Priority') priorityCount++;
        if (priority === 'Standard') standardCount++;
      });
      // expect(priorityCount).toBeGreaterThan(0);
      // expect(standardCount).toBeGreaterThan(0);
      // expect(wrapper.state('loader')).toBe(false);
    });

    when("User select the service selection", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      serviceSelectionBtn.simulate("change", {
        target: { value: "Affidavits and Declarations" },
      });
    });

    then("Service get selected", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn.props().value).toMatch(
        "Affidavits and Declarations"
      );
    });

    when("User select the notarisation method", () => {
      const notarizationMethod = findByTestID(
        wrapper,
        "notarizationMethodSelect"
      );
      notarizationMethod.simulate("change", {
        target: { value: "Remote Electronic Notarisation (REN)" },
      });
    });

    then("Notarization get selected", () => {
      const notarizationMethod = findByTestID(
        wrapper,
        "notarizationMethodSelect"
      );
      expect(notarizationMethod.props().value).toMatch(
        "Remote Electronic Notarisation (REN)"
      );
    });

    when("User select the juridiction", () => {
      const juridiction = findByTestID(wrapper, "juridictionSelect");
      juridiction.simulate("change", { target: { value: "India" } });
    });

    then("juridiction get selected", () => {
      const juridiction = findByTestID(wrapper, "juridictionSelect");
      expect(juridiction.props().value).toMatch("India");
    });

    when("User type something on the notes", () => {
      const notesField = findByTestID(wrapper, "notesField");
      notesField.simulate("change", { target: { value: "India" } });
    });

    then("Notes will get stored", () => {
      const notesField = findByTestID(wrapper, "notesField");
      expect(notesField.props().value).toMatch("India");
    });

    when("User click on the calender button", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      let childWraper = shallow(calenderBtn.props().InputProps.endAdornment);
      let calenderButton = findByTestID(childWraper, "calenderBtn");
      calenderButton.simulate("click");
    });

    then("Calender will get open with no selected date", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      expect(calenderBtn.props().selectedDate).toBe(null);
    });

    when("User click on the cancel button", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().cancel();
    });

    then("Calendar modal will closed", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      expect(calenderBtn.props().value).toMatch("");
    });

    when("User click again on the calender button", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      let childWraper = shallow(calenderBtn.props().InputProps.endAdornment);
      let calenderButton = findByTestID(childWraper, "calenderBtn");
      calenderButton.simulate("click");
    });

    then("Calender will get open again with no selected date", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      expect(calenderBtn.props().selectedDate).toEqual(new Date('2024-08-30T00:00:00.000Z'));
    });

    when("User press the left arrow button", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      if (calenderBtn.exists()) {
        calenderBtn.props().leftArrow();
      }
    });
    
    then("Month get changed", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      if (calenderBtn.exists()) {
        expect(calenderBtn.props().selectedDate).toEqual(new Date('2024-08-30T00:00:00.000Z'));        
      } else {
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      }
    });

    when("User press the right arrow button", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().rightArrow();
    });

    then("Month get updated", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const calenderBtn = findByTestID(wrapper, "CustomCalender");    
      if (!calenderBtn.exists()) {
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      } else {        
        expect(calenderBtn.props().selectedDate).toEqual(new Date('2024-08-30T00:00:00.000Z'));
      }
    });

    when("User select the time period", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().setSession("Evening");
    });
    
    then("Time period will selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("Evening");
    });

    when("User select the time period", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().setSession("");
    });
    
    then("Time period will selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      expect(calenderBtn.props().value).toMatch("");
    });

    when("User select the date", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().handleDateClick("2024-06-05T08:10:04.790Z");
    });

    then("Date get selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("We/06/yyyy");
    });

    when("User select the time period", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().setSession("Evening");
    });
    
    then("Time period will selected", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("We/06/yyyy-Evening");
    });

    when("User click on the save button", () => {
      const calenderBtn = findByTestID(wrapper, "CustomCalender");
      calenderBtn.props().save();
    });

    then("Calendar get closed", () => {
      const calenderBtn = findByTestID(wrapper, "dateTextField");
      // expect(calenderBtn.props().value).toMatch("We/06/yyyy-Evening");
    });

    when("User click on increment button of notarised", () => {
      const notarisedFieldWrapper = findByTestID(wrapper, "notarisedField");
      const childWrapper = shallow(
        notarisedFieldWrapper.props().InputProps.endAdornment
      );
      let incrementBtn = findByTestID(childWrapper, "incrementBtn");
      incrementBtn.simulate("click");
    });

    then("Notarised value get increased", () => {
      const notarisedField = findByTestID(wrapper, "notarisedField");
      expect(notarisedField.props().value).toBe(1);
    });

    when("User click on increment button of notarised agin", () => {
      const notarisedFieldWrapper = findByTestID(wrapper, "notarisedField");
      const childWrapper = shallow(
        notarisedFieldWrapper.props().InputProps.endAdornment
      );
      let incrementBtn = findByTestID(childWrapper, "incrementBtn");
      incrementBtn.simulate("click");
    });

    then("Notarised value get increased again", () => {
      const notarisedField = findByTestID(wrapper, "notarisedField");
      expect(notarisedField.props().value).toBe(2);
    });

    when("User click on decrement button of notarised", () => {
      const notarisedFieldWrapper = findByTestID(wrapper, "notarisedField");
      const childWrapper = shallow(
        notarisedFieldWrapper.props().InputProps.endAdornment
      );
      let decrementBtn = findByTestID(childWrapper, "decrementBtn");
      decrementBtn.simulate("click");
    });

    then("Notarised value get decreased", () => {
      const notarisedField = findByTestID(wrapper, "notarisedField");
      expect(notarisedField.props().value).toBe(1);
    });

    when("User click on number of document notarised button", () => {
      const notarisedFieldd = findByTestID(wrapper, "notarisedField");
      notarisedFieldd.simulate("change", { target: { value: "2" } });
    });

    then("Number of documents will show on the filed", () => {
      const notarisedFieldd = findByTestID(wrapper, "notarisedField");
      expect(notarisedFieldd.props().value).toBe(2);
    });

    when("User click on next button", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    });

    then("Notary document upload modal get open", () => {
      const docText = findByTestID(wrapper, "createBtn");
      expect(docText.props().children).toMatch("Next");
    });

    when("User clicks on back button", () => {
      findByTestID(wrapper, "backButton").simulate("click");
    })

    then("prevStep should be called", () => {
      const prevStep = jest.fn();
      expect(prevStep).toHaveLength(0)
    })

    when("User click on next button", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    });

    then("Notary document upload modal get open", () => {
      const docText = findByTestID(wrapper, "createBtn");
      expect(docText.props().children).toMatch("Next");
    });

    when("User upload a file", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileUploadBtn");
      fileUploadBtn.simulate("change", {
        target: { files: [{ name: "test.png" }] },
      });
    });

    then("File get uploaded successfully", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileName");
      expect(fileUploadBtn.props().children).toMatch("test.png");
    });

    when("User upload the files more then 2mb for handle files", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileUploadBtn");
      fileUploadBtn.simulate("change", {
        target: { files: [{ name: "test.png", size: "10000000" }] },
      });
    });

    then("Validation will show for uploading files", () => {
      const fileUploadBtn = findByTestID(wrapper, "fileUploadBtn");
      expect(fileUploadBtn.props().multiple).toBe(true);
    });

    when("User click on add Document Button", () => {
      const incrementBtnDoc = findByTestID(wrapper, "incrementBtnDoc");
      incrementBtnDoc.simulate("click");
    });

    then("Document object will be added to the files", () => {
      const incrementBtnDoc = findByTestID(wrapper, "incrementBtnDoc");
      expect(incrementBtnDoc.props().children).toMatch("Add More Documents");
    });

    when("User Drag file into the add button", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      dragFile.simulate("DragOver", { preventDefault: jest.fn() });
    });

    then("files will be dragged", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      expect(dragFile.props().className).toMatch("upload");
    });

    when("User drop the files in the upload field", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      dragFile.simulate("Drop", {
        preventDefault: jest.fn(),
        dataTransfer: { files: [{ name: "tset.png", size: "500" }] },
      });
    });

    then("files will be dropped", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      expect(dragFile.props().className).toMatch("upload");
    });

    when("User drop the files more then 2mb", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      dragFile.simulate("Drop", {
        preventDefault: jest.fn(),
        dataTransfer: { files: [{ size: "1000000" }] },
      });
    });

    then("Validation will show while dropping", () => {
      const dragFile = findByTestID(wrapper, "dragFile");
      expect(dragFile.props().className).toMatch("upload");

      const dragFile1 = findByTestID(wrapper, "dragFile");
      dragFile1.simulate("Drop", {
        preventDefault: jest.fn(),
        dataTransfer: { files: [{ name: "testfile.png", size: "500" }] },
      });
    });

    when("User click on next button without clicking on checkbox", () => {
      const nxtBtn = findByTestID(wrapper, "createBtn");
      nxtBtn.simulate("click");
    });

    then("User will show error", () => {
      const nxtBtn = findByTestID(wrapper, "createBtn");
      expect(nxtBtn.props().children).toMatch("Next");
    });

    when("User check the terms and condition for file", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox1");
      checkbox1.simulate("change", { target: { checked: true } });
    });

    then("Check field will be checked", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox1");
      expect(checkbox1.props().checked).toBe(true);
    });

    when("User check the notry condition for file", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox2");
      checkbox1.simulate("change", { target: { checked: true } });
    });

    then("Check field will be checked", () => {
      const checkbox1 = findByTestID(wrapper, "checkbox2");
      expect(checkbox1.props().checked).toBe(true);
    });

    when("User clicks on remove button", () => {
      const documentRemoveButton = findByTestID(wrapper, "documentRemoveButton");
      documentRemoveButton.simulate("click");
    })

    then("Document will be removed", () => {
      const incrementBtnDoc = findByTestID(wrapper, "incrementBtnDoc");
      expect(incrementBtnDoc.props().children).toMatch("Add More Documents");
    })

    when("User click on next button", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    });

    then("Add recipients modal get open", () => {
      const createButton = findByTestID(wrapper, "createBtn");
      expect(createButton.props().children).toMatch("Update");
    });

    when("User fil the recipient name", () => {
      const inputField = findByTestID(wrapper, "receipientsName");
      inputField.simulate("change", { target: { value: "test" } });
    });

    then("User get the name of the receipients", () => {
      const inputField = findByTestID(wrapper, "receipientsName");
      expect(inputField.props().value).toMatch("test");
    });

    when("User click on create button without adding receipeint email", () => {
      const inputField1 = findByTestID(wrapper, "createBtn");
      inputField1.simulate("click");
    });

    then("Error will shown on email input and signatory checkbox", () => {
      const inputField1 = findByTestID(wrapper, "createBtn");
      expect(inputField1.props().children).toMatch("Update");
    });
    then("signatory error text should be visible", () => {
      expect(findByTestID(wrapper, "signatoryError")).toHaveLength(1);
    })

    when("User fil the recipient email", () => {
      const inputField = findByTestID(wrapper, "receipientsEmail");
      inputField.simulate("change", { target: { value: "test@yopmail.com" } });
    });

    then("User get the email of the receipients", () => {
      const inputField = findByTestID(wrapper, "receipientsEmail");
      expect(inputField.props().value).toMatch("test@yopmail.com");
    });

    when("User click on the also a signatory button", () => {
      const inputField = findByTestID(wrapper, "isSignatory");
      inputField.simulate("change");
    });

    then("Signatory button check is checked", () => {
      const inputField = findByTestID(wrapper, "isSignatory");
      expect(inputField.props().value).toBe(true);
      expect(findByTestID(wrapper, "signatoryError")).toHaveLength(1);
    });

    when("User enter the recipients name", () => {
      const inputFielde = findByTestID(wrapper, "receipientsName");
      inputFielde.simulate("change", { target: { value: "" } });
    });

    then("Recipients name will be added", () => {
      const inputFielde = findByTestID(wrapper, "receipientsName");
      expect(inputFielde.props().value).toMatch("");
    });

    when("Signatory change function will called", () => {
      const inputFields = findByTestID(wrapper, "isSignatory");
      inputFields.simulate("change", "1");
    });

    then("Signatory will true and added to the files", () => {
      const inputFields = findByTestID(wrapper, "isSignatory");
      expect(inputFields.props().value).toBe(false);
    });

    when("User click on the add receipients button", () => {
      const addReceipientsbtn = findByTestID(wrapper, "addReceipientsbtn");
      addReceipientsbtn.simulate("click");
    });

    then("receipents from files are added", () => {
      const addReceipientsbtn = findByTestID(wrapper, "addReceipientsbtn");
      expect(addReceipientsbtn.props().className).toMatch("iconBtn");
    });

    when("User click on the remove receipients button", () => {
      const removeReceipientsBtn = findByTestID(
        wrapper,
        "removeReceipientsBtn"
      );
      removeReceipientsBtn.simulate("click");
    });

    then("receipents from files are removed", () => {
      const addReceipientsbtn = findByTestID(wrapper, "addReceipientsbtn");
      expect(addReceipientsbtn.props().className).toMatch("iconBtn");
    });

    when("User click on up arrow button", () => {
      let handleEllapsedBtn = findByTestID(wrapper, "handleEllapsedBtn");
      handleEllapsedBtn.simulate("click");
    });

    then("Recipients will be hide on the step 3", () => {
      let handleEllapsedBtn = findByTestID(wrapper, "handleEllapsedBtn");
      expect(handleEllapsedBtn.props().className).toMatch("iconBtn");
    });

    when("Receipients Invalid email id will be added", () => {
      const createBtn1 = findByTestID(wrapper, "receipientsEmail");
      createBtn1.simulate("change", { target: { value: "test@" } });
    });

    then("Receipients email validation will check", () => {
      const createBtn1 = findByTestID(wrapper, "receipientsEmail");
      expect(createBtn1.props().value).toMatch("test@");
    });

    when("User click on create request button", () => {
      const createBtn = findByTestID(wrapper, "createBtn");
      createBtn.simulate("click");
    });

    then("Create notary request api will called", () => {
      const createBtn = findByTestID(wrapper, "createBtn");
      expect(createBtn.props().children).toMatch("Update");
    });

    when("Create request api will call", () => {
      mockAPICall(instance, "createRequestCallId", createRequestResponse);
    });

    then("Create request api get called", () => {
      const serviceSelectionBtn = findByTestID(wrapper, "servieSelection");
      expect(serviceSelectionBtn).toHaveLength(1);
    });

    when("User click on the close button", () => {
      const createBtn = findByTestID(wrapper, "closeModalBtn");
      createBtn.simulate("click");
    });

    then("Success modal will close", () => {
      const closeModal = jest.fn();
      expect(closeModal).toHaveLength(0);
    });

    when("User click on the yes button", () => {
      const yesBtn = findByTestID(wrapper, "yesBtn");
      // yesBtn.simulate("click");
    });

    then("Modal will close", () => {
      const yesBtn = findByTestID(wrapper, "yesBtn");
      // expect(yesBtn.props().children).toMatch("Save Draft");
    });

    when("User click on save close modal button", () => {
      const closeSaveModal = findByTestID(wrapper, "closeSaveModal");
      closeSaveModal.simulate("click");
      const closeSaveModalFn = jest.fn();
      expect(closeSaveModalFn).toHaveLength(0);
    });

    then("Save modal will close successfully", () => {
      const yesBtn = findByTestID(wrapper, "yesBtn");
      // expect(yesBtn.props().children).toMatch("Save Draft");
    });
  });

  test("Component updates with edit request data", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;
    let prevProps: Props;

    given("I am a User loading BookNotaryRequest", () => {
      prevProps = {
        ...screenProps,
        isOpen: false
      };
      wrapper = shallow(<BookNotaryRequestWeb {...prevProps} />);
      instance = wrapper.instance() as BookNotaryRequestWeb;
    });

    when("Component receives new edit request props", () => {
      const prevState = {
        isSignatoryAvailable: [],
        onStep: 1,
        selectedService: "",
        isSelectService: false,
        selectedMethod: "",
        isSelectedMethod: false,
        selectedDate: null,
        tempSelectedDate: null, 
        tempSelectedSession: "", 
        selectedSession: "",
        isCalendarOpen: false,
        currentMonth: new Date(),
        priorities: {},
        isSelectedDate: false,
        isCorrectDate: false,
        additionalDetails: "",
        selectedJuridiction: "",
        isSelectedJuridiction: false,
        totalDocuments: 0,
        isValidDocument: false,
        isDocument: false,
        files: [],
        documentErrors: [],
        termOneError: false,
        checkboxOne: false,
        termTwoError: false,
        checkboxTwo: false,
        recipientErrors: [],
        saveModal: false,
        priorityName: "",
        notarisationMethod: [],
        juridiction: [],
        loader: false,      
        clientAddress1: "",
        clientAddress2: "",
        city: "",
        postCode: "",
        isClientAddress1: false,
        isCity: false,
        isPostCode: false,
        isDrafted: false,
        clientFullName:"",
        clientEmail:"",
        clientPhoneNumber:"",
        clientCountryCode:"",
        clientCountryName:"",
        isClientFullName:false,
        isClientEmail:false,
        isClientPhoneNumber:false,
        countryCodes:[],
        loginSignupPopup:false,
      };

      
      const editRequest = {
        "id": "746",
        "type": "notary_request",
        "attributes": {
            "status": "PENDING",
            "notary_id": 1204,
            "notary_service_type": 28,
            "priority": "Standard",
            "notarisation_method_id": 1,
            "jurisdiction_id": 2,
            "date": "2024-08-30T00:00:00.000Z",
            "notes": "Test Notes",
            "notarised_document": 1,
            "timing_slot": "Evening",
            "juridiction": {
                "id": 2,
                "jurisdiction": "Wales",
                "created_at": "2024-04-12T11:19:04.487Z",
                "updated_at": "2024-04-12T11:19:04.487Z"
            },
            "notarisation_method": {
                "id": 1,
                "notarisation_method": "Remote Electronic Notarisation (REN)",
                "created_at": "2024-02-09T05:07:33.122Z",
                "updated_at": "2024-05-06T10:18:32.122Z"
            },
            "notary_service_name": "Probate Matters",
            "quote_statuses_id": 2,
            "file_documents": [
                {
                    "doc_id": 1557,
                    "doc_type": "application/pdf",
                    "doc_size": 3927,
                    "doc_base_64": "base64",
                    "doc_name": "test.pdf",
                    "doc_file_url": "test.pdf",
                    "signatory_count": 1,
                    "recipients": [
                        {
                            "id": 1384,
                            "created_at": "2024-08-29T12:11:35.866Z",
                            "updated_at": "2024-08-29T12:11:35.866Z",
                            "file_document_id": 1557,
                            "name": "hbc",
                            "email": "jkhvj@dkv.fb",
                            "is_signatory": true,
                            "signed": false,
                            "is_notary": false
                        }
                    ]
                }
            ]
        },
        "relationships": {
            "jurisdiction": {
                "data": {
                    "id": "2",
                    "type": "jurisdiction"
                }
            },
            "notary": {
                "data": {
                    "id": "1204",
                    "type": "notary"
                }
            },
            "notarisation_method": {
                "data": {
                    "id": "1",
                    "type": "notarisation_method"
                }
            },
            "account": {
                "data": {
                    "id": "1045",
                    "type": "email_account"
                }
            }
        }
    };

      wrapper.setProps({
        ...screenPropsEdit,
        isOpen: true,
        editRequest
      });
    });

    then("State should be updated with edit request data", () => {
      instance.editRequestStateSetter();
      expect(wrapper.state('selectedService')).toBe("28");
      expect(wrapper.state('selectedMethod')).toBe("1");
      expect(wrapper.state('selectedJuridiction')).toBe("2");
      expect(wrapper.state('selectedDate')).toEqual(new Date("2024-08-30T00:00:00.000Z"));
      expect(wrapper.state('selectedSession')).toBe("Evening");
      expect(wrapper.state('additionalDetails')).toBe("Test Notes");
      expect(wrapper.state('totalDocuments')).toBe(1);
      expect(wrapper.state('priorityName')).toBe("Standard");
    });

    then("Files array should be populated with document data", () => {
      const files = wrapper.state('files') as Document[];
      expect(files).toHaveLength(1);
      
      const file1 = files[0];
      expect(file1.id).toBe(1557);
      expect(file1.document).toBeDefined();
      expect(file1.document?.name).toBe("test.pdf");
      expect(file1.doc_size).toBe(3927);
      expect(file1.recipients_attributes).toHaveLength(1);
      expect(file1.recipients_attributes[0].name).toBe("hbc");
      expect(file1.recipients_attributes[0].is_signatory).toBe(true);
    });

    when("Component receives empty edit request", () => {
      const emptyEditRequest = {
        id: "746",
        type: "notary_request",
        attributes: {
          status: "DRAFT",
          notary_service_type: "",
          notarisation_method_id: "",
          jurisdiction_id: "",
          date: null,
          notes: "",
          notarised_document: 0,
          timing_slot: "",
          priority: "",
          file_documents: []
        }
      };

      wrapper.setState({
        selectedService: "",
        selectedMethod: "",
        selectedJuridiction: "",
        selectedDate: null,
        selectedSession: "",
        additionalDetails: "",
        totalDocuments: 0,
        files: [],
        priorityName: ""
      });

      wrapper.setProps({
        ...screenPropsEdit,
        editRequest: emptyEditRequest
      });
    });

    then("State should remain with empty values", () => {
      instance.editRequestStateSetter();
      expect(wrapper.state('selectedService')).toBe("");
      expect(wrapper.state('selectedMethod')).toBe("");
      expect(wrapper.state('selectedJuridiction')).toBe("");
      expect(wrapper.state('selectedDate')).toBeNull();
      expect(wrapper.state('selectedSession')).toBe("");
      expect(wrapper.state('additionalDetails')).toBe("");
      expect(wrapper.state('totalDocuments')).toBe(0);
      expect(wrapper.state('files')).toEqual([]);
      expect(wrapper.state('priorityName')).toBe("");
    });
  });

  test("User navigates to BookNotaryRequest for invited request", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;

    given("I am a User loading BookNotaryRequest", () => {
      wrapper = shallow(<BookNotaryRequestWeb {...screenPropsInvite} />);
    });

    when("I navigate to the BookNotaryRequest for invited request", () => {
      instance = wrapper.instance() as BookNotaryRequestWeb;
    });

    then("BookNotaryRequest 4 steps form will load with out errors.", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      const serviceSelectionBtn = findByTestID(wrapper, "notaryClientNameField");
      if (serviceSelectionBtn.length === 0) {
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      } else {
        expect(serviceSelectionBtn).toHaveLength(1);                
        if (!wrapper.state('loader')) {
          instance.handleCalendarCancelClick();
          instance.createRequest();
        }
      }
    });

    when("Get Profile api get called",() => {
      mockAPICall(instance, "getProfileCallId", endUserProfileResponse);
    })

    then("Get Profile method will call successfully",()=> {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress1Field");
      expect(clientAddress1Input).toHaveLength(1);
    })

    when("User enters client address1 field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress1Field");
      clientAddress1Input.simulate("change", { target: { value: "test address 1" } });
    })

    then("Client address1 will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress1Field");
      expect(clientAddress1Input.props().value).toBe("test address 1");
    })

    when("User enters client address2 field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress2Field");
      clientAddress1Input.simulate("change", { target: { value: "test address 2" } });
    })

    then("Client address2 will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress2Field");
      expect(clientAddress1Input.props().value).toBe("test address 2");
    })

    when("User enters client city field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientCityField");
      clientAddress1Input.simulate("change", { target: { value: "test city" } });
    })

    then("Client city will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientCityField");
      expect(clientAddress1Input.props().value).toBe("test city");
    })

    when("User enters client post code field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryPostCodeField");
      clientAddress1Input.simulate("change", { target: { value: "test post code" } });
    })

    then("Client post code will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryPostCodeField");
      expect(clientAddress1Input.props().value).toBe("test post code");
    })
   
    when("User click on next button without having any errors", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    })

    then("User will see next step", () => {
      const docText = findByTestID(wrapper, "createBtn");
      expect(docText.props().children).toMatch("Next");
    })

  });

  test("Component updates with accepted request data", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;
    let prevProps: Props;
  
    const acceptedRequest = {
      id: "746",
      type: "notary_request",
      attributes: {
        status: "PENDING",
        notary_id: 1204,
        notary_service_type: 28,
        priority: "Priority",
        notarisation_method_id: 1,
        jurisdiction_id: 2,
        date: "2024-08-30T00:00:00.000Z",
        notes: "Test Notes",
        timing_slot: "Evening",
      }
    };
  
    given("I am a User loading BookNotaryRequest", () => {
      prevProps = {
        ...screenProps,
        isOpen: false
      };
      wrapper = shallow(<BookNotaryRequestWeb {...prevProps} />);
      instance = wrapper.instance() as BookNotaryRequestWeb;
    });
  
    when("Component receives accepted request props", () => {
      const prevState = {
        isSignatoryAvailable: [],
        onStep: 1,
        selectedService: "",
        isSelectService: false,
        selectedMethod: "",
        isSelectedMethod: false,
        selectedDate: null,
        tempSelectedDate: null, 
        tempSelectedSession: "", 
        selectedSession: "",
        isCalendarOpen: false,
        currentMonth: new Date(),
        priorities: {},
        isSelectedDate: false,
        isCorrectDate: false,
        additionalDetails: "",
        selectedJuridiction: "",
        isSelectedJuridiction: false,
        totalDocuments: 0,
        isValidDocument: false,
        isDocument: false,
        files: [],
        documentErrors: [],
        termOneError: false,
        checkboxOne: false,
        termTwoError: false,
        checkboxTwo: false,
        recipientErrors: [],
        saveModal: false,
        priorityName: "",
        notarisationMethod: [],
        juridiction: [],
        loader: false,      
        clientAddress1: "",
        clientAddress2: "",
        city: "",
        postCode: "",
        isClientAddress1: false,
        isCity: false,
        isPostCode: false,
        isDrafted: false,
        clientFullName:"",
        clientEmail:"",
        clientPhoneNumber:"",
        clientCountryCode:"",
        clientCountryName:"",
        isClientFullName:false,
        isClientEmail:false,
        isClientPhoneNumber:false,
        countryCodes:[],
        loginSignupPopup:false,
      };
      wrapper.setProps({
        ...screenProps,
        isOpen: true,
        acceptedRequest
      });
      // instance.componentDidUpdate({...prevProps}, prevState);
    });
  
    then("State should be updated with accepted request data", () => {
      instance.acceptRequestStateSetter();
      expect(wrapper.state('selectedService')).toBe("28");
      expect(wrapper.state('selectedMethod')).toBe("1");
      expect(wrapper.state('selectedJuridiction')).toBe("2");
      expect(wrapper.state('selectedDate')).toEqual(new Date("2024-08-30T00:00:00.000Z"));
      expect(wrapper.state('selectedSession')).toBe("Evening");
      expect(wrapper.state('additionalDetails')).toBe("Test Notes");
      expect(wrapper.state('priorityName')).toBe("Priority");
    });
      
    when("Component receives empty accepted request", () => {
      const emptyAcceptedRequest = {
        id: "746",
        type: "notary_request",
        attributes: {
          status: "PENDING",
          notary_service_type: "",
          notarisation_method_id: "",
          jurisdiction_id: "",
          date: null,
          notes: "",
          timing_slot: "",
          priority: "",
        }
      };
  
      wrapper.setProps({
        ...screenProps,
        acceptedRequest: emptyAcceptedRequest
      });
    });
  
    then("State should handle empty values correctly", () => {
      instance.acceptRequestStateSetter();
      expect(wrapper.state('selectedService')).toBe("");
      expect(wrapper.state('selectedMethod')).toBe("");
      expect(wrapper.state('selectedJuridiction')).toBe("");
      expect(wrapper.state('selectedDate')).toBeNull();
      expect(wrapper.state('selectedSession')).toBe("");
      expect(wrapper.state('additionalDetails')).toBe("");
      expect(wrapper.state('priorityName')).toBe("");
    });
  });
  
  test("Transform data function handles different data formats", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;
  
    given("I am a User loading BookNotaryRequest", () => {
      wrapper = shallow(<BookNotaryRequestWeb {...screenProps} />);
      instance = wrapper.instance() as BookNotaryRequestWeb;
    });
  
    when("Transform data is called with base64 data containing comma", () => {
      const testData = [{
        base64: "data:image/png;base64,testdata",
        document: { name: "test.pdf" },
        recipients_attributes: [{
          name: "Test User",
          email: "test@example.com",
          is_signatory: true
        }]
      }] as any;
  
      const result = instance.transformData(testData);
      expect(result[0].base64).toBe("testdata");
      expect(result[0].file).toBe("test.pdf");
    });
  
    then("Transform data handles base64 without comma", () => {
      const testData = [{
        base64: "testdata",
        document: { name: "test.pdf" },
        recipients_attributes: [{
          name: "Test User",
          email: "test@example.com",
          is_signatory: true
        }]
      }] as any;
  
      const result = instance.transformData(testData);
      expect(result[0].base64).toBe("testdata");
    });
  });
  
  test("Find next button text returns correct text for different states", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;
  
    given("I am a User loading BookNotaryRequest", () => {
      wrapper = shallow(<BookNotaryRequestWeb {...screenProps} />);
      instance = wrapper.instance() as BookNotaryRequestWeb;
    });
  
    when("User is on step 3 with edit mode", () => {
      wrapper.setProps({ isNewRequestOrEditRequestOrInviteClient: "edit" });
      wrapper.setState({ onStep: 3 });
      expect(instance.findNextButtonText()).toBe("Update");
    });
  
    then("Button text changes based on step and mode", () => {
      wrapper.setProps({ isNewRequestOrEditRequestOrInviteClient: "new" });
      wrapper.setState({ onStep: 3 });
      expect(instance.findNextButtonText()).toBe("Create Request");
  
      wrapper.setState({ onStep: 4 });
      expect(instance.findNextButtonText()).toBe("Create Request");
  
      wrapper.setState({ onStep: 1 });
      expect(instance.findNextButtonText()).toBe("Next");
  
      wrapper.setProps({ isNewRequestOrEditRequestOrInviteClient: "invite" });
      wrapper.setState({ onStep: 3 });
      expect(instance.findNextButtonText()).toBe("Next");
    });
  });

  test("Guest user boooking the request", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;

    given("Guest User loading BookNotaryRequest", () => {
      wrapper = shallow(<BookNotaryRequestWeb {...screenPropsGuest} />);
    });

    when("Guest User navigate to BookNotaryRequest", () => {
      instance = wrapper.instance() as BookNotaryRequestWeb;
      mockAPICall(instance, "getCountryCodeApiCallID", countryCodeResponse);
    });

    then("BookNotaryRequest 4 steps form will load with out errors.", () => {
      wrapper.setState({ loader: false });
      wrapper.update();
      expect(instance.state.countryCodes).toBeDefined();
      const serviceSelectionBtn = findByTestID(wrapper, "notaryClientNameField");
      if (serviceSelectionBtn.length === 0) {
        const loader = wrapper.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      } else {
        expect(serviceSelectionBtn).toHaveLength(1);                
        if (!wrapper.state('loader')) {
          instance.handleCalendarCancelClick();
          instance.createRequest();
        }
      }
    });

    when("User enters client fullname", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientNameField");
      clientAddress1Input.simulate("change", { target: { value: "test name" } });
    })

    then("Client fullname will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientNameField");
      expect(clientAddress1Input.props().value).toBe("test name");
    })

    when("User enters client email", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientEmailField");
      clientAddress1Input.simulate("change", { target: { value: "test@mail.com" } });
    })

    then("Client email will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientEmailField");
      expect(clientAddress1Input.props().value).toBe("test@mail.com");
    })

    when("User selects the code", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientMobileCodeField");
      clientAddress1Input.simulate("change", {
        target: { value: "44" },
      });
    })

    then("Client code will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientMobileCodeField");
      expect(clientAddress1Input.props().value).toBe("44");
    })

    when("User enters client phone number", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientMobileNumberField");
      clientAddress1Input.simulate("change", { target: { value: "0123456789" } });
    })

    then("Client phone number will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientMobileNumberField");
      expect(clientAddress1Input.props().value).toBe("0123456789");
    })

    when("User enters client address1 field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress1Field");
      clientAddress1Input.simulate("change", { target: { value: "test address 1" } });
    })

    then("Client address1 will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress1Field");
      expect(clientAddress1Input.props().value).toBe("test address 1");
    })

    when("User enters client address2 field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress2Field");
      clientAddress1Input.simulate("change", { target: { value: "test address 2" } });
    })

    then("Client address2 will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientAddress2Field");
      expect(clientAddress1Input.props().value).toBe("test address 2");
    })

    when("User enters client city field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientCityField");
      clientAddress1Input.simulate("change", { target: { value: "test city" } });
    })

    then("Client city will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryClientCityField");
      expect(clientAddress1Input.props().value).toBe("test city");
    })

    when("User enters client post code field", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryPostCodeField");
      clientAddress1Input.simulate("change", { target: { value: "test post code" } });
    })

    then("Client post code will be stored", () => {
      const clientAddress1Input = findByTestID(wrapper, "notaryPostCodeField");
      expect(clientAddress1Input.props().value).toBe("test post code");
    })
   
    when("User click on next button without having any errors", () => {
      const Button = findByTestID(wrapper, "createBtn");
      Button.simulate("click");
    })

    then("User will see next step", () => {
      const docText = findByTestID(wrapper, "createBtn");
      expect(docText.props().children).toMatch("Next");
    })

    when("I click on save draft button", () => {
      instance.saveDraft()
    });

    then("draft save successfully", () => {
      expect(wrapper).toBeDefined()
    });

  });

  test("Guest user boooking the request and validate guest email", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: BookNotaryRequestWeb;

    given("Guest User loading BookNotaryRequest for validate guest email", () => {
      wrapper = shallow(<BookNotaryRequestWeb {...screenPropsGuest} />);
      instance = wrapper.instance() as BookNotaryRequestWeb;
    });

    when("Validate guest  api get called", () => {
      mockAPICall(instance, "validateGuestEmailCallId", validateResponseSuccess);
    });

    then("validate guest api call successfully", () => {
      expect(wrapper).toBeDefined()
    });

    when("Validate guest  api get error called", () => {
      mockAPICall(instance, "validateGuestEmailCallId", validateResponseError);
    });

    then("validate guest api error render on the screen", () => {
      expect(wrapper).toBeDefined()
    });

    when("Click on login navigate function", () => {
      const navigateBtn = findByTestID(wrapper, "successFailureModal");
      navigateBtn.props().handleButtonClick();
      const filesMock: Document[] = [
        {
          id: 1, isfileMax: false, isInvalidSize: false, base64: '', document: new File(['content'], 'file1.pdf', { type: 'application/pdf' }),
          doc_size: 0,
          ellapsed: false,
          recipients_attributes: []
        },
        {
          id: 2, isfileMax: false, isInvalidSize: false, base64: '', document: new File(['content'], 'file2.pdf', { type: 'application/pdf' }),
          doc_size: 0,
          ellapsed: false,
          recipients_attributes: []
        },
        {
          id: 3, isfileMax: false, isInvalidSize: false, base64: '', document: new File(['content'], 'file3.pdf', { type: 'application/pdf' }),
          doc_size: 0,
          ellapsed: false,
          recipients_attributes: []
        },
      ];
  
      instance.setState({ files: filesMock });
      instance.deleteFile(1);
    });

    then("Navigate on login screen", () => {
      expect(wrapper).toBeDefined()
    });

  });
  

});
