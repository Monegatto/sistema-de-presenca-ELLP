import { Request, Response } from 'express'
import { ClassService } from '../services/ClassService'

const service = new ClassService()

export class ClassController {
  async create(req: Request, res: Response) {
    const { scheduledDate, workshopId } = req.body

    try {
      const result = await service.createClass(new Date(scheduledDate), workshopId)
      res.json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async list(req: Request, res: Response) {
    const result = await service.getAllClasses()
    res.json(result)
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id)
    const classItem = await service.getClassById(id)
    if (!classItem) return res.status(404).json({ error: 'Class not found' })
    res.json(classItem)
  }

  async listByWorkshop(req: Request, res: Response) {
    const workshopId = Number(req.params.workshopId)
    const result = await service.getClassesByWorkshop(workshopId)
    res.json(result)
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { scheduledDate, workshopId } = req.body
    const updated = await service.updateClass(id, new Date(scheduledDate), workshopId)
    res.json(updated)
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    await service.deleteClass(id)
    res.status(204).send()
  }

  async getNextClassDateByWorkshop(req: Request, res: Response) {
    const workshopId = Number(req.params.workshopId)
    try {
      const nextDate = await service.getNextClassDateByWorkshop(workshopId)
      if (!nextDate) return res.status(404).json({ error: 'Workshop not found or no next class date' })
      res.json({ nextClassDate: nextDate })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}
