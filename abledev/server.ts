import path from "path";
import webpackConfig from "../webpack.config.dev";
import { createHandleRequest } from "./createHandleRequest";
import { startDevServer } from "@ableco/abledev-dev-environment";

const handleRequest = createHandleRequest({
  mode: "development",
  srcPath: path.resolve(__dirname, "../src"),
  webpackConfig,
});

startDevServer({
  preferredPort: 5000,
  handleRequest,
});
