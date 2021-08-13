import path from "path";
import { createWebpackDevConfig } from "@ableco/abledev-dev-environment";

export default createWebpackDevConfig({
  previewFolderPath: path.resolve(__dirname, "./preview"),
});
