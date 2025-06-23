/*
  Warnings:

  - You are about to drop the column `workshop_id` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_workshop_id_fkey";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "workshop_id";

-- AlterTable
ALTER TABLE "Workshop" ADD COLUMN     "teacher" INTEGER;
