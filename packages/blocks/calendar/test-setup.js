// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock('react-calendar/dist/Calendar.css', () => ({
    __esModule: true,
    default: jest.fn(),
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

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ access_token: 'new-access-token' }),
    })
);