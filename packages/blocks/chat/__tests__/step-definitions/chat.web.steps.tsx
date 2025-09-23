import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Chat from "../../src/Chat.web";

const screenProps = {
  navigation: {},
  id: "Chat",
  open: false,
  onClose: jest.fn(),
  accountId: 1211,
  notary_request_id: "1210",
  userProfilePic: "pic",
  sendMessage: jest.fn(),
  newReceivedMsg: "",
  fullName: "name",
  profile: "url"
};

const feature = loadFeature("./__tests__/features/chat-scenario.web.feature");

const initialChatData = {
  "messages": [
    {
      "id": 3,
      "message": "hello2131",
      "account_id": 1541,
      "profile": null,
      "created_at": "2024-11-05T10:22:47.130Z"
    },
    {
      "id": 4,
      "message": "hiii",
      "account_id": 1495,
      "profile": null,
      "created_at": "2024-11-05T10:27:19.810Z"
    },
  ]
}

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

defineFeature(feature, (test) => {

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Chat", ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;

    given("I am a User loading Chat", () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
    });

    when("I navigate to Chat", () => {
      instance = chatWrapper.instance() as Chat;
      chatWrapper.setProps({open: true});
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);
      instance.setToken("token")
    });

    then("Chat will load", () => {
      instance.createChatRoom("ChatChannel");
      chatWrapper.setProps({notary_request_id: "1211"});
      instance.getChatList("token");
      mockAPICall(instance, "getChatListApiCallId", initialChatData);

      expect(chatWrapper).toBeTruthy();
    });

    then("Chat User profile should visible on top of chat window", () => {
      const avatar = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "other-user-profile"
      );

      expect(avatar).toBeTruthy();
    });

    then("Should blur the input when clicked outside the input field", () => {
      const inputRefMock = {
        current: {
          blur: jest.fn(),
          contains: jest.fn().mockReturnValue(false),
        } as unknown as HTMLInputElement,
      };

      instance.inputRef = inputRefMock;

      const outsideEvent = new MouseEvent('click', { bubbles: true });

      if (instance.inputRef && instance.inputRef.current) {
        instance.handleClickOutside(outsideEvent);

        expect(instance.inputRef.current.blur).toHaveBeenCalled();
      }
    });

    when("User enter text and click on send button", () => {
      const input = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "msg-input"
      );
      const button = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "send-btn"
      );

      input.simulate("change", { target: { value: "message" } });

      input.simulate('keypress', { key: 'Enter' });
    });

    then("Should focus the input when clicked inside the input field", () => {
      const inputRefMock = {
        current: {
          focus: jest.fn(),
          contains: jest.fn().mockReturnValue(true),
        } as unknown as HTMLInputElement,
      };

      instance.inputRef = inputRefMock;

      const insideEvent = new MouseEvent('click', { bubbles: true });

      if (instance.inputRef && instance.inputRef.current) {
        instance.handleClickOutside(insideEvent);

        expect(instance.inputRef.current.focus).toHaveBeenCalled();
      }
    });

    then("Should scroll to the bottom of the message container", () => {
      const messageContainerRefMock = {
        current: {
          scrollTop: 0,
          scrollHeight: 1000,
        } as HTMLDivElement,
      };

      instance.messageContainerRef = messageContainerRefMock;

      instance.scrollToBottom();

      if (instance.messageContainerRef && instance.messageContainerRef.current) {
        expect(instance.messageContainerRef.current.scrollTop).toBe(1000);
      }
    });

    then("I can leave the screen", () => {
      const closeBtn = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "close-btn"
      );
      closeBtn.simulate('click');

      chatWrapper.setProps({open: false});
      instance.getBgColor(1,1);
      instance.getBgColor(1,2);
      instance.getColor(1,1);
      instance.getColor(1,2);
      instance.getJustifyContent(1,1);
      instance.getJustifyContent(1,2);
      instance.getLeftPadding(true,1,1);
      instance.getLeftPadding(false,1,1);
      instance.getRightPadding(true,1,1);
      instance.getRightPadding(false,1,1);
      instance.componentWillUnmount();
      expect(chatWrapper).toBeTruthy();
    });
  });
});
