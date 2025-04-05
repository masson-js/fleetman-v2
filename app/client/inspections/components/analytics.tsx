"use client";

import { Inspection } from "@/types";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import InspectionTypesChart from "./_analytics/InspectionTypesChart";
import TopStandardsChart from "./_analytics/TopStandardsChart";
import MonthlyStatsChart from "./_analytics/MonthlyStatsChart";
import ShipsPerformanceChart from "./_analytics/ShipsPerformanceChart";

// Динамический импорт для SSR


export default function AnalyticsDashboard({
  inspectionsData,
}: {
  inspectionsData: Inspection[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Обработка скролла к секции
  useEffect(() => {
    const scrollToAnalytics = () => {
      if (window.location.hash === "#analitics-section") {
        const element = document.getElementById("analitics-section");
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, 100);
        }
      }
    };

    scrollToAnalytics();
    window.addEventListener("hashchange", scrollToAnalytics);

    return () => {
      window.removeEventListener("hashchange", scrollToAnalytics);
    };
  }, [searchParams]);

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