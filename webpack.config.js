module.exports = {
  entry: "./app.js",
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
    }]
  }
}
