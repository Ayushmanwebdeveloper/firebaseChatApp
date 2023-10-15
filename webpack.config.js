const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

const rootConfig = {
  mode: 'development',
  optimization: {
    usedExports: true, // tells webpack to tree-shake
  },
  devtool: 'eval-source-map',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env)
  })],
};

const appConfig = {
  ...rootConfig,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
    open: true,
  },
};

const serviceWorkerConfig = {
  ...rootConfig,
  entry: './src/firebase-messaging-sw.js',
  // TODO(jhuleatt): Remove this once https://github.com/firebase/firebase-js-sdk/issues/5314 is resolved
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  output: {
    filename: 'firebase-messaging-sw.js',
    path: path.resolve(__dirname, 'public'),
  }
};

module.exports = [appConfig, serviceWorkerConfig];