"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/session";

export const createCrew = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  const shipName = formData.get("shipName") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const rank = (formData.get("rank") as string) || null;
  const joinDate = new Date(formData.get("joinDate") as string);
  const contractEndDate = formData.get("contractEndDate")
    ? new Date(formData.get("contractEndDate") as string)
    : null;
  const status = formData.get("status") as string;
  const qualifications = (formData.get("qualifications") as string) || null;
  const certifications = (formData.get("certifications") as string) || null;
  const leaveDate = formData.get("leaveDate")
    ? new Date(formData.get("leaveDate") as string)
    : null;
  const nationality = (formData.get("nationality") as string) || null;

  try {
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    const newCrew = await prisma.crew.create({
      data: {
        shipId: ship.id,
        name: name,
        role: role,
        rank: rank,
        joinDate: joinDate,
        contractEndDate: contractEndDate,
        status: status,
        qualifications: qualifications,
        certifications: certifications,
        leaveDate: leaveDate,
        nationality: nationality,
      },
    });

    return { success: true, newCrew };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating crew member:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, error: "Crew creation failed" };
    }
  } finally {
    await prisma.$disconnect();
    redirect("/crews");
  }
};

export const getAllCrewMembers = async () => {
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
    const crewMembers = await prisma.crew.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true,
      },
    });

    return crewMembers;
  } catch (error) {
    console.error("Error fetching crew members:", error);
    throw new Error("Error fetching crew members");
  } finally {
    await prisma.$disconnect();
  }
};

export const getCrewMember = async ({ memberID }: { memberID: string }) => {
  const prisma = new PrismaClient();

  try {
    const crewMember = await prisma.crew.findFirst({
      where: {
        id: memberID,
      },
    });

    return crewMember;
  } catch (error) {
    console.error("Error fetching crew member:", error);
    throw new Error("Error fetching crew member");
  } finally {
    await prisma.$disconnect();
  }
};

export const getCrewMembersByShipId = async (shipId: string) => {
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
    const crewMembers = await prisma.crew.findMany({
      where: {
        shipId: shipId,
      },
      include: {
        ship: true,
      },
    });

    return crewMembers;
  } catch (error) {
    console.error("Error fetching crew members:", error);
    throw new Error("Error fetching crew members");
  } finally {
    await prisma.$disconnect();
  }
};
