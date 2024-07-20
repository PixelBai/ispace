const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
 

module.exports = {
  mode: 'development',
  entry: {app:'./src/asset/ts/app.ts',test:'./src/asset/ts/test.ts'},
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({  
      template: './src/index.html' // 指向你的 HTML 模板文件  
    })  ,
 
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    }
  }
};