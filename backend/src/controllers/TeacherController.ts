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

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params
    if (!username) {
      return res.status(400).json({ error: 'Username is required' })
    }

    try {
      const teacher = await service.findTeacherByUsername(username)
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' })
      }
      return res.status(200).json(teacher)
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching teacher', detail: error })
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const teachers = await service.getAllTeachers()
      return res.status(200).json(teachers)
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching teachers', detail: error })
    }
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
      const teacher = await service.findTeacherById(id)
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' })
      }
      return res.status(200).json(teacher)
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching teacher', detail: error })
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { name, username, password, workshop_id } = req.body

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
      const updated = await service.updateTeacher(id, { name, username, password, workshop_id })
      return res.status(200).json(updated)
    } catch (error) {
      return res.status(500).json({ error: 'Error updating teacher', detail: error })
    }
  }
}
