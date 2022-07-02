const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const proMode = process.env.NODE_ENV === 'production';
const env = process.env.NODE_ENV;

const webpack = require('webpack');

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].min.css',
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'web-index.html',
  filename: 'index.html',
  inject: 'body',
  title: 'Caching',
  minify: {
    html5: true,
    removeComments: proMode,
    collapseWhitespace: proMode,
    preserveLineBreaks: true,
    decodeEntities: true,
  },
});

const CleanWebpackPluginConfig = new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ['**/*', '!.git', '!.git/*', '!.git/**', '!.git/', '!README.md','!.circleci', '!.circleci/*', '!.circleci/**', '!.circleci/',],
});

module.exports = {
  entry: './index.js',
  mode: env,
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'web'),
    filename: '[name].[contenthash].js',
  },  
  module: {
    rules: [
      { test: /\.js$/, use: [{
            loader: "babel-loader",
          }], exclude: /node_modules/ },
      { test: /\.jsx$/, use: [{
            loader: "babel-loader",
            options: {
              sourceMap: true,
            },
          }], exclude: /node_modules/ },
      { test: /\.s[ac]ss$/i, use: ['style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },] },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: { 
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      },
    }
  },
  plugins: [HtmlWebpackPluginConfig, MiniCssExtractPluginConfig, CleanWebpackPluginConfig, new ESLintPlugin()],
  devServer: {
    historyApiFallback: true,
  },
}