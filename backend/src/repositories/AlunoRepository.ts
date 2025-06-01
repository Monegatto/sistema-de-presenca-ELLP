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
            where: { id }
        })
    }
}
