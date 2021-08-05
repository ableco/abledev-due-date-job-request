import path from "path";
import nodeExternals from "webpack-node-externals";

const entries = {
  web: "./src/index.tsx",
  node: "./server-lib/handleRequest.ts",
};

function createConfig(target: "node" | "web") {
  const distPath = path.resolve(__dirname, "dist");

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
              declaration: true,
              outDir: distPath,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".ts", ".js"],
    },
    optimization: {
      minimize: false,
    },
  };
}

module.exports = [createConfig("node"), createConfig("web")];
