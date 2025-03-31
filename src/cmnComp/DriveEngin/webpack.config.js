const path = require('path');  
  
module.exports = {  
  entry: './src/index.ts',  
  module: {  
    rules: [  
      {  
        test: /\.tsx?$/,  
        use: 'ts-loader',  
        exclude: /node_modules/,  
      },  
    ],  
  },  
  resolve: {  
    extensions: ['.ts', '.js'],  
  },  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ispace_de', // 导出为库
    libraryTarget: 'umd', // 通用模块定义
    globalObject: 'this',
  },
  mode: 'production', // 或 'development' 根据需要
  watch: false, 
};