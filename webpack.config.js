const webpack = require('webpack');
const path = require('path');
    
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ["env", "react", "stage-0", "jest"]
        },
        test: /\.js$/,
        exclude: /node_modules/
        
        //use: {
          
          // options: {
          //   presets: ['env', 'react', 'stage-1']
          // }
      },
    ]
  },
  watch: true
}