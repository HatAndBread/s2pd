const path = require('path');

function createConfig(name) {
  function getName() {
    if (name) {
      return `s2pd.${name}.js`; // minified global variable.
    } else {
      return 's2pd.js'; // minified es6 module.
    }
  }
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: getName(),
      library: 's'
    }
  };
}

module.exports = [
  // create one for global var and one for es6 module
  createConfig('glob'),
  createConfig()
];
