import { createWebpackDevConfig } from "@ableco/abledev-dev-environment";

export default createWebpackDevConfig({
  entry: "./preview/index.tsx",
  template: "./preview/index.html",
  __internal__extendConfig: {
    // TODO: Move this config to the main package
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
  },
});
