"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/actions/session";

export const createFixture = async (
  prevState: { error?: string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  const shipName = formData.get("shipName") as string;
  const chartererName = formData.get("chartererName") as string;
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);
  const totalCost = parseFloat(formData.get("totalCost") as string);
  const currency = (formData.get("currency") as string) || null;
  const paymentTerms = formData.get("paymentTerms") as string;
  const cargoDescription = (formData.get("cargoDescription") as string) || null;
  const deliveryLocation = (formData.get("deliveryLocation") as string) || null;
  const fixtureType = formData.get("fixtureType") as string;
  const brokerName = (formData.get("brokerName") as string) || null;
  const status = formData.get("status") as string;
  const cancellationTerms =
    (formData.get("cancellationTerms") as string) || null;
  const isCompleted = formData.get("isCompleted") === "on";
  const notes = (formData.get("notes") as string) || null;

  try {
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    const newFixture = await prisma.fixture.create({
      data: {
        shipId: ship.id,
        chartererName: chartererName,
        startDate: startDate,
        endDate: endDate,
        totalCost: totalCost,
        currency: currency,
        paymentTerms: paymentTerms,
        cargoDescription: cargoDescription,
        deliveryLocation: deliveryLocation,
        fixtureType: fixtureType,
        brokerName: brokerName,
        status: status,
        cancellationTerms: cancellationTerms,
        isCompleted: isCompleted,
        notes: notes,
      },
    });

    return {
      success: true,
      redirect: "/client/status",
    };
  } catch (error) {
    console.error("Error creating Logbook:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllFixtures = async () => {
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
    const fixtures = await prisma.fixture.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true,
      },
    });
    return fixtures;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    throw new Error("Error fetching fixtures");
  } finally {
    await prisma.$disconnect();
  }
};
