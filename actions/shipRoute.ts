"use server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/actions/session";

export const createRoute = async (
  prevState: { error?: string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  const shipName = formData.get("shipName") as string;
  const start = formData.get("start") as string;
  const destination = formData.get("destination") as string;
  const date = new Date(formData.get("date") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  try {
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    // Создаем новый маршрут
    const newRoute = await prisma.shipRoute.create({
      data: {
        shipId: ship.id,
        start,
        destination,
        date,
        arrivalDate,
      },
    });
    return {
      success: true,
      redirect: "/client/status",
    };
  } catch (error) {
    console.error("Error creating routes:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};
