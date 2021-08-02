import { useQuery } from "react-query";

function usePlatformQuery(queryKey: string) {
  return useQuery(queryKey, async () => {
    // TODO: Come back to this once we have the dev server running in the same location
    //  as the backend server.
    //
    //  const backendLocation = location.origin;
    const backendLocation = "http://localhost:5000";
    const url = new URL(`${backendLocation}/abledev/call-query`);
    url.search = new URLSearchParams({ key: queryKey }).toString();
    return fetch(url.toString()).then(response => response.json());
  });
}

export default usePlatformQuery;
