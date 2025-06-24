import { WorkshopRepository } from '../repositories/WorkshopRepository'
import { PrismaClient } from '@prisma/client'

jest.mock('@prisma/client')

describe('WorkshopRepository constructor', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should use the provided prisma instance if given', () => {
        const mockPrisma = { workshop: {} }
        const repo = new WorkshopRepository(mockPrisma)
        expect((repo as any).prisma).toBe(mockPrisma)
    })

    it('should create a new PrismaClient if no instance is provided', () => {
        (PrismaClient as jest.Mock).mockImplementation(() => ({ workshop: {} }))
        const repo = new WorkshopRepository()
        expect((repo as any).prisma).toBeDefined()
        expect(PrismaClient).toHaveBeenCalledTimes(1)
    })
})