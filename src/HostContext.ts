import { RequestContext } from "@ableco/abledev-dev-environment";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const HostContext = {
  db,
  authenticate: async (
    _request: RequestContext["request"],
    response: RequestContext["response"],
  ) => {
    // This is a test environment. It doesn't matter
    // which user we use....
    //
    // TODO: Maybe it does matter. What could we suggest
    // to prevent the user from loading any data instead of
    // just data associated to the user?
    const currentUser = await db.user.findFirst();
    if (currentUser) {
      return { userId: currentUser?.id };
    } else {
      response.status(401).send("Authentication Failure");
      throw new Error("Authentication Failure");
    }
  },
};

export type HostContextType = typeof HostContext;
export default HostContext;
