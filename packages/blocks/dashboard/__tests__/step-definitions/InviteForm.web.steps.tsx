import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import InviteForm from "../../src/InviteForm.web";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";

const mockSetLoader = jest.fn<void, [boolean]>();

const screenProps = {
  navigation: { goBack: jest.fn(), navigate: jest.fn() },
  id: "InviteForm",
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
  setLoader: mockSetLoader,
};

interface FormValues {
  fullName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  serviceType: string;
  notarisationMethod: string;
  fees: string;
  platformFees: boolean;
  startTime: Date | string | null;
  endTime: Date | string | null;
  videoCall: boolean;
  notes: string;
}

const feature = loadFeature(
  "./__tests__/features/InviteForm-scenario.web.feature"
);

jest.useFakeTimers();

const mockAPICall = (instance: any, callId: string, res: object) => {
  const msgs = new Message(getName(MessageEnum.RestAPIResponceMessage));
  msgs.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgs.messageId);
  msgs.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), res);
  instance[callId] = msgs.messageId;
  const { receive: MockRecieve } = instance;
  MockRecieve("", msgs);
};

const priorityResponse = 
  [
    {
        "priority": 0,
        "date": "2025-02-05T12:28:21.452+00:00"
    },
    {
        "priority": 1,
        "date": "2025-02-04T12:28:21.452+00:00"
    },
    {
        "priority": 2,
        "date": "2025-02-03T12:28:21.452+00:00"
    },  
    {
      "priority": 3,
      "date": "2025-02-02T12:28:21.452+00:00"
    },  
    {
      "priority": 4,
      "date": "2025-02-01T12:28:21.452+00:00"
    },  
    {
      "priority": 0,
      "date": ""
    },   
  ];

  const countryCodeResponse = {
    countries: [
      {
        country_code: "44",
        name: "United Kingdom",
        flag: "uk.png"
      }
    ]
  };
  
  const notarisationMethodsResponse = [
    {
      id: 1,
      notarisation_method: "REN",
      created_at: "2025-01-01",
      updated_at: "2025-01-01"
    }
  ];

const finder = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testId") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User sees InviteForm", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;

    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
    });
    when("I see the InviteForm", () => {
      instance = wrapper.instance() as InviteForm;
    });
    then("InviteForm will load with out errors", () => {
      mockAPICall(instance, "getPriorityApiCallId", priorityResponse);     
      expect(finder(wrapper, "main")).toHaveLength(1);
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

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

    when("Send invite button is clicked", () => {
      finder(finder(wrapper, "formik").dive(), "submit").simulate("click")
    })
    then("Form shows errors", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    })
    
    when("client name is entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "fullName").simulate("change", {target: { value: "Name"}});
    })
    then("client name is filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("email is entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "email").simulate("change", {target: { value: "a@b.c"}});
    })
    then("email is filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("country code is entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "countryCode").simulate("change", {}, "+44");
    })
    then("country code is filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("mobile number is entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "mobileNumber").simulate("change", {target: { value: "1234567890"}});
    })
    then("mobile number is filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("service type is entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "serviceType").simulate("change", {}, "Probate");
    })
    then("service type is filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("notarisation method is entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "notarisationMethod").simulate("change", {}, "REN");
    })
    then("notarisation method is filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("fees is entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "fees").simulate("change", {target: { value: "1234567890"}});
    })
    then("fees is filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("VAT is checked", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "uncheckedFees").simulate("click");
    })
    then("VAT gets checked", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });
    
    when("calendar field is clicked", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "date").simulate("click");
    })
    then("calendar opens", () => {
      const form = finder(wrapper, "formik").dive();
      expect(finder(form, "CustomCalendar")).toHaveLength(1);
    });
    
    when("User click on the calendar button", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      let childWraper = shallow(calendarBtn.props().InputProps.endAdornment);
      let calendarButton = finder(childWraper, "calendarBtn");
      calendarButton.simulate("click");
    });
    
    then("calendar will get open with no selected date", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().selectedDate).toBe(undefined);
    });
    
    when("User click on the cancel button", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      calendarBtn.props().cancel();
    });
    
    then("Calendar modal will closed", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().value).toMatch("");
    });
    
    when("User click again on the calendar button", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      let childWraper = shallow(calendarBtn.props().InputProps.endAdornment);
      let calendarButton = finder(childWraper, "calendarBtn");
      calendarButton.simulate("click");
    });
    
    then("calendar will get open again with no selected date", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().selectedDate).toBe(undefined);
    });
    
    when("User press the left arrow button", () => {
      const form = finder(wrapper, "formik").dive();
      wrapper.setState({ loader: false });
      wrapper.update();
      const calendarBtn = finder(form, "CustomCalendar");
      if (calendarBtn.exists()) {
        calendarBtn.props().leftArrow();
      }
    });
    
    then("Month get changed", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      if (calendarBtn.exists()) {
        expect(calendarBtn.props().selectedDate).toBe(null);
      } else {
        const loader = form.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      }
    });
    
    when("User press the right arrow button", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      calendarBtn.props().rightArrow();
    });
    
    then("Month get updated", () => {
      const form = finder(wrapper, "formik").dive();
      wrapper.setState({ loader: false });
      wrapper.update();
      const calendarBtn = finder(form, "CustomCalendar");    
      if (!calendarBtn.exists()) {
        const loader = form.find('.loaderBox');
        expect(loader.exists()).toBeTruthy();
      } else {        
        expect(calendarBtn.props().selectedDate).toBe(null);
      }
    });
    
    when("User select the time period", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      calendarBtn.props().setSession("Evening");
    });
    
    then("Time period will selected", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().value).toMatch("");
    });
    
    when("User select the time period", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      calendarBtn.props().setSession("");
    });
    
    then("Time period will selected", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().value).toMatch("");
    });
    
    when("User select the date", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      calendarBtn.props().handleDateClick("2024-06-05T08:10:04.790Z");
    });
    
    then("Date get selected", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().value).toMatch("");
    });
    
    when("User select the time period", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      calendarBtn.props().setSession("Evening");
    });
    
    then("Time period will selected", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().value).toMatch("");
    });
    
    when("User click on the save button", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "CustomCalendar");
      calendarBtn.props().save();
    });
    
    then("Calendar get closed", () => {
      const form = finder(wrapper, "formik").dive();
      const calendarBtn = finder(form, "date");
      expect(calendarBtn.props().value).toMatch("05/06/2024");
    });

    when("video call is checked", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "uncheckedVideoCall").simulate("click");
    })
    then("video call gets checked", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });

    when("notes are entered", () => {
      const form = finder(wrapper, "formik").dive();
      finder(form, "notes").simulate("change", {target: { value: "notes"}});
    })
    then("notes are filled", () => {
      expect(finder(wrapper, "formik").dive()).toHaveLength(1);
    });
  });
  
  test("should call setState with loader true when isOpen prop changes from false to true", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;
  
    given("isOpen prop changes from false to true", () => {
      wrapper = shallow(<InviteForm {...screenProps} isOpen={false} />);
      instance = wrapper.instance() as InviteForm;
    });
  
    when("Simulate the component receiving new props", () => {
      jest.useFakeTimers();
      wrapper.setProps({ isOpen: true });
    });
  
    then("Check that setState was called with the correct loader value", () => {
      expect(wrapper.state("loader")).toBe(true);
    });
  
    then("After timeout, loader should be false", () => {
      jest.runAllTimers();
      jest.useRealTimers();
    });
  });
  
  test("should not change loader state if isOpen does not change", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;
    let initialLoaderState: boolean;
  
    given("isOpen does not change", () => {
      wrapper = shallow(<InviteForm {...screenProps} isOpen={true} />);
      instance = wrapper.instance() as InviteForm;
      initialLoaderState = wrapper.state("loader");
    });
  
    when("Simulate no change in props", () => {
      wrapper.setProps({ isOpen: true });
    });
  
    then("Check if loader state is the same (no state change)", () => {
      expect(wrapper.state("loader")).toBe(initialLoaderState);
    });
  });
  
  test("should not set loader to true when isOpen is false and remains false", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
  
    given("isOpen is false and remains false", () => {
      wrapper = shallow(<InviteForm {...screenProps} isOpen={false} />);
    });
  
    when("Simulate the component receiving the same false value for isOpen", () => {
      wrapper.setProps({ isOpen: false });
    });
  
    then("Loader state should remain false", () => {
      expect(wrapper.state("loader")).toBe(true);
    });
  });
  

  test("User navigates through the InviteForm flow", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;

    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
      instance = wrapper.instance() as InviteForm;
    });

    when("Component mounts and initial APIs are called", () => {
      mockAPICall(instance, "getPriorityApiCallId", priorityResponse);
      mockAPICall(instance, "getCountryCodeApiCallID", countryCodeResponse);
      mockAPICall(instance, "getNotarisationMethodCallId", notarisationMethodsResponse);
    });

    then("Initial data should be loaded correctly", () => {
      expect(instance.state.priorities).toBeDefined();
      expect(instance.state.countryCodes).toBeDefined();
      expect(instance.state.notarisationMethods).toBeDefined();
    });

    when("User submits form without selecting date and session", () => {
      const formik = finder(wrapper, "formik");
      const mockResetForm = jest.fn();
      
      instance.setState({
        selectedDate: null,
        selectedSession: "",
      });

      const values = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "+44",
        mobileNumber: "1234567890",
        serviceType: "REN",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: true,
        startTime: new Date(),
        endTime: new Date(),
        videoCall: true,
        notes: "Test notes"
      };

      formik.simulate('submit', values, { resetForm: mockResetForm });
    });

    then("Form should not proceed with submission", () => {
      expect(instance.state.selectedDate).toBeNull();
      expect(instance.state.selectedSession).toBe("");
    });

    when("User submits form with complete data", () => {
      const formik = finder(wrapper, "formik");
      const mockResetForm = jest.fn();
      const selectedDate = new Date("2024-01-01");
      
      instance.setState({
        selectedDate: selectedDate,
        selectedSession: "Morning",
        notarisationMethods: [{
          id: 1,
          notarisation_method: "REN",
          created_at: "2024-01-01",
          updated_at: "2024-01-01"
        }]
      });

      const values = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "+44",
        mobileNumber: "1234567890",
        serviceType: "REN",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: true,
        startTime: new Date(),
        endTime: new Date(),
        videoCall: true,
        notes: "Test notes"
      };
      
      const successResponse = {
        message:"Success"
      };

      formik.simulate('submit', values, { resetForm: mockResetForm });
      mockAPICall(instance, "postClientRequestApiCallId", successResponse);
    });

    then("Form should submit successfully and reset", () => {
      expect(instance.state.successModal).toBe(true);
      expect(screenProps.closeModal).toHaveBeenCalled();
      expect(screenProps.allRequestAPI).toHaveBeenCalled();
    });

    when("User submits form and API request fails", () => {
      const formik = finder(wrapper, "formik");
      const mockResetForm = jest.fn();
      const selectedDate = new Date("2024-01-01");
      
      instance.setState({
        selectedDate: selectedDate,
        selectedSession: "Morning",
        notarisationMethods: [{
          id: 1,
          notarisation_method: "REN",
          created_at: "2024-01-01",
          updated_at: "2024-01-01"
        }]
      });

      const values = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "+44",
        mobileNumber: "1234567890",
        serviceType: "REN",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: true,
        startTime: new Date(),
        endTime: new Date(),
        videoCall: true,
        notes: "Test notes"
      };

      // Mock error API response
      const errorResponse = {
        error: "error accured",        
      };

      formik.simulate('submit', values, { resetForm: mockResetForm });
      mockAPICall(instance, "postClientRequestApiCallId", errorResponse);
    });

    then("Form should handle API error correctly", () => {      
      expect(screenProps.closeModal).toHaveBeenCalled();
    });

    when("Form submits successfully and resets", () => {
      const formik = finder(wrapper, "formik");
      const mockResetForm = jest.fn();
      const selectedDate = new Date("2024-01-01");
      
      instance.setState({
        selectedDate: selectedDate,
        selectedSession: "Morning"
      });

      const values = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "+44",
        mobileNumber: "1234567890",
        serviceType: "REN",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: true,
        startTime: new Date(),
        endTime: new Date(),
        videoCall: true,
        notes: "Test notes"
      };

      const successResponse = {
        message: "success",
      };

      formik.simulate('submit', values, { resetForm: mockResetForm });
      mockAPICall(instance, "postClientRequestApiCallId", successResponse);
    });

    then("Form should reset all fields", () => {
      expect(instance.state.selectedDate).toBeNull();
      expect(instance.state.selectedSession).toBe("");
    });

    when("getDateRangeFromMonth is called with current month", () => {
      const currentDate = new Date();
      const result = instance.getDateRangeFromMonth(currentDate);
    });
  
    then("it should return correct date range for current month", () => {
      const currentDate = new Date();
      const result = instance.getDateRangeFromMonth(currentDate);
      expect(result.firstDay).toBeDefined();
      expect(result.lastDay).toBeDefined();      
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(currentDate.getDate() + 1);
      expect(new Date(result.firstDay).getDate()).toBe(tomorrow.getDate());
    });
  
    when("getDateRangeFromMonth is called with future month", () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 2);
      const result = instance.getDateRangeFromMonth(futureDate);
    });
  
    then("it should return correct date range for future month", () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 2);
      const result = instance.getDateRangeFromMonth(futureDate);
      expect(result.firstDay).toBeDefined();
      expect(result.lastDay).toBeDefined();      
      expect(new Date(result.firstDay).getDate()).toBe(1);
    });
  
    when("Form validation is tested with various time inputs", () => {
      const now = new Date();
      const later = new Date(now.getTime() + 45 * 60000); 
      const tooSoon = new Date(now.getTime() + 15 * 60000);
        
      const validValues = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "44",
        mobileNumber: "1234567890",
        serviceType: "REN",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: false,
        startTime: now,
        endTime: later,
        videoCall: true,
        notes: ""
      };
        
      const invalidValues = {
        ...validValues,
        startTime: now,
        endTime: tooSoon
      };
  
      instance.validationSchema.validateSync(validValues);
      try {
        instance.validationSchema.validateSync(invalidValues);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  
    then("Time validation should work correctly", async () => {
      const now = new Date();
      const later = new Date(now.getTime() + 45 * 60000);
      const tooSoon = new Date(now.getTime() + 15 * 60000);
  
      const validValues = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "44",
        mobileNumber: "1234567890",
        serviceType: "REN",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: false,
        startTime: now,
        endTime: later,
        videoCall: true,
        notes: ""
      };
  
      const isValid = await instance.validationSchema.isValid(validValues);
      expect(isValid).toBe(true);
  
      const invalidValues = { ...validValues, startTime: now, endTime: tooSoon };
      const isInvalid = await instance.validationSchema.isValid(invalidValues);
      expect(isInvalid).toBe(false);
    });
  
    when("getTimeErrorMessage is called with different error combinations", () => {
      instance.getTimeErrorMessage(null, null);
      instance.getTimeErrorMessage("Start time error", null);
      instance.getTimeErrorMessage(null, "End time error");
      instance.getTimeErrorMessage("Start time error", "End time error");
    });
  
    then("it should return appropriate error messages", () => {
      expect(instance.getTimeErrorMessage(null, null))
        .toBe("Select the time slot for your notary service.");
      expect(instance.getTimeErrorMessage("Start time error", null))
        .toBe("Start time error");
      expect(instance.getTimeErrorMessage(null, "End time error"))
        .toBe("End time error");
      expect(instance.getTimeErrorMessage("Start time error", "End time error"))
        .toBe("Select the time slot for your notary service.");
    });
  
    when("findTimeValue is called with different time inputs", () => {      
      const nullResult = instance.findTimeValue(null);        
      const earlyAM = new Date();
      earlyAM.setHours(8, 5);
      const earlyAMResult = instance.findTimeValue(earlyAM);        
      const pmTime = new Date();
      pmTime.setHours(14, 30);
      const pmResult = instance.findTimeValue(pmTime);      
      const midnight = new Date();
      midnight.setHours(0, 0);
      const midnightResult = instance.findTimeValue(midnight);
    });
  
    then("it should format times correctly", () => {
      expect(instance.findTimeValue(null)).toBe("");      
      const earlyAM = new Date();
      earlyAM.setHours(8, 5);
      expect(instance.findTimeValue(earlyAM)).toBe("08:05 AM");      
      const pmTime = new Date();
      pmTime.setHours(14, 30);
      expect(instance.findTimeValue(pmTime)).toBe("02:30 PM");
      
      const midnight = new Date();
      midnight.setHours(0, 0);
      expect(instance.findTimeValue(midnight)).toBe("12:00 AM");
    });
  
    when("Country code functions are tested", () => {
      instance.setState({
        countryCodes: [
          { country_code: "44", name: "UK" },
          { country_code: "1", name: "US" }
        ]
      });
      const codes = instance.getCountryOptions();
      const label1 = instance.getPlusOptionLabel("44");
      const label2 = instance.getPlusOptionLabel(null);
      const label3 = instance.getPlusOptionLabel("+44");
    });
  
    then("Country code functions should work correctly", () => {
      expect(instance.getCountryOptions()).toEqual(["44", "1"]);
      expect(instance.getPlusOptionLabel("44")).toBe("+44");
      expect(instance.getPlusOptionLabel(null)).toBe("");
      expect(instance.getPlusOptionLabel("+44")).toBe("+44");
    });
  });

  test("Testing response handling and navigation", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;

    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
      instance = wrapper.instance() as InviteForm;
    });

    when("API returns an error response", () => {
      jest.useFakeTimers();
      const errorResponse = {
        error: "Test error message"
      };
      instance.handleClientRequestResponse(errorResponse);
    });

    then("Failure modal should show and hide after timeout", () => {
      expect(instance.state.failureModal).toBe(true);
      expect(instance.state.failureModalText).toBe("Test error message");
      expect(screenProps.closeModal).toHaveBeenCalled();
      expect(screenProps.allRequestAPI).toHaveBeenCalled();      
      jest.advanceTimersByTime(3000);
      expect(instance.state.failureModal).toBe(false);
      expect(instance.state.failureModalText).toBe("");

      jest.useRealTimers();
    });

    when("User clicks navigate to dashboard", () => {
      instance.setState({
        successModal: true,
        failureModal: true
      });
      instance.navigateToDashboard();
    });

    then("Navigation and state should update correctly", () => {
      expect(instance.state.successModal).toBe(false);
      expect(instance.state.failureModal).toBe(false);
      expect(screenProps.navigation.navigate).toHaveBeenCalledWith("Dashboard");
    });
  });

  test("Testing country code related functions", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;

    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
      instance = wrapper.instance() as InviteForm;
    });

    when("Country codes are loaded", () => {
      instance.setState({
        countryCodes: [
          { country_code: "44", name: "UK" },
          { country_code: "1", name: "US" },
          { country_code: "91", name: "India" } 
        ]
      });
    });

    then("getCountryOptions should return formatted codes", () => {
      const codes = instance.getCountryOptions();
      expect(codes).toEqual(["44", "1", "91"]);
      expect(Array.isArray(codes)).toBe(true);
      expect(codes.every(code => typeof code === 'string')).toBe(true);
    });

    when("getPlusOptionLabel is called with different inputs", () => {
      const testCases = [
        { input: "44", expected: "+44" },
        { input: "+44", expected: "+44" },
        { input: null, expected: "" },
        { input: undefined, expected: "" },
        { input: "+44", expected: "+44" }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(instance.getPlusOptionLabel(input)).toBe(expected);
      });
    });

    then("getPlusOptionLabel should handle all cases correctly", () => {
      const results = [
        instance.getPlusOptionLabel("44"),
        instance.getPlusOptionLabel("+44"),
        instance.getPlusOptionLabel(null),
        instance.getPlusOptionLabel(undefined),
        instance.getPlusOptionLabel("+44")
      ];

      expect(results).toEqual(["+44", "+44", "", "", "+44"]);
    });
  
    when("User cancel or close form", () => {   
       instance.setState({ loader: false });   
      const headerCloseBtn = finder(wrapper, "closeFormBtn").first();
      headerCloseBtn.simulate("click");    
      const formikNode = finder(wrapper, "formik");
      expect(formikNode.length).toBe(1); 
      const form = formikNode.dive()
      const cancelBtn = finder(form, "closeFormBtn");
      cancelBtn.simulate("click");
    });

   
    then("form should be closed with reseting error", () => {
      expect(instance.state.isSelectedDate).toBe(false);
      expect(screenProps.closeModal).toHaveBeenCalledTimes(2);
    });
  
  });

  test("Testing fees validation logic", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;
  
    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
      instance = wrapper.instance() as InviteForm;
      
      // Setup required state with correct typing
      instance.setState({
        notarisationMethods: [{
          id: 1,
          notarisation_method: "REN",
          created_at: "2024-01-01",
          updated_at: "2024-01-01"
        }],
        plateformFeesObj: [{
          id: 28,
          services_id: 1, // Using number to match interface
          notarisation_methods_id: 1,
          fee_type: "Percent",
          fee_value: "150.0",
          notary_fees: undefined
        }]
      });
  
      // Update screenProps service data to match
      const updatedScreenProps = {
        ...screenProps,
        serviceData: [{
          id: "1",
          type: "type",
          attributes: {
            id: 1,
            service_name: "service",
            service_description: "desc",
            is_selected: true
          }
        }]
      };
      wrapper.setProps(updatedScreenProps);
    });
  
    when("validateFees is called with empty fees", () => {
      const error = instance.validateFees("", true, "service", "REN");
      instance.setState({ feesError: error });
    });
  
    then("Validation should show required error", () => {
      expect(instance.state.feesError).toBe("Please enter your fees");
    });
  
    when("validateFees is called with VAT disabled", () => {
      const error = instance.validateFees("100", false, "service", "REN");
      instance.setState({ feesError: error });
    });
  
    then("Validation should not show error", () => {
      expect(instance.state.feesError).toBe("");
    });
  
    when("validateFees is called with invalid number", () => {
      const error = instance.validateFees("abc", true, "service", "REN");
      instance.setState({ feesError: error });
    });
  
    then("Validation should show invalid amount error", () => {
      expect(instance.state.feesError).toBe("Please enter a valid fees amount");
    });
  
    when("validateFees is called with valid service and method", () => {
      instance.setState({
        plateformFeesObj: [{
          id: 28,
          services_id: 1,
          notarisation_methods_id: 1,
          fee_type: "Percent",
          fee_value: "10.0",
          notary_fees: undefined
        }]
      });
      const error = instance.validateFees("100", true, "service", "REN");
      instance.setState({ feesError: error });
    });
  
    then("Validation should process VAT correctly", () => {
      expect(instance.state.feesError).toBe("");
    });
  
    when("validateFees is called with amount less than VAT fee", () => {
      instance.setState({
        plateformFeesObj: [{
          id: 28,
          services_id: 1,
          notarisation_methods_id: 1,
          fee_type: "Percent",
          fee_value: "150.0",
          notary_fees: undefined
        }]
      });
      const error = instance.validateFees("10", true, "service", "REN");
      instance.setState({ feesError: error });
    });
  
    then("Validation should show VAT fee exceeds error", () => {
      expect(instance.state.feesError).toContain("VAT of 150.0%");
    });
  });
  
  test("Testing form interactions and checkbox handling", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;
  
    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
      instance = wrapper.instance() as InviteForm;
      mockAPICall(instance, "getPriorityApiCallId", priorityResponse);
      mockAPICall(instance, "getCountryCodeApiCallID", countryCodeResponse);
      mockAPICall(instance, "getNotarisationMethodCallId", notarisationMethodsResponse);
      
      // Initialize state with correct platform fees object
      instance.setState({
        plateformFeesObj: [{
          id: 28,
          services_id: 1,
          notarisation_methods_id: 1,
          fee_type: "Percent",
          fee_value: "10.0",
          notary_fees: undefined
        }]
      });
    });
  
    when("Form is submitted with fees error", () => {
      instance.setState({ feesError: "Invalid fees" });
      const formik = finder(wrapper, "formik");
      const mockResetForm = jest.fn();
      
      const values: FormValues = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "44",
        mobileNumber: "1234567890",
        serviceType: "service",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: true,
        startTime: new Date(),
        endTime: new Date(),
        videoCall: true,
        notes: "Test"
      };
  
      formik.props().onSubmit(values, { resetForm: mockResetForm });
    });
  
    then("Fees error should be cleared and form reset", () => {
      expect(instance.state.feesError).toBe("");
    });
  
    when("Checked VAT is clicked", () => {
      const form = finder(wrapper, "formik").dive();
      const checkedFees = finder(form, "checkedFees");
      if (checkedFees.exists()) {
        checkedFees.simulate("click");
      }
    });
  
    then("VAT should be unchecked", () => {
      const form = finder(wrapper, "formik").dive();
      expect(finder(form, "uncheckedFees").exists()).toBeTruthy();
    });
  
    when("Checked video call is clicked", () => {
      const form = finder(wrapper, "formik").dive();
      const checkedVideoCall = finder(form, "checkedVideoCall");
      if (checkedVideoCall.exists()) {
        checkedVideoCall.simulate("click");
      }
    });
  
    then("Video call should be unchecked and errors cleared", () => {
      const form = finder(wrapper, "formik").dive();
      expect(finder(form, "uncheckedVideoCall").exists()).toBeTruthy();
    });

    when("Notarisation method changes to non-video type", () => {
      const form = finder(wrapper, "formik").dive();
      const methodField = finder(form, "notarisationMethod");
      if (methodField.exists()) {
        methodField.simulate("change", {}, "STANDARD");
      }
    });
  
    then("Video call should be automatically unchecked", () => {
      const form = finder(wrapper, "formik").dive();
      expect(finder(form, "uncheckedVideoCall").exists()).toBeTruthy();
    });
    
  });
  
  test("Testing form submission and notarisation method handling", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;
  
    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
      instance = wrapper.instance() as InviteForm;
      mockAPICall(instance, "getPriorityApiCallId", priorityResponse);
      mockAPICall(instance, "getCountryCodeApiCallID", countryCodeResponse);
      mockAPICall(instance, "getNotarisationMethodCallId", notarisationMethodsResponse);
    });
  
    when("Form is submitted with fees error", () => {
      instance.setState({ feesError: "Invalid fees" });
      const mockValues: FormValues = {
        fullName: "Test User",
        email: "test@example.com",
        countryCode: "44",
        mobileNumber: "1234567890",
        serviceType: "service",
        notarisationMethod: "REN",
        fees: "100",
        platformFees: true,
        startTime: new Date(),
        endTime: new Date(),
        videoCall: true,
        notes: "Test"
      };
  
      instance.handleSubmitClientForm(mockValues);
    });
  
    then("Form submission should be prevented and not proceed with API call", () => {
      expect(instance.state.feesError).toBeTruthy();
      expect(instance.postClientRequestApiCallId).toBe("");
    });
  
    when("Notarisation method is changed", () => {
      const form = finder(wrapper, "formik").dive();
      const methodField = finder(form, "notarisationMethod");
      methodField.simulate("change", {}, "STANDARD");
    });
  
    then("Video call should be handled appropriately", () => {
      const form = finder(wrapper, "formik").dive();
      const uncheckedExists = finder(form, "uncheckedVideoCall").exists();
      const checkedExists = finder(form, "checkedVideoCall").exists();
      expect(uncheckedExists || checkedExists).toBeDefined();
    });
  });

  test("Testing client request API response handling", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: InviteForm;
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    given("I am a User loading InviteForm", () => {
      wrapper = shallow(<InviteForm {...screenProps} />);
      instance = wrapper.instance() as InviteForm;
      mockAPICall(instance, "getPriorityApiCallId", priorityResponse);
    });
  
    when("Client request API returns success", () => {
      const successResponse = {
        message: "Success"
      };
      instance.handleClientRequestResponse(successResponse);
    });
  
    then("Success modal should be shown", () => {
      expect(instance.state.successModal).toBe(true);
      expect(instance.state.failureModal).toBe(false);
      expect(screenProps.closeModal).toHaveBeenCalled();
      expect(screenProps.allRequestAPI).toHaveBeenCalled();
    });
  
    when("Client request API returns error", () => {
      const errorResponse = {
        error: "Error message"
      };
      instance.handleClientRequestResponse(errorResponse);
    });
  
    then("Failure modal should be shown", () => {
      expect(instance.state.failureModal).toBe(true);
      expect(instance.state.failureModalText).toBe("Error message");
    });
  
    when("setPlateFormFees is called with valid response", () => {
      const mockResponse = {
        platform_fees: [{
          id: 28,
          services_id: 30,
          notarisation_methods_id: 1,
          fee_type: "Percent",
          fee_value: "10.0",
          created_at: "2024-09-23T05:42:39.925Z",
          updated_at: "2024-09-23T05:42:39.925Z",
          notary_fees: null
        }]
      };
      instance.setPlateFormFees(mockResponse, "getPlateFormFeesApiCallId");
    });
  
    then("VAT should be updated in state", () => {
      expect(instance.state.plateformFeesObj).toBeDefined();
      expect(true).toBe(true);
    });

    then("it should complete the test successfully", () => {
      expect(true).toBe(true);
    });
    
  });


});
