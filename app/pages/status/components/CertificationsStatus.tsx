"use client";

import { ClipboardCheck, ClipboardX, Ship } from "lucide-react";

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
  inspectorName: string | null;  // Может быть null
  certificationCompany: string | null;  // Может быть null
  remarks: string | null;  // Может быть null
}

interface CertificatesProps {
  certificates: Certificate[]; // Это может быть пустой массив
}

export default function CertificatesStatus({ certificates = [] }: CertificatesProps) {
  const totalCertificates = certificates.length;

  // Подсчитываем количество сертификатов по каждому стандарту
  const standardsCount = certificates.reduce((acc, cert) => {
    acc[cert.standard] = (acc[cert.standard] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Получаем текущий год и прошлый
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  // Фильтруем сертификаты по годам
  const currentYearCertificates = certificates.filter(
    (cert) => new Date(cert.issuedDate).getFullYear() === currentYear
  );
  const lastYearCertificates = certificates.filter(
    (cert) => new Date(cert.issuedDate).getFullYear() === lastYear
  );

  return (
    <div className="p-6 bg-blue-50">
      {/* Summary Container */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl hover:bg-[#57C4FF] hover:shadow-xl hover:cursor-pointer  transform transition-all duration-300 ">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Certificates</h2>
        <div className="space-y-3">
          {/* Total Certificates */}
          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-sm">
            <span className="flex items-center gap-2 text-blue-600">
              <Ship size={20} />
              Total
            </span>
            <span className="font-semibold text-blue-800">{totalCertificates}</span>
          </div>

         
          {Object.keys(standardsCount).map((standard) => (
            <div key={standard} className="flex items-center justify-between p-2 bg-green-100 rounded-md text-sm">
              <span className="flex items-center gap-2 text-green-600">
                <ClipboardCheck size={20} />
                {standard}
              </span>
              <span className="font-semibold text-green-800">{standardsCount[standard]}</span>
            </div>
          ))}

      
          <div className="flex items-center justify-between p-2 bg-blue-100 rounded-md text-sm gap-4">
            <span className="flex items-center gap-2 text-blue-600">
              <ClipboardCheck size={20} />
              Certs in {currentYear}
            </span>
            <span className="font-semibold text-blue-800">
              {currentYearCertificates.length}
            </span>
          </div>

         
          {lastYearCertificates.length > 0 && (
            <div className="flex items-center justify-between p-2 bg-yellow-100 rounded-md text-sm">
              <span className="flex items-center gap-2 text-yellow-600">
                <ClipboardX size={20} />
                Certs in {lastYear}
              </span>
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
