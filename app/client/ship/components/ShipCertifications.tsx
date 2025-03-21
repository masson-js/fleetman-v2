"use client";

import { UniversalRouterButton } from "@/app/components/buttons";

interface Certification {
  id: string;
  shipId: string;
  type: string;
  issuedDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
  standard: string;
  complianceLevel?: string;
  verificationDate?: Date;
  certificateNumber?: string;
  inspectionRequirements?: string | null;
  nextInspectionDate?: Date | null;
  inspectorName?: string | null;
  certificationCompany?: string | null;
  remarks?: string | null;
}

interface ShipCertificationsProps {
  certifications: Certification[];
}

export default function ShipCertifications({ certifications }: ShipCertificationsProps) {
  return (
    <div className="flex animate-fade-in flex-col bg-white w-4/6 mx-auto mt-6 p-6 rounded-lg shadow-md text-black hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-800">Certifications</h2>
      </div>
      {certifications && certifications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-white text-black text-xs border-b-4 border-[#57c4ff5b]">
              <tr>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Issued Date</th>
                <th className="p-3 text-left">Expiry Date</th>
                <th className="p-3 text-left">Issuing Authority</th>
                <th className="p-3 text-left">Standard</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((certificate, index) => (
                <tr
                  key={certificate.id}
                  className={`cursor-pointer transition-colors duration-300 hover:bg-[#57C4FF] hover:text-white ${
                    index === certifications.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  <td className="p-3 text-xs whitespace-nowrap uppercase">
                    <UniversalRouterButton pathRoute="certifications" pathSlug={certificate.id}>
                      {certificate.type}
                    </UniversalRouterButton>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    {new Date(certificate.issuedDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">
                    <span className={`$ {
                      new Date(certificate.expiryDate) < new Date()
                        ? "text-red-600"
                        : "text-green-600"
                    }`}>
                      {new Date(certificate.expiryDate).toLocaleDateString("en-GB")}
                    </span>
                  </td>
                  <td className="p-3 text-xs whitespace-nowrap">{certificate.issuingAuthority}</td>
                  <td className="p-3 text-xs whitespace-nowrap">{certificate.standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p className="text-xs">No certifications available.</p>
        </div>
      )}
    </div>
  );
}