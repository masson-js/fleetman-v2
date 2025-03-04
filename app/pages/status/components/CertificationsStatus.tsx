"use client";

interface Certificate {
  id: string;
  shipId: string;
  type: string;
  issuedDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
  standard: string;
  complianceLevel: string;
  verificationDate: Date;
  certificateNumber: string;
  inspectionRequirements: string | null;
  nextInspectionDate: Date | null;
  inspectorName: string | null;
  certificationCompany: string | null;
  remarks: string | null;
}

interface CertificatesProps {
  certificates: Certificate[];
}

export default function CertificatesStatus({ certificates = [] }: CertificatesProps) {
  const totalCertificates = certificates.length;

  const standardsCount = certificates.reduce((acc, cert) => {
    acc[cert.standard] = (acc[cert.standard] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const currentYearCertificates = certificates.filter(
    (cert) => new Date(cert.issuedDate).getFullYear() === currentYear
  );
  const lastYearCertificates = certificates.filter(
    (cert) => new Date(cert.issuedDate).getFullYear() === lastYear
  );

  return (
    <div className="p-6 ">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl hover:bg-[#57C4FF] text-black hover:text-white hover:shadow-xl hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4">Certificates</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-xs gap-8 ">
            <span className="text-blue-600">Total</span>
            <span className="font-semibold text-blue-800">{totalCertificates}</span>
          </div>

          {Object.keys(standardsCount).map((standard) => (
            <div key={standard} className="flex items-center justify-between p-2 bg-green-100 rounded-md text-xs gap-6">
              <span className="text-green-600">{standard}</span>
              <span className="font-semibold text-green-800">{standardsCount[standard]}</span>
            </div>
          ))}

          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-xs gap-6">
            <span className="text-blue-600">Crt-{currentYear}</span>
            <span className="font-semibold text-blue-800">
              {currentYearCertificates.length}
            </span>
          </div>

          {lastYearCertificates.length > 0 && (
            <div className="flex items-center justify-between p-2 bg-yellow-100 rounded-md text-xs gap-6">
              <span className="text-yellow-600">Crt-{lastYear}</span>
              <span className="font-semibold text-yellow-800">
                {lastYearCertificates.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
