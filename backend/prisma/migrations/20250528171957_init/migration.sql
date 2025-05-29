/*
  Warnings:

  - You are about to drop the `Alunos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Aulas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Oficinas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Presencas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alunos" DROP CONSTRAINT "Alunos_oficinas_inscrito_fkey";

-- DropForeignKey
ALTER TABLE "Aulas" DROP CONSTRAINT "Aulas_id_oficinas_fkey";

-- DropForeignKey
ALTER TABLE "Presencas" DROP CONSTRAINT "Presencas_id_alunos_fkey";

-- DropForeignKey
ALTER TABLE "Presencas" DROP CONSTRAINT "Presencas_id_aula_fkey";

-- DropForeignKey
ALTER TABLE "Professores" DROP CONSTRAINT "Professores_id_oficinas_fkey";

-- DropTable
DROP TABLE "Alunos";

-- DropTable
DROP TABLE "Aulas";

-- DropTable
DROP TABLE "Oficinas";

-- DropTable
DROP TABLE "Presencas";

-- DropTable
DROP TABLE "Professores";

-- CreateTable
CREATE TABLE "Oficina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dias" TEXT,
    "coordenador" TEXT,
    "horario" TEXT,

    CONSTRAINT "Oficina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "oficina_id" INTEGER,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsavel" (
    "id" SERIAL NOT NULL,
    "nome_responsavel" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_oficina" INTEGER NOT NULL,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" SERIAL NOT NULL,
    "data_prevista" TIMESTAMP(3) NOT NULL,
    "id_oficina" INTEGER NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenca" (
    "id" SERIAL NOT NULL,
    "id_aluno" INTEGER NOT NULL,
    "id_aula" INTEGER NOT NULL,
    "presenca" BOOLEAN NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "Presenca_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_usuario_key" ON "Responsavel"("usuario");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_oficina_id_fkey" FOREIGN KEY ("oficina_id") REFERENCES "Oficina"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel" ADD CONSTRAINT "Responsavel_id_oficina_fkey" FOREIGN KEY ("id_oficina") REFERENCES "Oficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_id_oficina_fkey" FOREIGN KEY ("id_oficina") REFERENCES "Oficina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_id_aula_fkey" FOREIGN KEY ("id_aula") REFERENCES "Aula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
