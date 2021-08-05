const path = require("path");
const nodeExternals = require("webpack-node-externals");

function createConfig(target) {
  if (target !== "node" && target !== "web") {
    throw new Error("Config target is wrong");
  }

  const distPath = path.resolve(__dirname, "dist");

  const entries = {
    web: "./src/index.tsx",
    node: "./server-lib/handleRequest.ts",
  };

  return {
    mode: "production",
    entry: entries[target],
    output: {
      path: distPath,
      filename: `due-date.${target}.js`,
      library: { name: `dueDate.${target}`, type: "umd" },
      globalObject: "this",
    },
    ...(target === "node"
      ? {
          externalsPresets: { node: true },
        }
      : {}),
    target,
    externals:
      target === "web"
        ? {
            react: {
              root: "React",
              commonjs: "react",
              commonjs2: "react",
            },
            "react-dom": {
              root: "ReactDOM",
              commonjs: "react-dom",
              commonjs2: "react-dom",
            },
          }
        : [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false,
              declaration: true,
              outDir: distPath,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      minimize: false,
    },
  };
}

module.exports = [createConfig("node"), createConfig("web")];
