import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import DocumentList from "../../src/DocumentList.web";

const endUserScreenProps = {
  navigation: { goBack: jest.fn() },
  id: "DocumentList",
  roleID: 1,
  email: "qwert@gmail.com",
};

const notaryUserScreenProps = {
  navigation: { goBack: jest.fn() },
  id: "DocumentList",
  roleID: 2,
  email: "jessica2@yopmail.com",
};

const getDocuSignDetailsResponseJson = {
  document_signing_status: [
    {
      document_id: 1777,
      file_name: "blank.pdf",
      signing_url: null,
      is_docusign_start: false,
      signatory: [
        {
          name: "djvn",
          email: "dkjvn@kdjvf.fv",
          is_signatory: false,
          signed: false,
        },
        {
          name: "kdbv",
          email: "ldknv@jn.dv",
          is_signatory: true,
          signed: false,
        },
      ],
      notary: [
        {
          name: "Notary Recipient",
          email: "jessica2@yopmail.com",
          signed: false,
        },
      ],
    },
    {
      document_id: 177,
      file_name: "bla.pdf",
      signing_url: null,
      is_docusign_start: false,
      signatory: [
        {
          name: "kdbv",
          email: "ldknv@jn.dv",
          is_signatory: true,
          signed: false,
        },
      ],
      notary: [
        {
          name: "Notary Recipient",
          email: "jessica2@yopmail.com",
          signed: false,
        },
      ],
    },
    {
      document_id: 1776,
      file_name: "test.pdf",
      signing_url: null,
      is_docusign_start: true,
      signatory: [
        {
          name: "kdjv",
          email: "qwert@gmail.com",
          is_signatory: true,
          signed: false,
        },
        {
          name: "hbckjev",
          email: "kjdn@kdjv.dv",
          is_signatory: true,
          signed: true,
        },
      ],
      notary: [
        {
          name: "Notary Recipient",
          email: "jessica2@yopmail.com",
          signed: true,
        },
      ],
    },
  ],
};

const startDocusignResponseJson = {
  message: "docusign started",
  signing_urls: {
      url: "https://apps-d.docusign.com/api/send/auth-from-console-1ds?code=c3c03b43-0192-47c3-8a6e-76e774eceded&t=4a18695a-cace-4e6e-953b-efd8a5836b44&from=https%3A%2F%2Fdemo.docusign.net&r=https%3A%2F%2Fwww.youtube.com%2F&view=true&DocuEnvelope=215273b5-0496-4a91-b13c-e1423e89fd3b&e=215273b5-0496-4a91-b13c-e1423e89fd3b&send=1&accountId=7f0d9536-2f7b-431a-b3c5-1e9f5b4b8beb&a=tag&vt=5"
  },
  envelope_id: "215273b5-0496-4a91-b13c-e1423e89fd3b",
  access_token: "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAqaXmnu3cSAgAgBFqSKft3EgCAOGvSEjGMPBOmGAO0Bg1wzIVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADVmM2NlN2VlLTI5NDctNGUzMC1iM2E1LTg1ZDIzZTgxODBjZiIAJAAAADVmM2NlN2VlLTI5NDctNGUzMC1iM2E1LTg1ZDIzZTgxODBjZhIAAQAAAAYAAABqd3RfYnIjACQAAAA1ZjNjZTdlZS0yOTQ3LTRlMzAtYjNhNS04NWQyM2U4MTgwY2Y.vqT7XrZmNu0UXTL09pGQVXx2NFvZsl4q207nolgvuAD7mSLH6XTU7p3G9850inAJZiigRaV0W-pGTUVDz_-1QmY6jmz7pdH6Alz9hneMqfNKlcyPxztwDC-vNqPVci7ErKjJFPQ7DOTu8Zi9aGmylk3IvKxI5g1y5ciofRQd8KqzEnoSutxdFDKFC1hScNsdteSjloDYqC4jxMyDF2DrzVEx7vwJ-YapDmx9jkzKgV_9nw_7x_32mIiEnwH4eXMnnt4TGuXYoHzwS6ZGTQfbSUqy6uST38GmFZQvXgDfBzMZOMFVcOX6IzeZ7uGkx5gqQCu-j4aB585nKWoIXRlyKA"
};

const feature = loadFeature(
  "./__tests__/features/DocumentList-scenario.web.feature"
);

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

const findByTestID = (wrapper: ShallowWrapper, testID: string) =>
  wrapper.findWhere((node) => node.prop("data-testID") === testID).first();

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to DocumentList", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: DocumentList;

    given("I am a User loading DocumentList", () => {
      exampleBlockA = shallow(<DocumentList {...endUserScreenProps} />);
    });
    when("I navigate to the DocumentList", () => {
      instance = exampleBlockA.instance() as DocumentList;
      mockAPICall(
        instance,
        "getDocusignDetailsApiCallId",
        getDocuSignDetailsResponseJson
      );
    });
    then("DocumentList will load with out errors", () => {
      expect(findByTestID(exampleBlockA, "documentListPage")).toHaveLength(1);
    });

    when("end user clicks on eye button", () => {
      findByTestID(exampleBlockA, "viewButton").simulate("click");
    })
    then("the document opens", () => {
      expect(findByTestID(exampleBlockA, "documentListPage")).toHaveLength(1);
    })

    when("the end user click on download button", () => {
      findByTestID(exampleBlockA, "downloadButton").simulate("click");
    })
    then("the document gets downloaded", () => {
      expect(findByTestID(exampleBlockA, "documentListPage")).toHaveLength(1);
    })

    when("end user signs one document", () => {
      findByTestID(exampleBlockA, "startOrSignNowButton").simulate("click");
    });
    then("one document is signed", () => {
      mockAPICall(
        instance,
        "startDocuSignApiCallId",
        startDocusignResponseJson
      );
    });
  });

  test("Notary User navigates to DocumentList", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: DocumentList;

    given("I am a notary user loading DocumentList", () => {
      exampleBlockA = shallow(<DocumentList {...notaryUserScreenProps} />);
    });

    when("I navigate to the DocumentList", () => {
      instance = exampleBlockA.instance() as DocumentList;
      mockAPICall(
        instance,
        "getDocusignDetailsApiCallId",
        getDocuSignDetailsResponseJson
      );
    });
    then("DocumentList will load with out errors", () => {
      const main = findByTestID(exampleBlockA, "documentListPage");
      expect(main).toHaveLength(1);
    });

    when("notary user starts docusign for one document", () => {
      findByTestID(exampleBlockA, "startOrSignNowButton").simulate("click");
    });
    then("docusign is started for one document", () => {
      mockAPICall(
        instance,
        "startDocuSignApiCallId",
        startDocusignResponseJson
      );
    });
  });
});
