import * as React from "react";
import * as ReactDOM from "react-dom";
import { PreviewData } from "./getPreviewData";
import Preview from "./preview";
import superjson from "superjson";
import setDate from "date-fns/setDate";

function PreviewApp() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<PreviewData>();

  const loadData = React.useCallback(async () => {
    const response = await fetch("/dev/preview-data");
    const responseData = await response.text();
    setData(superjson.parse(responseData));
    setIsLoading(false);
  }, [setDate, setIsLoading]);

  React.useEffect(() => {
    loadData();
  }, []);

  if (isLoading || data === undefined) {
    return <div>Loading...</div>;
  } else {
    return <Preview data={data} reloadData={loadData} />;
  }
}

ReactDOM.render(<PreviewApp />, document.getElementById("root"));
