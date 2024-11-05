/*
  Warnings:

  - You are about to drop the column `customerId` on the `inventory` table. All the data in the column will be lost.
  - Added the required column `partnerId` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_customerId_fkey";

-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "customerId",
ADD COLUMN     "partnerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
