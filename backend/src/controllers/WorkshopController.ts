import { Request, Response } from 'express'
import { WorkshopRepository } from '../repositories/WorkshopRepository'
import { WorkshopService } from '../services/WorkshopService'

const repository = new WorkshopRepository()
const service = new WorkshopService(repository)

export class WorkshopController {
  async create(req: Request, res: Response) {
    const { name, weekdays, coordinator, startTime } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    const workshop = await service.createWorkshop(
      name,
      weekdays || null,
      coordinator || null,
      startTime || null
    )

    return res.status(201).json(workshop)
  }

  async list(req: Request, res: Response) {
    const workshops = await service.listWorkshops()
    return res.status(200).json(workshops)
  }

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const workshop = await service.getWorkshopById(id)

    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' })
    }

    return res.status(200).json(workshop)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, weekdays, coordinator, startTime } = req.body

    const workshopId = Number(id)

    if (isNaN(workshopId)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
      const workshop = await service.updateWorkshop(workshopId, name, weekdays, coordinator, startTime)
      return res.status(200).json(workshop)
    } catch (error) {
      return res.status(404).json({ error: 'Workshop not found' })
    }
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params

    const workshopId = Number(id)

    if (isNaN(workshopId)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
      const workshop = await service.deleteWorkshop(workshopId)
      return res.status(200).json({ message: 'Workshop successfully removed', workshop })
    } catch (error) {
      return res.status(404).json({ error: 'Workshop not found' })
    }
  }
}
