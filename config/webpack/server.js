const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  target: "node",
  entry: {
    server: path.resolve(__dirname, "../../src/server/")
  },
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name].js",
    publicPath: process.env.APP_HOST
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/,
        enforce: "pre"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [".env", "server.js"]
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV || JSON.stringify("production")
    })
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      Server: "./src/server/index.js"
    }
  }
};
