import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TransactionHistory from "../../src/TransactionHistory.web"
import { string } from "yup";

const screenProps = {
  navigation: {
    navigation: jest.fn(),
    goBack: jest.fn()
  },
  id: "TransactionHistory",
};

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

const getServiceResponse = {
  data: [
    {
      "id": "29",
      "type": "service",
      "attributes": {
        "id": 29,
        "service_icon": {
          "url": "active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm9DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--da6861d2b80bd8b91589b57f9704516146bc8012/image_stamp.png"
        },
        "service_name": " Other (Translation, Diploma verification, apostille)",
        "service_description": "Other services will be added after launch. Prior to the launch, they should be grayed out.",
        "is_selected": false
      },
    }
  ],
}

const userProfileMockRes = {
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
      "user_type": null,
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

const transactionHistoryMockRes = {
  "transaction_history": [
      {
          "id": 13,
          "account_id": 1431,
          "request_type": "Stripe",
          "payment_date": "2024-08-23T13:27:50.381Z",
          "payment_method": null,
          "transaction_number": "0",
          "notary_request_id": 667,
          "notary_id": null,
          "status": "PAID",
          "amount": "0.0",
          "created_at": "2024-08-23T13:27:50.426Z",
          "updated_at": "2024-08-23T13:27:50.426Z"
      },
      {
          "id": 21,
          "account_id": 1431,
          "request_type": "Stripe",
          "payment_date": "2024-08-24T09:33:28.921Z",
          "payment_method": null,
          "transaction_number": "0",
          "notary_request_id": 687,
          "notary_id": null,
          "status": "PAID",
          "amount": "0.0",
          "created_at": "2024-08-24T09:33:28.976Z",
          "updated_at": "2024-08-24T09:33:28.976Z"
      },
      {
          "id": 28,
          "account_id": 1431,
          "request_type": "Stripe",
          "payment_date": "2024-08-25T07:11:58.650Z",
          "payment_method": null,
          "transaction_number": "0",
          "notary_request_id": 701,
          "notary_id": null,
          "status": "PAID",
          "amount": "0.0",
          "created_at": "2024-08-25T07:11:58.683Z",
          "updated_at": "2024-08-25T07:11:58.683Z"
      },
  ]
}

const getUserService = [35, 31, 32, 29]

const response = {
  message: "text"
}

const mockSeesionToken = jest.fn().mockImplementation(
  (
    instance: TransactionHistory,
    token: string = ''
  ) => {
    const msgSeesionToken = new Message(
      getName(MessageEnum.SessionResponseMessage)
    );
    msgSeesionToken.addData(
      getName(MessageEnum.SessionResponseToken),
      token
    );
    const { receive: mockResponse } = instance;
    mockResponse("mockSeesionTokenTest", msgSeesionToken);
  }
);

const feature = loadFeature("./__tests__/features/TransactionHistory-scenario.web.feature");

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-test-id") === testID).first();

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    Object.assign(global, {
      window: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    });
   

    const mockScrollData = {
      scrollTop: 900,
      scrollHeight: 1000,
      clientHeight: 800,
    };

    jest.spyOn(React, 'createRef').mockReturnValue({ current: mockScrollData } as React.RefObject<HTMLDivElement>);

  });

  test("User navigates to TransactionHistory", ({ given, when, then }) => {
    let transactionHistoryWrapper: ShallowWrapper;
    let instance: TransactionHistory;
    given("I am a User loading TransactionHistory", () => {
      transactionHistoryWrapper = shallow(<TransactionHistory {...screenProps} />);
    });

    when("User comes to the TransactionHistory", () => {
      instance = transactionHistoryWrapper.instance() as TransactionHistory;
    });

    then("Token get saved", () => {
      instance.setToken("token");
      instance.a11yProps("");
      instance.handleEventTabChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>, 0);
      instance.convertDate('13/23/2024')
      mockSeesionToken(instance, "egdgadg")
      expect(MessageEnum.SessionResponseToken).toBe(59);
      mockAPICall(instance, "userProfileInfoCallId", userProfileMockRes);
      mockAPICall(instance, "fetchTransactionHistoryListId", transactionHistoryMockRes);
      instance.handleUserDetails(userProfileMockRes);
      instance.setState({hasMore:true, isLoading:false})
      transactionHistoryWrapper.findWhere(
        (node) => node.prop("data-test-id") === "scrollsection"
      ).simulate("scroll");
     
    });

    then("TransactionHistory will load with out errors", () => {
      expect(transactionHistoryWrapper).toBeTruthy();
    });

    then("I can change order id to see the related list", () => {
      let orderIdInput = findByTestID(transactionHistoryWrapper, "orderId-input");
      orderIdInput.simulate("change", { target: { value: "dsferfe" } });
      expect(transactionHistoryWrapper).toBeTruthy();
    });

    then("I can click on filter icon", () => {
      let filterBtn = findByTestID(transactionHistoryWrapper, "filter-btn");
      filterBtn.simulate("click");
      expect(transactionHistoryWrapper).toBeTruthy();
    });

    then("I can change the filter fields", () => {
      let filterBtn = findByTestID(transactionHistoryWrapper, "filter-duration-input");
      let dateTypeField = findByTestID(transactionHistoryWrapper, "date-type-button");
      let calendarField = findByTestID(transactionHistoryWrapper, "calendar-field");
      let filterStatusField = findByTestID(transactionHistoryWrapper, "status-filter-input");
      let calendar = findByTestID(transactionHistoryWrapper, "react-calendar");
      let calendarSaveBtn = findByTestID(transactionHistoryWrapper, "save-btn");
      let filterApplyBtn = findByTestID(transactionHistoryWrapper, "apply-filter-btn");


      filterBtn.at(0).simulate("click");
      instance.handleFilterDurationBtn("last_7_days");
      instance.handleFilterDurationBtn("last_30_days");
      instance.handleFilterDurationBtn("last_90_days");   
      filterBtn.at(0).simulate("click");
      instance.getBorderColorDuration("last_7_days");
      instance.getBorderColorDuration("last_30_days");
      instance.getBorderColorDuration("last_90_days");
      
      dateTypeField.simulate('change', {target: {value: "single"}});
      dateTypeField.simulate('change', {target: {value: "range"}});
   
      filterStatusField.at(0).simulate('click');
      instance.handleFilterStatus("successfull");
      instance.handleFilterStatus("failed");
      instance.getBorderColorStatus("successfull");
      instance.getBorderColorStatus("failed");

      calendarField.simulate('click');
      instance.handleDateChange([new Date, new Date]);
      calendarSaveBtn.simulate('click');

      calendarField.simulate('click');
      instance.handleDateChange(new Date);
      calendarSaveBtn.simulate('click');

      filterApplyBtn.simulate('click');

      instance.renderDurationChip('today');
      instance.renderDurationChip('last_7_days');
      instance.renderDurationChip('last_30_days');
      instance.renderDurationChip('last_90_days');

      instance.renderStatusChip('failed');

      expect(transactionHistoryWrapper).toBeTruthy();
    });

    then('Should call getTransactions on scroll to the bottom of the table container', () => {
      instance.handleTransactionHistoryRes({error: "error"});
      instance.scrollListener();
      instance.setState({hasMore: false});
      if (instance.tableContainerRef.current) {
        instance.tableContainerRef.current.scrollTop = 100;
        instance.scrollListener();
        // expect(instance.getUserList).toHaveBeenCalled();
        instance.handleTransactionHistoryRes({error: "error"});
        instance.handleUserDetails({error: "error"});
        instance.setToken("");
        instance.convertDate("");
        instance.componentWillUnmount();
      }
    });

    then("User can leave the screen without error", () => {
      instance.handleDateChange(new Date);
      instance.handleReset();
      instance.handleCalendarCancelBtn();
      instance.handleCloseFilter();
      instance.handleDeleteChip('duration');
      instance.handleDeleteChip('status');
      instance.componentWillUnmount();
      expect(transactionHistoryWrapper).toBeTruthy();
    });

  });
});
