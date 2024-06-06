/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";
import DoughnutChart from "../../charts/doughnut";

interface Props {
  data: MetricsData[];
}

const ShiftSection = ({ data }: Props): JSX.Element => {
  const customColors = [colors.orange, colors.yellow];

  return (
    <>
      <h2>Shift (Hours)</h2>
      <DoughnutChart data={data} customColors={customColors} />
    </>
  );
};

export default ShiftSection;
