/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setSelectedMetric } from "../../../store/metricsSlice";
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";

interface Props {
  data: MetricsData[];
}

const BarChart = ({ data }: Props) => {
  const chartRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.metrics.selectedMetric
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: 40, right: 30, bottom: 40, left: 50 };
    const width = 330 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    // Clear previous SVG elements
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("data-testid", "chart-bar")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    // Ensure the Y domain has a range even for single data points
    const y = d3
      .scaleLinear()
      .domain([
        Math.min(0, d3.min(data, (d) => d.value) ?? 0),
        d3.max(data, (d) => d.value) ?? 1,
      ])
      .nice()
      .range([height, 0]);

    // Handle case where there's only one data point
    if (data.length === 1) {
      const singleValue = data[0].value;
      y.domain([
        Math.min(0, singleValue - Math.abs(singleValue * 0.1)),
        singleValue + Math.abs(singleValue * 1),
      ]);
    }

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: any) => x(d.label)!)
      .attr("y", (d) => y(Math.max(0, d.value)))
      .attr("width", x.bandwidth())
      .attr("height", (d) => Math.abs(y(d.value) - y(0)))
      .attr("fill", (d) => (d.value < 0 ? colors.red : colors.green))
      .attr("data-testid", (d) => `bar-${d.id}`)
      .on("mouseout", () => {
        dispatch(setSelectedMetric(undefined));
      })
      .on("mouseover", function (_, d) {
        dispatch(setSelectedMetric({ id: d.id, category: d.category }));
      });
  }, [data]);

  useEffect(() => {
    if (
      selected?.category !== undefined &&
      (selected?.category !== "efficiency" || selected?.id === "oee")
    )
      return;
    const updateSelection = () => {
      const svg = d3.select(chartRef.current);

      svg.selectAll(".bar").attr("fill", (d: any) => {
        return d.id === selected?.id
          ? "#FFF"
          : d.value >= 0
          ? colors.lightBlue
          : colors.red;
      });
    };

    updateSelection();
  }, [selected]);

  return <svg ref={chartRef}></svg>;
};

export default BarChart;
