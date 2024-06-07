import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { setFilteredMetrics } from "../../../store/metricsSlice";
import Search from "../index";

const mockStore = configureStore([]);

describe("Search component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      metrics: {
        metrics: [
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
        ],
      },
    });
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText("Type to Search...")
    ).toBeInTheDocument();
  });

  it("updates the search term state when the input value changes", async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Type to Search...");
    fireEvent.change(searchInput, { target: { value: "Label" } });
    expect(searchInput).toHaveValue("Label");
  });

  it("filters metrics correctly based on the search term", async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Type to Search...");
    fireEvent.change(searchInput, { target: { value: "1" } });

    await waitFor(() => {
      expect([store.getActions()[1]]).toEqual([
        setFilteredMetrics([
          {
            id: "1",
            label: "Label 1",
            value: 10,
            type: "number",
            description: "Description 1",
            category: "efficiency",
          },
        ]),
      ]);
    });
  });
});
