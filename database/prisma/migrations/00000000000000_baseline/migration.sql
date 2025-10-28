-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('Lecture', 'Workshop', 'SpeedInterview');

-- CreateEnum
CREATE TYPE "public"."AwardType" AS ENUM ('NORMAL', 'SPECIAL');

-- CreateEnum
CREATE TYPE "public"."CompanyCategory" AS ENUM ('Platinum', 'Gold', 'Silver', 'NotAttending');

-- CreateEnum
CREATE TYPE "public"."CurrentDayState" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "public"."EventLogType" AS ENUM ('POINTS', 'AWARDS', 'ENROLLMENTS');

-- CreateEnum
CREATE TYPE "public"."ObjectType" AS ENUM ('COMPANY', 'REDEEM');

-- CreateEnum
CREATE TYPE "public"."PointSetting" AS ENUM ('REDEEM', 'RATIO', 'REWARD', 'LECTURE', 'WORKSHOP', 'SPEED_INTERVIEW');

-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('Student', 'Company', 'Staff');

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" VARCHAR(80) NOT NULL,
    "type" "public"."ActivityType" NOT NULL,
    "idHash" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER,
    "dayId" INTEGER NOT NULL DEFAULT 9,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActivityEnrollment" (
    "userId" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Award" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amountAvailable" INTEGER NOT NULL,
    "type" "public"."AwardType" NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AwardToken" (
    "id" TEXT NOT NULL,
    "type" "public"."AwardType" NOT NULL,
    "userId" TEXT NOT NULL,
    "awardId" INTEGER NOT NULL,

    CONSTRAINT "AwardToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CompanyDetails" (
    "id" SERIAL NOT NULL,
    "category" "public"."CompanyCategory" NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "linkHref" TEXT,
    "linkText" VARCHAR(40),
    "scans" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CompanyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Day" (
    "id" SERIAL NOT NULL,
    "dateCode" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" "public"."CurrentDayState" NOT NULL DEFAULT 'Inactive',

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DayTotalPoints" (
    "dayId" INTEGER NOT NULL,
    "total_points" INTEGER NOT NULL DEFAULT 0,
    "studentDetailsId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."EventLog" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" "public"."EventLogType" NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QRCode" (
    "id" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectType" "public"."ObjectType" NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RedeemedPrize" (
    "id" SERIAL NOT NULL,
    "awardId" INTEGER NOT NULL,
    "type" "public"."AwardType" NOT NULL,
    "studentDetailsId" INTEGER NOT NULL,

    CONSTRAINT "RedeemedPrize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RedemptionSettings" (
    "amount" INTEGER NOT NULL,
    "setting" "public"."PointSetting" NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StudentDetails" (
    "id" SERIAL NOT NULL,
    "cvLocation" VARCHAR(128),
    "scans" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "course" VARCHAR(128) NOT NULL,
    "university" VARCHAR(128) NOT NULL,
    "companies_ids" TEXT[],
    "userId" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "redeems" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "readChangelog" BOOLEAN NOT NULL DEFAULT true,
    "role" "public"."UserType" NOT NULL DEFAULT 'Student',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."_ActivityToCompanyDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."_CompanyDetailsToDay" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "public"."_CompanyDetailsToStudentDetails" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider" ASC, "providerAccountId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_idHash_key" ON "public"."Activity"("idHash" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityEnrollment_userId_activityId_key" ON "public"."ActivityEnrollment"("userId" ASC, "activityId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "AwardToken_userId_key" ON "public"."AwardToken"("userId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDetails_userId_key" ON "public"."CompanyDetails"("userId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDetails_username_key" ON "public"."CompanyDetails"("username" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Day_dateCode_key" ON "public"."Day"("dateCode" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "DayTotalPoints_dayId_studentDetailsId_key" ON "public"."DayTotalPoints"("dayId" ASC, "studentDetailsId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "RedemptionSettings_setting_key" ON "public"."RedemptionSettings"("setting" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_userId_key" ON "public"."StudentDetails"("userId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier" ASC, "token" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToCompanyDetails_AB_unique" ON "public"."_ActivityToCompanyDetails"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_ActivityToCompanyDetails_B_index" ON "public"."_ActivityToCompanyDetails"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyDetailsToDay_AB_unique" ON "public"."_CompanyDetailsToDay"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_CompanyDetailsToDay_B_index" ON "public"."_CompanyDetailsToDay"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyDetailsToStudentDetails_AB_unique" ON "public"."_CompanyDetailsToStudentDetails"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_CompanyDetailsToStudentDetails_B_index" ON "public"."_CompanyDetailsToStudentDetails"("B" ASC);

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "public"."Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityEnrollment" ADD CONSTRAINT "ActivityEnrollment_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityEnrollment" ADD CONSTRAINT "ActivityEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."StudentDetails"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AwardToken" ADD CONSTRAINT "AwardToken_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "public"."Award"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AwardToken" ADD CONSTRAINT "AwardToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."StudentDetails"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CompanyDetails" ADD CONSTRAINT "CompanyDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayTotalPoints" ADD CONSTRAINT "DayTotalPoints_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "public"."Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DayTotalPoints" ADD CONSTRAINT "DayTotalPoints_studentDetailsId_fkey" FOREIGN KEY ("studentDetailsId") REFERENCES "public"."StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventLog" ADD CONSTRAINT "EventLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RedeemedPrize" ADD CONSTRAINT "RedeemedPrize_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "public"."Award"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RedeemedPrize" ADD CONSTRAINT "RedeemedPrize_studentDetailsId_fkey" FOREIGN KEY ("studentDetailsId") REFERENCES "public"."StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StudentDetails" ADD CONSTRAINT "StudentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityToCompanyDetails" ADD CONSTRAINT "_ActivityToCompanyDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityToCompanyDetails" ADD CONSTRAINT "_ActivityToCompanyDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."CompanyDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CompanyDetailsToDay" ADD CONSTRAINT "_CompanyDetailsToDay_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."CompanyDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CompanyDetailsToDay" ADD CONSTRAINT "_CompanyDetailsToDay_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CompanyDetailsToStudentDetails" ADD CONSTRAINT "_CompanyDetailsToStudentDetails_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."CompanyDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CompanyDetailsToStudentDetails" ADD CONSTRAINT "_CompanyDetailsToStudentDetails_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."StudentDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

