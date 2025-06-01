import { AlunoRepository } from "../repositories/AlunoRepository"
import { prisma } from "./prisma"

describe('AlunoRepository', () => {
    const repository = new AlunoRepository(prisma)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deve criar um aluno', async () => {
        const alunoMock = { id: 1, nome: 'Carlos', oficina_id: 2 }

        prisma.aluno.create.mockResolvedValue(alunoMock)

        const result = await repository.create(2, 'Carlos')

        expect(prisma.aluno.create).toHaveBeenCalledWith({
            data: {
                nome: 'Carlos',
                oficina_id: 2
            }
        })

        expect(result).toEqual(alunoMock)
    })

    it('deve listar todos os alunos', async () => {
        const alunos = [{ id: 1, nome: 'Carlos' }, { id: 2, nome: 'Maria' }]

        prisma.aluno.findMany.mockResolvedValue(alunos)

        const result = await repository.findAll()

        expect(prisma.aluno.findMany).toHaveBeenCalledWith({
            include: { oficina: true }
        })
        expect(result).toEqual(alunos)
    })

    it('deve buscar um aluno por id', async () => {
        const aluno = { id: 1, nome: 'Carlos', oficina_id: 2 }
        prisma.aluno.findUnique.mockResolvedValue(aluno)

        const result = await repository.findById(1)

        expect(prisma.aluno.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { oficina: true }
        })
        expect(result).toEqual(aluno)
    })

    it('deve buscar alunos por oficina', async () => {
        const alunos = [
            { id: 1, nome: 'Carlos', oficina_id: 2 },
            { id: 2, nome: 'Maria', oficina_id: 2 }
        ]
        prisma.aluno.findMany.mockResolvedValue(alunos)

        const result = await repository.findByOficina(2)

        expect(prisma.aluno.findMany).toHaveBeenCalledWith({
            where: { oficina_id: 2 },
            include: { oficina: true }
        })
        expect(result).toEqual(alunos)
    })

    it('deve atualizar um aluno', async () => {
        const alunoAtualizado = { id: 1, nome: 'Carlos Atualizado', oficina_id: 3 }
        prisma.aluno.update.mockResolvedValue(alunoAtualizado)

        const result = await repository.update(1, 'Carlos Atualizado', 3)

        expect(prisma.aluno.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                nome: 'Carlos Atualizado',
                oficina_id: 3
            }
        })
        expect(result).toEqual(alunoAtualizado)
    })

    it('deve deletar um aluno', async () => {
        const alunoDeletado = { id: 1, nome: 'Carlos', oficina_id: 2 }
        prisma.aluno.delete.mockResolvedValue(alunoDeletado)

        const result = await repository.delete(1)

        expect(prisma.aluno.delete).toHaveBeenCalledWith({
            where: { id: 1 }
        })
        expect(result).toEqual(alunoDeletado)
    })
})
