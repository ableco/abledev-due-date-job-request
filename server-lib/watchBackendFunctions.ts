import chokidar from "chokidar";
import getFunctionMappings, { FunctionMappings } from "./getFunctionMappings";

declare global {
  var FUNCTION_MAPPINGS: FunctionMappings | undefined;
}

function watchBackendFunctions({ srcPath }: { srcPath: string }) {
  chokidar
    .watch("**/{mutations,queries}/**.ts", { cwd: srcPath })
    .on("all", () => {
      global.FUNCTION_MAPPINGS = getFunctionMappings(srcPath);
    });
}

export default watchBackendFunctions;
