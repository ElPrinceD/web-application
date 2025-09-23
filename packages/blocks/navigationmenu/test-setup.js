// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("react-native-fs", () => {
    return {
        get: jest.fn()
    }
});

jest.mock("../../framework/src/StorageProvider", () => {
    let store = {}
    return {
        set: function (key, value) {
            store[key] = value.toString();
        },
        get: function (key) {
            return store[key];
        },
        remove: function (key) {
            delete store[key];
        },
    };
});

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

window.innerWidth === "1020px"

  
