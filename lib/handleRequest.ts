import path from "path";
import fs from "fs/promises";
import { IncomingMessage, ServerResponse } from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import asyncHandler from "express-async-handler";
import {
  FunctionMappings,
  BackendMetadataFilePath,
} from "./watchBackendFunctions";

async function fileExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

function capitalize(text: string): string {
  if (text.length <= 1) {
    return text.toUpperCase();
  } else {
    return capitalize(text[0]) + text.slice(1);
  }
}

class MissingBackendMetadataFileError extends Error {
  constructor(
    message: string = `${BackendMetadataFilePath} doesn't exist yet.`,
  ) {
    super(message);
    this.name = "MissingBackendMetadataFileError";
  }
}

class MissingFunctionMappingsError extends Error {
  constructor(
    message: string = `${BackendMetadataFilePath} doesn't have the functionMappings key.`,
  ) {
    super(message);
    this.name = "MissingFunctionMappingsError";
  }
}

async function getBackendMetadata(srcPath: string): Promise<FunctionMappings> {
  const metadataFile = path.join(srcPath, BackendMetadataFilePath);

  if (!(await fileExists(metadataFile))) {
    throw new MissingBackendMetadataFileError();
  }

  const metadata: { functionMappings?: FunctionMappings } = JSON.parse(
    (await fs.readFile(metadataFile)).toString(),
  );

  if (!metadata.functionMappings) {
    throw new MissingFunctionMappingsError();
  }

  return metadata.functionMappings;
}

const app = express();

app.use(express.json());
// TODO: Remove cors middleware once we run everything in the same server
app.use(cors());
app.use(morgan("dev"));

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
  const srcPath = app.get("srcPath");

  const backendMetadata = await getBackendMetadata(srcPath);
  const functionName = request.query.key as string;
  const functionMetadata = backendMetadata[functionName];

  if (!functionMetadata) {
    response
      .status(404)
      .json({ message: `${capitalize(type)} not found: ${functionName}` });
    return;
  }

  const functionLocation = path.join(srcPath, functionMetadata.fileName);

  if (require.cache[functionLocation]) {
    delete require.cache[functionLocation];
  }

  const backendFunction = (await import(functionLocation)).default;

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
  { srcPath }: { srcPath: string },
) {
  app.set("srcPath", srcPath);
  return app(request, response);
}
