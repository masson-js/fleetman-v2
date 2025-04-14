"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/session";

export const createInspection = async (
  prevState: { error?: string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  const shipName = formData.get("shipName") as string;
  const inspectionDate = new Date(formData.get("inspectionDate") as string);
  const inspectorName = formData.get("inspectorName") as string;
  const inspectionType = formData.get("inspectionType") as string;
  const results = "N/A";
  const recommendations = (formData.get("recommendations") as string) || null;
  const nextInspectionDate = formData.get("nextInspectionDate")
    ? new Date(formData.get("nextInspectionDate") as string)
    : null;
  const inspectionReport = (formData.get("inspectionReport") as string) || null;
  const complianceStandards = formData.get("complianceStandards") as string;
  const deficienciesFound =
    (formData.get("deficienciesFound") as string) || null;
  const correctiveActions =
    (formData.get("correctiveActions") as string) || null;
  const verificationStatus = formData.get("verificationStatus") as string;
  const duration = parseInt(formData.get("duration") as string, 10) || null;
  const isEUCompliance = formData.get("isEUCompliance") === "on";

  try {
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    const newInspection = await prisma.inspection.create({
      data: {
        shipId: ship.id,
        inspectionDate: inspectionDate,
        inspectorName: inspectorName,
        inspectionType: inspectionType,
        results: results,
        recommendations: recommendations,
        nextInspectionDate: nextInspectionDate,
        inspectionReport: inspectionReport,
        complianceStandards: complianceStandards,
        deficienciesFound: deficienciesFound,
        correctiveActions: correctiveActions,
        verificationStatus: verificationStatus,
        duration: duration,
        isEUCompliance: isEUCompliance,
      },
    });

    return {
      success: true,
      redirect: "/client/status",
    };
  } catch (error) {
    console.error("Error creating inspection:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Get all users inspections

export const getAllInspections = async () => {
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

    const inspections = await prisma.inspection.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true,
      },
    });

    return inspections;
  } catch (error) {
    console.error("Error fetching inspections:", error);
    throw new Error("Error fetching inspections");
  } finally {
    await prisma.$disconnect();
  }
};



export const getInspectionsByShipId = async (shipId: string) => {
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

    const inspections = await prisma.inspection.findMany({
      where: {
        shipId: shipId,
      },
      include: {
        ship: true,
      },
    });

    return inspections;
  } catch (error) {
    console.error("Error fetching inspections:", error);
    throw new Error("Error fetching inspections");
  } finally {
    await prisma.$disconnect();
  }
};


/////


export const getInspectionById = async (inspectionId: string) => {
  const session = await getSession();
  const userId = session?.userId;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const prisma = new PrismaClient();

  try {
    // Получаем только инспекцию
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
    });

    if (!inspection) {
      throw new Error("Inspection not found");
    }

    // Проверяем, принадлежит ли судно этому пользователю
    if (inspection.shipId && !userHasAccessToShip(userId, inspection.shipId)) {
      throw new Error("Access denied to this ship");
    }

    return inspection;
  } catch (error) {
    console.error("Error fetching inspection:", error);
    throw new Error("Failed to fetch inspection");
  } finally {
    await prisma.$disconnect();
  }
};

// Функция для проверки доступа пользователя к судну
const userHasAccessToShip = async (userId: string, shipId: string) => {
  const prisma = new PrismaClient();

  try {
    const ship = await prisma.ship.findUnique({
      where: { id: shipId },
    });

    return ship?.userId === userId;
  } catch (error) {
    console.error("Error checking access to ship:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
};

// export const getInspectionById = async (inspectionId: string) => {
//   const session = await getSession();
//   const prisma = new PrismaClient();
//   const userSesId = session?.userId;

//   if (!userSesId) {
//     throw new Error("User not authenticated");
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { userId: userSesId },
//       include: { ships: true },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     // Проверяем доступ к судну, связанного с инспекцией
//     const inspection = await prisma.inspection.findUnique({
//       where: {
//         id: inspectionId,
//       },
//       include: {
//         ship: true, // Информация о судне, которое связано с инспекцией
//       },
//     });

//     if (!inspection) {
//       throw new Error("Inspection not found");
//     }

    // Проверяем, имеет ли пользователь доступ к этому судну
//     const userShipIds = user.ships.map((ship) => ship.id);
//     if (!userShipIds.includes(inspection.shipId)) {
//       throw new Error("User does not have access to this ship");
//     }

//     return inspection;
//   } catch (error) {
//     console.error("Error fetching inspection:", error);
//     throw new Error("Error fetching inspection");
//   } finally {
//     await prisma.$disconnect();
//   }
// };

export const deleteInspection = async (inspectionId: string) => {
  const prisma = new PrismaClient();

  try {
    const inspection = await prisma.inspection.findUnique({
      where: { id: inspectionId },
    });
    if (!inspection) {
      return { success: false, error: "Inspection not found" };
    }
    await prisma.inspection.delete({
      where: { id: inspectionId },
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting inspection:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, error: "Inspection deletion failed" };
    }
  } finally {
    await prisma.$disconnect();
    redirect("/inspections");
  }
};
