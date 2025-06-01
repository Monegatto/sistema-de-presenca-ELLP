import { PrismaClient } from '@prisma/client';

export class AlunoRepository {
    private prisma: any;

    constructor(prismaInstance?: any) {
        this.prisma = prismaInstance || new PrismaClient();
    }

    async create(nome: string, oficina_id?: number) {
        const result = await this.prisma.aluno.create({
            data: {
                nome,
                oficina_id
            }
        })
        return result
    }

    async findAll() {
        return await this.prisma.aluno.findMany({
            include: { oficina: true }
        })
    }

    async findById(id: number) {
        return await this.prisma.aluno.findUnique({
            where: { id },
            include: { oficina: true }
        })
    }

    async findByOficina(oficina_id: number) {
        return await this.prisma.aluno.findMany({
            where: { oficina_id },
            include: { oficina: true }
        })
    }

    async update(id: number, nome: string, oficina_id: number) {
        return await this.prisma.aluno.update({
            where: { id },
            data: {
                nome,
                oficina_id
            }
        })
    }

    async delete(id: number) {
        return await this.prisma.aluno.delete({
            where: { id }
        })
    }
}