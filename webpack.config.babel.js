import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import ErrorOverlayPlugin from 'error-overlay-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import merge from 'webpack-merge'
import glob from 'glob'

import {
  devServer,
  loadCSS,
  extractCSS,
  purifyCSS,
  autoprefix,
  loadImages,
  loadJavaScript,
} from './webpack.parts'

const port = process.env.PORT || '4000'
const host = process.env.HOST || '0.0.0.0'

const PATHS = {
  app: path.join(__dirname, 'src')
}

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
  loadJavaScript({include: PATHS.app}),
  // loadCSS(),
])

const productionConfig = merge([
  // loadCSS(),
  extractCSS({
    use: ['css-loader', autoprefix()],
  }),
  purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true}),
  }),
  loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),
])

const developmentConfig = merge([
  loadCSS(),
  {
    plugins: [
      // new ErrorOverlayPlugin(),
      new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")]),
      new CaseSensitivePathsPlugin(),
      new WebpackNotifierPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new DashboardPlugin({port}),
    ],
  },
  devServer({host, port}),
  loadImages(),
])

export default (mode) => {
  process.env.BABEL_ENV = mode

  if (mode === 'production') {
    return merge(commonConfig, productionConfig, {mode})
  }
  return merge(commonConfig, developmentConfig, {mode})
}
