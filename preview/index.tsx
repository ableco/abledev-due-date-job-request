import * as React from "react";
import * as ReactDOM from "react-dom";
import { DueDate } from "../src";
// This assumes the host project already has @ableco/abledev-components loaded
import "@ableco/abledev-components/dist/style.css";

const App = () => {
  return (
    <div className="p-8 inline-flex flex-col gap-4">
      <DueDate
        task={{
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: "Brush Teeth",
          creatorId: 1,
          dueDate: null,
          completedAt: null,
          assignedUserId: null,
          assignedUser: null,
        }}
      />
      <DueDate
        task={{
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: "Brush Teeth",
          creatorId: 1,
          dueDate: new Date(),
          completedAt: null,
          assignedUserId: null,
          assignedUser: null,
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
