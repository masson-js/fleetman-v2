"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getShipDetails } from "@/actions";

import SideNavigation from "@/app/components/sidenavigation";
import Link from "next/link";

import WaveIcon from "@/app/components/waveicon";
import {
  CrewEnhancedButton,
  InspectionEnhancedButton,
} from "@/app/components/buttons";

export default function ShipDetails() {
  const params = useParams();
  const shipID = "b0cca598-85e2-40cf-9703-a6b9cf80650e"

  const [shipInfo, setShipInfo] = useState<any>(null);
  const [crews, setCrews] = useState<any>(null);
  const [inspections, setInspections] = useState<any>(null);
  const [certifications, setCertifications] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shipID) {
      const fetchShipData = async () => {
        try {
          setLoading(true);
          const data = await getShipDetails(shipID);

          // Установка состояний
          setShipInfo({
            id: data?.id,
            name: data?.name,
            type: data?.type,
            flag: data?.flag,
            imoNumber: data?.imoNumber,
            mmsi: data?.mmsi,
            callsign: data?.callsign,
            deadweight: data?.deadweight,
            length: data?.length,
            beam: data?.beam,
            width: data?.width,
            yearBuilt: data?.yearBuilt,
            currentStatus: data?.currentStatus,
            portOfRegistry: data?.portOfRegistry,
            ecoStandard: data?.ecoStandard,
          });
          setCrews(data?.crew || []);
          setInspections(data?.inspections || []);
          setCertifications(data?.certifications || []);
        } catch (err) {
          console.error(err);
          setError("Error fetching ship data");
        } finally {
          setLoading(false);
        }
      };

      fetchShipData(); // Вызов асинхронной функции
    }
  }, [shipID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
console.log(inspections)

  return (
    <div>
      <h1>Ship Details</h1>
      {shipInfo && (
        <div>
          <h2>{shipInfo.name}</h2>
          <p>Type: {shipInfo.type}</p>
          <p>Flag: {shipInfo.flag}</p>
          {/* Вывод других данных */}
        </div>
      )}
      {crews && (
        <div>
          <h3>Crew</h3>
          {crews.map((crew: any) => (
            <div key={crew.id}>
              <p>Name: {crew.name}</p>
              <p>Role: {crew.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
