const webpack = require("webpack");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    open: {
      app: {
        name: "chrome"
      }
    },
    client: {
      overlay: {
        warnings: true,
        errors: true
      }
    },
    historyApiFallback: true,
    port: "8080",
    https: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) || JSON.stringify("staging")
    }),
    new Dotenv({ path: path.resolve(__dirname, "../../.env.prod") })
  ]
});
