import { getAllCertifications } from "@/actions"; // Замените на нужную функцию для получения сертификатов
import { CertificationEnhancedButton } from "../buttons"; // Возможно, нужно будет создать аналогичную кнопку для сертификатов

export default async function CertificationList() {
  const certifications = await getAllCertifications();

  return (
    <div className="m-6 flex w-auto h-auto items-start">
      <table className="table-auto border border-gray-300 rounded-lg overflow-hidden w-full">
        <thead>
          <tr className="items-center">
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tl-lg w-36">
              Ship
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Authority
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">Issued Date</th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">Type</th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Number
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-28">
              Level
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center w-36">
              Verification
            </th>
            <th className="text-sm px-4 py-1 bg-gray-300 text-center rounded-tr-lg w-28">
              Next Ins.
            </th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((certification) => (
            <tr
              className="text-center hover:bg-slate-600 hover:text-white"
              key={certification.id}
            >
              <td className="px-4 py-2 text-sm">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {certification.ship.name}
                </CertificationEnhancedButton>
              </td>
              <td className="px-4 py-2 text-ls">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {certification.issuingAuthority}
                </CertificationEnhancedButton>
              </td>
              <td className="px-4 py-2 text-sm">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {new Date(certification.issuedDate).toLocaleDateString("en-US")}
                </CertificationEnhancedButton>
              </td>
              <td className="px-4 py-2 text-sm">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {certification.type}
                </CertificationEnhancedButton>
              </td>
              <td className="px-4 py-2 text-sm">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {certification.certificateNumber}
                </CertificationEnhancedButton>
              </td>
              <td className="px-4 py-2 text-sm">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {certification.complianceLevel}
                </CertificationEnhancedButton>
              </td>
              <td className="px-4 py-2 text-sm">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {new Date(certification.verificationDate).toLocaleDateString("en-US")}
                </CertificationEnhancedButton>
              </td>
              <td className="px-4 py-2 text-sm">
                <CertificationEnhancedButton certificationId={certification.id}>
                  {certification.nextInspectionDate
                    ? new Date(certification.nextInspectionDate).toLocaleDateString("en-US")
                    : "N/A"}
                </CertificationEnhancedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}