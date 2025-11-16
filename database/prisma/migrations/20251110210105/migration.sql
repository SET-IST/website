/*
  Safe migration for adding actorId and removing userId
*/

-- 1) Add actorId as NULLABLE first
ALTER TABLE "EventLog"
ADD COLUMN "actorId" TEXT;

-- 2) Backfill existing rows using old userId
UPDATE "EventLog"
SET "actorId" = "userId"
WHERE "actorId" IS NULL;

-- 3) Now drop the old userId column
ALTER TABLE "EventLog"
DROP COLUMN "userId";

-- 4) Add remaining new columns
ALTER TABLE "EventLog"
ADD COLUMN "activityId" INTEGER,
ADD COLUMN "awardId" INTEGER,
ADD COLUMN "targetId" TEXT,
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- 5) Enforce NOT NULL *after* backfilling
ALTER TABLE "EventLog"
ALTER COLUMN "actorId" SET NOT NULL;

-- 6) Add foreign keys
ALTER TABLE "EventLog"
ADD CONSTRAINT "EventLog_actorId_fkey"
FOREIGN KEY ("actorId") REFERENCES "User"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "EventLog"
ADD CONSTRAINT "EventLog_targetId_fkey"
FOREIGN KEY ("targetId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "EventLog"
ADD CONSTRAINT "EventLog_awardId_fkey"
FOREIGN KEY ("awardId") REFERENCES "Award"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "EventLog"
ADD CONSTRAINT "EventLog_activityId_fkey"
FOREIGN KEY ("activityId") REFERENCES "Activity"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
