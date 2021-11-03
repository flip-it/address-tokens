# JS Address formatter


[![npm version][package-badge]][package-url] [![Build Status][ci-badge]][ci-url] ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Create internationalized address forms and format an address from your collected data. 

Based on [OpenCage Data](https://github.com/OpenCageData/address-formatting/) templates with address formats used in territories around the world.

## Installation & Usage

Create token files in Node for your project, and use them in the browser.

```sh
npm i -D @flip-it/address-tokens
```

````js
const { tokens, template } = require('@flip-it/address-tokens');
const input = {
  attention: "{firstName} {lastName}",
  road: "{addressLine1}\n{addressLine2}",
  city: "{city}",
  postcode: "{postalCode}",
  county: "{region}",
  state: "{region}",
  country: "{country}",
}

tokens(input, "SE");

/* outputs:
[
  ["firstName", "lastName"],
  ["addressLine1"],
  ["addressLine2"],
  ["postalCode", "city"],
  ["country"],
];
*/

tokens(input, "US");
/* outputs:
[
  ["firstName", "lastName"],
  ["addressLine1"],
  ["addressLine2"],
  ["city", "region", "postalCode"],
  ["country"],
];
*/

template(input, "SE")
/* outputs:
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

## Development & Tests

```sh
$ git clone https://github.com/flip-it/address-tokens.git
$ cd address-tokens
$ npm run pull-submodules
$ npm install
$ npm test
````

# Acknowledgments

Heavily inspired by [JS Address formatter](https://github.com/fragaria/address-formatter).