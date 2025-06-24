import { ClassRepository } from '../repositories/ClassRepository'
import { Class } from '../models/Class'

describe('ClassRepository.create', () => {
    const mockPrisma = {
        class: {
            create: jest.fn()
        }
    } as any

    const scheduledDate = new Date('2024-06-01T10:00:00Z')
    const workshopId = 42

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should create a class and return a Class instance', async () => {
        const mockResult = {
            id: 1,
            scheduledDate,
            workshop_id: workshopId
        }
        mockPrisma.class.create.mockResolvedValue(mockResult)

        const repo = new ClassRepository(mockPrisma)
        const result = await repo.create(scheduledDate, workshopId)

        expect(mockPrisma.class.create).toHaveBeenCalledWith({
            data: {
                scheduledDate,
                workshop_id: workshopId
            }
        })
        expect(result).toBeInstanceOf(Class)
        expect(result).toEqual(new Class(1, scheduledDate, workshopId))
    })

    it('should propagate errors from prisma', async () => {
        const error = new Error('DB error')
        mockPrisma.class.create.mockRejectedValue(error)

        const repo = new ClassRepository(mockPrisma)
        await expect(repo.create(scheduledDate, workshopId)).rejects.toThrow('DB error')
    })
})