"use server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import argon2 from "argon2";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

// REGISTRATION

export const registration = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;
  const formEmail = formData.get("email") as string;

  const userID = uuidv4();
  const hashedPassword = await argon2.hash(formPassword);

  async function dataBaseconnect() {
    await prisma.user.create({
      data: {
        name: formUsername,
        email: formEmail,
        password: hashedPassword,
        userId: userID,
      },
    });
  }

  dataBaseconnect()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e: any) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  session.userId = userID;
  session.username = formUsername;
  session.isLoggedIn = true;
  await session.save();
  redirect("/status");
};

// LOGIN

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: { name: formUsername },
  });

  if (!user || !(await argon2.verify(user.password, formPassword))) {
    return { error: "Wrong Name or Password!" };
  }

  session.userId = user.userId?.toString();
  session.username = formUsername;
  session.isLoggedIn = true;

  await session.save();
  redirect("/status");
};

// GET USER DATA

export const getUserData = async () => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { userId: session.userId },
  });
};

// LOG OUT

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

// SHIP DATA

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
  let shipMMSI = formData.get("mmsi") as string; // Новое поле
  let shipCallsign = formData.get("callsign") as string; // Новое поле
  let shipdeadWeight = parseInt(formData.get("deadweight") as string, 10);
  let shipLength = parseFloat(formData.get("length") as string);
  let shipBeam = parseFloat(formData.get("beam") as string); // Новое поле
  let shipWidth = parseFloat(formData.get("width") as string);
  let shipYearBuild = parseInt(formData.get("yearBuilt") as string, 10);
  let shipCurrentStatus = formData.get("currentStatus") as string;
  let shipPortRegistry = formData.get("portOfRegistry") as string;
  let shipEco = formData.get("ecoStandard") as string;

  try {
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
        mmsi: shipMMSI, // Новое поле
        callsign: shipCallsign, // Новое поле
        deadweight: shipdeadWeight,
        length: shipLength,
        beam: shipBeam, // Новое поле
        width: shipWidth,
        yearBuilt: shipYearBuild,
        currentStatus: shipCurrentStatus,
        portOfRegistry: shipPortRegistry,
        ecoStandard: shipEco,
        userId: user.id,
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

// GET APP USER SHIPS

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

//ADD INSPECTION

export const createInspection = async (
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
  let shipMMSI = formData.get("mmsi") as string; // Новое поле
  let shipCallsign = formData.get("callsign") as string; // Новое поле
  let shipdeadWeight = parseInt(formData.get("deadweight") as string, 10);
  let shipLength = parseFloat(formData.get("length") as string);
  let shipBeam = parseFloat(formData.get("beam") as string); // Новое поле
  let shipWidth = parseFloat(formData.get("width") as string);
  let shipYearBuild = parseInt(formData.get("yearBuilt") as string, 10);
  let shipCurrentStatus = formData.get("currentStatus") as string;
  let shipPortRegistry = formData.get("portOfRegistry") as string;
  let shipEco = formData.get("ecoStandard") as string;

  try {
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
        mmsi: shipMMSI, // Новое поле
        callsign: shipCallsign, // Новое поле
        deadweight: shipdeadWeight,
        length: shipLength,
        beam: shipBeam, // Новое поле
        width: shipWidth,
        yearBuilt: shipYearBuild,
        currentStatus: shipCurrentStatus,
        portOfRegistry: shipPortRegistry,
        ecoStandard: shipEco,
        userId: user.id,
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
