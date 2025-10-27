-- DropIndex
DROP INDEX "public"."CompanyDetails_username_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "access_token",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "type",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "refreshTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
DROP COLUMN "expires_at",
ADD COLUMN     "expires_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "dayId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "displayUsername" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "username" TEXT,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- Migrate passwords to Account
UPDATE "Account" a
SET password = cd.password
    FROM "CompanyDetails" cd
WHERE a."userId" = cd."userId"
  AND (
    a."provider" = 'credentials'
   OR a.password IS NULL
    );

-- Migrate usernames to User
UPDATE "User" u
SET username = cd.username
    FROM "CompanyDetails" cd
WHERE u."id" = cd."userId";

-- AlterTable
ALTER TABLE "CompanyDetails" DROP COLUMN "password",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Day" ALTER COLUMN "date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "_ActivityToCompanyDetails" ADD CONSTRAINT "_ActivityToCompanyDetails_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_ActivityToCompanyDetails_AB_unique";

-- AlterTable
ALTER TABLE "_CompanyDetailsToDay" ADD CONSTRAINT "_CompanyDetailsToDay_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_CompanyDetailsToDay_AB_unique";

-- AlterTable
ALTER TABLE "_CompanyDetailsToStudentDetails" ADD CONSTRAINT "_CompanyDetailsToStudentDetails_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_CompanyDetailsToStudentDetails_AB_unique";

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- Modify credentials -> credential
UPDATE "Account"
SET "provider" = 'credential'
WHERE "provider" = 'credentials';

