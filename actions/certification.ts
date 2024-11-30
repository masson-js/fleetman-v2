"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/session";

export const createCertification = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  const shipName = formData.get("shipName") as string;
  const type = formData.get("type") as string;
  const issuedDate = new Date(formData.get("issuedDate") as string);
  const expiryDate = new Date(formData.get("expiryDate") as string);
  const issuingAuthority = formData.get("issuingAuthority") as string;
  const standard = formData.get("standard") as string;
  const complianceLevel = formData.get("complianceLevel") as string;
  const verificationDate = new Date(formData.get("verificationDate") as string);
  const certificateNumber = formData.get("certificateNumber") as string;
  const inspectionRequirements =
    (formData.get("inspectionRequirements") as string) || null;
  const nextInspectionDate = formData.get("nextInspectionDate")
    ? new Date(formData.get("nextInspectionDate") as string)
    : null;
  const inspectorName = (formData.get("inspectorName") as string) || null;
  const certificationCompany =
    (formData.get("certificationCompany") as string) || null;
  const remarks = (formData.get("remarks") as string) || null;

  try {
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    const newCertification = await prisma.certification.create({
      data: {
        shipId: ship.id,
        type: type,
        issuedDate: issuedDate,
        expiryDate: expiryDate,
        issuingAuthority: issuingAuthority,
        standard: standard,
        complianceLevel: complianceLevel,
        verificationDate: verificationDate,
        certificateNumber: certificateNumber,
        inspectionRequirements: inspectionRequirements,
        nextInspectionDate: nextInspectionDate,
        inspectorName: inspectorName,
        certificationCompany: certificationCompany,
        remarks: remarks,
      },
    });

    return { success: true, newCertification };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating certification:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, error: "Certification creation failed" };
    }
  } finally {
    await prisma.$disconnect();
    redirect("/certifications");
  }
};

export const getAllCertifications = async () => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const userSesId = session?.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userShipIds = user.ships.map((ship) => ship.id);
    const certifications = await prisma.certification.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true,
      },
    });

    return certifications;
  } catch (error) {
    console.error("Error fetching inspections:", error);
    throw new Error("Error fetching inspections");
  } finally {
    await prisma.$disconnect();
  }
};

export const getCertificationsByShipId = async (shipId: string) => {
  const session = await getSession();
  const prisma = new PrismaClient();
  const userSesId = session?.userId;

  if (!userSesId) {
    throw new Error("User not authenticated");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userShipIds = user.ships.map((ship) => ship.id);

    if (!userShipIds.includes(shipId)) {
      throw new Error("User does not have access to this ship");
    }

    const certifications = await prisma.certification.findMany({
      where: {
        shipId: shipId,
      },
      include: {
        ship: true,
      },
    });

    return certifications;
  } catch (error) {
    console.error("Error fetching certifications:", error);
    throw new Error("Error fetching certifications");
  } finally {
    await prisma.$disconnect();
  }
};
