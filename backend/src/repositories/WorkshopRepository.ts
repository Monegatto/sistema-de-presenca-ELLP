import { Workshop } from '../models/Workshop'
import { PrismaClient } from '@prisma/client'

export class WorkshopRepository {
  private prisma: any

  constructor(prismaInstance?: any) {
    this.prisma = prismaInstance || new PrismaClient()
  }

  async create(workshop: Omit<Workshop, 'id'>): Promise<Workshop> {
    const result = await this.prisma.workshop.create({
      data: {
        name: workshop.name,
        weekdays: workshop.weekdays,
        teacher: workshop.teacher,
        startTime: workshop.startTime
      }
    })

    return new Workshop(
      result.id,
      result.name,
      result.weekdays,
      result.teacher,
      result.startTime
    )
  }

  async findAll() {
    const result = await this.prisma.workshop.findMany()
    return result
  }

  async findById(id: number): Promise<Workshop | null> {
    const result = await this.prisma.workshop.findUnique({
      where: { id }
    })

    if (!result) return null

    return new Workshop(
      result.id,
      result.name,
      result.weekdays,
      result.teacher,
      result.startTime
    )
  }

  async update(id: number, data: { name?: string, weekdays?: string | null, teacher?: string | null, startTime?: string | null }) {
    const workshop = await this.prisma.workshop.update({
      where: { id },
      data
    })
    return workshop
  }

  async delete(id: number) {
    const classes = await this.prisma.class.findMany({
      where: { workshop_id: id },
      select: { id: true }
    });

    const classIds = classes.map((c: {id: number}) => c.id);

    await this.prisma.attendance.deleteMany({
      where: { class_id: { in: classIds } }
    });

    await this.prisma.class.deleteMany({
      where: { workshop_id: id }
    });

    const workshop = await this.prisma.workshop.delete({
      where: { id }
    });

    return workshop;
  }
}
