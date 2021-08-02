## Plan

1. Figure out how to expose the component and the handler in a way that they can
   be used by an external project.

2. Move some parts of this project into a package `abledev`. (Maybe use a
   monorepo?)

3. Create a CLI that can generate this structure.

## Important things for later:

1. Figure out how to pass types from the backend hooks into the component.
2. Make a rollup plugin (because that's what microbundle uses) to transform all
   imports of queries and mutations outside queries and mutations from:

   ```ts
   import someQuery from "./queries/some-query";
   ```

   to:

   ```ts
   import queryMetadata from "./abledev/queryMetadata";
   const someQuery = queryMetadata["some-query"];
   ```
