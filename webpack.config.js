const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
};

const scss = {
  test: /\.scss$/,
  use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
};

const urls = {
  test: /\.(png|jp(e*)g|svg|ico)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8000, // Convert images < 8kb to base64 strings
        name: 'images/[hash]-[name].[ext]',
      },
    },
  ],
};

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [javascript, scss, urls],
  },
  plugins: [
    new CleanWebpackPlugin('client', {}),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: 'images',
      },
    ]),
  ],
};
