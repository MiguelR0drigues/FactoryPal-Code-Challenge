/* eslint-disable testing-library/no-unnecessary-act */
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";
import { fetchData } from "../api/data";
import { MOCKED_DATA } from "../mocked-data";
import { setMetrics } from "../store/metricsSlice";

jest.mock("../api/data");

const mockStore = configureStore([]);

describe("App", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      metrics: {
        metrics: [],
      },
    });
  });

  it("dispatches setMetrics action when data is fetched", async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(MOCKED_DATA);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(setMetrics(MOCKED_DATA.data));
    });
  });

  // it("renders child components with correct props", async () => {
  //   (fetchData as jest.Mock).mockResolvedValueOnce(MOCKED_DATA);

  //   render(
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByTestId("efficiency-section")).toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByTestId("shift-section")).toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByTestId("downtime-section")).toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByTestId("table")).toBeInTheDocument();
  //   });
  // });
});
