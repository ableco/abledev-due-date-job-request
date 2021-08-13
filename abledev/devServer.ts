import { startDevServer } from "@ableco/abledev-dev-environment";
import { PrismaClient } from "@prisma/client";
import path from "path";
import getPreviewData from "../preview/getPreviewData";
import { HostContext } from "../src/HostContext";
import webpackConfig from "../webpack.config.dev";
import { createHandleRequest } from "./createHandleRequest";

const db = new PrismaClient();
const hostContext = { db };

const handleRequest = createHandleRequest<HostContext>({
  mode: "development",
  srcPath: path.resolve(__dirname, "../src"),
  webpackConfig,
  hostContext,
});

startDevServer({
  preferredPort: 5000,
  handleRequest,
  getPreviewData: async () => {
    return await getPreviewData(hostContext);
  },
});
