export class Professor {
  constructor(
    public id: number,
    public nome: string,
    public usuario: string,
    public senha: string,
    public oficina_id?: number | null
  ) {}
}
