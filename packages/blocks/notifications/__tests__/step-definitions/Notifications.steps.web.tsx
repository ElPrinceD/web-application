import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Notifications from "../../src/Notifications.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Notifications",
};

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

const mockAPICall = (instance: any, callId: string, data: object) => {
  const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
  message.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    message.messageId
  );
  message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), data);
  instance[callId] = message.messageId;
  const { receive: MockRecieve } = instance;
  MockRecieve("", message);
};

const unReadNotificationRes = {
    data: [   
      {
        id: "100",
        type: "notification",
        attributes: {
          id: 100,
          created_by: 1,
          headings: "Notification Heading 45",
          contents: "This is the content for notification 45.",
          app_url: "https://example.com/notification/45",
          is_read: false,
          read_at: null,
          created_at: "2024-10-30T07:14:49.195Z",
          updated_at: "2024-10-30T07:14:49.195Z",
          account: {
            id: 155566,
            first_name: null,
            last_name: null,
            full_phone_number: "",
            country_code: null,
            phone_number: null,
            email: "rajiv.endueser@example.com",
            activated: true,
            device_id: null,
            unique_auth_id: "Lk9tIUwygOujrbi4wGQM4Att",
            password_digest:
              "$2a$12$GxT/SC2HainQXaQN9sCkHOg2fGNGRUW2uSpcChSOj8x2HW/rIpP/K",
            created_at: "2024-10-14T10:41:11.065Z",
            updated_at: "2024-10-07T10:46:28.597Z",
            user_name: null,
            platform: null,
            user_type: "individual",
            app_language_id: null,
            last_visit_at: null,
            is_blacklisted: false,
            suspend_until: null,
            status: "regular",
            role_id: 1,
            stripe_id: null,
            stripe_subscription_id: null,
            stripe_subscription_date: null,
            full_name: "Rajiv end_user",
            gender: null,
            date_of_birth: null,
            age: null,
            country: null,
            address: null,
            contact_name: null,
            company_name: null,
            google_calendar_credentials: null,
            password_history: ["Password@23"],
            is_otp_verify: true,
            city: null,
            post_code: null,
            activation_time: null,
            address_line_2: null,
            last_activation_time: null,
            rating: 0,
            is_online: true,
            session_id: null,
            connected_account_id: null,
            deletion_time: null,
            google_calendar_token: null,
            outlook_calendar_token: null,
            google_calendar_sync: false,
            outlook_calendar_sync: false,
            is_deleted: false,
          },
        },
      },
    ],
    meta: {
      message: "List of notifications.",
    },
  };

  const readNotificationRes = {
    data: [   
      {
        id: "100",
        type: "notification",
        attributes: {
          id: 100,
          created_by: 1,
          headings: "Notification Heading 45",
          contents: "This is the content for notification 45.",
          app_url: "https://example.com/notification/45",
          is_read: false,
          read_at: null,
          created_at: "2024-10-15T07:14:49.195Z",
          updated_at: "2024-10-25T07:14:49.195Z",
          account: {
            id: 155566,
            first_name: null,
            last_name: null,
            full_phone_number: "",
            country_code: null,
            phone_number: null,
            email: "rajiv.endueser@example.com",
            activated: true,
            device_id: null,
            unique_auth_id: "Lk9tIUwygOujrbi4wGQM4Att",
            password_digest:
              "$2a$12$GxT/SC2HainQXaQN9sCkHOg2fGNGRUW2uSpcChSOj8x2HW/rIpP/K",
            created_at: "2024-10-14T10:41:11.065Z",
            updated_at: "2024-10-07T10:46:28.597Z",
            user_name: null,
            platform: null,
            user_type: "individual",
            app_language_id: null,
            last_visit_at: null,
            is_blacklisted: false,
            suspend_until: null,
            status: "regular",
            role_id: 1,
            stripe_id: null,
            stripe_subscription_id: null,
            stripe_subscription_date: null,
            full_name: "Rajiv end_user",
            gender: null,
            date_of_birth: null,
            age: null,
            country: null,
            address: null,
            contact_name: null,
            company_name: null,
            google_calendar_credentials: null,
            password_history: ["Password@23"],
            is_otp_verify: true,
            city: null,
            post_code: null,
            activation_time: null,
            address_line_2: null,
            last_activation_time: null,
            rating: 0,
            is_online: true,
            session_id: null,
            connected_account_id: null,
            deletion_time: null,
            google_calendar_token: null,
            outlook_calendar_token: null,
            google_calendar_sync: false,
            outlook_calendar_sync: false,
            is_deleted: false,
          },
        },
      },
    ],
    meta: {
      message: "List of notifications.",
    },
  };

 const noNotificationRes = {
  errors: [
    {message: "No notification found."}
  ]
 }

const markAsReadRes = {
  "data": {
      "id": "15",
      "type": "notification",
      "attributes": {
          "id": 15,
          "created_by": 1045,
          "title": "Welcome to Renotary!",
          "headings": "Welcome Notification",
          "contents": "Thank you for registering. Enjoy our services! 1",
          "app_url": "http://example.com",
          "is_read": true,
          "read_at": "2024-10-30T07:19:12.586Z",
          "created_at": "2024-10-30T07:09:59.020Z",
          "updated_at": "2024-10-30T07:19:12.587Z",
          "account": {
              "id": 1045,
              "first_name": null,
              "last_name": null,
              "full_phone_number": "0",
              "country_code": null,
              "phone_number": 0,
              "email": "qwert@gmail.com",
              "activated": true,
              "device_id": null,
              "unique_auth_id": "dwMrYN7h38ZwakTAlHpTdgtt",
              "password_digest": "$2a$12$/zRkSdYGDSnwSFmJBzniK.FsnqoRhPtn3gXjCdz5ltpX2rSJi1agy",
              "created_at": "2024-06-21T11:19:18.613Z",
              "updated_at": "2024-10-25T04:18:17.294Z",
              "user_name": null,
              "platform": null,
              "user_type": "individual",
              "app_language_id": null,
              "last_visit_at": null,
              "is_blacklisted": false,
              "suspend_until": null,
              "status": "regular",
              "role_id": 1,
              "stripe_id": "cus_QhX8LxEL6ubD6Y",
              "stripe_subscription_id": null,
              "stripe_subscription_date": null,
              "full_name": "sdf wer",
              "gender": null,
              "date_of_birth": null,
              "age": null,
              "country": "null",
              "address": "null",
              "contact_name": "",
              "company_name": "",
              "google_calendar_credentials": null,
              "password_history": [],
              "is_otp_verify": true,
              "city": "null",
              "post_code": "HG",
              "activation_time": null,
              "address_line_2": "null",
              "last_activation_time": null,
              "rating": 0.0,
              "is_online": true,
              "session_id": "cs_test_a1fIQMTLlYXlLt7jAhC3SNFStYLgJ60d5ht2wNJxoRboGxOG4V2ZXojZoU",
              "connected_account_id": null,
              "deletion_time": null,
              "google_calendar_token": null,
              "outlook_calendar_token": null,
              "google_calendar_sync": false,
              "outlook_calendar_sync": false,
              "is_deleted": false
          }
      }
  },
  "meta": {
      "message": "Notification marked as read."
  }
};

const markAllAsReadRes = {
  "message": "All notifications marked as read."
};

const feature = loadFeature(
  "./__tests__/features/Notifications-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Notifications", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: Notifications;

    given("I am a User loading Notifications", () => {
      wrapper = shallow(<Notifications {...screenProps} />);
    });
    when("I navigate to the Notifications", () => {
      instance = wrapper.instance() as Notifications;
    });
    then("Notifications will load with out errors", () => {
      expect(findByTestID(wrapper, "notifications")).toHaveLength(1);
    });
    
    when("no notifications are present", () => {
      mockAPICall(instance, "getNotificationsCallId", noNotificationRes);
    });
    then("notificationsBox will be shown", () => {
      expect(findByTestID(wrapper, "notifications")).toHaveLength(1);
    })
    
    when("get notifications api will be called", () => {
      mockAPICall(instance, "getNotificationsCallId", unReadNotificationRes);
    });
    then("notifications will be fetched", () => {
      expect(findByTestID(wrapper, "notifications")).toHaveLength(1);
    });
    
    when("user clicks on notification icon", () => {
      findByTestID(wrapper, "bell").simulate("click", {currentTarget: {}});
    });
    then("Notifications will open", () => {
      expect(findByTestID(wrapper, "popover")).toHaveLength(1);
      instance.cleanHtmlContent("");
      const msgContent = "<p><span style=\"color: rgb(0, 0, 0);\">\"Good news! Your quote has been successfully submitted. Access details in your account now.\"</span></p>"
      instance.cleanHtmlContent(msgContent)
    });
    
    when("user clicks on one notification", () => {
      findByTestID(wrapper, "notification").simulate("click");
      mockAPICall(instance, "markAsReadCallId", markAsReadRes);
    });
    then("notification is marked as read and notifications are fetched", () => {
      expect(findByTestID(wrapper, "popover")).toHaveLength(1);
      mockAPICall(instance, "getNotificationsCallId", readNotificationRes);
    });

    when("user clicks on mark all as read", () => {
      findByTestID(wrapper, "markAllAsRead").simulate("click");
      mockAPICall(instance, "markAsReadCallId", markAllAsReadRes);
    });
    then("notifications are marked as read and notifications are fetched", () => {
      expect(findByTestID(wrapper, "popover")).toHaveLength(1);
      mockAPICall(instance, "getNotificationsCallId", readNotificationRes);
    });
  });
});
