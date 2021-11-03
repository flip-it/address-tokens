import Mustache from "mustache";
import templates from "./templates/templates.json";

type Input = Record<string, string>;

const cleanupRender = (text: string) => {
  const replacements = [
    // eslint-disable-next-line no-useless-escape
    //{ s: /[\},\s]+$/u, d: "" },
    //{ s: /^[,\s]+/u, d: "" },
    { s: /^- /u, d: "" }, // line starting with dash due to a parameter missing
    { s: /\n\s+/u, d: "\n" }, // newline whitespace to just newline
    { s: /,\s*,/u, d: ", " }, // multiple commas to one
    { s: /[ \t]+,[ \t]+/u, d: ", " }, // one horiz whitespace behind comma
    { s: /[ \t][ \t]+/u, d: " " }, // multiple horiz whitespace to one
    { s: /[ \t]\n/u, d: "\n" }, // horiz whitespace, newline to newline
    { s: /\n,/u, d: "\n" }, // newline comma to just newline
    { s: /,,+/u, d: "," }, // multiple commas to one
    { s: /,\n/u, d: "\n" }, // comma newline to just newline
    { s: /\n[ \t]+/u, d: "\n" }, // newline plus space to newline
    { s: /\n\n+/u, d: "\n" }, // multiple newline to one
  ];

  for (let i = 0; i < replacements.length; i++) {
    text = text.replace(replacements[i].s, replacements[i].d);
  }
  return text.trim();
};

const findTemplate = (countryCode: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _templates = templates as any;

  if (!(countryCode in templates)) {
    throw new Error("No template found");
  }

  let useCountryCode = countryCode;

  if (_templates[countryCode] && _templates[countryCode].use_country) {
    useCountryCode = _templates[useCountryCode].use_country.toUpperCase();
  }

  const template = _templates[useCountryCode] ?? templates.default;

  const address_template = template.address_template;

  if (typeof address_template !== "string") {
    throw new Error("No template found");
  }

  return address_template;
};

const renderTemplate = (input: Input, countryCode: string) => {
  const addressTemplate = findTemplate(countryCode);

  const templateInput = {
    ...input,
    first: () => {
      return (text: string, render: (text: string, input: Input) => string) => {
        const possibilities = render(text, input)
          .split(/\s*\|\|\s*/)
          .filter((b) => b.length > 0);
        return possibilities.length ? possibilities[0] : "";
      };
    },
  };

  return Mustache.render(addressTemplate, templateInput);
};

export const template = (input: Input, countryCode: string): string =>
  cleanupRender(renderTemplate(input, countryCode));

export const tokens = (input: Input, countryCode: string) =>
  renderTemplate(input, countryCode)
    .split("\n")
    .map((l) =>
      l.match(/\{\w+\}/g)?.map((token) => token.substring(1, token.length - 1))
    )
    .filter((s) => Boolean(s));
