import { AttendanceRepository } from '../repositories/AttendanceRepository'
import { Attendance } from '../models/Attendance'

const mockAttendance = {
    id: 1,
    student_id: 10,
    class_id: 20,
    present: true,
    notes: 'On time'
}

const mockPrisma = {
    attendance: {
        create: jest.fn()
    }
} as any

describe('AttendanceRepository.create', () => {
    let repo: AttendanceRepository

    beforeEach(() => {
        jest.clearAllMocks()
        repo = new AttendanceRepository(mockPrisma)
    })

    it('should create an attendance and return an Attendance instance', async () => {
        mockPrisma.attendance.create.mockResolvedValueOnce(mockAttendance)

        const result = await repo.create(10, 20, true, 'On time')

        expect(mockPrisma.attendance.create).toHaveBeenCalledWith({
            data: {
                student_id: 10,
                class_id: 20,
                present: true,
                notes: 'On time'
            }
        })
        expect(result).toBeInstanceOf(Attendance)
        expect(result).toMatchObject({
            id: 1
        })
    })

    it('should handle undefined notes', async () => {
        const attendanceWithoutNotes = { ...mockAttendance, notes: undefined }
        mockPrisma.attendance.create.mockResolvedValueOnce(attendanceWithoutNotes)

        const result = await repo.create(10, 20, false)

        expect(mockPrisma.attendance.create).toHaveBeenCalledWith({
            data: {
                student_id: 10,
                class_id: 20,
                present: false,
                notes: undefined
            }
        })
        expect(result.notes).toBeUndefined()
    })
})