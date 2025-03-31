const path = require('path');  
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {  
  entry: './src/main.ts',    
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
  new CopyWebpackPlugin({  
    patterns: [  
      { from: './src/assets', to: 'assets' },  
    ],  
  }),  
  // 其他插件...  
],  
  // 输出配置  
  output: {  
    filename: 'main.js', // 打包后的JS文件名  
    path: path.resolve(__dirname, 'dist'), // 打包后的文件存放的目录  
    clean: true, // 清理/dist目录，确保不会有旧文件残留（Webpack 5+）  
  },  
  mode: 'development', // 或 'production' 根据需要 
  watch: false, 
};