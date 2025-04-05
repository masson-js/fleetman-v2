"use client";

import { Inspection } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B8B"];

export default function InspectionTypesChart({
  inspectionsData,
}: {
  inspectionsData: Inspection[];
}) {
  const chartData = useMemo(() => {
    const typesData = inspectionsData.reduce((acc, inspection) => {
      const type = inspection.inspectionType || "Unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typesData).map(([name, value]) => ({ name, value }));
  }, [inspectionsData]);

  return (
    <div className="bg-white p-3 rounded-lg border">
      <h3 className="font-semibold mb-2 text-center">Inspection Types</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={30}
              dataKey="value"
              label={({ name }) => name}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}