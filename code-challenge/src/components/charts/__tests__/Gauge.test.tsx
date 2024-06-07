import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import GaugeChart from "../gauge";

const mockStore = configureStore([]);

describe("GaugeChart component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      metrics: {
        selectedMetric: undefined,
      },
    });
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <GaugeChart value={0.5} />
      </Provider>
    );
  });

  it("renders gauge chart with the correct value", () => {
    render(
      <Provider store={store}>
        <GaugeChart metricId="1" value={0.5} />
      </Provider>
    );
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("dispatches setSelectedMetric action on mouseover", () => {
    render(
      <Provider store={store}>
        <GaugeChart metricId="1" value={0.5} />
      </Provider>
    );
    fireEvent.mouseOver(screen.getByRole("svg"));
    expect(store.getActions()).toEqual([
      {
        type: "metrics/setSelectedMetric",
        payload: { id: "1", category: "shift" },
      },
    ]);
  });

  it("dispatches setSelectedMetric action on mouseout", () => {
    render(
      <Provider store={store}>
        <GaugeChart metricId="1" value={0.5} />
      </Provider>
    );
    fireEvent.mouseOut(screen.getByRole("svg"));
    expect(store.getActions()).toEqual([
      { type: "metrics/setSelectedMetric", payload: undefined },
    ]);
  });
});
