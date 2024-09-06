const path = require("path");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../../src/client")
  },
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[id].[contenthash].js",
    publicPath: process.env.APP_HOST || "/",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[contenthash][ext][query]"
        }
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "fonts/[contenthash][ext][query]"
      //   }
      // },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ["json-loader"],
        type: "javascript/auto"
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[chunkhash].css",
      linkType: "text/css"
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      path: require.resolve("path-browserify")
    },
    alias: {
      "@api": path.resolve(__dirname, "../api-config.js"),
      "@config": path.resolve(__dirname, "../../config"),
      "@components": path.resolve(__dirname, "../../src/client/components"),
      "@pages": path.resolve(__dirname, "../../src/client/pages"),
      "@routes": path.resolve(__dirname, "../../src/client/routes"),
      "@redux": path.resolve(__dirname, "../../src/client/redux"),
      "@assets": path.resolve(__dirname, "../../src/client/assets"),
      "@utils": path.resolve(__dirname, "../../src/client/utils"),
      "@appStyles": path.resolve(__dirname, "../../src/client/app.styles"),
      "@helpers": path.resolve(__dirname, "../../src/client/_helpers"),
      "@translations": path.resolve(__dirname, "../../src/client/translations")
    }
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    }
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      })
    ],
    splitChunks: {
      chunks: "all",
      hidePathInfo: true,
      minSize: 21000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};
