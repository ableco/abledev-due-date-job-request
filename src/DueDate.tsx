import { DatePicker } from "@ableco/abledev-components";
import { useMutation, wrapRootComponent } from "@ableco/abledev-react";
import { Task } from "@prisma/client";
import { format } from "date-fns";
import * as React from "react";
import "./index.css";
import updateDueDate from "./mutations/updateDueDate";

function DueDate({ task, onSuccess }: { task: Task; onSuccess: () => void }) {
  const updateDateMutation = useMutation(updateDueDate);

  return (
    <>
      <DatePicker
        value={task.dueDate ?? new Date()}
        onChange={async (date) => {
          await updateDateMutation.mutateAsync({ id: task.id, date });
          onSuccess();
        }}
      >
        <button className="text-gray-400 text-xs hover:underline">
          {task.dueDate ? (
            <>{format(task.dueDate, "MMMM dd")}</>
          ) : (
            <>Add Date</>
          )}
        </button>
      </DatePicker>
    </>
  );
}

export default wrapRootComponent(DueDate);
