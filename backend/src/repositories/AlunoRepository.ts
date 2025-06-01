import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AlunoRepository {
    async create(oficina_id: number, nome: string) {
        const result = await prisma.aluno.create({
            data: {
                nome,
                oficina_id
            }
        })
        return result
    }

    async findAll() {
        return await prisma.aluno.findMany({
            include: { oficina: true }
        })
    }

    async findById(id: number) {
        return await prisma.aluno.findUnique({
            where: { id },
            include: { oficina: true }
        })
    }

  async findByOficina(oficina_id: number) {
    return await prisma.aluno.findMany({
      where: { oficina_id },
      include: { oficina: true }
    })
  }

  async update(id: number, nome: string, oficina_id: number) {
    return await prisma.aluno.update({
      where: { id },
      data: {
        nome,
        oficina_id
      }
    })
  }

  async delete(id: number) {
    return await prisma.aluno.delete({
      where: { id }
    })
  }
}
