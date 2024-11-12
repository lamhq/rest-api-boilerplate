// reference: https://typescript-eslint.io/getting-started
module.exports = {
  // this file is the root-level one used by the project and
  // ESLint should not search beyond this directory for config files.
  root: true,
  // tells ESLint to use the @typescript-eslint/parser package you installed to parse your source files.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // find the closest `tsconfig.json` for each source file
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  // allow using express without adding it as dependencies
  settings: {
    'import/core-modules': ['express'],
  },
  rules: {
    // Use single quotes for string literals and avoid escaping characters
    'quotes': [2, 'single', { 'avoidEscape': true }],

    // Explicitly specify return type and module boundary types
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',

    // Avoid using the `any` data type
    '@typescript-eslint/no-explicit-any': 'error',

    // Disable the rule that require default exports in a module
    'import/prefer-default-export': 'off',

    // class method don't need to use `this`, it may be an utility function
    'class-methods-use-this': 'off',

    // prefix interfaces with `I` character
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'prefix': ['I']
      }
    ],

    // allow adding @types/express package in devDependencies
    'import/no-extraneous-dependencies':[
      'error', { 'devDependencies': true }
    ],
  }
};
