import { Oficina } from '../models/Oficina'
import { OficinaRepository } from '../repositories/OficinaRepository'

export class OficinaService {
    constructor(private repository: OficinaRepository) { }

    async criarOficina(nome: string, dias: string | null, coordenador: string | null, horario: string | null): Promise<Oficina> {
        const oficina = new Oficina(0, nome, dias, coordenador, horario)
        return await this.repository.create(oficina)
    }

    async listarOficinas() {
        return await this.repository.findAll()
    }
    
    async buscarOficinaPorId(id: number): Promise<Oficina | null> {
        const oficinas = await this.repository.findAll()
        return oficinas.find(oficina => oficina.id === id) || null
    }
}
