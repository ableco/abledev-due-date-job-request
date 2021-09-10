import { createHandleCreator } from "@ableco/abledev-dev-environment";
import mappings from "./backend-functions";

export const createHandleRequest = createHandleCreator({
  mappings,
  componentModuleSystem: {
    importPath: (path) => import(path),
    requireCache: require.cache,
  },
});
