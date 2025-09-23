// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ZoomMtg} from "@zoom/meetingsdk";
configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null
}));

jest.mock("../../framework/src/Utilities", () => ({
  getStorageData: jest.fn().mockImplementationOnce(() => {
    return Promise.resolve('1')
  }).mockImplementationOnce(() => {
    return Promise.resolve('1')
  }).mockImplementation(() => {
    return Promise.resolve('2')
  }),
  setStorageData: jest.fn(),
  removeStorageData: jest.fn()
}));

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

jest.mock('../../blocks/notifications/src/Notifications.web.tsx', () => {
  const mockComponent = function(props) {
    const React = require('react');
    const { style, ...otherProps } = props;
    const safeStyles = { ...style };
    delete safeStyles.textWrap;
    return React.createElement('div', { 
      ...otherProps,
      style: safeStyles 
    });
  };
  
  return mockComponent;
});

jest.mock('@zoom/meetingsdk', () => ({
  ZoomMtg: {
    init: jest.fn().mockImplementation(({ success }) => {
      success();
    }),
    join: jest.fn(),
    leave: jest.fn(),
  },
}));

