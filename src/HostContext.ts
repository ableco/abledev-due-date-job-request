import { PrismaClient } from "@prisma/client";

const HostContext = {
  db: new PrismaClient(),
};

export type HostContextType = typeof HostContext;
export default HostContext;
