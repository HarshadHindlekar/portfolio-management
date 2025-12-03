"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { EquityPoint } from "@/lib/navStats";

type Props = {
  data: EquityPoint[];
};

export default function EquityCurveChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 720;
    const height = 260;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;

    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const parsed = data.map((d) => ({
      ...d,
      date: d.date instanceof Date ? d.date : new Date(d.date as unknown as string),
    }));

    const baseEquity = parsed[0]?.equity ?? 100;

    const benchmark = parsed.map((d) => ({
      ...d,
      equity: baseEquity + (d.equity - baseEquity) * 0.7,
    }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(parsed, (d: any) => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const allPoints = [...parsed, ...benchmark];

    const y = d3
      .scaleLinear()
      .domain([
        (d3.min(allPoints, (d: any) => d.equity) ?? 0) as number,
        (d3.max(allPoints, (d: any) => d.equity) ?? 0) as number,
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<any>()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.equity))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(benchmark as any)
      .attr("fill", "none")
      .attr("stroke", "#16a34a")
      .attr("stroke-width", 2.2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line as any);

    svg
      .append("path")
      .datum(parsed as any)
      .attr("fill", "none")
      .attr("stroke", "#22c55e")
      .attr("stroke-width", 2.6)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line as any);

    const xAxis = d3.axisBottom(x).ticks(6);
    const yAxis = d3.axisLeft(y).ticks(5).tickSize(-innerWidth);

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
      aria-label="Equity curve chart"
    />
  );
}
