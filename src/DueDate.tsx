import * as React from "react";
import { useMutation, wrapRootComponent } from "@ableco/abledev-react";
import { DatePicker } from "@ableco/abledev-components";
import updateDueDate from "./mutations/updateDueDate";

function DueDate({ date }: { date: Date }) {
  const updateDateMutation = useMutation(updateDueDate);

  return (
    <>
      <DatePicker
        value={date}
        onChange={() => {
          updateDateMutation.mutate({ date: JSON.stringify(date) });
        }}
      >
        <button className="text-gray-400 text-xs hover:underline">
          Add Date
        </button>
      </DatePicker>
    </>
  );
}

export default wrapRootComponent(DueDate);
