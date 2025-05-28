/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Oficinas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dias" TEXT,
    "coordenador" TEXT,
    "horario" TEXT,

    CONSTRAINT "Oficinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professores" (
    "id" SERIAL NOT NULL,
    "nome_professor" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_oficinas" INTEGER NOT NULL,

    CONSTRAINT "Professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alunos" (
    "id" SERIAL NOT NULL,
    "oficinas_inscrito" INTEGER NOT NULL,

    CONSTRAINT "Alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aulas" (
    "id" SERIAL NOT NULL,
    "id_oficinas" INTEGER NOT NULL,
    "data_prevista" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presencas" (
    "id" SERIAL NOT NULL,
    "id_alunos" INTEGER NOT NULL,
    "id_aula" INTEGER NOT NULL,
    "presenca" BOOLEAN NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "Presencas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professores_usuario_key" ON "Professores"("usuario");

-- AddForeignKey
ALTER TABLE "Professores" ADD CONSTRAINT "Professores_id_oficinas_fkey" FOREIGN KEY ("id_oficinas") REFERENCES "Oficinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alunos" ADD CONSTRAINT "Alunos_oficinas_inscrito_fkey" FOREIGN KEY ("oficinas_inscrito") REFERENCES "Oficinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aulas" ADD CONSTRAINT "Aulas_id_oficinas_fkey" FOREIGN KEY ("id_oficinas") REFERENCES "Oficinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presencas" ADD CONSTRAINT "Presencas_id_alunos_fkey" FOREIGN KEY ("id_alunos") REFERENCES "Alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presencas" ADD CONSTRAINT "Presencas_id_aula_fkey" FOREIGN KEY ("id_aula") REFERENCES "Aulas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
