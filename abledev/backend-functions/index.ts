import backendFunction_0 from "./queries/getData";
import backendFunction_1 from "./mutations/updateDueDate";

const mappings = {
  "queries/getData": backendFunction_0,
  "mutations/updateDueDate": backendFunction_1,
} as const;

export default mappings;
