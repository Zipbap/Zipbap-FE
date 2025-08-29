import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'android', 'ios', '.expo'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // TypeScript
      ...typescript.configs.recommended.rules,

      // React
      ...react.configs.recommended.rules,

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // React Native
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // 기본 규칙
      semi: ['error', 'always'],
      camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-self-assign': 'error',
      'no-new-func': 'error',
      'no-inner-declarations': ['error', 'functions'],
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'implicit-arrow-linebreak': ['error', 'beside'],
      'object-shorthand': ['error', 'always'],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'keyword-spacing': 'error',
      'array-bracket-newline': ['error', { multiline: true, minItems: 2 }],
      'array-element-newline': ['error', { multiline: true, minItems: 2 }],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    },
  },
  prettier,
];
