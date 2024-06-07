import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartsSection, MainContainer } from "./App.Styles";
import fetchData from "./api/data";
import Card from "./components/card";
import DowntimeSection from "./components/metrics-sections/downtime-section";
import EfficiencySection from "./components/metrics-sections/efficiency-section";
import ShiftSection from "./components/metrics-sections/shift-section";
import NoChartResults from "./components/no-results/charts-sections";
import Search from "./components/search";
import Table from "./components/table";
import { ToastProvider } from "./contexts/ToastContext";
import { AppDispatch, RootState } from "./store";
import { setMetrics } from "./store/metricsSlice";
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
  const dispatch: AppDispatch = useDispatch();
  const metrics = useSelector((state: RootState) => state.metrics.metrics);
  const filteredMetrics = useSelector(
    (state: RootState) => state.metrics.filteredMetrics
  );

  const downtimeMetrics = separateMetricsByCategory(
    filteredMetrics || metrics
  ).downtime;
  const shiftMetrics = separateMetricsByCategory(
    filteredMetrics || metrics
  ).shift;
  const efficiencyMetrics = separateMetricsByCategory(
    filteredMetrics || metrics
  ).efficiency;

  const hasShiftMetrics = shiftMetrics && shiftMetrics.length > 0;
  const hasEfficiencyMetrics =
    efficiencyMetrics && efficiencyMetrics.length > 0;
  const hasDowntimeMetrics = downtimeMetrics && downtimeMetrics.length > 0;

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const result = await fetchData();
        if (result && result.data) {
          dispatch(setMetrics(result.data));
        } else {
          console.error("Invalid response from fetchData");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchMetrics();
  }, [dispatch]);
  return (
    <ToastProvider>
      <MainContainer>
        {hasDowntimeMetrics && hasShiftMetrics && hasEfficiencyMetrics ? (
          <ChartsSection>
            {hasShiftMetrics && (
              <Card>
                <ShiftSection data-testid="shift-section" data={shiftMetrics} />
              </Card>
            )}
            {hasEfficiencyMetrics && (
              <Card>
                <EfficiencySection
                  data-testid="efficiency-section"
                  data={efficiencyMetrics}
                />
              </Card>
            )}
            {hasDowntimeMetrics && (
              <Card>
                <DowntimeSection
                  data-testid="downtime-section"
                  data={downtimeMetrics}
                />
              </Card>
            )}
          </ChartsSection>
        ) : (
          <NoChartResults />
        )}
        <Card>
          <>
            <Search />
            {metrics && metrics.length > 0 ? (
              <Table data={filteredMetrics || metrics} />
            ) : (
              <> </>
            )}
          </>
        </Card>
      </MainContainer>
    </ToastProvider>
  );
};

export default App;
