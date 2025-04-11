// FilterPanel.tsx
import React from "react";

interface FilterPanelProps {
  allStandards: string[];
  standardFilter: string | null;
  setStandardFilter: (filter: string | null) => void;
}

export default function FilterPanel({
  allStandards,
  standardFilter,
  setStandardFilter,
}: FilterPanelProps) {
  return (
    <div className="flex items-baseline">
      <span className="text-gray-500 border-r border-[#57C4FF] pr-2 h-[1.2em] flex items-center">
        Standards
      </span>

      <div className="flex items-baseline flex-grow max-w-[200px] relative">
        <select
          value={standardFilter || ""}
          onChange={(e) => setStandardFilter(e.target.value || null)}
          className="w-full px-2 pl-5 bg-transparent appearance-none focus:outline-none cursor-pointer hover:text-[#57C4FF] transition-all duration-200"
        >
          <option className="" value="">
            All
          </option>
          {allStandards.map((standard) => (
            <option key={standard} value={standard}>
              {standard}
            </option>
          ))}
        </select>
        <div className="absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {standardFilter && (
        <button
          onClick={() => setStandardFilter(null)}
          className="px-2 text-red-500 text-xs whitespace-nowrap"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}