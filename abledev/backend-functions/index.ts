import backendFunction_0 from "./queries/another-query";
import backendFunction_1 from "./queries/some-query";
import backendFunction_2 from "./mutations/create-stuff";

const mappings = {
  "queries/another-query": backendFunction_0,
  "queries/some-query": backendFunction_1,
  "mutations/create-stuff": backendFunction_2,
} as const;

export default mappings;
