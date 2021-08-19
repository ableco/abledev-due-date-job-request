import { RequestContext } from "@ableco/abledev-dev-environment";
import { PrismaClient } from "@prisma/client";
declare const HostContext: {
    db: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation>;
    authenticate: (_request: RequestContext["request"], response: RequestContext["response"]) => Promise<{
        userId: number;
    }>;
};
export declare type HostContextType = typeof HostContext;
export default HostContext;
