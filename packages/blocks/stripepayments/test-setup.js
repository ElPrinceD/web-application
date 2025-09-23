// test-setup.js
import "@testing-library/jest-dom";
import "@testing-library/jest-native/extend-expect";

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));
