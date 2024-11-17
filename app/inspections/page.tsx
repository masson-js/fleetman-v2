import { getAllInspections, getAllUserShips } from "@/actions";
import { AddInspection } from "../components/buttons";
import Header from "../components/header";
import SideNavigation from "../components/sidenavigation";

export default async function Inspections() {
  const inspections = await getAllInspections();
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex w-auto h-auto m-6 flex-row">
        <SideNavigation />
        <div className="flex flex-wrap m-6 w-auto h-auto">
  {inspections.map((inspection) => (
    <div key={inspection.id} className="bg-white rounded-lg shadow-lg p-6 m-4 w-80">
      {/* Card Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Inspection #{inspection.id}</h2>
      
      {/* Ship Name */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">Ship Name:</span> {inspection.ship.name}
      </p>

      {/* Inspector Name */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">Inspector:</span> {inspection.inspectorName}
      </p>

      {/* Inspection Date */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">Date:</span> {new Date(inspection.inspectionDate).toLocaleDateString()}
      </p>

      {/* Inspection Type */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">Type:</span> {inspection.inspectionType}
      </p>

      {/* Inspection Results */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">Results:</span> {inspection.results}
      </p>

      {/* Recommendations */}
      {inspection.recommendations && (
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-bold">Recommendations:</span> {inspection.recommendations}
        </p>
      )}

      {/* Next Inspection Date */}
      {inspection.nextInspectionDate && (
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-bold">Next Inspection Date:</span> {new Date(inspection.nextInspectionDate).toLocaleDateString()}
        </p>
      )}

      {/* Compliance Standards */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">Compliance Standards:</span> {inspection.complianceStandards}
      </p>

      {/* Deficiencies Found */}
      {inspection.deficienciesFound && (
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-bold">Deficiencies Found:</span> {inspection.deficienciesFound}
        </p>
      )}

      {/* Corrective Actions */}
      {inspection.correctiveActions && (
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-bold">Corrective Actions:</span> {inspection.correctiveActions}
        </p>
      )}

      {/* Verification Status */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">Verification Status:</span> {inspection.verificationStatus}
      </p>

      {/* Duration */}
      {inspection.duration && (
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-bold">Duration:</span> {inspection.duration} hours
        </p>
      )}

      {/* EU Compliance */}
      <p className="text-lg text-gray-600 mb-2">
        <span className="font-bold">EU Compliance:</span> {inspection.isEUCompliance ? "Yes" : "No"}
      </p>
    </div>
  ))}
</div>
        <AddInspection />
      </div>
    </div>
  );
}
