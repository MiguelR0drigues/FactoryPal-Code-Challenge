/* eslint-disable react-hooks/exhaustive-deps */
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";
import DoughnutChart from "../../charts/doughnut";

interface Props {
  data: MetricsData[];
  selected:
    | {
        id?: string | null | undefined;
        category: MetricsData["category"];
      }
    | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<
      | {
          id?: string | null | undefined;
          category: MetricsData["category"];
        }
      | undefined
    >
  >;
}

const ShiftSection = ({ data, selected, setSelected }: Props): JSX.Element => {
  const customColors = [colors.orange, colors.yellow];

  return (
    <>
      <h2>Shift (Hours)</h2>
      <DoughnutChart
        data={data}
        selected={selected}
        setSelected={setSelected}
        customColors={customColors}
      />
    </>
  );
};

export default ShiftSection;
