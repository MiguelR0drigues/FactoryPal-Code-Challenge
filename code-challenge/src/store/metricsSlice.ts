import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetricsData } from "../types";

interface MetricsState {
  metrics: MetricsData[];
  filteredMetrics?: MetricsData[] | undefined;
  selectedMetric?: { id?: string | null; category: MetricsData["category"] };
}

const initialState: MetricsState = {
  metrics: [],
  filteredMetrics: undefined,
  selectedMetric: undefined,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<MetricsData[]>) => {
      state.metrics = action.payload;
    },
    setFilteredMetrics: (
      state,
      action: PayloadAction<MetricsData[] | undefined>
    ) => {
      state.filteredMetrics = action.payload;
    },
    setSelectedMetric: (
      state,
      action: PayloadAction<MetricsState["selectedMetric"]>
    ) => {
      state.selectedMetric = action.payload;
    },
  },
});

export const { setMetrics, setFilteredMetrics, setSelectedMetric } =
  metricsSlice.actions;

export default metricsSlice.reducer;
