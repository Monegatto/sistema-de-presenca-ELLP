import { PrismaClient } from '@prisma/client'
import { Student } from '../models/Student'

export class StudentRepository {
  private prisma: PrismaClient

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || new PrismaClient()
  }

  async create(name: string, workshopId?: number) {
    const result = await this.prisma.student.create({
      data: { name, workshop_id: workshopId }
    })
    return new Student(result.id, result.workshop_id)
  }

  async findAll() {
    const students = await this.prisma.student.findMany()
    return students.map(s => new Student(s.id, s.workshop_id))
  }

  async findById(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id }
    })
    if (!student) return null
    return new Student(student.id, student.workshop_id)
  }

  async findByWorkshop(workshopId: number) {
    const students = await this.prisma.student.findMany({
      where: { workshop_id: workshopId }
    })
    return students.map(s => new Student(s.id, s.workshop_id))
  }

  async update(id: number, name: string, workshopId: number) {
    const updated = await this.prisma.student.update({
      where: { id },
      data: { name, workshop_id: workshopId }
    })
    return new Student(updated.id, updated.workshop_id)
  }

  async delete(id: number) {
    await this.prisma.student.delete({ where: { id } })
  }
}
