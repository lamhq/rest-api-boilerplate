module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
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
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
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

    // allow adding express package in devDependencies
    'import/no-extraneous-dependencies':[
      'error', { 'devDependencies': true }
    ],
  },
  // allow adding express package in devDependencies
  settings: {
    'import/core-modules': ['express'],
  },
};
