import { MetricsData } from "../../../types";
import GaugeChart from "../../charts/gauge";
import { SubSection } from "../styles";

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

const EfficiencySection = ({ data, setSelected }: Props) => {
  return (
    <section>
      <h2>Efficiency</h2>
      <SubSection>
        <h3>Overall equipment effectiveness</h3>
        <GaugeChart
          metricId="oee"
          value={data[0].value / 100}
          setSelected={setSelected}
        />
      </SubSection>
    </section>
  );
};
export default EfficiencySection;
