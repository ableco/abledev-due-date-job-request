import { createWebpackDevConfig } from "@ableco/abledev-dev-environment";

export default createWebpackDevConfig({
  entry: "./preview/index.tsx",
  template: "./preview/index.html",
});
