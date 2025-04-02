import Header from "@/app/components/Header";
import { LoadingPlaceholder } from "@/app/components/PageLoading";
import { Suspense } from "react";

import { getAllInspections } from "@/actions/inspection";
import { getAllUserShips } from "@/actions/ship";

import InformationBar from "./components/InspectionsInformationBar";
import CompilianceBar from "./components/CompilianceBar";
import TilesShips from "./components/TilesShips";

// Inspections page

async function InspectionPage() {
  try {
    const inspectionsData = (await getAllInspections()) || [];
    const userShips = (await getAllUserShips()) || [];

    return (
      <div className="bg-blue-50 flex flex-col w-full">
        <Header />
        <div className="flex flex-col animate-fade-in  w-4/6 mx-auto">
          <InformationBar inspectionsData={inspectionsData} />
          <CompilianceBar inspectionsData={inspectionsData} />
          <TilesShips userShips={userShips} inspectionsData={inspectionsData}/>
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
