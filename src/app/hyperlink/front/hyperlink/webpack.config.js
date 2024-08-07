const path = require('path');  
const HtmlWebpackPlugin = require('html-webpack-plugin');
  
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
 plugins: [  
  new HtmlWebpackPlugin({  
    template: './src/index.html', // 指定HTML模板文件  
    filename: 'index.html', // 输出文件的名称  
    // 其他配置...  
  }),  
  // 其他插件...  
],  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ispace_de', // 导出为库
    libraryTarget: 'umd', // 通用模块定义
    globalObject: 'this',
  },
  mode: 'production', // 或 'development' 根据需要
  watch: true, 
};