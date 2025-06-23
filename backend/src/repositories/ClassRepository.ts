import { PrismaClient } from '@prisma/client'
import { Class } from '../models/Class'

export class ClassRepository {
  private prisma: PrismaClient

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || new PrismaClient()
  }

  async create(scheduledDate: Date, workshopId: number) {
    const result = await this.prisma.class.create({
      data: {
        scheduledDate,
        workshop_id: workshopId
      }
    })
    return new Class(result.id, result.scheduledDate, result.workshop_id)
  }

  async findAll() {
    const classes = await this.prisma.class.findMany()
    return classes.map(c => new Class(c.id, c.scheduledDate, c.workshop_id))
  }

  async findById(id: number) {
    const classData = await this.prisma.class.findUnique({
      where: { id }
    })
    if (!classData) return null
    return new Class(classData.id, classData.scheduledDate, classData.workshop_id)
  }

  async findByWorkshop(workshopId: number) {
    const classes = await this.prisma.class.findMany({
      where: { workshop_id: workshopId }
    })
    return classes.map(c => new Class(c.id, c.scheduledDate, c.workshop_id))
  }

  async update(id: number, scheduledDate: Date, workshopId: number) {
    const updated = await this.prisma.class.update({
      where: { id },
      data: { scheduledDate, workshop_id: workshopId }
    })
    return new Class(updated.id, updated.scheduledDate, updated.workshop_id)
  }

  async delete(id: number) {
    await this.prisma.class.delete({ where: { id } })
  }
}
