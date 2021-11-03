module.exports = {
  root: true,
  env: { node: true },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ]
};
