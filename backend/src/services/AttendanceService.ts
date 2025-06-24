import { AttendanceRepository } from '../repositories/AttendanceRepository'
import { Attendance } from '../models/Attendance'
import { PrismaClient } from '@prisma/client'

export class AttendanceService {
  private repository = new AttendanceRepository()

  private prisma: PrismaClient

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || new PrismaClient()
  }

  async registerAttendance(studentId: number, classId: number, present: boolean, notes?: string) {
    const studentExists = await this.prisma.student.findUnique({ where: { id: studentId } })
    if (!studentExists) {
      throw new Error(`Student with ID ${studentId} does not exist`)
    }

    const classExists = await this.prisma.class.findUnique({ where: { id: classId } })
    if (!classExists) {
      throw new Error(`Class with ID ${classId} does not exist`)
    }

    return await this.repository.create(studentId, classId, present, notes)
  }

  async getAllAttendances() {
    return await this.repository.findAll()
  }

  async getAttendanceById(id: number) {
    return await this.repository.findById(id)
  }

  async getByWorkshopAndDate(workshopId: number, date: Date) {
    return await this.repository.findByWorkshopAndDate(workshopId, date)
  }

  async getAttendancePercentage(studentId: number, workshopId: number) {
    return await this.repository.getAttendancePercentage(studentId, workshopId);
  }

  async updateAttendance(id: number, present: boolean, notes?: string) {
    return await this.repository.update(id, present, notes)
  }

  async deleteAttendance(id: number) {
    await this.repository.delete(id)
  }
}
