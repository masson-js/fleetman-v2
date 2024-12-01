'use client'
import { useParams } from "next/navigation";

export default function ShipDetails() {
  const params = useParams();
  const shipID = Array.isArray(params.shipIdentification)
    ? params.shipIdentification[0]
    : params.shipIdentification;

    return (<div>{params.shipIdentification}</div>)
}