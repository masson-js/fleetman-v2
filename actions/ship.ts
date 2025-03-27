"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

export const createShip = async (
  prevState: { error?: string },
  formData: FormData
) => {
  const session = await getSession();
  const prisma = new PrismaClient();

  try {
    if (!session?.userId) {
      return { error: "User not authenticated" };
    }
    type ShipData = {
      name: string;
      type: string;
      flag: string;
      imoNumber: string;
      mmsi: string;
      callsign: string;
      deadweight: number;
      length: number;
      beam: number;
      width: number;
      yearBuilt: number;
      currentStatus: string;
      portOfRegistry: string;
      ecoStandard: string;
      userId: string;
    };

    const shipData: ShipData = {
      name: formData.get("shipname") as string,
      type: formData.get("type") as string,
      flag: formData.get("flag") as string,
      imoNumber: formData.get("imoNumber") as string,
      mmsi: formData.get("mmsi") as string,
      callsign: formData.get("callsign") as string,
      deadweight: parseInt(formData.get("deadweight") as string, 10),
      length: parseFloat(formData.get("length") as string),
      beam: parseFloat(formData.get("beam") as string),
      width: parseFloat(formData.get("width") as string),
      yearBuilt: parseInt(formData.get("yearBuilt") as string, 10),
      currentStatus: formData.get("currentStatus") as string,
      portOfRegistry: formData.get("portOfRegistry") as string,
      ecoStandard: formData.get("ecoStandard") as string,
      userId: session.userId,
    };

    const requiredFields = Object.keys(shipData) as (keyof ShipData)[];

    for (const field of requiredFields) {
      if (!shipData[field]) {
        return { error: `Missing required field: ${field}` };
      }
    }

    const user = await prisma.user.findUnique({
      where: { userId: session.userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    const newShip = await prisma.ship.create({
      data: shipData,
    });

    return {
      success: true,
      redirect: "/client/status",
    };
  } catch (error) {
    console.error("Error creating ship:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteShip = async (
  prevState: { error?: string },
  formData: FormData
) => {
  const session = await getSession();
  const prisma = new PrismaClient();

  try {
    // Check if user is authenticated
    if (!session?.userId) {
      return { error: "User not authenticated" };
    }

    // Get the ship ID to delete
    const shipId = formData.get("shipId") as string;

    if (!shipId) {
      return { error: "Ship ID is required" };
    }

    // Verify the ship belongs to the current user
    const ship = await prisma.ship.findUnique({
      where: { 
        id: shipId,
        userId: session.userId 
      }
    });

    if (!ship) {
      return { error: "Ship not found or you do not have permission to delete" };
    }

    // Perform cascading deletion
    await prisma.$transaction([
      // Delete associated fuel records
      prisma.shipFuel.deleteMany({
        where: { shipId: shipId }
      }),
      // Delete associated routes
      prisma.shipRoute.deleteMany({
        where: { shipId: shipId }
      }),
      // Delete associated certifications
      prisma.certification.deleteMany({
        where: { shipId: shipId }
      }),
      // Delete associated inspections
      prisma.inspection.deleteMany({
        where: { shipId: shipId }
      }),
      // Delete associated fixtures
      prisma.fixture.deleteMany({
        where: { shipId: shipId }
      }),
      // Delete associated logbooks
      prisma.logbook.deleteMany({
        where: { shipId: shipId }
      }),
      // Delete associated crew members
      prisma.crew.deleteMany({
        where: { shipId: shipId }
      }),
      // Finally, delete the ship itself
      prisma.ship.delete({
        where: { id: shipId }
      })
    ]);

    return {
      success: true,
      redirect: "/client/status"
    };
  } catch (error) {
    console.error("Error deleting ship:", error);
    return {
      error: error instanceof Error ? error.message : "An unknown error occurred"
    };
  } finally {
    await prisma.$disconnect();
  }
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
