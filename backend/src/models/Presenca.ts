export class Presenca {
  constructor(
    public id: number,
    public alunoId: number,
    public aulaId: number,
    public presenca: boolean,
    public observacoes: string | null
  ) {}
}
