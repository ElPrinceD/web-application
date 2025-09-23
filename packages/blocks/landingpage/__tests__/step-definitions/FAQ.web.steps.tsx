import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";

import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';

import FAQ from "../../src/FAQ.web";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "FAQ",
};

const feature = loadFeature("./__tests__/features/FAQ-scenario.feature");
jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
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

  test("User navigates to FAQ", ({ given, when, then }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: FAQ;

    given("I am a User loading FAQ", () => {
      landingPageBlock = shallow(<FAQ {...screenProps} />);
    });

    when("I navigate to the FAQ", () => {
      instance = landingPageBlock.instance() as FAQ;
    });

    then("FAQ will load with out errors", () => {
      const apiMsg: Message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      apiMsg.addData(getName(MessageEnum.RestAPIResponceDataMessage), apiMsg.messageId);
      apiMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        "faq_title": "Frequently asked questions",
        "faqs": [
            {
                "id": 4,
                "question": "Why do you want to work as a notary?",
                "answer": "I have a strong interest in legal documentation and I want to help people with the process of signing and notarizing important documents.",
                "created_at": "2024-07-20T05:17:46.783Z",
                "updated_at": "2024-07-20T05:17:46.783Z"
            },
            {
                "id": 5,
                "question": "What experience do you have in the notary field?",
                "answer": "I have worked as a notary public for [insert number] years and have experience notarizing a wide range of documents, including wills, powers of attorney, and real estate documents.",
                "created_at": "2024-07-20T05:18:29.121Z",
                "updated_at": "2024-07-20T05:18:29.121Z"
            },
            {
                "id": 6,
                "question": "What do you think are the most important qualities for success as a notary?",
                "answer": "The most important qualities for success as a notary include attention to detail, excellent communication skills, and a strong understanding of legal requirements.",
                "created_at": "2024-07-20T05:18:57.077Z",
                "updated_at": "2024-07-20T05:18:57.077Z"
            },
            {
                "id": 7,
                "question": "How do you handle difficult or complex notarization situations?",
                "answer": "I approach difficult or complex notarization situations by carefully reviewing the documentation and seeking guidance from legal experts if necessary.",
                "created_at": "2024-07-20T05:19:27.643Z",
                "updated_at": "2024-07-20T05:19:27.643Z"
            },
            {
                "id": 8,
                "question": "How do you stay up-to-date with changes in notary laws and regulations?",
                "answer": "I stay up-to-date with changes in notary laws and regulations by attending training sessions, reading industry publications, and participating in professional organizations.",
                "created_at": "2024-07-20T05:20:03.595Z",
                "updated_at": "2024-07-20T05:20:03.595Z"
            },
            {
                "id": 1,
                "question": "What is renotary?",
                "answer": "This is demo Answer of renotary test question ",
                "created_at": "2024-03-26T09:34:14.159Z",
                "updated_at": "2024-07-22T12:14:55.919Z"
            },
            {
                "id": 2,
                "question": "Where are online notarizations legal and valid?",
                "answer": "",
                "created_at": "2024-05-23T09:36:46.255Z",
                "updated_at": "2024-07-22T12:15:27.594Z"
            },
            {
                "id": 9,
                "question": "Why do you want to work as a notary?\r\n",
                "answer": " I have a strong interest in legal documentation and I want to help people with the process of signing and notarizing important documents.",
                "created_at": "2024-07-23T05:24:22.018Z",
                "updated_at": "2024-07-23T05:24:22.018Z"
            }
        ]
    })
      instance.getfaqdataRequestDetailsCallId = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setState({faqData:[
        {
            "id": 4,
            "question": "Why do you want to work as a notary?",
            "answer": "I have a strong interest in legal documentation and I want to help people with the process of signing and notarizing important documents.",
            "created_at": "2024-07-20T05:17:46.783Z",
            "updated_at": "2024-07-20T05:17:46.783Z"
        },
        {
            "id": 5,
            "question": "What experience do you have in the notary field?",
            "answer": "I have worked as a notary public for [insert number] years and have experience notarizing a wide range of documents, including wills, powers of attorney, and real estate documents.",
            "created_at": "2024-07-20T05:18:29.121Z",
            "updated_at": "2024-07-20T05:18:29.121Z"
        },
        {
            "id": 6,
            "question": "What do you think are the most important qualities for success as a notary?",
            "answer": "The most important qualities for success as a notary include attention to detail, excellent communication skills, and a strong understanding of legal requirements.",
            "created_at": "2024-07-20T05:18:57.077Z",
            "updated_at": "2024-07-20T05:18:57.077Z"
        },
        {
            "id": 7,
            "question": "How do you handle difficult or complex notarization situations?",
            "answer": "I approach difficult or complex notarization situations by carefully reviewing the documentation and seeking guidance from legal experts if necessary.",
            "created_at": "2024-07-20T05:19:27.643Z",
            "updated_at": "2024-07-20T05:19:27.643Z"
        },
        {
            "id": 8,
            "question": "How do you stay up-to-date with changes in notary laws and regulations?",
            "answer": "I stay up-to-date with changes in notary laws and regulations by attending training sessions, reading industry publications, and participating in professional organizations.",
            "created_at": "2024-07-20T05:20:03.595Z",
            "updated_at": "2024-07-20T05:20:03.595Z"
        },
        {
            "id": 1,
            "question": "What is renotary?",
            "answer": "This is demo Answer of renotary test question ",
            "created_at": "2024-03-26T09:34:14.159Z",
            "updated_at": "2024-07-22T12:14:55.919Z"
        },
        {
            "id": 2,
            "question": "Where are online notarizations legal and valid?",
            "answer": "",
            "created_at": "2024-05-23T09:36:46.255Z",
            "updated_at": "2024-07-22T12:15:27.594Z"
        },
        {
            "id": 9,
            "question": "Why do you want to work as a notary?\r\n",
            "answer": " I have a strong interest in legal documentation and I want to help people with the process of signing and notarizing important documents.",
            "created_at": "2024-07-23T05:24:22.018Z",
            "updated_at": "2024-07-23T05:24:22.018Z"
        }
    ]})

      expect(landingPageBlock.find("Lorem")).toBeVisible
    });
    when("I click on list without errors", () => {
      landingPageBlock.find('[data-test-id="handleAccolist"]').forEach(imageNode => {
        imageNode.simulate('click');
      });
    });
    then("List data will show", () => {
      expect(landingPageBlock.find("Lorem")).toBeVisible
    });
    when("I click on list without errors", () => {
      landingPageBlock.find('[data-test-id="handleAccolist"]').forEach(imageNode => {
        imageNode.simulate('click');
      });
    });
    then("List data will show with empty data", () => {
      let panel=false
      let extended=false
      instance.handleAcco(panel)(null, extended);
      expect(instance.state.expanded).toEqual(panel)
        
      let buttonComponent = landingPageBlock.findWhere(
        (node) => node.prop("data-test-id") === "searchfield"
      ).at(0);
      const event = {
          target: { value: 'snjnyye ' },
      };
      buttonComponent.props().onChange(event);
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(landingPageBlock.find("Frequently")).toBeVisible
    });
  });
});
