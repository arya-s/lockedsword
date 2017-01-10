var path = require('path');

module.exports = {

  entry: ['whatwg-fetch', path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'bundle.js',
    publicPath: '/'
  }

};
