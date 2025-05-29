export class Oficina {
  constructor(
    public id: number,
    public nome: string,
    public dias: string | null,
    public coordenador: string | null,
    public horario: string | null
  ) {}
}
