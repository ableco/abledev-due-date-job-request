import { createWebpackBuildConfigs } from "@ableco/abledev-dev-environment";

export default createWebpackBuildConfigs({
  entries: {
    web: "./src/index.tsx",
    node: "./abledev/createHandleRequest.ts",
  },
});
