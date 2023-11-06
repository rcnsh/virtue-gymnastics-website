-- CreateTable
CREATE TABLE "timetable_classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "daysOfWeek" INTEGER[],
    "backgroundColor" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "timetable_classes_pkey" PRIMARY KEY ("id")
);
