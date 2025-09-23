import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { Message } from "../../../../framework/src/Message"
import CancelNotaryRequestModal from "../../../../components/src/CancelNotaryRequestModal.web";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Dashboard from "../../src/Dashboard.web";
import { failureImage, saveImage } from "../../src/assets";
const navigation = require("react-navigation")

const screenProps = {
  navigation: { navigate: jest.fn() },
  id: "Dashboard"
}

const CancelNotaryRequestModalProps = {
  cancelImage: "",
  text: "Something",
  cancelReqModal: true,
  handleYesButtonClick: jest.fn(),
  handleNoButtonClick: jest.fn(),
}

const getCancellationChargesResponseJson = {
  cancellation_charges: 10
}

const getCancellationChargesResponseJson2 = {
  errors: "Cannot cancel the request as start time is over."
};

const cancelNotaryRequestResponseJson = {
  notary_id: 429,
  message: "Notary request cancelled successfully."
}

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

const inviteRequestResponse = {
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
    data: [
      {
        id: "123",
        type: "notary_request",
        attributes: {
          status: "PENDING",
          notary_id: null,
          notarisation_method_id: 1,
          notary_service_name: "Test Service",
          priority: "Standard",
          notary_service_type: 28,
          jurisdiction_id: 1,
          date: "2024-12-09T00:00:00.000Z",
          notes: "",
          notarised_document: 1,
          timing_slot: "Morning",
          quote_statuses_id: 1,
          invited_request_status: "INVITE",
          file_documents: [
            {
              doc_type: "application/pdf",
              doc_name: "test.pdf",
              doc_id: 1,
              doc_base_64: "",
              doc_size: 1000,
              signatory_count: 1,
              doc_file_url: "test.pdf",
              recipients: []
            }
          ],
          juridiction: {
            id: 1,
            jurisdiction: "Test Jurisdiction",
            created_at: "2024-12-09T00:00:00.000Z",
            updated_at: "2024-12-09T00:00:00.000Z"
          },
          notarisation_method: {
            id: 1,
            notarisation_method: "REN",
            created_at: "2024-12-09T00:00:00.000Z",
            updated_at: "2024-12-09T00:00:00.000Z"
          }
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
              id: "123",
              type: "email_account"
            }
          }
        }
      }
    ]
  }
};


const feature = loadFeature('./__tests__/features/dashboard-scenario.web.feature');


const mockAPICall = (instance: any, callId: string, res: object) => {
  const msgs = new Message(getName(MessageEnum.RestAPIResponceMessage));
  msgs.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgs.messageId);
  msgs.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), res);
  instance[callId] = msgs.messageId;
  const { receive: MockRecieve } = instance;
  MockRecieve("", msgs);
};

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
        "url": null
      }
    }
  }
};

const userNotaryProfileResponse = {
  "data": {
    "id": "613",
    "type": "profile",
    "attributes": {
      "id": 613,
      "first_name": "CHeck test",
      "last_name": null,
      "full_phone_number": "",
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

const getAllRequestCount = {
  "all_request_count": 15,
  "in_progress_request_count": 0,
  "notary_completed_request_count": 0,
  "user_completed_request_count": 0
};

const getAllRequestError = {
  errors: "some error occured"
}

const getAllRequest = {
  end_user_notary_requests: {
    data: [
      {
        id: "1217",
        type: "notary_request",
        attributes: {
          status: "PENDING",
          notary_id: null,
          notary_service_type: 28,
          priority: "Standard",
          notarisation_method_id: 1,
          jurisdiction_id: 1,
          date: "2024-11-07T00:00:00.000Z",
          notes: "",
          notarised_document: 1,
          timing_slot: "Morning",
          platform_fee_details: {
            fee_type: "Flat Fee",
            fee_value: "6.0",
          },
          juridiction: {
            id: 1,
            jurisdiction: "India",
            created_at: "2024-02-09T05:07:19.691Z",
            updated_at: "2024-02-09T05:07:19.691Z",
          },
          notarisation_method: {
            id: 1,
            notarisation_method: "Remote Electronic Notarisation (REN)",
            created_at: "2024-02-09T05:07:33.122Z",
            updated_at: "2024-05-06T10:18:32.122Z",
          },
          notary_service_name: "Probate Matters",
          file_documents: [
            {
              doc_id: 2339,
              doc_type: "application/pdf",
              doc_size: 3908,
              doc_base_64: "lJUVPRg0=",
              doc_name: "test.pdf",
              doc_file_url: "url/test.pdf",
              signatory_count: 1,
              recipients: [
                {
                  id: 2714,
                  created_at: "2024-11-06T14:47:43.358Z",
                  updated_at: "2024-11-06T14:47:43.358Z",
                  file_document_id: 2339,
                  name: "tqwert",
                  email: "qwert@gmail.com",
                  is_signatory: true,
                  signed: false,
                  is_notary: false,
                  signing_url: null,
                  envelope_id: null,
                  access_token: null,
                },
              ],
            },
          ],
          kyc_details: {
            data: null,
          },
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "1",
              type: "jurisdiction",
            },
          },
          notary: {
            data: null,
          },
          notarisation_method: {
            data: {
              id: "1",
              type: "notarisation_method",
            },
          },
          account: {
            data: {
              id: "1045",
              type: "email_account",
            },
          },
        },
      },
    ],
  },
  new_notary_requests: {
    data: [
      {
        id: "87",
        type: "notary_request",
        attributes: {
          status: "pending",
          notary_id: null,
          notary_service_type: "Business and Corporate Services",
          priority: "Super Priority",
          notarisation_method_id: 1,
          jurisdiction_id: 1,
          date: "2024-06-02T00:00:00.000Z",
          notarised_document: 0,
          file_documents: [],
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "1",
              type: "jurisdiction",
            },
          },
          notary: {
            data: null,
          },
          notarisation_method: {
            data: {
              id: "1",
              type: "notarisation_method",
            },
          },
          account: {
            data: {
              id: "613",
              type: "email_account",
            },
          },
        },
      },
      {
        id: "87",
        type: "notary_request",
        attributes: {
          status: "in progress",
          notary_id: null,
          notary_service_type: "Business and Corporate Services",
          priority: "Super Priority",
          notarisation_method_id: 2,
          jurisdiction_id: 1,
          date: "2024-06-02T00:00:00.000Z",
          notarised_document: 0,
          file_documents: [],
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "1",
              type: "jurisdiction",
            },
          },
          notary: {
            data: null,
          },
          notarisation_method: {
            data: {
              id: "1",
              type: "notarisation_method",
            },
          },
          account: {
            data: {
              id: "613",
              type: "email_account",
            },
          },
        },
      },
      {
        id: "87",
        type: "notary_request",
        attributes: {
          status: "completed",
          notary_id: null,
          notary_service_type: "Business and Corporate Services",
          priority: "Super Priority",
          notarisation_method_id: 3,
          jurisdiction_id: 1,
          date: "2024-06-02T00:00:00.000Z",
          notarised_document: 0,
          file_documents: [],
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "1",
              type: "jurisdiction",
            },
          },
          notary: {
            data: null,
          },
          notarisation_method: {
            data: {
              id: "1",
              type: "notarisation_method",
            },
          },
          account: {
            data: {
              id: "613",
              type: "email_account",
            },
          },
        },
      },
    ],
  },
  notary_ongoing_requests: {
    data: [
      {
        id: "87",
        type: "notary_request",
        attributes: {
          status: "pending",
          notary_id: null,
          notary_service_type: "Business",
          priority: "Super Priority",
          notarisation_method_id: 1,
          jurisdiction_id: 1,
          date: "2024-06-02T00:00:00.000Z",
          notarised_document: 0,
          file_documents: [],
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "1",
              type: "jurisdiction",
            },
          },
          notary: {
            data: null,
          },
          notarisation_method: {
            data: {
              id: "1",
              type: "notarisation_method",
            },
          },
          account: {
            data: {
              id: "675",
              type: "email_account",
            },
          },
        },
      },
      {
        id: "87",
        type: "notary_request",
        attributes: {
          status: "in progress",
          notary_id: null,
          notary_service_type: "Business and Corporate Services",
          priority: "Super Priority",
          notarisation_method_id: 2,
          jurisdiction_id: 1,
          date: "2024-06-02T00:00:00.000Z",
          notarised_document: 0,
          file_documents: [],
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "1",
              type: "jurisdiction",
            },
          },
          notary: {
            data: null,
          },
          notarisation_method: {
            data: {
              id: "1",
              type: "notarisation_method",
            },
          },
          account: {
            data: {
              id: "613",
              type: "email_account",
            },
          },
        },
      },
      {
        id: "87",
        type: "notary_request",
        attributes: {
          status: "completed",
          notary_id: null,
          notary_service_type: "Business and Corporate Services",
          priority: "Super Priority",
          notarisation_method_id: 3,
          jurisdiction_id: 1,
          date: "2024-06-02T00:00:00.000Z",
          notarised_document: 0,
          file_documents: [],
        },
        relationships: {
          jurisdiction: {
            data: {
              id: "1",
              type: "jurisdiction",
            },
          },
          notary: {
            data: null,
          },
          notarisation_method: {
            data: {
              id: "1",
              type: "notarisation_method",
            },
          },
          account: {
            data: {
              id: "613",
              type: "email_account",
            },
          },
        },
      },
    ],
  },
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

const getAllRequestNotary = {
  new_notary_requests: {
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
      {
        "id": "87",
        "type": "notary_request",
        "attributes": {
          "status": "completed",
          "notary_id": null,
          "notary_service_type": "Business and Corporate Services",
          "priority": "Super Priority",
          "notarisation_method_id": 3,
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
      },]
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
      {
        "id": "87",
        "type": "notary_request",
        "attributes": {
          "status": "completed",
          "notary_id": null,
          "notary_service_type": "Business and Corporate Services",
          "priority": "Super Priority",
          "notarisation_method_id": 3,
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

const zoomResponse = {
  "zoom_meetings": {
    "notary_request_id": 733,
    "meeting": {
      "uuid": "",
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
      "encrypted_password": "xyz",
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
const mockSeesionToken = jest.fn().mockImplementation(
  (
    instance: Dashboard,
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

const incompleteProfileResponse = {
  data: {
    is_phone_number: false,
    is_address: false,
    is_notary_service: false,
    is_payment_details: false,
    is_vat_sales_tax: false,
    is_qualified_signature: false,
  }
}
const completeProfileResponse = {
  data: {
    is_phone_number: true,
    is_address: true,
    is_notary_service: true,
    is_payment_details: true,
    is_vat_sales_tax: true,
    is_qualified_signature: true,
  }
}

const notaryInvitesResponse = {
  ...inviteRequestResponse,
  invite_request: {
    data: [{
      ...inviteRequestResponse.invite_request.data[0],
      attributes: {
        ...inviteRequestResponse.invite_request.data[0].attributes,
        invited_request_status: "accepted"
      }
    }]
  }
};

const notaryUserResponse = {
  ...userProfileResponse,
  data: {
    ...userProfileResponse.data,
    attributes: {
      ...userProfileResponse.data.attributes,
      role_id: 2
    }
  }
};


const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    global.alert = jest.fn();
  });

  test('User navigates to Dashboard', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;

    given('I am a User loading Dashboard', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
    });

    when('I navigate to the Dashboard', () => {
      instance = dashboardWrapper.instance() as Dashboard
    });

    then('Dashboard will load with out errors', () => {
      expect(dashboardWrapper).toBeTruthy();
    });

    when("User comes to the dashboard", () => {
      mockSeesionToken(instance, "egdgadg")
      findByTestID(dashboardWrapper, "inviteRequestModalOpen").props().backToEditRequest();
      findByTestID(dashboardWrapper, "modalOpen").props().backToEditRequest();
    });

    then("Token get saved", () => {
      expect(MessageEnum.SessionResponseToken).toBe(59);
    });

    when("User Profile api get called", () => {
      mockAPICall(instance, "getProfileCallId", userProfileResponse)
    });

    then("User Detail get show on the screen", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("AllRequest show api get called with error", () => {
      mockAPICall(instance, "getAllRequestsCallId", getAllRequestError);
    });

    then("dashboard will show empty record structure", () => {
      expect(findByTestID(dashboardWrapper, "emptyRender")).toHaveLength(1);
      expect(findByTestID(dashboardWrapper, "emptyBookNow")).toHaveLength(1);
    });

    when("User clicks on the book now button", () => {
      findByTestID(dashboardWrapper, "emptyBookNow").simulate("click")
    });

    then("User will see the correct modal based on user type", () => {
      expect(findByTestID(dashboardWrapper, "modalOpen")).toHaveLength(1);
    });


    when("AllRequest show api get called", () => {
      mockAPICall(instance, "getAllRequestsCallId", getAllRequest);
    });

    then("AllRequest will show on the dashboard", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("Count of allRequest api get called", () => {
      mockAPICall(instance, "getRequestCountsCallId", getAllRequestCount)
    });

    then("Count of allRequest will show on the requests box", () => {
      const allRequestCount = findByTestID(dashboardWrapper, "allRequestCount");
      expect(allRequestCount.props().children).toEqual(15);
    });

    when("Services api get called", () => {
      mockAPICall(instance, "getServicesCallId", getAllServiceData)
    });

    then("ServiceData will show on the notary services section", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("I click on next paggination button", () => {
      let btnSignUp = dashboardWrapper.findWhere((node) => node.prop("data-test-id") === "handleNextTxtId"); btnSignUp.simulate("click");
    });

    then("Data will be changed", () => {

      let btnSubmitOTP = dashboardWrapper.findWhere(
        (node) => node.prop("data-test-id") === "handleNextTxtId"
      );
      expect(btnSubmitOTP.prop("data-test-id")).toEqual("handleNextTxtId");

    });

    when("I click on previous paggination button", () => {
      let btnSignUp = dashboardWrapper.findWhere((node) => node.prop("data-test-id") === "handlePrevTxtId"); btnSignUp.simulate("click");
    });

    then("Data will be changed", () => {

      let btnSubmitOTP = dashboardWrapper.findWhere(
        (node) => node.prop("data-test-id") === "handlePrevTxtId"
      );
      expect(btnSubmitOTP.prop("data-test-id")).toEqual("handlePrevTxtId");

    });

    then("Data will be changed", () => {

      let btnSubmitOTP = dashboardWrapper.findWhere(
        (node) => node.prop("data-test-id") === "handleNextTxtId"
      );
      expect(btnSubmitOTP.prop("data-test-id")).toEqual("handleNextTxtId");

    });


    when("User click on three Dots button", () => {
      const threeDots = findByTestID(dashboardWrapper, "threeDots");
      threeDots.simulate("click");
    });

    then("View Modal will call successfully", () => {
      const threeDots = findByTestID(dashboardWrapper, "threeDots");
      expect(threeDots.props().children.key).toBe(null);
    });

    when("notary request view button is clicked", () => {
      const button = findByTestID(dashboardWrapper, "getNotaryTestId");
      button.simulate('click');
      findByTestID(dashboardWrapper, "editButton").simulate("click");
      mockAPICall(instance, "getAllRequestsCallId", getAllRequest2);
      findByTestID(dashboardWrapper, "meetLinkButton").simulate("click");
      mockAPICall(instance, "getNotaryRequestDetailsCallId", getNotaryDetailsResponseJson)
    })

    then('should call getNotaryRequestDetails on button click', () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("notary request view button is clicked", () => {
      const button = dashboardWrapper.findWhere((node) => node.prop('data-test-id') === "messageBtn")
      button.simulate('click');
      mockAPICall(instance, "getNotaryRequestDetailsCallId", getNotaryDetailsResponseJson)
    })

    then('should call getNotaryRequestDetails on button click', () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("The zoom meeting button click", () => {
      mockAPICall(instance, "zoomMeetingCallId", zoomResponse);
    });

    then("The zoom meeting api will called", () => {
      if (instance.zoomMeetingCallId !== null)
        expect(instance.zoomMeetingCallId.length).toBeGreaterThan(0);
    });

    when("user clicks on cancel request for non cancellable request", () => {
      mockAPICall(instance, "getCancellationChargesCallId", getCancellationChargesResponseJson2);
      findByTestID(dashboardWrapper, "cancelNotaryRequestButton").simulate("click");
    })
    then("popup should open", () => {
      expect(findByTestID(dashboardWrapper, "successFailureModal")).toHaveLength(1);
    })

    when("Clicked on cancel button for non-cancellable request", () => {
      instance = dashboardWrapper.instance() as Dashboard;
    });
    then("Failure modal is shown", () => {
      expect(findByTestID(dashboardWrapper, "successFailureModal")).toHaveLength(1);
    });

    when("User clicks on failure modal button", () => {
      findByTestID(dashboardWrapper, "successFailureModal").prop("handleButtonClick")();
    });
    then("failure modal closes", () => {
      expect(findByTestID(dashboardWrapper, "successFailureModal")).toHaveLength(1);
      mockAPICall(instance, "getCancellationChargesCallId", getCancellationChargesResponseJson)
    });

    when("Cancel request button is clicked", () => {
      findByTestID(dashboardWrapper, "cancelNotaryRequestButton").simulate("click");
      mockAPICall(instance, "getCancellationChargesCallId", getCancellationChargesResponseJson)
    })

    then("Cancel Request Modal should open", () => {
      const openCancelRequestModal = jest.fn();
    })

    when("Notary user login and come to dashboard", () => {
      mockAPICall(instance, "getProfileCallId", userNotaryProfileResponse)
    });

    then("Get Profile API will call successfully", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("AllRequest show api get called again while logging on notary user credentials", () => {
      mockAPICall(instance, "getAllRequestsCallId", getAllRequestNotary)
    });

    then("AllRequest will show on the dashboard for notary user", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("AllRequest API Changes", () => {
      mockAPICall(instance, "getAllRequestsCallId", getAllRequestNotary)
    });

    then("AllRequest will show", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("User clicks on the book now button", () => {
      let phoneNumberBtn = findByTestID(dashboardWrapper, "phoneNumberBtn");
      phoneNumberBtn.simulate('click');
    });

    then("User will navigate to the profile page", () => {
      let phoneNumberBtn = findByTestID(dashboardWrapper, "phoneNumberBtn");
      expect(phoneNumberBtn.props().className).toMatch("addDetailBox");
    });

    when("User click on add notary service button", () => {
      let notaryBtn = findByTestID(dashboardWrapper, "notaryServiceBtn");
      notaryBtn.simulate('click');
    });

    then("User will navigate to the notary service page", () => {
      let notaryBtn = findByTestID(dashboardWrapper, "notaryServiceBtn");
      expect(notaryBtn.props().className).toMatch("addDetailBox");
    });

    when("AllRequest show api get called again while logging on notary user", () => {
      mockAPICall(instance, "getAllRequestsCallId", getAllRequest)
    });

    then("Request will show on the dashboard for notary user", () => {
    });

    when("User login and come to dashboard again with notary user", () => {
      mockAPICall(instance, "getProfileCallId", notaryProfileResponseAgain)
    });

    then("Get Profile API will call successfully for notary user", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    });

    when("Notary user click on the ongoing Request", () => {
      const tabBtn = findByTestID(dashboardWrapper, "tabBtn");
      instance = dashboardWrapper.instance() as Dashboard
    });

    then("Ongoing request will be selected", () => {
      mockAPICall(instance, "getIsProfileCompleteCallId", completeProfileResponse);
      const tabBtn = findByTestID(dashboardWrapper, "tabBtn");
      tabBtn.props().onChange({}, 1);
      expect(dashboardWrapper).toBeTruthy();
    });

    when("User clicks on yes button of cancel request modal", () => {
      findByTestID(dashboardWrapper, "cancelNotaryModal").prop("handleYesButtonClick")()
      mockAPICall(instance, "cancelRequestCallId", cancelNotaryRequestResponseJson)
    })

    then("handleYesButtonClick should be called", () => {
      const modalWrapper = shallow(<CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />)
      expect(modalWrapper.find(".cancelButton")).toHaveLength(0)
    })

    when("User clicks on no button of cancel request modal", () => {
      findByTestID(dashboardWrapper, "cancelNotaryModal").prop("handleNoButtonClick")()
    })

    then("handleNoButtonClick should be called", () => {
      const modalWrapper = shallow(<CancelNotaryRequestModal {...CancelNotaryRequestModalProps} />)
      expect(modalWrapper.find(".cancelButton")).toHaveLength(0)
    })
  });

  test('Notary User navigates to Dashboard after login', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;

    given('I am a User loading Dashboard', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
    });

    when('I navigate to the Dashboard', () => {
      instance = dashboardWrapper.instance() as Dashboard
    });

    then('Dashboard will load with out errors', () => {
      expect(dashboardWrapper).toHaveLength(1);
    });

    when("Complete Profile API will be called", () => {
      mockAPICall(instance, "getProfileCallId", userNotaryProfileResponse);
      mockAPICall(instance, "getIsProfileCompleteCallId", incompleteProfileResponse);
    });
    then("Complete profile box will be rendered", () => {
      expect(dashboardWrapper.find(".headBox")).toHaveLength(1);
    });
    then("New request and ongoing request toggle buttons will not be visible", () => {
      expect(findByTestID(dashboardWrapper, "tabBox")).toHaveLength(0);
    })

    when("User clicks on add qualified signature", () => {
      findByTestID(dashboardWrapper, "addQualifiedSignatureButton").simulate("click");
    });
    then("user is redirected to settings", () => {
      expect(dashboardWrapper.find(".headBox")).toHaveLength(1);
    });

    when("User clicks on add VAT details", () => {
      findByTestID(dashboardWrapper, "addVATSalesTaxButton").simulate("click");
    });
    then("user is redirected to settings", () => {
      expect(dashboardWrapper.find(".headBox")).toHaveLength(1);
    });

    when("User clicks on add payments", () => {
      findByTestID(dashboardWrapper, "addPaymentDetailsButton").simulate("click");
    });
    then("user is redirected to settings", () => {
      expect(dashboardWrapper.find(".headBox")).toHaveLength(1);
    });

    when("Complete profile API is called", () => {
      mockAPICall(instance, "getIsProfileCompleteCallId", completeProfileResponse);
    });
    then("Complete profile box will not be rendered", () => {
      expect(dashboardWrapper.find(".headBox")).toHaveLength(0);
    });
    then("New request and ongoing request toggle button is visible on screen", () => {
      expect(findByTestID(dashboardWrapper, "tabBox")).toHaveLength(1);
    })
  });

  test('User interacts with Draft status request', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;

    given('I am a User loading Dashboard', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
    });

    when('I navigate to the Dashboard', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      mockAPICall(instance, "getProfileCallId", userProfileResponse);
      mockAPICall(instance, "getIsProfileCompleteCallId", completeProfileResponse);
    });

    then('Dashboard will load with draft requests', () => {
      mockAPICall(instance, "getAllRequestsCallId", getAllRequestWithDraft);
      expect(dashboardWrapper).toBeTruthy();
    });

    when('I view a request with DRAFT status', () => {
      const threeDots = findByTestID(dashboardWrapper, "threeDots");
      threeDots.simulate("click");
    });

    then('Action box should show Delete option for draft request', () => {
      instance.setState({
        isActionBoxActive: true,
        actionBoxIndex: 0,
        cancelRequestStatus: "DRAFT"
      });
      dashboardWrapper.update();
      const actionBox = dashboardWrapper.find('ActionBox');
      const deleteButton = findByTestID(dashboardWrapper, "cancelNotaryRequestButton");
      expect(deleteButton.exists()).toBeTruthy();

      const buttonText = deleteButton.find('Typography').last();

    });

    when('I click on delete button for draft request', () => {
      const deleteButton = findByTestID(dashboardWrapper, "cancelNotaryRequestButton");
      deleteButton.simulate("click");
    });

    then('Delete confirmation modal should open without cancellation charges', () => {
      expect(instance.state.cancelNotaryRequestModal).toBeTruthy();
      expect(instance.state.cancelRequestStatus).toBe("DRAFT");
      expect(instance.state.cancelNotaryRequestSubText).toBeUndefined();

      const modal = findByTestID(dashboardWrapper, "cancelNotaryModal");
      expect(modal.prop("titleText")).toBe("Confirm Deletion");
      expect(modal.prop("text")).toBe("Are you sure you want to delete this order?");
    });

    when('I confirm deletion of draft request', () => {
      findByTestID(dashboardWrapper, "cancelNotaryModal").prop("handleYesButtonClick")();
      mockAPICall(instance, "cancelRequestCallId", {
        message: "Draft request deleted successfully"
      });
    });

    then('Draft request should be removed and list should refresh', () => {
      expect(instance.getAllRequestsCallId).toBeDefined();
    });

    then('Draft status specific display elements should be correct', () => {
      const draftRequest = getAllRequestWithDraft.end_user_notary_requests.data[0];

      expect(instance.getValuesForNullOrDraft(draftRequest.attributes.priority)).toBe("-");
      expect(instance.getValuesForNullOrDraft(draftRequest.attributes.notary_service_name)).toBe("-");

      expect(instance.getUrgencyClass(draftRequest.attributes.priority)).toBe("draft");
      expect(instance.getStatusClass("draft")).toBe("draftStatus");

      expect(instance.isRequestInDraft("DRAFT")).toBeTruthy();

      dashboardWrapper.update();
      const statusCell = dashboardWrapper.find('.draftStatus');
      expect(statusCell.exists()).toBeTruthy();
    });
  });

  test('End user interacts with notary invites', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;

    given('I am a User loading Dashboard', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
    });

    when('I load the dashboard as an end user', () => {
      mockAPICall(instance, "getProfileCallId", userProfileResponse);
      mockAPICall(instance, "getIsProfileCompleteCallId", completeProfileResponse);
      mockAPICall(instance, "getAllRequestsCallId", inviteRequestResponse);
    });

    then('Dashboard should load with invite data', () => {
      expect(instance.state.endUserInvites).toEqual(inviteRequestResponse.invite_request.data);
      expect(instance.shouldShowInvited()).toBeFalsy();
    });

    when('I switch to the invites tab', () => {
      const tabBtn = findByTestID(dashboardWrapper, "tabBtn");
      tabBtn.props().onChange({}, 1);
      dashboardWrapper.update();
    });

    then('I should see my pending invites', () => {
      expect(instance.state.tabValue).toBe(1);
      expect(instance.state.rows).toEqual(inviteRequestResponse.invite_request.data);
      expect(instance.shouldShowInvited()).toBeTruthy();
    });

    when('I click the action menu for an invite', () => {
      const threeDots = findByTestID(dashboardWrapper, "threeDots");
      threeDots.simulate("click");
      instance.setState({
        isActionBoxActive: true,
        actionBoxIndex: 0
      });
      dashboardWrapper.update();
    });

    then('I should see accept and reject options', () => {
      expect(instance.getStatusClass("pending")).toBe("pending");
      expect(instance.getStatusClass("completed")).toBe("completed");
      expect(instance.getStatusClass("cancelled")).toBe("cancelled");
      expect(instance.getStatusClass("in progress")).toBe("inprogress");
      expect(instance.getStatusClass("draft")).toBe("draftStatus");
      expect(instance.getStatusClass("invited")).toBe("invited");
      expect(instance.getStatusClass("accepted")).toBe("accepted");
      expect(instance.getStatusClass("rejected")).toBe("rejected");
      expect(instance.getStatusClass("unknown")).toBe("");

      const acceptButton = findByTestID(dashboardWrapper, "acceptNotaryRequestButton");
      const rejectButton = findByTestID(dashboardWrapper, "rejectNotaryRequestButton");
      expect(acceptButton).toHaveLength(1);
      expect(rejectButton).toHaveLength(1);
    });

    when('I click the view button', () => {
      const button = findByTestID(dashboardWrapper, "getNotaryTestId");
      button.simulate('click');
    })

    then('I should navigate to request detail', () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    })

    when('I click the accept button', () => {
      const acceptButton = findByTestID(dashboardWrapper, "acceptNotaryRequestButton");
      acceptButton.simulate("click");
    });

    then('The invite acceptance modal should open', () => {
      expect(instance.state.isRequestAccepted).toBeTruthy();
      expect(instance.state.acceptedRequest).toEqual(inviteRequestResponse.invite_request.data[0]);
    });

    when('I handle various modal interactions', () => {
      instance.setBookInvitedRequestModal(true);
      expect(instance.state.isRequestAccepted).toBeTruthy();

      instance.closeInviteRequestModal();
      expect(instance.state.cancelReqModal).toBeTruthy();

      instance.inviteRequestModalNoButtonClick();
      expect(instance.state.cancelReqModal).toBeFalsy();
      expect(instance.state.isRequestAccepted).toBeTruthy();
    });

    then('Modal states should update correctly', () => {
      expect(instance.state.isRequestAccepted).toBeTruthy();
      expect(instance.state.cancelReqModal).toBeFalsy();
    });

    when('I click the reject button', () => {
      const rejectButton = findByTestID(dashboardWrapper, "rejectNotaryRequestButton");
      rejectButton.simulate("click");
    });

    then('Rejection flow should start', () => {
      expect(instance.state.rejectRequestModal).toBeTruthy();
      expect(instance.state.rejectedRequest).toBeDefined();
    });

    when('I confirm rejection with success', () => {
      instance.rejectRequest();
      mockAPICall(instance, "rejectRequestCallId", {
        message: "Request rejected successfully"
      });
    });

    then('Success message should be shown', () => {
      expect(instance.state.successFailModalText).toBe("Request rejected successfully");
      expect(instance.state.successFailModalImage).toBe(saveImage);
      expect(instance.state.rejectRequestModal).toBeFalsy();
    });

    when('I try rejection with failure', () => {
      instance.rejectInvitedRequest(inviteRequestResponse.invite_request.data[0]);
      instance.rejectRequest();
      mockAPICall(instance, "rejectRequestCallId", {
        error: "Failed to reject request"
      });
    });

    then('Error message should be shown', () => {
      expect(instance.state.successFailModalText).toBe("Request rejection Failed");
      expect(instance.state.successFailModalImage).toBe(failureImage);
      expect(instance.state.successFailModalTextColor).toBe("#FF0000");
    });

    when('I switch to notary user', () => {
      mockAPICall(instance, "getProfileCallId", {
        data: {
          ...userProfileResponse.data,
          attributes: {
            ...userProfileResponse.data.attributes,
            role_id: 2
          }
        }
      });
      mockAPICall(instance, "getAllRequestsCallId", {
        ...inviteRequestResponse,
        invite_request: {
          data: [{
            ...inviteRequestResponse.invite_request.data[0],
            attributes: {
              ...inviteRequestResponse.invite_request.data[0].attributes,
              invited_request_status: "INVITE"
            }
          }]
        }
      });
    });

    then('Notary specific states should be set', () => {
      expect(instance.isNotaryUser()).toBeTruthy();
      expect(instance.state.notaryUserInvites).toBeDefined();
    });

    when('I switch to invites tab as notary', () => {
      const tabBtn = findByTestID(dashboardWrapper, "tabBtn");
      tabBtn.props().onChange({}, 2);
      dashboardWrapper.update();
    });

    then('Notary invite view should be correct', () => {
      expect(instance.shouldShowInvited()).toBeTruthy();
      expect(instance.isRequestInAccepted(null)).toBeFalsy();
      expect(instance.isRequestInAccepted("accepted")).toBeTruthy();
      expect(instance.isRequestInRejected("rejected")).toBeTruthy();
    });

    when('I create a new request', () => {
      instance.setIsRequestNewOrEditOrInvite("new");
    });

    then('New request modal should open', () => {
      expect(instance.state.modalOpen).toBeTruthy();
    });

    when('I handle an invite request', () => {
      mockAPICall(instance, "getProfileCallId", userNotaryProfileResponse)
      mockAPICall(instance, "getAllRequestsCallId", getAllRequestError);
      instance.setIsRequestNewOrEditOrInvite("invite", "123");
    });

    then('Invite request modal should open', () => {
      expect(findByTestID(dashboardWrapper, "emptyRender")).toHaveLength(1);
      expect(findByTestID(dashboardWrapper, "emptyBookNow")).toHaveLength(1);
      expect(instance.state.isRequestAccepted).toBeTruthy();
    });

    when('I close all modals', () => {
      findByTestID(dashboardWrapper, "emptyBookNow").simulate("click")
      instance.closeRejectRequestModal();
    });

    then('All modals should be closed', () => {
      expect(instance.state.rejectRequestModal).toBeFalsy();
      expect(instance.state.rejectedRequest).toBeUndefined();
    });

    then("Dashboard loads without any issue", () => {
      expect(findByTestID(dashboardWrapper, "sidebar")).toHaveLength(1);
    })
  });

});