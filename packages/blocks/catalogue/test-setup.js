// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
jest.mock('react-native-vector-icons/FontAwesome', () => ({
    font: () => null
}));
import { NativeModules } from 'react-native';
NativeModules.RNCAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
};
jest.mock("../../framework/src/Utilities", () => ({
  setStorageData: jest
    .fn()
    .mockImplementationOnce((key) => {
      if (key === "login_token") {
        return JSON.stringify(
          "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6OCwiZXhwIjoxNjc1NTExMjAwLCJ0b2tlbl90eXBlIjoibG9naW4ifQ.l1reF4AVlAkI0_7zhC89IsV3c8zw7_I4gz3M5lBbGE8FCbTQCNdOQIVq5yI2wCQqEsNCFyVu7udgXvXh7joDyQ",
        );
      }
      if (key === "postData") {
        return JSON.stringify([
          {
            id: 22,
            name: "User 1",
            body: "Post Text",
            location: "Post Location",
          },
        ]);
      }
      if (key === "commentData") {
        return JSON.stringify({
          id: 4,
          name: "User - 44",
          accountID: 44,
          postID: 10,
          commentText: "Comment text",
          isDestroyed: false,
          isNewOption: false,
        });
      }
      if (key === "account_Id") {
        return JSON.stringify(24);
      }
      return "token";
    })
    .mockImplementation(() => null),
  getStorageData: jest
    .fn()
    .mockImplementationOnce((key) => {
      if (key === "login_token") {
        return JSON.parse(
          "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6OCwiZXhwIjoxNjc1NTExMjAwLCJ0b2tlbl90eXBlIjoibG9naW4ifQ.l1reF4AVlAkI0_7zhC89IsV3c8zw7_I4gz3M5lBbGE8FCbTQCNdOQIVq5yI2wCQqEsNCFyVu7udgXvXh7joDyQ",
        );
      }
      if (key === "postData") {
        return JSON.parse([
          {
            id: 22,
            name: "User 1",
            body: "Post Text",
            location: "Post Location",
          },
        ]);
      }
      if (key === "account_Id") {
        return JSON.parse(24);
      }
      return "token";
    })
    .mockImplementation(() => null),
}));
jest.mock('react-native-vector-icons/FontAwesome', () => ({
  font: () => null
}));