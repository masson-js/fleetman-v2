"use client";

import React from "react";

interface FuelRecord {
  id: string;
  shipId: string;
  date: Date;
  refuelDate?: Date | null;
  fuelType: string;
  amount: number;
  price: number;
  totalCost: number;
}

interface FuelRecordsTableProps {
  fuelRecords: FuelRecord[];
}

export default function ShipFuelRecords({
  fuelRecords,
}: FuelRecordsTableProps) {
  return (
    <div className="flex animate-fade-in flex-col bg-white w-4/6 mx-auto mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800 border-b-2 border-[#4b369d]">Fuel Records</h2>
      </div>
      {fuelRecords && fuelRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-white text-black text-xs border-b-4 border-[#57c4ff5b]">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Fuel Type</th>
                <th className="p-3 text-left">Amount (tons)</th>
                <th className="p-3 text-left">Total Cost (USD)</th>
              </tr>
            </thead>
            <tbody>
              {fuelRecords.map((record, index) => (
                <tr
                  key={record.id}
                  className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                    index === fuelRecords.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  <td className="p-3 text-xs whitespace-nowrap">
                    {new Date(record.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {record.fuelType}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {record.amount}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {record.totalCost.toLocaleString()} USD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No fuel records available.</p>
        </div>
      )}
    </div>
  );
}
