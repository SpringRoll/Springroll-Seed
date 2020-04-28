const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlConfig = require(path.join(__dirname, 'html.config'));
const CleanPlugin = require('clean-webpack-plugin');

const deploy = path.join(__dirname, 'deploy');

module.exports = env => {
  const plugins = [
    new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin(HtmlConfig),
    new MiniCssExtractPlugin({ filename: 'css/game.style.css' }),
    new CopyPlugin([{ from: path.join(__dirname + '/static') }])
  ];
  return {
    stats: 'errors-only',

    mode: env.dev ? 'development' : 'production',

    devServer: {
      open: true,
      overlay:true,
      contentBase: path.join(__dirname, '/static')
    },

    entry: ['@babel/polyfill', path.join(__dirname, '/src/index.js')],
    output: {
      filename: 'js/game.bundle.js',
      path: deploy
    },
    plugins,
    resolve: {
      alias: {
        createjs: 'createjs/builds/1.0.0/createjs.js'
      }
    },
    module: {
      rules: [
        {
          test: /node_modules[/\\]createjs/,
          loaders: [
            'imports-loader?this=>window',
            'exports-loader?window.createjs'
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.(otf|woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                useRelativePath: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: path.join(deploy + 'assets/image')
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
                outputPath: path.join(deploy + '/assets/audio/')
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
                outputPath: path.join(deploy + '/assets/video/')
              }
            }
          ]
        }
      ]
    }
  };
};
