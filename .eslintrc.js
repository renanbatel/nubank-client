/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-undef */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    root: true,
    project: 'tsconfig.json',
    createDefaultProgram: true,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
  env: {
    es6: true,
    jest: true,
    'jest/globals': true,
  },
  plugins: ['@typescript-eslint', 'unicorn', 'import', 'jest', 'promise', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'max-len': [
      'error',
      {
        code: 150,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-return-await': 'error',
    'no-trailing-spaces': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: 'return',
        prev: '*',
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'var'],
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
      {
        blankLine: 'always',
        next: '*',
        prev: 'directive',
      },
      {
        blankLine: 'any',
        next: 'directive',
        prev: 'directive',
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: [/env|props?|tmp/i],
      },
    ],
    'unicorn/prefer-module': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    'prettier/prettier': 'error',
    'unicorn/prefer-node-protocol': 'off',
    'import/no-unresolved': ['error', { ignore: ['^jose'] }],
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNullish: true }],
    'import/no-named-as-default': 'off',
    'unicorn/no-useless-promise-resolve-reject': 'off',
    'unicorn/no-array-method-this-argument': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: false,
        },
      },
    ],
  },
}
