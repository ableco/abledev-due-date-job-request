import { createServer } from "http";
import path from "path";
import { createHandleRequest } from "./server-lib/handleRequest";
import listenOnAvailablePort from "./server-lib/listenOnAvailablePort";

const srcPath = path.join(__dirname, "src");
const handleRequest = createHandleRequest({ mode: "development", srcPath });

const server = createServer((request, response) => {
  handleRequest(request, response);
});

listenOnAvailablePort(server, 5000).then((port) => {
  console.log("Server listening at port", port);
});
