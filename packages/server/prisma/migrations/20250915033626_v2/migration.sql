/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `clicks` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `clicks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."clicks" DROP COLUMN "ipAddress",
DROP COLUMN "userAgent",
ADD COLUMN     "ip_address" VARCHAR(45),
ADD COLUMN     "user_agent" VARCHAR(100);
