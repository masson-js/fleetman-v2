"use client";

import { useEffect } from "react";
import * as d3 from "d3";

// Интерфейсы для Fixture и Ship
interface Fixture {
  id: string;
  shipId: string;
  totalCost: number;
}

interface Ship {
  id: string;
  name: string;
}

interface DataVizProps {
  fixtures: Fixture[];
  ships: Ship[]; // Массив судов для получения названий
}

export default function DataViz({ fixtures, ships }: DataVizProps) {
  // Агрегируем данные по каждому кораблю
  const aggregatedData = ships.map((ship) => {
    const totalCost = fixtures.reduce((acc, fixture) => {
      if (fixture.shipId === ship.id) {
        acc += fixture.totalCost;
      }
      return acc;
    }, 0);

    return {
      shipName: ship.name,
      totalCost: totalCost,
    };
  });

  // Находим корабль с наибольшей суммой заработка
  const maxEarningShip = aggregatedData.reduce(
    (max, d) => (d.totalCost > max.totalCost ? d : max),
    aggregatedData[0]
  );

  // Форматирование числа для отображения суммы с "K" и "M"
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toFixed(0);
  };

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    // Reduce width and height by half
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Ось X для категориальных данных (названия судов)
    const x = d3
      .scaleBand()
      .domain(aggregatedData.map((d) => d.shipName))
      .range([0, width])
      .padding(0.1);

    // Ось Y для числовых данных (стоимость)
    const y = d3.scaleLinear().domain([0, d3.max(aggregatedData, (d) => d.totalCost)!]).nice().range([height, 0]);

    // Добавляем столбцы для каждого судна с округленными верхними углами
    svg
      .selectAll(".bar")
      .data(aggregatedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.shipName)!)
      .attr("y", (d) => y(d.totalCost))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.totalCost))
      .attr("fill", (d) => (d.shipName === maxEarningShip.shipName ? "#ff5796" : "#09A9FF")) // Color logic for the highest earning ship
      .attr("rx", 10) // Rounded corners only at the top
      .attr("ry", 10) // Rounded corners only at the top
      .on("click", function (event, d) {
        window.location.href = `/ship/${d.shipName}`; // Navigate to ship's page (change this URL format as needed)
      })
      .on("mouseenter", function (event, d) {
        // Change bar color to a lighter shade on hover
        const fillColor = d.shipName === maxEarningShip.shipName ? "#cd396f" : "#57C4FF"; // Lighter shade on hover
        d3.select(this).style("fill", fillColor);
        // Change cursor to pointer on hover
        d3.select(this).style("cursor", "pointer");
      })
      .on("mouseleave", function (event, d) {
        // Revert back to original color when mouse leaves
        const fillColor = d.shipName === maxEarningShip.shipName ? "#ff5796" : "#09A9FF";
        d3.select(this).style("fill", fillColor);
      });

    // Добавляем текстовые метки с именами судов под столбцами
    const textElements = svg
      .selectAll(".text")
      .data(aggregatedData)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.shipName)! + x.bandwidth() / 2) // Positioning ship name in the middle of each bar
      .attr("y", height + 15) // Below the bars
      .attr("text-anchor", "middle")
      .style("font-size", "10px") // Reduced font size for smaller chart
      .style("fill", "black")
      .text((d) => d.shipName); // Displaying the ship name below the bars

    // Убираем линии сетки и добавляем ось X (без подписей)
    // Removed this line to remove the X-axis
    // svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).tickSize(0));

    // Убираем ось Y
    svg
      .append("g")
      .call(d3.axisLeft(y).ticks(5).tickSize(0)) // Убираем линии сетки
      .style("display", "none"); // Убираем саму ось Y

    // Отображаем суммы над каждым баром
    svg
      .selectAll(".total-cost")
      .data(aggregatedData)
      .enter()
      .append("text")
      .attr("class", "total-cost")
      .attr("x", (d) => x(d.shipName)! + x.bandwidth() / 2) // Positioning the total cost in the middle of each bar
      .attr("y", (d) => y(d.totalCost) - 5) // Positioning the total cost just above each bar
      .attr("text-anchor", "middle")
      .style("font-size", "10px") // Reduced font size for smaller chart
      .style("fill", "#333")
      .text((d) => formatNumber(d.totalCost)); // Displaying the total cost above each bar
  }, [aggregatedData, maxEarningShip]);

  return (
    <div className="bg-white m-12 shadow-md rounded-lg p-6">
      <h2>Charters</h2>
      <svg id="chart"></svg>
    </div>
  );
}
