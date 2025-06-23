export class Attendance {
  constructor(
    public id: number,
    public student_id: number,
    public class_id: number,
    public present: boolean,
    public notes?: string | null
  ) {}
}
