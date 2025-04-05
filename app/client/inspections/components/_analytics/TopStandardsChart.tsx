"use client";

import { Inspection } from "@/types";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

export default function TopStandardsChart({
  inspectionsData,
}: {
  inspectionsData: Inspection[];
}) {
  const chartData = useMemo(() => {
    const standards = inspectionsData
      .flatMap((inspection) =>
        inspection.complianceStandards.split(",").map((s) => s.trim())
      )
      .reduce((acc, standard) => {
        if (standard) acc[standard] = (acc[standard] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(standards)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  }, [inspectionsData]);

  return (
    <div className="bg-white p-3 rounded-lg border">
      <h3 className="font-semibold mb-2 text-center">Top Standards</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}