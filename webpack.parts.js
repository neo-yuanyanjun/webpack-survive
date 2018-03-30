import Autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import PurifyCSSPlugin from 'purifycss-webpack'

export const devServer = ({host, port} = {}) => ({
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
})

export const loadCSS = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([Autoprefixer])
            }
          },
        ],
      },
    ],
  },
})


export const extractCSS = ({include, exclude, use}) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].css',
  })

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: "style-loader",
          }),
        },
      ],
    },
    plugins: [plugin],
  };
}

export const purifyCSS = ({paths}) => ({
  plugins: [new PurifyCSSPlugin({paths})],
})

export const autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [Autoprefixer()],
  },
})

export const loadImages = ({include, exclude, options} = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
})

export const loadFont = ({options}) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader',
        options: {
          limit: 50000,
          mimetype: 'application/font-woff',
          name: './fonts/[name].[ext]',
          publicPath: '../',
          ...options,
        },
      },
    ],
  }
})

export const loadJavaScript = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        loader: 'babel-loader',
      },
    ],
  },
})
