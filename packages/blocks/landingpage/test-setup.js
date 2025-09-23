// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
  removeStorageData: jest.fn()
}));

jest.mock('slick-carousel/slick/slick.css', () => ({
    __esModule: true,
    default: jest.fn(), 
  }));

  jest.mock('slick-carousel/slick/slick-theme.css', () => ({
    __esModule: true,
    default: jest.fn(), 
  }));

  jest.mock('react-slick', () => ({
    __esModule: true,
    default: jest.fn(), 
  }));
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};

global.localStorage = localStorageMock;

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
