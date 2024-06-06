import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setSelectedMetric } from "../../../store/metricsSlice";
import { colors } from "../../../theme";
import { MetricsData } from "../../../types";
import {
  StyledListItem,
  StyledUnorderedList,
} from "../../metrics-sections/styles";

interface Props {
  data: MetricsData[];
  customColors?: string[];
}

const defaultColors: string[] = [colors.darkBlue, colors.lightBlue];

const convertToHours = (data: MetricsData[]): MetricsData[] => {
  return data.map((item) => {
    let newValue = item.value;

    switch (item.type) {
      case "secs":
        newValue = item.value / 3600;
        break;
      case "minutes":
        newValue = item.value / 60;
        break;
      default:
        newValue = item.value;
        break;
    }

    return { ...item, value: newValue, type: "hours" };
  });
};

const DoughnutChart = ({
  data,
  customColors = defaultColors,
}: Props): JSX.Element => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.metrics.selectedMetric
  );

  const dataInHours = convertToHours(data);

  useEffect(() => {
    if (!chartRef.current) return;

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("data-testid", "doughnut-chart")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<MetricsData>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<MetricsData>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const renderChart = () => {
      const arcs = svg
        .selectAll(".arc")
        .data(pie(data[0].category === "shift" ? dataInHours : data));

      const newArcs = arcs.enter().append("g").attr("class", "arc");

      newArcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (_, i) => customColors[i % customColors.length])
        .attr("data-testid", (d) => `arc-${d.data.id}`)
        .on("mouseover", function (_, d) {
          dispatch(
            setSelectedMetric({ id: d.data.id, category: d.data.category })
          );
        })
        .on("mouseout", function () {
          dispatch(setSelectedMetric(undefined));
        });

      newArcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr("data-testid", (d) => `text-${d.data.id}`)
        .text((d) =>
          d.data.category === "shift" ? d.data.value.toFixed(2) : d.data.value
        );

      arcs.select("path").attr("d", arc);
      arcs
        .select("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`);

      arcs.exit().remove();
    };

    renderChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const updateSelection = () => {
      console.log();
      if (
        selected !== undefined &&
        selected.category !== "shift" &&
        selected.category !== "downtime"
      )
        return;
      const svg = d3.select(chartRef.current);

      svg.selectAll(".arc path").attr("fill", (d: any, i: number) => {
        return d.data.id === selected?.id
          ? "#FFF"
          : customColors[i % customColors.length];
      });

      svg.selectAll(".arc text").attr("fill", (d: any) => {
        return d.data.id === selected?.id ? "black" : "white";
      });
    };

    updateSelection();
  }, [selected, customColors]);

  return (
    <>
      <svg ref={chartRef}></svg>
      <StyledUnorderedList>
        {data.map((item, index) => (
          <StyledListItem
            key={item.id}
            color={customColors[index % customColors.length]}
            isSelected={selected?.id === item.id}
            onMouseEnter={() =>
              dispatch(
                setSelectedMetric({ id: item.id, category: item.category })
              )
            }
            onMouseLeave={() => dispatch(setSelectedMetric(undefined))}
          >
            <span>{item.label}</span>
          </StyledListItem>
        ))}
      </StyledUnorderedList>
    </>
  );
};

export default React.memo(DoughnutChart);
