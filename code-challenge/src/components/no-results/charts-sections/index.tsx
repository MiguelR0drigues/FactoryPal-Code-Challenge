import illustrationsMap from "../../../theme/illustration";
import { Wrapper } from "../styles";

const NoChartResults = () => {
  const NoChartFound = illustrationsMap.noChartData;

  return (
    <Wrapper>
      <h2>No info to display</h2>
      <NoChartFound />
    </Wrapper>
  );
};

export default NoChartResults;
