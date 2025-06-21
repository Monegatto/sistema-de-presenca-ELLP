export class Teacher {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public password: string,
    public workshop_id?: number | null
  ) {}
}
