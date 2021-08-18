import { RequestContext } from "@ableco/abledev-dev-environment";
import { HostContextType } from "../HostContext";
export default function updateDueDate({ id, date }: {
    id: number;
    date: Date;
}, { db }: RequestContext & HostContextType): Promise<import(".prisma/client").Task>;
