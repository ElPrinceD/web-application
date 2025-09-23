// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock("../../framework/src/StorageProvider", () => {
    let store = {}
    return {
      set: function(key, value) {
        store[key] = value.toString();
      },
      get: function(key) {
        return store[key];
      },
      remove: function(key) {
        delete store[key];
      },
    };
  });

const entries = jest.fn()
const append = jest.fn()
global.FormData = () => ({ entries, append })

jest.mock("react-native-fs",()=>{
  return {
   get:jest.fn()
  }
});

configure({ adapter: new Adapter() });

global.Blob = function(content, options) {
  return {
    content,
    options,
    type: options.type,
  };
};

global.URL.createObjectURL = jest.fn((blob) => {
  return `blob:${blob.type}`;
});

jest.mock('node:stream', () => require('stream'));
jest.mock('node:assert', () => require('assert'));
jest.mock('node:net', () => require('net'));
jest.mock('node:http', () => require('http'));

jest.mock('@azure/msal-browser', () => {
  return {
    PublicClientApplication: jest.fn().mockImplementation(() => ({
      loginPopup: jest.fn().mockResolvedValue({
        accessToken: "mocked_access_token"
      }),
      logoutPopup: jest.fn().mockResolvedValue(true),
      getAllAccounts: jest.fn().mockReturnValue([{ username: "test_user" }]),
      acquireTokenSilent: jest.fn().mockResolvedValue({
        accessToken: "mocked_silent_access_token"
      }),
    })),
  };
});

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true)
}));