import { useQuery } from "react-query";

function usePlatformQuery(queryKey: string) {
  return useQuery(queryKey, async () => {
    const url = new URL(`${location.origin}/abledev/call-query`);
    url.search = new URLSearchParams({ key: queryKey }).toString();
    return fetch(url.toString()).then((response) => response.json());
  });
}

export default usePlatformQuery;
