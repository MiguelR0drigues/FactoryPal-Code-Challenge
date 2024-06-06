/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { setSelectedMetric } from "../../../store/metricsSlice";
import { MetricsData } from "../../../types";
import Table from "../index";

const mockStore = configureStore([]);

describe("Table component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      metrics: {
        selectedMetric: undefined,
      },
    });
  });

  const mockData: MetricsData[] = [
    {
      id: "1",
      label: "Label 1",
      value: 10,
      type: "number",
      description: "Description 1",
      category: "efficiency",
    },
    {
      id: "2",
      label: "Label 2",
      value: 20,
      type: "number",
      description: "Description 2",
      category: "shift",
    },
  ];

  it("renders the correct number of columns and rows", () => {
    render(
      <Provider store={store}>
        <Table data={mockData} />
      </Provider>
    );

    // Check column headers
    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByText("value")).toBeInTheDocument();
    expect(screen.getByText("type")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();

    // Check rows
    const rows = screen.getAllByRole("row");
    // Subtract 1 for the header row
    expect(rows.length - 1).toBe(mockData.length);
  });

  it("dispatches setSelectedMetric action on row hover", () => {
    render(
      <Provider store={store}>
        <Table data={mockData} />
      </Provider>
    );

    // Simulate mouse enter on the first row
    fireEvent.mouseEnter(screen.getByText("Label 1").closest("tr")!);
    // Check if setSelectedMetric action was dispatched
    expect(store.getActions()).toEqual([
      setSelectedMetric({ id: "1", category: "efficiency" }),
    ]);
  });

  it("dispatches setSelectedMetric action on row hover and resets on leave", () => {
    render(
      <Provider store={store}>
        <Table data={mockData} />
      </Provider>
    );

    // Simulate mouse enter on the first row
    const firstRow = screen.getByText("Label 1").closest("tr");
    fireEvent.mouseEnter(firstRow!);
    // Check if setSelectedMetric action was dispatched
    expect(store.getActions()).toEqual([
      setSelectedMetric({ id: "1", category: "efficiency" }),
    ]);

    // Simulate mouse leave from the first row
    fireEvent.mouseLeave(firstRow!);
    // Check if setSelectedMetric action was dispatched with undefined
    expect(store.getActions()).toEqual([
      setSelectedMetric({ id: "1", category: "efficiency" }),
      setSelectedMetric(undefined),
    ]);
  });
});
