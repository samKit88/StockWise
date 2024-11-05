/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerGroup` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `customer` table. All the data in the column will be lost.
  - Added the required column `customer_discount` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partner_id` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_customerId_fkey";

-- DropIndex
DROP INDEX "customer_email_key";

-- AlterTable
ALTER TABLE "customer" DROP CONSTRAINT "customer_pkey",
DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "customerGroup",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
DROP COLUMN "zipCode",
ADD COLUMN     "customer_discount" MONEY NOT NULL,
ADD COLUMN     "partner_id" INTEGER NOT NULL,
ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("partner_id");

-- CreateTable
CREATE TABLE "partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "customerGroup" "customerGroup" NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,

    CONSTRAINT "partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "partner_id" INTEGER NOT NULL,
    "supplier_terms" TEXT,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("partner_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partner_email_key" ON "partner"("email");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
