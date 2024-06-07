import { render, screen } from "@testing-library/react";
import { MetricsData } from "../../../types";
import EfficiencySection from "../efficiency-section";

// Mock the GaugeChart and BarChart components
jest.mock("../../charts/gauge", () => (props: any) => (
  <div data-testid="gauge-chart">{JSON.stringify(props)}</div>
));

jest.mock("../../charts/bar", () => (props: any) => (
  <div data-testid="bar-chart">{JSON.stringify(props)}</div>
));

describe("EfficiencySection", () => {
  const MOCK_DATA: MetricsData[] = [
    {
      id: "oee",
      label: "OEE",
      value: 85,
      type: "percentage",
      description: "Overall equipment effectiveness",
      category: "efficiency",
    },
    {
      id: "sl",
      label: "Stop Loss",
      value: 10,
      type: "number",
      description: "Stop loss description",
      category: "efficiency",
    },
    {
      id: "lbp",
      label: "Loss Before Pallets",
      value: 5,
      type: "number",
      description: "Loss before pallets description",
      category: "efficiency",
    },
  ];

  it("renders without crashing and displays the correct title", () => {
    render(<EfficiencySection data={MOCK_DATA} />);

    expect(screen.getByTestId("efficiency-section")).toBeInTheDocument();
    expect(screen.getByText("Efficiency")).toBeInTheDocument();
  });

  it("renders the GaugeChart with the correct data", () => {
    render(<EfficiencySection data={MOCK_DATA} />);

    const gaugeChart = screen.getByTestId("gauge-chart");
    expect(gaugeChart).toBeInTheDocument();

    const { metricId, value } = JSON.parse(gaugeChart.textContent || "{}");
    expect(metricId).toBe("oee");
    expect(value).toBe(0.85);
  });

  it("renders the BarChart with the correct data", () => {
    render(<EfficiencySection data={MOCK_DATA} />);

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toBeInTheDocument();

    // Ensure that the BarChart receives only the efficiency data excluding the "oee" metric
    const { data } = JSON.parse(barChart.textContent || "{}");
    const expectedData = [
      {
        id: "sl",
        label: "Stop Loss",
        value: 10,
        type: "number",
        description: "Stop loss description",
        category: "efficiency",
      },
      {
        id: "lbp",
        label: "Loss Before Pallets",
        value: 5,
        type: "number",
        description: "Loss before pallets description",
        category: "efficiency",
      },
    ];
    expect(data).toEqual(expectedData);
  });
});
