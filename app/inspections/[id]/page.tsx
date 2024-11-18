"use client";
import { useParams } from "next/navigation";

export default function InspectionEnhanced() {
  const params = useParams(); 
  const inspectionId = params.id;
  return <div>Current route: {inspectionId}</div>;
}
