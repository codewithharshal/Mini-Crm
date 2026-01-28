/*
  Warnings:

  - Changed the type of `phone` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");
