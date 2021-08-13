import * as React from "react";
import * as ReactDOM from "react-dom";
import { PreviewData } from "./getPreviewData";
import Preview from "./preview";

// TODO: Move to somewhere inside @ableco/abledev-dev-environment
//
//    import { PreviewApp }...;
//    <PreviewApp<PreviewData> previewComponent={Preview} />
//

// This uses just plain old useEffect + fetch because we don't want to include react-query
// as a direct dependency because 2 running versions of react-query (the direct dependency +
// the transient dependency in @ableco/abledev-react) won't work together and it can be confusing
// and error-prone to have both available at the same time.
function PreviewApp() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<PreviewData>();

  React.useEffect(() => {
    async function loadData() {
      const response = await fetch("/dev/preview-data");
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    }
    loadData();
  }, []);

  if (isLoading || data === undefined) {
    return <div>Loading...</div>;
  } else {
    return <Preview data={data} />;
  }
}

ReactDOM.render(<PreviewApp />, document.getElementById("root"));
