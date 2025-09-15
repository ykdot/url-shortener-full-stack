-- DropForeignKey
ALTER TABLE "public"."url_analytics" DROP CONSTRAINT "url_analytics_short_code_fkey";

-- AddForeignKey
ALTER TABLE "public"."url_analytics" ADD CONSTRAINT "url_analytics_short_code_fkey" FOREIGN KEY ("short_code") REFERENCES "public"."urls"("short_code") ON DELETE CASCADE ON UPDATE CASCADE;
