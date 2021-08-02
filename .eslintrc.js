// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution')

/**
 * Bookmarks:
 * - https://rushstack.io/pages/heft_tasks/eslint/
 * - https://www.npmjs.com/package/@rushstack/eslint-config
 *
 * @type {import('@types/eslint').Linter.Config}
 */
module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: ['@rushstack/eslint-config/profile/web-app'],
  rules: {
    // TODO: Make this list smaller, not bigger
    '@rushstack/typedef-var': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/typedef': 'off',
  },
}
