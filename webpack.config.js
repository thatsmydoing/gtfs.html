const common = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ],
    noParse: [
      /localforage\.js/
    ]
  }
}

const frontend = Object.assign({}, common, {
  devtool: 'cheap-module-source-map',
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'app.bundle.js'
  }
});

const backend = Object.assign({}, common, {
  entry: './src/server.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'server.js'
  },
  externals: {
    'express': 'commonjs express',
    'webpack': 'commonjs webpack',
    'webpack-dev-middleware': 'commonjs webpack-dev-middleware'
  },
  target: 'node'
});

module.exports = [frontend, backend];
