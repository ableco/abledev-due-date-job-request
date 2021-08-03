import { createServer } from "http";
import path from "path";
import handleRequest from "./server-lib/handleRequest";
import listenOnAvailablePort from "./server-lib/listenOnAvailablePort";
import watchBackendFunctions from "./server-lib/watchBackendFunctions";

const srcPath = path.join(__dirname, "src");

watchBackendFunctions({ srcPath });

const server = createServer((request, response) => {
  handleRequest(request, response, { mode: "development" });
});

// TODO: Use 3000 once we use the same process for the dev server
listenOnAvailablePort(server, 5000).then((port) => {
  console.log("Server listening at port", port);
});
