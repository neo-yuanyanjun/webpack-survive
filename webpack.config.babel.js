import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import merge from 'webpack-merge'

import {devServer, loadCSS, extractCSS} from './webpack.parts'

const port = process.env.PORT || '4000'
const host = process.env.HOST || '0.0.0.0'

/**
export default {
  plugins: [
    new HtmlWebpackPlugin({title: 'Webpack Demo'}),
    new ErrorOverlayPlugin(),
    new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")]),
    new CaseSensitivePathsPlugin(),
    // new WebpackNotifierPlugin(),
    // new FriendlyErrorsWebpackPlugin(),
    new DashboardPlugin({port}),
  ],
  devServer: {
    // stats: 'errors-only',
    // host: process.env.HOST || '0.0.0.0',
    port,
    // open: true,
    overlay: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
}

*/

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({title: 'Webpack Demo'}),
    ],
  },
  // loadCSS(),
])

const productionConfig = merge([
  // loadCSS(),
  extractCSS({
    use: 'css-loader',
  }),
])

const developmentConfig = merge([
  loadCSS(),
  {
    plugins: [
      new ErrorOverlayPlugin(),
      new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")]),
      new CaseSensitivePathsPlugin(),
      new WebpackNotifierPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new DashboardPlugin({port}),
    ],
  },
  devServer({host, port})
])

export default (mode) => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, {mode})
  }
  return merge(commonConfig, developmentConfig, {mode})
}
