import { Suspense } from "react";
import Header from "@/app/components/Header";
import NewShipAddForm from "../templates/Ship";
import { LoadingPlaceholder } from "@/app/components/PageLoading";

async function FormPage() {
  return (
    <div className="bg-blue-50 flex flex-col w-full">
      <Header />
      <div className="flex flex-row flex-wrap  w-4/6 mx-auto h-auto justify-center mt-4 mb-12 ">
        <NewShipAddForm />
      </div>
    </div>
  );
}

export default async function ShipDataCreating() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <FormPage />
    </Suspense>
  );
}
