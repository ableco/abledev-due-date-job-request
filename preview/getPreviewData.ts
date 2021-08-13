import { AsyncReturnType } from "type-fest";
import { HostContext } from "../HostContext";

async function getPreviewData({ db }: HostContext) {
  const allTasks = await db.task.findMany({});
  return { allTasks };
}

export type PreviewData = AsyncReturnType<typeof getPreviewData>;
export default getPreviewData;
