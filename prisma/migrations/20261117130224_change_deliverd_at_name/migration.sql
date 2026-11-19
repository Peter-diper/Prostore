/*
  Warnings:

  - You are about to drop the column `deliverdAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliverdAt",
ADD COLUMN     "deliveredAt" TIMESTAMP(6);
