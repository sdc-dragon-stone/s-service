/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

// module.exports = {
//   extends: './node_modules/eslint-config-hackreactor/index.js'
// };
module.exports = {
  extends: 'airbnb',
  rules: {
    'no-console': 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-undef': 'off',
    'import/extensions': 'always',
  }
};