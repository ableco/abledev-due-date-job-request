import * as React from "react";
import { useMutation, wrapRootComponent } from "@ableco/abledev-react";
import { DatePicker } from "@ableco/abledev-components";
import updateDueDate from "./mutations/updateDueDate";
import { Task } from "./host-types";
import { format } from "date-fns";
import "./index.css";

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
