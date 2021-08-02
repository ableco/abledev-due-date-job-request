import path from "path";
import fs from "fs/promises";
import chokidar from "chokidar";
import glob from "glob";
import prettier from "prettier";

type FunctionType = "query" | "mutation";

type FunctionDefinition = {
  fileName: string;
  functionName: string;
  type: FunctionType;
};

export type FunctionMappings = {
  [functionName: string]: FunctionDefinition;
};

export const BackendMetadataFilePath = "backendMetadata.json";

function filterFileNames(fileNames: Array<string>, type: FunctionType) {
  const plural = type === "query" ? "queries" : "mutations";
  return fileNames.filter((fileName) => fileName.startsWith(plural));
}

function createFunctionsMapping(fileNames: Array<string>, type: FunctionType) {
  const mapping: { [relativeFileName: string]: FunctionDefinition } = {};
  fileNames.forEach((fileName) => {
    const [functionName, _extension] = fileName.split(".");

    mapping[functionName] = {
      fileName,
      functionName,
      type,
    };
  });
  return mapping;
}

function processFunctionFileNames(srcPath: string, fileNames: Array<string>) {
  const queries = filterFileNames(fileNames, "query");
  const mutations = filterFileNames(fileNames, "mutation");

  const functionMappings: FunctionMappings = {
    ...createFunctionsMapping(queries, "query"),
    ...createFunctionsMapping(mutations, "mutation"),
  };

  // IDEA: Don't create the metadata file but rather store the functions and metadata
  // in a global object and just pass whatever the user wanted to pass via the query and mutation
  // hooks.
  upsertBackendMetadataFile(srcPath, functionMappings);
}

async function upsertBackendMetadataFile(
  srcPath: string,
  functionMappings: FunctionMappings,
) {
  const prettierConfig = await prettier.resolveConfig(srcPath);
  const code = prettier.format(
    JSON.stringify({
      _message:
        "This is a generated file. Modifications here will be overriden.",
      functionMappings,
    }),
    { ...prettierConfig, parser: "json" },
  );
  await fs.writeFile(path.join(srcPath, BackendMetadataFilePath), code);
}

export default function watchBackendFunctions({
  srcPath,
}: {
  srcPath: string;
}) {
  chokidar
    .watch("**/{mutations,queries}/**.ts", { cwd: srcPath })
    .on("all", () => {
      glob(
        "**/{mutations,queries}/**.ts",
        { cwd: srcPath },
        (_err, fileNames) => {
          processFunctionFileNames(srcPath, fileNames);
        },
      );
    });
}
