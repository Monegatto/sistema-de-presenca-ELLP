import { Request, Response } from 'express'
import { StudentService } from '../services/StudentService'

const service = new StudentService()

export class StudentController {
  async create(req: Request, res: Response) {
    const { name, workshop_id } = req.body

    if (!name) {
      return res.status(400).json({ error: 'name is required' })
    }

    const student = await service.createStudent(name, workshop_id)
    return res.status(201).json(student)
  }

  async list(req: Request, res: Response) {
    const students = await service.listStudents()
    return res.status(200).json(students)
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const student = await service.getById(id)

    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    return res.status(200).json(student)
  }

  async listByWorkshop(req: Request, res: Response) {
    const workshopId = Number(req.params.workshopId)

    if (isNaN(workshopId)) {
      return res.status(400).json({ error: 'Invalid workshop ID' })
    }

    const students = await service.listByWorkshop(workshopId)

    return res.status(200).json(students)
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { name, workshop_id } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    if (!name) {
      return res.status(400).json({ error: 'name is required' })
    }

    const existingStudent = await service.getById(id)

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }

    const student = await service.updateStudent(id, name, workshop_id)
    return res.status(200).json(student)
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const existingStudent = await service.getById(id)

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }

    await service.removeStudent(id)
    return res.status(204).send()
  }
}
