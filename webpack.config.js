const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve("resources/js"),
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
    },
    fallback: {
      crypto: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
