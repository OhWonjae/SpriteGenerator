const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  entry: './src/pages/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: `${process.env.BASE_URL}/`,
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'assets'),
          to: path.resolve(__dirname, 'dist', 'public', 'assets'),
        },
      ],
    }),
  ],
};
