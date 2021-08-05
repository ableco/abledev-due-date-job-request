import { createServer } from "http";
import path from "path";
import { createHandleRequest } from "./server-lib/handleRequest";
import listenOnAvailablePort from "./server-lib/listenOnAvailablePort";
import { webpack } from "webpack";
import webpackConfig from "./webpack.config.dev";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";

const webpackCompiler = webpack(webpackConfig);

const handleRequest = createHandleRequest({
  mode: "development",
  srcPath: path.join(__dirname, "src"),
  extendApp(app) {
    app.use(WebpackDevMiddleware(webpackCompiler));
    app.use(WebpackHotMiddleware(webpackCompiler));
  },
});

const server = createServer((request, response) => {
  handleRequest(request, response);
});

listenOnAvailablePort(server, 5000).then((port) => {
  console.log("Server listening at port", port);
});
