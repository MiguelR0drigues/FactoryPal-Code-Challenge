/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setSelectedMetric } from "../../../store/metricsSlice";
import { colors } from "../../../theme";

interface Props {
  metricId?: string;
  value: number;
}

const GaugeChart = ({ metricId, value }: Props) => {
  const chartRef = useRef<SVGSVGElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.metrics.selectedMetric
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const width = 160;
    const height = 100;
    const outerRadius = Math.min(width, height * 2) / 2;
    const innerRadius = outerRadius - 20;
    const needleLength = outerRadius - 20;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("class", "semicircle")
      .append("g")
      .attr("role", "svg")
      .attr("transform", `translate(${width / 2}, ${height - 20})`)
      .on("mouseover", function () {
        selected?.id !== metricId &&
          dispatch(setSelectedMetric({ id: metricId, category: "shift" }));
      })
      .on("mouseout", function () {
        dispatch(setSelectedMetric(undefined));
      });

    const arc: any = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(-Math.PI / 2);

    svg
      .append("path")
      .datum({ endAngle: Math.PI / 2 })
      .attr("class", "background-arc")
      .style("fill", "#e0e0e0")
      .attr("d", arc);

    svg
      .append("path")
      .datum({ endAngle: -Math.PI / 2 + Math.PI * value })
      .attr("class", "value-arc")
      .style(
        "fill",
        value === 0.5 ? colors.yellow : value > 0.5 ? colors.green : colors.red
      )
      .attr("d", arc);

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -needleLength)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("transform", `rotate(${value * 180 - 90})`);

    svg
      .append("text")
      .attr("x", -outerRadius + 10)
      .attr("y", 20)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text("0");

    svg
      .append("text")
      .attr("x", outerRadius - 11)
      .attr("y", 20)
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text("100");

    svg
      .append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr(
        "fill",
        value === 0.5 ? colors.yellow : value > 0.5 ? colors.green : colors.red
      )
      .text(value * 100);
  }, [value]);

  useEffect(() => {
    if (
      selected !== undefined &&
      selected?.category !== "efficiency" &&
      selected?.id !== "oee"
    )
      return;
    const updateSelection = () => {
      const svg = d3.select(chartRef.current);

      svg
        .selectAll(".background-arc")
        .style(
          "filter",
          metricId === selected?.id
            ? `drop-shadow(0px 5px 7px #98a1ec)`
            : "none"
        );
    };

    updateSelection();
  }, [selected]);

  return <svg ref={chartRef} role="img" aria-label="Gauge Chart"></svg>;
};

export default GaugeChart;
