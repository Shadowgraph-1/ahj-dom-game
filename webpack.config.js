// webpack.config.js (ESM с полифиллом для __dirname)
import path from 'path';
import { fileURLToPath } from 'url';  // ← Новый импорт для ESM-полифилла

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // ← Полифилл: определяем __dirname

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js',
    clean: true, 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource', 
        generator: {
          filename: 'assets/[name][ext]', 
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), 
    compress: true,
    port: 8080,
    hot: true,
  },
  mode: 'development',
};