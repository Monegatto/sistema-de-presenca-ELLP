import { PrismaClient } from '@prisma/client'
import { Teacher } from '../models/Teacher'

export class TeacherRepository {
  private prisma: any

  constructor(prismaInstance?: any) {
    this.prisma = prismaInstance || new PrismaClient()
  }

  async create(teacher: Teacher) {
    return await this.prisma.teacher.create({
      data: {
        name: teacher.name,
        username: teacher.username,
        password: teacher.password,
        workshop_id: teacher.workshop_id ?? null,
      },
    })
  }

  async delete(id: number) {
    return await this.prisma.teacher.delete({
      where: { id },
    })
  }

  async findByUsername(username: string) {
    return await this.prisma.teacher.findUnique({ where: { username } })
  }
}
