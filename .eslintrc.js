module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  rules: {
    'global-require': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off'
  },
  globals: {
    fetch: false
  }
};