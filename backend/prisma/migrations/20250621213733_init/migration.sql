/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Aula` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oficina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Presenca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Responsavel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_oficina_id_fkey";

-- DropForeignKey
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_id_oficina_fkey";

-- DropForeignKey
ALTER TABLE "Presenca" DROP CONSTRAINT "Presenca_id_aluno_fkey";

-- DropForeignKey
ALTER TABLE "Presenca" DROP CONSTRAINT "Presenca_id_aula_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_oficina_id_fkey";

-- DropForeignKey
ALTER TABLE "Responsavel" DROP CONSTRAINT "Responsavel_id_oficina_fkey";

-- DropTable
DROP TABLE "Aluno";

-- DropTable
DROP TABLE "Aula";

-- DropTable
DROP TABLE "Oficina";

-- DropTable
DROP TABLE "Presenca";

-- DropTable
DROP TABLE "Professor";

-- DropTable
DROP TABLE "Responsavel";

-- CreateTable
CREATE TABLE "Workshop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weekdays" TEXT,
    "coordinator" TEXT,
    "startTime" TEXT,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "workshop_id" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsible" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "workshop_id" INTEGER NOT NULL,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "workshop_id" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "present" BOOLEAN NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "workshop_id" INTEGER,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_username_key" ON "Responsible"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsible" ADD CONSTRAINT "Responsible_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_workshop_id_fkey" FOREIGN KEY ("workshop_id") REFERENCES "Workshop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
