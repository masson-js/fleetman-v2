// ShipsPerformanceChart.tsx
"use client";

import { Inspection } from "@/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useMemo } from "react";

export default function ShipsPerformanceChart({
  inspectionsData,
}: {
  inspectionsData: Inspection[];
}) {
  const chartData = useMemo(() => {
    const shipsData = inspectionsData.reduce((acc, inspection) => {
      const shipId = inspection.shipId;
      const shipName = inspection.ship?.name || `Ship ${shipId}`;

      if (!acc[shipId]) {
        acc[shipId] = { name: shipName, passed: 0, failed: 0 };
      }

      if (inspection.verificationStatus.toLowerCase() === "passed") {
        acc[shipId].passed++;
      } else {
        acc[shipId].failed++;
      }

      return acc;
    }, {} as Record<string, { name: string; passed: number; failed: number }>);

    return Object.values(shipsData)
      .sort((a, b) => b.passed - a.passed)
      .slice(0, 10);
  }, [inspectionsData]);

  return (
    <div className="bg-white p-3 rounded-lg border">
      <h3 className="font-semibold mb-2 text-center">Top Performing Ships</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 30, bottom: 60 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name) => [`${value} inspections`, name]}
            />
            <Legend />
            <Bar 
              dataKey="passed" 
              name="Passed" 
              fill="#4CAF50" 
              stackId="a"
            />
            <Bar 
              dataKey="failed" 
              name="Failed" 
              fill="#F44336" 
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}