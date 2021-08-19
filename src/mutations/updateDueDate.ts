import { RequestContext } from "@ableco/abledev-dev-environment";
import { HostContextType } from "../HostContext";

export default async function updateDueDate(
  { id, date }: { id: number; date: Date },
  { db, authenticate, request, response }: RequestContext & HostContextType,
) {
  const { userId } = await authenticate(request, response);
  const task = await db.task.findFirst({
    where: {
      id,
      OR: [
        { assignedUserId: userId },
        {
          creatorId: userId,
        },
      ],
    },
    rejectOnNotFound: true,
  });

  return await db.task.update({
    where: { id: task.id },
    data: {
      dueDate: date,
    },
  });
}
