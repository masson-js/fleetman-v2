"use client";

import { Inspection } from "@/types";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InspectionTypesChart from "./_analytics/InspectionTypesChart";
import TopStandardsChart from "./_analytics/TopStandardsChart";
import MonthlyStatsChart from "./_analytics/MonthlyStatsChart";
import ShipsPerformanceChart from "./_analytics/ShipsPerformanceChart";

export default function AnalyticsDashboard({
  inspectionsData,
}: {
  inspectionsData: Inspection[];
}) {
  return (
    <section
      id="analitics-section"
      className="mt-2 p-4 bg-white rounded-lg shadow mb-20 scroll-mt-16"
    >
      <h2 className="text-xl font-bold mb-4">Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <InspectionTypesChart inspectionsData={inspectionsData} />
        <TopStandardsChart inspectionsData={inspectionsData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyStatsChart inspectionsData={inspectionsData} />
        <ShipsPerformanceChart inspectionsData={inspectionsData} />
      </div>
    </section>
  );
}
