import { MetricsData } from "../../../types";
import BarChart from "../../charts/bar";
import GaugeChart from "../../charts/gauge";
import { StyledSection, SubSection } from "../styles";

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

const EfficiencySection = ({ data, selected, setSelected }: Props) => {
  const ooeMetric = data.find((item) => item.id === "oee");

  return (
    <StyledSection>
      <h2>Efficiency</h2>
      <SubSection>
        <h3>Overall equipment effectiveness</h3>
        <GaugeChart
          metricId="oee"
          value={ooeMetric!.value / 100}
          setSelected={setSelected}
        />
      </SubSection>
      <SubSection>
        <h3 style={{ marginBottom: "-8px" }}>
          Stop loss & Loss before pallets
        </h3>
        <BarChart data={data} selected={selected} setSelected={setSelected} />
      </SubSection>
    </StyledSection>
  );
};
export default EfficiencySection;
