module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    <!-- 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', -->
    'indent': 'off',
    'no-debugger': 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'no-multiple-empty-lines': 'off',
     'no-tabs': 'off',
     'spaced-comment': 'off'
  }
}
