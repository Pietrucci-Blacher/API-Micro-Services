-- CreateTable
CREATE TABLE "Weather" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "pressure" INTEGER NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);
