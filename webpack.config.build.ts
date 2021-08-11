import path from "path";
import { createWebpackBuildConfigs } from "@ableco/abledev-dev-environment";

export default createWebpackBuildConfigs({
  entries: {
    web: "./src/index.js",
    node: "./abledev/createHandleRequest.ts",
  },
  distPath: path.resolve(__dirname, "dist"),
});
