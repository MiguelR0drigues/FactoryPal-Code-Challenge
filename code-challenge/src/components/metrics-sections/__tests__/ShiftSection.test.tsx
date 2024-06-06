import { render, screen } from "@testing-library/react";
import { MetricsData } from "../../../types";
import ShiftSection from "./../shift-section";

// Mock the DoughnutChart component
jest.mock("../../charts/doughnut", () => (props: any) => (
  <div data-testid="doughnut-chart">{JSON.stringify(props)}</div>
));

describe("ShiftSection", () => {
  const MOCK_DATA: MetricsData[] = [
    {
      id: "1",
      label: "Metric 1",
      value: 10,
      type: "hours",
      description: "Test description 1",
      category: "shift",
    },
    {
      id: "2",
      label: "Metric 2",
      value: 20,
      type: "hours",
      description: "Test description 2",
      category: "shift",
    },
  ];

  it("renders without crashing and displays the correct title", () => {
    render(<ShiftSection data={MOCK_DATA} />);

    expect(screen.getByTestId("shift-section")).toBeInTheDocument();
    expect(screen.getByText("Shift (Hours)")).toBeInTheDocument();
  });

  it("renders the DoughnutChart with correct data and colors", () => {
    render(<ShiftSection data={MOCK_DATA} />);

    const doughnutChart = screen.getByTestId("doughnut-chart");
    expect(doughnutChart).toBeInTheDocument();

    const { data, customColors } = JSON.parse(
      doughnutChart.textContent || "{}"
    );
    expect(data).toEqual(MOCK_DATA);
    expect(customColors).toEqual(["#ff9900", "#ffcc00"]);
  });
});
