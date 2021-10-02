module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: 'readonly',
    mocha: 'readonly',
    Mocha: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    chai: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'never'],
    curly: ['error', 'multi', 'consistent'],
    'space-before-function-paren': ['error', 'never'],
    'prefer-const': ['error'],
    'brace-style': ['error', '1tbs'],
    'block-spacing': ['error', 'always'],
    'object-curly-newline': ['error', { consistent: true }],
    'no-mixed-operators': 0
  }
}
