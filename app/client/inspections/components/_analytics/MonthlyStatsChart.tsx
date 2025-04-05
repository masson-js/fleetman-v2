// MonthlyStatsChart.tsx
"use client";

import { Inspection } from "@/types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useMemo } from "react";

export default function MonthlyStatsChart({
  inspectionsData,
}: {
  inspectionsData: Inspection[];
}) {
  const chartData = useMemo(() => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const monthly = inspectionsData
      .filter((i) => new Date(i.inspectionDate) >= oneYearAgo)
      .reduce((acc, inspection) => {
        const date = new Date(inspection.inspectionDate);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

        if (!acc[monthYear]) {
          acc[monthYear] = { monthYear, passed: 0, failed: 0 };
        }

        if (inspection.verificationStatus.toLowerCase() === "passed") {
          acc[monthYear].passed++;
        } else {
          acc[monthYear].failed++;
        }

        return acc;
      }, {} as Record<string, { monthYear: string; passed: number; failed: number }>);

    return Object.values(monthly)
      .sort((a, b) => a.monthYear.localeCompare(b.monthYear));
  }, [inspectionsData]);

  return (
    <div className="bg-white p-3 rounded-lg border">
      <h3 className="font-semibold mb-2 text-center">Monthly Stats (Last Year)</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="passed"
              stroke="#4CAF50"
              name="Passed"
            />
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#F44336"
              name="Failed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}