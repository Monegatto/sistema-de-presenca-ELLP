import { Oficina } from '../models/Oficina'
import { PrismaClient } from '@prisma/client'


export class OficinaRepository {
    private prisma: any;

    constructor(prismaInstance?: any) {
        this.prisma = prismaInstance || new PrismaClient();
    }
    async create(oficina: Omit<Oficina, 'id'>): Promise<Oficina> {
        const result = await this.prisma.oficina.create({
            data: {
                nome: oficina.nome,
                dias: oficina.dias,
                coordenador: oficina.coordenador,
                horario: oficina.horario
            }
        })

        return new Oficina(
            result.id,
            result.nome,
            result.dias,
            result.coordenador,
            result.horario
        )
    }

    async findAll() {
        const result = await this.prisma.oficina.findMany()
        return result
    }

    async findById(id: number): Promise<Oficina | null> {
        const result = await this.prisma.oficina.findUnique({
            where: { id }
        })

        if (!result) return null

        return new Oficina(
            result.id,
            result.nome,
            result.dias,
            result.coordenador,
            result.horario
        )
    }

    async update(id: number, data: { nome?: string, dias?: string | null, coordenador?: string | null, horario?: string | null }) {
        const oficina = await this.prisma.oficina.update({
            where: { id },
            data
        })
        return oficina
    }

    async delete(id: number) {
        const oficina = await this.prisma.oficina.delete({
            where: { id }
        })
        return oficina
    }


}
