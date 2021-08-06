import { useMutation } from "react-query";

type AnyFunction = (...args: any) => any;

function usePlatformMutation<MutationKey extends AnyFunction>(
  mutationKey: MutationKey,
) {
  // This is not a arbitrary convertion. queryKey works differently between the TS world
  // and the runtime world:
  // - In the TS world, this is a function
  // - In the runtime world, this is a string
  const mutationKeyAsString = mutationKey as unknown as string;

  return useMutation(mutationKeyAsString, async (args: object = {}) => {
    const url = new URL(`${location.origin}/abledev/call-mutation`);
    url.search = new URLSearchParams({ key: mutationKeyAsString }).toString();
    return fetch(url.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    }).then((response) => {
      return response.json() as ReturnType<MutationKey>;
    });
  });
}

export default usePlatformMutation;
