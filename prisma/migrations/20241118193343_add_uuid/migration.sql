/*
  Warnings:

  - The primary key for the `Certification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Crew` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Fixture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Inspection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Logbook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShipFuel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ShipRoute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Certification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Crew` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Fixture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Inspection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Logbook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Ship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `ShipFuel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `ShipRoute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Crew" DROP CONSTRAINT "Crew_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Logbook" DROP CONSTRAINT "Logbook_shipId_fkey";

-- DropForeignKey
ALTER TABLE "ShipFuel" DROP CONSTRAINT "ShipFuel_shipId_fkey";

-- DropForeignKey
ALTER TABLE "ShipRoute" DROP CONSTRAINT "ShipRoute_shipId_fkey";

-- AlterTable
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Certification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Certification_id_seq";

-- AlterTable
ALTER TABLE "Crew" DROP CONSTRAINT "Crew_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Crew_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Crew_id_seq";

-- AlterTable
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Fixture_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Fixture_id_seq";

-- AlterTable
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Inspection_id_seq";

-- AlterTable
ALTER TABLE "Logbook" DROP CONSTRAINT "Logbook_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Logbook_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Logbook_id_seq";

-- AlterTable
ALTER TABLE "Ship" DROP CONSTRAINT "Ship_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ship_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ship_id_seq";

-- AlterTable
ALTER TABLE "ShipFuel" DROP CONSTRAINT "ShipFuel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShipFuel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShipFuel_id_seq";

-- AlterTable
ALTER TABLE "ShipRoute" DROP CONSTRAINT "ShipRoute_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ShipRoute_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ShipRoute_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Certification_id_key" ON "Certification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Crew_id_key" ON "Crew"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_id_key" ON "Fixture"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inspection_id_key" ON "Inspection"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Logbook_id_key" ON "Logbook"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ship_id_key" ON "Ship"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ShipFuel_id_key" ON "ShipFuel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ShipRoute_id_key" ON "ShipRoute"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

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
