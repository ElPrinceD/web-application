// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


jest.mock('@zoom/meetingsdk', () => ({
    ZoomMtg: {
      init: jest.fn().mockImplementation(({ success }) => {
        success();
      }),
      join: jest.fn(),
      leave: jest.fn(),
    },
  }));