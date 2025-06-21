import { Teacher } from '../models/Teacher'
import { TeacherRepository } from '../repositories/TeacherRepository'

export class TeacherService {
  constructor(private repository: TeacherRepository) {}

  async createTeacher(
    name: string,
    username: string,
    password: string,
    workshop_id: number | null
  ): Promise<Teacher> {
    const teacher = new Teacher(0, name, username, password, workshop_id ?? null)
    return await this.repository.create(teacher)
  }

  async deleteTeacher(id: number) {
    return await this.repository.delete(id)
  }
}
