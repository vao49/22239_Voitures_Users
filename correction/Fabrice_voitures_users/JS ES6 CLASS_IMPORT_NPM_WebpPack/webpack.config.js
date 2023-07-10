const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    USER_table_complete: "./src/js/USER_table_complete.js",
    VOITURE_table_complete: "./src/js/VOITURE_table_complete.js",
    // test_bootstrap: "./src/js/test_bootstrap.js",
  },
  output: {
    // path: path.resolve(__dirname, "dist/js"),
    path: path.resolve(__dirname, "./js"),
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
};
