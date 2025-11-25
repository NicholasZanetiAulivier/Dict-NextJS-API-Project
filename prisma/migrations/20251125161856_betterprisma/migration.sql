/*
  Warnings:

  - A unique constraint covering the columns `[word]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_word_key" ON "Favorite"("word");
