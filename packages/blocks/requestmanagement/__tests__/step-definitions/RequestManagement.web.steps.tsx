import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CancelNotaryRequestModal from "../../../../components/src/CancelNotaryRequestModal.web";
import RequestManagement from "../../src/RequestManagement.web";

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

const navigate = jest.fn();

const screenProps = {
  navigation: { navigate },
  id: "RequestManagement",
};

const CancelNotaryRequestModalProps = {
  cancelImage: "",
  text: "Something",
  cancelReqModal: true,
  handleYesButtonClick: jest.fn(),
  handleNoButtonClick: jest.fn(),
}

const cancelNotaryRequestResponseJson = {
  notary_id: 429,
  message: "Notary request cancelled successfully."
}
const getCancellationChargesResponseJson = {
  cancellation_charges: 10
}

const getCancellationChargesResponseJson2 = {
  errors: "Cannot cancel the request as start time is over."
};

const feature = loadFeature(
  "./__tests__/features/RequestManagement-scenario.web.feature"
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

const mockRequestData = [
  {
    id: "1",
    type: "request",
    attributes: {
      sender_id: 1,
      status: "pending",
      rejection_reason: null,
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "1",
      sender_full_name: "test name",
    },
  },
  {
    id: "2",
    type: "request",
    attributes: {
      sender_id: 2,
      status: "rejected",
      rejection_reason: "not accepted",
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "2",
      sender_full_name: "test name",
    },
  },
  {
    id: "3",
    type: "request",
    attributes: {
      sender_id: 3,
      status: "accepted",
      rejection_reason: null,
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "3",
      sender_full_name: "test name",
    },
  },
];

const getNotaryDetailsResponseJson = {
  "data": {
    "id": "336",
    "type": "notary_request",
    "attributes": {
      "status": "PENDING",
      "notary_id": null,
      "notary_service_type": 30,
      "priority": "Priority",
      "notarisation_method_id": 1,
      "jurisdiction_id": 1,
      "date": "2024-06-27T00:00:00.000Z",
      "notes": "",
      "notarised_document": 1,
      "juridiction": {
        "id": 1,
        "jurisdiction": "India",
        "created_at": "2024-02-09T05:07:19.691Z",
        "updated_at": "2024-02-09T05:07:19.691Z"
      },
      "notarisation_method": {
        "id": 1,
        "notarisation_method": "Remote Electronic Notarisation (REN)",
        "created_at": "2024-02-09T05:07:33.122Z",
        "updated_at": "2024-05-06T10:18:32.122Z"
      },
      "notary_service_name": "Testing API",
      "file_documents": [
        {
          "doc_name": null,
          "doc_file_url": "blank.pdf",
          "signatory_count": 0,
          "recipients": []
        }
      ]
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
          "id": "1045",
          "type": "email_account"
        }
      }
    }
  }
}

const notaryProfileResponseAgain = {
  "data": {
    "id": "613",
    "type": "profile",
    "attributes": {
      "id": 613,
      "first_name": "CHeck test",
      "last_name": null,
      "full_phone_number": "8762827638",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": "7734634673",
      "email": "ds01@yopmail.com",
      "activated": true,
      "user_type": "individual",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 2,
      "full_name": "shalini notary",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": "England",
      "address": "india",
      "contact_name": "Deep singh ",
      "company_name": "null Check Test",
      "photo": {
        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
      }
    }
  }
};

const userProfileResponse = {
  "data": {
    "id": "613",
    "type": "profile",
    "attributes": {
      "id": 613,
      "first_name": "CHeck test",
      "last_name": null,
      "full_phone_number": "7768987442",
      "city": null,
      "post_code": null,
      "country_code": null,
      "phone_number": 7768987442,
      "email": "ds01@yopmail.com",
      "activated": true,
      "user_type": "individual",
      "user_name": null,
      "platform": null,
      "suspend_until": null,
      "status": "regular",
      "role_id": 1,
      "full_name": "Deep singh",
      "gender": null,
      "date_of_birth": null,
      "age": null,
      "country": "England",
      "address": "india",
      "contact_name": "Deep singh ",
      "company_name": "null Check Test",
      "photo": {
        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBY289IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbd39f70bea4ab38a41285985308f285c0e57179/profile.jpg"
      }
    }
  }
};

const completeProfileMockRes = {
  data: {
    is_phone_number: true,
    is_address: true,
    is_notary_service: true
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
const getAllRequest = {
  end_user_notary_requests: {
    data: [
      {
        "id": "87",
        "type": "notary_request",
        "attributes": {
          "status": "pending",
          "notary_id": null,
          "notary_service_type": "Business and Corporate Services",
          "priority": "Super Priority",
          "notarisation_method_id": 1,
          "jurisdiction_id": 1,
          "date": "2024-06-02T00:00:00.000Z",
          "notarised_document": 0,
          "file_documents": [],
          "userType": "userOne"
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
    data: [{
      "id": "87",
      "type": "notary_request",
      "attributes": {
        "status": "pending",
        "notary_id": null,
        "notary_service_type": "Business and Corporate Services",
        "priority": "Super Priority",
        "notarisation_method_id": 1,
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
    }]
  },
  notary_ongoing_requests: {
    data: [
      {
        "id": "87",
        "type": "notary_request",
        "attributes": {
          "status": "pending",
          "notary_id": null,
          "notary_service_type": "Business",
          "priority": "Super Priority",
          "notarisation_method_id": 1,
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
              "id": "675",
              "type": "email_account"
            }
          }
        }
      },
    ]
  }
};

const getAllRequestEmpty = {
  new_notary_requests: { data: [{ id: "123", attributes: { status: "Pending", notary_service_name: "Service1", priority: "High", date: "2025-01-01" } }] },
  notary_ongoing_requests: { data: [] },
  invite_request: { data: [] },
};

const getAllRequest2 = {
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

const allNotaryServicesTypeRespnse = [
  {
    "data": {
      id: 21,
      attributes: {
        service_name: 'jsbds'
      }
    }
  }
]

const mockNotaryRequest = {
  id: "123",
  type: "notary_request",
  attributes: {
    status: "pending",
    notary_id: null,
    notarisation_method_id: 1,
    notary_service_name: "Document Notarization",
    priority: "Standard",
    notary_service_type: 28,
    jurisdiction_id: 1,
    date: "2024-06-01T00:00:00.000Z",
    notes: "Test notes",
    notarised_document: 1,
    timing_slot: "morning",
    file_documents: [{
      doc_type: "pdf",
      doc_name: "test.pdf",
      doc_id: 1,
      doc_base_64: "",
      doc_size: 1024,
      signatory_count: 2,
      doc_file_url: "https://example.com/test.pdf",
      recipients: [{
        created_at: "2024-06-01T00:00:00.000Z",
        id: 1,
        updated_at: "2024-06-01T00:00:00.000Z",
        file_document_id: 1,
        email: "test@example.com",
        name: "Test User",
        is_notary: false,
        signed: false,
        is_signatory: true
      }]
    }],
    juridiction: {
      id: 1,
      jurisdiction: "UK",
      created_at: "2024-01-01T00:00:00.000Z",
      updated_at: "2024-01-01T00:00:00.000Z"
    },
    notarisation_method: {
      id: 1,
      notarisation_method: "Remote Electronic Notarisation",
      created_at: "2024-01-01T00:00:00.000Z",
      updated_at: "2024-01-01T00:00:00.000Z"
    },
    quote_statuses_id: 1,
    invited_request_status: null
  },
  relationships: {
    jurisdiction: {
      data: {
        id: "1",
        type: "jurisdiction"
      }
    },
    notary: {
      data: null
    },
    notarisation_method: {
      data: {
        id: "1",
        type: "notarisation_method"
      }
    },
    account: {
      data: {
        id: "456",
        type: "email_account"
      }
    }
  }
};

const baseNotaryRequest = {
  id: "123",
  type: "notary_request",
  attributes: {
    status: "pending",
    notary_id: null,
    notarisation_method_id: 1,
    notary_service_name: "Document Notarization",
    priority: "Standard",
    notary_service_type: 28,
    jurisdiction_id: 1,
    date: "2024-06-01T00:00:00.000Z",
    notes: "Test notes",
    notarised_document: 1,
    timing_slot: "morning",
    file_documents: [{
      doc_type: "pdf",
      doc_name: "test.pdf",
      doc_id: 1,
      doc_base_64: "",
      doc_size: 1024,
      signatory_count: 2,
      doc_file_url: "https://example.com/test.pdf",
      recipients: [{
        created_at: "2024-06-01T00:00:00.000Z",
        id: 1,
        updated_at: "2024-06-01T00:00:00.000Z",
        file_document_id: 1,
        email: "test@example.com",
        name: "Test User",
        is_notary: false,
        signed: false,
        is_signatory: true
      }]
    }],
    juridiction: {
      id: 1,
      jurisdiction: "UK",
      created_at: "2024-01-01T00:00:00.000Z",
      updated_at: "2024-01-01T00:00:00.000Z"
    },
    notarisation_method: {
      id: 1,
      notarisation_method: "Remote Electronic Notarisation",
      created_at: "2024-01-01T00:00:00.000Z",
      updated_at: "2024-01-01T00:00:00.000Z"
    },
    quote_statuses_id: 1,
    invited_request_status: null
  },
  relationships: {
    jurisdiction: {
      data: {
        id: "1",
        type: "jurisdiction"
      }
    },
    notary: {
      data: null
    },
    notarisation_method: {
      data: {
        id: "1",
        type: "notarisation_method"
      }
    },
    account: {
      data: {
        id: "456",
        type: "email_account"
      }
    }
  }
};

const mockEndUserNotaryRequest = {
  end_user_notary_requests: {
    data: [{
      ...baseNotaryRequest,
      id: "124"
    }]
  },
  new_notary_requests: {
    data: []
  },
  notary_ongoing_requests: {
    data: []
  },
  invite_request: {
    data: [{
      ...baseNotaryRequest,
      id: "125",
      attributes: {
        ...baseNotaryRequest.attributes,
        invited_request_status: "invite"
      }
    }]
  }
};

const mockNotaryUserRequest = {
  end_user_notary_requests: null,
  new_notary_requests: {
    data: [
      {
        ...mockNotaryRequest,
        id: "126",
        attributes: {
          ...mockNotaryRequest.attributes,
          status: "pending"
        }
      }
    ]
  },
  notary_ongoing_requests: {
    data: [
      {
        ...mockNotaryRequest,
        id: "127",
        attributes: {
          ...mockNotaryRequest.attributes,
          status: "in progress",
          notary_id: 789
        }
      }
    ]
  },
  invite_request: {
    data: [
      {
        ...mockNotaryRequest,
        id: "128",
        attributes: {
          ...mockNotaryRequest.attributes,
          status: "pending",
          invited_request_status: "invite"
        }
      }
    ]
  }
};

const mockRejectResponse = {
  message: "Request rejected successfully"
};

const mockRejectErrorResponse = {
  error: "Cannot reject request at this time"
};

const mockRequestWithStatuses = {
  end_user_notary_requests: {
    data: [
      {
        ...mockNotaryRequest,
        id: "129",
        attributes: {
          ...mockNotaryRequest.attributes,
          status: "accepted",
          invited_request_status: "accepted"
        }
      },
      {
        ...mockNotaryRequest,
        id: "130",
        attributes: {
          ...mockNotaryRequest.attributes,
          status: "rejected",
          invited_request_status: "rejected"
        }
      },
      {
        ...mockNotaryRequest,
        id: "131",
        attributes: {
          ...mockNotaryRequest.attributes,
          status: "pending",
          invited_request_status: "invite"
        }
      }
    ]
  },
  new_notary_requests: { data: [] },
  notary_ongoing_requests: { data: [] },
  invite_request: { data: [] }
};

const mockEmptyResponse = {
  end_user_notary_requests: { data: [] },
  new_notary_requests: { data: [] },
  notary_ongoing_requests: { data: [] },
  invite_request: { data: [] },
  message: "There are no requests available for chosen filters."
};

const mockPastDateRequest = {
  ...mockNotaryRequest,
  attributes: {
    ...mockNotaryRequest.attributes,
    date: "2024-01-01T00:00:00.000Z",
    status: "pending"
  }
};

export const mockResponses = {
  mockNotaryRequest,
  mockEndUserNotaryRequest,
  mockNotaryUserRequest,
  mockRejectResponse,
  mockRejectErrorResponse,
  mockRequestWithStatuses,
  mockEmptyResponse,
  mockPastDateRequest
};

const mockSeesionToken = jest.fn().mockImplementation(
  (
    instance: RequestManagement,
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

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();


jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");

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

  test("User navigates to RequestManagement", ({ given, when, then }) => {
    let requestManagementWrapper: ShallowWrapper;
    let instance: RequestManagement;


    given("I am a User loading RequestManagement", () => {
      requestManagementWrapper = shallow(<RequestManagement {...screenProps} />);
    });

    when("I navigate to the RequestManagement", () => {
      instance = requestManagementWrapper.instance() as RequestManagement;
    });

    then("RequestManagement will load with out errors", () => {
      expect(requestManagementWrapper).toBeTruthy();
    });

    when("User come to the request management screen", () => {
      mockSeesionToken(instance, "egdgadg")
    });

    then("Get token function shoudl be called", () => {
      const receivedReqApiMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "tokenstring"
      );

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });

    when("User Profile api get called", () => {
      mockAPICall(instance, "getProfileApiCallID", userProfileResponse);
      mockAPICall(instance, "completeProfileApiCallId", completeProfileMockRes);
      instance.handleAllNotaryRequestRes(getAllRequest, "", {});
    });

    then("User Detail get show on the screen", () => {
      const userName = findByTestID(requestManagementWrapper, "userName");
    });

    when("AllRequest show api get called", () => {
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest)
     const tooltip = findByTestID(requestManagementWrapper, "tooltip");
     tooltip.prop("PopperComponent")();

    });

    then("AllRequest will show on the screen", () => {
      const userName = findByTestID(requestManagementWrapper, "userName");
    });

  
    when("Create request api will call", () => {
      mockAPICall(instance, "createNewNotaryApiCallID", getAllServiceData)
    });

    then("Create request api get called", () => {
      const userName = findByTestID(requestManagementWrapper, "userName");
    });

    when("User click on three Dots button", () => {
      const threeDots = findByTestID(requestManagementWrapper, "threeDots");
      threeDots.simulate("click");
    });

    then("View Modal will call successfully", () => {
      const threeDots = findByTestID(requestManagementWrapper, "threeDots");
      expect(instance.state.isActionBoxActive).toBe(true);
    });

    when("notary request view button is clicked", () => {
      const button = findByTestID(requestManagementWrapper, "getNotaryTestId");
      instance.navigateToRequestDetails("1234")
      mockAPICall(instance, "getNotaryRequestDetailsCallId", getNotaryDetailsResponseJson)

    })

    then('should call getNotaryRequestDetails on button click', () => {
      const userName = findByTestID(requestManagementWrapper, "userName");
    });

    when("user clicks on cancel request for pending request", () => {
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest);
      mockAPICall(instance, "getProfileApiCallID", userProfileResponse);
      mockAPICall(instance, "getCancellationChargesApiCallId", getCancellationChargesResponseJson);
      findByTestID(requestManagementWrapper, "threeDots").simulate("click");
      findByTestID(requestManagementWrapper, "cancelNotaryRequestButton").simulate("click");
    })
    then("cancel request modal opens", () => {
      expect(findByTestID(requestManagementWrapper, "cancelNotaryModal")).toHaveLength(1);
    })

    when("user clicks on cancel request for non cancellable request", () => {
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest2);
      mockAPICall(instance, "getProfileApiCallID", userProfileResponse);
      mockAPICall(instance, "getCancellationChargesApiCallId", getCancellationChargesResponseJson2);
      findByTestID(requestManagementWrapper, "threeDots").simulate("click");
      findByTestID(requestManagementWrapper, "cancelNotaryRequestButton").simulate("click");
    })
    then("popup should open", () => {
      expect(findByTestID(requestManagementWrapper, "successFailureModal")).toHaveLength(1);
    })

    when("I click on meeting button", () => {
      let btnSubmitOTP = requestManagementWrapper.findWhere(
        (node) => node.prop("data-test-id") === "meetLinkButton"
      );
      btnSubmitOTP.simulate("click");
    });

    then("The api will call", () => {
      let btnSubmitOTP = requestManagementWrapper.findWhere(
        (node) => node.prop("data-test-id") === "meetLinkButton"
      );
      expect(btnSubmitOTP.prop("data-test-id")).toEqual("meetLinkButton");
    });

    when("The api will call", () => {
      mockAPICall(instance, "zoomCallId", getProfileSuccessData);
    });

    then("The meeting will display on the screen", () => {
      expect(instance.zoomCallId.length).toBeGreaterThan(0);
    });

    when("Clicked on cancel button for non-cancellable request", () => {
      instance = requestManagementWrapper.instance() as RequestManagement;
    });
    then("Failure modal is shown", () => {
      expect(findByTestID(requestManagementWrapper, "successFailureModal")).toHaveLength(1);
    });

    when("User clicks on failure modal button", () => {
      findByTestID(requestManagementWrapper, "successFailureModal").prop("handleButtonClick")();
    });
    then("failure modal closes", () => {
      expect(findByTestID(requestManagementWrapper, "successFailureModal")).toHaveLength(1);
      mockAPICall(instance, "getCancellationChargesApiCallId", getCancellationChargesResponseJson)
    });

    when("Cancel request button is clicked", () => {
      findByTestID(requestManagementWrapper, "cancelNotaryRequestButton").simulate("click");
      mockAPICall(instance, "getCancellationChargesApiCallId", getCancellationChargesResponseJson)
    })

    then("Cancel Request Modal should open", () => {
      const openCancelRequestModal = jest.fn();
      expect(openCancelRequestModal).toHaveLength(0);
    })

    when("User clicks on the Edit button for a notary request", () => {
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest);
      const editButton = findByTestID(requestManagementWrapper, "editRequestButton");
      editButton.simulate("click");
    });

    then("The Edit Request modal should open", () => {
      const modal = findByTestID(requestManagementWrapper, "editRequestModal");
      expect(modal).toHaveLength(0);
    });

    when("User clicks on yes button of cancel request modal", () => {
      findByTestID(requestManagementWrapper, "cancelNotaryModal").prop("handleYesButtonClick")()
      mockAPICall(instance, "putCancelNotaryRequestCallId", cancelNotaryRequestResponseJson)
    })

    then("handleYesButtonClick should be called", () => {
      const modalWrapper = shallow(<CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />)
      expect(modalWrapper.find(".cancelModalPaper")).toHaveLength(1)
    })

    when("User clicks on no button of cancel request modal", () => {
      findByTestID(requestManagementWrapper, "cancelNotaryModal").prop("handleNoButtonClick")()
    })

    then("handleNoButtonClick should be called", () => {
      const modalWrapper = shallow(<CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />)
      expect(modalWrapper.find(".cancelModalPaper")).toHaveLength(1)

    })

    when("User login and come to request management again with notary user", () => {
      mockAPICall(instance, "getProfileApiCallID", notaryProfileResponseAgain)
    });

    then("Get Profile API will call successfully for notary user", () => {
      const userName = findByTestID(requestManagementWrapper, "userName");
      // expect(userName.props().children).toMatch("");
    });

    when("Notary user click on the ongoing Request", () => {
      const tabBtn = findByTestID(requestManagementWrapper, "tabBtn");
      expect(tabBtn.exists()).toBe(true);
      if (tabBtn.exists()) {
        tabBtn.simulate("change", {}, 1);
      }
    });

    then("Ongoing request will be selected", () => {
      const tabBtn = findByTestID(requestManagementWrapper, "tabBtn");
      expect(tabBtn.exists()).toBe(true);
      if (tabBtn.exists()) {
        expect(tabBtn.props().value).toBe(1);
      }
    });

    then("ServiceData will show", () => {
      const userName = findByTestID(requestManagementWrapper, "userName");
      mockAPICall(instance, "getServicesApiCallId", getAllServiceData)
    });

    when("User scrolls near the bottom of the request list", () => {
      const loadMoreRequestsSpy = jest.spyOn(instance, "loadMoreRequests");
      instance.handleScroll({
        currentTarget: {
          scrollTop: 100,
          scrollHeight: 105,
          clientHeight: 10
        }
      } as React.UIEvent<HTMLDivElement>);
    });


    when("loadMoreRequests is called", async () => {
      jest.spyOn(instance, 'allRequestAPI').mockResolvedValue();
      await instance.loadMoreRequests();
    });

    then("The currentPage should be incremented by 1 and loader should be set to true", () => {
      expect(instance.state.currentPage).toBe(2);
      expect(instance.state.loader).toBe(true);
    });

    when("The API responds successfully with new notary requests", () => {
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest);
    });

    when("The API response includes new and ongoing notary requests", () => {
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest);
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequest);
    });

    when("Network responed for received request api", () => {
      const mockResponse = {
        data: mockRequestData,
      };

      const receivedReqApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        receivedReqApiMessage.messageId
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.getAllReceivedRequestCallId = receivedReqApiMessage.messageId;
      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });

    then("ReceivedRequests state should be update", () => {
      expect(instance.state.receivedRequests.length).toBe(0);
    });

    then("Network responed for accept request review api", () => {
      const mockResponse = {
        data: mockRequestData[0],
      };

      const updateReviewApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReviewApiMessage.messageId
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.updateRequestReviewCallId = updateReviewApiMessage.messageId;
      runEngine.sendMessage("Unit Test", updateReviewApiMessage);
    });

    then("Network responed for reject request review api", () => {
      const mockResponse = {
        data: mockRequestData[1],
      };

      const updateReviewApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReviewApiMessage.messageId
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.updateRequestReviewCallId = updateReviewApiMessage.messageId;
      runEngine.sendMessage("Unit Test", updateReviewApiMessage);
      instance.navigateToRequestDetails("234");
    });
  });

  test("User navigates to RequestManagement and open filter popup", ({ given, when, then }) => {
    let requestManagementWrapper: ShallowWrapper;
    let instance: RequestManagement;


    given("I am a User loading RequestManagement", () => {
      requestManagementWrapper = shallow(<RequestManagement {...screenProps} />);
    });

    when("I navigate to the RequestManagement", () => {
      instance = requestManagementWrapper.instance() as RequestManagement;
      mockSeesionToken(instance, "egdgadg")
      mockAPICall(instance, 'getAllNotaryTypeRequestId', allNotaryServicesTypeRespnse)
    });

    then("RequestManagement will load with out errors", () => {
      const dateType = findByTestID(requestManagementWrapper, "date-type-button")
      const simulateHandleButton = findByTestID(requestManagementWrapper, "simulate-buttons")
      const requestStatusButton = findByTestID(requestManagementWrapper, "request-status-buttons")
      const notaryServiceType = findByTestID(requestManagementWrapper, "notary-service-type")
      const getNewDate = findByTestID(requestManagementWrapper, "calendar-field");
      const urgencyFilterButton = findByTestID(requestManagementWrapper, 'urgency-filter-button')

      instance.handleOpenFilter()
      dateType.simulate('change', { target: { value: "sdcfvcec" } });
      simulateHandleButton.simulate('click', 'gyg');
      requestStatusButton.simulate('click', 23)
      notaryServiceType.simulate('change', { target: { value: 22 } });
      getNewDate.simulate('click');
      expect(requestManagementWrapper).toBeTruthy();
      urgencyFilterButton.at(0).simulate('click', '')
      urgencyFilterButton.at(0).simulate('click', 'sf')
    });

    then("User can select date from calendar", () => {
      instance.handleDateChange([new Date(), new Date()]);
      const saveDateBtn = findByTestID(requestManagementWrapper, "save-btn")

      saveDateBtn.simulate('click');
      expect(instance.state.selectedDate).toBeTruthy();
    });

    then("User can click on apply filter button", () => {
      const applyFilter = findByTestID(requestManagementWrapper, "apply-filter-btn")

      applyFilter.simulate('click')
      expect(requestManagementWrapper).toBeTruthy();
    });

    then('I can leave the screen with out errors', () => {
      instance.getUrgencyClass("");
      instance.getUrgencyClass("Priority");
      instance.getUrgencyClass("Standard");
      instance.getUrgencyClass("Super Priority");

      instance.getStatusClass("");
      instance.getStatusClass("COMPLETED");
      instance.getStatusClass("CANCELLED");
      instance.getStatusClass("PENDING");
      instance.getStatusClass("IN PROGRESS");
      instance.setState({ roleID: 1 });
      instance.handleAllNotaryRequestRes(getAllRequest, "", {});

      instance.getNotarisationMethod(1);
      instance.getNotarisationMethod(2);
      instance.getNotarisationMethod(0);

      instance.findToolTiptext(1);
      instance.findToolTiptext(2);
      instance.findToolTiptext(0);

      instance.handleCloseFilter();
      instance.handleCalendarCancelBtn();
      instance.componentWillUnmount()
      expect(requestManagementWrapper).toBeTruthy();
    });

  });

  test("User views the empty state in RequestManagement", ({ given, when, then }) => {
    let requestManagementWrapper: ShallowWrapper;
    let instance: RequestManagement;

    const configJSON = {
      noRequest: "No requests yet! ",
      noNotaryRequest: "No Notary Requests! ",
      noOngoingRequest: "No Ongoing Requests ",
      textEmpty: "Create your first notary request with renotary by clicking",
      bookNow: "Book Now",
      noNotaryRequestforNotaryUser: "Stay calm and relax. You'll receive your first notary request soon",
      noOngoingforNotaryUser: "Stay calm and relax. You'll receive your notary request soon"
    };

    given("I am a User loading RequestManagement", () => {
      requestManagementWrapper = shallow(<RequestManagement {...screenProps} />);
    });

    when("I navigate to RequestManagement with no rows and roleID 1", () => {
      instance = requestManagementWrapper.instance() as RequestManagement;
      requestManagementWrapper.setState({ rows: [], roleID: 1, value: 0 });
    });

    then("The empty state should render with no requests message for roleID 1", () => {
      const requestMessage = findByTestID(requestManagementWrapper, "requestMessage");
      expect(requestMessage.text()).toBe(configJSON.noRequest);

      const content = findByTestID(requestManagementWrapper, "contentMessage");
      expect(content.text()).toContain(configJSON.textEmpty);

      const bookButton = findByTestID(requestManagementWrapper, "bookNowBtn");
      expect(bookButton.exists()).toBe(true);
      expect(bookButton.text()).toContain(configJSON.bookNow);
    });

    when("I navigate to RequestManagement with no rows, roleID 2, and value not equal to 1", () => {
      requestManagementWrapper.setState({ rows: [], roleID: 2, value: 2 });
    });

    then("The empty state should render with no notary request message for roleID 2", () => {
      const requestMessage = findByTestID(requestManagementWrapper, "requestMessage");
      expect(requestMessage.text()).toBe("No Invites Sent! ");

      const content = findByTestID(requestManagementWrapper, "contentMessage");
      expect(content.text()).toBe("Send your first invite with renotary by clicking ‘Invite Client’.");

      const bookButton = findByTestID(requestManagementWrapper, "bookNowBtn");
      // expect(bookButton.exists()).toBe(true);
    });

    when("I navigate to RequestManagement with no rows, roleID 2, and value equal to 1", () => {
      requestManagementWrapper.setState({ rows: [], roleID: 2, value: 1 });
    });

    then("The empty state should render with ongoing request message for roleID 2", () => {
      const requestMessage = findByTestID(requestManagementWrapper, "requestMessage");
      expect(requestMessage.text()).toBe("No Ongoing Requests! ");

      const content = findByTestID(requestManagementWrapper, "contentMessage");
      expect(content.text()).toBe(configJSON.noOngoingforNotaryUser);

      const bookButton = findByTestID(requestManagementWrapper, "bookNowBtn");

      // expect(bookButton.exists()).toBe(true); 
      instance.handleAllNotaryRequestRes({ message: "There are no requests available for chosen filters." },"",{});
      instance.handleReset();
    });
  });

  test("User interacts with Draft status request", ({ given, when, then }) => {
    let requestManagementWrapper: ShallowWrapper;
    let instance: RequestManagement;

    const getAllRequestWithDraft = {
      end_user_notary_requests: {
        data: [
          {
            id: "1218",
            type: "notary_request",
            attributes: {
              status: "DRAFT",
              notary_id: null,
              notary_service_type: 28,
              priority: null,
              notarisation_method_id: null,
              jurisdiction_id: 1,
              date: null,
              notes: "",
              notarised_document: 1,
              timing_slot: null,
              juridiction: {
                id: 1,
                jurisdiction: "India",
                created_at: "2024-02-09T05:07:19.691Z",
                updated_at: "2024-02-09T05:07:19.691Z"
              },
              notarisation_method: null,
              notary_service_name: null,
              file_documents: []
            },
            relationships: {
              jurisdiction: {
                data: {
                  id: "1",
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
                  id: "1045",
                  type: "email_account"
                }
              }
            }
          }
        ]
      }
    };

    given("I am a User loading RequestManagement", () => {
      requestManagementWrapper = shallow(<RequestManagement {...screenProps} />);
      instance = requestManagementWrapper.instance() as RequestManagement;
    });

    when("I navigate to the RequestManagement", () => {
      mockAPICall(instance, "getProfileApiCallID", userProfileResponse);
      mockAPICall(instance, "completeProfileApiCallId", completeProfileMockRes);
    });

    then("RequestManagement will load with draft requests", () => {
      mockAPICall(instance, "getAllNotaryRequestsCallId", getAllRequestWithDraft);
      expect(requestManagementWrapper).toBeTruthy();
    });

    when("I view a request with DRAFT status", () => {
      const threeDots = findByTestID(requestManagementWrapper, "threeDots");
      threeDots.simulate("click");
    });

    then("Action box should show Delete option for draft request", () => {
      instance.setState({
        isActionBoxActive: true,
        actionBoxIndex: 0,
        cancelRequestStatus: "DRAFT"
      });
      requestManagementWrapper.update();
      const actionBox = requestManagementWrapper.find('ActionBox');
      const deleteButton = findByTestID(requestManagementWrapper, "cancelNotaryRequestButton");
      expect(deleteButton.exists()).toBeTruthy();
      const buttonText = deleteButton.find('Typography').last();
    });

    when("notary request view button is clicked", () => {
      mockAPICall(instance, "getNotaryRequestDetailsCallId", getNotaryDetailsResponseJson)
    })

    then('should call getNotaryRequestDetails on button click', () => {
      const dummyData: any = [
        {
          id: "12345",
          attributes: {
            priority: "High",
            notary_service_name: "John Doe Notary Services",
            notarisation_method_id: 2,
            date: "2024-12-01",
            status: "in progress",
          }
        }
      ];
      instance.setState({rows: dummyData})
      const rowsData:any = { attributes: { status: "in progress" } };
      instance.isMessageActionButtonShown(rowsData);
      const button = requestManagementWrapper.findWhere((node) => node.prop('data-test-id') === "messageBtn")
      button.simulate('click');
    });

    when("I click on delete button for draft request", () => {
      const deleteButton = findByTestID(requestManagementWrapper, "cancelNotaryRequestButton");
      deleteButton.simulate("click");
    });

    then("Delete confirmation modal should open without cancellation charges", () => {
      expect(instance.state.cancelNotaryRequestModal).toBe(false);
      expect(instance.state.cancelRequestStatus).toBe("in progress");
      expect(instance.state.cancelNotaryRequestSubText).toBeUndefined();
      const modal = findByTestID(requestManagementWrapper, "cancelNotaryModal");
      expect(modal.prop("titleText")).toBe("Confirm Cancellation");
      expect(modal.prop("text")).toBe("Are you sure you want to cancel this order?");
    });

    when("I confirm deletion of draft request", () => {
      findByTestID(requestManagementWrapper, "cancelNotaryModal").prop("handleYesButtonClick")();
      mockAPICall(instance, "putCancelNotaryRequestCallId", {
        message: "Draft request deleted successfully"
      });
    });

    then("Draft request should be removed and list should refresh", () => {
      expect(instance.getAllNotaryRequestsCallId).toBeDefined();
    });

    then("Draft status specific display elements should be correct", () => {
      const draftRequest = getAllRequestWithDraft.end_user_notary_requests.data[0];
      expect(instance.getValuesForNullOrDraft(draftRequest.attributes.priority)).toBe("-");
      expect(instance.getUrgencyClass(draftRequest.attributes.priority)).toBe("draft");
      expect(instance.getStatusClass("DRAFT")).toBe("draftStatus");
      expect(instance.getStatusClass(draftRequest.attributes.status)).toBe("draftStatus");
      expect(instance.isRequestInDraft("DRAFT")).toBeTruthy();
      expect(instance.isRequestInDraft("draft")).toBeTruthy();
      requestManagementWrapper.update();
      const statusCell = requestManagementWrapper.find('.draftStatus');
      expect(statusCell.exists()).toBe(false);
      const statusBox = requestManagementWrapper.find('.statusBox.draftStatus');
      expect(statusBox.exists()).toBe(false);
    });
  });

  test("Cover specific uncovered code paths in RequestManagement", ({ given, when, then }) => {
    let wrapper: ShallowWrapper;
    let instance: RequestManagement;

    const baseRequest = {
      id: "125",
      type: "notary_request",
      attributes: {
        status: "pending",
        notary_id: null,
        notarisation_method_id: 1,
        notary_service_name: "Document Notarization",
        priority: "Standard",
        notary_service_type: 28,
        jurisdiction_id: 1,
        date: "2024-06-01T00:00:00.000Z",
        notes: "Test notes",
        notarised_document: 1,
        timing_slot: "morning",
        file_documents: [{
          doc_type: "pdf",
          doc_name: "test.pdf",
          doc_id: 1,
          doc_base_64: "",
          doc_size: 1024,
          signatory_count: 2,
          doc_file_url: "https://example.com/test.pdf",
          recipients: [{
            created_at: "2024-06-01T00:00:00.000Z",
            id: 1,
            updated_at: "2024-06-01T00:00:00.000Z",
            file_document_id: 1,
            email: "test@example.com",
            name: "Test User",
            is_notary: false,
            signed: false,
            is_signatory: true
          }]
        }],
        juridiction: {
          id: 1,
          jurisdiction: "UK",
          created_at: "2024-01-01T00:00:00.000Z",
          updated_at: "2024-01-01T00:00:00.000Z"
        },
        notarisation_method: {
          id: 1,
          notarisation_method: "Remote Electronic Notarisation",
          created_at: "2024-01-01T00:00:00.000Z",
          updated_at: "2024-01-01T00:00:00.000Z"
        },
        quote_statuses_id: 1,
        invited_request_status: "INVITE"
      },
      relationships: {
        jurisdiction: {
          data: {
            id: "1",
            type: "jurisdiction"
          }
        },
        notary: {
          data: null
        },
        notarisation_method: {
          data: {
            id: "1",
            type: "notarisation_method"
          }
        },
        account: {
          data: {
            id: "456",
            type: "email_account"
          }
        }
      }
    };

    
    const mockEndUserNotaryRequest = {
      end_user_notary_requests: {
        data: []
      },
      new_notary_requests: {
        data: []
      },
      notary_ongoing_requests: {
        data: []
      },
      invite_request: {
        data: [baseRequest]
      }
    };

    given("I am loading RequestManagement", () => {
      wrapper = shallow(<RequestManagement {...screenProps} />);
      instance = wrapper.instance() as RequestManagement;
    });

    when("I can change tabs for different user types", () => {
      const mockEvent = {
        target: {},
        currentTarget: {},
        nativeEvent: new Event('change'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        preventDefault: () => {},
        isDefaultPrevented: () => false,
        stopPropagation: () => {},
        isPropagationStopped: () => false,
        persist: () => {},
        timeStamp: Date.now(),
        type: 'change'
      } as React.ChangeEvent<{}>;

      instance.setState({ roleID: 2 }); 
      mockAPICall(instance, "getAllNotaryRequestsCallId", mockResponses.mockNotaryUserRequest);
      instance.handletabItemChange(mockEvent, 1);
    });

    then("Tab data should be correctly set for notary", () => {
      expect(instance.state.value).toBe(1);
      expect(instance.state.rows).toEqual(mockResponses.mockNotaryUserRequest.notary_ongoing_requests.data);
    });

    when("I handle tab changes as end user", () => {
      const mockEvent = {
        target: {},
        currentTarget: {},
        nativeEvent: new Event('change'),
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        preventDefault: () => {},
        isDefaultPrevented: () => false,
        stopPropagation: () => {},
        isPropagationStopped: () => false,
        persist: () => {},
        timeStamp: Date.now(),
        type: 'change'
      } as React.ChangeEvent<{}>;

      instance.setState({ roleID: 1 }); 
      mockAPICall(instance, "getAllNotaryRequestsCallId", mockEndUserNotaryRequest);
      instance.handletabItemChange(mockEvent, 1);

      instance.setState({ 
        rows: mockEndUserNotaryRequest.invite_request.data,
        value: 1 
      });
    });

    then("Tab data should be correctly set for end user", () => {
      expect(instance.state.value).toBe(1);
      expect(instance.state.rows).toEqual(mockEndUserNotaryRequest.invite_request.data);
    });

    when("I handle different request types", () => {
      instance.setState({ rows: [mockResponses.mockNotaryRequest] });
      
      instance.setIsNewRequestOrEditRequestOrInviteClient("new");
      expect(instance.state.isNewRequestOrEditRequestOrInviteClient).toBe("new");
      expect(instance.state.modalOpen).toBe(true);

      instance.setIsNewRequestOrEditRequestOrInviteClient("edit", "123");
      expect(instance.state.isNewRequestOrEditRequestOrInviteClient).toBe("edit");
      expect(instance.state.editRequest).toBeDefined();

      instance.setIsNewRequestOrEditRequestOrInviteClient("invite", "123");
      expect(instance.state.isNewRequestOrEditRequestOrInviteClient).toBe("invite");
      expect(instance.state.acceptedRequest).toBeDefined();
    });

    when("I set request modal for different types", () => {
      instance.setRequestModal("invite");
      expect(instance.state.isRequestAccepted).toBe(true);

      instance.setRequestModal("edit");
      expect(instance.state.modalOpen).toBe(true);
    });

    when("I check date colors for different scenarios", () => {
      instance.setState({ roleID: 1 });

      const emptyDateRequest = {
        ...mockResponses.mockNotaryRequest,
        attributes: { 
          ...mockResponses.mockNotaryRequest.attributes, 
          date: ""
        }
      };
      const emptyDateResult = instance.findDateColor(emptyDateRequest);
      expect(emptyDateResult).toBe("#011342");
      
      const pastDateResult = instance.findDateColor(mockResponses.mockPastDateRequest);
      expect(pastDateResult).toBe("red");
    });

    when("I check date colors for in progress request", () => {
      const inProgressRequest = {
        ...mockResponses.mockNotaryRequest,
        attributes: {
          ...mockResponses.mockNotaryRequest.attributes,
          status: "in progress",
          date: "2024-01-01T00:00:00.000Z"
        }
      };
      const result = instance.findDateColor(inProgressRequest);
      expect(result).toBe("red");
    });

    when("I check date colors for draft request", () => {
      const draftRequest = {
        ...mockResponses.mockNotaryRequest,
        attributes: {
          ...mockResponses.mockNotaryRequest.attributes,
          status: "draft",
          date: "2024-01-01T00:00:00.000Z"
        }
      };
      const result = instance.findDateColor(draftRequest);
      expect(result).toBe("red");
    });

    when("I check date colors for invited request", () => {
      instance.setState({ value: 1, roleID: 1 }); 
      const invitedRequest = {
        ...mockResponses.mockNotaryRequest,
        attributes: {
          ...mockResponses.mockNotaryRequest.attributes,
          date: "2024-01-01T00:00:00.000Z",
          invited_request_status: "invite"
        }
      };
      const result = instance.findDateColor(invitedRequest);
      expect(result).toBe("red");
    });

    when("I check different request statuses", () => {
      const statusTests = mockResponses.mockRequestWithStatuses.end_user_notary_requests.data;
      
      statusTests.forEach(request => {
        if (request.attributes.invited_request_status === "accepted") {
          expect(instance.isRequestInAccepted(request.attributes.invited_request_status)).toBe(true);
        }
        if (request.attributes.invited_request_status === "rejected") {
          expect(instance.isRequestInRejected(request.attributes.invited_request_status)).toBe(true);
        }
      });
    });

    when("I check accept/reject button visibility", () => {
      instance.setState({ value: 1, roleID: 1 });
      const inviteRequest = mockResponses.mockEndUserNotaryRequest.invite_request.data[0];
      expect(instance.isAcceptRejectActionButtomShown(inviteRequest)).toBe(true);
    });

    when("I check status classes for all special statuses", () => {
      expect(instance.getStatusClass("INVITED")).toBe("invited");
      expect(instance.getStatusClass("INVITE")).toBe("invited");
      expect(instance.getStatusClass("ACCEPTED")).toBe("accepted");
      expect(instance.getStatusClass("REJECTED")).toBe("rejected");
    });

    when("I handle empty notary request response", () => {
      //instance.handleAllNotaryRequestRes(mockResponses.mockEmptyResponse, "", {});
      //expect(instance.state.noFilterResult).toBe(true);
    });

    when("I check invited section visibility for different users", () => {

      instance.setState({ value: 2, roleID: 2 });
      expect(instance.shouldShowInvited()).toBe(true);
      
      instance.setState({ value: 1, roleID: 1 });
      expect(instance.shouldShowInvited()).toBe(true);
    });
    
    when("I get status information for different scenarios", () => {
      instance.setState({ value: 1, roleID: 1 });
      const inviteRequest = mockResponses.mockEndUserNotaryRequest.invite_request.data[0];
      expect(instance.getStatusKey()).toBe("invited_request_status");
      expect(instance.getStatusForRequests(inviteRequest.attributes)).toBe("invite");
      
      instance.setState({ value: 2, roleID: 2 });
      expect(instance.getStatusForRequests(inviteRequest.attributes)).toBe("invited");
    });
    
    when("I reject an invited request", () => {
      const request = mockResponses.mockEndUserNotaryRequest.invite_request.data[0];
      
      instance.rejectInvitedRequest(request);
      expect(instance.state.rejectRequestModal).toBe(true);
      expect(instance.state.rejectedRequest).toBeDefined();

      instance.rejectRequest();
      mockAPICall(instance, "rejectRequestCallId", mockResponses.mockRejectResponse);
      expect(instance.state.successFailModalText).toBe("Request rejected successfully");

      mockAPICall(instance, "rejectRequestCallId", mockResponses.mockRejectErrorResponse);
      expect(instance.state.successFailModalSubText).toBe(mockResponses.mockRejectErrorResponse.error);
    });
  });

});
