-- CreateTable
CREATE TABLE "person" (
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "person_pkey" PRIMARY KEY ("pid")
);
