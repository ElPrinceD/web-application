import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Calendars from "../../src/Calendars.web"
import { GoogleAuthProvider } from "../../../../components/src/GoogleAuthProvider.web"
import { OutlookAuthProvider } from "../../../../components/src/OutlookAuthProvider.web"

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Calendars"
}

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
    wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
    const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
    msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
    instance[apiCallID] = msgSucessRestAPI.messageId
    const { receive: MockRecieve } = instance
    MockRecieve("", msgSucessRestAPI)
}

const notaryUserProfileResponse = {
    "data": {
        "id": "1204",
        "type": "profile",
        "attributes": {
            "id": 1204,
            "first_name": null,
            "last_name": null,
            "full_phone_number": "567993470",
            "city": "Anand",
            "post_code": "778 jkkk",
            "country_code": null,
            "phone_number": 567993470,
            "email": "Testdeviam1@yopmail.com",
            "activated": true,
            "user_type": "notary",
            "user_name": null,
            "platform": null,
            "suspend_until": null,
            "status": "regular",
            "role_id": 2,
            "full_name": "Dev User",
            "gender": null,
            "date_of_birth": null,
            "age": null,
            "country": "India",
            "address": "Dev User Dev User Dev User Dev Dev User Dev User D",
            "address_line_2": "hhyhh",
            "contact_name": "Test dev iam",
            "company_name": "Test devnotary",
            "is_online": true,
            "photo": {
                "url": "f76c29a9fb2dc556e138f1cbce07aed7411e/download.jpg"
            }
        }
    }
}

const googleEventMock = {
    "kind": "calendar#events",
    "etag": "\"p32sepidai6vog0o\"",
    "summary": "ashokkumar@deeporion.com",
    "description": "",
    "updated": "2024-09-13T04:59:08.563Z",
    "timeZone": "Asia/Kolkata",
    "accessRole": "owner",
    "defaultReminders": [
        {
            "method": "popup",
            "minutes": 10
        }
    ],
    "nextSyncToken": "CLjsyaqRv4gDELjsyaqRv4gDGAUg9P6UwQIo9P6UwQI=",
    "items": [
        {
            "kind": "calendar#event",
            "etag": "\"3452402362960000\"",
            "id": "s40tii85lak7fn4lk0en1vlv2k_20240917T113000Z",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=czQwdGlpODVsYWs3Zm40bGswZW4xdmx2MmtfMjAyNDA5MTdUMTEzMDAwWiBhc2hva2t1bWFyQGRlZXBvcmlvbi5jb20",
            "created": "2024-08-26T14:33:49.000Z",
            "updated": "2024-09-13T04:19:41.480Z",
            "summary": "Zoom Notary || Evening Scrum",
            "description": "Agenda: \n\n\u003cul\u003e\u003cli\u003eEveryone should be present in this call\u003c/li\u003e\u003cli\u003eExperts should update about their tasks/blockers/dependencies\u003c/li\u003e\u003cli\u003eAll  \n\n +918000403712 INDIA \n\n+448081694144 United Kingdom \n\n+18449814698 USA",
            "location": "https://meet.builder.ai/7a75836b6dae53bc6508fcc9fa4a8bdc846dd8f23fa87efd68311fc0bef2@79Ln_APzbTIiLUnnOQldxQ?passcode=b6dae53bc",
            "creator": {
                "email": "nikhil.upadhyay@builder.ai"
            },
            "organizer": {
                "email": "nikhil.upadhyay@builder.ai"
            },
            "start": {
                "dateTime": "2024-09-17T17:00:00+05:30",
                "timeZone": "Asia/Kolkata"
            },
            "end": {
                "dateTime": "2024-09-17T17:45:00+05:30",
                "timeZone": "Asia/Kolkata"
            },
            "recurringEventId": "s40tii85lak7fn4lk0en1vlv2k",
            "originalStartTime": {
                "dateTime": "2024-09-17T17:00:00+05:30",
                "timeZone": "Asia/Kolkata"
            },
            "iCalUID": "s40tii85lak7fn4lk0en1vlv2k@google.com",
            "sequence": 0,
            "attendees": [

                {
                    "email": "akashb.eai@svam.com",
                    "responseStatus": "needsAction"
                },
                {
                    "email": "payal.s@neosoftmail.com",
                    "responseStatus": "needsAction"
                }
            ],
            "reminders": {
                "useDefault": true
            },
            "eventType": "default"
        },
    ]
}


const outlookEventMock = [
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
                    "dateTime": "2024-08-17T17:30:00.0000000",
                    "timeZone": "UTC"
                },
                "end": {
                    "dateTime": "2024-08-17T18:00:00.0000000",
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

const getAllRequest = {
    end_user_notary_requests: {
      data: [
        {
          "id": "87",
          "type": "notary_request",
          "attributes": {
            "status": "in progress",
            "notary_id": null,
            "notary_service_type": "Business and Corporate Services",
            "priority": "Super Priority",
            "notarisation_method_id": 2,
            "jurisdiction_id": 1,
            "date": "2024-06-02T00:00:00.000Z",
            "notarised_document": 0,
            "file_documents": []
          },
          "relationships": {
            "jurisdiction": {
              "data": {
                "id": "1",
                "type": "jurisdiction"
              }
            },
            "notary": {
              "data": null
            },
            "notarisation_method": {
              "data": {
                "id": "1",
                "type": "notarisation_method"
              }
            },
            "account": {
              "data": {
                "id": "613",
                "type": "email_account"
              }
            }
          }
        },
      ]
    },
    new_notary_requests: {
      data: [
      {
        "id": "87",
        "type": "notary_request",
        "attributes": {
          "status": "in progress",
          "notary_id": null,
          "notary_service_type": "Business and Corporate Services",
          "priority": "Super Priority",
          "notarisation_method_id": 2,
          "jurisdiction_id": 1,
          "date": "2024-06-02T00:00:00.000Z",
          "notarised_document": 0,
          "file_documents": []
        },
        "relationships": {
          "jurisdiction": {
            "data": {
              "id": "1",
              "type": "jurisdiction"
            }
          },
          "notary": {
            "data": null
          },
          "notarisation_method": {
            "data": {
              "id": "1",
              "type": "notarisation_method"
            }
          },
          "account": {
            "data": {
              "id": "613",
              "type": "email_account"
            }
          }
        }
      },
    ]
    },
    notary_ongoing_requests: {
      data: [
        {
          "id": "87",
          "type": "notary_request",
          "attributes": {
            "status": "in progress",
            "notary_id": null,
            "notary_service_type": "Business and Corporate Services",
            "priority": "Super Priority",
            "notarisation_method_id": 2,
            "jurisdiction_id": 1,
            "date": "2024-06-02T00:00:00.000Z",
            "notarised_document": 0,
            "file_documents": []
          },
          "relationships": {
            "jurisdiction": {
              "data": {
                "id": "1",
                "type": "jurisdiction"
              }
            },
            "notary": {
              "data": null
            },
            "notarisation_method": {
              "data": {
                "id": "1",
                "type": "notarisation_method"
              }
            },
            "account": {
              "data": {
                "id": "613",
                "type": "email_account"
              }
            }
          }
        },
      ]
    }
  };

  const getAllServiceData = {
    data: [
      {
        "id": "11",
        "type": "service",
        "attributes": {
            "id": 11,
            "service_icon": {
                "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZWs9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4ffd3787400aece6afaa3ac00cb21f9d9ebf98b7/how_it_works.png"
            },
            "service_name": "Affidavits and Declarations",
            "service_description": "Preparing and certifying affidavits and statutory declarations, which are written statements sworn to be true, used for legal purposes.",
            "is_selected": false
        }
      },
      {
        "id": "11",
        "type": "service",
        "attributes": {
            "id": 11,
            "service_icon": {
                "url": "URL"
            },
            "service_name": "Affidavits and Declarations",
            "service_description": "Preparing and certifying affidavits and statutory declarations, which are written statements sworn to be true, used for legal purposes.",
            "is_selected": false
        }
      },
      {
        "id": "11",
        "type": "service",
        "attributes": {
            "id": 11,
            "service_icon": {
                "url": "URL"
            },
            "service_name": "Affidavits and Declarations",
            "service_description": "Preparing and certifying affidavits and statutory declarations, which are written statements sworn to be true, used for legal purposes.",
            "is_selected": false
        },
        
      },
      {
        "id": "11",
        "type": "service",
        "attributes": {
            "id": 11,
            "service_icon": {
                "url": "URL"
            },
            "service_name": "Affidavits and Declarations",
            "service_description": "Preparing and certifying affidavits and statutory declarations, which are written statements sworn to be true, used for legal purposes.",
            "is_selected": false
        },
        
      },
    ]
  };

const feature = loadFeature('./__tests__/features/Calendars-scenario.web.feature');

jest.mock("gapi-script", () => ({
    loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');

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

    test('User navigates to Calendars', ({ given, when, then }) => {
        let calendarsBlock: ShallowWrapper;
        let instance: Calendars;

        given('I am a User loading Calendars', () => {
            calendarsBlock = shallow(<Calendars {...screenProps} />);
        });

        when("User navigates to Calendars", () => {
            
            instance = calendarsBlock.instance() as Calendars;
            instance.setToken("token");
            instance.setGoogleAuth("google_auth");
            instance.setOutlookAuth("outlook_auth");
            instance.setdateInfo({startStr: "2024-09-01T00:00:00", endStr: "2024-09-07T23:59:59"});
            
            instance.getGoogleEvents("token");
            instance.getOutlookEvents("token");
            mockAPICall(instance, "getUserProfileDetailsApiCallId", notaryUserProfileResponse);
            mockAPICall(instance, "getGoogleEventCallId", googleEventMock);
            mockAPICall(instance, "getOutlookEventCallId", outlookEventMock);
            mockAPICall(instance, "renotaryCalendarEventCallId", renotaryCalendarEventMock);

        })
        then("Calendars will load without errors", () => {
            instance.getDate(new Date(), new Date());
            instance.closeModalHandle();
            instance.renderEventAttendee({ responseStatus: "accepted", email: "abc@gmail.com" }, 1);
            instance.renderEventAttendee({ responseStatus: "declined", email: "abc@gmail.com" }, 1);
            instance.renderEventAttendee({ responseStatus: "", email: "abc@gmail.com" }, 1);
            instance.renderEventContent(eventContent);
            instance.setEventInfo(eventContent);
            expect(calendarsBlock).toBeTruthy();
        });
        then("I can change the tab from calendar header", () => {
            instance.handleTabClick("renotary");
            instance.handleTabClick("google");
            instance.handleTabClick("outlook");


        });
        then("User can leave the screen without error", async() => {
            mockAPICall(instance, "getGoogleEventCallId", {error: {code: 401}});
            await GoogleAuthProvider.refreshAccessToken("refresh_token");
            mockAPICall(instance, "getGoogleEventCallId", {error: "error"});

            mockAPICall(instance, "getOutlookEventCallId", {error: {code: 'InvalidAuthenticationToken'}});
            await OutlookAuthProvider.getAccessToken();
            mockAPICall(instance, "getOutlookEventCallId", {error: "error"});
            instance.handleConflictClose();
            instance.handleMeetInvitees({meeting: {settings: {meeting_invitees: []}}})
            instance.componentWillUnmount();
            expect(calendarsBlock).toBeTruthy();
        })
    });

    test('User navigates to Calendars and click on book now button', ({ given, when, then }) => {
        let calendarsBlock: ShallowWrapper;
        let instance: Calendars;

        given('I am a User loading Calendars', () => {
            calendarsBlock = shallow(<Calendars {...screenProps} />);
        });

        when("User navigates to Calendars", () => {
            
            instance = calendarsBlock.instance() as Calendars;
            instance.setToken("token");

            mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest);
            mockAPICall(instance, "getServicesApiCallId", getAllServiceData)
            instance.handleGetAllNotaryRequestResponse(getAllRequest);
        })
        then("User can click on book now button", () => {
            instance.closeReqModal();
            instance.noButtonClick();
            instance.yesButtonClick();
            expect(calendarsBlock).toBeTruthy();
        });

        then("User can leave the screen without error", async() => {
            instance.setLoader(false);
            instance.setModal(false);
            instance.componentWillUnmount();
            instance.setGoogleToken("token");
            instance.setOutlookToken("token");
            instance.handleRenotaryCalendarEvents(renotaryCalendarEventMock)
            
            expect(calendarsBlock).toBeTruthy();
        })
    });


});
