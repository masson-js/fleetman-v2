"use client";

import Link from "next/link";

interface StatusListProps {
  shipCount: number;
  inspectionsCount: number;
  certificationCount: number;
  fixturesCount: number;
  totalProfit: number;
  totalLogbooks: number;
  totalFuelRecords: number;
  totalRoutes: number;
}

export default function GlobalStatus({
  shipCount,
  inspectionsCount,
  certificationCount,
  fixturesCount,
  totalProfit,
  totalLogbooks,
  totalFuelRecords,
  totalRoutes,
}: StatusListProps) {
  const isLoading = [
    shipCount,
    inspectionsCount,
    certificationCount,
    fixturesCount,
    totalProfit,
    totalLogbooks,
    totalFuelRecords,
    totalRoutes,
  ].some((value) => value === undefined);

  const formatNumber = (totalProfit: number) => {
    if (totalProfit >= 1_000_000) {
      return {
        value: (totalProfit / 1_000_000).toFixed(2),
        suffix: "M",
      };
    } else if (totalProfit >= 1000) {
      return {
        value: (totalProfit / 1000).toFixed(0),
        suffix: "K",
      };
    } else {
      return {
        value: totalProfit.toFixed(2),
        suffix: "",
      };
    }
  };

  const formattedProfit = formatNumber(totalProfit || 0);

  if (isLoading) {
    return (
      <div className="flex flex-row justify-between flex-wrap mt-24 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col justify-center p-2 w-auto h-auto bg-gradient-to-b from-[#57C4FF] to-[#57C4FF] rounded-s-lg transform transition-all">
          <div className="flex flex-wrap gap-2 justify-center w-auto">
            <span className="text-xl font-mono text-white">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between flex-wrap mt-24 bg-white rounded-lg shadow-lg ">
      <div className="flex flex-col justify-center p-2 w-auto h-auto bg-gradient-to-b from-[#57C4FF] to-[#57C4FF] rounded-s-lg transform transition-all">
        <div className="flex flex-wrap gap-2 justify-center w-auto">
          <h2 className="text-sm font-extralight text-white">Total Profit</h2>
        </div>
        <div className="flex gap-1">
          <span className="text-2xl font-mono text-white">
            ${formattedProfit.value}
          </span>
          <span className="text-2xl font-thin text-white">
            {formattedProfit.suffix}
          </span>
        </div>
      </div>
      <Link href="/client/ships">
        <div className="flex flex-col justify-between p-4 w-auto h-auto cursor-pointer hover:bg-gray-100 transform transition-all duration-300">
          <div className="flex items-center gap-2">
            <h2 className="font-thin text-center text-xs border-b-2 w-20 border-[#57C4FF] ">
              Ships
            </h2>
          </div>
          <span className="text-xl font-thin text-center">{shipCount}</span>
        </div>
      </Link>

      <Link href="/client/fixtures">
        <div className="flex flex-col justify-between p-4 w-auto h-auto cursor-pointer hover:bg-gray-100 transform transition-all duration-300">
          <div className="flex items-center flex-wrap gap-2">
            <h2 className="text-xs font-thin text-center border-b-2 w-20 border-[#e81416]">
              Charters
            </h2>
          </div>
          <span className="text-xl font-thin text-center">{fixturesCount}</span>
        </div>
      </Link>

      <Link href="/client/inspections">
        <div className="flex flex-col justify-between p-4 w-auto h-auto cursor-pointer hover:bg-gray-100 transform transition-all duration-300">
          <div className="flex items-center flex-wrap gap-2">
            <h2 className="text-xs font-thin text-center border-b-2 w-20 border-[#ffa500]">
              Inspections
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {inspectionsCount}
          </span>
        </div>
      </Link>

      <Link href="/client/certifications">
        <div className="flex flex-col justify-between p-4 w-auto h-auto cursor-pointer hover:bg-gray-100 transform transition-all duration-300">
          <div className="flex justify-center w-full">
            <h2 className="text-xs font-thin text-center border-b-2 w-20 border-[#79c314]">
              Certifications
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {certificationCount}
          </span>
        </div>
      </Link>

      <Link href="/client/fuelrecords">
        <div className="flex flex-col justify-between p-4 w-auto h-auto cursor-pointer hover:bg-gray-100 transform transition-all duration-300">
          <div className="flex items-center flex-wrap gap-2">
            <h2 className="text-xs font-mono text-center border-b-2 w-20 border-[#4b369d]">
              Fuel Rec.
            </h2>
          </div>
          <span className="text-xl font-thin text-center">
            {totalFuelRecords}
          </span>
        </div>
      </Link>

      <Link href="/client/routes">
        <div className="flex flex-col justify-between p-4 w-auto h-auto cursor-pointer hover:bg-gray-100 transform transition-all duration-300">
          <div className="flex items-center flex-wrap gap-2">
            <h2 className="text-xs font-thin text-center border-b-2 w-20 border-[#4400ff]">
              Routes
            </h2>
          </div>
          <span className="text-xl font-thin text-center">{totalRoutes}</span>
        </div>
      </Link>
      <Link href="/client/logbooks">
        <div className="flex flex-col justify-between p-4 w-auto h-auto cursor-pointer hover:bg-gray-100 transform transition-all duration-300">
          <div className="flex items-center flex-wrap gap-2">
            <h2 className="text-xs font-thin text-center border-b-2 w-20 border-[#2a0e0e]">
              Logbooks
            </h2>
          </div>
          <span className="text-xl font-thin text-center">{totalLogbooks}</span>
        </div>
      </Link>
    </div>
  );
}
