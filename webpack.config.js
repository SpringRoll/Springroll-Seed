const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');
const HtmlConfig = require(path.join(__dirname, 'html.config'));

const plugins = [new HtmlWebpackPlugin(HtmlConfig), new MiniCssExtractPlugin()];

if (process.env.WEBPACK_SERVE) {
  plugins.push(new webpackDashboard());
}

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  stats: 'errors-only',
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
    vendor: path.join(__dirname, 'src', 'vendor.js')
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/image/'
            }
          }
        ]
      },
      {
        test: /\.(mp3|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/audio/'
            }
          }
        ]
      },
      {
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/video/'
            }
          }
        ]
      }
    ]
  }
};
