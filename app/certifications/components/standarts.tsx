import { getAllCertifications } from '@/actions/certification'; // Укажите правильный путь

interface Certification {
  id: string;
  standard: string;
  type: string;
}

const CertificationStandardsAndTypes: React.FC = async () => {
  // Получаем данные о сертификатах
  const certifications = await getAllCertifications();

  // Группируем сертификаты по стандартам
  const standards: Record<string, number> = {};
  certifications.forEach((cert) => {
    if (standards[cert.standard]) {
      standards[cert.standard]++;
    } else {
      standards[cert.standard] = 1;
    }
  });

  // Группируем сертификаты по типам
  const types: Record<string, number> = {};
  certifications.forEach((cert) => {
    if (types[cert.type]) {
      types[cert.type]++;
    } else {
      types[cert.type] = 1;
    }
  });

  return (
    <div>
      {/* Секция для стандартов */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-3">Compliance Standards</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(standards).map(([standard, count]) => (
            <div
              key={standard}
              className="bg-blue-50 p-3 rounded-lg text-center"
            >
              <span className="text-lg font-bold text-blue-600">{count}</span>
              <span className="block text-xs text-gray-600 mt-1 break-words">
                {standard}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Секция для типов */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Certification Types</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(types).map(([type, count]) => (
            <div
              key={type}
              className="bg-green-50 p-3 rounded-lg text-center"
            >
              <span className="text-lg font-bold text-green-600">{count}</span>
              <span className="block text-xs text-gray-600 mt-1 break-words">
                {type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationStandardsAndTypes;