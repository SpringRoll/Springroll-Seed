const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlConfig = require(path.join(__dirname, 'html.config'));
const CleanPlugin = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const deploy = path.join(__dirname, 'deploy');

module.exports = (env) => {
  const isProduction = !!env.production;

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
          use: [{
              loader: 'exports-loader',
              options: {
                  type: 'commonjs',
                  exports: 'single window.createjs',
              },
          }],
      },
      {
          test: /node_modules[/\\]createjs/,
          use: [{
              loader: 'imports-loader',
              options: {
                  wrapper: 'window',
              },
          }],
      },
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
    },
    optimization: {
      minimize: true,
      minimizer: [
          new TerserPlugin({
              terserOptions: {
                  mangle: {
                      keep_fnames: isProduction ? false : true,
                  },
                  compress: {
                      drop_console: isProduction ? ['log', 'info']: false,
                  },
              },
          }),
      ],
  }
  };
};
