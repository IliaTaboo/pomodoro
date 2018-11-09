const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pomodoro timer',
      favicon: path.resolve('./src/img/favicon.ico'),
      template: path.resolve('./index.html')
    })
  ],
};