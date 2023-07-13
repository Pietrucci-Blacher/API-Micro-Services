/*
  Warnings:

  - The primary key for the `Weather` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Weather" DROP CONSTRAINT "Weather_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Weather_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Weather_id_seq";
