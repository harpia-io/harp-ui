const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerseWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const plugins = () => {
  const base = [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: isProd
      },
      favicon: 'assets/images/favicon.ico'
    }),
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images/*'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/config.js'),
          to: path.resolve(__dirname, 'dist')
        }]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash]].css'
    }),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
  // if (isProd) {
  //   base.push(new BundleAnalyzerPlugin())
  // }
  return base
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      // new OptimizeCssAssetPlugin(),
      new TerseWebpackPlugin()
    ]
  }
  return config
}

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './main.js']
    // analytics: './analytics.js'
  },

  output: {
    filename: '[name].[contenthash]].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.vue'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          whitespace: 'preserve'
        }
      },
      {
        test: /\.scss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: (resousePath, context) => {
          //       return path.relative(path.dirname(resousePath), context) + '/'
          //     }
          //   }
          // },
          // Creates `style` nodes from JS strings
          {
            loader: 'style-loader'
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader'
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resousePath, context) => {
                return path.relative(path.dirname(resousePath), context) + '/'
              }
            }
          },
          'css-loader']
      },
      {
        test: /\.(ttf|woff|woff2|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }]
      }
    ]
  }
}
