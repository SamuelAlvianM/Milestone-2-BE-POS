/*
  Warnings:

  - You are about to drop the `_StoreToSupplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StoreToSupplier" DROP CONSTRAINT "_StoreToSupplier_A_fkey";

-- DropForeignKey
ALTER TABLE "_StoreToSupplier" DROP CONSTRAINT "_StoreToSupplier_B_fkey";

-- DropTable
DROP TABLE "_StoreToSupplier";
