import * as React from "react";
import {
  useQuery,
  useMutation,
  wrapRootComponent,
} from "@ableco/abledev-react";
import someQuery from "./queries/some-query";
import createStuff from "./mutations/create-stuff";

function DueDate() {
  const { isLoading, data } = useQuery(someQuery);
  const createStuffMutation = useMutation(createStuff);

  const [name, setName] = React.useState("capitalize me");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createStuffMutation.mutate({ name });
  };

  if (isLoading || !data) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <pre style={{ padding: "1rem" }}>
          <code>{JSON.stringify(data.data || data.otherData)}</code>
        </pre>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <button type="submit">Call Mutation</button>
          {createStuffMutation.data ? (
            <pre style={{ padding: "1rem" }}>
              <code>{JSON.stringify(createStuffMutation.data)}</code>
            </pre>
          ) : null}
        </form>
      </>
    );
  }
}

export default wrapRootComponent(DueDate);
