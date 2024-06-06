// metricsSlice.test.ts
import { Category, MetricsData } from "../../types";
import store, { AppDispatch, RootState } from "../index";
import metricsReducer, { setMetrics, setSelectedMetric } from "../metricsSlice";

describe("metricsSlice actions", () => {
  it("should create an action to set metrics", () => {
    const metrics: MetricsData[] = [
      {
        id: "1",
        label: "Metric 1",
        value: 0.75,
        type: "percentage",
        description: "Description 1",
        category: "efficiency",
      },
    ];
    const expectedAction = {
      type: "metrics/setMetrics",
      payload: metrics,
    };
    expect(setMetrics(metrics)).toEqual(expectedAction);
  });

  it("should create an action to set selected metric", () => {
    const selectedMetric = { id: "1", category: "efficiency" as Category };
    const expectedAction = {
      type: "metrics/setSelectedMetric",
      payload: selectedMetric,
    };
    expect(setSelectedMetric(selectedMetric)).toEqual(expectedAction);
  });

  it("should export RootState type correctly", () => {
    // Arrange & Act & Assert
    const testRootState: RootState = {
      metrics: {
        metrics: [],
      },
    };
    expect(testRootState).toEqual(store.getState());
  });

  it("should export AppDispatch type correctly", () => {
    // Arrange & Act & Assert
    const testDispatch: AppDispatch = store.dispatch;
    expect(testDispatch).toEqual(store.dispatch);
  });

  it("should handle setting metrics", () => {
    // Arrange
    const initialState = {
      metrics: [],
      selectedMetric: undefined,
    };
    const newMetrics: MetricsData[] = [
      {
        id: "1",
        label: "Label 1",
        value: 10,
        type: "number",
        description: "Description 1",
        category: "downtime",
      },
      {
        id: "2",
        label: "Label 2",
        value: 20,
        type: "number",
        description: "Description 2",
        category: "downtime",
      },
    ];

    const action = setMetrics(newMetrics);

    // Act
    const newState = metricsReducer(initialState, action);

    // Assert
    expect(newState.metrics).toEqual(newMetrics);
  });

  it("should handle setting selected metric", () => {
    // Arrange
    const initialState = {
      metrics: [],
      selectedMetric: undefined,
    };
    const selectedMetric: {
      id?: string | null;
      category: MetricsData["category"];
    } = { id: "1", category: "shift" };
    const action = setSelectedMetric(selectedMetric);

    // Act
    const newState = metricsReducer(initialState, action);

    // Assert
    expect(newState.selectedMetric).toEqual(selectedMetric);
  });
});
