import { PrismaClient } from '@prisma/client'

export class StudentRepository {
  private prisma: any

  constructor(prismaInstance?: any) {
    this.prisma = prismaInstance || new PrismaClient()
  }

  async create(name: string, workshop_id?: number) {
    const result = await this.prisma.student.create({
      data: {
        name,
        workshop_id
      }
    })
    return result
  }

  async findAll() {
    return await this.prisma.student.findMany({
      include: { workshop: true }
    })
  }

  async findById(id: number) {
    return await this.prisma.student.findUnique({
      where: { id },
      include: { workshop: true }
    })
  }

  async findByWorkshop(workshop_id: number) {
    return await this.prisma.student.findMany({
      where: { workshop_id },
      include: { workshop: true }
    })
  }

  async update(id: number, name: string, workshop_id: number) {
    return await this.prisma.student.update({
      where: { id },
      data: {
        name,
        workshop_id
      }
    })
  }

  async delete(id: number) {
    return await this.prisma.student.delete({
      where: { id }
    })
  }
}
