import { Suspense } from "react";

import Header from "@/app/components/Header";
import { LoadingPlaceholder } from "@/app/components/PageLoading";

import { getAllUserShips } from "@/actions/ship";
import { getAllInspections } from "@/actions/inspection";

import TilesShips from "./components/TilesShips";
import InformationBar from "./components/InspectionsInformationBar";
import { Inspection } from "@/types";
import Analitics from "./components/analytics";
import AnalyticsDashboard from "./components/analytics";


// Inspections page

async function InspectionPage() {
  try {
    const inspectionsData: Inspection[] = (await getAllInspections()) || [];
    const userShips = (await getAllUserShips()) || [];

    return (
      <div className="bg-blue-50 flex flex-col w-full">
        <Header />
        <div className="flex flex-col animate-fade-in  w-4/6 mx-auto">
          <InformationBar inspectionsData={inspectionsData} />
          <TilesShips userShips={userShips} inspectionsData={inspectionsData} />
          <AnalyticsDashboard inspectionsData={inspectionsData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to render InspectionPage:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}

// Preloader

export default function PreloadInspectionPage() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <InspectionPage />
    </Suspense>
  );
}
