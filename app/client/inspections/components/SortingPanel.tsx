// SortingPanel.tsx
import React from "react";

type SortByType = "mostFails" | "noInspections" | "recent" | "noFails" | "default";

interface SortingPanelProps {
  sortBy: SortByType;
  handleSort: (type: SortByType) => void;
}

export default function SortingPanel({ sortBy, handleSort }: SortingPanelProps) {
  return (
    <div className="flex items-center gap-3 ml-2">
      <span className="text-gray-500 border-r border-[#57C4FF] pr-2 h-[1.2em] flex items-center">
        Sort by
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleSort("mostFails")}
          className={`px-2 py-1 ${
            sortBy === "mostFails"
              ? "border-b-2 border-[#e81416]"
              : "border-b-2 border-transparent"
          }`}
        >
          fails
        </button>
        <button
          onClick={() => handleSort("noFails")}
          className={`px-2 py-1 ${
            sortBy === "noFails"
              ? "border-b-2 border-blue-500"
              : "border-b-2 border-transparent"
          }`}
        >
          no fails
        </button>
        <button
          onClick={() => handleSort("noInspections")}
          className={`px-2 py-1 ${
            sortBy === "noInspections"
              ? "border-b-2 border-yellow-500"
              : "border-b-2 border-transparent"
          }`}
        >
          no records
        </button>
        <button
          onClick={() => handleSort("recent")}
          className={`px-2 py-1 ${
            sortBy === "recent"
              ? "border-b-2 border-green-500"
              : "border-b-2 border-transparent"
          }`}
        >
          last record
        </button>
      </div>
    </div>
  );
}