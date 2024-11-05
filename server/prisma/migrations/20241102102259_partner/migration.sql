/*
  Warnings:

  - Changed the type of `customerGroup` on the `partner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CustomerGroup" AS ENUM ('Standard', 'Casual', 'Local', 'Foreign');

-- AlterTable
ALTER TABLE "partner" DROP COLUMN "customerGroup",
ADD COLUMN     "customerGroup" "CustomerGroup" NOT NULL;

-- DropEnum
DROP TYPE "customerGroup";
