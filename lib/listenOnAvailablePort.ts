import { Server } from "http";
import { AddressInfo } from "net";

interface ErrorWithCode extends Error {
  code: string;
}

async function listenOnAvailablePort(
  server: Server,
  port: number,
): Promise<number> {
  return new Promise((resolve, reject) => {
    server
      .once("error", (error: ErrorWithCode) => {
        if (error.code === "EADDRINUSE") {
          port = port + 1;
          server.listen(port);
        } else {
          reject(error);
        }
      })
      .once("listening", () => {
        resolve((server.address() as AddressInfo).port);
      })
      .listen(port);
  });
}

export default listenOnAvailablePort;
