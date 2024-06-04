/* eslint-disable react-hooks/exhaustive-deps */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { colors } from "../../theme";
import { MetricsData } from "../../types";
import { StyledListItem, StyledUnorderedList } from "./styles";

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

const MetricSection = ({ data, selected, setSelected }: Props): JSX.Element => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const customColors = [colors.darkBlue, colors.lightBlue];

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
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<MetricsData>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<MetricsData>>()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const renderChart = () => {
      const arcs = svg.selectAll(".arc").data(pie(data));

      const newArcs = arcs.enter().append("g").attr("class", "arc");

      newArcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (_, i) => customColors[i % customColors.length])
        .on("mouseover", function (event, d) {
          setSelected({ id: d.data.id, category: "downtime" });
          d3.select(this).transition().duration(200).attr("fill", "#FFF");
          d3.select(event.target.parentNode)
            .transition()
            .duration(200)
            .select("text")
            .attr("fill", "black");
        })
        .on("mouseout", function (event) {
          setSelected(undefined);
          d3.select(event.target)
            .transition()
            .duration(200)
            .attr("fill", (_, i) => customColors[i % customColors.length]);
          d3.select(event.target.parentNode)
            .transition()
            .duration(200)
            .select("text")
            .attr("fill", "white");
        });

      newArcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "white")
        .text((d) => d.data.value);

      arcs.select("path").attr("d", arc);
      arcs
        .select("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`);

      arcs.exit().remove();
    };

    renderChart();
  }, [data, setSelected]);

  useEffect(() => {
    const updateSelection = () => {
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
  }, [selected]);
  return (
    <>
      <h2>Downtime Chart</h2>
      <svg ref={chartRef}></svg>
      <section>
        <StyledUnorderedList>
          {data.map((item, index) => (
            <StyledListItem
              key={item.id}
              color={customColors[index]}
              isSelected={selected?.id === item.id}
            >
              {item.label}
            </StyledListItem>
          ))}
        </StyledUnorderedList>
      </section>
    </>
  );
};

export default MetricSection;
