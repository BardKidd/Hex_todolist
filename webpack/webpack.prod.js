const path = require("path");
// 合併不同配置
const { merge } = require("webpack-merge");
// 讓 Webpack 能讀取到 .env 全域變數配置檔案
const Dotenv = require("dotenv-webpack");
// 壓縮打包後的檔案
const CompressionPlugin = require("compression-webpack-plugin");
// config
const modules = require("./config/modules");
const plugins = require("./config/plugins");
const resolve = require("./config/resolve");

const config = {
  mode: "production",
  output: {
    path: path.resolve("dist"),
    filename: "js/index.[contenthash].js",
    // 打包後使用 BrowserRouter 才不會掛掉
    publicPath: "./",
    clean: true,
  },
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      modules.cssLoader,
      modules.sassLoader,
      modules.imageLoader,
      modules.babelLoader,
    ],
  },
  // prod 專屬的 plugins
  plugins: [
    new Dotenv({
      path: ".env.production",
    }),
    new CompressionPlugin(),
  ],
  performance: {
    maxAssetSize: 100000,
    maxEntrypointSize: 400000,
  },
};

module.exports = merge(config, plugins, resolve);
