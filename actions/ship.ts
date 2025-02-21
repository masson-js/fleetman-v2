"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

export const createShip = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const userSesId = session.userId;

  let shipName = formData.get("shipname") as string;
  let shipType = formData.get("type") as string;
  let shipFlag = formData.get("flag") as string;
  let shipIMO = formData.get("imoNumber") as string;
  let shipMMSI = formData.get("mmsi") as string;
  let shipCallsign = formData.get("callsign") as string;
  let shipdeadWeight = parseInt(formData.get("deadweight") as string, 10);
  let shipLength = parseFloat(formData.get("length") as string);
  let shipBeam = parseFloat(formData.get("beam") as string);
  let shipWidth = parseFloat(formData.get("width") as string);
  let shipYearBuild = parseInt(formData.get("yearBuilt") as string, 10);
  let shipCurrentStatus = formData.get("currentStatus") as string;
  let shipPortRegistry = formData.get("portOfRegistry") as string;
  let shipEco = formData.get("ecoStandard") as string;

  try {
    if (!userSesId) {
      throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newShip = await prisma.ship.create({
      data: {
        name: shipName,
        type: shipType,
        flag: shipFlag,
        imoNumber: shipIMO,
        mmsi: shipMMSI,
        callsign: shipCallsign,
        deadweight: shipdeadWeight,
        length: shipLength,
        beam: shipBeam,
        width: shipWidth,
        yearBuilt: shipYearBuild,
        currentStatus: shipCurrentStatus,
        portOfRegistry: shipPortRegistry,
        ecoStandard: shipEco,
        userId: userSesId,
      },
    });

    return { success: true, newShip };
  } catch (error) {
    console.error("Error creating ship:", error);
  } finally {
    await prisma.$disconnect();
  }

  redirect("/status");
};



export const getShipDetails = async (shipId: string) => {
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

    const userShipIds = user.ships.map((ship: any) => ship.id);
    if (!userShipIds.includes(shipId)) {
      throw new Error("User does not have access to this ship");
    }

    const shipDetails = await prisma.ship.findUnique({
      where: { id: shipId },
      include: {
        fuelRecords: true,
        routes: true,
        certifications: true,
        inspections: true,
        fixtures: true,
        crew: true,
        logbooks: true,
      },
    });

    if (!shipDetails) {
      throw new Error("Ship not found");
    }

    return shipDetails;
  } catch (error) {
    console.error("Error fetching ship details:", error);
    throw new Error("Failed to fetch ship details.");
  } finally {
    await prisma.$disconnect();
  }
};





export const getAllUserShips = async () => {
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

    const allShips = user.ships;
    return allShips;
  } catch (error) {
    console.error("Error getting ships:", error);
    throw new Error("Error fetching ships: ");
  } finally {
    await prisma.$disconnect();
  }
};





export const getShipStatus = async ({ shipID }: { shipID: string }) => {
  const prisma = new PrismaClient();
  console.log(shipID)
  try {
    const shipStatus = await prisma.ship.findFirst({
      where: {
        id: shipID,
      },
    });

    return shipStatus;
  } catch (error) {
    console.error("Error fetching ship status:", error);
    throw new Error("Error fetching ship status");
  } finally {
    await prisma.$disconnect();
  }
};
