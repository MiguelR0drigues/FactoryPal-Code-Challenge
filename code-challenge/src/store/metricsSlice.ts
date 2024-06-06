import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetricsData } from "../types";

interface MetricsState {
  metrics: MetricsData[];
  selectedMetric?: { id?: string | null; category: MetricsData["category"] };
}

const initialState: MetricsState = {
  metrics: [],
  selectedMetric: undefined,
};

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<MetricsData[]>) => {
      state.metrics = action.payload;
    },
    setSelectedMetric: (
      state,
      action: PayloadAction<MetricsState["selectedMetric"]>
    ) => {
      state.selectedMetric = action.payload;
    },
  },
});

export const { setMetrics, setSelectedMetric } = metricsSlice.actions;

export default metricsSlice.reducer;
