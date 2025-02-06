import { getAllCertifications } from "@/actions/certification";

interface Ship {
  id: string;
  userId: string | null;
  name: string;
  length: number;
  type: string;
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
}

interface PrismaCertification {
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
  ship: Ship;
}

interface ShipStats {
  shipName: string;
  total: number;
  valid: number;
  expired: number;
  expiringSoon: number;
}

interface ShipStatsMap {
  [key: string]: ShipStats;
}

const ShipCertificationStats = async () => {
  const certifications = await getAllCertifications();
  const currentDate = new Date();
  const thirtyDaysFromNow = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  const shipStats = certifications.reduce<ShipStatsMap>((acc, cert) => {
    if (!acc[cert.shipId]) {
      acc[cert.shipId] = {
        shipName: cert.ship.name,
        total: 0,
        valid: 0,
        expired: 0,
        expiringSoon: 0
      };
    }
    
    acc[cert.shipId].total += 1;
    
    const expiryDate = new Date(cert.expiryDate);
    if (expiryDate < currentDate) {
      acc[cert.shipId].expired += 1;
    } else if (expiryDate <= thirtyDaysFromNow) {
      acc[cert.shipId].expiringSoon += 1;
    } else {
      acc[cert.shipId].valid += 1;
    }
    
    return acc;
  }, {});

  return (
    <div className="space-y-3">
     
      {Object.entries(shipStats).map(([shipId, stats]) => (
        <div key={shipId} className="bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{stats.shipName}</span>
            <span className="text-xs text-gray-500">Total: {stats.total}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-600">
                Valid: {stats.valid}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs text-gray-600">
                Expired: {stats.expired}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-xs text-gray-600">
                Expiring: {stats.expiringSoon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShipCertificationStats;