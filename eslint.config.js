import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules', '.next', 'dist', 'eslint.config.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: [
      'plugin:prettier/recommended'
    ],
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
      react: reactPlugin,
    },
    rules: {
      // базовые рекомендации
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // индивидуальные настройки
      semi: ['warn', 'always'],
      '@typescript-eslint/no-empty-interface': [
        'error',
        {allowSingleExtends: true},
      ],
      'no-multiple-empty-lines': ["error", {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }],
      'react/jsx-curly-spacing': ["error", {
        "when": "always",
        "children": true
      }],
    },
    settings: {
      react: {
        version: 'detect', // автоматически определяет версию React
      },
    },
  },
];
