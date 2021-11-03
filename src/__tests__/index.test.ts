import { tokens, template } from "../index";

const input = {
  attention: "{firstName} {lastName}",
  road: "{addressLine1}\n{addressLine2}",
  city: "{city}",
  postcode: "{postalCode}",
  county: "{region}",
  state: "{region}",
  country: "{country}",
};

describe("tokens array", () => {
  test("SE", () => {
    expect(tokens(input, "SE")).toMatchSnapshot();
  });

  test("US", () => {
    expect(tokens(input, "US")).toMatchSnapshot();
  });

  test("AX", () => {
    expect(tokens(input, "AX")).toMatchSnapshot();
  });

  test("no input", () => {
    expect(tokens({}, "AX")).toMatchSnapshot();
  });

  test("invalid code", () => {
    expect(() => tokens(input, "X_")).toThrow();
  });

  test("empty code", () => {
    expect(() => tokens(input, "")).toThrow();
  });
});
const x = [
  ["firstName", "lastName"],
  ["addressLine1"],
  ["addressLine2"],
  ["city", "region", "postalCode"],
  ["country"],
];
describe("string template", () => {
  test("SE", () => {
    expect(template(input, "SE")).toMatchSnapshot();
  });

  test("US", () => {
    expect(template(input, "US")).toMatchSnapshot();
  });

  test("AX", () => {
    expect(template(input, "AX")).toMatchSnapshot();
  });

  test("no input", () => {
    expect(template({}, "AX")).toMatchSnapshot();
  });

  test("invalid code", () => {
    expect(() => template(input, "X_")).toThrow();
  });

  test("empty code", () => {
    expect(() => template(input, "")).toThrow();
  });
});
