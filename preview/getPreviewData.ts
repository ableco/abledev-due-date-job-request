import { AsyncReturnType } from "type-fest";
import { HostContextType } from "../src/HostContext";

async function getPreviewData({ db }: HostContextType) {
  const allTasks = await db.task.findMany({});
  return { allTasks };
}

export type PreviewData = AsyncReturnType<typeof getPreviewData>;
export default getPreviewData;
