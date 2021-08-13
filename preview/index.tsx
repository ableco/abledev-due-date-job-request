import setDate from "date-fns/setDate";
import * as React from "react";
import * as ReactDOM from "react-dom";
import superjson from "superjson";
import { PreviewData } from "./getPreviewData";
import Preview from "./preview";

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
