// test-setup.js
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded'; 
import {ZoomMtg} from "@zoom/meetingsdk";
configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('gapi-script', () => ({
  gapi: {
    auth2: {
      init: jest.fn().mockResolvedValue({
        isSignedIn: {
          get: jest.fn().mockReturnValue(true),
        },
        signIn: jest.fn().mockResolvedValue({
          getAuthResponse: jest.fn().mockReturnValue({
            id_token: 'test-id-token',
          }),
        }),
      }),
    },
    client: {
      init: jest.fn().mockResolvedValue({
      }),
      load: jest.fn().mockResolvedValue({
      }),
    },
  },
}));

global.crypto = {
  getRandomValues: (arr) => require('crypto').randomBytes(arr.length),
};

jest.mock('@zoom/meetingsdk/embedded', () => ({
  __esModule: true,
  default: {
    createClient: jest.fn().mockReturnValue({
      init: jest.fn().mockResolvedValueOnce(),
      join: jest.fn().mockResolvedValueOnce(),
      getAttendeeslist: jest.fn(),
      on: jest.fn(),
    }),
  },
}));

jest.mock('@zoom/meetingsdk', () => ({
  ZoomMtg: {
    init: jest.fn().mockImplementation(({ success }) => {
      success();
    }),
    join: jest.fn(),
    leave: jest.fn(),
  },
}));


export const ZoomMtg = {
  init: jest.fn().mockImplementation(({ success }) => {
    success();
  }),
  join: jest.fn()
};

jest.mock('../../framework/src/StorageProvider', () => {
  return {
      get: jest.fn(),
      remove: jest.fn()
  }
})

const root = document.createElement('div');
  root.setAttribute('id', 'meetingSDKElement');
  document.body.appendChild(root);

jest.mock('@zoom/meetingsdk/embedded');


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