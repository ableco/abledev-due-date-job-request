import * as React from "react";
// This assumes the host project already has @ableco/abledev-components loaded
import "@ableco/abledev-components/dist/style.css";
import { DueDate } from "../src";
import { PreviewData } from "./getPreviewData";

export default function Preview({
  data,
  reloadData,
}: {
  data: PreviewData;
  reloadData: () => void;
}) {
  return (
    <div className="p-8 inline-flex flex-col gap-4">
      <pre>Number of Tasks: {data.allTasks.length}</pre>
      {data.allTasks.map((task) => {
        return <DueDate key={task.id} task={task} onSuccess={reloadData} />;
      })}
    </div>
  );
}
