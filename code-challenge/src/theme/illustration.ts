import NoChartFound from "./illustrations/NoChartFound";
import NoDataFound from "./illustrations/NoDataFound";

type IllustrationComponent = React.ElementType;

const illustrationsMap: { [key: string]: IllustrationComponent } = {
  noTableData: NoDataFound,
  noChartData: NoChartFound,
};

export default illustrationsMap;
