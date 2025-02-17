
import ShipCertificationStats from "./shipCertificationStats";
import { getAllCertifications } from '@/actions/certification';
import CertificationStandardsAndTypes from "./standarts";




export default async function CertificationData() {

  const certifications = await getAllCertifications();

  return (
    <div className="flex flex-col w-80 h-auto gap-4 p-4 bg-white rounded-lg shadow-sm mt-14">
      {/* Certifications Overview */}
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold text-gray-800">Overview</h2>
        <p className="text-sm text-gray-600">
          Total Certifications: 
        </p>
      </div>

      <ShipCertificationStats />
      <CertificationStandardsAndTypes/>

    </div>
  );
}
