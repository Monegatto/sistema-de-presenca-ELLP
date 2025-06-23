import { PrismaClient } from '@prisma/client'
import { Attendance } from '../models/Attendance'

export class AttendanceRepository {
  private prisma: PrismaClient

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || new PrismaClient()
  }

  async create(studentId: number, classId: number, present: boolean, notes?: string) {
    const result = await this.prisma.attendance.create({
      data: {
        student_id: studentId,
        class_id: classId,
        present,
        notes
      }
    })
    return new Attendance(result.id, result.student_id, result.class_id, result.present, result.notes)
  }

  async findAll() {
    const attendances = await this.prisma.attendance.findMany()
    return attendances.map(a => new Attendance(a.id, a.student_id, a.class_id, a.present, a.notes))
  }

  async findById(id: number) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id }
    })
    if (!attendance) return null
    return new Attendance(attendance.id, attendance.student_id, attendance.class_id, attendance.present, attendance.notes)
  }

  async findByWorkshopAndDate(workshopId: number, date: Date) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const classOnDate = await this.prisma.class.findFirst({
    where: {
      workshop_id: workshopId,
      scheduledDate: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    include: {
      attendance: true
    }
  })

  const students = await this.prisma.student.findMany({
    where: { workshop_id: workshopId }
  })

  return students.map(student => {
    const attendance = classOnDate?.attendance.find(a => a.student_id === student.id)
    return {
      studentId: student.id,
      name: student.name,
      present: attendance?.present ?? null
    }
  })
}

  async update(id: number, present: boolean, notes?: string) {
    const updated = await this.prisma.attendance.update({
      where: { id },
      data: { present, notes }
    })
    return new Attendance(updated.id, updated.student_id, updated.class_id, updated.present, updated.notes)
  }

  async delete(id: number) {
    await this.prisma.attendance.delete({ where: { id } })
  }
}
