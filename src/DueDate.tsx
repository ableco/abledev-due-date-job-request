import * as React from "react";
import usePlatformMutation from "./lib/usePlatformMutation";
import usePlatformQuery from "./lib/usePlatformQuery";
import wrapMainComponent from "./lib/wrapMainComponent";

function DueDate() {
  const { isLoading, data } = usePlatformQuery("queries/some-query");
  const createStuffMutation = usePlatformMutation("mutations/create-stuff");

  const [name, setName] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createStuffMutation.mutate({ name });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <pre style={{ padding: "1rem" }}>
          <code>{JSON.stringify(data)}</code>
        </pre>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            autoFocus
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

export default wrapMainComponent(DueDate);
