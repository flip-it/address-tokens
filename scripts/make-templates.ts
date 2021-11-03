const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

const SRC_PATH = path.resolve(__dirname, "../address-formatting/conf/");
const TARGET_PATH = path.resolve(__dirname, "../src/templates/");

if (!fs.existsSync(SRC_PATH)) {
  console.error(
    "address-formatting data not found. Maybe the submodule is not initalized?"
  );
  process.exit(1);
}

function convert(src, dest) {
  const doc = yaml.load(fs.readFileSync(path.resolve(SRC_PATH, src), "utf8"));
  fs.writeFileSync(path.resolve(TARGET_PATH, dest), JSON.stringify(doc));
}

function convertCountryCodes(src, dest) {
  const contents = fs.readFileSync(path.resolve(SRC_PATH, src), "utf8");
  const doc = yaml.load(contents.replace(/ \# /g, " "));
  fs.writeFileSync(
    path.resolve(TARGET_PATH, dest),
    JSON.stringify(Object.keys(doc))
  );
}

try {
  convert("countries/worldwide.yaml", "templates.json");
  convertCountryCodes("country_codes.yaml", "countryCodes.json");
} catch (e) {
  console.error(e);
  process.exit(1);
}
