import { AsyncReturnType } from "type-fest";
import { HostContext } from "../HostContext";

async function getPreviewData({ db }: HostContext) {
  return {
    allTasks: await db.task.findMany({}),
  };
}

export type PreviewData = AsyncReturnType<typeof getPreviewData>;
export default getPreviewData;
