import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";
import BarChart from "../bar";

const mockStore = configureStore([]);

const mockData: MetricsData[] = [
  {
    id: "1",
    label: "Metric 1",
    value: 30,
    type: "number",
    description: "desc 1",
    category: "efficiency",
  },
  {
    id: "2",
    label: "Metric 2",
    value: -10,
    type: "number",
    description: "desc 2",
    category: "efficiency",
  },
  {
    id: "3",
    label: "OEE",
    value: 70,
    type: "percentage",
    description: "desc 3",
    category: "efficiency",
  },
];

describe("BarChart Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      metrics: { selectedMetric: null },
    });
  });

  it("should render the bar chart correctly", () => {
    render(
      <Provider store={store}>
        <BarChart data={mockData} />
      </Provider>
    );

    const svg = screen.getByTestId("chart-bar");
    expect(svg).toBeInTheDocument();

    const bars = screen.getAllByTestId(/bar-/);
    expect(bars.length).toBe(3); // OEE should be excluded
  });

  it("should dispatch setSelectedMetric on mouseover", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BarChart data={mockData} />
      </Provider>
    );

    const bars = screen.getAllByTestId(/bar-/);
    fireEvent.mouseOver(bars[0]);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "metrics/setSelectedMetric",
      payload: { id: "1", category: "efficiency" },
    });
  });

  it("should dispatch setSelectedMetric(undefined) on mouseout", () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BarChart data={mockData} />
      </Provider>
    );

    const bars = screen.getAllByTestId(/bar-/);
    fireEvent.mouseOut(bars[0]);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "metrics/setSelectedMetric",
      payload: undefined,
    });
  });

  it("should update bar fill color based on selection", () => {
    store = mockStore({
      metrics: { selectedMetric: { id: "1", category: "efficiency" } },
    });

    render(
      <Provider store={store}>
        <BarChart data={mockData} />
      </Provider>
    );

    const bars = screen.getAllByTestId(/bar-/);
    expect(bars[0]).toHaveAttribute("fill", "#FFF"); // Selected
    expect(bars[1]).toHaveAttribute("fill", colors.red); // Not selected and negative value
  });

  it("should not render anything when chart reference is null", () => {
    render(
      <Provider store={store}>
        <BarChart data={[]} />
      </Provider>
    );

    const svg = screen.queryByTestId("bar-chart");
    expect(svg).not.toBeInTheDocument();
  });

  it("should not update bar fill color when selected metric category is invalid", () => {
    store = mockStore({
      metrics: { selectedMetric: { id: "1", category: "invalid" } },
    });

    render(
      <Provider store={store}>
        <BarChart data={mockData} />
      </Provider>
    );

    const bars = screen.getAllByTestId(/bar-/);
    expect(bars[0]).not.toHaveAttribute("fill", "#FFF");
  });
});
