import { useEffect, useState } from "react";
import fetchData from "./api/data";
import Card from "./components/card";
import MetricSection from "./components/metric-section";
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
          }}
        >
          <Card>
            <MetricSection
              selected={selectedMetric}
              setSelected={setSelectedMetric}
              data={separateMetricsByCategory(metrics).downtime}
            />
          </Card>
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
