import { StudentRepository } from '../repositories/StudentRepository'
import { Student } from '../models/Student'

const mockCreate = jest.fn()
const mockPrisma: any = {
    student: {
        create: mockCreate
    }
}

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn(() => mockPrisma)
    }
})

describe('StudentRepository.create', () => {
    let repo: StudentRepository

    beforeEach(() => {
        jest.clearAllMocks()
        repo = new StudentRepository(mockPrisma)
    })

    it('should create a student with name and workshopId', async () => {
        const mockResult = { id: 1, name: 'Alice', workshop_id: 2 }
        mockCreate.mockResolvedValueOnce(mockResult)

        const student = await repo.create('Alice', 2)

        expect(mockCreate).toHaveBeenCalledWith({
            data: { name: 'Alice', workshop_id: 2 }
        })
        expect(student).toBeInstanceOf(Student)
        expect(student).toMatchObject({
            id: 1,
            name: 'Alice',
            workshopId: 2
        })
    })

    it('should create a student with name and undefined workshopId', async () => {
        const mockResult = { id: 2, name: 'Bob', workshop_id: undefined }
        mockCreate.mockResolvedValueOnce(mockResult)

        const student = await repo.create('Bob')

        expect(mockCreate).toHaveBeenCalledWith({
            data: { name: 'Bob', workshop_id: undefined }
        })
        expect(student).toBeInstanceOf(Student)
        expect(student).toMatchObject({
            id: 2,
            name: 'Bob',
            workshopId: undefined
        })
    })
})