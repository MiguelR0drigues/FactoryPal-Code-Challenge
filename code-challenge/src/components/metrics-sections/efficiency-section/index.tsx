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
  const ooeMetric = data.find((item) => item.id === "oee");

  return (
    <section>
      <h2>Efficiency</h2>
      <SubSection>
        <h3>Overall equipment effectiveness</h3>
        <GaugeChart
          metricId="oee"
          value={ooeMetric!.value / 100}
          setSelected={setSelected}
        />
      </SubSection>
    </section>
  );
};
export default EfficiencySection;
