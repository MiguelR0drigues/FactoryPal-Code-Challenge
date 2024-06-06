/* eslint-disable react-hooks/exhaustive-deps */
import { MetricsData } from "../../../types";
import DoughnutChart from "../../charts/doughnut";
import { StyledSection } from "../styles";

interface Props {
  data: MetricsData[];
}

const DowntimeSection = ({ data }: Props): JSX.Element => {
  return (
    <>
      <StyledSection data-testid="downtime-section">
        <h2>Downtime (Seconds)</h2>
        <DoughnutChart data={data} />
      </StyledSection>
    </>
  );
};

export default DowntimeSection;
