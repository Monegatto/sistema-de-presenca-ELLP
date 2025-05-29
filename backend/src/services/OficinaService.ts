import { Oficina } from '../models/Oficina'
import { OficinaRepository } from '../repositories/OficinaRepository'

export class OficinaService {
  constructor(private repository: OficinaRepository) {}

  async criarOficina(nome: string, dias: string | null, coordenador: string | null, horario: string | null): Promise<Oficina> {
    const oficina = new Oficina(0, nome, dias, coordenador, horario)
    return await this.repository.create(oficina)
  }
}
