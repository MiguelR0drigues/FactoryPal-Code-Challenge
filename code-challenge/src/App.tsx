import { useEffect, useState } from "react";
import fetchData from "./api/data";
import Card from "./components/card";
import DowntimeSection from "./components/metrics-sections/downtime-section";
import EfficiencySection from "./components/metrics-sections/efficiency-section";
import ShiftSection from "./components/metrics-sections/shift-section";
import Table from "./components/table";
import { ToastProvider } from "./contexts/ToastContext";
import { Category, MetricsData } from "./types";

function separateMetricsByCategory(
  metrics: MetricsData[]
): Record<Category, MetricsData[]> {
  const separatedMetrics: Record<Category | string, MetricsData[]> = {};

  metrics.forEach((metric) => {
    const { category } = metric;
    if (!separatedMetrics[category]) {
      separatedMetrics[category] = [];
    }
    separatedMetrics[category].push(metric);
  });

  return separatedMetrics;
}

const App = () => {
  const [metrics, setMetrics] = useState<MetricsData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<
    | { id?: MetricsData["id"] | null; category: MetricsData["category"] }
    | undefined
  >(undefined);

  const downtimeMetrics = separateMetricsByCategory(metrics).downtime;
  const shiftMetrics = separateMetricsByCategory(metrics).shift;
  const efficiencyMetrics = separateMetricsByCategory(metrics).efficiency;

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const result = await fetchData();
        if (result && result.data) {
          setMetrics(result.data);
        } else {
          console.error("Invalid response from fetchData");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchMetrics();
  }, []);

  return (
    <ToastProvider>
      {metrics && metrics.length > 0 && (
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <article
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
              maxHeight: "500px",
              maxWidth: "90%",
            }}
          >
            <Card>
              <EfficiencySection
                data={efficiencyMetrics}
                selected={selectedMetric}
                setSelected={setSelectedMetric}
              />
            </Card>
            {shiftMetrics && shiftMetrics.length > 0 && (
              <Card>
                <ShiftSection
                  selected={selectedMetric}
                  setSelected={setSelectedMetric}
                  data={shiftMetrics}
                />
              </Card>
            )}
            {downtimeMetrics && downtimeMetrics.length > 0 && (
              <Card>
                <DowntimeSection
                  selected={selectedMetric}
                  setSelected={setSelectedMetric}
                  data={downtimeMetrics}
                />
              </Card>
            )}
          </article>
          <Card>
            <Table
              data={metrics}
              selected={selectedMetric}
              setSelected={setSelectedMetric}
            />
          </Card>
        </main>
      )}
    </ToastProvider>
  );
};

export default App;
