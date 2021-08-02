## Plan

1. Replace the example that uses parcel with something that uses rollup and can
   be run from the same server that serves the backend functions. Maybe use
   https://www.npmjs.com/package/express-middleware-rollup.

2. Figure out how to expose the component and the handler in a way that they can
   be used by an external project.

3. Make a rollup plugin (because that's what microbundle and tsdx uses) to
   transform all imports of queries and mutations outside queries and mutations
   from:

   ```ts
   import someQuery from "./queries/some-query";
   ```

   to:

   ```ts
   import queryMetadata from "./abledev/queryMetadata";
   const someQuery = queryMetadata["some-query"];
   ```

4. Figure out how to pass types from the backend hooks into the component.
