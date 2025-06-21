export class Workshop {
  constructor(
    public id: number,
    public name: string,
    public weekdays: string | null,
    public coordinator: string | null,
    public startTime: string | null
  ) {}
}
