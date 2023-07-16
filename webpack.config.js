const EslintWebpackPlugin = require("eslint-webpack-plugin")
const path = require("path")

const mode = process.env.NODE_ENV || "production"
const devMode = mode === "development"

module.exports.default = {
  mode,
  entry: "./src/index.ts",
  devtool: "cheap-source-map",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts)$/,
        use: "ts-loader",
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
  plugins: [new EslintWebpackPlugin()],
}
