module.exports = {
  entry: "./index.jsx",
  context: __dirname + '/assets',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: "./bundle",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: __dirname + '/assets',
      exclude: /(node_modules)/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  }
}
