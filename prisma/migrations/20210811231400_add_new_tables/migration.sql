-- CreateTable
CREATE TABLE "SubTask" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestA" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestB" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubTask" ADD FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
