import path from "path";
import fs from "fs/promises";
import getFunctionMappings, { FunctionMappings } from "./getFunctionMappings";
import { pathExists } from "./pathExists";
import child_process from "child_process";
import util from "util";
import makeDir from "make-dir";

const exec = util.promisify(child_process.exec);

export const BACKEND_FUNCTIONS_FOLDER_NAME = "backend-functions";

async function compileFunctions(
  functionMappings: FunctionMappings,
  distFolderPath: string,
) {
  for await (const [_, definition] of Object.entries(functionMappings)) {
    const compiledFilePath = path.join(
      distFolderPath,
      BACKEND_FUNCTIONS_FOLDER_NAME,
      definition.fileName,
    );
    const compiledFileDirectory = path.dirname(compiledFilePath);

    await makeDir(compiledFileDirectory);
    await buildTsFile(definition.filePath, compiledFileDirectory);

    const productionImportPath = path.join(
      "..", // dist
      BACKEND_FUNCTIONS_FOLDER_NAME, // backend-functions
      `${definition.functionName}.js`,
    );

    definition.productionImportPath = productionImportPath;
  }
}

async function createFunctionMappingsFile(
  functionMappings: FunctionMappings,
  distFolderPath: string,
) {
  const filePath = path.join(
    distFolderPath,
    BACKEND_FUNCTIONS_FOLDER_NAME,
    "functionMappings.json",
  );

  if (!(await pathExists(filePath))) {
    await fs.writeFile(filePath, JSON.stringify(functionMappings));
  }
}

async function buildTsFile(sourceFilePath: string, outputDirectory: string) {
  await exec(
    `npx tsc ${sourceFilePath} --outDir ${outputDirectory} --esModuleInterop --declaration`,
  );
}

async function buildBackendFunctions() {
  const distFolderPath = path.resolve(__dirname, "..", "dist");
  const srcFolderPath = path.resolve(__dirname, "..", "src");

  if (!(await pathExists(distFolderPath))) {
    throw new Error(
      "dist doesn't exist. Please run `yarn frontend:build` beforehand.",
    );
  }

  const functionMappings = getFunctionMappings(srcFolderPath);

  await compileFunctions(functionMappings, distFolderPath);
  await createFunctionMappingsFile(functionMappings, distFolderPath);
}

buildBackendFunctions();
