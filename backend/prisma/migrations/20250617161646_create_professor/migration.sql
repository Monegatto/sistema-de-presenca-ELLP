-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "oficina_id" INTEGER,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_usuario_key" ON "Professor"("usuario");

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_oficina_id_fkey" FOREIGN KEY ("oficina_id") REFERENCES "Oficina"("id") ON DELETE SET NULL ON UPDATE CASCADE;
