// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock("../../framework/src/StorageProvider", () => {
    return {
      get: jest.fn(),
      remove: jest.fn(),
    };
});

class MockFileReader {
  onload;
  result;
  readAsDataURL;
  constructor() {
    this.onload = jest.fn();
    this.result = "null";
    this.readAsDataURL = jest.fn();
    this.onloadend = jest.fn();
  }
  addEventListener(event, listener) {
    if (event === 'load') {
      this.onload = listener;
    }
  }
}
jest.mock('date-fns', () => ({
  parseISO: jest.fn((date) => new Date(date)),
  subMonths: jest.fn((date, amount) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - amount);
    return newDate;
  }),
  addMonths: jest.fn((date, amount) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + amount);
    return newDate;
  }),
  format: jest.fn((date, formatString) => {
    const d = new Date(date);
    const tokens = {
      yyyy: d.getFullYear(),
      YYYY: d.getFullYear(),
      yy: d.getFullYear().toString().slice(-2),
      MMMM: [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ][d.getMonth()],
      MMM: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ][d.getMonth()],
      MM: String(d.getMonth() + 1).padStart(2, '0'),
      M: String(d.getMonth() + 1),
      dd: String(d.getDate()).padStart(2, '0'),
      d: String(d.getDate()),
      HH: String(d.getHours()).padStart(2, '0'),
      H: String(d.getHours()),
      hh: String(d.getHours() % 12 || 12).padStart(2, '0'),
      h: String(d.getHours() % 12 || 12),
      mm: String(d.getMinutes()).padStart(2, '0'),
      m: String(d.getMinutes()),
      ss: String(d.getSeconds()).padStart(2, '0'),
      s: String(d.getSeconds()),
      SSS: String(d.getMilliseconds()).padStart(3, '0'),
      a: d.getHours() < 12 ? 'am' : 'pm',
      A: d.getHours() < 12 ? 'AM' : 'PM',
      EEEE: [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ][d.getDay()],
      EEE: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
      EE: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()],
    };

    const tokenRegex = new RegExp(Object.keys(tokens).join('|'), 'g');
    return formatString.replace(tokenRegex, (match) => tokens[match]);
  }),
  addDays: jest.fn((date, amount) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  }),
  getDay: jest.fn((date) => {
    const d = new Date(date);
    return d.getDay(); 
  }),
}));
jest.mock('react-slick', () => ({
  __esModule: true,
  default: jest.fn(), 
}));
jest.mock("react-native-fs",()=>{
  return {
   get:jest.fn()
  }
});

jest.mock('react-slick', () => ({
  __esModule: true,
  default: jest.fn(), 
}));

jest.mock("gapi-script", () => ({ loadGapiInsideDOM: () => Promise.resolve(true) }));

global.FileReader = jest.fn(() => new MockFileReader());