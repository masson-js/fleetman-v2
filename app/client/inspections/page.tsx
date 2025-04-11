import { Suspense } from "react";
import Header from "@/app/components/Header";
import { LoadingPlaceholder } from "@/app/components/PageLoading";
import { getAllUserShips } from "@/actions/ship";
import { getAllInspections } from "@/actions/inspection";
import InformationBar from "./components/InspectionsInformationBar";
import { Inspection } from "@/types";
import ClientViewSwitcher from "./components/Switcher";

async function InspectionPage() {
  try {
    const inspectionsData: Inspection[] = (await getAllInspections()) || [];
    const userShips = (await getAllUserShips()) || [];

    return (
      <div className="bg-blue-50 flex flex-col w-full">
        <Header />
        <div className="flex flex-col w-4/6 mx-auto">
          <InformationBar inspectionsData={inspectionsData} />
          <ClientViewSwitcher
            userShips={userShips}
            inspectionsData={inspectionsData}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to render InspectionPage:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}

export default function PreloadInspectionPage() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <InspectionPage />
    </Suspense>
  );
}
