module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  // 'rules' to add or remove checks
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-var': 2,
    'no-undef': 0,
    'no-param-reassign': 2,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-extra-semi': 0
  }
}
