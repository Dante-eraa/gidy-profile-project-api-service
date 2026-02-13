-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "employmentType" "EmploymentType",
ADD COLUMN     "isCurrentlyWorking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "locationType" "LocationType",
ALTER COLUMN "location" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Experience_company_idx" ON "Experience"("company");
