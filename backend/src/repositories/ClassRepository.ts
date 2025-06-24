import { PrismaClient } from '@prisma/client'
import { Class } from '../models/Class'
import { getNextClassDate } from '../utils/dateUtils'
import { DateTime } from 'luxon'

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

  async getNextClassDateByWorkshop(workshopId: number): Promise<Date | null> {
    const workshop = await this.prisma.workshop.findUnique({ where: { id: workshopId } });
    if (!workshop || !workshop.weekdays || !workshop.startTime) return null;

    const nextDate = getNextClassDate(workshop.weekdays);
    if (!nextDate) return null;

    const [hours, minutes] = workshop.startTime.split(':').map(Number);

    const resultDate = DateTime.fromObject(
      {
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
        day: nextDate.getDate(),
        hour: hours,
        minute: minutes || 0,
        second: 0,
        millisecond: 0
      },
      { zone: 'America/Sao_Paulo' }
    ).toJSDate();

    return resultDate;
  }
}
