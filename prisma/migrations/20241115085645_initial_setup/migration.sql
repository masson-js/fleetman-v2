-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "company" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "imoNumber" TEXT NOT NULL,
    "mmsi" TEXT NOT NULL,
    "callsign" TEXT NOT NULL,
    "deadweight" INTEGER NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "beam" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "yearBuilt" INTEGER NOT NULL,
    "currentStatus" TEXT NOT NULL,
    "portOfRegistry" TEXT NOT NULL,
    "ecoStandard" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipFuel" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "refuelDate" TIMESTAMP(3),
    "fuelType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ShipFuel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipRoute" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShipRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "issuingAuthority" TEXT NOT NULL,
    "standard" TEXT NOT NULL,
    "complianceLevel" TEXT NOT NULL,
    "verificationDate" TIMESTAMP(3) NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "inspectionRequirements" TEXT,
    "nextInspectionDate" TIMESTAMP(3),
    "inspectorName" TEXT,
    "certificationCompany" TEXT,
    "remarks" TEXT,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "inspectorName" TEXT NOT NULL,
    "inspectionType" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "recommendations" TEXT,
    "nextInspectionDate" TIMESTAMP(3),
    "inspectionReport" TEXT,
    "complianceStandards" TEXT NOT NULL,
    "deficienciesFound" TEXT,
    "correctiveActions" TEXT,
    "verificationStatus" TEXT NOT NULL,
    "duration" INTEGER,
    "isEUCompliance" BOOLEAN NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fixture" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "chartererName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "currency" TEXT,
    "paymentTerms" TEXT NOT NULL,
    "cargoDescription" TEXT,
    "deliveryLocation" TEXT,
    "fixtureType" TEXT NOT NULL,
    "brokerName" TEXT,
    "status" TEXT NOT NULL,
    "cancellationTerms" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "Fixture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logbook" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "operationType" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "weatherConditions" TEXT,
    "seaConditions" TEXT,
    "speed" DOUBLE PRECISION,
    "engineStatus" TEXT,
    "fuelConsumption" DOUBLE PRECISION,
    "crewCount" INTEGER,
    "inspectionCheck" BOOLEAN NOT NULL DEFAULT false,
    "responsible" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Logbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crew" (
    "id" SERIAL NOT NULL,
    "shipId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "rank" TEXT,
    "joinDate" TIMESTAMP(3) NOT NULL,
    "contractEndDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "qualifications" TEXT,
    "certifications" TEXT,
    "leaveDate" TIMESTAMP(3),
    "nationality" TEXT,

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ship_imoNumber_key" ON "Ship"("imoNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Ship_mmsi_key" ON "Ship"("mmsi");

-- CreateIndex
CREATE UNIQUE INDEX "Ship_callsign_key" ON "Ship"("callsign");

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipFuel" ADD CONSTRAINT "ShipFuel_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipRoute" ADD CONSTRAINT "ShipRoute_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
