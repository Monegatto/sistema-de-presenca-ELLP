import { ClassRepository } from '../repositories/ClassRepository'
import { PrismaClient } from '@prisma/client'

export class ClassService {
  private prisma: PrismaClient
  private repository: ClassRepository

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || new PrismaClient()
    this.repository = new ClassRepository(this.prisma)
  }

  async createClass(scheduledDate: Date, workshopId: number) {
    const workshopExists = await this.prisma.workshop.findUnique({
      where: { id: workshopId }
    })
    if (!workshopExists) throw new Error(`Workshop with ID ${workshopId} does not exist`)
    return await this.repository.create(scheduledDate, workshopId)
  }

  async getAllClasses() {
    return await this.repository.findAll()
  }

  async getClassById(id: number) {
    return await this.repository.findById(id)
  }

  async getClassesByWorkshop(workshopId: number) {
    return await this.repository.findByWorkshop(workshopId)
  }

  async getNextClassDateByWorkshop(workshopId: number) {
    return await this.repository.getNextClassDateByWorkshop(workshopId)
  }

  async updateClass(id: number, scheduledDate: Date, workshopId: number) {
    return await this.repository.update(id, scheduledDate, workshopId)
  }

  async deleteClass(id: number) {
    await this.repository.delete(id)
  }
}
