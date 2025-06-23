import { Request, Response } from 'express'
import { AttendanceService } from '../services/AttendanceService'

const service = new AttendanceService()

export class AttendanceController {

    async create(req: Request, res: Response) {
        const { studentId, classId, present, notes } = req.body

        const attendance = await service.registerAttendance(studentId, classId, present, notes)
        res.json(attendance)
    }

    async getAll(req: Request, res: Response) {
        const attendances = await service.getAllAttendances()
        res.json(attendances)
    }

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id)
        const attendance = await service.getAttendanceById(id)
        if (!attendance) return res.status(404).json({ error: 'Attendance not found' })
        res.json(attendance)
    }

    async getByStudent(req: Request, res: Response) {
        const studentId = Number(req.params.studentId)
        const result = await service.getAttendancesByStudent(studentId)
        res.json(result)
    }

    async getByClass(req: Request, res: Response) {
        const classId = Number(req.params.classId)
        const result = await service.getAttendancesByClass(classId)
        res.json(result)
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id)
        const { present, notes } = req.body
        const updated = await service.updateAttendance(id, present, notes)
        res.json(updated)
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id)
        await service.deleteAttendance(id)
        res.status(204).send()
    }
}
