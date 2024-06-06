import { render, screen } from "@testing-library/react";
import { MetricsData } from "../../../types";
import DowntimeSection from "../downtime-section";

// Mock the DoughnutChart component
jest.mock("../../charts/doughnut", () => (props: any) => (
  <div data-testid="doughnut-chart">{JSON.stringify(props)}</div>
));

describe("DowntimeSection", () => {
  const MOCK_DATA: MetricsData[] = [
    {
      id: "downtime_1",
      label: "Downtime 1",
      value: 120,
      type: "secs",
      description: "Downtime description 1",
      category: "downtime",
    },
    {
      id: "downtime_2",
      label: "Downtime 2",
      value: 300,
      type: "secs",
      description: "Downtime description 2",
      category: "downtime",
    },
  ];

  it("renders without crashing and displays the correct title", () => {
    render(<DowntimeSection data={MOCK_DATA} />);

    expect(screen.getByTestId("downtime-section")).toBeInTheDocument();
    expect(screen.getByText("Downtime (Seconds)")).toBeInTheDocument();
  });

  it("renders the DoughnutChart with the correct data", () => {
    render(<DowntimeSection data={MOCK_DATA} />);

    const doughnutChart = screen.getByTestId("doughnut-chart");
    expect(doughnutChart).toBeInTheDocument();

    const { data } = JSON.parse(doughnutChart.textContent || "{}");
    expect(data).toEqual(MOCK_DATA);
  });
});
