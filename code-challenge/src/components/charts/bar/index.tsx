/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";

interface Props {
  data: MetricsData[];
  selected:
    | {
        id?: string | null | undefined;
        category: MetricsData["category"];
      }
    | undefined;
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

const BarChart = ({ data, selected, setSelected }: Props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 330 - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    // Filter efficiency data excluding "oee"
    const efficiencyData = data.filter(
      (item) => item.category === "efficiency" && item.id !== "oee"
    );

    // Clear previous SVG elements
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(efficiencyData.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      // @ts-ignore
      .domain([
        d3.min(efficiencyData, (d) => d.value),
        d3.max(efficiencyData, (d) => d.value),
      ])
      .nice()
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg
      .selectAll(".bar")
      .data(efficiencyData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      // @ts-ignore
      .attr("x", (d: any) => x(d.label))
      .attr("y", (d) => (d.value >= 0 ? y(d.value) : y(0)))
      .attr("width", x.bandwidth())
      .attr("height", (d) => Math.abs(y(d.value) - y(0)))
      .attr("fill", (d) => (d.value < 0 ? colors.red : colors.green))
      .on("mouseout", () => {
        setSelected(undefined);
      })
      .on("mouseover", function (_, d) {
        selected?.id !== d.id &&
          setSelected({ id: d.id, category: d.category });
      });
  }, [data]);

  useEffect(() => {
    if (selected?.category !== "efficiency" && selected?.id === "oee") return;

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
