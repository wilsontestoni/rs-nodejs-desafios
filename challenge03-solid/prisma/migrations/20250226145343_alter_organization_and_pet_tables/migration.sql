/*
  Warnings:

  - You are about to drop the column `gallery_photo1` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `gallery_photo2` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `main_photo` on the `pets` table. All the data in the column will be lost.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "gallery_photo1",
DROP COLUMN "gallery_photo2",
DROP COLUMN "main_photo",
ADD COLUMN     "photo" TEXT;
