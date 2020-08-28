const path = require('path');
/*
module.exports = {
  entry: './src/index.js',
  output: {
    library: 's2pd',
    libraryTarget: 'var', //exports as global variable s2pd;
    filename: 's2pd.js',
    path: path.resolve(__dirname, 'dist')
  }
};
*/

function createConfig(name) {
  function getName() {
    if (name) {
      return `s2pd.${name}.js`;
    } else {
      return 's2pd.js';
    }
  }
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: getName(),
      library: 's2pd'
    }
  };
}

module.exports = [
  // create one for global var and one for es6 module
  createConfig('glob'),
  createConfig()
];
