import { startDevServer } from "@ableco/abledev-dev-environment";
import getPreviewData from "../preview/getPreviewData";
import HostContext, { HostContextType } from "../src/HostContext";
import { createHandleRequest } from "./createHandleRequest";

startDevServer<HostContextType>({
  handleCreator: createHandleRequest,
  getPreviewData,
  hostContext: HostContext,
});
