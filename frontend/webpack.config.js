const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  // Load from .env.* files if they exist (for local dev)
  const envFilePath = isDev ? ".env.development" : ".env.production";
  const fileEnv = dotenv.config({ path: envFilePath }).parsed || {};

  // Merge file env + process.env (Vercel/Render injects here)
  const finalEnv = { ...process.env, ...fileEnv };

  // Turn into DefinePlugin format
  const envKeys = Object.keys(finalEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(finalEnv[next]);
    return prev;
  }, {});

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
      new webpack.DefinePlugin(envKeys), // replaces process.env.* in the browser
    ],
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true, // React Router support
    },
    performance: {
      maxAssetSize: 512000,
      maxEntrypointSize: 512000,
    },
  };
};
