import { getAllCertifications } from "@/actions/certification";
import { getAllUserShips } from "@/actions/ship";
import Link from "next/link";
import { FileText, Calendar, User, ShieldCheck, ClipboardCheck, Anchor, ChevronRight } from "lucide-react";

export default async function ShipCardCertification() {
  const certifications = (await getAllCertifications()) || [];
  const userShips = (await getAllUserShips()) || [];

  // Функция для получения цвета бордера и фона сертификата
  const getBorderColor = (status: string): string => {
    switch (status) {
      case "expired":
        return "border-red-400 bg-red-50 hover:bg-red-100";
      case "valid":
        return "border-green-400 bg-green-50 hover:bg-green-100";
      case "soon-expired":
        return "border-yellow-400 bg-yellow-50 hover:bg-yellow-100";
      default:
        return "border-blue-400 bg-blue-50";
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "expired":
        return "text-red-700 bg-red-100 border-red-200";
      case "valid":
        return "text-green-700 bg-green-100 border-green-200";
      case "soon-expired":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      default:
        return "text-blue-700 bg-blue-100 border-blue-200";
    }
  };

  // Функция для определения статуса сертификата
  const getCertificateStatus = (expiryDate: Date): string => {
    const now = new Date();
    const timeDifference = expiryDate.getTime() - now.getTime();
    const daysLeft = timeDifference / (1000 * 3600 * 24); // Разница в днях

    if (daysLeft < 0) {
      return "expired";
    } else if (daysLeft <= 30) {
      return "soon-expired";
    } else {
      return "valid";
    }
  };

  return (
    <section className="flex flex-col w-auto justify-start max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">Certifications</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {userShips.map((ship) => {
          const shipCertifications = certifications
            .filter((certification) => certification.shipId === ship.id)
            .sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()); // Сортировка по дате

          return (
            <div
              key={ship.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link href={`/status/${ship.id}`}>
                      <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                        {ship.name}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {ship.type}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Anchor className="w-4 h-4" />
                        <span className="text-sm">IMO: {ship.imoNumber}</span>
                      </div>
                    </div>
                  </div>
                  {shipCertifications.length > 0 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {shipCertifications.length} certifications
                    </span>
                  )}
                </div>

                {shipCertifications.length === 0 ? (
                  <p className="text-gray-500 italic mt-4 text-center py-6 bg-gray-50 rounded-lg">
                    No certifications available for this ship
                  </p>
                ) : (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Last 10 Certifications
                    </h3>
                    <div className="space-y-2">
                      {shipCertifications.slice(0, 10).map((certification) => {
                        const status = getCertificateStatus(certification.expiryDate);

                        return (
                          <Link
                            key={certification.id}
                            href={`/certifications/${certification.id}`}
                            className={`block rounded-lg ${getBorderColor(status)} border p-4 hover:shadow-sm transition-shadow`}
                          >
                            <div className="flex flex-col space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <ClipboardCheck className="w-5 h-5 text-gray-500" />
                                  <span className="text-sm font-semibold text-gray-800">
                                    {certification.type} ({certification.standard})
                                  </span>
                                </div>
                                <span
                                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}
                                >
                                  {status === "expired" ? "Expired" : "Valid"}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span>Issued: {new Date(certification.issuedDate).toLocaleDateString("en-US")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span>Expiry: {new Date(certification.expiryDate).toLocaleDateString("en-US")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-500" />
                                  <span>Inspector: {certification.inspectorName || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-4 h-4 text-gray-500" />
                                  <span>Authority: {certification.issuingAuthority}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <ClipboardCheck className="w-4 h-4 text-gray-500" />
                                  <span>Certificate No: {certification.certificateNumber}</span>
                                </div>
                                {certification.nextInspectionDate && (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span>Next Inspection: {new Date(certification.nextInspectionDate).toLocaleDateString("en-US")}</span>
                                  </div>
                                )}
                              </div>

                              {certification.remarks && (
                                <p className="text-xs text-gray-500 italic mt-2 border-t pt-2">
                                  Remarks: {certification.remarks}
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {shipCertifications.length > 10 && (
                      <div className="mt-4 flex justify-end">
                        <Link
                          href={`/ships/${ship.id}/certifications`}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <span>Show all certifications</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
