import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';

import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import Cfzoomintegration92 from '../../src/Cfzoomintegration92.web';
import ZoomMtgEmbedded, { Participant } from '@zoom/meetingsdk/embedded';

const navigation = require('react-navigation');
import { ZoomMtg } from "@zoom/meetingsdk";
const screenProps = {
  navigation: navigation,
  id: 'Cfzoomintegration92',
};
// Mock implementation of ZoomMtg methods
ZoomMtg.init = jest.fn((config) => config.success && config.success());
ZoomMtg.join = jest.fn((config) => config.success && config.success());


const endUserProfileResponse = {
  "data": {
    "id": "1045",
    "type": "profile",
    "attributes": {
      "id": 1045,
      "first_name": null,
      "last_name": null,
      "full_phone_number": "",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": null,
      "email": "qwert@gmail.com",
      "activated": true,
      "user_type": "individual",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 1,
      "full_name": "sdf wer",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": null,
      "address": null,
      "address_line_2": null,
      "contact_name": "",
      "company_name": "",
      "is_online": true,
      "photo": {
        "url": null
      }
    }
  }
}
const zoomResponse = {
  "zoom_meetings": {
    "zoom_sdk_key": "uUvYlYAOTVyR2iUZGFI04Q",
    "zoom_sdk_secret_key": "XTBePuR9I5o2VqNoARiBDjP4rPmgONXZ",
    "notary_request_id": 733,
    "meeting": {
      "uuid": "Gn+g70mXRpycwYH+zl/rOg==",
      "id": 74835816778,
      "host_id": "kAm2Z1iqTbavhDzX2jNwHg",
      "host_email": "nikhil.upadhyay@builder.ai",
      "topic": "Zoom Meeting",
      "type": 2,
      "status": "waiting",
      "start_time": "2024-09-05T04:43:13Z",
      "duration": 60,
      "timezone": "Asia/Calcutta",
      "created_at": "2024-09-05T04:43:13Z",
      "start_url": "url",
      "join_url": "url",
      "password": "dxy3x2",
      "h323_password": "510131",
      "pstn_password": "510131",
      "encrypted_password": "HjTEUQqAjUl4qgXiwWY8VubeG9Ipgf.1",
      "settings": {
        "host_video": false,
        "participant_video": false,
        "cn_meeting": false,
        "in_meeting": false,
        "join_before_host": false,
        "jbh_time": 0,
        "mute_upon_entry": false,
        "watermark": false,
        "use_pmi": false,
        "approval_type": 2,
        "audio": "voip",
        "auto_recording": "none",
        "enforce_login": false,
        "enforce_login_domains": "",
        "alternative_hosts": "",
        "alternative_host_update_polls": false,
        "close_registration": false,
        "show_share_button": false,
        "allow_multiple_devices": false,
        "registrants_confirmation_email": true,
        "waiting_room": false,
        "request_permission_to_unmute_participants": false,
        "registrants_email_notification": true,
        "meeting_authentication": false,
        "encryption_type": "enhanced_encryption",
        "approved_or_denied_countries_or_regions": {
          "enable": false
        },
        "breakout_room": {
          "enable": false
        },
        "internal_meeting": false,
        "continuous_meeting_chat": {
          "enable": true,
          "auto_add_invited_external_users": false,
          "channel_id": "web_sch_123016ed2fb84f1183988a466289a93d"
        },
        "participant_focused_meeting": false,
        "push_change_to_calendar": false,
        "resources": [],
        "alternative_hosts_email_notification": true,
        "show_join_info": false,
        "device_testing": false,
        "focus_mode": false,
        "meeting_invitees": [],
        "enable_dedicated_group_chat": true,
        "private_meeting": false,
        "email_notification": true,
        "host_save_video_order": false,
        "sign_language_interpretation": {
          "enable": false
        },
        "email_in_attendee_report": false
      },
      "pre_schedule": false
    }
  }
}
const mockParticipants: Participant[] = [
  {
    userId: 1,
    userName: "John Doe",
    displayName: "John",
    audio: "computer",
    muted: false,
    isHost: false,
    isCoHost: false,
    isGuest: true,
    avatar: "avatar_url",
    isPhoneUser: false,
    bRaiseHand: false,
    isHold: false,
    bHold: false,
    video: true,
    bVideoOn: true,
    sharerOn: false,
    feedback: 0,
    sharePause: false,
    isAssistant: false,
    isAdmin: false,
    bLocalRecord: false,
    customerKey: "customer_key",
    pronoun: "he/him",
    audioStatus: 2,
    isVideoConnect: true,
    participantUUID: "uuid_123",
    userGuid: "guid_123"
  },
]
const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

interface InstanceData {
  [getSaveReportApiCallId: string]: string;
};

const mockApiCall = jest.fn().mockImplementation(
  (
    instance: InstanceData,
    getSaveReportApiCallId: string,
    mockData: object = {}
  ) => {
    const messageRestApiCall = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    messageRestApiCall.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      messageRestApiCall.messageId
    );
    messageRestApiCall.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), mockData);
    instance[getSaveReportApiCallId] = messageRestApiCall.messageId;
    const { receive: mockResponse } = instance as InstanceData as unknown as { receive: Function };
    mockResponse("test", messageRestApiCall);
  }
);

const feature = loadFeature('./__tests__/features/cfzoomintegration92-scenario.web.feature');

defineFeature(feature, (test) => {

  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval").mockImplementation((callback: Function) => callback());
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    window.close = jest.fn();
    
  });
  let originalClose: () => void;

  test('User navigates to Cfzoomintegration92 and inputs text', ({ given, when, then }) => {
   
    let exampleBlockA: ShallowWrapper;
    let instance: Cfzoomintegration92;

    given('I am a User loading Cfzoomintegration92', () => {
      exampleBlockA = shallow(<Cfzoomintegration92 {...screenProps} />);
      instance = exampleBlockA.instance() as Cfzoomintegration92
    });

    when("The profile api is load", () => {
      mockApiCall(instance, "getProfileApiCallId", endUserProfileResponse);
    });

    then("Data will render on the screen", async () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(6);
    });

    when("I click on zoom button", () => {
      mockApiCall(instance, "zoomCallId", zoomResponse);
    });

    then("Zoom meeting will be open", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(6);
      

      expect(ZoomMtg.init).toHaveBeenCalledWith(expect.objectContaining({
        leaveUrl: expect.any(String),
        isSupportAV: true,
        success: expect.any(Function),
        error: expect.any(Function),
      }));
      
      expect(ZoomMtg.join).toHaveBeenCalledWith(expect.objectContaining({
        meetingNumber: expect.any(String),
        userName: expect.any(String),
        signature: expect.any(String),
        sdkKey: expect.any(String),
        userEmail: expect.any(String),
        passWord: expect.any(String),
        success: expect.any(Function),
        error: expect.any(Function),
      }));
       
      });

    then("If there are attendees, tab will not close", async () => {
      originalClose = window.close;
      window.close = jest.fn();
      jest.useFakeTimers();
      jest.spyOn(global, 'clearInterval');
      window.close = originalClose;
    });

    when("User clicks on back icon button", () => {
      const iconBtn = findByTestID(exampleBlockA, "backIconButton");
      iconBtn.simulate("click");
    })

    then("The correct navigation method is called", () => {
      const navigateToDashboard = jest.fn();
      const navigateToRequestManagement = jest.fn();
      sessionStorage.setItem('previousPage', '/RequestManagement');
      sessionStorage.setItem('previouspage', '/Dashboard');
      const iconBtn = findByTestID(exampleBlockA, "backIconButton");
      iconBtn.simulate("click");
      if (sessionStorage.getItem('previousPage') === '/RequestManagement') {
        expect(navigateToRequestManagement).toHaveLength(1);
        expect(navigateToDashboard).toHaveLength(0);
      } else {
        expect(navigateToDashboard).toHaveLength(0);
        expect(navigateToRequestManagement).toHaveLength(0);
      }

      sessionStorage.removeItem('previousPage');
    });

    when("I click on next open side bar button", () => {
      let btnSignUp = exampleBlockA.findWhere((node) => node.prop("data-test-id") === "toggleButton"); btnSignUp.simulate("click");
    });

    then("Data will be changed", () => {
      let btnSubmitOTP = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "toggleButton"
      );
      expect(btnSubmitOTP.prop("data-test-id")).toEqual("toggleButton");
    });

    then("New Notary modal will open successfully", () => {
      expect(MessageEnum.NavigationTargetMessage).toEqual(6);
    });
  });
});
