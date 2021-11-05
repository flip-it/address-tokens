# JS Address formatter

[![npm version][package-badge]][package-url] [![Build Status][ci-badge]][ci-url] ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Create internationalized address forms, like:

Sweden:

```
[Name]
[Street address]
[Postal code] [City]
```

US address:

```
[Name]
[Street address]
[City] [State] [Zip code]
```

with code like (React example):

```jsx
tokenRows.map((row, index) => (
  <div key={index}>
    {tokens.map((token) => (
      <input key={token} name={token} />
    ))}
  </div>
));
```

Using [OpenCage Data](https://github.com/OpenCageData/address-formatting/) templates with address formats used in territories around the world.

## Motivation

OpenCage Data templates are meant to display data from a fragmented set of address parts. It's not suitable to map directly to form input. We want:

1. _Normalized field names_. For example, the field name should be the same for ’Postal code’ and ’Zip code’ – the correct display form should instead be handled by translation.
2. _Omit unnecessary fields_. In this example structure, house number doens't have it's own field and is expected to be written as part of the ’Street address’.
3. _No typography_. For example no comma between City and State in US form fields.

## Recommended workflow

1. Write a Node script to extract the tokens to fulfill your form field needs.
2. Import the tokens in your web project and map them to form fields (see example above).
3. Optionally, print the address in a summary by importing the template.

## Installation & Usage

```sh
npm i -D address-tokens
```

```js

const { tokens, template } = require("address-tokens");


// Input can be any OpenCage Data template key, see below
// The value is the token name of your choice.
// Here ’road’ is split in two different fields, whereas 
// ’conty’ and ’state’ use the same field name.

const input = {
  attention: "{firstName} {lastName}",
  road: "{addressLine1}\n{addressLine2}",
  city: "{city}",
  postcode: "{postalCode}",
  county: "{region}",
  state: "{region}",
  country: "{country}",
};

tokens(input, "SE");
/* -->
[
  ["firstName", "lastName"],
  ["addressLine1"],
  ["addressLine2"],
  ["postalCode", "city"],
  ["country"],
];
*/

tokens(input, "US");
/* -->
[
  ["firstName", "lastName"],
  ["addressLine1"],
  ["addressLine2"],
  ["city", "region", "postalCode"],
  ["country"],
];
*/

template(input, "SE");
/* -->
`{firstName} {lastName}
{addressLine1}
{addressLine2}
{postalCode} {city}
{country}`
*/

template(input, "US");
/* outputs
`{firstName} {lastName}
{addressLine1}
{addressLine2}
{city}, {region} {postalCode}
{country}`
*/
```

## Full example
```js
const path = require("path");
const fs = require("fs");
const { tokens, template } = require("address-tokens");
const input = {
  attention: "{name}",
  road: "{streetAddress}",
  city: "{city}",
  postcode: "{postalCode}",
  county: "{region}",
  state: "{region}",
  country: "{country}",
};

const content = Object.fromEntries(
  ["SE", "US", "AX"].map((code) => [
    code,
    { output: template(fields, code), input: tokens(fields, code) },
  ])
);

fs.writeFileSync(path.resolve(__dirname, "my-address-tokens.js"), content);
```

## Display the data as a string

The template output can be used to format the address token data into a string. Create a function like:

```js
import layouts from './my-address-tokens';

const input = {
    firstName: 'Erik',
    lastName: 'Andersson',
    addressLine1: '4 Main street',
    postalCode: '999 00',
    city: 'Somewhere'

}
const layout = layout['SE'].output;
const tokens = layout.match(/\{\w+\}/g);
let output = layout;
tokens?.forEach((token) => {
const variable = token.substring(1, token.length - 1);
output = output.replace(token, input[variable] ?? "");
});
output = output.replace(/\n\n+/, "\n").trim();

/* --->
Erik Andersson
4 Main street
999 00 Somewhere
*/
```

## OpenCage Data template keys
Extracted from https://github.com/OpenCageData/address-formatting/blob/master/conf/countries/worldwide.yaml
```
attention
house
road
house_number
postcode
postal_city
town
city
village
municipality
hamlet
county
state
archipelago
country
quarter
state_district
suburb
state_code
county_code
city_district
region
neighbourhood
island
continent
province
residential
```

## Development and Tests

```sh
$ git clone https://github.com/flip-it/address-tokens.git
$ cd address-tokens
$ npm run pull-submodules
$ npm install
$ npm test
```

# Acknowledgments

Based on the work of [JS Address formatter](https://github.com/fragaria/address-formatter).

[package-badge]: https://img.shields.io/npm/v/address-tokens.svg?style=flat
[package-url]: https://www.npmjs.com/package/address-tokens
[ci-badge]: https://github.com/flip-it/address-tokens/workflows/tests/badge.svg
[ci-url]: https://github.com/flip-it/address-tokens/actions
