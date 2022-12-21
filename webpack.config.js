const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlConfig = require(path.join(__dirname, 'html.config'));
const CleanPlugin = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const deploy = path.join(__dirname, 'deploy');
const isProduction = process.env.NODE_ENV == "production";

// keep the env param to be explicit, eslint disable should be removed when template is in use
// eslint-disable-next-line no-unused-vars
module.exports = (env) => {
  const plugins = [
    new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin(HtmlConfig),
    new MiniCssExtractPlugin({ filename: 'css/game.style.css' }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname + '/static'), to: deploy }
      ]
    }),
    new ESLintPlugin()
  ];

  return {
    stats: 'errors-only',

    mode: isProduction ? 'production':'development',

    devServer: {
      open: true,
      client: { overlay: true },
      host: '0.0.0.0',
      port: 8080,
      static: path.join(__dirname, '/static')
    },

    context: path.resolve(__dirname, 'src'),

    entry: path.join(__dirname, '/src/index.js'),
    output: {
      filename: 'js/game.bundle.js',
      path: deploy
    },

    optimization: {
      minimizer: [new TerserPlugin({
        extractComments: true
      })]
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
          use: ['babel-loader']
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
                outputPath: './assets/image'
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
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ]
    }
  };
};
