import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const tsConfigPath = './tsconfig.json';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],

    ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'src/__scripts__/**', 'src/shared/v1/enums/**', '__test__/**'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: tsConfigPath,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },

    plugins: {
      import: importPlugin,
      sonarjs,
      'unused-imports': unusedImports,
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: tsConfigPath,
        },
      },
    },

    rules: {
      // ========================= General =========================

      'no-console': 'warn',
      'no-debugger': 'error',

      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ========================= Style =========================

      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-style': ['error', 'last'],
      'comma-spacing': 'error',
      'object-curly-spacing': ['error', 'always'],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs'],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'func-call-spacing': ['error', 'never'],
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error',
        {
          named: 'never',
          anonymous: 'always',
          asyncArrow: 'always',
        },
      ],
      'array-callback-return': 'error',
      eqeqeq: ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],

      // ========================= Modern JavaScript =========================

      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'object-shorthand': ['error', 'always'],

      // ========================= TypeScript =========================

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/unified-signatures': 'error',

      'no-shadow': 'off',
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',

      // ========================= Imports =========================

      'import/first': 'error',
      'import/no-absolute-path': 'error',
      'import/no-cycle': 'warn',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',

      // ========================= SonarJS =========================

      'sonarjs/cognitive-complexity': ['warn', 15],
      'sonarjs/no-duplicate-string': 'off',
    },
  },
];
