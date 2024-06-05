/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";

interface Props {
  metricId?: string;
  value: number;
  setSelected: React.Dispatch<
    React.SetStateAction<
      | {
          id?: string | null | undefined;
          category: MetricsData["category"];
        }
      | undefined
    >
  >;
}
const GaugeChart = ({ metricId, value, setSelected }: Props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const width = 200;
    const height = 100;
    const outerRadius = Math.min(width, height * 2) / 2;
    const innerRadius = outerRadius - 10;
    const needleLength = outerRadius - 20;

    // Clear previous SVG elements
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height})`)
      .on("mouseover", function () {
        setSelected({ id: metricId, category: "shift" });
      })
      .on("mouseout", function () {
        setSelected(undefined);
      });

    const arc: any = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(-Math.PI / 2);

    svg
      .append("path")
      .datum({ endAngle: Math.PI / 2 })
      .style("fill", "#e0e0e0")
      .attr("d", arc);

    svg
      .append("path")
      .datum({ endAngle: -Math.PI / 2 + Math.PI * value })
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
  }, [value]);

  return <svg ref={chartRef}></svg>;
};

export default GaugeChart;
