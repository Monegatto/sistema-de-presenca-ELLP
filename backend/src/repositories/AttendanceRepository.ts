import { PrismaClient } from '@prisma/client'
import { Attendance } from '../models/Attendance'
import { DateTime } from 'luxon'

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
    const dt = DateTime.fromJSDate(date).setZone('America/Sao_Paulo');
    const startOfDay = dt.startOf('day').toJSDate();
    const endOfDay = dt.plus({ days: 1 }).startOf('day').toJSDate();

    const classes = await this.prisma.class.findMany({
      where: {
        workshop_id: workshopId,
        scheduledDate: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    });

    if (classes.length === 0) return [];

    const classIds = classes.map(c => c.id);

    const attendances = await this.prisma.attendance.findMany({
      where: {
        class_id: { in: classIds }
      }
    });

    const students = await this.prisma.student.findMany({
      where: { workshop_id: workshopId }
    });

    return students.map(student => {
      const attendance = attendances.find(a => a.student_id === student.id);
      return {
        studentId: student.id,
        name: student.name,
        present: attendance?.present ?? null,
        attendanceId: attendance?.id ?? null,
      }
    });
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

  async getAttendancePercentage(studentId: number, workshopId: number): Promise<number> {
    const today = new Date();
    const classes = await this.prisma.class.findMany({
      where: {
        workshop_id: workshopId,
      }
    });

    if (classes.length === 0) return 0;

    const classIds = classes.map(c => c.id);
    const presences = await this.prisma.attendance.findMany({
      where: {
        student_id: studentId,
        class_id: { in: classIds },
        present: true
      }
    });

    return (presences.length / classes.length) * 100;
  }
}
