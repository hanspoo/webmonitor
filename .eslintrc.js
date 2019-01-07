module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  rules: {
    'react/destructuring-assignment': 'off',
    'arrow-parens': 'off',
    'global-require': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  },
  globals: {
    fetch: false
  }
};
