import { useMutation } from "react-query";

function usePlatformMutation(mutationKey: string) {
  return useMutation(mutationKey, async (args: object = {}) => {
    // TODO: Come back to this once we have the dev server running in the same location
    //  as the backend server.
    //
    //  const backendLocation = location.origin;
    const backendLocation = "http://localhost:5000";
    const url = new URL(`${backendLocation}/abledev/call-mutation`);
    url.search = new URLSearchParams({ key: mutationKey }).toString();
    return fetch(url.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then(response => response.json());
  });
}

export default usePlatformMutation;
