## Plan

1. Add `server.ts` file that when runs does this:

   1. Reads and watches queries and mutations to:
      1. Builds an object that maps queries and mutation names to paths.
      2. Creates a file called `src/abledev/queryMetadata.ts` that exports the
         object created in the previous step.
   2. Responds to those urls by calling the files associated with them. It first
      compiles them.

2. Make a rollup plugin (because that's what tsdx uses) to transform all imports
   of queries and mutations outside queries and mutations from:

   ```ts
   import someQuery from "./queries/some-query";
   ```

   to:

   ```ts
   import queryMetadata from "./abledev/queryMetadata";
   const someQuery = queryMetadata["some-query"];
   ```
