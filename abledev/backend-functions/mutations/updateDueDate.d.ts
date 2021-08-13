import { RequestHostContext } from "../HostContext";
export default function updateDueDate({ id, date }: {
    id: number;
    date: Date;
}, { db }: RequestHostContext): Promise<import(".prisma/client").Task>;
