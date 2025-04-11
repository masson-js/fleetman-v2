"use client";

import { useState } from "react";

import { Inspection } from "@/types";
import TilesShips from "./TilesShips";
import AnalyticsDashboard from "./analytics";

export default function ClientViewSwitcher({
  userShips,
  inspectionsData,
}: {
  userShips: any[];
  inspectionsData: Inspection[];
}) {
  const [activeView, setActiveView] = useState<"ships" | "analytics">("ships");

  return (
    <>
      <div className="flex mt-2 flex-col gap-4 animate-fade-in ">
        {/* View Switcher */}
        <div className="flex gap-2 p-2 bg-white shadow-lg">
          <button
            className={`px-3 text-xs ${
              activeView === "ships"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setActiveView("ships")}
          >
            ships
          </button>
          <button
            className={`px-3 py-1 text-xs ${
              activeView === "analytics"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            } transition-colors duration-200`}
            onClick={() => setActiveView("analytics")}
          >
            analytics
          </button>
        </div>

        <div>
          {activeView === "ships" ? (
            <TilesShips
              userShips={userShips}
              inspectionsData={inspectionsData}
            />
          ) : (
            <AnalyticsDashboard inspectionsData={inspectionsData} />
          )}
        </div>

      
      </div>
    </>
  );
}
