import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, mount, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OutlookCalendar from "../../src/OutlookCalendar.web";
import { OutlookAuthProvider } from "../../../../components/src/OutlookAuthProvider.web";

jest.useFakeTimers()
const navigation = require("react-navigation");


const res = {
  value: [
    {
      title: "Event 1",
      bodyPreview: "Description 1",
      subject: 'subject',
      start: { dateTime: "2024-08-16T09:00:00" },
      end: { dateTime: "2024-08-16T10:00:00" },
      onlineMeetingUrl: "https://meet.url/1",
      attendees: [
        {
          responseStatus: "accepted" ,
          email: "user1@example.com",
        },
      ],
    },
    {
      title: "Event 2",
      subject: 'subject',
      bodyPreview: "Description 2",
      start: { dateTime: "2024-08-16T09:00:00" },
      end: { dateTime: "2024-08-16T11:00:00" },
      onlineMeetingUrl: "https://meet.url/2",
      attendees: [
        {
          responseStatus: "accepted" ,
          email: "user1@example.com",
        },
      ],
    },
  ],
};

const onCalendarDataChange = ()=>{
  return res.value
}


const screenProps = {
  navigation: navigation,
  id: "OutlookCalendar",
  date: new Date(),
  onCalendarDataChange: onCalendarDataChange,
  calendarData: res.value,
  isSynced: false,
  triggerEvent: jest.fn()
};

const feature = loadFeature(
  "./__tests__/features/OutlookCalendar-scenario.web.feature"
);

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

jest.mock('../../../../components/src/OutlookAuthProvider.web', () => ({
  OutlookAuthProvider: {
    getAccessToken: jest.fn(),
  }
}));

const outlookCalendarEventMock = [
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

jest.mock('react-native-app-auth', () => {
  return {
    authorize: () => { return true },
    refresh: () => { return true },
    AuthConfiguration: () => { return true },
  }
})
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to OutlookCalendar", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: OutlookCalendar;

    given("I am a User loading OutlookCalendar", () => {
      exampleBlockA = shallow(<OutlookCalendar {...screenProps} />);
    });

    when("I navigate to the OutlookCalendar", () => {
      instance = exampleBlockA.instance() as OutlookCalendar;
    });

    then('I can click signup button', async() => {
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
      const handleClickSpy = jest.spyOn(instance, 'handleSyncWithOutlook');
      instance.forceUpdate();
      let signinBtn = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "sync-outlook-btn"
      );
      signinBtn.simulate('click');

      const mockToken = 'mockToken123';
      await OutlookAuthProvider.getAccessToken();

      await instance.handleSyncWithOutlook();
      instance.setIsSync(true);
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
          start: null, // This event should be filtered out
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



      // instance.getEvents("ascdscs");
      expect(handleClickSpy).toHaveBeenCalled()
      mockApiCall(instance, "getOutlookCalendarEventCallId", {error: "error"});
      mockApiCall(instance, "getOutlookCalendarEventCallId", outlookCalendarEventMock);
      // instance.handleStoredMsToken("token");
      instance.getDate(new Date(), new Date());
      instance.closeModalHandle();
      instance.renderEventAttendee({ responseStatus: "accepted", email: "abc@gmail.com" }, 1);
      instance.renderEventAttendee({ responseStatus: "declined", email: "abc@gmail.com" }, 1);
      instance.renderEventAttendee({ responseStatus: "", email: "abc@gmail.com" }, 1);
      instance.renderEventContent(eventContent);

      let eventElement = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "btnEventInfo"
      );
      instance.setEventInfo(eventContent);
      // instance.handleOutlookEventRes(res);
    });
  });

  test("User navigates to OutlookCalendar and no data found", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: OutlookCalendar;

    given("I am a User loading OutlookCalendar", () => {
      exampleBlockA = shallow(<OutlookCalendar navigation={undefined} id={""} calendarData={[]}/>);
    });

    when("I navigate to the OutlookCalendar", () => {
      instance = exampleBlockA.instance() as OutlookCalendar;
      instance.setIsSync(true);
      instance.updateCalendarTokenApiCall("token");
      instance.getNewAccessToken("refresh_token")
      mockApiCall(instance, "updateOutlookCalendarTokenApiCallId", {message: "message"});
    });

    then("OutlookCalendar will load without error", () => {
      expect(exampleBlockA).toBeTruthy()
    });
  });
});
