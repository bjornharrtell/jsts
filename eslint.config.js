import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        //...globals.browser,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        $: 'readonly',
        mocha: 'readonly',
        Mocha: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        chai: 'readonly',
      },
    },
    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: ['error', 'never'],
      curly: ['error', 'multi', 'consistent'],
      'space-before-function-paren': ['error', 'never'],
      'brace-style': ['error', '1tbs'],
      'block-spacing': ['error', 'always'],
      'object-curly-newline': ['error', { consistent: true }],
      'prefer-const': 1,
      'no-mixed-operators': 0,
      'no-empty': 0,
      'no-undef': 0,
      'no-unreachable': 0,
      'no-case-declarations': 0,
      'no-unused-vars': 0,
      'no-dupe-else-if': 0,
      'no-constant-condition': 0,
    },
  },
]
