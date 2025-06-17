import { PrismaClient } from "@prisma/client";
import { Professor } from "../models/Professor";


export class ProfessorRepository {
    private prisma: any;

    constructor(prismaInstance?: any) {
        this.prisma = prismaInstance || new PrismaClient();
    }

    async create(professor: Professor) {
        return await this.prisma.professor.create({
            data: {
                nome: professor.nome,
                usuario: professor.usuario,
                senha: professor.senha,
                oficina_id: professor.oficina_id ?? null,
            },
        })
    }
}