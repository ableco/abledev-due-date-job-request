import { RequestContext } from "@ableco/abledev-dev-environment";
import { HostContextType } from "../HostContext";

export default async function updateDueDate(
  { id, date }: { id: number; date: Date },
  { db }: RequestContext & HostContextType,
) {
  const currentTask = await db.task.findUnique({
    where: { id },
    rejectOnNotFound: true,
  });

  return await db.task.update({
    where: { id: currentTask.id },
    data: {
      dueDate: date,
    },
  });
}
