import { createServerHandler } from "@ableco/abledev-dev-environment";
import mappings from "./backend-functions";

export const createHandleRequest = createServerHandler({
  mappings,
  componentModuleSystem: {
    importPath: (path) => import(path),
    requireCache: require.cache,
  },
});
