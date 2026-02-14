/*
  Warnings:

  - The `endYear` column on the `Education` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startYear` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "startYear",
ADD COLUMN     "startYear" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endYear",
ADD COLUMN     "endYear" TIMESTAMP(3);
