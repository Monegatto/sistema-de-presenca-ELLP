import { OficinaRepository } from "../repositories/WorkshopRepository"
import { Oficina } from "../models/Workshop"

// Mock prisma.oficina methods
const prisma = {
    oficina: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

describe('OficinaRepository', () => {
    const repository = new OficinaRepository(prisma)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('deve criar uma oficina', async () => {
        const oficinaData = { nome: 'Oficina 1', dias: 'Segunda', coordenador: 'João', horario: '10:00' }
        const oficinaMock = { id: 1, ...oficinaData }
        prisma.oficina.create.mockResolvedValue(oficinaMock)

        const result = await repository.create(oficinaData)

        expect(prisma.oficina.create).toHaveBeenCalledWith({
            data: oficinaData
        })
        expect(result).toEqual(new Oficina(1, 'Oficina 1', 'Segunda', 'João', '10:00'))
    })

    it('deve listar todas as oficinas', async () => {
        const oficinas = [
            { id: 1, nome: 'Oficina 1', dias: 'Segunda', coordenador: 'João', horario: '10:00' },
            { id: 2, nome: 'Oficina 2', dias: 'Terça', coordenador: 'Maria', horario: '14:00' }
        ]
        prisma.oficina.findMany.mockResolvedValue(oficinas)

        const result = await repository.findAll()

        expect(prisma.oficina.findMany).toHaveBeenCalled()
        expect(result).toEqual(oficinas)
    })

    it('deve buscar uma oficina por id', async () => {
        const oficina = { id: 1, nome: 'Oficina 1', dias: 'Segunda', coordenador: 'João', horario: '10:00' }
        prisma.oficina.findUnique.mockResolvedValue(oficina)

        const result = await repository.findById(1)

        expect(prisma.oficina.findUnique).toHaveBeenCalledWith({
            where: { id: 1 }
        })
        expect(result).toEqual(new Oficina(1, 'Oficina 1', 'Segunda', 'João', '10:00'))
    })

    it('deve retornar null se a oficina não existir', async () => {
        prisma.oficina.findUnique.mockResolvedValue(null)

        const result = await repository.findById(999)

        expect(prisma.oficina.findUnique).toHaveBeenCalledWith({
            where: { id: 999 }
        })
        expect(result).toBeNull()
    })

    it('deve atualizar uma oficina', async () => {
        const oficinaAtualizada = { id: 1, nome: 'Oficina Atualizada', dias: 'Quarta', coordenador: 'Ana', horario: '16:00' }
        prisma.oficina.update.mockResolvedValue(oficinaAtualizada)

        const result = await repository.update(1, {
            nome: 'Oficina Atualizada',
            dias: 'Quarta',
            coordenador: 'Ana',
            horario: '16:00'
        })

        expect(prisma.oficina.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                nome: 'Oficina Atualizada',
                dias: 'Quarta',
                coordenador: 'Ana',
                horario: '16:00'
            }
        })
        expect(result).toEqual(oficinaAtualizada)
    })

    it('deve deletar uma oficina', async () => {
        const oficinaDeletada = { id: 1, nome: 'Oficina 1', dias: 'Segunda', coordenador: 'João', horario: '10:00' }
        prisma.oficina.delete.mockResolvedValue(oficinaDeletada)

        const result = await repository.delete(1)

        expect(prisma.oficina.delete).toHaveBeenCalledWith({
            where: { id: 1 }
        })
        expect(result).toEqual(oficinaDeletada)
    })
})