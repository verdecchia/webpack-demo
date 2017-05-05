var path = require('path');
var debug = process.env.NODE_ENV != "production";
var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
  },
  plugins: debug ? [
    new webpack.SourceMapDevToolPlugin({
      filename: 'bundle.js.map',
    })] :
  [
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
    })]
};
