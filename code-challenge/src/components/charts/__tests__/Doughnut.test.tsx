import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Category, MetricsData } from "../../../types";
import DoughnutChart from "../doughnut";

// Define the ValueType
export type ValueType = "percentage" | "number" | "secs" | "minutes" | "hours";

// Define the function for separating metrics by category
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

describe("DoughnutChart", () => {
  const mockStore = configureStore();
  let store: any;
  const mockData: MetricsData[] = [
    {
      id: "1",
      label: "Label 1",
      value: 10,
      type: "percentage" as ValueType,
      description: "Description 1",
      category: "shift",
    },
    {
      id: "2",
      label: "Label 2",
      value: 20,
      type: "percentage" as ValueType,
      description: "Description 2",
      category: "shift",
    },
  ];

  beforeEach(() => {
    store = mockStore({
      metrics: { selectedMetric: undefined },
    });
  });

  it("should render the chart correctly", () => {
    const separatedData = separateMetricsByCategory(mockData);
    render(
      <Provider store={store}>
        <DoughnutChart data={separatedData.shift} />
      </Provider>
    );

    const chart = screen.getByTestId("doughnut-chart");
    const arcs = screen.getAllByTestId(/arc-/);
    const texts = screen.getAllByTestId(/text-/);

    expect(chart).toBeInTheDocument();
    expect(arcs.length).toBe(mockData.length);
    expect(texts.length).toBe(mockData.length);
  });
});
