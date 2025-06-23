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

    async getByWorkshopAndDate(req: Request, res: Response) {
        const workshopId = Number(req.params.workshopId)
        const dateParam = req.query.date as string

        if (!dateParam) return res.status(400).json({ error: 'Missing "date" query parameter' })

        const date = new Date(dateParam)
        if (isNaN(date.getTime())) return res.status(400).json({ error: 'Invalid date format' })

        const result = await service.getByWorkshopAndDate(workshopId, date)
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
