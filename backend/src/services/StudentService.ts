import { StudentRepository } from "../repositories/StudentRepository"

export class StudentService {
  private repository = new StudentRepository()

  async createStudent(name: string, workshop_id?: number) {
    const student = await this.repository.create(name, workshop_id)
    return student
  }

  async listStudents() {
    return await this.repository.findAll()
  }

  async getById(id: number) {
    return await this.repository.findById(id)
  }

  async listByWorkshop(workshop_id: number) {
    return await this.repository.findByWorkshop(workshop_id)
  }

  async updateStudent(id: number, name: string, workshop_id: number) {
    return await this.repository.update(id, name, workshop_id)
  }

  async removeStudent(id: number) {
    return await this.repository.delete(id)
  }
}
