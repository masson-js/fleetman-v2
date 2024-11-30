"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/actions/session";

export const getTotalArraysCount = async () => {
  const prisma = new PrismaClient();
  const session = await getSession();
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
    const ships = await prisma.ship.findMany({
      where: {
        id: { in: userShipIds },
      },
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
    const totalArraysCount = ships.reduce(
      (acc, ship) => {
        acc.fuelRecordsCount += ship.fuelRecords.length;
        acc.routesCount += ship.routes.length;
        acc.certificationsCount += ship.certifications.length;
        acc.inspectionsCount += ship.inspections.length;
        acc.fixturesCount += ship.fixtures.length;
        acc.crewCount += ship.crew.length;
        acc.logbooksCount += ship.logbooks.length;
        acc.shipsCount += 1;
        return acc;
      },
      {
        fuelRecordsCount: 0,
        routesCount: 0,
        certificationsCount: 0,
        inspectionsCount: 0,
        fixturesCount: 0,
        crewCount: 0,
        logbooksCount: 0,
        shipsCount: 0,
      }
    );

    return totalArraysCount;
  } catch (error) {
    console.error("Error fetching total arrays count:", error);
    throw new Error("Error fetching total arrays count");
  } finally {
    await prisma.$disconnect();
  }
};
