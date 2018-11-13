const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './src/scripts/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/(node_modules)/, /\.spec\.js$/],
        include: [
          path.resolve(__dirname, '../js')
        ],
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pomodoro timer',
      favicon: path.resolve('./src/static/favicon.ico'),
      template: path.resolve('./index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new ServiceWorkerWebpackPlugin({
      entry:  path.join(__dirname, '../src/scripts/sw.js'),
      excludes: ['**/.*', '**/*.map', '*.html']
    }),
    new CopyWebpackPlugin([
      { from: 'src/static/alarm.mp3', to: 'alarm.mp3'},
      { from: 'src/static/pomodoro.webmanifest', to: 'pomodoro.webmanifest'}
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../'),
    compress: true,
    historyApiFallback: true
  }
};