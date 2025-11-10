/*
  Warnings:

  - You are about to drop the column `userId` on the `EventLog` table. All the data in the column will be lost.
  - Added the required column `actorId` to the `EventLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."EventLog" DROP CONSTRAINT "EventLog_userId_fkey";

-- AlterTable
ALTER TABLE "EventLog" DROP COLUMN "userId",
ADD COLUMN     "activityId" INTEGER,
ADD COLUMN     "actorId" TEXT NOT NULL,
ADD COLUMN     "awardId" INTEGER,
ADD COLUMN     "targetId" TEXT,
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
