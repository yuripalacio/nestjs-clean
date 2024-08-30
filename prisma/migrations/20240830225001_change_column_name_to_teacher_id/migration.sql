/*
  Warnings:

  - You are about to drop the column `author_id` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `teacher_id` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_author_id_fkey";

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "author_id",
ADD COLUMN     "teacher_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
