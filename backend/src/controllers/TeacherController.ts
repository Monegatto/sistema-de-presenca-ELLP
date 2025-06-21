import { Request, Response } from 'express'
import { TeacherService } from '../services/TeacherService'
import { TeacherRepository } from '../repositories/TeacherRepository'

const repository = new TeacherRepository()
const service = new TeacherService(repository)

export class TeacherController {
  async create(req: Request, res: Response) {
    const { name, username, password, workshop_id } = req.body

    if (!name || !username || !password) {
      return res.status(400).json({ error: 'name, username and password are required' })
    }

    try {
      const teacher = await service.createTeacher(name, username, password, workshop_id)
      return res.status(201).json(teacher)
    } catch (error) {
      return res.status(500).json({ error: 'Error creating teacher', detail: error })
    }
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }
    try {
      await service.deleteTeacher(id)
      return res.status(204).send()
    } catch (error) {
      return res.status(404).json({ error: 'Teacher not found' })
    }
  }
}
