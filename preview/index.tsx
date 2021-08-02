import "regenerator-runtime/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DueDate } from "../dist/due-date.modern";

const App = () => {
  return (
    <div>
      <DueDate />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
