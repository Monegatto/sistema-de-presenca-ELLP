import { TeacherRepository } from '../repositories/TeacherRepository'
import { PrismaClient, Teacher } from '@prisma/client'

jest.mock('@prisma/client', () => {
    const mPrisma = {
        teacher: {
            findUnique: jest.fn(),
        },
    }
    return { PrismaClient: jest.fn(() => mPrisma) }
})

describe('TeacherRepository - findByUsername', () => {
    let teacherRepository: TeacherRepository
    let prismaMock: any

    beforeEach(() => {
        teacherRepository = new TeacherRepository()
        prismaMock = (PrismaClient as unknown as jest.Mock).mock.results[0].value
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return null when no teacher is found', async () => {
        prismaMock.teacher.findUnique.mockResolvedValue(null)

        const result = await teacherRepository.findByUsername('notfound')
        expect(prismaMock.teacher.findUnique).toHaveBeenCalledWith({ where: { username: 'notfound' } })
        expect(result).toBeNull()
    })
})