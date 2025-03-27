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
    <div className="">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border-2 border-solid h-80 border-white hover:border-[#57C4FF] hover:border-2 hover:border-solid text-black  hover:cursor-pointer transform transition-all duration-300">
        <h2 className="text-sm font-semibold mb-4 border-b-2 border-[#79c314]">Certificates</h2>
        <div className="space-y-3    ">
          

          {Object.keys(standardsCount).map((standard) => (
            <div key={standard} className="flex items-center justify-between p-2  rounded-md text-xs gap-6">
              <span className="">{standard}</span>
              <span className="font-semibold ">{standardsCount[standard]}</span>
            </div>
          ))}

          <div className="flex items-center justify-between p-2  rounded-md text-xs gap-6">
            <span className="">Crt-{currentYear}</span>
            <span className="font-semibold ">
              {currentYearCertificates.length}
            </span>
          </div>

          {lastYearCertificates.length > 0 && (
            <div className="flex items-center justify-between p-2  rounded-md text-xs gap-6">
              <span className="">Crt-{lastYear}</span>
              <span className="font-semibold ">
                {lastYearCertificates.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
