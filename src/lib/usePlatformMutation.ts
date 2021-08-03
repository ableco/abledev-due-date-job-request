import { useMutation } from "react-query";

function usePlatformMutation(mutationKey: string) {
  return useMutation(mutationKey, async (args: object = {}) => {
    const url = new URL(`${location.origin}/abledev/call-mutation`);
    url.search = new URLSearchParams({ key: mutationKey }).toString();
    return fetch(url.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then((response) => response.json());
  });
}

export default usePlatformMutation;
