import path from "path";
import fs from "fs/promises";
import getFunctionMappings, { FunctionMappings } from "./getFunctionMappings";
import { pathExists } from "./pathExists";
import child_process from "child_process";
import util from "util";
import makeDir from "make-dir";

const exec = util.promisify(child_process.exec);

async function compileFunctions(
  functionMappings: FunctionMappings,
  distFolderPath: string,
) {
  for await (const [_, definition] of Object.entries(functionMappings)) {
    const compiledFilePath = path.join(
      distFolderPath,
      "backend",
      definition.fileName,
    );
    const compiledFileDirectory = path.dirname(compiledFilePath);

    await makeDir(compiledFileDirectory);
    await buildTsFile(
      definition.filePath,
      compiledFileDirectory,
      path.parse(definition.filePath).name,
    );
    // NOTE: This assumes a .cjs file exists because that's what microbundle does
    // but it may not do this in the future, so it'd be better to get this file directly
    // from the compilation result.
    definition.compiledFilePath = compiledFilePath.replace(".ts", ".cjs");
  }
}

async function createFunctionMappingsFile(
  functionMappings: FunctionMappings,
  distFolderPath: string,
) {
  await fs.writeFile(
    path.join(distFolderPath, "backend", "functionMappings.json"),
    JSON.stringify(functionMappings),
  );
}

async function buildTsFile(
  sourceFilePath: string,
  outputDirectory: string,
  name: string,
) {
  await exec(
    [
      "npx microbundle build",
      `--name ${name}`,
      `--entry ${sourceFilePath}`,
      `-o ${outputDirectory}/${name}.js`,
      "--target node",
    ].join(" "),
  );
}

async function compileHandler(distFolderPath: string) {
  const handlerSource = path.join(
    distFolderPath,
    "..",
    "server-lib",
    "handleRequest.ts",
  );
  const outputDirectory = path.join(distFolderPath, "backend");

  await buildTsFile(handlerSource, outputDirectory, "handleRequest");
}

async function buildHandler() {
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
  await compileHandler(distFolderPath);
}

buildHandler();
