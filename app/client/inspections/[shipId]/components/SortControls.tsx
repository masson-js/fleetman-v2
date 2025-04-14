"use client";

import { useState } from "react";

interface SortControlsProps {
  onSortChange: (key: string, direction: "ascending" | "descending") => void;
  currentSort: {
    key: string;
    direction: "ascending" | "descending";
  };
}

export default function SortControls({ onSortChange, currentSort }: SortControlsProps) {
  const sortableFields = [
    { key: "inspectionDate", label: "Date" },
    { key: "inspectorName", label: "Inspector" },
    { key: "inspectionType", label: "Type" },
    { key: "complianceStandards", label: "Standards" },
    { key: "duration", label: "Duration" },
    { key: "verificationStatus", label: "Status" },
    { key: "isEUCompliance", label: "EU Compliant" },
  ];

  const handleSortClick = (key: string) => {
    const newDirection = 
      currentSort.key === key && currentSort.direction === "ascending" 
        ? "descending" 
        : "ascending";
    onSortChange(key, newDirection);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {sortableFields.map((field) => (
        <button
          key={field.key}
          onClick={() => handleSortClick(field.key)}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            currentSort.key === field.key
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {field.label}
          {currentSort.key === field.key && (
            <span className="ml-1">
              {currentSort.direction === "ascending" ? "↑" : "↓"}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}