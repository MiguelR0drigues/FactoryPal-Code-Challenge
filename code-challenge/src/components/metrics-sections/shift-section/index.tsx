/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";
import DoughnutChart from "../../charts/doughnut";
import { StyledSection } from "../styles";

interface Props {
  data: MetricsData[];
}

const ShiftSection = ({ data }: Props): JSX.Element => {
  const customColors = [colors.orange, colors.yellow];

  return (
    <StyledSection data-testid="shift-section">
      <h2>Shift (Hours)</h2>
      <DoughnutChart data={data} customColors={customColors} />
    </StyledSection>
  );
};

export default ShiftSection;
