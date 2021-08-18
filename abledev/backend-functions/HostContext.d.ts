import { PrismaClient } from "@prisma/client";
declare const HostContext: {
    db: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation>;
};
export declare type HostContextType = typeof HostContext;
export default HostContext;
