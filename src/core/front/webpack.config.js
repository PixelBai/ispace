const { watch } = require('fs');
const path = require('path');

module.exports = {
  entry: './src/core.ts', // 入口文件路径
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
  output: {
    filename: 'core.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ispace', // 导出为库
    libraryTarget: 'umd', // 通用模块定义
    globalObject: 'this',
  },
  mode: 'production', // 或 'development' 根据需要
  watch: true,
};
