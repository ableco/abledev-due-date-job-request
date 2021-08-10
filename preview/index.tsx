import * as React from "react";
import * as ReactDOM from "react-dom";
import { DueDate } from "../src";
// This assumes the host project already has @ableco/abledev-components loaded
import "@ableco/abledev-components/dist/style.css";
// This assumes the host project already has tailwind styles loaded
// This has the problem this is not loading the __real__ tailwind config
// of the host project.
import "./index.css";

const App = () => {
  return (
    <div className="p-8">
      <DueDate date={new Date()} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
