import cors from "cors";
import path from "path";
import express from "express";
import asyncHandler from "express-async-handler";
import { IncomingMessage, ServerResponse } from "http";
import { FunctionMappings } from "./getFunctionMappings";
import fs from "fs/promises";
import { pathExists } from "./pathExists";
import { BACKEND_FUNCTIONS_FOLDER_NAME } from "./buildBackendFunctions";

declare global {
  var FUNCTION_MAPPINGS: FunctionMappings | undefined;
}

function capitalize(text: string): string {
  if (text.length <= 1) {
    return text.toUpperCase();
  } else {
    return capitalize(text[0]) + text.slice(1);
  }
}

async function getFunctionMappings(): Promise<{
  sourceType: "json" | "global";
  mappings: FunctionMappings;
}> {
  const jsonLocation = path.join(
    __dirname,
    BACKEND_FUNCTIONS_FOLDER_NAME,
    "functionMappings.json",
  );

  if (await pathExists(jsonLocation)) {
    return {
      sourceType: "json",
      mappings: JSON.parse((await fs.readFile(jsonLocation)).toString()),
    };
  } else {
    return { sourceType: "global", mappings: global.FUNCTION_MAPPINGS! };
  }
}

const app = express();

app.use(express.json());

app.get(
  "/abledev/call-query",
  asyncHandler(async (request, response) => {
    handleBackendFunction(request, response, "query");
  }),
);

app.post(
  "/abledev/call-mutation",
  asyncHandler(async (request, response) => {
    handleBackendFunction(request, response, "mutation");
  }),
);

async function handleBackendFunction(
  request: express.Request,
  response: express.Response,
  type: "query" | "mutation",
) {
  const { sourceType, mappings } = await getFunctionMappings();
  const functionName = request.query.key as string;
  const functionMetadata = mappings[functionName];

  if (!functionMetadata) {
    response
      .status(404)
      .json({ message: `${capitalize(type)} not found: ${functionName}` });
    return;
  }

  let backendFunction: unknown;

  if (sourceType === "json" && functionMetadata.productionImportPath) {
    const functionLocation = path.resolve(
      __dirname,
      `./backend-functions/${functionMetadata.functionName}.js`,
    );

    try {
      backendFunction = (await import(functionLocation)).default;
    } catch (e) {
      response
        .status(500)
        .json("Function in functionLocation could not be required");
      return;
    }
  } else {
    if (require.cache[functionMetadata.filePath]) {
      delete require.cache[functionMetadata.filePath];
    }
    backendFunction = (await import(functionMetadata.filePath)).default;
  }

  if (typeof backendFunction === "function") {
    const result = backendFunction({
      request,
      response,
    });
    response.status(200).json(result);
  } else {
    response.status(500).json({
      message: `${capitalize(type)} is not a function: ${functionName}`,
    });
  }
}

export default async function handleRequest(
  request: IncomingMessage,
  response: ServerResponse,
  { mode = "production" }: { mode: "development" | "production" } = {
    mode: "production",
  },
) {
  app.set("abledevMode", mode);
  if (mode === "development") {
    app.use(cors());
  }
  return app(request, response);
}
