/**
 * Boilerplate ESLint config, adjust to your requirements
 * See: https://www.npmjs.com/package/@renoirb/conventions-use-eslint
 */
const base = require("@renoirb/conventions-use-eslint");

/**
 * @type {import('@types/eslint').Linter.Config}
 */
const main = {
  ...base,
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    tsconfigRootDir: process.cwd(),
    project: "./tsconfig.json",
    ...(base.parserOptions || {})
  },
  rules: {
    ...base.rules
    // TODO: Make this list smaller, not bigger
  }
};

module.exports = main;
