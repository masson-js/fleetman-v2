"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getAllCertifications } from "@/actions/certification";
import { getAllCrewMembers } from "@/actions/crew";
import { getAllFixtures } from "@/actions/fixture";
import { getAllInspections } from "@/actions/inspection";
import { Ship } from "lucide-react";

interface Certification {
  type: string;
  // Add other fields as needed
}

interface CrewMember {
  status: string;
  // Add other fields as needed
}

interface Fixture {
  status: string;
  // Add other fields as needed
}

interface Inspection {
  verificationStatus: string;
  // Add other fields as needed
}

interface Ship {
  length: number;
  name: string;
  id: string;
  type: string;
  userId: string | null;
  flag: string;
  imoNumber: string;
  mmsi: string;
  callsign: string;
  deadweight: number;
  beam: number;
  width: number;
  yearBuilt: number;
  currentStatus: string;
  portOfRegistry: string;
  ecoStandard: string;
}

interface DataState {
  certifications: Certification[];
  crew: CrewMember[];
  fixtures: Fixture[];
  inspections: Inspection[];
  ships: Ship[]; // Add this if you have ship data
}

export default function FleetAnalyticsD3() {
  const inspectionChartRef = useRef(null);
  const certificationChartRef = useRef(null);
  const crewChartRef = useRef(null);
  const fixtureChartRef = useRef(null);
  
  const [data, setData] = useState<DataState>({
    certifications: [],
    crew: [],
    fixtures: [],
    inspections: [],
    ships: [] // Add this if you have ship data
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certsData, crewData, fixturesData, inspectionsData] = 
          await Promise.all([
            getAllCertifications(),
            getAllCrewMembers(),
            getAllFixtures(),
            getAllInspections()
          ]);

        setData({
          certifications: certsData as Certification[],
          crew: crewData as CrewMember[],
          fixtures: fixturesData as Fixture[],
          inspections: inspectionsData as Inspection[],
          ships: [] // Add this if you have ship data
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Очищаем предыдущие графики
    d3.select(inspectionChartRef.current).selectAll("*").remove();
    d3.select(certificationChartRef.current).selectAll("*").remove();
    d3.select(crewChartRef.current).selectAll("*").remove();
    d3.select(fixtureChartRef.current).selectAll("*").remove();

    // Общие размеры для всех графиков
    const width = 300;
    const height = 200;
    const radius = Math.min(width, height) / 2;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Цветовая схема
    const color = d3.scaleOrdinal()
      .range(['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']);

    // Создаем функцию для построения пончиковых диаграмм
    const createDonutChart = (element: any, data: any[], title: string) => {
      const svg = d3.select(element)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const pie = d3.pie()
        .value((d: any) => d.value)
        .sort(null);

      const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8);

      // Добавляем заголовок
      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -height/2 + 20)
        .attr('class', 'text-sm font-semibold text-gray-700')
        .text(title);

      // Добавляем секции
      const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arcs.append('path')
        .attr('d', arc as any)
        .attr('fill', (d: any, i: number) => color(i.toString()) as string)
        .transition()
        .duration(1000)
        .attrTween('d', function(d: any) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function(t) {
            return arc(interpolate(t)) as string;
          };
        });

      // Добавляем метки
      arcs.append('text')
        .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .attr('class', 'text-xs')
        .text((d: any) => d.data.name);
    };

    // Создаем функцию для построения столбчатой диаграммы
    const createBarChart = (element: any, data: any[], title: string) => {
      const svg = d3.select(element)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Scales
      const x = d3.scaleBand()
        .range([0, width - margin.left - margin.right])
        .padding(0.1);

      const y = d3.scaleLinear()
        .range([height - margin.top - margin.bottom, 0]);

      x.domain(data.map(d => d.name));
      y.domain([0, d3.max(data, d => d.value) as number]);

      // Добавляем оси
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      svg.append('g')
        .call(d3.axisLeft(y));

      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name) as number)
        .attr('width', x.bandwidth())
        .attr('y', height - margin.top - margin.bottom)
        .attr('height', 0)
        .attr('fill', (d, i) => color(i.toString()) as string)
        .transition()
        .duration(1000)
        .attr('y', d => y(d.value))
        .attr('height', d => height - margin.top - margin.bottom - y(d.value));

      svg.append('text')
        .attr('x', (width - margin.left - margin.right) / 2)
        .attr('y', -margin.top/2)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-sm font-semibold text-gray-700')
        .text(title);
    };

    // Подготавливаем данные
    const inspectionData = Object.entries(
      data.inspections.reduce((acc: any, inspection: Inspection) => {
        acc[inspection.verificationStatus] = (acc[inspection.verificationStatus] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

    const certificationData = Object.entries(
      data.certifications.reduce((acc: any, cert: Certification) => {
        acc[cert.type] = (acc[cert.type] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

    const crewData = Object.entries(
      data.crew.reduce((acc: any, member: CrewMember) => {
        acc[member.status] = (acc[member.status] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

    const fixtureData = Object.entries(
      data.fixtures.reduce((acc: any, fixture: Fixture) => {
        acc[fixture.status] = (acc[fixture.status] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

    // Создаем графики
    createDonutChart(inspectionChartRef.current, inspectionData, 'Inspection Status');
    createBarChart(certificationChartRef.current, certificationData, 'Certifications by Type');
    createDonutChart(crewChartRef.current, crewData, 'Crew Status');
    createDonutChart(fixtureChartRef.current, fixtureData, 'Fixture Status');

  }, [data, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 w-1/2">
        <div className="animate-pulse text-blue-500">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Ship className="w-5 h-5 text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800">Fleet Analytics</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div ref={inspectionChartRef}></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div ref={certificationChartRef}></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div ref={crewChartRef}></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div ref={fixtureChartRef}></div>
        </div>
      </div>
    </div>
  );
}