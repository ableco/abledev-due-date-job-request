import cors from "cors";
import express from "express";
import asyncHandler from "express-async-handler";
import path from "path";
import mappings from "../backend-functions";

type AppOptions =
  | { mode: "development"; srcPath: string }
  | { mode: "production"; srcPath?: never };

async function handleBackendFunction(
  request: express.Request,
  response: express.Response,
  type: "query" | "mutation",
  appOptions: AppOptions,
) {
  const functionName = request.query.key as string;

  let backendFunction: unknown;

  if (appOptions.mode === "development") {
    const functionPath = path.join(appOptions.srcPath, functionName);

    if (require.cache[functionPath]) {
      delete require.cache[functionPath];
    }

    backendFunction = (await import(functionPath)).default;
  } else {
    backendFunction = mappings[functionName as keyof typeof mappings];
  }

  if (typeof backendFunction === "function") {
    const result = backendFunction({
      request,
      response,
    });
    response.status(200).json(result);
  } else {
    response.status(500).json({
      message: `${type} is not a function: ${functionName}`,
    });
  }
}

export function createHandleRequest(appOptions: AppOptions) {
  const app = express();

  app.use(express.json());

  if (appOptions.mode === "development") {
    app.use(cors());
  }

  app.get(
    "/abledev/call-query",
    asyncHandler(async (request, response) => {
      handleBackendFunction(request, response, "query", appOptions);
    }),
  );

  app.post(
    "/abledev/call-mutation",
    asyncHandler(async (request, response) => {
      handleBackendFunction(request, response, "mutation", appOptions);
    }),
  );

  return app;
}
