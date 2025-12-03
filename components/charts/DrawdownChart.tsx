"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { EquityPoint } from "@/lib/navStats";

type Props = {
  data: EquityPoint[];
};

export default function DrawdownChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 720;
    const height = 180;
    const margin = { top: 10, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;

    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const parsed = data.map((d) => ({
      ...d,
      date: d.date instanceof Date ? d.date : new Date(d.date as unknown as string),
    }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(parsed, (d: any) => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([
        (d3.min(parsed, (d: any) => d.drawdown) ?? -50) as number,
        0,
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const area = d3
      .area<any>()
      .x((d: any) => x(d.date))
      .y0(() => y(0))
      .y1((d: any) => y(d.drawdown))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(parsed as any)
      .attr("fill", "#fecaca")
      .attr("stroke", "#f97373")
      .attr("stroke-width", 1.5)
      .attr("d", area as any);

    const xAxis = d3.axisBottom(x).ticks(6);
    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickSize(-innerWidth)
      .tickFormat((d) => `${d as number}%`);

    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis as any);

    const yAxisGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis as any);

    xAxisGroup.selectAll("text").attr("fill", "#a1a1aa").attr("font-size", 10);
    yAxisGroup.selectAll("text").attr("fill", "#a1a1aa").attr("font-size", 10);

    xAxisGroup.selectAll("path").attr("stroke", "#e5e7eb");
    yAxisGroup.selectAll("path").attr("stroke", "#e5e7eb");

    xAxisGroup.selectAll("line").attr("stroke", "#e5e7eb");
    yAxisGroup.selectAll("line").attr("stroke", "#e5e7eb").attr("stroke-opacity", 0.6);
  }, [data]);

  return (
    <svg
      ref={svgRef}
      className="w-full overflow-visible rounded-md bg-white"
      aria-label="Drawdown chart"
    />
  );
}
