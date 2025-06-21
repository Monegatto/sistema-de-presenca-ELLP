import { Workshop } from '../models/Workshop'
import { WorkshopRepository } from '../repositories/WorkshopRepository'

export class WorkshopService {
  constructor(private repository: WorkshopRepository) { }

  async createWorkshop(name: string, weekdays: string | null, coordinator: string | null, startTime: string | null): Promise<Workshop> {
    const workshop = new Workshop(0, name, weekdays, coordinator, startTime)
    return await this.repository.create(workshop)
  }

  async listWorkshops() {
    return await this.repository.findAll()
  }

  async getWorkshopById(id: number): Promise<Workshop | null> {
    const workshops = await this.repository.findAll()
    return workshops.find((workshop: { id: number }) => workshop.id === id) || null
  }

  async updateWorkshop(id: number, name?: string, weekdays?: string | null, coordinator?: string | null, startTime?: string | null) {
    return await this.repository.update(id, { name, weekdays, coordinator, startTime })
  }

  async deleteWorkshop(id: number) {
    return await this.repository.delete(id)
  }
}
