import { TeacherRepository } from '../repositories/TeacherRepository'
import { Teacher } from '@prisma/client'

export class TeacherService {
  constructor(private repository: TeacherRepository) {}

  async createTeacher(
    name: string,
    username: string,
    password: string,
    forgotPassword: boolean = false
  ): Promise<Teacher> {
    return this.repository.create({ name, username, password, forgotPassword})
  }

  async deleteTeacher(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async findTeacherByUsername(username: string): Promise<Teacher | null> {
    return this.repository.findByUsername(username)
  }

  async findTeacherById(id: number): Promise<Teacher | null> {
    return this.repository.findById(id)
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return this.repository.findAll()
  }

  async updateTeacher(id: number, data: {
    name?: string
    username?: string
    password?: string
    forgotPassword?: boolean
  }): Promise<Teacher> {
    return this.repository.update(id, data)
  }
}
