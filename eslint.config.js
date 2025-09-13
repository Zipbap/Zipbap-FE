import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import globals from 'globals';

import importConfig from './eslint.config.import.js';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'android', 'ios', '.expo', '__tools__'],
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
      globals: {
        ...globals.node,
        ...globals.browser,
        __DEV__: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],

      // React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // React Native
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',

      // TypeScript
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // 기본 규칙
      semi: ['warn', 'always'],
      camelcase: ['warn', { properties: 'never', ignoreDestructuring: true }],
      curly: ['warn', 'all'],
      eqeqeq: ['warn', 'always'],
      'no-var': 'warn',
      'prefer-const': 'warn',
      'no-self-assign': 'warn',
      'no-new-func': 'warn',
      'no-inner-declarations': ['warn', 'functions'],
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'arrow-parens': ['warn', 'as-needed'],
      'implicit-arrow-linebreak': ['warn', 'beside'],
      'object-shorthand': ['warn', 'always'],
      'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
      'keyword-spacing': 'warn',
      'array-bracket-newline': ['warn', { multiline: true, minItems: 2 }],
      'array-element-newline': ['warn', { multiline: true, minItems: 2 }],
      'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: false }],
    },
  },
  importConfig,
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  prettier,
];
