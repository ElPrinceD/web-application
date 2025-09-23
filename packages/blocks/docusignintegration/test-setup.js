// // test-setup.js
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// jest.mock('react-native/Libraries/Utilities/Platform', () => ({
//     OS: 'macos',
//     select: () => null
// }));


// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ZoomMtg} from "@zoom/meetingsdk";

const entries = jest.fn()
const append = jest.fn()
global.FormData = () => ({ entries, append })
configure({ adapter: new Adapter() });


jest.mock('react-native/Libraries/Utilities/Platform', () => ({
   OS: 'macos',
   select: () => null
}));


jest.mock('react-native-signature-canvas', () => {
  return {
   SignatureViewProps:{
      onGetData: (data) =>{ }
   }
  }
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