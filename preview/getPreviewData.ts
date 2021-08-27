import { AsyncReturnType } from "type-fest";
import { HostContextType } from "../src/HostContext";

async function getPreviewData({ db }: HostContextType) {
  const currentUser = await ensureCurrentUser(db);

  if ((await db.task.count()) <= 1) {
    await db.task.createMany({
      data: [
        { description: "New Task 1", creatorId: currentUser.id },
        { description: "New Task 2", creatorId: currentUser.id },
        { description: "New Task 3", creatorId: currentUser.id },
      ],
    });
  }

  return {
    allTasks: await db.task.findMany({
      where: {
        OR: [{ assignedUserId: currentUser.id }, { creatorId: currentUser.id }],
      },
    }),
  };
}

async function ensureCurrentUser(db: HostContextType["db"]) {
  const email = "email@example.com";
  const domain = "example.com";

  return (
    (await db.user.findFirst({
      where: {
        email,
      },
    })) ??
    (await db.user.create({
      data: {
        email,
        organization: {
          connectOrCreate: {
            where: { domain },
            create: { domain },
          },
        },
      },
    }))
  );
}

export type PreviewData = AsyncReturnType<typeof getPreviewData>;
export default getPreviewData;
