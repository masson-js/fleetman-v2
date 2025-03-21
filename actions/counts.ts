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

export const getInspectionStats = async () => {
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

    const inspections = await prisma.inspection.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      select: {
        verificationStatus: true,
        complianceStandards: true,
      },
    });

    const statusCounts = inspections.reduce(
      (acc, inspection) => {
        if (inspection.verificationStatus === "passed") {
          acc.status.passed++;
        } else if (inspection.verificationStatus === "requires-work") {
          acc.status.requiresWork++;
        } else if (inspection.verificationStatus === "failed") {
          acc.status.failed++;
        }

        if (inspection.complianceStandards) {
          acc.standards[inspection.complianceStandards] =
            (acc.standards[inspection.complianceStandards] || 0) + 1;
        }

        return acc;
      },
      {
        status: {
          passed: 0,
          requiresWork: 0,
          failed: 0,
        },
        standards: {} as Record<string, number>,
      }
    );

    return statusCounts;
  } catch (error) {
    console.error("Error fetching inspection stats:", error);
    throw new Error("Error fetching inspection stats");
  } finally {
    await prisma.$disconnect();
  }
};


export const getAllUserData = async () => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const userSesId = session?.userId;

  if (!userSesId) {
    throw new Error("User not authenticated");
  }

  try {
    // Получаем пользователя с его судами и всеми связанными данными
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: {
        ships: {
          include: {
            certifications: true, // Сертификации
            crew: true, // Члены экипажа
            fixtures: true, // Фрахты
            inspections: true, // Инспекции
            logbooks: true, // Журналы
            fuelRecords: true, // Записи о топливе
            routes: true, // Маршруты
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    const totalProfit = user.ships
    .flatMap((ship) => ship.fixtures)
    .reduce((sum, fixture) => sum + (fixture.totalCost || 0), 0);
    // Возвращаем все данные
    return {
      ships: user.ships, // Все суда
      certifications: user.ships.flatMap((ship) => ship.certifications), // Все сертификации
      crewMembers: user.ships.flatMap((ship) => ship.crew), // Все члены экипажа
      fixtures: user.ships.flatMap((ship) => ship.fixtures), // Все фрахты
      inspections: user.ships.flatMap((ship) => ship.inspections), // Все инспекции
      logbooks: user.ships.flatMap((ship) => ship.logbooks), // Все журналы
      fuelRecords: user.ships.flatMap((ship) => ship.fuelRecords), // Все записи о топливе
      routes: user.ships.flatMap((ship) => ship.routes), // Все маршруты
      totalProfit,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Error fetching user data");
  } finally {
    await prisma.$disconnect();
  }
};