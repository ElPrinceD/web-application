import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Calendar from "../../src/Calendar.web";
import { Tabs } from "@material-ui/core";
const navigation = require("react-navigation");
import { getStorageData } from "../../../../framework/src/Utilities";
import { OutlookAuthProvider } from "../../../../components/src/OutlookAuthProvider.web";
import { GoogleAuthProvider } from "../../../../components/src/GoogleAuthProvider.web";

const screenProps = {
  navigation: navigation,
  id: "Calendar",
};

const screenProps1 = {
  navigation: navigation,
  id: "Calendar",
};

const feature = loadFeature(
  "./__tests__/features/calendar-scenario.web.feature"
);

const renotaryCalendarEventMock = {
  "zoom_meetings": [
    {
      "accounts": [
        {
          "data": {
            "id": "17",
            "type": "profile_zoom",
            "attributes": {
              "name": "test sep",
              "role": "end_user",
              "photo": {
                "url": "Image%20Pasted%20at%202024-9-16%2010-23.png"
              }
            }
          }
        }
      ],
      "account_id": 860,
      "notary_request_id": 192,
      "meeting": {
        "uuid": "Z8HE5tTBSQW0iAtOJDSl8g==",
        "id": 78577742305,
        "host_id": "kAm2Z1iqTbavhDzX2jNwHg",
        "host_email": "nikhil.upadhyay@builder.ai",
        "topic": "Zoom Meeting",
        "type": 2,
        "status": "waiting",
        "start_time": "2024-09-19T10:16:18Z",
        "duration": 0,
        "timezone": "UTC",
        "created_at": "2024-09-19T10:16:18Z",
        "start_url": "https://us04web.zoom.us/s/78577742305?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI3ODU3Nzc0MjMwNSIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoia0FtMloxaXFUYmF2aER6WDJqTndIZyIsInppZCI6ImI3ZTI3MWIwMDQ0NzQ2NDhiYTE4ZTU1NDg1NDU0ZTYwIiwic2siOiIwIiwic3R5IjoxLCJ3Y2QiOiJ1czA0IiwiZXhwIjoxNzI2NzQ4MTc4LCJpYXQiOjE3MjY3NDA5NzgsImFpZCI6Il9kSmlDNXAzU1NLOERuSlNzQUNSTmciLCJjaWQiOiIifQ.ipBl0UdKZP1Enxmlpaa_BNgOdcxpOklDag8RHQ-Z7UI",
        "join_url": "https://us04web.zoom.us/j/78577742305?pwd=Jl6cjYHkl79tZTvg1hVNbQdy9p3eFK.1",
        "password": "6baF0Y",
        "h323_password": "652586",
        "pstn_password": "652586",
        "encrypted_password": "Jl6cjYHkl79tZTvg1hVNbQdy9p3eFK.1",
        "settings": {
          "meeting_invitees": [
            {
              "email": "abc.s@neosoftmail.com",
            }
          ],
        },
      },
      "start_time": "2024-09-07T15:35:48.000Z",
      "end_time": "2024-09-07T16:35:48.000Z"
    },
  ]
}

const googleMock = {
  items: [
    {
      title: "mocked_event",
      summary: "mocked_event",
      start: {
        dateTime: new Date(),
        date: new Date()
      },
      end: {
        dateTime: new Date(),
        date: new Date()
      }
    }
  ],
  event: {
    title: "mocked_event",
    summary: "mocked_event",
    start: new Date(),
    end: new Date(),
    extendedProps: {
      description: "description",
      conferenceData: {
        entryPoints: [{ uri: "https://www.lipsum.com/" }]
      },
      attendees: [
        { responseStatus: "accepted", email: "test_accepted@email.com" },
        { responseStatus: "declined", email: "test_declined@email.com" },
        { responseStatus: "pending", email: "test@email.com" }
      ]
    }
  }
};

const outlookMock = [
  {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('ak283260%40outlook.com')/events",
    "value": [
      {
        "@odata.etag": "W/\"1ShYQqlMEkO4kXdVp6hXJAAAAWjDBA==\"",
        "id": "AQMkADAwATM0MDAAMS03YTU4LTQxYmEtMDACLTAwCgBGAAADXMO-qPxBLkSSN_YO31wdvQcA1ShYQqlMEkO4kXdVp6hXJAAAAgENAAAA1ShYQqlMEkO4kXdVp6hXJAAAAAFpzVwAAAA=",
        "createdDateTime": "2024-08-14T05:19:02.7979809Z",
        "lastModifiedDateTime": "2024-08-14T09:41:26.152415Z",
        "changeKey": "1ShYQqlMEkO4kXdVp6hXJAAAAWjDBA==",
        "categories": [],
        "transactionId": "ff9a9097-c728-2f6b-0273-0d55699c6536",
        "originalStartTimeZone": "India Standard Time",
        "originalEndTimeZone": "India Standard Time",
        "iCalUId": "040000008200E00074C5B7101A82E008000000001C9AE47909EEDA010000000000000000100000005F8B04CFB678B745A73B78814EDC1FED",
        "uid": "040000008200E00074C5B7101A82E008000000001C9AE47909EEDA010000000000000000100000005F8B04CFB678B745A73B78814EDC1FED",
        "reminderMinutesBeforeStart": 15,
        "isReminderOn": true,
        "hasAttachments": false,
        "subject": "dummy event",
        "bodyPreview": "Its just a dummy event\r\n\r\n.........................................................................................................................................\r\nJoin online meeting\r\n.....................................................................",
        "importance": "normal",
        "sensitivity": "normal",
        "isAllDay": false,
        "isCancelled": false,
        "isOrganizer": true,
        "responseRequested": true,
        "seriesMasterId": null,
        "showAs": "busy",
        "type": "singleInstance",
        "webLink": "https://outlook.live.com/owa/?itemid=AQMkADAwATM0MDAAMS03YTU4LTQxYmEtMDACLTAwCgBGAAADXMO%2FqPxBLkSSN%2BYO31wdvQcA1ShYQqlMEkO4kXdVp6hXJAAAAgENAAAA1ShYQqlMEkO4kXdVp6hXJAAAAAFpzVwAAAA%3D&exvsurl=1&path=/calendar/item",
        "onlineMeetingUrl": "https://join.skype.com/h1rAIEpVhfC3",
        "isOnlineMeeting": true,
        "onlineMeetingProvider": "skypeForConsumer",
        "allowNewTimeProposals": true,
        "occurrenceId": null,
        "isDraft": false,
        "hideAttendees": false,
        "responseStatus": {
          "response": "organizer",
          "time": "0001-01-01T00:00:00Z"
        },
        "body": {
          "contentType": "html",
          "content": "<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n</head>\r\n<body>\r\n<div style=\"font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)\">\r\nIts just a dummy event</div>\r\n<br>\r\n<font face=\"Calibri\" size=\"1\" color=\"#404040\"><span style=\"\">.........................................................................................................................................</span></font><br>\r\n<font face=\"Calibri\" size=\"4\"><span style=\"font-size:16pt\"><a href=\"https://join.skype.com/h1rAIEpVhfC3\">Join online meeting</a></span></font><br>\r\n<font face=\"Calibri\" size=\"1\" color=\"#404040\"><span style=\"font-size:8pt\">.........................................................................................................................................</span></font><br>\r\n</body>\r\n</html>\r\n"
        },
        "start": {
          "dateTime": "2024-08-14T11:30:00.0000000",
          "timeZone": "UTC"
        },
        "end": {
          "dateTime": "2024-08-14T13:00:00.0000000",
          "timeZone": "UTC"
        },
        "location": {
          "displayName": "",
          "locationType": "default",
          "uniqueIdType": "unknown",
          "address": {},
          "coordinates": {}
        },
        "locations": [],
        "recurrence": null,
        "attendees": [],
        "organizer": {
          "emailAddress": {
            "name": "ashok kumar",
            "address": "ak283260@outlook.com"
          }
        },
        "onlineMeeting": {
          "joinUrl": "https://join.skype.com/h1rAIEpVhfC3"
        },
        "calendar@odata.associationLink": "https://graph.microsoft.com/v1.0/users('ak283260@outlook.com')/calendars('AQMkADAwATM0MDAAMS03YTU4LTQxYmEtMDACLTAwCgBGAAADXMO-qPxBLkSSN_YO31wdvQcA1ShYQqlMEkO4kXdVp6hXJAAAAgEGAAAA1ShYQqlMEkO4kXdVp6hXJAAAAoZ-AAAA')/$ref",
        "calendar@odata.navigationLink": "https://graph.microsoft.com/v1.0/users('ak283260@outlook.com')/calendars('AQMkADAwATM0MDAAMS03YTU4LTQxYmEtMDACLTAwCgBGAAADXMO-qPxBLkSSN_YO31wdvQcA1ShYQqlMEkO4kXdVp6hXJAAAAgEGAAAA1ShYQqlMEkO4kXdVp6hXJAAAAoZ-AAAA')"
      }
    ]
  }
]

const mockApiCall = (
  instance: any,
  messageIdProperty: string,
  data: any,
  isError: boolean = false
) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    requestMessage.messageId
  );

  requestMessage.addData(
    getName(
      !isError
        ? MessageEnum.RestAPIResponceSuccessMessage
        : MessageEnum.RestAPIResponceErrorMessage
    ),
    data
  );

  instance[messageIdProperty] = requestMessage.messageId;

  runEngine.sendMessage("Unit Test", requestMessage);
};
const findByTestID = (wrapper: ShallowWrapper<any>, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-test-id") === testID);

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

jest.mock('../../../../components/src/OutlookAuthProvider.web', () => ({
  OutlookAuthProvider: {
    getAccessToken: jest.fn(),
  }
}));


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    const originalWindow: any = { ...window };
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      gapi: {
        auth2: {
          getAuthInstance: () => ({
            signIn: () =>
              Promise.resolve({
                getAuthResponse: () => ({ access_token: "access_token" })
              }),
            isSignedIn: {
              get: jest.fn(() => true),
            },
            currentUser: {
              get: jest.fn(() => ({
                disconnect: jest.fn(),
                reloadAuthResponse: jest.fn(() => Promise.resolve({
                  access_token: "new_access_token"
                })),
                isSignedIn: jest.fn(),
              })),
            },
            signOut: jest.fn().mockResolvedValue("")
          }),
          init() {
          }
        },
        load(value: string, callback: () => void) {
          callback();
        }
      }
    }));
  });

  test("User navigates to calendar", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Calendar;

    given("I am a User loading calendar", () => {
      exampleBlockA = shallow(<Calendar {...screenProps} />);
    });

    when("I navigate to the calendar", () => {
      instance = exampleBlockA.instance() as Calendar;
    });

    then("calendar will load with out errors", async () => {
      expect(exampleBlockA).toBeTruthy();

      instance.setToken("token");
      instance.setGoogleAuth("google_auth", true);
      instance.setOutlookAuth("outlook_auth", true);
      instance.handleRenotaryCalendarEvents(renotaryCalendarEventMock)
      mockApiCall(instance, "renotaryCalendarEventCallId", renotaryCalendarEventMock);
      mockApiCall(instance, "getGoogleEventCallId", googleMock);
      mockApiCall(instance, "getOutlookEventCallId", outlookMock);
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "calendar"
      );
      const event = {
        preventDefault() { },
        target: { value: "hello@aol.com" },
      };
      //  let testc = findByTestID(exampleBlockA, "calendar");
      const newDate = new Date(2024, 4, 10);


      instance.setState({ date: newDate })
      textInputComponent.simulate("change", newDate);
      instance.showDate();
    });

    then("I can select the button with with out errors", () => {
      const eventContent = {
        event: {
          id: '1',
          title: 'Meeting with Team',
          start: new Date('2024-08-14T10:00:00'),
          end: new Date('2024-08-14T11:00:00'),
          allDay: false,
          extendedProps: {
            description: 'Discussing the upcoming project milestones.',
            location: 'Conference Room 1',
            attendees: [
              { name: 'John Doe', email: 'john.doe@example.com' },
              { name: 'Jane Smith', email: 'jane.smith@example.com' }
            ],
            conferenceData: {
              entryPoints: [{ uri: 'https://example.com/meeting-link' }]
            }
          },
          backgroundColor: '',
          borderColor: '',
          textColor: '',
          classNames: [],
          url: '',
          editable: true,
          startEditable: true,
          durationEditable: true,
          resourceEditable: true,
          display: 'auto',
        },
        timeText: '10:00 AM - 11:00 AM',
        isStart: true,
        isEnd: true,
        view: {
          type: 'dayGridMonth',
          title: 'August 2024',
          activeStart: new Date('2024-08-01T00:00:00'),
          activeEnd: new Date('2024-09-01T00:00:00'),
          currentStart: new Date('2024-08-01T00:00:00'),
          currentEnd: new Date('2024-09-01T00:00:00')
        }
      };
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample"
      );
      // buttonComponent.simulate("press");
      expect(exampleBlockA).toBeTruthy();
      // instance.getDate(new Date(), new Date());
      instance.closeModalHandle();
      instance.renderEventAttendee({ responseStatus: "accepted", email: "abc@gmail.com" }, 1);
      instance.renderEventAttendee({ responseStatus: "declined", email: "abc@gmail.com" }, 1);
      instance.renderEventAttendee({ responseStatus: "", email: "abc@gmail.com" }, 1);
      instance.renderEventContent(eventContent);
      instance.setEventInfo(eventContent);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });

    given("I am a User loading calendar.", () => {
      exampleBlockA = shallow(<Calendar {...screenProps1} />);
    });

    when("I navigate to the calendar.", () => {
      instance = exampleBlockA.instance() as Calendar;

    });

    then("calendar will load with out errors.", async () => {
      instance.showDate();
      const res = {
        value: [
          {
            subject: "Event 1",
            bodyPreview: "Description 1",
            start: { dateTime: "2024-08-16T09:00:00" },
            end: { dateTime: "2024-08-16T10:00:00" },
            onlineMeetingUrl: "https://meet.url/1",
            attendees: [
              {
                status: { response: "accepted" },
                emailAddress: { address: "user1@example.com" },
              },
            ],
          },
          {
            subject: "Event 2",
            bodyPreview: "Description 2",
            start: { dateTime: "2024-08-16T11:00:00" },
            end: { dateTime: "2024-08-16T11:00:00" },
            onlineMeetingUrl: "https://meet.url/2",
            attendees: [
              {
                status: { response: "declined" },
                emailAddress: { address: "user2@example.com" },
              },
            ],
          },
        ],
      };
      instance.handleOutlookEventRes(res);
      instance.renderFilteredOutlookEvents();
      instance.renderFilteredGoogleEvents();
      instance.handleGoogleEventsRes({
        error: {
          code: 401
        }
      });
      await GoogleAuthProvider.refreshAccessToken("token");
      instance.handleGoogleEventsRes({
        error: "error"
      });
      instance.handleOutlookEventRes({ error: { code: "InvalidAuthenticationToken" } });
      await OutlookAuthProvider.getAccessToken();
      instance.handleOutlookEventRes({ error: "error" })

      expect(exampleBlockA.find(".sidebarul")).toHaveLength(0);
    });

    then("I can select any event tab", () => {
      const renotaryEventContent = {
        event: {
          id: '1',
          title: 'Meeting with Team',
          start: new Date('2024-08-14T10:00:00'),
          end: new Date('2024-08-14T11:00:00'),
          allDay: false,
          extendedProps: {
            accounts: [
              {
                id: "abc",
                name: "abc",
                role: "abc",
                photoUrl: "abc",
              }
            ],
            description: 'Discussing the upcoming project milestones.',
            location: 'Conference Room 1',
            attendees: [
              { name: 'John Doe', email: 'john.doe@example.com' },
              { name: 'Jane Smith', email: 'jane.smith@example.com' }
            ],
            conferenceData: {
              entryPoints: [{ uri: 'https://example.com/meeting-link' }]
            }
          },
          backgroundColor: '',
          borderColor: '',
          textColor: '',
          classNames: [],
          url: '',
          editable: true,
          startEditable: true,
          durationEditable: true,
          resourceEditable: true,
          display: 'auto',
        },
        timeText: '10:00 AM - 11:00 AM',
        isStart: true,
        isEnd: true,
        view: {
          type: 'dayGridMonth',
          title: 'August 2024',
          activeStart: new Date('2024-08-01T00:00:00'),
          activeEnd: new Date('2024-09-01T00:00:00'),
          currentStart: new Date('2024-08-01T00:00:00'),
          currentEnd: new Date('2024-09-01T00:00:00')
        }
      };
      const item = {
        id: "abc",
        name: "abc",
        role: "abc",
        photoUrl: "abc",
      }
      instance.handleClose();
      exampleBlockA.find(Tabs).simulate('change', {}, 1);
      exampleBlockA.find(Tabs).simulate('change', {}, 2);
      exampleBlockA.find(Tabs).simulate('change', {}, 3);
      instance.showDate();
      instance.renderDate(new Date(), new Date());
      instance.handleMeetInvitees(renotaryCalendarEventMock.zoom_meetings[0])
      instance.handleMeetInvitees({ meeting: { settings: { meeting_invitees: [] } } })
      instance.getGoogleEvents("token");
      instance.setEventInfo(renotaryEventContent);
      instance.renderRenotaryEventAttendee(item, 1)
      expect(exampleBlockA.state('selectedEventTab')).toEqual(3);
    });
  });
});
