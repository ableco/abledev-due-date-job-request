import path from "path";
import { createWebpackBuildConfigs } from "@ableco/abledev-dev-environment";

export default createWebpackBuildConfigs({
  name: "DueDate",
  entries: {
    web: "./src/index.tsx",
    node: "./abledev/createHandleRequest.ts",
  },
  distPath: path.resolve(__dirname, "dist"),
});
