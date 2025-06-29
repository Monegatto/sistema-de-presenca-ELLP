import { PrismaClient, Teacher } from '@prisma/client'

const prisma = new PrismaClient()

export class TeacherRepository {
  async create(data: {
    name: string
    username: string
    password: string
    forgotPassword?: boolean
  }): Promise<Teacher> {
    return prisma.teacher.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
        ...(data.forgotPassword !== undefined ? { forgotPassword: data.forgotPassword } : {})
      }
    })
  }

  async delete(id: number): Promise<void> {
    await prisma.teacher.delete({ where: { id } })
  }

  async findByUsername(username: string): Promise<Teacher | null> {
    return prisma.teacher.findUnique({ where: { username } })
  }

  async findById(id: number): Promise<Teacher | null> {
    return prisma.teacher.findUnique({ where: { id } })
  }

  async findAll(): Promise<Teacher[]> {
    return prisma.teacher.findMany()
  }

  async update(id: number, data: {
    name?: string
    username?: string
    password?: string
    forgotPassword?: boolean
  }): Promise<Teacher> {
    const updated = await prisma.teacher.update({
      where: { id },
      data: {
        ...data,
        ...(data.forgotPassword !== undefined ? { forgotPassword: data.forgotPassword } : {})
      }
    })
    return updated
  }
}
