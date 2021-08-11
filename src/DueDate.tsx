import * as React from "react";
import { useMutation, wrapRootComponent } from "@ableco/abledev-react";
import { DatePicker } from "@ableco/abledev-components";
import updateDueDate from "./mutations/updateDueDate";
import { Task } from "./host-types";
import { format } from "date-fns";

function DueDate({ task }: { task: Task }) {
  const updateDateMutation = useMutation(updateDueDate);

  return (
    <>
      <DatePicker
        value={task.dueDate ?? new Date()}
        onChange={(date) => {
          updateDateMutation.mutate({ date });
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
