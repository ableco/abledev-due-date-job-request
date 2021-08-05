import child_process from "child_process";
import fs from "fs/promises";
import makeDir from "make-dir";
import path from "path";
import util from "util";
import getFunctionMappings, {
  FunctionDefinition,
  FunctionMappings,
} from "./getFunctionMappings";
import { pathExists } from "./pathExists";

const exec = util.promisify(child_process.exec);

async function compileFunctions(
  functionMappings: FunctionMappings,
  backendFunctionsPath: string,
) {
  for await (const [_, definition] of Object.entries(functionMappings)) {
    const destinationFilePath = path.join(
      backendFunctionsPath,
      definition.fileName,
    );
    const destinationDirectory = path.dirname(destinationFilePath);

    await makeDir(destinationDirectory);
    await buildTsFile(definition.sourcePath, destinationDirectory);
  }
}

function createIndexFileContents(functionMappings: FunctionMappings) {
  const functionMappingEntries = Object.entries(functionMappings);

  if (functionMappingEntries.length === 0) {
    return getEmptyIndexFileContents();
  }

  let identifierCounter = 0;

  const imports: {
    [identifierName: string]: {
      definition: FunctionDefinition;
      importLine: string;
    };
  } = {};

  functionMappingEntries.forEach(([_, definition]) => {
    const identifierName = `backendFunction_${identifierCounter}`;

    imports[identifierName] = {
      definition,
      importLine: `import ${identifierName} from "./${definition.functionName}";`,
    };
    identifierCounter += 1;
  });

  const mappings = Object.entries(imports)
    .map(([identifierName, { definition }]) => {
      return `  "${definition.functionName}": ${identifierName},`;
    })
    .join("\n");

  const importLines = Object.values(imports)
    .map((entry) => entry.importLine)
    .join("\n");

  return [
    importLines,
    "",
    "const mappings = {",
    mappings,
    "} as const;",
    "",
    "export default mappings;",
    "",
  ].join("\n");
}

async function upsertIndexFile(
  functionMappings: FunctionMappings,
  backendFunctionsPath: string,
) {
  const indexFilePath = path.join(backendFunctionsPath, "index.ts");

  await fs.writeFile(indexFilePath, createIndexFileContents(functionMappings));
}

async function buildTsFile(sourceFilePath: string, outputDirectory: string) {
  await exec(
    `npx tsc ${sourceFilePath} --outDir ${outputDirectory} --esModuleInterop --declaration`,
  );
}

async function ensureBackendFunctionsDirectory(backendFunctionsPath: string) {
  const keepFilePath = path.join(backendFunctionsPath, ".keep");
  const indexFilePath = path.join(backendFunctionsPath, "index.ts");

  if (!(await pathExists(backendFunctionsPath))) {
    await makeDir(backendFunctionsPath);
  }
  if (!(await pathExists(keepFilePath))) {
    await fs.writeFile(keepFilePath, "");
  }

  if (!(await pathExists(indexFilePath))) {
    await fs.writeFile(indexFilePath, getEmptyIndexFileContents());
  }
}

function getEmptyIndexFileContents() {
  return [
    "const mappings: { [key: string]: Function } = {};",
    "export default mappings;",
  ].join("\n");
}

async function buildBackendFunctions() {
  const srcFolderPath = path.resolve(__dirname, "..", "src");
  const backendFunctionsPath = path.resolve(
    __dirname,
    "..",
    "backend-functions",
  );
  const functionMappings = getFunctionMappings(srcFolderPath);

  await ensureBackendFunctionsDirectory(backendFunctionsPath);
  await compileFunctions(functionMappings, backendFunctionsPath);
  await upsertIndexFile(functionMappings, backendFunctionsPath);
}

buildBackendFunctions();
