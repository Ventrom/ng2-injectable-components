const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');
const IS_PROD = process.argv.indexOf('-p') > -1;

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'demo': './demo/entry.ts'
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
    path: helpers.root('/demo/')
  },
  module: {
    rules: [
      // Support for .ts files.
      {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
      },

      // Support for *.json files.
      {
          test: /\.json$/,
          loader: 'json-loader'
      },
      // Support for *.scss files.
      {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
      },

      // support for .html and .css as raw text
      {
          test: /\.(html|css)$/,
          loader: 'raw-loader',
          exclude: [helpers.root('demo/index.html')]
      },

      // support for fonts
      {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader?name=dist/[name]-[hash].[ext]'
      },

      // support for svg icons
      {
          test: /\.svg$/,
          loader: 'svg-url-loader'
      },

      // support for csv files
      {
        test: /\.csv$/,
        loader: 'raw-loader'
      }
    ]
  },
  /*
  * Options affecting the resolving of modules.
  *
  * See: http://webpack.github.io/docs/configuration.html#resolve
  */
  resolve: {
      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json', '.css', '.html'],

      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src/lib'), 'node_modules']
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'demo'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
    }),
    // Plugin: CommonsChunkPlugin
    // Description: Shares common code between the pages.
    // It identifies common modules and put them into a commons chunk.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'], minChunks: Infinity }),
    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new LoaderOptionsPlugin({
        debug: true,
        options: {
            /**
             * Static analysis linter for TypeScript advanced options configuration
             * Description: An extensible linter for the TypeScript language.
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            tslint: {
                emitErrors: false,
                failOnHint: false,
                resourcePath: 'src'
            }
        }
    })
  ],
  // we need this due to problems with es6-shim
  node: {
      global: true,
      progress: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
  }
};
