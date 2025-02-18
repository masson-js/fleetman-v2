import { getCertificationById } from "@/actions/certification";
import Header from "@/app/components/Header";
import {
  Anchor,
  Calendar,
  ClipboardCheck,
  ShieldCheck,
  User,
} from "lucide-react";

// Types
type ComplianceStatus = {
  color: string;
  bg: string;
  border: string;
  label: string;
};

interface CertificationMetadataProps {
  label: string;
  value: string | React.ReactNode;
  icon: React.ElementType;
  className?: string;
}

// Components
const CertificationMetadata = ({
  label,
  value,
  icon: Icon,
  className = '',
}: CertificationMetadataProps) => (
  <div className="flex items-center gap-3 text-gray-600">
    <Icon className="w-5 h-5" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-medium ${className}`}>{value}</p>
    </div>
  </div>
);

// Utility functions
const getComplianceStatus = (level: string): ComplianceStatus => {
  const styles = {
    full: {
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      label: "Full",
    },
    temporary: {
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      label: "Temporary",
    },
    limited: {
      color: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      label: "Limited",
    },
  };
  return styles[level as keyof typeof styles] || styles.limited;
};

// Main component
export default async function ShipCertificationPage({
  params,
}: {
  params: { id: string };
}) {
  const certification = await getCertificationById(params.id);

  if (!certification) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Certification not found</div>
      </div>
    );
  }

  const status = getComplianceStatus(certification.complianceLevel);
  const isExpired = new Date(certification.expiryDate) < new Date();
  const bgColor = isExpired ? "bg-red-50 border-red-400" : "bg-green-50 border-green-400";

  return (
    <>
      <Header />
      <div className={`rounded-xl shadow-sm border border-gray-200 w-full max-w-4xl mx-auto mt-8 ${bgColor}`}>
        <div className="p-6">
          {/* Ship Information Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {certification.ship.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {certification.ship.type}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Anchor className="w-4 h-4" />
                  <span className="text-sm">IMO: {certification.ship.imoNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {isExpired && (
                <span className="text-red-600 text-lg font-bold">
                  Certificate Expired
                </span>
              )}
            </div>
          </div>

          {/* Certification Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <CertificationMetadata
              label="Issue Date"
              value={new Date(certification.issuedDate).toLocaleDateString()}
              icon={Calendar}
            />
            <CertificationMetadata
              label="Expiry Date"
              value={new Date(certification.expiryDate).toLocaleDateString()}
              icon={Calendar}
            />
            <CertificationMetadata
              label="Inspector"
              value={certification.inspectorName || "N/A"}
              icon={User}
            />
            <CertificationMetadata
              label="Authority"
              value={certification.issuingAuthority}
              icon={ShieldCheck}
            />
            <CertificationMetadata
              label="Certificate Number"
              value={certification.certificateNumber}
              icon={ClipboardCheck}
            />
            <CertificationMetadata
              label="Standard"
              value={certification.standard}
              icon={ShieldCheck}
            />
            <CertificationMetadata
              label="Type"
              value={certification.type}
              icon={ClipboardCheck}
              className="uppercase"
            />
            <CertificationMetadata
              label="Verification Date"
              value={new Date(certification.verificationDate).toLocaleDateString()}
              icon={Calendar}
            />
            {certification.nextInspectionDate && (
              <CertificationMetadata
                label="Next Inspection"
                value={new Date(certification.nextInspectionDate).toLocaleDateString()}
                icon={Calendar}
              />
            )}
            {certification.inspectionRequirements && (
              <CertificationMetadata
                label="Inspection Requirements"
                value={certification.inspectionRequirements}
                icon={ClipboardCheck}
              />
            )}
            {certification.certificationCompany && (
              <CertificationMetadata
                label="Certification Company"
                value={certification.certificationCompany}
                icon={ShieldCheck}
              />
            )}
          </div>

          {/* Remarks Section */}
          {certification.remarks && (
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Remarks:</span>{" "}
                {certification.remarks}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}