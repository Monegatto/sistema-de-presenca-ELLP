import { Request, Response } from 'express'
import { WorkshopRepository } from '../repositories/WorkshopRepository'
import { WorkshopService } from '../services/WorkshopService'

const repository = new WorkshopRepository()
const service = new WorkshopService(repository)

export class WorkshopController {
  async create(req: Request, res: Response) {
  const { name, weekdays, teacher, startTime } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Name is required' })
  }

  try {
    const workshop = await service.createWorkshop(
      name,
      weekdays || null,
      teacher || null,
      startTime || null
    )

    return res.status(201).json(workshop)
  } catch (error) {
    console.error('Erro ao criar oficina:', error)
    return res.status(500).json({ error: 'Erro interno ao criar oficina' })
  }
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
    const { name, weekdays, teacher, startTime } = req.body

    const workshopId = Number(id)

    if (isNaN(workshopId)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    try {
      const workshop = await service.updateWorkshop(workshopId, name, weekdays, teacher, startTime)
      return res.status(200).json(workshop)
    } catch (error) {
      return res.status(404).json({ error: 'Workshop not found' })
    }
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const workshopId = Number(id);

    if (isNaN(workshopId)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
      const workshop = await service.deleteWorkshop(workshopId);
      if (!workshop) {
        return res.status(404).json({ error: 'Workshop not found' });
      }
      return res.status(200).json({ message: 'Workshop successfully removed', workshop });
    } catch (error: any) {
      console.error('Error deleting workshop:', error);
      return res.status(500).json({ error: 'Internal server error', detail: error.message });
    }
  }
}
