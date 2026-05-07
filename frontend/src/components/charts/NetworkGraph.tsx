import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function NetworkGraph({ nodes, links }: { nodes: Array<{ id: string }>; links: Array<{ source: string; target: string }> }) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = 420;
    const height = 260;
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links as d3.SimulationLinkDatum<any>[]).id((d: any) => d.id).distance(90))
      .force('charge', d3.forceManyBody().strength(-180))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .attr('stroke', 'rgba(34,211,238,0.4)')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 12)
      .attr('fill', '#22d3ee');

    const label = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d: any) => d.id)
      .attr('fill', '#e2e8f0')
      .attr('font-size', 11)
      .attr('dx', 16)
      .attr('dy', 4);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      label.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    });

    return () => simulation.stop();
  }, [nodes, links]);

  return <svg ref={ref} className="h-[260px] w-full" />;
}
