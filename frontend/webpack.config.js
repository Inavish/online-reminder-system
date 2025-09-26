const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Load environment variables from .env
const env = dotenv.config().parsed || {};
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/", // important for React Router
      clean: true,
    },
    mode: isDev ? "development" : "production",
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new webpack.DefinePlugin(envKeys), // replace process.env.* in browser
    ],
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true, // React Router support
    },
    performance: {
      hints: "warning", // keeps warnings for large bundles
      maxAssetSize: 512000,
      maxEntrypointSize: 512000,
    },
  };
};
