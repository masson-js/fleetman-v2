import { getAllCertifications } from '@/actions/certification'; // Укажите правильный путь

interface Certification {
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
  inspectionRequirements?: string | null; // Разрешаем null
  nextInspectionDate?: Date | null; // Разрешаем null
  inspectorName?: string | null; // Разрешаем null
  certificationCompany?: string | null; // Разрешаем null
  remarks?: string | null; // Разрешаем null
  ship: {
    id: string;
    type: string;
    userId: string | null;
    name: string;
    length: number;
    flag: string;
    imoNumber: string;
    mmsi: string;
    callsign: string;
    deadweight: number;
    beam: number;
    width: number;
    yearBuilt: number;
    currentStatus: string;
    portOfRegistry: string;
    ecoStandard: string;
  };
}

interface ExpiryStatus {
  active: number;
  expiringSoon: number;
  expired: number;
}

const CertificationExpiryStatus: React.FC = async () => {
  // Получаем данные о сертификатах
  const certifications = await getAllCertifications();

  // Функция для расчета статуса сертификатов
  const calculateExpiryStatus = (certifications: Certification[]): ExpiryStatus => {
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + 30); // 30 дней для "истекающих"

    let active = 0;
    let expiringSoon = 0;
    let expired = 0;

    certifications.forEach((cert) => {
      const expiryDate = new Date(cert.expiryDate);

      if (expiryDate > now) {
        if (expiryDate <= soon) {
          expiringSoon++;
        } else {
          active++;
        }
      } else {
        expired++;
      }
    });

    return { active, expiringSoon, expired };
  };

  const expiryStatus = calculateExpiryStatus(certifications);

  return (
    <div className="border-b pb-4">
      <h2 className="text-sm font-semibold mb-3">Сроки действия сертификатов</h2>
      <div className="flex flex-col gap-3">
        {/* Активные */}
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm text-gray-600">Активные</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white bg-green-500 px-2 py-1 rounded-lg">
                {expiryStatus.active}
              </span>
              <span className="text-sm text-gray-500 w-12">
                {Math.round((expiryStatus.active / certifications.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-300 h-2 rounded-full"
              style={{
                width: `${Math.round((expiryStatus.active / certifications.length) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Истекающие */}
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm text-gray-600">Истекающие</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white bg-yellow-500 px-2 py-1 rounded-lg">
                {expiryStatus.expiringSoon}
              </span>
              <span className="text-sm text-gray-500 w-12">
                {Math.round((expiryStatus.expiringSoon / certifications.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-300 h-2 rounded-full"
              style={{
                width: `${Math.round((expiryStatus.expiringSoon / certifications.length) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Просроченные */}
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm text-gray-600">Просроченные</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white bg-red-500 px-2 py-1 rounded-lg">
                {expiryStatus.expired}
              </span>
              <span className="text-sm text-gray-500 w-12">
                {Math.round((expiryStatus.expired / certifications.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-300 h-2 rounded-full"
              style={{
                width: `${Math.round((expiryStatus.expired / certifications.length) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationExpiryStatus;