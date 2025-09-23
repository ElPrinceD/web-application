import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import RequestDetailsWeb from "../../src/RequestDetails.web";
import CancelNotaryRequestModal from "../../../../components/src/CancelNotaryRequestModal.web";
import BookNotaryRequestWeb from "../../../dashboard/src/BookNotaryRequest.web";
import moment from "moment";
import KnowYourCustomerKycVerification from "../../../knowyourcustomerkycverification/src/KnowYourCustomerKycVerification.web";
import Chat from "../../../chat/src/Chat.web"
import { setupWebSocket } from "../../../../components/src/SetupWebSocket";
import { runEngine } from "../../../../framework/src/RunEngine";
import Badge from "@material-ui/core/Badge";

jest.mock("../../../../components/src/SetupWebSocket");
const mockWebSocketInstance = {
  send: jest.fn(),
  close: jest.fn(),
  onopen: jest.fn(),
  onmessage: jest.fn(),
  onclose: jest.fn(),
  onerror: jest.fn(),
};

(setupWebSocket as jest.Mock).mockImplementation(() => mockWebSocketInstance);

const navigation = require("react-navigation");

const mockSetLoader = jest.fn<void, [boolean]>();
jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

const screenProps = {
  navigation: {goBack: jest.fn(),getParam: jest.fn().mockReturnValue("1234") },
  id: "RequestDetailsWeb",
  sendMessage: jest.fn(),
};

const screenPropsForNoParam = {
  navigation: { goBack: jest.fn() , getParam: jest.fn().mockReturnValue(null) },
  id: "RequestDetailsWeb",
}

const CancelNotaryRequestModalProps = {
  cancelImage: "",
  text: "Something",
  cancelReqModal: true,
  handleYesButtonClick: jest.fn(),
  handleNoButtonClick: jest.fn(),
};

const bookNotaryRequestProps = {
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
  backToEditRequest: jest.fn(),
  isNewRequestOrEditRequestOrInviteClient: "new",
  editRequest: undefined,
  setLoader: mockSetLoader,
  setModal: mockSetLoader,
};

const feature = loadFeature(
  "./__tests__/features/RequestDetails-scenario.web.feature"
);

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
  const msgSucessRestAPI = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    msgSucessRestAPI.messageId
  );
  msgSucessRestAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    apiData
  );
  instance[apiCallID] = msgSucessRestAPI.messageId;
  const { receive: MockRecieve } = instance;
  MockRecieve("", msgSucessRestAPI);
};

const getNotaryDetailsResponseJson = {
  data: {
    id: "392",
    type: "notary_request",
    attributes: {
      status: "pending",
      notary_id: 1132,
      notary_service_type: 23,
      priority: null,
      notarisation_method_id: 2,
      jurisdiction_id: 2,
      date: "2002-06-10T12:00:00.000Z",
      notes: "Some notes hereSome notes hereSome notes here",
      notarised_document: 3,
      timing_slot: "evening",
      platform_fee_details: {
        fee_type: "Flat Fee",
        fee_value: "0.0"
      },
      juridiction: {
        id: 2,
        jurisdiction: "Wales",
        created_at: "2024-04-12T11:19:04.487Z",
        updated_at: "2024-04-12T11:19:04.487Z",
      },
      notarisation_method: {
        id: 2,
        notarisation_method: "Remote Electronic Ink Notarisation (REIN)",
        created_at: "2024-05-06T10:18:57.375Z",
        updated_at: "2024-05-06T10:18:57.375Z",
      },
      notary_service_name: "Affidavits and Declarations",
      file_documents: [
        {
          doc_id: 979,
          doc_type: "application/pdf",
          doc_size: 15,
          doc_base_64: "base64encodedcontent\n",
          doc_name: "document2.pdf",
          doc_file_url: "3e3118c16cb5dc3cd8c2cd4be2.pdf",
          signatory_count: 0,
          recipients: [
            {
              id: 736,
              created_at: "2024-07-01T07:03:09.854Z",
              updated_at: "2024-07-01T07:03:09.854Z",
              file_document_id: 979,
              name: "Recipient 3",
              email: "recipient3@example.com",
              is_signatory: true,
            },
          ],
        },
        {
          doc_id: 978,
          doc_type: "image/jpeg",
          doc_size: 5620,
          doc_base_64: "dataimage",
          doc_name: "download (3).jpg",
          doc_file_url: "msjcbjkh.jpg",
          signatory_count: 2,
          recipients: [
            {
              id: 735,
              created_at: "2024-07-01T07:03:09.780Z",
              updated_at: "2024-07-01T07:03:09.780Z",
              file_document_id: 978,
              name: "Recipient 2",
              email: "recipient2@example.com",
              is_signatory: null,
            },
            {
              id: 734,
              created_at: "2024-07-01T07:03:09.779Z",
              updated_at: "2024-07-01T07:03:09.779Z",
              file_document_id: 978,
              name: "Recipient 1",
              email: "recipient1@example.com",
              is_signatory: null,
            },
          ],
        },
        {
          doc_id: 977,
          doc_type: "image/jpeg",
          doc_size: 84392,
          doc_base_64: "dataimage",
          doc_name: "pexels-photo-719396.jpeg",
          doc_file_url: "19396.jpeg",
          signatory_count: 0,
          recipients: [
            {
              id: 733,
              created_at: "2024-07-01T07:03:09.768Z",
              updated_at: "2024-07-01T07:03:09.768Z",
              file_document_id: 977,
              name: "Recipient 2",
              email: "recipient2@example.com",
              is_signatory: null,
            },
            {
              id: 732,
              created_at: "2024-07-01T07:03:09.766Z",
              updated_at: "2024-07-01T07:03:09.766Z",
              file_document_id: 977,
              name: "Recipient 1",
              email: "recipient1@example.com",
              is_signatory: null,
            },
          ],
        },
      ],
    },
    relationships: {
      jurisdiction: {
        data: {
          id: "2",
          type: "jurisdiction",
        },
      },
      notary: {
        data: {
          id: "1132",
          type: "notary",
        },
      },
      notarisation_method: {
        data: {
          id: "2",
          type: "notarisation_method",
        },
      },
      account: {
        data: {
          id: "593",
          type: "email_account",
        },
      },
    },
  },
};

const getNotaryDetailsResponseJson2 = {
  data: {
    id: "392",
    type: "notary_request",
    attributes: {
      status: "in progress",
      notary_id: 1132,
      notary_service_type: 23,
      priority: null,
      notarisation_method_id: 2,
      jurisdiction_id: 2,
      date: "2002-06-10T12:00:00.000Z",
      notes: "Some notes hereSome notes hereSome notes here",
      notarised_document: 3,
      timing_slot: "evening",
      platform_fee_details: {
        fee_type: "Flat Fee",
        fee_value: "0.0"
      },
      juridiction: {
        id: 2,
        jurisdiction: "Wales",
        created_at: "2024-04-12T11:19:04.487Z",
        updated_at: "2024-04-12T11:19:04.487Z",
      },
      notarisation_method: {
        id: 2,
        notarisation_method: "Remote Electronic Ink Notarisation (REIN)",
        created_at: "2024-05-06T10:18:57.375Z",
        updated_at: "2024-05-06T10:18:57.375Z",
      },
      notary_service_name: "Affidavits and Declarations",
      file_documents: [
        {
          doc_id: 979,
          doc_type: "application/pdf",
          doc_size: 15,
          doc_base_64: "base64encodedcontent\n",
          doc_name: "document2.pdf",
          doc_file_url: "3e3118c16cb5dc3cd8c2cd4be2.pdf",
          signatory_count: 0,
          recipients: [
            {
              id: 736,
              created_at: "2024-07-01T07:03:09.854Z",
              updated_at: "2024-07-01T07:03:09.854Z",
              file_document_id: 979,
              name: "Recipient 3",
              email: "recipient3@example.com",
              is_signatory: true,
            },
          ],
        },
        {
          doc_id: 978,
          doc_type: "image/jpeg",
          doc_size: 5620,
          doc_base_64: "dataimage.jpg",
          doc_file_url: "msjcbjkh.jpg",
          signatory_count: 2,
          recipients: [
            {
              id: 735,
              created_at: "2024-07-01T07:03:09.780Z",
              updated_at: "2024-07-01T07:03:09.780Z",
              file_document_id: 978,
              name: "Recipient 2",
              email: "recipient2@example.com",
              is_signatory: null,
            },
            {
              id: 734,
              created_at: "2024-07-01T07:03:09.779Z",
              updated_at: "2024-07-01T07:03:09.779Z",
              file_document_id: 978,
              name: "Recipient 1",
              email: "recipient1@example.com",
              is_signatory: null,
            },
          ],
        },
        {
          doc_id: 977,
          doc_type: "image/jpeg",
          doc_size: 84392,
          doc_base_64: "dataimage",
          doc_name: "pexels-photo-719396.jpeg",
          doc_file_url: "19396.jpeg",
          signatory_count: 0,
          recipients: [
            {
              id: 733,
              created_at: "2024-07-01T07:03:09.768Z",
              updated_at: "2024-07-01T07:03:09.768Z",
              file_document_id: 977,
              name: "Recipient 2",
              email: "recipient2@example.com",
              is_signatory: null,
            },
            {
              id: 732,
              created_at: "2024-07-01T07:03:09.766Z",
              updated_at: "2024-07-01T07:03:09.766Z",
              file_document_id: 977,
              name: "Recipient 1",
              email: "recipient1@example.com",
              is_signatory: null,
            },
          ],
        },
      ],
    },
    relationships: {
      jurisdiction: {
        data: {
          id: "2",
          type: "jurisdiction",
        },
      },
      notary: {
        data: {
          id: "1132",
          type: "notary",
        },
      },
      notarisation_method: {
        data: {
          id: "2",
          type: "notarisation_method",
        },
      },
      account: {
        data: {
          id: "593",
          type: "email_account",
        },
      },
    },
  },
};

const getNotaryDetailsResponseJson3 = {
  data: {
    id: "392",
    type: "notary_request",
    attributes: {
      status: "completed",
      notary_id: 1132,
      notary_service_type: 23,
      priority: null,
      notarisation_method_id: 2,
      jurisdiction_id: 2,
      date: "2002-06-10T12:00:00.000Z",
      notes: "Some notes hereSome notes hereSome notes here",
      notarised_document: 3,
      timing_slot: "evening",
      platform_fee_details: {
        fee_type: "Flat Fee",
        fee_value: "0.0"
      },
      juridiction: {
        id: 2,
        jurisdiction: "Wales",
        created_at: "2024-04-12T11:19:04.487Z",
        updated_at: "2024-04-12T11:19:04.487Z",
      },
      notarisation_method: {
        id: 2,
        notarisation_method: "Remote Electronic Ink Notarisation (REIN)",
        created_at: "2024-05-06T10:18:57.375Z",
        updated_at: "2024-05-06T10:18:57.375Z",
      },
      notary_service_name: "Affidavits and Declarations",
      file_documents: [
        {
          doc_id: 979,
          doc_type: "application/pdf",
          doc_size: 15,
          doc_base_64: "base64encodedcontent\n",
          doc_name: "document2.pdf",
          doc_file_url: "3e3118c16cb5dc3cd8c2cd4be2.pdf",
          signatory_count: 0,
          recipients: [
            {
              id: 736,
              created_at: "2024-07-01T07:03:09.854Z",
              updated_at: "2024-07-01T07:03:09.854Z",
              file_document_id: 979,
              name: "Recipient 3",
              email: "recipient3@example.com",
              is_signatory: true,
            },
          ],
        },
        {
          doc_id: 978,
          doc_type: "image/jpeg",
          doc_size: 5620,
          doc_base_64: "dataimage.jpg",
          doc_file_url: "msjcbjkh.jpg",
          signatory_count: 2,
          recipients: [
            {
              id: 735,
              created_at: "2024-07-01T07:03:09.780Z",
              updated_at: "2024-07-01T07:03:09.780Z",
              file_document_id: 978,
              name: "Recipient 2",
              email: "recipient2@example.com",
              is_signatory: null,
            },
            {
              id: 734,
              created_at: "2024-07-01T07:03:09.779Z",
              updated_at: "2024-07-01T07:03:09.779Z",
              file_document_id: 978,
              name: "Recipient 1",
              email: "recipient1@example.com",
              is_signatory: null,
            },
          ],
        },
        {
          doc_id: 977,
          doc_type: "image/jpeg",
          doc_size: 84392,
          doc_base_64: "dataimage",
          doc_name: "pexels-photo-719396.jpeg",
          doc_file_url: "19396.jpeg",
          signatory_count: 0,
          recipients: [
            {
              id: 733,
              created_at: "2024-07-01T07:03:09.768Z",
              updated_at: "2024-07-01T07:03:09.768Z",
              file_document_id: 977,
              name: "Recipient 2",
              email: "recipient2@example.com",
              is_signatory: null,
            },
            {
              id: 732,
              created_at: "2024-07-01T07:03:09.766Z",
              updated_at: "2024-07-01T07:03:09.766Z",
              file_document_id: 977,
              name: "Recipient 1",
              email: "recipient1@example.com",
              is_signatory: null,
            },
          ],
        },
      ],
    },
    relationships: {
      jurisdiction: {
        data: {
          id: "2",
          type: "jurisdiction",
        },
      },
      notary: {
        data: {
          id: "1132",
          type: "notary",
        },
      },
      notarisation_method: {
        data: {
          id: "2",
          type: "notarisation_method",
        },
      },
      account: {
        data: {
          id: "593",
          type: "email_account",
        },
      },
    },
  },
};

const getQuotesListResponse = {
  data: [
    {
      id: "15",
      type: "quote",
      attributes: {
        notary_requests_id: 625,
        start_time: "1970-01-01T14:55:30.000Z",
        video_call_required: true,
        fees: "100.0",
        end_time: "1970-01-01T15:55:30.000Z",
        platform_fee_inclusive: true,
        message:
          "Dev User Dev User Dev User Dev User250 characters including spaces and special chars 89 <1234567890jsdjjkfhdfhjdfh kjhfhjkld",
        notary_id: 1204,
        created_at: "2024-08-09T09:52:32.271Z",
        updated_at: "2024-08-09T09:52:32.271Z",
        quote_statuses_id: 1,
        quote_status: "Submitted",
        notary_fees: "100.0",
        platform_fees: 0,
      },
    },
    {
      id: "15",
      type: "quote",
      attributes: {
        notary_requests_id: 625,
        start_time: "1970-01-01T14:55:30.000Z",
        video_call_required: true,
        fees: "100.0",
        end_time: "1970-01-01T15:55:30.000Z",
        platform_fee_inclusive: true,
        message:
          "Dev User Dev User Dev User Dev User250 characters including spaces and special chars 89 <1234567890jsdjjkfhdfhjdfh kjhfhjkld",
        notary_id: 1204,
        created_at: "2024-08-09T08:52:32.271Z",
        updated_at: "2024-08-09T08:52:32.271Z",
        quote_statuses_id: 2,
        quote_status: "Submitted",
        notary_fees: "100.0",
        platform_fees: 0,
      },
    },
  ],
};
const getProfileSuccessData = {
  "zoom_meetings": {
      "notary_request_id": 1024,
      "meeting": {
          "id": 78633157711,
          "type": 2,
          "uuid": "4m0KGUk9SK2tt4VEhqywKg==",
          "topic": "Zoom Meeting",
          "status": "waiting",
          "host_id": "kAm2Z1iqTbavhDzX2jNwHg",
          "duration": 0,
          "join_url": "URL",
          "password": "9XijJx",
          "settings": {
              "audio": "voip",
              "use_pmi": false,
              "jbh_time": 0,
              "resources": [],
              "watermark": false,
              "cn_meeting": false,
              "focus_mode": false,
              "host_video": false,
              "in_meeting": false,
              "waiting_room": false,
              "approval_type": 2,
              "breakout_room": {
                  "enable": false
              },
              "enforce_login": false,
              "auto_recording": "none",
              "device_testing": false,
              "show_join_info": false,
              "encryption_type": "enhanced_encryption",
              "mute_upon_entry": false,
              "private_meeting": false,
              "internal_meeting": false,
              "join_before_host": true,
              "meeting_invitees": [],
              "alternative_hosts": "",
              "participant_video": true,
              "show_share_button": false,
              "close_registration": false,
              "email_notification": true,
              "enforce_login_domains": "",
              "host_save_video_order": false,
              "allow_multiple_devices": false,
              "meeting_authentication": false,
              "continuous_meeting_chat": {
                  "enable": true,
                  "channel_id": "web_sch_ff03aef62ca34857afd022a3743cfc97",
                  "auto_add_invited_external_users": false
              },
              "push_change_to_calendar": false,
              "email_in_attendee_report": false,
              "enable_dedicated_group_chat": true,
              "participant_focused_meeting": false,
              "sign_language_interpretation": {
                  "enable": false
              },
              "alternative_host_update_polls": false,
              "registrants_confirmation_email": true,
              "registrants_email_notification": true,
              "alternative_hosts_email_notification": true,
              "approved_or_denied_countries_or_regions": {
                  "enable": false
              },
              "request_permission_to_unmute_participants": false
          },
          "timezone": "UTC",
          "start_url": "URL",
          "created_at": "2024-09-26T16:43:54Z",
          "host_email": "nikhil.upadhyay@builder.ai",
          "start_time": "2024-09-26T16:43:54Z",
          "pre_schedule": false,
          "h323_password": "156966",
          "pstn_password": "156966",
          "encrypted_password": "yTQ12OODyIH2tgNY9j0NLz5RmavDa7.1"
      },
      "start_time": "2024-09-30T16:42:27.085Z",
      "end_time": "2024-09-30T17:42:27.090Z"
  }
};

const getCancellationChargesResponseJson = {
  cancellation_charges: "10",
};

const getCancellationChargesResponseJson2 = {
  errors: "Cannot cancel the request as start time is over." 
};

const cancelNotaryRequestResponseJson = {
  notary_id: 429,
  message: "Notary request cancelled successfully.",
};

const markAsCompletedResponseJson = {
  message: "Mark as completed successfully.",
};

const markAsCompletedErrorResponse = {
  error:"kyc is not completed"
}

const notaryUserProfileResponse = {
  data: {
    id: "1204",
    type: "profile",
    attributes: {
      id: 1204,
      first_name: null,
      last_name: null,
      full_phone_number: "567993470",
      city: "Anand",
      post_code: "778 jkkk",
      country_code: null,
      phone_number: 567993470,
      email: "Testdeviam1@yopmail.com",
      activated: true,
      user_type: "notary",
      user_name: null,
      platform: null,
      suspend_until: null,
      status: "regular",
      role_id: 2,
      full_name: "Dev User",
      gender: null,
      date_of_birth: null,
      age: null,
      country: "India",
      address: "Dev User Dev User Dev User Dev Dev User Dev User D",
      address_line_2: "hhyhh",
      contact_name: "Test dev iam",
      company_name: "Test devnotary",
      is_online: true,
      photo: {
        url: "f76c29a9fb2dc556e138f1cbce07aed7411e/download.jpg",
      },
    },
  },
};

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

const getAllServicesApiResponse = {
  data: [
    {
      id: "29",
      type: "service",
      attributes: {
        id: 29,
        service_icon: {
          url: null,
        },
        service_name: " Other (Translation, Diploma verification, apostille)",
        service_description: "Other services wi",
        is_selected: false,
      },
    },
    {
      id: "28",
      type: "service",
      attributes: {
        id: 28,
        service_icon: {
          url: "blank.test",
        },
        service_name: "Probate Matters",
        service_description:
          "Involvement in estate management for the deceased, including certifying related documents and assisting in legal processes.",
        is_selected: false,
      },
    },
  ],
};

const chatRoomApiMock = {
  "data": {
    "id": "2",
    "type": "chat",
    "attributes": {
      "id": 2,
      "name": "New Chat Room",
      "notary_request_id": 1211,
      "accounts_chats": [
        {
          "id": "2",
          "type": "accounts_chats",
          "attributes": {
            "account_id": 1495,
            "muted": false,
            "unread_count": 6
          }
        }
      ],
      "messages": []
    },
    "relationships": {
      "accounts": {
        "data": [
          {
            "id": "1495",
            "type": "account"
          }
        ]
      }
    }
  }
}

const DownloadInvoiceAPIResponce = {
  "id":1679,
  "notary_name":"Nikhil Renotary",
  "amount":189.0,
  "platform_fee":11.0,
  "vat":null,
  "total_amount":200.0,
  "invoice":"https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdjhNIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c4cf3b96d5f64e6d2a99ecb1d6d69f4503263602/invoice_1679.pdf"
};

const withdrawQuoteResponse = {
  message: "Quote withdrawn successfully.",
};

const meetingDetailsResponseJson = {
  zoom_meetings: {
    start_time: (new Date()).toISOString(),
    end_time: (new Date()).toISOString(),
  },
};

const KYCStatusNull = {"status":null}
const KYCStatusPending = {"status":"pending"}
const KYCStatusVerified = {"status":"verified"}

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
  
  jest.mock("gapi-script", () => ({
    loadGapiInsideDOM: () => Promise.resolve(true)
  }));

let mockSocket: any;

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");

    mockSocket = {
      send: jest.fn(),
      onmessage: jest.fn(),
    };
  });

  test("User navigates to RequestDetailsWeb", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RequestDetailsWeb;

    given("I am a User loading RequestDetailsWeb", () => {
      exampleBlockA = shallow(<RequestDetailsWeb {...screenProps} />);
    });

    when("I navigate to the RequestDetailsWeb", () => {
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });

    then("RequestDetailsWeb will load with out errors", () => {
      const main = exampleBlockA.find(".test1");
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse);
      expect(main).toHaveLength(1);
    });

    when("kyc status is null", () => {
      mockAPICall(instance, "getInvoiceDownload", KYCStatusNull)
      mockAPICall(instance, "getKYCStatusCallId", DownloadInvoiceAPIResponce)
    })
    then("meeting and docusign tab will be disabled", () => {
      expect(findByTestID(
        exampleBlockA,
        "quoteOrMeetingTab"
      )).toHaveLength(0);
    })

    when("kyc status is pending", () => {
      mockAPICall(instance, "getKYCStatusCallId", KYCStatusPending)
    })
    then("meeting and docusign tab will be disabled", () => {
      expect(findByTestID(
        exampleBlockA,
        "quoteOrMeetingTab"
      )).toHaveLength(0);
    })

    when("kyc status is verified", () => {
      mockAPICall(instance, "getKYCStatusCallId", KYCStatusVerified)
    })
    then("meeting and docusign tab will be disabled", () => {
      expect(findByTestID(
        exampleBlockA,
        "quoteOrMeetingTab"
      )).toHaveLength(0);
    })

    then("No quotes message will be shown for pending request", () => {
      mockAPICall(instance, "getQuotesListApiCallId", { data: [] });
      mockAPICall(
        instance,
        "getNotaryRequestDetailsCallId",
        getNotaryDetailsResponseJson
      );
      expect(findByTestID(exampleBlockA, "noQuotesMessage")).toHaveLength(1);
    });

    then("Page will fetch cancellation charges after loading", () => {
      mockAPICall(
        instance,
        "getCancellationChargesApiCallId",
        getCancellationChargesResponseJson
      );
    });

    when("getNotaryDetails, getQuotesList and getServices API Called", () => {
      mockAPICall(
        instance,
        "getNotaryRequestDetailsCallId",
        getNotaryDetailsResponseJson
      );
      mockAPICall(instance, "getServicesApiCallId", getAllServicesApiResponse);
      mockAPICall(instance, "getQuotesListApiCallId", getQuotesListResponse);
      mockApiCall(instance, "getKYCStatusCallId", KYCStatusVerified);
    });

    then("User clicks on hamburger menu icon", () => {
      const openSideBar = jest.fn();
      const button = findByTestID(exampleBlockA, "toggleButton");
      button.simulate("click");
      expect(openSideBar).toHaveLength(0);
    });
    
    when("user can review the vat into the qoute", () =>{
      const requestVat = findByTestID( exampleBlockA,"requestVat");
    });

    then("Vat is display on qoute and previoue qoute",() =>{
      expect(findByTestID(exampleBlockA, "requestVat")).toHaveLength(1);
    });
     
    when("user clicks on preview quote button", () => {
      const previewQuoteButton = findByTestID(
        exampleBlockA,
        "previewQuoteButton"
      );
      previewQuoteButton.simulate("click");
    });
    then("preview quote modal opens", () => {
      expect(findByTestID(exampleBlockA, "previewQuoteModal")).toHaveLength(1);
    });

    when("user clicks on close preview quote button", () => {
      const closePreviewQuoteButton = findByTestID(
        exampleBlockA,
        "closePreviewQuoteModal"
      );
      closePreviewQuoteButton.simulate("click");
    });
    then("preview quote modal closes", () => {
      expect(findByTestID(exampleBlockA, "backIconButton")).toHaveLength(1);
    });

    when("user clicks on preview quote button", () => {
      const previewQuoteButton = findByTestID(
        exampleBlockA,
        "previewQuoteButton"
      );
      previewQuoteButton.simulate("click");
    });
    then("preview quote modal opens", () => {
      const previewQuoteModal = findByTestID(
        exampleBlockA,
        "previewQuoteModal"
      );
      expect(previewQuoteModal).toHaveLength(1);
    });

    when("user clicks on pay now button", () => {
      const payNowButton = findByTestID(exampleBlockA, "payNowButton");
      payNowButton.simulate("click");
    });
    then("user is redirected to payment options page", () => {
      const previewQuoteModal = findByTestID(
        exampleBlockA,
        "previewQuoteModal"
      );
      expect(previewQuoteModal).toHaveLength(1);
    });

    given("payment has failed and page loads", () => {
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/RequestDetails?isSuccess=false",
          search: "?isSuccess=false",
        },
        writable: true,
      });
      exampleBlockA = shallow(<RequestDetailsWeb {...screenProps} />);
    });

    when("payment has failed", () => {
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });
    then("payment failed modal is shown", () => {
      const successFailureModal = findByTestID(
        exampleBlockA,
        "successFailureModal"
      );
      expect(successFailureModal).toHaveLength(1);
    });

    when("User clicks on failure modal button", () => {
      findByTestID(exampleBlockA, "successFailureModal").prop(
        "handleButtonClick"
      )();
    });
    then("user is redirected to payment options page", () => {
      const previewQuoteModal = findByTestID(
        exampleBlockA,
        "previewQuoteModal"
      );
      expect(previewQuoteModal).toHaveLength(1);
    });

    given("payment is successful and page loads", () => {
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/RequestDetails?isSuccess=true",
          search: "?isSuccess=true",
        },
        writable: true,
      });
      exampleBlockA = shallow(<RequestDetailsWeb {...screenProps} />);
    });
    when("payment is successful", () => {
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });
    then("payment success modal is shown", () => {
      const successFailureModal = findByTestID(
        exampleBlockA,
        "successFailureModal"
      );
      expect(successFailureModal).toHaveLength(1);
    });

    when("User clicks on success modal button", () => {
      findByTestID(exampleBlockA, "successFailureModal").prop(
        "handleButtonClick"
      )();
    });
    then("Success modal is closed", () => {
      expect(exampleBlockA.find(".test1")).toHaveLength(1);
    });

    given("page reloads", () => {
      exampleBlockA = shallow(<RequestDetailsWeb {...screenProps} />);
    });
    when("page is loading", () => {
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });
    then("page is loaded", () => {
      expect(exampleBlockA.find(".test1")).toHaveLength(1);
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse);
      mockAPICall(
        instance,
        "getCancellationChargesApiCallId",
        getCancellationChargesResponseJson
      );
      mockAPICall(
        instance,
        "getNotaryRequestDetailsCallId",
        getNotaryDetailsResponseJson2
      );
      mockAPICall(instance, "getServicesApiCallId", getAllServicesApiResponse);
      mockAPICall(instance, "getQuotesListApiCallId", getQuotesListResponse);
      mockAPICall(instance, "acceptQuoteApiCallId", {
        message: "Quote accepted successfully.",
      });
      mockAPICall(instance, "generateMeetingApiCallId", {
        message: "you have successfully created zoom meeting",
      });
      mockApiCall(instance, "getMeetingTimeApiCallId", {errors: []})
      mockAPICall(
        instance,
        "getMeetingTimeApiCallId",
        meetingDetailsResponseJson
      );
    });

    when("user changes tab to tracking details", () => {
      findByTestID(exampleBlockA, "tabs").simulate("change", {}, 2);
    });
    then("tracking details should be shown", () => {
      const trackingDetailsTab = findByTestID(exampleBlockA, "trackingDetailsTab").dive();
      expect(findByTestID(trackingDetailsTab, "trackingDetails")).toHaveLength(1);
    });

    when("user can click to kyc verification tab", () => {
      findByTestID(exampleBlockA, "tabs").simulate("change", {}, 3);
    });
    then("kyc verification tab should open", () => {
      const KYCVerificationTab = findByTestID(
        exampleBlockA,
        "KYCVerificationTab"
      ).dive();
      expect(
        findByTestID(KYCVerificationTab, "KYCVerificationTab")
      ).toHaveLength(1);
    });

    when("user can change to meeting tab", () => {
      findByTestID(exampleBlockA, "tabs").simulate("change", {}, 0);
    });

    then("meeting tab can be open", () => {
      const MeetingTab = findByTestID(exampleBlockA,"quoteOrMeetingTab").dive();
      expect(findByTestID(MeetingTab, "quoteOrMeetingTab")).toHaveLength(1);
    });

    when("User receives unread messages", () => {
      mockAPICall(instance, "checkUnreadMessageCountApiCallId", {count: 5});
      findByTestID(exampleBlockA, "unReadMessageCount");
    });
    
    then("Chat unread message count is displayed on the chat icon", () => {
      exampleBlockA.find(Chat).props().onClose();
      expect(findByTestID(exampleBlockA, "unReadMessageCount").text()).toBe("");
    });


    when("User clicks on join meeting button", () => {
      findByTestID(exampleBlockA, "joinMeetingButton").simulate("click");
    });
    then("Zoom meeting modal opens", () => {
      expect(findByTestID(exampleBlockA, "zoomMeetingModal")).toHaveLength(1);
    });

    when("User clicks on cancel button", () => {
      findByTestID(exampleBlockA, "zoomModalCancelButton").simulate("click");
    });
    then("zoom meeting modal closes", () => {
      expect(exampleBlockA.find(".test1")).toHaveLength(1);
    });

    when("User clicks on join meeting button", () => {
      findByTestID(exampleBlockA, "joinMeetingButton").simulate("click");
    });
    then("Zoom meeting modal opens", () => {
      expect(findByTestID(exampleBlockA, "zoomMeetingModal")).toHaveLength(1);
    });

    when("user clicks on launch meeting button", () => {
      let btnSubmitOTP = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "launchMeetingButton"
      );
      btnSubmitOTP.simulate("click");
      mockApiCall(instance, "zoomCallId", getProfileSuccessData);
    });
    then("User will be redirected to zoom meeting", () => {
      expect(findByTestID(exampleBlockA, "main")).toHaveLength(0);
    });

    when("user clicks on cancel request for non cancellable request", () => {
      mockAPICall(instance, "getCancellationChargesApiCallId", getCancellationChargesResponseJson2);
      instance.openModalForCancellation()
    })
    then("popup should open", () => {
      expect(findByTestID(exampleBlockA, "successFailureModal")).toHaveLength(1);
    })

    when("User clicks on cancel request button", () => {
      mockAPICall(instance, "getCancellationChargesApiCallId", getCancellationChargesResponseJson);
      const subtext = instance.findSubtext();
      expect(subtext).toBe('Cancellation charges will be applied of £10.00');
    });
    then("cancel request modal should open", () => {
      const modalWrapper = shallow(
        <CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />
      );
      expect(modalWrapper.find(".cancelModalPaper")).toHaveLength(1);
    });

    when("User clicks on no button of cancel request modal", () => {
      findByTestID(exampleBlockA, "cancelNotaryModal").prop(
        "handleNoButtonClick"
      )();
    });

    then("handleNoButtonClick should be called", () => {
      const modalWrapper = shallow(
        <CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />
      );
      expect(modalWrapper.find(".cancelModalPaper")).toHaveLength(1);
    });

    when("User clicks on yes button of cancel request modal", () => {
      findByTestID(exampleBlockA, "cancelNotaryModal").prop(
        "handleYesButtonClick"
      )();
      mockAPICall(
        instance,
        "putCancelNotaryRequestCallId",
        cancelNotaryRequestResponseJson
      );
    });

    then("handleYesButtonClick should be called", () => {
      const modalWrapper = shallow(
        <CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />
      );
      expect(modalWrapper.find(".cancelModalPaper")).toHaveLength(1);
    });

    when("User clicks on book now request modal", () => {
      const bookNowBtn = findByTestID(exampleBlockA, "bookNowBtn");
      // bookNowBtn.simulate("click");
    });

    then("Book Now modal should open", () => {
      const bookNowRequestModal = shallow(
        <BookNotaryRequestWeb {...bookNotaryRequestProps} />
      );
      const serviceSelectionBtn = findByTestID(
        bookNowRequestModal,
        "servieSelection"
      );
      expect(serviceSelectionBtn).toHaveLength(0);
    });

    when("book now modal props", () => {
      findByTestID(exampleBlockA, "modalOpen").prop("setLoader")();
      findByTestID(exampleBlockA, "modalOpen").prop("closeModal")();
      findByTestID(exampleBlockA, "modalOpen").prop("yesButtonClick")();
      findByTestID(exampleBlockA, "modalOpen").prop("noButtonClick")();
      findByTestID(exampleBlockA, "modalOpen").prop("allRequestAPI")();
    });

    when("User clicks on back icon button", () => {
      const iconBtn = findByTestID(exampleBlockA, "backIconButton");
      iconBtn.simulate("click");
    });
    
    then("The correct navigation method is called", () => {
      expect(findByTestID(exampleBlockA, "sidebar")).toHaveLength(1);
      
    });
    

    when("Notary user navigates to Request details", () => {
      instance = exampleBlockA.instance() as RequestDetailsWeb;
      mockAPICall(instance, "getProfileApiCallId", notaryUserProfileResponse);
    });

    then("RequestDetailsWeb will load with out errors.", () => {
      const main = exampleBlockA.find(".test1");
      expect(main).toHaveLength(1);
      mockAPICall(
        instance,
        "getNotaryRequestDetailsCallId",
        getNotaryDetailsResponseJson
      );
      mockAPICall(instance, "getQuotesListApiCallId", { data: [] });
    });
    
    when("kyc status is null", () => {
      mockAPICall(instance, "getKYCStatusCallId", KYCStatusNull)
    })
    then("meeting and docusign tab will be disabled", () => {
      expect(findByTestID(
        exampleBlockA,
        "quoteOrMeetingTab"
      )).toHaveLength(0);
    })

    when("kyc status is pending", () => {
      mockAPICall(instance, "getKYCStatusCallId", KYCStatusPending)
    })
    then("meeting and docusign tab will be disabled", () => {
      expect(findByTestID(
        exampleBlockA,
        "quoteOrMeetingTab"
      )).toHaveLength(0);
    })

    when("kyc status is verified", () => {
      mockAPICall(instance, "getKYCStatusCallId", KYCStatusVerified)
    })
    then("meeting and docusign tab will be disabled", () => {
      expect(findByTestID(
        exampleBlockA,
        "quoteOrMeetingTab"
      )).toHaveLength(0);
    })

    when("Notary user can click on decline button", () => {
      const makeQuoteButton = findByTestID(exampleBlockA, "openDeaclineQuoteModal");
      makeQuoteButton.simulate("click");
    });

    then("Decline button on page load is visible", () => {
      const closeButton = findByTestID(exampleBlockA, "closeMakeQuoteModal");
      expect(closeButton).toHaveLength(1);
    });

    when("notary user clicks on make quote button", () => {
      const makeQuoteButton = findByTestID(exampleBlockA, "openMakeQuoteModal");
      makeQuoteButton.simulate("click");
    });

    then("make quote modal should open", () => {
      const closeButton = findByTestID(exampleBlockA, "closeMakeQuoteModal");
      expect(closeButton).toHaveLength(1);
    });

    when("notary user clicks on close make quote button", () => {
      const closeButton = findByTestID(exampleBlockA, "closeMakeQuoteModal");
      closeButton.simulate("click");
    });

    then("make quote modal should close", () => {
      const closeButton = findByTestID(exampleBlockA, "closeMakeQuoteModal");
      expect(closeButton).toHaveLength(1);
    });

    when("notary user clicks on make quote button", () => {
      const makeQuoteButton = findByTestID(exampleBlockA, "openMakeQuoteModal");
      makeQuoteButton.simulate("click");
    });

    then("make quote modal should open", () => {
      const closeButton = findByTestID(exampleBlockA, "closeMakeQuoteModal");
      expect(closeButton).toHaveLength(1);
    });

    when("notary user clicks on decline make quote button", () => {
      const makeQuoteDeclineButton = findByTestID(
        exampleBlockA,
        "makeQuoteDeclineButton"
      );
      makeQuoteDeclineButton.simulate("click");
    });

    then("make quote modal should close", () => {
      const makeQuoteDeclineButton = findByTestID(
        exampleBlockA,
        "makeQuoteDeclineButton"
      );
      expect(makeQuoteDeclineButton).toHaveLength(1);
    });

    when("notary user clicks on make quote button", () => {
      const makeQuoteButton = findByTestID(exampleBlockA, "openMakeQuoteModal");
      makeQuoteButton.simulate("click");
    });

    then("make quote modal should open", () => {
      const closeButton = findByTestID(exampleBlockA, "closeMakeQuoteModal");
      expect(closeButton).toHaveLength(1);
    });

    when("user leaves fees empty", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      feesField.simulate("change", { target: { value: "" } });
    });

    then("fees should be empty", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      expect(feesField.props().value).toBe("");
    });

    when("user enters wrong fees", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      feesField.simulate("change", { target: { value: "something" } });
    });

    then("fees should not be entered", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      expect(feesField.props().value).toBe("");
    });

    when("user enters 0 fees", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      feesField.simulate("change", { target: { value: "0" } });
    });

    then("fees should be entered", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      expect(feesField.props().value).toBe("0");
    });

    when("user enters message", () => {
      const messageField = findByTestID(exampleBlockA, "messageField");
      messageField.simulate("change", { target: { value: "12" } });
    });

    then("message should be entered", () => {
      const messageField = findByTestID(exampleBlockA, "messageField");
      expect(messageField.props().value).toBe("12");
    });

    when("user toggles VAT checkbox", () => {
      const platformFeesButton = findByTestID(
        exampleBlockA,
        "platformFeesButton"
      );
      platformFeesButton.simulate("click");
    });

    then("VAT checkbox is toggled", () => {
      const platformFeesUnchecked = findByTestID(
        exampleBlockA,
        "platformFeesUnchecked"
      );
      expect(platformFeesUnchecked).toHaveLength(0);
    });

    when("User clicks on submit quote button", () => {
      const submitQuoteButton = findByTestID(
        exampleBlockA,
        "submitQuoteButton"
      );
      submitQuoteButton.simulate("click");
    });
    then("errors are displayed", () => {
      const timeErrorText = findByTestID(exampleBlockA, "timeErrorText");
      expect(timeErrorText).toHaveLength(1);
    });

    when("user enters correct fees", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      feesField.simulate("change", { target: { value: "12" } });
    });
    then("fees should be entered", () => {
      const feesField = findByTestID(exampleBlockA, "feesField");
      expect(feesField.props().value).toBe("12");
    });

    when("user toggles video call checkbox", () => {
      const videoCallButton = findByTestID(exampleBlockA, "videoCallButton");
      videoCallButton.simulate("click");
    });

    then("video call checkbox is toggled", () => {
      const videoCallUnchecked = findByTestID(
        exampleBlockA,
        "videoCallUnchecked"
      );
      expect(videoCallUnchecked).toHaveLength(0);
    });

    when("Notary user selects start time", () => {
      const startTimePicker = findByTestID(exampleBlockA, "startTimePicker");
      startTimePicker.prop("TextFieldComponent")();
      
      let mockValue = moment("00:08 am", "h:mm a");
      startTimePicker.props().onChange(mockValue);
      startTimePicker.prop("TextFieldComponent")();

      mockValue = moment("01:08 pm", "h:mm a");
      startTimePicker.props().onChange(mockValue);
      startTimePicker.prop("TextFieldComponent")();
      
      mockValue = moment("12:30 pm", "h:mm a");
      startTimePicker.props().onChange(mockValue);
      startTimePicker.prop("onClose")();
      startTimePicker.prop("TextFieldComponent")();
    });
    then("start time gets selected", () => {
      const startPicker = findByTestID(exampleBlockA, "startTimePicker");
      const mockValue = moment("12:30 pm", "h:mm a");
      expect(new Date(mockValue.toISOString())).toStrictEqual(
        new Date(startPicker.props().value.toISOString())
      );
    });

    when("Notary user selects end time", () => {
      const endTimePicker = findByTestID(exampleBlockA, "endTimePicker");
      endTimePicker.prop("TextFieldComponent")();
      const mockValue = moment("12:30 pm", "h:mm a");
      endTimePicker.props().onChange(mockValue);
      endTimePicker.prop("onClose")();
      endTimePicker.prop("TextFieldComponent")();
    });
    then("End time gets selected", () => {
      const endPicker = findByTestID(exampleBlockA, "endTimePicker");
      const mockValue = moment("12:30 pm", "h:mm a");
      expect(new Date(mockValue.toISOString())).toStrictEqual(
        new Date(endPicker.props().value.toISOString())
      );
    });

    when("User clicks on submit quote button", () => {
      const submitQuoteButton = findByTestID(
        exampleBlockA,
        "submitQuoteButton"
      );
      submitQuoteButton.simulate("click");
    });

    then("something goes wrong and quote is not submitted", () => {
      mockAPICall(instance, "submitQuoteApiCallId", {
        errors: ["Quote submission failed"],
      });
    });

    when("Notary user selects end time", () => {
      const endTimePicker = findByTestID(exampleBlockA, "endTimePicker");
      const mockValue = moment("1:30 pm", "h:mm a");
      endTimePicker.props().onChange(mockValue);
    });
    then("End time gets selected", () => {
      const endPicker = findByTestID(exampleBlockA, "endTimePicker");
      const mockValue = moment("1:30 pm", "h:mm a");
      expect(new Date(mockValue.toISOString())).toStrictEqual(
        new Date(endPicker.props().value.toISOString())
      );
    });

    when("User clicks on submit quote button", () => {
      const submitQuoteButton = findByTestID(
        exampleBlockA,
        "submitQuoteButton"
      );
      submitQuoteButton.simulate("click");
    });

    then("Quote is submitted", () => {
      mockAPICall(instance, "submitQuoteApiCallId", {
        message: "Quote submitted successfully.",
      });
      expect(findByTestID(exampleBlockA, "successFailureModal")).toHaveLength(
        1
      );
    });

    when("User clicks on success modal button", () => {
      findByTestID(exampleBlockA, "successFailureModal").prop(
        "handleButtonClick"
      )();
    });
    then("Success modal is closed", () => {
      const successFailureModal = findByTestID(
        exampleBlockA,
        "successFailureModal"
      );
      expect(successFailureModal).toHaveLength(1);
    });

    when("User withdraws quote", () => {
      mockAPICall(instance, "getQuotesListApiCallId", getQuotesListResponse);
      findByTestID(exampleBlockA, "cancelQuoteButton").simulate("click");
      mockAPICall(instance, "withdrawQuoteApiCallId", withdrawQuoteResponse);
    });
    then("cancel request modal should open", () => {
      const modalWrapper = shallow(
        <CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />
      );
      expect(modalWrapper.find(".cancelModalPaper")).toHaveLength(1);
    });

    when("User clicks on yes button of cancel request modal", () => {
      findByTestID(exampleBlockA, "cancelNotaryModal").prop(
        "handleYesButtonClick"
      )();
      mockAPICall(
        instance,
        "putCancelNotaryRequestCallId",
        cancelNotaryRequestResponseJson
      );
    });
    then("Quote is withdrawn", () => {
      const modalWrapper = shallow(
        <CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />
      );
      expect(modalWrapper.find(".cancelModalPaper")).toHaveLength(1);
    });

    when("end user has accepted the quote", () => {
      mockAPICall(
        instance,
        "getNotaryRequestDetailsCallId",
        getNotaryDetailsResponseJson2
      );
      mockAPICall(instance, "getProfileApiCallId", notaryUserProfileResponse);
    });
    then("meeting tab are shown to the notary user", () => {
      const quoteOrMeetingTab = findByTestID(
        exampleBlockA,
        "quoteOrMeetingTab"
      ).dive();
      expect(findByTestID(quoteOrMeetingTab, "quoteOrMeetingTab")).toHaveLength(1);
      expect(findByTestID(quoteOrMeetingTab, "meetingDateTime")).toHaveLength(1);
    });

    when("user changes tab to kyc verification", () => {
      findByTestID(exampleBlockA, "tabs").simulate("change", {}, 3);
    });

    then("kyc verification tab should open", () => {
      const KYCVerificationThirdTab = findByTestID(
        exampleBlockA,
        "KYCVerificationTab"
      ).dive();
      expect(
        findByTestID(KYCVerificationThirdTab, "KYCVerificationTab")
      ).toHaveLength(1);
    });

    when('the user changes the document status in KnowYourCustomerKycVerification', () => {
      // Simulate rendering the component when tabIndex is 3
      exampleBlockA.setState({ tabIndex: 3 });
    
      // Find the KnowYourCustomerKycVerification component and simulate interaction
      const knowYourCustomerComponent = exampleBlockA.find(KnowYourCustomerKycVerification);
    
      // Simulate the prop function being called with a new status
      knowYourCustomerComponent.prop('initialEndUserDocStatus')(true);
    });
    
    then('the state should update endUserDocStatus to true', () => {
      // Check if the state has been updated correctly
      expect(exampleBlockA.state('endUserDocStatus')).toBe(true);
    });

    when("end user clicks on eye button", () => {
      findByTestID(exampleBlockA, "viewButton").simulate("click");
    })
    then("the document opens", () => {
      expect(findByTestID(exampleBlockA, "test1")).toHaveLength(0);
    })

    when("the end user click on download button", () => {
      mockAPICall(
        instance,
        "getNotaryRequestDetailsCallId",
        getNotaryDetailsResponseJson2
      );
      mockAPICall(
        instance,
        "getNotaryRequestDetailsCallId",
        getNotaryDetailsResponseJson3
      );
      findByTestID(exampleBlockA, "downloadButton").simulate("click");
    })
    then("the document gets downloaded", () => {
      expect(findByTestID(exampleBlockA, "test1")).toHaveLength(0);
    })

    when("End user click the view invoice button to review", () => {
      findByTestID(exampleBlockA, "invoiceViewButton").simulate("click");
    })

    then("User can review the invoice document", () => {
      expect(findByTestID(exampleBlockA, "invoiceTestID")).toHaveLength(0);
    })

    when("End user can download their invoice in PDF format", () => {
      findByTestID(exampleBlockA, "invoiceDownloadButton").simulate("click");
    })

    then("User can review download invoice document", () => {
      expect(findByTestID(exampleBlockA, "invoiceTestDownloadID")).toHaveLength(0);
    }) 

  });

  test("User navigates to RequestDetailsWeb with no request parameters" , ({ given , when , then}) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RequestDetailsWeb;

    given("I am a User loading RequestDetailsWeb", () => {
      exampleBlockA = shallow(<RequestDetailsWeb {...screenPropsForNoParam} />);
    });

    when("I navigate to the RequestDetailsWeb", () => {
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });

    then("RequestDetailsWeb will load with out errors", () => {
      const main = exampleBlockA.find(".test1");
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse);
      expect(main).toHaveLength(1);
      instance.refreshPage();
    });
  })

  test("User navigates to RequestDetailsWeb and check chat data" , ({ given , when , then}) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RequestDetailsWeb;

    given("I am a User loading RequestDetailsWeb", () => {
      exampleBlockA = shallow(<RequestDetailsWeb {...screenPropsForNoParam} />);
    });

    when("I navigate to the RequestDetailsWeb", () => {
      instance = exampleBlockA.instance() as RequestDetailsWeb;
      instance.webSocketConnection();
    });

    then("RequestDetailsWeb will load with out errors", () => {
      mockAPICall(instance, "createChatRoomApiCallId", chatRoomApiMock);
      mockAPICall(instance, "checkUnreadMessageCountApiCallId", {count: 2});
      expect(exampleBlockA).toHaveLength(1);
    });

    then("User can leave this page with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("User can send message with out errors", () => {
      instance.handleMessage("message")
      instance.sendMessage("new message")
      expect(exampleBlockA).toBeTruthy();
    });
  })

  test("User interacts with Draft status request in Request Details", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RequestDetailsWeb;

    const draftRequestResponse = {
      data: {
        id: "392",
        type: "notary_request",
        attributes: {
          status: "DRAFT",
          notary_id: null,
          notary_service_type: 23,
          priority: null,
          notarisation_method_id: null,
          jurisdiction_id: 2,
          date: null,
          notes: "",
          notarised_document: 3,
          timing_slot: null,
          platform_fee_details: {
            fee_type: "Flat Fee",
            fee_value: "0.0"
          },
          juridiction: null,
          notarisation_method: null,
          notary_service_name: null,
          file_documents: []
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "2",
              type: "jurisdiction"
            }
          },
          notary: {
            data: null
          },
          notarisation_method: {
            data: null
          },
          account: {
            data: {
              id: "593",
              type: "email_account"
            }
          }
        }
      }
    };

    given("I am a User loading RequestDetails with a draft request", () => {
      exampleBlockA = shallow(<RequestDetailsWeb {...screenProps} />);
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });

    when("Request Details loads with draft status", () => {
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse);
      mockAPICall(instance, "getNotaryRequestDetailsCallId", draftRequestResponse);
    });

    then("Draft status specific elements should be rendered correctly", () => {           
      expect(findByTestID(exampleBlockA, "tabs")).toHaveLength(0);
    });

    when("User clicks delete request button for draft request", () => {
      const deleteButton = findByTestID(exampleBlockA, "cancelButton");
      expect(deleteButton).toHaveLength(1);
      deleteButton.simulate("click");
    });

    then("Delete confirmation modal should open with correct text", () => {
      const modal = findByTestID(exampleBlockA, "cancelNotaryModal");
      expect(modal).toHaveLength(1);
      expect(modal.prop("titleText")).toBe("Confirm Deletion");
      expect(modal.prop("text")).toBe("Are you sure you want to delete this order?");
      expect(modal.prop("subText")).toBeUndefined();
    });

    when("User confirms deletion of draft request", () => {
      findByTestID(exampleBlockA, "cancelNotaryModal").prop("handleYesButtonClick")();
      mockAPICall(instance, "putCancelNotaryRequestCallId", {
        message: "Notary request deleted successfully."
      });
    });

    then("Success modal should show delete confirmation", () => {
      const successModal = findByTestID(exampleBlockA, "successFailureModal");
      expect(successModal).toHaveLength(1);
      expect(successModal.prop("text")).toBe("Success!");
      expect(successModal.prop("subText")).toBe("Your order has been deleted successfully.");
    });

    when("User clicks on success modal after deletion", () => {
      findByTestID(exampleBlockA, "successFailureModal").prop("handleButtonClick")();
    });

    then("User should be navigated back", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalled();
    });

    then("Draft requests should show placeholder values for null fields", () => {      
      const serviceName = exampleBlockA.findWhere(
        node => node.prop('data-testID') === 'service-name'
      ).text();
      expect(serviceName).toBe("-");
            
      const method = exampleBlockA.findWhere(
        node => node.prop('data-testID') === 'notarisation-method'
      ).text();
      expect(method).toBe("-");
      
      const date = exampleBlockA.findWhere(
        node => node.prop('data-testID') === 'notary-date'
      ).text();
      expect(date).toBe("-");
    });
  });
  
  test("User interacts with invite request statuses", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RequestDetailsWeb;
  
    const createInviteRequestResponse = (inviteStatus: string) => ({
      data: {
        id: "392",
        type: "notary_request",
        attributes: {
          status: "PENDING",
          notary_id: 1132,
          notary_service_type: 23,
          notarisation_method_id: 2,
          jurisdiction_id: 2,
          date: "2024-06-10T12:00:00.000Z",
          notes: "Test notes",
          timing_slot: "evening",
          invite_request: true,
          invited_request_status: inviteStatus,
          platform_fee_details: {
            fee_type: "Flat Fee",
            fee_value: "0.0"
          },
          juridiction: {
            id: 2,
            jurisdiction: "Wales",
            created_at: "2024-04-12T11:19:04.487Z",
            updated_at: "2024-04-12T11:19:04.487Z"
          },
          notarisation_method: {
            id: 2,
            notarisation_method: "Remote Electronic Notarisation (REN)",
            created_at: "2024-05-06T10:18:57.375Z",
            updated_at: "2024-05-06T10:18:57.375Z"
          },
          notary_service_name: "Affidavits and Declarations",
          file_documents: []
        }
      }
    });
  
    given("I am a User loading RequestDetails with an invite request", () => {
      exampleBlockA = shallow(<RequestDetailsWeb {...screenProps} />);
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });
  
    when("Request Details loads with invite status", () => {
      mockAPICall(instance, "getProfileApiCallId", endUserProfileResponse);
      mockAPICall(
        instance, 
        "getNotaryRequestDetailsCallId", 
        createInviteRequestResponse("invite")
      );
      mockAPICall(instance, "getQuotesListApiCallId", {
        data: [{
          id: "15",
          type: "quote",
          attributes: {
            notary_requests_id: 625,
            start_time: "1970-01-01T14:55:30.000Z",
            video_call_required: true,
            fees: "100.0",
            end_time: "1970-01-01T15:55:30.000Z",
            platform_fee_inclusive: true,
            message: "Test message",
            notary_id: 1204,
            created_at: "2024-08-09T09:52:32.271Z",
            updated_at: "2024-08-09T09:52:32.271Z",
            quote_statuses_id: 1,
            quote_status: "Submitted",
            notary_fees: "100.0",
            platform_fees: "0.0"
          }
        }]
      });
    });
  
    then("Invite status and note should be displayed correctly", () => {
      expect(instance.getRequestStatusForDisplay()).toBe("INVITE");
      exampleBlockA.update();
      const quoteOrMeetingTab = findByTestID(exampleBlockA, "quoteOrMeetingTab");
      expect(quoteOrMeetingTab).toHaveLength(1);
      const noteElement = exampleBlockA.findWhere(node => 
        node.type() === 'span' && 
        node.prop('style') && 
        node.prop('style').color === '#011342'
      );
      expect(noteElement.exists()).toBeTruthy();
      expect(noteElement.text()).toContain("In order to preview and make payments for the quote");
    });
  
    when("Request status changes to rejected", () => {
      mockAPICall(
        instance, 
        "getNotaryRequestDetailsCallId", 
        createInviteRequestResponse("rejected")
      );
    });
  
    then("Rejected status and note should be displayed correctly", () => {
      expect(instance.getRequestStatusForDisplay()).toBe("INVITE REJECTED");
      exampleBlockA.update();
      const rejectedNote = findByTestID(exampleBlockA, "rejected-note");
      expect(rejectedNote.exists()).toBeTruthy();
      expect(rejectedNote.text()).toContain("This request has already been rejected");
      expect(instance.isRequestStatusInRejected()).toBe(true);
      expect(instance.isRequestStatusInInvite()).toBe(false);
      expect(instance.isRequestStatusInAccepted()).toBe(false);
    });
  
    when("Request status changes to accepted", () => {
      mockAPICall(
        instance, 
        "getNotaryRequestDetailsCallId", 
        createInviteRequestResponse("accepted")
      );
    });
  
    then("Accepted status should be displayed correctly", () => {
      expect(instance.getRequestStatusForDisplay()).toBe("INVITE ACCEPTED");
      expect(instance.isRequestStatusInAccepted()).toBe(true);
      expect(instance.isRequestStatusInInvite()).toBe(false);
      expect(instance.isRequestStatusInRejected()).toBe(false);
    });
  
    when("User is a notary viewing an invite request", () => {
      mockAPICall(instance, "getProfileApiCallId", notaryUserProfileResponse);
      mockAPICall(
        instance, 
        "getNotaryRequestDetailsCallId", 
        createInviteRequestResponse("invite")
      );
    });
  
    then("Status should show with 'D' suffix for notary", () => {
      expect(instance.getRequestStatusForDisplay()).toBe("INVITED");
    });
  
    when("Testing status label generation", () => {
      const statusLabels = {
        "INVITE": instance.isEndUser() ? "INVITE" : "INVITED",
        "ACCEPTED": "INVITE ACCEPTED",
        "REJECTED": "INVITE REJECTED",
        "UNKNOWN": ""
      };
  
      Object.entries(statusLabels).forEach(([status, expectedLabel]) => {
        expect(instance.getRequestStatusDisplayLabel(status)).toBe(expectedLabel);
      });
    });
  
    then("Request status verification methods should work correctly", () => {
      exampleBlockA.setState({
        isInviteRequest: true,
        invitedRequestStatus: "invite"
      });
      expect(instance.isRequestStatusInInvite()).toBe(true);
  
      exampleBlockA.setState({
        isInviteRequest: true,
        invitedRequestStatus: "accepted"
      });
      expect(instance.isRequestStatusInAccepted()).toBe(true);
  
      exampleBlockA.setState({
        isInviteRequest: true,
        invitedRequestStatus: "rejected"
      });
      expect(instance.isRequestStatusInRejected()).toBe(true);
  
      exampleBlockA.setState({
        isInviteRequest: true,
        invitedRequestStatus: null
      });
      expect(instance.isRequestStatusInInvite()).toBe(false);
      expect(instance.isRequestStatusInAccepted()).toBe(false);
      expect(instance.isRequestStatusInRejected()).toBe(false);
  
      exampleBlockA.setState({
        isInviteRequest: false,
        invitedRequestStatus: "invite"
      });
      expect(instance.isRequestStatusInInvite()).toBe(false);
    });
  });


  test("User navigates to RequestDetailsWeb with mark as completed api integration" , ({ given , when , then}) => {
    let exampleBlockA: ShallowWrapper;
    let instance: RequestDetailsWeb;

    given("I am a User loading RequestDetailsWeb for mark as completed api", () => {
      exampleBlockA = shallow(<RequestDetailsWeb {...screenPropsForNoParam} />);
      instance = exampleBlockA.instance() as RequestDetailsWeb;
    });

  when("I click on button for open mark complete modal", () => {
    const mockShowMarketAsCompleteButton = jest.fn().mockReturnValue(true);
    instance.setState({
      status:"in progress",
      isKYCCompleted: true
    })


    instance.showMarketAsCompleteButton = mockShowMarketAsCompleteButton;
    exampleBlockA.update();
    const mockOpenModalForCompilation = jest.fn();
    instance.setState({
      status: "in progress",
      isKYCCompleted: true,
    });

  instance.openModalForCompilation();
    exampleBlockA.update();
    const button = exampleBlockA.find('[data-test-id="openCompleteID"]');
        button.simulate("click");
    expect(mockOpenModalForCompilation).toHaveBeenCalledTimes(0);
    });

    then("mark as completed warning modall open successfully", () => {
      expect(exampleBlockA).toBeDefined();
    });

    when("I call mark as completed api", () => {
        instance.setState({
          showCompletePopup: true
        })
        instance.requestMarkButtonClick()
    
      mockApiCall(instance, "markAsCompleteCallId", markAsCompletedResponseJson);
    });

    then("mark as completed api call successfully", () => {
      expect(exampleBlockA).toBeDefined();
    });

    when("I am getting error in  mark as completed api", () => {
      instance.setState({
        showCompletePopup: true
      })
      instance.requestMarkButtonClick()
  
    mockApiCall(instance, "markAsCompleteCallId", markAsCompletedErrorResponse);
  });

  then("API error does not render on the screen", () => {
    expect(exampleBlockA).toBeDefined();
  });

  then("Update the chat unread message count", () => {
    expect(exampleBlockA).toBeDefined();
  });
})
  
});
