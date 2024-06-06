/* eslint-disable react-hooks/exhaustive-deps */
import { MetricsData } from "../../../types";
import DoughnutChart from "../../charts/doughnut";
import { StyledSection } from "../styles";

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

const DowntimeSection = ({
  data,
  selected,
  setSelected,
}: Props): JSX.Element => {
  return (
    <>
      <StyledSection>
        <h2>Downtime (Seconds)</h2>
        <DoughnutChart
          data={data}
          selected={selected}
          setSelected={setSelected}
        />
      </StyledSection>
    </>
  );
};

export default DowntimeSection;
