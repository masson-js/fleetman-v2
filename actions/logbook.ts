"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/session";

export const createLogbook = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  const shipName = formData.get("shipName") as string;
  const date = new Date(formData.get("date") as string);
  const location = formData.get("location") as string;
  const operationType = formData.get("operationType") as string;
  const eventDescription = formData.get("eventDescription") as string;
  const weatherConditions =
    (formData.get("weatherConditions") as string) || null;
  const seaConditions = (formData.get("seaConditions") as string) || null;
  const speed = parseFloat(formData.get("speed") as string) || null;
  const engineStatus = (formData.get("engineStatus") as string) || null;
  const fuelConsumption =
    parseFloat(formData.get("fuelConsumption") as string) || null;
  const crewCount = parseInt(formData.get("crewCount") as string) || null;
  const inspectionCheck = formData.get("inspectionCheck") === "on";
  const responsible = formData.get("responsible") as string;
  const notes = (formData.get("notes") as string) || null;

  try {
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    const newLogbookEntry = await prisma.logbook.create({
      data: {
        shipId: ship.id,
        date: date,
        location: location,
        operationType: operationType,
        eventDescription: eventDescription,
        weatherConditions: weatherConditions,
        seaConditions: seaConditions,
        speed: speed,
        engineStatus: engineStatus,
        fuelConsumption: fuelConsumption,
        crewCount: crewCount,
        inspectionCheck: inspectionCheck,
        responsible: responsible,
        notes: notes,
      },
    });

    return { success: true, newLogbookEntry };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating logbook entry:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, error: "Logbook entry creation failed" };
    }
  } finally {
    await prisma.$disconnect();

    redirect("/logbooks");
  }
};

export const getAllLogbooks = async () => {
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

    const logbooks = await prisma.logbook.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true,
      },
    });

    return logbooks;
  } catch (error) {
    console.error("Error fetching logbooks:", error);
    throw new Error("Error fetching logbooks");
  } finally {
    await prisma.$disconnect();
  }
};

export const getLastLogbooksForShips = async () => {
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

    const logbooksByShip: Record<string, any[]> = {};

    for (const shipId of userShipIds) {
      const logbooks = await prisma.logbook.findMany({
        where: { shipId },
        orderBy: { date: "desc" },
        take: 10,
      });

      logbooksByShip[shipId] = logbooks;
    }

    return logbooksByShip;
  } catch (error) {
    console.error("Error fetching logbooks:", error);
    throw new Error("Error fetching logbooks");
  } finally {
    await prisma.$disconnect();
  }
};



export const getLogbookById = async (logbookId: string) => {
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

    const logbook = await prisma.logbook.findUnique({
      where: { id: logbookId },
      include: { ship: true },
    });

    if (!logbook || !userShipIds.includes(logbook.shipId)) {
      throw new Error("Logbook not found or access denied");
    }

    return logbook;
  } catch (error) {
    console.error("Error fetching logbook:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
