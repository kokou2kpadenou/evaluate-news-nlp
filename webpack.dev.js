const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// import webpack share config
const common = require("./webpack.common");

// Dev only config
const dev = {
  mode: "development",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};

// Merge common and dev config
module.exports = merge(common, dev);
