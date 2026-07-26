import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import tsESLint from 'typescript-eslint';

const tsConfigPath = './tsconfig.json';

export default [
  js.configs.recommended,
  ...tsESLint.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules', 'dist', './src/shared/v1/enums/**/*', './src/__scripts__/**/*'],
    languageOptions: {
      parser: tsESLint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: [tsConfigPath],
      },
    },
    plugins: {
      import: importPlugin,
      prettier: (await import('eslint-plugin-prettier')).default,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryDefaultImports: true,
          project: tsConfigPath,
        },
      },
    },
    rules: {
      // --- General Rules ---
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ], // CURRENT

      // --- Styling & Formatting ---
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-duplicate-imports': 'error',
      'array-callback-return': 'error',
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'dot-location': ['error', 'property'],
      'dot-notation': ['error', { allowKeywords: true }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'func-call-spacing': ['error', 'never'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      'no-lonely-if': 'error',
      'no-negated-condition': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'object-curly-spacing': ['error', 'always'],
      'operator-assignment': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'prefer-exponentiation-operator': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'quote-props': ['error', 'as-needed'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'semi-style': ['error', 'last'],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': ['error', 'always', { block: { balanced: true } }],
      'switch-colon-spacing': ['error', { after: true, before: false }],
      'symbol-description': 'error',

      // --- Arrow Functions ---
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'generator-star-spacing': ['error', { before: true, after: true }],
      'no-confusing-arrow': 'error',

      // --- ES6+ ---
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'rest-spread-spacing': ['error', 'never'],
      'template-curly-spacing': ['error', 'never'],
      'yield-star-spacing': ['error', 'both'],

      // --- TypeScript Specific ---
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': ['warn'],

      // اصلاح شده: member-ordering
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'static-field',
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'static-method',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'public-field',
            'protected-field',
            'private-field',
            'field',
            'constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
            'public-method',
            'protected-method',
            'private-method',
            'method',
          ],
        },
      ],

      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      // '@typescript-eslint/triple-equals': ['error', { default: false }],
      // '@typescript-eslint/type-annotation-spacing': 'error',
      '@typescript-eslint/unified-signatures': 'error',

      // --- Import Ordering ---
      // 'import/order': [
      //   'error',
      //   {
      //     groups: [
      //       'builtin',
      //       'external',
      //       'internal',
      //       'parent',
      //       'sibling',
      //       'index',
      //       'unknown',
      //     ],
      //     'newlines-between': 'always',
      //     alphabetize: {
      //       order: 'asc',
      //       caseInsensitive: true
      //     },
      //   },
      // ],

      'import/no-absolute-path': 'error',
      'import/no-self-import': 'off', // CURRENT
      'import/no-useless-path-segments': 'off', // CURRENT
      'import/no-mutable-exports': 'off', // CURRENT
      'import/export': 'off', // CURRENT
      'import/first': 'error',
      'import/no-duplicates': 'off', // CURRENT

      // --- Prettier ---
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          arrowParens: 'avoid',
        },
      ],
    },
  },
];
