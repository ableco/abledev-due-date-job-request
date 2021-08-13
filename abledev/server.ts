import path from "path";
import webpackConfig from "../webpack.config.dev";
import { createHandleRequest } from "./createHandleRequest";
import { startDevServer } from "@ableco/abledev-dev-environment";
import { PrismaClient } from "@prisma/client";
import { HostContext } from "../HostContext";
import getPreviewData from "../preview/getPreviewData";

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
