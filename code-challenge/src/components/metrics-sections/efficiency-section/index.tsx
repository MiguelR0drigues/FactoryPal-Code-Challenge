import { MetricsData } from "../../../types";
import BarChart from "../../charts/bar";
import GaugeChart from "../../charts/gauge";
import { StyledSection, SubSection } from "../styles";

interface Props {
  data: MetricsData[];
}

const EfficiencySection = ({ data }: Props) => {
  const ooeMetric = data.find((item) => item.id === "oee");
  // Filter efficiency data excluding "oee"
  const efficiencyData = data.filter(
    (item) => item.category === "efficiency" && item.id !== "oee"
  );

  return (
    <StyledSection data-testid="efficiency-section">
      <h2>Efficiency</h2>
      {ooeMetric && (
        <SubSection>
          <h3>Overall equipment effectiveness</h3>
          <GaugeChart metricId="oee" value={ooeMetric!.value / 100} />
        </SubSection>
      )}
      {efficiencyData && efficiencyData.length > 0 && (
        <SubSection>
          <h3 style={{ marginBottom: "-8px" }}>
            Stop loss & Loss before pallets
          </h3>
          <BarChart data={efficiencyData} />
        </SubSection>
      )}
    </StyledSection>
  );
};
export default EfficiencySection;
