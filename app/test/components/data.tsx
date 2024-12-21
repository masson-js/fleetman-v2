'use client'
import { useEffect, useState } from "react";
import { getTotalArraysCount } from "@/actions/counts";
import WaveIcon from "@/app/components/waveicon";

export default function StatusData() {
  const [counts, setCounts] = useState<{
    certificationsCount: number;
    fuelRecordsCount: number;
    routesCount: number;
    inspectionsCount: number;
    fixturesCount: number;
    crewCount: number;
    logbooksCount: number;
    shipsCount: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalArraysCount();
        setCounts(data);
      } catch (error: any) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-auto h-50">
       <WaveIcon/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    );
  }


  if (!counts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">Data is unavailable</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-40 h-auto">
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Ships:</h2>
        <h2 className="text-lg font-semibold">{counts.shipsCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Inspections:</h2>
        <h2 className="text-lg font-semibold">{counts.inspectionsCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Certifications:</h2>
        <h2 className="text-lg font-semibold">{counts.certificationsCount}</h2>
      </div>
      <div className="flex flex-row items-center flex-wrap gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Crew members:</h2>
        <h2 className="text-lg font-semibold">{counts.crewCount}</h2>
      </div>
      <div className="flex flex-row gap-1 mt-6 ml-3 items-center">
        <h2 className="text-sm font-thin">Fixtures:</h2>
        <h2 className="text-lg font-semibold">{counts.fixturesCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Logbooks:</h2>
        <h2 className="text-lg font-semibold">{counts.logbooksCount}</h2>
      </div>
      <div className="flex flex-row items-center gap-1 mt-6 ml-3">
        <h2 className="text-sm font-thin">Routes:</h2>
        <h2 className="text-lg font-semibold">{counts.routesCount}</h2>
      </div>
    </div>
  );
}
