-- DropForeignKey
ALTER TABLE "WebsiteTick" DROP CONSTRAINT "WebsiteTick_region_id_fkey";

-- AlterTable
ALTER TABLE "WebsiteTick" ALTER COLUMN "region_id" DROP NOT NULL;
