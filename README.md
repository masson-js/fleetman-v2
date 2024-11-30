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

  // Извлечение данных из формы
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
    // Проверка сессии пользователя
    if (!userSesId) {
      throw new Error("User not authenticated");
    }

    // Находим пользователя по UUID
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Создаём новое судно
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
        userId: userSesId, // Используем UUID из сессии
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

// GET APP USER SHIPS ///////////////////////////

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

export const createInspection = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  // Get the shipName from the form data
  const shipName = formData.get("shipName") as string;
  const inspectionDate = new Date(formData.get("inspectionDate") as string);
  const inspectorName = formData.get("inspectorName") as string;
  const inspectionType = formData.get("inspectionType") as string;
  const results = formData.get("results") as string;
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

    return { success: true, newInspection };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating inspection:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, error: "Inspection creation failed" };
    }
  } finally {
    await prisma.$disconnect();
    redirect("/inspections");
  }
};

export const getAllInspections = async () => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const userSesId = session?.userId;

  if (!userSesId) {
    throw new Error("User not authenticated");
  }

  try {
    // Находим пользователя и его корабли
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Получаем ID всех кораблей пользователя
    const userShipIds = user.ships.map((ship) => ship.id);

    // Находим инспекции только для кораблей этого пользователя
    const inspections = await prisma.inspection.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true, // Информация о корабле для каждой инспекции
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

////////////////// CERTIFICATIONS ///////////////////////////

export const createCertification = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  // Получаем данные из formData
  const shipName = formData.get("shipName") as string;
  const type = formData.get("type") as string;
  const issuedDate = new Date(formData.get("issuedDate") as string);
  const expiryDate = new Date(formData.get("expiryDate") as string);
  const issuingAuthority = formData.get("issuingAuthority") as string;
  const standard = formData.get("standard") as string;
  const complianceLevel = formData.get("complianceLevel") as string;
  const verificationDate = new Date(formData.get("verificationDate") as string);
  const certificateNumber = formData.get("certificateNumber") as string;
  const inspectionRequirements =
    (formData.get("inspectionRequirements") as string) || null;
  const nextInspectionDate = formData.get("nextInspectionDate")
    ? new Date(formData.get("nextInspectionDate") as string)
    : null;
  const inspectorName = (formData.get("inspectorName") as string) || null;
  const certificationCompany =
    (formData.get("certificationCompany") as string) || null;
  const remarks = (formData.get("remarks") as string) || null;

  try {
    // Ищем судно по имени
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    // Создаём новый сертификат
    const newCertification = await prisma.certification.create({
      data: {
        shipId: ship.id, // Указываем существующий shipId
        type: type,
        issuedDate: issuedDate,
        expiryDate: expiryDate,
        issuingAuthority: issuingAuthority,
        standard: standard,
        complianceLevel: complianceLevel,
        verificationDate: verificationDate,
        certificateNumber: certificateNumber,
        inspectionRequirements: inspectionRequirements,
        nextInspectionDate: nextInspectionDate,
        inspectorName: inspectorName,
        certificationCompany: certificationCompany,
        remarks: remarks,
      },
    });

    return { success: true, newCertification };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating certification:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, error: "Certification creation failed" };
    }
  } finally {
    await prisma.$disconnect();
    redirect("/certifications");
  }
};

export const getAllCertifications = async () => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const userSesId = session?.userId;

  try {
    // Находим пользователя и его корабли
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userShipIds = user.ships.map((ship) => ship.id);
    const certifications = await prisma.certification.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true,
      },
    });

    return certifications;
  } catch (error) {
    console.error("Error fetching inspections:", error);
    throw new Error("Error fetching inspections");
  } finally {
    await prisma.$disconnect();
  }
};

//////////////////// LOGBOOK ///////////////////

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
    // Находим пользователя и его корабли
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Получаем ID всех кораблей пользователя
    const userShipIds = user.ships.map((ship) => ship.id);

    const logbooks = await prisma.logbook.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true, // Информация о корабле для каждой инспекции
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

/////////////////////////// FIXTURES ////////////////////////

export const createFixture = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  console.log(formData);

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

    return { success: true, newFixture };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating fixture:", error.message);
      return { success: false, error: error.message };
    } else {
      console.error("Unknown error:", error);
      return { success: false, error: "Fixture creation failed" };
    }
  } finally {
    await prisma.$disconnect();

    redirect("/fixtures"); // Перенаправляем пользователя после успешного создания
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
    // Находим пользователя и его корабли
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Получаем ID всех кораблей пользователя
    const userShipIds = user.ships.map((ship) => ship.id);
    const fixtures = await prisma.fixture.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true, // Информация о корабле для каждой инспекции
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

///////////////// CREW ////////////////

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
    // Check if the ship exists in the database
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    // Create the new crew member
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

    // Redirect user after successful creation
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
    // Находим пользователя и его корабли
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Получаем ID всех кораблей пользователя
    const userShipIds = user.ships.map((ship) => ship.id);
    const crewMembers = await prisma.crew.findMany({
      where: {
        shipId: { in: userShipIds },
      },
      include: {
        ship: true, // Информация о корабле для каждой инспекции
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

export const getTotalArraysCount = async () => {
  const prisma = new PrismaClient();
  const session = await getSession();  // Получаем сессию пользователя
  const userSesId = session?.userId;  // Получаем userId из сессии

  if (!userSesId) {
    throw new Error("User not authenticated"); // Если нет userId в сессии, ошибка
  }

  try {
    // Находим пользователя по userId
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true }, // Включаем корабли пользователя
    });

    if (!user) {
      throw new Error("User not found"); // Если пользователь не найден
    }

    // Получаем только те корабли, которые принадлежат этому пользователю
    const userShipIds = user.ships.map((ship) => ship.id);

    // Получаем все суда этого пользователя с их ассоциированными массивами
    const ships = await prisma.ship.findMany({
      where: {
        id: { in: userShipIds }, // Выбираем только корабли пользователя
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

    // Подсчитываем общее количество записей в каждом массиве для всех судов
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

    return totalArraysCount; // Возвращаем объект с общими счетчиками
  } catch (error) {
    console.error("Error fetching total arrays count:", error);
    throw new Error("Error fetching total arrays count");
  } finally {
    await prisma.$disconnect(); // Отключаем Prisma
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

export const getCrewMembersByShipId = async (shipId: string) => {
  const session = await getSession();
  const prisma = new PrismaClient();
  const userSesId = session?.userId;

  if (!userSesId) {
    throw new Error("User not authenticated");
  }

  try {
    // Находим пользователя по его session ID
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Проверяем, что указанный shipId принадлежит пользователю
    const userShipIds = user.ships.map((ship) => ship.id);

    if (!userShipIds.includes(shipId)) {
      throw new Error("User does not have access to this ship");
    }

    // Получаем список членов экипажа для указанного судна
    const crewMembers = await prisma.crew.findMany({
      where: {
        shipId: shipId,
      },
      include: {
        ship: true, // Информация о корабле для каждого члена экипажа
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




export const getInspectionsByShipId = async (shipId: string) => {
  const session = await getSession();
  const prisma = new PrismaClient();
  const userSesId = session?.userId;

  if (!userSesId) {
    throw new Error("User not authenticated");
  }

  try {
    // Находим пользователя по его session ID
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Проверяем, что указанный shipId принадлежит пользователю
    const userShipIds = user.ships.map((ship) => ship.id);

    if (!userShipIds.includes(shipId)) {
      throw new Error("User does not have access to this ship");
    }

    // Получаем список инспекций для указанного судна
    const inspections = await prisma.inspection.findMany({
      where: {
        shipId: shipId,
      },
      include: {
        ship: true, // Информация о корабле для каждой инспекции
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

export const getCertificationsByShipId = async (shipId: string) => {
  const session = await getSession();
  const prisma = new PrismaClient();
  const userSesId = session?.userId;

  if (!userSesId) {
    throw new Error("User not authenticated");
  }

  try {
    // Find the user based on their session ID
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true }, // Include the ships associated with the user
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the provided shipId belongs to the user
    const userShipIds = user.ships.map((ship) => ship.id);

    if (!userShipIds.includes(shipId)) {
      throw new Error("User does not have access to this ship");
    }

    // Get the certifications for the provided shipId
    const certifications = await prisma.certification.findMany({
      where: {
        shipId: shipId, // Filter certifications by the shipId
      },
      include: {
        ship: true, // Optionally include ship details in the response
      },
    });

    return certifications; // Return the certifications associated with the ship
  } catch (error) {
    console.error("Error fetching certifications:", error);
    throw new Error("Error fetching certifications");
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is properly disconnected
  }
};




export const getShipDetails = async (shipId: string) => {
  const session = await getSession(); // Получение текущей сессии пользователя
  const prisma = new PrismaClient();
  const userSesId = session?.userId;

  if (!userSesId) {
    throw new Error("User not authenticated");
  }

  try {
    // Получение пользователя на основе ID из сессии
    const user = await prisma.user.findUnique({
      where: { userId: userSesId },
      include: { ships: true }, // Включить связанные корабли
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Проверяем, принадлежит ли корабль пользователю
    const userShipIds = user.ships.map((ship) => ship.id);

    if (!userShipIds.includes(shipId)) {
      throw new Error("User does not have access to this ship");
    }

    // Если проверка успешна, получить детали корабля
    const shipDetails = await prisma.ship.findUnique({
      where: { id: shipId },
      include: {
        fuelRecords: true,      // Включить топливные записи
        routes: true,           // Включить маршруты
        certifications: true,   // Включить сертификаты
        inspections: true,      // Включить инспекции
        fixtures: true,         // Включить оборудование
        crew: true,             // Включить экипаж
        logbooks: true,         // Включить журналы
      },
    });

    if (!shipDetails) {
      throw new Error("Ship not found");
    }

    return shipDetails; // Возврат данных о корабле
  } catch (error) {
    console.error("Error fetching ship details:", error);
    throw new Error("Failed to fetch ship details.");
  } finally {
    await prisma.$disconnect(); // Отключение клиента Prisma
  }
};
