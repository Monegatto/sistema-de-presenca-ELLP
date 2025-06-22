/*
  Warnings:

  - You are about to drop the column `coordinator` on the `Workshop` table. All the data in the column will be lost.
  - You are about to drop the `Responsible` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Responsible" DROP CONSTRAINT "Responsible_workshop_id_fkey";

-- AlterTable
ALTER TABLE "Workshop" DROP COLUMN "coordinator";

-- DropTable
DROP TABLE "Responsible";
