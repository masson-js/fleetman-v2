import { getInspectionById } from "@/actions/inspection";
import { DeleteInspection } from "@/app/components/buttons";

import Header from "@/app/components/header";

import WaveIcon from "@/app/components/waveicon";
import Link from "next/link";

export default async function InspectionEnhanced({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const inspectionID = (await params).id;

  const inspection = await getInspectionById(inspectionID);

  if (!inspection) {
    return (
      <div className="flex content-center">
        <WaveIcon />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row justify-start mb-20">
        <div className="flex w-auto h-auto justify-start ml-20">
          <div className="flex gap-4 h-auto">
            <div className="flex flex-col items-center h-auto">
              <Link href={`/status/${inspection.ship.id}`}>
                <h1 className="mx-6 mt-6 text-3xl font-bold italic opacity-85 w-auto hover:underline text-gray-800">
                  {inspection.ship.name}
                </h1>
              </Link>
              <div className="flex flex-col w-60 h-6 mt-6">
                <img className="flex rounded-full" src="/inspect.webp" />
              </div>
            </div>
            <div className="flex flex-col ml-6 h-auto">
              <div className="flex flex-col mt-6 border-l-4 border-blue-400 pl-6 h-auto">
                <div className="flex flex-col pb-2 border-b-2 border-gray-400 gap-4">
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Result:</span>
                    <span
                      className={`text-sm font-bold p-1 ml-2 rounded-full ${
                        inspection.verificationStatus === "passed"
                          ? "bg-green-500 text-white"
                          : inspection.verificationStatus === "requires-work"
                          ? "bg-yellow-500 text-white"
                          : inspection.verificationStatus === "failed"
                          ? "bg-red-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {inspection.verificationStatus}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Type:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.inspectionType}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Standard:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.complianceStandards}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Inspector:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.inspectorName}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Inspection date:</span>
                    <span className="text-sm font-bold ml-2">
                      {new Date(inspection.inspectionDate).toLocaleDateString(
                        "en-US", {
                          day: "2-digit", // Форматирование дня с 2 цифрами
                          month: "2-digit", // Форматирование месяца с 2 цифрами
                          year: "numeric" // Год
                      })}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Next inspection date:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.nextInspectionDate
                        ? new Date(inspection.nextInspectionDate).toLocaleDateString("en-US")
                        : "N/A"}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Report Link:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.inspectionReport
                        ? inspection.inspectionReport
                        : "N/A"}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Recommendations:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.recommendations
                        ? inspection.recommendations
                        : "N/A"}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Deficiencies found:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.deficienciesFound
                        ? inspection.deficienciesFound
                        : "N/A"}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Corrective actions:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.correctiveActions
                        ? inspection.correctiveActions
                        : "N/A"}
                    </span>
                  </p>

                  <p className="text-sm mb-2">
                    <span className="font-semibold">Duration:</span>
                    <span className="text-sm font-bold ml-2">
                      {inspection.duration} min.
                    </span>
                  </p>

                  <p className="text-sm mb-4 flex flex-row">
                    <span className="font-semibold">EU Standards Complied:</span>
                    <span className="ml-2 text-sm font-bold">
                      {inspection.isEUCompliance ? (
                        <span className="bg-green-600 rounded-full w-6 h-6 flex items-center justify-center text-white">
                          Y
                        </span>
                      ) : (
                        <span className="bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white">
                          N
                        </span>
                      )}
                    </span>
                  </p>
                </div>

                <DeleteInspection inspectionId={inspection.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
