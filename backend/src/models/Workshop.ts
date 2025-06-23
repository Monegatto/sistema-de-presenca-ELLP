export class Workshop {
  constructor(
    public id: number,
    public name: string,
    public weekdays: string | null,
    public teacher: number | null,
    public startTime: string | null
  ) {}
}
