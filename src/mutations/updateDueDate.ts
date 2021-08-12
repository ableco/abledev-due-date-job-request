import type { HostContext } from "../../HostContext";

export default async function updateDueDate(
  { id, date }: { id: number; date: Date },
  { db }: HostContext,
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
